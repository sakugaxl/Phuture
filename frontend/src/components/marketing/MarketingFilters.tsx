import React from 'react';
import { Calendar, Filter } from 'lucide-react';

interface MarketingFiltersProps {
  timeframe: string;
  setTimeframe: (timeframe: string) => void;
  platform: string;
  setPlatform: (platform: string) => void;
  status: string;
  setStatus: (status: string) => void;
}

const platforms = [
  { value: 'all', label: 'All Platforms' },
  { value: 'facebook', label: 'Facebook' },
  { value: 'instagram', label: 'Instagram' },
  { value: 'linkedin', label: 'LinkedIn' },
  { value: 'tiktok', label: 'TikTok' },
  { value: 'google', label: 'Google Ads' },
];

const statuses = [
  { value: 'all', label: 'All Status' },
  { value: 'active', label: 'Active' },
  { value: 'paused', label: 'Paused' },
  { value: 'completed', label: 'Completed' },
];

const timeframes = [
  { value: 'daily', label: '24 Hours' },
  { value: 'weekly', label: '7 Days' },
  { value: 'monthly', label: '30 Days' },
  { value: 'yearly', label: '12 Months' },
];

export default function MarketingFilters({
  timeframe,
  setTimeframe,
  platform,
  setPlatform,
  status,
  setStatus,
}: MarketingFiltersProps) {
  return (
    <div className="flex flex-wrap gap-4">
      <div className="flex items-center space-x-2">
        <Calendar size={20} className="text-gray-500" />
        <select
          value={timeframe}
          onChange={(e) => setTimeframe(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
        >
          {timeframes.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      <div className="flex items-center space-x-2">
        <Filter size={20} className="text-gray-500" />
        <select
          value={platform}
          onChange={(e) => setPlatform(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
        >
          {platforms.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      <div className="flex items-center space-x-2">
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
        >
          {statuses.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}