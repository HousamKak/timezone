import { Card } from 'primereact/card';
import { Chart } from 'primereact/chart';
import { exposureData } from '../../data/mockData';
import { ProgressBar } from '../ui';

const BiotechSubsectorExposureCard = () => {
  // Define consistent colors for the chart and progress bars
  const chartColors = ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40'];
  
  const sectorChartData = {
    labels: exposureData.biotechSubsectors.map(item => item.name),
    datasets: [{
      data: exposureData.biotechSubsectors.map(item => item.value),
      backgroundColor: chartColors
    }]
  };
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: '55%',
    plugins: {
      legend: {
        position: 'right' as const,
        align: 'center' as const,
        labels: {
          usePointStyle: true,
          padding: 8,
          font: {
            size: 9
          },
          generateLabels: (chart: any) => {
            const data = chart.data;
            if (data.labels.length && data.datasets.length) {
              return data.labels.map((label: string, index: number) => {
                const value = data.datasets[0].data[index];
                return {
                  text: `${label} ${value}%`,
                  fillStyle: chartColors[index],
                  strokeStyle: chartColors[index],
                  lineWidth: 0,
                  pointStyle: 'circle',
                  hidden: false,
                  index: index
                };
              });
            }
            return [];
          }
        }
      }
    }
  };

  return (
    <Card>
      <div className="card-header">
        <h3 className="card-title">Biotech Subsector Exposure</h3>
      </div>        {/* Chart with legends */}
      <div className="chart-container" style={{ height: '180px', width: '100%' }}>
        <Chart 
          type="doughnut" 
          data={sectorChartData} 
          options={chartOptions}
          style={{ width: '100%', height: '100%' }}
        />
      </div>
      
      {/* Progress bars for each subsector */}
      <div className="mt-3">
        {exposureData.biotechSubsectors.map((item, index) => (
          <div key={index} className="mb-2">
            <ProgressBar
              value={item.value}
              max={100}
              color={chartColors[index]}
              height="6px"
              label={item.name}              showValue={true}
            />
          </div>
        ))}
      </div>
    </Card>
  );
};

export default BiotechSubsectorExposureCard;
