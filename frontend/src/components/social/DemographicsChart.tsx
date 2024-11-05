import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { age: '18-24', male: 15, female: 20 },
  { age: '25-34', male: 25, female: 30 },
  { age: '35-44', male: 20, female: 25 },
  { age: '45-54', male: 15, female: 20 },
  { age: '55+', male: 10, female: 15 },
];

export default function DemographicsChart() {
  return (
    <div className="h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="age" />
          <YAxis />
          <Tooltip
            contentStyle={{
              backgroundColor: 'white',
              borderRadius: '8px',
              border: '1px solid #E5E7EB',
            }}
          />
          <Bar dataKey="male" name="Male" fill="#3B82F6" />
          <Bar dataKey="female" name="Female" fill="#8B5CF6" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}