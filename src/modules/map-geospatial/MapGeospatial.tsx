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
      <div className="bg-white border-b border-gray-200 p-3 md:p-4">
        <div className="flex items-center justify-between mb-3 md:mb-4">
          <div className="flex items-center gap-1.5 md:gap-2">
            <Map className="w-5 h-5 md:w-6 md:h-6 text-primary-600 flex-shrink-0" />
            <div>
              <h1 className="text-lg md:text-2xl font-bold text-gray-900">Peta Geospasial TBC</h1>
              <p className="text-xs md:text-sm text-gray-600 hidden sm:block">Visualisasi persebaran kasus dan zona risiko</p>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2 md:gap-4">
          <div className="flex items-center gap-1.5 md:gap-2">
            <Layers className="w-4 h-4 md:w-5 md:h-5 text-gray-600 flex-shrink-0" />
            <span className="text-xs md:text-sm font-medium text-gray-700">Layer:</span>
          </div>
          
          <label className="flex items-center gap-1.5 md:gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={showCases}
              onChange={(e) => setShowCases(e.target.checked)}
              className="w-4 h-4 text-primary-600 rounded focus:ring-primary-500 flex-shrink-0"
            />
            <span className="text-xs md:text-sm text-gray-700 whitespace-nowrap">Kasus TBC</span>
            <span className="bg-red-100 text-red-800 text-xs px-1.5 md:px-2 py-0.5 rounded-full flex-shrink-0">
              {tbCases.length}
            </span>
          </label>

          <label className="flex items-center gap-1.5 md:gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={showClusters}
              onChange={(e) => setShowClusters(e.target.checked)}
              className="w-4 h-4 text-primary-600 rounded focus:ring-primary-500 flex-shrink-0"
            />
            <span className="text-xs md:text-sm text-gray-700 whitespace-nowrap">Klaster</span>
            <span className="bg-orange-100 text-orange-800 text-xs px-1.5 md:px-2 py-0.5 rounded-full flex-shrink-0">
              {clusters.length}
            </span>
          </label>

          <label className="flex items-center gap-1.5 md:gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={showHouseholds}
              onChange={(e) => setShowHouseholds(e.target.checked)}
              className="w-4 h-4 text-primary-600 rounded focus:ring-primary-500 flex-shrink-0"
            />
            <span className="text-xs md:text-sm text-gray-700 whitespace-nowrap">Rumah Tangga</span>
            <span className="bg-blue-100 text-blue-800 text-xs px-1.5 md:px-2 py-0.5 rounded-full flex-shrink-0">
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

      <div className="bg-white border-t border-gray-200 p-2 md:p-4">
        <div className="flex flex-wrap items-center gap-2 md:gap-6 text-xs">
          <div className="flex items-center gap-1.5 md:gap-2">
            <div className="w-3 h-3 md:w-4 md:h-4 bg-red-500 rounded-full flex-shrink-0"></div>
            <span className="text-gray-700 whitespace-nowrap">Risiko Tinggi</span>
          </div>
          <div className="flex items-center gap-1.5 md:gap-2">
            <div className="w-3 h-3 md:w-4 md:h-4 bg-yellow-500 rounded-full flex-shrink-0"></div>
            <span className="text-gray-700 whitespace-nowrap">Risiko Sedang</span>
          </div>
          <div className="flex items-center gap-1.5 md:gap-2">
            <div className="w-3 h-3 md:w-4 md:h-4 bg-green-500 rounded-full flex-shrink-0"></div>
            <span className="text-gray-700 whitespace-nowrap">Risiko Rendah</span>
          </div>
          <div className="w-full md:w-auto md:ml-auto flex items-center gap-1.5 md:gap-2 mt-1 md:mt-0">
            <Activity className="w-3 h-3 md:w-4 md:h-4 text-primary-600 flex-shrink-0" />
            <span className="text-gray-700">
              {tbCases.length} kasus, {clusters.length} klaster
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapGeospatial;
