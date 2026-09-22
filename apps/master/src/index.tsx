import { Hono } from 'hono'
import { jsxRenderer } from 'hono/jsx-renderer'
import { getCookie, setCookie } from 'hono/cookie'
import { createDb, tenants, transactions } from '@nuansa/db'

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

// Middleware Autentikasi Master
app.use('*', async (c, next) => {
  const path = c.req.path
  if (path === '/login' || path === '/api/login') {
    return next()
  }

  const token = getCookie(c, 'master_auth')
  if (token !== 'authenticated') {
    return c.redirect('/login')
  }

  return next()
})

// Rute Login UI
app.get('/login', (c) => {
  return c.render(
    <div class="min-h-screen flex items-center justify-center p-6 relative overflow-hidden">
      <div class="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03] pointer-events-none"></div>
      <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[600px] opacity-20 pointer-events-none">
        <div class="absolute top-[-20%] left-[20%] w-[400px] h-[400px] rounded-full bg-brand-600 blur-[100px] mix-blend-screen"></div>
        <div class="absolute bottom-[-20%] right-[20%] w-[300px] h-[300px] rounded-full bg-indigo-600 blur-[100px] mix-blend-screen"></div>
      </div>

      <div class="glass w-full max-w-md p-10 rounded-3xl shadow-2xl relative z-10 text-center border border-slate-700/50">
        <div class="w-16 h-16 rounded-2xl bg-gradient-to-br from-brand-400 to-indigo-600 flex items-center justify-center shadow-lg mx-auto mb-6">
          <span class="font-bold text-white text-3xl">M</span>
        </div>
        <h1 class="text-2xl font-bold text-white mb-2">Nuansa Master</h1>
        <p class="text-slate-400 mb-8">Masukkan PIN Keamanan</p>
        
        <form action="/api/login" method="POST" class="space-y-6">
          <div>
            <input 
              type="password" 
              name="pin" 
              placeholder="••••••" 
              class="w-full bg-dark-900/50 border border-slate-700/50 rounded-xl px-4 py-4 text-center text-2xl tracking-[0.5em] text-white placeholder-slate-600 focus:outline-none focus:border-brand-500 transition shadow-inner"
              required 
              autofocus
            />
          </div>
          <button type="submit" class="w-full bg-brand-600 hover:bg-brand-500 text-white font-semibold py-3.5 rounded-xl transition-all shadow-lg shadow-brand-500/20">
            Masuk ke Pusat Komando
          </button>
        </form>
      </div>
    </div>
  )
})

// Rute Dashboard Admin (UI)
app.get('/', async (c) => {
  const db = createDb(c.env.DB)
  
  // Ambil daftar klien/tenant
  const { results: tenantsList } = await c.env.DB.prepare("SELECT * FROM tenants ORDER BY created_at DESC").all()
  
  // Ambil daftar transaksi
  const { results: txList } = await c.env.DB.prepare("SELECT transactions.*, tenants.name as tenant_name FROM transactions JOIN tenants ON transactions.tenant_id = tenants.id ORDER BY transactions.created_at DESC").all()

  return c.render(
    <div class="min-h-screen relative overflow-hidden flex flex-col">
      {/* Background Ornaments */}
      <div class="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-6xl h-[600px] opacity-20 pointer-events-none">
        <div class="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] rounded-full bg-brand-600 blur-[120px] mix-blend-screen"></div>
        <div class="absolute top-[20%] right-[-10%] w-[400px] h-[400px] rounded-full bg-indigo-600 blur-[120px] mix-blend-screen"></div>
      </div>
      <div class="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03] pointer-events-none"></div>

      {/* Navbar */}
      <nav class="w-full max-w-6xl mx-auto px-6 py-6 relative z-10 flex justify-between items-center border-b border-slate-800/50">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-400 to-indigo-600 flex items-center justify-center shadow-lg">
            <span class="font-bold text-white text-xl">M</span>
          </div>
          <span class="text-xl font-bold text-white tracking-tight">Nuansa<span class="text-slate-400 font-normal">Master</span></span>
        </div>
        <div class="hidden md:flex gap-8 text-sm font-medium text-slate-400">
          <span class="text-brand-400 font-semibold">Dashboard</span>
          <a href="#" class="hover:text-white transition">Pengaturan</a>
        </div>
      </nav>

      {/* Main Content */}
      <main class="flex-grow w-full max-w-6xl mx-auto px-6 py-10 relative z-10">
        <div class="flex justify-between items-end mb-8">
          <div>
            <h1 class="text-3xl font-bold text-white mb-2">Daftar Klien (Tenants)</h1>
            <p class="text-slate-400">Kelola dan pantau seluruh ruang kerja klien yang terdaftar di platform Anda.</p>
          </div>
          <div class="bg-dark-800/50 border border-slate-700/50 px-4 py-2 rounded-lg text-sm font-medium text-slate-300">
            Total: <span class="text-brand-400 font-bold ml-1">{tenantsList.length}</span>
          </div>
        </div>

        <div class="glass rounded-2xl overflow-hidden shadow-2xl border border-slate-700/50">
          <div class="overflow-x-auto">
            <table class="w-full text-left border-collapse">
              <thead>
                <tr class="bg-dark-800/80 border-b border-slate-700/50">
                  <th class="px-6 py-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Nama Perusahaan</th>
                  <th class="px-6 py-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Tenant ID</th>
                  <th class="px-6 py-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Paket (Plan)</th>
                  <th class="px-6 py-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Tanggal Daftar</th>
                  <th class="px-6 py-4 text-xs font-semibold text-slate-400 uppercase tracking-wider text-right">Aksi</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-800/50">
                {tenantsList.map((tenant: any) => {
                  const date = new Date(tenant.created_at).toLocaleDateString('id-ID', {
                    year: 'numeric', month: 'long', day: 'numeric'
                  })
                  
                  return (
                    <tr class="hover:bg-slate-800/30 transition-colors">
                      <td class="px-6 py-5">
                        <div class="font-semibold text-white">{tenant.name}</div>
                      </td>
                      <td class="px-6 py-5">
                        <code class="text-xs text-brand-400 bg-brand-500/10 px-2 py-1 rounded border border-brand-500/20">
                          {tenant.id.split('-')[0]}...
                        </code>
                      </td>
                      <td class="px-6 py-5">
                        <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 uppercase tracking-wide">
                          {tenant.plan}
                        </span>
                      </td>
                      <td class="px-6 py-5 text-sm text-slate-400">
                        {date}
                      </td>
                      <td class="px-6 py-5 text-right">
                        <button class="text-sm font-medium text-slate-400 hover:text-white transition bg-slate-800/50 hover:bg-slate-700/50 border border-slate-700/50 px-3 py-1.5 rounded-lg">
                          Kelola
                        </button>
                      </td>
                    </tr>
                  )
                })}
                
                {tenantsList.length === 0 && (
                  <tr>
                    <td colSpan={5} class="px-6 py-12 text-center text-slate-500">
                      Belum ada klien yang terdaftar. Klien dapat mendaftar melalui aplikasi Studio.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Tabel Transaksi & Persetujuan */}
        <div class="mt-12 flex justify-between items-end mb-8">
          <div>
            <h2 class="text-2xl font-bold text-white mb-2">Persetujuan Layanan (Approval)</h2>
            <p class="text-slate-400">Persetujuan otomatis atau manual untuk pembelian lisensi dan upgrade paket.</p>
          </div>
        </div>

        <div class="glass rounded-2xl overflow-hidden shadow-2xl border border-slate-700/50">
          <div class="overflow-x-auto">
            <table class="w-full text-left border-collapse">
              <thead>
                <tr class="bg-dark-800/80 border-b border-slate-700/50">
                  <th class="px-6 py-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Klien</th>
                  <th class="px-6 py-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Jenis / Item</th>
                  <th class="px-6 py-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Status</th>
                  <th class="px-6 py-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Waktu</th>
                  <th class="px-6 py-4 text-xs font-semibold text-slate-400 uppercase tracking-wider text-right">Aksi</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-800/50">
                {txList.map((tx: any) => {
                  const date = new Date(tx.created_at).toLocaleString('id-ID')
                  let parsedDetails = { target_plan: '' }
                  try { if(tx.details) parsedDetails = JSON.parse(tx.details) } catch(e) {}
                  
                  return (
                    <tr class="hover:bg-slate-800/30 transition-colors">
                      <td class="px-6 py-5">
                        <div class="font-semibold text-white">{tx.tenant_name}</div>
                        <div class="text-xs text-slate-500">ID: {tx.tenant_id.split('-')[0]}...</div>
                      </td>
                      <td class="px-6 py-5">
                        <div class="text-sm text-brand-400 font-medium">{tx.type === 'plan_upgrade' ? 'Upgrade Paket' : tx.type}</div>
                        <div class="text-xs text-slate-400">{parsedDetails.target_plan?.toUpperCase()}</div>
                      </td>
                      <td class="px-6 py-5">
                        {tx.status === 'pending' && <span class="px-2.5 py-0.5 rounded text-xs font-bold bg-amber-500/10 text-amber-400 border border-amber-500/20 uppercase">Menunggu</span>}
                        {tx.status === 'approved' && <span class="px-2.5 py-0.5 rounded text-xs font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 uppercase">Disetujui</span>}
                        {tx.status === 'rejected' && <span class="px-2.5 py-0.5 rounded text-xs font-bold bg-red-500/10 text-red-400 border border-red-500/20 uppercase">Ditolak</span>}
                      </td>
                      <td class="px-6 py-5 text-sm text-slate-400">
                        {date}
                      </td>
                      <td class="px-6 py-5 text-right flex justify-end gap-2">
                        {tx.status === 'pending' ? (
                          <form method="POST" action="/api/approve">
                            <input type="hidden" name="tx_id" value={tx.id} />
                            <input type="hidden" name="tenant_id" value={tx.tenant_id} />
                            <input type="hidden" name="target_plan" value={parsedDetails.target_plan} />
                            <button type="submit" class="text-sm font-semibold text-emerald-400 hover:text-white transition bg-emerald-500/10 hover:bg-emerald-500 border border-emerald-500/50 px-3 py-1.5 rounded-lg shadow-lg shadow-emerald-500/20">
                              Approve
                            </button>
                          </form>
                        ) : (
                          <span class="text-xs text-slate-600 italic">Selesai</span>
                        )}
                      </td>
                    </tr>
                  )
                })}
                
                {txList.length === 0 && (
                  <tr>
                    <td colSpan={5} class="px-6 py-12 text-center text-slate-500">
                      Belum ada permintaan transaksi dari klien.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
      
      {/* Footer */}
      <footer class="w-full max-w-6xl mx-auto px-6 py-6 text-center text-slate-600 text-sm mt-auto relative z-10 border-t border-slate-800/50">
        &copy; 2026 Nuansa Omni-Platform. Ditenagai oleh Cloudflare Workers & D1.
      </footer>
    </div>
  )
})

export default app

app.post('/api/approve', async (c) => {
  try {
    const db = createDb(c.env.DB)
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

    return c.redirect('/')
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
