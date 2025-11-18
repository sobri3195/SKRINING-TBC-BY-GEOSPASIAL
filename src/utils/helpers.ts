import { TBCase, ScreeningRecord, Household, FieldActivity, DashboardStats, RiskLevel } from '@/types';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';

export const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
  const R = 6371e3;
  const φ1 = lat1 * Math.PI / 180;
  const φ2 = lat2 * Math.PI / 180;
  const Δφ = (lat2 - lat1) * Math.PI / 180;
  const Δλ = (lon2 - lon1) * Math.PI / 180;

  const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
    Math.cos(φ1) * Math.cos(φ2) *
    Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c;
};

export const formatDate = (date: Date): string => {
  return format(date, 'dd MMMM yyyy', { locale: id });
};

export const formatDateTime = (date: Date): string => {
  return format(date, 'dd MMMM yyyy HH:mm', { locale: id });
};

export const calculateDashboardStats = (
  cases: TBCase[],
  screenings: ScreeningRecord[],
  households: Household[],
  activities: FieldActivity[]
): DashboardStats => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const thisMonth = new Date(today.getFullYear(), today.getMonth(), 1);

  const activeCases = cases.filter(c =>
    c.status === 'on_treatment' || c.status === 'confirmed' || c.status === 'probable'
  ).length;

  const resistantCases = cases.filter(c =>
    c.resistanceType !== 'none'
  ).length;

  const screeningsToday = screenings.filter(s => {
    const sDate = new Date(s.screeningDate);
    sDate.setHours(0, 0, 0, 0);
    return sDate.getTime() === today.getTime();
  }).length;

  const screeningsThisMonth = screenings.filter(s =>
    new Date(s.screeningDate) >= thisMonth
  ).length;

  const referrals = screenings.filter(s => s.referred).length;

  const highRiskZones = households.filter(h => h.riskLevel === 'tinggi').length;

  const fieldActivitiesToday = activities.filter(a => {
    const aDate = new Date(a.timestamp);
    aDate.setHours(0, 0, 0, 0);
    return aDate.getTime() === today.getTime();
  }).length;

  return {
    totalCases: cases.length,
    activeCases,
    resistantCases,
    screeningsToday,
    screeningsThisMonth,
    referrals,
    highRiskZones,
    fieldActivities: fieldActivitiesToday
  };
};

export const getRiskLevelColor = (riskLevel: RiskLevel): string => {
  switch (riskLevel) {
    case 'tinggi':
      return '#ef4444';
    case 'sedang':
      return '#f59e0b';
    case 'rendah':
      return '#22c55e';
    default:
      return '#6b7280';
  }
};

export const getRiskLevelBgColor = (riskLevel: RiskLevel): string => {
  switch (riskLevel) {
    case 'tinggi':
      return 'bg-red-100 text-red-800';
    case 'sedang':
      return 'bg-yellow-100 text-yellow-800';
    case 'rendah':
      return 'bg-green-100 text-green-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

export const getStatusColor = (status: string): string => {
  switch (status) {
    case 'suspek':
      return 'bg-yellow-100 text-yellow-800';
    case 'probable':
      return 'bg-orange-100 text-orange-800';
    case 'confirmed':
      return 'bg-red-100 text-red-800';
    case 'on_treatment':
      return 'bg-blue-100 text-blue-800';
    case 'drop_out':
      return 'bg-purple-100 text-purple-800';
    case 'sembuh':
      return 'bg-green-100 text-green-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

export const getStatusLabel = (status: string): string => {
  switch (status) {
    case 'suspek':
      return 'Suspek';
    case 'probable':
      return 'Probable';
    case 'confirmed':
      return 'Confirmed';
    case 'on_treatment':
      return 'Dalam Pengobatan';
    case 'drop_out':
      return 'Drop Out';
    case 'sembuh':
      return 'Sembuh';
    default:
      return status;
  }
};

export const exportToCSV = (data: Record<string, unknown>[], filename: string) => {
  if (data.length === 0) return;

  const headers = Object.keys(data[0]);
  const csvContent = [
    headers.join(','),
    ...data.map(row =>
      headers.map(header => {
        const value = row[header];
        if (value === null || value === undefined) return '';
        if (typeof value === 'object') return JSON.stringify(value).replace(/,/g, ';');
        return `"${value}"`;
      }).join(',')
    )
  ].join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export const generateId = (prefix: string): string => {
  const timestamp = Date.now();
  const random = Math.floor(Math.random() * 1000);
  return `${prefix}${timestamp}${random}`;
};

export const findNearbyHouseholds = (
  lat: number,
  lng: number,
  households: Household[],
  radiusMeters: number = 200
): Household[] => {
  return households.filter(h => {
    const distance = calculateDistance(lat, lng, h.latitude, h.longitude);
    return distance <= radiusMeters;
  });
};

export const calculateHouseholdRiskScore = (household: Household): number => {
  let score = 0;

  if (household.hasTBCase) score += 30;
  if (household.environmentFactors.poorVentilation) score += 20;
  if (household.environmentFactors.highDensity) score += 15;
  if (household.environmentFactors.smokingExposure) score += 10;
  if (household.environmentFactors.previousTBCase) score += 25;

  return Math.min(score, 100);
};
