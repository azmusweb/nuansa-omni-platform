import type { FC } from 'hono/jsx'
import { Layout } from '../components/Layout'

export const Audit: FC<{ currentPath: string }> = ({ currentPath }) => {
  const auditLogs = [
    { id: 1, action: 'User Login', user: 'admin@majubersama.com', ip: '192.168.1.5', status: 'Success', date: new Date().toISOString() },
    { id: 2, action: 'Update Post', user: 'admin@majubersama.com', ip: '192.168.1.5', status: 'Success', date: new Date(Date.now() - 3600000).toISOString() },
    { id: 3, action: 'Failed Login Attempt', user: 'unknown', ip: '114.120.45.10', status: 'Blocked', date: new Date(Date.now() - 86400000).toISOString() },
    { id: 4, action: 'Change Settings', user: 'admin@majubersama.com', ip: '192.168.1.5', status: 'Success', date: new Date(Date.now() - 172800000).toISOString() },
  ]

  return (
    <Layout title="Nuansa Shield (Keamanan)" currentPath={currentPath}>
      <div class="max-w-5xl mx-auto space-y-8">
        
        {/* Header Widget */}
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div class="bg-dark-800/50 backdrop-blur border border-slate-700/50 p-6 rounded-2xl flex items-center justify-between shadow-lg">
            <div>
              <p class="text-sm text-slate-400 font-medium mb-1">Status Keamanan</p>
              <h3 class="text-2xl font-bold text-emerald-400">Aman</h3>
            </div>
            <div class="w-12 h-12 bg-emerald-500/10 rounded-xl flex items-center justify-center border border-emerald-500/20 text-emerald-500">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg>
            </div>
          </div>
          <div class="bg-dark-800/50 backdrop-blur border border-slate-700/50 p-6 rounded-2xl flex items-center justify-between shadow-lg">
            <div>
              <p class="text-sm text-slate-400 font-medium mb-1">Ancaman Diblokir (30 Hari)</p>
              <h3 class="text-2xl font-bold text-white">124</h3>
            </div>
            <div class="w-12 h-12 bg-brand-500/10 rounded-xl flex items-center justify-center border border-brand-500/20 text-brand-500">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
            </div>
          </div>
          <div class="bg-dark-800/50 backdrop-blur border border-slate-700/50 p-6 rounded-2xl flex items-center justify-between shadow-lg">
            <div>
              <p class="text-sm text-slate-400 font-medium mb-1">Sesi Aktif</p>
              <h3 class="text-2xl font-bold text-white">1</h3>
            </div>
            <div class="w-12 h-12 bg-purple-500/10 rounded-xl flex items-center justify-center border border-purple-500/20 text-purple-400">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
            </div>
          </div>
        </div>

        {/* Audit Log Table */}
        <div class="bg-dark-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl shadow-xl overflow-hidden">
          <div class="p-6 border-b border-slate-700/50 flex justify-between items-center">
            <h2 class="text-lg font-semibold text-white">Log Aktivitas (Audit Trail)</h2>
            <button class="text-sm text-brand-400 font-medium hover:text-brand-300 transition">Ekspor CSV</button>
          </div>
          <table class="w-full text-left border-collapse">
            <thead>
              <tr class="border-b border-slate-700/50 text-slate-400 text-sm">
                <th class="p-4 font-medium pl-6">Tanggal & Waktu</th>
                <th class="p-4 font-medium">Aksi</th>
                <th class="p-4 font-medium">Pengguna</th>
                <th class="p-4 font-medium">Alamat IP</th>
                <th class="p-4 font-medium">Status</th>
              </tr>
            </thead>
            <tbody class="text-sm divide-y divide-slate-700/50">
              {auditLogs.map((log) => (
                <tr class="hover:bg-slate-800/50 transition">
                  <td class="p-4 pl-6 text-slate-400 font-mono text-xs">{new Date(log.date).toLocaleString('id-ID')}</td>
                  <td class="p-4 text-white font-medium">{log.action}</td>
                  <td class="p-4 text-slate-300">{log.user}</td>
                  <td class="p-4 text-slate-400 font-mono text-xs">{log.ip}</td>
                  <td class="p-4">
                    <span class={`px-2 py-1 rounded-full text-xs font-medium border ${log.status === 'Success' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-red-500/10 text-red-400 border-red-500/20'}`}>
                      {log.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </Layout>
  )
}
