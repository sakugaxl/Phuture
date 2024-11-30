import { Calendar, Clock, Image } from 'lucide-react';

const scheduledPosts = [
  {
    id: 1,
    title: 'Product Launch Announcement',
    platform: 'Instagram',
    scheduledFor: '2024-03-20 10:00 AM',
    type: 'image',
    status: 'scheduled',
  },
  {
    id: 2,
    title: 'Customer Success Story',
    platform: 'LinkedIn',
    scheduledFor: '2024-03-21 2:00 PM',
    type: 'carousel',
    status: 'draft',
  },
  {
    id: 3,
    title: 'Success Story',
    platform: 'TikTok',
    scheduledFor: '2024-03-21 2:00 PM',
    type: 'carousel',
    status: 'draft',
  },
];

const getStatusBadgeClasses = (status: string) => {
  switch (status) {
    case 'scheduled':
      return 'bg-green-100 text-green-700';
    case 'draft':
      return 'bg-gray-100 text-gray-700';
    default:
      return 'bg-gray-100 text-gray-700';
  }
};

const ScheduledPostCard = ({ post }: { post: typeof scheduledPosts[0] }) => (
  <div
    className="p-4 border border-gray-200 rounded-lg hover:border-gray-300 transition-colors"
    aria-label={`Scheduled post: ${post.title}`}
  >
    <div className="flex justify-between items-start mb-3">
      <div>
        <h4 className="font-medium text-gray-900">{post.title}</h4>
        <p className="text-sm text-gray-500">{post.platform}</p>
      </div>
      <span
        className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusBadgeClasses(post.status)}`}
      >
        {post.status}
      </span>
    </div>

    <div className="flex items-center space-x-4 text-sm text-gray-500">
      <div className="flex items-center">
        <Clock size={16} className="mr-1" />
        {post.scheduledFor}
      </div>
      <div className="flex items-center">
        <Image size={16} className="mr-1" />
        {post.type}
      </div>
    </div>

    <div className="mt-3 flex justify-end space-x-2">
      <button
        className="text-sm text-blue-600 hover:text-blue-700"
        aria-label={`Edit post: ${post.title}`}
      >
        Edit
      </button>
      <button
        className="text-sm text-gray-600 hover:text-gray-700"
        aria-label={`Preview post: ${post.title}`}
      >
        Preview
      </button>
    </div>
  </div>
);

export default function ContentCalendar() {
  return (
    <div className="space-y-4">
      {scheduledPosts.map((post) => (
        <ScheduledPostCard key={post.id} post={post} />
      ))}
    </div>
  );
}
