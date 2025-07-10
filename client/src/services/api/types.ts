// API-specific types that map to backend models
export interface ApiStrategy {
  id: number;
  name: string;
  description: string;
  is_system_default: boolean;
}

export interface ApiSecurity {
  id: number;
  ticker: string;
  name: string;
  sector?: string;
  source_type: string;
  current_price?: number;
  is_resolved: boolean;
}

export interface ApiFund {
  id: number;
  code: string;
  name: string;
  is_active: boolean;
}

export interface ApiRecommendation {
  id: number;
  analyst_id: number;
  security_id: number;
  fund_ids: number[];
  strategy_ids: number[];
  trade_type: 'BUY' | 'SELL' | 'SELL_SHORT' | 'COVER_SHORT';
  target_price: number;
  target_weight?: number;
  catalyst: string;
  expected_timeline?: string;
  conviction_level: 'HIGH' | 'MEDIUM' | 'LOW';
  status: 'DRAFT' | 'SUBMITTED' | 'APPROVED' | 'REJECTED' | 'CANCELLED';
  created_at: string;
  updated_at: string;
  notes?: string;
}

export interface CreateRecommendationRequest {
  security_id: number;
  fund_ids: number[];
  strategy_ids: number[];
  trade_type: 'BUY' | 'SELL' | 'SELL_SHORT' | 'COVER_SHORT';
  target_price: number;
  target_weight?: number;
  catalyst: string;
  expected_timeline?: string;
  conviction_level: 'HIGH' | 'MEDIUM' | 'LOW';
  notes?: string;
}

export interface UpdateRecommendationRequest extends Partial<CreateRecommendationRequest> {
  status?: 'DRAFT' | 'SUBMITTED' | 'APPROVED' | 'REJECTED' | 'CANCELLED';
}


