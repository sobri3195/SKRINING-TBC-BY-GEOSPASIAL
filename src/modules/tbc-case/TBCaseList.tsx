import React, { useState } from 'react';
import { useApp } from '@/contexts/AppContext';
import { formatDate, getStatusColor, getStatusLabel, exportToCSV } from '@/utils/helpers';
import { Search, Download, Eye, Filter } from 'lucide-react';

const TBCaseList: React.FC = () => {
  const { tbCases } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [selectedCase, setSelectedCase] = useState<string | null>(null);

  const filteredCases = tbCases.filter(tbCase => {
    const matchesSearch = tbCase.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tbCase.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tbCase.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || tbCase.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const handleExport = () => {
    const exportData = filteredCases.map(c => ({
      ID: c.id,
      'Nama Pasien': c.patientName,
      Usia: c.age,
      'Jenis Kelamin': c.gender,
      Alamat: c.address,
      RT: c.wilayah.rt,
      RW: c.wilayah.rw,
      Kelurahan: c.wilayah.kelurahan,
      Kecamatan: c.wilayah.kecamatan,
      Status: getStatusLabel(c.status),
      'Tipe Resistensi': c.resistanceType,
      'Tanggal Diagnosis': formatDate(c.diagnosisDate),
      'Tanggal Mulai Pengobatan': c.treatmentStartDate ? formatDate(c.treatmentStartDate) : '-',
      'Anggota Keluarga': c.householdMembers,
      'Kontak Disaring': c.contactsScreened
    }));
    exportToCSV(exportData, `kasus_tbc_${new Date().toISOString().split('T')[0]}.csv`);
  };

  const selectedCaseData = tbCases.find(c => c.id === selectedCase);

  return (
    <div className="space-y-4 md:space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Data Kasus TBC</h1>
          <p className="text-sm md:text-base text-gray-600 mt-1">Total {filteredCases.length} kasus tercatat</p>
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
              placeholder="Cari nama, alamat, atau ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input-field pl-9 md:pl-10 text-sm md:text-base"
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 md:w-5 md:h-5 text-gray-600 flex-shrink-0" />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="input-field text-sm md:text-base"
            >
              <option value="all">Semua Status</option>
              <option value="suspek">Suspek</option>
              <option value="probable">Probable</option>
              <option value="confirmed">Confirmed</option>
              <option value="on_treatment">Dalam Pengobatan</option>
              <option value="drop_out">Drop Out</option>
              <option value="sembuh">Sembuh</option>
            </select>
          </div>
        </div>

        <div className="hidden lg:block overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">ID</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Nama Pasien</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Usia/Gender</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Wilayah</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Status</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Resistensi</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Kontak</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {filteredCases.map((tbCase) => (
                <tr key={tbCase.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4 text-sm font-mono text-gray-900">{tbCase.id}</td>
                  <td className="py-3 px-4 text-sm text-gray-900">{tbCase.patientName}</td>
                  <td className="py-3 px-4 text-sm text-gray-600">{tbCase.age} / {tbCase.gender}</td>
                  <td className="py-3 px-4 text-sm text-gray-600">
                    {tbCase.wilayah.kelurahan}, RT {tbCase.wilayah.rt}
                  </td>
                  <td className="py-3 px-4">
                    <span className={`text-xs px-2 py-1 rounded ${getStatusColor(tbCase.status)}`}>
                      {getStatusLabel(tbCase.status)}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    {tbCase.resistanceType !== 'none' ? (
                      <span className="text-xs px-2 py-1 bg-red-100 text-red-800 rounded font-semibold">
                        {tbCase.resistanceType}
                      </span>
                    ) : (
                      <span className="text-xs text-gray-500">-</span>
                    )}
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-600">
                    {tbCase.contactsScreened}/{tbCase.householdMembers}
                  </td>
                  <td className="py-3 px-4">
                    <button
                      onClick={() => setSelectedCase(tbCase.id)}
                      className="text-primary-600 hover:text-primary-700 p-1"
                      aria-label="Lihat detail"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="lg:hidden space-y-3">
          {filteredCases.map((tbCase) => (
            <div key={tbCase.id} className="border border-gray-200 rounded-lg p-3 bg-white">
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 text-sm">{tbCase.patientName}</h3>
                  <p className="text-xs text-gray-500 font-mono">{tbCase.id}</p>
                </div>
                <button
                  onClick={() => setSelectedCase(tbCase.id)}
                  className="text-primary-600 hover:text-primary-700 p-2"
                  aria-label="Lihat detail"
                >
                  <Eye className="w-4 h-4" />
                </button>
              </div>
              <div className="space-y-1.5 text-xs">
                <div className="flex items-center gap-2">
                  <span className="text-gray-500">Usia/Gender:</span>
                  <span className="text-gray-900">{tbCase.age} / {tbCase.gender}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-gray-500">Wilayah:</span>
                  <span className="text-gray-900">{tbCase.wilayah.kelurahan}, RT {tbCase.wilayah.rt}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-gray-500">Status:</span>
                  <span className={`text-xs px-2 py-0.5 rounded ${getStatusColor(tbCase.status)}`}>
                    {getStatusLabel(tbCase.status)}
                  </span>
                </div>
                {tbCase.resistanceType !== 'none' && (
                  <div className="flex items-center gap-2">
                    <span className="text-gray-500">Resistensi:</span>
                    <span className="text-xs px-2 py-0.5 bg-red-100 text-red-800 rounded font-semibold">
                      {tbCase.resistanceType}
                    </span>
                  </div>
                )}
                <div className="flex items-center gap-2">
                  <span className="text-gray-500">Kontak:</span>
                  <span className="text-gray-900">{tbCase.contactsScreened}/{tbCase.householdMembers}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredCases.length === 0 && (
          <div className="text-center py-8 md:py-12 text-sm md:text-base text-gray-500">
            Tidak ada kasus yang ditemukan
          </div>
        )}
      </div>

      {selectedCaseData && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-3 md:p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-4 md:p-6">
              <div className="flex items-center justify-between mb-4 md:mb-6">
                <h2 className="text-xl md:text-2xl font-bold text-gray-900">Detail Kasus</h2>
                <button
                  onClick={() => setSelectedCase(null)}
                  className="text-gray-400 hover:text-gray-600 p-2"
                  aria-label="Tutup"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-3 md:space-y-4">
                <div>
                  <label className="text-xs md:text-sm font-semibold text-gray-700 block mb-1">ID Kasus</label>
                  <p className="text-sm md:text-base text-gray-900 font-mono">{selectedCaseData.id}</p>
                </div>
                <div>
                  <label className="text-xs md:text-sm font-semibold text-gray-700 block mb-1">Nama Pasien</label>
                  <p className="text-sm md:text-base text-gray-900">{selectedCaseData.patientName}</p>
                </div>
                <div className="grid grid-cols-2 gap-3 md:gap-4">
                  <div>
                    <label className="text-xs md:text-sm font-semibold text-gray-700 block mb-1">Usia</label>
                    <p className="text-sm md:text-base text-gray-900">{selectedCaseData.age} tahun</p>
                  </div>
                  <div>
                    <label className="text-xs md:text-sm font-semibold text-gray-700 block mb-1">Jenis Kelamin</label>
                    <p className="text-sm md:text-base text-gray-900">{selectedCaseData.gender === 'L' ? 'Laki-laki' : 'Perempuan'}</p>
                  </div>
                </div>
                <div>
                  <label className="text-xs md:text-sm font-semibold text-gray-700 block mb-1">Alamat</label>
                  <p className="text-sm md:text-base text-gray-900">{selectedCaseData.address}</p>
                </div>
                <div className="grid grid-cols-2 gap-3 md:gap-4">
                  <div>
                    <label className="text-xs md:text-sm font-semibold text-gray-700 block mb-1">RT/RW</label>
                    <p className="text-sm md:text-base text-gray-900">{selectedCaseData.wilayah.rt}/{selectedCaseData.wilayah.rw}</p>
                  </div>
                  <div>
                    <label className="text-xs md:text-sm font-semibold text-gray-700 block mb-1">Kelurahan</label>
                    <p className="text-sm md:text-base text-gray-900">{selectedCaseData.wilayah.kelurahan}</p>
                  </div>
                </div>
                <div>
                  <label className="text-xs md:text-sm font-semibold text-gray-700 block mb-1">Kecamatan</label>
                  <p className="text-sm md:text-base text-gray-900">{selectedCaseData.wilayah.kecamatan}</p>
                </div>
                <div>
                  <label className="text-xs md:text-sm font-semibold text-gray-700 block mb-1">Status</label>
                  <p><span className={`text-xs px-2 py-1 rounded ${getStatusColor(selectedCaseData.status)}`}>
                    {getStatusLabel(selectedCaseData.status)}
                  </span></p>
                </div>
                <div>
                  <label className="text-xs md:text-sm font-semibold text-gray-700 block mb-1">Tipe Resistensi</label>
                  <p className="text-sm md:text-base text-gray-900">{selectedCaseData.resistanceType === 'none' ? 'Tidak Ada' : selectedCaseData.resistanceType}</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
                  <div>
                    <label className="text-xs md:text-sm font-semibold text-gray-700 block mb-1">Tanggal Diagnosis</label>
                    <p className="text-sm md:text-base text-gray-900">{formatDate(selectedCaseData.diagnosisDate)}</p>
                  </div>
                  {selectedCaseData.treatmentStartDate && (
                    <div>
                      <label className="text-xs md:text-sm font-semibold text-gray-700 block mb-1">Mulai Pengobatan</label>
                      <p className="text-sm md:text-base text-gray-900">{formatDate(selectedCaseData.treatmentStartDate)}</p>
                    </div>
                  )}
                </div>
                <div className="grid grid-cols-2 gap-3 md:gap-4">
                  <div>
                    <label className="text-xs md:text-sm font-semibold text-gray-700 block mb-1">Anggota Keluarga</label>
                    <p className="text-sm md:text-base text-gray-900">{selectedCaseData.householdMembers} orang</p>
                  </div>
                  <div>
                    <label className="text-xs md:text-sm font-semibold text-gray-700 block mb-1">Kontak Disaring</label>
                    <p className="text-sm md:text-base text-gray-900">{selectedCaseData.contactsScreened}/{selectedCaseData.householdMembers}</p>
                  </div>
                </div>
                <div>
                  <label className="text-xs md:text-sm font-semibold text-gray-700 block mb-1">Koordinat</label>
                  <p className="text-sm md:text-base text-gray-900 font-mono text-xs break-all">{selectedCaseData.latitude.toFixed(6)}, {selectedCaseData.longitude.toFixed(6)}</p>
                </div>
              </div>

              <div className="mt-4 md:mt-6 flex justify-end">
                <button onClick={() => setSelectedCase(null)} className="btn-secondary text-sm md:text-base">
                  Tutup
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TBCaseList;
