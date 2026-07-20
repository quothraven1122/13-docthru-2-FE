"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";

import { useModal } from "@/providers/ModalProvider";
import Spinner from "@/components/Spinner";
import Editor from "./_components/Editor";
import DraftToast from "./_components/DraftToast";
import DraftListModal from "./_components/DraftListModal";

import cn from "@/utils/cn";

const title = "개발자로써 자신만의 브랜드를 구축하는 방법(dailydev)";
const buttonCommonStyle = "px-[12px] py-[8px] rounded-[12px]";
const src = "https://en.wikipedia.org/wiki/D.Va";

export default function TranslationWritePage() {
  const { openModal, closeModal } = useModal();
  const [isToastOpen, setIsToastOpen] = useState(false);
  const [isIframeOpen, setIsIframeOpen] = useState(false);
  const [isIframeLoading, setIsIframeLoading] = useState(true);
  const [isDraftSavedToastOpen, setIsDraftSavedToastOpen] = useState(false);
  const [content, setContent] = useState("");
  const saveToastRef = useRef(null);

  const showSaveToast = () => {
    const el = saveToastRef.current;
    if (!el) return;
    el.style.animation = "animate-reveal";
    // reflow를 발생시켜 애니메이션 초기화
    void el.offsetWidth;
    el.style.animation = "";
  };
  const getDrafts = () => {
    const allDrafts = Object.entries({ ...localStorage }).reduce((prev, [key, value]) => {
      prev[key] = JSON.parse(value);
      return prev;
    }, {});
    return allDrafts;
  };
  const saveDraft = () => {
    const allDrafts = { ...localStorage };
    const currentIndex = Object.keys(allDrafts).length;
    localStorage.setItem(currentIndex + 1, JSON.stringify({ title, content, createdAt: new Date() }));
    showSaveToast();
  };

  useEffect(() => {
    const allDrafts = getDrafts();
    if (Object.keys(allDrafts).length === 0) return;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsToastOpen(true);
  }, []);

  return (
    <div
      className={cn(
        "relative flex h-dvh px-[24px] gap-[10px] md:min-h-fit",
        isIframeOpen ? "flex-col-reverse md:flex-row" : "lg:w-[890px] lg:mx-auto",
      )}
    >
      <div className="flex-1 max-h-[50%] overflow-y-auto md:overflow-y-visible">
        <header className="flex flex-wrap gap-y-[10px] justify-between items-center m-auto py-[24px] ">
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
            <button className={`text-white bg-brand-dark cursor-pointer whitespace-nowrap ${buttonCommonStyle}`}>
              제출하기
            </button>
          </div>
        </header>

        <h1 className="text-[20px] text-gray-800 font-semibold pb-[24px] border-b border-b-gray-200">{title}</h1>
        <div
          ref={saveToastRef}
          className="h-[45px] max-h-0 overflow-hidden flex justify-center items-center text-[12px] text-center text-error bg-gray-50"
        >
          작성 중인 글이 저장되었습니다
        </div>

        <div className="relative">
          <Editor content={content} setContent={setContent} />
          {!isIframeOpen && (
            <button
              onClick={() => {
                setIsIframeOpen((prev) => !prev);
                setIsIframeLoading(true);
              }}
              className="flex gap-[4px] fixed right-0 top-[25%] px-[10px] py-[14px] rounded-l-[24px] border-t border-b border-l border-gray-100 z-fixed text-[14px] text-gray-500 font-semibold cursor-pointer shadow-[0_4px_4px_0_rgba(88,92,130,0.05)]"
            >
              <Image width={24} height={24} alt="원문 보기 버튼" src={"/icons/ic_list.svg"} />
              <p>원문</p>
            </button>
          )}
        </div>
      </div>
      {isIframeOpen && (
        <div className="flex flex-1 min-w-0 min-h-0 flex-col">
          <header className="w-full h-[48px] bg-gray-400 flex justify-between items-center px-[16px] py-[8px]">
            <button onClick={() => setIsIframeOpen(false)} className="cursor-pointer">
              <Image width={32} height={32} alt="iframe 나가기 버튼 아이콘" src={"/icons/ic_out_circle_m.svg"} />
            </button>
            <Link
              href={src}
              target="_blank"
              className="flex gap-[2px] bg-[#dcdcdc] px-[12px] py-[4px] rounded-[12px] text-[16px] text-gray-700 font-bold cursor-pointer"
            >
              <p>링크 열기</p>
              <Image width={24} height={24} alt="링크 열기 아이콘" src="/icons/ic_click.svg" />
            </Link>
          </header>
          <div className="relative w-full h-full flex justify-center items-center">
            {isIframeLoading && (
              <div className="absolute inset-0 z-10 flex items-center justify-center bg-white/80">
                <Spinner />
              </div>
            )}
            <iframe src={src} onLoad={() => setIsIframeLoading(false)} className="w-full h-full flex-1"></iframe>
          </div>
        </div>
      )}
      {isToastOpen && (
        <DraftToast
          content="임시 저장된 작업물이 있어요. 저장된 작업물을 불러오시겠어요??"
          closeToast={() => setIsToastOpen(false)}
          onConfirm={() =>
            openModal(
              <DraftListModal
                draftList={getDrafts()}
                onConfirm={() => {
                  closeModal();
                  setIsToastOpen(false);
                  setIsDraftSavedToastOpen(true);
                }}
                handleClose={closeModal}
              />,
            )
          }
        />
      )}
    </div>
  );
}
