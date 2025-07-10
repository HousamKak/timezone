import { 
  RecommendationResponse, 
  RecommendationCreate, 
  RecommendationUpdate 
} from '../../generated/api/models';
import { recommendationsApi, handleApiError } from './generated-client';

export class RecommendationService {
  static async getRecommendations(): Promise<RecommendationResponse[]> {
    try {
      const response = await recommendationsApi.getRecommendationsApiV1RecommendationsGet();
      return response.data;
    } catch (error) {
      return handleApiError(error);
    }
  }

  static async getDraftRecommendations(): Promise<RecommendationResponse[]> {
    try {
      const response = await recommendationsApi.getDraftRecommendationsApiV1RecommendationsDraftsGet();
      return response.data;
    } catch (error) {
      return handleApiError(error);
    }
  }

  static async createRecommendation(data: RecommendationCreate): Promise<RecommendationResponse> {
    try {
      const response = await recommendationsApi.createRecommendationApiV1RecommendationsPost(data);
      return response.data;
    } catch (error) {
      return handleApiError(error);
    }
  }

  static async updateRecommendation(
    id: number, 
    data: RecommendationUpdate
  ): Promise<RecommendationResponse> {
    try {
      const response = await recommendationsApi.updateRecommendationApiV1RecommendationsRecommendationIdPut(id, data);
      return response.data;
    } catch (error) {
      return handleApiError(error);
    }
  }

  static async deleteRecommendation(id: number): Promise<void> {
    try {
      await recommendationsApi.deleteRecommendationApiV1RecommendationsRecommendationIdDelete(id);
    } catch (error) {
      return handleApiError(error);
    }
  }

  static async getRecommendation(id: number): Promise<RecommendationResponse> {
    try {
      const response = await recommendationsApi.getRecommendationApiV1RecommendationsRecommendationIdGet(id);
      return response.data;
    } catch (error) {
      return handleApiError(error);
    }
  }
}

// Export functions for backward compatibility
export const getRecommendations = RecommendationService.getRecommendations;
export const getDraftRecommendations = RecommendationService.getDraftRecommendations;
export const createRecommendation = RecommendationService.createRecommendation;
export const updateRecommendation = RecommendationService.updateRecommendation;
export const deleteRecommendation = RecommendationService.deleteRecommendation;
export const getRecommendation = RecommendationService.getRecommendation;
