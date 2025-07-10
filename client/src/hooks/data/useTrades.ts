import { useState, useEffect, useCallback } from 'react';
import { Trade, TradeFormData } from '@/types';
import { tradeHistory } from '@/data/mockData';

interface TradesState {
  trades: Trade[];
  loading: boolean;
  error: string | null;
  filters: {
    status?: string;
    strategy?: string;
    conviction?: string;
    dateRange?: { start: string; end: string };
  };
}

export const useTrades = () => {
  const [state, setState] = useState<TradesState>({
    trades: [],
    loading: true,
    error: null,
    filters: {},
  });

  // Fetch trades (mock implementation)
  const fetchTrades = useCallback(async () => {
    setState(prev => ({ ...prev, loading: true, error: null }));
    
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      setState(prev => ({
        ...prev,
        trades: tradeHistory,
        loading: false,
      }));
    } catch (error) {
      setState(prev => ({
        ...prev,
        loading: false,
        error: 'Failed to fetch trades',
      }));
    }
  }, []);

  // Create new trade
  const createTrade = async (tradeData: TradeFormData): Promise<{ success: boolean; error?: string }> => {
    try {
      setState(prev => ({ ...prev, loading: true }));
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newTrade: Trade = {
        id: Date.now(), // Mock ID generation
        ...tradeData,
        status: 'Pending',
        positionStatus: 'Theoretical',
        entryDate: new Date().toISOString().split('T')[0],
        closeDate: null,
        pnl1m: null,
        pnl3m: null,
        pnl6m: null,
        pnlAtClose: null,
        catalyst: tradeData.catalyst || '',
      };
      
      setState(prev => ({
        ...prev,
        trades: [newTrade, ...prev.trades],
        loading: false,
      }));
      
      return { success: true };
    } catch (error) {
      setState(prev => ({
        ...prev,
        loading: false,
        error: 'Failed to create trade',
      }));
      return { success: false, error: 'Failed to create trade' };
    }
  };

  // Update trade
  const updateTrade = async (tradeId: number, updates: Partial<Trade>): Promise<{ success: boolean; error?: string }> => {
    try {
      setState(prev => ({ ...prev, loading: true }));
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setState(prev => ({
        ...prev,
        trades: prev.trades.map(trade =>
          trade.id === tradeId ? { ...trade, ...updates } : trade
        ),
        loading: false,
      }));
      
      return { success: true };
    } catch (error) {
      setState(prev => ({
        ...prev,
        loading: false,
        error: 'Failed to update trade',
      }));
      return { success: false, error: 'Failed to update trade' };
    }
  };

  // Apply filters
  const applyFilters = (filters: TradesState['filters']) => {
    setState(prev => ({ ...prev, filters }));
  };

  // Get filtered trades
  const getFilteredTrades = (): Trade[] => {
    let filteredTrades = state.trades;
    
    if (state.filters.status) {
      filteredTrades = filteredTrades.filter(trade => trade.status === state.filters.status);
    }
    
    if (state.filters.strategy) {
      filteredTrades = filteredTrades.filter(trade => trade.strategy === state.filters.strategy);
    }
    
    if (state.filters.conviction) {
      filteredTrades = filteredTrades.filter(trade => trade.conviction === state.filters.conviction);
    }
    
    if (state.filters.dateRange) {
      const { start, end } = state.filters.dateRange;
      filteredTrades = filteredTrades.filter(trade => {
        const tradeDate = new Date(trade.entryDate);
        return tradeDate >= new Date(start) && tradeDate <= new Date(end);
      });
    }
    
    return filteredTrades;
  };

  // Get trade statistics
  const getTradeStats = () => {
    const trades = getFilteredTrades();
    
    return {
      total: trades.length,
      accepted: trades.filter(t => t.status === 'Accepted').length,
      rejected: trades.filter(t => t.status === 'Rejected').length,
      pending: trades.filter(t => t.status === 'Pending').length,
      openPositions: trades.filter(t => t.positionStatus === 'Open').length,
      closedPositions: trades.filter(t => t.positionStatus === 'Closed').length,
      avgPnL: trades
        .filter(t => t.pnl3m !== null)
        .reduce((acc, t) => acc + (t.pnl3m || 0), 0) / trades.filter(t => t.pnl3m !== null).length || 0,
    };
  };

  // Load trades on mount
  useEffect(() => {
    fetchTrades();
  }, [fetchTrades]);

  return {
    trades: state.trades,
    filteredTrades: getFilteredTrades(),
    loading: state.loading,
    error: state.error,
    filters: state.filters,
    stats: getTradeStats(),
    createTrade,
    updateTrade,
    fetchTrades,
    applyFilters,
  };
};
