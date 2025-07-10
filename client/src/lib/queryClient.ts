import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: (failureCount, error) => {
        const axiosError = error as any;
        if (axiosError?.response?.status === 401) return false;
        if (axiosError?.response?.status >= 500) return failureCount < 2;
        return failureCount < 3;
      },
      refetchOnWindowFocus: false,
      staleTime: 5 * 60 * 1000,
      gcTime: 10 * 60 * 1000,
    },
    mutations: {
      retry: (failureCount, error) => {
        const axiosError = error as any;
        if (axiosError?.response?.status === 401) return false;
        return failureCount < 1;
      },
    },
  },
});
