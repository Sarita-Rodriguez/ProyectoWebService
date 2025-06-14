import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import ping from './ping/ping.mjs'
import open from 'open'

const app = new Hono()

app.get('/', (c) => c.text('¡Hola desde Hono en Node.js!'))

// Montar las rutas del ping
app.route('/', ping)

serve(app, (info) => {
  console.log(`Servidor escuchando en http://localhost:${info.port}`)
  // Abrir el navegador automáticamente en /ping cuando el servidor esté listo
  open(`http://localhost:${info.port}/ping`).catch(console.error)
})
