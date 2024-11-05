import React from 'react';
import { Facebook, Instagram, Linkedin, Twitter, TikTok } from 'lucide-react';
import { FaTiktok } from 'react-icons/fa';


const socialPlatforms = [
  { name: 'Facebook', icon: Facebook, color: 'bg-blue-600' },
  { name: 'Instagram', icon: Instagram, color: 'bg-pink-600' },
  { name: 'LinkedIn', icon: Linkedin, color: 'bg-blue-700' },
  { name: 'Twitter', icon: Twitter, color: 'bg-blue-400' }
  { name: 'TikTok', icon: FaTiktok, color: 'bg-blue-400' }
];

export default function SocialLoginPanel() {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Connect Social Media</h3>
      <div className="grid grid-cols-2 gap-4">
        {socialPlatforms.map((platform) => (
          <button
            key={platform.name}
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