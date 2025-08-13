import React, { useState, useEffect } from 'react';
import { AlertTriangle, CheckCircle, Clock, Trash2, TrendingUp, MapPin } from 'lucide-react';
import BinCard from './BinCard';
import StatsCard from './StatsCard';

interface WasteBin {
  id: string;
  location: string;
  fillLevel: number;
  status: 'normal' | 'warning' | 'critical';
  lastUpdate: string;
  type: 'general' | 'recycling' | 'organic';
  coordinates: [number, number];
}

const Dashboard: React.FC = () => {
  const [bins, setBins] = useState<WasteBin[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate IoT data
    const generateBins = () => {
      const locations = [
        'Main Street & 1st Ave', 'Central Park East', 'Shopping Mall North',
        'University Campus', 'Residential Area A', 'Industrial Zone',
        'Bus Station', 'City Center', 'Market Square', 'Sports Complex'
      ];
      
      const types: ('general' | 'recycling' | 'organic')[] = ['general', 'recycling', 'organic'];
      
      return locations.map((location, index) => ({
        id: `BIN-${String(index + 1).padStart(3, '0')}`,
        location,
        fillLevel: Math.floor(Math.random() * 100),
        status: Math.random() > 0.7 ? (Math.random() > 0.5 ? 'warning' : 'critical') : 'normal' as const,
        lastUpdate: new Date(Date.now() - Math.random() * 3600000).toLocaleTimeString(),
        type: types[Math.floor(Math.random() * types.length)],
        coordinates: [40.7128 + (Math.random() - 0.5) * 0.1, -74.0060 + (Math.random() - 0.5) * 0.1] as [number, number]
      }));
    };

    const initialBins = generateBins();
    setBins(initialBins);
    setLoading(false);

    // Simulate real-time updates
    const interval = setInterval(() => {
      setBins(currentBins => 
        currentBins.map(bin => {
          const newFillLevel = Math.max(0, Math.min(100, bin.fillLevel + (Math.random() - 0.7) * 5));
          let newStatus: 'normal' | 'warning' | 'critical' = 'normal';
          
          if (newFillLevel > 85) newStatus = 'critical';
          else if (newFillLevel > 70) newStatus = 'warning';
          
          return {
            ...bin,
            fillLevel: Math.round(newFillLevel),
            status: newStatus,
            lastUpdate: new Date().toLocaleTimeString()
          };
        })
      );
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const criticalBins = bins.filter(bin => bin.status === 'critical').length;
  const warningBins = bins.filter(bin => bin.status === 'warning').length;
  const normalBins = bins.filter(bin => bin.status === 'normal').length;
  const averageFill = Math.round(bins.reduce((sum, bin) => sum + bin.fillLevel, 0) / bins.length) || 0;

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Waste Management Dashboard</h2>
        <div className="flex items-center space-x-2 text-sm text-gray-500">
          <Clock className="h-4 w-4" />
          <span>Last updated: {new Date().toLocaleTimeString()}</span>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Critical Alerts"
          value={criticalBins}
          icon={AlertTriangle}
          color="red"
          change="+2 from yesterday"
        />
        <StatsCard
          title="Warning Status"
          value={warningBins}
          icon={Clock}
          color="yellow"
          change="+1 from yesterday"
        />
        <StatsCard
          title="Normal Status"
          value={normalBins}
          icon={CheckCircle}
          color="green"
          change="Stable"
        />
        <StatsCard
          title="Average Fill Level"
          value={`${averageFill}%`}
          icon={TrendingUp}
          color="blue"
          change="+5% from yesterday"
        />
      </div>

      {/* Critical Alerts */}
      {criticalBins > 0 && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-3">
            <AlertTriangle className="h-5 w-5 text-red-600" />
            <h3 className="font-semibold text-red-800">Urgent Collection Required</h3>
          </div>
          <div className="space-y-2">
            {bins.filter(bin => bin.status === 'critical').map(bin => (
              <div key={bin.id} className="flex items-center justify-between bg-white p-3 rounded border">
                <div>
                  <span className="font-medium text-gray-900">{bin.location}</span>
                  <span className="text-sm text-gray-500 ml-2">({bin.id})</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-semibold text-red-600">{bin.fillLevel}% full</span>
                  <MapPin className="h-4 w-4 text-gray-400" />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Bins Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {bins.map(bin => (
          <BinCard key={bin.id} bin={bin} />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;