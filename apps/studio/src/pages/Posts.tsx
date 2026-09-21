import type { FC } from 'hono/jsx'
import { Layout } from '../components/Layout'

export const Posts: FC<{ currentPath: string }> = ({ currentPath }) => {
  return (
    <Layout title="Manajemen Konten (Nodes)" currentPath={currentPath}>
      <div class="flex justify-between items-center mb-6">
        <div class="flex items-center gap-4 bg-dark-800 border border-slate-700 rounded-xl px-4 py-2 w-96 focus-within:border-brand-500 focus-within:ring-1 focus-within:ring-brand-500 transition">
          <svg class="w-5 h-5 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
          <input type="text" placeholder="Cari artikel..." class="bg-transparent border-none outline-none text-sm text-white w-full placeholder-slate-500" />
        </div>
        <button class="bg-brand-600 hover:bg-brand-500 text-white px-5 py-2.5 rounded-xl font-medium text-sm transition shadow-lg shadow-brand-500/20 flex items-center gap-2">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path></svg>
          Tulis Artikel Baru
        </button>
      </div>

      <div class="bg-dark-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl shadow-xl overflow-hidden">
        <table class="w-full text-left border-collapse">
          <thead>
            <tr class="border-b border-slate-700/50 text-slate-400 text-sm">
              <th class="p-4 font-medium pl-6">Judul Artikel</th>
              <th class="p-4 font-medium">Penulis</th>
              <th class="p-4 font-medium">Status</th>
              <th class="p-4 font-medium">Terakhir Diubah</th>
              <th class="p-4 font-medium text-right pr-6">Aksi</th>
            </tr>
          </thead>
          <tbody class="text-sm divide-y divide-slate-700/50">
            {[
              { title: 'Panduan Memulai Nuansa CMS', author: 'Admin Utama', status: 'Diterbitkan', color: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20', date: '21 Sep 2026' },
              { title: 'Cara Mengatur Tema dengan Tailwind', author: 'Editor Tim', status: 'Draf', color: 'bg-amber-500/10 text-amber-400 border-amber-500/20', date: '20 Sep 2026' },
              { title: 'Integrasi Edge Database D1', author: 'Admin Utama', status: 'Diterbitkan', color: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20', date: '15 Sep 2026' },
            ].map((post) => (
              <tr class="hover:bg-slate-800/50 transition">
                <td class="p-4 pl-6 text-white font-medium">{post.title}</td>
                <td class="p-4 text-slate-400">{post.author}</td>
                <td class="p-4">
                  <span class={`px-3 py-1 rounded-full text-xs font-medium border ${post.color}`}>
                    {post.status}
                  </span>
                </td>
                <td class="p-4 text-slate-400">{post.date}</td>
                <td class="p-4 text-right pr-6">
                  <button class="text-brand-400 hover:text-brand-300 font-medium text-sm transition">Edit</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Layout>
  )
}
