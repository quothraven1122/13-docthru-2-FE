"use client";
import { useState } from "react";
import Image from "next/image";
import Editor from "./_components/Editor";

const title = "개발자로써 자신만의 브랜드를 구축하는 방법(dailydev)";
const buttonCommonStyle = "px-[12px] py-[8px] rounded-[12px]";

export default function TranslationWritePage() {
  const [content, setContent] = useState("");
  return (
    <div onClick={() => console.log(content)} className="px-[24px] lg:w-[890px] lg:mx-auto">
      <header className="flex justify-between items-center m-auto py-[24px]">
        <Image width={120} height={30} src="/logos/logo.svg" alt="로고" className="cursor-pointer" />
        <div className="flex gap-[8px]">
          <button className={`bg-[#ffe7e7] text-[#f24744] flex cursor-pointer ${buttonCommonStyle}`}>
            <p className="hidden md:block">포기</p>
            <Image width={20} height={20} src="/icons/ic_exit.svg" alt="나가기 아이콘" />
          </button>
          <button className={`border border-gray-800 cursor-pointer ${buttonCommonStyle}`}>임시저장</button>
          <button className={`text-white bg-brand-dark cursor-pointer ${buttonCommonStyle}`}>제출하기</button>
        </div>
      </header>

      <h1 className="text-[20px] text-gray-800 font-semibold">{title}</h1>
      <div className="h-[24px] border-b border-b-gray-200"></div>
      <Editor content={content} setContent={setContent} />
    </div>
  );
}
