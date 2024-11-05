import React from 'react';
import { TrendingUp, Users, DollarSign } from 'lucide-react';

const topPosts = [
  {
    id: 1,
    title: 'Summer Collection Launch',
    platform: 'Instagram',
    reach: '15.2K',
    engagement: '2.8K',
    roi: '3.2x',
  },
  {
    id: 2,
    title: 'Flash Sale Announcement',
    platform: 'Facebook',
    reach: '12.5K',
    engagement: '1.9K',
    roi: '2.8x',
  },
  {
    id: 3,
    title: 'Product Showcase',
    platform: 'LinkedIn',
    reach: '8.7K',
    engagement: '1.2K',
    roi: '2.1x',
  },
  {
    id: 4,
    title: 'Product Showcase',
    platform: 'TikTok',
    reach: '8.7K',
    engagement: '1.2K',
    roi: '2.1x',
  },
];

export default function TopPerformers() {
  return (
    <div className="space-y-4">
      {topPosts.map((post) => (
        <div
          key={post.id}
          className="p-4 border border-gray-100 rounded-lg hover:border-gray-200 transition-colors"
        >
          <div className="flex justify-between items-start mb-2">
            <div>
              <h4 className="font-medium text-gray-900">{post.title}</h4>
              <p className="text-sm text-gray-500">{post.platform}</p>
            </div>
            <span className="text-green-600 text-sm font-medium">{post.roi} ROI</span>
          </div>
          
          <div className="grid grid-cols-3 gap-4 mt-3">
            <div className="flex items-center">
              <TrendingUp size={16} className="text-blue-500 mr-2" />
              <div>
                <p className="text-xs text-gray-500">Reach</p>
                <p className="font-medium">{post.reach}</p>
              </div>
            </div>
            <div className="flex items-center">
              <Users size={16} className="text-purple-500 mr-2" />
              <div>
                <p className="text-xs text-gray-500">Engagement</p>
                <p className="font-medium">{post.engagement}</p>
              </div>
            </div>
            <div className="flex items-center">
              <DollarSign size={16} className="text-green-500 mr-2" />
              <div>
                <p className="text-xs text-gray-500">ROI</p>
                <p className="font-medium">{post.roi}</p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}