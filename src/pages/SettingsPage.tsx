import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Settings, 
  User, 
  Bell, 
  Shield, 
  Palette, 
  Database, 
  Globe, 
  Moon, 
  Sun,
  Save,
  RefreshCw
} from 'lucide-react';

const SettingsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('general');
  const [settings, setSettings] = useState({
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
  });

  const tabs = [
    { id: 'general', name: 'General', icon: Settings },
    { id: 'notifications', name: 'Notifications', icon: Bell },
    { id: 'privacy', name: 'Privacy', icon: Shield },
    { id: 'appearance', name: 'Appearance', icon: Palette },
    { id: 'data', name: 'Data', icon: Database }
  ];

  const handleSettingChange = (category: string, key: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category as keyof typeof prev],
        [key]: value
      }
    }));
  };

  const handleSave = () => {
    // Here you would save settings to backend
    console.log('Saving settings:', settings);
    // Show success message
  };

  const renderGeneralSettings = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-white mb-4">Dashboard Settings</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 rounded-lg bg-white/5 border border-white/10">
            <div>
              <label className="text-white font-medium">Auto Refresh</label>
              <p className="text-sm text-gray-400">Automatically refresh dashboard data</p>
            </div>
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => handleSettingChange('dashboard', 'autoRefresh', !settings.dashboard.autoRefresh)}
              className={`relative w-12 h-6 rounded-full transition-colors ${
                settings.dashboard.autoRefresh ? 'bg-mint-500' : 'bg-gray-600'
              }`}
            >
              <motion.div
                animate={{ x: settings.dashboard.autoRefresh ? 24 : 0 }}
                className="absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow-md"
              />
            </motion.button>
          </div>

          <div className="p-4 rounded-lg bg-white/5 border border-white/10">
            <label className="block text-white font-medium mb-2">Refresh Interval (seconds)</label>
            <select
              value={settings.dashboard.refreshInterval}
              onChange={(e) => handleSettingChange('dashboard', 'refreshInterval', parseInt(e.target.value))}
              className="w-full p-2 rounded-lg bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-mint-400/50"
            >
              <option value={15}>15 seconds</option>
              <option value={30}>30 seconds</option>
              <option value={60}>1 minute</option>
              <option value={300}>5 minutes</option>
            </select>
          </div>

          <div className="p-4 rounded-lg bg-white/5 border border-white/10">
            <label className="block text-white font-medium mb-2">Default View</label>
            <select
              value={settings.dashboard.defaultView}
              onChange={(e) => handleSettingChange('dashboard', 'defaultView', e.target.value)}
              className="w-full p-2 rounded-lg bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-mint-400/50"
            >
              <option value="overview">Overview</option>
              <option value="analytics">Analytics</option>
              <option value="reports">Reports</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );

  const renderNotificationSettings = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-white mb-4">Notification Preferences</h3>
        <div className="space-y-4">
          {Object.entries(settings.notifications).map(([key, value]) => (
            <div key={key} className="flex items-center justify-between p-4 rounded-lg bg-white/5 border border-white/10">
              <div>
                <label className="text-white font-medium capitalize">{key} Notifications</label>
                <p className="text-sm text-gray-400">
                  {key === 'email' && 'Receive notifications via email'}
                  {key === 'push' && 'Receive push notifications in browser'}
                  {key === 'desktop' && 'Show desktop notifications'}
                  {key === 'marketing' && 'Receive marketing and promotional emails'}
                </p>
              </div>
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => handleSettingChange('notifications', key, !value)}
                className={`relative w-12 h-6 rounded-full transition-colors ${
                  value ? 'bg-mint-500' : 'bg-gray-600'
                }`}
              >
                <motion.div
                  animate={{ x: value ? 24 : 0 }}
                  className="absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow-md"
                />
              </motion.button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderPrivacySettings = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-white mb-4">Privacy & Security</h3>
        <div className="space-y-4">
          {Object.entries(settings.privacy).map(([key, value]) => (
            <div key={key} className="flex items-center justify-between p-4 rounded-lg bg-white/5 border border-white/10">
              <div>
                <label className="text-white font-medium capitalize">
                  {key === 'dataSharing' ? 'Data Sharing' : key}
                </label>
                <p className="text-sm text-gray-400">
                  {key === 'analytics' && 'Allow usage analytics collection'}
                  {key === 'cookies' && 'Accept cookies for better experience'}
                  {key === 'dataSharing' && 'Share anonymized data for improvements'}
                </p>
              </div>
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => handleSettingChange('privacy', key, !value)}
                className={`relative w-12 h-6 rounded-full transition-colors ${
                  value ? 'bg-mint-500' : 'bg-gray-600'
                }`}
              >
                <motion.div
                  animate={{ x: value ? 24 : 0 }}
                  className="absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow-md"
                />
              </motion.button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderAppearanceSettings = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-white mb-4">Theme & Appearance</h3>
        <div className="space-y-4">
          <div className="p-4 rounded-lg bg-white/5 border border-white/10">
            <label className="block text-white font-medium mb-3">Theme</label>
            <div className="grid grid-cols-2 gap-3">
              {[
                { id: 'dark', name: 'Dark', icon: Moon },
                { id: 'light', name: 'Light', icon: Sun }
              ].map((theme) => (
                <motion.button
                  key={theme.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleSettingChange('', 'theme', theme.id)}
                  className={`flex items-center space-x-3 p-3 rounded-lg border transition-all ${
                    settings.theme === theme.id
                      ? 'bg-mint-500/20 border-mint-500/50 text-mint-400'
                      : 'bg-white/5 border-white/10 text-gray-300 hover:border-white/20'
                  }`}
                >
                  <theme.icon className="w-5 h-5" />
                  <span>{theme.name}</span>
                </motion.button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderDataSettings = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-white mb-4">Data Management</h3>
        <div className="space-y-4">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full flex items-center justify-between p-4 rounded-lg bg-white/5 border border-white/10 hover:border-mint-400/50 transition-all"
          >
            <div className="text-left">
              <div className="text-white font-medium">Export Data</div>
              <div className="text-sm text-gray-400">Download all your dashboard data</div>
            </div>
            <Database className="w-5 h-5 text-mint-400" />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full flex items-center justify-between p-4 rounded-lg bg-white/5 border border-white/10 hover:border-yellow-400/50 transition-all"
          >
            <div className="text-left">
              <div className="text-white font-medium">Clear Cache</div>
              <div className="text-sm text-gray-400">Clear stored data and refresh</div>
            </div>
            <RefreshCw className="w-5 h-5 text-yellow-400" />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full flex items-center justify-between p-4 rounded-lg bg-red-500/10 border border-red-500/30 hover:border-red-400/50 transition-all"
          >
            <div className="text-left">
              <div className="text-red-400 font-medium">Delete Account</div>
              <div className="text-sm text-gray-400">Permanently delete your account</div>
            </div>
            <User className="w-5 h-5 text-red-400" />
          </motion.button>
        </div>
      </div>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'general':
        return renderGeneralSettings();
      case 'notifications':
        return renderNotificationSettings();
      case 'privacy':
        return renderPrivacySettings();
      case 'appearance':
        return renderAppearanceSettings();
      case 'data':
        return renderDataSettings();
      default:
        return renderGeneralSettings();
    }
  };

  return (
    <div className="pt-24 pb-12">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-white via-pink-200 to-mint-200 bg-clip-text text-transparent">
            Settings
          </h1>
          <p className="text-gray-400 text-lg">
            Customize your dashboard experience
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-1"
          >
            <div className="p-6 rounded-xl backdrop-blur-md bg-white/5 border border-white/10">
              <nav className="space-y-2">
                {tabs.map((tab) => (
                  <motion.button
                    key={tab.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center space-x-3 p-3 rounded-lg transition-all ${
                      activeTab === tab.id
                        ? 'bg-gradient-to-r from-pink-500/20 to-mint-500/20 border border-pink-500/30 text-white'
                        : 'text-gray-300 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <tab.icon className="w-5 h-5" />
                    <span>{tab.name}</span>
                  </motion.button>
                ))}
              </nav>
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-3"
          >
            <div className="p-6 rounded-xl backdrop-blur-md bg-white/5 border border-white/10">
              {renderTabContent()}

              {/* Save Button */}
              <div className="mt-8 pt-6 border-t border-white/10">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleSave}
                  className="flex items-center space-x-2 px-6 py-3 rounded-lg bg-gradient-to-r from-pink-500 to-mint-500 text-white font-medium hover:shadow-lg hover:shadow-pink-500/25 transition-all duration-300"
                >
                  <Save className="w-5 h-5" />
                  <span>Save Changes</span>
                </motion.button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;