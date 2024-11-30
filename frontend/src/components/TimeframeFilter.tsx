import React from 'react';

interface Timeframe {
  label: string;
  value: string;
}

interface TimeframeFilterProps {
  timeframe: string;
  setTimeframe: (timeframe: string) => void;
  customTimeframes?: Timeframe[];
}

const defaultTimeframes: Timeframe[] = [
  { label: 'Daily', value: 'daily' },
  { label: 'Weekly', value: 'weekly' },
  { label: 'Monthly', value: 'monthly' },
  { label: 'Yearly', value: 'yearly' },
];

export default function TimeframeFilter({
  timeframe,
  setTimeframe,
  customTimeframes = defaultTimeframes,
}: TimeframeFilterProps) {
  return (
    <div className="flex space-x-2">
      {customTimeframes.map(({ label, value }) => (
        <button
          key={value}
          onClick={() => setTimeframe(value)}
          className={`px-4 py-2 rounded-lg transition-colors focus:ring-2 focus:ring-blue-500 focus:outline-none ${
            timeframe === value
              ? 'bg-blue-600 text-white'
              : 'bg-white text-gray-600 hover:bg-gray-50'
          }`}
          aria-pressed={timeframe === value}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
