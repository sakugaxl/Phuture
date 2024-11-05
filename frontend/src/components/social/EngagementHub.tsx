import React from 'react';
import { MessageSquare, ThumbsUp, Share } from 'lucide-react';

const interactions = [
  {
    id: 1,
    type: 'comment',
    platform: 'Instagram',
    user: 'Sarah M.',
    content: 'Love your products! When will you restock?',
    time: '5m ago'
  },
  {
    id: 2,
    type: 'like',
    platform: 'Facebook',
    user: 'John D.',
    content: 'Liked your post about sustainable packaging',
    time: '15m ago'
  },
  {
    id: 3,
    type: 'like',
    platform: 'TikTok',
    user: 'Anna D.',
    content: 'Liked your post about sustainable packaging',
    time: '15m ago'
  }
];

export default function EngagementHub() {
  return (
    <div className="space-y-4">
      {interactions.map((interaction) => (
        <div 
          key={interaction.id}
          className="p-4 border border-gray-200 rounded-lg hover:border-gray-300 transition-colors"
        >
          <div className="flex items-start">
            <div className={`p-2 rounded-lg ${
              interaction.type === 'comment' ? 'bg-blue-50' : 'bg-pink-50'
            }`}>
              {interaction.type === 'comment' ? (
                <MessageSquare size={16} className="text-blue-500" />
              ) : (
                <ThumbsUp size={16} className="text-pink-500" />
              )}
            </div>
            
            <div className="ml-3 flex-1">
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-medium text-gray-900">{interaction.user}</p>
                  <p className="text-sm text-gray-500">{interaction.platform}</p>
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
      ))}
    </div>
  );
}