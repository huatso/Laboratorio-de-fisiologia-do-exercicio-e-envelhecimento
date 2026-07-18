import { createMiddleware } from 'hono/factory'
import type { Env } from '../index'

export function rateLimit(opts: { prefix: string; max: number; windowMs: number }) {
  return createMiddleware<Env>(async (c, next) => {
    const ip = c.req.header('cf-connecting-ip') || c.req.header('x-forwarded-for') || 'unknown'
    const key = `rl:${opts.prefix}:${ip}`

    const now = Date.now()
    const data = await c.env.KV.get(key)
    const records: number[] = data ? JSON.parse(data) : []
    const filtered = records.filter(t => now - t < opts.windowMs)

    if (filtered.length >= opts.max) {
      return c.json({ error: 'Muitas tentativas, tente novamente em instantes' }, 429)
    }

    filtered.push(now)
    await c.env.KV.put(key, JSON.stringify(filtered), { expirationTtl: Math.ceil(opts.windowMs / 1000) })
    await next()
  })
}
