"use client";

import Image from "next/image";

export default function WorkButton({ isExpired, onClick }) {
  const baseClassName =
    "flex items-center justify-center gap-1.5 rounded-[30.5px] text-sm/normal font-bold whitespace-nowrap px-4 py-2 cursor-pointer";

  if (isExpired) {
    return (
      <button type="button" onClick={onClick} className={`${baseClassName} bg-gray-50 hover:bg-gray-200`}>
        내 작업물 보기
        <Image src="/icons/ic_document.svg" width={24} height={24} alt="" />
      </button>
    );
  }

  return (
    <button type="button" onClick={onClick} className={`${baseClassName} border border-gray-800 bg-white `}>
      도전 계속하기
      <Image src="/icons/ic_arrow_right.svg" width={16} height={16} alt="" />
    </button>
  );
}
