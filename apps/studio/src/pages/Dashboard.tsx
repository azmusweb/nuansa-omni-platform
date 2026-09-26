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
 <div class="lg:col-span-2 bg-white backdrop-blur-sm border border-[#ebebeb] p-6 rounded-2xl shadow-[0_4px_24px_rgba(0,0,0,0.04)] flex flex-col">
 
        <div class="w-full flex justify-between items-center mb-6">
          <h3 class="text-lg font-bold text-[#161616] tracking-tight">Kinerja Situs</h3>
          <select class="bg-gray-50 border border-[#ebebeb] text-sm rounded-lg px-3 py-1.5 focus:outline-none focus:ring-1 focus:ring-brand-500">
            <option>7 Hari Terakhir</option>
            <option>30 Hari Terakhir</option>
            <option>Sepanjang Waktu</option>
          </select>
        </div>
        <div class="w-full h-48 flex items-end justify-between gap-2 px-2 mt-auto">
          {[40, 70, 45, 90, 65, 110, 85].map((h) => (
            <div class="w-1/6 bg-brand-500/10 hover:bg-brand-500/20 transition-colors rounded-t-md relative group flex flex-col justify-end" style={`height: ${h}%`}>
              <div class="absolute -top-8 left-1/2 -translate-x-1/2 bg-[#161616] text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                ${h * 12} Kunjungan
              </div>
              <div class="w-full bg-brand-500 rounded-t-md transition-all duration-500" style={`height: ${h}%`}></div>
            </div>
          ))}
        </div>
        <div class="w-full flex justify-between text-xs text-gray-400 mt-4 px-2 font-medium">
          <span>Sen</span><span>Sel</span><span>Rab</span><span>Kam</span><span>Jum</span><span>Sab</span><span>Min</span>
        </div>

 </div>

 <div class="bg-white backdrop-blur-sm border border-[#ebebeb] p-6 rounded-2xl shadow-[0_4px_24px_rgba(0,0,0,0.04)]">
 <h3 class="text-lg font-bold text-brand-600 mb-6 uppercase tracking-wider">Aktivitas Terbaru</h3>
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
