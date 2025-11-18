# Sistem Skrining TBC Geospasial

Sistem informasi berbasis web untuk memetakan risiko TBC, mengidentifikasi klaster penularan, dan mengelola kegiatan skrining berbasis wilayah, rumah tangga, dan populasi rawan.

## 🎯 Fitur Utama

### 1. Peta Geospasial TBC
- Visualisasi persebaran kasus TBC dengan marker di peta
- Deteksi klaster penularan otomatis dengan zona radius
- Heatmap zona risiko (Tinggi/Sedang/Rendah)
- Layer interaktif: kasus TBC, klaster, rumah tangga
- Popup detail informasi setiap lokasi

### 2. Manajemen Kasus TBC
- Daftar lengkap kasus TBC dengan status (Suspek, Probable, Confirmed, Dalam Pengobatan, Sembuh)
- Filter berdasarkan status
- Informasi kasus resisten obat (RO/RR/MDR)
- Tracking kontak yang sudah disaring
- Export data ke CSV
- Detail kasus dengan informasi lengkap

### 3. Skrining TBC
- Form skrining digital dengan validasi
- Auto-capture lokasi GPS
- Skrining kontak erat, komunitas, dan massal
- Checklist gejala TBC
- Sistem rujukan otomatis
- Riwayat skrining lengkap

### 4. Pemantauan Rumah Tangga
- Scoring risiko rumah (0-100)
- Faktor lingkungan: ventilasi, kepadatan, paparan rokok, riwayat TBC
- Kategori risiko: Tinggi/Sedang/Rendah
- Filter dan pencarian rumah tangga

### 5. Aktivitas Petugas Lapangan
- Tracking aktivitas: edukasi, pengambilan dahak, follow-up, kunjungan keluarga
- GPS check-in lokasi
- Catatan kegiatan dengan timestamp
- Statistik aktivitas per jenis

### 6. Dashboard Analitik
- Statistik real-time: total kasus, kasus aktif, kasus resisten
- Grafik tren kasus dan skrining bulanan
- Distribusi status kasus (pie chart)
- Kasus per wilayah (bar chart)
- Timeline aktivitas terbaru

### 7. Mode Demo
- **Tanpa database** - semua data disimpan di memory
- **Tidak menggunakan localStorage** - data reset saat refresh
- Akun demo hardcoded:
  - **admin@demo** / demo123 (Admin)
  - **petugas@demo** / demo123 (Petugas Lapangan)
  - **puskesmas@demo** / demo123 (Puskesmas)
- Login cepat dengan tombol "Masuk sebagai Demo"
- Mock data lengkap untuk presentasi

### 8. Export & Reporting
- Export data skrining ke CSV
- Export data kasus TBC ke CSV
- Format siap analisis

## 🛠️ Teknologi

- **Frontend Framework**: React 18 + TypeScript
- **Build Tool**: Vite
- **Routing**: React Router v6
- **Maps**: Leaflet + React Leaflet
- **Charts**: Recharts
- **Icons**: Lucide React
- **Styling**: Tailwind CSS
- **Date Handling**: date-fns

## 🚀 Instalasi & Menjalankan

### Prerequisites
- Node.js 18+ 
- npm atau yarn

### Langkah Instalasi

```bash
# Install dependencies
npm install

# Jalankan development server
npm run dev

# Build untuk production
npm run build

# Preview production build
npm run preview
```

Aplikasi akan berjalan di `http://localhost:5173`

## 👤 Akun Demo

### Login Manual
- Email: `admin@demo`
- Password: `demo123`

atau

- Email: `petugas@demo`
- Password: `demo123`

### Login Cepat
Gunakan tombol "Masuk sebagai Demo" di halaman login untuk langsung masuk tanpa input kredensial.

## 📂 Struktur Project

```
src/
├── components/          # Komponen reusable
│   ├── auth/           # Login
│   ├── dashboard/      # Dashboard analitik
│   ├── layout/         # Layout & navigation
│   └── map/            # Komponen peta
├── contexts/           # React Context (state management)
│   ├── AuthContext.tsx # Autentikasi
│   └── AppContext.tsx  # Data aplikasi
├── data/               # Mock data
│   └── mockData.ts     # Data demo
├── modules/            # Modul fitur utama
│   ├── field-activity/ # Aktivitas lapangan
│   ├── household/      # Rumah tangga
│   ├── map-geospatial/ # Peta geospasial
│   ├── screening/      # Skrining TBC
│   └── tbc-case/       # Kasus TBC
├── types/              # TypeScript types
│   └── index.ts        # Type definitions
├── utils/              # Utility functions
│   └── helpers.ts      # Helper functions
├── App.tsx             # Main app component
├── main.tsx            # Entry point
└── index.css           # Global styles
```

## 🗺️ Fitur Peta

### Layer yang Tersedia
1. **Kasus TBC** - Marker merah untuk setiap kasus
2. **Klaster** - Lingkaran untuk area klaster dengan radius deteksi
3. **Rumah Tangga** - Marker biru untuk rumah berisiko
4. **Heatmap** - Visualisasi kepadatan kasus

### Warna Zona Risiko
- 🔴 **Merah** - Risiko Tinggi
- 🟡 **Kuning** - Risiko Sedang
- 🟢 **Hijau** - Risiko Rendah

## 📊 Dashboard Metrics

- Total Kasus
- Kasus Aktif (dalam pengobatan)
- Kasus Resisten Obat
- Skrining Bulan Ini
- Total Rujukan
- Zona Risiko Tinggi

## 🎨 Fitur UI/UX

- Responsive design (mobile & desktop)
- Dark mode ready
- Loading states
- Error handling
- Form validation
- Toast notifications
- Modal dialogs
- Sidebar navigation
- Search & filter
- Pagination ready

## 🔒 Keamanan & Privasi

- Data hanya di memory (demo mode)
- Tidak ada penyimpanan permanen
- Koordinat GPS optional
- Mock data untuk privasi

## 🌐 Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge

## 📝 Lisensi

Demo System - Educational Purpose

## 👥 Role & Permissions

### Admin
- Akses penuh semua fitur
- Lihat semua wilayah
- Export data

### Petugas Lapangan
- Input skrining
- Catat aktivitas lapangan
- Lihat peta wilayah kerja

### Puskesmas
- Monitor kasus di wilayah
- Lihat data skrining
- Dashboard analitik

## 🆘 Troubleshooting

### Peta tidak muncul
- Pastikan koneksi internet aktif (untuk tile maps)
- Cek console browser untuk error

### Data hilang setelah refresh
- Ini adalah behavior normal di demo mode
- Data akan reset ke kondisi awal

### GPS tidak berfungsi
- Izinkan akses lokasi di browser
- Gunakan HTTPS atau localhost
- Fallback: input manual koordinat

## 📞 Support

Untuk pertanyaan atau masalah, silakan buat issue di repository.

---

**Catatan**: Ini adalah sistem demo. Data yang ditampilkan adalah data simulasi dan tidak merepresentasikan data kesehatan aktual.
