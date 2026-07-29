import { authApi, publicApi } from "@/services/fetchClient";
import { useInfiniteQuery, useMutation, useQueryClient } from "@tanstack/react-query";

const defaultEndpoint = "/review";
const PAGE_SIZE = 3;

async function getReviews(translationId, cursor) {
  const params = new URLSearchParams({ translationId, take: String(PAGE_SIZE) });
  if (cursor) params.set("cursor", cursor);
  return publicApi.get(`${defaultEndpoint}?${params.toString()}`);
}

async function createReview({ translationId, content }) {
  return authApi.post(defaultEndpoint, { translationId, content });
}

async function updateReview({ reviewId, content }) {
  return authApi.patch(`${defaultEndpoint}/${reviewId}`, { content });
}

async function deleteReview(reviewId) {
  return authApi.delete(`${defaultEndpoint}/${reviewId}`);
}

export function useReviews(translationId) {
  return useInfiniteQuery({
    queryKey: ["reviews", translationId],
    queryFn: ({ pageParam }) => getReviews(translationId, pageParam),
    initialPageParam: undefined,
    getNextPageParam: (lastPage) => (lastPage.length === PAGE_SIZE ? lastPage.at(-1).id : undefined),
    enabled: !!translationId,
  });
}

export function useCreateReview(translationId) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (content) => createReview({ translationId, content }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reviews", translationId] });
    },
  });
}

export function useUpdateReview(translationId) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ reviewId, content }) => updateReview({ reviewId, content }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reviews", translationId] });
    },
  });
}

export function useDeleteReview(translationId) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (reviewId) => deleteReview(reviewId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reviews", translationId] });
    },
  });
}
