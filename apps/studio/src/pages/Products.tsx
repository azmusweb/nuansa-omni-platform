import type { FC } from 'hono/jsx'
import { Layout } from '../components/Layout'
import { products } from '@nuansa/db'

type Product = typeof products.$inferSelect

export const Products: FC<{ currentPath: string, products: Product[] }> = ({ currentPath, products }) => {
 return (
 <Layout title="Katalog Produk" currentPath={currentPath}>
 <div class="max-w-6xl mx-auto space-y-8">
 
 <div class="flex justify-between items-center bg-white backdrop-blur p-6 rounded-2xl border border-[#ebebeb] shadow-lg">
 <div>
 <h2 class="text-2xl font-bold text-gray-900 mb-2">Manajemen Katalog</h2>
 <p class="text-gray-500">Kelola produk fisik, digital, atau layanan langganan Anda.</p>
 </div>
 <button onclick="document.getElementById('add-product-modal').classList.remove('hidden')" class="px-6 py-3 bg-brand-500 hover:bg-brand-600 text-gray-900 rounded-xl font-medium transition shadow-lg shadow-brand-500/20 flex items-center gap-2">
 <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path></svg>
 Tambah Produk
 </button>
 </div>

 {/* Modal Tambah Produk (Sederhana) */}
 <div id="add-product-modal" class="hidden fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
 <div class="bg-gray-50 w-full max-w-lg rounded-2xl border border-[#ebebeb] shadow-2xl p-6 relative">
 <button onclick="document.getElementById('add-product-modal').classList.add('hidden')" class="absolute top-4 right-4 text-gray-500 hover:text-gray-900">
 <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
 </button>
 <h3 class="text-xl font-bold text-gray-900 mb-6">Produk Baru</h3>
 <form action="/api/products" method="POST" class="space-y-4">
 <div>
 <label class="block text-sm font-medium text-gray-700 mb-1">Nama Produk</label>
 <input type="text" name="name" required class="w-full bg-white border border-[#ebebeb] rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:border-brand-500 transition" placeholder="Contoh: Tiket Webinar Premium" />
 </div>
 <div>
 <label class="block text-sm font-medium text-gray-700 mb-1">Harga (Rp)</label>
 <input type="number" name="price" required class="w-full bg-white border border-[#ebebeb] rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:border-brand-500 transition" placeholder="Contoh: 150000" />
 </div>
 <div>
 <label class="block text-sm font-medium text-gray-700 mb-1">Deskripsi Singkat</label>
 <textarea name="description" rows="3" class="w-full bg-white border border-[#ebebeb] rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:border-brand-500 transition" placeholder="Jelaskan nilai jual produk Anda..."></textarea>
 </div>
 <div class="flex gap-4">
 <div class="flex-1">
 <label class="block text-sm font-medium text-gray-700 mb-1">Stok (Opsional)</label>
 <input type="number" name="stock" class="w-full bg-white border border-[#ebebeb] rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:border-brand-500 transition" placeholder="Biarkan kosong jika tak terbatas" />
 </div>
 </div>
 <div class="pt-4">
 <button type="submit" class="w-full bg-brand-500 hover:bg-brand-600 text-gray-900 font-semibold py-3 rounded-xl transition shadow-lg shadow-brand-500/20">
 Simpan ke Katalog
 </button>
 </div>
 </form>
 </div>
 </div>

 {/* Grid Produk */}
 {products.length === 0 ? (
 <div class="text-center py-20 bg-white rounded-2xl border border-[#ebebeb] border-dashed">
 <div class="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
 <svg class="w-10 h-10 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path></svg>
 </div>
 <h3 class="text-xl font-bold text-gray-900 mb-2">Katalog Masih Kosong</h3>
 <p class="text-gray-500 max-w-md mx-auto">Mulailah menjual produk fisik, layanan, atau kursus dengan menambahkannya ke Nuansa Commerce.</p>
 </div>
 ) : (
 <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
 {products.map((p) => (
 <div class="bg-white border border-[#ebebeb] rounded-2xl overflow-hidden hover:border-[#ebebeb] transition group shadow-lg">
 <div class="h-48 bg-gray-100 flex items-center justify-center relative overflow-hidden">
 {p.imageUrl ? (
 <img src={p.imageUrl} alt={p.name} class="w-full h-full object-cover" />
 ) : (
 <svg class="w-16 h-16 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
 )}
 <div class="absolute top-3 right-3 bg-black/60 backdrop-blur px-3 py-1 rounded-full text-xs font-semibold text-gray-900">
 {p.stock !== null && p.stock > 0 ? `Stok: ${p.stock}` : 'Tanpa Batas'}
 </div>
 </div>
 <div class="p-6">
 <h3 class="text-xl font-bold text-gray-900 mb-2 group-hover:text-brand-600 transition">{p.name}</h3>
 <p class="text-gray-500 text-sm mb-4 line-clamp-2">{p.description || 'Tidak ada deskripsi.'}</p>
 <div class="flex items-center justify-between mt-6">
 <span class="text-xl font-black text-brand-600">Rp {Number(p.price).toLocaleString('id-ID')}</span>
 <button class="text-sm font-medium text-gray-700 hover:text-gray-900 px-3 py-1.5 bg-slate-700/50 rounded-lg transition">Edit</button>
 </div>
 </div>
 </div>
 ))}
 </div>
 )}

 </div>
 </Layout>
 )
}
