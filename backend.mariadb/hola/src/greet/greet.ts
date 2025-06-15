import { Hono } from 'hono';
import { GreetService } from './greet.mariadb';

const greet = new Hono();
const service = new GreetService();

greet.get('/regards', async (c) => {
  const data = await service.getAll();
  return c.json(data);
});

greet.get('/greet/:id', async (c) => {
  const id = Number(c.req.param('id'));
  const result = await service.getById(id);
  return c.json(result);
});

greet.post('/greet', async (c) => {
  const body = await c.req.json();
  const result = await service.insert(body.greet, body.language);
  return c.json({ message: 'Insertado correctamente', result });
});

export default greet;
