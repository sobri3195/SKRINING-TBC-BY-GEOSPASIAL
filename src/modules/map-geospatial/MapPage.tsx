import React, { useState } from 'react';
import { Box, Paper, Typography, ToggleButton, ToggleButtonGroup, Chip, Card, CardContent } from '@mui/material';
import { MapContainer, TileLayer, Marker, Popup, Circle, CircleMarker } from 'react-leaflet';
import { Icon, LatLngExpression } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useData } from '../../contexts/DataContext';
import { RiskLevel } from '../../types';

const createIcon = (color: string) => new Icon({
  iconUrl: `data:image/svg+xml;base64,${btoa(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="32" height="32">
      <path fill="${color}" d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
    </svg>
  `)}`,
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32]
});

const redIcon = createIcon('#f44336');
const orangeIcon = createIcon('#ff9800');
const greenIcon = createIcon('#4caf50');
const purpleIcon = createIcon('#9c27b0');

const MapPage: React.FC = () => {
  const { tbCases, clusters, households } = useData();
  const [mapLayer, setMapLayer] = useState<'kasus' | 'heatmap' | 'cluster' | 'household'>('kasus');
  const [showRO, setShowRO] = useState(true);
  const [showActive, setShowActive] = useState(true);

  const center: LatLngExpression = [-7.2580, 112.7525];

  const getRiskColor = (risk: RiskLevel): string => {
    switch (risk) {
      case 'tinggi': return '#f44336';
      case 'sedang': return '#ff9800';
      case 'rendah': return '#4caf50';
    }
  };

  const getStatusIcon = (status: string, resistenceType: string) => {
    if (resistenceType === 'RO' || resistenceType === 'RR') return purpleIcon;
    if (status === 'on_treatment') return orangeIcon;
    if (status === 'sembuh') return greenIcon;
    return redIcon;
  };

  const filteredCases = tbCases.filter(tc => {
    if (!showRO && (tc.resistenceType === 'RO' || tc.resistenceType === 'RR')) return false;
    if (!showActive && tc.status === 'on_treatment') return false;
    return true;
  });

  return (
    <Box>
      <Typography variant="h4" gutterBottom fontWeight="bold">
        Peta Geospasial TBC
      </Typography>
      <Typography variant="body1" color="text.secondary" gutterBottom sx={{ mb: 3 }}>
        Visualisasi persebaran kasus TBC dan analisis geospasial
      </Typography>

      <Box sx={{ mb: 3, display: 'flex', gap: 2, flexWrap: 'wrap', alignItems: 'center' }}>
        <ToggleButtonGroup
          value={mapLayer}
          exclusive
          onChange={(_, value) => value && setMapLayer(value)}
          size="small"
        >
          <ToggleButton value="kasus">Kasus TBC</ToggleButton>
          <ToggleButton value="heatmap">Heatmap</ToggleButton>
          <ToggleButton value="cluster">Klaster</ToggleButton>
          <ToggleButton value="household">Rumah Tangga</ToggleButton>
        </ToggleButtonGroup>

        <Box sx={{ display: 'flex', gap: 1 }}>
          <Chip
            label="Kasus RO/RR"
            color={showRO ? 'secondary' : 'default'}
            onClick={() => setShowRO(!showRO)}
            sx={{ cursor: 'pointer' }}
          />
          <Chip
            label="Kasus Aktif"
            color={showActive ? 'warning' : 'default'}
            onClick={() => setShowActive(!showActive)}
            sx={{ cursor: 'pointer' }}
          />
        </Box>
      </Box>

      <Paper elevation={3} sx={{ p: 2, mb: 3 }}>
        <Box sx={{ height: 600 }}>
          <MapContainer
            center={center}
            zoom={15}
            style={{ height: '100%', width: '100%' }}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {(mapLayer === 'kasus' || mapLayer === 'heatmap') && filteredCases.map((tbCase) => (
              <Marker
                key={tbCase.id}
                position={[tbCase.coordinates.lat, tbCase.coordinates.lng]}
                icon={getStatusIcon(tbCase.status, tbCase.resistenceType)}
              >
                <Popup>
                  <Box sx={{ minWidth: 200 }}>
                    <Typography variant="subtitle2" fontWeight="bold">
                      {tbCase.nama}
                    </Typography>
                    <Typography variant="caption" display="block">
                      ID: {tbCase.id}
                    </Typography>
                    <Typography variant="caption" display="block">
                      Status: {tbCase.status.replace('_', ' ').toUpperCase()}
                    </Typography>
                    {(tbCase.resistenceType === 'RO' || tbCase.resistenceType === 'RR') && (
                      <Chip label={tbCase.resistenceType} color="secondary" size="small" sx={{ mt: 1 }} />
                    )}
                    <Typography variant="caption" display="block" sx={{ mt: 1 }}>
                      {tbCase.alamat}
                    </Typography>
                    <Typography variant="caption" display="block">
                      {tbCase.wilayah.rt}/{tbCase.wilayah.rw}, {tbCase.wilayah.desa}
                    </Typography>
                  </Box>
                </Popup>
              </Marker>
            ))}

            {mapLayer === 'cluster' && clusters.map((cluster) => (
              <React.Fragment key={cluster.id}>
                <Circle
                  center={[cluster.centerCoordinates.lat, cluster.centerCoordinates.lng]}
                  radius={cluster.radius}
                  pathOptions={{
                    color: getRiskColor(cluster.riskLevel),
                    fillColor: getRiskColor(cluster.riskLevel),
                    fillOpacity: 0.2
                  }}
                />
                <CircleMarker
                  center={[cluster.centerCoordinates.lat, cluster.centerCoordinates.lng]}
                  radius={10}
                  pathOptions={{
                    color: getRiskColor(cluster.riskLevel),
                    fillColor: getRiskColor(cluster.riskLevel),
                    fillOpacity: 0.8
                  }}
                >
                  <Popup>
                    <Box>
                      <Typography variant="subtitle2" fontWeight="bold">
                        Klaster {cluster.id}
                      </Typography>
                      <Typography variant="caption" display="block">
                        Jumlah Kasus: {cluster.jumlahKasus}
                      </Typography>
                      <Typography variant="caption" display="block">
                        Radius: {cluster.radius}m
                      </Typography>
                      <Typography variant="caption" display="block">
                        Wilayah: {cluster.wilayah}
                      </Typography>
                      <Chip
                        label={`Risiko ${cluster.riskLevel.toUpperCase()}`}
                        size="small"
                        sx={{
                          mt: 1,
                          bgcolor: getRiskColor(cluster.riskLevel),
                          color: 'white'
                        }}
                      />
                    </Box>
                  </Popup>
                </CircleMarker>
              </React.Fragment>
            ))}

            {mapLayer === 'household' && households.map((hh) => (
              <CircleMarker
                key={hh.id}
                center={[hh.coordinates.lat, hh.coordinates.lng]}
                radius={8}
                pathOptions={{
                  color: getRiskColor(hh.riskScore),
                  fillColor: getRiskColor(hh.riskScore),
                  fillOpacity: 0.7
                }}
              >
                <Popup>
                  <Box>
                    <Typography variant="subtitle2" fontWeight="bold">
                      {hh.alamat}
                    </Typography>
                    <Typography variant="caption" display="block">
                      Penghuni: {hh.kepadatanPenghuni} orang
                    </Typography>
                    <Typography variant="caption" display="block">
                      Ventilasi: {hh.kondisiVentilasi}
                    </Typography>
                    <Typography variant="caption" display="block">
                      Sanitasi: {hh.sanitasi}
                    </Typography>
                    {hh.riwayatTBC && (
                      <Typography variant="caption" display="block" color="error">
                        ⚠ Riwayat TBC
                      </Typography>
                    )}
                    <Chip
                      label={`Risiko ${hh.riskScore.toUpperCase()}`}
                      size="small"
                      sx={{
                        mt: 1,
                        bgcolor: getRiskColor(hh.riskScore),
                        color: 'white'
                      }}
                    />
                  </Box>
                </Popup>
              </CircleMarker>
            ))}
          </MapContainer>
        </Box>
      </Paper>

      <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
        <Card sx={{ flex: 1, minWidth: 250 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom fontWeight="bold">
              Legenda Status
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Box sx={{ width: 20, height: 20, bgcolor: '#f44336', borderRadius: '50%' }} />
                <Typography variant="body2">Suspek / Confirmed</Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Box sx={{ width: 20, height: 20, bgcolor: '#ff9800', borderRadius: '50%' }} />
                <Typography variant="body2">Dalam Pengobatan</Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Box sx={{ width: 20, height: 20, bgcolor: '#4caf50', borderRadius: '50%' }} />
                <Typography variant="body2">Sembuh</Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Box sx={{ width: 20, height: 20, bgcolor: '#9c27b0', borderRadius: '50%' }} />
                <Typography variant="body2">RO/RR (Resisten Obat)</Typography>
              </Box>
            </Box>
          </CardContent>
        </Card>

        <Card sx={{ flex: 1, minWidth: 250 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom fontWeight="bold">
              Statistik Peta
            </Typography>
            <Typography variant="body2">Total Kasus: <strong>{filteredCases.length}</strong></Typography>
            <Typography variant="body2">Klaster: <strong>{clusters.length}</strong></Typography>
            <Typography variant="body2">Rumah Tangga Risiko: <strong>{households.length}</strong></Typography>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};

export default MapPage;
