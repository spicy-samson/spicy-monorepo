import { Hono } from 'hono'

const app = new Hono()

app.get('/', (c) => c.text('Workflow running on Cloudflare Worker! 🚀'))

export default app
