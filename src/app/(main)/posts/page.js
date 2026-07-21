"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { nanoid } from "nanoid";

import { useModal } from "@/providers/ModalProvider";
import Spinner from "@/components/Spinner";
import Editor from "./_components/Editor";
import DraftToast from "./_components/DraftToast";
import DraftListModal from "./_components/DraftListModal";
import Iframe from "./_components/Iframe";

import cn from "@/utils/cn";

const title = "개발자로써 자신만의 브랜드를 구축하는 방법(dailydev)";
const buttonCommonStyle = "px-[12px] py-[8px] rounded-[12px]";
const src = "https://en.wikipedia.org/wiki/D.Va";

export default function TranslationWritePage() {
  const { openModal, closeModal } = useModal();

  const [isToastOpen, setIsToastOpen] = useState(false);
  const [isIframeOpen, setIsIframeOpen] = useState(false);
  const [isIframeLoading, setIsIframeLoading] = useState(true);
  const [content, setContent] = useState({ json: null, text: "" });
  const [draftList, setDraftList] = useState([]);
  const [reveal, setReveal] = useState(false);

  //임시 저장 관련 함수들
  const getDrafts = () => {
    const allRelatedDrafts = Object.entries({ ...localStorage })
      .map(([id, value]) => ({
        id,
        ...JSON.parse(value),
      }))
      .filter((draft) => draft && draft.title === title)
      .sort((draft1, draft2) => new Date(draft2.createdAt) - new Date(draft1.createdAt));

    setDraftList(allRelatedDrafts);

    return allRelatedDrafts;
  };
  const saveDraft = () => {
    const id = nanoid();
    const draft = {
      id,
      title,
      content,
      createdAt: new Date().toISOString(),
    };

    localStorage.setItem(id, JSON.stringify(draft));
    setDraftList((prev) => [draft, ...prev]);

    setReveal(true);
  };
  const deleteDraft = (id) => {
    localStorage.removeItem(id);

    setDraftList((prev) => prev.filter((draft) => draft.id !== id));
  };

  // 최초 렌더링 시 임시저장 목록 확인
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    const allDrafts = getDrafts();
    if (allDrafts.length === 0) return;
    setIsToastOpen(true);
  }, []);

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
            <button
              className={cn("bg-[#ffe7e7] text-[#f24744] flex cursor-pointer whitespace-nowrap", buttonCommonStyle)}
            >
              <p className="hidden md:block">포기</p>
              <Image width={20} height={20} src="/icons/ic_exit.svg" alt="나가기 아이콘" />
            </button>

            <button
              onClick={saveDraft}
              className={cn("border border-gray-800 cursor-pointer whitespace-nowrap", buttonCommonStyle)}
            >
              임시저장
            </button>

            <button className={cn("text-white bg-brand-dark cursor-pointer whitespace-nowrap", buttonCommonStyle)}>
              제출하기
            </button>
          </div>
        </header>

        <h1 className="text-[20px] text-gray-800 font-semibold pb-[24px] border-b border-b-gray-200">{title}</h1>

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
          <Editor content={content.json} setContent={setContent} />

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
        src={src}
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
                  setContent(savedContent);
                  closeModal();
                  setIsToastOpen(false);
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
