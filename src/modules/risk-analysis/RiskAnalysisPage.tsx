import React from 'react';
import {
  Box,
  Paper,
  Typography,
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip
} from '@mui/material';
import { Grid } from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';
import { useData } from '../../contexts/DataContext';
import { RiskLevel } from '../../types';

const RiskAnalysisPage: React.FC = () => {
  const { wilayah, clusters } = useData();

  const getRiskColor = (risk: RiskLevel) => {
    switch (risk) {
      case 'tinggi': return 'error';
      case 'sedang': return 'warning';
      case 'rendah': return 'success';
    }
  };

  const wilayahData = wilayah
    .filter(w => w.tipe === 'desa' || w.tipe === 'rw')
    .map(w => ({
      nama: w.nama,
      kasus: w.jumlahKasus,
      skrining: w.jumlahSkrining,
      rasio: w.jumlahKasus > 0 ? (w.jumlahKasus / w.jumlahSkrining * 100).toFixed(1) : 0
    }));

  const riskFactors = [
    { factor: 'Kepadatan Kasus', value: 75 },
    { factor: 'Cakupan Skrining', value: 58 },
    { factor: 'Kondisi Lingkungan', value: 65 },
    { factor: 'Kasus Resisten', value: 20 },
    { factor: 'Follow-up Rate', value: 80 }
  ];

  return (
    <Box>
      <Typography variant="h4" gutterBottom fontWeight="bold">
        Analisis Risiko TBC
      </Typography>
      <Typography variant="body1" color="text.secondary" gutterBottom sx={{ mb: 3 }}>
        Analisis risiko dan pemetaan wilayah prioritas intervensi
      </Typography>

      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={4}>
          <Card sx={{ bgcolor: 'error.light', color: 'white' }}>
            <CardContent>
              <Typography variant="h4" fontWeight="bold">
                {wilayah.filter(w => w.riskLevel === 'tinggi').length}
              </Typography>
              <Typography variant="body2">
                Wilayah Risiko Tinggi
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card sx={{ bgcolor: 'warning.light', color: 'white' }}>
            <CardContent>
              <Typography variant="h4" fontWeight="bold">
                {wilayah.filter(w => w.riskLevel === 'sedang').length}
              </Typography>
              <Typography variant="body2">
                Wilayah Risiko Sedang
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card sx={{ bgcolor: 'success.light', color: 'white' }}>
            <CardContent>
              <Typography variant="h4" fontWeight="bold">
                {clusters.length}
              </Typography>
              <Typography variant="body2">
                Klaster Terdeteksi
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Paper elevation={3} sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom fontWeight="bold">
              Distribusi Kasus dan Skrining Per Wilayah
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={wilayahData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="nama" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="kasus" fill="#f44336" name="Jumlah Kasus" />
                <Bar dataKey="skrining" fill="#2196f3" name="Jumlah Skrining" />
              </BarChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper elevation={3} sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom fontWeight="bold">
              Analisis Faktor Risiko
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <RadarChart data={riskFactors}>
                <PolarGrid />
                <PolarAngleAxis dataKey="factor" />
                <PolarRadiusAxis />
                <Radar name="Risk Score" dataKey="value" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
              </RadarChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        <Grid item xs={12}>
          <Paper elevation={3} sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom fontWeight="bold">
              Prioritas Wilayah Intervensi
            </Typography>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow sx={{ bgcolor: 'primary.main' }}>
                    <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Wilayah</TableCell>
                    <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Jumlah Kasus</TableCell>
                    <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Jumlah Skrining</TableCell>
                    <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Rasio (%)</TableCell>
                    <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Tingkat Risiko</TableCell>
                    <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Rekomendasi</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {wilayah
                    .filter(w => w.tipe === 'desa' || w.tipe === 'rw')
                    .sort((a, b) => b.jumlahKasus - a.jumlahKasus)
                    .map((w) => (
                      <TableRow key={w.id} hover>
                        <TableCell>
                          <Typography variant="body2" fontWeight="bold">{w.nama}</Typography>
                          <Typography variant="caption" color="text.secondary">
                            {w.tipe.toUpperCase()}
                          </Typography>
                        </TableCell>
                        <TableCell>{w.jumlahKasus}</TableCell>
                        <TableCell>{w.jumlahSkrining}</TableCell>
                        <TableCell>
                          {w.jumlahKasus > 0 ? ((w.jumlahKasus / w.jumlahSkrining) * 100).toFixed(1) : 0}%
                        </TableCell>
                        <TableCell>
                          <Chip
                            label={w.riskLevel.toUpperCase()}
                            size="small"
                            color={getRiskColor(w.riskLevel)}
                          />
                        </TableCell>
                        <TableCell>
                          {w.riskLevel === 'tinggi' && 'Skrining massal & edukasi intensif'}
                          {w.riskLevel === 'sedang' && 'Monitoring aktif & skrining kontak'}
                          {w.riskLevel === 'rendah' && 'Monitoring rutin'}
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>

        <Grid item xs={12}>
          <Paper elevation={3} sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom fontWeight="bold">
              Detail Klaster Penularan
            </Typography>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow sx={{ bgcolor: 'secondary.main' }}>
                    <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>ID Klaster</TableCell>
                    <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Wilayah</TableCell>
                    <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Jumlah Kasus</TableCell>
                    <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Radius (m)</TableCell>
                    <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Rumah Terpengaruh</TableCell>
                    <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Tingkat Risiko</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {clusters.map((cluster) => (
                    <TableRow key={cluster.id} hover>
                      <TableCell>{cluster.id}</TableCell>
                      <TableCell>{cluster.wilayah}</TableCell>
                      <TableCell>{cluster.jumlahKasus}</TableCell>
                      <TableCell>{cluster.radius}</TableCell>
                      <TableCell>{cluster.affectedHouseholds.length}</TableCell>
                      <TableCell>
                        <Chip
                          label={cluster.riskLevel.toUpperCase()}
                          size="small"
                          color={getRiskColor(cluster.riskLevel)}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default RiskAnalysisPage;
