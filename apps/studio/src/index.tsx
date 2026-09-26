import { Hono } from 'hono'
import { jsxRenderer } from 'hono/jsx-renderer'
import { Dashboard } from './pages/Dashboard'
import { Posts } from './pages/Posts'
import { WritePost } from './pages/WritePost'
import { Appearance } from './pages/Appearance'
import { Gallery } from './pages/Gallery'
import { Vault } from './pages/Vault'
import { Settings } from './pages/Settings'
import { Redirects } from './pages/Redirects'
import { Billing } from './pages/Billing'
import { Tools } from './pages/Tools'
import { Audit } from './pages/Audit'
import { Products } from './pages/Products'
import { Orders } from './pages/Orders'
import { Learn } from './pages/Learn'
import { Lessons } from './pages/Lessons'
import { Login } from './pages/Login'
import { Domains } from './pages/Domains'
import { createDb, tenants, users, transactions, products } from '@nuansa/db'
import { desc, eq } from 'drizzle-orm'
import type { FC } from 'hono/jsx'
import { getCookie, setCookie, deleteCookie } from 'hono/cookie'
import { sign, verify } from 'hono/jwt'

const JWT_SECRET = 'nuansa_super_secret_key_2026'

type Bindings = {
 VAULT_BUCKET: R2Bucket
 DB: D1Database
 MASTER_DB: D1Database
}

const app = new Hono<{ Bindings: Bindings }>()

// Middleware Autentikasi
app.use('*', async (c, next) => {
 const path = c.req.path
 if (path === '/login' || path === '/api/login' || path.startsWith('/assets')) {
 return next()
 }

 const token = getCookie(c, 'auth_token')
 if (!token) {
 console.log('Middleware redirect: No auth_token cookie')
 return c.redirect('/login')
 }

 try {
 const payload = await verify(token, JWT_SECRET, 'HS256') as any
 
 // Default to the tenant from JWT
 let activeTenantId = payload.tenantId

 // But if they have an active_tenant cookie, use that
 const activeCookie = getCookie(c, 'active_tenant')
 if (activeCookie) activeTenantId = activeCookie

 // Fetch all tenants owned by this user (or where they are the primary tenant)
 const { results: myTenants } = await c.env.MASTER_DB.prepare(
 "SELECT id, name FROM tenants WHERE owner_id = ? OR id = ?"
 ).bind(payload.userId || '', payload.tenantId || '').all()
 
 // Ensure activeTenantId is valid for this user
 const validTenant = myTenants.find((t: any) => t.id === activeTenantId)
 if (!validTenant && myTenants.length > 0) {
 activeTenantId = (myTenants[0] as any).id
 }

 c.set('user', { ...payload, tenantId: activeTenantId })
 c.set('myTenants', myTenants || [])
 c.set('activeTenant', validTenant || (myTenants && myTenants[0]) || null)

 return next()
 } catch (e) {
 console.error('Middleware redirect: Verify failed', e)
 deleteCookie(c, 'auth_token', { path: '/' })
 return c.redirect('/login')
 }
})

// Rute Landing Page (UI)
app.get('/', (c) => c.redirect('/dashboard'))

// --- RUTE AUTHENTIKASI ---
app.get('/login', (c) => c.html(<Login />))

app.post('/api/login', async (c) => {
 try {
 const body = await c.req.parseBody()
 const email = (body['email'] as string || '').trim().toLowerCase()
 const password = (body['password'] as string || '').trim()

 if (!email || !password) {
 return c.html(<Login error="Email dan kata sandi wajib diisi" />)
 }

 // Hash password input
 const msgUint8 = new TextEncoder().encode(password)
 const hashBuffer = await crypto.subtle.digest('SHA-256', msgUint8)
 const hashArray = Array.from(new Uint8Array(hashBuffer))
 const hashedPassword = hashArray.map((b) => b.toString(16).padStart(2, '0')).join('')

 // Cari user di MASTER_DB
 const user = await c.env.MASTER_DB.prepare(
 "SELECT id, tenant_id, role, password FROM users WHERE email = ?"
 ).bind(email).first<any>()

 if (!user || user.password !== hashedPassword) {
 return c.html(<Login error="Email atau kata sandi salah" />)
 }
 
 // Cek status tenant
 const tenant = await c.env.MASTER_DB.prepare(
 "SELECT status, expires_at FROM tenants WHERE id = ?"
 ).bind(user.tenant_id).first<any>()

 if (!tenant) {
 return c.html(<Login error="Data tenant tidak ditemukan." />)
 }
 
 if (tenant.status === 'suspended') {
 return c.html(<Login error="Akun klien ini telah ditangguhkan. Hubungi administrator." />)
 }

 if (tenant.expires_at && tenant.expires_at < Date.now()) {
 return c.html(<Login error="Masa aktif akun klien ini telah habis. Hubungi administrator." />)
 }

 // Generate JWT
 const tenantIdentifier = user.tenant_id || user.tenantId || ''
 const userIdentifier = user.id || user.userId || ''
 
 const token = await sign({
 userId: userIdentifier,
 tenantId: tenantIdentifier,
 role: user.role,
 exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 7 // 7 hari
 }, JWT_SECRET, 'HS256')

 setCookie(c, 'auth_token', token, {
 httpOnly: true,
 path: '/',
 maxAge: 60 * 60 * 24 * 7
 })

 return c.redirect('/dashboard')
 } catch (e) {
 console.error('Login error:', e)
 return c.html(<Login error="Terjadi kesalahan pada server. Silakan coba lagi nanti." />)
 }
})

app.get('/api/logout', (c) => {
 deleteCookie(c, 'auth_token')
 return c.redirect('/login')
})

app.get('/api/me', (c) => {
 return c.json({
 user: c.get('user'),
 myTenants: c.get('myTenants'),
 activeTenant: c.get('activeTenant')
 })
})

app.post('/api/switch-tenant', async (c) => {
 const body = await c.req.parseBody()
 const tenantId = body['tenant_id'] as string
 if (tenantId) {
 setCookie(c, 'active_tenant', tenantId, {
 httpOnly: true,
 secure: c.req.url.startsWith('https://'),
 sameSite: 'Lax',
 path: '/',
 maxAge: 60 * 60 * 24 * 7
 })
 }
 return c.redirect('/dashboard')
})

app.post('/api/create-tenant', async (c) => {
 const user = c.get('user') as any
 const body = await c.req.parseBody()
 const name = body['name'] as string
 
 if (name) {
 const newTenantId = crypto.randomUUID()
 await c.env.MASTER_DB.prepare(
 "INSERT INTO tenants (id, name, owner_id, plan, created_at) VALUES (?, ?, ?, ?, ?)"
 ).bind(newTenantId, name, user.userId, 'gratis', Date.now()).run()
 
 // Auto switch to new tenant
 setCookie(c, 'active_tenant', newTenantId, {
 httpOnly: true, secure: true, sameSite: 'Lax', path: '/', maxAge: 60 * 60 * 24 * 7
 })
 }
 return c.redirect('/dashboard')
})

// --- RUTE HALAMAN UI ---

app.get('/dashboard', async (c) => {
 try {
 const user = c.get('user') as any;
 const { results: postCountResult } = await c.env.DB.prepare("SELECT COUNT(*) as count FROM posts WHERE tenant_id = ?").bind(user.tenantId).all()
 const postCount = (postCountResult[0] as any)?.count || 0
 const { results: recentPosts } = await c.env.DB.prepare("SELECT title, created_at FROM posts WHERE tenant_id = ? ORDER BY created_at DESC LIMIT 3").bind(user.tenantId).all()

 let totalBytes = 0
 let totalViews = 0
 try {
 const { results: mediaResults } = await c.env.DB.prepare("SELECT SUM(size) as total FROM media WHERE tenant_id = ?").bind(user.tenantId).all()
 totalBytes = (mediaResults[0] as any)?.total || 0
 
 const { results: viewResults } = await c.env.DB.prepare("SELECT SUM(views) as total FROM analytics WHERE tenant_id = ?").bind(user.tenantId).all()
 totalViews = (viewResults[0] as any)?.total || 0
 } catch (e) {
 // ignore if tables not ready
 }
 
 const mediaMB = (totalBytes / 1024 / 1024).toFixed(2)

 const stats = {
 visitors: totalViews.toString(),
 posts: postCount.toString(),
 media: `${mediaMB} MB`
 }
 return c.html(<Dashboard currentPath={c.req.path} stats={stats} recentPosts={recentPosts} />)
 } catch (e) {
 return c.html(<Dashboard currentPath={c.req.path} stats={{visitors: '0', posts: '0', media: '0 MB'}} recentPosts={[]} />)
 }
})

app.get('/posts', async (c) => {
 try {
 const user = c.get('user') as any;
 const { results } = await c.env.DB.prepare("SELECT * FROM posts WHERE tenant_id = ? ORDER BY created_at DESC").bind(user.tenantId).all()
 return c.html(<Posts currentPath={c.req.path} posts={results} />)
 } catch (e) {
 return c.html(<Posts currentPath={c.req.path} posts={[]} />)
 }
})

app.get('/posts/new', async (c) => {
 return c.html(<WritePost currentPath="/posts" />)
})

app.get('/posts/edit/:id', async (c) => {
 try {
 const user = c.get('user') as any;
 const id = c.req.param('id')
 const { results } = await c.env.DB.prepare("SELECT * FROM posts WHERE id = ? AND tenant_id = ?").bind(id, user.tenantId).all()
 const post = results[0]
 if (!post) {
 return c.redirect('/posts')
 }
 return c.html(<WritePost currentPath="/posts" post={post} />)
 } catch (e) {
 return c.redirect('/posts')
 }
})

app.get('/appearance', async (c) => {
 try {
 const user = c.get('user') as any;
 const { results } = await c.env.DB.prepare("SELECT * FROM settings WHERE tenant_id = ?").bind(user.tenantId).all()
 const settings = results.reduce((acc: any, curr: any) => {
 acc[curr.key] = curr.value
 return acc
 }, {})
 return c.html(<Appearance currentPath={c.req.path} settings={settings} />)
 } catch (e) {
 return c.html(<Appearance currentPath={c.req.path} settings={{}} />)
 }
})

app.get('/gallery', async (c) => {
 return c.html(<Gallery currentPath={c.req.path} />)
})

app.get('/vault', async (c) => {
 try {
 const user = c.get('user') as any;
 const { results } = await c.env.DB.prepare("SELECT * FROM media WHERE tenant_id = ? ORDER BY created_at DESC").bind(user.tenantId).all()
 return c.html(<Vault currentPath={c.req.path} files={results as any[]} />)
 } catch (e) {
 console.error('Failed to load media from DB:', e)
 return c.html(<Vault currentPath={c.req.path} files={[]} />)
 }
})

app.get('/domains', async (c) => {
 try {
 const user = c.get('user') as any;
 const { results } = await c.env.DB.prepare("SELECT * FROM domains WHERE tenant_id = ? ORDER BY created_at DESC").bind(user.tenantId).all()
 return c.html(<Domains currentPath={c.req.path} domains={results as any[]} />)
 } catch (e) {
 console.error('Failed to load domains from DB:', e)
 return c.html(<Domains currentPath={c.req.path} domains={[]} />)
 }
})

app.post('/api/domains', async (c) => {
 try {
 const user = c.get('user') as any;
 const body = await c.req.json()
 const domain = body.domain?.trim().toLowerCase()
 
 if (!domain) {
 return c.json({ error: 'Domain wajib diisi' }, 400)
 }

 // Insert domain to master DB
 await c.env.DB.prepare(
 "INSERT INTO domains (id, tenant_id, domain, is_active, created_at, updated_at) VALUES (?, ?, ?, 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)"
 ).bind(crypto.randomUUID(), user.tenantId, domain).run()

 return c.json({ success: true })
 } catch (e: any) {
 console.error(e)
 if (e.message?.includes('UNIQUE constraint failed')) {
 return c.json({ error: 'Domain sudah digunakan' }, 400)
 }
 return c.json({ error: 'Terjadi kesalahan pada server' }, 500)
 }
})

app.delete('/api/domains/:id', async (c) => {
 try {
 const user = c.get('user') as any;
 const domainId = c.req.param('id')
 
 await c.env.DB.prepare("DELETE FROM domains WHERE id = ? AND tenant_id = ?").bind(domainId, user.tenantId).run()
 
 return c.json({ success: true })
 } catch (e) {
 return c.json({ error: 'Terjadi kesalahan pada server' }, 500)
 }
})

app.get('/tools', async (c) => {
 return c.html(<Tools currentPath={c.req.path} />)
})

app.get('/audit', async (c) => {
 return c.html(<Audit currentPath={c.req.path} />)
})

app.get('/products', async (c) => {
 try {
 const user = c.get('user') as any;
 const db = createDb(c.env.DB)
 const allProducts = await db.select().from(products).where(eq(products.tenantId, user.tenantId)).orderBy(desc(products.createdAt))
 return c.html(<Products currentPath={c.req.path} products={allProducts} />)
 } catch (e) {
 console.error(e)
 return c.text('Error', 500)
 }
})

app.post('/api/products', async (c) => {
 try {
 const user = c.get('user') as any;
 const db = createDb(c.env.DB)
 const body = await c.req.parseBody()
 
 await db.insert(products).values({
 id: crypto.randomUUID(),
 tenantId: user.tenantId,
 name: body['name'] as string,
 price: parseInt(body['price'] as string) || 0,
 description: body['description'] as string,
 stock: body['stock'] ? parseInt(body['stock'] as string) : null,
 imageUrl: body['imageUrl'] as string || null,
 createdAt: new Date(),
 })
 
 return c.redirect('/products')
 } catch (error) {
 console.error(error)
 return c.text('Error', 500)
 }
})

app.get('/orders', async (c) => {
 try {
 const user = c.get('user') as any;
 const { results } = await c.env.DB.prepare("SELECT * FROM orders WHERE tenant_id = ? ORDER BY created_at DESC").bind(user.tenantId).all()
 return c.html(<Orders currentPath={c.req.path} orders={results as any[]} />)
 } catch (e) {
 console.error(e)
 return c.html(<Orders currentPath={c.req.path} orders={[]} />)
 }
})

app.post('/api/upgrade', async (c) => {
 try {
 const body = await c.req.parseBody()
 const targetPlan = body['target_plan'] as string
 
 const user = c.get('user') as any;
 const txId = crypto.randomUUID()
 const tenantId = user.tenantId
 
 await c.env.DB.prepare(
 "INSERT INTO transactions (id, tenant_id, type, amount, status, details) VALUES (?, ?, ?, ?, ?, ?)"
 ).bind(
 txId,
 tenantId,
 'plan_upgrade',
 0,
 'pending',
 JSON.stringify({ target_plan: targetPlan })
 ).run()

 return c.redirect('/settings?upgrade_requested=true')
 } catch (e) {
 console.error(e)
 return c.text('Error', 500)
 }
})

app.post('/api/orders', async (c) => {
 try {
 const user = c.get('user') as any;
 const body = await c.req.parseBody()
 const id = body['id'] as string
 const status = body['status'] as string
 if (id && status) {
 await c.env.DB.prepare("UPDATE orders SET status = ? WHERE id = ? AND tenant_id = ?").bind(status, id, user.tenantId).run()
 }
 return c.redirect('/orders')
 } catch (e) {
 return c.text('Error', 500)
 }
})

// --- NUANSA LEARN ROUTES ---

app.get('/learn', async (c) => {
 try {
 const user = c.get('user') as any;
 const { results } = await c.env.DB.prepare(
 "SELECT c.*, (SELECT COUNT(*) FROM lessons l WHERE l.course_id = c.id AND l.tenant_id = ?) as lesson_count FROM courses c WHERE c.tenant_id = ? ORDER BY c.created_at DESC"
 ).bind(user.tenantId, user.tenantId).all()
 return c.html(<Learn currentPath={c.req.path} courses={results as any[]} />)
 } catch (e) {
 return c.html(<Learn currentPath={c.req.path} courses={[]} />)
 }
})

app.get('/learn/:courseId/lessons', async (c) => {
 try {
 const user = c.get('user') as any;
 const courseId = c.req.param('courseId')
 const course: any = await c.env.DB.prepare("SELECT * FROM courses WHERE id = ? AND tenant_id = ?").bind(courseId, user.tenantId).first()
 if (!course) return c.redirect('/learn')
 const { results: lessons } = await c.env.DB.prepare("SELECT * FROM lessons WHERE course_id = ? AND tenant_id = ? ORDER BY order_index ASC").bind(courseId, user.tenantId).all()
 return c.html(<Lessons currentPath={c.req.path} course={course} lessons={lessons as any[]} />)
 } catch (e) {
 return c.redirect('/learn')
 }
})

app.post('/api/learn/course', async (c) => {
 try {
 const user = c.get('user') as any;
 const body = await c.req.parseBody()
 const id = body['id'] as string
 const title = body['title'] as string
 const description = body['description'] as string
 const cover_image = body['cover_image'] as string
 const price = parseInt(body['price'] as string) || 0
 const is_published = body['is_published'] === '1' ? 1 : 0
 if (id) {
 await c.env.DB.prepare(
 "UPDATE courses SET title=?, description=?, cover_image=?, price=?, is_published=? WHERE id=? AND tenant_id=?"
 ).bind(title, description||null, cover_image||null, price, is_published, id, user.tenantId).run()
 } else {
 const newId = crypto.randomUUID()
 const slug = title.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/(^-|-$)+/g,'') + '-' + Date.now().toString().slice(-4)
 await c.env.DB.prepare(
 "INSERT INTO courses (id, tenant_id, title, slug, description, cover_image, price, is_published) VALUES (?,?,?,?,?,?,?,?)"
 ).bind(newId, user.tenantId, title, slug, description||null, cover_image||null, price, is_published).run()
 }
 return c.redirect('/learn')
 } catch (e) {
 console.error(e)
 return c.text('Error', 500)
 }
})

app.post('/api/learn/course/delete', async (c) => {
 try {
 const user = c.get('user') as any;
 const body = await c.req.parseBody()
 const id = body['id'] as string
 await c.env.DB.prepare("DELETE FROM lessons WHERE course_id = ? AND tenant_id = ?").bind(id, user.tenantId).run()
 await c.env.DB.prepare("DELETE FROM courses WHERE id = ? AND tenant_id = ?").bind(id, user.tenantId).run()
 return c.redirect('/learn')
 } catch (e) {
 return c.text('Error', 500)
 }
})

app.post('/api/learn/lesson', async (c) => {
 try {
 const user = c.get('user') as any;
 const body = await c.req.parseBody()
 const id = body['id'] as string
 const course_id = body['course_id'] as string
 const title = body['title'] as string
 const content = body['content'] as string
 const order_index = parseInt(body['order_index'] as string) || 0
 const is_preview = body['is_preview'] === '1' ? 1 : 0
 if (id) {
 await c.env.DB.prepare(
 "UPDATE lessons SET title=?, content=?, order_index=?, is_preview=? WHERE id=? AND tenant_id=?"
 ).bind(title, content||null, order_index, is_preview, id, user.tenantId).run()
 } else {
 await c.env.DB.prepare(
 "INSERT INTO lessons (id, tenant_id, course_id, title, content, order_index, is_preview) VALUES (?,?,?,?,?,?,?)"
 ).bind(crypto.randomUUID(), user.tenantId, course_id, title, content||null, order_index, is_preview).run()
 }
 return c.redirect(`/learn/${course_id}/lessons`)
 } catch (e) {
 console.error(e)
 return c.text('Error', 500)
 }
})

app.post('/api/learn/lesson/delete', async (c) => {
 try {
 const user = c.get('user') as any;
 const body = await c.req.parseBody()
 const id = body['id'] as string
 const course_id = body['course_id'] as string
 await c.env.DB.prepare("DELETE FROM lessons WHERE id = ? AND tenant_id = ?").bind(id, user.tenantId).run()
 return c.redirect(`/learn/${course_id}/lessons`)
 } catch (e) {
 return c.text('Error', 500)
 }
})

app.get('/settings', async (c) => {
 const isSaved = c.req.query('saved') === 'true'
 const upgradeRequested = c.req.query('upgrade_requested') === 'true'
 try {
 const user = c.get('user') as any;
 const { results } = await c.env.DB.prepare("SELECT * FROM settings WHERE tenant_id = ?").bind(user.tenantId).all()
 const settings = results.reduce((acc: any, curr: any) => {
 acc[curr.key] = curr.value
 return acc
 }, {})
 return c.html(<Settings currentPath={c.req.path} settings={settings} isSaved={isSaved} upgradeRequested={upgradeRequested} />)
 } catch (e) {
 return c.html(<Settings currentPath={c.req.path} settings={{}} isSaved={isSaved} upgradeRequested={upgradeRequested} />)
 }
})

app.get('/redirects', async (c) => {
 try {
 const user = c.get('user') as any;
 const { results } = await c.env.DB.prepare("SELECT * FROM redirects WHERE tenant_id = ? ORDER BY created_at DESC").bind(user.tenantId).all()
 return c.html(<Redirects currentPath={c.req.path} redirects={results} />)
 } catch (e) {
 return c.html(<Redirects currentPath={c.req.path} redirects={[]} />)
 }
})

app.get('/billing', async (c) => {
 try {
 const db = createDb(c.env.MASTER_DB)
 // Untuk prototipe kita ambil tenant pertama atau mock
 const allTenants = await db.select().from(tenants).limit(1)
 const currentTenant = allTenants[0]

 let txs: any[] = []
 if (currentTenant) {
 txs = await db.select().from(transactions).where((eq: any) => eq(transactions.tenantId, currentTenant.id))
 }

 return c.html(<Billing currentPath={c.req.path} plan={currentTenant?.plan || 'gratis'} transactions={txs} />)
 } catch (e) {
 console.error(e)
 return c.html(<Billing currentPath={c.req.path} plan="gratis" transactions={[]} />)
 }
})

// --- RUTE API (R2 STORAGE) ---

app.post('/api/upload', async (c) => {
 const body = await c.req.parseBody()
 const file = body['file'] as File
 if (!file || !file.size) return c.text('Tidak ada file', 400)

 const key = `${Date.now()}-${file.name.replace(/\s+/g, '-')}`
 const hasWatermark = body['has_watermark'] === '1' ? 1 : 0
 
 await c.env.VAULT_BUCKET.put(key, await file.arrayBuffer(), {
 httpMetadata: { contentType: file.type }
 })
 
 try {
 const user = c.get('user') as any;
 await c.env.DB.prepare(
 "INSERT INTO media (id, tenant_id, filename, url, type, size, has_watermark) VALUES (?, ?, ?, ?, ?, ?, ?)"
 ).bind(crypto.randomUUID(), user.tenantId, file.name, `/media/${key}`, file.type, file.size, hasWatermark).run()
 } catch(e) {
 console.error('Failed to save media metadata:', e)
 }

 return c.redirect('/vault')
})

app.post('/api/vault/delete', async (c) => {
 const user = c.get('user') as any;
 const body = await c.req.parseBody()
 const id = body['id'] as string
 const url = body['url'] as string
 
 if (url) {
 const key = url.replace('/media/', '')
 await c.env.VAULT_BUCKET.delete(key)
 }
 if (id) {
 await c.env.DB.prepare("DELETE FROM media WHERE id = ? AND tenant_id = ?").bind(id, user.tenantId).run()
 }
 return c.redirect('/vault')
})

app.get('/media/:key', async (c) => {
 const key = c.req.param('key')
 const object = await c.env.VAULT_BUCKET.get(key)
 
 if (!object) return c.text('Not found', 404)
 
 const headers = new Headers()
 object.writeHttpMetadata(headers)
 headers.set('etag', object.httpEtag)
 headers.set('Cache-Control', 'public, max-age=31536000')
 
 return new Response(object.body, { headers })
})

// --- RUTE API (D1 DATABASE) ---

app.post('/api/posts', async (c) => {
 const user = c.get('user') as any;
 const body = await c.req.parseBody()
 const id = body['id'] as string
 const title = body['title'] as string
 const content = body['content'] as string
 const metadata = body['metadata'] as string // JSON string dari Nuansa Fields
 const status = body['status'] as string || 'draft'
 const is_premium = body['is_premium'] === '1' ? 1 : 0
 const price = parseInt(body['price'] as string) || 0
 const action = body['action'] as string // 'delete' or 'save'
 
 if (action === 'delete' && id) {
 await c.env.DB.prepare("DELETE FROM posts WHERE id = ? AND tenant_id = ?").bind(id, user.tenantId).run()
 return c.redirect('/posts')
 }

 if (!title) return c.text('Judul diperlukan', 400)

 if (id) {
 await c.env.DB.prepare(
 "UPDATE posts SET title = ?, content = ?, metadata = ?, status = ?, is_premium = ?, price = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ? AND tenant_id = ?"
 ).bind(title, content, metadata || null, status, is_premium, price, id, user.tenantId).run()
 } else {
 const newId = crypto.randomUUID()
 const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '') + '-' + Date.now().toString().slice(-4)
 await c.env.DB.prepare(
 "INSERT INTO posts (id, tenant_id, title, slug, content, metadata, status, is_premium, price) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)"
 ).bind(newId, user.tenantId, title, slug, content || '', metadata || null, status, is_premium, price).run()
 }
 
 return c.redirect('/posts')
})

app.post('/api/settings', async (c) => {
 const user = c.get('user') as any;
 const body = await c.req.parseBody()
 
 const statements = []
 for (const [key, value] of Object.entries(body)) {
 if (typeof value === 'string') {
 if (value.trim() !== '') {
 statements.push(
 c.env.DB.prepare(
 "INSERT INTO settings (key, tenant_id, value) VALUES (?, ?, ?) ON CONFLICT(key) DO UPDATE SET value = ?"
 ).bind(key, user.tenantId, value, value)
 )
 } else {
 statements.push(
 c.env.DB.prepare("DELETE FROM settings WHERE key = ? AND tenant_id = ?").bind(key, user.tenantId)
 )
 }
 }
 }

 if (statements.length > 0) {
 await c.env.DB.batch(statements)
 }
 
 const redirectUrl = body['redirectUrl'] as string || '/appearance'
 return c.redirect(redirectUrl)
})

app.post('/api/redirects', async (c) => {
 const user = c.get('user') as any;
 const body = await c.req.parseBody()
 const id = body['id'] as string
 const source_url = body['source_url'] as string
 const target_url = body['target_url'] as string
 const status_code = parseInt((body['status_code'] as string) || '301', 10)
 const action = body['action'] as string

 if (action === 'delete' && id) {
 await c.env.DB.prepare("DELETE FROM redirects WHERE id = ? AND tenant_id = ?").bind(id, user.tenantId).run()
 } else if (source_url && target_url) {
 const newId = id || crypto.randomUUID()
 if (id) {
 await c.env.DB.prepare(
 "UPDATE redirects SET source_url = ?, target_url = ?, status_code = ? WHERE id = ? AND tenant_id = ?"
 ).bind(source_url, target_url, status_code, id, user.tenantId).run()
 } else {
 await c.env.DB.prepare(
 "INSERT INTO redirects (id, tenant_id, source_url, target_url, status_code) VALUES (?, ?, ?, ?, ?)"
 ).bind(newId, user.tenantId, source_url, target_url, status_code).run()
 }
 }

 return c.redirect('/redirects')
})

app.post('/api/buy', async (c) => {
 try {
 const db = createDb(c.env.MASTER_DB)
 // Ambil tenant (mock tenant id)
 const allTenants = await db.select().from(tenants).limit(1)
 const currentTenant = allTenants[0]

 if (!currentTenant) return c.text('Tenant not found', 404)

 const body = await c.req.parseBody()
 const type = body['type'] as string
 const details = body['details'] as string

 await db.insert(transactions).values({
 id: crypto.randomUUID(),
 tenantId: currentTenant.id,
 type: type,
 details: details,
 status: 'pending',
 createdAt: new Date(),
 })

 return c.redirect('/billing')
 } catch (e) {
 console.error(e)
 return c.text('Internal Server Error', 500)
 }
})

app.post('/api/import-wp', async (c) => {
 try {
 const body = await c.req.parseBody()
 const file = body['file'] as File
 if (!file || !file.size) return c.text('File XML diperlukan', 400)

 const xml = await file.text()
 
 // Sangat sederhana (regex based) untuk kebutuhan migrasi dasar MVP
 const items = [...xml.matchAll(/<item>([\s\S]*?)<\/item>/g)]
 
 const statements = []
 
 for (const match of items) {
 const itemXml = match[1]
 const postTypeMatch = itemXml.match(/<wp:post_type><!\[CDATA\[(.*?)\]\]><\/wp:post_type>/)
 const postType = postTypeMatch ? postTypeMatch[1] : 'post'
 
 // Hanya ambil article (post)
 if (postType !== 'post') continue;

 const titleMatch = itemXml.match(/<title>(.*?)<\/title>/)
 let title = titleMatch ? titleMatch[1] : 'Untitled'
 if (title.startsWith('<![CDATA[')) {
 title = title.slice(9, -3)
 }

 const contentMatch = itemXml.match(/<content:encoded><!\[CDATA\[([\s\S]*?)\]\]><\/content:encoded>/)
 const rawHtml = contentMatch ? contentMatch[1] : ''
 
 // Konversi HTML ke block EditorJS (sederhana)
 const editorData = {
 time: Date.now(),
 blocks: [
 {
 type: "paragraph",
 data: { text: rawHtml }
 }
 ],
 version: "2.27.0"
 }

 const slugMatch = itemXml.match(/<wp:post_name><!\[CDATA\[(.*?)\]\]><\/wp:post_name>/)
 const originalSlug = slugMatch ? slugMatch[1] : title.toLowerCase().replace(/[^a-z0-9]+/g, '-')
 const finalSlug = originalSlug + '-' + crypto.randomUUID().slice(0, 4) // prevent collision

 const newId = crypto.randomUUID()
 const user = c.get('user') as any;
 statements.push(
 c.env.DB.prepare(
 "INSERT INTO posts (id, tenant_id, title, slug, content, metadata, status) VALUES (?, ?, ?, ?, ?, ?, 'published')"
 ).bind(newId, user.tenantId, title, finalSlug, JSON.stringify(editorData), null)
 )
 }

 if (statements.length > 0) {
 await c.env.DB.batch(statements)
 }

 return c.redirect('/posts')
 } catch (error) {
 console.error('Import error:', error)
 return c.text('Terjadi kesalahan saat mengimpor data', 500)
 }
})

export default app
