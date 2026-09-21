import { Hono } from 'hono'
import { Dashboard } from './pages/Dashboard'
import { Posts } from './pages/Posts'
import { Appearance } from './pages/Appearance'
import { Vault } from './pages/Vault'

type Bindings = {
  VAULT_BUCKET: R2Bucket
  DB: D1Database
}

const app = new Hono<{ Bindings: Bindings }>()

// Rute Pengalihan (Redirect)
app.get('/', (c) => c.redirect('/dashboard'))

// --- RUTE HALAMAN UI ---

// Rute Dasbor
app.get('/dashboard', async (c) => {
  // 1. Dapatkan Total Artikel
  const { results: postCountResult } = await c.env.DB.prepare("SELECT COUNT(*) as count FROM posts").all()
  const postCount = (postCountResult[0] as any)?.count || 0

  // 2. Dapatkan Aktivitas Terbaru (3 artikel terakhir)
  const { results: recentPosts } = await c.env.DB.prepare("SELECT title, created_at FROM posts ORDER BY created_at DESC LIMIT 3").all()

  // 3. Hitung Total Penyimpanan Media dari R2
  const list = await c.env.VAULT_BUCKET.list()
  let totalBytes = 0
  list.objects.forEach(obj => totalBytes += obj.size)
  const mediaMB = (totalBytes / 1024 / 1024).toFixed(2)

  const stats = {
    visitors: 'Tersedia Segera', // Akan diintegrasikan dengan Workers Analytics Engine nanti
    posts: postCount.toString(),
    media: `${mediaMB} MB`
  }

  return c.html(<Dashboard currentPath={c.req.path} stats={stats} recentPosts={recentPosts} />)
})

// Rute Artikel (Nuansa Nodes)
app.get('/posts', async (c) => {
  const { results } = await c.env.DB.prepare("SELECT * FROM posts ORDER BY created_at DESC").all()
  return c.html(<Posts currentPath={c.req.path} posts={results} />)
})

// Rute Tampilan (Nuansa Architect)
app.get('/appearance', async (c) => {
  const { results } = await c.env.DB.prepare("SELECT * FROM settings").all()
  
  // Konversi dari array SQLite ke bentuk Objek JavaScript untuk mempermudah render
  const settings = results.reduce((acc: any, curr: any) => {
    acc[curr.key] = curr.value
    return acc
  }, {})

  return c.html(<Appearance currentPath={c.req.path} settings={settings} />)
})

// Rute Media (Nuansa Vault)
app.get('/vault', async (c) => {
  // Ambil daftar file dari R2
  const list = await c.env.VAULT_BUCKET.list()
  return c.html(<Vault currentPath={c.req.path} files={list.objects} />)
})

// Rute Pengaturan Sementara
app.get('/settings', (c) => {
  return c.html(<Dashboard currentPath={c.req.path} />) 
})

// --- RUTE API (R2 STORAGE) ---

// API Unggah File ke R2
app.post('/api/upload', async (c) => {
  const body = await c.req.parseBody()
  const file = body['file'] as File
  
  if (!file || !file.size) {
    return c.text('Tidak ada file yang dipilih', 400)
  }

  // Buat nama unik berdasarkan waktu
  const key = `${Date.now()}-${file.name.replace(/\s+/g, '-')}`
  
  // Simpan ke Cloudflare R2
  await c.env.VAULT_BUCKET.put(key, await file.arrayBuffer(), {
    httpMetadata: { contentType: file.type }
  })
  
  // Arahkan kembali ke Vault setelah selesai
  return c.redirect('/vault')
})

// API Menyajikan File Gambar dari R2
app.get('/media/:key', async (c) => {
  const key = c.req.param('key')
  const object = await c.env.VAULT_BUCKET.get(key)
  
  if (!object) {
    return c.text('File tidak ditemukan', 404)
  }
  
  const headers = new Headers()
  object.writeHttpMetadata(headers)
  headers.set('etag', object.httpEtag)
  // Menambahkan header cache untuk Edge Network Cloudflare
  headers.set('Cache-Control', 'public, max-age=31536000')
  
  return new Response(object.body, { headers })
})

// --- RUTE API (D1 DATABASE) ---

app.post('/api/posts', async (c) => {
  const body = await c.req.parseBody()
  const title = body['title'] as string
  const content = body['content'] as string
  
  if (!title) {
    return c.text('Judul diperlukan', 400)
  }

  const id = crypto.randomUUID()
  const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '') + '-' + Date.now().toString().slice(-4)
  
  await c.env.DB.prepare(
    "INSERT INTO posts (id, title, slug, content) VALUES (?, ?, ?, ?)"
  ).bind(id, title, slug, content || '').run()
  
  return c.redirect('/posts')
})

app.post('/api/settings', async (c) => {
  const body = await c.req.parseBody()
  
  const siteName = body['siteName'] as string
  const primaryColor = body['primaryColor'] as string
  
  // Menyimpan (Upsert) nama situs
  if (siteName) {
    await c.env.DB.prepare(
      "INSERT INTO settings (key, value) VALUES ('siteName', ?) ON CONFLICT(key) DO UPDATE SET value = ?"
    ).bind(siteName, siteName).run()
  }
  
  // Menyimpan (Upsert) warna utama
  if (primaryColor) {
    await c.env.DB.prepare(
      "INSERT INTO settings (key, value) VALUES ('primaryColor', ?) ON CONFLICT(key) DO UPDATE SET value = ?"
    ).bind(primaryColor, primaryColor).run()
  }
  
  return c.redirect('/appearance')
})

export default app
