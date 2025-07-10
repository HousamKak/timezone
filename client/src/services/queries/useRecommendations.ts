import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { RecommendationService } from '../api/recommendations';
import { 
  RecommendationCreate,
  RecommendationUpdate 
} from '../../generated/api/models';

export const recommendationKeys = {
  all: ['recommendations'] as const,
  lists: () => [...recommendationKeys.all, 'list'] as const,
  list: (filters: string) => [...recommendationKeys.lists(), { filters }] as const,
  details: () => [...recommendationKeys.all, 'detail'] as const,
  detail: (id: number) => [...recommendationKeys.details(), id] as const,
  drafts: () => [...recommendationKeys.all, 'drafts'] as const,
};

export const useRecommendations = () => {
  return useQuery({
    queryKey: recommendationKeys.lists(),
    queryFn: RecommendationService.getRecommendations,
    staleTime: 1 * 60 * 1000,
    gcTime: 5 * 60 * 1000,
    retry: 3,
    refetchOnWindowFocus: true,
  });
};

export const useDraftRecommendations = () => {
  return useQuery({
    queryKey: recommendationKeys.drafts(),
    queryFn: RecommendationService.getDraftRecommendations,
    staleTime: 30 * 1000,
    gcTime: 2 * 60 * 1000,
    retry: 3,
    refetchOnWindowFocus: true,
  });
};

export const useRecommendation = (id: number) => {
  return useQuery({
    queryKey: recommendationKeys.detail(id),
    queryFn: () => RecommendationService.getRecommendation(id),
    enabled: !!id && id > 0,
    staleTime: 1 * 60 * 1000,
    gcTime: 5 * 60 * 1000,
    retry: 3,
    refetchOnWindowFocus: true,
  });
};

export const useCreateRecommendation = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (data: RecommendationCreate) => RecommendationService.createRecommendation(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: recommendationKeys.lists() });
      queryClient.invalidateQueries({ queryKey: recommendationKeys.drafts() });
    },
  });
};

export const useUpdateRecommendation = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: RecommendationUpdate }) => 
      RecommendationService.updateRecommendation(id, data),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: recommendationKeys.lists() });
      queryClient.invalidateQueries({ queryKey: recommendationKeys.drafts() });
      queryClient.invalidateQueries({ queryKey: recommendationKeys.detail(data.id) });
    },
  });
};

export const useDeleteRecommendation = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (id: number) => RecommendationService.deleteRecommendation(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: recommendationKeys.lists() });
      queryClient.invalidateQueries({ queryKey: recommendationKeys.drafts() });
    },
  });
};
