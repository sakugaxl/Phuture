import React, { useEffect, useState } from 'react';
import { BarChart3 } from 'lucide-react';
import LoadingSpinner from '../LoadingSpinner';
import { api } from '../../services/api';

interface Metric {
  name: string;
  title: string;
  description: string;
  total_value: { value: number };
}

const metricIcons: Record<string, React.ElementType> = {
  impressions: BarChart3,
  reach: BarChart3,
  profile_views: BarChart3,
};

const metricColors: Record<string, string> = {
  impressions: 'border-blue-500',
  reach: 'border-green-500',
  profile_views: 'border-purple-500',
};

export default function DailyMetrics() {
  const [metrics, setMetrics] = useState<Metric[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        setLoading(true);
        const data = await api.getSocialInsights();
        setMetrics(data);
      } catch (err) {
        console.error('Error fetching metrics:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchMetrics();
  }, []);

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="space-y-4">
      {metrics.map((metric) => {
        const Icon = metricIcons[metric.name] || BarChart3;
        return (
          <div key={metric.name} className={`bg-white rounded-lg border-l-4 ${metricColors[metric.name]} p-4`}>
            <div className="flex items-center">
              <Icon className="h-5 w-5 text-gray-500 mr-2" />
              <div>
                <h4 className="font-medium text-gray-900">{metric.title}</h4>
                <p className="text-sm text-gray-500">{metric.description}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
