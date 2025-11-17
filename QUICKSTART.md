# 🚀 Quick Start - Sistem Skrining TBC Geospasial

## Instalasi Cepat

```bash
# Install dependencies
npm install

# Jalankan development server
npm run dev

# Buka browser di http://localhost:3000
```

## 🔐 Login Demo

Gunakan salah satu akun berikut:

| Username | Password | Role |
|----------|----------|------|
| `admin@demo` | `demo123` | Admin Provinsi |
| `puskesmas@demo` | `demo123` | Admin Puskesmas |
| `petugas@demo` | `demo123` | Petugas Lapangan |
| `kader@demo` | `demo123` | Kader |

**ATAU** klik tombol **"Masuk sebagai Demo"** dan pilih role yang diinginkan.

## 📱 Fitur Utama

### 1. Dashboard
- Statistik real-time kasus TBC
- Grafik tren dan distribusi
- Capaian skrining

### 2. Peta Geospasial
- Visualisasi persebaran kasus TBC
- Heatmap zona risiko
- Deteksi klaster penularan
- Layer: Kasus, Heatmap, Klaster, Rumah Tangga

### 3. Skrining TBC
- Form skrining digital
- Skrining kontak erat
- Skrining komunitas
- Skrining massal

### 4. Manajemen Kasus
- Registry lengkap kasus TBC
- Tracking RO/RR (Resisten Obat)
- Riwayat pengobatan

### 5. Pemantauan Rumah Tangga
- Survey kondisi rumah
- Skoring risiko otomatis
- Identifikasi faktor risiko

### 6. Analisis Risiko
- Indeks risiko per wilayah
- Prioritas intervensi
- Rekomendasi tindak lanjut

### 7. Kegiatan Lapangan
- Check-in GPS
- Dokumentasi kegiatan
- Tracking aktivitas petugas

## 🛠️ Commands

```bash
# Development
npm run dev          # Start dev server

# Production
npm run build        # Build untuk production
npm run preview      # Preview production build

# Development server berjalan di port 3000
```

## 📦 Tech Stack

- **Frontend**: React 19 + TypeScript
- **UI**: Material-UI v6
- **Maps**: Leaflet + React-Leaflet
- **Charts**: Recharts
- **Routing**: React Router v7
- **Build**: Vite

## 🎯 Mode Demo

Sistem ini berjalan dalam **mode demo** dengan fitur:
- ✅ Data in-memory (tidak persistent)
- ✅ Login bypass tanpa backend
- ✅ Mock data lengkap
- ✅ Tidak memerlukan database
- ⚠️ Data akan reset saat refresh halaman

## 📁 Struktur Project

```
src/
├── modules/          # Modul fitur
│   ├── auth-demo/          # Login & autentikasi
│   ├── dashboard/          # Dashboard & analytics
│   ├── map-geospatial/     # Peta geospasial
│   ├── screening/          # Skrining TBC
│   ├── tbc-case/           # Manajemen kasus
│   ├── household/          # Rumah tangga
│   ├── risk-analysis/      # Analisis risiko
│   └── field-worker/       # Kegiatan lapangan
├── components/       # Shared components
├── contexts/        # Context API
├── data/            # Mock data
└── types/           # TypeScript types
```

## 🌟 Highlights

- ✅ **Responsive Design** - Mobile friendly
- ✅ **Real-time Filtering** - Filter data instant
- ✅ **Interactive Maps** - Peta interaktif dengan Leaflet
- ✅ **Comprehensive Analytics** - Grafik & statistik lengkap
- ✅ **Role-based Access** - Multi-role support
- ✅ **Professional UI** - Material Design

## 🔄 Data Flow

```
User Input → Context API → In-Memory State → UI Update
```

Semua data disimpan dalam React state (Context API) dan akan hilang saat refresh halaman.

## 📝 Catatan Penting

1. **Data tidak persistent** - Ini adalah demo mode
2. **Tidak ada backend** - Semua proses di frontend
3. **Koordinat sample** - Menggunakan lokasi Surabaya sebagai contoh
4. **OpenStreetMap** - Menggunakan tiles gratis (no API key needed)

## 🎨 Customize

Untuk mengubah tema atau konfigurasi:
- **Theme**: Edit `src/App.tsx` (createTheme)
- **Mock Data**: Edit `src/data/mockData.ts`
- **Map Center**: Edit koordinat di `src/modules/map-geospatial/MapPage.tsx`

## 🚧 Production Deployment

Untuk production:

```bash
npm run build
```

Output akan ada di folder `dist/`. Deploy folder ini ke:
- Vercel
- Netlify
- GitHub Pages
- atau hosting static file lainnya

## 📞 Support

Untuk pertanyaan atau issue, silakan buka issue di GitHub repository.

---

**Happy Coding! 🎉**
