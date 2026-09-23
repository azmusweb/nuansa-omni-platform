import { Hono } from 'hono'
import type { FC } from 'hono/jsx'
import { getCookie, setCookie } from 'hono/cookie'
import { html } from 'hono/html'

type Bindings = {
  DB: D1Database
  MASTER_DB: D1Database
}

const app = new Hono<{ Bindings: Bindings }>()

const Layout: FC<{ title: string, siteName: string, primaryColor: string, adsenseId?: string, children: any }> = ({ title, siteName, primaryColor, adsenseId, children }) => {
  return (
    <html lang="id">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>{title}</title>
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
        `}
        <style dangerouslySetInnerHTML={{
          __html: `
            :root { --primary-color: ${primaryColor}; }
            .bg-theme { background-color: var(--primary-color); }
            .text-theme { color: var(--primary-color); }
            .border-theme { border-color: var(--primary-color); }
            
            .glassmorphism {
              background: rgba(255, 255, 255, 0.85);
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
          `
        }} />
        {adsenseId && (
          <script async src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adsenseId}`} crossorigin="anonymous"></script>
        )}
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
        <style dangerouslySetInnerHTML={{__html: `body { font-family: 'Inter', sans-serif; }`}} />
      </head>
      <body class="bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-200 min-h-screen flex flex-col relative transition-colors duration-300">
        <div class="fixed inset-0 z-0 pointer-events-none animate-mesh"></div>
        {/* Header Global */}
        <header class="glassmorphism border-b border-slate-200 dark:border-slate-800 sticky top-0 z-50 shadow-sm transition-colors duration-300">
          <div class="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
            <a href="/" class="text-2xl font-extrabold tracking-tight text-theme">
              {siteName}
            </a>
            <div class="flex items-center gap-6">
              <nav class="hidden md:flex gap-6 items-center text-sm font-medium text-slate-600 dark:text-slate-400">
                <a href="/" class="hover:text-theme dark:hover:text-theme transition">Beranda</a>
                <a href="/belajar" class="hover:text-theme dark:hover:text-theme transition">Belajar</a>
                <a href="/katalog" class="hover:text-theme dark:hover:text-theme transition">Katalog Produk</a>
                <a href="/login" class="hover:text-theme dark:hover:text-theme transition ml-4">Login</a>
                <a href="/register" class="bg-theme text-white hover:opacity-90 transition px-4 py-2 rounded-xl shadow-sm">Daftar</a>
              </nav>
              <button onclick="toggleTheme()" class="p-2 rounded-full hover:bg-slate-200/50 dark:hover:bg-slate-800 transition text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white" title="Toggle Theme">
                <svg class="w-5 h-5 hidden dark:block" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>
                <svg class="w-5 h-5 block dark:hidden" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path></svg>
              </button>
            </div>
          </div>
        </header>

        {/* Konten Halaman */}
        <main class="flex-1 relative z-10">
          {children}
        </main>

        {/* Footer Global */}
        <footer class="bg-slate-900 text-slate-400 py-12 mt-20 relative z-10">
          <div class="max-w-5xl mx-auto px-6 text-center">
            <p>&copy; {new Date().getFullYear()} {siteName}. Hak Cipta Dilindungi.</p>
            <p class="text-xs mt-2 opacity-50">Didukung oleh Nuansa Omni-Platform (Edge-Native CMS)</p>
          </div>
        </footer>
      </body>
    </html>
  )
}

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
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
          body { font-family: 'Plus Jakarta Sans', sans-serif; }
          .glassmorphism {
            background: rgba(255, 255, 255, 0.7);
            backdrop-filter: blur(16px);
            -webkit-backdrop-filter: blur(16px);
            border: 1px solid rgba(255, 255, 255, 0.5);
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
        </style>
      `}
    </head>
    <body class="bg-slate-50 text-slate-900 min-h-screen relative overflow-hidden transition-colors duration-300">
      <div class="absolute inset-0 z-0 pointer-events-none animate-mesh"></div>
      
      <div class="min-h-screen flex items-center justify-center p-6 relative z-10">
        <div class="glassmorphism max-w-lg w-full p-10 rounded-3xl shadow-2xl text-center">
          <div class="w-20 h-20 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
            <svg class="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"></path>
            </svg>
          </div>
          <h2 class="text-3xl font-bold text-slate-900 mb-4">Pendaftaran Berhasil!</h2>
          <p class="text-slate-600 mb-8 leading-relaxed">
            Ruang kerja CMS Anda telah disiapkan. Harap simpan <strong>Tenant ID</strong> ini dengan aman untuk referensi konfigurasi.
          </p>
          <div class="bg-white/50 p-4 rounded-xl border border-slate-200 mb-8 font-mono text-sm break-all text-blue-600 shadow-inner">
            {tenantId}
          </div>
          <a href="https://studio.nuansa.net/dashboard" class="inline-block bg-blue-600 hover:bg-blue-500 text-white font-semibold py-3 px-8 rounded-xl transition-all shadow-lg">
            Masuk ke Dashboard
          </a>
        </div>
      </div>
    </body>
  </html>
)

// Middleware Interceptor untuk Analytics & Redirects
app.use('*', async (c, next) => {
  const path = c.req.path
  
  if (!path.startsWith('/api/') && !path.includes('.')) {
    // 1. Cek Redirect
    try {
      const redirectRow: any = await c.env.DB.prepare("SELECT * FROM redirects WHERE source_url = ?").bind(path).first()
      if (redirectRow) {
        return c.redirect(redirectRow.target_url, redirectRow.status_code || 301)
      }
    } catch(e) {}

    // 2. Catat Analytics
    try {
      await c.env.DB.prepare(
        "INSERT INTO analytics (id, path, views, last_visited_at) VALUES (?, ?, 1, CURRENT_TIMESTAMP) ON CONFLICT(path) DO UPDATE SET views = views + 1, last_visited_at = CURRENT_TIMESTAMP"
      ).bind(crypto.randomUUID(), path).run()
    } catch(e) {}
  }

  await next()
})

// Rute Halaman Utama (Daftar Artikel)
app.get('/', async (c) => {
  // Mengambil Pengaturan Tema (Nuansa Architect)
  const { results: rawSettings } = await c.env.DB.prepare("SELECT * FROM settings").all()
  const settings = rawSettings.reduce((acc: any, curr: any) => {
    acc[curr.key] = curr.value; return acc
  }, {})
  
  const siteName = settings['siteName'] || 'Nuansa Web'
  const primaryColor = settings['primaryColor'] || '#3b82f6'

  let adsenseId = ''
  try {
    const { results: masterSettings } = await c.env.MASTER_DB.prepare("SELECT * FROM settings WHERE key = 'adsense_master_id'").all()
    if (masterSettings && masterSettings.length > 0) {
      adsenseId = masterSettings[0].value as string
    }
  } catch (e) {
    // MASTER_DB tidak ada tabel settings (abaikan)
  }

  // Mengambil Daftar Artikel
  const { results: posts } = await c.env.DB.prepare("SELECT * FROM posts WHERE status != 'draft' ORDER BY created_at DESC").all()

  return c.html(
    <Layout title={siteName} siteName={siteName} primaryColor={primaryColor} adsenseId={adsenseId}>
      {/* Hero Section */}
      <section class="bg-theme text-white py-24 text-center px-6">
        <h1 class="text-4xl md:text-5xl font-extrabold mb-6">Selamat Datang di {siteName}</h1>
        <p class="text-lg md:text-xl opacity-90 max-w-2xl mx-auto mb-8">
          Jelajahi wawasan, cerita, dan pemikiran terbaru yang kami bagikan langsung dengan kecepatan cahaya dari ujung jaringan (edge).
        </p>
      </section>

      {/* Grid Artikel */}
      <section class="max-w-5xl mx-auto px-6 py-16">
        <div class="flex items-center justify-between mb-8">
          <h2 class="text-2xl font-bold text-slate-900 dark:text-white">Artikel Terbaru</h2>
          <span class="text-sm font-medium text-slate-500 dark:text-slate-400">{posts.length} artikel</span>
        </div>

        {posts.length === 0 ? (
          <div class="text-center py-20 glassmorphism rounded-2xl border border-slate-200 dark:border-slate-800">
            <p class="text-slate-500 dark:text-slate-400">Belum ada artikel yang diterbitkan. Tunggu pembaruan kami selanjutnya!</p>
          </div>
        ) : (
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post: any) => (
              <a href={`/read/${post.slug}`} class="group glassmorphism rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden hover:shadow-xl dark:hover:shadow-slate-900/50 transition-all duration-300 flex flex-col h-full hover:-translate-y-1">
                <div class="h-48 bg-slate-100 dark:bg-slate-800/50 flex items-center justify-center border-b border-slate-200 dark:border-slate-800 text-slate-300 dark:text-slate-600 relative overflow-hidden">
                  <div class="absolute inset-0 bg-gradient-to-tr from-theme/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  {/* Placeholder gambar jika tidak ada cover */}
                  <svg class="w-12 h-12 relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                </div>
                <div class="p-6 flex flex-col flex-1 relative z-10">
                  <div class="text-xs font-semibold text-theme mb-3 uppercase tracking-wider">Artikel</div>
                  <h3 class="text-xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-theme transition line-clamp-2">
                    {post.title}
                  </h3>
                  <p class="text-slate-600 dark:text-slate-400 text-sm line-clamp-3 mb-6 flex-1">
                    {post.content ? post.content.replace(/<[^>]*>?/gm, '') : 'Tidak ada ringkasan...'}
                  </p>
                  <div class="text-xs text-slate-400 dark:text-slate-500 font-medium pt-4 border-t border-slate-100 dark:border-slate-800">
                    {new Date(post.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
                  </div>
                </div>
              </a>
            ))}
          </div>
        )}
      </section>
    </Layout>
  )
})

// Rute Membaca Artikel (dengan Content Locker)
app.get('/read/:slug', async (c) => {
  const slug = c.req.param('slug')
  
  const { results: rawSettings } = await c.env.DB.prepare("SELECT * FROM settings").all()
  const settings = rawSettings.reduce((acc: any, curr: any) => { acc[curr.key] = curr.value; return acc }, {})
  const siteName = settings['siteName'] || 'Nuansa Web'
  const primaryColor = settings['primaryColor'] || '#3b82f6'

  let adsenseId = ''
  try {
    const { results: masterSettings } = await c.env.MASTER_DB.prepare("SELECT * FROM settings WHERE key = 'adsense_master_id'").all()
    if (masterSettings && masterSettings.length > 0) {
      adsenseId = masterSettings[0].value as string
    }
  } catch (e) {}

  const post: any = await c.env.DB.prepare("SELECT * FROM posts WHERE slug = ?").bind(slug).first()

  if (!post) {
    return c.html(
      <Layout title={`Tidak Ditemukan - ${siteName}`} siteName={siteName} primaryColor={primaryColor}>
        <div class="max-w-2xl mx-auto px-6 py-32 text-center">
          <h1 class="text-4xl font-bold text-slate-900 mb-4">404 - Halaman Tidak Ditemukan</h1>
          <p class="text-slate-600 mb-8">Artikel yang Anda cari mungkin telah dihapus atau dipindahkan.</p>
          <a href="/" class="inline-block bg-theme text-white font-medium px-6 py-3 rounded-xl hover:opacity-90 transition">
            Kembali ke Beranda
          </a>
        </div>
      </Layout>, 404
    )
  }

  // Cek apakah artikel premium
  const isPremium = !!post.is_premium
  
  // Jika premium, cek cookie token akses
  const accessToken = getCookie(c, `access_${post.id}`)
  const hasAccess = !isPremium || (accessToken === `granted_${post.id}`)

  // Potong konten jika premium & belum punya akses (30% pertama)
  let displayContent = post.content || ''
  if (isPremium && !hasAccess) {
    try {
      const parsed = JSON.parse(displayContent)
      if (parsed.blocks && parsed.blocks.length > 0) {
        const cutoff = Math.max(1, Math.ceil(parsed.blocks.length * 0.3))
        parsed.blocks = parsed.blocks.slice(0, cutoff)
        displayContent = JSON.stringify(parsed)
      }
    } catch(e) {}
  }

  const price = post.price || 0

  return c.html(
    <Layout title={`${post.title} - ${siteName}`} siteName={siteName} primaryColor={primaryColor} adsenseId={adsenseId}>
      <article class="max-w-3xl mx-auto px-6 py-16">
        <a href="/" class="inline-flex items-center text-sm font-medium text-slate-500 dark:text-slate-400 hover:text-theme dark:hover:text-theme transition mb-10">
          &larr; Kembali ke Daftar Artikel
        </a>
        
        <header class="mb-12">
          {isPremium && (
            <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 text-xs font-semibold mb-4">
              <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
              KONTEN PREMIUM
            </div>
          )}
          <h1 class="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white leading-tight mb-6">{post.title}</h1>
          <div class="flex items-center text-slate-500 dark:text-slate-400 text-sm font-medium">
            <span>Diterbitkan pada {new Date(post.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
          </div>
        </header>

        <div class={`prose prose-lg prose-slate dark:prose-invert max-w-none prose-headings:font-bold prose-a:text-theme relative ${isPremium && !hasAccess ? 'max-h-[500px] overflow-hidden' : ''}`}>
          <div dangerouslySetInnerHTML={{__html: displayContent}} />
          
          {/* Nuansa Content Locker Overlay - Hanya jika premium dan belum punya akses */}
          {isPremium && !hasAccess && (
            <div class="absolute bottom-0 left-0 w-full h-96 bg-gradient-to-t from-slate-50 dark:from-slate-900 to-transparent flex items-end justify-center pb-8">
              <div class="glassmorphism p-8 rounded-2xl shadow-[0_20px_50px_-12px_rgba(0,0,0,0.15)] border border-slate-200 dark:border-slate-700/50 text-center max-w-md mx-auto relative z-10 w-full">
                <div class="w-16 h-16 bg-amber-100 dark:bg-amber-900/30 text-amber-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
                </div>
                <h3 class="text-xl font-bold text-slate-900 dark:text-white mb-2">Artikel Premium</h3>
                <p class="text-slate-500 dark:text-slate-400 text-sm mb-2">Anda membaca pratinjau singkat. Beli akses untuk membaca artikel lengkap ini.</p>
                <p class="text-2xl font-extrabold text-theme mb-6">Rp {price.toLocaleString('id-ID')}</p>
                <div class="space-y-3">
                  <form action="/api/grant-access" method="POST">
                    <input type="hidden" name="post_id" value={post.id} />
                    <input type="hidden" name="slug" value={post.slug} />
                    <button type="submit" class="w-full bg-theme hover:opacity-90 text-white font-semibold py-3 rounded-xl transition shadow-lg flex items-center justify-center gap-2">
                      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z"></path></svg>
                      Beli Akses &rarr; Rp {price.toLocaleString('id-ID')}
                    </button>
                  </form>
                </div>
              </div>
            </div>
          )}
        </div>
      </article>
    </Layout>
  )
})

// Endpoint untuk memberikan akses token artikel premium (simulasi pembayaran)
app.post('/api/grant-access', async (c) => {
  const body = await c.req.parseBody()
  const postId = body['post_id'] as string
  const slug = body['slug'] as string
  
  if (!postId || !slug) return c.redirect('/')
  
  // Set cookie token akses (expired 7 hari)
  setCookie(c, `access_${postId}`, `granted_${postId}`, {
    maxAge: 60 * 60 * 24 * 7,
    path: '/',
    httpOnly: true,
    sameSite: 'Lax',
  })
  
  return c.redirect(`/read/${slug}`)
})


app.get('/katalog', async (c) => {
  const { results: rawSettings } = await c.env.DB.prepare("SELECT * FROM settings").all()
  const settings = rawSettings.reduce((acc: any, curr: any) => { acc[curr.key] = curr.value; return acc }, {})
  const siteName = settings['siteName'] || 'Nuansa Web'
  const primaryColor = settings['primaryColor'] || '#3b82f6'

  // Pastikan tabel products ada (jika tenant belum update, tangani error)
  let products = []
  try {
    const { results } = await c.env.DB.prepare("SELECT * FROM products ORDER BY created_at DESC").all()
    products = results
  } catch (e) {
    // Tabel belum dibuat atau error
    products = []
  }

  let adsenseId = ''
  try {
    const { results: masterSettings } = await c.env.MASTER_DB.prepare("SELECT * FROM settings WHERE key = 'adsense_master_id'").all()
    if (masterSettings && masterSettings.length > 0) {
      adsenseId = masterSettings[0].value as string
    }
  } catch (e) {}

  return c.html(
    <Layout title={`Katalog Produk - ${siteName}`} siteName={siteName} primaryColor={primaryColor} adsenseId={adsenseId}>
      <div class="max-w-5xl mx-auto px-6 py-16">
        <header class="text-center mb-16">
          <h1 class="text-4xl font-extrabold text-slate-900 dark:text-white mb-4">Katalog Kami</h1>
          <p class="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">Jelajahi produk-produk pilihan terbaik dengan kualitas terjamin. Pesan sekarang melalui WhatsApp untuk respon cepat.</p>
        </header>

        {products.length === 0 ? (
          <div class="text-center py-20 glassmorphism rounded-2xl border border-slate-200 dark:border-slate-800">
            <p class="text-slate-500 dark:text-slate-400">Belum ada produk yang tersedia. Kunjungi kembali nanti!</p>
          </div>
        ) : (
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((p: any) => {
              const waText = encodeURIComponent(`Halo ${siteName}, saya tertarik untuk memesan produk:\n\n*${p.name}*\nHarga: Rp ${p.price.toLocaleString('id-ID')}\n\nApakah stok masih tersedia?`)
              const waLink = `https://wa.me/6282313544664?text=${waText}`

              return (
                <div class="glassmorphism rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden hover:shadow-xl dark:hover:shadow-slate-900/50 transition-all flex flex-col hover:-translate-y-1">
                  <div class="h-56 bg-slate-100 dark:bg-slate-800/50 flex items-center justify-center border-b border-slate-200 dark:border-slate-800 text-slate-300 dark:text-slate-600 relative overflow-hidden group">
                    <div class="absolute inset-0 bg-gradient-to-tr from-theme/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity z-10 pointer-events-none"></div>
                    {p.image_url ? (
                      <img src={p.image_url} alt={p.name} class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    ) : (
                      <svg class="w-16 h-16 opacity-50 relative z-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path></svg>
                    )}
                    {p.stock <= 0 && (
                      <div class="absolute inset-0 bg-white/60 dark:bg-slate-900/60 backdrop-blur-[2px] flex items-center justify-center z-20">
                        <span class="bg-red-500 text-white font-bold px-4 py-2 rounded-full transform -rotate-12 shadow-lg">HABIS</span>
                      </div>
                    )}
                  </div>
                  <div class="p-6 flex flex-col flex-1 relative z-10">
                    <h3 class="text-xl font-bold text-slate-900 dark:text-white mb-2">{p.name}</h3>
                    <p class="text-slate-500 dark:text-slate-400 text-sm mb-4 line-clamp-2 flex-1">{p.description || 'Tidak ada deskripsi.'}</p>
                    <div class="flex items-center justify-between mb-6">
                      <div class="text-2xl font-extrabold text-theme">
                        Rp {p.price.toLocaleString('id-ID')}
                      </div>
                      <div class="text-xs font-semibold text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-3 py-1.5 rounded-full">
                        Stok: {p.stock}
                      </div>
                    </div>
                    
                    <a href={waLink} target="_blank" class={`w-full text-center font-bold py-3.5 rounded-xl transition-all flex items-center justify-center gap-2 ${p.stock > 0 ? 'bg-[#25D366] hover:bg-[#1EBE5D] text-white shadow-lg shadow-[#25D366]/20' : 'bg-slate-200 dark:bg-slate-800 text-slate-400 dark:text-slate-600 cursor-not-allowed pointer-events-none'}`}>
                      <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 00-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
                      {p.stock > 0 ? 'Beli via WhatsApp' : 'Sedang Kosong'}
                    </a>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </Layout>
  )
})
// Endpoint untuk mencatat pesanan sebelum redirect ke WhatsApp
app.post('/api/order', async (c) => {
  try {
    const body = await c.req.parseBody()
    const productId = body['product_id'] as string
    const customerName = (body['customer_name'] as string) || 'Pelanggan'
    const customerPhone = (body['customer_phone'] as string) || '082313544664'
    const quantity = parseInt(body['quantity'] as string) || 1
    const totalPrice = parseInt(body['total_price'] as string) || 0
    const waUrl = body['wa_url'] as string

    await c.env.DB.prepare(
      "INSERT INTO orders (id, product_id, customer_name, customer_phone, quantity, total_price, status) VALUES (?, ?, ?, ?, ?, ?, 'pending')"
    ).bind(crypto.randomUUID(), productId, customerName, customerPhone, quantity, totalPrice).run()

    // Kirim notifikasi Telegram
    c.executionCtx.waitUntil((async () => {
      try {
        const product: any = await c.env.DB.prepare("SELECT name FROM products WHERE id = ?").bind(productId).first()
        const productName = product?.name || 'Produk'
        
        const { results: rawSettings } = await c.env.DB.prepare("SELECT * FROM settings WHERE key IN ('telegram_bot_token', 'telegram_chat_id')").all()
        const settings = rawSettings.reduce((acc: any, curr: any) => { acc[curr.key] = curr.value; return acc }, {})
        const token = settings['telegram_bot_token']
        const chatId = settings['telegram_chat_id']

        if (token && chatId) {
          const message = `🛒 *Pesanan Baru!*\n\n*Nama:* ${customerName}\n*No. WA:* ${customerPhone}\n*Produk:* ${productName} (x${quantity})\n*Total:* Rp ${totalPrice.toLocaleString('id-ID')}\n*Status:* Pending`
          await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ chat_id: chatId, text: message, parse_mode: 'Markdown' })
          })
        }
      } catch (e) {
        console.error('Gagal mengirim notifikasi Telegram:', e)
      }
    })())

    if (waUrl) return c.redirect(waUrl)
    return c.redirect('/katalog')
  } catch (e) {
    return c.redirect('/katalog')
  }
})

// ── NUANSA LEARN PUBLIC ROUTES ─────────────────────────────────

// Katalog Kursus
app.get('/belajar', async (c) => {
  const { results: rawSettings } = await c.env.DB.prepare("SELECT * FROM settings").all()
  const settings = rawSettings.reduce((acc: any, curr: any) => { acc[curr.key] = curr.value; return acc }, {})
  const siteName = settings['siteName'] || 'Nuansa Web'
  const primaryColor = settings['primaryColor'] || '#3b82f6'

  let adsenseId = ''
  try {
    const { results: ms } = await c.env.MASTER_DB.prepare("SELECT * FROM settings WHERE key = 'adsense_master_id'").all()
    if (ms?.length) adsenseId = ms[0].value as string
  } catch(e) {}

  let courses: any[] = []
  try {
    const { results } = await c.env.DB.prepare(
      "SELECT c.*, (SELECT COUNT(*) FROM lessons l WHERE l.course_id = c.id) as lesson_count FROM courses c WHERE c.is_published = 1 ORDER BY c.created_at DESC"
    ).all()
    courses = results
  } catch(e) {}

  return c.html(
    <Layout title={`Belajar - ${siteName}`} siteName={siteName} primaryColor={primaryColor} adsenseId={adsenseId}>
      <section class="bg-theme text-white py-20 text-center px-6">
        <div class="max-w-3xl mx-auto">
          <div class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/20 text-sm font-medium mb-6">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path></svg>
            Nuansa Learn
          </div>
          <h1 class="text-4xl md:text-5xl font-extrabold mb-4">Belajar dari Ahlinya</h1>
          <p class="text-lg opacity-90">Kursus terstruktur, langsung dari para praktisi. Belajar kapanpun, dimanapun.</p>
        </div>
      </section>

      <section class="max-w-5xl mx-auto px-6 py-16">
        <div class="flex items-center justify-between mb-8">
          <h2 class="text-2xl font-bold text-slate-900 dark:text-white">Semua Kursus</h2>
          <span class="text-sm text-slate-500">{courses.length} kursus tersedia</span>
        </div>

        {courses.length === 0 ? (
          <div class="glassmorphism rounded-2xl border border-slate-200 dark:border-slate-800 p-16 text-center">
            <p class="text-slate-500 dark:text-slate-400">Belum ada kursus yang tersedia. Kunjungi kembali nanti!</p>
          </div>
        ) : (
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {courses.map((course: any) => (
              <a href={`/belajar/${course.slug}`} class="group glassmorphism rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden hover:shadow-xl transition-all hover:-translate-y-1 flex flex-col">
                <div class="h-44 bg-gradient-to-br from-indigo-500 to-purple-600 relative overflow-hidden">
                  {course.cover_image ? (
                    <img src={course.cover_image} alt={course.title} class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  ) : (
                    <div class="absolute inset-0 flex items-center justify-center">
                      <svg class="w-12 h-12 text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path></svg>
                    </div>
                  )}
                </div>
                <div class="p-5 flex flex-col flex-1">
                  <div class="text-xs font-semibold text-indigo-500 uppercase tracking-wider mb-2">{course.lesson_count} Materi</div>
                  <h3 class="text-lg font-bold text-slate-900 dark:text-white mb-2 line-clamp-2 group-hover:text-indigo-600 transition">{course.title}</h3>
                  <p class="text-sm text-slate-500 dark:text-slate-400 line-clamp-2 mb-4 flex-1">{course.description}</p>
                  <div class="flex items-center justify-between pt-3 border-t border-slate-100 dark:border-slate-800">
                    <span class="text-xl font-extrabold text-indigo-600 dark:text-indigo-400">
                      {course.price === 0 ? '🎓 Gratis' : `Rp ${course.price.toLocaleString('id-ID')}`}
                    </span>
                    <span class="text-xs text-slate-400">Lihat Kursus →</span>
                  </div>
                </div>
              </a>
            ))}
          </div>
        )}
      </section>
    </Layout>
  )
})

// Detail Kursus
app.get('/belajar/:slug', async (c) => {
  const slug = c.req.param('slug')
  const { results: rawSettings } = await c.env.DB.prepare("SELECT * FROM settings").all()
  const settings = rawSettings.reduce((acc: any, curr: any) => { acc[curr.key] = curr.value; return acc }, {})
  const siteName = settings['siteName'] || 'Nuansa Web'
  const primaryColor = settings['primaryColor'] || '#3b82f6'

  let adsenseId = ''
  try {
    const { results: ms } = await c.env.MASTER_DB.prepare("SELECT * FROM settings WHERE key = 'adsense_master_id'").all()
    if (ms?.length) adsenseId = ms[0].value as string
  } catch(e) {}

  const course: any = await c.env.DB.prepare("SELECT * FROM courses WHERE slug = ? AND is_published = 1").bind(slug).first()
  if (!course) return c.redirect('/belajar')

  const { results: lessons } = await c.env.DB.prepare(
    "SELECT id, title, order_index, is_preview FROM lessons WHERE course_id = ? ORDER BY order_index ASC"
  ).bind(course.id).all()

  // Cek enrollment cookie
  const enrollToken = getCookie(c, `enroll_${course.id}`)
  const isEnrolled = course.price === 0 || (enrollToken && enrollToken.startsWith(`enrolled_${course.id}`))

  return c.html(
    <Layout title={`${course.title} - ${siteName}`} siteName={siteName} primaryColor={primaryColor} adsenseId={adsenseId}>
      <div class="max-w-4xl mx-auto px-6 py-16">
        <a href="/belajar" class="inline-flex items-center text-sm text-slate-500 hover:text-theme transition mb-8">
          &larr; Semua Kursus
        </a>

        <div class="grid md:grid-cols-3 gap-8">
          {/* Kiri: Info Kursus */}
          <div class="md:col-span-2">
            <div class="h-64 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 mb-6 overflow-hidden">
              {course.cover_image && <img src={course.cover_image} alt={course.title} class="w-full h-full object-cover" />}
            </div>
            <h1 class="text-3xl font-extrabold text-slate-900 dark:text-white mb-3">{course.title}</h1>
            <p class="text-slate-600 dark:text-slate-400 mb-8">{course.description}</p>

            <h2 class="text-lg font-bold text-slate-900 dark:text-white mb-4">Daftar Materi</h2>
            <div class="space-y-2">
              {(lessons as any[]).map((lesson: any, idx: number) => {
                const canAccess = isEnrolled || lesson.is_preview
                return (
                  <div class="glassmorphism rounded-xl border border-slate-200 dark:border-slate-800 p-4 flex items-center gap-3">
                    <div class={`w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold shrink-0 ${canAccess ? 'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600' : 'bg-slate-100 dark:bg-slate-800 text-slate-400'}`}>
                      {canAccess ? idx + 1 : '🔒'}
                    </div>
                    <div class="flex-1">
                      {canAccess ? (
                        <a href={`/belajar/${course.slug}/${lesson.id}`} class="font-medium text-slate-900 dark:text-white hover:text-indigo-600 dark:hover:text-indigo-400 transition">
                          {lesson.title}
                        </a>
                      ) : (
                        <span class="font-medium text-slate-400">{lesson.title}</span>
                      )}
                    </div>
                    {lesson.is_preview && (
                      <span class="text-xs px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 shrink-0">Gratis</span>
                    )}
                  </div>
                )
              })}
            </div>
          </div>

          {/* Kanan: CTA Enroll */}
          <div class="md:col-span-1">
            <div class="glassmorphism rounded-2xl border border-slate-200 dark:border-slate-800 p-6 sticky top-24">
              <div class="text-3xl font-extrabold text-indigo-600 dark:text-indigo-400 mb-2">
                {course.price === 0 ? 'Gratis' : `Rp ${course.price.toLocaleString('id-ID')}`}
              </div>
              <p class="text-sm text-slate-500 dark:text-slate-400 mb-6">{lessons.length} materi &bull; Akses seumur hidup</p>

              {isEnrolled ? (
                <div>
                  <div class="w-full text-center py-3 rounded-xl bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 font-semibold mb-3">✓ Sudah Terdaftar</div>
                  {lessons.length > 0 && (
                    <a href={`/belajar/${course.slug}/${(lessons[0] as any).id}`} class="w-full block text-center py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold transition">
                      Mulai Belajar →
                    </a>
                  )}
                </div>
              ) : (
                <form action="/api/enroll" method="POST">
                  <input type="hidden" name="course_id" value={course.id} />
                  <input type="hidden" name="course_slug" value={course.slug} />
                  <input type="hidden" name="price" value={course.price} />
                  {course.price > 0 && (
                    <input type="email" name="email" required placeholder="Masukkan email Anda" class="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500 mb-3 transition" />
                  )}
                  <button type="submit" class="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold transition">
                    {course.price === 0 ? 'Daftar Gratis' : `Beli Kursus → Rp ${course.price.toLocaleString('id-ID')}`}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
})

// Baca Materi (Lesson Reader)
app.get('/belajar/:slug/:lessonId', async (c) => {
  const slug = c.req.param('slug')
  const lessonId = c.req.param('lessonId')

  const { results: rawSettings } = await c.env.DB.prepare("SELECT * FROM settings").all()
  const settings = rawSettings.reduce((acc: any, curr: any) => { acc[curr.key] = curr.value; return acc }, {})
  const siteName = settings['siteName'] || 'Nuansa Web'
  const primaryColor = settings['primaryColor'] || '#3b82f6'

  const course: any = await c.env.DB.prepare("SELECT * FROM courses WHERE slug = ?").bind(slug).first()
  if (!course) return c.redirect('/belajar')

  const lesson: any = await c.env.DB.prepare("SELECT * FROM lessons WHERE id = ? AND course_id = ?").bind(lessonId, course.id).first()
  if (!lesson) return c.redirect(`/belajar/${slug}`)

  const { results: allLessons } = await c.env.DB.prepare(
    "SELECT id, title, order_index, is_preview FROM lessons WHERE course_id = ? ORDER BY order_index ASC"
  ).bind(course.id).all()

  const enrollToken = getCookie(c, `enroll_${course.id}`)
  const isEnrolled = course.price === 0 || (enrollToken && enrollToken.startsWith(`enrolled_${course.id}`))

  if (!isEnrolled && !lesson.is_preview) {
    return c.redirect(`/belajar/${slug}`)
  }

  const currentIdx = (allLessons as any[]).findIndex(l => l.id === lessonId)
  const prevLesson = currentIdx > 0 ? (allLessons as any[])[currentIdx - 1] : null
  const nextLesson = currentIdx < allLessons.length - 1 ? (allLessons as any[])[currentIdx + 1] : null

  return c.html(
    <Layout title={`${lesson.title} - ${course.title} | ${siteName}`} siteName={siteName} primaryColor={primaryColor}>
      <div class="max-w-5xl mx-auto px-6 py-10 grid md:grid-cols-4 gap-8">
        {/* Sidebar Daftar Materi */}
        <aside class="md:col-span-1">
          <div class="glassmorphism rounded-2xl border border-slate-200 dark:border-slate-800 p-4 sticky top-24">
            <a href={`/belajar/${slug}`} class="text-xs font-semibold text-slate-500 hover:text-indigo-500 transition flex items-center gap-1 mb-4">
              ← {course.title}
            </a>
            <div class="space-y-1">
              {(allLessons as any[]).map((l: any, idx: number) => {
                const canAccess = isEnrolled || l.is_preview
                const isActive = l.id === lessonId
                return canAccess ? (
                  <a href={`/belajar/${slug}/${l.id}`} class={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition ${isActive ? 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 font-semibold' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'}`}>
                    <span class="shrink-0 w-5 h-5 rounded-full bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 text-xs flex items-center justify-center font-bold">{idx + 1}</span>
                    <span class="line-clamp-2">{l.title}</span>
                  </a>
                ) : (
                  <div class="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-slate-400">
                    <span class="shrink-0 text-xs">🔒</span>
                    <span class="line-clamp-2">{l.title}</span>
                  </div>
                )
              })}
            </div>
          </div>
        </aside>

        {/* Konten Materi */}
        <main class="md:col-span-3">
          <h1 class="text-3xl font-extrabold text-slate-900 dark:text-white mb-8">{lesson.title}</h1>
          <div class="prose prose-lg prose-slate dark:prose-invert max-w-none prose-headings:font-bold prose-a:text-indigo-600">
            <div dangerouslySetInnerHTML={{__html: lesson.content || '<p class="text-slate-500">Konten materi belum ditambahkan.</p>'}} />
          </div>

          {/* Navigasi Antar Materi */}
          <div class="flex items-center justify-between mt-12 pt-8 border-t border-slate-200 dark:border-slate-800">
            {prevLesson ? (
              <a href={`/belajar/${slug}/${(prevLesson as any).id}`} class="flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-indigo-600 transition">
                ← {(prevLesson as any).title}
              </a>
            ) : <div />}
            {nextLesson ? (
              <a href={`/belajar/${slug}/${(nextLesson as any).id}`} class="flex items-center gap-2 text-sm font-medium text-indigo-600 hover:text-indigo-500 transition">
                {(nextLesson as any).title} →
              </a>
            ) : (
              <a href={`/belajar/${slug}`} class="flex items-center gap-2 text-sm font-medium text-emerald-600 hover:text-emerald-500 transition">
                ✓ Selesai! Kembali ke kursus
              </a>
            )}
          </div>
        </main>
      </div>
    </Layout>
  )
})

// Endpoint Enroll (Daftar Kursus)
app.post('/api/enroll', async (c) => {
  try {
    const body = await c.req.parseBody()
    const courseId = body['course_id'] as string
    const courseSlug = body['course_slug'] as string
    const price = parseInt(body['price'] as string) || 0
    const email = (body['email'] as string) || 'gratis@nuansa.web.id'

    const token = `enrolled_${courseId}_${crypto.randomUUID()}`

    // Simpan enrollment ke DB
    await c.env.DB.prepare(
      "INSERT INTO enrollments (id, course_id, student_email, access_token) VALUES (?, ?, ?, ?)"
    ).bind(crypto.randomUUID(), courseId, email, token).run()

    // Set cookie akses (30 hari)
    setCookie(c, `enroll_${courseId}`, token, {
      maxAge: 60 * 60 * 24 * 30,
      path: '/',
      httpOnly: true,
      sameSite: 'Lax',
    })

    // Kirim notifikasi Telegram
    c.executionCtx.waitUntil((async () => {
      try {
        const course: any = await c.env.DB.prepare("SELECT title FROM courses WHERE id = ?").bind(courseId).first()
        const courseTitle = course?.title || 'Kursus'

        const { results: rawSettings } = await c.env.DB.prepare("SELECT * FROM settings WHERE key IN ('telegram_bot_token', 'telegram_chat_id')").all()
        const settings = rawSettings.reduce((acc: any, curr: any) => { acc[curr.key] = curr.value; return acc }, {})
        const botToken = settings['telegram_bot_token']
        const chatId = settings['telegram_chat_id']

        if (botToken && chatId) {
          const message = `🎓 *Pendaftar Kelas Baru!*\n\n*Email:* ${email}\n*Kelas:* ${courseTitle}\n*Harga:* Rp ${price.toLocaleString('id-ID')}`
          await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ chat_id: chatId, text: message, parse_mode: 'Markdown' })
          })
        }
      } catch (e) {
        console.error('Gagal mengirim notifikasi Telegram:', e)
      }
    })())

    return c.redirect(`/belajar/${courseSlug}`)
  } catch(e) {
    console.error(e)
    return c.redirect('/belajar')
  }
})

// Rute Registrasi & Login
app.get('/login', (c) => c.redirect('https://studio.nuansa.net'))

app.get('/register', (c) => {
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
          <style>
            @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
            body { font-family: 'Plus Jakarta Sans', sans-serif; }
            .glassmorphism {
              background: rgba(255, 255, 255, 0.7);
              backdrop-filter: blur(16px);
              -webkit-backdrop-filter: blur(16px);
              border: 1px solid rgba(255, 255, 255, 0.5);
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
          </style>
        `}
      </head>
      <body class="bg-slate-50 text-slate-900 min-h-screen selection:bg-blue-500/30 transition-colors duration-300">
        <div class="min-h-screen relative overflow-hidden flex flex-col">
          <div class="absolute inset-0 z-0 pointer-events-none animate-mesh"></div>

          <nav class="w-full max-w-6xl mx-auto px-6 py-8 relative z-10 flex justify-between items-center border-b border-slate-200/50">
            <div class="flex items-center gap-3">
              <a href="/" class="text-xl font-bold tracking-tight">Nuansa<span class="font-normal text-slate-500">.net</span></a>
            </div>
            <div class="hidden md:flex gap-4 items-center text-sm font-medium">
              <a href="/login" class="text-blue-600 hover:text-blue-700 transition px-5 py-2.5 rounded-xl bg-blue-50 border border-blue-100">Masuk ke Dashboard</a>
            </div>
          </nav>

          <main class="flex-grow w-full max-w-6xl mx-auto px-6 py-12 md:py-20 relative z-10 grid md:grid-cols-2 gap-16 items-center">
            <div>
              <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-sm font-medium border border-blue-100 mb-6">
                <span class="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
                Omni-Platform Baru
              </div>
              <h1 class="text-5xl md:text-6xl font-extrabold leading-[1.1] tracking-tight mb-6">
                Mulai Kelola Konten Anda.
              </h1>
              <p class="text-lg text-slate-600 mb-10 leading-relaxed max-w-md">
                Daftar sekarang untuk mendapatkan ruang kerja (Tenant) instan dan bangun platform berkinerja tinggi bersama Nuansa.
              </p>
            </div>

            <div class="glassmorphism p-8 md:p-10 rounded-3xl shadow-2xl relative">
              <div class="relative">
                <h3 class="text-2xl font-bold mb-2">Daftar Akun Klien</h3>
                <p class="text-sm text-slate-500 mb-8">Buat ruang kerja (Tenant) instan Anda sendiri.</p>
                
                <form method="POST" action="/api/tenants" class="space-y-6">
                  <div>
                    <label class="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Nama Perusahaan / Website</label>
                    <input type="text" name="name" placeholder="Misal: PT Maju Bersama" required class="w-full bg-white/50 border border-slate-200 rounded-xl px-4 py-3.5 focus:outline-none focus:border-blue-500 transition shadow-inner" />
                  </div>
                  <div>
                    <label class="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Email Administrator Utama</label>
                    <input type="email" name="email" placeholder="admin@majubersama.com" required class="w-full bg-white/50 border border-slate-200 rounded-xl px-4 py-3.5 focus:outline-none focus:border-blue-500 transition shadow-inner" />
                  </div>
                  <div>
                    <label class="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Kata Sandi (Password)</label>
                    <input type="password" name="password" placeholder="Min. 8 karakter" required minlength="8" class="w-full bg-white/50 border border-slate-200 rounded-xl px-4 py-3.5 focus:outline-none focus:border-blue-500 transition shadow-inner" />
                  </div>
                  <button type="submit" class="w-full bg-blue-600 hover:bg-blue-500 text-white font-semibold py-4 px-4 rounded-xl transition-all shadow-lg shadow-blue-500/20 mt-4">
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

app.post('/api/tenants', async (c) => {
  try {
    const contentType = c.req.header('content-type') || ''
    let name = ''
    let email = ''
    let password = ''
    
    if (contentType.includes('application/x-www-form-urlencoded') || contentType.includes('multipart/form-data')) {
      const formData = await c.req.parseBody()
      name = formData['name'] as string
      email = formData['email'] as string
      password = formData['password'] as string
    } else {
      const body = await c.req.json()
      name = body.name
      email = body.email
      password = body.password
    }

    if (!name || !email || !password) {
      return c.text('Name, Email, and Password are required', 400)
    }

    const tenantId = crypto.randomUUID()
    const userId = crypto.randomUUID()
    const nowMs = Date.now()

    // Hash password using Web Crypto API (SHA-256)
    const msgUint8 = new TextEncoder().encode(password)
    const hashBuffer = await crypto.subtle.digest('SHA-256', msgUint8)
    const hashArray = Array.from(new Uint8Array(hashBuffer))
    const hashedPassword = hashArray.map((b) => b.toString(16).padStart(2, '0')).join('')

    await c.env.MASTER_DB.prepare(
      "INSERT INTO tenants (id, name, plan, created_at) VALUES (?, ?, ?, ?)"
    ).bind(tenantId, name, 'gratis', nowMs).run()

    await c.env.MASTER_DB.prepare(
      "INSERT INTO users (id, tenant_id, email, password, role, created_at) VALUES (?, ?, ?, ?, ?, ?)"
    ).bind(userId, tenantId, email, hashedPassword, 'admin', nowMs).run()

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

export default app
