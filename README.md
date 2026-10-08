# Koperasi Konsumen Makmur Lestari Cikawung (KMLC) - Frontend

Repository ini berisi kode sumber untuk aplikasi *frontend* statis (Multi-Page Website) Koperasi Konsumen Makmur Lestari Cikawung (KMLC) yang berbasis di Kabupaten Indramayu.

Website ini dirancang untuk menyajikan company profile koperasi dengan standar UI/UX premium kelas korporasi menggunakan perpaduan palet warna hijau agrikultur dan gaya arsitektur antarmuka yang bersih.

## 🚀 Teknologi yang Digunakan

- **Framework**: [Vue 3](https://vuejs.org/) (Composition API)
- **Routing**: [Vue Router v4](https://router.vuejs.org/) (Multi-Page System)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Desain**: Vanilla CSS Modern (CSS Variables, Flexbox, Grid, Glassmorphism)
- **Tipografi**: Plus Jakarta Sans (Google Fonts)

## 📁 Struktur Direktori Utama

Proyek ini dibangun dengan struktur modern yang mendukung penggunaan komponen yang dapat digunakan ulang (*reusable components*):

```text
koperasi/
├── public/                 # Aset statis yang tidak diproses oleh Vite
│   └── assets/images/      # Gambar, logo, dll
├── src/
│   ├── components/         # Komponen utama halaman
│   │   ├── ui/             # Komponen kecil reusable (misal: BaseCard.vue)
│   │   ├── Navbar.vue      # Navigasi utama
│   │   └── Footer.vue      # Footer website
│   ├── views/              # Halaman / Halaman Routing
│   │   ├── HomeView.vue    # Halaman Beranda
│   │   ├── AboutView.vue   # Halaman Tentang Kami
│   │   └── ProgramView.vue # Halaman Program Layanan
│   ├── router/
│   │   └── index.js        # Konfigurasi Vue Router
│   ├── App.vue             # Komponen Utama (Root)
│   ├── main.js             # Entry point Vue App
│   └── style.css           # Global Styling & Design System
├── index.html              # Entry HTML
└── package.json            # Dependensi proyek
```

## 🛠️ Instalasi & Menjalankan Proyek

Ikuti langkah-langkah di bawah ini untuk menjalankan proyek secara lokal di mesin Anda.

### 1. Instalasi Dependensi
Pastikan Anda sudah menginstal [Node.js](https://nodejs.org/). Kemudian, jalankan perintah berikut di dalam folder proyek:

```bash
npm install
```

### 2. Menjalankan Mode Development
Untuk melihat website secara lokal dengan fitur *Hot-Module Replacement* (HMR):

```bash
npm run dev
```
Setelah itu, buka `http://localhost:5173/` di browser Anda.

### 3. Membangun untuk Production (Build)
Jika Anda ingin men-deploy website ini ke layanan hosting (seperti Vercel, Netlify, atau cPanel/XAMPP server):

```bash
npm run build
```
Hasil kompilasi file statis akan berada di dalam folder `dist/`.

## 🤝 Pengembangan
Jika ada perubahan *styling* global, silakan akses dan ubah nilai variabel warna atau spasi di dalam `src/style.css`.
Komponen yang ditujukan untuk *reuse* sebaiknya dimasukkan ke dalam `src/components/ui/` agar mempermudah pemeliharaan skala besar.
