import React from 'react';
import { MapPin } from 'lucide-react';

interface LocationMapProps {
  loading?: boolean;
  error?: string;
}

export default function LocationMap({ loading = false, error }: LocationMapProps) {
  return (
    <div className="bg-gray-100 rounded-lg p-6 flex items-center justify-center h-[300px]">
      {loading ? (
        <div className="text-center text-gray-500 animate-pulse">
          <MapPin size={32} className="mx-auto mb-2 text-gray-400" />
          <p>Loading map...</p>
        </div>
      ) : error ? (
        <div className="text-center text-gray-500">
          <MapPin size={32} className="mx-auto mb-2 text-red-400" />
          <p>{error}</p>
        </div>
      ) : (
        <div className="text-center text-gray-500">
          <MapPin size={32} className="mx-auto mb-2" />
          <p>Interactive map visualization will be displayed here</p>
        </div>
      )}
    </div>
  );
}
