import React from 'react';
import { Shield, Key, Lock } from 'lucide-react';

export default function Security() {
  return (
    <>
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Security</h1>
        <p className="mt-2 text-gray-600">Manage your account security and privacy</p>
      </header>

      <div className="grid gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-start">
            <Key className="text-blue-500 mt-1" size={24} />
            <div className="ml-4">
              <h3 className="text-lg font-semibold text-gray-900">Password Settings</h3>
              <p className="mt-2 text-gray-600">Update your password and security preferences.</p>
              <button className="mt-4 btn btn-primary">Change Password</button>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-start">
            <Lock className="text-purple-500 mt-1" size={24} />
            <div className="ml-4">
              <h3 className="text-lg font-semibold text-gray-900">Two-Factor Authentication</h3>
              <p className="mt-2 text-gray-600">Add an extra layer of security to your account.</p>
              <button className="mt-4 btn btn-primary">Enable 2FA</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}