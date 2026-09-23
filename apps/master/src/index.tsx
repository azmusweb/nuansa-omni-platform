import { Hono } from 'hono'
import { jsxRenderer } from 'hono/jsx-renderer'
import { getCookie, setCookie } from 'hono/cookie'
import { createDb, tenants, transactions } from '@nuansa/db'
import type { FC } from 'hono/jsx'

type Bindings = {
  DB: D1Database
}

const app = new Hono<{ Bindings: Bindings }>()

// Komponen Layout Utama bersidebar (Dashboard & Settings) - WordPress Dark Admin Style
const Layout: FC<{ children: any; currentPath: string }> = ({ children, currentPath }) => {
  const menuItems = [
    { name: 'Dashboard', path: '/', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
    { name: 'Klien (Tenants)', path: '/clients', icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z' },
    { name: 'Deploy Baru', path: '/register', icon: 'M12 4v16m8-8H4' },
    { name: 'Transaksi', path: '/transactions', icon: 'M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z' },
    { name: 'Repositori Edge', path: '/repo', icon: 'M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10' },
    { name: 'Pengaturan', path: '/settings', icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z' },
  ]

  return (
    <div class="min-h-screen flex bg-[#f0f0f1] font-sans text-[#3c434a]">
      {/* Sidebar WordPress Dark Style */}
      <aside class="w-64 wp-dark-sidebar flex flex-col h-screen sticky top-0 shrink-0">
        <div class="p-4 border-b border-[#2c3338] flex items-center gap-3">
          <div class="w-8 h-8 bg-[#2271b1] text-white rounded flex items-center justify-center font-bold text-lg">
            W
          </div>
          <span class="font-bold text-sm tracking-wide text-white">Nuansa Master</span>
        </div>

        <nav class="flex-1 overflow-y-auto py-4">
          <ul class="space-y-1">
            {menuItems.map((item) => {
              const isActive = currentPath === item.path
              return (
                <li>
                  <a href={item.path} class={`flex items-center gap-3 px-4 py-2 text-sm transition-colors ${isActive ? 'bg-[#2271b1] text-white font-semibold' : 'text-[#a7aaad] hover:text-[#72aee6]'}`}>
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d={item.icon}></path>
                    </svg>
                    {item.name}
                  </a>
                </li>
              )
            })}
          </ul>
        </nav>
        
        <div class="p-4 border-t border-[#2c3338] text-xs text-[#a7aaad]">
          Nuansa v1.2
        </div>
      </aside>

      {/* Main Content Area */}
      <div class="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Top Admin Bar */}
        <header class="h-8 bg-[#1d2327] text-white flex items-center px-4 justify-between shrink-0 text-[13px]">
          <div class="flex items-center gap-4">
            <a href="/" class="hover:text-[#72aee6] flex items-center gap-1">
              <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M10 2a8 8 0 100 16 8 8 0 000-16zM8 11V9h4v2H8z"></path></svg>
              Nuansa Network
            </a>
            <a href="/register" class="hover:text-[#72aee6] flex items-center gap-1">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path></svg>
              New Node
            </a>
          </div>
          <div class="flex items-center gap-4">
            <span>Howdy, Superadmin</span>
          </div>
        </header>

        <div class="flex-1 overflow-y-auto bg-[#f0f0f1] p-4 sm:p-8">
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
      <html lang="id">
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
          <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
          <style>{`
            body {
              font-family: 'Inter', sans-serif;
              background-color: #f0f0f1;
              color: #3c434a;
            }
            .wp-dark-sidebar {
              background-color: #1d2327;
              color: #f0f0f1;
            }
            .wp-blue-btn {
              background-color: #2271b1;
              color: #fff;
            }
            .wp-blue-btn:hover {
              background-color: #135e96;
            }
            .wp-input {
              border: 1px solid #8c8f94;
              background-color: #fff;
              color: #2c3338;
            }
            .wp-input:focus {
              border-color: #2271b1;
              box-shadow: 0 0 0 1px #2271b1;
              outline: none;
            }
          `}</style>
        </head>
        <body class="bg-[#f0f0f1] text-[#3c434a] min-h-screen selection:bg-[#2271b1]/30">
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
    <div class="min-h-screen flex items-center justify-center p-6 relative overflow-hidden bg-[#f0f0f1]">
      <div class="bg-white border border-[#c3c4c7] w-full max-w-md p-8 shadow-sm text-center">
        <div class="w-12 h-12 bg-[#2271b1] text-white rounded flex items-center justify-center font-bold text-xl mx-auto mb-4">
          W
        </div>
        <h1 class="text-[23px] font-normal text-[#1d2327] mb-2">System Login</h1>
        <p class="text-[#50575e] mb-6 text-[13px]">Autentikasi Node Control Panel</p>
        
        <form action="/api/login" method="POST" class="space-y-4">
          <div>
            <input 
              type="password" 
              name="pin" 
              placeholder="••••••" 
              class="w-full wp-input px-3 py-2 text-center text-xl tracking-[0.3em] rounded-sm"
              required 
              autofocus
            />
          </div>
          <button type="submit" class="w-full wp-blue-btn py-2 text-[13px] rounded transition-colors uppercase font-medium">
            Init Connection
          </button>
        </form>
      </div>
    </div>
  )
})

app.post('/api/login', async (c) => {
  const body = await c.req.parseBody()
  const pin = body['pin'] as string
  if (pin === '123456' || pin === 'admin') {
    setCookie(c, 'master_auth', 'authenticated', {
      path: '/',
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 7 // 1 week
    })
    return c.redirect('/')
  }
  return c.redirect('/login')
})

// Rute Pendaftaran UI (Dengan Layout Sidebar Master)
app.get('/register', (c) => {
  const isSuccess = c.req.query('success') === 'true'

  return c.render(
    <Layout currentPath="/register">
      <div class="max-w-2xl bg-white border border-[#c3c4c7] shadow-sm p-6">
        <h1 class="text-[23px] font-normal text-[#1d2327] mb-6">Deploy Tenant Node</h1>
        
        {isSuccess ? (
          <div class="space-y-6">
            <div class="bg-[#fff] border-l-4 border-[#00a32a] text-[#1d2327] p-4 text-[13px] shadow-sm">
              <p class="font-semibold mb-1">Berhasil!</p>
              <p>Node tenant baru telah dialokasikan dan siap digunakan.</p>
            </div>
            <a href="https://studio.nuansa.net/login?registered=true" class="inline-block wp-blue-btn px-4 py-2 text-[13px] rounded transition-colors text-decoration-none">
              Launch Studio
            </a>
          </div>
        ) : (
          <form action="/api/register" method="POST" class="space-y-5">
            <div>
              <label class="block text-[14px] font-semibold text-[#1d2327] mb-2">Nama Perusahaan</label>
              <input 
                type="text" 
                name="name" 
                placeholder="PT. Nuansa Jaya" 
                class="w-full wp-input px-3 py-2 text-[14px] rounded-sm transition-shadow"
                required 
              />
            </div>
            <div>
              <label class="block text-[14px] font-semibold text-[#1d2327] mb-2">Email Akses</label>
              <input 
                type="email" 
                name="email" 
                placeholder="admin@perusahaan.com" 
                class="w-full wp-input px-3 py-2 text-[14px] rounded-sm transition-shadow"
                required 
              />
            </div>
            <div>
              <label class="block text-[14px] font-semibold text-[#1d2327] mb-2">Kata Sandi</label>
              <input 
                type="password" 
                name="password" 
                placeholder="••••••••" 
                class="w-full wp-input px-3 py-2 text-[14px] rounded-sm transition-shadow"
                required 
              />
            </div>
            <div>
              <label class="block text-[14px] font-semibold text-[#1d2327] mb-2">Konfigurasi Paket</label>
              <select name="plan" class="w-full wp-input px-3 py-2 text-[14px] rounded-sm transition-shadow">
                <option value="free">Paket Free (Default)</option>
                <option value="pro">Paket Pro</option>
              </select>
            </div>
            <button type="submit" class="wp-blue-btn px-4 py-2 text-[13px] rounded transition-colors mt-4">
              Execute Deployment
            </button>
          </form>
        )}
      </div>
    </Layout>
  )
})

app.post('/api/register', async (c) => {
  try {
    const body = await c.req.parseBody()
    const name = body['name'] as string
    const plan = body['plan'] as string
    const email = (body['email'] as string).toLowerCase()
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
      <div class="mb-6">
        <h1 class="text-[23px] font-normal text-[#1d2327]">System Status</h1>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
        <div class="bg-white border border-[#c3c4c7] shadow-sm p-5 border-t-4 border-t-[#2271b1]">
          <div class="text-[13px] text-[#50575e] uppercase tracking-wide mb-1">Total Tenants</div>
          <div class="text-[32px] font-normal text-[#1d2327]">{(tenantsCount[0] as any)?.count || 0}</div>
        </div>
        <div class="bg-white border border-[#c3c4c7] shadow-sm p-5 border-t-4 border-t-[#d63638]">
          <div class="text-[13px] text-[#50575e] uppercase tracking-wide mb-1">Pending Auth</div>
          <div class="text-[32px] font-normal text-[#d63638]">{(txCount[0] as any)?.count || 0}</div>
        </div>
        <div class="bg-white border border-[#c3c4c7] shadow-sm p-5 border-t-4 border-t-[#00a32a]">
          <div class="text-[13px] text-[#50575e] uppercase tracking-wide mb-1">System Health</div>
          <div class="text-[32px] font-normal text-[#00a32a] flex items-center gap-2">
            100%
            <span class="w-3 h-3 rounded-full bg-[#00a32a] animate-pulse"></span>
          </div>
        </div>
      </div>

      <div class="bg-white border border-[#c3c4c7] shadow-sm p-5 max-w-2xl">
        <h2 class="text-[14px] font-semibold text-[#1d2327] mb-3 pb-2 border-b border-[#c3c4c7]">Quick Actions</h2>
        <div class="flex flex-wrap gap-3">
          <a href="/clients" class="wp-blue-btn px-4 py-2 text-[13px] rounded transition-colors text-decoration-none">
            Manage Tenants
          </a>
          <a href="/transactions" class="border border-[#2271b1] text-[#2271b1] hover:bg-[#f6f7f7] px-4 py-2 text-[13px] rounded transition-colors text-decoration-none">
            Review Transactions
          </a>
        </div>
      </div>
    </Layout>
  )
})

// Halaman Klien / Tenants
app.get('/clients', async (c) => {
  const { results: tenantsList } = await c.env.DB.prepare("SELECT * FROM tenants ORDER BY created_at DESC").all()

  return c.render(
    <Layout currentPath="/clients">
      <div class="mb-6 flex justify-between items-center">
        <h1 class="text-[23px] font-normal text-[#1d2327]">Klien (Tenants)</h1>
        <a href="/register" class="border border-[#2271b1] text-[#2271b1] hover:bg-[#f6f7f7] px-3 py-1 text-[13px] rounded transition-colors text-decoration-none">
          Add New
        </a>
      </div>

      <div class="bg-white border border-[#c3c4c7] shadow-sm overflow-hidden text-[13px]">
        <table class="w-full text-left border-collapse">
          <thead>
            <tr class="border-b border-[#c3c4c7] bg-[#f6f7f7]">
              <th class="px-4 py-3 font-semibold text-[#1d2327]">Perusahaan</th>
              <th class="px-4 py-3 font-semibold text-[#1d2327]">Tenant ID</th>
              <th class="px-4 py-3 font-semibold text-[#1d2327]">Paket</th>
              <th class="px-4 py-3 font-semibold text-[#1d2327]">Status</th>
              <th class="px-4 py-3 font-semibold text-[#1d2327]">Masa Aktif</th>
              <th class="px-4 py-3 font-semibold text-[#1d2327]">Aksi</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-[#c3c4c7]">
            {tenantsList.map((tenant: any) => {
              const date = new Date(tenant.created_at).toLocaleDateString('id-ID', {
                year: 'numeric', month: 'short', day: 'numeric'
              })
              const expiryDate = tenant.expires_at ? new Date(tenant.expires_at).toLocaleDateString('id-ID', {
                year: 'numeric', month: 'short', day: 'numeric'
              }) : 'Selamanya'
              
              const isSuspended = tenant.status === 'suspended'
              
              return (
                <tr class="hover:bg-[#f6f7f7] transition-colors">
                  <td class="px-4 py-3">
                    <div class="font-semibold text-[#2271b1]">{tenant.name}</div>
                    <div class="text-xs text-[#50575e] mt-1">Daftar: {date}</div>
                  </td>
                  <td class="px-4 py-3 text-[#50575e] font-mono text-[11px]">
                    {tenant.id.split('-')[0]}...
                  </td>
                  <td class="px-4 py-3">
                    <span class="bg-[#f0f0f1] text-[#3c434a] border border-[#c3c4c7] px-2 py-0.5 rounded text-[11px] uppercase">
                      {tenant.plan}
                    </span>
                  </td>
                  <td class="px-4 py-3">
                    <span class={`px-2 py-0.5 rounded text-[11px] border font-medium ${isSuspended ? 'bg-[#fcf0f1] text-[#d63638] border-[#d63638]/30' : 'bg-[#f0fcf4] text-[#00a32a] border-[#00a32a]/30'}`}>
                      {tenant.status === 'suspended' ? 'Suspended' : 'Active'}
                    </span>
                  </td>
                  <td class="px-4 py-3 text-[#50575e] text-xs">
                    {expiryDate}
                  </td>
                  <td class="px-4 py-3">
                    <form method="POST" action="/api/tenants/update" class="flex gap-2 items-center">
                      <input type="hidden" name="tenant_id" value={tenant.id} />
                      <select name="status" class="wp-input px-2 py-1 text-[12px] rounded-sm">
                        <option value="active" selected={tenant.status !== 'suspended'}>Active</option>
                        <option value="suspended" selected={tenant.status === 'suspended'}>Suspend</option>
                      </select>
                      <input type="date" name="expires_at" defaultValue={tenant.expires_at ? new Date(tenant.expires_at).toISOString().split('T')[0] : ''} class="wp-input px-2 py-1 text-[12px] rounded-sm w-32" />
                      <button type="submit" class="wp-blue-btn px-2 py-1 text-[12px] rounded">Simpan</button>
                    </form>
                  </td>
                </tr>
              )
            })}
            
            {tenantsList.length === 0 && (
              <tr>
                <td colSpan={6} class="px-4 py-8 text-center text-[#50575e] italic">
                  Belum ada klien terdaftar.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </Layout>
  )
})

app.post('/api/tenants/update', async (c) => {
  try {
    const body = await c.req.parseBody()
    const tenantId = body['tenant_id'] as string
    const status = body['status'] as string
    const expiresAtRaw = body['expires_at'] as string
    
    let expiresAt: number | null = null
    if (expiresAtRaw) {
      expiresAt = new Date(expiresAtRaw).getTime()
    }

    if (tenantId && status) {
      await c.env.DB.prepare(
        "UPDATE tenants SET status = ?, expires_at = ? WHERE id = ?"
      ).bind(status, expiresAt, tenantId).run()
    }
    
    return c.redirect('/clients')
  } catch (e) {
    console.error(e)
    return c.text('Internal Server Error', 500)
  }
})

// Halaman Transaksi
app.get('/transactions', async (c) => {
  const { results: txList } = await c.env.DB.prepare("SELECT transactions.*, tenants.name as tenant_name FROM transactions JOIN tenants ON transactions.tenant_id = tenants.id ORDER BY transactions.created_at DESC").all()

  return c.render(
    <Layout currentPath="/transactions">
      <div class="mb-6">
        <h1 class="text-[23px] font-normal text-[#1d2327]">Transaksi / Request</h1>
      </div>

      <div class="bg-white border border-[#c3c4c7] shadow-sm overflow-hidden text-[13px]">
        <table class="w-full text-left border-collapse">
          <thead>
            <tr class="border-b border-[#c3c4c7] bg-[#f6f7f7]">
              <th class="px-4 py-3 font-semibold text-[#1d2327]">Tenant Target</th>
              <th class="px-4 py-3 font-semibold text-[#1d2327]">Sistem / Modul</th>
              <th class="px-4 py-3 font-semibold text-[#1d2327]">Status</th>
              <th class="px-4 py-3 font-semibold text-[#1d2327]">Timestamp</th>
              <th class="px-4 py-3 font-semibold text-[#1d2327] text-right">Otorisasi</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-[#c3c4c7]">
            {txList.map((tx: any) => {
              const date = new Date(tx.created_at).toLocaleString('id-ID', {
                month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'
              })
              let parsedDetails = { target_plan: '' }
              try { if(tx.details) parsedDetails = JSON.parse(tx.details) } catch(e) {}
              
              return (
                <tr class="hover:bg-[#f6f7f7] transition-colors">
                  <td class="px-4 py-3">
                    <div class="font-semibold text-[#2271b1]">{tx.tenant_name}</div>
                    <div class="text-[11px] text-[#50575e] mt-1 font-mono">{tx.tenant_id.split('-')[0]}...</div>
                  </td>
                  <td class="px-4 py-3">
                    <div class="font-semibold">{tx.type === 'plan_upgrade' ? 'UPGRADE PLAN' : tx.type}</div>
                    <div class="text-xs text-[#50575e] mt-1">{parsedDetails.target_plan?.toUpperCase()}</div>
                  </td>
                  <td class="px-4 py-3">
                    {tx.status === 'pending' && <span class="px-2 py-0.5 rounded text-[11px] font-medium bg-[#fcf0f1] text-[#d63638] border border-[#d63638]/30">Pending</span>}
                    {tx.status === 'approved' && <span class="px-2 py-0.5 rounded text-[11px] font-medium bg-[#f0fcf4] text-[#00a32a] border border-[#00a32a]/30">Approved</span>}
                    {tx.status === 'rejected' && <span class="px-2 py-0.5 rounded text-[11px] font-medium bg-[#f0f0f1] text-[#50575e] border border-[#c3c4c7]">Rejected</span>}
                  </td>
                  <td class="px-4 py-3 text-[#50575e] text-xs">
                    {date}
                  </td>
                  <td class="px-4 py-3 text-right">
                    {tx.status === 'pending' ? (
                      <form method="POST" action="/api/approve" class="inline-block">
                        <input type="hidden" name="tx_id" value={tx.id} />
                        <input type="hidden" name="tenant_id" value={tx.tenant_id} />
                        <input type="hidden" name="target_plan" value={parsedDetails.target_plan} />
                        <button type="submit" class="border border-[#2271b1] text-[#2271b1] hover:bg-[#f6f7f7] px-3 py-1 rounded text-[12px] font-medium">
                          Approve
                        </button>
                      </form>
                    ) : (
                      <span class="text-xs text-[#50575e] font-medium">CLOSED</span>
                    )}
                  </td>
                </tr>
              )
            })}
            
            {txList.length === 0 && (
              <tr>
                <td colSpan={5} class="px-4 py-8 text-center text-[#50575e] italic">
                  Tidak ada transaksi.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </Layout>
  )
})

// Halaman Repositori (Mock)
app.get('/repo', async (c) => {
  return c.render(
    <Layout currentPath="/repo">
      <div class="mb-6">
        <h1 class="text-[23px] font-normal text-[#1d2327]">Repositori & Ekstensi</h1>
      </div>

      <div class="bg-white border border-[#c3c4c7] shadow-sm p-8 text-center">
        <h2 class="text-lg font-semibold text-[#1d2327] mb-2">Marketplace Belum Tersedia</h2>
        <p class="text-[#50575e] text-[14px] max-w-md mx-auto">
          Sistem Repositori Pusat sedang dalam proses integrasi. Nantinya tema dan ekstensi dapat di-deploy dari sini.
        </p>
      </div>
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
      <div class="mb-6">
        <h1 class="text-[23px] font-normal text-[#1d2327]">Pengaturan Sistem</h1>
      </div>

      {isSaved && (
        <div class="mb-6 bg-[#fff] border-l-4 border-[#00a32a] text-[#1d2327] p-3 text-[13px] shadow-sm font-medium">
          Pengaturan berhasil disimpan.
        </div>
      )}

      <div class="bg-white border border-[#c3c4c7] shadow-sm max-w-2xl">
        <form action="/api/settings" method="POST">
          <div class="p-6 border-b border-[#c3c4c7]">
            <h3 class="text-[14px] font-semibold text-[#1d2327] mb-2">Google AdSense</h3>
            <p class="text-[13px] text-[#50575e] mb-4">Integrasikan iklan pada klien pengguna paket Free.</p>
            
            <label class="block text-[13px] font-semibold text-[#1d2327] mb-1">Publisher ID</label>
            <input 
              type="text" 
              name="adsense_master_id" 
              value={adsenseId}
              placeholder="ca-pub-5073105961173577" 
              class="w-full wp-input px-3 py-2 text-[14px] rounded-sm max-w-md"
            />
          </div>
          
          <div class="p-4 bg-[#f6f7f7] flex justify-end">
            <button type="submit" class="wp-blue-btn px-4 py-1.5 text-[13px] rounded transition-colors">
              Simpan Perubahan
            </button>
          </div>
        </form>
      </div>
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


export default app
