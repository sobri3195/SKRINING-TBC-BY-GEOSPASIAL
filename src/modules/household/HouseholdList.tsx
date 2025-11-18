import React, { useState } from 'react';
import { useApp } from '@/contexts/AppContext';
import { getRiskLevelBgColor } from '@/utils/helpers';
import { Home, Search, MapPin } from 'lucide-react';

const HouseholdList: React.FC = () => {
  const { households } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRisk, setFilterRisk] = useState<string>('all');

  const filteredHouseholds = households.filter(household => {
    const matchesSearch = household.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
      household.kelurahan.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRisk = filterRisk === 'all' || household.riskLevel === filterRisk;
    return matchesSearch && matchesRisk;
  });

  const highRisk = households.filter(h => h.riskLevel === 'tinggi').length;
  const mediumRisk = households.filter(h => h.riskLevel === 'sedang').length;
  const lowRisk = households.filter(h => h.riskLevel === 'rendah').length;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Pemantauan Rumah Tangga</h1>
        <p className="text-gray-600 mt-1">Monitoring kondisi lingkungan dan risiko TBC</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Risiko Tinggi</p>
              <p className="text-3xl font-bold text-red-600">{highRisk}</p>
            </div>
            <div className="bg-red-100 p-3 rounded-lg">
              <Home className="w-6 h-6 text-red-600" />
            </div>
          </div>
        </div>
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Risiko Sedang</p>
              <p className="text-3xl font-bold text-yellow-600">{mediumRisk}</p>
            </div>
            <div className="bg-yellow-100 p-3 rounded-lg">
              <Home className="w-6 h-6 text-yellow-600" />
            </div>
          </div>
        </div>
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Risiko Rendah</p>
              <p className="text-3xl font-bold text-green-600">{lowRisk}</p>
            </div>
            <div className="bg-green-100 p-3 rounded-lg">
              <Home className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Cari alamat atau kelurahan..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input-field pl-10"
            />
          </div>
          <select
            value={filterRisk}
            onChange={(e) => setFilterRisk(e.target.value)}
            className="input-field"
          >
            <option value="all">Semua Tingkat Risiko</option>
            <option value="tinggi">Risiko Tinggi</option>
            <option value="sedang">Risiko Sedang</option>
            <option value="rendah">Risiko Rendah</option>
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredHouseholds.map((household) => (
            <div key={household.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <MapPin className="w-4 h-4 text-gray-400" />
                    <h3 className="font-semibold text-gray-900">{household.address}</h3>
                  </div>
                  <p className="text-sm text-gray-600">
                    RT {household.rt}/RW {household.rw}, {household.kelurahan}
                  </p>
                </div>
                <span className={`text-xs px-2 py-1 rounded font-semibold ${getRiskLevelBgColor(household.riskLevel)}`}>
                  {household.riskLevel.toUpperCase()}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 mb-3">
                <div className="text-sm">
                  <span className="text-gray-600">Penghuni:</span>
                  <span className="ml-1 font-semibold text-gray-900">{household.occupants} orang</span>
                </div>
                <div className="text-sm">
                  <span className="text-gray-600">Skor Risiko:</span>
                  <span className="ml-1 font-semibold text-gray-900">{household.riskScore}/100</span>
                </div>
              </div>

              {household.hasTBCase && (
                <div className="mb-3">
                  <span className="text-xs px-2 py-1 bg-red-100 text-red-800 rounded font-semibold">
                    Ada Kasus TBC
                  </span>
                </div>
              )}

              <div className="border-t pt-3">
                <p className="text-xs font-semibold text-gray-700 mb-2">Faktor Lingkungan:</p>
                <div className="flex flex-wrap gap-1">
                  {household.environmentFactors.poorVentilation && (
                    <span className="text-xs px-2 py-1 bg-orange-100 text-orange-800 rounded">
                      Ventilasi buruk
                    </span>
                  )}
                  {household.environmentFactors.highDensity && (
                    <span className="text-xs px-2 py-1 bg-orange-100 text-orange-800 rounded">
                      Kepadatan tinggi
                    </span>
                  )}
                  {household.environmentFactors.smokingExposure && (
                    <span className="text-xs px-2 py-1 bg-orange-100 text-orange-800 rounded">
                      Paparan rokok
                    </span>
                  )}
                  {household.environmentFactors.previousTBCase && (
                    <span className="text-xs px-2 py-1 bg-red-100 text-red-800 rounded">
                      Riwayat TBC
                    </span>
                  )}
                  {!household.environmentFactors.poorVentilation &&
                    !household.environmentFactors.highDensity &&
                    !household.environmentFactors.smokingExposure &&
                    !household.environmentFactors.previousTBCase && (
                    <span className="text-xs text-gray-500">Tidak ada faktor risiko</span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredHouseholds.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            Tidak ada rumah tangga yang ditemukan
          </div>
        )}
      </div>
    </div>
  );
};

export default HouseholdList;
