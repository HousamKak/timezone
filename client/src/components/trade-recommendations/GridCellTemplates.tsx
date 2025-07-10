import React from 'react';
import { Dropdown } from 'primereact/dropdown';
import { MultiSelect } from 'primereact/multiselect';
import { InputNumber } from 'primereact/inputnumber';
import { Calendar } from 'primereact/calendar';
import { Button } from 'primereact/button';
import { Tag } from 'primereact/tag';
import { Controller, Control } from 'react-hook-form';
import { TradeEntry } from '../../types';
import { TradeEntryForm } from '../../schemas/tradeEntry';
import { useStrategyOptions, useSecurityOptions, useTradeOptions, useFundOptions } from '../../hooks/data/useFormDataMappings';

interface CellEditorProps {
  value: any;
  onChange: (value: any) => void;
  options?: { label: string; value: string }[];
  rowData?: TradeEntry;
  field?: string;
  error?: string;
  hasError?: boolean;
}

export const TickerCellEditor: React.FC<CellEditorProps> = ({ value, onChange, error, hasError }) => {
  const { options, isLoading } = useSecurityOptions();

  return (
    <Dropdown
      value={value}
      options={options}
      onChange={(e) => onChange(e.value)}
      placeholder="Select Ticker"
      filter
      loading={isLoading}
      showClear={false}
      emptyFilterMessage="No securities found"
      className={hasError ? 'p-invalid' : ''}
      tooltip={error}
      tooltipOptions={{ position: 'top' }}
    />
  );
};

export const TradeCellEditor: React.FC<CellEditorProps> = ({ value, onChange, error, hasError }) => {
  const { options } = useTradeOptions();
  
  return (
    <Dropdown
      value={value}
      options={options}
      onChange={(e) => onChange(e.value)}
      placeholder="Select Trade"
      showClear={false}
      className={hasError ? 'p-invalid' : ''}
      tooltip={error}
      tooltipOptions={{ position: 'top' }}
    />
  );
};

export const StrategyCellEditor: React.FC<CellEditorProps> = ({ value, onChange, error, hasError }) => {
  const { options, isLoading } = useStrategyOptions();

  return (
    <MultiSelect
      value={value}
      options={options}
      onChange={(e) => onChange(e.value)}
      placeholder="Select Strategies"
      display="chip"
      showSelectAll={false}
      maxSelectedLabels={2}
      loading={isLoading}
      className={hasError ? 'p-invalid' : ''}
      tooltip={error}
      tooltipOptions={{ position: 'top' }}
    />
  );
};

export const FundsCellEditor: React.FC<CellEditorProps> = ({ value, onChange, error, hasError }) => {
  const { options, isLoading } = useFundOptions();

  return (
    <MultiSelect
      value={value}
      options={options}
      onChange={(e) => onChange(e.value)}
      placeholder="Select Funds"
      display="chip"
      showSelectAll={false}
      maxSelectedLabels={2}
      loading={isLoading}
      className={hasError ? 'p-invalid' : ''}
      tooltip={error}
      tooltipOptions={{ position: 'top' }}
    />
  );
};

export const PriceCellEditor: React.FC<CellEditorProps> = ({ value, onChange, error, hasError }) => (
  <InputNumber
    value={value}
    onValueChange={(e) => onChange(e.value)}
    mode="currency"
    currency="USD"
    locale="en-US"
    currencyDisplay="symbol"
    minFractionDigits={2}
    maxFractionDigits={2}
    placeholder="$0.00"
    className={`target-price-input ${hasError ? 'p-invalid' : ''}`}
    tooltip={error}
    tooltipOptions={{ position: 'top' }}
  />
);

export const DateCellEditor: React.FC<CellEditorProps> = ({ value, onChange, error, hasError }) => (
  <Calendar
    value={value}
    onChange={(e) => onChange(e.value)}
    placeholder="mm/dd/yyyy"
    showIcon
    dateFormat="mm/dd/yy"
    className={`date-picker-input ${hasError ? 'p-invalid' : ''}`}
    tooltip={error}
    tooltipOptions={{ position: 'top' }}
  />
);

export const FileCellEditor: React.FC<CellEditorProps> = ({ value = [], onChange }) => {
  const fileCount = Array.isArray(value) ? value.length : 0;
  
  const handleFileSelect = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.multiple = true;
    input.onchange = (e) => {
      const files = Array.from((e.target as HTMLInputElement).files || []);
      const currentFiles = Array.isArray(value) ? value : [];
      onChange([...currentFiles, ...files]);
    };
    input.click();
  };
  
  return (
    <div className="flex align-items-center" style={{ gap: '0.25rem' }}>
      <Button
        icon="pi pi-paperclip"
        className="p-button-text p-button-sm"
        onClick={handleFileSelect}
        tooltip="Attach files"
        tooltipOptions={{ position: 'top' }}
        type="button"
      />
      <span style={{ fontSize: '12px', fontWeight: '500' }}>
        {fileCount}
      </span>
    </div>
  );
};

// ===== COMPLETE CELL TEMPLATES (WITH CONTROLLER) =====

interface CellTemplateProps {
  control: Control<{ trades: TradeEntryForm[] }>;
  rowIndex: number;
  onRemoveRow?: (index: number) => void;
}

export const TickerCellTemplate: React.FC<CellTemplateProps> = ({ control, rowIndex }) => {
  const fieldName = `trades.${rowIndex}.ticker` as const;
  
  return (
    <Controller
      name={fieldName}
      control={control}
      render={({ field, fieldState }) => (
        <TickerCellEditor
          value={field.value}
          onChange={field.onChange}
          error={fieldState.error?.message}
          hasError={!!fieldState.error}
        />
      )}
    />
  );
};

export const TradeCellTemplate: React.FC<CellTemplateProps> = ({ control, rowIndex }) => {
  const fieldName = `trades.${rowIndex}.trade` as const;
  
  return (
    <Controller
      name={fieldName}
      control={control}
      render={({ field, fieldState }) => (
        <TradeCellEditor
          value={field.value}
          onChange={field.onChange}
          error={fieldState.error?.message}
          hasError={!!fieldState.error}
        />
      )}
    />
  );
};

export const StrategyCellTemplate: React.FC<CellTemplateProps> = ({ control, rowIndex }) => {
  const fieldName = `trades.${rowIndex}.strategy` as const;
  
  return (
    <Controller
      name={fieldName}
      control={control}
      render={({ field, fieldState }) => (
        <StrategyCellEditor
          value={field.value}
          onChange={field.onChange}
          error={fieldState.error?.message}
          hasError={!!fieldState.error}
        />
      )}
    />
  );
};

export const FundsCellTemplate: React.FC<CellTemplateProps> = ({ control, rowIndex }) => {
  const fieldName = `trades.${rowIndex}.funds` as const;
  
  return (
    <Controller
      name={fieldName}
      control={control}
      render={({ field, fieldState }) => (
        <FundsCellEditor
          value={field.value}
          onChange={field.onChange}
          error={fieldState.error?.message}
          hasError={!!fieldState.error}
        />
      )}
    />
  );
};

export const CurrentPriceCellTemplate: React.FC<CellTemplateProps> = ({ control, rowIndex }) => {
  const fieldName = `trades.${rowIndex}.currentPrice` as const;
  
  return (
    <Controller
      name={fieldName}
      control={control}
      render={({ field, fieldState }) => (
        <PriceCellEditor
          value={field.value}
          onChange={field.onChange}
          error={fieldState.error?.message}
          hasError={!!fieldState.error}
        />
      )}
    />
  );
};

export const TargetPriceCellTemplate: React.FC<CellTemplateProps> = ({ control, rowIndex }) => {
  const fieldName = `trades.${rowIndex}.targetPrice` as const;
  
  return (
    <Controller
      name={fieldName}
      control={control}
      render={({ field, fieldState }) => (
        <PriceCellEditor
          value={field.value}
          onChange={field.onChange}
          error={fieldState.error?.message}
          hasError={!!fieldState.error}
        />
      )}
    />
  );
};

export const ExpectedExitCellTemplate: React.FC<CellTemplateProps> = ({ control, rowIndex }) => {
  const fieldName = `trades.${rowIndex}.expectedExit` as const;
  
  return (
    <Controller
      name={fieldName}
      control={control}
      render={({ field, fieldState }) => (
        <DateCellEditor
          value={field.value}
          onChange={field.onChange}
          error={fieldState.error?.message}
          hasError={!!fieldState.error}
        />
      )}
    />
  );
};

export const FilesCellTemplate: React.FC<CellTemplateProps> = ({ control, rowIndex }) => (
  <Controller
    name={`trades.${rowIndex}.files`}
    control={control}
    render={({ field }) => (
      <FileCellEditor
        value={field.value}
        onChange={field.onChange}
      />
    )}
  />
);

export const ActionsCellTemplate2: React.FC<{ onRemoveRow: (index: number) => void; onSaveDraft: (index: number) => void; rowIndex: number; isDraft?: boolean }> = ({ onRemoveRow, onSaveDraft, rowIndex, isDraft }) => (
  <div className="flex justify-content-center" style={{ gap: '0.25rem' }}>
    {isDraft ? (
      <Tag 
        value="Draft" 
        severity="warning"
        style={{ fontSize: '0.75rem' }}
      />
    ) : (
      <Button
        icon="pi pi-save"
        className="p-button-text p-button-sm p-button-success"
        onClick={() => onSaveDraft(rowIndex)}
        tooltip="Save as Draft"
        tooltipOptions={{ position: 'top' }}
        type="button"
      />
    )}
    <Button
      icon="pi pi-trash"
      className="p-button-text p-button-sm p-button-danger"
      onClick={() => onRemoveRow(rowIndex)}
      tooltip="Remove Row"
      tooltipOptions={{ position: 'top' }}
      type="button"
    />
  </div>
);
