import type { FC } from 'hono/jsx'
import { Layout } from '../components/Layout'

type Post = {
  id: string
  title: string
  slug: string
  content: string
  status: string
  created_at: string
}

export const Posts: FC<{ currentPath: string, posts?: Post[] }> = ({ currentPath, posts = [] }) => {
  return (
    <Layout title="Manajemen Konten (Nodes)" currentPath={currentPath}>
      <div class="flex justify-between items-center mb-6">
        <div class="flex items-center gap-4 bg-dark-800 border border-slate-700 rounded-xl px-4 py-2 w-96 focus-within:border-brand-500 focus-within:ring-1 focus-within:ring-brand-500 transition">
          <svg class="w-5 h-5 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
          <input type="text" placeholder="Cari artikel..." class="bg-transparent border-none outline-none text-sm text-white w-full placeholder-slate-500" />
        </div>
        <button onclick="document.getElementById('new-post-modal').classList.remove('hidden')" class="bg-brand-600 hover:bg-brand-500 text-white px-5 py-2.5 rounded-xl font-medium text-sm transition shadow-lg shadow-brand-500/20 flex items-center gap-2">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path></svg>
          Tulis Artikel Baru
        </button>
      </div>

      <div class="bg-dark-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl shadow-xl overflow-hidden">
        {posts.length === 0 ? (
          <div class="p-12 text-center text-slate-400">
            <svg class="w-12 h-12 mx-auto text-slate-600 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
            <p>Belum ada artikel. Klik "Tulis Artikel Baru" untuk memulai.</p>
          </div>
        ) : (
          <table class="w-full text-left border-collapse">
            <thead>
              <tr class="border-b border-slate-700/50 text-slate-400 text-sm">
                <th class="p-4 font-medium pl-6">Judul Artikel</th>
                <th class="p-4 font-medium">Status</th>
                <th class="p-4 font-medium">Slug</th>
                <th class="p-4 font-medium">Dibuat Pada</th>
                <th class="p-4 font-medium text-right pr-6">Aksi</th>
              </tr>
            </thead>
            <tbody class="text-sm divide-y divide-slate-700/50">
              {posts.map((post) => (
                <tr class="hover:bg-slate-800/50 transition">
                  <td class="p-4 pl-6 text-white font-medium">{post.title}</td>
                  <td class="p-4">
                    <span class={`px-3 py-1 rounded-full text-xs font-medium border ${post.status === 'draft' ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'}`}>
                      {post.status.toUpperCase()}
                    </span>
                  </td>
                  <td class="p-4 text-slate-400 font-mono text-xs">/{post.slug}</td>
                  <td class="p-4 text-slate-400">{new Date(post.created_at).toLocaleDateString('id-ID')}</td>
                  <td class="p-4 text-right pr-6">
                    <button class="text-brand-400 hover:text-brand-300 font-medium text-sm transition mr-3">Edit</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Modal Tulis Artikel */}
      <div id="new-post-modal" class="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 hidden flex items-center justify-center">
        <div class="bg-dark-900 border border-slate-700 rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl">
          <div class="flex justify-between items-center p-4 border-b border-slate-800">
            <h3 class="text-white font-semibold">Tulis Artikel Baru</h3>
            <button onclick="document.getElementById('new-post-modal').classList.add('hidden')" class="text-slate-400 hover:text-white">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
            </button>
          </div>
          <form action="/api/posts" method="POST" class="p-6">
            <div class="mb-4">
              <label class="block text-slate-300 text-sm font-medium mb-2">Judul Artikel</label>
              <input type="text" name="title" required placeholder="Masukkan judul..." class="w-full bg-dark-800 border border-slate-700 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition" />
            </div>
            <div class="mb-6">
              <label class="block text-slate-300 text-sm font-medium mb-2">Konten (JSON/Markdown)</label>
              <textarea name="content" rows="4" placeholder="Mulai menulis..." class="w-full bg-dark-800 border border-slate-700 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition"></textarea>
            </div>
            <div class="flex justify-end gap-3">
              <button type="button" onclick="document.getElementById('new-post-modal').classList.add('hidden')" class="px-5 py-2.5 rounded-xl font-medium text-sm text-slate-300 hover:bg-slate-800 transition">Batal</button>
              <button type="submit" class="bg-brand-600 hover:bg-brand-500 text-white px-5 py-2.5 rounded-xl font-medium text-sm transition shadow-lg shadow-brand-500/20">Simpan Draf</button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  )
}
