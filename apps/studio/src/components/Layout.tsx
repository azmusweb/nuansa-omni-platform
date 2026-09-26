import { html } from 'hono/html'
import type { FC } from 'hono/jsx'

export const Layout: FC<{ title: string; currentPath: string }> = ({ title, currentPath, children }) => {
  const menuItems = [
    { label: 'Dasbor', href: '/dashboard', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
    { label: 'Pos', href: '/posts', icon: 'M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9.5a2 2 0 00-.586-1.414l-4.5-4.5A2 2 0 0015.5 3H5' },
    { label: 'Media', href: '/vault', icon: 'M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z' },
    { label: 'Belajar (LMS)', href: '/learn', icon: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253' },
    { 
      label: 'Tampilan', 
      icon: 'M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z',
      submenu: [
        { label: 'Tema', href: '/appearance' },
        { label: 'Galeri', href: '/gallery' }
      ]
    },
    { 
      label: 'Produk', 
      icon: 'M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z',
      submenu: [
        { label: 'Katalog', href: '/products' },
        { label: 'Pesanan', href: '/orders' }
      ]
    },
    { 
      label: 'Peralatan', 
      icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z',
      submenu: [
        { label: 'Audit', href: '/audit' },
        { label: 'Pengalihan', href: '/redirects' }
      ]
    },
    { 
      label: 'Pengaturan', 
      icon: 'M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4',
      submenu: [
        { label: 'Umum', href: '/settings' },
        { label: 'Domain', href: '/domains' },
        { label: 'Layanan', href: '/billing' }
      ]
    }
  ]

  return (
    <html lang="id">
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>{title} | Nuansa Studio</title>
        <meta name="description" content="Nuansa Studio: Edge-native CMS dan platform manajemen konten untuk website modern berkinerja tinggi." />
        <meta name="keywords" content="CMS, Edge Computing, Web Builder, Nuansa Studio, SEO, Content Management" />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content={`${title} | Nuansa Studio`} />
        <meta property="og:description" content="Sistem manajemen konten terdepan di jaringan edge." />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
        {html`
          <script src="https://cdn.tailwindcss.com"></script>
          <style>
            @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
            body { font-family: 'Plus Jakarta Sans', sans-serif; }
            .glassmorphism {
              background: rgba(15, 23, 42, 0.7);
              backdrop-filter: blur(16px);
              -webkit-backdrop-filter: blur(16px);
              border: 1px solid rgba(255, 255, 255, 0.1);
            }
            /* Mesh Animation */
            @keyframes mesh {
              0% { transform: scale(1) translate(0, 0); }
              33% { transform: scale(1.1) translate(30px, -50px); }
              66% { transform: scale(0.9) translate(-20px, 20px); }
              100% { transform: scale(1) translate(0, 0); }
            }
            .animate-mesh { animation: mesh 10s ease-in-out infinite alternate; }
            /* Custom Scrollbar for sidebar */
            .custom-scrollbar::-webkit-scrollbar {
              width: 4px;
            }
            .custom-scrollbar::-webkit-scrollbar-track {
              background: transparent;
            }
            .custom-scrollbar::-webkit-scrollbar-thumb {
              background: rgba(16, 185, 129, 0.2);
              border-radius: 4px;
            }
            .custom-scrollbar:hover::-webkit-scrollbar-thumb {
              background: rgba(16, 185, 129, 0.5);
            }
          </style>
          <script>
            tailwind.config = {
              darkMode: 'class',
              theme: {
                extend: {
                  colors: {
                    brand: { 400: '#10b981', 500: '#059669', 600: '#047857' }, // Emerald/Matrix green
                    dark: { 900: '#050505', 800: '#111111', 700: '#334155' }
                  },
                  fontFamily: {
                    mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', "Liberation Mono", "Courier New", 'monospace']
                  }
                }
              }
            }
          </script>
          <script>
            // Force dark mode
            document.documentElement.classList.add('dark')
          </script>
        `}
      </head>
      <body class="bg-dark-900 text-slate-300 font-mono min-h-screen flex overflow-hidden selection:bg-brand-500/30 relative">
        <div class="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] rounded-full bg-brand-600 blur-[120px] mix-blend-screen animate-mesh pointer-events-none opacity-20"></div>
        <div class="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03] pointer-events-none"></div>
        
        {/* Sidebar */}
        <div id="studio-backdrop" class="fixed inset-0 bg-dark-900/80 backdrop-blur-sm z-40 hidden md:hidden" onclick="document.getElementById('studio-sidebar').classList.add('-translate-x-full'); document.getElementById('studio-backdrop').classList.add('hidden');"></div>
        <aside id="studio-sidebar" class="w-64 glassmorphism border-r border-brand-500/20 flex-col justify-between fixed md:relative h-screen z-50 shadow-2xl transform -translate-x-full md:translate-x-0 transition-transform duration-300 md:flex flex">
          <div class="flex flex-col flex-1 min-h-0">
            <div class="h-20 flex-shrink-0 flex items-center px-8 border-b border-brand-500/20">
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 rounded-xl bg-dark-800 border border-brand-500/50 flex items-center justify-center shadow-lg transform hover:rotate-12 transition-transform">
                  <span class="font-mono font-bold text-brand-400 text-xl">S</span>
                </div>
                <span class="font-bold text-xl tracking-tight text-white font-mono">Nuansa<span class="font-normal text-brand-500">_Studio</span></span>
              </div>
            </div>
            
            <div class="p-4 flex-shrink-0 border-b border-brand-500/20">
              <div class="relative">
                <button id="site-switcher-btn" class="w-full flex items-center justify-between px-3 py-2 bg-dark-800 border border-brand-500/30 rounded-lg hover:border-brand-500/70 transition-colors">
                  <div class="flex flex-col items-start truncate max-w-[80%]">
                    <span class="text-xs text-slate-400 font-medium">Active Website</span>
                    <span id="active-site-name" class="text-sm font-semibold text-white truncate w-full text-left">Loading...</span>
                  </div>
                  <svg class="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
                </button>
                
                <div id="site-dropdown" class="absolute top-full left-0 w-full mt-2 bg-dark-800 border border-brand-500/50 rounded-xl shadow-2xl z-50 hidden max-h-60 overflow-y-auto">
                  <div id="site-list" class="p-2 space-y-1">
                    {/* Fetched sites will be here */}
                  </div>
                  <div class="p-2 border-t border-brand-500/20">
                    <button onclick="document.getElementById('create-site-modal').classList.remove('hidden')" class="w-full flex items-center gap-2 px-3 py-2 text-sm text-brand-400 hover:bg-brand-500/20 rounded-lg transition-colors">
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path></svg>
                      Buat Website Baru
                    </button>
                  </div>
                </div>
              </div>
            </div>
            
            <nav class="flex-1 overflow-y-auto p-4 space-y-1 custom-scrollbar">
              {menuItems.map((item) => {
                if (item.submenu) {
                  const isOpen = item.submenu.some(sub => currentPath.startsWith(sub.href))
                  const isActive = isOpen
                  return (
                    <details class="group" open={isOpen || undefined}>
                      <summary class={`flex items-center justify-between gap-3 px-4 py-3 rounded-xl transition-all duration-200 cursor-pointer list-none [&::-webkit-details-marker]:hidden ${
                        isActive ? 'text-white' : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
                      }`}>
                        <div class="flex items-center gap-3">
                          <svg class={`w-5 h-5 ${isActive ? 'text-brand-400' : 'text-slate-500 group-hover:text-slate-300'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d={item.icon}></path>
                          </svg>
                          <span class="font-medium text-sm">{item.label}</span>
                        </div>
                        <svg class="w-4 h-4 text-slate-500 transform group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
                      </summary>
                      <div class="pl-4 pr-2 py-1 mt-1 space-y-1 border-l border-brand-500/20 ml-6">
                        {item.submenu.map(sub => {
                          const isSubActive = currentPath.startsWith(sub.href)
                          return (
                            <a href={sub.href} class={`block py-2 px-3 text-sm rounded-lg transition-colors ${isSubActive ? 'text-brand-400 bg-brand-500/10 font-medium' : 'text-slate-400 hover:text-white hover:bg-slate-800/50'}`}>
                              {sub.label}
                            </a>
                          )
                        })}
                      </div>
                    </details>
                  )
                }

                const isActive = currentPath.startsWith(item.href)
                return (
                  <a 
                    href={item.href}
                    class={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
                      isActive 
                      ? 'bg-brand-500/20 text-brand-400 border border-brand-500/30' 
                      : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
                    }`}
                  >
                    <svg class={`w-5 h-5 ${isActive ? 'text-brand-400' : 'text-slate-500 group-hover:text-slate-300'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d={item.icon}></path>
                    </svg>
                    <span class="font-medium text-sm">{item.label}</span>
                  </a>
                )
              })}
            </nav>
          </div>
          
          <div class="p-4 border-t flex-shrink-0 border-brand-500/20 flex items-center justify-between">
            <div class="flex items-center gap-3 px-4 py-2">
              <div class="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-sm font-medium border border-brand-500/50 text-brand-400">
                AD
              </div>
              <div>
                <p class="text-sm font-semibold text-white">Admin Klien</p>
                <p class="text-xs text-brand-500">Pro Plan</p>
              </div>
            </div>
            <button class="md:hidden text-slate-400 p-2" onclick="document.getElementById('studio-sidebar').classList.add('-translate-x-full'); document.getElementById('studio-backdrop').classList.add('hidden');">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <main class="flex-1 flex flex-col relative h-screen overflow-hidden z-10">
          {/* Top Header */}
          <header class="h-20 glassmorphism border-b border-brand-500/20 flex items-center justify-between px-4 md:px-8 z-10 sticky top-0">
            <div class="flex items-center gap-3">
              <button class="md:hidden text-brand-400 p-2" onclick="document.getElementById('studio-sidebar').classList.remove('-translate-x-full'); document.getElementById('studio-backdrop').classList.remove('hidden');">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
              </button>
              <h1 class="text-xl md:text-2xl font-bold text-brand-400 tracking-tight truncate max-w-[150px] md:max-w-none">&gt; {title.toUpperCase()}</h1>
            </div>
            <div class="flex items-center gap-2 md:gap-4">
              <a href="/api/logout" class="px-4 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 text-sm font-medium rounded-lg transition border border-red-500/20 flex items-center gap-2">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg>
                Keluar
              </a>
              <a href="#" onclick="window.open(window.location.protocol + '//' + window.location.hostname.replace('studio.', ''), '_blank')" class="hidden md:flex px-4 py-2 bg-brand-600/20 hover:bg-brand-600/40 text-brand-400 text-sm font-medium rounded-lg transition border border-brand-500/30 items-center gap-2">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg>
                Lihat Website
              </a>
            </div>
          </header>

          {/* Scrollable Content Wrapper */}
          <div class="flex-1 overflow-y-auto p-8 relative">
            <div class="max-w-6xl mx-auto w-full relative z-10">
              {children}
            </div>
          </div>
        </main>

        {/* Create Site Modal */}
        <div id="create-site-modal" class="fixed inset-0 bg-dark-900/80 backdrop-blur-sm z-[100] hidden flex items-center justify-center">
          <div class="glassmorphism p-6 rounded-2xl border border-brand-500/30 max-w-md w-full mx-4 shadow-2xl relative overflow-hidden">
            <div class="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-brand-600 to-accent-500"></div>
            <div class="flex items-center justify-between mb-6">
              <h3 class="text-xl font-bold text-white font-mono">Buat Website Baru</h3>
              <button onclick="document.getElementById('create-site-modal').classList.add('hidden')" class="text-slate-400 hover:text-white transition">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
              </button>
            </div>
            
            <form action="/api/create-tenant" method="POST" class="space-y-4">
              <div>
                <label class="block text-sm font-medium text-slate-300 mb-1">Nama Website (Subdomain)</label>
                <div class="relative flex items-center">
                  <input type="text" name="name" required class="w-full bg-dark-800 border border-brand-500/30 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-500 transition-colors" placeholder="misal: tokosaya" />
                  <span class="absolute right-4 text-slate-500 font-medium">.nuansa.net</span>
                </div>
                <p class="text-xs text-slate-400 mt-2">Nantinya Anda bisa menghubungkan domain kustom sendiri dari pengaturan.</p>
              </div>
              <button type="submit" class="w-full bg-brand-600 hover:bg-brand-500 text-white font-bold py-3 px-4 rounded-xl shadow-[0_0_15px_rgba(16,185,129,0.4)] transition-all">
                Buat Website
              </button>
            </form>
          </div>
        </div>

        <script dangerouslySetInnerHTML={{ __html: `
          // Site Switcher Toggle
          const switcherBtn = document.getElementById('site-switcher-btn');
          const siteDropdown = document.getElementById('site-dropdown');
          if (switcherBtn && siteDropdown) {
            switcherBtn.addEventListener('click', (e) => {
              e.stopPropagation();
              siteDropdown.classList.toggle('hidden');
            });
            document.addEventListener('click', (e) => {
              if (!siteDropdown.contains(e.target)) {
                siteDropdown.classList.add('hidden');
              }
            });
          }

          // Fetch Sites
          fetch('/api/me')
            .then(res => res.json())
            .then(data => {
              if (data.activeTenant) {
                const nameEl = document.getElementById('active-site-name');
                if (nameEl) nameEl.textContent = data.activeTenant.name;
              }
              
              if (data.myTenants && data.myTenants.length > 0) {
                const listEl = document.getElementById('site-list');
                if (listEl) {
                  listEl.innerHTML = '';
                  data.myTenants.forEach(tenant => {
                    const isActive = data.activeTenant && data.activeTenant.id === tenant.id;
                    const btn = document.createElement('form');
                    btn.method = 'POST';
                    btn.action = '/api/switch-tenant';
                    btn.className = 'w-full';
                    
                    const input = document.createElement('input');
                    input.type = 'hidden';
                    input.name = 'tenant_id';
                    input.value = tenant.id;
                    
                    const submit = document.createElement('button');
                    submit.type = 'submit';
                    submit.className = \`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors flex items-center justify-between \${isActive ? 'bg-brand-500/20 text-brand-400 font-medium' : 'text-slate-300 hover:bg-slate-700/50'}\`;
                    submit.innerHTML = \`
                      <span>\${tenant.name}</span>
                      \${isActive ? '<svg class="w-4 h-4 text-brand-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>' : ''}
                    \`;
                    
                    btn.appendChild(input);
                    btn.appendChild(submit);
                    listEl.appendChild(btn);
                  });
                }
              }
            })
            .catch(err => console.error('Failed to load sites', err));
        `}} />
      </body>
    </html>
  )
}
