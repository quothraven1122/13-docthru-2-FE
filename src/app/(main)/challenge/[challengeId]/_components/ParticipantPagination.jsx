"use client";

import { useState } from "react";
import Image from "next/image";

export default function ParticipantPagination({ totalPageCount }) {
  const [current, setCurrent] = useState(1);

  const handlePrev = () => {
    if (current <= 1) return;
    setCurrent((prev) => prev - 1);
  };

  const handleNext = () => {
    if (current >= totalPageCount) return;
    setCurrent((prev) => prev + 1);
  };

  if (totalPageCount <= 1) return null;

  return (
    <div className="flex items-center gap-3">
      <div className="flex h-6 w-[62px] items-center justify-center rounded-full border border-neutral-200 text-xs font-medium text-neutral-700">
        <span className="text-neutral-900">{current}</span>
        <span className="mx-0.5 text-neutral-400">/</span>
        <span>{totalPageCount}</span>
      </div>

      <button type="button" onClick={handlePrev} disabled={current === 1} aria-label="이전 페이지">
        <Image
          width={16}
          height={16}
          src={current === 1 ? "/icons/ic_pagination_left_inactive_s.svg" : "/icons/ic_pagination_left_active_s.svg"}
          alt=""
          className="h-4 w-4"
        />
      </button>

      <button type="button" onClick={handleNext} disabled={current === totalPageCount} aria-label="다음 페이지">
        <Image
          width={16}
          height={16}
          src={
            current === totalPageCount
              ? "/icons/ic_pagination_right_inactive_s.svg"
              : "/icons/ic_pagination_right_active_s.svg"
          }
          alt=""
          className="h-4 w-4"
        />
      </button>
    </div>
  );
}
