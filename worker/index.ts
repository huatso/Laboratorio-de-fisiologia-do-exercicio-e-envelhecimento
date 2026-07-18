import { Hono } from 'hono'
import { secureHeaders } from 'hono/secure-headers'

import { authRoute } from './routes/auth'
import { membersRoute } from './routes/members'
import { resourcesRoute } from './routes/resources'
import { publicationsRoute } from './routes/publications'
import { uploadRoute } from './routes/upload'
import { filesRoute } from './routes/files'

export type Env = {
  Bindings: {
    DB: D1Database
    KV: KVNamespace
    R2: R2Bucket
    ASSETS: Fetcher
  }
}

const app = new Hono<Env>()

app.onError((err, c) => {
  console.error('Unhandled error:', err.message, err.stack)
  return c.json({ error: err.message || 'Internal Server Error' }, 500)
})

app.use('*', secureHeaders())

app.route('/auth', authRoute)
app.route('/api/members', membersRoute)
app.route('/api/resources', resourcesRoute)
app.route('/api/publications', publicationsRoute)
app.route('/api/upload', uploadRoute)
app.route('/files', filesRoute)

app.all('/api/*', (c) => c.json({ error: 'Not found' }, 404))
app.all('/auth/*', (c) => c.json({ error: 'Not found' }, 404))
app.all('/files/*', (c) => c.json({ error: 'Not found' }, 404))

app.notFound((c) => c.env.ASSETS.fetch(c.req.raw))

export default app
