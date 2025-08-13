import React from 'react';
import { MapPin, Clock, Trash2, Recycle, Leaf } from 'lucide-react';

interface WasteBin {
  id: string;
  location: string;
  fillLevel: number;
  status: 'normal' | 'warning' | 'critical';
  lastUpdate: string;
  type: 'general' | 'recycling' | 'organic';
  coordinates: [number, number];
}

interface BinCardProps {
  bin: WasteBin;
}

const BinCard: React.FC<BinCardProps> = ({ bin }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'critical': return 'border-red-200 bg-red-50';
      case 'warning': return 'border-yellow-200 bg-yellow-50';
      default: return 'border-green-200 bg-green-50';
    }
  };

  const getFillColor = (fillLevel: number) => {
    if (fillLevel > 85) return 'bg-red-500';
    if (fillLevel > 70) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'recycling': return <Recycle className="h-4 w-4" />;
      case 'organic': return <Leaf className="h-4 w-4" />;
      default: return <Trash2 className="h-4 w-4" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'recycling': return 'text-blue-600 bg-blue-100';
      case 'organic': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className={`bg-white rounded-lg shadow-sm border-2 p-4 transition-all duration-200 hover:shadow-md ${getStatusColor(bin.status)}`}>
      <div className="flex items-center justify-between mb-3">
        <div className={`px-2 py-1 rounded-full text-xs font-medium flex items-center space-x-1 ${getTypeColor(bin.type)}`}>
          {getTypeIcon(bin.type)}
          <span className="capitalize">{bin.type}</span>
        </div>
        <span className="text-xs font-mono text-gray-500">{bin.id}</span>
      </div>

      <div className="mb-3">
        <h3 className="font-semibold text-gray-900 text-sm mb-1">{bin.location}</h3>
        <div className="flex items-center text-xs text-gray-500">
          <MapPin className="h-3 w-3 mr-1" />
          <span>{bin.coordinates[0].toFixed(4)}, {bin.coordinates[1].toFixed(4)}</span>
        </div>
      </div>

      {/* Fill Level Indicator */}
      <div className="mb-3">
        <div className="flex justify-between items-center mb-1">
          <span className="text-sm font-medium text-gray-700">Fill Level</span>
          <span className="text-sm font-bold">{bin.fillLevel}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className={`h-2 rounded-full transition-all duration-500 ${getFillColor(bin.fillLevel)}`}
            style={{ width: `${bin.fillLevel}%` }}
          ></div>
        </div>
      </div>

      {/* Last Update */}
      <div className="flex items-center text-xs text-gray-500">
        <Clock className="h-3 w-3 mr-1" />
        <span>Updated: {bin.lastUpdate}</span>
      </div>

      {/* Status Badge */}
      <div className="mt-3">
        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
          bin.status === 'critical' ? 'bg-red-100 text-red-800' :
          bin.status === 'warning' ? 'bg-yellow-100 text-yellow-800' :
          'bg-green-100 text-green-800'
        }`}>
          {bin.status === 'critical' ? '🚨 Needs Collection' :
           bin.status === 'warning' ? '⚠️ Monitor' :
           '✅ Normal'}
        </span>
      </div>
    </div>
  );
};

export default BinCard;