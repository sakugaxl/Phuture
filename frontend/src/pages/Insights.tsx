import React, { useState, useEffect } from 'react';
import { 
  Brain, 
  TrendingUp, 
  Users, 
  DollarSign, 
  BarChart3, 
  MessageSquare, 
  ChevronDown, 
  ChevronUp 
} from 'lucide-react';
import DashboardCard from '../components/DashboardCard';
import InsightCard from '../components/insights/InsightCard';
import PerformanceChart from '../components/insights/PerformanceChart';
import { fetchInsightsData } from '../services/api';

export default function Insights() {
  const [insights, setInsights] = useState([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const [isMarketingVisible, setIsMarketingVisible] = useState(true);
  const [isGrowthVisible, setIsGrowthVisible] = useState(true);
  const [isCustomerVisible, setIsCustomerVisible] = useState(true);

  useEffect(() => {
    const loadInsights = async () => {
      try {
        setLoading(true);
        const data = await fetchInsightsData();
        setInsights(data);
        setError(null);
      } catch (err) {
        console.error('Error fetching insights:', err);
        setError('Unable to load insights data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    loadInsights();
  }, []);

  if (loading) {
    return <p className="text-center text-gray-500">Loading insights...</p>;
  }

  if (error) {
    return (
      <div className="text-center text-red-600">
        <p>{error}</p>
      </div>
    );
  }

  const marketingInsights = insights.filter((insight) => insight.category === 'Marketing');
  const growthInsights = insights.filter((insight) => insight.category === 'Growth');
  const customerInsights = insights.filter((insight) => insight.category === 'Customer Behavior');

  return (
    <>
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">AI Insights</h1>
        <p className="mt-2 text-gray-600">AI-powered recommendations to optimize your business</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <DashboardCard
          title="Optimization Score"
          value="85/100"
          icon={<Brain className="text-purple-500" />}
          trend={{ value: 5, isPositive: true }}
        />
        <DashboardCard
          title="Potential Savings"
          value="R 12,500"
          icon={<DollarSign className="text-green-500" />}
          trend={{ value: 15, isPositive: true }}
        />
        <DashboardCard
          title="Growth Opportunities"
          value="3"
          icon={<TrendingUp className="text-blue-500" />}
          trend={{ value: 2, isPositive: true }}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-sm">
            <div className="p-6 border-b border-gray-100">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Performance Trends</h3>
                  <p className="text-sm text-gray-500">AI-detected patterns in your business metrics</p>
                </div>
                <select className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                  <option>Last 7 days</option>
                  <option>Last 30 days</option>
                  <option>Last 90 days</option>
                </select>
              </div>
              <PerformanceChart />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
          <div className="space-y-4">
            <button className="w-full flex items-center justify-between p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors">
              <div className="flex items-center">
                <Brain className="text-purple-500" size={20} />
                <span className="ml-3 font-medium text-purple-900">Run Analysis</span>
              </div>
              <span className="text-purple-500">→</span>
            </button>
            <button className="w-full flex items-center justify-between p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
              <div className="flex items-center">
                <BarChart3 className="text-blue-500" size={20} />
                <span className="ml-3 font-medium text-blue-900">Generate Report</span>
              </div>
              <span className="text-blue-500">→</span>
            </button>
            <button className="w-full flex items-center justify-between p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors">
              <div className="flex items-center">
                <MessageSquare className="text-green-500" size={20} />
                <span className="ml-3 font-medium text-green-900">Get Recommendations</span>
              </div>
              <span className="text-green-500">→</span>
            </button>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        {/* Marketing Insights */}
        <div className="bg-white rounded-xl shadow-sm">
          <div 
            className="p-6 border-b border-gray-100 flex items-center justify-between cursor-pointer"
            onClick={() => setIsMarketingVisible(!isMarketingVisible)}
          >
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Marketing Insights</h3>
              <p className="text-sm text-gray-500">AI-powered marketing optimization recommendations</p>
            </div>
            {isMarketingVisible ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </div>
          <div className={`transition-all duration-300 ${isMarketingVisible ? 'p-6' : 'h-0 overflow-hidden'}`}>
            <div className="space-y-6">
              {marketingInsights.map((insight, index) => (
                <InsightCard key={index} {...insight} />
              ))}
            </div>
          </div>
        </div>

        {/* Growth Insights */}
        <div className="bg-white rounded-xl shadow-sm">
          <div 
            className="p-6 border-b border-gray-100 flex items-center justify-between cursor-pointer"
            onClick={() => setIsGrowthVisible(!isGrowthVisible)}
          >
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Growth Insights</h3>
              <p className="text-sm text-gray-500">Market expansion and business growth opportunities</p>
            </div>
            {isGrowthVisible ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </div>
          <div className={`transition-all duration-300 ${isGrowthVisible ? 'p-6' : 'h-0 overflow-hidden'}`}>
            <div className="space-y-6">
              {growthInsights.map((insight, index) => (
                <InsightCard key={index} {...insight} />
              ))}
            </div>
          </div>
        </div>

        {/* Customer Behavior Insights */}
        <div className="bg-white rounded-xl shadow-sm">
          <div 
            className="p-6 border-b border-gray-100 flex items-center justify-between cursor-pointer"
            onClick={() => setIsCustomerVisible(!isCustomerVisible)}
          >
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Customer Behavior Insights</h3>
              <p className="text-sm text-gray-500">Understanding customer engagement patterns</p>
            </div>
            {isCustomerVisible ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </div>
          <div className={`transition-all duration-300 ${isCustomerVisible ? 'p-6' : 'h-0 overflow-hidden'}`}>
            <div className="space-y-6">
              {customerInsights.map((insight, index) => (
                <InsightCard key={index} {...insight} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
