import { RecommendationResponse } from '../generated/api/models';
import { TradeEntry } from '../types';
import { tradeHistoryMockData } from './tradeHistoryMockData';

// Simple global state for trade history
class TradeHistoryStore {
  private trades: RecommendationResponse[] = [...tradeHistoryMockData];
  private listeners: Array<(trades: RecommendationResponse[]) => void> = [];
  private nextId = 6; // Start from 6 since we have 5 mock records

  // Subscribe to changes
  subscribe(listener: (trades: RecommendationResponse[]) => void) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  // Get current trades
  getTrades(): RecommendationResponse[] {
    return [...this.trades];
  }

  // Add a new trade (simulating API submission)
  async addTrade(tradeData: TradeEntry[]): Promise<{ success: boolean; message: string }> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));

    try {
      const newTrades: RecommendationResponse[] = tradeData.map(trade => {
        const tradeId = this.nextId++;
        const securityId = this.nextId++;
        
        return {
          id: tradeId,
          analyst_id: 1,
          security_id: securityId,
          trade_direction: trade.trade as any,
          current_price: trade.currentPrice?.toString() || '0',
          target_price: trade.targetPrice?.toString() || '0',
          time_horizon: trade.expectedExit ? `${Math.ceil((new Date(trade.expectedExit).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24 * 30))} months` : '3 months',
          expected_exit_date: trade.expectedExit?.toISOString() || new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString(),
          analyst_score: Math.floor(Math.random() * 5) + 5,
          notes: `${trade.trade} recommendation for ${trade.ticker}`,
          status: 'Proposed',
          is_draft: false,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
          funds: trade.funds || [],
          security: {
            id: securityId,
            ticker: trade.ticker,
            name: `${trade.ticker} Company`,
            source_type: 'manual',
            is_active: true,
            current_price: trade.currentPrice?.toString() || '0'
          },
          strategies: trade.strategy.map((strategyName) => ({
            id: this.nextId++,
            name: strategyName,
            description: `${strategyName} strategy`,
            is_active: true,
            is_system_default: true
          }))
        };
      });

      // Add to the beginning of the array (most recent first)
      this.trades = [...newTrades, ...this.trades];

      // Notify all listeners
      this.listeners.forEach(listener => listener(this.getTrades()));

      return {
        success: true,
        message: `Successfully submitted ${newTrades.length} trade(s) for approval.`
      };
    } catch (error) {
      throw new Error('Failed to submit trades');
    }
  }

  // Add a single trade as draft (for Save as Draft functionality)
  async addDraft(tradeData: TradeEntry): Promise<{ success: boolean; message: string }> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));

    try {
      const tradeId = this.nextId++;
      const securityId = this.nextId++;
      
      const newTrade: RecommendationResponse = {
        id: tradeId,
        analyst_id: 1,
        security_id: securityId,
        trade_direction: tradeData.trade as any,
        current_price: tradeData.currentPrice?.toString() || '0',
        target_price: tradeData.targetPrice?.toString() || '0',
        time_horizon: tradeData.expectedExit ? `${Math.ceil((new Date(tradeData.expectedExit).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24 * 30))} months` : '3 months',
        expected_exit_date: tradeData.expectedExit?.toISOString() || new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString(),
        analyst_score: Math.floor(Math.random() * 5) + 5,
        notes: `${tradeData.trade} recommendation for ${tradeData.ticker}`,
        status: 'Draft',
        is_draft: true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        security: {
          id: securityId,
          ticker: tradeData.ticker,
          name: `${tradeData.ticker} Company`,
          source_type: 'manual',
          is_active: true,
          current_price: tradeData.currentPrice?.toString() || '0'
        },
        strategies: tradeData.strategy.map((strategyName) => ({
          id: this.nextId++,
          name: strategyName,
          description: `${strategyName} strategy`,
          is_active: true,
          is_system_default: true
        }))
      } as RecommendationResponse & { funds: string[] };

      (newTrade as any).funds = tradeData.funds || [];

      // Add to the beginning of the array (most recent first)
      this.trades = [newTrade, ...this.trades];

      // Notify all listeners
      this.listeners.forEach(listener => listener(this.getTrades()));

      return {
        success: true,
        message: 'Trade saved as draft successfully.'
      };
    } catch (error) {
      throw new Error('Failed to save trade as draft');
    }
  }

  // Update trade status (for PM approval/rejection)
  updateTradeStatus(tradeId: number, status: string) {
    const tradeIndex = this.trades.findIndex(trade => trade.id === tradeId);
    if (tradeIndex !== -1) {
      this.trades[tradeIndex] = {
        ...this.trades[tradeIndex],
        status,
        updated_at: new Date().toISOString()
      };
      this.listeners.forEach(listener => listener(this.getTrades()));
    }
  }

  // Delete a draft trade
  deleteDraft(tradeId: number): boolean {
    const initialLength = this.trades.length;
    this.trades = this.trades.filter(trade => trade.id !== tradeId);
    
    if (this.trades.length < initialLength) {
      this.listeners.forEach(listener => listener(this.getTrades()));
      return true;
    }
    return false;
  }

  // Clear all trades (for testing)
  clearTrades() {
    this.trades = [];
    this.listeners.forEach(listener => listener(this.getTrades()));
  }

  // Reset to initial mock data
  resetToMockData() {
    this.trades = [...tradeHistoryMockData];
    this.nextId = 6;
    this.listeners.forEach(listener => listener(this.getTrades()));
  }
}

// Export singleton instance
export const tradeHistoryStore = new TradeHistoryStore();
