import { Hono } from 'hono'
import type { Env } from '../index'
import { query, queryOne, execute } from '../db'
import { auth } from '../middleware/auth'
import type { Resource } from '../types'

export const resourcesRoute = new Hono<Env>()

resourcesRoute.get('/', async (c) => {
  const resources = await query<Resource>(c, 'SELECT * FROM resources ORDER BY created_at DESC')
  return c.json({ resources })
})

resourcesRoute.get('/:id', async (c) => {
  const resource = await queryOne<Resource>(c, 'SELECT * FROM resources WHERE id = ?', c.req.param('id'))
  if (!resource) return c.json({ error: 'Recurso não encontrado' }, 404)
  return c.json({ resource })
})

resourcesRoute.post('/', auth, async (c) => {
  const body = await c.req.json<Partial<Resource>>()
  if (!body.title) return c.json({ error: 'Título é obrigatório' }, 400)

  const result = await execute(c,
    `INSERT INTO resources (title, description, download_url, upload_year_month, tag)
     VALUES (?, ?, ?, ?, ?)`,
    body.title, body.description ?? null, body.download_url ?? null,
    body.upload_year_month ?? null, body.tag ?? null
  )
  return c.json({ id: result.meta.last_row_id }, 201)
})

resourcesRoute.put('/:id', auth, async (c) => {
  const id = c.req.param('id')
  const existing = await queryOne<Resource>(c, 'SELECT * FROM resources WHERE id = ?', id)
  if (!existing) return c.json({ error: 'Recurso não encontrado' }, 404)

  const body = await c.req.json<Partial<Resource>>()
  await execute(c,
    `UPDATE resources SET title = ?, description = ?, download_url = ?, upload_year_month = ?, tag = ?, updated_at = datetime('now')
     WHERE id = ?`,
    body.title ?? existing.title, body.description ?? existing.description,
    body.download_url ?? existing.download_url, body.upload_year_month ?? existing.upload_year_month,
    body.tag ?? existing.tag, id
  )
  return c.json({ message: 'Recurso atualizado' })
})

resourcesRoute.delete('/:id', auth, async (c) => {
  const id = c.req.param('id')
  const existing = await queryOne<Resource>(c, 'SELECT * FROM resources WHERE id = ?', id)
  if (!existing) return c.json({ error: 'Recurso não encontrado' }, 404)

  await execute(c, 'DELETE FROM resources WHERE id = ?', id)
  return c.json({ message: 'Recurso deletado' })
})
