import type { FC } from 'hono/jsx'
import { Layout } from '../components/Layout'

export const Tools: FC<{ currentPath: string }> = ({ currentPath }) => {
 return (
 <Layout title="Alat & Impor" currentPath={currentPath}>
 <div class="max-w-4xl mx-auto space-y-8">
 
 <div class="bg-white backdrop-blur-sm border border-gray-200 rounded-2xl shadow-xl overflow-hidden">
 <div class="p-6 border-b border-gray-200">
 <h2 class="text-lg font-semibold text-gray-900 flex items-center gap-2">
 <svg class="w-5 h-5 text-brand-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"></path></svg>
 1-Click WordPress Importer
 </h2>
 <p class="text-gray-500 mt-1 text-sm">Migrasi konten dari website WordPress lama Anda secara otomatis melalui file XML (WXR).</p>
 </div>
 
 <div class="p-8">
 <form action="/api/import-wp" method="POST" enctype="multipart/form-data" class="space-y-6">
 
 <div class="border-2 border-dashed border-gray-200 rounded-xl p-10 text-center hover:border-brand-500 transition cursor-pointer bg-gray-50" onclick="document.getElementById('wp-xml').click()">
 <svg class="w-12 h-12 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
 <h3 class="text-gray-700 font-medium mb-1">Pilih File XML WordPress (.xml)</h3>
 <p class="text-gray-400 text-sm">Ukuran maksimal yang disarankan: 10MB</p>
 <input type="file" id="wp-xml" name="file" accept=".xml" class="hidden" onchange="document.getElementById('file-name').innerText = this.files[0] ? this.files[0].name : ''" />
 <p id="file-name" class="mt-4 text-brand-600 font-mono text-sm"></p>
 </div>
 
 <div class="bg-brand-500/10 border border-gray-200 rounded-xl p-4 flex gap-3 text-sm">
 <svg class="w-5 h-5 text-brand-600 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
 <div class="text-gray-700">
 <p class="font-semibold text-brand-600 mb-1">Informasi Impor</p>
 <ul class="list-disc pl-4 space-y-1 text-gray-500">
 <li>Hanya mengimpor <strong>Posts</strong> (Artikel). Halaman (Pages) akan diabaikan.</li>
 <li>Konten HTML akan dikonversi ke format Nuansa Nodes (EditorJS).</li>
 <li>Gambar akan tetap mengarah ke server lama. Pastikan memindahkan gambar secara manual ke Vault nanti.</li>
 </ul>
 </div>
 </div>

 <div class="flex justify-end pt-4">
 <button type="submit" class="bg-brand-600 hover:bg-brand-500 text-gray-900 px-6 py-2.5 rounded-xl font-medium text-sm transition shadow-lg shadow-brand-500/20 flex items-center gap-2">
 <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10"></path></svg>
 Mulai Proses Impor
 </button>
 </div>
 </form>
 </div>
 </div>

 </div>
 </Layout>
 )
}
