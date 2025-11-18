import React, { useState } from 'react';
import { useApp } from '@/contexts/AppContext';
import { useAuth } from '@/contexts/AuthContext';
import { ScreeningRecord } from '@/types';
import { generateId } from '@/utils/helpers';
import { ClipboardCheck, Save } from 'lucide-react';

const ScreeningForm: React.FC = () => {
  const { addScreening } = useApp();
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    personName: '',
    age: '',
    gender: 'L' as 'L' | 'P',
    address: '',
    latitude: '',
    longitude: '',
    screeningType: 'komunitas' as 'kontak_erat' | 'komunitas' | 'massal',
    caseId: '',
    cough: false,
    coughDuration: '',
    weightLoss: false,
    nightSweats: false,
    fever: false,
    chestPain: false,
    hasContact: false,
    referred: false,
  });

  const [success, setSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleGetLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setFormData(prev => ({
            ...prev,
            latitude: position.coords.latitude.toString(),
            longitude: position.coords.longitude.toString()
          }));
        },
        () => {
          setFormData(prev => ({
            ...prev,
            latitude: (-6.900 + Math.random() * 0.01).toFixed(6),
            longitude: (107.602 + Math.random() * 0.01).toFixed(6)
          }));
        }
      );
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newScreening: ScreeningRecord = {
      id: generateId('SCR'),
      caseId: formData.caseId || undefined,
      personName: formData.personName,
      age: parseInt(formData.age),
      gender: formData.gender,
      address: formData.address,
      latitude: parseFloat(formData.latitude),
      longitude: parseFloat(formData.longitude),
      screeningDate: new Date(),
      screeningType: formData.screeningType,
      symptoms: {
        cough: formData.cough,
        coughDuration: formData.cough ? parseInt(formData.coughDuration) : undefined,
        weightLoss: formData.weightLoss,
        nightSweats: formData.nightSweats,
        fever: formData.fever,
        chestPain: formData.chestPain
      },
      hasContact: formData.hasContact,
      referred: formData.referred,
      result: formData.referred ? 'suspek' : 'negatif',
      petugasId: user?.id || '0',
      petugasName: user?.name || 'Unknown'
    };

    addScreening(newScreening);
    setSuccess(true);
    
    setTimeout(() => {
      setSuccess(false);
      setFormData({
        personName: '',
        age: '',
        gender: 'L',
        address: '',
        latitude: '',
        longitude: '',
        screeningType: 'komunitas',
        caseId: '',
        cough: false,
        coughDuration: '',
        weightLoss: false,
        nightSweats: false,
        fever: false,
        chestPain: false,
        hasContact: false,
        referred: false,
      });
    }, 2000);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="card p-4 md:p-6">
        <div className="flex items-center gap-2 md:gap-3 mb-4 md:mb-6">
          <div className="bg-primary-100 p-2 md:p-3 rounded-lg flex-shrink-0">
            <ClipboardCheck className="w-5 h-5 md:w-6 md:h-6 text-primary-600" />
          </div>
          <div>
            <h2 className="text-xl md:text-2xl font-bold text-gray-900">Form Skrining TBC</h2>
            <p className="text-xs md:text-sm text-gray-600">Isi data skrining dengan lengkap</p>
          </div>
        </div>

        {success && (
          <div className="mb-4 md:mb-6 bg-green-50 border border-green-200 text-green-700 px-3 md:px-4 py-2 md:py-3 rounded-lg text-sm">
            Data skrining berhasil disimpan!
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
            <div>
              <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1">
                Nama Lengkap *
              </label>
              <input
                type="text"
                name="personName"
                value={formData.personName}
                onChange={handleChange}
                className="input-field text-sm md:text-base"
                required
              />
            </div>

            <div>
              <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1">
                Usia *
              </label>
              <input
                type="number"
                name="age"
                value={formData.age}
                onChange={handleChange}
                className="input-field text-sm md:text-base"
                required
              />
            </div>

            <div>
              <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1">
                Jenis Kelamin *
              </label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="input-field text-sm md:text-base"
                required
              >
                <option value="L">Laki-laki</option>
                <option value="P">Perempuan</option>
              </select>
            </div>

            <div>
              <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1">
                Jenis Skrining *
              </label>
              <select
                name="screeningType"
                value={formData.screeningType}
                onChange={handleChange}
                className="input-field text-sm md:text-base"
                required
              >
                <option value="kontak_erat">Kontak Erat</option>
                <option value="komunitas">Komunitas</option>
                <option value="massal">Massal</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1">
              Alamat *
            </label>
            <textarea
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="input-field text-sm md:text-base"
              rows={2}
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
            <div>
              <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1">
                Latitude *
              </label>
              <input
                type="text"
                name="latitude"
                value={formData.latitude}
                onChange={handleChange}
                className="input-field text-sm md:text-base"
                placeholder="-6.900"
                required
              />
            </div>

            <div>
              <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1">
                Longitude *
              </label>
              <input
                type="text"
                name="longitude"
                value={formData.longitude}
                onChange={handleChange}
                className="input-field text-sm md:text-base"
                placeholder="107.602"
                required
              />
            </div>

            <div className="flex items-end">
              <button
                type="button"
                onClick={handleGetLocation}
                className="btn-secondary w-full text-sm md:text-base"
              >
                Ambil Lokasi GPS
              </button>
            </div>
          </div>

          <div className="border-t pt-4 md:pt-6">
            <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-3 md:mb-4">Gejala TBC</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  name="cough"
                  checked={formData.cough}
                  onChange={handleChange}
                  className="w-4 h-4 text-primary-600 rounded focus:ring-primary-500 flex-shrink-0"
                />
                <span className="text-xs md:text-sm text-gray-700">Batuk</span>
              </label>

              {formData.cough && (
                <div>
                  <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1">
                    Durasi Batuk (hari)
                  </label>
                  <input
                    type="number"
                    name="coughDuration"
                    value={formData.coughDuration}
                    onChange={handleChange}
                    className="input-field text-sm md:text-base"
                  />
                </div>
              )}

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  name="weightLoss"
                  checked={formData.weightLoss}
                  onChange={handleChange}
                  className="w-4 h-4 text-primary-600 rounded focus:ring-primary-500 flex-shrink-0"
                />
                <span className="text-xs md:text-sm text-gray-700">Penurunan Berat Badan</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  name="nightSweats"
                  checked={formData.nightSweats}
                  onChange={handleChange}
                  className="w-4 h-4 text-primary-600 rounded focus:ring-primary-500 flex-shrink-0"
                />
                <span className="text-xs md:text-sm text-gray-700">Keringat Malam</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  name="fever"
                  checked={formData.fever}
                  onChange={handleChange}
                  className="w-4 h-4 text-primary-600 rounded focus:ring-primary-500 flex-shrink-0"
                />
                <span className="text-xs md:text-sm text-gray-700">Demam</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  name="chestPain"
                  checked={formData.chestPain}
                  onChange={handleChange}
                  className="w-4 h-4 text-primary-600 rounded focus:ring-primary-500 flex-shrink-0"
                />
                <span className="text-xs md:text-sm text-gray-700">Nyeri Dada</span>
              </label>
            </div>
          </div>

          <div className="border-t pt-4 md:pt-6">
            <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-3 md:mb-4">Tindak Lanjut</h3>
            <div className="space-y-3">
              <label className="flex items-start gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  name="hasContact"
                  checked={formData.hasContact}
                  onChange={handleChange}
                  className="w-4 h-4 text-primary-600 rounded focus:ring-primary-500 flex-shrink-0 mt-0.5"
                />
                <span className="text-xs md:text-sm text-gray-700">Memiliki Riwayat Kontak dengan Pasien TBC</span>
              </label>

              <label className="flex items-start gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  name="referred"
                  checked={formData.referred}
                  onChange={handleChange}
                  className="w-4 h-4 text-primary-600 rounded focus:ring-primary-500 flex-shrink-0 mt-0.5"
                />
                <span className="text-xs md:text-sm text-gray-700">Rujuk untuk Pemeriksaan Lanjutan</span>
              </label>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-4 md:pt-6">
            <button type="submit" className="btn-primary flex items-center justify-center gap-2 text-sm md:text-base">
              <Save className="w-4 h-4" />
              Simpan Skrining
            </button>
            <button type="button" className="btn-secondary text-sm md:text-base">
              Reset
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ScreeningForm;
