import React from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { UseFormReturn, FieldArrayWithId } from 'react-hook-form';
import { TradeEntryForm } from '../../schemas/tradeEntry';
import {
  TickerCellTemplate,
  TradeCellTemplate,
  StrategyCellTemplate,
  FundsCellTemplate,
  CurrentPriceCellTemplate,
  TargetPriceCellTemplate,
  ExpectedExitCellTemplate,
  FilesCellTemplate,
  ActionsCellTemplate2
} from './GridCellTemplates';
import styles from './TradeGrid.module.css';

interface TradeRecommendationGridProps {
  form: UseFormReturn<{ trades: TradeEntryForm[] }>;
  fields: FieldArrayWithId<{ trades: TradeEntryForm[] }, 'trades'>[];
  onRemoveRow: (index: number) => void;
  onSaveDraft: (index: number) => void;
}

export const TradeRecommendationGrid: React.FC<TradeRecommendationGridProps> = ({
  form,
  fields,
  onRemoveRow,
  onSaveDraft
}) => {
  const { control } = form;
  const watchedTrades = form.watch('trades');

  const rowNumberTemplate = (_rowData: any, options: any) => (
    <div className={styles.rowNumber}>
      {options.rowIndex + 1}
    </div>
  );

  const tickerTemplate = (_rowData: any, options: any) => (
    <TickerCellTemplate control={control} rowIndex={options.rowIndex} />
  );

  const tradeTemplate = (_rowData: any, options: any) => (
    <TradeCellTemplate control={control} rowIndex={options.rowIndex} />
  );

  const strategyTemplate = (_rowData: any, options: any) => (
    <StrategyCellTemplate control={control} rowIndex={options.rowIndex} />
  );

  const fundsTemplate = (_rowData: any, options: any) => (
    <FundsCellTemplate control={control} rowIndex={options.rowIndex} />
  );

  const currentPriceTemplate = (_rowData: any, options: any) => (
    <CurrentPriceCellTemplate control={control} rowIndex={options.rowIndex} />
  );

  const targetPriceTemplate = (_rowData: any, options: any) => (
    <TargetPriceCellTemplate control={control} rowIndex={options.rowIndex} />
  );

  const expectedExitTemplate = (_rowData: any, options: any) => (
    <ExpectedExitCellTemplate control={control} rowIndex={options.rowIndex} />
  );

  const filesTemplate = (_rowData: any, options: any) => (
    <FilesCellTemplate control={control} rowIndex={options.rowIndex} />
  );

  const actionsTemplate = (_rowData: any, options: any) => {
    const rowIndex = options.rowIndex;
    const isDraft = watchedTrades[rowIndex]?.isDraft || false;
    
    return (
      <ActionsCellTemplate2 
        onRemoveRow={onRemoveRow} 
        onSaveDraft={onSaveDraft} 
        rowIndex={rowIndex} 
        isDraft={isDraft}
      />
    );
  };

  return (
    <div className={`${styles.tableContainer} ${styles.paginatorDropdownSpacing}`}>
      <DataTable
        value={fields}
        showGridlines
        size="small"
        scrollable
        scrollHeight="400px"
        className={`${styles.compactTable} p-datatable-sm`}
        resizableColumns
        paginator
        rows={10}
        rowsPerPageOptions={[5, 10, 20]}
        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
        currentPageReportTemplate="Showing {first} to {last} of {totalRecords} rows"
      >
      <Column
        field="rowNumber"
        header="#"
        body={rowNumberTemplate}
        style={{ width: '50px', textAlign: 'center' }}
        frozen
      />
      <Column
        field="ticker"
        header="Ticker *"
        body={tickerTemplate}
        style={{ width: '120px' }}
      />
      <Column
        field="trade"
        header="Trade"
        body={tradeTemplate}
        style={{ width: '100px' }}
      />
      <Column
        field="strategy"
        header="Strategy *"
        body={strategyTemplate}
        style={{ width: '180px' }}
      />
      <Column
        field="funds"
        header="Funds *"
        body={fundsTemplate}
        style={{ width: '180px' }}
      />
      <Column
        field="currentPrice"
        header="Current Price"
        body={currentPriceTemplate}
        style={{ width: '110px', textAlign: 'center' }}
      />
      <Column
        field="targetPrice"
        header="Target Price *"
        body={targetPriceTemplate}
        style={{ width: '110px' }}
      />
      <Column
        field="expectedExit"
        header="Expected Exit"
        body={expectedExitTemplate}
        style={{ width: '140px' }}
      />
      <Column
        field="files"
        header="Files"
        body={filesTemplate}
        style={{ width: '80px', textAlign: 'center' }}
      />
      <Column
        field="actions"
        header="Actions"
        body={actionsTemplate}
        style={{ width: '100px', textAlign: 'center' }}
      />
    </DataTable>
    </div>
  );
};
