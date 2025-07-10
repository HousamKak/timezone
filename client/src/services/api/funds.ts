import { FundResponse } from '../../generated/api/models';
import { fundsApi, handleApiError } from './generated-client';

export class FundService {
  static async getFunds(): Promise<FundResponse[]> {
    try {
      const response = await fundsApi.getFundsApiV1FundsGet();
      return response.data;
    } catch (error) {
      return handleApiError(error);
    }
  }

  static async getFund(id: number): Promise<FundResponse> {
    try {
      const response = await fundsApi.getFundApiV1FundsFundIdGet(id);
      return response.data;
    } catch (error) {
      return handleApiError(error);
    }
  }

  static async getFundByCode(code: string): Promise<FundResponse> {
    try {
      const response = await fundsApi.getFundByCodeApiV1FundsCodeCodeGet(code);
      return response.data;
    } catch (error) {
      return handleApiError(error);
    }
  }
}

export const getFunds = FundService.getFunds;
export const getFund = FundService.getFund;
export const getFundByCode = FundService.getFundByCode;
