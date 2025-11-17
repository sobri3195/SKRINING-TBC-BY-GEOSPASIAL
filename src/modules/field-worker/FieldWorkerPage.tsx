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
  Card,
  CardContent,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@mui/material';
import { Grid } from '@mui/material';
import { Add as AddIcon, MyLocation as LocationIcon } from '@mui/icons-material';
import { useData } from '../../contexts/DataContext';
import { useAuth } from '../../contexts/AuthContext';
import { FieldActivity } from '../../types';

const FieldWorkerPage: React.FC = () => {
  const { fieldActivities, addFieldActivity } = useData();
  const { user } = useAuth();
  const [openDialog, setOpenDialog] = useState(false);
  const [formData, setFormData] = useState<Partial<FieldActivity>>({
    jenisKegiatan: 'screening'
  });

  const handleSubmit = () => {
    const newActivity: FieldActivity = {
      id: `FA${String(fieldActivities.length + 1).padStart(3, '0')}`,
      tanggal: new Date().toISOString().split('T')[0],
      petugasId: user?.id || '',
      petugasNama: user?.name || '',
      jenisKegiatan: formData.jenisKegiatan || 'screening',
      lokasi: formData.lokasi || '',
      coordinates: formData.coordinates || { lat: -7.2580, lng: 112.7525 },
      keterangan: formData.keterangan || '',
      checkInTime: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })
    };

    addFieldActivity(newActivity);
    setOpenDialog(false);
    setFormData({ jenisKegiatan: 'screening' });
  };

  const getActivityColor = (jenis: string) => {
    switch (jenis) {
      case 'screening': return 'primary';
      case 'edukasi': return 'info';
      case 'pengambilan_dahak': return 'warning';
      case 'follow_up': return 'success';
      case 'visit_keluarga': return 'secondary';
      default: return 'default';
    }
  };

  const todayActivities = fieldActivities.filter(
    fa => fa.tanggal === new Date().toISOString().split('T')[0]
  );

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Box>
          <Typography variant="h4" gutterBottom fontWeight="bold">
            Kegiatan Lapangan
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Monitoring dan dokumentasi kegiatan petugas lapangan
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setOpenDialog(true)}
        >
          Catat Kegiatan
        </Button>
      </Box>

      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h4" color="primary" fontWeight="bold">
                {fieldActivities.length}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Total Kegiatan
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h4" color="success.main" fontWeight="bold">
                {todayActivities.length}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Kegiatan Hari Ini
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h4" color="warning.main" fontWeight="bold">
                {fieldActivities.filter(fa => fa.jenisKegiatan === 'screening').length}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Kegiatan Skrining
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h4" color="info.main" fontWeight="bold">
                {fieldActivities.filter(fa => fa.jenisKegiatan === 'edukasi').length}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Kegiatan Edukasi
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
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Tanggal</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Petugas</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Jenis Kegiatan</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Lokasi</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Check-in</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Keterangan</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {fieldActivities.map((activity) => (
              <TableRow key={activity.id} hover>
                <TableCell>{activity.id}</TableCell>
                <TableCell>{activity.tanggal}</TableCell>
                <TableCell>{activity.petugasNama}</TableCell>
                <TableCell>
                  <Chip
                    label={activity.jenisKegiatan.replace('_', ' ')}
                    size="small"
                    color={getActivityColor(activity.jenisKegiatan)}
                  />
                </TableCell>
                <TableCell>{activity.lokasi}</TableCell>
                <TableCell>
                  {activity.checkInTime && (
                    <Chip
                      icon={<LocationIcon />}
                      label={activity.checkInTime}
                      size="small"
                      color="success"
                    />
                  )}
                </TableCell>
                <TableCell>{activity.keterangan}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Catat Kegiatan Lapangan</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>Jenis Kegiatan</InputLabel>
                <Select
                  value={formData.jenisKegiatan || 'screening'}
                  label="Jenis Kegiatan"
                  onChange={(e) => setFormData({ ...formData, jenisKegiatan: e.target.value as any })}
                >
                  <MenuItem value="screening">Skrining</MenuItem>
                  <MenuItem value="edukasi">Edukasi</MenuItem>
                  <MenuItem value="pengambilan_dahak">Pengambilan Dahak</MenuItem>
                  <MenuItem value="follow_up">Follow-up Pasien</MenuItem>
                  <MenuItem value="visit_keluarga">Visit Keluarga</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Lokasi"
                value={formData.lokasi || ''}
                onChange={(e) => setFormData({ ...formData, lokasi: e.target.value })}
                placeholder="Contoh: Jl. Merdeka No. 45, RT 02/RW 05"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Keterangan"
                multiline
                rows={4}
                value={formData.keterangan || ''}
                onChange={(e) => setFormData({ ...formData, keterangan: e.target.value })}
                placeholder="Deskripsi detail kegiatan yang dilakukan..."
              />
            </Grid>
            <Grid item xs={12}>
              <Box sx={{ p: 2, bgcolor: 'info.light', borderRadius: 1 }}>
                <Typography variant="caption" display="block">
                  <LocationIcon sx={{ fontSize: 14, verticalAlign: 'middle' }} /> Lokasi GPS akan terdeteksi otomatis
                </Typography>
                <Typography variant="caption" display="block">
                  Check-in: {new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })}
                </Typography>
              </Box>
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

export default FieldWorkerPage;
