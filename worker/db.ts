import type { Context } from 'hono'
import type { Env } from './index'

export function getDB(c: Context<Env>): D1Database {
  return c.env.DB
}

function bindExact(s: D1PreparedStatement, params: unknown[]): D1PreparedStatement {
  return params.length ? s.bind(...params) : s
}

export async function query<T = unknown>(c: Context<Env>, sql: string, ...params: unknown[]): Promise<T[]> {
  const result = await bindExact(getDB(c).prepare(sql), params).all<T>()
  return result.results
}

export async function queryOne<T = unknown>(c: Context<Env>, sql: string, ...params: unknown[]): Promise<T | null> {
  const rows = await query<T>(c, sql, ...params)
  return rows[0] ?? null
}

export async function execute(c: Context<Env>, sql: string, ...params: unknown[]): Promise<D1Result> {
  return bindExact(getDB(c).prepare(sql), params).run()
}
