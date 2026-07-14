"use client";
import { useState } from "react";
import Image from "next/image";

export default function Pagination({ visiblePageCount, totalPageCount }) {
  const [current, setCurrent] = useState(1);
  const startPage = Math.floor((current - 1) / visiblePageCount) * visiblePageCount + 1;
  const visiblePages = Array.from({ length: visiblePageCount }, (_, i) => startPage + i).filter(
    (page) => page <= totalPageCount,
  );

  const handleLeftArrow = () => {
    if (current <= 1) return;
    setCurrent((prev) => prev - 1);
  };
  const handleRightArrow = () => {
    if (current >= totalPageCount) return;
    setCurrent((prev) => prev + 1);
  };

  return (
    <div className="flex gap-[12px]">
      <Image
        width={40}
        height={40}
        src={current === 1 ? "/icons/ic_pagination_left_inactive_l.svg" : "/icons/ic_pagination_left_active_l.svg"}
        alt="왼쪽 화살표"
        onClick={handleLeftArrow}
        className="cursor-pointer"
      />
      <div className="flex gap-[6px]">
        {visiblePages.map((page, index) => (
          <div
            key={page}
            onClick={() => setCurrent(page)}
            className={`w-[40px] h-[40px] rounded-[8px] flex justify-center items-center cursor-pointer ${page === current ? "bg-gray-800 text-brand-yellow" : ""}`}
          >
            {page}
          </div>
        ))}
      </div>
      <Image
        width={40}
        height={40}
        src={
          current === totalPageCount
            ? "/icons/ic_pagination_right_inactive_l.svg"
            : "/icons/ic_pagination_right_active_l.svg"
        }
        alt="오른쪽 화살표"
        onClick={handleRightArrow}
        className="cursor-pointer"
      />
    </div>
  );
}
