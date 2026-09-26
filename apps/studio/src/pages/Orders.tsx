import type { FC } from 'hono/jsx'
import { Layout } from '../components/Layout'

export const Orders: FC<{ currentPath: string; orders: any[] }> = ({ currentPath, orders }) => {
 return (
 <Layout currentPath={currentPath}>
 <div class="flex justify-between items-center mb-8">
 <div>
 <h1 class="text-3xl font-bold text-slate-900 mb-2 tracking-tight">Pesanan</h1>
 <p class="text-slate-600 ">Kelola pesanan dari katalog e-commerce Anda.</p>
 </div>
 </div>

 <div class="bg-white shadow-sm rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
 <div class="overflow-x-auto">
 <table class="w-full text-left border-collapse">
 <thead>
 <tr class="bg-slate-50/50 border-b border-slate-200 ">
 <th class="p-4 text-sm font-semibold text-slate-600 ">ID Pesanan</th>
 <th class="p-4 text-sm font-semibold text-slate-600 ">Pelanggan</th>
 <th class="p-4 text-sm font-semibold text-slate-600 ">Produk ID</th>
 <th class="p-4 text-sm font-semibold text-slate-600 text-right">Total</th>
 <th class="p-4 text-sm font-semibold text-slate-600 ">Status</th>
 <th class="p-4 text-sm font-semibold text-slate-600 ">Aksi</th>
 </tr>
 </thead>
 <tbody>
 {orders.length === 0 ? (
 <tr>
 <td colspan="6" class="p-8 text-center text-gray-400 ">Belum ada pesanan masuk.</td>
 </tr>
 ) : (
 orders.map((order) => (
 <tr class="border-b border-slate-100 hover:bg-slate-50/50 transition-colors">
 <td class="p-4 font-mono text-sm text-slate-600 ">{order.id.slice(0, 8)}...</td>
 <td class="p-4">
 <div class="font-medium text-slate-900 ">{order.customer_name}</div>
 <div class="text-sm text-gray-400 ">{order.customer_phone}</div>
 </td>
 <td class="p-4 text-slate-600 ">{order.product_id}</td>
 <td class="p-4 text-right font-medium text-slate-900 ">Rp {order.total_price.toLocaleString('id-ID')}</td>
 <td class="p-4">
 <span class={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
 order.status === 'pending' ? 'bg-amber-100 text-amber-800 ' :
 order.status === 'processed' ? 'bg-blue-100 text-blue-800 ' :
 order.status === 'completed' ? 'bg-emerald-100 text-emerald-800 ' :
 'bg-red-100 text-red-800 '
 }`}>
 {order.status}
 </span>
 </td>
 <td class="p-4">
 <form method="POST" action="/api/orders/update" class="flex gap-2">
 <input type="hidden" name="id" value={order.id} />
 <select name="status" class="bg-white border border-slate-200 rounded-lg px-2 py-1 text-sm text-slate-900 focus:outline-none focus:border-brand-500">
 <option value="pending" selected={order.status === 'pending'}>Pending</option>
 <option value="processed" selected={order.status === 'processed'}>Diproses</option>
 <option value="completed" selected={order.status === 'completed'}>Selesai</option>
 <option value="cancelled" selected={order.status === 'cancelled'}>Dibatalkan</option>
 </select>
 <button type="submit" class="px-3 py-1 bg-brand-500/10 text-brand-600 rounded-lg text-sm hover:bg-brand-500/20 transition">Simpan</button>
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
