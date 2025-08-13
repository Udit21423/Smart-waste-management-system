import React, { useState, useEffect } from 'react';
import { MapPin, Navigation, Filter, RefreshCw } from 'lucide-react';

interface WasteBin {
  id: string;
  location: string;
  fillLevel: number;
  status: 'normal' | 'warning' | 'critical';
  lastUpdate: string;
  type: 'general' | 'recycling' | 'organic';
  coordinates: [number, number];
}

const MapView: React.FC = () => {
  const [bins, setBins] = useState<WasteBin[]>([]);
  const [selectedBin, setSelectedBin] = useState<WasteBin | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>('all');

  useEffect(() => {
    // Generate sample bins
    const locations = [
      'Main Street & 1st Ave', 'Central Park East', 'Shopping Mall North',
      'University Campus', 'Residential Area A', 'Industrial Zone',
      'Bus Station', 'City Center', 'Market Square', 'Sports Complex'
    ];
    
    const types: ('general' | 'recycling' | 'organic')[] = ['general', 'recycling', 'organic'];
    
    const generatedBins = locations.map((location, index) => ({
      id: `BIN-${String(index + 1).padStart(3, '0')}`,
      location,
      fillLevel: Math.floor(Math.random() * 100),
      status: Math.random() > 0.7 ? (Math.random() > 0.5 ? 'warning' : 'critical') : 'normal' as const,
      lastUpdate: new Date(Date.now() - Math.random() * 3600000).toLocaleTimeString(),
      type: types[Math.floor(Math.random() * types.length)],
      coordinates: [40.7128 + (Math.random() - 0.5) * 0.1, -74.0060 + (Math.random() - 0.5) * 0.1] as [number, number]
    }));

    setBins(generatedBins);
  }, []);

  const filteredBins = filterStatus === 'all' ? bins : bins.filter(bin => bin.status === filterStatus);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'critical': return '#EF4444';
      case 'warning': return '#F59E0B';
      default: return '#10B981';
    }
  };

  const getStatusDot = (status: string) => {
    const color = getStatusColor(status);
    return (
      <div 
        className="w-4 h-4 rounded-full border-2 border-white shadow-md"
        style={{ backgroundColor: color }}
      ></div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Waste Bin Locations</h2>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Filter className="h-4 w-4 text-gray-500" />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="all">All Status</option>
              <option value="critical">Critical</option>
              <option value="warning">Warning</option>
              <option value="normal">Normal</option>
            </select>
          </div>
          <button className="flex items-center space-x-2 px-3 py-1 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors">
            <RefreshCw className="h-4 w-4" />
            <span>Refresh</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Map Placeholder */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-sm border p-6 h-96">
            <div className="relative w-full h-full bg-gradient-to-br from-green-50 to-blue-50 rounded-lg overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 font-medium">Interactive Map View</p>
                  <p className="text-sm text-gray-500 mt-2">
                    Real-time waste bin locations and status
                  </p>
                </div>
              </div>
              
              {/* Simulated Map Pins */}
              {filteredBins.map((bin, index) => (
                <div
                  key={bin.id}
                  className="absolute cursor-pointer transition-transform hover:scale-110"
                  style={{
                    left: `${20 + (index % 4) * 20}%`,
                    top: `${20 + Math.floor(index / 4) * 25}%`,
                  }}
                  onClick={() => setSelectedBin(bin)}
                >
                  <div className="relative">
                    {getStatusDot(bin.status)}
                    <div className="absolute -top-1 -left-1 w-6 h-6 rounded-full animate-ping opacity-20"
                         style={{ backgroundColor: getStatusColor(bin.status) }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bin Details */}
        <div className="space-y-4">
          {selectedBin ? (
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Selected Bin Details</h3>
              
              <div className="space-y-3">
                <div>
                  <label className="text-sm font-medium text-gray-600">Bin ID</label>
                  <p className="text-lg font-mono">{selectedBin.id}</p>
                </div>
                
                <div>
                  <label className="text-sm font-medium text-gray-600">Location</label>
                  <p className="text-gray-900">{selectedBin.location}</p>
                </div>
                
                <div>
                  <label className="text-sm font-medium text-gray-600">Fill Level</label>
                  <div className="flex items-center space-x-3 mt-1">
                    <div className="flex-1 bg-gray-200 rounded-full h-3">
                      <div
                        className="h-3 rounded-full transition-all duration-500"
                        style={{ 
                          width: `${selectedBin.fillLevel}%`,
                          backgroundColor: getStatusColor(selectedBin.status)
                        }}
                      ></div>
                    </div>
                    <span className="text-lg font-bold">{selectedBin.fillLevel}%</span>
                  </div>
                </div>
                
                <div>
                  <label className="text-sm font-medium text-gray-600">Status</label>
                  <div className="flex items-center space-x-2 mt-1">
                    {getStatusDot(selectedBin.status)}
                    <span className="capitalize font-medium">{selectedBin.status}</span>
                  </div>
                </div>
                
                <div>
                  <label className="text-sm font-medium text-gray-600">Type</label>
                  <p className="capitalize text-gray-900">{selectedBin.type}</p>
                </div>
                
                <div>
                  <label className="text-sm font-medium text-gray-600">Coordinates</label>
                  <p className="font-mono text-sm text-gray-700">
                    {selectedBin.coordinates[0].toFixed(6)}, {selectedBin.coordinates[1].toFixed(6)}
                  </p>
                </div>
                
                <div>
                  <label className="text-sm font-medium text-gray-600">Last Update</label>
                  <p className="text-gray-900">{selectedBin.lastUpdate}</p>
                </div>
              </div>
              
              <div className="mt-6 flex space-x-2">
                <button className="flex-1 bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition-colors text-sm font-medium">
                  Schedule Collection
                </button>
                <button className="flex-1 border border-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-50 transition-colors text-sm font-medium">
                  <Navigation className="h-4 w-4 inline mr-1" />
                  Navigate
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <div className="text-center py-8">
                <MapPin className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">Click on a bin marker to view details</p>
              </div>
            </div>
          )}
          
          {/* Status Legend */}
          <div className="bg-white rounded-lg shadow-sm border p-4">
            <h4 className="font-medium text-gray-900 mb-3">Status Legend</h4>
            <div className="space-y-2">
              <div className="flex items-center space-x-3">
                {getStatusDot('normal')}
                <span className="text-sm text-gray-700">Normal (0-70%)</span>
              </div>
              <div className="flex items-center space-x-3">
                {getStatusDot('warning')}
                <span className="text-sm text-gray-700">Warning (70-85%)</span>
              </div>
              <div className="flex items-center space-x-3">
                {getStatusDot('critical')}
                <span className="text-sm text-gray-700">Critical (85%+)</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapView;