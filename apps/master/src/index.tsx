import { Hono } from 'hono'
import { jsxRenderer } from 'hono/jsx-renderer'
import { createDb, tenants, users } from '@nuansa/db'
import type { FC } from 'hono/jsx'

type Bindings = {
  DB: D1Database
}

const app = new Hono<{ Bindings: Bindings }>()

// Layout Utama HTML dengan Tailwind CSS
app.get(
  '*',
  jsxRenderer(({ children }) => {
    return (
      <html lang="id">
        <head>
          <meta charset="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>Nuansa Master - Pusat Komando SaaS</title>
          <script src="https://cdn.tailwindcss.com"></script>
          <style>{`
            @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
            body { font-family: 'Plus Jakarta Sans', sans-serif; }
            .glass {
              background: rgba(15, 23, 42, 0.7);
              backdrop-filter: blur(16px);
              -webkit-backdrop-filter: blur(16px);
              border: 1px solid rgba(255, 255, 255, 0.1);
            }
          `}</style>
          <script>{`
            tailwind.config = {
              theme: {
                extend: {
                  colors: {
                    brand: { 400: '#38bdf8', 500: '#0ea5e9', 600: '#0284c7' },
                    dark: { 900: '#0f172a', 800: '#1e293b' }
                  }
                }
              }
            }
          `}</script>
        </head>
        <body class="bg-dark-900 text-slate-200 min-h-screen selection:bg-brand-500/30">
          {children}
        </body>
      </html>
    )
  })
)

// Komponen Halaman Pendaftaran Sukses
const SuccessPage: FC<{ tenantId: string }> = ({ tenantId }) => (
  <div class="min-h-screen flex items-center justify-center p-6 relative overflow-hidden">
    <div class="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>
    <div class="glass max-w-lg w-full p-10 rounded-3xl shadow-2xl relative z-10 text-center border-emerald-500/30">
      <div class="w-20 h-20 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
        <svg class="w-10 h-10 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
        </svg>
      </div>
      <h2 class="text-3xl font-bold text-white mb-4">Pendaftaran Berhasil!</h2>
      <p class="text-slate-400 mb-8 leading-relaxed">
        Ruang kerja CMS untuk klien Anda telah disiapkan. Harap simpan <strong class="text-white">Tenant ID</strong> ini dengan aman karena akan digunakan untuk mengonfigurasi Nuansa Studio mereka.
      </p>
      <div class="bg-dark-900/50 p-4 rounded-xl border border-slate-700/50 mb-8 font-mono text-sm break-all text-brand-400">
        {tenantId}
      </div>
      <a href="/" class="inline-block bg-brand-600 hover:bg-brand-500 text-white font-semibold py-3 px-8 rounded-xl transition-all shadow-[0_0_15px_rgba(2,132,199,0.5)]">
        Kembali ke Beranda
      </a>
    </div>
  </div>
)

// Rute Landing Page (UI)
app.get('/', (c) => {
  return c.render(
    <div class="min-h-screen relative overflow-hidden flex flex-col">
      {/* Background Ornaments */}
      <div class="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-6xl h-[600px] opacity-30 pointer-events-none">
        <div class="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] rounded-full bg-brand-600 blur-[120px] mix-blend-screen"></div>
        <div class="absolute top-[20%] right-[-10%] w-[400px] h-[400px] rounded-full bg-indigo-600 blur-[120px] mix-blend-screen"></div>
      </div>
      <div class="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03] pointer-events-none"></div>

      {/* Navbar */}
      <nav class="w-full max-w-6xl mx-auto px-6 py-8 relative z-10 flex justify-between items-center">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-400 to-indigo-600 flex items-center justify-center shadow-lg">
            <span class="font-bold text-white text-xl">M</span>
          </div>
          <span class="text-xl font-bold text-white tracking-tight">Nuansa<span class="text-slate-400 font-normal">Master</span></span>
        </div>
        <div class="hidden md:flex gap-8 text-sm font-medium text-slate-400">
          <a href="#" class="hover:text-white transition">Fitur</a>
          <a href="#" class="hover:text-white transition">Harga</a>
          <a href="#" class="hover:text-white transition">Dokumentasi</a>
        </div>
      </nav>

      {/* Hero Section */}
      <main class="flex-grow w-full max-w-6xl mx-auto px-6 py-12 md:py-20 relative z-10 grid md:grid-cols-2 gap-16 items-center">
        
        {/* Left Copy */}
        <div>
          <div class="inline-block border border-brand-500/30 bg-brand-500/10 text-brand-400 text-xs font-bold px-3 py-1 rounded-full mb-6 tracking-wide uppercase">
            Pusat Komando B2B
          </div>
          <h1 class="text-5xl md:text-6xl font-extrabold text-white leading-[1.1] tracking-tight mb-6">
            Bangun <span class="text-transparent bg-clip-text bg-gradient-to-r from-brand-400 to-indigo-400">Kerajaan CMS</span> Anda Sendiri.
          </h1>
          <p class="text-lg text-slate-400 mb-10 leading-relaxed max-w-md">
            Kelola ribuan klien, distribusikan tema secara instan, dan pantau metrik analitik dari satu dasbor edge-native super cepat.
          </p>
          
          <div class="flex gap-6">
            <div class="flex flex-col">
              <span class="text-3xl font-bold text-white mb-1">0ms</span>
              <span class="text-xs text-slate-500 font-medium uppercase tracking-wider">Cold Start</span>
            </div>
            <div class="w-px h-12 bg-slate-800"></div>
            <div class="flex flex-col">
              <span class="text-3xl font-bold text-white mb-1">∞</span>
              <span class="text-xs text-slate-500 font-medium uppercase tracking-wider">Skalabilitas</span>
            </div>
            <div class="w-px h-12 bg-slate-800"></div>
            <div class="flex flex-col">
              <span class="text-3xl font-bold text-white mb-1">D1</span>
              <span class="text-xs text-slate-500 font-medium uppercase tracking-wider">Database</span>
            </div>
          </div>
        </div>

        {/* Right Form (Registration) */}
        <div class="glass p-8 md:p-10 rounded-3xl shadow-2xl relative">
          <div class="absolute -inset-0.5 bg-gradient-to-br from-brand-500/30 to-indigo-500/30 rounded-3xl blur opacity-50 pointer-events-none"></div>
          <div class="relative">
            <h3 class="text-2xl font-bold text-white mb-2">Registrasi Klien Baru</h3>
            <p class="text-sm text-slate-400 mb-8">Buat ruang kerja (Tenant) instan untuk klien Anda.</p>
            
            <form method="POST" action="/api/tenants" class="space-y-5">
              <div>
                <label class="block text-xs font-medium text-slate-400 uppercase tracking-wider mb-2">Nama Perusahaan (Tenant)</label>
                <input 
                  type="text" 
                  name="name" 
                  placeholder="Misal: PT Maju Bersama" 
                  required
                  class="w-full bg-dark-900/50 border border-slate-700/50 rounded-xl px-4 py-3 text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-brand-500/50 focus:border-brand-500 transition"
                />
              </div>
              <div>
                <label class="block text-xs font-medium text-slate-400 uppercase tracking-wider mb-2">Email Administrator Utama</label>
                <input 
                  type="email" 
                  name="email" 
                  placeholder="admin@majubersama.com" 
                  required
                  class="w-full bg-dark-900/50 border border-slate-700/50 rounded-xl px-4 py-3 text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-brand-500/50 focus:border-brand-500 transition"
                />
              </div>
              <button 
                type="submit" 
                class="w-full bg-brand-600 hover:bg-brand-500 text-white font-semibold py-3.5 px-4 rounded-xl transition-all shadow-[0_0_15px_rgba(2,132,199,0.3)] hover:shadow-[0_0_25px_rgba(2,132,199,0.5)] mt-4"
              >
                Buat Tenant Sekarang
              </button>
            </form>
          </div>
        </div>
      </main>
      
      {/* Footer */}
      <footer class="w-full max-w-6xl mx-auto px-6 py-8 text-center text-slate-600 text-sm mt-auto relative z-10">
        &copy; 2026 Nuansa Omni-Platform. Ditenagai oleh Cloudflare Workers & D1.
      </footer>
    </div>
  )
})

// Endpoint untuk mendaftarkan Tenant Baru (API)
app.post('/api/tenants', async (c) => {
  try {
    const db = createDb(c.env.DB)
    
    // Mendukung baik pengiriman formulir UI (FormData) maupun JSON (API)
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

    // Jika dikirim dari UI Form, arahkan ke halaman sukses, jika dari API, kembalikan JSON
    if (contentType.includes('application/x-www-form-urlencoded') || contentType.includes('multipart/form-data')) {
      return c.render(<SuccessPage tenantId={tenantId} />)
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
