import { TBCase, ScreeningRecord, Household, FieldActivity, Cluster, User } from '@/types';

export const mockUsers: User[] = [
  {
    id: '1',
    name: 'Admin Demo',
    email: 'admin@demo',
    role: 'admin',
    wilayah: 'Kota Bandung'
  },
  {
    id: '2',
    name: 'Petugas Lapangan Demo',
    email: 'petugas@demo',
    role: 'petugas_lapangan',
    wilayah: 'Puskesmas Cicendo'
  },
  {
    id: '3',
    name: 'Staff Puskesmas',
    email: 'puskesmas@demo',
    role: 'puskesmas',
    wilayah: 'Puskesmas Cicendo'
  }
];

export const mockTBCases: TBCase[] = [
  {
    id: 'TB001',
    patientName: 'Ahmad Rizki',
    age: 35,
    gender: 'L',
    address: 'Jl. Cihampelas No. 45',
    latitude: -6.900641,
    longitude: 107.604319,
    status: 'on_treatment',
    resistanceType: 'none',
    diagnosisDate: new Date('2024-01-15'),
    treatmentStartDate: new Date('2024-01-20'),
    wilayah: {
      rt: '003',
      rw: '007',
      kelurahan: 'Cipaganti',
      kecamatan: 'Coblong'
    },
    householdMembers: 4,
    contactsScreened: 3
  },
  {
    id: 'TB002',
    patientName: 'Siti Nurhaliza',
    age: 28,
    gender: 'P',
    address: 'Jl. Sukajadi No. 123',
    latitude: -6.896234,
    longitude: 107.598456,
    status: 'confirmed',
    resistanceType: 'RO',
    diagnosisDate: new Date('2024-02-01'),
    wilayah: {
      rt: '002',
      rw: '005',
      kelurahan: 'Sukajadi',
      kecamatan: 'Sukajadi'
    },
    householdMembers: 5,
    contactsScreened: 4
  },
  {
    id: 'TB003',
    patientName: 'Budi Santoso',
    age: 42,
    gender: 'L',
    address: 'Jl. Dago No. 78',
    latitude: -6.898765,
    longitude: 107.606123,
    status: 'on_treatment',
    resistanceType: 'none',
    diagnosisDate: new Date('2024-01-10'),
    treatmentStartDate: new Date('2024-01-15'),
    wilayah: {
      rt: '001',
      rw: '003',
      kelurahan: 'Dago',
      kecamatan: 'Coblong'
    },
    householdMembers: 3,
    contactsScreened: 3
  },
  {
    id: 'TB004',
    patientName: 'Dewi Lestari',
    age: 31,
    gender: 'P',
    address: 'Jl. Cicendo No. 234',
    latitude: -6.902341,
    longitude: 107.602789,
    status: 'suspek',
    resistanceType: 'none',
    diagnosisDate: new Date('2024-02-15'),
    wilayah: {
      rt: '004',
      rw: '008',
      kelurahan: 'Cicendo',
      kecamatan: 'Cicendo'
    },
    householdMembers: 6,
    contactsScreened: 2
  },
  {
    id: 'TB005',
    patientName: 'Eko Prasetyo',
    age: 38,
    gender: 'L',
    address: 'Jl. Pasirkaliki No. 56',
    latitude: -6.903456,
    longitude: 107.601234,
    status: 'on_treatment',
    resistanceType: 'none',
    diagnosisDate: new Date('2023-12-20'),
    treatmentStartDate: new Date('2023-12-25'),
    wilayah: {
      rt: '005',
      rw: '009',
      kelurahan: 'Pasirkaliki',
      kecamatan: 'Cicendo'
    },
    householdMembers: 4,
    contactsScreened: 4
  },
  {
    id: 'TB006',
    patientName: 'Fitri Handayani',
    age: 26,
    gender: 'P',
    address: 'Jl. Cihampelas No. 89',
    latitude: -6.901234,
    longitude: 107.605678,
    status: 'sembuh',
    resistanceType: 'none',
    diagnosisDate: new Date('2023-10-15'),
    treatmentStartDate: new Date('2023-10-20'),
    wilayah: {
      rt: '003',
      rw: '007',
      kelurahan: 'Cipaganti',
      kecamatan: 'Coblong'
    },
    householdMembers: 3,
    contactsScreened: 3
  },
  {
    id: 'TB007',
    patientName: 'Hendra Wijaya',
    age: 45,
    gender: 'L',
    address: 'Jl. Sukajadi No. 167',
    latitude: -6.897123,
    longitude: 107.599234,
    status: 'on_treatment',
    resistanceType: 'RR',
    diagnosisDate: new Date('2024-01-25'),
    treatmentStartDate: new Date('2024-02-01'),
    wilayah: {
      rt: '002',
      rw: '005',
      kelurahan: 'Sukajadi',
      kecamatan: 'Sukajadi'
    },
    householdMembers: 5,
    contactsScreened: 5
  },
  {
    id: 'TB008',
    patientName: 'Indah Permata',
    age: 29,
    gender: 'P',
    address: 'Jl. Dago No. 112',
    latitude: -6.899456,
    longitude: 107.607234,
    status: 'confirmed',
    resistanceType: 'none',
    diagnosisDate: new Date('2024-02-10'),
    wilayah: {
      rt: '001',
      rw: '003',
      kelurahan: 'Dago',
      kecamatan: 'Coblong'
    },
    householdMembers: 4,
    contactsScreened: 2
  },
  {
    id: 'TB009',
    patientName: 'Joko Susilo',
    age: 52,
    gender: 'L',
    address: 'Jl. Cicendo No. 321',
    latitude: -6.903789,
    longitude: 107.603456,
    status: 'on_treatment',
    resistanceType: 'none',
    diagnosisDate: new Date('2023-11-30'),
    treatmentStartDate: new Date('2023-12-05'),
    wilayah: {
      rt: '004',
      rw: '008',
      kelurahan: 'Cicendo',
      kecamatan: 'Cicendo'
    },
    householdMembers: 7,
    contactsScreened: 6
  },
  {
    id: 'TB010',
    patientName: 'Kartika Sari',
    age: 33,
    gender: 'P',
    address: 'Jl. Pasirkaliki No. 145',
    latitude: -6.904123,
    longitude: 107.600789,
    status: 'probable',
    resistanceType: 'none',
    diagnosisDate: new Date('2024-02-18'),
    wilayah: {
      rt: '005',
      rw: '009',
      kelurahan: 'Pasirkaliki',
      kecamatan: 'Cicendo'
    },
    householdMembers: 5,
    contactsScreened: 1
  }
];

export const mockScreenings: ScreeningRecord[] = [
  {
    id: 'SCR001',
    caseId: 'TB001',
    personName: 'Rina Rizki',
    age: 32,
    gender: 'P',
    address: 'Jl. Cihampelas No. 45',
    latitude: -6.900641,
    longitude: 107.604319,
    screeningDate: new Date('2024-01-22'),
    screeningType: 'kontak_erat',
    symptoms: {
      cough: false,
      weightLoss: false,
      nightSweats: false,
      fever: false,
      chestPain: false
    },
    hasContact: true,
    referred: false,
    result: 'negatif',
    petugasId: '2',
    petugasName: 'Petugas Lapangan Demo'
  },
  {
    id: 'SCR002',
    caseId: 'TB001',
    personName: 'Dimas Rizki',
    age: 12,
    gender: 'L',
    address: 'Jl. Cihampelas No. 45',
    latitude: -6.900641,
    longitude: 107.604319,
    screeningDate: new Date('2024-01-22'),
    screeningType: 'kontak_erat',
    symptoms: {
      cough: true,
      coughDuration: 10,
      weightLoss: false,
      nightSweats: false,
      fever: true,
      chestPain: false
    },
    hasContact: true,
    referred: true,
    result: 'suspek',
    petugasId: '2',
    petugasName: 'Petugas Lapangan Demo'
  },
  {
    id: 'SCR003',
    personName: 'Agus Setiawan',
    age: 47,
    gender: 'L',
    address: 'Jl. Sukajadi No. 200',
    latitude: -6.895678,
    longitude: 107.597890,
    screeningDate: new Date('2024-02-05'),
    screeningType: 'komunitas',
    symptoms: {
      cough: true,
      coughDuration: 21,
      weightLoss: true,
      nightSweats: true,
      fever: false,
      chestPain: true
    },
    hasContact: false,
    referred: true,
    result: 'suspek',
    petugasId: '2',
    petugasName: 'Petugas Lapangan Demo'
  },
  {
    id: 'SCR004',
    caseId: 'TB002',
    personName: 'Andi Kurniawan',
    age: 25,
    gender: 'L',
    address: 'Jl. Sukajadi No. 123',
    latitude: -6.896234,
    longitude: 107.598456,
    screeningDate: new Date('2024-02-03'),
    screeningType: 'kontak_erat',
    symptoms: {
      cough: false,
      weightLoss: false,
      nightSweats: false,
      fever: false,
      chestPain: false
    },
    hasContact: true,
    referred: false,
    result: 'negatif',
    petugasId: '2',
    petugasName: 'Petugas Lapangan Demo'
  },
  {
    id: 'SCR005',
    personName: 'Linda Mulyani',
    age: 38,
    gender: 'P',
    address: 'Jl. Dago No. 95',
    latitude: -6.899123,
    longitude: 107.606789,
    screeningDate: new Date('2024-02-12'),
    screeningType: 'komunitas',
    symptoms: {
      cough: true,
      coughDuration: 14,
      weightLoss: false,
      nightSweats: false,
      fever: true,
      chestPain: false
    },
    hasContact: false,
    referred: true,
    result: 'suspek',
    petugasId: '2',
    petugasName: 'Petugas Lapangan Demo'
  }
];

export const mockHouseholds: Household[] = [
  {
    id: 'HH001',
    address: 'Jl. Cihampelas No. 45',
    latitude: -6.900641,
    longitude: 107.604319,
    rt: '003',
    rw: '007',
    kelurahan: 'Cipaganti',
    kecamatan: 'Coblong',
    occupants: 4,
    riskScore: 75,
    riskLevel: 'tinggi',
    hasTBCase: true,
    environmentFactors: {
      poorVentilation: true,
      highDensity: true,
      smokingExposure: true,
      previousTBCase: false
    },
    lastSurveyDate: new Date('2024-01-22')
  },
  {
    id: 'HH002',
    address: 'Jl. Sukajadi No. 123',
    latitude: -6.896234,
    longitude: 107.598456,
    rt: '002',
    rw: '005',
    kelurahan: 'Sukajadi',
    kecamatan: 'Sukajadi',
    occupants: 5,
    riskScore: 85,
    riskLevel: 'tinggi',
    hasTBCase: true,
    environmentFactors: {
      poorVentilation: true,
      highDensity: true,
      smokingExposure: false,
      previousTBCase: true
    },
    lastSurveyDate: new Date('2024-02-03')
  },
  {
    id: 'HH003',
    address: 'Jl. Dago No. 78',
    latitude: -6.898765,
    longitude: 107.606123,
    rt: '001',
    rw: '003',
    kelurahan: 'Dago',
    kecamatan: 'Coblong',
    occupants: 3,
    riskScore: 45,
    riskLevel: 'sedang',
    hasTBCase: true,
    environmentFactors: {
      poorVentilation: false,
      highDensity: false,
      smokingExposure: true,
      previousTBCase: false
    },
    lastSurveyDate: new Date('2024-01-18')
  },
  {
    id: 'HH004',
    address: 'Jl. Cicendo No. 234',
    latitude: -6.902341,
    longitude: 107.602789,
    rt: '004',
    rw: '008',
    kelurahan: 'Cicendo',
    kecamatan: 'Cicendo',
    occupants: 6,
    riskScore: 70,
    riskLevel: 'tinggi',
    hasTBCase: true,
    environmentFactors: {
      poorVentilation: true,
      highDensity: true,
      smokingExposure: false,
      previousTBCase: false
    },
    lastSurveyDate: new Date('2024-02-16')
  },
  {
    id: 'HH005',
    address: 'Jl. Pasirkaliki No. 56',
    latitude: -6.903456,
    longitude: 107.601234,
    rt: '005',
    rw: '009',
    kelurahan: 'Pasirkaliki',
    kecamatan: 'Cicendo',
    occupants: 4,
    riskScore: 55,
    riskLevel: 'sedang',
    hasTBCase: true,
    environmentFactors: {
      poorVentilation: true,
      highDensity: false,
      smokingExposure: false,
      previousTBCase: false
    },
    lastSurveyDate: new Date('2023-12-28')
  }
];

export const mockFieldActivities: FieldActivity[] = [
  {
    id: 'FA001',
    petugasId: '2',
    petugasName: 'Petugas Lapangan Demo',
    activityType: 'kunjungan_keluarga',
    householdId: 'HH001',
    caseId: 'TB001',
    latitude: -6.900641,
    longitude: 107.604319,
    timestamp: new Date('2024-01-22T09:30:00'),
    notes: 'Kunjungan untuk skrining kontak erat. 3 anggota keluarga telah diperiksa.'
  },
  {
    id: 'FA002',
    petugasId: '2',
    petugasName: 'Petugas Lapangan Demo',
    activityType: 'edukasi',
    householdId: 'HH002',
    latitude: -6.896234,
    longitude: 107.598456,
    timestamp: new Date('2024-02-03T10:15:00'),
    notes: 'Edukasi pencegahan TBC dan pentingnya ventilasi rumah.'
  },
  {
    id: 'FA003',
    petugasId: '2',
    petugasName: 'Petugas Lapangan Demo',
    activityType: 'pengambilan_dahak',
    caseId: 'TB002',
    latitude: -6.896234,
    longitude: 107.598456,
    timestamp: new Date('2024-02-05T08:00:00'),
    notes: 'Pengambilan sampel dahak untuk pemeriksaan GeneXpert.'
  },
  {
    id: 'FA004',
    petugasId: '2',
    petugasName: 'Petugas Lapangan Demo',
    activityType: 'follow_up',
    caseId: 'TB001',
    latitude: -6.900641,
    longitude: 107.604319,
    timestamp: new Date('2024-02-15T14:20:00'),
    notes: 'Follow-up pengobatan bulan ke-2. Pasien patuh minum obat.'
  },
  {
    id: 'FA005',
    petugasId: '2',
    petugasName: 'Petugas Lapangan Demo',
    activityType: 'kunjungan_keluarga',
    householdId: 'HH004',
    caseId: 'TB004',
    latitude: -6.902341,
    longitude: 107.602789,
    timestamp: new Date('2024-02-16T11:00:00'),
    notes: 'Kunjungan rumah untuk survey kondisi lingkungan dan skrining anggota keluarga.'
  }
];

export const mockClusters: Cluster[] = [
  {
    id: 'CL001',
    centerLat: -6.902,
    centerLng: 107.602,
    radius: 150,
    caseIds: ['TB004', 'TB005', 'TB009'],
    caseCount: 3,
    detectedDate: new Date('2024-02-01'),
    riskLevel: 'tinggi'
  },
  {
    id: 'CL002',
    centerLat: -6.899,
    centerLng: 107.606,
    radius: 120,
    caseIds: ['TB003', 'TB006', 'TB008'],
    caseCount: 3,
    detectedDate: new Date('2024-01-15'),
    riskLevel: 'sedang'
  },
  {
    id: 'CL003',
    centerLat: -6.896,
    centerLng: 107.598,
    radius: 100,
    caseIds: ['TB002', 'TB007'],
    caseCount: 2,
    detectedDate: new Date('2024-02-05'),
    riskLevel: 'tinggi'
  }
];
