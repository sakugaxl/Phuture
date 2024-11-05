import React from 'react';
import { Lock } from 'lucide-react';

interface FeatureOverlayProps {
  children: React.ReactNode;
  isLocked?: boolean;
}

export default function FeatureOverlay({ children, isLocked = true }: FeatureOverlayProps) {
  if (!isLocked) {
    return <>{children}</>;
  }

  return (
    <div className="relative">
      <div className="absolute inset-0 bg-gray-200 bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-10 rounded-lg">
        <div className="text-center">
          <Lock className="h-6 w-6 text-gray-500 mx-auto mb-2" />
          <p className="text-sm text-gray-600 font-medium">Verify account to unlock</p>
        </div>
      </div>
      <div className="pointer-events-none opacity-50">
        {children}
      </div>
    </div>
  );
}