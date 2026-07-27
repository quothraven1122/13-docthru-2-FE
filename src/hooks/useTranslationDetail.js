import { publicApi } from "@/services/fetchClient";
import { useQuery } from "@tanstack/react-query";

const defaultEndpoint = "/translation";

async function getTranslationById(translationId) {
  return publicApi.get(`${defaultEndpoint}/${translationId}`);
}

export function useTranslationDetail(translationId) {
  return useQuery({
    queryKey: ["translation", translationId],
    queryFn: () => getTranslationById(translationId),
    enabled: !!translationId,
  });
}
