import React, { useState } from 'react';
import { Shield, Key, Lock, CheckCircle, XCircle } from 'lucide-react';
import Modal from '../components/Modal'; // Custom modal component
import axios from 'axios';

export default function Security() {
  const [is2FAEnabled, setIs2FAEnabled] = useState(false);
  const [isPasswordModalOpen, setPasswordModalOpen] = useState(false);
  const [is2FAModalOpen, set2FAModalOpen] = useState(false);

  const handleEnable2FA = async () => {
    try {
      // Simulated API call to enable 2FA
      await axios.post('/api/security/enable-2fa');
      setIs2FAEnabled(true);
      alert('Two-Factor Authentication enabled successfully!');
    } catch (error) {
      console.error('Failed to enable 2FA:', error);
      alert('Error enabling Two-Factor Authentication. Please try again.');
    } finally {
      set2FAModalOpen(false);
    }
  };

  return (
    <>
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Security</h1>
        <p className="mt-2 text-gray-600">Manage your account security and privacy</p>
      </header>

      <div className="grid gap-6">
        {/* Password Settings */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-start">
            <Key className="text-blue-500 mt-1" size={24} />
            <div className="ml-4">
              <h3 className="text-lg font-semibold text-gray-900">Password Settings</h3>
              <p className="mt-2 text-gray-600">Update your password and security preferences.</p>
              <button
                className="mt-4 btn btn-primary"
                onClick={() => setPasswordModalOpen(true)}
              >
                Change Password
              </button>
            </div>
          </div>
        </div>

        {/* Two-Factor Authentication */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-start">
            <Lock className="text-purple-500 mt-1" size={24} />
            <div className="ml-4">
              <h3 className="text-lg font-semibold text-gray-900">Two-Factor Authentication</h3>
              <p className="mt-2 text-gray-600">
                Add an extra layer of security to your account.
              </p>
              <div className="flex items-center mt-4 space-x-2">
                {is2FAEnabled ? (
                  <>
                    <CheckCircle className="text-green-500" size={20} />
                    <span className="text-sm text-green-500">Enabled</span>
                  </>
                ) : (
                  <>
                    <XCircle className="text-red-500" size={20} />
                    <span className="text-sm text-red-500">Not Enabled</span>
                  </>
                )}
              </div>
              {!is2FAEnabled && (
                <button
                  className="mt-4 btn btn-primary"
                  onClick={() => set2FAModalOpen(true)}
                >
                  Enable 2FA
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      {isPasswordModalOpen && (
        <Modal onClose={() => setPasswordModalOpen(false)} title="Change Password">
          <form className="space-y-4">
            <div>
              <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700">
                Current Password
              </label>
              <input
                type="password"
                id="currentPassword"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="Enter current password"
              />
            </div>
            <div>
              <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">
                New Password
              </label>
              <input
                type="password"
                id="newPassword"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="Enter new password"
              />
            </div>
            <div className="flex justify-end">
              <button type="submit" className="btn btn-primary">
                Update Password
              </button>
            </div>
          </form>
        </Modal>
      )}

      {is2FAModalOpen && (
        <Modal onClose={() => set2FAModalOpen(false)} title="Enable Two-Factor Authentication">
          <p className="text-sm text-gray-600">
            Two-Factor Authentication (2FA) provides an additional layer of security for your
            account. You will need an authenticator app to enable 2FA.
          </p>
          <div className="mt-6 flex justify-end">
            <button
              className="btn btn-primary"
              onClick={handleEnable2FA}
            >
              Enable 2FA
            </button>
          </div>
        </Modal>
      )}
    </>
  );
}
