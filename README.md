# Nuansa Omni-Platform

Selamat datang di repositori resmi **Nuansa Omni-Platform**.

Sistem Operasi Web, Konten, & Aplikasi Berbasis Cloudflare Edge yang memungkinkan skalabilitas tak terbatas tanpa server terpusat.

## Arsitektur Utama
- **Nuansa Master:** Pusat manajemen pendaftaran dan *billing* SaaS (`apps/master`).
- **Nuansa Studio:** Ruang kerja klien/Tenant (`apps/studio`).
- **Pustaka Database:** Drizzle ORM dengan konektor D1 (`packages/db`).
- **Pustaka UI:** Komponen desain dengan Tailwind CSS (`packages/ui`).

## Status Proyek
- [x] Inisialisasi Monorepo
- [x] Setup Cloudflare D1
- [x] Deployment Pipeline (GitHub Actions)
- [ ] Implementasi Zero Trust Master
- [ ] CMS Studio Builder
