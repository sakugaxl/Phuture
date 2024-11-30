import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { month: 'Jan', you: 5000, competitor1: 4000, competitor2: 3000 },
  { month: 'Feb', you: 5500, competitor1: 4200, competitor2: 3200 },
  { month: 'Mar', you: 6000, competitor1: 4500, competitor2: 3500 },
  { month: 'Apr', you: 6200, competitor1: 4800, competitor2: 3800 },
  { month: 'May', you: 6800, competitor1: 5000, competitor2: 4000 },
  { month: 'Jun', you: 7200, competitor1: 5200, competitor2: 4200 },
];

const competitors = [
  { name: 'Competitor 1', followers: '45.2K', engagement: '3.8%', posts: '128' },
  { name: 'Competitor 2', followers: '38.7K', engagement: '4.2%', posts: '156' },
];

const CompetitorCard = ({ competitor }: { competitor: typeof competitors[0] }) => (
  <div className="p-4 bg-gray-50 rounded-lg" aria-label={`Stats for ${competitor.name}`}>
    <h4 className="font-medium text-gray-900 mb-3">{competitor.name}</h4>
    <div className="space-y-2">
      <div className="flex justify-between">
        <span className="text-sm text-gray-500">Followers</span>
        <span className="text-sm font-medium">{competitor.followers}</span>
      </div>
      <div className="flex justify-between">
        <span className="text-sm text-gray-500">Engagement</span>
        <span className="text-sm font-medium">{competitor.engagement}</span>
      </div>
      <div className="flex justify-between">
        <span className="text-sm text-gray-500">Posts/month</span>
        <span className="text-sm font-medium">{competitor.posts}</span>
      </div>
    </div>
  </div>
);

export default function CompetitorAnalysis() {
  return (
    <div className="space-y-6">
      {/* Competitor Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {competitors.map((competitor, index) => (
          <CompetitorCard key={index} competitor={competitor} />
        ))}
      </div>

      {/* Line Chart */}
      <div className="h-[300px]">
        <h4 className="text-sm font-medium text-gray-700 mb-4">Follower Growth Comparison</h4>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            aria-label="Follower growth comparison chart"
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip
              formatter={(value: number, name: string) => [`${value.toLocaleString()} followers`, name]}
              contentStyle={{
                backgroundColor: 'white',
                borderRadius: '8px',
                border: '1px solid #E5E7EB',
              }}
            />
            <Line type="monotone" dataKey="you" name="Your Account" stroke="#3B82F6" strokeWidth={2} />
            <Line type="monotone" dataKey="competitor1" name="Competitor 1" stroke="#8B5CF6" strokeWidth={2} />
            <Line type="monotone" dataKey="competitor2" name="Competitor 2" stroke="#10B981" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
