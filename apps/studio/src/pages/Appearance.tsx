import type { FC } from 'hono/jsx'
import { Layout } from '../components/Layout'

export const Appearance: FC<{ currentPath: string }> = ({ currentPath }) => {
  return (
    <Layout title="Editor Tata Letak (Architect)" currentPath={currentPath}>
      <div class="grid grid-cols-1 lg:grid-cols-4 gap-6 h-[calc(100vh-10rem)]">
        {/* Left Toolbar */}
        <div class="col-span-1 bg-dark-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-4 shadow-xl flex flex-col">
          <h3 class="text-white font-semibold mb-4 px-2">Komponen Situs</h3>
          <div class="space-y-2 flex-1 overflow-y-auto">
            {['Header / Navigasi', 'Hero Section', 'Daftar Artikel', 'Bilah Sisi (Sidebar)', 'Footer'].map((item) => (
              <button class="w-full text-left px-4 py-3 bg-dark-900/50 hover:bg-brand-500/10 text-slate-300 hover:text-brand-400 border border-transparent hover:border-brand-500/30 rounded-xl transition font-medium text-sm">
                {item}
              </button>
            ))}
          </div>
          <div class="pt-4 border-t border-slate-700/50 mt-4">
            <button class="w-full bg-brand-600 hover:bg-brand-500 text-white py-2.5 rounded-xl font-medium text-sm transition shadow-lg shadow-brand-500/20">
              Simpan Perubahan
            </button>
          </div>
        </div>

        {/* Visual Preview Area */}
        <div class="col-span-1 lg:col-span-3 bg-dark-900 border border-slate-700/50 rounded-2xl shadow-xl overflow-hidden flex flex-col">
          <div class="bg-dark-800 px-4 py-3 flex items-center justify-center gap-4 border-b border-slate-700/50">
            <button class="p-2 bg-dark-900 rounded-lg text-slate-400 hover:text-white transition"><svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 100-2 1 1 0 000 2zm7-1a1 1 0 11-2 0 1 1 0 012 0zm-.464 5.535a1 1 0 10-1.415-1.414 3 3 0 01-4.242 0 1 1 0 00-1.415 1.414 5 5 0 007.072 0z" clip-rule="evenodd"></path></svg></button>
            <div class="px-6 py-1.5 bg-dark-900 text-slate-400 text-xs font-mono rounded-lg border border-slate-700/50">Pratinjau Langsung (Resolusi Desktop)</div>
            <button class="p-2 bg-dark-900 rounded-lg text-slate-400 hover:text-white transition"><svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M7 2a2 2 0 00-2 2v12a2 2 0 002 2h6a2 2 0 002-2V4a2 2 0 00-2-2H7zm3 14a1 1 0 100-2 1 1 0 000 2z" clip-rule="evenodd"></path></svg></button>
          </div>
          <div class="flex-1 bg-white flex items-center justify-center relative overflow-hidden">
             {/* Mockup Preview */}
             <div class="absolute inset-0 bg-slate-100 flex flex-col items-center justify-center opacity-80 pointer-events-none">
                <p class="text-slate-400 text-sm mb-4">Area Kanvas (Visual Builder berbasis Tailwind)</p>
                <div class="w-3/4 h-64 border-2 border-dashed border-slate-300 rounded-2xl flex items-center justify-center bg-white/50">
                  <span class="text-brand-500 font-semibold tracking-widest">DRAG & DROP AREA</span>
                </div>
             </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}
