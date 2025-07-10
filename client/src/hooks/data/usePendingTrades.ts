import { useState, useEffect } from 'react';
import { RecommendationResponse } from '../../generated/api/models';
import { tradeHistoryStore } from '../../data/tradeHistoryStore';

export const usePendingTrades = () => {
  const [trades, setTrades] = useState<RecommendationResponse[]>([]);
  const [loading] = useState(false);

  useEffect(() => {
    const updateTrades = (allTrades: RecommendationResponse[]) => {
      const pendingTrades = allTrades.filter(trade => trade.status === 'Proposed');
      setTrades(pendingTrades);
    };

    const unsubscribe = tradeHistoryStore.subscribe(updateTrades);
    
    updateTrades(tradeHistoryStore.getTrades());
    
    return unsubscribe;
  }, []);

  return {
    trades,
    loading,
    refetch: () => {
      setTrades(tradeHistoryStore.getTrades().filter(trade => trade.status === 'Proposed'));
    }
  };
};
