import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { date: 'Mon', followers: 2400, engagement: 1200, reach: 4000 },
  { date: 'Tue', followers: 2600, engagement: 1300, reach: 4200 },
  { date: 'Wed', followers: 2900, engagement: 1400, reach: 4500 },
  { date: 'Thu', followers: 3100, engagement: 1600, reach: 4800 },
  { date: 'Fri', followers: 3300, engagement: 1700, reach: 5000 },
  { date: 'Sat', followers: 3500, engagement: 1900, reach: 5200 },
  { date: 'Sun', followers: 3800, engagement: 2000, reach: 5500 },
];

export default function SocialMetrics() {
  return (
    <div className="h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="colorFollowers" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.1}/>
              <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
            </linearGradient>
            <linearGradient id="colorEngagement" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.1}/>
              <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0}/>
            </linearGradient>
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
          <Area
            type="monotone"
            dataKey="followers"
            stroke="#3B82F6"
            fillOpacity={1}
            fill="url(#colorFollowers)"
          />
          <Area
            type="monotone"
            dataKey="engagement"
            stroke="#8B5CF6"
            fillOpacity={1}
            fill="url(#colorEngagement)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}