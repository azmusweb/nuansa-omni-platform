import type { FC } from 'hono/jsx'
import { Layout } from '../components/Layout'

export const Billing: FC<{ currentPath: string, plan: string, transactions: any[] }> = ({ currentPath, plan = 'gratis', transactions = [] }) => {
 return (
 <Layout title="Layanan Tambahan (Billing)" currentPath={currentPath}>
 <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
 
 {/* Kolom Paket & Upgrade */}
 <div class="col-span-1 lg:col-span-2 space-y-6">
 <div class="bg-white border border-[#ebebeb] rounded-2xl shadow-[0_4px_24px_rgba(0,0,0,0.04)] p-8">
 <h2 class="text-2xl font-bold text-gray-900 mb-2">Paket Langganan Anda</h2>
 <p class="text-gray-500 mb-6">Kelola paket, perbarui lisensi, dan beli fitur tambahan.</p>
 
 <div class="flex items-center gap-4 p-4 bg-gray-50 border border-[#ebebeb] rounded-xl mb-8">
 <div class="w-12 h-12 rounded-full bg-brand-500/20 text-brand-600 flex items-center justify-center font-bold uppercase">
 {plan[0]}
 </div>
 <div>
 <p class="text-sm text-gray-500">Paket Saat Ini</p>
 <p class="text-xl font-bold text-gray-900 uppercase tracking-wider">{plan}</p>
 </div>
 </div>

 <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
 {/* Kartu Upgrade Pro */}
 <div class="border border-[#ebebeb] rounded-xl p-5 hover:border-brand-500 transition relative overflow-hidden group">
 <div class="absolute inset-0 bg-gradient-to-br from-brand-500/5 to-indigo-500/5 opacity-0 group-hover:opacity-100 transition"></div>
 <h3 class="text-lg font-bold text-gray-900 mb-1">Paket Pro</h3>
 <p class="text-xl font-bold text-brand-600 mb-4">Rp 199.000<span class="text-sm font-normal text-gray-400">/bln</span></p>
 <ul class="text-sm text-gray-500 space-y-2 mb-6">
 <li class="flex items-center gap-2"><svg class="w-4 h-4 text-emerald-500" fill="currentColor" viewBox="0 0 20 20"><path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"></path></svg> Akses Custom Domain</li>
 <li class="flex items-center gap-2"><svg class="w-4 h-4 text-emerald-500" fill="currentColor" viewBox="0 0 20 20"><path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"></path></svg> 50GB Penyimpanan Vault</li>
 <li class="flex items-center gap-2"><svg class="w-4 h-4 text-emerald-500" fill="currentColor" viewBox="0 0 20 20"><path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"></path></svg> Prioritas Dukungan</li>
 </ul>
 <form action="/api/buy" method="POST">
 <input type="hidden" name="type" value="plan_upgrade" />
 <input type="hidden" name="details" value='{"target_plan": "pro", "price": 199000}' />
 <button type="submit" class="w-full py-2 bg-gray-50 border border-slate-600 hover:border-brand-500 text-gray-900 rounded-lg font-medium text-sm transition" disabled={plan === 'pro' || plan === 'enterprise'}>
 {plan === 'pro' || plan === 'enterprise' ? 'Sudah Dimiliki' : 'Ajukan Upgrade'}
 </button>
 </form>
 </div>

 {/* Kartu Upgrade Enterprise */}
 <div class="border border-[#ebebeb] bg-brand-500/5 rounded-xl p-5 hover:border-brand-500 transition relative overflow-hidden group">
 <div class="absolute top-0 right-0 bg-brand-500 text-gray-900 text-[10px] font-bold px-2 py-1 rounded-bl-lg">TERPOPULER</div>
 <h3 class="text-lg font-bold text-gray-900 mb-1">Enterprise</h3>
 <p class="text-xl font-bold text-brand-600 mb-4">Rp 499.000<span class="text-sm font-normal text-gray-400">/bln</span></p>
 <ul class="text-sm text-gray-500 space-y-2 mb-6">
 <li class="flex items-center gap-2"><svg class="w-4 h-4 text-emerald-500" fill="currentColor" viewBox="0 0 20 20"><path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"></path></svg> Multi-Domain & White-Label</li>
 <li class="flex items-center gap-2"><svg class="w-4 h-4 text-emerald-500" fill="currentColor" viewBox="0 0 20 20"><path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"></path></svg> Unlimited Penyimpanan</li>
 <li class="flex items-center gap-2"><svg class="w-4 h-4 text-emerald-500" fill="currentColor" viewBox="0 0 20 20"><path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"></path></svg> API Access</li>
 </ul>
 <form action="/api/buy" method="POST">
 <input type="hidden" name="type" value="plan_upgrade" />
 <input type="hidden" name="details" value='{"target_plan": "enterprise", "price": 499000}' />
 <button type="submit" class="w-full py-2 bg-brand-600 hover:bg-brand-500 text-gray-900 rounded-lg font-medium text-sm transition shadow-lg shadow-brand-500/20" disabled={plan === 'enterprise'}>
 {plan === 'enterprise' ? 'Sudah Dimiliki' : 'Ajukan Upgrade'}
 </button>
 </form>
 </div>
 </div>
 </div>
 </div>

 {/* Kolom Riwayat Transaksi */}
 <div class="col-span-1 space-y-6">
 <div class="bg-white border border-[#ebebeb] rounded-2xl shadow-[0_4px_24px_rgba(0,0,0,0.04)] overflow-hidden">
 <div class="p-5 border-b border-[#ebebeb] bg-gray-50">
 <h3 class="font-semibold text-gray-900">Status Permintaan</h3>
 </div>
 <div class="p-0">
 <ul class="divide-y divide-slate-700/50">
 {transactions.length === 0 ? (
 <li class="p-5 text-center text-sm text-gray-400">Belum ada transaksi atau permintaan pending.</li>
 ) : (
 transactions.map((tx) => (
 <li class="p-5 flex flex-col gap-2 hover:bg-dark-700/20 transition">
 <div class="flex justify-between items-start">
 <span class="text-sm font-medium text-gray-900">{tx.type === 'plan_upgrade' ? 'Upgrade Paket' : tx.type}</span>
 {tx.status === 'pending' && <span class="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500/20 text-amber-400 border border-amber-500/30 uppercase">Menunggu</span>}
 {tx.status === 'approved' && <span class="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 uppercase">Disetujui</span>}
 {tx.status === 'rejected' && <span class="px-2 py-0.5 rounded text-[10px] font-bold bg-red-500/20 text-red-400 border border-red-500/30 uppercase">Ditolak</span>}
 </div>
 <span class="text-xs text-gray-500 ">ID: {tx.id.split('-')[0]}</span>
 {tx.details && (
 <span class="text-xs text-gray-400">{JSON.parse(tx.details).target_plan?.toUpperCase()}</span>
 )}
 </li>
 ))
 )}
 </ul>
 </div>
 </div>
 </div>

 </div>
 </Layout>
 )
}
