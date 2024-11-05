import React, { useState } from 'react';
import { TrendingUp, Target, Users, Calendar, Filter, BarChart3, DollarSign, ChevronDown, ChevronUp } from 'lucide-react';
import DashboardCard from '../components/DashboardCard';
import CampaignList from '../components/marketing/CampaignList';
import MarketingFilters from '../components/marketing/MarketingFilters';
import PerformanceChart from '../components/marketing/PerformanceChart';
import TopPerformers from '../components/marketing/TopPerformers';

export default function Marketing() {
  const [timeframe, setTimeframe] = useState('monthly');
  const [platform, setPlatform] = useState('all');
  const [status, setStatus] = useState('all');
  const [isPerformanceVisible, setIsPerformanceVisible] = useState(true);
  const [isTopPerformersVisible, setIsTopPerformersVisible] = useState(true);
  const [isActiveCampaignsVisible, setIsActiveCampaignsVisible] = useState(true);

  return (
    <>
      <div className="sticky top-0 z-10 bg-gray-50 pb-4">
        <header className="mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Marketing Campaigns</h1>
              <p className="mt-2 text-gray-600">Manage, track, and optimize your marketing campaigns across all platforms</p>
            </div>
            <div className="mt-4 sm:mt-0">
              <button className="btn btn-primary">
                Create Campaign
              </button>
            </div>
          </div>
        </header>

        <MarketingFilters
          timeframe={timeframe}
          setTimeframe={setTimeframe}
          platform={platform}
          setPlatform={setPlatform}
          status={status}
          setStatus={setStatus}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <DashboardCard
          title="Active Campaigns"
          value="8"
          icon={<TrendingUp className="text-blue-500" />}
          trend={{ value: 5, isPositive: true }}
        />
        <DashboardCard
          title="Total Reach"
          value="45.2K"
          icon={<Target className="text-purple-500" />}
          trend={{ value: 12.3, isPositive: true }}
        />
        <DashboardCard
          title="Conversions"
          value="1.2K"
          icon={<Users className="text-green-500" />}
          trend={{ value: 8.7, isPositive: true }}
        />
        <DashboardCard
          title="Ad Spend"
          value="R 12,450"
          icon={<DollarSign className="text-orange-500" />}
          trend={{ value: 3.2, isPositive: false }}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-sm">
            <div 
              className="p-6 border-b border-gray-100 flex items-center justify-between cursor-pointer"
              onClick={() => setIsPerformanceVisible(!isPerformanceVisible)}
            >
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Performance Overview</h3>
                <p className="text-sm text-gray-500">Track your campaign metrics over time</p>
              </div>
              <div className="flex items-center">
                <select className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 mr-4">
                  <option>Reach</option>
                  <option>Engagement</option>
                  <option>Conversions</option>
                </select>
                {isPerformanceVisible ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </div>
            </div>
            <div className={`transition-all duration-300 ${isPerformanceVisible ? 'p-6' : 'h-0 overflow-hidden'}`}>
              <PerformanceChart />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm">
          <div 
            className="p-6 border-b border-gray-100 flex items-center justify-between cursor-pointer"
            onClick={() => setIsTopPerformersVisible(!isTopPerformersVisible)}
          >
            <h3 className="text-lg font-semibold text-gray-900">Top Performers</h3>
            {isTopPerformersVisible ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </div>
          <div className={`transition-all duration-300 ${isTopPerformersVisible ? 'p-6' : 'h-0 overflow-hidden'}`}>
            <TopPerformers />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm">
        <div 
          className="p-6 border-b border-gray-100 flex items-center justify-between cursor-pointer"
          onClick={() => setIsActiveCampaignsVisible(!isActiveCampaignsVisible)}
        >
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Active Campaigns</h3>
            <p className="text-sm text-gray-500">Manage and monitor your running campaigns</p>
          </div>
          <div className="flex items-center space-x-2">
            <button className="p-2 hover:bg-gray-100 rounded-lg">
              <Filter size={20} className="text-gray-500" />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-lg">
              <BarChart3 size={20} className="text-gray-500" />
            </button>
            {isActiveCampaignsVisible ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </div>
        </div>
        <div className={`transition-all duration-300 ${isActiveCampaignsVisible ? 'p-6' : 'h-0 overflow-hidden'}`}>
          <CampaignList platform={platform} status={status} />
        </div>
      </div>
    </>
  );
}