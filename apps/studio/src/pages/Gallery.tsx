import type { FC } from 'hono/jsx'
import { Layout } from '../components/Layout'

export const Gallery: FC<{ currentPath: string }> = ({ currentPath }) => {
 return (
 <Layout title="Galeri Tema" currentPath={currentPath}>
 <div class="max-w-6xl mx-auto space-y-6">
 <div class="flex items-center justify-between">
 <div>
 <h1 class="text-3xl font-extrabold text-[#161616] tracking-tight mb-2">Galeri Tema</h1>
 <p class="text-gray-500">Koleksi tema tersimpan Anda dan tema premium yang Anda beli dari Marketplace.</p>
 </div>
 <button class="px-5 py-2.5 bg-brand-600 hover:bg-brand-500 text-white text-sm font-medium rounded-xl transition shadow-lg shadow-brand-500/20">
 Jelajahi Marketplace
 </button>
 </div>

 {/* Tab Navigasi */}
 <div class="flex gap-4 border-b border-[#ebebeb]">
 <button class="px-4 py-3 text-brand-600 border-b-2 border-brand-500 font-medium text-sm">Tema Tersimpan</button>
 <button class="px-4 py-3 text-gray-500 hover:text-[#161616] transition font-medium text-sm">Tema Dibeli</button>
 </div>

 {/* Daftar Tema */}
 <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-4">
 
 {/* Card Tema 1 */}
 <div class="bg-white backdrop-blur-sm border border-[#ebebeb] rounded-2xl overflow-hidden shadow-[0_4px_24px_rgba(0,0,0,0.04)] group">
 <div class="aspect-video bg-gray-50 border-b border-[#ebebeb] relative overflow-hidden">
 <div class="absolute inset-0 bg-gradient-to-br from-brand-500/20 to-purple-500/20"></div>
 <div class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-dark-950/60 backdrop-blur-sm">
 <button class="px-6 py-2 bg-brand-600 text-white rounded-full font-medium text-sm hover:scale-105 transition-transform">Gunakan Tema</button>
 </div>
 </div>
 <div class="p-5">
 <div class="flex items-center justify-between mb-2">
 <h3 class="text-[#161616] font-semibold">Tema Minimalis Elegan</h3>
 <span class="text-[10px] uppercase font-bold tracking-wider px-2 py-1 bg-brand-500/20 text-brand-600 rounded-md">Tersimpan</span>
 </div>
 <p class="text-xs text-gray-500">Disimpan pada 24 Sept 2026</p>
 </div>
 </div>

 {/* Card Tema 2 */}
 <div class="bg-white backdrop-blur-sm border border-[#ebebeb] rounded-2xl overflow-hidden shadow-[0_4px_24px_rgba(0,0,0,0.04)] group">
 <div class="aspect-video bg-gray-50 border-b border-[#ebebeb] relative overflow-hidden">
 <div class="absolute inset-0 bg-gradient-to-br from-emerald-500/20 to-teal-500/20"></div>
 <div class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-dark-950/60 backdrop-blur-sm">
 <button class="px-6 py-2 bg-brand-600 text-white rounded-full font-medium text-sm hover:scale-105 transition-transform">Gunakan Tema</button>
 </div>
 </div>
 <div class="p-5">
 <div class="flex items-center justify-between mb-2">
 <h3 class="text-[#161616] font-semibold">Korporat Premium</h3>
 <span class="text-[10px] uppercase font-bold tracking-wider px-2 py-1 bg-amber-500/20 text-amber-400 rounded-md">Dibeli</span>
 </div>
 <p class="text-xs text-gray-500">Lisensi Aktif</p>
 </div>
 </div>

 </div>
 </div>
 </Layout>
 )
}
