import React, { useEffect, useState } from 'react';
import { BarChart3, Settings } from 'lucide-react';
import LoadingSpinner from '../LoadingSpinner';
import { api } from '../../services/api';

// Define the metric interface
interface Metric {
  name: string;
  title: string;
  description: string;
  total_value: { value: number };
}

// Map icons for each metric type
const metricIcons = {
  impressions: BarChart3,
  reach: BarChart3,
  profile_views: BarChart3,
  // Add more icons for each metric as needed
};

// Define colors for each metric type
const metricColors = {
  impressions: 'border-blue-500',
  reach: 'border-green-500',
  profile_views: 'border-purple-500',
  // Add colors for each metric as needed
};

export default function DailyMetrics() {
  const [metrics, setMetrics] = useState<Metric[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        setLoading(true);
        const data = await api.getSocialInsights();
        setMetrics(data);
        setError(null);
      } catch (err) {
        console.error('Error fetching metrics:', err);
        setError('Unable to load metrics. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchMetrics();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[200px]">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-red-600 mb-4">{error}</p>
        <button 
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {metrics.map((metric) => {
        const Icon = metricIcons[metric.name] || BarChart3;
        
        return (
          <div 
            key={metric.name}
            className={`bg-white rounded-lg border-l-4 ${metricColors[metric.name] || 'border-gray-300'} p-4`}
          >
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center">
                {Icon && <Icon className="h-5 w-5 text-gray-500 mr-2" />}
                <div>
                  <h4 className="font-medium text-gray-900">{metric.title}</h4>
                  <p className="text-sm text-gray-500">{metric.description}</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 mb-4">
              <div>
                <p className="text-sm text-gray-500">Total Value</p>
                <p className="font-medium">{metric.total_value.value}</p>
              </div>
            </div>

            <div className="flex justify-end space-x-2">
              <button 
                className="p-2 hover:bg-gray-100 rounded-lg" 
                title="View Details"
                onClick={() => console.log('View details for metric:', metric.name)}
              >
                <BarChart3 size={18} className="text-gray-500" />
              </button>
              <button 
                className="p-2 hover:bg-gray-100 rounded-lg" 
                title="Metric Settings"
                onClick={() => console.log('Open settings for metric:', metric.name)}
              >
                <Settings size={18} className="text-gray-500" />
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
