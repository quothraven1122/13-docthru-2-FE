import likeService from "@/services/likeService";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export function useLikeCount(translationId) {
  return useQuery({
    queryKey: ["likeCount", translationId],
    queryFn: () => likeService.getLikeCount(translationId),
    enabled: !!translationId,
  });
}

export function useLikeStatus(translationId, enabled) {
  return useQuery({
    queryKey: ["likeStatus", translationId],
    queryFn: () => likeService.getLikeStatus(translationId),
    enabled: !!translationId && enabled,
  });
}

export function useToggleLike(translationId) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => likeService.toggleLike(translationId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["likeCount", translationId] });
      queryClient.invalidateQueries({ queryKey: ["likeStatus", translationId] });
    },
  });
}
