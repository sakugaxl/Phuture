import React from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

interface SocialMetricsProps {
  data: Array<{
    date: string;
    followers: number;
    engagement: number;
    reach: number;
  }>;
  metricsToShow?: Array<'followers' | 'engagement' | 'reach'>;
}

const defaultMetrics = ['followers', 'engagement', 'reach'] as const;

export default function SocialMetrics({ 
  data, 
  metricsToShow = defaultMetrics,
}: SocialMetricsProps) {
  const metricColors = {
    followers: { stroke: '#3B82F6', gradientId: 'colorFollowers' },
    engagement: { stroke: '#8B5CF6', gradientId: 'colorEngagement' },
    reach: { stroke: '#10B981', gradientId: 'colorReach' },
  };

  return (
    <div className="h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
          <defs>
            {Object.entries(metricColors).map(([key, { gradientId, stroke }]) => (
              <linearGradient key={gradientId} id={gradientId} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={stroke} stopOpacity={0.1} />
                <stop offset="95%" stopColor={stroke} stopOpacity={0} />
              </linearGradient>
            ))}
          </defs>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip
            contentStyle={{
              backgroundColor: 'white',
              borderRadius: '8px',
              border: '1px solid #E5E7EB',
            }}
          />
          {metricsToShow.map((metric) => (
            <Area
              key={metric}
              type="monotone"
              dataKey={metric}
              stroke={metricColors[metric].stroke}
              fillOpacity={1}
              fill={`url(#${metricColors[metric].gradientId})`}
            />
          ))}
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
