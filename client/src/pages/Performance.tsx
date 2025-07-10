import { useDashboard } from '../hooks/data/useDashboard';
import { useTrades } from '../hooks/data/useTrades';
import { MetricCard } from '../components/dashboard/MetricCard';
import { Card } from '../components/ui';

const Performance = () => {
  const { data: dashboardData, loading: dashboardLoading } = useDashboard();
  const { stats: tradeStats, loading: tradesLoading } = useTrades();

  const loading = dashboardLoading || tradesLoading;

  if (loading) {
    return (
      <div className="p-6">
        <div className="flex items-center justify-center h-64">
          <div className="text-lg">Loading performance data...</div>
        </div>
      </div>
    );
  }

  const performanceData = dashboardData?.performance;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Performance Analytics</h1>
        {/* Key Performance Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <MetricCard
          title="YTD Return"
          value={`${performanceData?.ytdReturn?.toFixed(1) || '0.0'}%`}
          color={performanceData?.ytdReturn && performanceData.ytdReturn > 0 ? "green" : "red"}
        />
        <MetricCard
          title="Sharpe Ratio"
          value={performanceData?.sharpeRatio?.toFixed(2) || '0.00'}
          color="blue"
        />
        <MetricCard
          title="Max Drawdown"
          value={`${performanceData?.maxDrawdown?.toFixed(1) || '0.0'}%`}
          color="yellow"
        />
        <MetricCard
          title="Win/Loss Ratio"
          value={performanceData?.winLossRatio?.toFixed(2) || '0.00'}
          color="purple"
        />
      </div>

      {/* Trade Statistics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <Card>
          <h2 className="text-xl font-bold mb-4">Trade Statistics</h2>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span>Total Trades:</span>
              <span className="font-semibold">{tradeStats.total}</span>
            </div>
            <div className="flex justify-between">
              <span>Accepted Trades:</span>
              <span className="font-semibold text-green-600">{tradeStats.accepted}</span>
            </div>
            <div className="flex justify-between">
              <span>Rejected Trades:</span>
              <span className="font-semibold text-red-600">{tradeStats.rejected}</span>
            </div>
            <div className="flex justify-between">
              <span>Pending Trades:</span>
              <span className="font-semibold text-yellow-600">{tradeStats.pending}</span>
            </div>
            <div className="flex justify-between">
              <span>Acceptance Rate:</span>
              <span className="font-semibold">
                {tradeStats.total > 0 ? ((tradeStats.accepted / tradeStats.total) * 100).toFixed(1) : '0.0'}%
              </span>
            </div>
          </div>
        </Card>

        <Card>
          <h2 className="text-xl font-bold mb-4">Position Statistics</h2>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span>Open Positions:</span>
              <span className="font-semibold text-blue-600">{tradeStats.openPositions}</span>
            </div>
            <div className="flex justify-between">
              <span>Closed Positions:</span>
              <span className="font-semibold text-gray-600">{tradeStats.closedPositions}</span>
            </div>
            <div className="flex justify-between">
              <span>Average P&L:</span>
              <span className={`font-semibold ${tradeStats.avgPnL >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {tradeStats.avgPnL >= 0 ? '+' : ''}{tradeStats.avgPnL.toFixed(2)}%
              </span>
            </div>
          </div>
        </Card>
      </div>

      {/* Performance Charts Placeholder */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <h2 className="text-xl font-bold mb-4">Monthly Performance</h2>
          <div className="h-64 flex items-center justify-center bg-gray-50 dark:bg-gray-700 rounded">
            <p className="text-gray-500">Performance chart will be displayed here</p>
          </div>
        </Card>

        <Card>
          <h2 className="text-xl font-bold mb-4">Risk Metrics</h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span>Value at Risk (95%):</span>
              <span className="font-semibold">-2.1%</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Beta:</span>
              <span className="font-semibold">0.85</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Alpha:</span>
              <span className="font-semibold">+1.2%</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Volatility:</span>
              <span className="font-semibold">12.3%</span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Performance;
