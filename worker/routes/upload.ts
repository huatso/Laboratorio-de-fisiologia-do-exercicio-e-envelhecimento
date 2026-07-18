import { Hono } from 'hono'
import type { Env } from '../index'
import { queryOne, execute } from '../db'
import { auth } from '../middleware/auth'
import { rateLimit } from '../middleware/rate-limit'
import { classifyUpload } from '../lib/magic-bytes'
import type { FileRecord } from '../types'

export const uploadRoute = new Hono<Env>()

const MAX_STORAGE_BYTES = 300 * 1024 * 1024 // 300MB — limite de armazenamento do projeto (aplicado em app, R2 não tem cap nativo)

uploadRoute.use('*', auth)
uploadRoute.use('*', rateLimit({ prefix: 'upload', max: 20, windowMs: 60_000 }))

uploadRoute.get('/stats', async (c) => {
  const totalResult = await queryOne<{ total: number }>(c, 'SELECT COALESCE(SUM(size), 0) as total FROM files')
  return c.json({ used: totalResult?.total || 0, limit: MAX_STORAGE_BYTES })
})

uploadRoute.post('/', async (c) => {
  const formData = await c.req.formData()
  const file = formData.get('file') as File | null
  const category = (formData.get('category') as string | null) || 'files'
  const replaceKey = formData.get('replace_key') as string | null

  if (!file) {
    return c.json({ error: 'Nenhum arquivo enviado' }, 400)
  }

  const totalResult = await queryOne<{ total: number }>(c, 'SELECT COALESCE(SUM(size), 0) as total FROM files')
  const totalUsed = totalResult?.total || 0
  if (totalUsed + file.size > MAX_STORAGE_BYTES) {
    return c.json({ error: `Limite de armazenamento do projeto (${Math.round(MAX_STORAGE_BYTES / 1024 / 1024)}MB) excedido` }, 413)
  }

  const buffer = new Uint8Array(await file.arrayBuffer())
  const { ext, mimeType } = classifyUpload(buffer, file.name)
  const safeCategory = /^[a-z0-9_-]+$/i.test(category) ? category : 'files'
  const r2Key = `${safeCategory}/${crypto.randomUUID()}.${ext}`

  await c.env.R2.put(r2Key, buffer, {
    httpMetadata: { contentType: mimeType },
    customMetadata: { originalName: file.name },
  })

  await execute(c,
    'INSERT INTO files (r2_key, original_name, size, mime_type) VALUES (?, ?, ?, ?)',
    r2Key, file.name, buffer.length, mimeType
  )

  // Substituição de arquivo (ex: trocar foto de membro): apaga o antigo do R2 +
  // linha em `files` pra não acumular lixo órfão consumindo a cota de 300MB.
  if (replaceKey) {
    const oldFile = await queryOne<FileRecord>(c, 'SELECT * FROM files WHERE r2_key = ?', replaceKey)
    if (oldFile) {
      await c.env.R2.delete(replaceKey)
      await execute(c, 'DELETE FROM files WHERE r2_key = ?', replaceKey)
    }
  }

  return c.json({ r2_key: r2Key, url: `/files/${r2Key}`, size: buffer.length, mime_type: mimeType }, 201)
})

uploadRoute.delete('/:id', async (c) => {
  const id = c.req.param('id')
  const file = await queryOne<FileRecord>(c, 'SELECT * FROM files WHERE id = ?', id)
  if (!file) return c.json({ error: 'Arquivo não encontrado' }, 404)

  await c.env.R2.delete(file.r2_key)
  await execute(c, 'DELETE FROM files WHERE id = ?', id)
  return c.json({ message: 'Arquivo deletado' })
})
