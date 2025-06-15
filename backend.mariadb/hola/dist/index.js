import { Hono } from 'hono';
import { serve } from '@hono/node-server';
import greetRoutes from './greet/greet';
const app = new Hono();
app.get('/', (c) => c.text('¡Hola desde Hono en Node.js conectado a RDS!'));
// Monta las rutas importadas en /api por ejemplo
app.route('/api', greetRoutes);
serve({
    fetch: app.fetch,
    port: 3000,
}, () => {
    console.log('Servidor escuchando en http://localhost:3000');
});
