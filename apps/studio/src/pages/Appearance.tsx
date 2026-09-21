import type { FC } from 'hono/jsx'
import { Layout } from '../components/Layout'

export const Appearance: FC<{ currentPath: string, settings?: any }> = ({ currentPath, settings = {} }) => {
  const siteName = settings['siteName'] || 'Nuansa Omni-Platform'
  const primaryColor = settings['primaryColor'] || '#3b82f6' // Default blue

  return (
    <Layout title="Editor Tata Letak (Architect)" currentPath={currentPath}>
      <div class="grid grid-cols-1 lg:grid-cols-4 gap-6 h-[calc(100vh-10rem)]">
        {/* Left Toolbar */}
        <div class="col-span-1 bg-dark-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-5 shadow-xl flex flex-col">
          <h3 class="text-white font-semibold mb-6 px-2 border-b border-slate-700/50 pb-4">Pengaturan Situs</h3>
          
          <form action="/api/settings" method="POST" class="flex flex-col flex-1">
            <div class="space-y-5 flex-1 overflow-y-auto px-2">
              
              <div>
                <label class="block text-slate-300 text-sm font-medium mb-2">Nama Situs</label>
                <input 
                  type="text" 
                  name="siteName" 
                  value={siteName}
                  class="w-full bg-dark-900 border border-slate-700 rounded-xl px-4 py-2 text-white focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition"
                  placeholder="Contoh: Nuansa Blog"
                />
              </div>

              <div>
                <label class="block text-slate-300 text-sm font-medium mb-2">Warna Utama Tema</label>
                <div class="flex items-center gap-4">
                  <input 
                    type="color" 
                    name="primaryColor" 
                    value={primaryColor}
                    id="colorPicker"
                    class="h-10 w-16 rounded cursor-pointer bg-dark-900 border border-slate-700"
                  />
                  <span class="text-slate-400 font-mono text-sm" id="colorHex">{primaryColor}</span>
                </div>
                <p class="text-slate-500 text-xs mt-2">Warna ini akan mengubah aksen tombol dan tautan pada situs publik Anda.</p>
              </div>
              
            </div>

            <div class="pt-6 mt-4">
              <button type="submit" class="w-full bg-brand-600 hover:bg-brand-500 text-white py-2.5 rounded-xl font-medium text-sm transition shadow-lg shadow-brand-500/20">
                Simpan Perubahan
              </button>
            </div>
          </form>
        </div>

        {/* Visual Preview Area */}
        <div class="col-span-1 lg:col-span-3 bg-dark-900 border border-slate-700/50 rounded-2xl shadow-xl overflow-hidden flex flex-col">
          <div class="bg-dark-800 px-4 py-3 flex items-center justify-center gap-4 border-b border-slate-700/50">
            <div class="px-6 py-1.5 bg-dark-900 text-slate-400 text-xs font-mono rounded-lg border border-slate-700/50">Pratinjau Langsung (Resolusi Desktop)</div>
          </div>
          
          <div class="flex-1 bg-white relative overflow-hidden" id="previewArea">
             {/* Mockup Preview - Reacting to colors */}
             <div class="h-full flex flex-col">
                {/* Header Mockup */}
                <header class="h-16 border-b flex items-center justify-between px-8">
                  <div class="font-bold text-xl tracking-tight" style={`color: ${primaryColor}`} id="previewSiteName">{siteName}</div>
                  <nav class="flex gap-6 text-sm font-medium text-slate-600">
                    <span>Beranda</span>
                    <span>Artikel</span>
                    <span>Tentang</span>
                  </nav>
                </header>
                
                {/* Hero Mockup */}
                <div class="flex-1 flex flex-col items-center justify-center text-center px-4 bg-slate-50">
                  <h1 class="text-4xl font-extrabold text-slate-900 mb-4">Selamat Datang di {siteName}</h1>
                  <p class="text-slate-500 max-w-lg mb-8">Ini adalah simulasi bagaimana warna dan nama situs Anda akan terlihat oleh publik di seluruh dunia.</p>
                  <button class="px-8 py-3 rounded-full text-white font-medium shadow-lg" style={`background-color: ${primaryColor}`} id="previewButton">
                    Mulai Membaca
                  </button>
                </div>
             </div>
          </div>
        </div>
      </div>
      
      {/* Script mungil untuk membuat preview langsung bereaksi saat color picker digeser (Client Side JS) */}
      <script dangerouslySetInnerHTML={{__html: `
        document.getElementById('colorPicker').addEventListener('input', function(e) {
          const color = e.target.value;
          document.getElementById('colorHex').textContent = color;
          document.getElementById('previewSiteName').style.color = color;
          document.getElementById('previewButton').style.backgroundColor = color;
        });
      `}} />
    </Layout>
  )
}
