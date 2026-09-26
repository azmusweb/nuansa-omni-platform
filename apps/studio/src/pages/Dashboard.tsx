import type { FC } from 'hono/jsx'
import { Layout } from '../components/Layout'

export const Dashboard: FC<{ 
 currentPath: string,
 stats?: { visitors: string, posts: string, media: string },
 recentPosts?: any[]
}> = ({ currentPath, stats, recentPosts = [] }) => {
 return (
 <Layout title="Dasbor Ikhtisar" currentPath={currentPath}>
 {/* Metrics Grid */}
 <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
 {[
 { label: 'Total Pengunjung', value: stats?.visitors || '0', trend: 'Sedang Disiapkan', color: 'text-gray-500' },
 { label: 'Artikel Aktif', value: stats?.posts || '0', trend: 'Tersimpan di D1', color: 'text-brand-600' },
 { label: 'Penyimpanan Media', value: stats?.media || '0 MB', trend: 'Tersimpan di R2', color: 'text-emerald-400' }
 ].map((metric) => (
 <div class="bg-white backdrop-blur-sm border border-[#ebebeb] p-6 rounded-2xl shadow-[0_4px_24px_rgba(0,0,0,0.04)] hover:bg-white transition group">
 <h3 class="text-gray-500 text-sm font-semibold tracking-wider uppercase mb-2 group-hover:text-brand-600 transition-colors">{metric.label}</h3>
 <div class="flex items-end gap-3">
 <span class="text-3xl font-bold text-[#161616] ">{metric.value}</span>
 <span class={`text-sm font-medium mb-1 ${metric.color} `}>{metric.trend}</span>
 </div>
 </div>
 ))}
 </div>

 {/* Main Content Area */}
 <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
 <div class="lg:col-span-2 bg-white backdrop-blur-sm border border-[#ebebeb] p-6 rounded-2xl shadow-[0_4px_24px_rgba(0,0,0,0.04)] min-h-[400px] flex flex-col items-center justify-center">
 <div class="w-16 h-16 rounded-full bg-brand-500/10 flex items-center justify-center mb-4 border border-[#ebebeb]">
 <svg class="w-8 h-8 text-brand-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path></svg>
 </div>
 <p class="text-brand-600 font-bold uppercase tracking-wider">Grafik Analisis Lalu Lintas (Segera Hadir)</p>
 <p class="text-sm text-gray-400 mt-2 text-center max-w-sm">
 Data analitik edge-native akan divisualisasikan di sini.
 </p>
 </div>

 <div class="bg-white backdrop-blur-sm border border-[#ebebeb] p-6 rounded-2xl shadow-[0_4px_24px_rgba(0,0,0,0.04)]">
 <h3 class="text-lg font-bold text-brand-600 mb-6 uppercase tracking-wider">&gt; Aktivitas_Terbaru</h3>
 <div class="space-y-6">
 {recentPosts.length === 0 ? (
 <p class="text-sm text-gray-400 ">Belum ada aktivitas penulisan artikel.</p>
 ) : (
 recentPosts.map((activity) => {
 const date = new Date(activity.created_at)
 // Format tanggal misal: "12 Okt 2026, 14:30"
 const formattedTime = date.toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute:'2-digit' })
 return (
 <div class="flex gap-4">
 <div class="w-2 h-2 mt-2 rounded-full bg-brand-400 shadow-[0_0_8px_rgba(16,185,129,0.6)] flex-shrink-0"></div>
 <div>
 <p class="text-sm text-gray-700">Artikel <span class="font-semibold text-brand-600">"{activity.title}"</span> diterbitkan</p>
 <p class="text-xs text-gray-400 mt-1 ">{formattedTime}</p>
 </div>
 </div>
 )
 })
 )}
 {/* Teks statis tambahan untuk menunjukkan sistem hidup */}
 <div class="flex gap-4 opacity-50">
 <div class="w-2 h-2 mt-2 rounded-full bg-slate-500 flex-shrink-0"></div>
 <div>
 <p class="text-sm text-gray-500 ">Sistem Dasbor Dinamis diaktifkan</p>
 <p class="text-xs text-gray-400 mt-1 ">Sistem Otomatis</p>
 </div>
 </div>
 </div>
 </div>
 </div>
 </Layout>
 )
}
