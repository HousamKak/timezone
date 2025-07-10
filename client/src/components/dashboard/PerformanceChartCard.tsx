import { useState } from 'react';
import { Card } from 'primereact/card';
import { Chart } from 'primereact/chart';
import { Button } from 'primereact/button';

interface PerformanceChartCardProps {
  onTimeframeChange?: (timeframe: string) => void;
}

const PerformanceChartCard = ({ onTimeframeChange }: PerformanceChartCardProps) => {
  const [selectedTimeframe, setSelectedTimeframe] = useState('ytd');

  const performanceChartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [{
      label: 'YTD Performance',
      data: [2.1, 3.5, 5.8, 7.2, 8.9, 10.1, 11.5, 12.0, 12.4, 12.4, 12.4, 12.4],
      borderColor: '#3B82F6',
      backgroundColor: 'rgba(59, 130, 246, 0.1)',
      fill: true,
      tension: 0.4
    }]
  };

  const handleTimeframeChange = (timeframe: string) => {
    setSelectedTimeframe(timeframe);
    onTimeframeChange?.(timeframe);
  };

  return (
    <Card>
      <div className="card-header">
        <h3 className="card-title">Performance Over Time</h3>
        <div className="flex gap-1">
          <Button 
            label="YTD" 
            size="small" 
            className={selectedTimeframe === 'ytd' ? '' : 'p-button-outlined p-button-secondary'}
            onClick={() => handleTimeframeChange('ytd')}
          />
          <Button 
            label="1Y" 
            size="small" 
            className={selectedTimeframe === '1y' ? '' : 'p-button-outlined p-button-secondary'}
            onClick={() => handleTimeframeChange('1y')}
          />
          <Button 
            label="3Y" 
            size="small" 
            className={selectedTimeframe === '3y' ? '' : 'p-button-outlined p-button-secondary'}
            onClick={() => handleTimeframeChange('3y')}
          />
          <Button 
            label="5Y" 
            size="small" 
            className={selectedTimeframe === '5y' ? '' : 'p-button-outlined p-button-secondary'}
            onClick={() => handleTimeframeChange('5y')}
          />
        </div>
      </div>
      
      <div style={{ height: '320px' }}>
        <Chart
          type="line" 
          data={performanceChartData}
          height="280px"
          options={{
            responsive: true,
            maintainAspectRatio: false,
            layout: {
              padding: {
                top: 5,
                right: 15,
                bottom: 5,
                left: 15
              }
            },
            plugins: {
              legend: {
                display: true,
                position: 'top',
                align: 'start',
                labels: {
                  usePointStyle: true,
                  padding: 15,
                  font: {
                    size: 11
                  },
                  boxHeight: 8
                }
              }
            },
            scales: {
              y: {
                beginAtZero: false,
                title: {
                  display: true,
                  text: 'Performance (%)',
                  font: {
                    size: 12,
                    weight: 'bold'
                  }
                },
                grid: {
                  color: 'rgba(0,0,0,0.1)'
                },
                ticks: {
                  font: {
                    size: 11
                  },
                  callback: function(value: any) {
                    return value + '%';
                  }
                }
              },
              x: {
                title: {
                  display: true,
                  text: 'Months',
                  font: {
                    size: 12,
                    weight: 'bold'
                  }
                },
                grid: {
                  display: false
                },
                ticks: {
                  font: {
                    size: 11
                  }
                }
              }
            }
          }} 
        />
      </div>
    </Card>
  );
};

export default PerformanceChartCard;
