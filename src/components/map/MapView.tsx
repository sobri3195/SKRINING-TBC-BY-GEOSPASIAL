import React, { useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Circle, CircleMarker, useMap } from 'react-leaflet';
import { Icon, LatLngExpression } from 'leaflet';
import { TBCase, Cluster, Household } from '@/types';
import { getRiskLevelColor, getStatusLabel } from '@/utils/helpers';
import 'leaflet/dist/leaflet.css';

interface MapViewProps {
  cases: TBCase[];
  clusters: Cluster[];
  households: Household[];
  showCases?: boolean;
  showClusters?: boolean;
  showHouseholds?: boolean;
  center?: [number, number];
  zoom?: number;
}

const caseIcon = new Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const householdIcon = new Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const MapUpdater: React.FC<{ center: [number, number]; zoom: number }> = ({ center, zoom }) => {
  const map = useMap();
  useEffect(() => {
    map.setView(center, zoom);
  }, [center, zoom, map]);
  return null;
};

const MapView: React.FC<MapViewProps> = ({
  cases,
  clusters,
  households,
  showCases = true,
  showClusters = true,
  showHouseholds = false,
  center = [-6.900, 107.602],
  zoom = 13
}) => {
  const mapRef = useRef(null);

  return (
    <div className="h-full w-full">
      <MapContainer
        center={center as LatLngExpression}
        zoom={zoom}
        style={{ height: '100%', width: '100%' }}
        ref={mapRef}
      >
        <MapUpdater center={center} zoom={zoom} />
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {showClusters && clusters.map(cluster => (
          <React.Fragment key={cluster.id}>
            <Circle
              center={[cluster.centerLat, cluster.centerLng]}
              radius={cluster.radius}
              pathOptions={{
                color: getRiskLevelColor(cluster.riskLevel),
                fillColor: getRiskLevelColor(cluster.riskLevel),
                fillOpacity: 0.2,
                weight: 2
              }}
            />
            <CircleMarker
              center={[cluster.centerLat, cluster.centerLng]}
              radius={8}
              pathOptions={{
                color: getRiskLevelColor(cluster.riskLevel),
                fillColor: getRiskLevelColor(cluster.riskLevel),
                fillOpacity: 0.8
              }}
            >
              <Popup>
                <div className="p-2">
                  <h3 className="font-bold text-sm mb-1">Klaster TBC</h3>
                  <p className="text-xs">Jumlah Kasus: {cluster.caseCount}</p>
                  <p className="text-xs">Radius: {cluster.radius}m</p>
                  <p className="text-xs">Risiko: <span className={`font-semibold ${cluster.riskLevel === 'tinggi' ? 'text-red-600' : 'text-yellow-600'}`}>
                    {cluster.riskLevel.toUpperCase()}
                  </span></p>
                </div>
              </Popup>
            </CircleMarker>
          </React.Fragment>
        ))}

        {showCases && cases.map(tbCase => (
          <Marker
            key={tbCase.id}
            position={[tbCase.latitude, tbCase.longitude]}
            icon={caseIcon}
          >
            <Popup>
              <div className="p-2 min-w-[200px]">
                <h3 className="font-bold text-sm mb-2">{tbCase.patientName}</h3>
                <div className="space-y-1 text-xs">
                  <p><span className="font-semibold">Status:</span> {getStatusLabel(tbCase.status)}</p>
                  <p><span className="font-semibold">Usia:</span> {tbCase.age} tahun</p>
                  <p><span className="font-semibold">Alamat:</span> {tbCase.address}</p>
                  <p><span className="font-semibold">RT/RW:</span> {tbCase.wilayah.rt}/{tbCase.wilayah.rw}</p>
                  <p><span className="font-semibold">Kelurahan:</span> {tbCase.wilayah.kelurahan}</p>
                  {tbCase.resistanceType !== 'none' && (
                    <p className="text-red-600 font-semibold">Resisten: {tbCase.resistanceType}</p>
                  )}
                  <p><span className="font-semibold">Anggota Keluarga:</span> {tbCase.householdMembers}</p>
                  <p><span className="font-semibold">Kontak Disaring:</span> {tbCase.contactsScreened}/{tbCase.householdMembers}</p>
                </div>
              </div>
            </Popup>
          </Marker>
        ))}

        {showHouseholds && households.map(household => (
          <Marker
            key={household.id}
            position={[household.latitude, household.longitude]}
            icon={householdIcon}
          >
            <Popup>
              <div className="p-2 min-w-[200px]">
                <h3 className="font-bold text-sm mb-2">Rumah Tangga</h3>
                <div className="space-y-1 text-xs">
                  <p><span className="font-semibold">Alamat:</span> {household.address}</p>
                  <p><span className="font-semibold">Penghuni:</span> {household.occupants} orang</p>
                  <p><span className="font-semibold">Skor Risiko:</span> {household.riskScore}/100</p>
                  <p>
                    <span className="font-semibold">Tingkat Risiko:</span>{' '}
                    <span className={household.riskLevel === 'tinggi' ? 'text-red-600 font-semibold' : household.riskLevel === 'sedang' ? 'text-yellow-600 font-semibold' : 'text-green-600 font-semibold'}>
                      {household.riskLevel.toUpperCase()}
                    </span>
                  </p>
                  {household.hasTBCase && (
                    <p className="text-red-600 font-semibold">Ada Kasus TBC</p>
                  )}
                  <div className="mt-2 pt-2 border-t">
                    <p className="font-semibold mb-1">Faktor Lingkungan:</p>
                    {household.environmentFactors.poorVentilation && <p className="text-xs">• Ventilasi buruk</p>}
                    {household.environmentFactors.highDensity && <p className="text-xs">• Kepadatan tinggi</p>}
                    {household.environmentFactors.smokingExposure && <p className="text-xs">• Paparan rokok</p>}
                    {household.environmentFactors.previousTBCase && <p className="text-xs">• Riwayat TBC</p>}
                  </div>
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default MapView;
