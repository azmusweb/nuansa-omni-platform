import { Hono } from 'hono';

const app = new Hono();

app.get('/', (c) => {
  return c.text('Nuansa Studio - Workspace Tenant v1.0');
});

export default app;
