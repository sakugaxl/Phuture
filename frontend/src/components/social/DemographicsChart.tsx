import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

const data = [
  { age: '18-24', male: 15, female: 20 },
  { age: '25-34', male: 25, female: 30 },
  { age: '35-44', male: 20, female: 25 },
  { age: '45-54', male: 15, female: 20 },
  { age: '55+', male: 10, female: 15 },
];

// Custom tooltip component for better formatting
const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 rounded shadow-sm border border-gray-200">
        <p className="font-semibold text-gray-800">{`Age Group: ${payload[0].payload.age}`}</p>
        <p className="text-blue-600">{`Male: ${payload[0].value}%`}</p>
        <p className="text-purple-600">{`Female: ${payload[1].value}%`}</p>
      </div>
    );
  }
  return null;
};

export default function DemographicsChart() {
  return (
    <div
      className="h-[300px]"
      role="region"
      aria-label="Demographics Chart showing age groups with male and female percentages"
    >
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          title="Demographics Distribution by Age Group"
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="age" label={{ value: 'Age Group', position: 'insideBottom', offset: -5 }} />
          <YAxis label={{ value: 'Percentage (%)', angle: -90, position: 'insideLeft' }} />
          <Tooltip content={<CustomTooltip />} />
          <Bar dataKey="male" name="Male" fill="#3B82F6" />
          <Bar dataKey="female" name="Female" fill="#8B5CF6" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
