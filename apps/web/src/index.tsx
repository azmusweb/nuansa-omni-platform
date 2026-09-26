import { Hono } from 'hono'
import type { FC } from 'hono/jsx'
import { getCookie, setCookie } from 'hono/cookie'
import { html, raw } from 'hono/html'

type Bindings = {
  DB: D1Database
  MASTER_DB: D1Database
}

const app = new Hono<{ 
  Bindings: Bindings,
  Variables: {
    tenantId: string
  }
}>()

// Helper untuk Resolusi AdSense Dinamis (70% Klien, 30% Master)
async function getAdsenseId(c: any, settings: any) {
  let masterId = ''
  try {
    const { results } = await c.env.MASTER_DB.prepare("SELECT * FROM settings WHERE key = 'adsense_master_id'").all()
    if (results && results.length > 0) masterId = results[0].value as string
  } catch(e) {}

  const clientId = settings['adsense_client_id'] || ''
  
  if (clientId && masterId) {
    return Math.random() < 0.7 ? clientId : masterId
  }
  return clientId || masterId
}

// Helper untuk Nuansa Polyglot (Edge Geo-routing AI Translation Mock)
const getLangContext = (c: any) => {
  // Deteksi negara dari Cloudflare Edge (fallback ke ID jika lokal)
  const country = c.req.header('cf-ipcountry') || 'ID'
  const lang = country === 'ID' ? 'id' : 'en'
  
  const dict = {
    'id': {
      home: 'Beranda', learn: 'Belajar', catalog: 'Katalog Produk', login: 'Login', register: 'Daftar',
      welcome: 'Selamat Datang di',
      hero_desc: 'Jelajahi wawasan, cerita, dan pemikiran terbaru yang kami bagikan langsung dengan kecepatan cahaya dari ujung jaringan (edge).',
      latest_articles: 'Artikel Terbaru', articles_count: 'artikel',
      no_articles: 'Belum ada artikel yang diterbitkan. Tunggu pembaruan kami selanjutnya!',
      article_badge: 'Artikel', no_summary: 'Tidak ada ringkasan...',
      rights: 'Hak Cipta Dilindungi.', powered: 'Didukung oleh Nuansa Network (Edge-Native CMS)'
    },
    'en': {
      home: 'Home', learn: 'Learn', catalog: 'Products', login: 'Sign In', register: 'Sign Up',
      welcome: 'Welcome to',
      hero_desc: 'Explore the latest insights, stories, and thoughts we share at the speed of light from the edge of the network.',
      latest_articles: 'Latest Articles', articles_count: 'articles',
      no_articles: 'No articles published yet. Stay tuned for our next update!',
      article_badge: 'Article', no_summary: 'No summary available...',
      rights: 'All Rights Reserved.', powered: 'Powered by Nuansa Network (Edge-Native CMS)'
    }
  }

  const t = (key: keyof typeof dict['id']) => dict[lang][key] || dict['id'][key]
  return { lang, t }
}

import { defaultThemeHtml } from './theme'

const Layout: FC<{ title: string, siteName: string, primaryColor: string, adsenseId?: string, lang?: string, t?: any, customThemeHtml?: string, description?: string, image?: string, url?: string, children: any }> = ({ title, siteName, primaryColor, adsenseId, lang = 'id', t = getLangContext({ req: { header: () => 'ID' } }).t, customThemeHtml, description, image, url, children }) => {
  const isMaster = siteName === 'Nuansa Network';
  const themeToRender = isMaster ? defaultThemeHtml : (customThemeHtml || defaultThemeHtml);

  if (themeToRender) {
    const parts = themeToRender.split('{{content}}')
    const pre = parts[0] ? parts[0].replace(/{{siteName}}/g, siteName).replace(/{{title}}/g, title).replace(/{{primaryColor}}/g, primaryColor) : ''
    const post = parts[1] ? parts[1].replace(/{{siteName}}/g, siteName).replace(/{{title}}/g, title).replace(/{{primaryColor}}/g, primaryColor) : ''
    return (
      <>
        {raw(pre)}
        {children}
        {raw(post)}
      </>
    )
  }

  return <html><body>Error: No theme available.</body></html>
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

app.use('*', async (c, next) => {
  const path = c.req.path
  
  if (!path.startsWith('/api/') && !path.includes('.')) {
    const host = c.req.header('host') || ''
    let tenantId = ''
    
    // Check if it's a known custom domain first
    const domainRec = await c.env.MASTER_DB.prepare("SELECT tenant_id FROM domains WHERE domain = ? AND is_active = 1").bind(host).first()
    
    if (domainRec) {
      tenantId = domainRec.tenant_id as string
    } else if (host.endsWith('.nuansa.net')) {
      const subdomain = host.split('.')[0]
      const tenant = await c.env.MASTER_DB.prepare("SELECT id FROM tenants WHERE name = ?").bind(subdomain).first()
      if (tenant) tenantId = tenant.id as string
    }
    
    if (!tenantId) {
      if (!c.req.path.startsWith('/api/') && c.req.path !== '/register') {
          return c.text('Website Not Found. Domain is not connected.', 404)
      }
    }
    c.set('tenantId', tenantId)

    // 1. Cek Redirect
    try {
      const redirectRow = await c.env.DB.prepare("SELECT * FROM redirects WHERE source_url = ? AND tenant_id = ?").bind(path, tenantId).first()
      if (redirectRow) {
        return c.redirect(redirectRow.target_url as string, (redirectRow.status_code as any) || 301)
      }
    } catch(e) {}

    // 2. Catat Analytics
    if (tenantId) {
      try {
        await c.env.DB.prepare(
          "INSERT INTO analytics (id, tenant_id, path, views, last_visited_at) VALUES (?, ?, ?, 1, CURRENT_TIMESTAMP) ON CONFLICT(path) DO UPDATE SET views = views + 1, last_visited_at = CURRENT_TIMESTAMP"
        ).bind(crypto.randomUUID(), tenantId, path).run()
      } catch(e) {}
    }
  }

  await next()
})

// Rute Halaman Utama (Daftar Artikel)
app.get('/', async (c) => {
  // Mengambil Pengaturan Tema (Nuansa Architect)
  const { results: rawSettings } = await c.env.DB.prepare("SELECT * FROM settings WHERE tenant_id = ?").bind(c.get("tenantId")).all()
  const settings = rawSettings.reduce((acc: any, curr: any) => {
    acc[curr.key] = curr.value; return acc
  }, {})
  
  const siteName = 'Nuansa Network'
  const primaryColor = settings['primaryColor'] || '#3b82f6'

  const adsenseId = await getAdsenseId(c, settings)

  // Mengambil Daftar Artikel
  const { results: posts } = await c.env.DB.prepare("SELECT * FROM posts WHERE status != 'draft' AND tenant_id = ? ORDER BY created_at DESC").bind(c.get("tenantId")).all()

  const { lang, t } = getLangContext(c)

  return c.html(
    <Layout title={siteName} siteName={siteName} primaryColor={primaryColor} adsenseId={adsenseId} lang={lang} t={t} customThemeHtml={settings['customThemeHtml']}>
      {/* Hero Section Modernized */}
      <section class="relative py-32 md:py-48 text-center px-6 overflow-hidden">
        <div class="absolute inset-0 bg-theme/10 dark:bg-theme/5 mix-blend-multiply"></div>
        <div class="absolute -top-40 -right-40 w-96 h-96 bg-theme/20 rounded-full blur-[100px] pointer-events-none"></div>
        <div class="absolute top-40 -left-40 w-96 h-96 bg-purple-500/20 rounded-full blur-[100px] pointer-events-none"></div>
        <div class="max-w-4xl mx-auto relative z-10 fade-in-up">
          <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-theme/10 dark:bg-theme/20 border border-theme/20 text-theme text-sm font-bold tracking-wide uppercase mb-8 shadow-sm">
            <span class="w-2 h-2 rounded-full bg-theme animate-pulse"></span>
            Platform Edge-Native
          </div>
          <h1 class="text-5xl md:text-7xl font-extrabold mb-8 text-slate-900 dark:text-white leading-[1.1] tracking-tight">
            {t('welcome')} <span class="text-transparent bg-clip-text bg-gradient-to-r from-theme to-purple-600">{siteName}</span>
          </h1>
          <p class="text-lg md:text-2xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto mb-10 leading-relaxed font-medium">
            {t('hero_desc')}
          </p>
          <a href="#articles" class="inline-flex items-center justify-center gap-2 bg-theme hover:bg-theme/90 text-white hover:-translate-y-1 transition-all px-8 py-4 rounded-full font-bold text-lg shadow-lg shadow-theme/30">
            Mulai Membaca <svg class="w-5 h-5 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path></svg>
          </a>
        </div>
      </section>

      {/* Grid Artikel Modern */}
      <section id="articles" class="max-w-6xl mx-auto px-6 py-24 scroll-mt-24 relative z-10">
        <div class="flex flex-col md:flex-row items-center justify-between mb-12 fade-in-up delay-100">
          <h2 class="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">{t('latest_articles')}</h2>
          <span class="mt-4 md:mt-0 px-4 py-2 rounded-full bg-slate-100 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 text-sm font-bold text-slate-500 dark:text-slate-400 shadow-inner">
            {posts.length} {t('articles_count')}
          </span>
        </div>

        {posts.length === 0 ? (
          <div class="text-center py-24 glassmorphism rounded-3xl border border-slate-200 dark:border-zinc-800 fade-in-up delay-200">
            <div class="w-20 h-20 bg-slate-100 dark:bg-zinc-800 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg class="w-10 h-10 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"></path></svg>
            </div>
            <p class="text-slate-500 dark:text-slate-400 font-medium text-lg">{t('no_articles')}</p>
          </div>
        ) : (
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
            {posts.map((post: any, index: number) => (
              <a href={`/read/${post.slug}`} class={`group glassmorphism rounded-3xl border border-slate-200 dark:border-zinc-800 overflow-hidden hover:shadow-2xl hover:shadow-theme/10 transition-all duration-500 flex flex-col h-full hover:-translate-y-2 fade-in-up delay-${Math.min(300, (index%3 + 1)*100)}`}>
                <div class="h-56 bg-slate-100 dark:bg-zinc-900 flex items-center justify-center border-b border-slate-200 dark:border-zinc-800 text-slate-300 dark:text-slate-600 relative overflow-hidden">
                  <div class="absolute inset-0 bg-theme/5 group-hover:bg-theme/20 transition-colors duration-500 z-10"></div>
                  {post.cover_image ? (
                    <img src={post.cover_image} alt={post.title} class="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-in-out" loading="lazy" />
                  ) : (
                    <svg class="w-16 h-16 relative z-0 opacity-50 group-hover:scale-110 transition-transform duration-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                  )}
                  {post.is_premium && (
                    <div class="absolute top-4 right-4 z-20 bg-amber-500 text-white text-[10px] font-extrabold px-3 py-1.5 uppercase rounded-full shadow-lg flex items-center gap-1 backdrop-blur-sm bg-opacity-90">
                      <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg> PREMIUM
                    </div>
                  )}
                </div>
                <div class="p-8 flex flex-col flex-1 relative z-10 bg-white/50 dark:bg-zinc-950/50">
                  <div class="text-[11px] font-extrabold text-theme mb-3 uppercase tracking-widest">{t('article_badge')}</div>
                  <h3 class="text-2xl font-bold text-slate-900 dark:text-white mb-4 group-hover:text-theme transition-colors line-clamp-2 leading-tight">
                    {post.title}
                  </h3>
                  <p class="text-slate-600 dark:text-slate-400 text-sm leading-relaxed line-clamp-3 mb-8 flex-1">
                    {post.content ? post.content.replace(/<[^>]*>?/gm, '').substring(0, 150) + '...' : t('no_summary')}
                  </p>
                  <div class="flex items-center justify-between text-xs font-semibold pt-6 border-t border-slate-200 dark:border-zinc-800">
                    <span class="text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                      {new Date(post.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
                    </span>
                    <span class="text-theme flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity -translate-x-2 group-hover:translate-x-0 transform duration-300">
                      Baca <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                    </span>
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
  
  const { results: rawSettings } = await c.env.DB.prepare("SELECT * FROM settings WHERE tenant_id = ?").bind(c.get("tenantId")).all()
  const settings = rawSettings.reduce((acc: any, curr: any) => { acc[curr.key] = curr.value; return acc }, {})
  const siteName = 'Nuansa Network'
  const primaryColor = settings['primaryColor'] || '#3b82f6'

  const adsenseId = await getAdsenseId(c, settings)

  const post: any = await c.env.DB.prepare("SELECT * FROM posts WHERE slug = ? AND tenant_id = ?").bind(slug, c.get("tenantId")).first()

  if (!post) {
    return c.html(
      <Layout title={`Tidak Ditemukan - ${siteName}`} siteName={siteName} primaryColor={primaryColor} customThemeHtml={settings['customThemeHtml']}>
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
  
  let metaDescription = post.content ? post.content.replace(/<[^>]*>?/gm, '').substring(0, 160).trim() + '...' : '';
  let ogImage = post.cover_image || '';

  return c.html(
    <Layout title={`${post.title} - ${siteName}`} siteName={siteName} primaryColor={primaryColor} adsenseId={adsenseId} customThemeHtml={settings['customThemeHtml']} description={metaDescription} image={ogImage}>
      <article class="max-w-4xl mx-auto px-6 py-20 fade-in-up">
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
                  <form action="/api/grant-access" method="post">
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
  const { results: rawSettings } = await c.env.DB.prepare("SELECT * FROM settings WHERE tenant_id = ?").bind(c.get("tenantId")).all()
  const settings = rawSettings.reduce((acc: any, curr: any) => { acc[curr.key] = curr.value; return acc }, {})
  const siteName = 'Nuansa Network'
  const primaryColor = settings['primaryColor'] || '#3b82f6'

  // Pastikan tabel products ada (jika tenant belum update, tangani error)
  let products: any[] = []
  try {
    const { results } = await c.env.DB.prepare("SELECT * FROM products WHERE tenant_id = ? ORDER BY created_at DESC").bind(c.get("tenantId")).all()
    products = results as any[]
  } catch (e) {
    // Tabel belum dibuat atau error
    products = []
  }

  const adsenseId = await getAdsenseId(c, settings)

  return c.html(
    <Layout title={`Katalog Produk - ${siteName}`} siteName={siteName} primaryColor={primaryColor} adsenseId={adsenseId} customThemeHtml={settings['customThemeHtml']}>
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
      "INSERT INTO orders (id, tenant_id, product_id, customer_name, customer_phone, quantity, total_price, status) VALUES (?, ?, ?, ?, ?, ?, ?, 'pending')"
    ).bind(crypto.randomUUID(), productId, customerName, customerPhone, quantity, totalPrice).run()

    // Kirim notifikasi Telegram
    c.executionCtx.waitUntil((async () => {
      try {
        const product: any = await c.env.DB.prepare("SELECT name FROM products WHERE id = ? AND tenant_id = ?").bind(productId, c.get("tenantId")).first()
        const productName = product?.name || 'Produk'
        
        const { results: rawSettings } = await c.env.DB.prepare("SELECT * FROM settings WHERE key IN ('telegram_bot_token', 'telegram_chat_id') AND tenant_id = ?").bind(c.get("tenantId")).all()
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
  const { results: rawSettings } = await c.env.DB.prepare("SELECT * FROM settings WHERE tenant_id = ?").bind(c.get("tenantId")).all()
  const settings = rawSettings.reduce((acc: any, curr: any) => { acc[curr.key] = curr.value; return acc }, {})
  const siteName = 'Nuansa Network'
  const primaryColor = settings['primaryColor'] || '#3b82f6'

  const adsenseId = await getAdsenseId(c, settings)

  let courses: any[] = []
  try {
    const { results } = await c.env.DB.prepare(
      "SELECT c.*, (SELECT COUNT(*) FROM lessons l WHERE l.course_id = c.id) as lesson_count FROM courses c WHERE c.is_published = 1 ORDER BY c.created_at DESC"
    ).all()
    courses = results
  } catch(e) {}

  return c.html(
    <Layout title={`Belajar - ${siteName}`} siteName={siteName} primaryColor={primaryColor} adsenseId={adsenseId} customThemeHtml={settings['customThemeHtml']}>
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
  const { results: rawSettings } = await c.env.DB.prepare("SELECT * FROM settings WHERE tenant_id = ?").bind(c.get("tenantId")).all()
  const settings = rawSettings.reduce((acc: any, curr: any) => { acc[curr.key] = curr.value; return acc }, {})
  const siteName = 'Nuansa Network'
  const primaryColor = settings['primaryColor'] || '#3b82f6'

  const adsenseId = await getAdsenseId(c, settings)

  const course: any = await c.env.DB.prepare("SELECT * FROM courses WHERE slug = ? AND is_published = 1 AND tenant_id = ?").bind(slug, c.get("tenantId")).first()
  if (!course) return c.redirect('/belajar')

  const { results: lessons } = await c.env.DB.prepare(
    "SELECT id, title, order_index, is_preview FROM lessons WHERE course_id = ? ORDER BY order_index ASC"
  ).bind(course.id, c.get("tenantId")).all()

  // Cek enrollment cookie
  const enrollToken = getCookie(c, `enroll_${course.id}`)
  const isEnrolled = course.price === 0 || (enrollToken && enrollToken.startsWith(`enrolled_${course.id}`))

  return c.html(
    <Layout title={`${course.title} - ${siteName}`} siteName={siteName} primaryColor={primaryColor} adsenseId={adsenseId} customThemeHtml={settings['customThemeHtml']}>
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
                <form action="/api/enroll" method="post">
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

  const { results: rawSettings } = await c.env.DB.prepare("SELECT * FROM settings WHERE tenant_id = ?").bind(c.get("tenantId")).all()
  const settings = rawSettings.reduce((acc: any, curr: any) => { acc[curr.key] = curr.value; return acc }, {})
  const siteName = 'Nuansa Network'
  const primaryColor = settings['primaryColor'] || '#3b82f6'
  const adsenseId = await getAdsenseId(c, settings)

  const course: any = await c.env.DB.prepare("SELECT * FROM courses WHERE slug = ?").bind(slug, c.get("tenantId")).first()
  if (!course) return c.redirect('/belajar')

  const lesson: any = await c.env.DB.prepare("SELECT * FROM lessons WHERE id = ? AND course_id = ? AND tenant_id = ?").bind(lessonId, course.id, c.get("tenantId")).first()
  if (!lesson) return c.redirect(`/belajar/${slug}`)

  const { results: allLessons } = await c.env.DB.prepare(
    "SELECT id, title, order_index, is_preview FROM lessons WHERE course_id = ? ORDER BY order_index ASC"
  ).bind(course.id, c.get("tenantId")).all()

  const enrollToken = getCookie(c, `enroll_${course.id}`)
  const isEnrolled = course.price === 0 || (enrollToken && enrollToken.startsWith(`enrolled_${course.id}`))

  if (!isEnrolled && !lesson.is_preview) {
    return c.redirect(`/belajar/${slug}`)
  }

  const currentIdx = (allLessons as any[]).findIndex(l => l.id === lessonId)
  const prevLesson = currentIdx > 0 ? (allLessons as any[])[currentIdx - 1] : null
  const nextLesson = currentIdx < allLessons.length - 1 ? (allLessons as any[])[currentIdx + 1] : null

  return c.html(
    <Layout title={`${lesson.title} - ${course.title} | ${siteName}`} siteName={siteName} primaryColor={primaryColor} adsenseId={adsenseId} customThemeHtml={settings['customThemeHtml']}>
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
      "INSERT INTO enrollments (id, tenant_id, course_id, student_email, access_token) VALUES (?, ?, ?, ?, ?)"
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
        const course: any = await c.env.DB.prepare("SELECT title FROM courses WHERE id = ? AND tenant_id = ?").bind(courseId, c.get("tenantId")).first()
        const courseTitle = course?.title || 'Kursus'

        const { results: rawSettings } = await c.env.DB.prepare("SELECT * FROM settings WHERE key IN ('telegram_bot_token', 'telegram_chat_id') AND tenant_id = ?").bind(c.get("tenantId")).all()
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

// Rute Nuansa Commerce (Katalog Produk)
app.get('/katalog', async (c) => {
  let siteName = 'Nuansa Network'
  let primaryColor = '#2563eb'
  const settingsObj: Record<string, string> = {}
  try {
    const { results } = await c.env.DB.prepare("SELECT * FROM settings WHERE tenant_id = ?").bind(c.get("tenantId")).all()
    if (results) {
      results.forEach((row: any) => {
        settingsObj[row.key] = row.value
      })
      if (settingsObj['site_name']) siteName = settingsObj['site_name']
      if (settingsObj['primary_color']) primaryColor = settingsObj['primary_color']
    }
  } catch(e) {}

  const adsenseId = await getAdsenseId(c, settingsObj)
  const { lang, t } = getLangContext(c)

  // Mock Produk (Nuansa Commerce)
  const products = [
    { id: 1, name: 'Ebook: Edge Computing 101', price: 'Rp 99.000', desc: 'Panduan lengkap memahami arsitektur Edge untuk pemula.', type: 'Digital' },
    { id: 2, name: 'Template: Nuansa SaaS', price: 'Rp 299.000', desc: 'Boilerplate SaaS siap pakai dengan UI modern dan terintegrasi.', type: 'Digital' },
    { id: 3, name: 'Konsultasi: Arsitektur Cloud', price: 'Rp 1.500.000', desc: 'Sesi konsultasi 1 jam bersama expert arsitektur sistem terdistribusi.', type: 'Jasa' }
  ]

  return c.html(
    <Layout title={`Katalog Produk - ${siteName}`} siteName={siteName} primaryColor={primaryColor} adsenseId={adsenseId} lang={lang} t={t} customThemeHtml={settingsObj['customThemeHtml']}>
      <section class="bg-slate-50 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 py-16 text-center px-6 transition-colors duration-300">
        <h1 class="text-3xl md:text-4xl font-extrabold mb-4 text-slate-900 dark:text-white">Nuansa Commerce</h1>
        <p class="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
          Katalog ini mendemonstrasikan "Vertical Engine" untuk E-Commerce (Lapisan 5). Tenant dapat berjualan produk digital dan jasa.
        </p>
      </section>

      <section class="max-w-5xl mx-auto px-6 py-16">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map(prod => (
            <div class="glassmorphism rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden hover:shadow-xl dark:hover:shadow-slate-900/50 transition-all duration-300 flex flex-col h-full bg-white dark:bg-slate-800">
              <div class="h-40 bg-slate-100 dark:bg-slate-700/50 flex items-center justify-center border-b border-slate-200 dark:border-slate-700 relative overflow-hidden">
                <svg class="w-12 h-12 text-slate-300 dark:text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path>
                </svg>
                <div class="absolute top-4 right-4 bg-theme text-white text-[10px] font-bold px-2 py-1 uppercase rounded-full">
                  {prod.type}
                </div>
              </div>
              <div class="p-6 flex flex-col flex-1 relative z-10">
                <h3 class="text-lg font-bold text-slate-900 dark:text-white mb-2 leading-tight">
                  {prod.name}
                </h3>
                <p class="text-slate-600 dark:text-slate-400 text-sm mb-4 flex-1">
                  {prod.desc}
                </p>
                <div class="flex items-center justify-between mt-auto">
                  <span class="text-lg font-bold text-slate-900 dark:text-white">{prod.price}</span>
                  <button type="button" onclick="alert('Checkout module (Edge Stripe/Xendit integration) requires API Key.')" class="bg-theme text-white hover:opacity-90 transition px-4 py-2 rounded-xl text-sm shadow-sm font-medium">
                    Beli
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </Layout>
  )
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
                
                <form method="post" action="/api/tenants" class="space-y-6">
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
                    <input type="password" name="password" placeholder="Min. 8 karakter" required minLength={8} class="w-full bg-white/50 border border-slate-200 rounded-xl px-4 py-3.5 focus:outline-none focus:border-blue-500 transition shadow-inner" />
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

    const { results: existingUsers } = await c.env.MASTER_DB.prepare(
      "SELECT id FROM users WHERE email = ?"
    ).bind(email).all();

    if (existingUsers && existingUsers.length > 0) {
      if (contentType.includes('application/x-www-form-urlencoded')) {
        return c.html(<html lang="id"><head><script src="https://cdn.tailwindcss.com"></script></head><body class="flex items-center justify-center min-h-screen"><div class="p-8 bg-red-50 text-red-600 rounded-xl">Email sudah terdaftar. Silakan login ke Nuansa Studio untuk membuat website tambahan. <a href="/login" class="underline font-bold">Ke Halaman Login</a></div></body></html>)
      }
      return c.text('Email already registered', 400)
    }

    await c.env.MASTER_DB.prepare(
      "INSERT INTO tenants (id, name, owner_id, plan, created_at) VALUES (?, ?, ?, ?, ?)"
    ).bind(tenantId, name, userId, 'gratis', nowMs).run()

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
