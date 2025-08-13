import React, { useState, useEffect } from 'react';
import { TrendingUp, Calendar, BarChart3, PieChart, Download } from 'lucide-react';
import Chart from './Chart';

const Analytics: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('week');
  const [chartData, setChartData] = useState<any>({});

  useEffect(() => {
    // Generate sample data
    const generateData = () => {
      const periods = {
        week: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        month: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
        year: ['Q1', 'Q2', 'Q3', 'Q4']
      };

      const labels = periods[selectedPeriod as keyof typeof periods];
      
      return {
        fillLevels: {
          labels,
          datasets: [{
            label: 'Average Fill Level (%)',
            data: labels.map(() => Math.floor(Math.random() * 40) + 30),
            borderColor: '#10B981',
            backgroundColor: 'rgba(16, 185, 129, 0.1)',
            tension: 0.4
          }]
        },
        collections: {
          labels,
          datasets: [{
            label: 'Collections',
            data: labels.map(() => Math.floor(Math.random() * 20) + 10),
            backgroundColor: '#3B82F6'
          }]
        },
        wasteTypes: {
          labels: ['General Waste', 'Recycling', 'Organic'],
          datasets: [{
            data: [45, 30, 25],
            backgroundColor: ['#6B7280', '#3B82F6', '#10B981']
          }]
        },
        efficiency: {
          labels,
          datasets: [
            {
              label: 'Scheduled Collections',
              data: labels.map(() => Math.floor(Math.random() * 15) + 20),
              backgroundColor: '#10B981'
            },
            {
              label: 'Emergency Collections',
              data: labels.map(() => Math.floor(Math.random() * 5) + 1),
              backgroundColor: '#EF4444'
            }
          ]
        }
      };
    };

    setChartData(generateData());
  }, [selectedPeriod]);

  const stats = [
    { label: 'Total Collections This Month', value: '234', change: '+12%' },
    { label: 'Average Fill Level', value: '68%', change: '+5%' },
    { label: 'Collection Efficiency', value: '94%', change: '+2%' },
    { label: 'Cost Savings', value: '$1,240', change: '+18%' }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Analytics & Reports</h2>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Calendar className="h-4 w-4 text-gray-500" />
            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="week">This Week</option>
              <option value="month">This Month</option>
              <option value="year">This Year</option>
            </select>
          </div>
          <button className="flex items-center space-x-2 px-3 py-1 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors">
            <Download className="h-4 w-4" />
            <span>Export</span>
          </button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">{stat.label}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                <p className="text-xs text-green-600 font-medium mt-1">{stat.change} from last period</p>
              </div>
              <div className="p-3 rounded-full bg-green-100">
                <TrendingUp className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Fill Level Trends */}
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex items-center space-x-2 mb-4">
            <BarChart3 className="h-5 w-5 text-gray-600" />
            <h3 className="font-semibold text-gray-900">Fill Level Trends</h3>
          </div>
          {chartData.fillLevels && <Chart type="line" data={chartData.fillLevels} />}
        </div>

        {/* Collection Volume */}
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex items-center space-x-2 mb-4">
            <BarChart3 className="h-5 w-5 text-gray-600" />
            <h3 className="font-semibold text-gray-900">Collection Volume</h3>
          </div>
          {chartData.collections && <Chart type="bar" data={chartData.collections} />}
        </div>

        {/* Waste Type Distribution */}
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex items-center space-x-2 mb-4">
            <PieChart className="h-5 w-5 text-gray-600" />
            <h3 className="font-semibold text-gray-900">Waste Type Distribution</h3>
          </div>
          {chartData.wasteTypes && <Chart type="doughnut" data={chartData.wasteTypes} />}
        </div>

        {/* Collection Efficiency */}
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex items-center space-x-2 mb-4">
            <BarChart3 className="h-5 w-5 text-gray-600" />
            <h3 className="font-semibold text-gray-900">Collection Efficiency</h3>
          </div>
          {chartData.efficiency && <Chart type="bar" data={chartData.efficiency} />}
        </div>
      </div>

      {/* Insights */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h3 className="font-semibold text-gray-900 mb-4">Key Insights</h3>
          <div className="space-y-3">
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
              <p className="text-sm text-gray-700">
                Collection efficiency improved by 12% this month due to optimized routes.
              </p>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
              <p className="text-sm text-gray-700">
                Recycling bins show 15% higher fill rates in commercial areas.
              </p>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2 flex-shrink-0"></div>
              <p className="text-sm text-gray-700">
                Emergency collections reduced by 30% with predictive monitoring.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h3 className="font-semibold text-gray-900 mb-4">Recommendations</h3>
          <div className="space-y-3">
            <div className="p-3 bg-green-50 rounded-lg">
              <p className="text-sm font-medium text-green-800">Optimize Route A</p>
              <p className="text-xs text-green-700 mt-1">
                Potential 20% time savings by adjusting collection sequence.
              </p>
            </div>
            <div className="p-3 bg-blue-50 rounded-lg">
              <p className="text-sm font-medium text-blue-800">Add Recycling Bin</p>
              <p className="text-xs text-blue-700 mt-1">
                High demand area identified at University Campus.
              </p>
            </div>
            <div className="p-3 bg-yellow-50 rounded-lg">
              <p className="text-sm font-medium text-yellow-800">Maintenance Alert</p>
              <p className="text-xs text-yellow-700 mt-1">
                BIN-005 sensor needs calibration - last reading 3 days ago.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;