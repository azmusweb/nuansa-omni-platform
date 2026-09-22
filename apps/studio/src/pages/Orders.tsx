import type { FC } from 'hono/jsx'
import { Layout } from '../components/Layout'

export const Orders: FC<{ currentPath: string; orders: any[] }> = ({ currentPath, orders }) => {
  return (
    <Layout currentPath={currentPath}>
      <div class="flex justify-between items-center mb-8">
        <div>
          <h1 class="text-3xl font-bold text-slate-900 dark:text-white mb-2 tracking-tight">Pesanan</h1>
          <p class="text-slate-600 dark:text-slate-400">Kelola pesanan dari katalog e-commerce Anda.</p>
        </div>
      </div>

      <div class="glassmorphism rounded-2xl border border-slate-200 dark:border-slate-800/50 overflow-hidden shadow-sm">
        <div class="overflow-x-auto">
          <table class="w-full text-left border-collapse">
            <thead>
              <tr class="bg-slate-50/50 dark:bg-slate-800/30 border-b border-slate-200 dark:border-slate-700/50">
                <th class="p-4 text-sm font-semibold text-slate-600 dark:text-slate-300">ID Pesanan</th>
                <th class="p-4 text-sm font-semibold text-slate-600 dark:text-slate-300">Pelanggan</th>
                <th class="p-4 text-sm font-semibold text-slate-600 dark:text-slate-300">Produk ID</th>
                <th class="p-4 text-sm font-semibold text-slate-600 dark:text-slate-300 text-right">Total</th>
                <th class="p-4 text-sm font-semibold text-slate-600 dark:text-slate-300">Status</th>
                <th class="p-4 text-sm font-semibold text-slate-600 dark:text-slate-300">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {orders.length === 0 ? (
                <tr>
                  <td colspan="6" class="p-8 text-center text-slate-500 dark:text-slate-400">Belum ada pesanan masuk.</td>
                </tr>
              ) : (
                orders.map((order) => (
                  <tr class="border-b border-slate-100 dark:border-slate-800/50 hover:bg-slate-50/50 dark:hover:bg-slate-800/20 transition-colors">
                    <td class="p-4 font-mono text-sm text-slate-600 dark:text-slate-400">{order.id.slice(0, 8)}...</td>
                    <td class="p-4">
                      <div class="font-medium text-slate-900 dark:text-white">{order.customer_name}</div>
                      <div class="text-sm text-slate-500 dark:text-slate-400">{order.customer_phone}</div>
                    </td>
                    <td class="p-4 text-slate-600 dark:text-slate-400">{order.product_id}</td>
                    <td class="p-4 text-right font-medium text-slate-900 dark:text-white">Rp {order.total_price.toLocaleString('id-ID')}</td>
                    <td class="p-4">
                      <span class={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        order.status === 'pending' ? 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300' :
                        order.status === 'processed' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300' :
                        order.status === 'completed' ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300' :
                        'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300'
                      }`}>
                        {order.status}
                      </span>
                    </td>
                    <td class="p-4">
                      <form method="POST" action="/api/orders/update" class="flex gap-2">
                        <input type="hidden" name="id" value={order.id} />
                        <select name="status" class="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-2 py-1 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-brand-500">
                          <option value="pending" selected={order.status === 'pending'}>Pending</option>
                          <option value="processed" selected={order.status === 'processed'}>Diproses</option>
                          <option value="completed" selected={order.status === 'completed'}>Selesai</option>
                          <option value="cancelled" selected={order.status === 'cancelled'}>Dibatalkan</option>
                        </select>
                        <button type="submit" class="px-3 py-1 bg-brand-500/10 text-brand-600 dark:text-brand-400 rounded-lg text-sm hover:bg-brand-500/20 transition">Simpan</button>
                      </form>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  )
}
