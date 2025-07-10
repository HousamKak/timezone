import { useState, useEffect } from 'react';
import { Card } from 'primereact/card';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Tag } from 'primereact/tag';
import { Button } from 'primereact/button';
import { tradeHistory } from '../../data/mockData';
import { Trade } from '../../types';

interface RecentTradeSubmissionsCardProps {
  onViewAllTrades?: () => void;
}

const RecentTradeSubmissionsCard = ({ onViewAllTrades }: RecentTradeSubmissionsCardProps) => {
  const [selectedTradeFilter, setSelectedTradeFilter] = useState('all');
  const [filteredTrades, setFilteredTrades] = useState<Trade[]>(tradeHistory.slice(0, 5));

  useEffect(() => {
    let filtered = tradeHistory.slice(0, 5);
    if (selectedTradeFilter === 'open') {
      filtered = tradeHistory.filter(t => t.positionStatus === 'Open').slice(0, 5);
    } else if (selectedTradeFilter === 'closed') {
      filtered = tradeHistory.filter(t => t.positionStatus === 'Closed').slice(0, 5);
    }
    setFilteredTrades(filtered);
  }, [selectedTradeFilter]);

  const statusBodyTemplate = (trade: Trade) => {
    let severity: "success" | "danger" | "warning" | "info" | "secondary" | null = null;
    
    switch (trade.status) {
      case 'Accepted': severity = 'success'; break;
      case 'Rejected': severity = 'danger'; break;
      case 'Pending': severity = 'warning'; break;
      default: severity = 'info'; break;
    }
    
    return <Tag value={trade.status} severity={severity} />;
  };

  const positionBodyTemplate = (trade: Trade) => {
    if (trade.positionStatus === 'Open') {
      return <Tag value="Open" severity="info" />;
    } else if (trade.positionStatus === 'Closed') {
      return <Tag value="Closed" severity="secondary" />;
    }
    return <span className="text-500 text-sm">—</span>;
  };
  const pnlBodyTemplate = (trade: Trade) => {
    if (trade.pnlAtClose !== null && trade.pnlAtClose !== undefined) {
      const isPositive = trade.pnlAtClose >= 0;
      return (
        <div className={`font-bold text-sm ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
          {isPositive ? '+' : ''}{trade.pnlAtClose.toFixed(1)}%
          <div className="text-xs text-600">(at close)</div>
        </div>
      );
    }
    return <span className="text-500 text-sm">—</span>;
  };

  const actionsBodyTemplate = (trade: Trade) => {
    if (trade.positionStatus === 'Open') {
      return (
        <Button 
          label="Close" 
          size="small" 
          className="p-button-sm"
        />
      );
    }
    return (
      <span className="text-500 text-sm">—</span>
    );
  };

  return (
    <Card>
      <div className="card-header">
        <h3 className="card-title">Recent Trade Submissions</h3>
        <div className="flex gap-1">
          <Button 
            label="All" 
            size="small" 
            className={selectedTradeFilter === 'all' ? '' : 'p-button-outlined p-button-secondary'}
            onClick={() => setSelectedTradeFilter('all')}
          />
          <Button 
            label="Open" 
            size="small" 
            className={selectedTradeFilter === 'open' ? '' : 'p-button-outlined p-button-secondary'}
            onClick={() => setSelectedTradeFilter('open')}
          />
          <Button 
            label="Closed" 
            size="small" 
            className={selectedTradeFilter === 'closed' ? '' : 'p-button-outlined p-button-secondary'}
            onClick={() => setSelectedTradeFilter('closed')}
          />
        </div>
      </div>
      
      <DataTable 
        value={filteredTrades} 
        size="small" 
        className="p-datatable-sm"
        showGridlines={false}
        stripedRows
      >
        <Column 
          field="ticker" 
          header="Ticker" 
          style={{ width: '80px', fontSize: '13px' }}
          body={(trade) => (
            <span className="font-bold text-primary">{trade.ticker}</span>
          )}
        />
        <Column 
          field="strategy" 
          header="Strategy" 
          style={{ fontSize: '12px' }}
        />
        <Column 
          field="targetPrice" 
          header="Target Price" 
          style={{ width: '100px', fontSize: '12px' }}
          body={(trade) => `$${trade.targetPrice}`}
        />
        <Column 
          field="entryDate" 
          header="Entry Date" 
          style={{ width: '100px', fontSize: '12px' }}
        />
        <Column 
          field="closeDate" 
          header="Close Date" 
          style={{ width: '100px', fontSize: '12px' }}
          body={(trade) => trade.closeDate || '—'}
        />
        <Column 
          field="status" 
          header="Status" 
          style={{ width: '90px' }}
          body={statusBodyTemplate}
        />
        <Column 
          field="positionStatus" 
          header="Position" 
          style={{ width: '80px' }}
          body={positionBodyTemplate}
        />
        <Column 
          field="pnlAtClose" 
          header="P&L" 
          style={{ width: '80px' }}
          body={pnlBodyTemplate}
        />
        <Column 
          field="actions" 
          header="Actions" 
          style={{ width: '80px' }}
          body={actionsBodyTemplate}
        />
      </DataTable>
      
      <div className="mt-3 text-center">
        <Button 
          label="View All Trades" 
          link 
          size="small"
          className="text-primary"
          onClick={onViewAllTrades}
        />
      </div>
    </Card>
  );
};

export default RecentTradeSubmissionsCard;
