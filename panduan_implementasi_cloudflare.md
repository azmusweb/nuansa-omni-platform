# Panduan Implementasi Nuansa Network (Dasbor Cloudflare)

Dokumen ini adalah **Tutorial Sekaligus Pelacak Progres (Tracker)** yang dirancang khusus untuk Anda yang mengeksekusi proyek ini langsung dari Dasbor Cloudflare (tanpa menggunakan `wrangler` CLI lokal).

Dokumen ini akan terus diperbarui seiring berjalannya proyek dan dapat digunakan sebagai blueprint teknis saat proyek 100% selesai.

---

## DAFTAR ISI & PROGRES
- `[x]` **TAHAP 1:** Setup Database D1 (Konsol Dasbor) - Selesai
- `[x]` **TAHAP 2:** Pembuatan & Deployment *Worker* `Nuansa Master` (API) - Selesai
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

---

## TAHAP 3: Setup Cloudflare Zero Trust untuk Master

Aplikasi "Nuansa Master" adalah otak dari seluruh platform Anda. Di sinilah penyewa (*tenant*) baru dibuat, dan database diatur. Karenanya, aplikasi ini **TIDAK BOLEH** bisa diakses oleh publik (hanya Anda sebagai pemilik yang boleh mengaksesnya).

Kita akan menggunakan **Cloudflare Zero Trust (Access)** untuk mengunci aplikasi ini dengan PIN/OTP yang dikirimkan ke email Anda, tanpa perlu membuat halaman "Form Login" dan mengelola kata sandi.

### Langkah Eksekusi (Di Dasbor Cloudflare):
1. Kembali ke Beranda Dasbor Cloudflare, cari menu **Zero Trust** (berada di panel sebelah kiri, memiliki logo tameng/perisai).
2. Jika ini pertama kali Anda membukanya, ikuti proses pendaftaran gratisnya (pilih paket *Free*). Anda mungkin akan diminta memasukkan nama tim (misal: `nuansa-admin`).
3. Setelah masuk ke Dasbor Zero Trust, buka menu **Access** > **Applications** di panel sebelah kiri.
4. Klik tombol biru **Add an application**.
5. Pilih tipe **Self-hosted**.
6. Konfigurasi Aplikasi:
   * **Application name:** `Admin Nuansa Master`
   * **Session Duration:** `24 hours`
   * **Application domain:** Di sinilah Anda memasukkan URL/Domain *Worker* Anda. Jika *Worker* Anda bernama `nuansa-master`, domainnya biasanya adalah `nuansa-master.<nama-anda>.workers.dev`.
   * Klik **Next**.
7. Konfigurasi Kebijakan (*Policy*):
   * **Policy name:** `Hanya Saya`
   * **Action:** `Allow`
   * **Assign a group:** (Biarkan kosong)
   * Di bagian **Include**, pilih **Selector** menjadi `Emails`, lalu masukkan **alamat email pribadi Anda** (contoh: `admin@domain.com`).
   * Klik **Next**.
8. Konfigurasi Lanjutan (Setup Identity):
   * *Scroll* terus ke bawah tanpa mengubah apa pun, lalu klik **Add application**.

### Hasil Tahap 3
Sekarang, jika ada orang yang mencoba membuka URL *Worker* Anda (misalnya `nuansa-master.<nama-anda>.workers.dev`), mereka tidak akan melihat apa pun kecuali halaman Cloudflare Access putih yang meminta mereka memasukkan alamat email untuk dikirimi kode rahasia. Hanya email Anda yang diizinkan untuk menerima kode tersebut!
