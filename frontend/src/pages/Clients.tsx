import React from 'react';
import { Users, FileText, MessageSquare } from 'lucide-react';
import DashboardCard from '../components/DashboardCard';

export default function Clients() {
  return (
    <>
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Client Portal</h1>
        <p className="mt-2 text-gray-600">Manage your client relationships and reports</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <DashboardCard
          title="Active Clients"
          value="24"
          icon={<Users className="text-blue-500" />}
          trend={{ value: 8, isPositive: true }}
        />
        <DashboardCard
          title="Reports Generated"
          value="156"
          icon={<FileText className="text-purple-500" />}
          trend={{ value: 12, isPositive: true }}
        />
        <DashboardCard
          title="Support Tickets"
          value="3"
          icon={<MessageSquare className="text-green-500" />}
          trend={{ value: 2, isPositive: false }}
        />
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Client List</h3>
        <p className="text-gray-600">Client management interface will be displayed here.</p>
      </div>
    </>
  );
}