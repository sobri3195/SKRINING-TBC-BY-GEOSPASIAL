import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from '@/contexts/AuthContext';
import { AppProvider } from '@/contexts/AppContext';
import Login from '@/components/auth/Login';
import Layout from '@/components/layout/Layout';
import Dashboard from '@/components/dashboard/Dashboard';
import MapGeospatial from '@/modules/map-geospatial/MapGeospatial';
import TBCaseList from '@/modules/tbc-case/TBCaseList';
import ScreeningForm from '@/modules/screening/ScreeningForm';
import ScreeningList from '@/modules/screening/ScreeningList';
import HouseholdList from '@/modules/household/HouseholdList';
import FieldActivityList from '@/modules/field-activity/FieldActivityList';

const AppRoutes: React.FC = () => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return (
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    );
  }

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/map" element={<MapGeospatial />} />
        <Route path="/cases" element={<TBCaseList />} />
        <Route path="/screening" element={<ScreeningForm />} />
        <Route path="/screening/list" element={<ScreeningList />} />
        <Route path="/households" element={<HouseholdList />} />
        <Route path="/field-activities" element={<FieldActivityList />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Layout>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <AuthProvider>
        <AppProvider>
          <AppRoutes />
        </AppProvider>
      </AuthProvider>
    </Router>
  );
};

export default App;
