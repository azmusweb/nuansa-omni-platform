import type { FC } from 'hono/jsx'
import { Layout } from '../components/Layout'

export const WritePost: FC<{ currentPath: string, post?: any }> = ({ currentPath, post }) => {
  const isEditing = !!post
  const id = isEditing ? post.id : ''
  const title = isEditing ? post.title : ''
  const content = isEditing ? post.content : ''
  const metadata = isEditing ? post.metadata : ''
  const status = isEditing ? post.status : 'draft'
  const isPremium = isEditing ? !!post.is_premium : false
  const price = isEditing ? (post.price || 0) : 0

  return (
    <Layout title={isEditing ? 'Edit Artikel' : 'Tulis Artikel Baru'} currentPath={currentPath}>
      <script src="https://cdnjs.cloudflare.com/ajax/libs/tinymce/6.8.3/tinymce.min.js"></script>

      {/* Hidden inputs */}
      <input type="hidden" name="id" id="post-id" value={id} />
      <input type="hidden" name="action" value="save" />
      <input type="hidden" name="content" id="post-content" />
      <input type="hidden" name="metadata" id="post-metadata" />
      <input type="hidden" id="initial-content" value={encodeURIComponent(content || '')} />
      <input type="hidden" id="initial-metadata" value={encodeURIComponent(metadata || '')} />

      {/* ===== BLOGGER-STYLE TOP BAR ===== */}
      <div id="top-bar" class="sticky top-0 z-50 bg-white dark:bg-[#1e293b] border-b border-slate-200 dark:border-slate-700/80 px-4 py-2 flex items-center justify-between gap-4 shadow-sm">
        
        {/* Left: Back & Title */}
        <div class="flex items-center gap-3 flex-1 min-w-0">
          <a href="/posts" class="flex items-center justify-center w-10 h-10 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400 transition shrink-0" aria-label="Kembali">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M10 19l-7-7m0 0l7-7m-7 7h18"/></svg>
          </a>
          
          <input
            type="text"
            id="post-title"
            name="title"
            value={title}
            required
            maxlength={200}
            placeholder="Judul"
            class="w-full bg-transparent border-none outline-none text-slate-800 dark:text-white placeholder-slate-400 text-lg sm:text-xl font-medium px-2 py-1 focus:ring-0"
          />
        </div>

        {/* Right: Actions */}
        <div class="flex items-center gap-2 shrink-0">
          {/* Mobile tab toggle */}
          <div class="flex lg:hidden bg-slate-100 dark:bg-slate-800 rounded-lg p-0.5 border border-slate-200 dark:border-slate-700">
            <button id="tab-editor-btn" onclick="switchTab('editor')" class="tab-btn active px-3 py-1.5 rounded-md text-xs font-semibold transition">
              Tulis
            </button>
            <button id="tab-settings-btn" onclick="switchTab('settings')" class="tab-btn px-3 py-1.5 rounded-md text-xs font-semibold transition">
              Setelan
            </button>
          </div>
          
          <button type="button" class="hidden sm:flex items-center gap-2 text-slate-600 dark:text-slate-300 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-700 px-4 py-1.5 rounded text-sm font-medium transition">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
            Pratinjau
          </button>
          
          <button type="button" id="save-btn" onclick="submitPost()" class="bg-brand-600 hover:bg-brand-500 active:scale-95 text-white px-5 py-1.5 rounded font-medium text-sm transition shadow-sm flex items-center gap-2">
            <svg class="w-4 h-4 hidden sm:block" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
            <span id="save-btn-text">{isEditing ? 'Perbarui' : 'Publikasikan'}</span>
          </button>
        </div>
      </div>

      {/* ===== MAIN FORM ===== */}
      <form id="post-form" action="/api/posts" method="POST" onsubmit="event.preventDefault(); submitPost();" class="flex-1 flex flex-col h-full bg-slate-50 dark:bg-[#0f172a]">
        <div class="flex flex-col lg:flex-row flex-1 h-full w-full max-w-screen-2xl mx-auto">

          {/* ===== EDITOR PANEL ===== */}
          <div id="panel-editor" class="flex-1 flex flex-col min-w-0 h-[calc(100vh-60px)] lg:h-auto border-r border-slate-200 dark:border-slate-700/50">
            <div id="editor-area" class="flex-1 bg-white dark:bg-[#0f172a]">
              <textarea id="editorjs" class="w-full"></textarea>
            </div>
            {/* Word count bar */}
            <div class="border-t border-slate-200 dark:border-slate-700/50 bg-white dark:bg-[#1e293b] px-4 py-1.5 flex items-center justify-between text-xs text-slate-500">
              <div id="word-count">0 kata</div>
              <div class="flex items-center gap-4">
                <span id="char-count">0 karakter</span>
              </div>
            </div>
          </div>

          {/* ===== SETTINGS PANEL (BLOGGER STYLE) ===== */}
          <div id="panel-settings" class="w-full lg:w-[320px] shrink-0 bg-white dark:bg-[#1e293b] overflow-y-auto hidden lg:flex flex-col h-[calc(100vh-60px)] lg:h-auto">
            
            <div class="p-4 border-b border-slate-200 dark:border-slate-700">
              <h2 class="text-sm font-semibold text-slate-800 dark:text-slate-200 uppercase tracking-wide">Setelan Postingan</h2>
            </div>

            <div class="flex-1 overflow-y-auto">
              
              {/* Status Publikasi */}
              <div class="border-b border-slate-200 dark:border-slate-700">
                <button type="button" onclick="toggleSection('status')" class="w-full px-4 py-3 flex items-center justify-between text-left group">
                  <span class="text-sm font-medium text-slate-700 dark:text-slate-300">Status Publikasi</span>
                  <svg id="status-chevron" class="w-4 h-4 text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-200 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/></svg>
                </button>
                <div id="status-body" class="px-4 pb-4">
                  <select name="status" id="post-status" class="w-full bg-transparent border-b border-slate-300 dark:border-slate-600 rounded-none px-0 py-2 text-slate-800 dark:text-white text-sm focus:outline-none focus:border-brand-500 transition cursor-pointer">
                    <option value="draft" selected={status === 'draft'}>Draf</option>
                    <option value="pending" selected={status === 'pending'}>Menunggu Tinjauan</option>
                    <option value="published" selected={status === 'published'}>Dipublikasikan</option>
                  </select>
                </div>
              </div>

              {/* Gambar Utama */}
              <div class="border-b border-slate-200 dark:border-slate-700">
                <button type="button" onclick="toggleSection('image')" class="w-full px-4 py-3 flex items-center justify-between text-left group">
                  <span class="text-sm font-medium text-slate-700 dark:text-slate-300">Gambar Utama</span>
                  <svg id="image-chevron" class="w-4 h-4 text-slate-400 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/></svg>
                </button>
                <div id="image-body" class="px-4 pb-4 section-collapsed">
                  <div id="img-preview-box" class="hidden mb-3 rounded overflow-hidden border border-slate-200 dark:border-slate-700 aspect-video bg-slate-100 dark:bg-slate-800 relative">
                    <img id="img-preview" src="" alt="Preview" class="w-full h-full object-cover" />
                    <button type="button" onclick="clearImageUrl()" class="absolute top-1.5 right-1.5 w-6 h-6 bg-black/50 hover:bg-red-500 rounded-full flex items-center justify-center transition text-white text-xs">✕</button>
                  </div>
                  <input type="text" id="meta-image" placeholder="URL gambar..." class="w-full bg-transparent border-b border-slate-300 dark:border-slate-600 px-0 py-1.5 text-sm text-slate-800 dark:text-white focus:border-brand-500 focus:outline-none transition placeholder-slate-400" oninput="debounceImagePreview(this.value)" />
                </div>
              </div>

              {/* SEO & Meta */}
              <div class="border-b border-slate-200 dark:border-slate-700">
                <button type="button" onclick="toggleSection('seo')" class="w-full px-4 py-3 flex items-center justify-between text-left group">
                  <span class="text-sm font-medium text-slate-700 dark:text-slate-300">Deskripsi Penelusuran</span>
                  <svg id="seo-chevron" class="w-4 h-4 text-slate-400 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/></svg>
                </button>
                <div id="seo-body" class="px-4 pb-4 section-collapsed">
                  <div class="mb-3">
                    <label class="block text-slate-500 text-xs mb-1">Judul Khusus (opsional)</label>
                    <input type="text" id="meta-title" placeholder="Judul SEO..." class="w-full bg-transparent border-b border-slate-300 dark:border-slate-600 px-0 py-1.5 text-sm text-slate-800 dark:text-white focus:border-brand-500 focus:outline-none transition" />
                  </div>
                  <div>
                    <label class="block text-slate-500 text-xs mb-1">Deskripsi Penelusuran</label>
                    <textarea id="meta-desc" rows={3} placeholder="Deskripsi singkat..." class="w-full bg-transparent border border-slate-300 dark:border-slate-600 rounded px-2 py-1.5 text-sm text-slate-800 dark:text-white focus:border-brand-500 focus:outline-none transition resize-none"></textarea>
                    <div class="text-right text-xs text-slate-400 mt-1"><span id="meta-desc-count">0</span>/160</div>
                  </div>
                </div>
              </div>

              {/* Monetisasi */}
              <div class="border-b border-slate-200 dark:border-slate-700">
                <button type="button" onclick="toggleSection('mono')" class="w-full px-4 py-3 flex items-center justify-between text-left group">
                  <span class="text-sm font-medium text-slate-700 dark:text-slate-300">Opsi Monetisasi</span>
                  <svg id="mono-chevron" class="w-4 h-4 text-slate-400 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/></svg>
                </button>
                <div id="mono-body" class="px-4 pb-4 section-collapsed">
                  <label class="flex items-start gap-3 cursor-pointer">
                    <input type="checkbox" id="post-is-premium" value="1" name="is_premium" class="mt-1" checked={isPremium} onchange="togglePremium(this.checked)" />
                    <div>
                      <div class="text-slate-700 dark:text-slate-300 text-sm font-medium">Jadikan Premium</div>
                      <div class="text-slate-500 text-xs mt-0.5">Berbayar untuk dibaca penuh</div>
                    </div>
                  </label>
                  <div id="price-container" class={`mt-3 transition-all ${isPremium ? '' : 'hidden'}`}>
                    <label class="block text-slate-500 text-xs mb-1">Harga (Rp)</label>
                    <input type="number" id="post-price" name="price" value={price || ''} min="0" placeholder="5000" class="w-full bg-transparent border-b border-slate-300 dark:border-slate-600 px-0 py-1.5 text-sm text-slate-800 dark:text-white focus:border-brand-500 focus:outline-none transition" />
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </form>

      {/* ===== STYLES ===== */}
      <style dangerouslySetInnerHTML={{__html: `
        body { background: #f8fafc; }
        @media (prefers-color-scheme: dark) {
          body { background: #0f172a; }
        }

        /* Tab active state */
        .tab-btn { color: #64748b; }
        .tab-btn.active { background: #e2e8f0; color: #0f172a; }
        @media (prefers-color-scheme: dark) {
          .tab-btn.active { background: #334155; color: #ffffff; }
        }

        /* TinyMCE complete overhaul for clean blogger look */
        .tox-tinymce {
          border: none !important;
          border-radius: 0 !important;
          height: 100% !important;
          min-height: 400px !important;
        }
        
        /* Toolbar */
        .tox .tox-editor-header { 
          background: #ffffff !important; 
          border-bottom: 1px solid #e2e8f0 !important; 
          box-shadow: none !important; 
          padding: 4px 8px !important;
        }
        @media (prefers-color-scheme: dark) {
          .tox .tox-editor-header { 
            background: #1e293b !important; 
            border-bottom: 1px solid #334155 !important; 
          }
        }
        
        .tox .tox-menubar { background: transparent !important; }
        .tox .tox-toolbar__primary { background: transparent !important; }
        
        /* Editor area */
        #editor-area {
          flex: 1;
          display: flex;
          flex-direction: column;
        }
        #editor-area .tox-tinymce {
          flex: 1 !important;
        }

        /* Mobile panel switching */
        @media (max-width: 1023px) {
          #panel-settings { border-top: 1px solid #e2e8f0; }
          #panel-editor, #panel-settings { width: 100%; }
        }
        @media (prefers-color-scheme: dark) and (max-width: 1023px) {
          #panel-settings { border-top: 1px solid #334155; }
        }

        /* Accordion collapse */
        .section-collapsed { display: none; }

        /* Smooth transitions */
        #panel-editor, #panel-settings { transition: opacity 0.2s ease; }
      `}} />

      {/* ===== SCRIPTS ===== */}
      <script dangerouslySetInnerHTML={{__html: `
        var editorReady = false;
        var currentTab = 'editor';
        var imgDebounce = null;

        function switchTab(tab) {
          currentTab = tab;
          var editorBtn = document.getElementById('tab-editor-btn');
          var settingsBtn = document.getElementById('tab-settings-btn');
          var panelEditor = document.getElementById('panel-editor');
          var panelSettings = document.getElementById('panel-settings');

          if (tab === 'editor') {
            panelEditor.style.display = 'flex';
            panelSettings.style.display = 'none';
            editorBtn.classList.add('active');
            settingsBtn.classList.remove('active');
          } else {
            panelEditor.style.display = 'none';
            panelSettings.style.display = 'flex';
            editorBtn.classList.remove('active');
            settingsBtn.classList.add('active');
          }
        }

        function handleResize() {
          var panelEditor = document.getElementById('panel-editor');
          var panelSettings = document.getElementById('panel-settings');
          if (window.innerWidth >= 1024) {
            panelEditor.style.display = 'flex';
            panelSettings.style.display = 'flex';
          } else {
            if (currentTab === 'editor') {
              panelEditor.style.display = 'flex';
              panelSettings.style.display = 'none';
            } else {
              panelEditor.style.display = 'none';
              panelSettings.style.display = 'flex';
            }
          }
        }
        window.addEventListener('resize', handleResize);

        function toggleSection(id) {
          var body = document.getElementById(id + '-body');
          var chevron = document.getElementById(id + '-chevron');
          var collapsed = body.classList.toggle('section-collapsed');
          chevron.style.transform = collapsed ? 'rotate(-90deg)' : 'rotate(0deg)';
        }

        function debounceImagePreview(url) {
          clearTimeout(imgDebounce);
          imgDebounce = setTimeout(function() { showImagePreview(url); }, 500);
        }
        
        function showImagePreview(url) {
          var box = document.getElementById('img-preview-box');
          var img = document.getElementById('img-preview');
          if (url && (url.startsWith('http') || url.startsWith('/'))) {
            img.src = url;
            box.classList.remove('hidden');
          } else {
            box.classList.add('hidden');
          }
        }
        
        function clearImageUrl() {
          document.getElementById('meta-image').value = '';
          document.getElementById('img-preview-box').classList.add('hidden');
        }

        function togglePremium(checked) {
          var container = document.getElementById('price-container');
          container.classList.toggle('hidden', !checked);
        }

        document.getElementById('meta-desc').addEventListener('input', function() {
          document.getElementById('meta-desc-count').textContent = this.value.length;
        });

        function initEditor() {
          var contentEncoded = document.getElementById('initial-content').value;
          var metadataEncoded = document.getElementById('initial-metadata').value;

          var metaData = { title: '', description: '', image: '' };
          if (metadataEncoded) {
            try { metaData = JSON.parse(decodeURIComponent(metadataEncoded)); } catch(e) {}
          }
          document.getElementById('meta-title').value = metaData.title || '';
          document.getElementById('meta-desc').value = metaData.description || '';
          document.getElementById('meta-desc-count').textContent = (metaData.description || '').length;
          document.getElementById('meta-image').value = metaData.image || '';
          if (metaData.image) showImagePreview(metaData.image);

          if (typeof tinymce === 'undefined') return;

          const isDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

          tinymce.init({
            selector: '#editorjs',
            height: '100%',
            min_height: 420,
            resize: false,
            menubar: false,
            plugins: [
              'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
              'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
              'insertdatetime', 'media', 'table', 'help', 'wordcount', 'codesample'
            ],
            toolbar: 'undo redo | blocks | bold italic underline strikethrough | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image media | removeformat | fullscreen',
            toolbar_mode: 'sliding',
            skin: isDarkMode ? 'oxide-dark' : 'oxide',
            content_css: isDarkMode ? 'dark' : 'default',
            content_style: [
              'body {',
              '  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;',
              '  font-size: 16px;',
              '  line-height: 1.6;',
              '  padding: 20px 28px;',
              '  max-width: 780px;',
              '  margin: 0 auto;',
              '}'
            ].join(' '),
            setup: function(editor) {
              editor.on('init', function() {
                editorReady = true;
                if (contentEncoded) {
                  try {
                    var parsed = JSON.parse(decodeURIComponent(contentEncoded));
                    if (parsed.blocks) {
                      var html = '';
                      parsed.blocks.forEach(function(b) {
                        if (b.type === 'paragraph') html += '<p>' + b.data.text + '</p>';
                        else if (b.type === 'header') html += '<h' + b.data.level + '>' + b.data.text + '</h' + b.data.level + '>';
                        else if (b.type === 'list') {
                          var tag = b.data.style === 'ordered' ? 'ol' : 'ul';
                          html += '<' + tag + '>';
                          b.data.items.forEach(function(i) { html += '<li>' + i + '</li>'; });
                          html += '</' + tag + '>';
                        }
                      });
                      editor.setContent(html);
                    } else {
                      editor.setContent(decodeURIComponent(contentEncoded));
                    }
                  } catch(e) {
                    editor.setContent(decodeURIComponent(contentEncoded));
                  }
                }
              });

              editor.on('keyup change', function() {
                var text = editor.getContent({ format: 'text' }).trim();
                var words = text ? text.split(/\\s+/).filter(Boolean).length : 0;
                document.getElementById('word-count').textContent = words + ' kata';
                document.getElementById('char-count').textContent = text.length + ' karakter';
              });
            }
          });
        }

        window.submitPost = function() {
          var btn = document.getElementById('save-btn');
          var textSpan = document.getElementById('save-btn-text');
          textSpan.innerHTML = 'Menyimpan...';
          btn.disabled = true;

          var metaData = {
            title: document.getElementById('meta-title').value,
            description: document.getElementById('meta-desc').value,
            image: document.getElementById('meta-image').value
          };
          document.getElementById('post-metadata').value = JSON.stringify(metaData);

          if (typeof tinymce !== 'undefined') {
            var editor = tinymce.get('editorjs');
            if (editor) document.getElementById('post-content').value = editor.getContent();
          }

          document.getElementById('post-form').submit();
        };

        window.addEventListener('DOMContentLoaded', function() {
          window._isEditing = ${isEditing};
          initEditor();
          handleResize();
        });
      `}} />
    </Layout>
  )
}
