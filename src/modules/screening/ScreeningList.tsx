import React, { useState } from 'react';
import { useApp } from '@/contexts/AppContext';
import { formatDate, exportToCSV } from '@/utils/helpers';
import { Search, Download, Filter } from 'lucide-react';

const ScreeningList: React.FC = () => {
  const { screenings } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<string>('all');

  const filteredScreenings = screenings.filter(screening => {
    const matchesSearch = screening.personName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      screening.address.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || screening.screeningType === filterType;
    return matchesSearch && matchesType;
  });

  const handleExport = () => {
    const exportData = filteredScreenings.map(s => ({
      ID: s.id,
      Nama: s.personName,
      Usia: s.age,
      'Jenis Kelamin': s.gender,
      Alamat: s.address,
      'Tanggal Skrining': formatDate(s.screeningDate),
      'Jenis Skrining': s.screeningType,
      Batuk: s.symptoms.cough ? 'Ya' : 'Tidak',
      'Durasi Batuk': s.symptoms.coughDuration || '-',
      'Penurunan BB': s.symptoms.weightLoss ? 'Ya' : 'Tidak',
      'Keringat Malam': s.symptoms.nightSweats ? 'Ya' : 'Tidak',
      Demam: s.symptoms.fever ? 'Ya' : 'Tidak',
      'Nyeri Dada': s.symptoms.chestPain ? 'Ya' : 'Tidak',
      Rujuk: s.referred ? 'Ya' : 'Tidak',
      Hasil: s.result || '-',
      Petugas: s.petugasName
    }));
    exportToCSV(exportData, `skrining_tbc_${new Date().toISOString().split('T')[0]}.csv`);
  };

  return (
    <div className="space-y-4 md:space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Data Skrining</h1>
          <p className="text-sm md:text-base text-gray-600 mt-1">Total {filteredScreenings.length} data skrining</p>
        </div>
        <button onClick={handleExport} className="btn-primary flex items-center justify-center gap-2 text-sm md:text-base">
          <Download className="w-4 h-4" />
          <span>Export CSV</span>
        </button>
      </div>

      <div className="card p-3 md:p-6">
        <div className="flex flex-col md:flex-row gap-3 md:gap-4 mb-4 md:mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 md:w-5 md:h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Cari nama atau alamat..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input-field pl-9 md:pl-10 text-sm md:text-base"
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 md:w-5 md:h-5 text-gray-600 flex-shrink-0" />
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="input-field text-sm md:text-base"
            >
              <option value="all">Semua Jenis</option>
              <option value="kontak_erat">Kontak Erat</option>
              <option value="komunitas">Komunitas</option>
              <option value="massal">Massal</option>
            </select>
          </div>
        </div>

        <div className="hidden lg:block overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Nama</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Usia</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Alamat</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Tanggal</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Jenis</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Gejala</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Rujuk</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Hasil</th>
              </tr>
            </thead>
            <tbody>
              {filteredScreenings.map((screening) => {
                const symptomCount = Object.values(screening.symptoms).filter(v => v === true).length;
                return (
                  <tr key={screening.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4 text-sm text-gray-900">{screening.personName}</td>
                    <td className="py-3 px-4 text-sm text-gray-600">{screening.age}</td>
                    <td className="py-3 px-4 text-sm text-gray-600 max-w-xs truncate">{screening.address}</td>
                    <td className="py-3 px-4 text-sm text-gray-600">{formatDate(screening.screeningDate)}</td>
                    <td className="py-3 px-4">
                      <span className="text-xs px-2 py-1 bg-blue-100 text-blue-800 rounded">
                        {screening.screeningType.replace('_', ' ')}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <span className={`text-xs px-2 py-1 rounded ${symptomCount > 2 ? 'bg-red-100 text-red-800' : symptomCount > 0 ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'}`}>
                        {symptomCount} gejala
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      {screening.referred ? (
                        <span className="text-xs px-2 py-1 bg-orange-100 text-orange-800 rounded">Ya</span>
                      ) : (
                        <span className="text-xs px-2 py-1 bg-gray-100 text-gray-800 rounded">Tidak</span>
                      )}
                    </td>
                    <td className="py-3 px-4">
                      {screening.result && (
                        <span className={`text-xs px-2 py-1 rounded ${
                          screening.result === 'positif' ? 'bg-red-100 text-red-800' :
                          screening.result === 'suspek' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-green-100 text-green-800'
                        }`}>
                          {screening.result}
                        </span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="lg:hidden space-y-3">
          {filteredScreenings.map((screening) => {
            const symptomCount = Object.values(screening.symptoms).filter(v => v === true).length;
            return (
              <div key={screening.id} className="border border-gray-200 rounded-lg p-3 bg-white">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 text-sm">{screening.personName}</h3>
                    <p className="text-xs text-gray-500">{screening.age} tahun</p>
                  </div>
                  <span className="text-xs px-2 py-0.5 bg-blue-100 text-blue-800 rounded flex-shrink-0">
                    {screening.screeningType.replace('_', ' ')}
                  </span>
                </div>
                <div className="space-y-1.5 text-xs mb-2">
                  <div className="flex items-start gap-2">
                    <span className="text-gray-500">Alamat:</span>
                    <span className="text-gray-900 flex-1">{screening.address}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-gray-500">Tanggal:</span>
                    <span className="text-gray-900">{formatDate(screening.screeningDate)}</span>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  <span className={`text-xs px-2 py-0.5 rounded ${symptomCount > 2 ? 'bg-red-100 text-red-800' : symptomCount > 0 ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'}`}>
                    {symptomCount} gejala
                  </span>
                  {screening.referred && (
                    <span className="text-xs px-2 py-0.5 bg-orange-100 text-orange-800 rounded">Rujuk</span>
                  )}
                  {screening.result && (
                    <span className={`text-xs px-2 py-0.5 rounded ${
                      screening.result === 'positif' ? 'bg-red-100 text-red-800' :
                      screening.result === 'suspek' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {screening.result}
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {filteredScreenings.length === 0 && (
          <div className="text-center py-8 md:py-12 text-sm md:text-base text-gray-500">
            Tidak ada data skrining yang ditemukan
          </div>
        )}
      </div>
    </div>
  );
};

export default ScreeningList;
