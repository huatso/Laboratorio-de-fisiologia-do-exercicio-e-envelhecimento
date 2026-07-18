import { Hono } from 'hono'
import type { Env } from '../index'
import { query, queryOne, execute } from '../db'
import { auth } from '../middleware/auth'
import type { Publication } from '../types'

export const publicationsRoute = new Hono<Env>()

publicationsRoute.get('/', async (c) => {
  const publications = await query<Publication>(c, 'SELECT * FROM publications ORDER BY created_at DESC')
  return c.json({ publications })
})

publicationsRoute.get('/:id', async (c) => {
  const publication = await queryOne<Publication>(c, 'SELECT * FROM publications WHERE id = ?', c.req.param('id'))
  if (!publication) return c.json({ error: 'Publicação não encontrada' }, 404)
  return c.json({ publication })
})

publicationsRoute.post('/', auth, async (c) => {
  const body = await c.req.json<Partial<Publication>>()
  if (!body.bibtex_key || !body.bibtex_raw) {
    return c.json({ error: 'bibtex_key e bibtex_raw são obrigatórios' }, 400)
  }

  const dup = await queryOne<{ id: number }>(c, 'SELECT id FROM publications WHERE bibtex_key = ?', body.bibtex_key)
  if (dup) return c.json({ error: 'Já existe uma publicação com essa bibtex_key' }, 409)

  const result = await execute(c,
    'INSERT INTO publications (bibtex_key, bibtex_raw) VALUES (?, ?)',
    body.bibtex_key, body.bibtex_raw
  )
  return c.json({ id: result.meta.last_row_id }, 201)
})

publicationsRoute.put('/:id', auth, async (c) => {
  const id = c.req.param('id')
  const existing = await queryOne<Publication>(c, 'SELECT * FROM publications WHERE id = ?', id)
  if (!existing) return c.json({ error: 'Publicação não encontrada' }, 404)

  const body = await c.req.json<Partial<Publication>>()
  if (body.bibtex_key && body.bibtex_key !== existing.bibtex_key) {
    const dup = await queryOne<{ id: number }>(c, 'SELECT id FROM publications WHERE bibtex_key = ? AND id != ?', body.bibtex_key, id)
    if (dup) return c.json({ error: 'Já existe uma publicação com essa bibtex_key' }, 409)
  }

  await execute(c,
    `UPDATE publications SET bibtex_key = ?, bibtex_raw = ?, updated_at = datetime('now') WHERE id = ?`,
    body.bibtex_key ?? existing.bibtex_key, body.bibtex_raw ?? existing.bibtex_raw, id
  )
  return c.json({ message: 'Publicação atualizada' })
})

publicationsRoute.delete('/:id', auth, async (c) => {
  const id = c.req.param('id')
  const existing = await queryOne<Publication>(c, 'SELECT * FROM publications WHERE id = ?', id)
  if (!existing) return c.json({ error: 'Publicação não encontrada' }, 404)

  await execute(c, 'DELETE FROM publications WHERE id = ?', id)
  return c.json({ message: 'Publicação deletada' })
})
