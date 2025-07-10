import { useState, useCallback, useEffect } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { TradeEntryFormSchema, type TradeEntryForm } from '../../schemas/tradeEntry';
import { TradeEntry } from '../../types';
import { uiStates } from '../../data/uiStates';

interface TradeEntriesForm {
  trades: TradeEntryForm[];
}

const TradeEntriesFormSchema = z.object({
  trades: z.array(TradeEntryFormSchema)
});

export const useTradeEntriesForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const form = useForm<TradeEntriesForm>({
    resolver: zodResolver(TradeEntriesFormSchema),
    defaultValues: {
      trades: [createEmptyTradeForm()]
    },
    mode: 'all'
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'trades'
  });

  useEffect(() => {
    const savedData = uiStates.getTradeRecommendationFormData();
    if (savedData.length > 0) {
      form.reset({ trades: savedData });
    }
  }, [form]);

  const saveToUIState = useCallback(() => {
    const currentTrades = form.getValues('trades');
    if (currentTrades && currentTrades.length > 0) {
      const validTrades = currentTrades.filter(trade => trade != null) as TradeEntryForm[];
      uiStates.setTradeRecommendationFormData(validTrades);
    }
  }, [form]);

  const watchedTrades = form.watch('trades');

  function createEmptyTradeForm(): TradeEntryForm {
    return {
      ticker: '',
      trade: 'Buy',
      strategy: [],
      funds: [],
      currentPrice: 0,
      targetPrice: 0,
      expectedExit: null,
      files: [],
      isDraft: false
    };
  }

  const addRow = useCallback(() => {
    append(createEmptyTradeForm());
    setTimeout(() => saveToUIState(), 0);
  }, [append, saveToUIState]);

  const removeRow = useCallback((index: number) => {
    if (fields.length > 1) {
      remove(index);
      setTimeout(() => saveToUIState(), 0);
    }
  }, [remove, fields.length, saveToUIState]);

  const clearAll = useCallback(() => {
    form.reset({
      trades: [createEmptyTradeForm()]
    });
    uiStates.clearTradeRecommendationFormData();
  }, [form]);

  const getValidTrades = useCallback(() => {
    return watchedTrades.filter(trade => {
      const hasRequiredFields = trade.ticker && 
        trade.strategy.length > 0 && 
        trade.funds.length > 0;
      
      const currentPrice = typeof trade.currentPrice === 'string' ? 
        parseFloat(trade.currentPrice) : trade.currentPrice;
      const targetPrice = typeof trade.targetPrice === 'string' ? 
        parseFloat(trade.targetPrice) : trade.targetPrice;
      
      const hasValidPrices = !isNaN(currentPrice) && currentPrice > 0 && 
        !isNaN(targetPrice) && targetPrice > 0;
      
      return hasRequiredFields && hasValidPrices;
    });
  }, [watchedTrades]);

  const submitTrades = useCallback(async () => {
    setIsSubmitting(true);
    try {
      const validTrades = getValidTrades();

      const tradeEntries: TradeEntry[] = validTrades.map(trade => ({
        ...trade,
        id: crypto.randomUUID(),
        status: 'Submitted' as const,
        createdAt: new Date(),
        updatedAt: new Date()
      }));

      const { tradeHistoryStore } = await import('../../data/tradeHistoryStore');
      const result = await tradeHistoryStore.addTrade(tradeEntries);
      
      if (result.success) {
        clearAll();
      }
      return result;
    } finally {
      setIsSubmitting(false);
    }
  }, [getValidTrades, clearAll]);

  const saveDraft = useCallback(async (index: number) => {
    const formData = form.getValues();
    const tradeToSave = formData.trades[index];

    try {
      form.setValue(`trades.${index}`, { ...tradeToSave, isDraft: true });
      append(createEmptyTradeForm());
      setTimeout(() => saveToUIState(), 0);
      
      return { success: true, message: 'Draft saved successfully' };
    } catch (error) {
      throw error;
    }
  }, [form, append, saveToUIState]);

  return {
    form,
    fields,
    isSubmitting,
    addRow,
    removeRow,
    clearAll,
    submitTrades,
    getValidTrades,
    saveDraft,
    formState: form.formState
  };
};
