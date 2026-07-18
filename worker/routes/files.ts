import { Hono } from 'hono'
import type { Env } from '../index'

export const filesRoute = new Hono<Env>()

function isInlineSafe(mimeType: string | null | undefined): boolean {
  return !!mimeType && mimeType.startsWith('image/') && mimeType !== 'image/svg+xml'
}

filesRoute.get('/:category/:filename', async (c) => {
  const key = `${c.req.param('category')}/${c.req.param('filename')}`

  const object = await c.env.R2.get(key)
  if (!object) {
    return c.text('Not Found', 404)
  }

  const headers = new Headers()
  object.writeHttpMetadata(headers)
  headers.set('Cache-Control', 'public, max-age=31536000, immutable')
  headers.set('X-Content-Type-Options', 'nosniff')

  // Qualquer coisa que não seja imagem raster reconhecida (inclusive SVG, que
  // pode conter <script>) é sempre forçada como download — nunca renderizada
  // inline no mesmo domínio do site.
  if (!isInlineSafe(object.httpMetadata?.contentType)) {
    const originalName = (object.customMetadata?.originalName || c.req.param('filename')).replace(/["\r\n]/g, '_')
    headers.set('Content-Disposition', `attachment; filename="${originalName}"`)
  }

  return new Response(object.body, { headers })
})
