import { TrendingUp, Users, DollarSign } from 'lucide-react';

const topPosts = [
  {
    id: 1,
    title: 'Summer Collection Launch',
    platform: 'Instagram',
    reach: 15200,
    engagement: 2800,
    roi: 3.2,
  },
  {
    id: 2,
    title: 'Flash Sale Announcement',
    platform: 'Facebook',
    reach: 12500,
    engagement: 1900,
    roi: 2.8,
  },
];

export default function TopPerformers() {
  const formatNumber = (value: number): string =>
    value >= 1000 ? `${(value / 1000).toFixed(1)}K` : value.toString();

  const formatROI = (value: number): string =>
    value >= 2 ? 'text-green-600' : value >= 1 ? 'text-yellow-600' : 'text-red-600';

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
            <span className={`text-sm font-medium ${formatROI(post.roi)}`}>
              {post.roi.toFixed(1)}x ROI
            </span>
          </div>

          <div className="grid grid-cols-3 gap-4 mt-3">
            <div className="flex items-center">
              <TrendingUp size={16} className="text-blue-500 mr-2" />
              <div>
                <p className="text-xs text-gray-500">Reach</p>
                <p className="font-medium">{formatNumber(post.reach)}</p>
              </div>
            </div>
            <div className="flex items-center">
              <Users size={16} className="text-purple-500 mr-2" />
              <div>
                <p className="text-xs text-gray-500">Engagement</p>
                <p className="font-medium">{formatNumber(post.engagement)}</p>
              </div>
            </div>
            <div className="flex items-center">
              <DollarSign size={16} className="text-green-500 mr-2" />
              <div>
                <p className="text-xs text-gray-500">ROI</p>
                <p className="font-medium">{post.roi.toFixed(1)}x</p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
