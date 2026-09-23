import { html } from 'hono/html'
import type { FC } from 'hono/jsx'

export const Layout: FC<{ title: string; currentPath: string }> = ({ title, currentPath, children }) => {
  const menuItems = [
    { label: 'Dasbor', href: '/dashboard', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
    { label: 'Nuansa Nodes', href: '/posts', icon: 'M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9.5a2 2 0 00-.586-1.414l-4.5-4.5A2 2 0 0015.5 3H5' },
    { label: 'Nuansa Learn', href: '/learn', icon: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253' },
    { label: 'Nuansa Architect', href: '/appearance', icon: 'M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z' },
    { label: 'Nuansa Vault', href: '/vault', icon: 'M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z' },
    { label: 'Katalog (Commerce)', href: '/products', icon: 'M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z' },
    { label: 'Pesanan', href: '/orders', icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01' },
    { label: 'Keamanan (Audit)', href: '/audit', icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z' },
    { label: 'Alat (Tools)', href: '/tools', icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z' },
    { label: 'Pengalihan (301)', href: '/redirects', icon: 'M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1' },
    { label: 'Layanan Tambahan', href: '/billing', icon: 'M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z' },
    { label: 'Pengaturan', href: '/settings', icon: 'M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4' }
  ]

  return (
    <html lang="id">
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>{title} | Nuansa Studio</title>
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
        <aside class="w-64 glassmorphism border-r border-brand-500/20 flex-col justify-between hidden md:flex z-10 shadow-2xl relative">
          <div>
            <div class="h-20 flex items-center px-8 border-b border-brand-500/20">
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 rounded-xl bg-dark-800 border border-brand-500/50 flex items-center justify-center shadow-lg transform hover:rotate-12 transition-transform">
                  <span class="font-mono font-bold text-brand-400 text-xl">S</span>
                </div>
                <span class="font-bold text-xl tracking-tight text-white font-mono">Nuansa<span class="font-normal text-brand-500">_Studio</span></span>
              </div>
            </div>
            
            <nav class="p-4 mt-4 space-y-1">
              {menuItems.map((item) => {
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
          
          <div class="p-4 border-t border-brand-500/20">
            <div class="flex items-center gap-3 px-4 py-2">
              <div class="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-sm font-medium border border-brand-500/50 text-brand-400">
                AD
              </div>
              <div>
                <p class="text-sm font-semibold text-white">Admin Klien</p>
                <p class="text-xs text-brand-500">Pro Plan</p>
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main class="flex-1 flex flex-col relative h-screen overflow-hidden z-10">
          {/* Top Header */}
          <header class="h-20 glassmorphism border-b border-brand-500/20 flex items-center justify-between px-8 z-10 sticky top-0">
            <h1 class="text-2xl font-bold text-brand-400 tracking-tight">&gt; {title.toUpperCase()}</h1>
            <div class="flex items-center gap-4">
              <a href="/api/logout" class="px-4 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 text-sm font-medium rounded-lg transition border border-red-500/20 flex items-center gap-2">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg>
                Keluar
              </a>
              <a href="https://cloudflare.com" target="_blank" class="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-sm font-medium rounded-lg transition border border-slate-700 flex items-center gap-2 text-slate-200">
                <svg class="w-4 h-4 text-orange-400" viewBox="0 0 24 24" fill="currentColor"><path d="M16.924 11.233c-.767-.936-2.023-1.47-3.23-1.47h-.37c-.722-1.99-2.617-3.376-4.81-3.376A5.132 5.132 0 0 0 3.395 11.45 4.542 4.542 0 0 0 4.53 20.47h11.96c3.486 0 5.485-2.88 5.485-5.59 0-2.316-1.505-4.475-4.05-4.706M13.633 13.064c0 .324-.265.59-.59.59H6.945a.592.592 0 0 1 0-1.18h6.098c.325 0 .59.266.59.59"/></svg>
                Edge Powered
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

      </body>
    </html>
  )
}
