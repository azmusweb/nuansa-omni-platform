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
import { createDb, tenants, users, transactions, products } from '@nuansa/db'
import { desc } from 'drizzle-orm'
import type { FC } from 'hono/jsx'

type Bindings = {
  VAULT_BUCKET: R2Bucket
  DB: D1Database
  MASTER_DB: D1Database
}

const app = new Hono<{ Bindings: Bindings }>()

const SuccessPage: FC<{ tenantId: string }> = ({ tenantId }) => (
  <html lang="id">
    <head>
      <meta charset="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Pendaftaran Berhasil - Nuansa Studio</title>
      <script src="https://cdn.tailwindcss.com"></script>
      {html`
        <script>
          tailwind.config = {
            darkMode: 'class'
          }
        </script>
        <script>
          if (localStorage.getItem('theme') === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
            document.documentElement.classList.add('dark');
          } else {
            document.documentElement.classList.remove('dark');
          }
          window.addEventListener('storage', (e) => {
            if (e.key === 'theme') {
              if (e.newValue === 'dark') document.documentElement.classList.add('dark');
              else document.documentElement.classList.remove('dark');
            }
          });
          function toggleTheme() {
            if (document.documentElement.classList.contains('dark')) {
              document.documentElement.classList.remove('dark');
              localStorage.setItem('theme', 'light');
            } else {
              document.documentElement.classList.add('dark');
              localStorage.setItem('theme', 'dark');
            }
          }
        </script>
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
          body { font-family: 'Plus Jakarta Sans', sans-serif; }
          .glassmorphism {
            background: rgba(255, 255, 255, 0.7);
            backdrop-filter: blur(16px);
            -webkit-backdrop-filter: blur(16px);
            border: 1px solid rgba(255, 255, 255, 0.5);
          }
          .dark .glassmorphism {
            background: rgba(15, 23, 42, 0.7);
            border: 1px solid rgba(255, 255, 255, 0.1);
          }
          .animate-mesh {
            background: radial-gradient(at 40% 20%, hsla(228,100%,74%,1) 0px, transparent 50%),
                        radial-gradient(at 80% 0%, hsla(189,100%,56%,1) 0px, transparent 50%),
                        radial-gradient(at 0% 50%, hsla(355,100%,93%,1) 0px, transparent 50%),
                        radial-gradient(at 80% 50%, hsla(340,100%,76%,1) 0px, transparent 50%),
                        radial-gradient(at 0% 100%, hsla(22,100%,77%,1) 0px, transparent 50%),
                        radial-gradient(at 80% 100%, hsla(242,100%,70%,1) 0px, transparent 50%),
                        radial-gradient(at 0% 0%, hsla(343,100%,76%,1) 0px, transparent 50%);
            filter: blur(60px);
            opacity: 0.15;
          }
          .dark .animate-mesh {
            background: radial-gradient(at 40% 20%, hsla(228,100%,74%,1) 0px, transparent 50%),
                        radial-gradient(at 80% 0%, hsla(189,100%,56%,1) 0px, transparent 50%),
                        radial-gradient(at 0% 50%, hsla(280,100%,50%,1) 0px, transparent 50%),
                        radial-gradient(at 80% 50%, hsla(340,100%,76%,1) 0px, transparent 50%),
                        radial-gradient(at 0% 100%, hsla(22,100%,77%,1) 0px, transparent 50%),
                        radial-gradient(at 80% 100%, hsla(242,100%,70%,1) 0px, transparent 50%),
                        radial-gradient(at 0% 0%, hsla(343,100%,76%,1) 0px, transparent 50%);
            opacity: 0.1;
          }
        </style>
      `}
    </head>
    <body class="bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-200 min-h-screen relative overflow-hidden transition-colors duration-300">
      <div class="absolute inset-0 z-0 pointer-events-none animate-mesh"></div>
      
      <div class="absolute top-4 right-4 z-50">
        <button onclick="toggleTheme()" class="p-2 rounded-full hover:bg-slate-200/50 dark:hover:bg-slate-800 transition text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white" title="Toggle Theme">
          <svg class="w-5 h-5 hidden dark:block" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>
          <svg class="w-5 h-5 block dark:hidden" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path></svg>
        </button>
      </div>

      <div class="min-h-screen flex items-center justify-center p-6 relative z-10">
        <div class="glassmorphism max-w-lg w-full p-10 rounded-3xl shadow-2xl text-center">
          <div class="w-20 h-20 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
            <svg class="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"></path>
            </svg>
          </div>
          <h2 class="text-3xl font-bold text-slate-900 dark:text-white mb-4">Pendaftaran Berhasil!</h2>
          <p class="text-slate-600 dark:text-slate-400 mb-8 leading-relaxed">
            Ruang kerja CMS Anda telah disiapkan. Harap simpan <strong class="text-slate-900 dark:text-white">Tenant ID</strong> ini dengan aman untuk referensi konfigurasi.
          </p>
          <div class="bg-white/50 dark:bg-slate-900/50 p-4 rounded-xl border border-slate-200 dark:border-slate-700/50 mb-8 font-mono text-sm break-all text-brand-600 dark:text-blue-400 shadow-inner">
            {tenantId}
          </div>
          <a href="/dashboard" class="inline-block bg-brand-600 hover:bg-brand-500 text-white font-semibold py-3 px-8 rounded-xl transition-all shadow-lg shadow-brand-500/20">
            Masuk ke Dashboard
          </a>
        </div>
      </div>
    </body>
  </html>
)

// Rute Landing Page (UI)
app.get('/', (c) => {
  return c.html(
    <html lang="id">
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Nuansa Studio - Buat Website Anda</title>
        <script src="https://cdn.tailwindcss.com"></script>
        {html`
          <script>
            tailwind.config = {
              darkMode: 'class'
            }
          </script>
          <script>
            if (localStorage.getItem('theme') === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
              document.documentElement.classList.add('dark');
            } else {
              document.documentElement.classList.remove('dark');
            }
            window.addEventListener('storage', (e) => {
              if (e.key === 'theme') {
                if (e.newValue === 'dark') document.documentElement.classList.add('dark');
                else document.documentElement.classList.remove('dark');
              }
            });
            function toggleTheme() {
              if (document.documentElement.classList.contains('dark')) {
                document.documentElement.classList.remove('dark');
                localStorage.setItem('theme', 'light');
              } else {
                document.documentElement.classList.add('dark');
                localStorage.setItem('theme', 'dark');
              }
            }
          </script>
          <style>
            @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
            body { font-family: 'Plus Jakarta Sans', sans-serif; }
            .glassmorphism {
              background: rgba(255, 255, 255, 0.7);
              backdrop-filter: blur(16px);
              -webkit-backdrop-filter: blur(16px);
              border: 1px solid rgba(255, 255, 255, 0.5);
            }
            .dark .glassmorphism {
              background: rgba(15, 23, 42, 0.7);
              border: 1px solid rgba(255, 255, 255, 0.1);
            }
            .animate-mesh {
              background: radial-gradient(at 40% 20%, hsla(228,100%,74%,1) 0px, transparent 50%),
                          radial-gradient(at 80% 0%, hsla(189,100%,56%,1) 0px, transparent 50%),
                          radial-gradient(at 0% 50%, hsla(355,100%,93%,1) 0px, transparent 50%),
                          radial-gradient(at 80% 50%, hsla(340,100%,76%,1) 0px, transparent 50%),
                          radial-gradient(at 0% 100%, hsla(22,100%,77%,1) 0px, transparent 50%),
                          radial-gradient(at 80% 100%, hsla(242,100%,70%,1) 0px, transparent 50%),
                          radial-gradient(at 0% 0%, hsla(343,100%,76%,1) 0px, transparent 50%);
              filter: blur(60px);
              opacity: 0.15;
            }
            .dark .animate-mesh {
              background: radial-gradient(at 40% 20%, hsla(228,100%,74%,1) 0px, transparent 50%),
                          radial-gradient(at 80% 0%, hsla(189,100%,56%,1) 0px, transparent 50%),
                          radial-gradient(at 0% 50%, hsla(280,100%,50%,1) 0px, transparent 50%),
                          radial-gradient(at 80% 50%, hsla(340,100%,76%,1) 0px, transparent 50%),
                          radial-gradient(at 0% 100%, hsla(22,100%,77%,1) 0px, transparent 50%),
                          radial-gradient(at 80% 100%, hsla(242,100%,70%,1) 0px, transparent 50%),
                          radial-gradient(at 0% 0%, hsla(343,100%,76%,1) 0px, transparent 50%);
              opacity: 0.1;
            }
          </style>
        `}
      </head>
      <body class="bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-200 min-h-screen selection:bg-brand-500/30 transition-colors duration-300">
        <div class="min-h-screen relative overflow-hidden flex flex-col">
          {/* Background Ornaments */}
          <div class="absolute inset-0 z-0 pointer-events-none animate-mesh"></div>

          {/* Navbar */}
          <nav class="w-full max-w-6xl mx-auto px-6 py-8 relative z-10 flex justify-between items-center border-b border-slate-200/50 dark:border-slate-800/50">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-500 to-indigo-600 flex items-center justify-center shadow-lg">
                <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path></svg>
              </div>
              <span class="text-xl font-bold text-slate-900 dark:text-white tracking-tight">Nuansa<span class="text-slate-500 dark:text-slate-400 font-normal">Studio</span></span>
            </div>
            <div class="hidden md:flex gap-4 items-center text-sm font-medium text-slate-600 dark:text-slate-400">
              <button onclick="toggleTheme()" class="p-2 rounded-full hover:bg-slate-200/50 dark:hover:bg-slate-800 transition text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white" title="Toggle Theme">
                <svg class="w-5 h-5 hidden dark:block" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>
                <svg class="w-5 h-5 block dark:hidden" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path></svg>
              </button>
              <a href="/dashboard" class="text-brand-600 dark:text-brand-400 hover:text-brand-700 dark:hover:text-brand-300 transition px-5 py-2.5 rounded-xl bg-brand-500/10 border border-brand-500/20">Masuk ke Dashboard</a>
            </div>
          </nav>

          {/* Hero Section */}
          <main class="flex-grow w-full max-w-6xl mx-auto px-6 py-12 md:py-20 relative z-10 grid md:grid-cols-2 gap-16 items-center">
            <div>
              <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/10 text-brand-600 dark:text-brand-400 text-sm font-medium border border-brand-500/20 mb-6">
                <span class="w-2 h-2 rounded-full bg-brand-500 dark:bg-brand-400 animate-pulse"></span>
                Omni-Platform Baru
              </div>
              <h1 class="text-5xl md:text-6xl font-extrabold text-slate-900 dark:text-white leading-[1.1] tracking-tight mb-6">
                Mulai Kelola Konten Anda.
              </h1>
              <p class="text-lg text-slate-600 dark:text-slate-400 mb-10 leading-relaxed max-w-md">
                Daftar sekarang untuk mendapatkan ruang kerja (Tenant) instan dan bangun platform berkinerja tinggi bersama Nuansa.
              </p>
            </div>

            <div class="glassmorphism p-8 md:p-10 rounded-3xl shadow-2xl relative">
              <div class="relative">
                <h3 class="text-2xl font-bold text-slate-900 dark:text-white mb-2">Daftar Akun Klien</h3>
                <p class="text-sm text-slate-500 dark:text-slate-400 mb-8">Buat ruang kerja (Tenant) instan Anda sendiri.</p>
                
                <form method="POST" action="/api/tenants" class="space-y-6">
                  <div>
                    <label class="block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">Nama Perusahaan / Website</label>
                    <input 
                      type="text" 
                      name="name" 
                      placeholder="Misal: PT Maju Bersama" 
                      required
                      class="w-full bg-white/50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700/50 rounded-xl px-4 py-3.5 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-600 focus:outline-none focus:border-brand-500 transition shadow-inner"
                    />
                  </div>
                  <div>
                    <label class="block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">Email Administrator Utama</label>
                    <input 
                      type="email" 
                      name="email" 
                      placeholder="admin@majubersama.com" 
                      required
                      class="w-full bg-white/50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700/50 rounded-xl px-4 py-3.5 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-600 focus:outline-none focus:border-brand-500 transition shadow-inner"
                    />
                  </div>
                  <button 
                    type="submit" 
                    class="w-full bg-brand-600 hover:bg-brand-500 text-white font-semibold py-4 px-4 rounded-xl transition-all shadow-lg shadow-brand-500/20 mt-4"
                  >
                    Mulai Sekarang &rarr;
                  </button>
                </form>
              </div>
            </div>
          </main>
        </div>
      </body>
    </html>
  )
})

// Endpoint untuk mendaftarkan Tenant Baru (API)
app.post('/api/tenants', async (c) => {
  try {
    // Kita simpan ke MASTER_DB
    const db = createDb(c.env.MASTER_DB)
    
    const contentType = c.req.header('content-type') || ''
    let name = ''
    let email = ''
    
    if (contentType.includes('application/x-www-form-urlencoded') || contentType.includes('multipart/form-data')) {
      const formData = await c.req.parseBody()
      name = formData['name'] as string
      email = formData['email'] as string
    } else {
      const body = await c.req.json()
      name = body.name
      email = body.email
    }

    if (!name || !email) {
      return c.text('Name and Email are required', 400)
    }

    const tenantId = crypto.randomUUID()
    const userId = crypto.randomUUID()
    const now = new Date()

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
    ])

    if (contentType.includes('application/x-www-form-urlencoded') || contentType.includes('multipart/form-data')) {
      return c.html(<SuccessPage tenantId={tenantId} />)
    }

    return c.json({
      success: true,
      message: 'Tenant successfully registered',
      tenantId: tenantId,
      userId: userId
    }, 201)
  } catch (error: any) {
    console.error('Registration error:', error)
    return c.text(`Internal Server Error: ${error.message}`, 500)
  }
})

// --- RUTE HALAMAN UI ---

app.get('/dashboard', async (c) => {
  try {
    const { results: postCountResult } = await c.env.DB.prepare("SELECT COUNT(*) as count FROM posts").all()
    const postCount = (postCountResult[0] as any)?.count || 0
    const { results: recentPosts } = await c.env.DB.prepare("SELECT title, created_at FROM posts ORDER BY created_at DESC LIMIT 3").all()

    const list = await c.env.VAULT_BUCKET.list()
    let totalBytes = 0
    list.objects.forEach(obj => totalBytes += obj.size)
    const mediaMB = (totalBytes / 1024 / 1024).toFixed(2)

    const stats = {
      visitors: 'Tersedia Segera',
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
  const list = await c.env.VAULT_BUCKET.list()
  return c.html(<Vault currentPath={c.req.path} files={list.objects} />)
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

app.get('/settings', async (c) => {
  try {
    const { results } = await c.env.DB.prepare("SELECT * FROM settings").all()
    const settings = results.reduce((acc: any, curr: any) => {
      acc[curr.key] = curr.value
      return acc
    }, {})
    return c.html(<Settings currentPath={c.req.path} settings={settings} />)
  } catch (e) {
    return c.html(<Settings currentPath={c.req.path} settings={{}} />)
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
  await c.env.VAULT_BUCKET.put(key, await file.arrayBuffer(), {
    httpMetadata: { contentType: file.type }
  })
  return c.redirect('/vault')
})

app.post('/api/vault/delete', async (c) => {
  const body = await c.req.parseBody()
  const key = body['key'] as string
  if (key) {
    await c.env.VAULT_BUCKET.delete(key)
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
  const action = body['action'] as string // 'delete' or 'save'
  
  if (action === 'delete' && id) {
    await c.env.DB.prepare("DELETE FROM posts WHERE id = ?").bind(id).run()
    return c.redirect('/posts')
  }

  if (!title) return c.text('Judul diperlukan', 400)

  if (id) {
    await c.env.DB.prepare(
      "UPDATE posts SET title = ?, content = ?, metadata = ?, status = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?"
    ).bind(title, content, metadata || null, status, id).run()
  } else {
    const newId = crypto.randomUUID()
    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '') + '-' + Date.now().toString().slice(-4)
    await c.env.DB.prepare(
      "INSERT INTO posts (id, title, slug, content, metadata, status) VALUES (?, ?, ?, ?, ?, ?)"
    ).bind(newId, title, slug, content || '', metadata || null, status).run()
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
