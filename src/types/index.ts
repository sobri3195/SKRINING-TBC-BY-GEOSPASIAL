export type UserRole = 'admin' | 'petugas_lapangan' | 'puskesmas' | 'kader' | 'viewer';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  wilayah?: string;
}

export type TBCaseStatus = 'suspek' | 'probable' | 'confirmed' | 'on_treatment' | 'drop_out' | 'sembuh';
export type ResistanceType = 'none' | 'RO' | 'RR' | 'MDR' | 'XDR';
export type RiskLevel = 'rendah' | 'sedang' | 'tinggi';

export interface TBCase {
  id: string;
  patientName: string;
  age: number;
  gender: 'L' | 'P';
  address: string;
  latitude: number;
  longitude: number;
  status: TBCaseStatus;
  resistanceType: ResistanceType;
  diagnosisDate: Date;
  treatmentStartDate?: Date;
  wilayah: {
    rt: string;
    rw: string;
    kelurahan: string;
    kecamatan: string;
  };
  householdMembers: number;
  contactsScreened: number;
}

export interface ScreeningRecord {
  id: string;
  caseId?: string;
  personName: string;
  age: number;
  gender: 'L' | 'P';
  address: string;
  latitude: number;
  longitude: number;
  screeningDate: Date;
  screeningType: 'kontak_erat' | 'komunitas' | 'massal';
  symptoms: {
    cough: boolean;
    coughDuration?: number;
    weightLoss: boolean;
    nightSweats: boolean;
    fever: boolean;
    chestPain: boolean;
  };
  hasContact: boolean;
  referred: boolean;
  result?: 'negatif' | 'suspek' | 'positif';
  petugasId: string;
  petugasName: string;
}

export interface Household {
  id: string;
  address: string;
  latitude: number;
  longitude: number;
  rt: string;
  rw: string;
  kelurahan: string;
  kecamatan: string;
  occupants: number;
  riskScore: number;
  riskLevel: RiskLevel;
  hasTBCase: boolean;
  environmentFactors: {
    poorVentilation: boolean;
    highDensity: boolean;
    smokingExposure: boolean;
    previousTBCase: boolean;
  };
  lastSurveyDate?: Date;
}

export interface FieldActivity {
  id: string;
  petugasId: string;
  petugasName: string;
  activityType: 'edukasi' | 'pengambilan_dahak' | 'follow_up' | 'kunjungan_keluarga';
  householdId?: string;
  caseId?: string;
  latitude: number;
  longitude: number;
  timestamp: Date;
  notes: string;
  photoUrl?: string;
}

export interface RiskZone {
  id: string;
  wilayah: string;
  type: 'rt' | 'rw' | 'kelurahan' | 'kecamatan';
  riskLevel: RiskLevel;
  caseCount: number;
  population: number;
  incidenceRate: number;
  coordinates: [number, number][];
}

export interface Cluster {
  id: string;
  centerLat: number;
  centerLng: number;
  radius: number;
  caseIds: string[];
  caseCount: number;
  detectedDate: Date;
  riskLevel: RiskLevel;
}

export interface DashboardStats {
  totalCases: number;
  activeCases: number;
  resistantCases: number;
  screeningsToday: number;
  screeningsThisMonth: number;
  referrals: number;
  highRiskZones: number;
  fieldActivities: number;
}

export interface ExportData {
  screenings: ScreeningRecord[];
  cases: TBCase[];
  households: Household[];
  activities: FieldActivity[];
}
