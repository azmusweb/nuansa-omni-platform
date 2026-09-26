import type { FC } from 'hono/jsx'
import { Layout } from '../components/Layout'

type Course = {
 id: string
 title: string
 slug: string
 description?: string
 cover_image?: string
 price: number
 is_published: number
 lesson_count?: number
 created_at: string
}

export const Learn: FC<{ currentPath: string; courses: Course[] }> = ({ currentPath, courses }) => {
 return (
 <Layout currentPath={currentPath}>
 <div class="flex justify-between items-center mb-8">
 <div>
 <h1 class="text-3xl font-bold text-slate-900 mb-2 tracking-tight">Nuansa Learn</h1>
 <p class="text-slate-600 ">Kelola kursus dan materi pembelajaran.</p>
 </div>
 <button onclick="openCourseModal()" class="bg-brand-600 hover:bg-brand-500 text-gray-900 px-5 py-2.5 rounded-xl font-medium text-sm transition shadow-lg shadow-brand-500/20 flex items-center gap-2">
 <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path></svg>
 Buat Kursus Baru
 </button>
 </div>

 {/* Grid Kursus */}
 {courses.length === 0 ? (
 <div class="bg-white shadow-sm rounded-2xl border border-slate-200 p-16 text-center">
 <div class="w-16 h-16 bg-indigo-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
 <svg class="w-8 h-8 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path></svg>
 </div>
 <p class="text-gray-400 ">Belum ada kursus. Mulai buat kursus pertama Anda!</p>
 </div>
 ) : (
 <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
 {courses.map((course) => (
 <div class="bg-white shadow-sm rounded-2xl border border-slate-200 overflow-hidden hover:shadow-xl transition-all hover:-translate-y-1">
 <div class="h-40 bg-gradient-to-br from-indigo-500 to-purple-600 relative overflow-hidden">
 {course.cover_image ? (
 <img src={course.cover_image} alt={course.title} class="w-full h-full object-cover" />
 ) : (
 <div class="absolute inset-0 flex items-center justify-center">
 <svg class="w-12 h-12 text-gray-900/50" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path></svg>
 </div>
 )}
 <div class="absolute top-3 right-3">
 <span class={`text-xs font-semibold px-2 py-1 rounded-full ${course.is_published ? 'bg-emerald-500 text-gray-900' : 'bg-slate-700/80 text-gray-700'}`}>
 {course.is_published ? 'Publik' : 'Draft'}
 </span>
 </div>
 </div>
 <div class="p-5">
 <h3 class="font-bold text-slate-900 mb-1 line-clamp-1">{course.title}</h3>
 <p class="text-sm text-gray-400 line-clamp-2 mb-3">{course.description || 'Tidak ada deskripsi.'}</p>
 <div class="flex items-center justify-between">
 <span class="text-lg font-extrabold text-indigo-600 ">
 {course.price === 0 ? 'Gratis' : `Rp ${course.price.toLocaleString('id-ID')}`}
 </span>
 <span class="text-xs text-gray-500">{course.lesson_count || 0} materi</span>
 </div>
 <div class="flex gap-2 mt-4">
 <a href={`/learn/${course.id}/lessons`} class="flex-1 text-center px-3 py-2 bg-indigo-500/10 text-indigo-600 rounded-xl text-sm font-medium hover:bg-indigo-500/20 transition">
 Kelola Materi
 </a>
 <button onclick={`openCourseModal('${course.id}','${course.title.replace(/'/g,"\\'")}','${encodeURIComponent(course.description||'')}','${course.cover_image||''}',${course.price},${course.is_published})`} class="px-3 py-2 bg-slate-100 text-slate-600 rounded-xl text-sm hover:bg-slate-200 transition">Edit</button>
 <form action="/api/learn/course/delete" method="POST" class="inline" onsubmit="return confirm('Hapus kursus ini beserta semua materinya?')">
 <input type="hidden" name="id" value={course.id} />
 <button type="submit" class="px-3 py-2 bg-red-500/10 text-red-500 rounded-xl text-sm hover:bg-red-500/20 transition">Hapus</button>
 </form>
 </div>
 </div>
 </div>
 ))}
 </div>
 )}

 {/* Modal Buat/Edit Kursus */}
 <div id="course-modal" class="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 hidden flex items-center justify-center p-4">
 <div class="bg-white border border-slate-200 rounded-2xl w-full max-w-lg shadow-2xl">
 <div class="flex justify-between items-center p-5 border-b border-slate-200 ">
 <h3 id="modal-course-title" class="font-bold text-lg text-slate-900 ">Buat Kursus Baru</h3>
 <button onclick="closeCourseModal()" class="text-gray-500 hover:text-slate-700 ">
 <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
 </button>
 </div>
 <form action="/api/learn/course" method="POST" class="p-5 space-y-4">
 <input type="hidden" name="id" id="course-id" />
 <div>
 <label class="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Judul Kursus</label>
 <input type="text" name="title" id="course-title" required placeholder="Misal: Belajar SEO untuk Pemula" class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 focus:outline-none focus:border-brand-500 transition" />
 </div>
 <div>
 <label class="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Deskripsi</label>
 <textarea name="description" id="course-desc" rows={3} placeholder="Jelaskan isi kursus secara singkat..." class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 focus:outline-none focus:border-brand-500 transition resize-none"></textarea>
 </div>
 <div>
 <label class="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">URL Gambar Cover</label>
 <input type="text" name="cover_image" id="course-cover" placeholder="https://..." class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 focus:outline-none focus:border-brand-500 transition" />
 </div>
 <div class="grid grid-cols-2 gap-4">
 <div>
 <label class="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Harga (Rp)</label>
 <input type="number" name="price" id="course-price" placeholder="0 = Gratis" class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 focus:outline-none focus:border-brand-500 transition" />
 </div>
 <div>
 <label class="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Status</label>
 <select name="is_published" id="course-published" class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 focus:outline-none focus:border-brand-500 transition">
 <option value="0">Draft</option>
 <option value="1">Publik</option>
 </select>
 </div>
 </div>
 <div class="flex gap-3 pt-2">
 <button type="button" onclick="closeCourseModal()" class="flex-1 px-4 py-2.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 transition text-sm font-medium">Batal</button>
 <button type="submit" class="flex-1 px-4 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-500 text-gray-900 font-medium text-sm transition">Simpan</button>
 </div>
 </form>
 </div>
 </div>

 <script dangerouslySetInnerHTML={{__html: `
 function openCourseModal(id='',title='',encDesc='',cover='',price=0,pub=0) {
 document.getElementById('modal-course-title').innerText = id ? 'Edit Kursus' : 'Buat Kursus Baru';
 document.getElementById('course-id').value = id;
 document.getElementById('course-title').value = title;
 document.getElementById('course-desc').value = decodeURIComponent(encDesc);
 document.getElementById('course-cover').value = cover;
 document.getElementById('course-price').value = price;
 document.getElementById('course-published').value = pub;
 document.getElementById('course-modal').classList.remove('hidden');
 }
 function closeCourseModal() {
 document.getElementById('course-modal').classList.add('hidden');
 }
 `}} />
 </Layout>
 )
}
