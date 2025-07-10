import { useState, useEffect } from 'react';
import { currentUser, exposureData } from '@/data/mockData';

interface DashboardData {
  user: typeof currentUser;
  metrics: {
    totalTrades: number;
    acceptedTrades: number;
    rejectedTrades: number;
    openPositions: number;
    closedPositions: number;
    avgPnL3m: number;
    avgPnLAtClose: number;
    hitRate: number;
  };
  exposure: typeof exposureData;
  performance: {
    ytdReturn: number;
    sharpeRatio: number;
    maxDrawdown: number;
    winLossRatio: number;
  };
}

export const useDashboard = () => {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [refreshKey, setRefreshKey] = useState(0);

  // Calculate dashboard metrics
  const calculateMetrics = () => {
    return {
      totalTrades: 15,
      acceptedTrades: 12,
      rejectedTrades: 3,
      openPositions: 8,
      closedPositions: 4,
      avgPnL3m: 5.7,
      avgPnLAtClose: 8.2,
      hitRate: 68.5,
    };
  };

  // Fetch dashboard data
  useEffect(() => {
    const fetchDashboardData = async () => {
      setLoading(true);
      setError(null);

      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));

        const dashboardData: DashboardData = {
          user: currentUser,
          metrics: calculateMetrics(),
          exposure: exposureData,
          performance: {
            ytdReturn: currentUser.performance.ytd,
            sharpeRatio: currentUser.performance.sharpeRatio,
            maxDrawdown: currentUser.performance.maxDrawdown,
            winLossRatio: currentUser.performance.winLoss,
          },
        };

        setData(dashboardData);
      } catch (err) {
        setError('Failed to load dashboard data');
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [refreshKey]);

  // Refresh dashboard data
  const refresh = () => {
    setRefreshKey(prev => prev + 1);
  };

  // Get metric change compared to previous period
  const getMetricChange = (current: number, previous: number) => {
    if (previous === 0) return { value: 0, percentage: 0 };
    const change = current - previous;
    const percentage = (change / previous) * 100;
    return { value: change, percentage };
  };

  // Check if data is stale (for auto-refresh logic)
  const isDataStale = () => {
    // In a real app, you might check timestamp of last fetch
    return false;
  };

  return {
    data,
    loading,
    error,
    refresh,
    getMetricChange,
    isDataStale,
    metrics: data?.metrics,
    performance: data?.performance,
    exposure: data?.exposure,
    user: data?.user,
  };
};
