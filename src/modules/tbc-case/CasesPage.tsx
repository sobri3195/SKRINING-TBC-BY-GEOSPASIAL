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

const CasesPage: React.FC = () => {
  const { tbCases } = useData();

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'sembuh': return 'success';
      case 'on_treatment': return 'warning';
      case 'drop_out': return 'error';
      default: return 'default';
    }
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom fontWeight="bold">
        Manajemen Kasus TBC
      </Typography>
      <Typography variant="body1" color="text.secondary" gutterBottom sx={{ mb: 3 }}>
        Data dan pemantauan kasus TBC
      </Typography>

      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h4" color="primary" fontWeight="bold">
                {tbCases.length}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Total Kasus
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h4" color="warning.main" fontWeight="bold">
                {tbCases.filter(c => c.status === 'on_treatment').length}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Dalam Pengobatan
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h4" color="success.main" fontWeight="bold">
                {tbCases.filter(c => c.status === 'sembuh').length}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Sembuh
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h4" color="error.main" fontWeight="bold">
                {tbCases.filter(c => c.resistenceType === 'RO' || c.resistenceType === 'RR').length}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Resisten Obat
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
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Nama</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>NIK</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Wilayah</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Status</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Resisten</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Tgl Diagnosa</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tbCases.map((tbCase) => (
              <TableRow key={tbCase.id} hover>
                <TableCell>{tbCase.id}</TableCell>
                <TableCell>{tbCase.nama}</TableCell>
                <TableCell>{tbCase.nik}</TableCell>
                <TableCell>
                  RT {tbCase.wilayah.rt}/RW {tbCase.wilayah.rw}<br />
                  {tbCase.wilayah.desa}
                </TableCell>
                <TableCell>
                  <Chip
                    label={tbCase.status.replace('_', ' ')}
                    size="small"
                    color={getStatusColor(tbCase.status)}
                  />
                </TableCell>
                <TableCell>
                  {(tbCase.resistenceType === 'RO' || tbCase.resistenceType === 'RR') ? (
                    <Chip label={tbCase.resistenceType} size="small" color="error" />
                  ) : (
                    '-'
                  )}
                </TableCell>
                <TableCell>{tbCase.tanggalDiagnosa}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default CasesPage;
