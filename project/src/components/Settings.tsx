import React, { useState } from 'react';
import { 
  Settings as SettingsIcon, 
  Bell, 
  MapPin, 
  Users, 
  Truck, 
  Database, 
  Shield,
  Save,
  RefreshCw
} from 'lucide-react';

const Settings: React.FC = () => {
  const [activeSection, setActiveSection] = useState('general');
  const [settings, setSettings] = useState({
    general: {
      systemName: 'SmartWaste IoT',
      timezone: 'UTC-5',
      language: 'English',
      theme: 'light'
    },
    notifications: {
      emailAlerts: true,
      smsAlerts: false,
      criticalAlerts: true,
      dailyReports: true,
      weeklyReports: true
    },
    thresholds: {
      warningLevel: 70,
      criticalLevel: 85,
      batteryLow: 20,
      maintenanceInterval: 30
    },
    integration: {
      apiEndpoint: 'https://api.smartwaste.io/v1',
      apiKey: '****-****-****-****',
      mqttBroker: 'mqtt.smartwaste.io',
      updateInterval: 5
    }
  });

  const sections = [
    { id: 'general', name: 'General', icon: SettingsIcon },
    { id: 'notifications', name: 'Notifications', icon: Bell },
    { id: 'thresholds', name: 'Thresholds', icon: Database },
    { id: 'integration', name: 'Integration', icon: RefreshCw },
    { id: 'users', name: 'Users', icon: Users },
    { id: 'vehicles', name: 'Vehicles', icon: Truck },
    { id: 'security', name: 'Security', icon: Shield }
  ];

  const handleSave = () => {
    // Simulate saving settings
    alert('Settings saved successfully!');
  };

  const renderGeneralSettings = () => (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">System Name</label>
        <input
          type="text"
          value={settings.general.systemName}
          onChange={(e) => setSettings({
            ...settings,
            general: { ...settings.general, systemName: e.target.value }
          })}
          className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Timezone</label>
          <select
            value={settings.general.timezone}
            onChange={(e) => setSettings({
              ...settings,
              general: { ...settings.general, timezone: e.target.value }
            })}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            <option value="UTC-5">UTC-5 (Eastern)</option>
            <option value="UTC-6">UTC-6 (Central)</option>
            <option value="UTC-7">UTC-7 (Mountain)</option>
            <option value="UTC-8">UTC-8 (Pacific)</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Language</label>
          <select
            value={settings.general.language}
            onChange={(e) => setSettings({
              ...settings,
              general: { ...settings.general, language: e.target.value }
            })}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            <option value="English">English</option>
            <option value="Spanish">Español</option>
            <option value="French">Français</option>
          </select>
        </div>
      </div>
    </div>
  );

  const renderNotificationSettings = () => (
    <div className="space-y-6">
      <div className="space-y-4">
        {Object.entries(settings.notifications).map(([key, value]) => (
          <div key={key} className="flex items-center justify-between py-3 border-b border-gray-100">
            <div>
              <h4 className="font-medium text-gray-900 capitalize">
                {key.replace(/([A-Z])/g, ' $1').trim()}
              </h4>
              <p className="text-sm text-gray-500">
                {key === 'emailAlerts' && 'Receive email notifications for system events'}
                {key === 'smsAlerts' && 'Receive SMS notifications for critical alerts'}
                {key === 'criticalAlerts' && 'Immediate alerts for bins requiring urgent attention'}
                {key === 'dailyReports' && 'Daily summary reports via email'}
                {key === 'weeklyReports' && 'Weekly analytics and performance reports'}
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={value as boolean}
                onChange={(e) => setSettings({
                  ...settings,
                  notifications: { ...settings.notifications, [key]: e.target.checked }
                })}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
            </label>
          </div>
        ))}
      </div>
    </div>
  );

  const renderThresholdSettings = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {Object.entries(settings.thresholds).map(([key, value]) => (
          <div key={key}>
            <label className="block text-sm font-medium text-gray-700 mb-2 capitalize">
              {key.replace(/([A-Z])/g, ' $1').trim()}
              {(key === 'warningLevel' || key === 'criticalLevel') && ' (%)'}
              {key === 'batteryLow' && ' (%)'}
              {key === 'maintenanceInterval' && ' (days)'}
            </label>
            <input
              type="number"
              value={value}
              onChange={(e) => setSettings({
                ...settings,
                thresholds: { ...settings.thresholds, [key]: parseInt(e.target.value) }
              })}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <p className="text-xs text-gray-500 mt-1">
              {key === 'warningLevel' && 'Fill level at which to show warning status'}
              {key === 'criticalLevel' && 'Fill level requiring immediate collection'}
              {key === 'batteryLow' && 'Battery level threshold for maintenance alerts'}
              {key === 'maintenanceInterval' && 'Days between routine maintenance checks'}
            </p>
          </div>
        ))}
      </div>
    </div>
  );

  const renderIntegrationSettings = () => (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">API Endpoint</label>
        <input
          type="url"
          value={settings.integration.apiEndpoint}
          onChange={(e) => setSettings({
            ...settings,
            integration: { ...settings.integration, apiEndpoint: e.target.value }
          })}
          className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">API Key</label>
        <div className="flex space-x-2">
          <input
            type="password"
            value={settings.integration.apiKey}
            readOnly
            className="flex-1 border border-gray-300 rounded-md px-3 py-2 bg-gray-50 focus:outline-none"
          />
          <button className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors">
            Regenerate
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">MQTT Broker</label>
          <input
            type="text"
            value={settings.integration.mqttBroker}
            onChange={(e) => setSettings({
              ...settings,
              integration: { ...settings.integration, mqttBroker: e.target.value }
            })}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Update Interval (minutes)</label>
          <input
            type="number"
            value={settings.integration.updateInterval}
            onChange={(e) => setSettings({
              ...settings,
              integration: { ...settings.integration, updateInterval: parseInt(e.target.value) }
            })}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>
      </div>
    </div>
  );

  const renderPlaceholderSection = (title: string) => (
    <div className="text-center py-12">
      <div className="max-w-sm mx-auto">
        <SettingsIcon className="h-12 w-12 text-gray-300 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">{title} Settings</h3>
        <p className="text-gray-500">
          {title} configuration options will be available in the next update.
        </p>
      </div>
    </div>
  );

  const renderActiveSection = () => {
    switch (activeSection) {
      case 'general':
        return renderGeneralSettings();
      case 'notifications':
        return renderNotificationSettings();
      case 'thresholds':
        return renderThresholdSettings();
      case 'integration':
        return renderIntegrationSettings();
      case 'users':
        return renderPlaceholderSection('User Management');
      case 'vehicles':
        return renderPlaceholderSection('Vehicle Management');
      case 'security':
        return renderPlaceholderSection('Security');
      default:
        return renderGeneralSettings();
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">System Settings</h2>
        <button 
          onClick={handleSave}
          className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
        >
          <Save className="h-4 w-4" />
          <span>Save Changes</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Settings Navigation */}
        <div className="lg:col-span-1">
          <nav className="space-y-1">
            {sections.map(section => {
              const Icon = section.icon;
              return (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 text-left rounded-lg transition-all duration-200 ${
                    activeSection === section.id
                      ? 'bg-green-50 text-green-700 border-l-4 border-green-500'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  <span className="font-medium">{section.name}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Settings Content */}
        <div className="lg:col-span-3">
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 capitalize">
                {activeSection} Settings
              </h3>
              <p className="text-sm text-gray-500 mt-1">
                Manage your {activeSection} configuration and preferences.
              </p>
            </div>
            
            {renderActiveSection()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;