// Example: How to use the new API integration in a component

import React from 'react';
import { useStrategies, useSecurities, useFunds } from '../queries';
import { RecommendationCreate } from '../../generated/api/models';

// Example component showing how to use the new hooks
export const ExampleApiUsage: React.FC = () => {
  // Fetch strategies (using new generated client)
  const { data: strategies, isLoading: strategiesLoading, error: strategiesError } = useStrategies();
  
  // Fetch funds
  const { data: funds, isLoading: fundsLoading, error: fundsError } = useFunds();
  
  // All securities (using new generated client)
  const { data: securities, isLoading: securitiesLoading } = useSecurities();

  // Example: Create a recommendation (simplified for demo)
  const createNewRecommendation = async () => {
    const newRecommendation: RecommendationCreate = {
      security_id: 1,
      trade_direction: 'BUY',
      current_price: { price: 140.00, currency: 'USD' },
      target_price: { price: 150.00, currency: 'USD' },
      time_horizon: 'SHORT',
      analyst_score: 85,
      notes: 'Expecting good performance this quarter'
    };
    
    try {
      // This would be implemented with the recommendation service
      console.log('Would create recommendation:', newRecommendation);
    } catch (error) {
      console.error('Failed to create recommendation:', error);
    }
  };

  return (
    <div>
      <h2>API Integration Example</h2>
      
      {/* Strategies */}
      <section>
        <h3>Strategies</h3>
        {strategiesLoading && <p>Loading strategies...</p>}
        {strategiesError && <p>Error: {strategiesError?.message}</p>}
        {strategies && (
          <ul>
            {strategies.map(strategy => (
              <li key={strategy.id}>
                {strategy.name} - {strategy.description}
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* Funds */}
      <section>
        <h3>Funds</h3>
        {fundsLoading && <p>Loading funds...</p>}
        {fundsError && <p>Error: {fundsError?.message}</p>}
        {funds && (
          <ul>
            {funds.map(fund => (
              <li key={fund.id}>
                {fund.code} - {fund.name}
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* All Securities */}
      <section>
        <h3>All Securities</h3>
        {securitiesLoading && <p>Loading securities...</p>}
        {securities && (
          <ul>
            {securities.slice(0, 10).map(security => (
              <li key={security.id}>
                {security.ticker} - {security.name}
              </li>
            ))}
          </ul>
        )}
      </section>

      <button onClick={createNewRecommendation}>
        Create Recommendation (Demo)
      </button>
    </div>
  );
};
