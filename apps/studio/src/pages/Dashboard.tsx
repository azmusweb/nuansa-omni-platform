import type { FC } from 'hono/jsx'
import { Layout } from '../components/Layout'

export const Dashboard: FC<{ currentPath: string }> = ({ currentPath }) => {
  return (
    <Layout title="Dasbor Ikhtisar" currentPath={currentPath}>
      {/* Metrics Grid */}
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {[
          { label: 'Total Pengunjung', value: '124.5K', trend: '+12.5%', color: 'text-emerald-400' },
          { label: 'Artikel Aktif', value: '842', trend: '+3', color: 'text-brand-400' },
          { label: 'Penyimpanan Media', value: '45.2 GB', trend: 'Aman', color: 'text-slate-400' }
        ].map((metric) => (
          <div class="bg-dark-800/50 backdrop-blur-sm border border-slate-700/50 p-6 rounded-2xl shadow-xl hover:bg-dark-800 transition">
            <h3 class="text-slate-400 text-sm font-medium mb-2">{metric.label}</h3>
            <div class="flex items-end gap-3">
              <span class="text-3xl font-bold text-white">{metric.value}</span>
              <span class={`text-sm font-medium mb-1 ${metric.color}`}>{metric.trend}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Main Content Area */}
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div class="lg:col-span-2 bg-dark-800/50 backdrop-blur-sm border border-slate-700/50 p-6 rounded-2xl shadow-xl min-h-[400px] flex flex-col items-center justify-center">
          <div class="w-16 h-16 rounded-full bg-brand-500/10 flex items-center justify-center mb-4">
            <svg class="w-8 h-8 text-brand-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path></svg>
          </div>
          <p class="text-slate-400 font-medium">Grafik Analisis Lalu Lintas (Segera Hadir)</p>
          <p class="text-sm text-slate-500 mt-2 text-center max-w-sm">
            Data analitik edge-native dari Cloudflare Workers Analytics Engine akan divisualisasikan di sini.
          </p>
        </div>

        <div class="bg-dark-800/50 backdrop-blur-sm border border-slate-700/50 p-6 rounded-2xl shadow-xl">
          <h3 class="text-lg font-semibold text-white mb-6">Aktivitas Terbaru</h3>
          <div class="space-y-6">
            {[
              { title: 'Artikel "Mengenal Edge Computing" diterbitkan', time: '2 jam yang lalu' },
              { title: 'Gambar sampul diperbarui', time: '5 jam yang lalu' },
              { title: 'Tema "Dark Elegance" diaktifkan', time: '1 hari yang lalu' },
            ].map((activity) => (
              <div class="flex gap-4">
                <div class="w-2 h-2 mt-2 rounded-full bg-brand-500 shadow-[0_0_8px_rgba(59,130,246,0.6)]"></div>
                <div>
                  <p class="text-sm text-slate-200">{activity.title}</p>
                  <p class="text-xs text-slate-500 mt-1">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  )
}
