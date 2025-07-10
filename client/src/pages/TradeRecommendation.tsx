import React from 'react';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import { useRef } from 'react';
import { TradeRecommendationGrid } from '../components/trade-recommendations';
import { TradeHistoryTable } from '../components/trade-history';
import { useTradeEntriesForm } from '../hooks/data/useTradeEntriesForm';
import { useTradeHistory } from '../hooks/data/useTradeHistory';

const TradeRecommendation: React.FC = () => {
  const toast = useRef<Toast>(null);
  const { 
    data: tradeHistory, 
    isLoading: tradeHistoryLoading 
  } = useTradeHistory();
  
  const {
    form,
    fields,
    isSubmitting,
    addRow,
    removeRow,
    clearAll,
    saveDraft,
    getValidTrades,
    submitTrades
  } = useTradeEntriesForm();

  const handleSaveDraft = async (index: number) => {
    try {
      const result = await saveDraft(index);
      if (result.success) {
        toast.current?.show({
          severity: 'success',
          summary: 'Draft Saved',
          detail: result.message,
          life: 3000
        });
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to save draft';
      toast.current?.show({
        severity: 'error',
        summary: 'Draft Save Failed',
        detail: errorMessage,
        life: 4000
      });
    }
  };

  const handleSubmit = async () => {
    try {
      // Trigger form validation
      const isValid = await form.trigger();
      
      if (!isValid) {
        toast.current?.show({
          severity: 'warn',
          summary: 'Validation Error',
          detail: 'Please fix the highlighted errors before submitting.',
          life: 4000
        });
        return;
      }

      const validTrades = getValidTrades();
      
      if (validTrades.length === 0) {
        toast.current?.show({
          severity: 'warn',
          summary: 'No Valid Trades',
          detail: 'Please complete at least one trade entry before submitting.',
          life: 4000
        });
        return;
      }

      const result = await submitTrades();
      if (result.success) {
        toast.current?.show({
          severity: 'success',
          summary: 'Submitted',
          detail: result.message,
          life: 3000
        });
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to submit trades';
      toast.current?.show({
        severity: 'error',
        summary: 'Submit Failed',
        detail: errorMessage,
        life: 4000
      });
    }
  };

  const handleClear = () => {
    clearAll();
    toast.current?.show({
      severity: 'info',
      summary: 'Cleared',
      detail: 'All trade entries have been cleared.',
      life: 3000
    });
  };

  const validTradeCount = getValidTrades().length;
  const watchedTrades = form.watch('trades');
  const draftCount = watchedTrades.filter(trade => trade.isDraft).length;

  return (
    <div className="dashboard-container">
      <Toast ref={toast} />
      
      <Card>
        <div className="card-header">
          <h3 className="card-title">New Trade Recommendations</h3>
        </div>

        <div className="mb-3">
          <div className="flex align-items-center justify-content-between mb-2">
            <p className="text-sm text-color-secondary m-0">
              Enter your trade recommendations below. All fields marked with * are required.
            </p>
            <div className="flex gap-2">
              <Button
                label="Clear All"
                icon="pi pi-trash"
                severity="danger"
                outlined
                onClick={handleClear}
                size="small"
              />
              <Button
                label={`Submit (${validTradeCount})`}
                icon="pi pi-check"
                onClick={handleSubmit}
                size="small"
                loading={isSubmitting}
              />
              <Button
                label="Add Row"
                icon="pi pi-plus"
                className="p-button-sm p-button-outlined"
                onClick={addRow}
                size="small"
                style={{ fontSize: '0.875rem' }}
                iconPos="left"
              />
            </div>
          </div>
          <div className="flex align-items-center gap-4 text-sm">
            <span>
              <strong>Total Rows:</strong> {fields.length}
            </span>
            <span>
              <strong>Valid Trades:</strong> {validTradeCount}
            </span>
            <span>
              <strong>Drafts:</strong> {draftCount}
            </span>
            <span>
              <strong>Status:</strong>{' '}
              <span className={validTradeCount > 0 ? 'text-green-600' : 'text-orange-600'}>
                {validTradeCount > 0 ? 'Ready to Submit' : 'Needs Completion'}
              </span>
            </span>
          </div>
        </div>

        <TradeRecommendationGrid
          form={form}
          fields={fields}
          onRemoveRow={removeRow}
          onSaveDraft={handleSaveDraft}
        />
      </Card>

      {/* Trade History Section */}
      <Card className="mt-4">
        <div className="card-header">
          <h3 className="card-title">Trade History</h3>
        </div>

        <div className="mb-3">
          <p className="text-sm text-color-secondary m-0">
            View your submitted trade recommendations and their current status.
          </p>
        </div>
        
        <TradeHistoryTable 
          recommendations={tradeHistory || []} 
          loading={tradeHistoryLoading}
        />
      </Card>
    </div>
  );
};

export default TradeRecommendation;
