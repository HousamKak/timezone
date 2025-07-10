// Central export point for all API services
export * from './types';
export * from './strategies';
export * from './securities';
export * from './funds';
export * from './recommendations';
export * from './config';

// Export specific items from generated client to avoid conflicts
export { api, recommendationsApi, strategiesApi, securitiesApi, fundsApi, handleApiError } from './generated-client';

// Re-export services as namespaced objects for convenience
export { StrategyService } from './strategies';
export { SecurityService } from './securities';
export { FundService } from './funds';
export { RecommendationService } from './recommendations';
