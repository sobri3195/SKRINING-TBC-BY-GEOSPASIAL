import React, { createContext, useContext, useState, ReactNode } from 'react';
import { TBCase, ScreeningRecord, Household, FieldActivity, Cluster } from '@/types';
import { mockTBCases, mockScreenings, mockHouseholds, mockFieldActivities, mockClusters } from '@/data/mockData';

interface AppContextType {
  tbCases: TBCase[];
  screenings: ScreeningRecord[];
  households: Household[];
  fieldActivities: FieldActivity[];
  clusters: Cluster[];
  addScreening: (screening: ScreeningRecord) => void;
  addFieldActivity: (activity: FieldActivity) => void;
  addTBCase: (tbCase: TBCase) => void;
  updateTBCase: (id: string, updates: Partial<TBCase>) => void;
  updateHousehold: (id: string, updates: Partial<Household>) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [tbCases, setTbCases] = useState<TBCase[]>(mockTBCases);
  const [screenings, setScreenings] = useState<ScreeningRecord[]>(mockScreenings);
  const [households, setHouseholds] = useState<Household[]>(mockHouseholds);
  const [fieldActivities, setFieldActivities] = useState<FieldActivity[]>(mockFieldActivities);
  const [clusters] = useState<Cluster[]>(mockClusters);

  const addScreening = (screening: ScreeningRecord) => {
    setScreenings(prev => [...prev, screening]);
  };

  const addFieldActivity = (activity: FieldActivity) => {
    setFieldActivities(prev => [...prev, activity]);
  };

  const addTBCase = (tbCase: TBCase) => {
    setTbCases(prev => [...prev, tbCase]);
  };

  const updateTBCase = (id: string, updates: Partial<TBCase>) => {
    setTbCases(prev => prev.map(c => c.id === id ? { ...c, ...updates } : c));
  };

  const updateHousehold = (id: string, updates: Partial<Household>) => {
    setHouseholds(prev => prev.map(h => h.id === id ? { ...h, ...updates } : h));
  };

  return (
    <AppContext.Provider
      value={{
        tbCases,
        screenings,
        households,
        fieldActivities,
        clusters,
        addScreening,
        addFieldActivity,
        addTBCase,
        updateTBCase,
        updateHousehold
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
