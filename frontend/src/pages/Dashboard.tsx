import React, { useState, useEffect } from 'react';
import { 
  TrendingUp, 
  DollarSign, 
  Users, 
  Activity, 
  ChevronDown, 
  ChevronUp, 
  ArrowUpRight 
} from 'lucide-react';
import DashboardCard from '../components/DashboardCard';
import PerformanceChart from '../components/dashboard/PerformanceChart';
import RecommendationsPanel from '../components/dashboard/RecommendationsPanel';
import ActiveCampaigns from '../components/dashboard/ActiveCampaigns';
import TopPerformers from '../components/dashboard/TopPerformers';
import { fetchAnalyticsData } from '../services/api';

export default function Dashboard() {
  const [analytics, setAnalytics] = useState<any>(null);
  const [isPerformanceVisible, setIsPerformanceVisible] = useState(true);
  const [isRecommendationsVisible, setIsRecommendationsVisible] = useState(true);
  const [isCampaignsVisible, setIsCampaignsVisible] = useState(true);
  const [isTopPerformersVisible, setIsTopPerformersVisible] = useState(true);

  useEffect(() => {
    const loadAnalytics = async () => {
      try {
        const data = await fetchAnalyticsData();
        setAnalytics(data);
      } catch (error) {
        console.error('Failed to fetch analytics data:', error);
      }
    };
    loadAnalytics();
  }, []);

  if (!analytics) {
    return <p className="text-center text-gray-500">Loading analytics...</p>;
  }

  return (
    <>
      <header className="mb-8">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Dashboard Overview</h1>
            <p className="mt-2 text-gray-600">Welcome back! Here's your business at a glance.</p>
          </div>
          <button className="flex items-center text-blue-600 hover:text-blue-700">
            <span className="text-sm mr-1">View Reports</span>
            <ArrowUpRight size={16} />
          </button>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <DashboardCard
          title="Total Revenue"
          value={`R ${analytics.metrics.totalRevenue.toLocaleString()}`}
          icon={<DollarSign className="text-green-500" />}
          trend={analytics.trends.revenue}
        />
        <DashboardCard
          title="Active Campaigns"
          value={analytics.metrics.activeCampaigns}
          icon={<TrendingUp className="text-blue-500" />}
          trend={analytics.trends.campaigns}
        />
        <DashboardCard
          title="New Clients"
          value={analytics.metrics.newClients}
          icon={<Users className="text-purple-500" />}
          trend={analytics.trends.clients}
        />
        <DashboardCard
          title="Engagement Rate"
          value={`${analytics.metrics.engagementRate}%`}
          icon={<Activity className="text-orange-500" />}
          trend={analytics.trends.engagement}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2">
          {/* Performance Overview Section */}
          <div className="bg-white rounded-xl shadow-sm mb-6">
            <div 
              className="p-6 border-b border-gray-100 flex items-center justify-between cursor-pointer"
              onClick={() => setIsPerformanceVisible(!isPerformanceVisible)}
            >
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Performance Overview</h3>
                <p className="text-sm text-gray-500">Track your campaign metrics and ROI</p>
              </div>
              <div className="flex items-center space-x-4">
                <select className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                  <option>Last 7 days</option>
                  <option>Last 30 days</option>
                  <option>Last 90 days</option>
                </select>
                {isPerformanceVisible ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </div>
            </div>
            <div className={`transition-all duration-300 ${isPerformanceVisible ? 'p-6' : 'h-0 overflow-hidden'}`}>
              <PerformanceChart />
            </div>
          </div>

          {/* Active Campaigns Section */}
          <div className="bg-white rounded-xl shadow-sm">
            <div 
              className="p-6 border-b border-gray-100 flex items-center justify-between cursor-pointer"
              onClick={() => setIsCampaignsVisible(!isCampaignsVisible)}
            >
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Active Campaigns</h3>
                <p className="text-sm text-gray-500">Monitor your running campaigns</p>
              </div>
              {isCampaignsVisible ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
            </div>
            <div className={`transition-all duration-300 ${isCampaignsVisible ? 'p-6' : 'h-0 overflow-hidden'}`}>
              <ActiveCampaigns />
            </div>
          </div>
        </div>

        <div className="space-y-6">
          {/* AI Recommendations Section */}
          <div className="bg-white rounded-xl shadow-sm">
            <div 
              className="p-6 border-b border-gray-100 flex items-center justify-between cursor-pointer"
              onClick={() => setIsRecommendationsVisible(!isRecommendationsVisible)}
            >
              <div>
                <h3 className="text-lg font-semibold text-gray-900">AI Recommendations</h3>
                <p className="text-sm text-gray-500">Smart insights to improve performance</p>
              </div>
              {isRecommendationsVisible ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
            </div>
            <div className={`transition-all duration-300 ${isRecommendationsVisible ? 'p-6' : 'h-0 overflow-hidden'}`}>
              <RecommendationsPanel />
            </div>
          </div>

          {/* Top Performers Section */}
          <div className="bg-white rounded-xl shadow-sm">
            <div 
              className="p-6 border-b border-gray-100 flex items-center justify-between cursor-pointer"
              onClick={() => setIsTopPerformersVisible(!isTopPerformersVisible)}
            >
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Top Performers</h3>
                <p className="text-sm text-gray-500">Best performing content</p>
              </div>
              {isTopPerformersVisible ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
            </div>
            <div className={`transition-all duration-300 ${isTopPerformersVisible ? 'p-6' : 'h-0 overflow-hidden'}`}>
              <TopPerformers />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
