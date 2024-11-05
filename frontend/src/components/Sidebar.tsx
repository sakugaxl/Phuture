import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  DollarSign, 
  TrendingUp, 
  Brain, 
  Share2, 
  Users, 
  Settings, 
  Shield,
  Menu,
  X,
  Zap
} from 'lucide-react';

interface SidebarProps {
  onClose: () => void;
}

const menuItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/' },
  { icon: TrendingUp, label: 'Marketing Campaigns', path: '/marketing' },
  { icon: Brain, label: 'AI Insights', path: '/insights' },
  { icon: Share2, label: 'Social Media', path: '/social' },
  { icon: DollarSign, label: 'Financial Overview', path: '/financial' },
  { icon: Users, label: 'Client Portal', path: '/clients' },
  { icon: Settings, label: 'Settings', path: '/settings' },
  { icon: Shield, label: 'Security', path: '/security' }
];

export default function Sidebar({ onClose }: SidebarProps) {
  const [isOpen, setIsOpen] = React.useState(true);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`bg-[#212121] text-white h-full transition-all duration-300 ${isOpen ? 'w-64' : 'w-20'}`}>
      <div className="p-4 flex items-center justify-between">
        {isOpen ? (
          <div className="flex items-center">
            <Zap className="h-6 w-6 text-blue-500" />
            <div className="ml-2">
              <h1 className="font-bold text-lg">PhutureSync</h1>
              <p className="text-xs text-gray-400">Business Analytics</p>
            </div>
          </div>
        ) : (
          <Zap className="h-6 w-6 text-blue-500 mx-auto" />
        )}
        <div className="flex items-center">
          <button 
            onClick={toggleSidebar}
            className="p-2 hover:bg-gray-800 rounded-lg hidden lg:block"
            aria-label={isOpen ? 'Collapse sidebar' : 'Expand sidebar'}
          >
            <Menu size={20} />
          </button>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-800 rounded-lg lg:hidden"
            aria-label="Close sidebar"
          >
            <X size={20} />
          </button>
        </div>
      </div>
      
      <nav className="mt-8">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            onClick={() => onClose()}
            className={({ isActive }) => `
              flex items-center px-4 py-3 text-gray-300 hover:bg-gray-800 hover:text-white transition-colors relative
              ${isActive ? 'bg-gray-800 text-white' : ''}
            `}
            title={item.label}
          >
            <div className={`${!isOpen ? 'mx-auto' : ''}`}>
              <item.icon size={20} />
            </div>
            <span 
              className={`
                ml-4 transition-all duration-200
                ${isOpen ? 'opacity-100 w-auto' : 'opacity-0 w-0 overflow-hidden'}
              `}
            >
              {item.label}
            </span>
            {/* Active indicator */}
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-blue-500 rounded-l-full opacity-0 transition-opacity" />
          </NavLink>
        ))}
      </nav>
    </div>
  );
}