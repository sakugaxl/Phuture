import React, { useState } from 'react';
import { Users, MapPin, TrendingUp, ChevronDown, ChevronUp } from 'lucide-react';
import DemographicsChart from './DemographicsChart';
import LocationMap from './LocationMap';
import CompetitorAnalysis from './CompetitorAnalysis';

export default function AudienceInsights() {
  const [isDemographicsVisible, setIsDemographicsVisible] = useState(true);
  const [isLocationVisible, setIsLocationVisible] = useState(true);
  const [isCompetitorVisible, setIsCompetitorVisible] = useState(true);

  return (
    <div className="space-y-6">
      {/* Demographics Section */}
      <div className="bg-white rounded-xl shadow-sm">
        <div 
          className="p-6 border-b border-gray-100 flex items-center justify-between cursor-pointer"
          onClick={() => setIsDemographicsVisible(!isDemographicsVisible)}
        >
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Audience Demographics</h3>
            <p className="text-sm text-gray-500">Age, gender, and interests distribution</p>
          </div>
          {isDemographicsVisible ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </div>
        <div className={`transition-all duration-300 ${isDemographicsVisible ? 'p-6' : 'h-0 overflow-hidden'}`}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-4">Age & Gender Distribution</h4>
              <DemographicsChart />
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-4">Top Interests</h4>
              <div className="space-y-3">
                {['Technology', 'Fashion', 'Travel', 'Food & Dining', 'Fitness'].map((interest, index) => (
                  <div key={index} className="flex items-center">
                    <div className="flex-1">
                      <div className="flex justify-between mb-1">
                        <span className="text-sm text-gray-600">{interest}</span>
                        <span className="text-sm text-gray-600">{85 - index * 10}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-600 h-2 rounded-full"
                          style={{ width: `${85 - index * 10}%` }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Location Section */}
      <div className="bg-white rounded-xl shadow-sm">
        <div 
          className="p-6 border-b border-gray-100 flex items-center justify-between cursor-pointer"
          onClick={() => setIsLocationVisible(!isLocationVisible)}
        >
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Audience Location</h3>
            <p className="text-sm text-gray-500">Geographic distribution of your followers</p>
          </div>
          {isLocationVisible ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </div>
        <div className={`transition-all duration-300 ${isLocationVisible ? 'p-6' : 'h-0 overflow-hidden'}`}>
          <LocationMap />
          <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
            {['Gauteng', 'Western Cape', 'KwaZulu-Natal', 'Free State'].map((region, index) => (
              <div key={region} className="p-4 bg-gray-50 rounded-lg">
                <h5 className="text-sm font-medium text-gray-700">{region}</h5>
                <p className="text-lg font-semibold text-blue-600">{30 - index * 5}%</p>
                <div className="text-xs text-gray-500 flex items-center mt-1">
                  <TrendingUp size={12} className="mr-1" />
                  +{5 - index}% growth
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Competitor Analysis */}
      <div className="bg-white rounded-xl shadow-sm">
        <div 
          className="p-6 border-b border-gray-100 flex items-center justify-between cursor-pointer"
          onClick={() => setIsCompetitorVisible(!isCompetitorVisible)}
        >
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Competitor Analysis</h3>
            <p className="text-sm text-gray-500">Compare your performance with competitors</p>
          </div>
          {isCompetitorVisible ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </div>
        <div className={`transition-all duration-300 ${isCompetitorVisible ? 'p-6' : 'h-0 overflow-hidden'}`}>
          <CompetitorAnalysis />
        </div>
      </div>
    </div>
  );
}