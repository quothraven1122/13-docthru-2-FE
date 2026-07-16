"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Editor from "./_components/Editor";

const title = "개발자로써 자신만의 브랜드를 구축하는 방법(dailydev)";
const buttonCommonStyle = "px-[12px] py-[8px] rounded-[12px]";
const src = "https://en.wikipedia.org/wiki/D.Va";

export default function TranslationWritePage() {
  const [isOpen, setIsOpen] = useState(false);
  const [content, setContent] = useState("");

  return (
    <div
      className={`flex h-dvh px-[24px] gap-[10px] md:min-h-fit ${isOpen ? "flex-col-reverse md:flex-row" : "lg:w-[890px] lg:mx-auto"}`}
    >
      <div onClick={() => console.log(content)} className="flex-1 max-h-[50%] overflow-y-auto md:overflow-y-visible">
        <header className="flex flex-wrap gap-y-[10px] justify-between items-center m-auto py-[24px] ">
          <Image width={120} height={30} src="/logos/logo.svg" alt="로고" className="cursor-pointer" />
          <div className="flex gap-[8px]">
            <button
              className={`bg-[#ffe7e7] text-[#f24744] flex cursor-pointer whitespace-nowrap ${buttonCommonStyle}`}
            >
              <p className="hidden md:block">포기</p>
              <Image width={20} height={20} src="/icons/ic_exit.svg" alt="나가기 아이콘" />
            </button>
            <button className={`border border-gray-800 cursor-pointer whitespace-nowrap ${buttonCommonStyle}`}>
              임시저장
            </button>
            <button className={`text-white bg-brand-dark cursor-pointer whitespace-nowrap ${buttonCommonStyle}`}>
              제출하기
            </button>
          </div>
        </header>

        <h1 className="text-[20px] text-gray-800 font-semibold">{title}</h1>
        <div className="h-[24px] border-b border-b-gray-200"></div>

        <div className="relative">
          <Editor content={content} setContent={setContent} />
          {!isOpen && (
            <button
              onClick={() => setIsOpen((prev) => !prev)}
              className="flex gap-[4px] fixed right-0 top-[25%] px-[10px] py-[14px] rounded-l-[24px] border border-gray-100v z-fixed text-[14px] text-gray-500 font-semibold cursor-pointer shadow-[0_4px_4px_0_rgba(88,92,130,0.05)]"
            >
              <Image width={24} height={24} alt="원문 보기 버튼" src={"/icons/ic_list.svg"} />
              <p>원문</p>
            </button>
          )}
        </div>
      </div>
      {isOpen && (
        <div className="flex flex-1 min-w-0 min-h-0 flex-col">
          <header className="w-full h-[48px] bg-gray-400 flex justify-between items-center px-[16px] py-[8px]">
            <button onClick={() => setIsOpen(false)} className="cursor-pointer">
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
          <iframe src={src} className="w-full h-full flex-1"></iframe>
        </div>
      )}
    </div>
  );
}
