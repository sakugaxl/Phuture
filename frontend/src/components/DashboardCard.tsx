import React from 'react';

interface DashboardCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  className?: string;
}

export default function DashboardCard({ title, value, icon, trend, className = '' }: DashboardCardProps) {
  return (
    <div className={`bg-white rounded-xl shadow-sm p-4 sm:p-6 ${className}`}>
      <div className="flex items-center justify-between">
        <div className="text-gray-600 text-sm sm:text-base">{title}</div>
        <div className="text-gray-700">{icon}</div>
      </div>
      
      <div className="mt-4">
        <div className="text-xl sm:text-2xl font-semibold text-gray-900">{value}</div>
        {trend && (
          <div className={`flex items-center mt-2 ${trend.isPositive ? 'text-green-600' : 'text-red-600'}`}>
            <span className="text-sm">
              {trend.isPositive ? '↑' : '↓'} {Math.abs(trend.value)}%
            </span>
            <span className="text-xs text-gray-500 ml-2">vs last month</span>
          </div>
        )}
      </div>
    </div>
  );
}