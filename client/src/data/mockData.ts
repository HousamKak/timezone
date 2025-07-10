import { User, TickerData, Trade, ExposureData, StrategyType } from '@/types';

export const currentUser: User = {
  id: 1,
  name: 'Jane Smith',
  role: 'Senior Analyst',
  department: 'Biotech',
  performance: {
    ytd: 12.4,
    fytd: 8.7,
    hitRate: 68.5,
    sharpeRatio: 1.42,
    sortino: 1.89,
    maxDrawdown: -8.3,
    winLoss: 2.3,
    bestTrade: {
      ticker: 'BNTX',
      pnl: 22.1,
      date: '2025-04-20'
    },
    worstTrade: {
      ticker: 'NVAX',
      pnl: -4.2,
      date: '2024-11-05'
    }
  }
};

export const tickerData: TickerData = {
  'MRNA': { name: 'Moderna Inc.', currentPrice: 122.45, sector: 'Healthcare' },
  'NVAX': { name: 'Novavax Inc.', currentPrice: 68.32, sector: 'Healthcare' },
  'REGN': { name: 'Regeneron Pharmaceuticals', currentPrice: 842.76, sector: 'Healthcare' },
  'BNTX': { name: 'BioNTech SE', currentPrice: 143.52, sector: 'Healthcare' },
  'VRTX': { name: 'Vertex Pharmaceuticals', currentPrice: 367.90, sector: 'Healthcare' },
  'GILD': { name: 'Gilead Sciences', currentPrice: 75.64, sector: 'Healthcare' },
  'BIIB': { name: 'Biogen Inc.', currentPrice: 252.18, sector: 'Healthcare' },
  'AMGN': { name: 'Amgen Inc.', currentPrice: 284.54, sector: 'Healthcare' },
  'ILMN': { name: 'Illumina Inc.', currentPrice: 143.89, sector: 'Healthcare' }
};

export const tradeHistory: Trade[] = [
  { id: 1, ticker: 'MRNA', strategy: 'Clinical Catalyst', targetPrice: 180, catalyst: '2025-12-15', entryDate: '2025-06-10', closeDate: '2025-09-15', status: 'Accepted', positionStatus: 'Closed', conviction: 'High', positionSize: 150, pnl1m: 2.5, pnl3m: 5.2, pnl6m: 7.8, pnlAtClose: 8.4 },
  { id: 2, ticker: 'NVAX', strategy: 'Drug/Product Launch', targetPrice: 95, catalyst: '2025-10-20', entryDate: '2025-05-15', closeDate: null, status: 'Accepted', positionStatus: 'Open', conviction: 'Medium', positionSize: 100, pnl1m: -1.2, pnl3m: 3.4, pnl6m: 6.5, pnlAtClose: null },
  { id: 3, ticker: 'REGN', strategy: 'Valuation', targetPrice: 790, catalyst: '2025-09-30', entryDate: '2025-07-01', closeDate: null, status: 'Rejected', positionStatus: 'Theoretical', conviction: 'Low', positionSize: 75, pnl1m: -3.4, pnl3m: -5.7, pnl6m: -8.2, theoreticalPnl: -6.3, pnlAtClose: null },
  { id: 4, ticker: 'BNTX', strategy: 'Earnings Beat/Miss', targetPrice: 210, catalyst: '2025-11-15', entryDate: '2025-04-20', closeDate: null, status: 'Accepted', positionStatus: 'Open', conviction: 'High', positionSize: 200, pnl1m: 8.3, pnl3m: 15.7, pnl6m: 22.1, pnlAtClose: null },
  { id: 5, ticker: 'VRTX', strategy: 'Commercial Outlook', targetPrice: 320, catalyst: '2025-08-25', entryDate: '2025-06-30', closeDate: null, status: 'Rejected', positionStatus: 'Closed', conviction: 'Medium', positionSize: 100, pnl1m: 2.1, pnl3m: 4.6, pnl6m: 5.8, theoreticalPnl: 12.9, pnlAtClose: null },
  { id: 6, ticker: 'GILD', strategy: 'M&A Speculation', targetPrice: 85, catalyst: '2025-07-10', entryDate: '2025-03-05', closeDate: '2025-08-20', status: 'Accepted', positionStatus: 'Closed', conviction: 'Medium', positionSize: 125, pnl1m: 3.2, pnl3m: 5.7, pnl6m: 9.2, pnlAtClose: 11.3 },
  { id: 7, ticker: 'BIIB', strategy: 'Technical Analysis', targetPrice: 220, catalyst: '2025-06-22', entryDate: '2025-02-15', closeDate: '2025-07-30', status: 'Accepted', positionStatus: 'Closed', conviction: 'High', positionSize: 150, pnl1m: 4.3, pnl3m: 7.8, pnl6m: 10.5, pnlAtClose: 12.7 },
  { id: 8, ticker: 'AMGN', strategy: 'Thematic Baskets', targetPrice: 300, catalyst: '2025-08-15', entryDate: '2025-04-10', closeDate: null, status: 'Accepted', positionStatus: 'Open', conviction: 'Medium', positionSize: 100, pnl1m: 1.8, pnl3m: 4.6, pnl6m: 6.9, pnlAtClose: null },
  { id: 9, ticker: 'ILMN', strategy: 'Political Trade', targetPrice: 165, catalyst: '2025-11-05', entryDate: '2025-06-12', closeDate: null, status: 'Accepted', positionStatus: 'Open', conviction: 'High', positionSize: 120, pnl1m: 3.1, pnl3m: 6.2, pnl6m: 8.5, pnlAtClose: null },
  { id: 10, ticker: 'BIIB', strategy: 'PM Rebalance', targetPrice: 280, catalyst: '2025-10-10', entryDate: '2025-05-28', closeDate: null, status: 'Accepted', positionStatus: 'Open', conviction: 'Medium', positionSize: 85, pnl1m: -0.8, pnl3m: 2.3, pnl6m: 4.1, pnlAtClose: null },
  { id: 11, ticker: 'VRTX', strategy: 'Valuation', targetPrice: 390, catalyst: '2025-12-20', entryDate: '2025-07-15', closeDate: null, status: 'Accepted', positionStatus: 'Open', conviction: 'High', positionSize: 175, pnl1m: 5.2, pnl3m: 7.8, pnl6m: null, pnlAtClose: null },
  { id: 12, ticker: 'GILD', strategy: 'Macro', targetPrice: 65, catalyst: '2025-09-15', entryDate: '2025-06-22', closeDate: null, status: 'Accepted', positionStatus: 'Open', conviction: 'Medium', positionSize: 110, pnl1m: 2.4, pnl3m: -1.8, pnl6m: null, pnlAtClose: null },  { id: 13, ticker: 'MRNA', strategy: 'Clinical Catalyst', targetPrice: 90, catalyst: '2026-01-15', entryDate: '2025-08-20', closeDate: null, status: 'Rejected', positionStatus: 'Theoretical', conviction: 'High', positionSize: 120, pnl1m: null, pnl3m: null, pnl6m: null, theoreticalPnl: 26.5, pnlAtClose: null },
  { id: 14, ticker: 'NVAX', strategy: 'Valuation', targetPrice: 50, catalyst: '2025-11-05', entryDate: '2025-09-10', closeDate: null, status: 'Rejected', positionStatus: 'Theoretical', conviction: 'Medium', positionSize: 80, pnl1m: null, pnl3m: null, pnl6m: null, theoreticalPnl: 26.8, pnlAtClose: null },
  { id: 15, ticker: 'AMGN', strategy: 'Commercial Outlook', targetPrice: 350, catalyst: '2026-02-20', entryDate: '2025-09-15', closeDate: null, status: 'Rejected', positionStatus: 'Theoretical', conviction: 'High', positionSize: 150, pnl1m: null, pnl3m: null, pnl6m: null, theoreticalPnl: -18.7, pnlAtClose: null }
];

// export const funds: Fund[] = [
//   { id: 1, name: 'Worldwide Healthcare Trust' },
//   { id: 2, name: 'Biotech Growth Trust' },
//   { id: 3, name: 'Genesis Fund' },
//   { id: 4, name: 'OrbiMed Partners Fund' }
// ];

export const exposureData: ExposureData = {
  sector: [
    { name: 'Pharmaceuticals', value: 35 },
    { name: 'Biotechnology', value: 42 },
    { name: 'Medical Devices', value: 12 },
    { name: 'Healthcare Services', value: 8 },
    { name: 'Life Sciences Tools', value: 3 }
  ],
  biotechSubsectors: [
    { name: 'Gene Therapy', value: 25 },
    { name: 'Immuno-Oncology', value: 30 },
    { name: 'RNA Therapeutics', value: 15 },
    { name: 'Rare Diseases', value: 12 },
    { name: 'Antibody Platforms', value: 8 },
    { name: 'Cell Therapy', value: 10 }
  ],
  geography: [
    { name: 'North America', value: 65 },
    { name: 'Europe', value: 25 },
    { name: 'Asia', value: 8 },
    { name: 'Other', value: 2 }
  ],
  marketCap: [
    { name: 'Large Cap', value: 45 },
    { name: 'Mid Cap', value: 35 },
    { name: 'Small Cap', value: 20 }
  ],
  factorExposure: [
    { name: 'Momentum', value: 25, color: '#4e73df' },
    { name: 'Value', value: -15, color: '#e74a3b' },
    { name: 'Quality', value: 30, color: '#1cc88a' },
    { name: 'Growth', value: 45, color: '#f6c23e' },
    { name: 'Size', value: -10, color: '#36b9cc' },
    { name: 'Volatility', value: 20, color: '#6f42c1' }
  ]
};

export const strategyTypes: StrategyType[] = [
  'Earnings', 
  'Merger Arb', 
  'Special Situation',
  'Valuation',
  'Commercial Outlook',
  'Clinical Catalyst',
  'Earnings Beat/Miss',
  'Drug/Product Launch',
  'Technical Analysis',
  'M&A Speculation',
  'Political Trade',
  'Thematic Baskets',
  'PM Rebalance',
  'Macro',
  'Close Position',
  'Close Theoretical',
  'Other (Type your own)'
];
