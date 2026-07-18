import type { Context } from 'hono'
import { createMiddleware } from 'hono/factory'
import { getCookie, setCookie, deleteCookie } from 'hono/cookie'
import type { Env } from '../index'
import type { User } from '../types'

export interface SessionData {
  userId: number
  username: string
  role: 'admin' | 'viewer'
  createdAt: number
}

declare module 'hono' {
  interface ContextVariableMap {
    user: SessionData
  }
}

export const SESSION_COOKIE = 'session'
export const SESSION_TTL_SECONDS = 60 * 60 * 24 * 7 // 7 dias

function randomToken(): string {
  return crypto.randomUUID().replace(/-/g, '') + crypto.randomUUID().replace(/-/g, '')
}

export async function createSession(c: Context<Env>, user: User): Promise<void> {
  const token = randomToken()
  const sessionData: SessionData = {
    userId: user.id,
    username: user.username,
    role: user.role,
    createdAt: Date.now(),
  }
  await c.env.KV.put(`session:${token}`, JSON.stringify(sessionData), {
    expirationTtl: SESSION_TTL_SECONDS,
  })
  setCookie(c, SESSION_COOKIE, token, {
    httpOnly: true,
    sameSite: 'Lax',
    secure: true,
    path: '/',
    maxAge: SESSION_TTL_SECONDS,
  })
}

export async function destroySession(c: Context<Env>): Promise<void> {
  const token = getCookie(c, SESSION_COOKIE)
  if (token) {
    await c.env.KV.delete(`session:${token}`)
  }
  deleteCookie(c, SESSION_COOKIE, { path: '/' })
}

export const auth = createMiddleware<Env>(async (c, next) => {
  const token = getCookie(c, SESSION_COOKIE)
  if (!token) {
    return c.json({ error: 'Não autenticado' }, 401)
  }

  const raw = await c.env.KV.get(`session:${token}`)
  if (!raw) {
    deleteCookie(c, SESSION_COOKIE, { path: '/' })
    return c.json({ error: 'Sessão expirada' }, 401)
  }

  const session: SessionData = JSON.parse(raw)
  c.set('user', session)
  await next()
})

export const adminOnly = createMiddleware<Env>(async (c, next) => {
  const user = c.get('user')
  if (!user || user.role !== 'admin') {
    return c.json({ error: 'Acesso restrito a administradores' }, 403)
  }
  await next()
})
