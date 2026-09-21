import { Hono } from 'hono'
import { Dashboard } from './pages/Dashboard'
import { Posts } from './pages/Posts'
import { Appearance } from './pages/Appearance'
import { Vault } from './pages/Vault'

type Bindings = {
  VAULT_BUCKET: R2Bucket
}

const app = new Hono<{ Bindings: Bindings }>()

// Rute Pengalihan (Redirect)
app.get('/', (c) => c.redirect('/dashboard'))

// --- RUTE HALAMAN UI ---

// Rute Dasbor
app.get('/dashboard', (c) => {
  return c.html(<Dashboard currentPath={c.req.path} />)
})

// Rute Artikel (Nuansa Nodes)
app.get('/posts', (c) => {
  return c.html(<Posts currentPath={c.req.path} />)
})

// Rute Tampilan (Nuansa Architect)
app.get('/appearance', (c) => {
  return c.html(<Appearance currentPath={c.req.path} />)
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

export default app
