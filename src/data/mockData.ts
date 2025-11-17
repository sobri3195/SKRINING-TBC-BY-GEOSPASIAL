import { User, TBCase, Household, ScreeningForm, FieldActivity, Wilayah, ClusterData, DashboardStats, AnalyticsData } from '../types';

export const mockUsers: User[] = [
  {
    id: '1',
    username: 'admin@demo',
    name: 'Admin Provinsi',
    role: 'admin_provinsi',
    wilayah: 'Jawa Timur'
  },
  {
    id: '2',
    username: 'petugas@demo',
    name: 'Petugas Lapangan',
    role: 'petugas_lapangan',
    wilayah: 'Puskesmas Kertajaya'
  },
  {
    id: '3',
    username: 'puskesmas@demo',
    name: 'Admin Puskesmas',
    role: 'puskesmas',
    wilayah: 'Puskesmas Kertajaya'
  },
  {
    id: '4',
    username: 'kader@demo',
    name: 'Kader Kesehatan',
    role: 'kader',
    wilayah: 'Desa Mulyorejo'
  }
];

export const mockTBCases: TBCase[] = [
  {
    id: 'TB001',
    nama: 'Budi Santoso',
    nik: '3578011234567890',
    alamat: 'Jl. Merdeka No. 45, RT 02/RW 05',
    coordinates: { lat: -7.2575, lng: 112.7521 },
    status: 'on_treatment',
    resistenceType: 'none',
    tanggalDiagnosa: '2024-01-15',
    tanggalMulaiPengobatan: '2024-01-20',
    wilayah: {
      rt: '02',
      rw: '05',
      desa: 'Mulyorejo',
      kecamatan: 'Gubeng',
      kabkota: 'Surabaya'
    },
    gejala: ['batuk', 'demam', 'berat_badan_turun'],
    riwayatPengobatan: [
      { id: 'rx1', tanggal: '2024-01-20', jenis: 'Fase Intensif', keterangan: 'Mulai pengobatan OAT Kategori 1' },
      { id: 'rx2', tanggal: '2024-02-20', jenis: 'Kontrol Bulan 1', keterangan: 'Kondisi membaik' }
    ]
  },
  {
    id: 'TB002',
    nama: 'Siti Aminah',
    nik: '3578022345678901',
    alamat: 'Jl. Kenari No. 12, RT 03/RW 05',
    coordinates: { lat: -7.2580, lng: 112.7525 },
    status: 'on_treatment',
    resistenceType: 'none',
    tanggalDiagnosa: '2024-01-22',
    tanggalMulaiPengobatan: '2024-01-25',
    wilayah: {
      rt: '03',
      rw: '05',
      desa: 'Mulyorejo',
      kecamatan: 'Gubeng',
      kabkota: 'Surabaya'
    },
    gejala: ['batuk', 'batuk_darah', 'keringat_malam'],
    riwayatPengobatan: [
      { id: 'rx3', tanggal: '2024-01-25', jenis: 'Fase Intensif', keterangan: 'Mulai pengobatan OAT Kategori 1' }
    ]
  },
  {
    id: 'TB003',
    nama: 'Ahmad Fauzi',
    nik: '3578033456789012',
    alamat: 'Jl. Mawar No. 8, RT 01/RW 05',
    coordinates: { lat: -7.2570, lng: 112.7518 },
    status: 'confirmed',
    resistenceType: 'RO',
    tanggalDiagnosa: '2024-02-10',
    wilayah: {
      rt: '01',
      rw: '05',
      desa: 'Mulyorejo',
      kecamatan: 'Gubeng',
      kabkota: 'Surabaya'
    },
    gejala: ['batuk', 'demam', 'sesak'],
    riwayatPengobatan: []
  },
  {
    id: 'TB004',
    nama: 'Dewi Lestari',
    nik: '3578044567890123',
    alamat: 'Jl. Melati No. 23, RT 04/RW 06',
    coordinates: { lat: -7.2590, lng: 112.7530 },
    status: 'sembuh',
    resistenceType: 'none',
    tanggalDiagnosa: '2023-10-05',
    tanggalMulaiPengobatan: '2023-10-10',
    wilayah: {
      rt: '04',
      rw: '06',
      desa: 'Mulyorejo',
      kecamatan: 'Gubeng',
      kabkota: 'Surabaya'
    },
    gejala: ['batuk', 'berat_badan_turun'],
    riwayatPengobatan: [
      { id: 'rx4', tanggal: '2023-10-10', jenis: 'Fase Intensif', keterangan: 'Mulai pengobatan' },
      { id: 'rx5', tanggal: '2024-04-10', jenis: 'Selesai', keterangan: 'Dinyatakan sembuh' }
    ]
  },
  {
    id: 'TB005',
    nama: 'Eko Prasetyo',
    nik: '3578055678901234',
    alamat: 'Jl. Anggrek No. 15, RT 02/RW 05',
    coordinates: { lat: -7.2578, lng: 112.7522 },
    status: 'suspek',
    resistenceType: 'none',
    tanggalDiagnosa: '2024-03-01',
    wilayah: {
      rt: '02',
      rw: '05',
      desa: 'Mulyorejo',
      kecamatan: 'Gubeng',
      kabkota: 'Surabaya'
    },
    gejala: ['batuk', 'keringat_malam'],
    riwayatPengobatan: []
  },
  {
    id: 'TB006',
    nama: 'Rina Wati',
    nik: '3578066789012345',
    alamat: 'Jl. Dahlia No. 7, RT 05/RW 07',
    coordinates: { lat: -7.2600, lng: 112.7540 },
    status: 'on_treatment',
    resistenceType: 'none',
    tanggalDiagnosa: '2024-02-18',
    tanggalMulaiPengobatan: '2024-02-22',
    wilayah: {
      rt: '05',
      rw: '07',
      desa: 'Airlangga',
      kecamatan: 'Gubeng',
      kabkota: 'Surabaya'
    },
    gejala: ['batuk', 'demam'],
    riwayatPengobatan: [
      { id: 'rx6', tanggal: '2024-02-22', jenis: 'Fase Intensif', keterangan: 'Mulai pengobatan OAT' }
    ]
  }
];

export const mockHouseholds: Household[] = [
  {
    id: 'HH001',
    alamat: 'Jl. Merdeka No. 45, RT 02/RW 05',
    coordinates: { lat: -7.2575, lng: 112.7521 },
    kepadatanPenghuni: 7,
    kondisiVentilasi: 'buruk',
    sanitasi: 'cukup',
    riwayatTBC: true,
    paparanRokok: true,
    riskScore: 'tinggi',
    wilayah: {
      rt: '02',
      rw: '05',
      desa: 'Mulyorejo',
      kecamatan: 'Gubeng'
    }
  },
  {
    id: 'HH002',
    alamat: 'Jl. Kenari No. 12, RT 03/RW 05',
    coordinates: { lat: -7.2580, lng: 112.7525 },
    kepadatanPenghuni: 5,
    kondisiVentilasi: 'cukup',
    sanitasi: 'cukup',
    riwayatTBC: true,
    paparanRokok: false,
    riskScore: 'sedang',
    wilayah: {
      rt: '03',
      rw: '05',
      desa: 'Mulyorejo',
      kecamatan: 'Gubeng'
    }
  },
  {
    id: 'HH003',
    alamat: 'Jl. Mawar No. 8, RT 01/RW 05',
    coordinates: { lat: -7.2570, lng: 112.7518 },
    kepadatanPenghuni: 6,
    kondisiVentilasi: 'buruk',
    sanitasi: 'buruk',
    riwayatTBC: true,
    paparanRokok: true,
    riskScore: 'tinggi',
    wilayah: {
      rt: '01',
      rw: '05',
      desa: 'Mulyorejo',
      kecamatan: 'Gubeng'
    }
  }
];

export const mockScreenings: ScreeningForm[] = [
  {
    id: 'SCR001',
    tanggal: '2024-03-10',
    nama: 'Andi Wijaya',
    nik: '3578071234567890',
    umur: 35,
    jenisKelamin: 'L',
    alamat: 'Jl. Merdeka No. 47, RT 02/RW 05',
    coordinates: { lat: -7.2576, lng: 112.7521 },
    jenisScreening: 'kontak_erat',
    gejala: {
      batuk: true,
      batukDarah: false,
      demam: true,
      berkeringatMalam: false,
      beratBadanTurun: false,
      sesak: false
    },
    riwayatKontak: true,
    hasilScreening: 'suspek',
    tindakLanjut: 'Rujuk ke Puskesmas untuk pemeriksaan dahak',
    petugasId: '2',
    petugasNama: 'Petugas Lapangan',
    relatedCaseId: 'TB001'
  },
  {
    id: 'SCR002',
    tanggal: '2024-03-10',
    nama: 'Sri Rahayu',
    umur: 28,
    jenisKelamin: 'P',
    alamat: 'Jl. Kenari No. 10, RT 03/RW 05',
    coordinates: { lat: -7.2581, lng: 112.7524 },
    jenisScreening: 'kontak_erat',
    gejala: {
      batuk: false,
      batukDarah: false,
      demam: false,
      berkeringatMalam: false,
      beratBadanTurun: false,
      sesak: false
    },
    riwayatKontak: true,
    hasilScreening: 'negatif',
    petugasId: '2',
    petugasNama: 'Petugas Lapangan',
    relatedCaseId: 'TB002'
  },
  {
    id: 'SCR003',
    tanggal: '2024-03-12',
    nama: 'Yanto Supriyono',
    umur: 42,
    jenisKelamin: 'L',
    alamat: 'Jl. Anggrek No. 20, RT 02/RW 05',
    coordinates: { lat: -7.2579, lng: 112.7523 },
    jenisScreening: 'komunitas',
    gejala: {
      batuk: true,
      batukDarah: false,
      demam: false,
      berkeringatMalam: true,
      beratBadanTurun: true,
      sesak: false
    },
    riwayatKontak: false,
    hasilScreening: 'perlu_rujukan',
    tindakLanjut: 'Pemeriksaan lanjutan di Puskesmas',
    petugasId: '4',
    petugasNama: 'Kader Kesehatan'
  }
];

export const mockFieldActivities: FieldActivity[] = [
  {
    id: 'FA001',
    tanggal: '2024-03-10',
    petugasId: '2',
    petugasNama: 'Petugas Lapangan',
    jenisKegiatan: 'screening',
    lokasi: 'Jl. Merdeka No. 45-50, RT 02/RW 05',
    coordinates: { lat: -7.2575, lng: 112.7521 },
    keterangan: 'Skrining kontak erat kasus TB001',
    checkInTime: '08:30',
    checkOutTime: '11:00'
  },
  {
    id: 'FA002',
    tanggal: '2024-03-11',
    petugasId: '4',
    petugasNama: 'Kader Kesehatan',
    jenisKegiatan: 'edukasi',
    lokasi: 'Balai RW 05, Mulyorejo',
    coordinates: { lat: -7.2577, lng: 112.7520 },
    keterangan: 'Edukasi pencegahan TBC untuk warga RW 05',
    checkInTime: '14:00',
    checkOutTime: '16:30'
  },
  {
    id: 'FA003',
    tanggal: '2024-03-12',
    petugasId: '2',
    petugasNama: 'Petugas Lapangan',
    jenisKegiatan: 'follow_up',
    lokasi: 'Jl. Merdeka No. 45, RT 02/RW 05',
    coordinates: { lat: -7.2575, lng: 112.7521 },
    keterangan: 'Follow-up pengobatan pasien TB001',
    checkInTime: '09:00',
    checkOutTime: '09:45'
  }
];

export const mockWilayah: Wilayah[] = [
  {
    id: 'W001',
    nama: 'RT 02 / RW 05',
    tipe: 'rt',
    parent: 'W005',
    jumlahKasus: 3,
    jumlahSkrining: 15,
    riskLevel: 'tinggi',
    coordinates: { lat: -7.2575, lng: 112.7521 }
  },
  {
    id: 'W002',
    nama: 'RT 03 / RW 05',
    tipe: 'rt',
    parent: 'W005',
    jumlahKasus: 1,
    jumlahSkrining: 8,
    riskLevel: 'sedang',
    coordinates: { lat: -7.2580, lng: 112.7525 }
  },
  {
    id: 'W003',
    nama: 'RT 01 / RW 05',
    tipe: 'rt',
    parent: 'W005',
    jumlahKasus: 1,
    jumlahSkrining: 10,
    riskLevel: 'tinggi',
    coordinates: { lat: -7.2570, lng: 112.7518 }
  },
  {
    id: 'W004',
    nama: 'RT 04 / RW 06',
    tipe: 'rt',
    parent: 'W006',
    jumlahKasus: 0,
    jumlahSkrining: 12,
    riskLevel: 'rendah',
    coordinates: { lat: -7.2590, lng: 112.7530 }
  },
  {
    id: 'W005',
    nama: 'RW 05',
    tipe: 'rw',
    parent: 'W007',
    jumlahKasus: 5,
    jumlahSkrining: 33,
    riskLevel: 'tinggi'
  },
  {
    id: 'W006',
    nama: 'RW 06',
    tipe: 'rw',
    parent: 'W007',
    jumlahKasus: 0,
    jumlahSkrining: 12,
    riskLevel: 'rendah'
  },
  {
    id: 'W007',
    nama: 'Mulyorejo',
    tipe: 'desa',
    parent: 'W008',
    jumlahKasus: 5,
    jumlahSkrining: 45,
    riskLevel: 'tinggi',
    coordinates: { lat: -7.2580, lng: 112.7525 }
  },
  {
    id: 'W008',
    nama: 'Gubeng',
    tipe: 'kecamatan',
    parent: 'W009',
    jumlahKasus: 6,
    jumlahSkrining: 58,
    riskLevel: 'tinggi'
  },
  {
    id: 'W009',
    nama: 'Surabaya',
    tipe: 'kabkota',
    jumlahKasus: 6,
    jumlahSkrining: 58,
    riskLevel: 'tinggi'
  }
];

export const mockClusters: ClusterData[] = [
  {
    id: 'CL001',
    centerCoordinates: { lat: -7.2575, lng: 112.7521 },
    radius: 100,
    jumlahKasus: 3,
    riskLevel: 'tinggi',
    affectedHouseholds: ['HH001', 'HH002', 'HH003'],
    wilayah: 'RW 05, Mulyorejo'
  },
  {
    id: 'CL002',
    centerCoordinates: { lat: -7.2595, lng: 112.7535 },
    radius: 75,
    jumlahKasus: 1,
    riskLevel: 'sedang',
    affectedHouseholds: [],
    wilayah: 'RW 07, Airlangga'
  }
];

export const mockDashboardStats: DashboardStats = {
  totalKasus: 6,
  kasusAktif: 4,
  kasusSembuh: 1,
  kasusRO: 1,
  totalSkrining: 58,
  skriningPositif: 2,
  wilayahRisikoTinggi: 3,
  petugasAktif: 4
};

export const mockAnalytics: AnalyticsData = {
  trenKasus: [
    { bulan: 'Okt 2023', jumlah: 1 },
    { bulan: 'Nov 2023', jumlah: 0 },
    { bulan: 'Des 2023', jumlah: 0 },
    { bulan: 'Jan 2024', jumlah: 2 },
    { bulan: 'Feb 2024', jumlah: 2 },
    { bulan: 'Mar 2024', jumlah: 1 }
  ],
  distribusiPerWilayah: [
    { wilayah: 'Mulyorejo', jumlah: 5, riskLevel: 'tinggi' },
    { wilayah: 'Airlangga', jumlah: 1, riskLevel: 'sedang' }
  ],
  capaianSkrining: {
    target: 100,
    realisasi: 58,
    persentase: 58
  }
};
