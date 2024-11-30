// SocialLoginPanel.tsx

import React from 'react';
import { Facebook, Instagram, Linkedin, Twitter } from 'lucide-react';
import { FaTiktok } from 'react-icons/fa';

interface SocialPlatform {
  name: string;
  icon: React.ElementType;
  color: string;
  onConnect: () => void;
}

interface SocialLoginPanelProps {
  platforms?: SocialPlatform[];
}

const defaultPlatforms: SocialPlatform[] = [
  { 
    name: 'Facebook', 
    icon: Facebook, 
    color: 'bg-blue-600', 
    onConnect: () => alert('Connecting to Facebook...') 
  },
  { 
    name: 'Instagram', 
    icon: Instagram, 
    color: 'bg-pink-600', 
    onConnect: () => alert('Connecting to Instagram...') 
  },
  { 
    name: 'LinkedIn', 
    icon: Linkedin, 
    color: 'bg-blue-700', 
    onConnect: () => alert('Connecting to LinkedIn...') 
  },
  { 
    name: 'Twitter', 
    icon: Twitter, 
    color: 'bg-blue-400', 
    onConnect: () => alert('Connecting to Twitter...') 
  },
  { 
    name: 'TikTok', 
    icon: FaTiktok, 
    color: 'bg-blue-400', 
    onConnect: () => alert('Connecting to TikTok...') 
  }
];

export default function SocialLoginPanel({ platforms = defaultPlatforms }: SocialLoginPanelProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Connect Social Media</h3>
      <div className="grid grid-cols-2 gap-4">
        {platforms.map((platform) => (
          <button
            key={platform.name}
            onClick={platform.onConnect}
            className={`${platform.color} text-white p-3 rounded-lg flex items-center justify-center hover:opacity-90 transition-opacity`}
          >
            <platform.icon size={20} className="mr-2" />
            <span>Connect {platform.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
