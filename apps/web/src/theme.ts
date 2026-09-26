export const defaultThemeHtml = `<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>{{title}} — Platform CMS Terdepan di Indonesia</title>
  <meta name="description" content="{{siteName}} hadir dengan teknologi Nuansa Network. CMS modern tanpa sewa hosting, tanpa ribet API, langsung terindeks Google, monetisasi AdSense, toko online, LMS, dan landing page. Mulai gratis sekarang.">
  <meta name="keywords" content="CMS Indonesia, website gratis, tanpa hosting, portal berita, toko online, landing page, LMS, monetisasi, google adsense">
  <meta name="robots" content="index, follow">
  <meta name="author" content="azmus — Nuansa Network">
  <link rel="canonical" href="https://nuansa.net/">
  <!-- Open Graph -->
  <meta property="og:type" content="website">
  <meta property="og:title" content="{{title}} — Platform Website Terdepan">
  <meta property="og:description" content="Bangun website profesional tanpa sewa hosting, tanpa ribet. Langsung terindeks Google, monetisasi AdSense, toko online, LMS, dan banyak lagi.">
  <meta property="og:url" content="https://nuansa.net/">
  <meta property="og:site_name" content="{{siteName}}">
  <!-- Twitter Card -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="{{siteName}} — Platform CMS Modern">
  <meta name="twitter:description" content="CMS tanpa sewa hosting, langsung terindeks Google. Monetisasi, toko online, LMS dalam satu platform.">
  <!-- Structured Data -->
  <script type="application/ld+json">{"@context":"https://schema.org","@type":"WebSite","name":"{{siteName}}","url":"https://nuansa.net","description":"Platform CMS modern berbasis Teknologi Nuansa Network","potentialAction":{"@type":"SearchAction","target":"https://nuansa.net/?q={search_term_string}","query-input":"required name=search_term_string"}}</script>

  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="">
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Plus+Jakarta+Sans:wght@400;600;700;800&display=swap" rel="stylesheet">
  <script src="https://cdn.tailwindcss.com"></script>
  <script>
    tailwind.config = {
      theme: {
        extend: {
          fontFamily: { sans: ['Inter', 'sans-serif'], display: ['Plus Jakarta Sans', 'sans-serif'] },
          colors: {
            brand: { 50:'#eff6ff',100:'#dbeafe',200:'#bfdbfe',300:'#93c5fd',400:'#60a5fa',500:'{{primaryColor}}',600:'#2563eb',700:'#1d4ed8',800:'#1e3a8a',900:'#1e2a5e' }
          }
        }
      }
    }
  </script>
  <style>
    :root { --primary: {{primaryColor}}; }
    * { box-sizing: border-box; }
    html { scroll-behavior: smooth; }
    body { font-family: 'Inter', sans-serif; background: #fff; color: #0f172a; }

    /* Gradient hero */
    .hero-gradient {
      background: linear-gradient(135deg, #0f172a 0%, #1e3a8a 40%, {{primaryColor}} 100%);
    }
    .hero-mesh {
      background: radial-gradient(at 30% 20%, rgba(99,102,241,0.3) 0px, transparent 50%),
                  radial-gradient(at 80% 10%, rgba(59,130,246,0.25) 0px, transparent 50%),
                  radial-gradient(at 10% 80%, rgba(139,92,246,0.2) 0px, transparent 50%);
    }

    /* Navigation */
    #main-nav {
      position: fixed; top: 0; left: 0; right: 0; z-index: 100;
      transition: background 0.3s, box-shadow 0.3s, backdrop-filter 0.3s;
    }
    #main-nav.nav-transparent { background: transparent; }
    #main-nav.nav-solid {
      background: rgba(15, 23, 42, 0.95);
      backdrop-filter: blur(16px);
      box-shadow: 0 1px 0 rgba(255,255,255,0.08);
    }
    #main-nav.nav-light {
      background: rgba(255,255,255,0.97);
      backdrop-filter: blur(16px);
      box-shadow: 0 1px 24px rgba(0,0,0,0.08);
    }
    #main-nav.nav-light .nav-link { color: #0f172a !important; }
    #main-nav.nav-light .nav-link:hover { color: {{primaryColor}} !important; }
    #main-nav.nav-light .nav-logo-text { color: #0f172a !important; }
    #main-nav.nav-light .nav-cta { background: {{primaryColor}} !important; color: #fff !important; }
    #main-nav.nav-light #nav-menu-btn span { background: #0f172a !important; }

    .nav-link {
      color: rgba(255,255,255,0.85);
      font-size: 14px; font-weight: 500;
      transition: color 0.2s;
      position: relative; white-space: nowrap;
    }
    .nav-link:hover { color: #fff; }

    /* Mega menu */
    .mega-menu {
      position: absolute; top: calc(100% + 8px); left: 50%;
      transform: translateX(-50%);
      background: #fff; border-radius: 16px;
      box-shadow: 0 20px 60px rgba(0,0,0,0.15), 0 0 0 1px rgba(0,0,0,0.05);
      padding: 24px; min-width: 560px;
      opacity: 0; visibility: hidden; pointer-events: none;
      transition: opacity 0.2s, transform 0.2s;
      transform: translateX(-50%) translateY(-8px);
    }
    .mega-parent:hover .mega-menu,
    .mega-menu:hover {
      opacity: 1; visibility: visible; pointer-events: all;
      transform: translateX(-50%) translateY(0);
    }
    .mega-item { display: flex; align-items: flex-start; gap: 12px; padding: 10px 12px; border-radius: 10px; transition: background 0.15s; }
    .mega-item:hover { background: #f8fafc; }
    .mega-item-icon { width: 36px; height: 36px; border-radius: 8px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
    .mega-item-title { font-weight: 600; font-size: 13px; color: #0f172a; }
    .mega-item-desc { font-size: 12px; color: #64748b; margin-top: 2px; }

    /* Dropdown */
    .dropdown-menu {
      position: absolute; top: calc(100% + 8px); left: 50%;
      transform: translateX(-50%);
      background: #fff; border-radius: 12px;
      box-shadow: 0 10px 40px rgba(0,0,0,0.12), 0 0 0 1px rgba(0,0,0,0.05);
      padding: 8px; min-width: 200px;
      opacity: 0; visibility: hidden; pointer-events: none;
      transition: opacity 0.2s, transform 0.2s;
      transform: translateX(-50%) translateY(-8px);
    }
    .dropdown-parent:hover .dropdown-menu {
      opacity: 1; visibility: visible; pointer-events: all;
      transform: translateX(-50%) translateY(0);
    }
    .dropdown-item { display: block; padding: 8px 14px; border-radius: 8px; font-size: 13px; color: #334155; font-weight: 500; transition: background 0.15s, color 0.15s; }
    .dropdown-item:hover { background: #f1f5f9; color: #0f172a; }

    /* Cards */
    .feature-card {
      background: #fff; border: 1px solid #e2e8f0;
      border-radius: 20px; padding: 28px;
      transition: box-shadow 0.3s, transform 0.3s, border-color 0.3s;
    }
    .feature-card:hover {
      box-shadow: 0 20px 60px rgba(59,130,246,0.1);
      transform: translateY(-4px);
      border-color: {{primaryColor}}40;
    }
    .stat-card {
      background: linear-gradient(135deg, #fff 0%, #f8faff 100%);
      border: 1px solid #e2e8f0; border-radius: 16px; padding: 24px;
    }

    /* News portal nav */
    #news-nav { display: none; }
    #news-nav.visible { display: block; }

    /* Floating news nav */
    #floating-news-nav {
      position: fixed; top: 64px; left: 0; right: 0; z-index: 90;
      background: rgba(255,255,255,0.98); backdrop-filter: blur(16px);
      border-bottom: 1px solid #e2e8f0;
      transform: translateY(-100%); opacity: 0;
      transition: transform 0.3s, opacity 0.3s;
      box-shadow: 0 4px 24px rgba(0,0,0,0.06);
    }
    #floating-news-nav.show { transform: translateY(0); opacity: 1; }
    .news-nav-link { font-size: 13px; font-weight: 600; color: #475569; padding: 12px 16px; white-space: nowrap; transition: color 0.2s; position: relative; }
    .news-nav-link:hover { color: {{primaryColor}}; }
    .news-nav-link.active { color: {{primaryColor}}; }
    .news-nav-link.active::after { content: ''; position: absolute; bottom: 0; left: 16px; right: 16px; height: 2px; background: {{primaryColor}}; border-radius: 2px 2px 0 0; }

    /* News mega dropdown */
    .news-mega { position: absolute; top: 100%; left: 0; background: #fff; border-radius: 0 0 16px 16px; box-shadow: 0 20px 50px rgba(0,0,0,0.12); padding: 20px; min-width: 480px; opacity: 0; visibility: hidden; pointer-events: none; transition: all 0.2s; }
    .news-mega-parent:hover .news-mega { opacity: 1; visibility: visible; pointer-events: all; }

    /* Hero text gradient */
    .text-gradient {
      background: linear-gradient(135deg, #60a5fa 0%, #a78bfa 50%, #f472b6 100%);
      -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
    }

    /* Footer gradient */
    .footer-gradient {
      background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
      position: relative;
      overflow: hidden;
    }
    .footer-gradient::before {
      content: '';
      position: absolute;
      top: 0; left: 0; right: 0; height: 1px;
      background: linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent);
    }

    /* Animate on scroll */
    .fade-up { transition: opacity 0.6s, transform 0.6s; }
    .fade-up.visible { opacity: 1; transform: none; }

    /* News article cards */
    .news-card { border-radius: 16px; overflow: hidden; background: #fff; border: 1px solid #e2e8f0; transition: box-shadow 0.3s, transform 0.3s; }
    .news-card:hover { box-shadow: 0 12px 40px rgba(0,0,0,0.1); transform: translateY(-3px); }
    .news-card-img { width: 100%; height: 180px; background: linear-gradient(135deg, #dbeafe, #ede9fe); display: flex; align-items: center; justify-content: center; }

    /* CTA section */
    .cta-gradient { background: linear-gradient(135deg, #0f172a 0%, #1e3a8a 100%); }

    /* Badge */
    .badge { display: inline-flex; align-items: center; gap: 6px; padding: 4px 12px; border-radius: 100px; font-size: 12px; font-weight: 600; }
    .badge-blue { background: #dbeafe; color: #1d4ed8; }

    /* Pricing cards */
    .plan-card { border-radius: 20px; padding: 32px; border: 2px solid #e2e8f0; transition: all 0.3s; }
    .plan-card.popular { border-color: {{primaryColor}}; background: linear-gradient(135deg, #eff6ff, #fff); }
    .plan-card:hover { box-shadow: 0 20px 50px rgba(59,130,246,0.1); transform: translateY(-4px); }

    /* Footer */
    .footer-gradient { background: linear-gradient(135deg, #0f172a 0%, #1e2a5e 100%); }

    /* Mobile menu */
    #mobile-menu { display: none; }
    #mobile-menu.open { display: block; }

    /* Scrollbar */
    ::-webkit-scrollbar { width: 6px; }
    ::-webkit-scrollbar-track { background: #f1f5f9; }
    ::-webkit-scrollbar-thumb { background: #94a3b8; border-radius: 3px; }
  </style>
</head>
<body class="antialiased">

<!-- ========== NAVIGATION ========== -->
<nav id="main-nav" class="nav-transparent" role="navigation" aria-label="Menu Utama">
  <div class="max-w-7xl mx-auto px-4 sm:px-6">
    <div class="flex items-center justify-between h-16 sm:h-20">

      <!-- Logo -->
      <a href="/" class="flex items-center gap-3 shrink-0" aria-label="{{siteName}} — Beranda">
        <div class="w-9 h-9 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center font-black text-white text-xl shadow-lg">N</div>
        <span class="nav-logo-text font-bold text-xl text-white tracking-tight">{{siteName}}</span>
      </a>

      <!-- Desktop Nav — Landing mode -->
      <div id="landing-nav" class="hidden lg:flex items-center gap-1">
        <a href="#fitur" class="nav-link px-4 py-2 rounded-lg hover:bg-white/10 transition">Fitur</a>

        <!-- Mega Layanan -->
        <div class="mega-parent relative">
          <button class="nav-link px-4 py-2 rounded-lg hover:bg-white/10 transition flex items-center gap-1">
            Layanan
            <svg class="w-3.5 h-3.5 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M19 9l-7 7-7-7"/></svg>
          </button>
          <div class="mega-menu" role="menu" aria-label="Layanan">
            <p class="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 px-2">Semua Layanan</p>
            <div class="grid grid-cols-2 gap-1">
              <a href="#" class="mega-item" role="menuitem">
                <div class="mega-item-icon bg-blue-50"><svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"/></svg></div>
                <div><p class="mega-item-title">Portal Berita</p><p class="mega-item-desc">Blog & portal media profesional</p></div>
              </a>
              <a href="#" class="mega-item" role="menuitem">
                <div class="mega-item-icon bg-emerald-50"><svg class="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/></svg></div>
                <div><p class="mega-item-title">Toko Online</p><p class="mega-item-desc">E-commerce lengkap siap pakai</p></div>
              </a>
              <a href="#" class="mega-item" role="menuitem">
                <div class="mega-item-icon bg-purple-50"><svg class="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/></svg></div>
                <div><p class="mega-item-title">Landing Page</p><p class="mega-item-desc">Halaman promosi konversi tinggi</p></div>
              </a>
              <a href="#" class="mega-item" role="menuitem">
                <div class="mega-item-icon bg-amber-50"><svg class="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/></svg></div>
                <div><p class="mega-item-title">Platform LMS</p><p class="mega-item-desc">Kelas online & kursus digital</p></div>
              </a>
              <a href="#" class="mega-item" role="menuitem">
                <div class="mega-item-icon bg-rose-50"><svg class="w-5 h-5 text-rose-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg></div>
                <div><p class="mega-item-title">Monetisasi</p><p class="mega-item-desc">AdSense, konten premium & lebih</p></div>
              </a>
              <a href="#" class="mega-item" role="menuitem">
                <div class="mega-item-icon bg-sky-50"><svg class="w-5 h-5 text-sky-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"/></svg></div>
                <div><p class="mega-item-title">Tanpa Hosting</p><p class="mega-item-desc">Deploy langsung, tanpa server</p></div>
              </a>
            </div>
          </div>
        </div>

        <a href="#harga" class="nav-link px-4 py-2 rounded-lg hover:bg-white/10 transition">Harga</a>
        <a href="#tentang" class="nav-link px-4 py-2 rounded-lg hover:bg-white/10 transition">Tentang</a>
      </div>

      <!-- CTA Buttons -->
      <div class="hidden lg:flex items-center gap-3">
        <a href="https://studio.nuansa.net" class="nav-link px-4 py-2 rounded-lg hover:bg-white/10 transition">Masuk</a>
        <a href="https://studio.nuansa.net" class="nav-cta bg-white text-slate-900 hover:bg-slate-100 px-5 py-2.5 rounded-xl font-bold text-sm transition shadow-lg shadow-black/10">
          Mulai Gratis →
        </a>
      </div>

      <!-- Mobile hamburger -->
      <button id="nav-menu-btn" onclick="toggleMobileMenu()" class="lg:hidden p-2 rounded-lg" aria-label="Buka menu" aria-expanded="false">
        <div class="flex flex-col gap-1.5 w-6">
          <span class="block h-0.5 bg-white rounded-full transition-all"></span>
          <span class="block h-0.5 bg-white rounded-full transition-all"></span>
          <span class="block h-0.5 bg-white rounded-full transition-all"></span>
        </div>
      </button>
    </div>
  </div>

  <!-- Mobile Menu -->
  <div id="mobile-menu" class="lg:hidden border-t border-white/10 bg-slate-900">
    <div class="px-4 py-4 space-y-1">
      <a href="#fitur" onclick="toggleMobileMenu()" class="block px-4 py-3 rounded-xl text-white/80 hover:text-white hover:bg-white/10 font-medium transition">Fitur</a>
      <a href="#layanan" onclick="toggleMobileMenu()" class="block px-4 py-3 rounded-xl text-white/80 hover:text-white hover:bg-white/10 font-medium transition">Layanan</a>
      <a href="#harga" onclick="toggleMobileMenu()" class="block px-4 py-3 rounded-xl text-white/80 hover:text-white hover:bg-white/10 font-medium transition">Harga</a>
      <a href="#tentang" onclick="toggleMobileMenu()" class="block px-4 py-3 rounded-xl text-white/80 hover:text-white hover:bg-white/10 font-medium transition">Tentang</a>
      <div class="pt-3 border-t border-white/10 grid grid-cols-2 gap-2">
        <a href="https://studio.nuansa.net" class="text-center px-4 py-2.5 rounded-xl border border-white/20 text-white text-sm font-semibold">Masuk</a>
        <a href="https://studio.nuansa.net" class="text-center px-4 py-2.5 rounded-xl bg-white text-slate-900 text-sm font-bold">Mulai Gratis</a>
      </div>
    </div>
  </div>
</nav>

<!-- ========== FLOATING NEWS NAV ========== -->
<div id="floating-news-nav" role="navigation" aria-label="Menu Portal Berita">
  <div class="max-w-7xl mx-auto px-4">
    <div class="flex items-center overflow-x-auto gap-1 hide-scrollbar">
      <a href="#berita" class="news-nav-link active shrink-0">🏠 Beranda</a>

      <!-- Mega: Berita -->
      <div class="news-mega-parent relative shrink-0">
        <button class="news-nav-link flex items-center gap-1">
          Berita Terkini
          <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M19 9l-7 7-7-7"/></svg>
        </button>
        <div class="news-mega">
          <div class="grid grid-cols-2 gap-6">
            <div>
              <p class="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Topik Utama</p>
              <div class="space-y-2">
                <a href="#" class="block text-sm text-slate-700 hover:text-blue-600 font-medium py-1">🗞️ Nasional</a>
                <a href="#" class="block text-sm text-slate-700 hover:text-blue-600 font-medium py-1">🌏 Internasional</a>
                <a href="#" class="block text-sm text-slate-700 hover:text-blue-600 font-medium py-1">🏛️ Politik</a>
                <a href="#" class="block text-sm text-slate-700 hover:text-blue-600 font-medium py-1">⚖️ Hukum</a>
              </div>
            </div>
            <div>
              <p class="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Segmen</p>
              <div class="space-y-2">
                <a href="#" class="block text-sm text-slate-700 hover:text-blue-600 font-medium py-1">💹 Ekonomi</a>
                <a href="#" class="block text-sm text-slate-700 hover:text-blue-600 font-medium py-1">🏥 Kesehatan</a>
                <a href="#" class="block text-sm text-slate-700 hover:text-blue-600 font-medium py-1">📚 Pendidikan</a>
                <a href="#" class="block text-sm text-slate-700 hover:text-blue-600 font-medium py-1">⚽ Olahraga</a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Dropdown: Teknologi -->
      <div class="news-mega-parent relative shrink-0">
        <button class="news-nav-link flex items-center gap-1">
          Teknologi
          <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M19 9l-7 7-7-7"/></svg>
        </button>
        <div class="news-mega" style="min-width:240px">
          <a href="#" class="block text-sm text-slate-700 hover:text-blue-600 font-medium py-2">📱 Gadget & Smartphone</a>
          <a href="#" class="block text-sm text-slate-700 hover:text-blue-600 font-medium py-2">🤖 Kecerdasan Buatan (AI)</a>
          <a href="#" class="block text-sm text-slate-700 hover:text-blue-600 font-medium py-2">🌐 Internet & Media Sosial</a>
          <a href="#" class="block text-sm text-slate-700 hover:text-blue-600 font-medium py-2">🔐 Keamanan Digital</a>
          <a href="#" class="block text-sm text-slate-700 hover:text-blue-600 font-medium py-2">💻 Startup & Inovasi</a>
        </div>
      </div>

      <a href="#" class="news-nav-link shrink-0">Bisnis</a>
      <a href="#" class="news-nav-link shrink-0">Gaya Hidup</a>
      <a href="#" class="news-nav-link shrink-0">Hiburan</a>
      <a href="#" class="news-nav-link shrink-0">Otomotif</a>
      <a href="#" class="news-nav-link shrink-0">Kuliner</a>
      <a href="#" class="news-nav-link shrink-0">Travel</a>
    </div>
  </div>
</div>

<!-- ========== HERO SECTION ========== -->
<section id="hero" class="hero-gradient min-h-screen flex flex-col justify-center relative overflow-hidden pt-20" aria-labelledby="hero-title">
  <div class="hero-mesh absolute inset-0 pointer-events-none"></div>

  <!-- Floating elements -->
  <div class="absolute top-32 right-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>
  <div class="absolute bottom-20 left-10 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl pointer-events-none"></div>

  <div class="max-w-7xl mx-auto px-4 sm:px-6 py-20 sm:py-32 relative z-10">
    <div class="max-w-4xl mx-auto text-center">
      <!-- Badge -->
      <div class="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 text-white/90 text-sm font-medium mb-8 backdrop-blur-sm">
        <span class="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></span>
        Platform CMS No. 1 Indonesia — Gratis untuk Semua
      </div>

      <h1 id="hero-title" class="text-4xl sm:text-5xl lg:text-7xl font-black text-white leading-[1.1] tracking-tight mb-6">
        Bangun Website
        <span class="text-gradient block sm:inline"> Impian Anda</span>
        <br class="hidden sm:block">Tanpa Batasan
      </h1>

      <p class="text-lg sm:text-xl text-blue-100 max-w-2xl mx-auto mb-10 leading-relaxed">
        CMS modern berbasis <strong class="text-white">Teknologi Nuansa Network</strong>. Tanpa sewa hosting, tanpa ribet konfigurasi, tanpa spreadsheet — website Anda langsung aktif, terindeks Google, dan siap menghasilkan.
      </p>

      <!-- CTA Buttons -->
      <div class="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
        <a href="https://studio.nuansa.net" class="w-full sm:w-auto bg-white text-slate-900 hover:bg-blue-50 px-8 py-4 rounded-2xl font-black text-base transition shadow-2xl shadow-black/30 hover:shadow-blue-500/20 hover:-translate-y-0.5 transform">
          🚀 Mulai Gratis Sekarang
        </a>
        <a href="#fitur" class="w-full sm:w-auto border-2 border-white/25 text-white hover:bg-white/10 px-8 py-4 rounded-2xl font-bold text-base transition backdrop-blur-sm">
          Lihat Semua Fitur ↓
        </a>
      </div>

      <!-- Social proof stats -->
      <div class="grid grid-cols-3 gap-4 sm:gap-8 max-w-lg mx-auto">
        <div class="text-center">
          <div class="text-2xl sm:text-3xl font-black text-white">100%</div>
          <div class="text-blue-300 text-xs sm:text-sm font-medium mt-1">Tanpa Hosting</div>
        </div>
        <div class="text-center border-x border-white/10">
          <div class="text-2xl sm:text-3xl font-black text-white">⚡ 0ms</div>
          <div class="text-blue-300 text-xs sm:text-sm font-medium mt-1">Setup Time</div>
        </div>
        <div class="text-center">
          <div class="text-2xl sm:text-3xl font-black text-white">∞</div>
          <div class="text-blue-300 text-xs sm:text-sm font-medium mt-1">Fitur Tersedia</div>
        </div>
      </div>
    </div>
  </div>

  <!-- Scroll indicator -->
  <div class="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/50 text-xs animate-bounce">
    <span>Scroll</span>
    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/></svg>
  </div>
</section>

<!-- ========== KEUNGGULAN (No Ribet) ========== -->
<section id="fitur" class="py-20 sm:py-28 bg-slate-50" aria-labelledby="fitur-title">
  <div class="max-w-7xl mx-auto px-4 sm:px-6">
    <div class="text-center mb-16 fade-up">
      <span class="badge badge-blue mb-4">✨ Kenapa Nuansa Network?</span>
      <h2 id="fitur-title" class="text-3xl sm:text-5xl font-black text-slate-900 mt-4">Semua yang Anda Butuhkan,<br><span class="text-blue-600">Tanpa Kerumitan</span></h2>
      <p class="text-slate-600 text-lg mt-4 max-w-2xl mx-auto">Kami menghilangkan semua hambatan teknis agar Anda fokus pada konten dan bisnis, bukan infrastruktur.</p>
    </div>

    <!-- Big features grid -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">

      <div class="feature-card fade-up">
        <div class="w-12 h-12 rounded-2xl bg-blue-100 flex items-center justify-center mb-4 text-2xl">☁️</div>
        <h3 class="text-lg font-bold text-slate-900 mb-2">Tanpa Sewa Hosting</h3>
        <p class="text-slate-600 text-sm leading-relaxed">Tidak ada biaya hosting bulanan. Website Anda berjalan di atas infrastruktur global yang selalu cepat dan stabil — tanpa kartu kredit, tanpa kontrak.</p>
        <div class="mt-4 inline-flex items-center gap-1.5 text-blue-600 text-sm font-semibold">Hemat ratusan ribu/bulan →</div>
      </div>

      <div class="feature-card fade-up">
        <div class="w-12 h-12 rounded-2xl bg-emerald-100 flex items-center justify-center mb-4 text-2xl">⚙️</div>
        <h3 class="text-lg font-bold text-slate-900 mb-2">Tanpa Ribet Setting API</h3>
        <p class="text-slate-600 text-sm leading-relaxed">Tidak perlu konfigurasi server, database, DNS yang membingungkan, atau API yang rumit. Daftar, pilih nama domain, langsung aktif dalam hitungan menit.</p>
        <div class="mt-4 inline-flex items-center gap-1.5 text-emerald-600 text-sm font-semibold">Aktif dalam 2 menit →</div>
      </div>

      <div class="feature-card fade-up">
        <div class="w-12 h-12 rounded-2xl bg-purple-100 flex items-center justify-center mb-4 text-2xl">🔍</div>
        <h3 class="text-lg font-bold text-slate-900 mb-2">Langsung Terindeks Google</h3>
        <p class="text-slate-600 text-sm leading-relaxed">Struktur SEO sudah dioptimasi secara otomatis. Setiap artikel yang Anda tulis langsung ramah mesin pencari, sitemap otomatis, dan meta tag terisi sempurna.</p>
        <div class="mt-4 inline-flex items-center gap-1.5 text-purple-600 text-sm font-semibold">SEO otomatis →</div>
      </div>

      <div class="feature-card fade-up">
        <div class="w-12 h-12 rounded-2xl bg-amber-100 flex items-center justify-center mb-4 text-2xl">💰</div>
        <h3 class="text-lg font-bold text-slate-900 mb-2">Monetisasi Google AdSense</h3>
        <p class="text-slate-600 text-sm leading-relaxed">Pasang Google AdSense langsung dari dashboard. Aktifkan konten premium berbayar, jual produk digital, dan biarkan website bekerja menghasilkan uang untuk Anda.</p>
        <div class="mt-4 inline-flex items-center gap-1.5 text-amber-600 text-sm font-semibold">Mulai monetisasi →</div>
      </div>

      <div class="feature-card fade-up">
        <div class="w-12 h-12 rounded-2xl bg-rose-100 flex items-center justify-center mb-4 text-2xl">🛒</div>
        <h3 class="text-lg font-bold text-slate-900 mb-2">Buka Toko Online</h3>
        <p class="text-slate-600 text-sm leading-relaxed">Fitur e-commerce lengkap terintegrasi. Tambahkan produk fisik maupun digital, kelola pesanan, dan terima pembayaran — semua dalam satu dashboard yang sama.</p>
        <div class="mt-4 inline-flex items-center gap-1.5 text-rose-600 text-sm font-semibold">Buka toko sekarang →</div>
      </div>

      <div class="feature-card fade-up">
        <div class="w-12 h-12 rounded-2xl bg-indigo-100 flex items-center justify-center mb-4 text-2xl">📚</div>
        <h3 class="text-lg font-bold text-slate-900 mb-2">Platform LMS Lengkap</h3>
        <p class="text-slate-600 text-sm leading-relaxed">Buat kelas online, upload materi kursus, kelola peserta didik, dan terima pembayaran uang kursus. Platform Learning Management System siap pakai tanpa plugin tambahan.</p>
        <div class="mt-4 inline-flex items-center gap-1.5 text-indigo-600 text-sm font-semibold">Buat kelas online →</div>
      </div>
    </div>

    <!-- More features row -->
    <div class="grid grid-cols-2 sm:grid-cols-4 gap-4">
      <div class="bg-white border border-slate-200 rounded-2xl p-5 text-center fade-up">
        <div class="text-2xl mb-2">🎯</div>
        <div class="font-bold text-slate-900 text-sm">Landing Page</div>
        <div class="text-slate-500 text-xs mt-1">Konversi tinggi</div>
      </div>
      <div class="bg-white border border-slate-200 rounded-2xl p-5 text-center fade-up">
        <div class="text-2xl mb-2">📊</div>
        <div class="font-bold text-slate-900 text-sm">Analitik Lengkap</div>
        <div class="text-slate-500 text-xs mt-1">Pantau traffic real-time</div>
      </div>
      <div class="bg-white border border-slate-200 rounded-2xl p-5 text-center fade-up">
        <div class="text-2xl mb-2">🎨</div>
        <div class="font-bold text-slate-900 text-sm">Editor Tema</div>
        <div class="text-slate-500 text-xs mt-1">Kustomisasi bebas</div>
      </div>
      <div class="bg-white border border-slate-200 rounded-2xl p-5 text-center fade-up">
        <div class="text-2xl mb-2">🔒</div>
        <div class="font-bold text-slate-900 text-sm">Konten Premium</div>
        <div class="text-slate-500 text-xs mt-1">Paywall terintegrasi</div>
      </div>
    </div>
  </div>
</section>

<!-- ========== PRICING ========== -->
<section id="harga" class="py-20 sm:py-28 bg-white" aria-labelledby="harga-title">
  <div class="max-w-5xl mx-auto px-4 sm:px-6">
    <div class="text-center mb-16 fade-up">
      <span class="badge badge-blue mb-4">💎 Paket Harga</span>
      <h2 id="harga-title" class="text-3xl sm:text-5xl font-black text-slate-900 mt-4">Mulai Gratis,<br>Upgrade Kapan Saja</h2>
      <p class="text-slate-600 text-lg mt-4">Tidak ada kontrak. Tidak ada biaya tersembunyi. Upgrade atau downgrade kapan saja.</p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div class="plan-card fade-up">
        <div class="text-slate-500 text-sm font-semibold uppercase tracking-wider mb-4">Gratis</div>
        <div class="text-4xl font-black text-slate-900 mb-1">Rp 0</div>
        <div class="text-slate-500 text-sm mb-6">Selamanya gratis</div>
        <ul class="space-y-3 mb-8">
          <li class="flex items-center gap-2 text-sm text-slate-700"><span class="text-emerald-500 font-bold">✓</span> 1 website</li>
          <li class="flex items-center gap-2 text-sm text-slate-700"><span class="text-emerald-500 font-bold">✓</span> Subdomain gratis</li>
          <li class="flex items-center gap-2 text-sm text-slate-700"><span class="text-emerald-500 font-bold">✓</span> Blog & artikel</li>
          <li class="flex items-center gap-2 text-sm text-slate-700"><span class="text-emerald-500 font-bold">✓</span> SEO otomatis</li>
          <li class="flex items-center gap-2 text-sm text-slate-400"><span class="text-slate-300 font-bold">✗</span> Domain kustom</li>
        </ul>
        <a href="https://studio.nuansa.net" class="block text-center border-2 border-slate-200 text-slate-700 hover:border-slate-900 hover:text-slate-900 py-3 rounded-xl font-bold transition">Daftar Gratis</a>
      </div>

      <div class="plan-card popular fade-up relative">
        <div class="absolute -top-4 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-xs font-bold px-4 py-1.5 rounded-full">⭐ PALING POPULER</div>
        <div class="text-blue-600 text-sm font-semibold uppercase tracking-wider mb-4">Pro</div>
        <div class="text-4xl font-black text-slate-900 mb-1">Rp 99K</div>
        <div class="text-slate-500 text-sm mb-6">per bulan</div>
        <ul class="space-y-3 mb-8">
          <li class="flex items-center gap-2 text-sm text-slate-700"><span class="text-emerald-500 font-bold">✓</span> 5 website</li>
          <li class="flex items-center gap-2 text-sm text-slate-700"><span class="text-emerald-500 font-bold">✓</span> Domain kustom</li>
          <li class="flex items-center gap-2 text-sm text-slate-700"><span class="text-emerald-500 font-bold">✓</span> Toko online</li>
          <li class="flex items-center gap-2 text-sm text-slate-700"><span class="text-emerald-500 font-bold">✓</span> Google AdSense</li>
          <li class="flex items-center gap-2 text-sm text-slate-700"><span class="text-emerald-500 font-bold">✓</span> LMS + kursus</li>
          <li class="flex items-center gap-2 text-sm text-slate-700"><span class="text-emerald-500 font-bold">✓</span> Konten premium</li>
        </ul>
        <a href="https://studio.nuansa.net" class="block text-center bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-bold transition shadow-lg shadow-blue-500/25">Mulai Pro</a>
      </div>

      <div class="plan-card fade-up">
        <div class="text-slate-500 text-sm font-semibold uppercase tracking-wider mb-4">Enterprise</div>
        <div class="text-4xl font-black text-slate-900 mb-1">Custom</div>
        <div class="text-slate-500 text-sm mb-6">Hubungi kami</div>
        <ul class="space-y-3 mb-8">
          <li class="flex items-center gap-2 text-sm text-slate-700"><span class="text-emerald-500 font-bold">✓</span> Website unlimited</li>
          <li class="flex items-center gap-2 text-sm text-slate-700"><span class="text-emerald-500 font-bold">✓</span> White-label CMS</li>
          <li class="flex items-center gap-2 text-sm text-slate-700"><span class="text-emerald-500 font-bold">✓</span> Priority support</li>
          <li class="flex items-center gap-2 text-sm text-slate-700"><span class="text-emerald-500 font-bold">✓</span> Custom integrasi</li>
          <li class="flex items-center gap-2 text-sm text-slate-700"><span class="text-emerald-500 font-bold">✓</span> SLA & uptime</li>
        </ul>
        <a href="https://wa.me/6282313544664?text=Halo%2C%20saya%20tertarik%20dengan%20paket%20Enterprise%20Nuansa%20Studio" target="_blank" class="block text-center border-2 border-slate-200 text-slate-700 hover:border-slate-900 hover:text-slate-900 py-3 rounded-xl font-bold transition">Hubungi Kami</a>
      </div>
    </div>
  </div>
</section>

<!-- ========== CTA BANNER ========== -->
<section class="cta-gradient py-16 sm:py-24 fade-up">
  <div class="max-w-4xl mx-auto px-4 sm:px-6 text-center">
    <h2 class="text-3xl sm:text-5xl font-black text-white mb-6">Siap Memulai?<br>Daftar Gratis Sekarang</h2>
    <p class="text-blue-200 text-lg mb-10 max-w-xl mx-auto">Bergabunglah dengan ribuan kreator, pebisnis, dan pendidik yang sudah membangun ekosistem digital mereka bersama Nuansa Network.</p>
    <a href="https://studio.nuansa.net" class="inline-block bg-white text-slate-900 hover:bg-blue-50 px-10 py-5 rounded-2xl font-black text-lg transition shadow-2xl hover:-translate-y-1 transform">
      🚀 Buat Website Gratis — Tidak Perlu Kartu Kredit
    </a>
  </div>
</section>

<!-- ========== NEWS PORTAL SECTION ========== -->
<section id="berita" class="py-16 sm:py-20 bg-slate-50" aria-labelledby="berita-title">
  <div class="max-w-7xl mx-auto px-4 sm:px-6">
    <div class="flex items-center justify-between mb-8">
      <h2 id="berita-title" class="text-2xl sm:text-3xl font-black text-slate-900">📰 Berita & Artikel Terbaru</h2>
      <a href="#" class="text-blue-600 hover:text-blue-700 font-semibold text-sm transition">Lihat semua →</a>
    </div>

    <!-- Content from CMS: {{content}} -->
    {{content}}

  </div>
</section>

<!-- ========== TENTANG ========== -->
<section id="tentang" class="py-16 bg-white" aria-labelledby="tentang-title">
  <div class="max-w-4xl mx-auto px-4 sm:px-6 text-center">
    <span class="badge badge-blue mb-4">🏢 Tentang Nuansa Network</span>
    <h2 id="tentang-title" class="text-3xl sm:text-4xl font-black text-slate-900 mt-4 mb-6">Dibangun oleh Pengembang,<br>untuk Semua Orang</h2>
    <p class="text-slate-600 text-lg leading-relaxed mb-8">
      Nuansa Network adalah platform CMS modern yang dirancang dari Jawa Tengah, Indonesia. Kami percaya bahwa setiap orang berhak memiliki website yang cepat, profesional, dan menghasilkan — tanpa perlu menjadi programmer ahli.
    </p>
    <div class="grid grid-cols-3 gap-6 max-w-xl mx-auto">
      <div class="stat-card text-center"><div class="text-2xl font-black text-blue-600">Edge</div><div class="text-slate-500 text-xs mt-1">Infrastruktur Global</div></div>
      <div class="stat-card text-center"><div class="text-2xl font-black text-blue-600">SEO</div><div class="text-slate-500 text-xs mt-1">Terindeks Otomatis</div></div>
      <div class="stat-card text-center"><div class="text-2xl font-black text-blue-600">Zero</div><div class="text-slate-500 text-xs mt-1">Biaya Hosting</div></div>
    </div>
  </div>
</section>

<!-- ========== FOOTER ========== -->
<footer class="footer-gradient text-white pt-16 pb-8" role="contentinfo">
  <div class="max-w-7xl mx-auto px-4 sm:px-6">

    <!-- Top Grid -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12 pb-12 border-b border-white/10">

      <!-- Brand col -->
      <div class="lg:col-span-2">
        <div class="flex items-center gap-3 mb-4">
          <div class="w-10 h-10 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center font-black text-white text-xl">N</div>
          <span class="font-black text-2xl">{{siteName}}</span>
        </div>
        <p class="text-slate-400 text-sm leading-relaxed mb-6 max-w-xs">
          Platform CMS modern berbasis Teknologi Nuansa Network. Bangun website profesional tanpa sewa hosting, tanpa ribet — langsung aktif, langsung menghasilkan.
        </p>
        <!-- WhatsApp CTA -->
        <a href="https://wa.me/6282313544664?text=Halo%2C%20saya%20ingin%20konsultasi%20terkait%20Nuansa%20Studio" target="_blank" rel="noopener noreferrer"
           class="inline-flex items-center gap-3 bg-emerald-500 hover:bg-emerald-400 text-white px-5 py-3 rounded-xl font-bold text-sm transition shadow-lg shadow-emerald-500/20 group">
          <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
          Konsultasi via WhatsApp
          <span class="text-emerald-200 text-xs font-normal group-hover:text-white transition">→</span>
        </a>
      </div>

      <!-- Links -->
      <div>
        <h4 class="text-white font-bold text-sm uppercase tracking-wider mb-5">Platform</h4>
        <ul class="space-y-3">
          <li><a href="#fitur" class="text-slate-400 hover:text-white text-sm transition">Fitur Lengkap</a></li>
          <li><a href="#harga" class="text-slate-400 hover:text-white text-sm transition">Paket Harga</a></li>
          <li><a href="https://studio.nuansa.net" class="text-slate-400 hover:text-white text-sm transition">Studio CMS</a></li>
          <li><a href="#" class="text-slate-400 hover:text-white text-sm transition">Marketplace Tema</a></li>
          <li><a href="#" class="text-slate-400 hover:text-white text-sm transition">API Developer</a></li>
        </ul>
      </div>

      <div>
        <h4 class="text-white font-bold text-sm uppercase tracking-wider mb-5">Layanan</h4>
        <ul class="space-y-3">
          <li><a href="#" class="text-slate-400 hover:text-white text-sm transition">Portal Berita</a></li>
          <li><a href="#" class="text-slate-400 hover:text-white text-sm transition">Toko Online</a></li>
          <li><a href="#" class="text-slate-400 hover:text-white text-sm transition">Landing Page</a></li>
          <li><a href="#" class="text-slate-400 hover:text-white text-sm transition">Platform LMS</a></li>
          <li><a href="#" class="text-slate-400 hover:text-white text-sm transition">Monetisasi AdSense</a></li>
        </ul>
      </div>

      <!-- Developer Info -->
      <div>
        <h4 class="text-white font-bold text-sm uppercase tracking-wider mb-5">Developer</h4>
        <div class="space-y-4">
          <div>
            <div class="text-slate-400 text-xs font-medium uppercase tracking-wider mb-1">Dikembangkan oleh</div>
            <div class="text-white font-bold text-base">azmus</div>
          </div>
          <div>
            <div class="text-slate-400 text-xs font-medium uppercase tracking-wider mb-1">Alamat</div>
            <address class="text-slate-300 text-sm not-italic leading-relaxed">
              Banyutowo, Pati<br>
              Jawa Tengah, Indonesia
            </address>
          </div>
          <div>
            <div class="text-slate-400 text-xs font-medium uppercase tracking-wider mb-1">Kontak</div>
            <a href="https://wa.me/6282313544664" target="_blank" class="text-emerald-400 hover:text-emerald-300 text-sm font-semibold transition">
              082313544664
            </a>
          </div>
        </div>
      </div>
    </div>

    <!-- Bottom Bar -->
    <div class="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
      <div class="text-slate-500 text-sm text-center sm:text-left">
        &copy; 2026 <span class="text-slate-300 font-semibold">{{siteName}}</span>. Hak Cipta Dilindungi.
        <span class="hidden sm:inline mx-2">·</span>
        <br class="sm:hidden">
        Dibangun dengan ❤️ di Indonesia
      </div>
      <div class="flex items-center gap-6 text-xs text-slate-500">
        <a href="#" class="hover:text-slate-300 transition">Kebijakan Privasi</a>
        <a href="#" class="hover:text-slate-300 transition">Syarat & Ketentuan</a>
        <a href="#tentang" class="hover:text-slate-300 transition">Tentang</a>
      </div>
    </div>
  </div>
</footer>

<!-- ========== SCRIPTS ========== -->
<script>
  // ---- Mobile Menu ----
  function toggleMobileMenu() {
    var menu = document.getElementById('mobile-menu');
    var btn = document.getElementById('nav-menu-btn');
    var open = menu.classList.toggle('open');
    btn.setAttribute('aria-expanded', open);
  }

  // ---- Nav behavior on scroll ----
  var hero = document.getElementById('hero');
  var newsSection = document.getElementById('berita');
  var mainNav = document.getElementById('main-nav');
  var floatingNewsNav = document.getElementById('floating-news-nav');
  var lastScroll = 0;

  function updateNav() {
    var scrollY = window.scrollY;
    var heroBottom = hero ? hero.offsetTop + hero.offsetHeight : 600;
    var newsTop = newsSection ? newsSection.offsetTop - 120 : 9999;

    // Nav style based on position
    if (scrollY < heroBottom * 0.6) {
      mainNav.className = mainNav.className.replace(/nav-solid|nav-light/g, '').trim();
      if (!mainNav.classList.contains('nav-transparent')) mainNav.classList.add('nav-transparent');
    } else if (scrollY >= newsTop) {
      mainNav.classList.remove('nav-transparent', 'nav-solid');
      mainNav.classList.add('nav-light');
    } else {
      mainNav.classList.remove('nav-transparent', 'nav-light');
      mainNav.classList.add('nav-solid');
    }

    // Show floating news nav when reaching news section
    if (scrollY >= newsTop) {
      floatingNewsNav.classList.add('show');
    } else {
      floatingNewsNav.classList.remove('show');
    }

    lastScroll = scrollY;
  }

  window.addEventListener('scroll', updateNav, { passive: true });
  updateNav();

  // ---- Smooth Anchor ----
  document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
    anchor.addEventListener('click', function(e) {
      var targetId = this.getAttribute('href').slice(1);
      var target = document.getElementById(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // ---- Fade up on scroll ----
  var fadeEls = document.querySelectorAll('.fade-up');
  var observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  fadeEls.forEach(function(el) { observer.observe(el); });

  // Stagger children
  document.querySelectorAll('.feature-card, .plan-card').forEach(function(el, i) {
    el.style.transitionDelay = (i % 3) * 0.1 + 's';
  });

  // ---- Active news nav link on scroll ----
  var newsNavLinks = document.querySelectorAll('.news-nav-link');
  // Simple active tracking could be added here if needed
</script>

</body>
</html>
`;
