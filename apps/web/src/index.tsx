import { Hono } from 'hono'
import type { FC } from 'hono/jsx'

type Bindings = {
  DB: D1Database
}

const app = new Hono<{ Bindings: Bindings }>()

// Komponen Tata Letak (Layout) HTML Utama
const Layout: FC<{ title: string, siteName: string, primaryColor: string, children: any }> = ({ title, siteName, primaryColor, children }) => {
  return (
    <html lang="id">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>{title}</title>
        <script src="https://cdn.tailwindcss.com"></script>
        {/* Menyuntikkan Tema Dinamis dari Nuansa Architect */}
        <style dangerouslySetInnerHTML={{
          __html: `
            :root { --primary-color: ${primaryColor}; }
            .bg-theme { background-color: var(--primary-color); }
            .text-theme { color: var(--primary-color); }
            .border-theme { border-color: var(--primary-color); }
          `
        }} />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
        <style dangerouslySetInnerHTML={{__html: `body { font-family: 'Inter', sans-serif; }`}} />
      </head>
      <body class="bg-slate-50 text-slate-800 min-h-screen flex flex-col">
        {/* Header Global */}
        <header class="bg-white border-b border-slate-200 sticky top-0 z-10 shadow-sm">
          <div class="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
            <a href="/" class="text-2xl font-extrabold tracking-tight text-theme">
              {siteName}
            </a>
            <nav class="hidden md:flex gap-8 text-sm font-medium text-slate-600">
              <a href="/" class="hover:text-theme transition">Beranda</a>
              <a href="#" class="hover:text-theme transition">Tentang Kami</a>
              <a href="#" class="hover:text-theme transition">Kontak</a>
            </nav>
          </div>
        </header>

        {/* Konten Halaman */}
        <main class="flex-1">
          {children}
        </main>

        {/* Footer Global */}
        <footer class="bg-slate-900 text-slate-400 py-12 mt-20">
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

  // Mengambil Daftar Artikel
  const { results: posts } = await c.env.DB.prepare("SELECT * FROM posts WHERE status != 'draft' ORDER BY created_at DESC").all()

  return c.html(
    <Layout title={siteName} siteName={siteName} primaryColor={primaryColor}>
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
          <h2 class="text-2xl font-bold text-slate-900">Artikel Terbaru</h2>
          <span class="text-sm font-medium text-slate-500">{posts.length} artikel</span>
        </div>

        {posts.length === 0 ? (
          <div class="text-center py-20 bg-white rounded-2xl border border-slate-200">
            <p class="text-slate-500">Belum ada artikel yang diterbitkan. Tunggu pembaruan kami selanjutnya!</p>
          </div>
        ) : (
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post: any) => (
              <a href={`/read/${post.slug}`} class="group bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col h-full hover:-translate-y-1">
                <div class="h-48 bg-slate-100 flex items-center justify-center border-b border-slate-200 text-slate-300">
                  {/* Placeholder gambar jika tidak ada cover */}
                  <svg class="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                </div>
                <div class="p-6 flex flex-col flex-1">
                  <div class="text-xs font-semibold text-theme mb-3 uppercase tracking-wider">Artikel</div>
                  <h3 class="text-xl font-bold text-slate-900 mb-3 group-hover:text-theme transition line-clamp-2">
                    {post.title}
                  </h3>
                  <p class="text-slate-600 text-sm line-clamp-3 mb-6 flex-1">
                    {post.content ? post.content.replace(/<[^>]*>?/gm, '') : 'Tidak ada ringkasan...'}
                  </p>
                  <div class="text-xs text-slate-400 font-medium pt-4 border-t border-slate-100">
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
    <Layout title={`${post.title} - ${siteName}`} siteName={siteName} primaryColor={primaryColor}>
      <article class="max-w-3xl mx-auto px-6 py-16">
        <a href="/" class="inline-flex items-center text-sm font-medium text-slate-500 hover:text-theme transition mb-10">
          &larr; Kembali ke Daftar Artikel
        </a>
        
        <header class="mb-12">
          <h1 class="text-4xl md:text-5xl font-extrabold text-slate-900 leading-tight mb-6">{post.title}</h1>
          <div class="flex items-center text-slate-500 text-sm font-medium">
            <span>Diterbitkan pada {new Date(post.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
          </div>
        </header>

        <div class="prose prose-lg prose-slate max-w-none prose-headings:font-bold prose-a:text-theme">
          {/* Untuk saat ini, kita me-render konten secara langsung (bahaya XSS jika di production riil, tapi aman untuk demo JSON/Teks) */}
          <div dangerouslySetInnerHTML={{__html: post.content}} />
        </div>
      </article>
    </Layout>
  )
})

export default app
