import { SecurityResponse } from '../../generated/api/models';
import { securitiesApi, handleApiError } from './generated-client';

export class SecurityService {
  static async getSecurities(): Promise<SecurityResponse[]> {
    try {
      const response = await securitiesApi.getSecuritiesApiV1SecuritiesGet();
      return response.data;
    } catch (error) {
      return handleApiError(error);
    }
  }

  static async getSecurity(id: number): Promise<SecurityResponse> {
    try {
      const response = await securitiesApi.getSecurityApiV1SecuritiesSecurityIdGet(id);
      return response.data;
    } catch (error) {
      return handleApiError(error);
    }
  }

  static async searchSecurities(query: string): Promise<SecurityResponse[]> {
    try {
      const response = await securitiesApi.searchSecuritiesApiV1SecuritiesSearchGet(query);
      return response.data;
    } catch (error) {
      return handleApiError(error);
    }
  }
}

export const getSecurities = SecurityService.getSecurities;
export const getSecurity = SecurityService.getSecurity;
export const searchSecurities = SecurityService.searchSecurities;
