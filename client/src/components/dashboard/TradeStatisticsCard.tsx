import { Card } from 'primereact/card';
import { currentUser } from '../../data/mockData';

interface TradeStatisticsCardProps {
  totalTrades: number;
  acceptedTrades: number;
  openPositions: number;
  closedPositions: number;
}

const TradeStatisticsCard = ({ 
  totalTrades, 
  acceptedTrades, 
  openPositions, 
  closedPositions 
}: TradeStatisticsCardProps) => {
  return (
    <Card className="h-full">
      <div className="card-header">
        <h3 className="card-title">Trade Statistics</h3>
      </div>
      
      <div className="grid m-0">
        <div className="col-6 p-2">
          <div className="text-center">
            <div className="text-600 text-xs mb-1">Total Trades</div>
            <div className="text-xl font-bold text-900">{totalTrades}</div>
          </div>
        </div>
        <div className="col-6 p-2">
          <div className="text-center">
            <div className="text-600 text-xs mb-1">Accepted</div>
            <div className="text-xl font-bold text-green-600">{acceptedTrades}</div>
          </div>
        </div>
        <div className="col-6 p-2">
          <div className="text-center">
            <div className="text-600 text-xs mb-1">Open</div>
            <div className="text-xl font-bold text-orange-600">{openPositions}</div>
          </div>
        </div>
        <div className="col-6 p-2">
          <div className="text-center">
            <div className="text-600 text-xs mb-1">Closed</div>
            <div className="text-xl font-bold text-blue-600">{closedPositions}</div>
          </div>
        </div>
      </div>
      
      <div className="mt-3 p-3 surface-50 border-round-sm">
        <div className="flex justify-content-between align-items-center mb-2">
          <div>
            <div className="text-xs text-600">Best Trade</div>
            <div className="font-bold text-sm">{currentUser.performance.bestTrade.ticker}</div>
          </div>
          <div className="text-green-600 font-bold text-sm">+{currentUser.performance.bestTrade.pnl}%</div>
        </div>
        <div className="flex justify-content-between align-items-center">
          <div>
            <div className="text-xs text-600">Worst Trade</div>
            <div className="font-bold text-sm">{currentUser.performance.worstTrade.ticker}</div>
          </div>
          <div className="text-red-600 font-bold text-sm">{currentUser.performance.worstTrade.pnl}%</div>
        </div>
      </div>
    </Card>
  );
};

export default TradeStatisticsCard;
