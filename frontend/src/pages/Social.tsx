import React, { useState } from 'react';
import { Share2, Users, MessageSquare, ChevronDown, ChevronUp, Calendar, BarChart3 } from 'lucide-react';
import DashboardCard from '../components/DashboardCard';
import SocialLoginPanel from '../components/SocialLoginPanel';
import SocialMetrics from '../components/social/SocialMetrics';
import ContentCalendar from '../components/social/ContentCalendar';
import EngagementHub from '../components/social/EngagementHub';
import AudienceInsights from '../components/social/AudienceInsights';

export default function Social() {
  const [isMetricsVisible, setIsMetricsVisible] = useState(true);
  const [isCalendarVisible, setIsCalendarVisible] = useState(true);
  const [isEngagementVisible, setIsEngagementVisible] = useState(true);
  const [isAudienceVisible, setIsAudienceVisible] = useState(true);

  return (
    <>
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Social Media Management</h1>
        <p className="mt-2 text-gray-600">Manage all your social media accounts in one place</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <DashboardCard
          title="Total Followers"
          value="24.5K"
          icon={<Users className="text-blue-500" />}
          trend={{ value: 5.2, isPositive: true }}
        />
        <DashboardCard
          title="Engagement Rate"
          value="4.8%"
          icon={<Share2 className="text-purple-500" />}
          trend={{ value: 0.5, isPositive: true }}
        />
        <DashboardCard
          title="Total Posts"
          value="128"
          icon={<MessageSquare className="text-green-500" />}
          trend={{ value: 12, isPositive: true }}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2">
          {/* Performance Metrics Section */}
          <div className="bg-white rounded-xl shadow-sm mb-6">
            <div 
              className="p-6 border-b border-gray-100 flex items-center justify-between cursor-pointer"
              onClick={() => setIsMetricsVisible(!isMetricsVisible)}
            >
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Performance Metrics</h3>
                <p className="text-sm text-gray-500">Track your social media performance</p>
              </div>
              {isMetricsVisible ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
            </div>
            <div className={`transition-all duration-300 ${isMetricsVisible ? 'p-6' : 'h-0 overflow-hidden'}`}>
              <SocialMetrics />
            </div>
          </div>

          {/* Audience Insights Section */}
          <div className="bg-white rounded-xl shadow-sm mb-6">
            <div 
              className="p-6 border-b border-gray-100 flex items-center justify-between cursor-pointer"
              onClick={() => setIsAudienceVisible(!isAudienceVisible)}
            >
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Audience Insights</h3>
                <p className="text-sm text-gray-500">Understand your audience demographics</p>
              </div>
              {isAudienceVisible ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
            </div>
            <div className={`transition-all duration-300 ${isAudienceVisible ? 'p-6' : 'h-0 overflow-hidden'}`}>
              <AudienceInsights />
            </div>
          </div>

          {/* Content Calendar Section */}
          <div className="bg-white rounded-xl shadow-sm">
            <div 
              className="p-6 border-b border-gray-100 flex items-center justify-between cursor-pointer"
              onClick={() => setIsCalendarVisible(!isCalendarVisible)}
            >
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Content Calendar</h3>
                <p className="text-sm text-gray-500">Schedule and manage your content</p>
              </div>
              <div className="flex items-center space-x-4">
                <button className="btn btn-primary">Create Post</button>
                {isCalendarVisible ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </div>
            </div>
            <div className={`transition-all duration-300 ${isCalendarVisible ? 'p-6' : 'h-0 overflow-hidden'}`}>
              <ContentCalendar />
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <SocialLoginPanel />

          {/* Engagement Hub Section */}
          <div className="bg-white rounded-xl shadow-sm">
            <div 
              className="p-6 border-b border-gray-100 flex items-center justify-between cursor-pointer"
              onClick={() => setIsEngagementVisible(!isEngagementVisible)}
            >
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Engagement Hub</h3>
                <p className="text-sm text-gray-500">Monitor and respond to interactions</p>
              </div>
              {isEngagementVisible ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
            </div>
            <div className={`transition-all duration-300 ${isEngagementVisible ? 'p-6' : 'h-0 overflow-hidden'}`}>
              <EngagementHub />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}