import React from 'react';
import {
  Box,
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Card,
  CardContent
} from '@mui/material';
import { Grid } from '@mui/material';
import { useData } from '../../contexts/DataContext';
import { RiskLevel } from '../../types';

const HouseholdPage: React.FC = () => {
  const { households } = useData();

  const getRiskColor = (risk: RiskLevel) => {
    switch (risk) {
      case 'tinggi': return 'error';
      case 'sedang': return 'warning';
      case 'rendah': return 'success';
    }
  };

  const getRiskScore = (hh: typeof households[0]): number => {
    let score = 0;
    if (hh.kepadatanPenghuni > 6) score += 3;
    else if (hh.kepadatanPenghuni > 4) score += 2;
    else score += 1;
    
    if (hh.kondisiVentilasi === 'buruk') score += 3;
    else if (hh.kondisiVentilasi === 'cukup') score += 2;
    
    if (hh.sanitasi === 'buruk') score += 2;
    else if (hh.sanitasi === 'cukup') score += 1;
    
    if (hh.riwayatTBC) score += 3;
    if (hh.paparanRokok) score += 2;
    
    return score;
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom fontWeight="bold">
        Pemantauan Rumah Tangga
      </Typography>
      <Typography variant="body1" color="text.secondary" gutterBottom sx={{ mb: 3 }}>
        Survey dan monitoring kondisi rumah tangga rawan TBC
      </Typography>

      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h4" color="error.main" fontWeight="bold">
                {households.filter(h => h.riskScore === 'tinggi').length}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Risiko Tinggi
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h4" color="warning.main" fontWeight="bold">
                {households.filter(h => h.riskScore === 'sedang').length}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Risiko Sedang
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h4" color="success.main" fontWeight="bold">
                {households.filter(h => h.riskScore === 'rendah').length}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Risiko Rendah
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <TableContainer component={Paper} elevation={3}>
        <Table>
          <TableHead>
            <TableRow sx={{ bgcolor: 'primary.main' }}>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>ID</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Alamat</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Penghuni</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Ventilasi</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Sanitasi</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Faktor Risiko</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Skor</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Risiko</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {households.map((hh) => (
              <TableRow key={hh.id} hover>
                <TableCell>{hh.id}</TableCell>
                <TableCell>
                  {hh.alamat}<br />
                  <Typography variant="caption" color="text.secondary">
                    RT {hh.wilayah.rt}/RW {hh.wilayah.rw}, {hh.wilayah.desa}
                  </Typography>
                </TableCell>
                <TableCell>{hh.kepadatanPenghuni} orang</TableCell>
                <TableCell>
                  <Chip
                    label={hh.kondisiVentilasi}
                    size="small"
                    color={hh.kondisiVentilasi === 'buruk' ? 'error' : hh.kondisiVentilasi === 'cukup' ? 'warning' : 'success'}
                  />
                </TableCell>
                <TableCell>
                  <Chip
                    label={hh.sanitasi}
                    size="small"
                    color={hh.sanitasi === 'buruk' ? 'error' : hh.sanitasi === 'cukup' ? 'warning' : 'success'}
                  />
                </TableCell>
                <TableCell>
                  {hh.riwayatTBC && <Chip label="Riwayat TBC" size="small" color="error" sx={{ mr: 0.5, mb: 0.5 }} />}
                  {hh.paparanRokok && <Chip label="Rokok" size="small" color="warning" sx={{ mr: 0.5, mb: 0.5 }} />}
                </TableCell>
                <TableCell>
                  <Typography fontWeight="bold">{getRiskScore(hh)}</Typography>
                </TableCell>
                <TableCell>
                  <Chip
                    label={hh.riskScore.toUpperCase()}
                    size="small"
                    color={getRiskColor(hh.riskScore)}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Paper elevation={3} sx={{ mt: 3, p: 3 }}>
        <Typography variant="h6" gutterBottom fontWeight="bold">
          Kriteria Penilaian Risiko
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle2" gutterBottom>Kepadatan Penghuni:</Typography>
            <Typography variant="body2">• {'>'} 6 orang: +3 poin</Typography>
            <Typography variant="body2">• 5-6 orang: +2 poin</Typography>
            <Typography variant="body2">• {'<'} 5 orang: +1 poin</Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle2" gutterBottom>Kondisi Rumah:</Typography>
            <Typography variant="body2">• Ventilasi buruk: +3 poin</Typography>
            <Typography variant="body2">• Ventilasi cukup: +2 poin</Typography>
            <Typography variant="body2">• Sanitasi buruk: +2 poin</Typography>
            <Typography variant="body2">• Sanitasi cukup: +1 poin</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="subtitle2" gutterBottom>Faktor Risiko Tambahan:</Typography>
            <Typography variant="body2">• Riwayat TBC di rumah: +3 poin</Typography>
            <Typography variant="body2">• Paparan rokok: +2 poin</Typography>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};

export default HouseholdPage;
