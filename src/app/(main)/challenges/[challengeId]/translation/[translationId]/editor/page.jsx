"use client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { useQuery, useMutation } from "@tanstack/react-query";
import Image from "next/image";

import { useModal } from "@/providers/ModalProvider";
import Button from "@/components/Button";
import useDraft from "./_hooks/useDraft";
import Editor from "./_components/Editor";
import DraftToast from "./_components/DraftToast";
import DraftListModal from "./_components/DraftListModal";
import Iframe from "./_components/Iframe";

import translationService from "@/services/translationService";

import cn from "@/utils/cn";

export default function TranslationWritePage() {
  const { translationId } = useParams();

  const { data } = useQuery({
    queryKey: ["translation", translationId],
    queryFn: () => translationService.getTranslationDetail(translationId),
  });
  const { mutate: edit } = useMutation({
    mutationKey: ["translation", translationId],
    mutationFn: (stringifiedContent) => translationService.updateTranslation(translationId, stringifiedContent),
  });
  const { mutate: quit } = useMutation({
    mutationKey: ["translation", translationId],
    mutationFn: () => translationService.quitTranslation(translationId),
  });

  const { openModal, closeModal } = useModal();
  const { isDraftLoaded, draftList, saveDraft, deleteDraft } = useDraft(data?.title);

  const [isToastOpen, setIsToastOpen] = useState(false);
  const [isIframeOpen, setIsIframeOpen] = useState(false);
  const [isIframeLoading, setIsIframeLoading] = useState(true);
  const [initialDraft, setInitialDraft] = useState(null);
  const [loadedDraft, setLoadedDraft] = useState(null);
  const [draft, setDraft] = useState({
    json: null,
    text: "",
  });
  const [reveal, setReveal] = useState(false);

  useEffect(() => {
    if (!data?.content) return;
    const parsedContent = JSON.parse(data.content);

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setInitialDraft(parsedContent.json);
    setDraft(parsedContent);
  }, [data?.content]);
  useEffect(() => {
    if (isDraftLoaded && draftList.length > 0) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setIsToastOpen(true);
    }
  }, [isDraftLoaded]);

  return (
    <div
      className={cn(
        "relative flex h-dvh px-[24px] gap-[10px] md:min-h-fit",
        isIframeOpen ? "flex-col-reverse md:flex-row" : "lg:w-[890px] lg:mx-auto",
      )}
    >
      <div className="flex-1 overflow-y-auto md:overflow-y-visible">
        <header className="flex flex-wrap gap-y-[10px] justify-between items-center m-auto py-[24px]">
          <Image width={120} height={30} src="/logos/logo.svg" alt="로고" className="cursor-pointer" />

          <div className="flex gap-[8px]">
            <Button
              variant="tonal"
              onClick={() => {
                const quitConfirmation = confirm("정말로 포기하시겠습니까?");
                if (quitConfirmation) quit();
              }}
            >
              <p className="hidden md:block">포기</p>
              <Image width={20} height={20} src="/icons/ic_exit.svg" alt="나가기 아이콘" />
            </Button>

            <Button
              variant="outline"
              onClick={() => {
                saveDraft(draft);
                setReveal(true);
              }}
            >
              임시저장
            </Button>

            <Button
              variant="solid"
              onClick={() => {
                edit(JSON.stringify(draft));
              }}
            >
              제출하기
            </Button>
          </div>
        </header>

        <h1 className="text-[20px] text-gray-800 font-semibold pb-[24px] border-b border-b-gray-200">{data?.title}</h1>

        <div className="overflow-hidden">
          <div
            className={cn(
              "flex items-center justify-center text-error",
              reveal ? "h-[45px] animate-reveal" : "h-0 opacity-0 -translate-y-2 pointer-events-none",
            )}
            onAnimationEnd={() => setReveal(false)}
          >
            작성 중인 글이 저장되었습니다
          </div>
        </div>

        <div className="relative">
          <Editor content={initialDraft} loadedDraft={loadedDraft} setContent={setDraft} />

          {!isIframeOpen && (
            <button
              onClick={() => {
                setIsIframeOpen((prev) => !prev);
                setIsIframeLoading(true);
              }}
              className="flex gap-[4px] fixed right-0 top-[25%] px-[10px] py-[14px] rounded-l-[24px] border-t border-b border-l border-gray-100 z-fixed text-[14px] text-gray-500 font-semibold cursor-pointer shadow-[0_4px_4px_0_rgba(88,92,130,0.05)] bg-white"
            >
              <Image width={24} height={24} alt="원문 보기 버튼" src="/icons/ic_list.svg" />
              <p>원문</p>
            </button>
          )}
        </div>
      </div>

      <Iframe
        src={data?.link}
        isIframeOpen={isIframeOpen}
        isIframeLoading={isIframeLoading}
        setIsIframeOpen={setIsIframeOpen}
        setIsIframeLoading={setIsIframeLoading}
      />

      {isToastOpen && (
        <DraftToast
          content="임시 저장된 작업물이 있어요. 저장된 작업물을 불러오시겠어요?"
          closeToast={() => setIsToastOpen(false)}
          onConfirm={() =>
            openModal(
              <DraftListModal
                draftList={draftList}
                onConfirm={(savedContent) => {
                  setLoadedDraft(savedContent);
                  closeModal();
                  setIsToastOpen(false);
                  setReveal(false);
                }}
                onDelete={deleteDraft}
                onClose={closeModal}
              />,
            )
          }
        />
      )}
    </div>
  );
}
