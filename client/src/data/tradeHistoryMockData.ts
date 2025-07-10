import { RecommendationResponse } from '../generated/api/models';

export const tradeHistoryMockData = [
  {
    id: 1,
    analyst_id: 1,
    security_id: 1,
    trade_direction: 'Buy',
    current_price: '122.45',
    target_price: '180.00',
    time_horizon: '6 months',
    expected_exit_date: '2025-12-10T10:30:00Z',
    analyst_score: 8,
    notes: 'Strong pipeline with upcoming Phase 3 results expected in Q4. Potential for significant upside.',
    status: 'Approved',
    is_draft: false,
    created_at: '2025-06-10T10:30:00Z',
    updated_at: '2025-06-12T14:20:00Z',
    funds: ['BioTech Growth Fund', 'Healthcare Innovation Fund'],
    security: {
      id: 1,
      ticker: 'MRNA',
      name: 'Moderna Inc.',
      source_type: 'manual',
      is_active: true,
      current_price: '122.45'
    },
    strategies: [
      { id: 1, name: 'Clinical Catalyst', description: 'Clinical catalyst strategy', is_active: true, is_system_default: true },
      { id: 2, name: 'Drug/Product Launch', description: 'Drug launch strategy', is_active: true, is_system_default: true }
    ]
  },
  {
    id: 2,
    analyst_id: 1,
    security_id: 3,
    trade_direction: 'Sell',
    current_price: '842.76',
    target_price: '790.00',
    time_horizon: '2 months',
    expected_exit_date: '2025-09-01T16:20:00Z',
    analyst_score: 4,
    notes: 'Overvalued at current levels, technical indicators suggest downward pressure.',
    status: 'Approved',
    is_draft: false,
    created_at: '2025-07-01T16:20:00Z',
    updated_at: '2025-07-02T09:10:00Z',
    funds: ['Value Fund', 'Defensive Healthcare Fund'],
    security: {
      id: 3,
      ticker: 'REGN',
      name: 'Regeneron Pharmaceuticals',
      source_type: 'manual',
      is_active: true,
      current_price: '842.76'
    },
    strategies: [
      { id: 5, name: 'Valuation', description: 'Valuation strategy', is_active: true, is_system_default: true },
      { id: 6, name: 'Technical Analysis', description: 'Technical analysis strategy', is_active: true, is_system_default: true }
    ]
  },
  {
    id: 3,
    analyst_id: 1,
    security_id: 10,
    trade_direction: 'Sell Short',
    current_price: '252.18',
    target_price: '200.00',
    time_horizon: '2 months',
    expected_exit_date: '2025-07-28T15:30:00Z',
    analyst_score: 5,
    notes: 'Portfolio rebalancing requires reduction in exposure.',
    status: 'Proposed',
    is_draft: false,
    created_at: '2025-05-28T15:30:00Z',
    updated_at: '2025-05-29T08:45:00Z',
    funds: ['Hedge Fund Alpha'],
    security: {
      id: 10,
      ticker: 'BIIB',
      name: 'Biogen Inc.',
      source_type: 'manual',
      is_active: true,
      current_price: '252.18'
    },
    strategies: [
      { id: 18, name: 'PM Rebalance', description: 'Portfolio rebalance strategy', is_active: true, is_system_default: true }
    ]
  },
  {
    id: 4,
    analyst_id: 1,
    security_id: 13,
    trade_direction: 'Cover Short',
    current_price: '90.00',
    target_price: '122.45',
    time_horizon: '1 month',
    expected_exit_date: '2025-08-20T16:45:00Z',
    analyst_score: 6,
    notes: 'Covering short position as target reached, expecting potential reversal.',
    status: 'Approved',
    is_draft: false,
    created_at: '2025-07-20T16:45:00Z',
    updated_at: '2025-07-21T11:30:00Z',
    funds: ['Hedge Fund Alpha', 'Short Strategy Fund'],
    security: {
      id: 13,
      ticker: 'MRNA',
      name: 'Moderna Inc.',
      source_type: 'manual',
      is_active: true,
      current_price: '90.00'
    },
    strategies: [
      { id: 23, name: 'Risk Management', description: 'Risk management strategy', is_active: true, is_system_default: true }
    ]
  },
  {
    id: 5,
    analyst_id: 1,
    security_id: 6,
    trade_direction: 'Buy',
    current_price: '75.64',
    target_price: '85.00',
    time_horizon: '6 months',
    expected_exit_date: '2025-09-05T11:20:00Z',
    analyst_score: 7,
    notes: 'Attractive M&A target, solid fundamentals support higher valuation.',
    status: 'Rejected',
    is_draft: false,
    created_at: '2025-03-05T11:20:00Z',
    updated_at: '2025-03-06T15:40:00Z',
    funds: ['Growth Fund', 'M&A Opportunity Fund'],
    security: {
      id: 6,
      ticker: 'GILD',
      name: 'Gilead Sciences',
      source_type: 'manual',
      is_active: true,
      current_price: '75.64'
    },
    strategies: [
      { id: 10, name: 'M&A Speculation', description: 'M&A speculation strategy', is_active: true, is_system_default: true },
      { id: 11, name: 'Valuation', description: 'Valuation strategy', is_active: true, is_system_default: true }
    ]
  }
] as unknown as RecommendationResponse[];

// Helper function to simulate loading delay
export const getTradeHistoryMockData = async (delay: number = 800): Promise<RecommendationResponse[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(tradeHistoryMockData);
    }, delay);
  });
};
