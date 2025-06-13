import { Hono } from 'hono'
//import { handle } from 'hono/aws-lambda'
import ping from './ping/ping'
import { serve } from '@hono/node-server'

const server = new Hono()

server.get('/', (c) => {
  return c.text('Hello Hono!')
})

server.route('/', ping)

const port = 3000
console.log(`Server running on port ${port}`)

serve({
fetch: server.fetch
port
})
