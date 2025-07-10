import { Trade } from '@/types';
import { Table, Badge } from '@/components/ui';
import { formatPercentage, formatDate, formatCurrency } from '@/utils/helpers';

interface TradeTableProps {
  trades: Trade[];
  onTradeClick?: (trade: Trade) => void;
  loading?: boolean;
}

export const TradeTable = ({ trades, onTradeClick, loading }: TradeTableProps) => {
  const columns = [
    {
      key: 'ticker',
      header: 'Ticker',
      render: (trade: Trade) => (
        <div className="flex flex-col">
          <span className="font-semibold">{trade.ticker}</span>
          <span className="text-sm text-gray-500">{trade.strategy}</span>
        </div>
      ),
    },
    {
      key: 'status',
      header: 'Status',
      render: (trade: Trade) => (
        <Badge
          variant={
            trade.status === 'Accepted'
              ? 'success'
              : trade.status === 'Rejected'
              ? 'danger'
              : 'warning'
          }
        >
          {trade.status}
        </Badge>
      ),
    },
    {
      key: 'conviction',
      header: 'Conviction',
      render: (trade: Trade) => (
        <Badge
          variant={
            trade.conviction === 'High'
              ? 'success'
              : trade.conviction === 'Medium'
              ? 'warning'
              : 'secondary'
          }
        >
          {trade.conviction}
        </Badge>
      ),
    },
    {
      key: 'targetPrice',
      header: 'Target Price',
      render: (trade: Trade) => formatCurrency(trade.targetPrice),
    },
    {
      key: 'positionSize',
      header: 'Position Size',
      render: (trade: Trade) => trade.positionSize.toLocaleString(),
    },
    {
      key: 'entryDate',
      header: 'Entry Date',
      render: (trade: Trade) => formatDate(trade.entryDate),
    },
    {
      key: 'pnl',
      header: 'P&L',
      render: (trade: Trade) => {
        const pnl = trade.positionStatus === 'Open' ? trade.pnl3m : trade.pnlAtClose;
        if (pnl === null) return <span className="text-gray-400">-</span>;
        
        return (
          <span className={pnl >= 0 ? 'text-green-600 font-semibold' : 'text-red-600 font-semibold'}>
            {formatPercentage(pnl)}
          </span>
        );
      },
    },
    {
      key: 'positionStatus',
      header: 'Position',
      render: (trade: Trade) => (
        <Badge
          variant={
            trade.positionStatus === 'Open'
              ? 'info'
              : trade.positionStatus === 'Closed'
              ? 'secondary'
              : 'default'
          }
        >
          {trade.positionStatus}
        </Badge>
      ),
    },
  ];

  return (
    <Table
      data={trades}
      columns={columns}
      onRowClick={onTradeClick}
      loading={loading}
      emptyMessage="No trades found"
      hoverable={!!onTradeClick}
    />
  );
};
