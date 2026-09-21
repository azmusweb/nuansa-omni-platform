import { Hono } from 'hono';
import { createDb, tenants, users } from '@nuansa/db';

type Bindings = {
  DB: D1Database;
};

const app = new Hono<{ Bindings: Bindings }>();

app.get('/', (c) => {
  return c.text('Nuansa Master API - Command Center v1.0');
});

// Endpoint untuk mendaftarkan Tenant Baru
app.post('/api/tenants', async (c) => {
  try {
    const db = createDb(c.env.DB);
    const body = await c.req.json();
    const { name, email } = body;

    if (!name || !email) {
      return c.json({ error: 'Name and Email are required' }, 400);
    }

    const tenantId = crypto.randomUUID();
    const userId = crypto.randomUUID();
    const now = new Date();

    // Jalankan operasi insert secara berurutan atau menggunakan transaksi (batch)
    // Di D1, kita bisa menggunakan batch API
    await db.batch([
      db.insert(tenants).values({
        id: tenantId,
        name: name,
        plan: 'gratis',
        createdAt: now,
      }),
      db.insert(users).values({
        id: userId,
        tenantId: tenantId,
        email: email,
        role: 'admin',
        createdAt: now,
      })
    ]);

    return c.json({
      success: true,
      message: 'Tenant successfully registered',
      tenantId: tenantId,
      userId: userId
    }, 201);
  } catch (error: any) {
    console.error('Registration error:', error);
    return c.json({ error: 'Internal Server Error', details: error.message }, 500);
  }
});

export default app;
