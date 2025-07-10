import { useDashboard } from '../hooks/data/useDashboard';
import { tradeHistory } from '../data/mockData';
import {
  PerformanceSummaryCard,
  TradeStatisticsCard,
  RecentTradeSubmissionsCard,
  BiotechSubsectorExposureCard,
  PerformanceChartCard
} from '../components/dashboard';

const Dashboard = () => {
  const { loading, error } = useDashboard();

  // Calculate dashboard metrics
  const totalTrades = tradeHistory.length;
  const acceptedTrades = tradeHistory.filter(t => t.status === 'Accepted').length;
  const openPositions = tradeHistory.filter(t => t.positionStatus === 'Open').length;
  const closedPositions = tradeHistory.filter(t => t.positionStatus === 'Closed').length;

  const handleViewAllTrades = () => {
    // Navigate to trade history page
    console.log('Navigate to trade history');
  };

  const handlePerformanceTimeframeChange = (timeframe: string) => {
    // Handle timeframe change for performance chart
    console.log('Timeframe changed to:', timeframe);
  };

  if (loading) {
    return (
      <div className="dashboard-container">
        <div className="flex justify-content-center align-items-center" style={{ height: '200px' }}>
          <i className="pi pi-spinner pi-spin" style={{ fontSize: '2rem' }}></i>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="dashboard-container">
        <div className="text-center text-red-500">
          Error loading dashboard data: {error}
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      {/* Main Content */}
      <div className="grid m-0">
        {/* Performance Summary - Left Side */}
        <div className="col-12 lg:col-8 p-2">
          <PerformanceSummaryCard />
        </div>
        
        {/* Trade Statistics - Right Side */}
        <div className="col-12 lg:col-4 p-2">
          <TradeStatisticsCard 
            totalTrades={totalTrades}
            acceptedTrades={acceptedTrades}
            openPositions={openPositions}
            closedPositions={closedPositions}
          />
        </div>

        {/* Recent Trade Submissions - Left Side */}
        <div className="col-12 lg:col-8 p-2">
          <RecentTradeSubmissionsCard onViewAllTrades={handleViewAllTrades} />
        </div>

        {/* Biotech Subsector Exposure - Right Side */}
        <div className="col-12 lg:col-4 p-2">
          <BiotechSubsectorExposureCard />
        </div>

        {/* Performance Chart - Full Width */}
        <div className="col-12 p-2">
          <PerformanceChartCard onTimeframeChange={handlePerformanceTimeframeChange} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
