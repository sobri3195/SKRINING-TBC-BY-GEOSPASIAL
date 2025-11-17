# API Documentation - Sistem Skrining TBC Geospasial

## Context API

### AuthContext

Mengelola autentikasi dan user session.

```typescript
import { useAuth } from './contexts/AuthContext';

const { user, login, loginAsDemo, logout, isAuthenticated } = useAuth();
```

**Methods:**

#### `login(username: string, password: string): boolean`
Login dengan username dan password.

```typescript
const success = login('admin@demo', 'demo123');
if (success) {
  // Login berhasil
}
```

#### `loginAsDemo(role?: UserRole): void`
Login langsung dengan role tertentu (bypass authentication).

```typescript
loginAsDemo('admin_provinsi');
```

#### `logout(): void`
Logout user saat ini.

```typescript
logout();
```

**Properties:**

- `user: User | null` - User yang sedang login
- `isAuthenticated: boolean` - Status autentikasi

---

### DataContext

Mengelola semua data aplikasi (TB cases, screenings, dll).

```typescript
import { useData } from './contexts/DataContext';

const { 
  tbCases, 
  households, 
  screenings, 
  fieldActivities, 
  wilayah, 
  clusters,
  addTBCase,
  addScreening,
  addFieldActivity,
  updateTBCase 
} = useData();
```

**Methods:**

#### `addTBCase(tbCase: TBCase): void`
Tambah kasus TBC baru.

```typescript
addTBCase({
  id: 'TB007',
  nama: 'John Doe',
  nik: '3578071234567890',
  alamat: 'Jl. Example No. 123',
  coordinates: { lat: -7.2580, lng: 112.7525 },
  status: 'suspek',
  resistenceType: 'none',
  tanggalDiagnosa: '2024-03-15',
  wilayah: {
    rt: '01',
    rw: '02',
    desa: 'Example',
    kecamatan: 'Example',
    kabkota: 'Surabaya'
  },
  gejala: ['batuk', 'demam'],
  riwayatPengobatan: []
});
```

#### `addScreening(screening: ScreeningForm): void`
Tambah data skrining baru.

```typescript
addScreening({
  id: 'SCR004',
  tanggal: '2024-03-15',
  nama: 'Jane Doe',
  umur: 30,
  jenisKelamin: 'P',
  alamat: 'Jl. Example',
  coordinates: { lat: -7.2580, lng: 112.7525 },
  jenisScreening: 'komunitas',
  gejala: {
    batuk: true,
    batukDarah: false,
    demam: true,
    berkeringatMalam: false,
    beratBadanTurun: false,
    sesak: false
  },
  riwayatKontak: false,
  hasilScreening: 'suspek',
  petugasId: '1',
  petugasNama: 'Admin'
});
```

#### `addFieldActivity(activity: FieldActivity): void`
Tambah kegiatan lapangan baru.

```typescript
addFieldActivity({
  id: 'FA004',
  tanggal: '2024-03-15',
  petugasId: '2',
  petugasNama: 'Petugas Lapangan',
  jenisKegiatan: 'screening',
  lokasi: 'Jl. Example',
  coordinates: { lat: -7.2580, lng: 112.7525 },
  keterangan: 'Skrining di area perumahan',
  checkInTime: '09:00'
});
```

#### `updateTBCase(id: string, data: Partial<TBCase>): void`
Update kasus TBC yang ada.

```typescript
updateTBCase('TB001', {
  status: 'on_treatment',
  tanggalMulaiPengobatan: '2024-03-15'
});
```

**Properties:**

- `tbCases: TBCase[]` - Array semua kasus TBC
- `households: Household[]` - Array data rumah tangga
- `screenings: ScreeningForm[]` - Array data skrining
- `fieldActivities: FieldActivity[]` - Array kegiatan lapangan
- `wilayah: Wilayah[]` - Array data wilayah
- `clusters: ClusterData[]` - Array data klaster

---

## TypeScript Types

### Core Types

#### User
```typescript
interface User {
  id: string;
  username: string;
  name: string;
  role: UserRole;
  wilayah?: string;
}

type UserRole = 
  | 'admin_provinsi' 
  | 'admin_kabkota' 
  | 'puskesmas' 
  | 'petugas_lapangan' 
  | 'kader' 
  | 'viewer';
```

#### TBCase
```typescript
interface TBCase {
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

type TBStatus = 
  | 'suspek' 
  | 'probable' 
  | 'confirmed' 
  | 'on_treatment' 
  | 'drop_out' 
  | 'sembuh';

type ResistenceType = 'RO' | 'RR' | 'none';
```

#### ScreeningForm
```typescript
interface ScreeningForm {
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
```

#### Household
```typescript
interface Household {
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

type RiskLevel = 'tinggi' | 'sedang' | 'rendah';
```

#### FieldActivity
```typescript
interface FieldActivity {
  id: string;
  tanggal: string;
  petugasId: string;
  petugasNama: string;
  jenisKegiatan: 
    | 'edukasi' 
    | 'pengambilan_dahak' 
    | 'follow_up' 
    | 'visit_keluarga' 
    | 'screening';
  lokasi: string;
  coordinates: Coordinates;
  keterangan: string;
  checkInTime?: string;
  checkOutTime?: string;
}
```

#### Wilayah
```typescript
interface Wilayah {
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
```

#### ClusterData
```typescript
interface ClusterData {
  id: string;
  centerCoordinates: Coordinates;
  radius: number;
  jumlahKasus: number;
  riskLevel: RiskLevel;
  affectedHouseholds: string[];
  wilayah: string;
}
```

#### Coordinates
```typescript
interface Coordinates {
  lat: number;
  lng: number;
}
```

---

## Mock Data

Semua mock data tersedia di `src/data/mockData.ts`:

```typescript
import { 
  mockUsers,
  mockTBCases,
  mockHouseholds,
  mockScreenings,
  mockFieldActivities,
  mockWilayah,
  mockClusters,
  mockDashboardStats,
  mockAnalytics
} from '../data/mockData';
```

---

## Utility Functions (Future)

Untuk extend sistem, Anda bisa menambahkan utility functions di `src/utils/`:

### Contoh: Risk Calculation
```typescript
// src/utils/riskCalculation.ts
import { Household, RiskLevel } from '../types';

export const calculateHouseholdRisk = (household: Household): RiskLevel => {
  let score = 0;
  
  if (household.kepadatanPenghuni > 6) score += 3;
  else if (household.kepadatanPenghuni > 4) score += 2;
  
  if (household.kondisiVentilasi === 'buruk') score += 3;
  if (household.sanitasi === 'buruk') score += 2;
  if (household.riwayatTBC) score += 3;
  if (household.paparanRokok) score += 2;
  
  if (score >= 8) return 'tinggi';
  if (score >= 5) return 'sedang';
  return 'rendah';
};
```

### Contoh: Distance Calculation
```typescript
// src/utils/geoUtils.ts
import { Coordinates } from '../types';

export const calculateDistance = (
  point1: Coordinates, 
  point2: Coordinates
): number => {
  // Haversine formula
  const R = 6371e3; // Earth radius in meters
  const φ1 = point1.lat * Math.PI / 180;
  const φ2 = point2.lat * Math.PI / 180;
  const Δφ = (point2.lat - point1.lat) * Math.PI / 180;
  const Δλ = (point2.lng - point1.lng) * Math.PI / 180;

  const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
           Math.cos(φ1) * Math.cos(φ2) *
           Math.sin(Δλ/2) * Math.sin(Δλ/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

  return R * c;
};

export const findNearbyHouseholds = (
  center: Coordinates,
  households: Household[],
  radiusMeters: number
): Household[] => {
  return households.filter(hh => 
    calculateDistance(center, hh.coordinates) <= radiusMeters
  );
};
```

---

## Integration dengan Backend (Future)

Untuk integrasi dengan backend API:

1. **Buat API service layer:**
```typescript
// src/services/api.ts
const API_BASE_URL = import.meta.env.VITE_API_URL;

export const api = {
  async getTBCases() {
    const response = await fetch(`${API_BASE_URL}/tb-cases`);
    return response.json();
  },
  
  async createScreening(data: ScreeningForm) {
    const response = await fetch(`${API_BASE_URL}/screenings`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    return response.json();
  }
};
```

2. **Update Context untuk menggunakan API:**
```typescript
// DataContext.tsx
const [tbCases, setTBCases] = useState<TBCase[]>([]);

useEffect(() => {
  api.getTBCases().then(setTBCases);
}, []);
```

---

## Best Practices

1. **Type Safety**: Selalu gunakan TypeScript types
2. **Immutability**: Jangan mutate state langsung
3. **Context Optimization**: Pisahkan context untuk menghindari re-render
4. **Error Handling**: Tambahkan try-catch untuk operasi async
5. **Loading States**: Tampilkan loading indicator
6. **Validation**: Validasi input sebelum submit

---

Untuk pertanyaan lebih lanjut, silakan buka issue di GitHub repository.
