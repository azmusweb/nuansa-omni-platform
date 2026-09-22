import { Hono } from 'hono'
import type { FC } from 'hono/jsx'

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
              <nav class="hidden md:flex gap-8 text-sm font-medium text-slate-600 dark:text-slate-400">
                <a href="/" class="hover:text-theme dark:hover:text-theme transition">Beranda</a>
                <a href="/katalog" class="hover:text-theme dark:hover:text-theme transition">Katalog Produk</a>
                <a href="#" class="hover:text-theme dark:hover:text-theme transition">Tentang Kami</a>
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

// Rute Membaca Artikel
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

  return c.html(
    <Layout title={`${post.title} - ${siteName}`} siteName={siteName} primaryColor={primaryColor} adsenseId={adsenseId}>
      <article class="max-w-3xl mx-auto px-6 py-16">
        <a href="/" class="inline-flex items-center text-sm font-medium text-slate-500 dark:text-slate-400 hover:text-theme dark:hover:text-theme transition mb-10">
          &larr; Kembali ke Daftar Artikel
        </a>
        
        <header class="mb-12">
          <h1 class="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white leading-tight mb-6">{post.title}</h1>
          <div class="flex items-center text-slate-500 dark:text-slate-400 text-sm font-medium">
            <span>Diterbitkan pada {new Date(post.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
          </div>
        </header>

        <div class="prose prose-lg prose-slate dark:prose-invert max-w-none prose-headings:font-bold prose-a:text-theme relative max-h-[600px] overflow-hidden">
          {/* Render konten */}
          <div dangerouslySetInnerHTML={{__html: post.content}} />
          
          {/* Nuansa Content Locker Overlay */}
          <div class="absolute bottom-0 left-0 w-full h-96 bg-gradient-to-t from-slate-50 dark:from-slate-900 to-transparent flex items-end justify-center pb-8">
            <div class="glassmorphism p-8 rounded-2xl shadow-[0_20px_50px_-12px_rgba(0,0,0,0.15)] border border-slate-200 dark:border-slate-700/50 text-center max-w-md mx-auto relative z-10 w-full">
              <div class="w-16 h-16 bg-theme/10 text-theme rounded-full flex items-center justify-center mx-auto mb-4">
                <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
              </div>
              <h3 class="text-xl font-bold text-slate-900 dark:text-white mb-2">Nuansa Content Locker</h3>
              <p class="text-slate-500 dark:text-slate-400 text-sm mb-6">Artikel ini dikunci khusus untuk pembaca premium. Silakan dukung penulis untuk membaca selengkapnya.</p>
              <div class="space-y-3">
                <button class="w-full bg-[#1DA1F2] hover:bg-[#1a91da] text-white font-semibold py-3 rounded-xl transition shadow-lg shadow-[#1DA1F2]/20 flex items-center justify-center gap-2">
                  <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                  Bagikan ke X
                </button>
                <button class="w-full bg-slate-900 dark:bg-white hover:bg-slate-800 dark:hover:bg-slate-200 text-white dark:text-slate-900 font-semibold py-3 rounded-xl transition shadow-lg flex items-center justify-center gap-2">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                  Beli Akses (Rp 2.000)
                </button>
              </div>
            </div>
          </div>
        </div>
      </article>
    </Layout>
  )
})

// Rute Katalog Produk (Nuansa Commerce)
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
              const waLink = `https://wa.me/6281234567890?text=${waText}` // Simulasi nomor WA

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

export default app
