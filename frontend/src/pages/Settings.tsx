import React from 'react';
import { Settings as SettingsIcon, Bell, Link, Palette } from 'lucide-react';
import ProfileSection from '../components/settings/ProfileSection';
import IntegrationsSection from '../components/settings/IntegrationsSection';

const settingsTabs = [
  { id: 'profile', icon: SettingsIcon, label: 'Profile' },
  { id: 'notifications', icon: Bell, label: 'Notifications' },
  { id: 'integrations', icon: Link, label: 'Integrations' },
  { id: 'appearance', icon: Palette, label: 'Appearance' },
];

export default function Settings() {
  const [activeTab, setActiveTab] = React.useState('profile');

  return (
    <>
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
        <p className="mt-2 text-gray-600">Manage your account and preferences</p>
      </header>

      <div className="flex flex-col md:flex-row gap-8">
        <div className="w-full md:w-64 bg-white rounded-xl shadow-sm p-4">
          {settingsTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                activeTab === tab.id
                  ? 'bg-blue-50 text-blue-600'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <tab.icon size={20} />
              <span className="font-medium">{tab.label}</span>
            </button>
          ))}
        </div>

        <div className="flex-1">
          {activeTab === 'profile' && <ProfileSection />}
          {activeTab === 'notifications' && (
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900">Notification Settings</h3>
              <p className="mt-2 text-gray-600">Configure your notification preferences</p>
            </div>
          )}
          {activeTab === 'integrations' && <IntegrationsSection />}
          {activeTab === 'appearance' && (
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900">Appearance</h3>
              <p className="mt-2 text-gray-600">Customize your dashboard appearance</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}