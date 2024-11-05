import React from 'react';
import { Brain, TrendingUp, Clock, Users } from 'lucide-react';

const recommendations = [
  {
    icon: Brain,
    title: 'Optimize Ad Spend',
    description: 'Increase Facebook ad budget by 20% for better reach',
    impact: 'Potential 15% ROI increase',
    color: 'purple'
  },
  {
    icon: Clock,
    title: 'Best Posting Time',
    description: 'Schedule posts between 10 AM - 2 PM SAST',
    impact: '25% higher engagement',
    color: 'blue'
  },
  {
    icon: Users,
    title: 'Target Audience',
    description: 'Focus on 25-34 age group in Gauteng',
    impact: '30% more conversions',
    color: 'green'
  }
];

const colorClasses = {
  purple: 'bg-purple-50 text-purple-600',
  blue: 'bg-blue-50 text-blue-600',
  green: 'bg-green-50 text-green-600'
};

export default function RecommendationsPanel() {
  return (
    <div className="space-y-4">
      {recommendations.map((rec, index) => (
        <div key={index} className="p-4 rounded-lg border border-gray-100 hover:border-gray-200 transition-colors">
          <div className="flex items-start">
            <div className={`p-2 rounded-lg ${colorClasses[rec.color]}`}>
              <rec.icon size={20} />
            </div>
            <div className="ml-3">
              <h4 className="font-medium text-gray-900">{rec.title}</h4>
              <p className="text-sm text-gray-600 mt-1">{rec.description}</p>
              <p className="text-xs text-gray-500 mt-1">{rec.impact}</p>
              <button className="mt-2 text-sm font-medium text-blue-600 hover:text-blue-700">
                Apply Recommendation
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}