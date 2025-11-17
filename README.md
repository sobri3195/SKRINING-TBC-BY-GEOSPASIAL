# Sistem Skrining TBC Berbasis Geospasial

Sistem informasi untuk memetakan risiko TBC, mengidentifikasi klaster penularan, dan mengelola kegiatan skrining berbasis wilayah, rumah tangga, dan populasi rawan.

## 🎯 Fitur Utama

### 1. **Peta Geospasial TBC**
- Visualisasi persebaran kasus TBC dengan marker lokasi
- Heatmap zona risiko (Merah/Kuning/Hijau)
- Deteksi klaster penularan otomatis
- Radius kontak sekitar kasus (50-200 meter)
- Layer: Kasus, Heatmap, Klaster, Rumah Tangga

### 2. **Skrining TBC Berbasis Risiko**
- Skrining kontak erat (household contact)
- Skrining komunitas
- Skrining massal
- Form digital dengan geotag otomatis
- Status: Negatif, Suspek, Perlu Rujukan

### 3. **Manajemen Kasus TBC**
- Registry kasus TBC lengkap
- Status: Suspek, Probable, Confirmed, On Treatment, Drop Out, Sembuh
- Tracking kasus RO/RR (Resisten Obat)
- Riwayat pengobatan per pasien

### 4. **Pemantauan Rumah Tangga**
- Survey kondisi rumah (ventilasi, sanitasi)
- Skoring risiko rumah otomatis
- Identifikasi faktor risiko (kepadatan, paparan rokok, riwayat TBC)

### 5. **Analisis Risiko Wilayah**
- Indeks risiko per RT/RW/Desa/Kecamatan
- Prioritas wilayah intervensi
- Analisis tren kasus
- Rekomendasi tindak lanjut

### 6. **Kegiatan Lapangan**
- Check-in lokasi dengan GPS
- Dokumentasi kegiatan (edukasi, skrining, follow-up)
- Tracking aktivitas petugas
- Rute prioritas kunjungan

### 7. **Dashboard Analitik**
- Statistik real-time
- Grafik tren kasus bulanan
- Distribusi per wilayah
- Capaian skrining
- Laporan komprehensif

### 8. **Mode Demo (Tanpa Database)**
- ✅ Login bypass dengan role selection
- ✅ Data in-memory (tidak persistent)
- ✅ Mock data lengkap untuk presentasi
- ✅ Akun demo pre-configured

## 🚀 Quick Start

### Instalasi

```bash
# Clone repository
git clone https://github.com/sobri3195/SKRINING-TBC-BY-GEOSPASIAL.git
cd SKRINING-TBC-BY-GEOSPASIAL

# Install dependencies
npm install

# Run development server
npm run dev
```

Aplikasi akan berjalan di: `http://localhost:3000`

### Build Production

```bash
npm run build
npm run preview
```

## 🔐 Demo Mode

### Akun Demo (Username / Password: demo123)

1. **Admin Provinsi**: `admin@demo`
2. **Admin Puskesmas**: `puskesmas@demo`
3. **Petugas Lapangan**: `petugas@demo`
4. **Kader**: `kader@demo`

### Login Cepat
Klik tombol **"Masuk sebagai Demo"** dan pilih role yang diinginkan.

## 📊 Data Mock

Sistem menyediakan data mock lengkap:
- ✅ 6 Kasus TBC (termasuk RO/RR)
- ✅ 3 Rumah tangga dengan scoring risiko
- ✅ 3 Skrining dengan berbagai hasil
- ✅ 3 Kegiatan lapangan
- ✅ 9 Wilayah (RT, RW, Desa, Kecamatan)
- ✅ 2 Klaster penularan

## 🗺️ Teknologi

- **Frontend**: React 19 + TypeScript
- **UI Library**: Material-UI (MUI)
- **Maps**: Leaflet + React-Leaflet
- **Charts**: Recharts
- **Routing**: React Router v7
- **Build Tool**: Vite
- **State Management**: Context API

## 📁 Struktur Proyek

```
src/
├── modules/
│   ├── auth-demo/          # Login & authentication
│   ├── dashboard/          # Dashboard & analytics
│   ├── map-geospatial/     # Peta & geospasial
│   ├── screening/          # Skrining TBC
│   ├── tbc-case/           # Manajemen kasus
│   ├── household/          # Pemantauan rumah tangga
│   ├── risk-analysis/      # Analisis risiko
│   └── field-worker/       # Kegiatan lapangan
├── components/             # Shared components
├── contexts/              # Context providers
├── data/                  # Mock data
├── types/                 # TypeScript types
└── utils/                 # Utility functions
```

## 🎨 Fitur UI/UX

- ✅ Responsive design (mobile-friendly)
- ✅ Dark theme support ready
- ✅ Professional color-coded status
- ✅ Interactive maps dengan popup
- ✅ Real-time filtering
- ✅ Export-ready tables
- ✅ Comprehensive legends

## 🔧 Konfigurasi

### Environment Variables (Optional)
```env
VITE_API_URL=your_api_url
VITE_MAPBOX_TOKEN=your_mapbox_token
```

## 📈 Roadmap

### Phase 2 (Future)
- [ ] Backend API integration
- [ ] Database persistence (PostgreSQL + PostGIS)
- [ ] Real-time GPS tracking
- [ ] SMS/WhatsApp notifications
- [ ] Export to Excel/PDF
- [ ] Advanced clustering (DBSCAN, H3)
- [ ] AI prediction model
- [ ] Mobile app (React Native)

## 👥 User Roles

1. **Admin Provinsi**: Full access
2. **Admin Kabupaten/Kota**: Regional management
3. **Puskesmas**: Local case management
4. **Petugas Lapangan**: Field data entry
5. **Kader**: Community screening
6. **Viewer**: Read-only access

## 📝 License

ISC License

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📧 Contact

For questions or support, please open an issue on GitHub.

---

**Sistem Skrining TBC Geospasial** - Membantu Indonesia bebas TBC 2030 🇮🇩
