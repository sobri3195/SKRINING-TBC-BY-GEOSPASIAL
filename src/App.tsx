import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { DataProvider } from './contexts/DataContext';
import Layout from './components/Layout';
import LoginPage from './modules/auth-demo/LoginPage';
import DashboardPage from './modules/dashboard/DashboardPage';
import MapPage from './modules/map-geospatial/MapPage';
import ScreeningPage from './modules/screening/ScreeningPage';
import CasesPage from './modules/tbc-case/CasesPage';
import HouseholdPage from './modules/household/HouseholdPage';
import RiskAnalysisPage from './modules/risk-analysis/RiskAnalysisPage';
import FieldWorkerPage from './modules/field-worker/FieldWorkerPage';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2'
    },
    secondary: {
      main: '#9c27b0'
    }
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif'
  }
});

const PrivateRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" />;
};

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route
        path="/*"
        element={
          <PrivateRoute>
            <Layout>
              <Routes>
                <Route path="/dashboard" element={<DashboardPage />} />
                <Route path="/map" element={<MapPage />} />
                <Route path="/screening" element={<ScreeningPage />} />
                <Route path="/cases" element={<CasesPage />} />
                <Route path="/households" element={<HouseholdPage />} />
                <Route path="/risk-analysis" element={<RiskAnalysisPage />} />
                <Route path="/field-worker" element={<FieldWorkerPage />} />
                <Route path="/" element={<Navigate to="/dashboard" />} />
              </Routes>
            </Layout>
          </PrivateRoute>
        }
      />
    </Routes>
  );
};

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <DataProvider>
          <BrowserRouter>
            <AppRoutes />
          </BrowserRouter>
        </DataProvider>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;
