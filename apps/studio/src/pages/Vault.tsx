import type { FC } from 'hono/jsx'
import { Layout } from '../components/Layout'

// R2Object type minimal untuk TypeScript
type R2Object = {
  key: string;
  size: number;
  uploaded: Date;
}

export const Vault: FC<{ currentPath: string, files?: R2Object[] }> = ({ currentPath, files = [] }) => {
  return (
    <Layout title="Pustaka Media (R2 Vault)" currentPath={currentPath}>
      {/* Formulir Unggahan */}
      <form action="/api/upload" method="POST" enctype="multipart/form-data" class="bg-dark-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-8 text-center min-h-[400px] flex flex-col items-center justify-center shadow-xl border-dashed">
        <div class="w-24 h-24 bg-dark-900 rounded-full flex items-center justify-center mb-6 border border-slate-700/50 shadow-inner">
          <svg class="w-10 h-10 text-brand-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"></path></svg>
        </div>
        <h2 class="text-xl font-semibold text-white mb-2">Unggah Aset Media</h2>
        <p class="text-slate-400 text-sm max-w-md mx-auto mb-8">
          Pilih gambar atau dokumen. File akan disimpan secara permanen di Cloudflare R2 secara global.
        </p>
        
        <div class="flex flex-col items-center gap-4">
          <label class="bg-slate-200 text-slate-900 hover:bg-white px-6 py-3 rounded-xl font-semibold text-sm transition shadow-lg cursor-pointer">
            Pilih File dari Komputer
            <input type="file" name="file" class="hidden" accept="image/*" onchange="document.getElementById('upload-btn').classList.remove('hidden')" />
          </label>
          <button id="upload-btn" type="submit" class="bg-brand-600 text-white hover:bg-brand-500 px-6 py-2 rounded-xl font-semibold text-sm transition shadow-lg hidden">
            Mulai Unggah
          </button>
        </div>
      </form>

      {/* Daftar Gambar di R2 */}
      <div class="mt-8">
        <h3 class="text-white font-medium mb-4 flex items-center gap-2">
          File Tersimpan <span class="bg-slate-700 text-slate-300 text-xs px-2 py-0.5 rounded-full">{files.length}</span>
        </h3>
        
        {files.length === 0 ? (
          <div class="text-center p-8 bg-dark-800 rounded-xl border border-slate-700/50 text-slate-500 text-sm">
            Belum ada media yang diunggah.
          </div>
        ) : (
          <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {files.map((file) => (
              <div class="aspect-square bg-dark-800 rounded-xl border border-slate-700/50 overflow-hidden group relative flex items-center justify-center">
                {/* Tampilkan Gambar (asumsi file adalah gambar) */}
                <img src={`/media/${file.key}`} alt={file.key} class="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" loading="lazy" />
                
                <div class="absolute inset-0 bg-dark-900/80 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center p-2 text-center">
                  <p class="text-white text-xs truncate w-full mb-2 font-medium" title={file.key}>{file.key}</p>
                  <p class="text-slate-400 text-[10px] mb-3">{(file.size / 1024).toFixed(1)} KB</p>
                  <a href={`/media/${file.key}`} target="_blank" class="bg-brand-600 text-white text-xs px-3 py-1.5 rounded-lg hover:bg-brand-500 transition">
                    Lihat
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  )
}
