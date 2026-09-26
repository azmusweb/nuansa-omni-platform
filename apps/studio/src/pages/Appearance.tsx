import type { FC } from 'hono/jsx'
import { Layout } from '../components/Layout'

export const Appearance: FC<{ currentPath: string, settings?: any }> = ({ currentPath, settings = {} }) => {
 const siteName = settings['siteName'] || 'Nuansa Network'
 const primaryColor = settings['primaryColor'] || '#3b82f6'
 const fontFamily = settings['fontFamily'] || 'Inter'
 const headerLayout = settings['headerLayout'] || 'left' // left, center
 const footerLayout = settings['footerLayout'] || 'simple' // simple, columns

 return (
 <Layout title="Nuansa Architect (Visual Builder)" currentPath={currentPath}>
 <div class="flex flex-col gap-6">
 
 {/* Panel Kontrol Builder (Header) */}
 <div class="bg-white backdrop-blur-sm border border-gray-200 rounded-2xl shadow-xl flex flex-col overflow-hidden">
 
 <div class="p-4 border-b border-gray-200 shrink-0 bg-gray-50 flex justify-between items-center">
 <h3 class="text-gray-900 font-semibold flex items-center gap-2">
 <svg class="w-4 h-4 text-brand-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"></path></svg>
 Architect Panel
 </h3>
 </div>
 
 <form id="architect-form" action="/api/settings" method="POST" class="flex flex-col flex-1 overflow-hidden">
 
 <div class="flex-1 overflow-y-auto">
 
 {/* Tab Navigasi Sederhana */}
 <div class="flex text-xs font-medium text-gray-500 border-b border-gray-200 bg-gray-50 sticky top-0 z-10">
 <button type="button" class="flex-1 py-3 text-gray-900 border-b-2 border-brand-500" id="tab-global" onclick="switchTab('global')">Global</button>
 <button type="button" class="flex-1 py-3 hover:text-gray-900 transition" id="tab-header" onclick="switchTab('header')">Header</button>
 <button type="button" class="flex-1 py-3 hover:text-gray-900 transition" id="tab-footer" onclick="switchTab('footer')">Footer</button>
 <button type="button" class="flex-1 py-3 hover:text-gray-900 transition" id="tab-html" onclick="switchTab('html')">HTML</button>
 </div>

 {/* Panel Konten */}
 <div class="p-5 space-y-6">
 
 {/* PRESET THEMES (Baru Ditambahkan) */}
 <div class="mb-6 p-4 bg-gray-50 border border-gray-200 rounded-xl shadow-inner">
 <label class="block text-brand-600 text-xs font-semibold uppercase tracking-wider mb-3 flex items-center gap-2">
 <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"></path></svg>
 Preset Desain Instan
 </label>
 <div class="grid grid-cols-3 gap-2">
 <button type="button" onclick="applyPreset('minimalis')" class="py-2 px-1 bg-gray-100 hover:bg-slate-700 border border-gray-200 rounded-lg text-[10px] font-medium text-gray-700 transition">Minimalis</button>
 <button type="button" onclick="applyPreset('korporat')" class="py-2 px-1 bg-gray-100 hover:bg-slate-700 border border-gray-200 rounded-lg text-[10px] font-medium text-gray-700 transition">Korporat</button>
 <button type="button" onclick="applyPreset('kreatif')" class="py-2 px-1 bg-gray-100 hover:bg-slate-700 border border-gray-200 rounded-lg text-[10px] font-medium text-gray-700 transition">Kreatif</button>
 </div>
 </div>

 {/* GLOBAL TAB */}
 <div id="panel-global" class="space-y-5 block">
 <div>
 <label class="block text-gray-700 text-xs font-semibold uppercase tracking-wider mb-2">Nama Identitas Situs</label>
 <input 
 type="text" 
 name="siteName" 
 id="input-siteName"
 value={siteName}
 class="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-gray-900 text-sm focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition"
 placeholder="Nuansa Web"
 />
 </div>

 <div>
 <label class="block text-gray-700 text-xs font-semibold uppercase tracking-wider mb-2">Warna Utama (Aksen)</label>
 <div class="flex items-center gap-3">
 <div class="relative w-12 h-10 rounded-lg overflow-hidden border border-slate-600 shadow-inner">
 <input 
 type="color" 
 name="primaryColor" 
 id="input-primaryColor"
 value={primaryColor}
 class="absolute -inset-2 w-16 h-16 cursor-pointer"
 />
 </div>
 <input 
 type="text" 
 id="display-primaryColor"
 value={primaryColor}
 class="flex-1 bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 font-mono text-sm text-gray-700 focus:outline-none focus:border-brand-500"
 oninput="document.getElementById('input-primaryColor').value = this.value; triggerUpdate();"
 />
 </div>
 </div>

 <div>
 <label class="block text-gray-700 text-xs font-semibold uppercase tracking-wider mb-2">Tipografi (Font Utama)</label>
 <select name="fontFamily" id="input-fontFamily" class="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-gray-900 text-sm focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition">
 <option value="Inter" selected={fontFamily === 'Inter'}>Inter (Modern Sans)</option>
 <option value="Playfair Display" selected={fontFamily === 'Playfair Display'}>Playfair Display (Serif Elegan)</option>
 <option value="Space Grotesk" selected={fontFamily === 'Space Grotesk'}>Space Grotesk (Tech / Edgy)</option>
 <option value="Outfit" selected={fontFamily === 'Outfit'}>Outfit (Geometris Bersih)</option>
 </select>
 </div>
 </div>

 {/* HEADER TAB */}
 <div id="panel-header" class="space-y-5 hidden">
 <div>
 <label class="block text-gray-700 text-xs font-semibold uppercase tracking-wider mb-3">Gaya Tata Letak Header</label>
 
 <div class="grid grid-cols-2 gap-3">
 <label class="relative cursor-pointer">
 <input type="radio" name="headerLayout" value="left" class="peer sr-only" checked={headerLayout === 'left'} onchange="triggerUpdate()" />
 <div class="p-3 bg-gray-50 border border-gray-200 rounded-xl peer-checked:border-brand-500 peer-checked:ring-1 peer-checked:ring-brand-500 transition opacity-60 peer-checked:opacity-100">
 <div class="h-2 w-full bg-slate-700 rounded mb-1 flex items-center justify-between px-1">
 <div class="w-2 h-1 bg-brand-500 rounded"></div>
 <div class="flex gap-0.5"><div class="w-2 h-0.5 bg-slate-500"></div><div class="w-2 h-0.5 bg-slate-500"></div></div>
 </div>
 <p class="text-xs text-center mt-2 font-medium text-gray-700">Logo Kiri</p>
 </div>
 </label>
 <label class="relative cursor-pointer">
 <input type="radio" name="headerLayout" value="center" class="peer sr-only" checked={headerLayout === 'center'} onchange="triggerUpdate()" />
 <div class="p-3 bg-gray-50 border border-gray-200 rounded-xl peer-checked:border-brand-500 peer-checked:ring-1 peer-checked:ring-brand-500 transition opacity-60 peer-checked:opacity-100">
 <div class="h-2 w-full bg-slate-700 rounded mb-1 flex items-center justify-center">
 <div class="w-2 h-1 bg-brand-500 rounded"></div>
 </div>
 <p class="text-xs text-center mt-2 font-medium text-gray-700">Logo Tengah</p>
 </div>
 </label>
 </div>
 </div>
 </div>

 {/* FOOTER TAB */}
 <div id="panel-footer" class="space-y-5 hidden">
 <div>
 <label class="block text-gray-700 text-xs font-semibold uppercase tracking-wider mb-3">Gaya Tata Letak Footer</label>
 
 <div class="grid grid-cols-2 gap-3">
 <label class="relative cursor-pointer">
 <input type="radio" name="footerLayout" value="simple" class="peer sr-only" checked={footerLayout === 'simple'} onchange="triggerUpdate()" />
 <div class="p-3 bg-gray-50 border border-gray-200 rounded-xl peer-checked:border-brand-500 peer-checked:ring-1 peer-checked:ring-brand-500 transition opacity-60 peer-checked:opacity-100">
 <div class="h-4 w-full bg-slate-700 rounded flex flex-col items-center justify-center gap-0.5">
 <div class="w-4 h-0.5 bg-slate-500 rounded"></div>
 </div>
 <p class="text-[10px] text-center mt-2 font-medium text-gray-700">Sederhana</p>
 </div>
 </label>
 <label class="relative cursor-pointer">
 <input type="radio" name="footerLayout" value="columns" class="peer sr-only" checked={footerLayout === 'columns'} onchange="triggerUpdate()" />
 <div class="p-3 bg-gray-50 border border-gray-200 rounded-xl peer-checked:border-brand-500 peer-checked:ring-1 peer-checked:ring-brand-500 transition opacity-60 peer-checked:opacity-100">
 <div class="h-4 w-full bg-slate-700 rounded flex items-center justify-center gap-1 px-1">
 <div class="w-2 h-2 bg-slate-500 rounded-sm"></div>
 <div class="w-2 h-2 bg-slate-500 rounded-sm"></div>
 <div class="w-2 h-2 bg-slate-500 rounded-sm"></div>
 </div>
 <p class="text-[10px] text-center mt-2 font-medium text-gray-700">3 Kolom</p>
 </div>
 </label>
 </div>
 </div>
 </div>

 {/* HTML TAB */}
 <div id="panel-html" class="space-y-5 hidden">
 <div>
 <label class="block text-brand-600 text-xs font-semibold uppercase tracking-wider mb-2">Editor HTML Kustom</label>
 <p class="text-[10px] text-gray-500 mb-3">Jika ini diisi, pengaturan Global/Header/Footer di atas akan diabaikan. Gunakan <code>{`{{content}}`}</code> untuk meletakkan konten utama halaman. Variabel: <code>{`{{siteName}}`}</code>, <code>{`{{title}}`}</code>, <code>{`{{primaryColor}}`}</code>.</p>
 <textarea 
 name="customThemeHtml" 
 id="input-customThemeHtml"
 class="w-full h-80 bg-dark-950 border border-gray-200 rounded-xl p-4 text-emerald-400 font-mono text-xs focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition whitespace-pre overflow-x-auto custom-scrollbar"
 placeholder={`<!DOCTYPE html>\n<html lang="id">\n<head>\n <title>{{title}}</title>\n <meta name="viewport" content="width=device-width, initial-scale=1.0" />\n <script src="https://cdn.tailwindcss.com"></script>\n <style>\n :root { --primary: {{primaryColor}}; }\n </style>\n</head>\n<body>\n <header>\n <h1>{{siteName}}</h1>\n </header>\n <main>\n {{content}}\n </main>\n <footer>\n &copy; 2026 {{siteName}}\n </footer>\n</body>\n</html>`}
 oninput="triggerUpdate()"
 >{settings['customThemeHtml'] || ''}</textarea>
 </div>
 </div>

 </div>
 </div>

 <div class="p-4 bg-gray-50 border-t border-gray-200 shrink-0">
 <button type="submit" id="save-btn" class="w-full bg-brand-600 hover:bg-brand-500 text-gray-900 py-3 rounded-xl font-medium text-sm transition shadow-lg shadow-brand-500/20 flex justify-center items-center gap-2">
 <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
 Publikasikan Perubahan
 </button>
 </div>
 </form>
 </div>

 {/* Visual Preview Area (DOM Iframe-like) */}
 <div class="bg-gray-50 border border-gray-200 rounded-2xl shadow-2xl overflow-hidden flex flex-col min-h-[600px]">
 <div class="bg-white px-4 py-3 flex items-center justify-between border-b border-gray-200 shrink-0">
 <div class="flex gap-1.5">
 <div class="w-3 h-3 rounded-full bg-slate-600"></div>
 <div class="w-3 h-3 rounded-full bg-slate-600"></div>
 <div class="w-3 h-3 rounded-full bg-slate-600"></div>
 </div>
 <div class="px-8 py-1.5 bg-gray-50 text-gray-500 text-xs font-mono rounded-lg border border-gray-200 flex items-center gap-2">
 <svg class="w-3 h-3 text-emerald-500" fill="currentColor" viewBox="0 0 20 20"><path d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"></path></svg>
 Pratinjau Langsung (Desktop)
 </div>
 <div class="w-10"></div>
 </div>
 
 <div class="flex-1 bg-white relative overflow-y-auto" id="previewArea">
 
 {/* INJECT FONT */}
 <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Playfair+Display:wght@400;600;700&family=Outfit:wght@400;500;600;700&family=Space+Grotesk:wght@400;500;600;700&display=swap" rel="stylesheet" />
 
 {/* MOCKUP SITE: Bereaksi seketika terhadap perubahan konfigurasi */}
 <div id="mockup-site" class="min-h-full flex flex-col transition-all duration-300" style={`font-family: '${fontFamily}', sans-serif;`}>
 
 {/* Dynamic Header */}
 <header id="mockup-header" class={`h-20 border-b border-slate-200 flex items-center px-8 transition-all ${headerLayout === 'center' ? 'flex-col justify-center gap-2 py-4 h-auto' : 'justify-between'}`}>
 <div class="font-extrabold text-2xl tracking-tight transition-colors" style={`color: ${primaryColor}`} id="previewSiteName">{siteName}</div>
 <nav class="flex gap-6 text-sm font-medium text-slate-600">
 <span class="hover:text-slate-900 cursor-pointer transition">Beranda</span>
 <span class="hover:text-slate-900 cursor-pointer transition">Artikel</span>
 <span class="hover:text-slate-900 cursor-pointer transition">Layanan</span>
 <span class="hover:text-slate-900 cursor-pointer transition">Tentang Kami</span>
 </nav>
 </header>
 
 {/* Hero Section */}
 <div class="flex-1 flex flex-col items-center justify-center text-center px-4 py-20 bg-slate-50 relative overflow-hidden">
 {/* Decorative blob */}
 <div class="absolute top-0 right-0 w-64 h-64 opacity-10 blur-3xl rounded-full transition-colors" style={`background-color: ${primaryColor}`} id="previewBlob"></div>
 
 <h1 class="text-5xl md:text-6xl font-extrabold text-slate-900 mb-6 tracking-tight relative z-10 leading-tight">Selamat Datang di <br/>{siteName}</h1>
 <p class="text-lg text-gray-400 max-w-xl mb-10 relative z-10 leading-relaxed">Sistem manajemen konten kelas dunia yang memungkinkan Anda membangun kehadiran digital tanpa batas dengan performa Edge-Native.</p>
 <div class="flex gap-4 relative z-10">
 <button class="px-8 py-3.5 rounded-full text-gray-900 font-medium shadow-xl hover:opacity-90 transition-all transform hover:-translate-y-1" style={`background-color: ${primaryColor}`} id="previewButton">
 Mulai Eksplorasi
 </button>
 <button class="px-8 py-3.5 rounded-full font-medium transition-all" style={`color: ${primaryColor}; background-color: ${primaryColor}15`} id="previewButtonSecondary">
 Pelajari Lebih Lanjut
 </button>
 </div>
 </div>

 {/* Dynamic Footer */}
 <footer id="mockup-footer" class={`bg-slate-900 text-gray-500 py-12 px-8 transition-all ${footerLayout === 'columns' ? '' : 'text-center'}`}>
 {footerLayout === 'columns' ? (
 <div id="footer-cols" class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8 max-w-5xl mx-auto border-b border-slate-800 pb-8">
 <div>
 <h4 class="text-gray-900 font-bold mb-4" style={`color: ${primaryColor}`} id="previewFooterLogo">{siteName}</h4>
 <p class="text-sm">Membangun pengalaman web tanpa latensi dengan teknologi mutakhir.</p>
 </div>
 <div>
 <h4 class="text-gray-900 font-bold mb-4">Tautan</h4>
 <ul class="text-sm space-y-2"><li>Beranda</li><li>Artikel</li><li>Tentang</li></ul>
 </div>
 <div>
 <h4 class="text-gray-900 font-bold mb-4">Hubungi Kami</h4>
 <p class="text-sm">contact@nuansa.net<br/>Jakarta, Indonesia</p>
 </div>
 </div>
 ) : (
 <div id="footer-cols" class="hidden"></div>
 )}
 
 <div class="text-sm">
 &copy; 2026 {siteName}. All rights reserved. Built with Nuansa Network.
 </div>
 </footer>

 </div>
 </div>
 </div>
 </div>
 
 {/* Script Architect - DOM Manipulation untuk Real-Time Preview */}
 <script dangerouslySetInnerHTML={{__html: `
 // Tab Switcher
 function switchTab(tab) {
 ['global', 'header', 'footer', 'html'].forEach(t => {
 document.getElementById('panel-' + t).classList.add('hidden');
 document.getElementById('panel-' + t).classList.remove('block');
 
 const btn = document.getElementById('tab-' + t);
 btn.classList.remove('text-gray-900', 'border-b-2', 'border-brand-500');
 btn.classList.add('text-gray-500');
 });
 
 document.getElementById('panel-' + tab).classList.remove('hidden');
 document.getElementById('panel-' + tab).classList.add('block');
 
 const activeBtn = document.getElementById('tab-' + tab);
 activeBtn.classList.remove('text-gray-500');
 activeBtn.classList.add('text-gray-900', 'border-b-2', 'border-brand-500');
 }

 // Apply Presets
 function applyPreset(type) {
 const presets = {
 'minimalis': { font: 'Inter', color: '#171717', header: 'left', footer: 'simple' },
 'korporat': { font: 'Playfair Display', color: '#1e3a8a', header: 'center', footer: 'columns' },
 'kreatif': { font: 'Space Grotesk', color: '#ec4899', header: 'left', footer: 'columns' }
 };
 
 const p = presets[type];
 if(!p) return;

 // Set form values
 document.getElementById('input-fontFamily').value = p.font;
 document.getElementById('input-primaryColor').value = p.color;
 
 document.querySelector(\`input[name="headerLayout"][value="\${p.header}"]\`).checked = true;
 document.querySelector(\`input[name="footerLayout"][value="\${p.footer}"]\`).checked = true;
 
 // Trigger the visual update
 triggerUpdate();
 }

 // Live Preview Updater
 function triggerUpdate() {
 const siteName = document.getElementById('input-siteName').value || 'Nuansa Web';
 const primaryColor = document.getElementById('input-primaryColor').value;
 const fontFamily = document.getElementById('input-fontFamily').value;
 
 const headerLayout = document.querySelector('input[name="headerLayout"]:checked').value;
 const footerLayout = document.querySelector('input[name="footerLayout"]:checked').value;

 // Update Texts
 document.getElementById('previewSiteName').innerText = siteName;
 document.querySelector('h1').innerHTML = \`Selamat Datang di <br/>\${siteName}\`;
 
 // Update Colors
 document.getElementById('display-primaryColor').value = primaryColor;
 document.getElementById('previewSiteName').style.color = primaryColor;
 document.getElementById('previewBlob').style.backgroundColor = primaryColor;
 document.getElementById('previewButton').style.backgroundColor = primaryColor;
 document.getElementById('previewButtonSecondary').style.color = primaryColor;
 document.getElementById('previewButtonSecondary').style.backgroundColor = primaryColor + '15'; // 15% opacity hex
 
 if(document.getElementById('previewFooterLogo')) {
 document.getElementById('previewFooterLogo').innerText = siteName;
 document.getElementById('previewFooterLogo').style.color = primaryColor;
 }

 // Update Typography
 document.getElementById('mockup-site').style.fontFamily = \`'\${fontFamily}', sans-serif\`;

 // Update Header Layout
 const header = document.getElementById('mockup-header');
 if (headerLayout === 'center') {
 header.className = 'border-b border-slate-200 flex items-center px-8 transition-all flex-col justify-center gap-3 py-6 h-auto';
 } else {
 header.className = 'h-20 border-b border-slate-200 flex items-center px-8 transition-all justify-between';
 }

 // Update Footer Layout (We reload the page on save to fully render the JSX changes for structural things, 
 // but we can fake the layout change here by showing/hiding the columns if they exist, or just rely on form save).
 // For immediate visual feedback on footer without JSX re-render, we just toggle display.
 const footerCols = document.getElementById('footer-cols');
 const footer = document.getElementById('mockup-footer');
 if (footerLayout === 'columns') {
 footer.classList.remove('text-center');
 // Jika elementnya belum ada (awalnya render simple), maka untuk preview kita biarkan saja,
 // User akan melihat perubahan sesungguhnya setelah 'Simpan'. 
 // Tapi karena JSX sudah nge-render hidden div, kita tidak bisa dengan mudah merekonstruksinya via vanilla JS di sini tanpa mereplikasi HTML.
 // Solusi: Kita sarankan "Simpan Perubahan untuk melihat tata letak penuh".
 } else {
 footer.classList.add('text-center');
 if(footerCols) footerCols.style.display = 'none';
 }
 }

 // Add event listeners to trigger update instantly
 ['input-siteName', 'input-primaryColor', 'input-fontFamily'].forEach(id => {
 document.getElementById(id).addEventListener('input', triggerUpdate);
 document.getElementById(id).addEventListener('change', triggerUpdate);
 });
 `}} />
 </Layout>
 )
}
