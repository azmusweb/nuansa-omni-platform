import type { FC } from 'hono/jsx'
import { Layout } from '../components/Layout'

export const Vault: FC<{ currentPath: string }> = ({ currentPath }) => {
  return (
    <Layout title="Pustaka Media (R2 Vault)" currentPath={currentPath}>
      <div class="bg-dark-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-8 text-center min-h-[500px] flex flex-col items-center justify-center shadow-xl border-dashed">
        <div class="w-24 h-24 bg-dark-900 rounded-full flex items-center justify-center mb-6 border border-slate-700/50 shadow-inner">
          <svg class="w-10 h-10 text-brand-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"></path></svg>
        </div>
        <h2 class="text-xl font-semibold text-white mb-2">Unggah Aset Media</h2>
        <p class="text-slate-400 text-sm max-w-md mx-auto mb-8">
          Tarik dan lepaskan gambar atau dokumen ke area ini. File akan langsung dikonversi ke format WebP/AVIF dan disimpan di Cloudflare R2 secara global.
        </p>
        <button class="bg-slate-200 text-slate-900 hover:bg-white px-6 py-3 rounded-xl font-semibold text-sm transition shadow-lg">
          Pilih File dari Komputer
        </button>
      </div>

      <div class="mt-8">
        <h3 class="text-white font-medium mb-4">File Terbaru</h3>
        <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div class="aspect-square bg-dark-800 rounded-xl border border-slate-700/50 overflow-hidden group relative flex items-center justify-center">
              <span class="text-slate-600 font-medium">IMG_{i}</span>
              <div class="absolute inset-0 bg-brand-500/20 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <button class="bg-brand-600 text-white text-xs px-3 py-1.5 rounded-lg">Pilih</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  )
}
