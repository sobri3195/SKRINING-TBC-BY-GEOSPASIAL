import React from 'react';
import { useApp } from '@/contexts/AppContext';
import { calculateDashboardStats } from '@/utils/helpers';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Activity, Users, AlertTriangle, FileText, MapPin, TrendingUp } from 'lucide-react';

const Dashboard: React.FC = () => {
  const { tbCases, screenings, households, fieldActivities } = useApp();
  const stats = calculateDashboardStats(tbCases, screenings, households, fieldActivities);

  const statusData = [
    { name: 'Suspek', value: tbCases.filter(c => c.status === 'suspek').length, color: '#f59e0b' },
    { name: 'Probable', value: tbCases.filter(c => c.status === 'probable').length, color: '#fb923c' },
    { name: 'Confirmed', value: tbCases.filter(c => c.status === 'confirmed').length, color: '#ef4444' },
    { name: 'Dalam Pengobatan', value: tbCases.filter(c => c.status === 'on_treatment').length, color: '#3b82f6' },
    { name: 'Sembuh', value: tbCases.filter(c => c.status === 'sembuh').length, color: '#22c55e' },
  ];

  const monthlyData = [
    { bulan: 'Okt', kasus: 3, skrining: 8 },
    { bulan: 'Nov', kasus: 2, skrining: 5 },
    { bulan: 'Des', kasus: 1, skrining: 4 },
    { bulan: 'Jan', kasus: 2, skrining: 7 },
    { bulan: 'Feb', kasus: 2, skrining: 9 },
  ];

  const wilayahData = [
    { wilayah: 'Coblong', kasus: 4 },
    { wilayah: 'Sukajadi', kasus: 2 },
    { wilayah: 'Cicendo', kasus: 4 },
  ];

  const statCards = [
    { title: 'Total Kasus', value: stats.totalCases, icon: Users, color: 'bg-blue-500', change: '+2 bulan ini' },
    { title: 'Kasus Aktif', value: stats.activeCases, icon: Activity, color: 'bg-red-500', change: 'Dalam pengobatan' },
    { title: 'Kasus Resisten', value: stats.resistantCases, icon: AlertTriangle, color: 'bg-orange-500', change: 'RO/RR/MDR' },
    { title: 'Skrining Bulan Ini', value: stats.screeningsThisMonth, icon: FileText, color: 'bg-green-500', change: `+${stats.screeningsToday} hari ini` },
    { title: 'Rujukan', value: stats.referrals, icon: TrendingUp, color: 'bg-purple-500', change: 'Total rujukan' },
    { title: 'Zona Risiko Tinggi', value: stats.highRiskZones, icon: MapPin, color: 'bg-yellow-500', change: 'Rumah tangga' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard Analitik</h1>
        <p className="text-gray-600 mt-1">Ringkasan data TBC dan kegiatan skrining</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {statCards.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="card">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <p className="text-sm text-gray-600 mb-1">{stat.title}</p>
                  <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                  <p className="text-xs text-gray-500 mt-1">{stat.change}</p>
                </div>
                <div className={`${stat.color} p-3 rounded-lg`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Tren Kasus & Skrining</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="bulan" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="kasus" stroke="#ef4444" strokeWidth={2} name="Kasus Baru" />
              <Line type="monotone" dataKey="skrining" stroke="#3b82f6" strokeWidth={2} name="Skrining" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="card">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Distribusi Status Kasus</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={statusData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {statusData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="card">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Kasus per Wilayah</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={wilayahData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="wilayah" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="kasus" fill="#0ea5e9" name="Jumlah Kasus" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="card">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Aktivitas Terbaru</h2>
          <div className="space-y-3 max-h-[300px] overflow-y-auto">
            {fieldActivities.slice(0, 5).map((activity) => (
              <div key={activity.id} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                <div className="bg-primary-100 p-2 rounded">
                  <Activity className="w-4 h-4 text-primary-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-gray-900">{activity.petugasName}</p>
                  <p className="text-xs text-gray-600">{activity.activityType.replace(/_/g, ' ')}</p>
                  <p className="text-xs text-gray-500 mt-1">{activity.notes}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
