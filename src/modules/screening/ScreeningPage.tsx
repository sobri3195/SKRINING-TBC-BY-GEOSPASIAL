import React, { useState } from 'react';
import {
  Box,
  Button,
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Dialog,
  DialogTitle,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormGroup,
  FormControlLabel,
  Checkbox
} from '@mui/material';
import { Grid } from '@mui/material';
import DialogContent from '@mui/material/DialogContent';
import { Add as AddIcon } from '@mui/icons-material';
import { useData } from '../../contexts/DataContext';
import { useAuth } from '../../contexts/AuthContext';
import { ScreeningForm } from '../../types';

const ScreeningPage: React.FC = () => {
  const { screenings, addScreening, tbCases } = useData();
  const { user } = useAuth();
  const [openDialog, setOpenDialog] = useState(false);
  const [formData, setFormData] = useState<Partial<ScreeningForm>>({
    jenisScreening: 'komunitas',
    gejala: {
      batuk: false,
      batukDarah: false,
      demam: false,
      berkeringatMalam: false,
      beratBadanTurun: false,
      sesak: false
    },
    riwayatKontak: false,
    hasilScreening: 'negatif'
  });

  const handleSubmit = () => {
    const newScreening: ScreeningForm = {
      id: `SCR${String(screenings.length + 1).padStart(3, '0')}`,
      tanggal: new Date().toISOString().split('T')[0],
      nama: formData.nama || '',
      nik: formData.nik,
      umur: formData.umur || 0,
      jenisKelamin: formData.jenisKelamin || 'L',
      alamat: formData.alamat || '',
      coordinates: formData.coordinates || { lat: -7.2580, lng: 112.7525 },
      jenisScreening: formData.jenisScreening || 'komunitas',
      gejala: formData.gejala || {
        batuk: false,
        batukDarah: false,
        demam: false,
        berkeringatMalam: false,
        beratBadanTurun: false,
        sesak: false
      },
      riwayatKontak: formData.riwayatKontak || false,
      hasilScreening: formData.hasilScreening || 'negatif',
      tindakLanjut: formData.tindakLanjut,
      petugasId: user?.id || '',
      petugasNama: user?.name || '',
      relatedCaseId: formData.relatedCaseId
    };

    addScreening(newScreening);
    setOpenDialog(false);
    setFormData({
      jenisScreening: 'komunitas',
      gejala: {
        batuk: false,
        batukDarah: false,
        demam: false,
        berkeringatMalam: false,
        beratBadanTurun: false,
        sesak: false
      },
      riwayatKontak: false,
      hasilScreening: 'negatif'
    });
  };

  const getResultColor = (result: string) => {
    switch (result) {
      case 'negatif': return 'success';
      case 'suspek': return 'warning';
      case 'perlu_rujukan': return 'error';
      default: return 'default';
    }
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Box>
          <Typography variant="h4" gutterBottom fontWeight="bold">
            Skrining TBC
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Manajemen skrining TBC berbasis risiko
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setOpenDialog(true)}
        >
          Tambah Skrining
        </Button>
      </Box>

      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Paper sx={{ p: 2, textAlign: 'center' }}>
            <Typography variant="h4" color="primary" fontWeight="bold">
              {screenings.length}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Total Skrining
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper sx={{ p: 2, textAlign: 'center' }}>
            <Typography variant="h4" color="success.main" fontWeight="bold">
              {screenings.filter(s => s.hasilScreening === 'negatif').length}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Negatif
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper sx={{ p: 2, textAlign: 'center' }}>
            <Typography variant="h4" color="warning.main" fontWeight="bold">
              {screenings.filter(s => s.hasilScreening === 'suspek').length}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Suspek
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper sx={{ p: 2, textAlign: 'center' }}>
            <Typography variant="h4" color="error.main" fontWeight="bold">
              {screenings.filter(s => s.hasilScreening === 'perlu_rujukan').length}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Perlu Rujukan
            </Typography>
          </Paper>
        </Grid>
      </Grid>

      <TableContainer component={Paper} elevation={3}>
        <Table>
          <TableHead>
            <TableRow sx={{ bgcolor: 'primary.main' }}>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>ID</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Tanggal</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Nama</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Jenis</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Hasil</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Petugas</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Tindak Lanjut</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {screenings.map((screening) => (
              <TableRow key={screening.id} hover>
                <TableCell>{screening.id}</TableCell>
                <TableCell>{screening.tanggal}</TableCell>
                <TableCell>{screening.nama}</TableCell>
                <TableCell>
                  <Chip
                    label={screening.jenisScreening.replace('_', ' ')}
                    size="small"
                    color={screening.jenisScreening === 'kontak_erat' ? 'secondary' : 'default'}
                  />
                </TableCell>
                <TableCell>
                  <Chip
                    label={screening.hasilScreening.replace('_', ' ')}
                    size="small"
                    color={getResultColor(screening.hasilScreening)}
                  />
                </TableCell>
                <TableCell>{screening.petugasNama}</TableCell>
                <TableCell>{screening.tindakLanjut || '-'}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="md" fullWidth>
        <DialogTitle>Tambah Skrining Baru</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Nama Lengkap"
                value={formData.nama || ''}
                onChange={(e) => setFormData({ ...formData, nama: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="NIK (Opsional)"
                value={formData.nik || ''}
                onChange={(e) => setFormData({ ...formData, nik: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                label="Umur"
                type="number"
                value={formData.umur || ''}
                onChange={(e) => setFormData({ ...formData, umur: parseInt(e.target.value) })}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <FormControl fullWidth>
                <InputLabel>Jenis Kelamin</InputLabel>
                <Select
                  value={formData.jenisKelamin || 'L'}
                  label="Jenis Kelamin"
                  onChange={(e) => setFormData({ ...formData, jenisKelamin: e.target.value as 'L' | 'P' })}
                >
                  <MenuItem value="L">Laki-laki</MenuItem>
                  <MenuItem value="P">Perempuan</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={4}>
              <FormControl fullWidth>
                <InputLabel>Jenis Skrining</InputLabel>
                <Select
                  value={formData.jenisScreening || 'komunitas'}
                  label="Jenis Skrining"
                  onChange={(e) => setFormData({ ...formData, jenisScreening: e.target.value as any })}
                >
                  <MenuItem value="kontak_erat">Kontak Erat</MenuItem>
                  <MenuItem value="komunitas">Komunitas</MenuItem>
                  <MenuItem value="massal">Massal</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Alamat"
                value={formData.alamat || ''}
                onChange={(e) => setFormData({ ...formData, alamat: e.target.value })}
              />
            </Grid>
            {formData.jenisScreening === 'kontak_erat' && (
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel>Kasus Terkait</InputLabel>
                  <Select
                    value={formData.relatedCaseId || ''}
                    label="Kasus Terkait"
                    onChange={(e) => setFormData({ ...formData, relatedCaseId: e.target.value })}
                  >
                    {tbCases.map(tc => (
                      <MenuItem key={tc.id} value={tc.id}>{tc.id} - {tc.nama}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            )}
            <Grid item xs={12}>
              <Typography variant="subtitle2" gutterBottom>
                Gejala yang Dialami:
              </Typography>
              <FormGroup row>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={formData.gejala?.batuk || false}
                      onChange={(e) => setFormData({
                        ...formData,
                        gejala: { ...formData.gejala!, batuk: e.target.checked }
                      })}
                    />
                  }
                  label="Batuk"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={formData.gejala?.batukDarah || false}
                      onChange={(e) => setFormData({
                        ...formData,
                        gejala: { ...formData.gejala!, batukDarah: e.target.checked }
                      })}
                    />
                  }
                  label="Batuk Darah"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={formData.gejala?.demam || false}
                      onChange={(e) => setFormData({
                        ...formData,
                        gejala: { ...formData.gejala!, demam: e.target.checked }
                      })}
                    />
                  }
                  label="Demam"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={formData.gejala?.berkeringatMalam || false}
                      onChange={(e) => setFormData({
                        ...formData,
                        gejala: { ...formData.gejala!, berkeringatMalam: e.target.checked }
                      })}
                    />
                  }
                  label="Keringat Malam"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={formData.gejala?.beratBadanTurun || false}
                      onChange={(e) => setFormData({
                        ...formData,
                        gejala: { ...formData.gejala!, beratBadanTurun: e.target.checked }
                      })}
                    />
                  }
                  label="BB Turun"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={formData.gejala?.sesak || false}
                      onChange={(e) => setFormData({
                        ...formData,
                        gejala: { ...formData.gejala!, sesak: e.target.checked }
                      })}
                    />
                  }
                  label="Sesak"
                />
              </FormGroup>
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={formData.riwayatKontak || false}
                    onChange={(e) => setFormData({ ...formData, riwayatKontak: e.target.checked })}
                  />
                }
                label="Riwayat Kontak dengan Pasien TBC"
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>Hasil Skrining</InputLabel>
                <Select
                  value={formData.hasilScreening || 'negatif'}
                  label="Hasil Skrining"
                  onChange={(e) => setFormData({ ...formData, hasilScreening: e.target.value as any })}
                >
                  <MenuItem value="negatif">Negatif</MenuItem>
                  <MenuItem value="suspek">Suspek</MenuItem>
                  <MenuItem value="perlu_rujukan">Perlu Rujukan</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Tindak Lanjut (Opsional)"
                multiline
                rows={3}
                value={formData.tindakLanjut || ''}
                onChange={(e) => setFormData({ ...formData, tindakLanjut: e.target.value })}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Batal</Button>
          <Button variant="contained" onClick={handleSubmit}>
            Simpan
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ScreeningPage;
