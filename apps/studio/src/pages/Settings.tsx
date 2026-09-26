import type { FC } from 'hono/jsx'
import { Layout } from '../components/Layout'

export const Settings: FC<{ currentPath: string, settings?: any, isSaved?: boolean, upgradeRequested?: boolean }> = ({ currentPath, settings = {}, isSaved, upgradeRequested }) => {
  const maintenanceMode = settings['maintenanceMode'] || 'false'
  const pwaName = settings['pwaName'] || 'Nuansa App'
  const pwaShortName = settings['pwaShortName'] || 'Nuansa'
  const pwaThemeColor = settings['pwaThemeColor'] || '#3b82f6'
  const pwaBgColor = settings['pwaBgColor'] || '#ffffff'
  const pwaDisplay = settings['pwaDisplay'] || 'standalone'

  return (
    <Layout title="Pengaturan Sistem" currentPath={currentPath}>
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        <div class="col-span-1 lg:col-span-2 space-y-6">
          {isSaved && (
            <div class="bg-emerald-100 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 text-emerald-700 dark:text-emerald-400 px-4 py-3 rounded-xl text-sm font-medium flex items-center gap-2 shadow-sm">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
              Pengaturan berhasil disimpan.
            </div>
          )}

          {upgradeRequested && (
            <div class="bg-brand-100 dark:bg-brand-500/10 border border-brand-200 dark:border-brand-500/20 text-brand-700 dark:text-brand-400 px-4 py-3 rounded-xl text-sm font-medium flex items-center gap-2 shadow-sm">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
              Permintaan upgrade lisensi telah dikirim. Tim kami akan segera meninjaunya.
            </div>
          )}
          {/* Billing & Lisensi Form */}
          <form action="/api/upgrade" method="POST" class="bg-dark-800 border border-slate-700/50 rounded-2xl shadow-xl overflow-hidden">
            <div class="p-6 border-b border-slate-700/50 flex justify-between items-center bg-dark-900/50">
              <div>
                <h2 class="text-lg font-semibold text-white">Billing & Lisensi</h2>
                <p class="text-sm text-slate-400 mt-1">Kelola lisensi Nuansa Network dan Custom Domain Anda.</p>
              </div>
            </div>
            
            <div class="p-6 space-y-6">
              <div class="flex items-center justify-between p-5 bg-dark-900 border border-slate-700 rounded-xl">
                <div>
                  <span class="block text-white font-medium">Status Paket Saat Ini</span>
                  <span class="block text-sm text-slate-400 mt-1">Paket yang Anda gunakan menentukan fitur yang aktif.</span>
                </div>
                <div class="text-right">
                  <span class="inline-block px-3 py-1 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded-lg text-sm font-semibold uppercase tracking-wider">
                    Free Plan
                  </span>
                </div>
              </div>
              
              <div class="p-5 border border-brand-500/30 bg-brand-900/10 rounded-xl">
                <h3 class="text-white font-medium mb-2 flex items-center gap-2">
                  <svg class="w-5 h-5 text-brand-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                  Tingkatkan ke Pro (Custom Domain)
                </h3>
                <p class="text-slate-400 text-sm mb-4">
                  Dapatkan akses ke Custom Domain (misal: www.domainanda.com), tanpa iklan AdSense paksa, dan penyimpanan media tak terbatas.
                </p>
                <input type="hidden" name="target_plan" value="pro" />
                <button type="submit" class="bg-brand-600 hover:bg-brand-500 text-white px-5 py-2.5 rounded-lg font-medium text-sm transition shadow-lg shadow-brand-500/20 active:scale-95">
                  Request Upgrade Lisensi
                </button>
              </div>
            </div>
          </form>

          <form action="/api/settings" method="POST" class="bg-dark-800 border border-slate-700/50 rounded-2xl shadow-xl overflow-hidden">
            <input type="hidden" name="redirectUrl" value="/settings" />
            
            <div class="p-6 border-b border-slate-700/50 flex justify-between items-center bg-dark-900/50">
              <div>
                <h2 class="text-lg font-semibold text-white">Mode Pemeliharaan (Maintenance)</h2>
                <p class="text-sm text-slate-400 mt-1">Aktifkan untuk memblokir akses publik sementara waktu. Hanya admin yang dapat mengakses studio.</p>
              </div>
            </div>
            
            <div class="p-6 space-y-6">
              <label class="flex items-center justify-between cursor-pointer p-4 bg-dark-900 border border-slate-700 rounded-xl hover:border-brand-500/50 transition">
                <div>
                  <span class="block text-white font-medium">Status Pemeliharaan</span>
                  <span class="block text-sm text-slate-400 mt-1">Status saat ini: {maintenanceMode === 'true' ? 'Aktif (Situs Offline)' : 'Non-aktif (Situs Online)'}</span>
                </div>
                <div class="relative">
                  <input type="hidden" name="maintenanceMode" value="false" />
                  <input type="checkbox" name="maintenanceMode" value="true" class="sr-only peer" checked={maintenanceMode === 'true'} />
                  <div class="w-14 h-7 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-brand-500"></div>
                </div>
              </label>
            </div>
            
            <div class="p-4 bg-dark-900/50 border-t border-slate-700/50 text-right">
              <button type="submit" class="bg-brand-600 hover:bg-brand-500 text-white px-6 py-2.5 rounded-lg font-medium text-sm transition">
                Simpan Status
              </button>
            </div>
          </form>

          {/* Telegram Integration Form */}
          <form action="/api/settings" method="POST" class="bg-dark-800 border border-slate-700/50 rounded-2xl shadow-xl overflow-hidden">
            <input type="hidden" name="redirectUrl" value="/settings" />
            
            <div class="p-6 border-b border-slate-700/50 flex justify-between items-center bg-dark-900/50">
              <div>
                <h2 class="text-lg font-semibold text-white">Integrasi Telegram (Notifikasi)</h2>
                <p class="text-sm text-slate-400 mt-1">Dapatkan notifikasi instan saat ada pesanan atau pendaftaran baru di situs Anda.</p>
              </div>
            </div>
            
            <div class="p-6 space-y-5">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label class="block text-slate-300 text-sm font-medium mb-2">Bot Token (dari BotFather)</label>
                  <input type="text" name="telegram_bot_token" value={settings['telegram_bot_token'] || ''} placeholder="123456789:ABCdefGHIjklmNOPqrsTUVwxyz..." class="w-full bg-dark-900 border border-slate-700 rounded-xl px-4 py-2.5 text-white text-sm focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition placeholder-slate-600" />
                </div>
                <div>
                  <label class="block text-slate-300 text-sm font-medium mb-2">Chat ID</label>
                  <input type="text" name="telegram_chat_id" value={settings['telegram_chat_id'] || ''} placeholder="Misal: -1001234567890" class="w-full bg-dark-900 border border-slate-700 rounded-xl px-4 py-2.5 text-white text-sm focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition placeholder-slate-600" />
                </div>
              </div>
            </div>
            
            <div class="p-4 bg-dark-900/50 border-t border-slate-700/50 text-right flex items-center justify-between">
              <p class="text-xs text-slate-500 text-left">Kosongkan jika tidak ingin menggunakan fitur notifikasi Telegram.</p>
              <button type="submit" class="bg-brand-600 hover:bg-brand-500 text-white px-6 py-2.5 rounded-lg font-medium text-sm transition">
                Simpan Integrasi
              </button>
            </div>
          </form>

          {/* Monetisasi / AdSense Integration Form */}
          <form action="/api/settings" method="POST" class="bg-dark-800 border border-slate-700/50 rounded-2xl shadow-xl overflow-hidden">
            <input type="hidden" name="redirectUrl" value="/settings" />
            
            <div class="p-6 border-b border-slate-700/50 flex justify-between items-center bg-dark-900/50">
              <div>
                <h2 class="text-lg font-semibold text-white">Monetisasi (Google AdSense)</h2>
                <p class="text-sm text-slate-400 mt-1">Masukkan Publisher ID AdSense Anda untuk mulai menghasilkan uang dari tayangan iklan.</p>
              </div>
            </div>
            
            <div class="p-6 space-y-5">
              <div class="p-4 bg-emerald-900/20 border border-emerald-500/30 rounded-xl mb-6">
                <p class="text-emerald-400 text-sm flex items-start gap-2">
                  <svg class="w-5 h-5 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                  <span><strong>Nuansa Ads Network:</strong> Pendapatan dari tayangan iklan akan dibagi secara otomatis antara Anda (70%) dan platform (30%) tanpa perlu persetujuan manual.</span>
                </p>
              </div>
              
              <div>
                <label class="block text-slate-300 text-sm font-medium mb-2">Publisher ID AdSense</label>
                <input type="text" name="adsense_client_id" value={settings['adsense_client_id'] || ''} placeholder="ca-pub-1234567890123456" class="w-full bg-dark-900 border border-slate-700 rounded-xl px-4 py-2.5 text-white text-sm focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition placeholder-slate-600" />
                <p class="text-xs text-slate-500 mt-2">Dapatkan ID ini dari dashboard Google AdSense Anda.</p>
              </div>
            </div>
            
            <div class="p-4 bg-dark-900/50 border-t border-slate-700/50 text-right flex items-center justify-between">
              <p class="text-xs text-slate-500 text-left">Kosongkan jika tidak ingin memasang iklan.</p>
              <button type="submit" class="bg-brand-600 hover:bg-brand-500 text-white px-6 py-2.5 rounded-lg font-medium text-sm transition">
                Simpan AdSense
              </button>
            </div>
          </form>

          <form action="/api/settings" method="POST" class="bg-dark-800 border border-slate-700/50 rounded-2xl shadow-xl overflow-hidden">
            <input type="hidden" name="redirectUrl" value="/settings" />
            
            <div class="p-6 border-b border-slate-700/50 flex justify-between items-center bg-dark-900/50">
              <div>
                <h2 class="text-lg font-semibold text-white">Progressive Web App (PWA)</h2>
                <p class="text-sm text-slate-400 mt-1">Konfigurasikan manifest PWA untuk instalasi di perangkat mobile dan desktop.</p>
              </div>
            </div>
            
            <div class="p-6 space-y-5">
              <section class="glass p-6 rounded-2xl border border-slate-700/50 mb-8">
                <h2 class="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                  <span class="p-2 bg-indigo-500/20 text-indigo-400 rounded-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>
                  </span>
                  Ikon PWA & Vault
                </h2>
                <div class="space-y-4">
                  <div class="p-4 bg-dark-800 rounded-xl border border-slate-700/50">
                    <h3 class="text-white font-medium mb-1">Pengaturan Ikon Aplikasi</h3>
                    <p class="text-slate-400 text-sm mb-4">
                      Untuk mengubah ikon PWA (Progressive Web App) Anda, unggah gambar berukuran <strong class="text-indigo-400">512x512 px</strong> berformat PNG ke dalam <strong>Vault</strong> dengan nama file <code>icon-512x512.png</code>. Sistem akan secara otomatis menggunakannya sebagai ikon aplikasi Anda.
                    </p>
                    <a href="/vault" class="inline-flex items-center gap-2 text-sm text-indigo-400 hover:text-indigo-300 font-medium">
                      Buka Vault untuk mengunggah <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
                    </a>
                  </div>
                </div>
              </section>

              <div class="grid grid-cols-2 gap-5">
                <div>
                  <label class="block text-slate-300 text-sm font-medium mb-2">Nama Aplikasi</label>
                  <input type="text" name="pwaName" value={pwaName} class="w-full bg-dark-900 border border-slate-700 rounded-xl px-4 py-2.5 text-white text-sm focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition" />
                </div>
                <div>
                  <label class="block text-slate-300 text-sm font-medium mb-2">Nama Pendek</label>
                  <input type="text" name="pwaShortName" value={pwaShortName} class="w-full bg-dark-900 border border-slate-700 rounded-xl px-4 py-2.5 text-white text-sm focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition" />
                </div>
              </div>

              <div class="grid grid-cols-2 gap-5">
                <div>
                  <label class="block text-slate-300 text-sm font-medium mb-2">Warna Tema (Theme Color)</label>
                  <div class="flex items-center gap-3">
                    <input type="color" name="pwaThemeColor" value={pwaThemeColor} class="w-10 h-10 rounded cursor-pointer bg-dark-900 border border-slate-700 p-1" />
                    <span class="text-sm text-slate-400 font-mono">{pwaThemeColor}</span>
                  </div>
                </div>
                <div>
                  <label class="block text-slate-300 text-sm font-medium mb-2">Warna Latar (Background Color)</label>
                  <div class="flex items-center gap-3">
                    <input type="color" name="pwaBgColor" value={pwaBgColor} class="w-10 h-10 rounded cursor-pointer bg-dark-900 border border-slate-700 p-1" />
                    <span class="text-sm text-slate-400 font-mono">{pwaBgColor}</span>
                  </div>
                </div>
              </div>

              <div>
                <label class="block text-slate-300 text-sm font-medium mb-2">Mode Tampilan (Display)</label>
                <select name="pwaDisplay" class="w-full bg-dark-900 border border-slate-700 rounded-xl px-4 py-2.5 text-white text-sm focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition">
                  <option value="standalone" selected={pwaDisplay === 'standalone'}>Standalone (Seperti Aplikasi Asli)</option>
                  <option value="minimal-ui" selected={pwaDisplay === 'minimal-ui'}>Minimal UI</option>
                  <option value="fullscreen" selected={pwaDisplay === 'fullscreen'}>Layar Penuh (Fullscreen)</option>
                  <option value="browser" selected={pwaDisplay === 'browser'}>Tab Browser Standar</option>
                </select>
              </div>
            </div>
            
            <div class="p-4 bg-dark-900/50 border-t border-slate-700/50 text-right">
              <button type="submit" class="bg-brand-600 hover:bg-brand-500 text-white px-6 py-2.5 rounded-lg font-medium text-sm transition">
                Simpan Konfigurasi PWA
              </button>
            </div>
          </form>
        </div>

        <div class="col-span-1 space-y-6">
          <div class="bg-gradient-to-br from-brand-900/40 to-indigo-900/40 border border-brand-500/20 rounded-2xl p-6 shadow-lg">
            <div class="w-12 h-12 bg-brand-500/20 text-brand-400 rounded-xl flex items-center justify-center mb-4">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
            </div>
            <h3 class="text-white font-semibold text-lg mb-2">Tips PWA</h3>
            <p class="text-slate-400 text-sm leading-relaxed mb-4">
              Progressive Web App memungkinkan pengguna menginstal website Anda sebagai aplikasi di HP atau Komputer mereka. Pastikan Anda juga mengunggah file ikon 512x512 ke Vault dan menamainya <code>icon-512.png</code> agar manifest lengkap.
            </p>
          </div>
        </div>

      </div>
    </Layout>
  )
}
