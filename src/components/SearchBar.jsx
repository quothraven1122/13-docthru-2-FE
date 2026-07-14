"use client";

import React, { useState } from "react";
import Image from "next/image";

export default function SearchBar({ initialValue = "", onSubmit }) {
  const [keyword, setKeyword] = useState(initialValue);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSubmit) onSubmit(keyword);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex w-full max-w-md items-center gap-2 rounded-[20px] border border-gray-200 bg-white px-5 py-3"
    >
      <Image src="/icons/ic_search.svg" alt="검색" width={24} height={24} className="shrink-0" />
      <input
        type="text"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        placeholder="챌린지 이름을 검색해보세요"
        className="w-full bg-transparent text-[16px] leading-none font-normal tracking-normal text-gray-900 placeholder-gray-400 outline-none"
      />
    </form>
  );
}
