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
    <div className="space-y-4 md:space-y-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Pemantauan Rumah Tangga</h1>
        <p className="text-sm md:text-base text-gray-600 mt-1">Monitoring kondisi lingkungan dan risiko TBC</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4">
        <div className="card p-4 md:p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs md:text-sm text-gray-600 mb-1">Risiko Tinggi</p>
              <p className="text-2xl md:text-3xl font-bold text-red-600">{highRisk}</p>
            </div>
            <div className="bg-red-100 p-2 md:p-3 rounded-lg flex-shrink-0">
              <Home className="w-5 h-5 md:w-6 md:h-6 text-red-600" />
            </div>
          </div>
        </div>
        <div className="card p-4 md:p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs md:text-sm text-gray-600 mb-1">Risiko Sedang</p>
              <p className="text-2xl md:text-3xl font-bold text-yellow-600">{mediumRisk}</p>
            </div>
            <div className="bg-yellow-100 p-2 md:p-3 rounded-lg flex-shrink-0">
              <Home className="w-5 h-5 md:w-6 md:h-6 text-yellow-600" />
            </div>
          </div>
        </div>
        <div className="card p-4 md:p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs md:text-sm text-gray-600 mb-1">Risiko Rendah</p>
              <p className="text-2xl md:text-3xl font-bold text-green-600">{lowRisk}</p>
            </div>
            <div className="bg-green-100 p-2 md:p-3 rounded-lg flex-shrink-0">
              <Home className="w-5 h-5 md:w-6 md:h-6 text-green-600" />
            </div>
          </div>
        </div>
      </div>

      <div className="card p-3 md:p-6">
        <div className="flex flex-col md:flex-row gap-3 md:gap-4 mb-4 md:mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 md:w-5 md:h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Cari alamat atau kelurahan..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input-field pl-9 md:pl-10 text-sm md:text-base"
            />
          </div>
          <select
            value={filterRisk}
            onChange={(e) => setFilterRisk(e.target.value)}
            className="input-field text-sm md:text-base"
          >
            <option value="all">Semua Tingkat Risiko</option>
            <option value="tinggi">Risiko Tinggi</option>
            <option value="sedang">Risiko Sedang</option>
            <option value="rendah">Risiko Rendah</option>
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
          {filteredHouseholds.map((household) => (
            <div key={household.id} className="border border-gray-200 rounded-lg p-3 md:p-4 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-2 md:mb-3">
                <div className="flex-1 min-w-0">
                  <div className="flex items-start gap-1.5 md:gap-2 mb-1">
                    <MapPin className="w-3.5 h-3.5 md:w-4 md:h-4 text-gray-400 flex-shrink-0 mt-0.5" />
                    <h3 className="font-semibold text-gray-900 text-sm md:text-base break-words">{household.address}</h3>
                  </div>
                  <p className="text-xs md:text-sm text-gray-600">
                    RT {household.rt}/RW {household.rw}, {household.kelurahan}
                  </p>
                </div>
                <span className={`text-xs px-2 py-0.5 md:py-1 rounded font-semibold flex-shrink-0 ml-2 ${getRiskLevelBgColor(household.riskLevel)}`}>
                  {household.riskLevel.toUpperCase()}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 mb-2 md:mb-3">
                <div className="text-xs md:text-sm">
                  <span className="text-gray-600">Penghuni:</span>
                  <span className="ml-1 font-semibold text-gray-900">{household.occupants} orang</span>
                </div>
                <div className="text-xs md:text-sm">
                  <span className="text-gray-600">Skor:</span>
                  <span className="ml-1 font-semibold text-gray-900">{household.riskScore}/100</span>
                </div>
              </div>

              {household.hasTBCase && (
                <div className="mb-2 md:mb-3">
                  <span className="text-xs px-2 py-0.5 md:py-1 bg-red-100 text-red-800 rounded font-semibold">
                    Ada Kasus TBC
                  </span>
                </div>
              )}

              <div className="border-t pt-2 md:pt-3">
                <p className="text-xs font-semibold text-gray-700 mb-1.5 md:mb-2">Faktor Lingkungan:</p>
                <div className="flex flex-wrap gap-1">
                  {household.environmentFactors.poorVentilation && (
                    <span className="text-xs px-2 py-0.5 bg-orange-100 text-orange-800 rounded">
                      Ventilasi buruk
                    </span>
                  )}
                  {household.environmentFactors.highDensity && (
                    <span className="text-xs px-2 py-0.5 bg-orange-100 text-orange-800 rounded">
                      Kepadatan tinggi
                    </span>
                  )}
                  {household.environmentFactors.smokingExposure && (
                    <span className="text-xs px-2 py-0.5 bg-orange-100 text-orange-800 rounded">
                      Paparan rokok
                    </span>
                  )}
                  {household.environmentFactors.previousTBCase && (
                    <span className="text-xs px-2 py-0.5 bg-red-100 text-red-800 rounded">
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
          <div className="text-center py-8 md:py-12 text-sm md:text-base text-gray-500">
            Tidak ada rumah tangga yang ditemukan
          </div>
        )}
      </div>
    </div>
  );
};

export default HouseholdList;
