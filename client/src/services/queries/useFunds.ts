import { useQuery } from '@tanstack/react-query';
import { FundService } from '../api/funds';

export const fundKeys = {
  all: ['funds'] as const,
  lists: () => [...fundKeys.all, 'list'] as const,
  list: (filters: string) => [...fundKeys.lists(), { filters }] as const,
  details: () => [...fundKeys.all, 'detail'] as const,
  detail: (id: number) => [...fundKeys.details(), id] as const,
  byCode: (code: string) => [...fundKeys.all, 'byCode', code] as const,
};

export const useFunds = () => {
  return useQuery({
    queryKey: fundKeys.lists(),
    queryFn: FundService.getFunds,
    staleTime: 10 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
    retry: 3,
    refetchOnWindowFocus: false,
  });
};

export const useFund = (id: number) => {
  return useQuery({
    queryKey: fundKeys.detail(id),
    queryFn: () => FundService.getFund(id),
    enabled: !!id && id > 0,
    staleTime: 10 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
    retry: 3,
    refetchOnWindowFocus: false,
  });
};

export const useFundByCode = (code: string) => {
  return useQuery({
    queryKey: fundKeys.byCode(code),
    queryFn: () => FundService.getFundByCode(code),
    enabled: !!code && code.trim().length > 0,
    staleTime: 10 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
    retry: 3,
    refetchOnWindowFocus: false,
  });
};
