import { StrategyResponse } from '../../generated/api/models';
import { strategiesApi, handleApiError } from './generated-client';

export class StrategyService {
  static async getStrategies(): Promise<StrategyResponse[]> {
    try {
      const response = await strategiesApi.getStrategiesApiV1StrategiesGet();
      return response.data;
    } catch (error) {
      return handleApiError(error);
    }
  }

  static async getStrategy(id: number): Promise<StrategyResponse> {
    try {
      const response = await strategiesApi.getStrategyApiV1StrategiesStrategyIdGet(id);
      return response.data;
    } catch (error) {
      return handleApiError(error);
    }
  }
}

export const getStrategies = StrategyService.getStrategies;
export const getStrategy = StrategyService.getStrategy;
