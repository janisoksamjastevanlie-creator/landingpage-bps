# DEVELOPMENT.md — Panduan Pengembangan Landing Page BPS Minut

Landing page **BPS Kabupaten Minahasa Tenggara** dibangun dari nol pada 24 Oktober 2026.
Dokumen ini merangkum arsitektur, workflow, dan pelajaran penting (termasuk cara
mengatasi error yang sudah pernah terjadi) agar pengembangan berikutnya cepat dan
tidak perlu mengulang troubleshooting yang sama.

---

## 1. Teknologi

| Item | Nilai |
|---|---|
| Framework | Next.js 16.4.3 (App Router + Turbopack, Cache Components aktif) |
| React | 19.3.0 |
| Styling | Tailwind CSS v4 (via `@tailwindcss/turbopack`) |
| TypeScript | 5 |
| Bahasa konten | Indonesia |
| Hosting | Vercel (team **oksam**, Hobby plan) |
| Git | GitHub `janisoksamjastevanlie-creator/landingpage-bps`, branch `main` |

**Tema warna (khas BPS):**
- Biru utama: `blue-900` / `blue-800` / `blue-600` (navbar, hero, footer)
- Aksen: `amber-400` (badge, CTA, ikon logo lingkaran "BPS")
- Section terang: `gray-50` / `gray-100` + kartu putih ring `gray-200`

---

## 2. Struktur Proyek

```
app/
├── layout.tsx            → metadata (title BPS Minut), lang="id", font Geist
├── page.tsx              → merakit semua section (Navbar → Kontak)
├── globals.css           → Tailwind 4, theme inline
└── components/
    ├── Navbar.tsx        → sticky navbar + anchor menu (Beranda/Tentang/Indikator/Layanan/Kontak)
    ├── Hero.tsx          → tagline "Sumber Data Andalan Indonesia" + CTA
    ├── Tentang.tsx       → deskripsi lembaga
    ├── Indikator.tsx     → 4 kartu indikator (IPM, Penduduk, Pertumbuhan Ekonomi, PDRB) — masih data contoh!
    ├── Layanan.tsx       → 4 kartu layanan/publikasi
    ├── Kontak.tsx        → alamat, telepon, email, jam layanan — masih placeholder!
    └── Footer.tsx        → copyright (tahun HARDCODE, lihat catatan §5.1)
vercel.json               → { "framework": "nextjs" } — JANGAN DIHAPUS (lihat §5.2)
```

## 3. Perintah Sehari-hari

```bash
npm run dev          # dev server → http://localhost:3000
npm run build        # verifikasi build production secara lokal (WAJIB sebelum deploy)
npm run lint         # eslint
npm run start        # jalankan hasil build production lokal
```

### Workflow Git + Deploy

Git sudah ter-link ke Vercel: setiap `git push` ke `main` = deploy production otomatis.

```bash
git add -A
git commit -m "..."
git push            # Vercel otomatis build & route ke production
```

Git identity (sudah diset global): `janisoksamjastevanlie-creator` /
`janisoksamjastevanlie@gmail.com`.

## 4. Vercel — URL & Status

| Keperluan | Nilai / Perintah |
|---|---|
| URL produksi utama | https://landingpage-bps-tau.vercel.app |
| Domain custom | https://ld.bmnbpsminut.online (DNS sudah mengarah ke Vercel) |
| Dashboard | https://vercel.com/oksam/landingpage-bps |
| CLI login status | `npx vercel whoami` (token tersimpan di `%APPDATA%\com.vercel.cli\Data\auth.json`) |
| Deploy manual via CLI | `npx --yes vercel deploy --prod --yes` |
| Inspect deployment | `npx vercel inspect <url>` / `npx vercel logs --deployment <url>` |
| REST API (pakai token auth.json) | `GET https://api.vercel.com/v9/projects/landingpage-bps?slug=oksam` |

## 5. Kamus Troubleshooting (kasus yang SUDAH pernah terjadi)

### 5.1 Build gagal: "unstable value `new Date()` while prerendering"

- **Gejala:** `next build` / deploy Vercel gagal padahal dev normal.
  Next.js 16 memakai Cache Components; nilai berubah-ubah (`new Date()`)
  tidak boleh ikut static prerender.
- **Fix yang dipakai:** tahun footer di-*hardcode* `© 2026 ...`
  di `app/components/Footer.tsx`.
- **Prinsip:** tidak boleh ada `new Date()`, `Date.now()`, `Math.random()`
  di komponen yang ikut prerender (semua section sekarang full static).
  Kalau butuh data dinamis, bungkus dengan `"use client"` atau
  `await connection()`.

### 5.2 Semua URL produksi 404 `X-Vercel-Error: NOT_FOUND` padahal build READY

- **Gejala:** deployment `READY` & `PROMOTED`, alias terpasang, runtime log
  0 request, semua host (termasuk url deployment langsung) → 404.
- **Akar:** Framework Preset proyek = **"Other"** (`framework: null`) —
  Vercel tidak membuat *routing manifest* → semua route 404.
  (Referensi KB Vercel: "Why is my deployed project giving a 404?")
- **Fix yang dipakai:**
  1. Set Framework Preset = **Next.js** (via dashboard atau API:
     `PATCH /v9/projects/{id}` body `{"framework":"nextjs"}`).
  2. Tambahkan `vercel.json` berisi `{"framework":"nextjs"}` di repo agar
     tidak berubah lagi.
  3. Redeploy → langsung hidup.
- **Cara cek cepat:** `npx vercel inspect <url>` lalu body API
  `/v9/projects/landingpage-bps?slug=oksam` — field `framework`.
- **Aturan:** JANGAN hapus `vercel.json`; jika deploy via CLI tanpa
  preset, framework bisa kembali ke "Other".

### 5.3 Buka URL → 404 tetapi build sukses dan tidak ada error build

Kerangka diagnosis yang terbukti efektif (urut):
1. **HTTP code + header:** `curl.exe -s -D - -o NUL <url>` → baca
   `x-vercel-error`. `NOT_FOUND` (bukan `DEPLOYMENT_NOT_FOUND`).
2. **`vercel inspect <deployment-url>`** → cek `status READY`, `aliases`.
3. **Cek proteksi** → `Settings → Deployment Protection` / field
   `ssoProtection` di API. Kalau aktif, pengunjung non-login
   ditolak (redirect SSO / 404). Untuk landing page publik, matikan
   Standard Protection untuk production.
4. **Cek `framework`** proyek (seruan §5.2).
5. **Cek runtime logs**: `npx vercel logs --deployment <url>` — kalau
   0 records, request tidak pernah sampai ke aplikasi (masalahnya di
   routing, bukan kode).
6. **Bandikan** dengan situs Vercel lain (misal https://swr-site.vercel.app)
   untuk melihat jika masalahnya jaringan lokal, bukan akun/proyek.

### 5.4 Deployment Protection / SSO

- Security default team baru: SSO protection aktif untuk semua domain
  KECUALI custom domain (`all_except_custom_domains`).
- Untuk halaman publik: matikan untuk production di
  `https://vercel.com/oksam/landingpage-bps/settings/deployment-protection`.

### 5.5 Domain custom `ld.bmnbpsminut.online`

- Domain sudah terregistrasi di proyek `landingpage-bps`.
- DNS harap mengikuti instruksi di dashboard (`vercel domains inspect`):
  A record untuk apex / CNAME `cname.vercel-dns.com` untuk subdomain
  (atau IP A 216.198.79.195 / 64.29.17.195).
- Gejala DNS belum lengkap: `curl` = `000` / `Resolve-DnsName` kosong.

## 6. Hal yang MASIH MATI-DATA (TODO berikutnya)

- [ ] **Angka indikator asli** — `app/components/Indikator.tsx` masih
      **data contoh**; isi dari publikasi resmi:
      https://minutkab.bps.go.id/id/statistics/ (IPM, PDRB, dll)
- [ ] **Kontak resmi** — `app/components/Kontak.tsx` masih placeholder
      (telepon XXX, alamat mungkin perlu dicek).
- [ ] Logo BPS asli (sekarang badge lingkaran "BPS" di `Navbar.tsx` & font).
- [ ] Sosial media asli (@bpsminut dsb).
- [ ] Opsional: favicon sendiri, SEO OpenGraph, analytics.
- [ ] Opsional: hapus proyek debug `bps-minut-landing` di Vercel.

## 7. Konteks Lingkungan Mesin Pengembang

- Windows, Node.js 24 (LTF), npm 11.
- XAMPP di `C:\xampp\htdocs` — repo ini tidak butuh Apache, dev server
  bawaan Next.js.
- Vercel CLI: selalu panggil `npx --yes vercel ...` (tidak terinstall global).
