import type { FC } from 'hono/jsx'
import { Layout } from '../components/Layout'

type Lesson = {
  id: string
  course_id: string
  title: string
  content?: string
  order_index: number
  is_preview: number
}

type Course = {
  id: string
  title: string
  price: number
}

export const Lessons: FC<{ currentPath: string; course: Course; lessons: Lesson[] }> = ({ currentPath, course, lessons }) => {
  const sorted = [...lessons].sort((a, b) => a.order_index - b.order_index)

  return (
    <Layout currentPath={currentPath}>
      <div class="flex items-center gap-3 mb-2">
        <a href="/learn" class="text-slate-500 dark:text-slate-400 hover:text-brand-500 transition text-sm flex items-center gap-1">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
          Semua Kursus
        </a>
        <span class="text-slate-300 dark:text-slate-600">/</span>
        <span class="text-slate-700 dark:text-slate-300 text-sm font-medium">{course.title}</span>
      </div>

      <div class="flex justify-between items-center mb-8">
        <div>
          <h1 class="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">{course.title}</h1>
          <p class="text-slate-500 dark:text-slate-400 text-sm mt-1">Kelola urutan dan isi materi kursus ini.</p>
        </div>
        <button onclick="openLessonModal()" class="bg-indigo-600 hover:bg-indigo-500 text-white px-5 py-2.5 rounded-xl font-medium text-sm transition shadow-lg shadow-indigo-500/20 flex items-center gap-2">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path></svg>
          Tambah Materi
        </button>
      </div>

      <div class="space-y-3">
        {sorted.length === 0 ? (
          <div class="glassmorphism rounded-2xl border border-slate-200 dark:border-slate-800/50 p-12 text-center">
            <p class="text-slate-500 dark:text-slate-400">Belum ada materi. Tambahkan materi pertama untuk kursus ini.</p>
          </div>
        ) : sorted.map((lesson, idx) => (
          <div class="glassmorphism rounded-2xl border border-slate-200 dark:border-slate-800/50 p-4 flex items-center gap-4">
            <div class="w-8 h-8 rounded-lg bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 flex items-center justify-center text-sm font-bold shrink-0">
              {idx + 1}
            </div>
            <div class="flex-1 min-w-0">
              <div class="flex items-center gap-2">
                <span class="font-semibold text-slate-900 dark:text-white truncate">{lesson.title}</span>
                {lesson.is_preview ? (
                  <span class="text-xs px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 shrink-0">Preview Gratis</span>
                ) : (
                  <span class="text-xs px-2 py-0.5 rounded-full bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 shrink-0">Premium</span>
                )}
              </div>
            </div>
            <div class="flex gap-2 shrink-0">
              <button onclick={`openLessonModal('${lesson.id}','${lesson.title.replace(/'/g,"\\'")}','${encodeURIComponent(lesson.content||'')}',${lesson.order_index},${lesson.is_preview})`} class="px-3 py-1.5 text-xs rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 transition">Edit</button>
              <form action="/api/learn/lesson/delete" method="POST" class="inline" onsubmit="return confirm('Hapus materi ini?')">
                <input type="hidden" name="id" value={lesson.id} />
                <input type="hidden" name="course_id" value={lesson.course_id} />
                <button type="submit" class="px-3 py-1.5 text-xs rounded-lg bg-red-50 dark:bg-red-900/20 text-red-500 hover:bg-red-100 dark:hover:bg-red-900/30 transition">Hapus</button>
              </form>
            </div>
          </div>
        ))}
      </div>

      {/* Modal Tambah/Edit Materi */}
      <div id="lesson-modal" class="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 hidden flex items-center justify-center p-4">
        <div class="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl w-full max-w-2xl max-h-[90vh] flex flex-col shadow-2xl">
          <div class="flex justify-between items-center p-5 border-b border-slate-200 dark:border-slate-800 shrink-0">
            <h3 id="modal-lesson-title" class="font-bold text-lg text-slate-900 dark:text-white">Tambah Materi</h3>
            <button onclick="closeLessonModal()" class="text-slate-400 hover:text-slate-700 dark:hover:text-white">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
            </button>
          </div>
          <form action="/api/learn/lesson" method="POST" class="p-5 space-y-4 overflow-y-auto flex-1">
            <input type="hidden" name="id" id="lesson-id" />
            <input type="hidden" name="course_id" value={course.id} />
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">Judul Materi</label>
                <input type="text" name="title" id="lesson-title" required placeholder="Misal: Pengenalan SEO" class="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-brand-500 transition" />
              </div>
              <div>
                <label class="block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">Urutan</label>
                <input type="number" name="order_index" id="lesson-order" placeholder="1" class="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-brand-500 transition" />
              </div>
            </div>
            <div>
              <label class="flex items-center gap-3 cursor-pointer">
                <div class="relative">
                  <input type="checkbox" name="is_preview" value="1" id="lesson-preview" class="sr-only peer" />
                  <div class="w-10 h-5 bg-slate-300 dark:bg-slate-700 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-indigo-500"></div>
                </div>
                <span class="text-sm text-slate-700 dark:text-slate-300">Preview Gratis (bisa dibaca tanpa daftar)</span>
              </label>
            </div>
            <div>
              <label class="block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">Konten Materi</label>
              <textarea name="content" id="lesson-content" rows={12} placeholder="Tulis konten materi di sini (mendukung HTML)..." class="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-brand-500 transition font-mono resize-none"></textarea>
            </div>
            <div class="flex gap-3 pt-1">
              <button type="button" onclick="closeLessonModal()" class="flex-1 px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition text-sm font-medium">Batal</button>
              <button type="submit" class="flex-1 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-sm transition">Simpan</button>
            </div>
          </form>
        </div>
      </div>

      <script dangerouslySetInnerHTML={{__html: `
        function openLessonModal(id='',title='',encContent='',order=0,preview=0) {
          document.getElementById('modal-lesson-title').innerText = id ? 'Edit Materi' : 'Tambah Materi';
          document.getElementById('lesson-id').value = id;
          document.getElementById('lesson-title').value = title;
          document.getElementById('lesson-content').value = decodeURIComponent(encContent);
          document.getElementById('lesson-order').value = order || (${sorted.length} + 1);
          document.getElementById('lesson-preview').checked = !!preview;
          document.getElementById('lesson-modal').classList.remove('hidden');
        }
        function closeLessonModal() {
          document.getElementById('lesson-modal').classList.add('hidden');
        }
      `}} />
    </Layout>
  )
}
