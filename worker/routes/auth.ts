import { Hono } from 'hono'
import type { Env } from '../index'
import { auth, adminOnly, createSession, destroySession } from '../middleware/auth'
import { rateLimit } from '../middleware/rate-limit'
import { query, queryOne, execute } from '../db'
import type { User } from '../types'

export const authRoute = new Hono<Env>()

const loginRateLimit = rateLimit({ prefix: 'login', max: 10, windowMs: 60_000 })
const registerRateLimit = rateLimit({ prefix: 'register', max: 5, windowMs: 60_000 })

async function hashPassword(password: string, salt?: string): Promise<{ hash: string; salt: string }> {
  const encoder = new TextEncoder()
  const s = salt || crypto.randomUUID()
  const keyMaterial = await crypto.subtle.importKey(
    'raw', encoder.encode(password), 'PBKDF2', false, ['deriveBits']
  )
  const bits = await crypto.subtle.deriveBits(
    { name: 'PBKDF2', salt: encoder.encode(s), iterations: 100000, hash: 'SHA-256' },
    keyMaterial, 256
  )
  const hash = btoa(String.fromCharCode(...new Uint8Array(bits)))
  return { hash, salt: s }
}

async function verifyPassword(password: string, hash: string, salt: string): Promise<boolean> {
  const { hash: h } = await hashPassword(password, salt)
  return h === hash
}

// POST /auth/register — só funciona enquanto não existir nenhum usuário (bootstrap
// do único admin do site). Depois disso o cadastro fica fechado: sem essa trava,
// qualquer visitante público poderia se registrar e ganhar acesso de escrita total
// (não existe hoje nenhuma rota que diferencie admin de viewer na prática).
authRoute.post('/register', registerRateLimit, async (c) => {
  const { username, password } = await c.req.json<{ username?: string; password?: string }>().catch(() => ({}) as any)

  if (!username || !password) {
    return c.json({ error: 'Usuário e senha são obrigatórios' }, 400)
  }
  if (username.length < 3) {
    return c.json({ error: 'Usuário deve ter pelo menos 3 caracteres' }, 400)
  }
  if (password.length < 6) {
    return c.json({ error: 'Senha deve ter pelo menos 6 caracteres' }, 400)
  }

  const userCount = await queryOne<{ count: number }>(c, 'SELECT COUNT(*) as count FROM users')
  if ((userCount?.count || 0) > 0) {
    return c.json({ error: 'Cadastro fechado — já existe um administrador configurado' }, 403)
  }

  // Verifica se já existe
  const existing = await queryOne<User>(c, 'SELECT id FROM users WHERE username = ?', username)
  if (existing) {
    return c.json({ error: 'Usuário já existe' }, 409)
  }

  // Primeiro (e único) usuário do site vira admin
  const role = 'admin'

  const { hash, salt } = await hashPassword(password)
  await execute(c,
    'INSERT INTO users (username, password_hash, salt, role) VALUES (?, ?, ?, ?)',
    username, hash, salt, role
  )

  const user = await queryOne<User>(c, 'SELECT * FROM users WHERE username = ?', username)
  if (!user) return c.json({ error: 'Erro ao criar usuário' }, 500)

  await createSession(c, user)
  return c.json({ message: 'Conta criada', role: user.role }, 201)
})

// POST /auth/login
authRoute.post('/login', loginRateLimit, async (c) => {
  const { username, password } = await c.req.json<{ username?: string; password?: string }>().catch(() => ({}) as any)

  if (!username || !password) {
    return c.json({ error: 'Usuário e senha são obrigatórios' }, 400)
  }

  const user = await queryOne<User>(c, 'SELECT * FROM users WHERE username = ?', username)
  if (!user) {
    return c.json({ error: 'Credenciais inválidas' }, 401)
  }

  const valid = await verifyPassword(password, user.password_hash, user.salt)
  if (!valid) {
    return c.json({ error: 'Credenciais inválidas' }, 401)
  }

  await createSession(c, user)
  return c.json({ message: 'Login realizado', role: user.role })
})

// POST /auth/logout
authRoute.post('/logout', async (c) => {
  await destroySession(c)
  return c.json({ message: 'Logout realizado' })
})

// GET /auth/me
authRoute.get('/me', auth, async (c) => {
  const user = c.get('user')
  return c.json({ username: user.username, role: user.role })
})
