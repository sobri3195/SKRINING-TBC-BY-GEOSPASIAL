export type UserRole = 'admin_provinsi' | 'admin_kabkota' | 'puskesmas' | 'petugas_lapangan' | 'kader' | 'viewer';

export interface User {
  id: string;
  username: string;
  name: string;
  role: UserRole;
  wilayah?: string;
}

export type TBStatus = 'suspek' | 'probable' | 'confirmed' | 'on_treatment' | 'drop_out' | 'sembuh';
export type ResistenceType = 'RO' | 'RR' | 'none';
export type RiskLevel = 'tinggi' | 'sedang' | 'rendah';

export interface Coordinates {
  lat: number;
  lng: number;
}

export interface TBCase {
  id: string;
  nama: string;
  nik: string;
  alamat: string;
  coordinates: Coordinates;
  status: TBStatus;
  resistenceType: ResistenceType;
  tanggalDiagnosa: string;
  tanggalMulaiPengobatan?: string;
  wilayah: {
    rt: string;
    rw: string;
    desa: string;
    kecamatan: string;
    kabkota: string;
  };
  gejala: string[];
  riwayatPengobatan: TreatmentHistory[];
}

export interface TreatmentHistory {
  id: string;
  tanggal: string;
  jenis: string;
  keterangan: string;
}

export interface Household {
  id: string;
  alamat: string;
  coordinates: Coordinates;
  kepadatanPenghuni: number;
  kondisiVentilasi: 'baik' | 'cukup' | 'buruk';
  sanitasi: 'baik' | 'cukup' | 'buruk';
  riwayatTBC: boolean;
  paparanRokok: boolean;
  riskScore: RiskLevel;
  wilayah: {
    rt: string;
    rw: string;
    desa: string;
    kecamatan: string;
  };
}

export interface ScreeningForm {
  id: string;
  tanggal: string;
  nama: string;
  nik?: string;
  umur: number;
  jenisKelamin: 'L' | 'P';
  alamat: string;
  coordinates: Coordinates;
  jenisScreening: 'kontak_erat' | 'komunitas' | 'massal';
  gejala: {
    batuk: boolean;
    batukDarah: boolean;
    demam: boolean;
    berkeringatMalam: boolean;
    beratBadanTurun: boolean;
    sesak: boolean;
  };
  riwayatKontak: boolean;
  hasilScreening: 'negatif' | 'suspek' | 'perlu_rujukan';
  tindakLanjut?: string;
  petugasId: string;
  petugasNama: string;
  fotoRumah?: string;
  relatedCaseId?: string;
}

export interface FieldActivity {
  id: string;
  tanggal: string;
  petugasId: string;
  petugasNama: string;
  jenisKegiatan: 'edukasi' | 'pengambilan_dahak' | 'follow_up' | 'visit_keluarga' | 'screening';
  lokasi: string;
  coordinates: Coordinates;
  keterangan: string;
  checkInTime?: string;
  checkOutTime?: string;
}

export interface Wilayah {
  id: string;
  nama: string;
  tipe: 'rt' | 'rw' | 'desa' | 'kecamatan' | 'kabkota';
  parent?: string;
  jumlahKasus: number;
  jumlahSkrining: number;
  riskLevel: RiskLevel;
  coordinates?: Coordinates;
  boundaries?: Coordinates[];
}

export interface ClusterData {
  id: string;
  centerCoordinates: Coordinates;
  radius: number;
  jumlahKasus: number;
  riskLevel: RiskLevel;
  affectedHouseholds: string[];
  wilayah: string;
}

export interface DashboardStats {
  totalKasus: number;
  kasusAktif: number;
  kasusSembuh: number;
  kasusRO: number;
  totalSkrining: number;
  skriningPositif: number;
  wilayahRisikoTinggi: number;
  petugasAktif: number;
}

export interface AnalyticsData {
  trenKasus: {
    bulan: string;
    jumlah: number;
  }[];
  distribusiPerWilayah: {
    wilayah: string;
    jumlah: number;
    riskLevel: RiskLevel;
  }[];
  capaianSkrining: {
    target: number;
    realisasi: number;
    persentase: number;
  };
}
