const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'apps', 'web', 'src', 'index.tsx');
let content = fs.readFileSync(filePath, 'utf-8');

// 1. Upgrade Layout Signature & Head (SEO)
content = content.replace(
  /const Layout: FC<\{ title: string, siteName: string, primaryColor: string, adsenseId\?: string, lang\?: string, t\?: any, customThemeHtml\?: string, children: any \}> = \(\{ title, siteName, primaryColor, adsenseId, lang = 'id', t = getLangContext\(\{ req: \{ header: \(\) => 'ID' \} \}\)\.t, customThemeHtml, children \}\) => \{([\s\S]*?)return \(\s*<html lang=\{lang\}>\s*<head>\s*<meta charset="UTF-8" \/>\s*<meta name="viewport" content="width=device-width, initial-scale=1\.0" \/>\s*<title>\{title\}<\/title>/m,
  `const Layout: FC<{ title: string, siteName: string, primaryColor: string, adsenseId?: string, lang?: string, t?: any, customThemeHtml?: string, description?: string, image?: string, url?: string, children: any }> = ({ title, siteName, primaryColor, adsenseId, lang = 'id', t = getLangContext({ req: { header: () => 'ID' } }).t, customThemeHtml, description, image, url, children }) => {$1
  const metaDesc = description || \`Platform modern dari \${siteName}. Dapatkan pembaruan dan wawasan terbaru.\`;
  const metaUrl = url || \`https://nuansa.net\`;

  return (
    <html lang={lang} class="scroll-smooth">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0" />
        <title>{title}</title>
        <meta name="description" content={metaDesc} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={metaDesc} />
        <meta property="og:url" content={metaUrl} />
        <meta property="og:type" content="website" />
        {image && <meta property="og:image" content={image} />}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={metaDesc} />
        {image && <meta name="twitter:image" content={image} />}`
);

// 2. Add progress bar script
content = content.replace(
  /localStorage\.setItem\('theme', 'dark'\);\s*\}\s*\}/,
  `localStorage.setItem('theme', 'dark');
              }
            }
            // Reading Progress Bar
            window.addEventListener('scroll', () => {
              const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
              const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
              const scrolled = (winScroll / height) * 100;
              const bar = document.getElementById('progress-bar');
              if(bar) bar.style.width = scrolled + '%';
            });`
);

// 3. Upgrade CSS styles
content = content.replace(
  /\.glassmorphism \{[\s\S]*?opacity: 0\.1;\s*\}/,
  `.glassmorphism {
              background: rgba(255, 255, 255, 0.75);
              backdrop-filter: blur(20px);
              -webkit-backdrop-filter: blur(20px);
              border: 1px solid rgba(255, 255, 255, 0.6);
              box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.05);
            }
            .dark .glassmorphism {
              background: rgba(9, 9, 11, 0.75);
              border: 1px solid rgba(255, 255, 255, 0.08);
              box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.4);
            }
            .animate-mesh {
              background: radial-gradient(at 40% 20%, hsla(228,100%,74%,1) 0px, transparent 50%),
                          radial-gradient(at 80% 0%, hsla(189,100%,56%,1) 0px, transparent 50%),
                          radial-gradient(at 0% 50%, hsla(355,100%,93%,1) 0px, transparent 50%),
                          radial-gradient(at 80% 50%, hsla(340,100%,76%,1) 0px, transparent 50%),
                          radial-gradient(at 0% 100%, hsla(22,100%,77%,1) 0px, transparent 50%),
                          radial-gradient(at 80% 100%, hsla(242,100%,70%,1) 0px, transparent 50%),
                          radial-gradient(at 0% 0%, hsla(343,100%,76%,1) 0px, transparent 50%);
              filter: blur(80px);
              opacity: 0.15;
              animation: breathe 15s ease-in-out infinite alternate;
            }
            .dark .animate-mesh {
              background: radial-gradient(at 40% 20%, hsla(228,100%,74%,0.8) 0px, transparent 50%),
                          radial-gradient(at 80% 0%, hsla(189,100%,56%,0.8) 0px, transparent 50%),
                          radial-gradient(at 0% 50%, hsla(280,100%,50%,0.8) 0px, transparent 50%),
                          radial-gradient(at 80% 50%, hsla(340,100%,76%,0.8) 0px, transparent 50%),
                          radial-gradient(at 0% 100%, hsla(22,100%,77%,0.8) 0px, transparent 50%),
                          radial-gradient(at 80% 100%, hsla(242,100%,70%,0.8) 0px, transparent 50%),
                          radial-gradient(at 0% 0%, hsla(343,100%,76%,0.8) 0px, transparent 50%);
              opacity: 0.1;
            }
            @keyframes breathe {
              0% { transform: scale(1); }
              100% { transform: scale(1.05); }
            }
            @keyframes fadeInUp {
              from { opacity: 0; transform: translateY(30px); }
              to { opacity: 1; transform: translateY(0); }
            }
            .fade-in-up {
              animation: fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
              opacity: 0;
            }
            .delay-100 { animation-delay: 100ms; }
            .delay-200 { animation-delay: 200ms; }
            .delay-300 { animation-delay: 300ms; }`
);

// 4. Upgrade Font
content = content.replace(
  /<link href="https:\/\/fonts\.googleapis\.com\/css2\?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet" \/>\s*<style dangerouslySetInnerHTML=\{\{__html: `body \{ font-family: 'Inter', sans-serif; \}`\}\} \/>/m,
  `<link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
        <style dangerouslySetInnerHTML={{__html: \`body { font-family: 'Plus Jakarta Sans', sans-serif; }\`}} />`
);

// 5. Upgrade Body and Header
content = content.replace(
  /<body class="bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-200 min-h-screen flex flex-col relative transition-colors duration-300">\s*<div class="fixed inset-0 z-0 pointer-events-none animate-mesh"><\/div>\s*\{\/\* Header Global \*\/}\s*<header class="glassmorphism border-b border-slate-200 dark:border-slate-800 sticky top-0 z-50 shadow-sm transition-colors duration-300">\s*<div class="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">\s*<a href="\/" class="text-2xl font-extrabold tracking-tight text-theme">\s*\{siteName\}\s*<\/a>\s*<div class="flex items-center gap-6">\s*<nav class="hidden md:flex gap-6 items-center text-sm font-medium text-slate-600 dark:text-slate-400">\s*<a href="\/" class="hover:text-theme dark:hover:text-theme transition">\{t\('home'\)\}<\/a>\s*<a href="\/belajar" class="hover:text-theme dark:hover:text-theme transition">\{t\('learn'\)\}<\/a>\s*<a href="\/katalog" class="hover:text-theme dark:hover:text-theme transition">\{t\('catalog'\)\}<\/a>\s*<a href="\/login" class="hover:text-theme dark:hover:text-theme transition ml-4">\{t\('login'\)\}<\/a>\s*<a href="\/register" class="bg-theme text-white hover:opacity-90 transition px-4 py-2 rounded-xl shadow-sm">\{t\('register'\)\}<\/a>\s*<\/nav>\s*<button onclick="toggleTheme\(\)" class="p-2 rounded-full hover:bg-slate-200\/50 dark:hover:bg-slate-800 transition text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white" title="Toggle Theme">\s*<svg class="w-5 h-5 hidden dark:block" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15\.364 6\.364l-\.707-\.707M6\.343 6\.343l-\.707-\.707m12\.728 0l-\.707\.707M6\.343 17\.657l-\.707\.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"><\/path><\/svg>\s*<svg class="w-5 h-5 block dark:hidden" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20\.354 15\.354A9 9 0 018\.646 3\.646 9\.003 9\.003 0 0012 21a9\.003 9\.003 0 008\.354-5\.646z"><\/path><\/svg>\s*<\/button>\s*<\/div>\s*<\/div>\s*<\/header>\s*\{\/\* Konten Halaman \*\/}\s*<main class="flex-1 relative z-10">/m,
  `<body class="bg-slate-50 dark:bg-zinc-950 text-slate-800 dark:text-slate-200 min-h-screen flex flex-col relative transition-colors duration-300 selection:bg-theme selection:text-white">
        <div id="progress-bar" class="fixed top-0 left-0 h-1 bg-theme z-[60] w-0 transition-all duration-150"></div>
        <div class="fixed inset-0 z-0 pointer-events-none animate-mesh"></div>
        
        {/* Header Global - Floating Pill Design */}
        <header class="fixed top-4 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none">
          <div class="pointer-events-auto glassmorphism rounded-full px-6 md:px-8 h-14 md:h-16 flex items-center justify-between w-full max-w-5xl shadow-xl shadow-slate-200/20 dark:shadow-black/40 transition-all duration-300">
            <a href="/" class="text-xl md:text-2xl font-extrabold tracking-tight text-theme hover:scale-105 transition-transform">
              {siteName}
            </a>
            <div class="flex items-center gap-4 md:gap-8">
              <nav class="hidden md:flex gap-6 items-center text-sm font-semibold text-slate-600 dark:text-slate-300">
                <a href="/" class="hover:text-theme dark:hover:text-theme transition">{t('home')}</a>
                <a href="/belajar" class="hover:text-theme dark:hover:text-theme transition">{t('learn')}</a>
                <a href="/katalog" class="hover:text-theme dark:hover:text-theme transition">{t('catalog')}</a>
                <div class="w-px h-4 bg-slate-300 dark:bg-slate-700"></div>
                <a href="/login" class="hover:text-theme dark:hover:text-theme transition">{t('login')}</a>
                <a href="/register" class="bg-theme text-white hover:opacity-90 hover:-translate-y-0.5 transition-all px-5 py-2 rounded-full shadow-md shadow-theme/30">{t('register')}</a>
              </nav>
              <button onclick="toggleTheme()" class="p-2.5 rounded-full hover:bg-slate-200/50 dark:hover:bg-zinc-800 transition-colors text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white" title="Toggle Theme" aria-label="Toggle Theme">
                <svg class="w-5 h-5 hidden dark:block" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>
                <svg class="w-5 h-5 block dark:hidden" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path></svg>
              </button>
            </div>
          </div>
        </header>

        {/* Konten Halaman */}
        <main class="flex-1 relative z-10 pt-24">`
);

// 6. Upgrade Footer
content = content.replace(
  /<footer class="bg-slate-900 text-slate-400 py-12 mt-20 relative z-10">\s*<div class="max-w-5xl mx-auto px-6 text-center">\s*<p>&copy; \{new Date\(\)\.getFullYear\(\)\} \{siteName\}\. \{t\('rights'\)\}<\/p>\s*<p class="text-xs mt-2 opacity-50">\{t\('powered'\)\}<\/p>\s*<\/div>\s*<\/footer>/,
  `<footer class="bg-slate-950 text-slate-400 py-16 mt-24 relative z-10 border-t border-slate-900">
          <div class="max-w-5xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6 text-center md:text-left">
            <div>
              <p class="text-white font-bold text-lg mb-2">{siteName}</p>
              <p>&copy; {new Date().getFullYear()} {siteName}. {t('rights')}</p>
            </div>
            <div>
              <p class="text-xs opacity-50 px-4 py-2 rounded-full border border-slate-800 bg-slate-900 inline-block">{t('powered')}</p>
            </div>
          </div>
        </footer>`
);

// 7. Upgrade Home Page Hero and Grid
content = content.replace(
  /\{\/\* Hero Section \*\/\}\s*<section class="bg-theme text-white py-24 text-center px-6">\s*<h1 class="text-4xl md:text-5xl font-extrabold mb-6">\{t\('welcome'\)\} \{siteName\}<\/h1>\s*<p class="text-lg md:text-xl opacity-90 max-w-2xl mx-auto mb-8">\s*\{t\('hero_desc'\)\}\s*<\/p>\s*<\/section>\s*\{\/\* Grid Artikel \*\/\}\s*<section class="max-w-5xl mx-auto px-6 py-16">\s*<div class="flex items-center justify-between mb-8">\s*<h2 class="text-2xl font-bold text-slate-900 dark:text-white">\{t\('latest_articles'\)\}<\/h2>\s*<span class="text-sm font-medium text-slate-500 dark:text-slate-400">\{posts\.length\} \{t\('articles_count'\)\}<\/span>\s*<\/div>\s*\{posts\.length === 0 \? \(\s*<div class="text-center py-20 glassmorphism rounded-2xl border border-slate-200 dark:border-slate-800">\s*<p class="text-slate-500 dark:text-slate-400">\{t\('no_articles'\)\}<\/p>\s*<\/div>\s*\) : \(\s*<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">\s*\{posts\.map\(\(post: any\) => \([\s\S]*?<\/a>\s*\)\)\}\s*<\/div>\s*\)\}\s*<\/section>/,
  `{/* Hero Section Modernized */}
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
              <a href={\`/read/\${post.slug}\`} class={\`group glassmorphism rounded-3xl border border-slate-200 dark:border-zinc-800 overflow-hidden hover:shadow-2xl hover:shadow-theme/10 transition-all duration-500 flex flex-col h-full hover:-translate-y-2 fade-in-up delay-\${Math.min(300, (index%3 + 1)*100)}\`}>
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
      </section>`
);

// 8. Update Read Route SEO props
content = content.replace(
  /const price = post\.price \|\| 0\s*return c\.html\(\s*<Layout title=\{\`\$\{post\.title\} - \$\{siteName\}\`\} siteName=\{siteName\} primaryColor=\{primaryColor\} adsenseId=\{adsenseId\} customThemeHtml=\{settings\['customThemeHtml'\]\}>/,
  `const price = post.price || 0
  
  let metaDescription = post.content ? post.content.replace(/<[^>]*>?/gm, '').substring(0, 160).trim() + '...' : '';
  let ogImage = post.cover_image || '';

  return c.html(
    <Layout title={\`\${post.title} - \${siteName}\`} siteName={siteName} primaryColor={primaryColor} adsenseId={adsenseId} customThemeHtml={settings['customThemeHtml']} description={metaDescription} image={ogImage}>`
);

// 9. Update Read Page UI
content = content.replace(
  /<article class="max-w-3xl mx-auto px-6 py-16">/,
  `<article class="max-w-4xl mx-auto px-6 py-20 fade-in-up">`
);

fs.writeFileSync(filePath, content);
console.log('Done upgrading theme in index.tsx');
