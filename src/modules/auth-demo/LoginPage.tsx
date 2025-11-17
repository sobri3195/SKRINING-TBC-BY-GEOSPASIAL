import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  Container,
  Alert,
  Divider,
  Select,
  MenuItem,
  FormControl,
  InputLabel
} from '@mui/material';
import { LocalHospital as HospitalIcon } from '@mui/icons-material';
import { useAuth } from '../../contexts/AuthContext';
import { UserRole } from '../../types';

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [selectedRole, setSelectedRole] = useState<UserRole>('admin_provinsi');
  const navigate = useNavigate();
  const { login, loginAsDemo } = useAuth();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (login(username, password)) {
      navigate('/dashboard');
    } else {
      setError('Username atau password salah');
    }
  };

  const handleDemoLogin = () => {
    loginAsDemo(selectedRole);
    navigate('/dashboard');
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        py: 4
      }}
    >
      <Container maxWidth="sm">
        <Card elevation={8} sx={{ borderRadius: 3 }}>
          <CardContent sx={{ p: 4 }}>
            <Box sx={{ textAlign: 'center', mb: 4 }}>
              <HospitalIcon sx={{ fontSize: 60, color: 'primary.main', mb: 2 }} />
              <Typography variant="h4" component="h1" gutterBottom fontWeight="bold">
                SKRINING TBC
              </Typography>
              <Typography variant="subtitle1" color="text.secondary">
                Sistem Skrining TBC Berbasis Geospasial
              </Typography>
            </Box>

            <form onSubmit={handleLogin}>
              <TextField
                fullWidth
                label="Username"
                variant="outlined"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                margin="normal"
                autoComplete="username"
              />
              <TextField
                fullWidth
                label="Password"
                type="password"
                variant="outlined"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                margin="normal"
                autoComplete="current-password"
              />
              {error && (
                <Alert severity="error" sx={{ mt: 2 }}>
                  {error}
                </Alert>
              )}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                size="large"
                sx={{ mt: 3, mb: 2, py: 1.5 }}
              >
                Masuk
              </Button>
            </form>

            <Divider sx={{ my: 3 }}>ATAU</Divider>

            <Box sx={{ mt: 3 }}>
              <Typography variant="subtitle2" gutterBottom color="text.secondary">
                Mode Demo (tanpa database)
              </Typography>
              <FormControl fullWidth sx={{ mt: 2, mb: 2 }}>
                <InputLabel>Pilih Role</InputLabel>
                <Select
                  value={selectedRole}
                  label="Pilih Role"
                  onChange={(e) => setSelectedRole(e.target.value as UserRole)}
                >
                  <MenuItem value="admin_provinsi">Admin Provinsi</MenuItem>
                  <MenuItem value="admin_kabkota">Admin Kabupaten/Kota</MenuItem>
                  <MenuItem value="puskesmas">Puskesmas</MenuItem>
                  <MenuItem value="petugas_lapangan">Petugas Lapangan</MenuItem>
                  <MenuItem value="kader">Kader</MenuItem>
                  <MenuItem value="viewer">Viewer</MenuItem>
                </Select>
              </FormControl>
              <Button
                fullWidth
                variant="outlined"
                size="large"
                onClick={handleDemoLogin}
                sx={{ py: 1.5 }}
              >
                Masuk sebagai Demo
              </Button>
            </Box>

            <Box sx={{ mt: 4, p: 2, bgcolor: 'info.light', borderRadius: 2 }}>
              <Typography variant="caption" display="block" gutterBottom fontWeight="bold">
                Akun Demo:
              </Typography>
              <Typography variant="caption" display="block">
                • admin@demo / demo123
              </Typography>
              <Typography variant="caption" display="block">
                • petugas@demo / demo123
              </Typography>
              <Typography variant="caption" display="block">
                • puskesmas@demo / demo123
              </Typography>
              <Typography variant="caption" display="block">
                • kader@demo / demo123
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
};

export default LoginPage;
