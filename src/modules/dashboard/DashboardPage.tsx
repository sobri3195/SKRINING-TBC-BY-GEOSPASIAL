import React from 'react';
import { Paper, Typography, Box, Card, CardContent, Grid } from '@mui/material';
import {
  LocalHospital as HospitalIcon,
  Warning as WarningIcon,
  CheckCircle as CheckIcon,
  People as PeopleIcon,
  Search as SearchIcon,
  LocationOn as LocationIcon,
  Assignment as AssignmentIcon
} from '@mui/icons-material';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { useData } from '../../contexts/DataContext';
import { mockDashboardStats, mockAnalytics } from '../../data/mockData';

const DashboardPage: React.FC = () => {
  const { tbCases } = useData();
  const stats = mockDashboardStats;
  const analytics = mockAnalytics;

  const StatCard: React.FC<{
    title: string;
    value: number;
    icon: React.ReactNode;
    color: string;
  }> = ({ title, value, icon, color }) => (
    <Card elevation={3}>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Box>
            <Typography variant="h4" fontWeight="bold" color={color}>
              {value}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {title}
            </Typography>
          </Box>
          <Box sx={{ color, fontSize: 48, opacity: 0.8 }}>
            {icon}
          </Box>
        </Box>
      </CardContent>
    </Card>
  );

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  const statusData = [
    { name: 'Aktif', value: stats.kasusAktif },
    { name: 'Sembuh', value: stats.kasusSembuh },
    { name: 'RO/RR', value: stats.kasusRO }
  ];

  return (
    <Box>
      <Typography variant="h4" gutterBottom fontWeight="bold">
        Dashboard Monitoring TBC
      </Typography>
      <Typography variant="body1" color="text.secondary" gutterBottom sx={{ mb: 3 }}>
        Ringkasan data dan analitik sistem skrining TBC
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Total Kasus"
            value={stats.totalKasus}
            icon={<HospitalIcon />}
            color="#f44336"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Kasus Aktif"
            value={stats.kasusAktif}
            icon={<WarningIcon />}
            color="#ff9800"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Kasus Sembuh"
            value={stats.kasusSembuh}
            icon={<CheckIcon />}
            color="#4caf50"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Total Skrining"
            value={stats.totalSkrining}
            icon={<SearchIcon />}
            color="#2196f3"
          />
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Skrining Positif"
            value={stats.skriningPositif}
            icon={<AssignmentIcon />}
            color="#9c27b0"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Wilayah Risiko Tinggi"
            value={stats.wilayahRisikoTinggi}
            icon={<LocationIcon />}
            color="#e91e63"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Kasus RO/RR"
            value={stats.kasusRO}
            icon={<WarningIcon />}
            color="#d32f2f"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Petugas Aktif"
            value={stats.petugasAktif}
            icon={<PeopleIcon />}
            color="#00897b"
          />
        </Grid>

        <Grid item xs={12} md={8}>
          <Paper elevation={3} sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom fontWeight="bold">
              Tren Kasus TBC
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={analytics.trenKasus}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="bulan" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="jumlah" stroke="#2196f3" strokeWidth={3} name="Jumlah Kasus" />
              </LineChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper elevation={3} sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom fontWeight="bold">
              Status Kasus
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={statusData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={(entry) => `${entry.name}: ${entry.value}`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {statusData.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        <Grid item xs={12} md={8}>
          <Paper elevation={3} sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom fontWeight="bold">
              Distribusi Kasus Per Wilayah
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={analytics.distribusiPerWilayah}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="wilayah" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="jumlah" fill="#4caf50" name="Jumlah Kasus" />
              </BarChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper elevation={3} sx={{ p: 3, height: '100%' }}>
            <Typography variant="h6" gutterBottom fontWeight="bold">
              Capaian Skrining
            </Typography>
            <Box sx={{ textAlign: 'center', mt: 4 }}>
              <Typography variant="h2" fontWeight="bold" color="primary">
                {analytics.capaianSkrining.persentase}%
              </Typography>
              <Typography variant="body1" color="text.secondary" gutterBottom>
                dari target
              </Typography>
              <Box sx={{ mt: 3, textAlign: 'left' }}>
                <Typography variant="body2">
                  Target: <strong>{analytics.capaianSkrining.target}</strong>
                </Typography>
                <Typography variant="body2">
                  Realisasi: <strong>{analytics.capaianSkrining.realisasi}</strong>
                </Typography>
              </Box>
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={12}>
          <Paper elevation={3} sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom fontWeight="bold">
              Kasus TBC Terbaru
            </Typography>
            <Box sx={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ borderBottom: '2px solid #e0e0e0' }}>
                    <th style={{ padding: '12px', textAlign: 'left' }}>ID</th>
                    <th style={{ padding: '12px', textAlign: 'left' }}>Nama</th>
                    <th style={{ padding: '12px', textAlign: 'left' }}>Wilayah</th>
                    <th style={{ padding: '12px', textAlign: 'left' }}>Status</th>
                    <th style={{ padding: '12px', textAlign: 'left' }}>Tanggal Diagnosa</th>
                  </tr>
                </thead>
                <tbody>
                  {tbCases.slice(0, 5).map((tbCase) => (
                    <tr key={tbCase.id} style={{ borderBottom: '1px solid #e0e0e0' }}>
                      <td style={{ padding: '12px' }}>{tbCase.id}</td>
                      <td style={{ padding: '12px' }}>{tbCase.nama}</td>
                      <td style={{ padding: '12px' }}>{tbCase.wilayah.desa}, {tbCase.wilayah.kecamatan}</td>
                      <td style={{ padding: '12px' }}>
                        <span style={{
                          padding: '4px 8px',
                          borderRadius: '4px',
                          fontSize: '12px',
                          backgroundColor: tbCase.status === 'sembuh' ? '#e8f5e9' :
                            tbCase.status === 'on_treatment' ? '#fff3e0' : '#ffebee',
                          color: tbCase.status === 'sembuh' ? '#2e7d32' :
                            tbCase.status === 'on_treatment' ? '#f57c00' : '#c62828'
                        }}>
                          {tbCase.status.replace('_', ' ').toUpperCase()}
                        </span>
                      </td>
                      <td style={{ padding: '12px' }}>{tbCase.tanggalDiagnosa}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default DashboardPage;
