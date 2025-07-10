import { useMemo } from 'react';
import { useStrategies, useSecurities, useFunds } from '../../services/queries';

interface DropdownOption {
  label: string;
  value: string;
}

export const useStrategyOptions = () => {
  const { data: strategies, isLoading, error } = useStrategies();

  const options = useMemo(() => {
    return strategies?.map(strategy => ({
      label: strategy.name,
      value: strategy.name
    })) || [];
  }, [strategies]);

  return { options, isLoading, error };
};

export const useSecurityOptions = () => {
  const { data: securities, isLoading, error } = useSecurities();

  const options = useMemo(() => {
    return securities?.map(security => ({
      label: `${security.ticker} - ${security.name}`,
      value: security.ticker
    })) || [];
  }, [securities]);

  return { options, isLoading, error };
};

// Trade options (static data)
export const useTradeOptions = () => {
  const options: DropdownOption[] = [
    { label: 'Buy', value: 'Buy' },
    { label: 'Sell', value: 'Sell' },
    { label: 'Sell Short', value: 'Sell Short' },
    { label: 'Cover Short', value: 'Cover Short' }
  ];

  return { options };
};

export const useFundOptions = () => {
  const { data: funds, isLoading, error } = useFunds();

  const options = useMemo(() => {
    return funds?.map(fund => ({
      label: `${fund.code} - ${fund.name}`,
      value: fund.name
    })) || [];
  }, [funds]);

  return { options, isLoading, error };
};
