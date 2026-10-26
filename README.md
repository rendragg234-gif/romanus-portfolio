# Romanus Marendra Desta — Personal Portfolio

Website portfolio personal untuk **Romanus Marendra Desta**, Junior Web Developer dan siswa SMK
jurusan Rekayasa Perangkat Lunak (RPL). Website ini menampilkan identitas, keahlian, pengalaman
PKL, proyek, sertifikat, dan formulir kontak dalam satu halaman modern dengan tema gelap.

> **Catatan integritas:** seluruh data yang tampil berasal dari file konfigurasi. Entri yang belum
> Anda isi (foto, CV, proyek, sertifikat, link sosial) ditandai sebagai **placeholder** atau
> disembunyikan otomatis — tidak ada tautan maupun klaim palsu.

---

## Daftar Isi

1. [Teknologi](#teknologi)
2. [Struktur Project](#struktur-project)
3. [Persyaratan & Instalasi](#persyaratan--instalasi)
4. [Menjalankan Secara Lokal](#menjalankan-secara-lokal)
5. [Perintah Tersedia](#perintah-tersedia)
6. [Mengganti Data (Foto, CV, Profil, Sosial)](#mengganti-data)
7. [Mengganti Skills, Pengalaman, Proyek & Sertifikat](#mengganti-skills-pengalaman-proyek--sertifikat)
8. [Konfigurasi Form Kontak](#konfigurasi-form-kontak)
9. [Environment Variables](#environment-variables)
10. [Build Production](#build-production)
11. [Deployment](#deployment)
12. [SEO & Meta](#seo--meta)
13. [Troubleshooting](#troubleshooting)

---

## Teknologi

| Bagian        | Teknologi                                        |
| ------------- | ------------------------------------------------ |
| Framework UI  | React 19                                         |
| Bahasa        | TypeScript 5.7 (strict)                          |
| Build tool    | Vite 6                                           |
| Styling       | Tailwind CSS 4 (`@tailwindcss/vite`)             |
| Ikon          | `lucide-react`                                   |
| Routing       | Tidak ada (single page + smooth scroll)          |
| Backend       | Tidak ada — murni frontend statis                |
| Linting       | ESLint 9 + `typescript-eslint` + React Hooks     |
| Testing       | Smoke test headless via Chrome DevTools Protocol |

**Keputusan arsitektur:**

- Tidak ada backend. Seluruh kebutuhan diselesaikan oleh frontend statis.
- Form kontak memakai **endpoint pihak ketiga** (Formspree/Web3Forms/dll.) atau fallback
  `mailto:`. Lihat [Konfigurasi Form Kontak](#konfigurasi-form-kontak).
- Data profil, skills, pengalaman, proyek, dan sertifikat disimpan di `src/config/` —
  bukan di dalam komponen.

---

## Struktur Project

```
romanus-portfolio/
├── public/
│   ├── 404.html                    # Halaman 404 kustom
│   ├── _redirects                  # Aturan redirect Netlify
│   ├── favicon.svg                 # Favicon inisial RM
│   ├── og-image.png                # Gambar Open Graph (1200x630)
│   ├── robots.txt
│   ├── sitemap.xml
│   ├── cv/
│   │   └── cv.pdf                  # ⚠️ CV placeholder — GANTI DENGAN CV ASLI
│   └── images/
│       ├── profile.webp              # Foto profil (WebP, 4:5)
│       ├── projects/                 # ⚠️ Screenshot placeholder proyek
│       └── certificates/             # ⚠️ Thumbnail placeholder sertifikat
├── scripts/
│   ├── generate-og-image.ps1         # Membuat ulang og-image.png
│   ├── generate-placeholder-cv.mjs   # Membuat ulang cv.pdf placeholder
│   ├── process-photo.mjs             # Foto asli → WebP (rasio 4:5)
│   ├── screenshot.mjs                # Screenshot full-page via CDP
│   ├── probe-layout.mjs              # Cek overflow layout headless
│   └── smoke-test.mjs                # Smoke test headless
├── src/
│   ├── components/
│   │   ├── layout/                 # Navbar, Footer, BackToTop, SkipLink
│   │   └── ui/                     # SectionHeading, Modal, Badge, ThemeToggle, SocialIcon
│   ├── config/                     # ⭐ SEMUA DATA DIEDIT DI SINI
│   │   ├── types.ts
│   │   ├── site.ts                 # Navigasi, SEO, endpoint form
│   │   ├── profile.ts              # Identitas, pendidikan, PKL, kontak, sosial
│   │   ├── skills.ts
│   │   ├── experience.ts
│   │   ├── projects.ts
│   │   └── certificates.ts
│   ├── hooks/                      # theme-context, useReveal, useActiveSection
│   ├── lib/                        # cn, clipboard, navigation, validation
│   ├── sections/                   # Hero, About, Skills, Experience, Projects, Certificates, Contact
│   ├── App.tsx
│   ├── index.css                   # Token warna & komponen global
│   └── main.tsx
├── eslint.config.js
├── index.html                      # Meta SEO + anti-flash script tema
├── netlify.toml
├── vercel.json
├── vite.config.ts
└── package.json
```

---

## Persyaratan & Instalasi

- **Node.js** 20 atau lebih baru (dikembangkan dengan Node 24).
- **npm** 10 atau lebih baru.

```bash
# 1. Masuk ke folder project
cd romanus-portfolio

# 2. Install dependency
npm install

# 3. (Opsional) salin environment variables
copy .env.example .env.local
```

> Catatan untuk Windows: bila npm menampilkan peringatan
> `install-scripts ... esbuild`, jalankan `npm install-scripts approve esbuild`
> lalu `npm install` ulang.

---

## Menjalankan Secara Lokal

```bash
npm run dev
```

Buka <http://localhost:5173>.

Preview hasil build produksi:

```bash
npm run build
npm run preview
```

Buka <http://localhost:4173>.

---

## Perintah Tersedia

| Perintah             | Fungsi                                              |
| -------------------- | --------------------------------------------------- |
| `npm run dev`        | Server development (HMR)                            |
| `npm run build`      | Typecheck TypeScript + build ke `dist/`             |
| `npm run preview`    | Preview hasil build di `dist/`                      |
| `npm run typecheck`  | Cek tipe TypeScript saja                            |
| `npm run lint`       | ESLint dengan `--max-warnings 0`                    |
| `npm run smoke`      | Smoke test headless (butuh preview berjalan)        |
| `npm run screenshot` | Screenshot full-page via CDP (butuh preview)        |
| `npm run photo -- <file>` | Proses foto asli menjadi WebP untuk profil    |
| `npm run generate:og`| Regenerasi `public/og-image.png` (Windows)          |
| `npm run generate:cv`| Regenerasi `public/cv/cv.pdf` placeholder           |

Cara menjalankan smoke test:

```bash
# Terminal 1
npm run preview
# Terminal 2
npm run smoke -- http://localhost:4173/
```

---

## Mengganti Data

### 1. Foto profil

Sudah terpasang foto asli di `public/images/profile.webp` (rasio 4:5, 560×700, ±14 kB).

Untuk mengganti dengan foto lain:

```bash
npm run photo -- "C:\path\ke\foto-anda.jpg" --width=1120 --quality=82
```

Opsional bila ingin crop manual (format `x,y,w,h`):

```bash
npm run photo -- "C:\path\ke\foto.jpg" --crop=0,60,560,700
```

Tanpa `--crop`, alat ini mengambil rasio 4:5 secara otomatis dengan subjek sebagai pusat
perhatian. Hasil selalu ditulis ke `public/images/profile.webp`. Perbarui `avatar` dan
`avatarAlt` di `src/config/profile.ts` bila nama file atau path-nya berbeda.

### 2. CV

1. Siapkan file PDF CV Anda.
2. Letakkan di `public/cv/cv.pdf` (**timpa** file placeholder).
3. Jika nama filenya berbeda, ubah `cvUrl` di `src/config/profile.ts`:

```ts
cvUrl: './cv/cv.pdf',
```

Tombol **Download CV** di navbar, hero, dan mobile menu otomatis mengikuti nilai ini.

### 3. Identitas & pendidikan

Semuanya di `src/config/profile.ts`:

```ts
fullName, firstName, lastName, initials, role, tagline, greeting, intro,
about: string[],          // paragraf About Me
status: { enabled, label } // badge "Open to Opportunities"
education: { school, major, entryYear, expectedGraduation }
internship: { company, period, start, end, location }
interests, languages
```

- Ubah `status.enabled` menjadi `false` untuk menyembunyikan badge di hero.
- Ubah teks `status.label` untuk mengganti label badge.

### 4. Email & media sosial

Di `src/config/profile.ts`:

```ts
contact: {
  email: 'romanusdesta69@gmail.com',          // ✅ sudah terisi
},
socials: [
  { platform: 'github',   url: 'https://github.com/rendragg234-gif', label: '@rendragg234-gif' }, // ✅
  { platform: 'linkedin', url: '', label: 'Romanus Marendra Desta' },  // '' = disembunyikan
  { platform: 'whatsapp', url: '', label: '+62 xxx xxxx xxxx' },        // '' = disembunyikan
  { platform: 'instagram', url: '', label: '@username' },               // '' = disembunyikan
],
```

**Perilaku otomatis:**

- `url: ''` → tautan **disembunyikan** dari footer, section Contact, dan kartu kontak.
  Tidak ada tombol yang mengarah ke tujuan palsu.
- Bila semua `url` masih kosong, section Contact menampilkan petunjuk pengisian config.
- `platform` yang didukung: `github`, `linkedin`, `whatsapp`, `instagram`, `twitter`,
  `discord`, `website`.

> ✅ Email (`romanusdesta69@gmail.com`) dan GitHub (`github.com/rendragg234-gif`) sudah terisi
> di `src/config/profile.ts`. LinkedIn, WhatsApp, dan Instagram masih `''` sehingga tombolnya
> otomatis disembunyikan sampai Anda isi.

### 5. Navigasi

Menu navbar dan footer dibaca dari `navItems` di `src/config/site.ts`.
Jika Anda menambah/menghapus section, sinkronkan array ini **dan** `id` pada `<section>`
di folder `src/sections/`.

---

## Mengganti Skills, Pengalaman, Proyek & Sertifikat

### Skills — `src/config/skills.ts`

```ts
{ name: 'React', short: 'RE', level: 'dikuasai' }     // sudah dipakai
{ name: 'Next.js', short: 'NX', level: 'dipelajari' } // masih dipelajari
```

`level` hanya boleh `'dikuasai'` atau `'dipelajari'`. **Tidak ada persentase** karena
angka persentase tanpa dasar akan menyesatkan perekrut. Tambah/kurangi kategori dengan
menambah/menghapus objek di array.

### Pengalaman — `src/config/experience.ts`

Salin satu blok objek untuk menambah pengalaman baru:

```ts
{
  id: 'unik',
  role: '...',
  company: '...',
  period: 'Januari 2026 – Juni 2026',
  location: 'Kota',
  summary: '...',
  highlights: ['...', '...'],
  technologies: ['...'],
}
```

Setel `upcomingExperienceSlot.enabled = false` untuk menyembunyikan kartu "Pengalaman lainnya
menyusul".

### Proyek — `src/config/projects.ts`

```ts
{
  id: 'proyek-saya',
  title: 'Judul Proyek',
  description: 'Deskripsi singkat.',
  category: 'frontend' | 'backend' | 'fullstack' | 'web',
  image: './images/projects/saya.webp',
  imageAlt: 'Deskripsi screenshot untuk screen reader',
  technologies: ['React', 'Laravel'],
  demoUrl: 'https://demo-anda.com',   // '' = tombol disembunyikan
  repoUrl: 'https://github.com/and/repo', // '' = tombol disembunyikan
  isPlaceholder: false,
}
```

Langkah menambah proyek:

1. Taruh screenshot di `public/images/projects/` (disarankan WebP, rasio 16:10, lebar 1600px).
2. Tambahkan objek baru di array `projects`.
3. Isi `demoUrl`/`repoUrl` hanya dengan URL yang benar-benar valid; biarkan `''` bila belum ada.
4. Set `isPlaceholder: false` setelah proyek benar-benar milik Anda dan sudah selesai.

Filter kategori otomatis: kategori yang tidak dipakai proyek mana pun tidak akan ditampilkan
tombolnya.

### Sertifikat — `src/config/certificates.ts`

```ts
{
  id: 'sertifikat-1',
  name: 'Nama Sertifikat',
  issuer: 'Penerbit',
  issuedAt: '2026-03',            // format YYYY-MM
  description: 'Deskripsi singkat.',
  image: './images/certificates/saya.webp',
  imageAlt: 'Deskripsi gambar sertifikat',
  credentialUrl: 'https://link-sertifikat', // '' = tombol disembunyikan
  isPlaceholder: false,
}
```

Saat hanya berisi placeholder, section menampilkan peringatan agar Anda menggantinya.
Klik kartu untuk membuka **modal preview** (tutup dengan tombol ✕, klik backdrop, atau `Esc`).

---

## Konfigurasi Form Kontak

Form kontak punya dua mode.

### Mode A — Endpoint form (disarankan untuk produksi)

Set environment variable `VITE_CONTACT_ENDPOINT` ke URL layanan yang menerima `POST`
dengan `Content-Type: application/json` dan membalas status non-2xx bila gagal.

Contoh **Formspree**:

1. Daftar di <https://formspree.io>, buat form.
2. Salin endpoint, misal `https://formspree.io/f/abcdwxyz`.
3. Isi `.env.local`:

```env
VITE_CONTACT_ENDPOINT=https://formspree.io/f/abcdwxyz
```

Contoh **Web3Forms**:

```env
VITE_CONTACT_ENDPOINT=https://api.web3forms.com/submit
```

> Web3Forms membutuhkan `access_key` di body. Karena itu, modifikasi `handleSubmit` di
> `src/sections/Contact.tsx` untuk menambahkan `access_key: '...'` (baca dari
> `VITE_WEB3FORMS_KEY`) ke objek `body`.

**Jika endpoint mengembalikan status error**, form menampilkan pesan **gagal** —
tidak pernah menampilkan notifikasi sukses palsu.

### Mode B — Fallback mailto (tanpa konfigurasi apa pun)

Bila `VITE_CONTACT_ENDPOINT` kosong, tombol kirim akan membuka aplikasi email pengunjung
dengan subjek dan isi yang sudah terisi, lalu menampilkan pesan informatif
(bukan "sukses"). Alamat tujuan diambil dari `profile.contact.email`.

### Proteksi bawaan

- Validasi sisi klien (nama, email, pesan) + pesan `role="alert"`.
- Honeypot field anti-bot.
- Jeda minimal antar pengiriman (`contactForm.minSubmitIntervalMs`).
- Status pengiriman dengan `aria-live="polite"`.

---

## Environment Variables

Salin `.env.example` menjadi `.env.local`:

```env
VITE_CONTACT_ENDPOINT=
VITE_SITE_URL=https://example.com/
```

| Variabel                | Wajib | Keterangan                                              |
| ----------------------- | ----- | ------------------------------------------------------- |
| `VITE_CONTACT_ENDPOINT` | Tidak | URL endpoint form kontak. Kosong = fallback `mailto:`.  |
| `VITE_SITE_URL`         | Tidak | URL produksi, dipakai untuk metadata SEO.               |

Aturan:

- Semua variabel **wajib** diawali `VITE_` agar masuk ke bundle klien — **jangan pernah**
  menyimpan rahasia (API key privat, token) di sini.
- File `.env` dan `.env.*` sudah masuk `.gitignore`; hanya `.env.example` yang di-commit.

Untuk deployment, set variabel yang sama di dashboard hosting
(Vercel: *Project → Settings → Environment Variables*).

---

## Build Production

```bash
npm run typecheck   # opsional, cek tipe
npm run lint        # opsional, cek kode
npm run build       # menghasilkan folder dist/
```

Output:

```
dist/
├── index.html
├── 404.html
├── favicon.svg
├── og-image.png
├── robots.txt
├── sitemap.xml
├── _redirects
├── assets/*.js, *.css
├── cv/cv.pdf
└── images/...
```

Verifikasi lokal:

```bash
npm run preview
npm run smoke -- http://localhost:4173/
```

**Checklist sebelum deploy:**

- [x] `profile.contact.email` sudah email asli.
- [ ] Foto profil, CV, screenshot proyek, thumbnail sertifikat sudah diganti.
- [ ] `demoUrl` / `repoUrl` / `credentialUrl` hanya berisi URL valid.
- [ ] Entri `isPlaceholder: true` sudah diubah atau dihapus.
- [ ] `index.html`: `canonical`, `og:url`, `og:image` sudah memakai URL produksi.
- [ ] `public/robots.txt` dan `public/sitemap.xml` sudah memakai URL produksi.
- [ ] `VITE_CONTACT_ENDPOINT` sudah diisi (jika memakai Mode A).
- [ ] `npm run build`, `npm run lint`, dan `npm run smoke` lulus.

---

## Deployment

Website adalah **frontend statis**. Hosting apa pun yang mendukung static site bisa dipakai.

> ⚠️ Belum ada deployment yang dilakukan dari lingkungan ini karena CLI hosting
> (`vercel`/`netlify`/`wrangler`) tidak terpasang dan tidak ada sesi autentikasi akun.
> Ikuti langkah di bawah untuk deploy sendiri.

### Opsi 1 — Vercel (direkomendasikan)

**Lewat CLI:**

```bash
npm install -g vercel        # atau gunakan: npx vercel
vercel login                # login resmi via browser — JANGAN tempelkan token ke source code
vercel                      # preview deployment
vercel --prod               # produksi → menghasilkan URL publik *.vercel.app
```

Konfigurasi sudah tersedia di `vercel.json`
(`buildCommand`, `outputDirectory: dist`, security headers, cache asset).

**Lewat Git:**

1. Push repository ke GitHub.
2. Buka <https://vercel.com/new> → import repository.
3. Framework preset: **Other**; Build Command: `npm run build`; Output: `dist`.
4. Tambahkan `VITE_CONTACT_ENDPOINT` di *Settings → Environment Variables* bila perlu.
5. Klik **Deploy**. URL publik: `https://<nama-project>.vercel.app`.

### Opsi 2 — Cloudflare Pages

1. Push repository ke GitHub.
2. Dashboard Cloudflare → *Workers & Pages → Create → Pages → Connect to Git*.
3. Build command: `npm run build`; output directory: `dist`.
4. Deploy. URL publik: `https://<nama-project>.pages.dev`.

CLI:

```bash
npx wrangler login
npx wrangler pages deploy dist --project-name=roman-portfolio
```

### Opsi 3 — Netlify

Konfigurasi sudah tersedia di `netlify.toml`.

```bash
npm install -g netlify-cli
netlify login
netlify init
netlify deploy --prod --dir=dist
```

Atau lewat Git: import repository → build `npm run build` → publish directory `dist`.

### Opsi 4 — XAMPP / hosting cPanel biasa

```bash
npm run build
```

Salin **seluruh isi** folder `dist/` ke `htdocs/romanus-portfolio/` (atau ke `public_html/`).
Buka <http://localhost/romanus-portfolio/> di browser.

### Setelah deploy

1. Buka URL publik yang dihasilkan platform.
2. Ganti `https://example.com/` dengan URL asli di:
   - `index.html` (`canonical`, `og:url`)
   - `public/robots.txt` (`Sitemap`)
   - `public/sitemap.xml` (`<loc>`)
   - `src/config/site.ts` (`url`)
3. Deploy ulang agar perubahan terbawa.
4. Cek:
   - <https://validator.w3.org/nu/> untuk validasi HTML.
   - <https://cards-dev.twitter.com/validator> / <https://developers.facebook.com/tools/debug>
     untuk Open Graph.
   - <https://pagespeed.web.dev/> untuk performa & aksesibilitas.

---

## SEO & Meta

`index.html` sudah berisi:

- `<title>`, `meta description`, `meta keywords`, `author`
- Open Graph (`og:title`, `og:description`, `og:image`, `og:url`, `og:locale`)
- Twitter Card (`summary_large_image`)
- `theme-color` untuk mode gelap & terang
- Favicon SVG inisial **RM**
- Anti-flash tema (script inline sebelum paint)
- `lang="id"`

Konten tambahan di `public/`: `robots.txt`, `sitemap.xml`, `404.html`.

---

## Troubleshooting

| Gejala | Solusi |
| --- | --- |
| `Cannot find module 'vite'` setelah clone | Jalankan `npm install`. |
| Build gagal: `esbuild: command failed` | Jalankan `npm install-scripts approve esbuild`, lalu `npm install` ulang. |
| Peringatan `MODULE_TYPELESS_PACKAGE_JSON` | Pastikan `"type": "module"` ada di `package.json`. |
| Gambar tidak muncul | Pastikan file ada di `public/` (bukan `src/`) dan path di config diawali `./`. |
| Tombol CV tidak mengunduh apa pun | Isi `cvUrl` di `src/config/profile.ts` dan pastikan filenya ada di `public/cv/`. |
| Form kontak tidak mengirim | Cek `VITE_CONTACT_ENDPOINT`; lihat log browser (tab Network). Bila kosong, mode `mailto:` aktif. |
| Tampilan terang menyatu dengan konten | Bersihkan cache; pastikan class `dark` ada di `<html>`. Preferensi tersimpan di `localStorage` key `rm-theme`. |
| Ada error "horizontal overflow" | Cari elemen dengan `width` tetap; seluruh layout memakai `container-x` + grid/flex. |
| Deploy ke sub-folder (mis. `/portfolio/`) | `vite.config.ts` memakai `base: './'` sehingga path relatif otomatis menyesuaikan. |
| Smoke test gagal | Pastikan `npm run preview` berjalan di port 4173 dan Edge/Chrome terpasang. |
| `404.html` tidak muncul di host tertentu | Beberapa host hanya membaca `404.html` dari root publish directory. Pastikan file ikut ter-deploy. |

---

## Lisensi

Dibuat untuk keperluan pribadi Romanus Marendra Desta.
