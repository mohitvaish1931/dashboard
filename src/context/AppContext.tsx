import React, { createContext, useContext, ReactNode } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { useNotifications } from '../hooks/useNotifications';
import { initialNotifications } from '../data/mockData';

interface AppSettings {
  theme: 'dark' | 'light';
  notifications: {
    email: boolean;
    push: boolean;
    desktop: boolean;
    marketing: boolean;
  };
  privacy: {
    analytics: boolean;
    cookies: boolean;
    dataSharing: boolean;
  };
  dashboard: {
    autoRefresh: boolean;
    refreshInterval: number;
    defaultView: string;
  };
}

interface AppContextType {
  settings: AppSettings;
  updateSettings: (newSettings: Partial<AppSettings>) => void;
  notifications: ReturnType<typeof useNotifications>;
}

const defaultSettings: AppSettings = {
  theme: 'dark',
  notifications: {
    email: true,
    push: true,
    desktop: false,
    marketing: false
  },
  privacy: {
    analytics: true,
    cookies: true,
    dataSharing: false
  },
  dashboard: {
    autoRefresh: true,
    refreshInterval: 30,
    defaultView: 'overview'
  }
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useLocalStorage<AppSettings>('appSettings', defaultSettings);
  const notifications = useNotifications();
  
  // Initialize notifications if empty
  React.useEffect(() => {
    if (notifications.notifications.length === 0) {
      notifications.setNotifications(initialNotifications);
    }
  }, []);

  const updateSettings = (newSettings: Partial<AppSettings>) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
  };

  return (
    <AppContext.Provider value={{ settings, updateSettings, notifications }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
}