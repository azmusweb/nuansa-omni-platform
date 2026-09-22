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
  return (
    <Layout title="Manajemen Konten (Nodes)" currentPath={currentPath}>
      {/* EditorJS Dependencies */}
      <script src="https://cdn.jsdelivr.net/npm/@editorjs/editorjs@latest"></script>
      <script src="https://cdn.jsdelivr.net/npm/@editorjs/header@latest"></script>
      <script src="https://cdn.jsdelivr.net/npm/@editorjs/list@latest"></script>

      <div class="flex justify-between items-center mb-6">
        <div class="flex items-center gap-4 bg-dark-800 border border-slate-700 rounded-xl px-4 py-2 w-96 focus-within:border-brand-500 focus-within:ring-1 focus-within:ring-brand-500 transition">
          <svg class="w-5 h-5 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
          <input type="text" placeholder="Cari artikel..." class="bg-transparent border-none outline-none text-sm text-white w-full placeholder-slate-500" />
        </div>
        <button onclick="openModal()" class="bg-brand-600 hover:bg-brand-500 text-white px-5 py-2.5 rounded-xl font-medium text-sm transition shadow-lg shadow-brand-500/20 flex items-center gap-2">
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
                <th class="p-4 font-medium">Tipe</th>
                <th class="p-4 font-medium">Dibuat Pada</th>
                <th class="p-4 font-medium text-right pr-6">Aksi</th>
              </tr>
            </thead>
            <tbody class="text-sm divide-y divide-slate-700/50">
              {posts.map((post) => (
                <tr class="hover:bg-slate-800/50 transition">
                  <td class="p-4 pl-6 text-white font-medium">{post.title}</td>
                  <td class="p-4">
                    <span class={`px-3 py-1 rounded-full text-xs font-medium border 
                      ${post.status === 'draft' ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' : 
                        post.status === 'pending' ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' : 
                        'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'}`}>
                      {post.status.toUpperCase()}
                    </span>
                  </td>
                  <td class="p-4 font-medium text-xs">
                    {post.is_premium ? (
                      <span class="text-amber-400 flex items-center gap-1">
                        <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
                        Premium
                      </span>
                    ) : (
                      <span class="text-slate-400">Gratis</span>
                    )}
                  </td>
                  <td class="p-4 text-slate-400">{new Date(post.created_at).toLocaleDateString('id-ID')}</td>
                  <td class="p-4 text-right pr-6">
                    <button 
                      onclick={`openModal('${post.id}', '${post.title.replace(/'/g, "\\'")}', '${encodeURIComponent(post.content || '')}', '${encodeURIComponent((post as any).metadata || '')}', '${post.status}', ${post.is_premium ? 1 : 0}, ${post.price || 0})`}
                      class="text-brand-400 hover:text-brand-300 font-medium text-sm transition mr-3">
                      Edit
                    </button>
                    <form action="/api/posts" method="POST" class="inline" onsubmit="return confirm('Yakin ingin menghapus artikel ini?')">
                      <input type="hidden" name="id" value={post.id} />
                      <input type="hidden" name="action" value="delete" />
                      <button type="submit" class="text-red-400 hover:text-red-300 font-medium text-sm transition">Hapus</button>
                    </form>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Modal Tulis/Edit Artikel */}
      <div id="new-post-modal" class="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 hidden flex items-center justify-center p-4">
        <div class="bg-dark-900 border border-slate-700 rounded-2xl w-full max-w-6xl overflow-hidden shadow-2xl flex flex-col max-h-[95vh]">
          <div class="flex justify-between items-center p-4 border-b border-slate-800 shrink-0">
            <h3 id="modal-title" class="text-white font-semibold text-lg">Tulis Artikel Baru</h3>
            <button onclick="closeModal()" class="text-slate-400 hover:text-white">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
            </button>
          </div>
          
          <form id="post-form" action="/api/posts" method="POST" class="flex flex-col flex-grow overflow-hidden" onsubmit="event.preventDefault(); submitPost();">
            <div class="p-6 overflow-y-auto flex-grow flex flex-col lg:flex-row gap-6">
              
              {/* Kolom Kiri: Editor */}
              <div class="flex-grow flex flex-col">
                <input type="hidden" name="id" id="post-id" />
                <input type="hidden" name="action" value="save" />
                <input type="hidden" name="content" id="post-content" />
                <input type="hidden" name="metadata" id="post-metadata" />
                
                <div class="mb-6">
                  <input type="text" id="post-title" name="title" required placeholder="Judul Artikel..." class="w-full bg-transparent border-none px-0 py-2 text-white text-4xl font-bold focus:outline-none placeholder-slate-600" />
                </div>
                
                <div class="bg-white rounded-xl text-black shadow-inner overflow-y-auto border border-slate-300 flex-grow relative">
                   <div id="editorjs" class="min-h-[400px] p-6 text-base max-w-none"></div>
                </div>
              </div>
              
              {/* Kolom Kanan: Sidebar */}
              <div class="w-full lg:w-80 shrink-0 space-y-6 flex flex-col">
                <div>
                  <label class="block text-slate-400 text-xs font-semibold uppercase tracking-wider mb-2">Nuansa Flow (Status)</label>
                  <select name="status" id="post-status" class="w-full bg-dark-800 border border-slate-700 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition shadow-inner">
                    <option value="draft">Draft (Konsep)</option>
                    <option value="pending">Menunggu Tinjauan</option>
                    <option value="published">Published (Publikasi)</option>
                  </select>
                </div>
                
                {/* Nuansa Fields: Custom Meta */}
                <div class="bg-dark-800/50 rounded-xl border border-slate-700/50 overflow-hidden">
                  <div class="px-4 py-3 border-b border-slate-700/50 bg-dark-800 flex items-center gap-2">
                    <svg class="w-4 h-4 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"></path></svg>
                    <h4 class="text-slate-300 text-sm font-semibold">Nuansa Fields (Meta)</h4>
                  </div>
                  
                  <div class="p-4 space-y-4">
                    <div>
                      <label class="block text-slate-400 text-xs font-medium mb-1">SEO Title (Opsional)</label>
                      <input type="text" id="meta-title" placeholder="Kustom SEO Title..." class="w-full bg-dark-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:border-brand-500 focus:outline-none transition" />
                    </div>
                    <div>
                      <label class="block text-slate-400 text-xs font-medium mb-1">Meta Description</label>
                      <textarea id="meta-desc" rows={3} placeholder="Deskripsi singkat untuk mesin pencari..." class="w-full bg-dark-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:border-brand-500 focus:outline-none transition resize-none"></textarea>
                    </div>
                    <div>
                      <label class="block text-slate-400 text-xs font-medium mb-1">Featured Image URL</label>
                      <div class="flex gap-2">
                        <input type="text" id="meta-image" placeholder="https://... atau /images/..." class="flex-1 bg-dark-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:border-brand-500 focus:outline-none transition" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Monetization: Content Locker */}
                <div class="bg-dark-800/50 rounded-xl border border-slate-700/50 overflow-hidden">
                  <div class="px-4 py-3 border-b border-slate-700/50 bg-dark-800 flex items-center gap-2">
                    <svg class="w-4 h-4 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
                    <h4 class="text-slate-300 text-sm font-semibold">Content Locker</h4>
                  </div>
                  <div class="p-4 space-y-4">
                    <label class="flex items-center gap-3 cursor-pointer">
                      <div class="relative">
                        <input type="checkbox" id="post-is-premium" value="1" name="is_premium" class="sr-only peer" onchange="document.getElementById('price-container').classList.toggle('hidden', !this.checked)" />
                        <div class="w-11 h-6 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-brand-500"></div>
                      </div>
                      <span class="text-sm font-medium text-slate-300">Jadikan Premium</span>
                    </label>
                    <div id="price-container" class="hidden">
                      <label class="block text-slate-400 text-xs font-medium mb-1">Harga (Rp)</label>
                      <input type="number" id="post-price" name="price" placeholder="5000" class="w-full bg-dark-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:border-brand-500 focus:outline-none transition" />
                    </div>
                  </div>
                </div>

                <div class="bg-dark-800/30 p-4 rounded-xl border border-slate-700/30">
                   <h4 class="text-slate-400 text-xs font-medium mb-2 flex items-center gap-2">
                     <svg class="w-4 h-4 text-brand-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                     Bantuan Editor
                   </h4>
                   <ul class="text-slate-500 text-xs space-y-2 mt-2">
                     <li>Tekan <kbd class="bg-slate-700 px-1 py-0.5 rounded text-[10px]">Tab</kbd> untuk menu block.</li>
                     <li>Blok teks untuk menebalkan, miring, atau link.</li>
                   </ul>
                </div>
              </div>
            </div>
            
            <div class="p-4 border-t border-slate-800 shrink-0 flex justify-end gap-3 bg-dark-900">
              <button type="button" onclick="closeModal()" class="px-5 py-2.5 rounded-xl font-medium text-sm text-slate-300 hover:bg-slate-800 transition">Batal</button>
              <button type="submit" id="save-btn" class="bg-brand-600 hover:bg-brand-500 text-white px-6 py-2.5 rounded-xl font-medium text-sm transition shadow-lg shadow-brand-500/20 flex items-center gap-2">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4"></path></svg>
                Simpan ke Nodes
              </button>
            </div>
          </form>
        </div>
      </div>
      
      <style dangerouslySetInnerHTML={{__html: `
        /* Overrides to make Editor.js look cleaner inside the white box */
        .ce-block__content, .ce-toolbar__content { max-width: 100% !important; }
        .codex-editor__redactor { padding-bottom: 50px !important; }
        .ce-toolbar__actions { right: auto; left: -40px; }
      `}} />

      <script dangerouslySetInnerHTML={{__html: `
        let editor = null;

        function initEditor(data = null, encodedMetadata = null) {
          if (editor) {
            editor.destroy();
          }
          
          let parsedData = {};
          let metaData = { title: '', description: '', image: '' };

          if (data) {
             try {
               parsedData = JSON.parse(decodeURIComponent(data));
             } catch(e) {
               console.error("Failed to parse existing content data", e);
             }
          }
          if (encodedMetadata) {
             try {
               metaData = JSON.parse(decodeURIComponent(encodedMetadata));
             } catch(e) {
               console.error("Failed to parse existing metadata", e);
             }
          }

          // Populate Nuansa Fields (Meta)
          document.getElementById('meta-title').value = metaData.title || '';
          document.getElementById('meta-desc').value = metaData.description || '';
          document.getElementById('meta-image').value = metaData.image || '';

          editor = new EditorJS({
            holder: 'editorjs',
            placeholder: 'Mulai menulis cerita Anda di sini...',
            data: parsedData,
            tools: {
              header: Header,
              list: List,
            }
          });
        }

        function openModal(id = '', title = '', encodedContent = '', encodedMetadata = '', status = 'draft', is_premium = 0, price = 0) {
          document.getElementById('modal-title').innerText = id ? 'Edit Artikel (Nodes)' : 'Tulis Artikel Baru';
          document.getElementById('post-id').value = id;
          document.getElementById('post-title').value = title;
          document.getElementById('post-status').value = status;
          
          const premiumCheckbox = document.getElementById('post-is-premium');
          const priceContainer = document.getElementById('price-container');
          const priceInput = document.getElementById('post-price');
          
          premiumCheckbox.checked = !!is_premium;
          priceContainer.classList.toggle('hidden', !premiumCheckbox.checked);
          priceInput.value = price || 0;
          
          initEditor(encodedContent, encodedMetadata);
          
          document.getElementById('new-post-modal').classList.remove('hidden');
          document.body.style.overflow = 'hidden';
        }
        
        function closeModal() {
          document.getElementById('new-post-modal').classList.add('hidden');
          document.body.style.overflow = '';
          if (editor) {
            editor.destroy();
            editor = null;
          }
        }

        function submitPost() {
          const btn = document.getElementById('save-btn');
          const originalText = btn.innerHTML;
          btn.innerHTML = 'Menyimpan...';
          btn.disabled = true;
          
          if (editor) {
            editor.save().then((outputData) => {
              
              const metaData = {
                 title: document.getElementById('meta-title').value,
                 description: document.getElementById('meta-desc').value,
                 image: document.getElementById('meta-image').value
              };
              
              document.getElementById('post-content').value = JSON.stringify(outputData);
              document.getElementById('post-metadata').value = JSON.stringify(metaData);
              document.getElementById('post-form').submit();
              
            }).catch((error) => {
              console.log('Saving failed: ', error);
              btn.innerHTML = originalText;
              btn.disabled = false;
              alert('Gagal mengambil data dari Editor');
            });
          } else {
             document.getElementById('post-form').submit();
          }
        }
      `}} />
    </Layout>
  )
}
