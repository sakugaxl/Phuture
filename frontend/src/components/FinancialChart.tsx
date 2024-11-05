import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

interface FinancialChartProps {
  data: Array<{
    date: string;
    income: number;
    expenses: number;
    profit: number;
  }>;
}

export default function FinancialChart({ data }: FinancialChartProps) {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip
          formatter={(value: number) => `R ${value.toLocaleString()}`}
          contentStyle={{ backgroundColor: 'white', borderRadius: '8px' }}
        />
        <Legend />
        <Line
          type="monotone"
          dataKey="income"
          stroke="#10B981"
          strokeWidth={2}
          dot={false}
        />
        <Line
          type="monotone"
          dataKey="expenses"
          stroke="#EF4444"
          strokeWidth={2}
          dot={false}
        />
        <Line
          type="monotone"
          dataKey="profit"
          stroke="#3B82F6"
          strokeWidth={2}
          dot={false}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}