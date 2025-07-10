import { Card } from 'primereact/card';
import { currentUser } from '../../data/mockData';

const PerformanceSummaryCard = () => {
  return (
    <Card className="h-full">
      <div className="card-header">
        <h3 className="card-title">Performance Summary</h3>
      </div>
      
      <div className="grid m-0">
        <div className="col-6 md:col-3 p-2">
          <div className="text-center">
            <div className="text-600 text-xs mb-1">YTD Return</div>
            <div className={`text-xl font-bold ${currentUser.performance.ytd >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {currentUser.performance.ytd.toFixed(2)}%
            </div>
          </div>
        </div>
        <div className="col-6 md:col-3 p-2">
          <div className="text-center">
            <div className="text-600 text-xs mb-1">FYTD Return</div>
            <div className={`text-xl font-bold ${currentUser.performance.fytd >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {currentUser.performance.fytd.toFixed(2)}%
            </div>
          </div>
        </div>
        <div className="col-6 md:col-3 p-2">
          <div className="text-center">
            <div className="text-600 text-xs mb-1">Hit Rate</div>
            <div className="text-xl font-bold text-900">
              {currentUser.performance.hitRate.toFixed(1)}%
            </div>
          </div>
        </div>
        <div className="col-6 md:col-3 p-2">
          <div className="text-center">
            <div className="text-600 text-xs mb-1">Win/Loss Ratio</div>
            <div className="text-xl font-bold text-900">
              {currentUser.performance.winLoss.toFixed(2)}
            </div>
          </div>
        </div>        <div className="col-6 md:col-3 p-2">
          <div className="text-center">
            <div className="text-600 text-xs mb-1">Sharpe Ratio</div>
            <div className="text-xl font-bold text-900">
              {currentUser.performance.sharpeRatio.toFixed(2)}
            </div>
          </div>
        </div>
        <div className="col-6 md:col-3 p-2">
          <div className="text-center">
            <div className="text-600 text-xs mb-1">Sortino Ratio</div>
            <div className="text-xl font-bold text-900">
              {currentUser.performance.sortino.toFixed(2)}
            </div>
          </div>
        </div>
        <div className="col-6 md:col-3 p-2">
          <div className="text-center">
            <div className="text-600 text-xs mb-1">Max Drawdown</div>
            <div className="text-xl font-bold text-red-600">
              {currentUser.performance.maxDrawdown.toFixed(2)}%
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default PerformanceSummaryCard;
