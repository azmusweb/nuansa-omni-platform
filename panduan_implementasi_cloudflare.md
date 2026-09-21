# Panduan Implementasi Nuansa Omni-Platform (Dasbor Cloudflare)

Dokumen ini adalah **Tutorial Sekaligus Pelacak Progres (Tracker)** yang dirancang khusus untuk Anda yang mengeksekusi proyek ini langsung dari Dasbor Cloudflare (tanpa menggunakan `wrangler` CLI lokal).

Dokumen ini akan terus diperbarui seiring berjalannya proyek dan dapat digunakan sebagai blueprint teknis saat proyek 100% selesai.

---

## DAFTAR ISI & PROGRES
- `[x]` **TAHAP 1:** Setup Database D1 (Konsol Dasbor) - Selesai
- `[x]` **TAHAP 2:** Pembuatan & Deployment *Worker* `Nuansa Master` (API) - Sedang Berjalan
- `[ ]` **TAHAP 3:** Setup Cloudflare Zero Trust untuk Master
- `[ ]` **TAHAP 4:** Pembuatan & Deployment *Worker* `Nuansa Studio` (CMS)
- `[ ]` **TAHAP 5:** Integrasi Media Vault (R2)

---

## TAHAP 1: Setup Database D1 (Selesai)
Tabel D1 berhasil dieksekusi di dasbor Cloudflare.

---

## TAHAP 2: Deployment Worker "Nuansa Master" (Proses)
Setelah Database siap, kita perlu membuat aplikasi (Worker) yang mengelola pendaftaran *tenant*.

### Langkah Eksekusi (Di Dasbor Cloudflare):
1. Masuk ke **Workers & Pages** > **Overview**.
2. Klik **Create application** > **Create Worker**.
3. Beri nama *worker* (misal: `nuansa-master`), lalu klik **Deploy** (biarkan kode bawaan untuk sementara).
4. Setelah ter-deploy, masuk ke pengaturan Worker tersebut, lalu pilih tab **Settings** > **Bindings**.
5. Di bagian **D1 Database Bindings**, tambahkan *binding* baru:
   * **Variable name:** `DB`
   * **D1 Database:** (Pilih database `nuansa-master-db` yang dibuat di Tahap 1).

### Cara Mengunggah Kode (Pilih Salah Satu):

Karena aplikasi kita menggunakan TypeScript, NPM *packages* (Hono, Drizzle), dan struktur Monorepo, kode ini **TIDAK BISA** langsung diketik atau di-*copy-paste* secara mentah ke Web Editor Cloudflare. Kode harus di-kompilasi (*bundle*) menjadi 1 file JavaScript murni terlebih dahulu.

**Opsi A: Menggunakan GitHub (Sangat Disarankan)**
*   **Cara:** Anda menghubungkan repositori GitHub ke Cloudflare Pages/Workers.
*   **Keuntungan:** Otomatis. Setiap Anda klik "Save" atau "Commit" di komputer, Cloudflare akan otomatis mengompilasi dan meng-update *worker* Anda.

**Opsi B: Copy-Paste Manual (Tanpa GitHub / Tanpa Wrangler Deploy)**
*   **Cara:** Kita mengompilasi kodenya secara lokal di komputer Anda menggunakan alat bernama `esbuild`. Alat ini akan menyatukan seluruh file TypeScript, Hono, dan Drizzle menjadi satu file teks panjang (misal: `dist/index.js`).
*   **Eksekusi:** Anda membuka Web Editor (Quick Edit) di Dasbor Cloudflare, lalu meng-*copy-paste* seluruh isi file `dist/index.js` tersebut secara manual setiap kali ada pembaruan kode.
*   **Konsekuensi:** Agak merepotkan karena harus *copy-paste* berulang kali setiap ada fitur baru atau perbaikan *bug*.

