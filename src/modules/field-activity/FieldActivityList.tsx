import React from 'react';
import { useApp } from '@/contexts/AppContext';
import { formatDateTime } from '@/utils/helpers';
import { Activity, MapPin, Calendar } from 'lucide-react';

const FieldActivityList: React.FC = () => {
  const { fieldActivities } = useApp();

  const sortedActivities = [...fieldActivities].sort((a, b) => 
    new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  );

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'edukasi':
        return '📚';
      case 'pengambilan_dahak':
        return '🧪';
      case 'follow_up':
        return '✅';
      case 'kunjungan_keluarga':
        return '🏠';
      default:
        return '📋';
    }
  };

  const getActivityLabel = (type: string) => {
    switch (type) {
      case 'edukasi':
        return 'Edukasi';
      case 'pengambilan_dahak':
        return 'Pengambilan Dahak';
      case 'follow_up':
        return 'Follow Up';
      case 'kunjungan_keluarga':
        return 'Kunjungan Keluarga';
      default:
        return type;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Aktivitas Petugas Lapangan</h1>
        <p className="text-gray-600 mt-1">Total {fieldActivities.length} aktivitas tercatat</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="card">
          <p className="text-sm text-gray-600 mb-1">Total Aktivitas</p>
          <p className="text-2xl font-bold text-gray-900">{fieldActivities.length}</p>
        </div>
        <div className="card">
          <p className="text-sm text-gray-600 mb-1">Edukasi</p>
          <p className="text-2xl font-bold text-blue-600">
            {fieldActivities.filter(a => a.activityType === 'edukasi').length}
          </p>
        </div>
        <div className="card">
          <p className="text-sm text-gray-600 mb-1">Pengambilan Dahak</p>
          <p className="text-2xl font-bold text-green-600">
            {fieldActivities.filter(a => a.activityType === 'pengambilan_dahak').length}
          </p>
        </div>
        <div className="card">
          <p className="text-sm text-gray-600 mb-1">Follow Up</p>
          <p className="text-2xl font-bold text-purple-600">
            {fieldActivities.filter(a => a.activityType === 'follow_up').length}
          </p>
        </div>
      </div>

      <div className="card">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Riwayat Aktivitas</h2>
        <div className="space-y-3">
          {sortedActivities.map((activity) => (
            <div key={activity.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="flex items-start gap-4">
                <div className="text-3xl">{getActivityIcon(activity.activityType)}</div>
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="font-semibold text-gray-900">{getActivityLabel(activity.activityType)}</h3>
                      <p className="text-sm text-gray-600">{activity.petugasName}</p>
                    </div>
                    <span className="text-xs px-2 py-1 bg-primary-100 text-primary-800 rounded">
                      {activity.activityType.replace(/_/g, ' ')}
                    </span>
                  </div>
                  
                  <p className="text-sm text-gray-700 mb-3">{activity.notes}</p>
                  
                  <div className="flex flex-wrap gap-4 text-xs text-gray-500">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      <span>{formatDateTime(activity.timestamp)}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      <span>{activity.latitude.toFixed(6)}, {activity.longitude.toFixed(6)}</span>
                    </div>
                    {activity.caseId && (
                      <div className="flex items-center gap-1">
                        <Activity className="w-3 h-3" />
                        <span>Kasus: {activity.caseId}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {sortedActivities.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            Belum ada aktivitas lapangan tercatat
          </div>
        )}
      </div>
    </div>
  );
};

export default FieldActivityList;
