import React from 'react';

interface ChartProps {
  type: 'line' | 'bar' | 'doughnut';
  data: any;
}

const Chart: React.FC<ChartProps> = ({ type, data }) => {
  // Simple chart visualization using CSS
  const renderLineChart = () => {
    const maxValue = Math.max(...data.datasets[0].data);
    
    return (
      <div className="relative h-64 flex items-end space-x-2 p-4">
        {data.labels.map((label: string, index: number) => {
          const value = data.datasets[0].data[index];
          const height = (value / maxValue) * 100;
          
          return (
            <div key={index} className="flex-1 flex flex-col items-center">
              <div className="relative w-full h-48 flex items-end">
                <div 
                  className="w-full bg-green-500 rounded-t transition-all duration-500"
                  style={{ height: `${height}%` }}
                ></div>
              </div>
              <div className="text-xs text-gray-600 mt-2 text-center">{label}</div>
              <div className="text-xs font-semibold text-gray-800">{value}</div>
            </div>
          );
        })}
      </div>
    );
  };

  const renderBarChart = () => {
    const maxValue = Math.max(
      ...(data.datasets.length > 1 
        ? data.datasets.flatMap((dataset: any) => dataset.data)
        : data.datasets[0].data)
    );
    
    return (
      <div className="relative h-64 flex items-end space-x-2 p-4">
        {data.labels.map((label: string, index: number) => (
          <div key={index} className="flex-1 flex flex-col items-center">
            <div className="relative w-full h-48 flex items-end space-x-1">
              {data.datasets.map((dataset: any, datasetIndex: number) => {
                const value = dataset.data[index];
                const height = (value / maxValue) * 100;
                
                return (
                  <div 
                    key={datasetIndex}
                    className="flex-1 rounded-t transition-all duration-500"
                    style={{ 
                      height: `${height}%`,
                      backgroundColor: dataset.backgroundColor || '#10B981'
                    }}
                  ></div>
                );
              })}
            </div>
            <div className="text-xs text-gray-600 mt-2 text-center">{label}</div>
          </div>
        ))}
      </div>
    );
  };

  const renderDoughnutChart = () => {
    const total = data.datasets[0].data.reduce((sum: number, value: number) => sum + value, 0);
    let cumulativePercentage = 0;
    
    return (
      <div className="flex items-center justify-center h-64">
        <div className="relative w-48 h-48">
          <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90">
            <circle
              cx="50"
              cy="50"
              r="40"
              fill="none"
              stroke="#f3f4f6"
              strokeWidth="10"
            />
            {data.datasets[0].data.map((value: number, index: number) => {
              const percentage = (value / total) * 100;
              const strokeDasharray = `${percentage} ${100 - percentage}`;
              const strokeDashoffset = -cumulativePercentage;
              const color = data.datasets[0].backgroundColor[index];
              
              cumulativePercentage += percentage;
              
              return (
                <circle
                  key={index}
                  cx="50"
                  cy="50"
                  r="40"
                  fill="none"
                  stroke={color}
                  strokeWidth="10"
                  strokeDasharray={strokeDasharray}
                  strokeDashoffset={strokeDashoffset}
                  className="transition-all duration-500"
                />
              );
            })}
          </svg>
        </div>
        <div className="ml-6 space-y-2">
          {data.labels.map((label: string, index: number) => (
            <div key={index} className="flex items-center space-x-3">
              <div 
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: data.datasets[0].backgroundColor[index] }}
              ></div>
              <span className="text-sm text-gray-700">{label}</span>
              <span className="text-sm font-semibold text-gray-900">
                {data.datasets[0].data[index]}%
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderChart = () => {
    switch (type) {
      case 'line':
        return renderLineChart();
      case 'bar':
        return renderBarChart();
      case 'doughnut':
        return renderDoughnutChart();
      default:
        return renderBarChart();
    }
  };

  return (
    <div className="bg-gray-50 rounded-lg">
      {renderChart()}
    </div>
  );
};

export default Chart;