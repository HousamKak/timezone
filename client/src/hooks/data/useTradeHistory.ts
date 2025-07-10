import { useState, useEffect } from 'react';
import { RecommendationResponse } from '../../generated/api/models';
import { tradeHistoryStore } from '../../data/tradeHistoryStore';

export const useTradeHistory = () => {
  const [data, setData] = useState<RecommendationResponse[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Initial load with delay to simulate API call
    const loadInitialData = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        // Simulate initial loading delay
        await new Promise(resolve => setTimeout(resolve, 600));
        
        // Get initial data from store
        setData(tradeHistoryStore.getTrades());
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch trade history');
      } finally {
        setIsLoading(false);
      }
    };

    loadInitialData();

    // Subscribe to real-time updates
    const unsubscribe = tradeHistoryStore.subscribe((newTrades) => {
      setData(newTrades);
    });

    // Cleanup subscription on unmount
    return unsubscribe;
  }, []);

  return {
    data,
    isLoading,
    error,
    refetch: () => {
      // Force refresh from store
      setData(tradeHistoryStore.getTrades());
    }
  };
};
