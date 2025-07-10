import { useQuery } from '@tanstack/react-query';
import { StrategyService } from '../api/strategies';

export const strategyKeys = {
  all: ['strategies'] as const,
  lists: () => [...strategyKeys.all, 'list'] as const,
  list: (filters: string) => [...strategyKeys.lists(), { filters }] as const,
  details: () => [...strategyKeys.all, 'detail'] as const,
  detail: (id: number) => [...strategyKeys.details(), id] as const,
};

export const useStrategies = () => {
  return useQuery({
    queryKey: strategyKeys.lists(),
    queryFn: StrategyService.getStrategies,
    staleTime: 10 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
    retry: 3,
    refetchOnWindowFocus: false,
  });
};

export const useStrategy = (id: number) => {
  return useQuery({
    queryKey: strategyKeys.detail(id),
    queryFn: () => StrategyService.getStrategy(id),
    enabled: !!id && id > 0,
    staleTime: 10 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
    retry: 3,
    refetchOnWindowFocus: false,
  });
};
