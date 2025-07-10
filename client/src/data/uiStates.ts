import { TradeEntryForm } from '../schemas/tradeEntry';

class UIStates {
  private static instance: UIStates;
  private tradeRecommendationFormData: TradeEntryForm[] = [];

  private constructor() {}

  static getInstance(): UIStates {
    if (!UIStates.instance) {
      UIStates.instance = new UIStates();
    }
    return UIStates.instance;
  }

  getTradeRecommendationFormData(): TradeEntryForm[] {
    return this.tradeRecommendationFormData;
  }

  setTradeRecommendationFormData(data: TradeEntryForm[]): void {
    this.tradeRecommendationFormData = data;
  }

  clearTradeRecommendationFormData(): void {
    this.tradeRecommendationFormData = [];
  }
}

export const uiStates = UIStates.getInstance();
