import React, { useState, useEffect } from 'react';
import { Calendar, Clock, Route, Truck, MapPin, Plus, Filter } from 'lucide-react';

interface CollectionRoute {
  id: string;
  name: string;
  status: 'scheduled' | 'in-progress' | 'completed' | 'delayed';
  startTime: string;
  estimatedDuration: string;
  binsCount: number;
  driver: string;
  vehicle: string;
  progress: number;
}

const Collections: React.FC = () => {
  const [routes, setRoutes] = useState<CollectionRoute[]>([]);
  const [filterStatus, setFilterStatus] = useState('all');
  const [showScheduleModal, setShowScheduleModal] = useState(false);

  useEffect(() => {
    // Generate sample collection routes
    const sampleRoutes: CollectionRoute[] = [
      {
        id: 'RT-001',
        name: 'Downtown Circuit',
        status: 'in-progress',
        startTime: '08:00',
        estimatedDuration: '3.5 hours',
        binsCount: 24,
        driver: 'John Smith',
        vehicle: 'WM-101',
        progress: 65
      },
      {
        id: 'RT-002',
        name: 'Residential Area A',
        status: 'scheduled',
        startTime: '10:30',
        estimatedDuration: '2.8 hours',
        binsCount: 18,
        driver: 'Mike Johnson',
        vehicle: 'WM-102',
        progress: 0
      },
      {
        id: 'RT-003',
        name: 'Industrial Zone',
        status: 'completed',
        startTime: '06:00',
        estimatedDuration: '4.2 hours',
        binsCount: 32,
        driver: 'Sarah Davis',
        vehicle: 'WM-103',
        progress: 100
      },
      {
        id: 'RT-004',
        name: 'University Campus',
        status: 'delayed',
        startTime: '14:00',
        estimatedDuration: '1.5 hours',
        binsCount: 12,
        driver: 'Tom Wilson',
        vehicle: 'WM-104',
        progress: 25
      }
    ];

    setRoutes(sampleRoutes);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800 border-green-200';
      case 'in-progress': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'delayed': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return '✅';
      case 'in-progress': return '🚛';
      case 'delayed': return '⚠️';
      default: return '📅';
    }
  };

  const filteredRoutes = filterStatus === 'all' ? routes : routes.filter(route => route.status === filterStatus);

  const stats = {
    total: routes.length,
    completed: routes.filter(r => r.status === 'completed').length,
    inProgress: routes.filter(r => r.status === 'in-progress').length,
    scheduled: routes.filter(r => r.status === 'scheduled').length
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Collection Management</h2>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Filter className="h-4 w-4 text-gray-500" />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="all">All Routes</option>
              <option value="scheduled">Scheduled</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
              <option value="delayed">Delayed</option>
            </select>
          </div>
          <button 
            onClick={() => setShowScheduleModal(true)}
            className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
          >
            <Plus className="h-4 w-4" />
            <span>Schedule Route</span>
          </button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Routes</p>
              <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
            </div>
            <Route className="h-8 w-8 text-gray-400" />
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">In Progress</p>
              <p className="text-2xl font-bold text-blue-600">{stats.inProgress}</p>
            </div>
            <Truck className="h-8 w-8 text-blue-400" />
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Completed</p>
              <p className="text-2xl font-bold text-green-600">{stats.completed}</p>
            </div>
            <Calendar className="h-8 w-8 text-green-400" />
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Scheduled</p>
              <p className="text-2xl font-bold text-yellow-600">{stats.scheduled}</p>
            </div>
            <Clock className="h-8 w-8 text-yellow-400" />
          </div>
        </div>
      </div>

      {/* Routes List */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="px-6 py-4 border-b">
          <h3 className="font-semibold text-gray-900">Collection Routes</h3>
        </div>
        
        <div className="divide-y">
          {filteredRoutes.map(route => (
            <div key={route.id} className="p-6 hover:bg-gray-50 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h4 className="font-semibold text-gray-900">{route.name}</h4>
                    <span className="text-sm font-mono text-gray-500">({route.id})</span>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(route.status)}`}>
                      {getStatusIcon(route.status)} {route.status.replace('-', ' ')}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm text-gray-600">
                    <div className="flex items-center space-x-2">
                      <Clock className="h-4 w-4" />
                      <span>Start: {route.startTime}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Route className="h-4 w-4" />
                      <span>Duration: {route.estimatedDuration}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <MapPin className="h-4 w-4" />
                      <span>Bins: {route.binsCount}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Truck className="h-4 w-4" />
                      <span>{route.driver} ({route.vehicle})</span>
                    </div>
                  </div>
                  
                  {route.status === 'in-progress' && (
                    <div className="mt-3">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-medium text-gray-700">Progress</span>
                        <span className="text-sm font-medium text-gray-900">{route.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-500 h-2 rounded-full transition-all duration-500"
                          style={{ width: `${route.progress}%` }}
                        ></div>
                      </div>
                    </div>
                  )}
                </div>
                
                <div className="ml-6 flex space-x-2">
                  <button className="px-3 py-1 text-sm border border-gray-300 rounded-md hover:bg-gray-50 transition-colors">
                    View Details
                  </button>
                  {route.status === 'scheduled' && (
                    <button className="px-3 py-1 text-sm bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors">
                      Start Route
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Schedule Modal (placeholder) */}
      {showScheduleModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full m-4">
            <div className="px-6 py-4 border-b">
              <h3 className="font-semibold text-gray-900">Schedule New Collection Route</h3>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Route Name</label>
                  <input type="text" className="w-full border border-gray-300 rounded-md px-3 py-2" placeholder="Enter route name" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Start Time</label>
                  <input type="time" className="w-full border border-gray-300 rounded-md px-3 py-2" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Driver</label>
                  <select className="w-full border border-gray-300 rounded-md px-3 py-2">
                    <option>Select driver</option>
                    <option>John Smith</option>
                    <option>Mike Johnson</option>
                    <option>Sarah Davis</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Vehicle</label>
                  <select className="w-full border border-gray-300 rounded-md px-3 py-2">
                    <option>Select vehicle</option>
                    <option>WM-101</option>
                    <option>WM-102</option>
                    <option>WM-103</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="px-6 py-4 border-t flex justify-end space-x-3">
              <button 
                onClick={() => setShowScheduleModal(false)}
                className="px-4 py-2 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={() => setShowScheduleModal(false)}
                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
              >
                Schedule Route
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Collections;