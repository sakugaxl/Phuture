import React, { useEffect, useState } from 'react';
import { Play, Pause } from 'lucide-react'; // Removed unused imports like BarChart3, Settings, Facebook, Instagram, Linkedin
import { FaTiktok } from 'react-icons/fa';
import { api } from '../../services/api';
import LoadingSpinner from '../LoadingSpinner';

interface Campaign {
  id: number;
  name: string;
  platform: string;
  status: string;
  reach: string;
  engagement: string;
  conversions: number;
  spend: string;
  roi: string;
}

const platformIcons: Record<string, React.ElementType> = {
  facebook: () => <div className="text-blue-500">FB</div>, // Placeholder for Facebook icon if unused
  instagram: () => <div className="text-pink-500">IG</div>, // Placeholder for Instagram icon if unused
  linkedin: () => <div className="text-blue-700">LI</div>, // Placeholder for LinkedIn icon if unused
  tiktok: FaTiktok,
};

const platformColors: Record<string, string> = {
  facebook: 'border-blue-500',
  instagram: 'border-purple-500',
  linkedin: 'border-blue-700',
  tiktok: 'border-blue-700',
};

export default function ActiveCampaigns() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        setLoading(true);
        const data = await api.getCampaigns();
        setCampaigns(data);
        setError(null);
      } catch (err) {
        console.error('Error fetching campaigns:', err);
        setError('Unable to load campaigns. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchCampaigns();
  }, []);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-red-600 mb-4">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Retry
        </button>
      </div>
    );
  }

  if (!campaigns.length) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-600 mb-4">No active campaigns found</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {campaigns.map((campaign) => {
        const Icon = platformIcons[campaign.platform];
        return (
          <div
            key={campaign.id}
            className={`bg-white rounded-lg border-l-4 ${platformColors[campaign.platform] || 'border-gray-300'} p-4`}
          >
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center">
                {Icon && <Icon className="h-5 w-5 text-gray-500 mr-2" />}
                <div>
                  <h4 className="font-medium text-gray-900">{campaign.name}</h4>
                  <p className="text-sm text-gray-500 capitalize">{campaign.platform}</p>
                </div>
              </div>
              <button
                className={`p-2 rounded-full ${
                  campaign.status === 'active' ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-600'
                }`}
              >
                {campaign.status === 'active' ? <Pause size={16} /> : <Play size={16} />}
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
