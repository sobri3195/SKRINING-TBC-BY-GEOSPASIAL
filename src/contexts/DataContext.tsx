import React, { createContext, useContext, useState, ReactNode } from 'react';
import { TBCase, Household, ScreeningForm, FieldActivity, Wilayah, ClusterData } from '../types';
import { mockTBCases, mockHouseholds, mockScreenings, mockFieldActivities, mockWilayah, mockClusters } from '../data/mockData';

interface DataContextType {
  tbCases: TBCase[];
  households: Household[];
  screenings: ScreeningForm[];
  fieldActivities: FieldActivity[];
  wilayah: Wilayah[];
  clusters: ClusterData[];
  addTBCase: (tbCase: TBCase) => void;
  addScreening: (screening: ScreeningForm) => void;
  addFieldActivity: (activity: FieldActivity) => void;
  updateTBCase: (id: string, data: Partial<TBCase>) => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [tbCases, setTBCases] = useState<TBCase[]>(mockTBCases);
  const [households] = useState<Household[]>(mockHouseholds);
  const [screenings, setScreenings] = useState<ScreeningForm[]>(mockScreenings);
  const [fieldActivities, setFieldActivities] = useState<FieldActivity[]>(mockFieldActivities);
  const [wilayah] = useState<Wilayah[]>(mockWilayah);
  const [clusters] = useState<ClusterData[]>(mockClusters);

  const addTBCase = (tbCase: TBCase) => {
    setTBCases(prev => [...prev, tbCase]);
  };

  const addScreening = (screening: ScreeningForm) => {
    setScreenings(prev => [...prev, screening]);
  };

  const addFieldActivity = (activity: FieldActivity) => {
    setFieldActivities(prev => [...prev, activity]);
  };

  const updateTBCase = (id: string, data: Partial<TBCase>) => {
    setTBCases(prev => prev.map(tc => tc.id === id ? { ...tc, ...data } : tc));
  };

  return (
    <DataContext.Provider value={{
      tbCases,
      households,
      screenings,
      fieldActivities,
      wilayah,
      clusters,
      addTBCase,
      addScreening,
      addFieldActivity,
      updateTBCase
    }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within DataProvider');
  }
  return context;
};
