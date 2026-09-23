import { Hono } from 'hono'
import { jsxRenderer } from 'hono/jsx-renderer'
import { getCookie, setCookie } from 'hono/cookie'
import { createDb, tenants, transactions } from '@nuansa/db'
import type { FC } from 'hono/jsx'

type Bindings = {
  DB: D1Database
}

const app = new Hono<{ Bindings: Bindings }>()

// Komponen Layout Utama bersidebar (Dashboard & Settings)
const Layout: FC<{ children: any; currentPath: string }> = ({ children, currentPath }) => {
  const menuItems = [
    { name: 'Dashboard', path: '/', icon: 'M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z' },
    { name: 'Klien (Tenants)', path: '/clients', icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z' },
    { name: 'Transaksi', path: '/transactions', icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01' },
    { name: 'Repositori Edge', path: '/repo', icon: 'M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10' },
    { name: 'Pengaturan', path: '/settings', icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z' },
  ]

  return (
    <div class="min-h-screen bg-dark-900 flex flex-col md:flex-row relative font-mono text-slate-300">
      {/* Mobile Navbar */}
      <div class="md:hidden flex items-center justify-between p-4 border-b border-emerald-900/50 bg-dark-900/90 backdrop-blur-md sticky top-0 z-50 shadow-[0_0_15px_rgba(16,185,129,0.1)]">
        <div class="flex items-center gap-3">
          <div class="w-8 h-8 rounded-lg bg-emerald-500/20 border border-emerald-500/50 flex items-center justify-center shadow-[0_0_10px_rgba(16,185,129,0.3)]">
            <span class="font-bold text-emerald-400 text-sm">M</span>
          </div>
          <span class="font-bold text-white tracking-tight">Nuansa<span class="text-emerald-500">_Master</span></span>
        </div>
        <button onclick="document.getElementById('mobile-menu').classList.toggle('hidden')" class="p-2 text-emerald-500 hover:text-emerald-400 hover:bg-emerald-900/30 rounded-lg transition-colors focus:outline-none">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
        </button>
      </div>

      {/* Sidebar */}
      <div id="mobile-menu" class="hidden md:block fixed inset-0 z-40 bg-dark-900/95 md:bg-dark-900/50 backdrop-blur-xl md:relative md:w-72 border-r border-emerald-900/30 flex-shrink-0 shadow-[4px_0_24px_rgba(0,0,0,0.5)] transition-all">
        <div class="p-6 flex flex-col h-full relative z-10">
          <div class="hidden md:flex items-center gap-3 mb-10 group cursor-pointer">
            <div class="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center shadow-[0_0_15px_rgba(16,185,129,0.15)] group-hover:shadow-[0_0_25px_rgba(16,185,129,0.3)] transition-all">
              <span class="font-bold text-emerald-400 text-xl">M</span>
            </div>
            <span class="text-xl font-bold text-white tracking-tight">Nuansa<span class="text-emerald-500 font-normal">_Master</span></span>
          </div>
          
          <div class="space-y-1 mt-10 md:mt-0 flex-1">
            <div class="text-xs font-bold text-emerald-500/60 mb-4 tracking-widest uppercase">Navigasi Utama</div>
            
            {menuItems.map(item => (
              <a href={item.path} class={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${currentPath === item.path ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 shadow-[0_0_15px_rgba(16,185,129,0.15)]' : 'text-slate-400 hover:text-emerald-300 hover:bg-emerald-900/20'}`}>
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d={item.icon}></path></svg>
                {item.name}
              </a>
            ))}

            <div class="mt-8 mb-4">
              <div class="text-xs font-bold text-emerald-500/60 mb-4 tracking-widest uppercase">Link Cepat</div>
              <a href="https://studio.nuansa.net" target="_blank" rel="noopener noreferrer" class="flex items-center gap-3 px-4 py-2.5 rounded-xl text-slate-400 hover:text-emerald-300 hover:bg-emerald-900/20 transition-all group">
                <svg class="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg>
                Buka Studio
              </a>
            </div>
          </div>

          <div class="mt-auto pt-6 border-t border-emerald-900/30 text-xs text-slate-500">
            <div class="mb-2 text-emerald-500/80 flex items-center gap-2">
              <span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              Sistem Aktif & Terhubung
            </div>
            &copy; 2026 Nuansa Omni-Platform.<br/>Edge-Native Matrix.
          </div>
        </div>
      </div>

      {/* Main Container */}
      <div class="flex-1 min-w-0 overflow-auto relative bg-dark-900">
        <div class="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03] pointer-events-none z-0"></div>
        <div class="absolute inset-0 bg-gradient-to-br from-emerald-900/5 via-dark-900 to-dark-900 pointer-events-none z-0"></div>
        <div class="relative z-10">
          {children}
        </div>
      </div>
    </div>
  )
}

// Global HTML Wrapper
app.get(
  '*',
  jsxRenderer(({ children }) => {
    return (
      <html lang="id" class="dark">
        <head>
          <meta charset="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
          <title>Nuansa Master - Pusat Komando SaaS</title>
          <meta name="description" content="Dashboard administrasi Nuansa Omni-Platform untuk mengelola klien secara real-time di jaringan edge Cloudflare." />
          <meta name="robots" content="noindex, nofollow" />
          <meta property="og:title" content="Nuansa Master Node" />
          <meta property="og:description" content="Pusat Komando SaaS Edge-Native" />
          <meta property="og:type" content="website" />
          
          <script src="https://cdn.tailwindcss.com"></script>
          <style>{`
            @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;700;800&display=swap');
            body { font-family: 'JetBrains Mono', monospace; }
            .glass {
              background: rgba(3, 7, 18, 0.6);
              backdrop-filter: blur(24px);
              -webkit-backdrop-filter: blur(24px);
            }
            .glow-border {
              position: relative;
            }
            .glow-border::before {
              content: '';
              position: absolute;
              inset: -1px;
              border-radius: inherit;
              padding: 1px;
              background: linear-gradient(to bottom right, rgba(16,185,129,0.4), rgba(3,7,18,0));
              -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
              -webkit-mask-composite: xor;
              mask-composite: exclude;
              pointer-events: none;
            }
            
            /* Custom Scrollbar for Hacker look */
            ::-webkit-scrollbar { width: 8px; height: 8px; }
            ::-webkit-scrollbar-track { background: #030712; }
            ::-webkit-scrollbar-thumb { background: #064e3b; border-radius: 4px; border: 1px solid #065f46; }
            ::-webkit-scrollbar-thumb:hover { background: #059669; }
          `}</style>
          <script>{`
            tailwind.config = {
              darkMode: 'class',
              theme: {
                extend: {
                  colors: {
                    brand: { 400: '#10b981', 500: '#059669', 600: '#047857' },
                    emerald: { 300: '#6ee7b7', 400: '#34d399', 500: '#10b981', 600: '#059669', 900: '#064e3b' },
                    dark: { 900: '#030712', 800: '#0f172a' }
                  },
                  fontFamily: {
                    mono: ['JetBrains Mono', 'monospace']
                  }
                }
              }
            }
          `}</script>
        </head>
        <body class="bg-dark-900 text-slate-300 font-mono min-h-screen selection:bg-emerald-500/30">
          {children}
        </body>
      </html>
    )
  })
)

// Middleware Autentikasi Master
app.use('*', async (c, next) => {
  const path = c.req.path
  if (path === '/login' || path === '/api/login' || path === '/register' || path === '/api/register') {
    return next()
  }

  const token = getCookie(c, 'master_auth')
  if (token !== 'authenticated') {
    return c.redirect('/login')
  }

  return next()
})

// Rute Login UI (Tanpa Layout Sidebar)
app.get('/login', (c) => {
  return c.render(
    <div class="min-h-screen flex items-center justify-center p-6 relative overflow-hidden bg-dark-900">
      <div class="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03] pointer-events-none z-0"></div>
      <div class="absolute inset-0 bg-gradient-to-br from-emerald-900/10 via-dark-900 to-dark-900 pointer-events-none z-0"></div>
      
      <div class="glass w-full max-w-md p-10 rounded-2xl glow-border shadow-2xl relative z-10 text-center border border-emerald-900/30">
        <div class="w-16 h-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center shadow-[0_0_20px_rgba(16,185,129,0.2)] mx-auto mb-6 transform hover:scale-110 transition-transform">
          <span class="font-bold text-emerald-400 text-3xl">M</span>
        </div>
        <h1 class="text-2xl font-bold text-white mb-2 tracking-tight">System Login</h1>
        <p class="text-slate-500 mb-8 text-sm font-mono">Autentikasi Node Control Panel</p>
        
        <form action="/api/login" method="POST" class="space-y-6">
          <div>
            <input 
              type="password" 
              name="pin" 
              placeholder="••••••" 
              class="w-full bg-dark-900/80 border border-emerald-900/50 rounded-xl px-4 py-4 text-center text-2xl tracking-[0.5em] text-emerald-400 placeholder-emerald-900/50 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 transition shadow-[inset_0_2px_10px_rgba(0,0,0,0.5)] font-bold"
              required 
              autofocus
            />
          </div>
          <button type="submit" class="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3.5 rounded-xl transition-all shadow-[0_0_20px_rgba(16,185,129,0.2)] hover:shadow-[0_0_30px_rgba(16,185,129,0.4)] active:scale-95 uppercase tracking-widest text-sm">
            Init Connection
          </button>
        </form>
      </div>
    </div>
  )
})

// Rute Pendaftaran UI (Tanpa Layout Sidebar)
app.get('/register', (c) => {
  const isSuccess = c.req.query('success') === 'true'

  return c.render(
    <div class="min-h-screen flex flex-col items-center justify-center p-6 relative overflow-hidden bg-dark-900">
      <div class="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03] pointer-events-none z-0"></div>
      <div class="absolute inset-0 bg-gradient-to-br from-emerald-900/10 via-dark-900 to-dark-900 pointer-events-none z-0"></div>

      <div class="glass w-full max-w-md p-10 rounded-2xl glow-border shadow-2xl relative z-10 border border-emerald-900/30">
        <div class="w-16 h-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center shadow-[0_0_20px_rgba(16,185,129,0.2)] mx-auto mb-6">
          <svg class="w-8 h-8 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path></svg>
        </div>
        <h1 class="text-2xl font-bold text-white text-center mb-2 tracking-tight">Deploy Tenant Node</h1>
        <p class="text-slate-500 text-center mb-8 text-sm font-mono">Inisialisasi workspace klien baru.</p>
        
        {isSuccess ? (
          <div class="space-y-6">
            <div class="bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 px-4 py-4 rounded-xl text-sm font-medium font-mono">
              {'>'} STATUS: SUCCESS<br/>
              {'>'} NODE: ALLOCATED
            </div>
            <a href="https://studio.nuansa.net/login?registered=true" class="block w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3.5 rounded-xl transition-all shadow-[0_0_20px_rgba(16,185,129,0.2)] active:scale-95 text-center uppercase tracking-widest text-sm">
              Launch Studio
            </a>
          </div>
        ) : (
          <form action="/api/register" method="POST" class="space-y-5">
            <div>
              <label class="block text-xs font-bold text-emerald-500/80 uppercase tracking-widest mb-2">Nama Perusahaan</label>
              <input 
                type="text" 
                name="name" 
                placeholder="PT. Nuansa Jaya" 
                class="w-full bg-dark-900/80 border border-emerald-900/50 rounded-xl px-4 py-3 text-white placeholder-slate-700 focus:outline-none focus:border-emerald-500 transition shadow-[inset_0_2px_10px_rgba(0,0,0,0.5)]"
                required 
              />
            </div>
            <div>
              <label class="block text-xs font-bold text-emerald-500/80 uppercase tracking-widest mb-2">Email Akses</label>
              <input 
                type="email" 
                name="email" 
                placeholder="admin@perusahaan.com" 
                class="w-full bg-dark-900/80 border border-emerald-900/50 rounded-xl px-4 py-3 text-white placeholder-slate-700 focus:outline-none focus:border-emerald-500 transition shadow-[inset_0_2px_10px_rgba(0,0,0,0.5)]"
                required 
              />
            </div>
            <div>
              <label class="block text-xs font-bold text-emerald-500/80 uppercase tracking-widest mb-2">Kata Sandi</label>
              <input 
                type="password" 
                name="password" 
                placeholder="••••••••" 
                class="w-full bg-dark-900/80 border border-emerald-900/50 rounded-xl px-4 py-3 text-emerald-400 placeholder-emerald-900/50 focus:outline-none focus:border-emerald-500 transition shadow-[inset_0_2px_10px_rgba(0,0,0,0.5)] tracking-widest"
                required 
              />
            </div>
            <div>
              <label class="block text-xs font-bold text-emerald-500/80 uppercase tracking-widest mb-2">Konfigurasi Paket</label>
              <select name="plan" class="w-full bg-dark-900/80 border border-emerald-900/50 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500 transition shadow-[inset_0_2px_10px_rgba(0,0,0,0.5)] appearance-none">
                <option value="free">Paket Free (Default)</option>
                <option value="pro">Paket Pro</option>
              </select>
            </div>
            <button type="submit" class="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3.5 rounded-xl transition-all shadow-[0_0_20px_rgba(16,185,129,0.2)] hover:shadow-[0_0_30px_rgba(16,185,129,0.4)] active:scale-95 mt-4 uppercase tracking-widest text-sm">
              Execute Deployment
            </button>
          </form>
        )}
      </div>
    </div>
  )
})

app.post('/api/register', async (c) => {
  try {
    const body = await c.req.parseBody()
    const name = body['name'] as string
    const plan = body['plan'] as string
    const email = body['email'] as string
    const password = body['password'] as string
    
    const tenantId = crypto.randomUUID()
    const userId = crypto.randomUUID()
    
    // Hash password
    const msgUint8 = new TextEncoder().encode(password)
    const hashBuffer = await crypto.subtle.digest('SHA-256', msgUint8)
    const hashArray = Array.from(new Uint8Array(hashBuffer))
    const hashedPassword = hashArray.map((b) => b.toString(16).padStart(2, '0')).join('')
    
    await c.env.DB.prepare(
      "INSERT INTO tenants (id, name, plan, created_at) VALUES (?, ?, ?, ?)"
    ).bind(tenantId, name, plan || 'free', Date.now()).run()

    await c.env.DB.prepare(
      "INSERT INTO users (id, tenant_id, email, password, role, created_at) VALUES (?, ?, ?, ?, 'admin', ?)"
    ).bind(userId, tenantId, email, hashedPassword, Date.now()).run()

    // Redirect langsung ke halaman login studio dengan indikator registered
    return c.redirect('https://studio.nuansa.net/login?registered=true')
  } catch (e) {
    console.error(e)
    return c.text('Gagal membuat tenant', 500)
  }
})

// Dashboard Summary (Index)
app.get('/', async (c) => {
  // Ambil count data
  const { results: tenantsCount } = await c.env.DB.prepare("SELECT COUNT(*) as count FROM tenants").all()
  const { results: txCount } = await c.env.DB.prepare("SELECT COUNT(*) as count FROM transactions WHERE status = 'pending'").all()
  
  return c.render(
    <Layout currentPath="/">
      <main class="w-full max-w-5xl mx-auto px-4 sm:px-8 py-8 relative z-10">
        <header class="mb-10">
          <h1 class="text-2xl sm:text-3xl font-extrabold text-white mb-2 tracking-tight">System_Status</h1>
          <p class="text-slate-500 text-sm sm:text-base font-mono">Overview infrastruktur node & performa Edge.</p>
        </header>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          <div class="glass p-6 rounded-xl border border-emerald-900/30 glow-border">
            <div class="text-xs font-bold text-emerald-500/80 tracking-widest uppercase mb-2">Total Tenants</div>
            <div class="text-4xl font-bold text-white">{(tenantsCount[0] as any)?.count || 0}</div>
          </div>
          <div class="glass p-6 rounded-xl border border-emerald-900/30 glow-border">
            <div class="text-xs font-bold text-emerald-500/80 tracking-widest uppercase mb-2">Pending Auth</div>
            <div class="text-4xl font-bold text-emerald-400">{(txCount[0] as any)?.count || 0}</div>
          </div>
          <div class="glass p-6 rounded-xl border border-emerald-900/30 glow-border">
            <div class="text-xs font-bold text-emerald-500/80 tracking-widest uppercase mb-2">System Health</div>
            <div class="text-4xl font-bold text-emerald-400 flex items-center gap-3">
              100%
              <span class="w-3 h-3 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_10px_#10b981]"></span>
            </div>
          </div>
        </div>

        <div class="glass p-8 rounded-xl border border-emerald-900/30">
          <h2 class="text-xl font-bold text-white mb-4 tracking-tight">Quick Actions</h2>
          <div class="flex flex-wrap gap-4">
            <a href="/clients" class="px-6 py-3 rounded-xl bg-dark-900/50 border border-emerald-900/50 hover:bg-emerald-900/20 text-emerald-400 font-bold transition-all text-sm tracking-wider uppercase">
              Manage Tenants
            </a>
            <a href="/transactions" class="px-6 py-3 rounded-xl bg-dark-900/50 border border-emerald-900/50 hover:bg-emerald-900/20 text-emerald-400 font-bold transition-all text-sm tracking-wider uppercase">
              Review Transactions
            </a>
          </div>
        </div>
      </main>
    </Layout>
  )
})

// Halaman Klien / Tenants
app.get('/clients', async (c) => {
  const { results: tenantsList } = await c.env.DB.prepare("SELECT * FROM tenants ORDER BY created_at DESC").all()

  return c.render(
    <Layout currentPath="/clients">
      <main class="w-full max-w-5xl mx-auto px-4 sm:px-8 py-8 relative z-10">
        <header class="mb-10">
          <h1 class="text-2xl sm:text-3xl font-extrabold text-white mb-2 tracking-tight">Workspace_Klien</h1>
          <p class="text-slate-500 text-sm sm:text-base font-mono">Monitor seluruh node tenant di jaringan Edge.</p>
        </header>

        <div class="mb-6 flex justify-between items-end">
          <div class="text-sm font-bold text-emerald-400 uppercase tracking-widest flex items-center gap-2">
            <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            Tenants ({tenantsList.length})
          </div>
        </div>

        <div class="glass rounded-xl overflow-hidden shadow-2xl border border-emerald-900/30 glow-border">
          <div class="overflow-x-auto">
            <table class="w-full text-left border-collapse min-w-[600px]">
              <thead>
                <tr class="bg-dark-900/80 border-b border-emerald-900/30">
                  <th class="px-6 py-4 text-xs font-bold text-emerald-500/70 uppercase tracking-wider">Perusahaan</th>
                  <th class="px-6 py-4 text-xs font-bold text-emerald-500/70 uppercase tracking-wider">Tenant_ID</th>
                  <th class="px-6 py-4 text-xs font-bold text-emerald-500/70 uppercase tracking-wider">Paket</th>
                  <th class="px-6 py-4 text-xs font-bold text-emerald-500/70 uppercase tracking-wider">Terdaftar</th>
                  <th class="px-6 py-4 text-xs font-bold text-emerald-500/70 uppercase tracking-wider text-right">Aksi</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-emerald-900/10">
                {tenantsList.map((tenant: any) => {
                  const date = new Date(tenant.created_at).toLocaleDateString('id-ID', {
                    year: 'numeric', month: 'short', day: 'numeric'
                  })
                  
                  return (
                    <tr class="hover:bg-emerald-900/10 transition-colors group">
                      <td class="px-6 py-5">
                        <div class="font-bold text-white group-hover:text-emerald-400 transition-colors">{tenant.name}</div>
                      </td>
                      <td class="px-6 py-5">
                        <code class="text-xs text-emerald-400 bg-emerald-900/20 px-2 py-1 rounded border border-emerald-900/30">
                          {tenant.id.split('-')[0]}...
                        </code>
                      </td>
                      <td class="px-6 py-5">
                        <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-dark-900 text-slate-300 border border-emerald-900/50 uppercase tracking-wider">
                          {tenant.plan}
                        </span>
                      </td>
                      <td class="px-6 py-5 text-sm text-slate-500 font-mono">
                        {date}
                      </td>
                      <td class="px-6 py-5 text-right">
                        <a href="https://studio.nuansa.net" target="_blank" rel="noopener noreferrer" class="text-xs font-bold text-slate-400 hover:text-emerald-400 transition-colors bg-dark-900/50 hover:bg-emerald-900/30 border border-emerald-900/30 px-3 py-1.5 rounded-lg shadow-sm tracking-widest uppercase">
                          Kelola
                        </a>
                      </td>
                    </tr>
                  )
                })}
                
                {tenantsList.length === 0 && (
                  <tr>
                    <td colSpan={5} class="px-6 py-12 text-center text-slate-500 text-sm italic font-mono">
                      {'>'} DATA NOT FOUND
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </Layout>
  )
})

// Halaman Transaksi
app.get('/transactions', async (c) => {
  const { results: txList } = await c.env.DB.prepare("SELECT transactions.*, tenants.name as tenant_name FROM transactions JOIN tenants ON transactions.tenant_id = tenants.id ORDER BY transactions.created_at DESC").all()

  return c.render(
    <Layout currentPath="/transactions">
      <main class="w-full max-w-5xl mx-auto px-4 sm:px-8 py-8 relative z-10">
        <header class="mb-10">
          <h1 class="text-2xl sm:text-3xl font-extrabold text-white mb-2 tracking-tight">Antrean_Transaksi</h1>
          <p class="text-slate-500 text-sm sm:text-base font-mono">Verifikasi dan persetujuan upgrade layanan.</p>
        </header>

        <div class="glass rounded-xl overflow-hidden shadow-2xl border border-emerald-900/30 glow-border">
          <div class="overflow-x-auto">
            <table class="w-full text-left border-collapse min-w-[600px]">
              <thead>
                <tr class="bg-dark-900/80 border-b border-emerald-900/30">
                  <th class="px-6 py-4 text-xs font-bold text-emerald-500/70 uppercase tracking-wider">Tenant Target</th>
                  <th class="px-6 py-4 text-xs font-bold text-emerald-500/70 uppercase tracking-wider">Sistem / Modul</th>
                  <th class="px-6 py-4 text-xs font-bold text-emerald-500/70 uppercase tracking-wider">Status</th>
                  <th class="px-6 py-4 text-xs font-bold text-emerald-500/70 uppercase tracking-wider">Timestamp</th>
                  <th class="px-6 py-4 text-xs font-bold text-emerald-500/70 uppercase tracking-wider text-right">Otorisasi</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-emerald-900/10">
                {txList.map((tx: any) => {
                  const date = new Date(tx.created_at).toLocaleString('id-ID', {
                    month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'
                  })
                  let parsedDetails = { target_plan: '' }
                  try { if(tx.details) parsedDetails = JSON.parse(tx.details) } catch(e) {}
                  
                  return (
                    <tr class="hover:bg-emerald-900/10 transition-colors group">
                      <td class="px-6 py-5">
                        <div class="font-bold text-white group-hover:text-emerald-400 transition-colors">{tx.tenant_name}</div>
                        <div class="text-[10px] text-slate-500 mt-1 font-mono">{tx.tenant_id.split('-')[0]}...</div>
                      </td>
                      <td class="px-6 py-5">
                        <div class="text-sm text-emerald-400 font-bold">{tx.type === 'plan_upgrade' ? 'UPGRADE_PLAN' : tx.type}</div>
                        <div class="text-xs text-slate-500 mt-1 font-mono">{parsedDetails.target_plan?.toUpperCase()}</div>
                      </td>
                      <td class="px-6 py-5">
                        {tx.status === 'pending' && <span class="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500/10 text-amber-400 border border-amber-500/20 uppercase tracking-wider">Pending</span>}
                        {tx.status === 'approved' && <span class="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 uppercase tracking-wider">Approved</span>}
                        {tx.status === 'rejected' && <span class="px-2 py-0.5 rounded text-[10px] font-bold bg-red-500/10 text-red-400 border border-red-500/20 uppercase tracking-wider">Rejected</span>}
                      </td>
                      <td class="px-6 py-5 text-sm text-slate-500 font-mono">
                        {date}
                      </td>
                      <td class="px-6 py-5 text-right flex justify-end gap-2">
                        {tx.status === 'pending' ? (
                          <form method="POST" action="/api/approve">
                            <input type="hidden" name="tx_id" value={tx.id} />
                            <input type="hidden" name="tenant_id" value={tx.tenant_id} />
                            <input type="hidden" name="target_plan" value={parsedDetails.target_plan} />
                            <button type="submit" class="text-xs font-bold text-white transition bg-emerald-600 hover:bg-emerald-500 px-3 py-1.5 rounded-lg shadow-[0_0_10px_rgba(16,185,129,0.2)] active:scale-95 uppercase tracking-wider">
                              Auth
                            </button>
                          </form>
                        ) : (
                          <span class="text-xs text-slate-600 font-bold tracking-widest">CLOSED</span>
                        )}
                      </td>
                    </tr>
                  )
                })}
                
                {txList.length === 0 && (
                  <tr>
                    <td colSpan={5} class="px-6 py-12 text-center text-slate-500 text-sm italic font-mono">
                      {'>'} QUEUE EMPTY
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </Layout>
  )
})

// Halaman Repositori (Mock)
app.get('/repo', async (c) => {
  return c.render(
    <Layout currentPath="/repo">
      <main class="w-full max-w-5xl mx-auto px-4 sm:px-8 py-8 relative z-10">
        <header class="mb-10">
          <h1 class="text-2xl sm:text-3xl font-extrabold text-white mb-2 tracking-tight">Edge_Repository</h1>
          <p class="text-slate-500 text-sm sm:text-base font-mono">Distribusi aset dan komponen (Marketplace).</p>
        </header>

        <div class="glass p-12 rounded-xl border border-emerald-900/30 text-center">
          <div class="w-16 h-16 rounded-full bg-emerald-900/30 flex items-center justify-center mx-auto mb-4 border border-emerald-500/20">
            <svg class="w-8 h-8 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path></svg>
          </div>
          <h2 class="text-lg font-bold text-white mb-2 tracking-widest uppercase">Sys.Module is Loading</h2>
          <p class="text-slate-500 font-mono text-sm max-w-md mx-auto">
            Sistem Repositori Pusat sedang dalam proses integrasi dengan R2 Bucket Storage. Nantinya tema dan ekstensi dapat di-deploy dari sini.
          </p>
        </div>
      </main>
    </Layout>
  )
})

app.get('/settings', async (c) => {
  let settings: any = {}
  try {
    const { results: rawSettings } = await c.env.DB.prepare("SELECT * FROM settings").all()
    settings = rawSettings.reduce((acc: any, curr: any) => { acc[curr.key] = curr.value; return acc }, {})
  } catch (e) {}

  const adsenseId = settings['adsense_master_id'] || ''
  const isSaved = c.req.query('saved') === 'true'

  return c.render(
    <Layout currentPath="/settings">
      <main class="w-full max-w-3xl mx-auto px-4 sm:px-8 py-8 relative z-10">
        <header class="mb-10">
          <h1 class="text-2xl sm:text-3xl font-extrabold text-white mb-2 tracking-tight">Sys_Config</h1>
          <p class="text-slate-500 text-sm sm:text-base font-mono">Pengaturan global infrastruktur dan monetisasi node.</p>
        </header>

        {isSaved && (
          <div class="mb-6 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 px-4 py-3 rounded-xl text-sm font-bold flex items-center gap-2 shadow-[0_0_15px_rgba(16,185,129,0.1)] uppercase tracking-wider">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
            {'>'} CONFIG SYNCED
          </div>
        )}

        <div class="glass p-8 rounded-xl shadow-2xl border border-emerald-900/30 glow-border">
          <form action="/api/settings" method="POST" class="space-y-8">
            <div class="group">
              <h3 class="text-lg font-bold text-white mb-1 tracking-tight flex items-center gap-2">
                <svg class="w-5 h-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                Injeksi Jaringan Iklan (AdSense)
              </h3>
              <p class="text-sm text-slate-500 mb-6 font-mono">Paksa tayangkan iklan pada jaringan node bertipe Free Plan.</p>
              
              <label class="block text-xs font-bold text-emerald-500/80 uppercase tracking-widest mb-2">Publisher_ID</label>
              <input 
                type="text" 
                name="adsense_master_id" 
                value={adsenseId}
                placeholder="ca-pub-5073105961173577" 
                class="w-full bg-dark-900/80 border border-emerald-900/50 rounded-xl px-4 py-3 text-white placeholder-slate-700 focus:outline-none focus:border-emerald-500 transition shadow-[inset_0_2px_10px_rgba(0,0,0,0.5)] font-mono"
              />
            </div>
            
            <div class="pt-4 border-t border-emerald-900/30">
              <button type="submit" class="bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3 px-6 rounded-xl transition-all shadow-[0_0_20px_rgba(16,185,129,0.2)] inline-flex items-center gap-2 active:scale-95 uppercase tracking-widest text-sm">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4"></path></svg>
                Deploy Config
              </button>
            </div>
          </form>
        </div>
      </main>
    </Layout>
  )
})

app.post('/api/settings', async (c) => {
  try {
    const body = await c.req.parseBody()
    const adsenseId = body['adsense_master_id'] as string
    
    if (adsenseId) {
      await c.env.DB.prepare("INSERT OR REPLACE INTO settings (key, value) VALUES ('adsense_master_id', ?)").bind(adsenseId).run()
    }
    
    return c.redirect('/settings?saved=true')
  } catch (error) {
    console.error(error)
    return c.text('Internal Server Error', 500)
  }
})

app.post('/api/approve', async (c) => {
  try {
    const body = await c.req.parseBody()
    const tx_id = body['tx_id'] as string
    const tenant_id = body['tenant_id'] as string
    const target_plan = body['target_plan'] as string

    if (!tx_id || !tenant_id) return c.text('Bad Request', 400)

    // Update status transaksi
    await c.env.DB.prepare("UPDATE transactions SET status = 'approved', updated_at = CURRENT_TIMESTAMP WHERE id = ?").bind(tx_id).run()
    
    // Update plan tenant
    if (target_plan) {
      await c.env.DB.prepare("UPDATE tenants SET plan = ? WHERE id = ?").bind(target_plan, tenant_id).run()
    }

    return c.redirect('/transactions')
  } catch (e) {
    console.error(e)
    return c.text('Internal Server Error', 500)
  }
})

app.post('/api/login', async (c) => {
  const body = await c.req.parseBody()
  const pin = body['pin'] as string

  // PIN Prototype 123456
  if (pin === '123456') {
    setCookie(c, 'master_auth', 'authenticated', {
      path: '/',
      secure: true,
      httpOnly: true,
      maxAge: 60 * 60 * 24 // 24 jam
    })
    return c.redirect('/')
  }

  // Jika gagal, redirect kembali ke login
  return c.redirect('/login')
})

export default app
