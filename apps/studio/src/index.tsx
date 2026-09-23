import { Hono } from 'hono'
import { jsxRenderer } from 'hono/jsx-renderer'
import { Dashboard } from './pages/Dashboard'
import { Posts } from './pages/Posts'
import { Appearance } from './pages/Appearance'
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
import { createDb, tenants, users, transactions, products } from '@nuansa/db'
import { desc } from 'drizzle-orm'
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
    return c.redirect('/login')
  }

  try {
    const payload = await verify(token, JWT_SECRET)
    c.set('user', payload)
    return next()
  } catch (e) {
    deleteCookie(c, 'auth_token')
    return c.redirect('/login')
  }
})

// Rute Landing Page (UI)
app.get('/', (c) => c.redirect('/dashboard'))

// --- RUTE AUTHENTIKASI ---
app.get('/login', (c) => c.html(<Login />))

app.post('/api/login', async (c) => {
  const body = await c.req.parseBody()
  const email = (body['email'] as string).toLowerCase()
  const password = body['password'] as string

  if (!email || !password) {
    return c.html(<Login error="Email dan kata sandi wajib diisi" />)
  }

  // Hash password input
  const msgUint8 = new TextEncoder().encode(password)
  const hashBuffer = await crypto.subtle.digest('SHA-256', msgUint8)
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  const hashedPassword = hashArray.map((b) => b.toString(16).padStart(2, '0')).join('')

  // Cari user di MASTER_DB dan cek status tenant
  const { results } = await c.env.MASTER_DB.prepare(
    "SELECT u.id, u.tenant_id, u.role, u.password, t.status, t.expires_at FROM users u JOIN tenants t ON u.tenant_id = t.id WHERE u.email = ?"
  ).bind(email).all()

  const user = results[0] as any

  if (!user || user.password !== hashedPassword) {
    return c.html(<Login error="Email atau kata sandi salah" />)
  }
  
  if (user.status === 'suspended') {
    return c.html(<Login error="Akun klien ini telah ditangguhkan. Hubungi administrator." />)
  }

  if (user.expires_at && user.expires_at < Date.now()) {
    return c.html(<Login error="Masa aktif akun klien ini telah habis. Hubungi administrator." />)
  }

  // Generate JWT
  const token = await sign({
    userId: user.id,
    tenantId: user.tenant_id,
    role: user.role,
    exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 7 // 7 hari
  }, JWT_SECRET)

  setCookie(c, 'auth_token', token, {
    httpOnly: true,
    secure: true,
    sameSite: 'Lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 7
  })

  return c.redirect('/dashboard')
})

app.get('/api/logout', (c) => {
  deleteCookie(c, 'auth_token')
  return c.redirect('/login')
})

// --- RUTE HALAMAN UI ---

app.get('/dashboard', async (c) => {
  try {
    const { results: postCountResult } = await c.env.DB.prepare("SELECT COUNT(*) as count FROM posts").all()
    const postCount = (postCountResult[0] as any)?.count || 0
    const { results: recentPosts } = await c.env.DB.prepare("SELECT title, created_at FROM posts ORDER BY created_at DESC LIMIT 3").all()

    let totalBytes = 0
    let totalViews = 0
    try {
      const { results: mediaResults } = await c.env.DB.prepare("SELECT SUM(size) as total FROM media").all()
      totalBytes = (mediaResults[0] as any)?.total || 0
      
      const { results: viewResults } = await c.env.DB.prepare("SELECT SUM(views) as total FROM analytics").all()
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
    const { results } = await c.env.DB.prepare("SELECT * FROM posts ORDER BY created_at DESC").all()
    return c.html(<Posts currentPath={c.req.path} posts={results} />)
  } catch (e) {
    return c.html(<Posts currentPath={c.req.path} posts={[]} />)
  }
})

app.get('/appearance', async (c) => {
  try {
    const { results } = await c.env.DB.prepare("SELECT * FROM settings").all()
    const settings = results.reduce((acc: any, curr: any) => {
      acc[curr.key] = curr.value
      return acc
    }, {})
    return c.html(<Appearance currentPath={c.req.path} settings={settings} />)
  } catch (e) {
    return c.html(<Appearance currentPath={c.req.path} settings={{}} />)
  }
})

app.get('/vault', async (c) => {
  try {
    const { results } = await c.env.DB.prepare("SELECT * FROM media ORDER BY created_at DESC").all()
    return c.html(<Vault currentPath={c.req.path} files={results as any[]} />)
  } catch (e) {
    console.error('Failed to load media from DB:', e)
    return c.html(<Vault currentPath={c.req.path} files={[]} />)
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
    const db = createDb(c.env.DB)
    const allProducts = await db.select().from(products).orderBy(desc(products.createdAt))
    return c.html(<Products currentPath={c.req.path} products={allProducts} />)
  } catch (e) {
    console.error(e)
    return c.text('Error', 500)
  }
})

app.post('/api/products', async (c) => {
  try {
    const db = createDb(c.env.DB)
    const body = await c.req.parseBody()
    
    await db.insert(products).values({
      id: crypto.randomUUID(),
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
    const { results } = await c.env.DB.prepare("SELECT * FROM orders ORDER BY created_at DESC").all()
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
    
    const txId = crypto.randomUUID()
    const tenantId = "tenant-local-dev-123" // Simulasi
    
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

app.post('/api/orders/update', async (c) => {
  try {
    const body = await c.req.parseBody()
    const id = body['id'] as string
    const status = body['status'] as string
    if (id && status) {
      await c.env.DB.prepare("UPDATE orders SET status = ? WHERE id = ?").bind(status, id).run()
    }
    return c.redirect('/orders')
  } catch (e) {
    return c.text('Error', 500)
  }
})

// --- NUANSA LEARN ROUTES ---

app.get('/learn', async (c) => {
  try {
    const { results } = await c.env.DB.prepare(
      "SELECT c.*, (SELECT COUNT(*) FROM lessons l WHERE l.course_id = c.id) as lesson_count FROM courses c ORDER BY c.created_at DESC"
    ).all()
    return c.html(<Learn currentPath={c.req.path} courses={results as any[]} />)
  } catch (e) {
    return c.html(<Learn currentPath={c.req.path} courses={[]} />)
  }
})

app.get('/learn/:courseId/lessons', async (c) => {
  try {
    const courseId = c.req.param('courseId')
    const course: any = await c.env.DB.prepare("SELECT * FROM courses WHERE id = ?").bind(courseId).first()
    if (!course) return c.redirect('/learn')
    const { results: lessons } = await c.env.DB.prepare("SELECT * FROM lessons WHERE course_id = ? ORDER BY order_index ASC").bind(courseId).all()
    return c.html(<Lessons currentPath={c.req.path} course={course} lessons={lessons as any[]} />)
  } catch (e) {
    return c.redirect('/learn')
  }
})

app.post('/api/learn/course', async (c) => {
  try {
    const body = await c.req.parseBody()
    const id = body['id'] as string
    const title = body['title'] as string
    const description = body['description'] as string
    const cover_image = body['cover_image'] as string
    const price = parseInt(body['price'] as string) || 0
    const is_published = body['is_published'] === '1' ? 1 : 0
    if (id) {
      await c.env.DB.prepare(
        "UPDATE courses SET title=?, description=?, cover_image=?, price=?, is_published=? WHERE id=?"
      ).bind(title, description||null, cover_image||null, price, is_published, id).run()
    } else {
      const newId = crypto.randomUUID()
      const slug = title.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/(^-|-$)+/g,'') + '-' + Date.now().toString().slice(-4)
      await c.env.DB.prepare(
        "INSERT INTO courses (id, title, slug, description, cover_image, price, is_published) VALUES (?,?,?,?,?,?,?)"
      ).bind(newId, title, slug, description||null, cover_image||null, price, is_published).run()
    }
    return c.redirect('/learn')
  } catch (e) {
    console.error(e)
    return c.text('Error', 500)
  }
})

app.post('/api/learn/course/delete', async (c) => {
  try {
    const body = await c.req.parseBody()
    const id = body['id'] as string
    await c.env.DB.prepare("DELETE FROM lessons WHERE course_id = ?").bind(id).run()
    await c.env.DB.prepare("DELETE FROM courses WHERE id = ?").bind(id).run()
    return c.redirect('/learn')
  } catch (e) {
    return c.text('Error', 500)
  }
})

app.post('/api/learn/lesson', async (c) => {
  try {
    const body = await c.req.parseBody()
    const id = body['id'] as string
    const course_id = body['course_id'] as string
    const title = body['title'] as string
    const content = body['content'] as string
    const order_index = parseInt(body['order_index'] as string) || 0
    const is_preview = body['is_preview'] === '1' ? 1 : 0
    if (id) {
      await c.env.DB.prepare(
        "UPDATE lessons SET title=?, content=?, order_index=?, is_preview=? WHERE id=?"
      ).bind(title, content||null, order_index, is_preview, id).run()
    } else {
      await c.env.DB.prepare(
        "INSERT INTO lessons (id, course_id, title, content, order_index, is_preview) VALUES (?,?,?,?,?,?)"
      ).bind(crypto.randomUUID(), course_id, title, content||null, order_index, is_preview).run()
    }
    return c.redirect(`/learn/${course_id}/lessons`)
  } catch (e) {
    console.error(e)
    return c.text('Error', 500)
  }
})

app.post('/api/learn/lesson/delete', async (c) => {
  try {
    const body = await c.req.parseBody()
    const id = body['id'] as string
    const course_id = body['course_id'] as string
    await c.env.DB.prepare("DELETE FROM lessons WHERE id = ?").bind(id).run()
    return c.redirect(`/learn/${course_id}/lessons`)
  } catch (e) {
    return c.text('Error', 500)
  }
})

app.get('/settings', async (c) => {
  const isSaved = c.req.query('saved') === 'true'
  const upgradeRequested = c.req.query('upgrade_requested') === 'true'
  try {
    const { results } = await c.env.DB.prepare("SELECT * FROM settings").all()
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
    const { results } = await c.env.DB.prepare("SELECT * FROM redirects ORDER BY created_at DESC").all()
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
    await c.env.DB.prepare(
      "INSERT INTO media (id, filename, url, type, size, has_watermark) VALUES (?, ?, ?, ?, ?, ?)"
    ).bind(crypto.randomUUID(), file.name, `/media/${key}`, file.type, file.size, hasWatermark).run()
  } catch(e) {
    console.error('Failed to save media metadata:', e)
  }

  return c.redirect('/vault')
})

app.post('/api/vault/delete', async (c) => {
  const body = await c.req.parseBody()
  const id = body['id'] as string
  const url = body['url'] as string
  
  if (url) {
    const key = url.replace('/media/', '')
    await c.env.VAULT_BUCKET.delete(key)
  }
  if (id) {
    await c.env.DB.prepare("DELETE FROM media WHERE id = ?").bind(id).run()
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
    await c.env.DB.prepare("DELETE FROM posts WHERE id = ?").bind(id).run()
    return c.redirect('/posts')
  }

  if (!title) return c.text('Judul diperlukan', 400)

  if (id) {
    await c.env.DB.prepare(
      "UPDATE posts SET title = ?, content = ?, metadata = ?, status = ?, is_premium = ?, price = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?"
    ).bind(title, content, metadata || null, status, is_premium, price, id).run()
  } else {
    const newId = crypto.randomUUID()
    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '') + '-' + Date.now().toString().slice(-4)
    await c.env.DB.prepare(
      "INSERT INTO posts (id, title, slug, content, metadata, status, is_premium, price) VALUES (?, ?, ?, ?, ?, ?, ?, ?)"
    ).bind(newId, title, slug, content || '', metadata || null, status, is_premium, price).run()
  }
  
  return c.redirect('/posts')
})

app.post('/api/settings', async (c) => {
  const body = await c.req.parseBody()
  
  const statements = []
  for (const [key, value] of Object.entries(body)) {
    if (typeof value === 'string' && value.trim() !== '') {
      statements.push(
        c.env.DB.prepare(
          "INSERT INTO settings (key, value) VALUES (?, ?) ON CONFLICT(key) DO UPDATE SET value = ?"
        ).bind(key, value, value)
      )
    }
  }

  if (statements.length > 0) {
    await c.env.DB.batch(statements)
  }
  
  const redirectUrl = body['redirectUrl'] as string || '/appearance'
  return c.redirect(redirectUrl)
})

app.post('/api/redirects', async (c) => {
  const body = await c.req.parseBody()
  const id = body['id'] as string
  const source_url = body['source_url'] as string
  const target_url = body['target_url'] as string
  const status_code = parseInt((body['status_code'] as string) || '301', 10)
  const action = body['action'] as string

  if (action === 'delete' && id) {
    await c.env.DB.prepare("DELETE FROM redirects WHERE id = ?").bind(id).run()
  } else if (source_url && target_url) {
    const newId = id || crypto.randomUUID()
    if (id) {
       await c.env.DB.prepare(
         "UPDATE redirects SET source_url = ?, target_url = ?, status_code = ? WHERE id = ?"
       ).bind(source_url, target_url, status_code, id).run()
    } else {
       await c.env.DB.prepare(
         "INSERT INTO redirects (id, source_url, target_url, status_code) VALUES (?, ?, ?, ?)"
       ).bind(newId, source_url, target_url, status_code).run()
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
      statements.push(
        c.env.DB.prepare(
          "INSERT INTO posts (id, title, slug, content, metadata, status) VALUES (?, ?, ?, ?, ?, 'published')"
        ).bind(newId, title, finalSlug, JSON.stringify(editorData), null)
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
