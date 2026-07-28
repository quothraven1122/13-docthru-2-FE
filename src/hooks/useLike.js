import { authApi, publicApi } from "@/services/fetchClient";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const defaultEndpoint = "/like";

async function getLikeCount(translationId) {
  return publicApi.get(`${defaultEndpoint}/${translationId}/count`);
}

async function getLikeStatus(translationId) {
  return authApi.get(`${defaultEndpoint}/${translationId}/status`);
}

async function toggleLike(translationId) {
  return authApi.post(defaultEndpoint, { translationId });
}

export function useLikeCount(translationId) {
  return useQuery({
    queryKey: ["likeCount", translationId],
    queryFn: () => getLikeCount(translationId),
    enabled: !!translationId,
  });
}

export function useLikeStatus(translationId, enabled) {
  return useQuery({
    queryKey: ["likeStatus", translationId],
    queryFn: () => getLikeStatus(translationId),
    enabled: !!translationId && enabled,
  });
}

export function useToggleLike(translationId) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => toggleLike(translationId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["likeCount", translationId] });
      queryClient.invalidateQueries({ queryKey: ["likeStatus", translationId] });
    },
  });
}
