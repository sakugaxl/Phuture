import React, { useEffect, useState } from 'react';
import { Facebook, Instagram, Linkedin, Twitter, Database, BarChart, Settings2, CheckCircle2, XCircle } from 'lucide-react';
import { FaTiktok } from 'react-icons/fa';
import axios from 'axios';

const handleInstagramConnect = () => openAuthPopup('https://panel.phuturesync.co.za/auth/instagram');
const handleFacebookConnect = () => openAuthPopup('https://panel.phuturesync.co.za/auth/facebook');
const handleLinkedInConnect = () => openAuthPopup('https://panel.phuturesync.co.za/auth/linkedin');
const handleTwitterConnect = () => openAuthPopup('https://panel.phuturesync.co.za/auth/twitter');
const handleTikTokConnect = () => openAuthPopup('https://panel.phuturesync.co.za/auth/tiktok');

function openAuthPopup(url: string) {
  const popup = window.open(url, '_blank', 'width=600,height=600');
  if (popup) {
    popup.focus();
  }
}

const integrations = [
  {
    category: 'Social Media',
    items: [
      { name: 'Facebook', icon: Facebook, status: 'not-connected', color: 'blue', connect: handleFacebookConnect },
      { name: 'Instagram', icon: Instagram, status: 'not-connected', color: 'blue', connect: handleInstagramConnect },
      { name: 'LinkedIn', icon: Linkedin, status: 'not-connected', color: 'blue', connect: handleLinkedInConnect },
      { name: 'Twitter', icon: Twitter, status: 'not-connected', color: 'blue', connect: handleTwitterConnect },
      { name: 'TikTok', icon: FaTiktok, status: 'not-connected', color: 'blue', connect: handleTikTokConnect }
    ]
  },
  {
    category: 'Analytics & Data',
    items: [
      { name: 'Google Analytics', icon: BarChart, status: 'connected', color: 'yellow' },
      { name: 'Custom Database', icon: Database, status: 'not-connected', color: 'gray' }
    ]
  }
];

const statusColors = {
  connected: 'text-green-600',
  'not-connected': 'text-red-600'
};

export default function IntegrationsSection() {
  const [statuses, setStatuses] = useState({
    facebook: 'not-connected',
    instagram: 'not-connected',
    linkedin: 'not-connected',
    twitter: 'not-connected',
    tiktok: 'not-connected'
  });

  useEffect(() => {
    const checkStatus = async (platform: string) => {
      try {
        const response = await axios.get(`https://panel.phuturesync.co.za/auth/${platform}/status`, {
          params: { userId: 'currentUserId' }
        });
        if (response.data.isConnected) {
          setStatuses((prev) => ({ ...prev, [platform]: 'connected' }));
        }
      } catch (error) {
        console.error(`Error checking ${platform} status:`, error);
      }
    };

    const platforms = ['facebook', 'instagram', 'linkedin', 'twitter', 'tiktok'];
    platforms.forEach(platform => checkStatus(platform));
  }, []);

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="space-y-6">
        {integrations.map((category) => (
          <div key={category.category}>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">{category.category}</h3>
            <div className="grid gap-4">
              {category.items.map((integration) => (
                <div
                  key={integration.name}
                  className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-gray-300 transition-colors"
                >
                  <div className="flex items-center">
                    <integration.icon className={`h-5 w-5 mr-3 text-${integration.color}-500`} />
                    <span className="font-medium text-gray-900">{integration.name}</span>
                  </div>

                  <div className="flex items-center">
                    <span className={`flex items-center mr-4 text-sm ${statusColors[statuses[integration.name.toLowerCase()] || integration.status]}`}>
                      {statuses[integration.name.toLowerCase()] === 'connected' ? (
                        <>
                          <CheckCircle2 className="h-4 w-4 mr-1" />
                          Connected
                        </>
                      ) : (
                        <>
                          <XCircle className="h-4 w-4 mr-1" />
                          Not Connected
                        </>
                      )}
                    </span>

                    {statuses[integration.name.toLowerCase()] !== 'connected' && (
                      <button
                        onClick={integration.connect}
                        className={`bg-${integration.color}-500 text-white px-4 py-2 rounded-lg hover:bg-${integration.color}-600 transition-colors`}
                      >
                        Connect
                      </button>
                    )}

                    <button className="p-2 hover:bg-gray-100 rounded-lg">
                      <Settings2 className="h-5 w-5 text-gray-500" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
