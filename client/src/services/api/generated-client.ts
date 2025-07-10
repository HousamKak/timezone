import { 
  RecommendationsApi, 
  StrategiesApi, 
  SecuritiesApi, 
  FundsApi 
} from '../../generated/api';
import { apiConfig } from './config';

// Create API instances using the generated client
export const recommendationsApi = new RecommendationsApi(apiConfig);
export const strategiesApi = new StrategiesApi(apiConfig);
export const securitiesApi = new SecuritiesApi(apiConfig);
export const fundsApi = new FundsApi(apiConfig);

// Export all API instances for easy access
export const api = {
  recommendations: recommendationsApi,
  strategies: strategiesApi,
  securities: securitiesApi,
  funds: fundsApi,
};

// Re-export types from generated models
export type {
  RecommendationResponse,
  RecommendationCreate,
  RecommendationUpdate,
  SecurityResponse,
  StrategyResponse,
  FundResponse,
  CurrentPrice,
  TargetPrice,
} from '../../generated/api/models';

// Custom error class for API errors
export class ApiError extends Error {
  public status: number;
  public details?: any;

  constructor(message: string, status: number, details?: any) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.details = details;
  }
}

// Helper function to handle API errors
export const handleApiError = (error: any): never => {
  if (error.response) {
    throw new ApiError(
      error.response.data?.message || error.message || 'API Error',
      error.response.status,
      error.response.data
    );
  } else if (error.request) {
    throw new ApiError('Network Error', 0, error);
  } else {
    throw new ApiError(error.message || 'Unknown Error', 0, error);
  }
};
