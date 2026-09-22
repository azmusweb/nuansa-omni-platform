import type { FC } from 'hono/jsx'
import { Layout } from '../components/Layout'

export const Redirects: FC<{ currentPath: string, redirects: any[] }> = ({ currentPath, redirects = [] }) => {
  return (
    <Layout title="Mesin Pengalihan (Redirection)" currentPath={currentPath}>
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        <div class="col-span-1 lg:col-span-2 space-y-6">
          <div class="bg-dark-800 border border-slate-700/50 rounded-2xl shadow-xl overflow-hidden">
            <div class="p-6 border-b border-slate-700/50 flex justify-between items-center bg-dark-900/50">
              <div>
                <h2 class="text-lg font-semibold text-white">Daftar Pengalihan Aktif</h2>
                <p class="text-sm text-slate-400 mt-1">Kelola aturan pengalihan URL (301/302) untuk SEO dan pemeliharaan tautan rusak.</p>
              </div>
            </div>
            
            <div class="overflow-x-auto">
              <table class="w-full text-left border-collapse">
                <thead>
                  <tr class="bg-dark-900/80 border-b border-slate-700/50">
                    <th class="px-6 py-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">URL Sumber</th>
                    <th class="px-6 py-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">URL Tujuan</th>
                    <th class="px-6 py-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Status</th>
                    <th class="px-6 py-4 text-xs font-semibold text-slate-400 uppercase tracking-wider text-right">Aksi</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-slate-700/50">
                  {redirects.length === 0 ? (
                    <tr>
                      <td colspan="4" class="px-6 py-8 text-center text-slate-500 text-sm">
                        Belum ada aturan pengalihan yang dibuat.
                      </td>
                    </tr>
                  ) : (
                    redirects.map((r: any) => (
                      <tr class="hover:bg-dark-700/20 transition group">
                        <td class="px-6 py-4 text-sm text-white font-mono break-all">{r.source_url}</td>
                        <td class="px-6 py-4 text-sm text-slate-300 font-mono break-all">{r.target_url}</td>
                        <td class="px-6 py-4">
                          <span class={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            r.status_code === 301 ? 'bg-brand-500/10 text-brand-400 border border-brand-500/20' : 'bg-orange-500/10 text-orange-400 border border-orange-500/20'
                          }`}>
                            {r.status_code} {r.status_code === 301 ? 'Permanent' : 'Temporary'}
                          </span>
                        </td>
                        <td class="px-6 py-4 text-right">
                          <form action="/api/redirects" method="POST" class="inline">
                            <input type="hidden" name="id" value={r.id} />
                            <input type="hidden" name="action" value="delete" />
                            <button type="submit" class="text-slate-500 hover:text-red-400 transition p-1" title="Hapus Pengalihan">
                              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                            </button>
                          </form>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div class="col-span-1 space-y-6">
          <form action="/api/redirects" method="POST" class="bg-dark-800 border border-slate-700/50 rounded-2xl shadow-xl overflow-hidden">
            <input type="hidden" name="action" value="create" />
            <div class="p-6 border-b border-slate-700/50 bg-dark-900/50">
              <h2 class="text-lg font-semibold text-white">Buat Aturan Baru</h2>
            </div>
            
            <div class="p-6 space-y-5">
              <div>
                <label class="block text-slate-300 text-sm font-medium mb-2">URL Sumber (Lama)</label>
                <div class="relative">
                  <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span class="text-slate-500 sm:text-sm">/</span>
                  </div>
                  <input type="text" name="source_url" required class="w-full bg-dark-900 border border-slate-700 rounded-xl pl-6 pr-4 py-2.5 text-white text-sm font-mono focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition" placeholder="artikel-lama" />
                </div>
                <p class="text-[11px] text-slate-500 mt-1.5">Tanpa domain utama. Contoh: <code>/tentang-kami</code></p>
              </div>

              <div>
                <label class="block text-slate-300 text-sm font-medium mb-2">URL Tujuan (Baru)</label>
                <div class="relative">
                  <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span class="text-slate-500 sm:text-sm">/</span>
                  </div>
                  <input type="text" name="target_url" required class="w-full bg-dark-900 border border-slate-700 rounded-xl pl-6 pr-4 py-2.5 text-white text-sm font-mono focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition" placeholder="artikel-baru" />
                </div>
                <p class="text-[11px] text-slate-500 mt-1.5">Bisa path relatif (<code>/kontak</code>) atau URL absolut (<code>https://web.com</code>)</p>
              </div>

              <div>
                <label class="block text-slate-300 text-sm font-medium mb-2">Tipe Pengalihan (Kode HTTP)</label>
                <select name="status_code" class="w-full bg-dark-900 border border-slate-700 rounded-xl px-4 py-2.5 text-white text-sm focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition">
                  <option value="301">301 - Dipindahkan Permanen (Disarankan untuk SEO)</option>
                  <option value="302">302 - Dipindahkan Sementara</option>
                </select>
              </div>
            </div>
            
            <div class="p-4 bg-dark-900/50 border-t border-slate-700/50">
              <button type="submit" class="w-full bg-brand-600 hover:bg-brand-500 text-white py-2.5 rounded-lg font-medium text-sm transition flex justify-center items-center gap-2">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path></svg>
                Tambah Pengalihan
              </button>
            </div>
          </form>

          <div class="bg-gradient-to-br from-amber-900/30 to-orange-900/20 border border-amber-500/20 rounded-2xl p-6 shadow-lg">
            <h3 class="text-amber-400 font-semibold text-sm mb-2 flex items-center gap-2">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
              Penting!
            </h3>
            <p class="text-slate-400 text-xs leading-relaxed">
              Kesalahan pengaturan pengalihan dapat menyebabkan <strong class="text-slate-300">Infinite Redirect Loop</strong> (Situs tidak bisa diakses). Pastikan URL Tujuan tidak mengarah kembali ke URL Sumber.
            </p>
          </div>
        </div>

      </div>
    </Layout>
  )
}
