import React from 'react';
import { MapPin } from 'lucide-react';

export default function LocationMap() {
  return (
    <div className="bg-gray-100 rounded-lg p-6 flex items-center justify-center h-[300px]">
      <div className="text-center text-gray-500">
        <MapPin size={32} className="mx-auto mb-2" />
        <p>Interactive map visualization will be displayed here</p>
      </div>
    </div>
  );
}