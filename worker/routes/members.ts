import { Hono } from 'hono'
import type { Env } from '../index'
import { query, queryOne, execute } from '../db'
import { auth } from '../middleware/auth'
import type { Member } from '../types'

export const membersRoute = new Hono<Env>()

membersRoute.get('/', async (c) => {
  const members = await query<Member>(c, 'SELECT * FROM members ORDER BY sort_order ASC, id ASC')
  return c.json({ members })
})

membersRoute.get('/:id', async (c) => {
  const member = await queryOne<Member>(c, 'SELECT * FROM members WHERE id = ?', c.req.param('id'))
  if (!member) return c.json({ error: 'Membro não encontrado' }, 404)
  return c.json({ member })
})

membersRoute.post('/', auth, async (c) => {
  const body = await c.req.json<Partial<Member>>()
  if (!body.name) return c.json({ error: 'Nome é obrigatório' }, 400)

  const result = await execute(c,
    `INSERT INTO members (name, subtitle, teaser, bio, location, links, image_url, sort_order)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    body.name, body.subtitle ?? null, body.teaser ?? null, body.bio ?? null,
    body.location ?? null, body.links ?? null, body.image_url ?? null, body.sort_order ?? 0
  )
  return c.json({ id: result.meta.last_row_id }, 201)
})

membersRoute.put('/:id', auth, async (c) => {
  const id = c.req.param('id')
  const existing = await queryOne<Member>(c, 'SELECT * FROM members WHERE id = ?', id)
  if (!existing) return c.json({ error: 'Membro não encontrado' }, 404)

  const body = await c.req.json<Partial<Member>>()
  await execute(c,
    `UPDATE members SET name = ?, subtitle = ?, teaser = ?, bio = ?, location = ?, links = ?, image_url = ?, sort_order = ?, updated_at = datetime('now')
     WHERE id = ?`,
    body.name ?? existing.name, body.subtitle ?? existing.subtitle, body.teaser ?? existing.teaser,
    body.bio ?? existing.bio, body.location ?? existing.location, body.links ?? existing.links,
    body.image_url ?? existing.image_url, body.sort_order ?? existing.sort_order, id
  )
  return c.json({ message: 'Membro atualizado' })
})

membersRoute.delete('/:id', auth, async (c) => {
  const id = c.req.param('id')
  const existing = await queryOne<Member>(c, 'SELECT * FROM members WHERE id = ?', id)
  if (!existing) return c.json({ error: 'Membro não encontrado' }, 404)

  await execute(c, 'DELETE FROM members WHERE id = ?', id)
  return c.json({ message: 'Membro deletado' })
})
