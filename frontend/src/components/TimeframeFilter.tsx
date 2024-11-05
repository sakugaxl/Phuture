import React from 'react';

interface TimeframeFilterProps {
  timeframe: string;
  setTimeframe: (timeframe: string) => void;
}

const timeframes = [
  { label: 'Daily', value: 'daily' },
  { label: 'Weekly', value: 'weekly' },
  { label: 'Monthly', value: 'monthly' },
  { label: 'Yearly', value: 'yearly' },
];

export default function TimeframeFilter({ timeframe, setTimeframe }: TimeframeFilterProps) {
  return (
    <div className="flex space-x-2">
      {timeframes.map(({ label, value }) => (
        <button
          key={value}
          onClick={() => setTimeframe(value)}
          className={`px-4 py-2 rounded-lg transition-colors ${
            timeframe === value
              ? 'bg-blue-600 text-white'
              : 'bg-white text-gray-600 hover:bg-gray-50'
          }`}
        >
          {label}
        </button>
      ))}
    </div>
  );
}