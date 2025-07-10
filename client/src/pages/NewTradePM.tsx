import React from 'react';
import { Card } from 'primereact/card';
import { TradeRequestsTable } from '../components/trade-requests/TradeRequestsTable';
import { usePendingTrades } from '../hooks/data/usePendingTrades';

const NewTradePM: React.FC = () => {
  const { trades, loading } = usePendingTrades();

  const handleApprove = (_id: number) => {
    // Action handled in TradeRequestsTable
  };

  const handleReject = (_id: number) => {
    // Action handled in TradeRequestsTable
  };

  return (
    <div className="dashboard-container">
      <Card>
        <div className="card-header">
          <h3 className="card-title">Trade Requests</h3>
        </div>

        <div className="mb-3">
          <p className="text-sm text-color-secondary m-0">
            Review and approve trade recommendations from analysts. Click Approve or Reject to process each request.
          </p>
          <div className="flex align-items-center gap-4 text-sm mt-2">
            <span>
              <strong>Pending Requests:</strong> {trades?.length || 0}
            </span>
            <span>
              <strong>Status:</strong>{' '}
              <span className={trades?.length ? 'text-orange-600' : 'text-gray-600'}>
                {trades?.length ? 'Requires Review' : 'No Pending Requests'}
              </span>
            </span>
          </div>
        </div>

        <TradeRequestsTable 
          recommendations={trades || []}
          loading={loading}
          onApprove={handleApprove}
          onReject={handleReject}
        />
      </Card>
    </div>
  );
};

export default NewTradePM;
