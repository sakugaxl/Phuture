import React from 'react';
import { LucideIcon } from 'lucide-react';

interface Metric {
  label: string;
  value: string;
}

interface InsightCardProps {
  category: string;
  title: string;
  description: string;
  metrics: Metric[];
  action: string;
  icon: LucideIcon;
  color: 'purple' | 'blue' | 'green';
}

const colorClasses = {
  purple: {
    bg: 'bg-purple-50',
    text: 'text-purple-600',
    border: 'border-purple-200',
    hover: 'hover:bg-purple-100',
  },
  blue: {
    bg: 'bg-blue-50',
    text: 'text-blue-600',
    border: 'border-blue-200',
    hover: 'hover:bg-blue-100',
  },
  green: {
    bg: 'bg-green-50',
    text: 'text-green-600',
    border: 'border-green-200',
    hover: 'hover:bg-green-100',
  },
};

export default function InsightCard({
  category,
  title,
  description,
  metrics,
  action,
  icon: Icon,
  color,
}: InsightCardProps) {
  const colors = colorClasses[color];

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-start">
        <div className={`p-3 rounded-lg ${colors.bg}`}>
          <Icon className={colors.text} size={24} />
        </div>
        <div className="ml-4 flex-1">
          <div className="flex items-center justify-between">
            <span className={`text-sm font-medium ${colors.text}`}>{category}</span>
            <span className="text-sm text-gray-500">Updated 2h ago</span>
          </div>
          <h3 className="mt-2 text-lg font-semibold text-gray-900">{title}</h3>
          <p className="mt-1 text-gray-600">{description}</p>

          <div className="mt-4 grid grid-cols-3 gap-4">
            {metrics.map((metric, index) => (
              <div
                key={index}
                className={`p-3 rounded-lg border ${colors.border} ${colors.bg}`}
              >
                <p className="text-sm text-gray-600">{metric.label}</p>
                <p className={`mt-1 font-semibold ${colors.text}`}>{metric.value}</p>
              </div>
            ))}
          </div>

          <button
            className={`mt-4 px-4 py-2 rounded-lg border ${colors.border} ${colors.text} ${colors.hover} transition-colors`}
          >
            {action}
          </button>
        </div>
      </div>
    </div>
  );
}