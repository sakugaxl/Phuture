import React from 'react';
import { MessageSquare, ThumbsUp, Share } from 'lucide-react';
import { FaInstagram, FaFacebook, FaTiktok } from 'react-icons/fa';

const interactions = [
  {
    id: 1,
    type: 'comment',
    platform: 'Instagram',
    user: 'Sarah M.',
    content: 'Love your products! When will you restock?',
    time: '5m ago',
  },
  {
    id: 2,
    type: 'like',
    platform: 'Facebook',
    user: 'John D.',
    content: 'Liked your post about sustainable packaging',
    time: '15m ago',
  },
  {
    id: 3,
    type: 'share',
    platform: 'TikTok',
    user: 'Anna D.',
    content: 'Shared your video about eco-friendly practices',
    time: '20m ago',
  },
];

// Platform-specific icons
const platformIcons = {
  Instagram: FaInstagram,
  Facebook: FaFacebook,
  TikTok: FaTiktok,
};

export default function EngagementHub() {
  return (
    <div className="space-y-4">
      {interactions.map((interaction) => {
        const PlatformIcon = platformIcons[interaction.platform];
        const InteractionIcon =
          interaction.type === 'comment'
            ? MessageSquare
            : interaction.type === 'like'
            ? ThumbsUp
            : Share;

        return (
          <div
            key={interaction.id}
            className="p-4 border border-gray-200 rounded-lg hover:border-gray-300 transition-colors"
          >
            <div className="flex items-start">
              {/* Interaction Icon */}
              <div
                className={`p-2 rounded-lg ${
                  interaction.type === 'comment'
                    ? 'bg-blue-50'
                    : interaction.type === 'like'
                    ? 'bg-pink-50'
                    : 'bg-green-50'
                }`}
              >
                <InteractionIcon
                  size={16}
                  className={`${
                    interaction.type === 'comment'
                      ? 'text-blue-500'
                      : interaction.type === 'like'
                      ? 'text-pink-500'
                      : 'text-green-500'
                  }`}
                />
              </div>

              {/* Content */}
              <div className="ml-3 flex-1">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-medium text-gray-900">{interaction.user}</p>
                    <div className="flex items-center space-x-1 text-sm text-gray-500">
                      {PlatformIcon && <PlatformIcon size={12} />}
                      <span>{interaction.platform}</span>
                    </div>
                  </div>
                  <span className="text-xs text-gray-400">{interaction.time}</span>
                </div>
                <p className="mt-1 text-gray-600">{interaction.content}</p>

                {interaction.type === 'comment' && (
                  <div className="mt-2">
                    <button className="text-sm text-blue-600 hover:text-blue-700">
                      Reply
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
