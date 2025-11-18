import React, { useState } from 'react';
import { useApp } from '@/contexts/AppContext';
import MapView from '@/components/map/MapView';
import { Map, Layers, Activity } from 'lucide-react';

const MapGeospatial: React.FC = () => {
  const { tbCases, clusters, households } = useApp();
  const [showCases, setShowCases] = useState(true);
  const [showClusters, setShowClusters] = useState(true);
  const [showHouseholds, setShowHouseholds] = useState(false);

  return (
    <div className="h-full flex flex-col">
      <div className="bg-white border-b border-gray-200 p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Map className="w-6 h-6 text-primary-600" />
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Peta Geospasial TBC</h1>
              <p className="text-sm text-gray-600">Visualisasi persebaran kasus dan zona risiko</p>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2">
            <Layers className="w-5 h-5 text-gray-600" />
            <span className="text-sm font-medium text-gray-700">Layer:</span>
          </div>
          
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={showCases}
              onChange={(e) => setShowCases(e.target.checked)}
              className="w-4 h-4 text-primary-600 rounded focus:ring-primary-500"
            />
            <span className="text-sm text-gray-700">Kasus TBC</span>
            <span className="bg-red-100 text-red-800 text-xs px-2 py-0.5 rounded-full">
              {tbCases.length}
            </span>
          </label>

          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={showClusters}
              onChange={(e) => setShowClusters(e.target.checked)}
              className="w-4 h-4 text-primary-600 rounded focus:ring-primary-500"
            />
            <span className="text-sm text-gray-700">Klaster</span>
            <span className="bg-orange-100 text-orange-800 text-xs px-2 py-0.5 rounded-full">
              {clusters.length}
            </span>
          </label>

          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={showHouseholds}
              onChange={(e) => setShowHouseholds(e.target.checked)}
              className="w-4 h-4 text-primary-600 rounded focus:ring-primary-500"
            />
            <span className="text-sm text-gray-700">Rumah Tangga</span>
            <span className="bg-blue-100 text-blue-800 text-xs px-2 py-0.5 rounded-full">
              {households.length}
            </span>
          </label>

        </div>
      </div>

      <div className="flex-1 relative">
        <MapView
          cases={tbCases}
          clusters={clusters}
          households={households}
          showCases={showCases}
          showClusters={showClusters}
          showHouseholds={showHouseholds}
        />
      </div>

      <div className="bg-white border-t border-gray-200 p-4">
        <div className="flex items-center gap-6 text-xs">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-red-500 rounded-full"></div>
            <span className="text-gray-700">Zona Risiko Tinggi</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-yellow-500 rounded-full"></div>
            <span className="text-gray-700">Zona Risiko Sedang</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-green-500 rounded-full"></div>
            <span className="text-gray-700">Zona Risiko Rendah</span>
          </div>
          <div className="ml-auto flex items-center gap-2">
            <Activity className="w-4 h-4 text-primary-600" />
            <span className="text-gray-700">
              Total: {tbCases.length} kasus, {clusters.length} klaster terdeteksi
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapGeospatial;
