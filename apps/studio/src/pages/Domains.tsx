import { html } from 'hono/html'
import { Layout } from '../components/Layout'

export const Domains = ({ currentPath, domains = [], settings = {} }: { currentPath: string, domains?: any[], settings?: any }) => {
  const currentSubdomain = settings.subdomain || 'studio';
  const isPremium = settings.plan === 'pro';

  return (
    <Layout title="Pengaturan Domain" currentPath={currentPath}>
      {/* Header Page */}
      <div class="mb-8">
        <h1 class="text-2xl font-bold text-[#161616] tracking-tight">Domain & URL Situs</h1>
        <p class="text-gray-500 mt-1">Atur alamat web tempat pengunjung dapat mengakses situs Anda.</p>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Kolom Kiri: Form & Pengaturan */}
        <div class="lg:col-span-2 space-y-6">
          
          {/* Section: Subdomain Gratis */}
          <div class="bg-white border border-[#ebebeb] rounded-2xl shadow-[0_4px_24px_rgba(0,0,0,0.04)] overflow-hidden">
            <div class="p-6 border-b border-[#ebebeb] bg-[#f7f7f7]">
              <h2 class="text-lg font-semibold text-[#161616] flex items-center gap-2">
                <svg class="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"></path></svg>
                Subdomain Bawaan (Gratis)
              </h2>
            </div>
            <div class="p-6">
              <p class="text-sm text-gray-500 mb-4">Setiap situs Nuansa mendapatkan subdomain gratis selamanya.</p>
              
              <form action="/api/domains/subdomain" method="POST" class="flex flex-col sm:flex-row gap-3 items-start">
                <div class="flex-1 flex items-stretch w-full">
                  <input type="text" name="subdomain" value={currentSubdomain} placeholder="namabisnis" class="w-full bg-gray-50 border border-[#ebebeb] border-r-0 rounded-l-xl px-4 py-2.5 text-[#161616] text-sm focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition font-medium text-right" />
                  <div class="bg-gray-100 border border-[#ebebeb] border-l-0 rounded-r-xl px-4 py-2.5 flex items-center text-gray-500 text-sm font-medium">
                    .nuansa.net
                  </div>
                </div>
                <button type="submit" class="w-full sm:w-auto bg-brand-600 hover:bg-brand-500 text-white px-6 py-2.5 rounded-xl font-medium text-sm transition shadow-sm whitespace-nowrap">
                  Simpan Subdomain
                </button>
              </form>
            </div>
          </div>

          {/* Section: Custom Domain (TLD) */}
          <div class="bg-white border border-[#ebebeb] rounded-2xl shadow-[0_4px_24px_rgba(0,0,0,0.04)] overflow-hidden">
            <div class="p-6 border-b border-[#ebebeb] bg-[#f7f7f7] flex justify-between items-center">
              <h2 class="text-lg font-semibold text-[#161616] flex items-center gap-2">
                <svg class="w-5 h-5 text-brand-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"></path></svg>
                Domain Kustom (TLD)
              </h2>
              {!isPremium && (
                <span class="bg-amber-100 text-amber-700 border border-amber-200 text-xs px-2.5 py-1 rounded-full font-bold uppercase tracking-wider">Premium</span>
              )}
            </div>
            
            <div class="p-6">
              {!isPremium ? (
                <div class="bg-brand-50 border border-brand-100 rounded-xl p-5 text-center">
                  <div class="w-12 h-12 bg-white rounded-full flex items-center justify-center mx-auto mb-3 shadow-sm text-brand-600">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"></path></svg>
                  </div>
                  <h3 class="font-bold text-[#161616] mb-2">Tingkatkan untuk Domain Profesional</h3>
                  <p class="text-sm text-gray-600 mb-4 max-w-sm mx-auto">
                    Gunakan domain Anda sendiri (misal: <code>www.bisnisanda.com</code>) untuk meningkatkan kredibilitas brand dengan paket Pro.
                  </p>
                  <a href="/settings" class="inline-block bg-[#161616] hover:bg-black text-white px-6 py-2.5 rounded-xl font-medium text-sm transition">
                    Lihat Paket Premium
                  </a>
                </div>
              ) : (
                <div>
                  <div class="flex justify-between items-center mb-4">
                    <p class="text-sm text-gray-500">Domain yang terhubung ke situs ini.</p>
                    <button onclick="document.getElementById('addDomainModal').classList.remove('hidden')" class="text-brand-600 hover:text-brand-700 font-medium text-sm flex items-center gap-1">
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path></svg>
                      Tambah Domain Baru
                    </button>
                  </div>
                  
                  {domains.length === 0 ? (
                    <div class="border border-dashed border-[#ebebeb] rounded-xl p-8 text-center bg-gray-50">
                      <p class="text-gray-500 text-sm">Belum ada domain kustom. Tambahkan sekarang!</p>
                    </div>
                  ) : (
                    <div class="border border-[#ebebeb] rounded-xl overflow-hidden divide-y divide-[#ebebeb]">
                      {domains.map((domain) => (
                        <div class="p-4 flex items-center justify-between hover:bg-gray-50 transition">
                          <div>
                            <p class="font-bold text-[#161616] text-sm">{domain.domain}</p>
                            <p class="text-xs text-gray-500 mt-0.5">Ditambahkan pada {new Date(domain.created_at).toLocaleDateString('id-ID')}</p>
                          </div>
                          <div class="flex items-center gap-4">
                            <span class={\`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider \${domain.is_active ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}\`}>
                              {domain.is_active ? 'Aktif' : 'Verifikasi'}
                            </span>
                            <button onclick={\`deleteDomain('\${domain.id}')\`} class="text-gray-400 hover:text-red-500 transition" title="Hapus Domain">
                              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Kolom Kanan: Panduan (Sticky) */}
        <div class="lg:col-span-1">
          <div class="bg-gray-50 border border-[#ebebeb] rounded-2xl p-6 sticky top-6">
            <h3 class="font-bold text-[#161616] mb-3 flex items-center gap-2">
              <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
              Panduan Domain
            </h3>
            <ul class="space-y-4 text-sm text-gray-600">
              <li class="flex items-start gap-2">
                <div class="w-5 h-5 rounded-full bg-brand-100 text-brand-600 flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">1</div>
                <p>Ubah pengaturan DNS di penyedia domain Anda (seperti Niagahoster, GoDaddy).</p>
              </li>
              <li class="flex items-start gap-2">
                <div class="w-5 h-5 rounded-full bg-brand-100 text-brand-600 flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">2</div>
                <p>Arahkan <strong>CNAME Record</strong> ke <code class="bg-white border border-[#ebebeb] px-1 py-0.5 rounded text-brand-600 font-mono text-xs break-all">proxy.nuansa.net</code>.</p>
              </li>
              <li class="flex items-start gap-2">
                <div class="w-5 h-5 rounded-full bg-brand-100 text-brand-600 flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">3</div>
                <p>Klik tombol tambah domain dan tunggu propagasi DNS (biasanya 10 menit hingga 24 jam).</p>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Add Domain Modal */}
      <div id="addDomainModal" class="hidden fixed inset-0 bg-[#161616]/40 backdrop-blur-sm flex items-center justify-center z-50 p-4 opacity-100 transition-opacity">
        <div class="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden transform scale-100 transition-transform">
          <div class="p-6 border-b border-[#ebebeb] bg-[#f7f7f7] flex justify-between items-center">
            <h2 class="text-lg font-bold text-[#161616]">Tambah Domain Baru</h2>
            <button onclick="document.getElementById('addDomainModal').classList.add('hidden')" class="text-gray-400 hover:text-[#161616] transition">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
            </button>
          </div>
          
          <form id="addDomainForm" class="p-6">
            <div class="mb-6">
              <label class="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-2">Nama Domain</label>
              <input type="text" name="domain" placeholder="Contoh: www.bisnisku.com" required
                class="w-full bg-gray-50 border border-[#ebebeb] rounded-xl px-4 py-3 text-[#161616] focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition" />
              <p class="text-xs text-gray-400 mt-2">Pastikan CNAME record sudah diarahkan sebelum menyimpan.</p>
            </div>
            
            <button type="submit" class="w-full bg-brand-600 hover:bg-brand-500 text-white rounded-xl px-4 py-3 font-medium transition shadow-lg shadow-brand-500/20">
              Hubungkan Domain
            </button>
          </form>
        </div>
      </div>

      {html\`
      <script>
        document.getElementById('addDomainForm').addEventListener('submit', async (e) => {
          e.preventDefault();
          const formData = new FormData(e.target);
          const btn = e.target.querySelector('button[type="submit"]');
          btn.innerHTML = '<span class="opacity-50">Menghubungkan...</span>';
          btn.disabled = true;
          
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
              btn.innerHTML = 'Hubungkan Domain';
              btn.disabled = false;
            }
          } catch (err) {
            alert('Terjadi kesalahan koneksi');
            btn.innerHTML = 'Hubungkan Domain';
            btn.disabled = false;
          }
        });

        async function deleteDomain(id) {
          if (confirm('Tindakan ini akan memutus koneksi website dengan domain Anda. Lanjutkan?')) {
            try {
              const res = await fetch('/api/domains/' + id, { method: 'DELETE' });
              if (res.ok) {
                window.location.reload();
              } else {
                alert('Gagal menghapus domain');
              }
            } catch (err) {
              alert('Terjadi kesalahan koneksi');
            }
          }
        }
      </script>
      \`}
    </Layout>
  )
}
