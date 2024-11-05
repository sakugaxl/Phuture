import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

interface ExpenseData {
  name: string;
  value: number;
  color: string;
}

interface ExpensesPieChartProps {
  data: ExpenseData[];
}

export default function ExpensesPieChart({ data }: ExpensesPieChartProps) {
  return (
    <div className="h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            paddingAngle={5}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip
            formatter={(value: number) => `R ${value.toLocaleString()}`}
            contentStyle={{ backgroundColor: 'white', borderRadius: '8px' }}
          />
        </PieChart>
      </ResponsiveContainer>
      
      <div className="mt-4 grid grid-cols-2 gap-2">
        {data.map((item) => (
          <div key={item.name} className="flex items-center">
            <div
              className="w-3 h-3 rounded-full mr-2"
              style={{ backgroundColor: item.color }}
            />
            <span className="text-sm text-gray-600">
              {item.name}: R {item.value.toLocaleString()}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}