// Frontend-specific types not covered by OpenAPI
export interface User {
  id: number;
  name: string;
  role: string;
  department: string;
  performance: {
    ytd: number;
    fytd: number;
    hitRate: number;
    sharpeRatio: number;
    sortino: number;
    maxDrawdown: number;
    winLoss: number;
    bestTrade: {
      ticker: string;
      pnl: number;
      date: string;
    };
    worstTrade: {
      ticker: string;
      pnl: number;
      date: string;
    };
  };
}

export interface TickerData {
  [key: string]: {
    name: string;
    currentPrice: number;
    sector: string;
  };
}

export interface Trade {
  id: number;
  ticker: string;
  strategy: string;
  targetPrice: number;
  catalyst: string;
  entryDate: string;
  closeDate: string | null;
  status: 'Accepted' | 'Rejected' | 'Pending';
  positionStatus: 'Open' | 'Closed' | 'Theoretical';
  conviction: 'High' | 'Medium' | 'Low';
  positionSize: number;
  pnl1m: number | null;
  pnl3m: number | null;
  pnl6m: number | null;
  pnlAtClose: number | null;
  theoreticalPnl?: number | null;
}

export interface TradeEntry {
  id: string;
  ticker: string;
  trade: 'Buy' | 'Sell' | 'Sell Short' | 'Cover Short';
  strategy: string[];
  funds: string[];
  currentPrice: number;
  targetPrice: number;
  expectedExit: Date | null;
  files: File[];
  status: 'Draft' | 'Submitted' | 'Approved' | 'Rejected';
  createdAt: Date;
  updatedAt: Date;
}

export interface ExposureData {
  sector: Array<{ name: string; value: number }>;
  biotechSubsectors: Array<{ name: string; value: number }>;
  geography: Array<{ name: string; value: number }>;
  marketCap: Array<{ name: string; value: number }>;
  factorExposure: Array<{ name: string; value: number; color: string }>;
}

export type StrategyType = 
  | 'Earnings'
  | 'Merger Arb'
  | 'Special Situation'
  | 'Valuation'
  | 'Commercial Outlook'
  | 'Clinical Catalyst'
  | 'Earnings Beat/Miss'
  | 'Drug/Product Launch'
  | 'Technical Analysis'
  | 'M&A Speculation'
  | 'Political Trade'
  | 'Thematic Baskets'
  | 'PM Rebalance'
  | 'Macro'
  | 'Close Position'
  | 'Close Theoretical'
  | 'Other (Type your own)';

export interface TradeFormData {
  ticker: string;
  strategy: StrategyType;
  targetPrice: number;
  catalyst: string;
  conviction: 'High' | 'Medium' | 'Low';
  positionSize: number;
  notes?: string;
}
