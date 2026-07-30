"use client";
import { useEffect } from "react";
import { useParams, useRouter, usePathname } from "next/navigation";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import translationService from "@/services/translationService";

// editor이 비었을 시의 초기 상태
const EMPTY_DRAFT = {
  json: {
    type: "doc",
    content: [],
  },
  text: "",
};

export default function useTranslationEditor() {
  const { translationId } = useParams();
  const router = useRouter();
  const pathname = usePathname();
  const queryClient = useQueryClient();

  const previousPath = pathname.replace(/\/[^/]+$/, "");
  const errorPath = pathname.replace(/\/[^/]+\/[^/]+\/[^/]+$/, "");

  //번역글 조회
  const { data: translationData, isError } = useQuery({
    queryKey: ["translation", translationId],
    queryFn: () => translationService.getTranslationDetail(translationId),
  });
  //번역글 수정
  const { mutate: editTranslation } = useMutation({
    mutationFn: (stringifiedContent) => translationService.updateTranslation(translationId, stringifiedContent),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["translation", translationId] });
      router.push(previousPath);
    },
  });
  //번역글 포기
  const { mutate: quitTranslation } = useMutation({
    mutationFn: () => translationService.quitTranslation(translationId),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["translation", translationId] });
      router.replace(errorPath);
    },
  });
  //번역글 파싱
  function parseTranslation(content) {
    try {
      const parsed = JSON.parse(content);

      if (!parsed?.json || parsed.json.type !== "doc") {
        throw new Error("Invalid content structure");
      }

      return parsed;
    } catch {
      alert("잘못된 content 형식입니다.");
      return EMPTY_DRAFT;
    }
  }

  //에러 처리
  useEffect(() => {
    if (!isError) return;

    alert("존재하지 않는 페이지입니다.");
    router.replace(errorPath);
  }, [isError]);

  return {
    translationData,
    editTranslation,
    quitTranslation,
    parseTranslation,
  };
}
