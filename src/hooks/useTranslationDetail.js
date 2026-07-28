"use client";
import { publicApi } from "@/services/fetchClient";
import translationService from "@/services/translationService";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

const defaultEndpoint = "/translation";

async function getTranslationById(translationId) {
  return publicApi.get(`${defaultEndpoint}/${translationId}`);
}

export function useDeleteTranslation(translationId, challengeId) {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => translationService.quitTranslation(translationId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["translations", challengeId] });
      router.replace(`/challenges/${challengeId}`);
    },
  });
}

export function useTranslationDetail(translationId) {
  return useQuery({
    queryKey: ["translation", translationId],
    queryFn: () => getTranslationById(translationId),
    enabled: !!translationId,
  });
}
