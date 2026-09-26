import type { FC } from 'hono/jsx'
import { Layout } from '../components/Layout'

type Post = {
 id: string
 title: string
 slug: string
 content: string
 metadata?: string
 status: string
 is_premium?: boolean | number
 price?: number
 created_at: string
}

export const Posts: FC<{ currentPath: string, posts?: Post[] }> = ({ currentPath, posts = [] }) => {
 const countAll = posts.length;
 const countPublished = posts.filter(p => p.status === 'published').length;
 const countDraft = posts.filter(p => p.status === 'draft').length;
 const countPending = posts.filter(p => p.status === 'pending').length;

 return (
 <Layout title="Postingan" currentPath={currentPath}>

 {/* Action Bar (Top) */}
 <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 relative z-20">
 
 {/* Filter and Search Container */}
 <div class="flex items-center gap-2 bg-white border border-slate-300 rounded-xl px-4 py-2 flex-1 sm:max-w-xl focus-within:border-brand-500 focus-within:ring-1 focus-within:ring-brand-500 transition shadow-sm">
 <svg class="w-5 h-5 text-gray-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
 
 <input type="text" id="search-posts" oninput="applyFilters()" placeholder="Telusuri postingan" class="bg-transparent border-none outline-none text-sm text-slate-800 w-full placeholder-slate-400 px-2" />
 
 <div class="relative group">
 <button type="button" class="flex items-center gap-1 text-gray-400 hover:text-slate-700 ">
 <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"></path></svg>
 </button>
 
 {/* Dropdown menu */}
 <div class="absolute right-0 top-full mt-2 w-48 bg-white border border-slate-200 rounded-lg shadow-[0_4px_24px_rgba(0,0,0,0.04)] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-30 py-1">
 <button onclick="setFilterStatus('all')" class="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-100 ">Semua ({countAll})</button>
 <button onclick="setFilterStatus('published')" class="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-100 ">Dipublikasikan ({countPublished})</button>
 <button onclick="setFilterStatus('draft')" class="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-100 ">Draf ({countDraft})</button>
 <button onclick="setFilterStatus('pending')" class="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-100 ">Menunggu Tinjauan ({countPending})</button>
 </div>
 </div>
 </div>

 <div class="flex items-center gap-3">
 <span class="text-sm text-brand-600 font-semibold uppercase tracking-wide px-2 cursor-pointer hover:opacity-80">Kelola</span>
 <a href="/posts/new" class="bg-brand-600 hover:bg-brand-500 active:scale-95 text-white px-5 py-2.5 rounded-full font-semibold text-sm transition shadow-md flex items-center justify-center gap-2 shrink-0">
 <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path></svg>
 POSTINGAN BARU
 </a>
 </div>
 </div>

 <input type="hidden" id="current-status-filter" value="all" />

 {/* Posts List */}
 <div class="bg-white border border-slate-200 rounded-lg shadow-sm">
 {posts.length === 0 ? (
 <div class="p-12 text-center text-gray-500">
 <svg class="w-16 h-16 mx-auto text-gray-700 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"></path></svg>
 <p class="text-sm font-medium">Belum ada postingan.</p>
 </div>
 ) : (
 <div class="divide-y divide-slate-100 ">
 {posts.map((post) => (
 <div class="post-row group flex flex-col sm:flex-row sm:items-center p-4 hover:bg-slate-50 transition relative" data-title={post.title.toLowerCase()} data-status={post.status}>
 
 {/* Checkbox (visual only for now) & Thumbnail */}
 <div class="flex items-center gap-4 mb-3 sm:mb-0 sm:w-1/4 shrink-0">
 <input type="checkbox" class="w-4 h-4 rounded border-[#ebebeb] text-brand-600 focus:ring-brand-500 cursor-pointer hidden sm:block accent-brand-600" />
 
 {/* Thumbnail Placeholder ('T' icon) */}
 <div class="w-12 h-12 bg-slate-100 text-gray-500 rounded flex items-center justify-center font-serif text-2xl border border-slate-200 flex-shrink-0">
 T
 </div>
 </div>

 {/* Main Content (Title, Status, Date) */}
 <div class="flex-1 min-w-0 pr-4">
 <a href={`/posts/edit/${post.id}`} class="text-slate-800 font-medium text-base hover:text-brand-600 truncate block">
 {post.title || '(Tanpa judul)'}
 </a>
 <div class="flex items-center gap-2 mt-1 text-xs">
 {post.status === 'draft' && <span class="text-amber-600 font-medium">Draf</span>}
 {post.status === 'pending' && <span class="text-blue-600 font-medium">Tinjauan</span>}
 <span class="text-gray-400">• {new Date(post.created_at).toLocaleDateString('id-ID', {day:'numeric', month:'short'})}</span>
 {post.is_premium ? (
 <span class="text-amber-500 ml-2">🔒 Premium</span>
 ) : null}
 </div>
 </div>

 {/* Right Side (Author & Actions) */}
 <div class="flex items-center justify-between sm:justify-end gap-6 sm:w-1/4 shrink-0 mt-3 sm:mt-0">
 <div class="flex items-center gap-2">
 {/* Placeholder Avatar */}
 <div class="w-6 h-6 rounded-full bg-slate-300 overflow-hidden flex-shrink-0">
 <svg class="w-full h-full text-gray-500 " fill="currentColor" viewBox="0 0 24 24"><path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
 </div>
 <span class="text-xs text-slate-600 truncate max-w-[80px]">Admin</span>
 </div>

 {/* Hover Actions */}
 <div class="flex items-center gap-3 sm:opacity-0 group-hover:opacity-100 transition-opacity">
 <a href={`/posts/edit/${post.id}`} title="Edit" class="text-gray-500 hover:text-brand-600 transition">
 <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>
 </a>
 <form action="/api/posts" method="POST" class="inline m-0 p-0 h-5" onsubmit="return confirm('Yakin ingin menghapus postingan ini?')">
 <input type="hidden" name="id" value={post.id} />
 <input type="hidden" name="action" value="delete" />
 <button type="submit" title="Hapus" class="text-gray-500 hover:text-red-500 transition focus:outline-none">
 <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
 </button>
 </form>
 </div>
 </div>

 </div>
 ))}
 </div>
 )}
 </div>

 <script dangerouslySetInnerHTML={{__html: `
 function setFilterStatus(status) {
 document.getElementById('current-status-filter').value = status;
 applyFilters();
 }

 function applyFilters() {
 var q = document.getElementById('search-posts').value.toLowerCase().trim();
 var filterStatus = document.getElementById('current-status-filter').value;
 
 document.querySelectorAll('.post-row').forEach(function(row) {
 var title = row.getAttribute('data-title') || '';
 var rowStatus = row.getAttribute('data-status') || '';
 
 var matchSearch = q === '' || title.includes(q);
 var matchStatus = filterStatus === 'all' || rowStatus === filterStatus;
 
 if (matchSearch && matchStatus) {
 row.style.display = 'flex';
 } else {
 row.style.display = 'none';
 }
 });
 }
 `}} />
 </Layout>
 )
}

