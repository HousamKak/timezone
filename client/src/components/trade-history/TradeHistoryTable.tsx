import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Tag } from 'primereact/tag';
import { Button } from 'primereact/button';
import { formatDate } from '../../utils/helpers';
import { RecommendationResponse } from '../../generated/api/models';
import styles from './TradeHistoryTable.module.css';

interface TradeHistoryTableProps {
  recommendations: RecommendationResponse[];
  loading?: boolean;
}

export const TradeHistoryTable = ({ recommendations, loading }: TradeHistoryTableProps) => {
  const rowNumberTemplate = (_rowData: RecommendationResponse, options: any) => (
    <div className={styles.rowNumber}>
      {options.rowIndex + 1}
    </div>
  );

  const statusTemplate = (recommendation: RecommendationResponse) => {
    const getSeverity = (status: string) => {
      switch (status) {
        case 'Draft': return 'secondary';
        case 'Proposed': return 'warning';
        case 'Approved': return 'success';
        case 'Rejected': return 'danger';
        default: return 'info';
      }
    };

    return (
      <Tag 
        value={recommendation.status} 
        severity={getSeverity(recommendation.status || 'Draft')}
      />
    );
  };

  const tickerTemplate = (recommendation: RecommendationResponse) => (
    <div className={styles.securityInfo}>
      <span className={styles.securityTicker}>{recommendation.security?.ticker}</span>
      <span className={styles.securityName}>{recommendation.security?.name}</span>
    </div>
  );

  const tradeDirectionTemplate = (recommendation: RecommendationResponse) => {
    const getDirectionClass = (direction: string) => {
      switch (direction) {
        case 'Buy': return styles.buy;
        case 'Sell': return styles.sell;
        case 'Sell Short': return styles.sellShort;
        case 'Cover Short': return styles.coverShort;
        default: return '';
      }
    };

    return (
      <span className={`${styles.tradeDirection} ${getDirectionClass(recommendation.trade_direction || '')}`}>
        {recommendation.trade_direction}
      </span>
    );
  };

  const priceTemplate = (recommendation: RecommendationResponse) => {
    const currentPrice = recommendation.current_price ? parseFloat(recommendation.current_price) : null;
    const targetPrice = recommendation.target_price ? parseFloat(recommendation.target_price) : null;
    
    return (
      <div className={styles.priceInfo}>
        <div className={styles.currentPrice}>Current: ${currentPrice?.toFixed(2) || 'N/A'}</div>
        <div className={styles.targetPrice}>Target: ${targetPrice?.toFixed(2) || 'N/A'}</div>
      </div>
    );
  };

  const scoreTemplate = (recommendation: RecommendationResponse) => {
    const score = recommendation.analyst_score || 0;
    const getScoreClass = (score: number) => {
      if (score >= 8) return styles.high;
      if (score >= 6) return styles.medium;
      return styles.low;
    };

    return (
      <span className={`${styles.analystScore} ${getScoreClass(score)}`}>
        {score}/10
      </span>
    );
  };

  const strategiesTemplate = (recommendation: RecommendationResponse) => {
    const strategies = recommendation.strategies?.map(s => s.name).filter(Boolean);
    
    if (!strategies?.length) return <span className={styles.noDataText}>-</span>;
    
    return (
      <div className={styles.strategiesContainer}>
        {strategies.map((strategy, index) => (
          <Tag 
            key={index} 
            value={strategy} 
            severity="info"
          />
        ))}
        {strategies.length > 2 && (
          <Tag 
            value={`+${strategies.length - 2}`} 
            severity="secondary"
          />
        )}
      </div>
    );
  };

  const fundsTemplate = (recommendation: RecommendationResponse) => {
    const funds = (recommendation as any).funds;
    
    if (!funds?.length) return <span className={styles.noDataText}>-</span>;
    
    return (
      <div className={styles.strategiesContainer}>
        {funds.map((fund: string, index: number) => (
          <Tag 
            key={index} 
            value={fund} 
            severity="secondary"
          />
        ))}
        {funds.length > 2 && (
          <Tag 
            value={`+${funds.length - 2}`} 
            severity="secondary"
          />
        )}
      </div>
    );
  };

  const notesTemplate = (recommendation: RecommendationResponse) => {
    const notes = recommendation.notes;
    if (!notes) return <span className={styles.noDataText}>-</span>;
    
    const truncatedNotes = notes.length > 60 ? `${notes.substring(0, 60)}...` : notes;
    
    return (
      <div>
        <span 
          title={notes}
          className="cursor-help"
        >
          {truncatedNotes}
        </span>
      </div>
    );
  };

  const dateTemplate = (recommendation: RecommendationResponse) => (
    <div className={styles.priceInfo}>
      <div>{formatDate(recommendation.expected_exit_date || '')}</div>
      <div className={styles.targetPrice}>{recommendation.time_horizon}</div>
    </div>
  );

  const actionsTemplate = (recommendation: RecommendationResponse) => {
    const isDraft = recommendation.status === 'Draft';
    
    return (
      <div className="flex gap-1">
        <Button 
          icon="pi pi-eye" 
          size="small"
          text
          severity="info"
          tooltip="View Details"
          tooltipOptions={{ position: 'top' }}
        />
        {isDraft && (
          <Button 
            icon="pi pi-pencil" 
            size="small"
            text
            severity="warning"
            tooltip="Edit"
            tooltipOptions={{ position: 'top' }}
          />
        )}
      </div>
    );
  };

  return (
    <div className={styles.tableContainer}>
      <DataTable
        value={recommendations}
        loading={loading}
        showGridlines
        size="small"
        scrollable
        scrollHeight="400px"
        className={`${styles.compactTable} p-datatable-sm`}
        emptyMessage="No trade history found"
        paginator
        rows={10}
        rowsPerPageOptions={[5, 10, 20]}
        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
        currentPageReportTemplate="Showing {first} to {last} of {totalRecords} trades"
        sortMode="multiple"
        removableSort
        resizableColumns
      >
        <Column 
          field="rowNumber" 
          header="#" 
          body={rowNumberTemplate}
          style={{ width: '50px', textAlign: 'center' }}
          frozen
        />
        <Column 
          field="security.ticker" 
          header="Security" 
          body={tickerTemplate}
          sortable
          style={{ width: '120px' }}
        />
        <Column 
          field="trade_direction" 
          header="Direction" 
          body={tradeDirectionTemplate}
          sortable
          style={{ width: '100px' }}
        />
        <Column 
          field="current_price" 
          header="Prices" 
          body={priceTemplate}
          style={{ width: '120px' }}
        />
        <Column 
          field="analyst_score" 
          header="Score" 
          body={scoreTemplate}
          sortable
          style={{ width: '70px', textAlign: 'center' }}
        />
        <Column 
          field="strategies" 
          header="Strategies" 
          body={strategiesTemplate}
          style={{ width: '180px' }}
        />
        <Column 
          field="funds" 
          header="Funds" 
          body={fundsTemplate}
          style={{ width: '180px' }}
        />
        <Column 
          field="notes" 
          header="Notes" 
          body={notesTemplate}
          style={{ width: '100px' }}
        />
        <Column 
          field="status" 
          header="Status" 
          body={statusTemplate}
          sortable
          style={{ width: '90px' }}
        />
        <Column 
          field="created_at" 
          header="Date" 
          body={dateTemplate}
          sortable
          style={{ width: '110px' }}
        />
        <Column 
          field="actions" 
          header="Actions" 
          body={actionsTemplate}
          exportable={false}
          style={{ width: '80px', textAlign: 'center' }}
        />
      </DataTable>
    </div>
  );
};
