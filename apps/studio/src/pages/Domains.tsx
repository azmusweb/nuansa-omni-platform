import { html } from 'hono/html'
import { Layout } from '../components/Layout'

export const Domains = ({ currentPath, domains }: { currentPath: string, domains: any[] }) => {
 return (
 <Layout currentPath={currentPath}>
 <div className="flex justify-between items-center mb-6">
 <div>
 <h1 className="text-2xl font-bold text-gray-800">Domain & Custom TLD</h1>
 <p className="text-gray-600">Kelola domain yang terhubung ke website Anda.</p>
 </div>
 <button 
 onclick="document.getElementById('addDomainModal').classList.remove('hidden')"
 className="bg-blue-600 hover:bg-blue-700 text-gray-900 px-4 py-2 rounded-lg text-sm font-medium transition-colors">
 Tambah Domain
 </button>
 </div>

 <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
 <table className="w-full text-left border-collapse">
 <thead>
 <tr className="bg-gray-50 border-b border-gray-100">
 <th className="p-4 font-medium text-gray-600">Domain</th>
 <th className="p-4 font-medium text-gray-600">Status</th>
 <th className="p-4 font-medium text-gray-600">Ditambahkan</th>
 <th className="p-4 font-medium text-gray-600">Aksi</th>
 </tr>
 </thead>
 <tbody>
 {domains.map((domain) => (
 <tr key={domain.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
 <td className="p-4">
 <div className="font-medium text-gray-900">{domain.domain}</div>
 </td>
 <td className="p-4">
 <span className={`px-2 py-1 rounded-full text-xs font-medium ${domain.is_active ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
 {domain.is_active ? 'Aktif' : 'Menunggu Verifikasi'}
 </span>
 </td>
 <td className="p-4 text-gray-500">
 {new Date(domain.created_at).toLocaleDateString('id-ID')}
 </td>
 <td className="p-4">
 <button 
 onclick={`deleteDomain('${domain.id}')`}
 className="text-red-500 hover:text-red-700 p-2 rounded-lg hover:bg-red-50 transition-colors">
 Hapus
 </button>
 </td>
 </tr>
 ))}
 {domains.length === 0 && (
 <tr>
 <td colSpan={4} className="p-8 text-center text-gray-500">
 Belum ada domain kustom.
 </td>
 </tr>
 )}
 </tbody>
 </table>
 </div>

 {/* Add Domain Modal */}
 <div id="addDomainModal" className="hidden fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
 <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-6">
 <h2 className="text-xl font-bold mb-4">Tambah Domain Kustom</h2>
 <p className="text-gray-600 text-sm mb-4">
 Masukkan nama domain Anda (misal: <code>www.domainanda.com</code>). 
 Pastikan Anda sudah mengarahkan CNAME atau A Record domain Anda ke server kami.
 </p>
 <form id="addDomainForm">
 <div className="mb-4">
 <label className="block text-sm font-medium text-gray-700 mb-1">Nama Domain</label>
 <input type="text" name="domain" placeholder="www.example.com" required
 className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none" />
 </div>
 <div className="flex justify-end gap-2 mt-6">
 <button type="button" 
 onclick="document.getElementById('addDomainModal').classList.add('hidden')"
 className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
 Batal
 </button>
 <button type="submit" 
 className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-gray-900 rounded-lg transition-colors">
 Simpan
 </button>
 </div>
 </form>
 </div>
 </div>

 {html`
 <script>
 document.getElementById('addDomainForm').addEventListener('submit', async (e) => {
 e.preventDefault();
 const formData = new FormData(e.target);
 try {
 const res = await fetch('/api/domains', {
 method: 'POST',
 headers: { 'Content-Type': 'application/json' },
 body: JSON.stringify({
 domain: formData.get('domain')
 })
 });
 
 if (res.ok) {
 window.location.reload();
 } else {
 const data = await res.json();
 alert(data.error || 'Gagal menambahkan domain');
 }
 } catch (err) {
 alert('Terjadi kesalahan');
 }
 });

 async function deleteDomain(id) {
 if (confirm('Apakah Anda yakin ingin menghapus domain ini?')) {
 try {
 const res = await fetch('/api/domains/' + id, { method: 'DELETE' });
 if (res.ok) {
 window.location.reload();
 } else {
 alert('Gagal menghapus domain');
 }
 } catch (err) {
 alert('Terjadi kesalahan');
 }
 }
 }
 </script>
 `}
 </Layout>
 )
}
