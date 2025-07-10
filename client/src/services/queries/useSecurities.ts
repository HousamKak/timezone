import { useQuery } from '@tanstack/react-query';
import { SecurityService } from '../api/securities';

export const securityKeys = {
  all: ['securities'] as const,
  lists: () => [...securityKeys.all, 'list'] as const,
  list: (filters: string) => [...securityKeys.lists(), { filters }] as const,
  details: () => [...securityKeys.all, 'detail'] as const,
  detail: (id: number) => [...securityKeys.details(), id] as const,
  search: (query: string) => [...securityKeys.all, 'search', query] as const,
};

export const useSecurities = () => {
  return useQuery({
    queryKey: securityKeys.lists(),
    queryFn: SecurityService.getSecurities,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    retry: 3,
    refetchOnWindowFocus: false,
  });
};

export const useSecurity = (id: number) => {
  return useQuery({
    queryKey: securityKeys.detail(id),
    queryFn: () => SecurityService.getSecurity(id),
    enabled: !!id && id > 0,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    retry: 3,
    refetchOnWindowFocus: false,
  });
};

export const useSearchSecurities = (query: string) => {
  return useQuery({
    queryKey: securityKeys.search(query),
    queryFn: () => SecurityService.searchSecurities(query),
    enabled: !!query && query.trim().length > 0,
    staleTime: 2 * 60 * 1000,
    gcTime: 5 * 60 * 1000,
    retry: 3,
    refetchOnWindowFocus: false,
  });
};
