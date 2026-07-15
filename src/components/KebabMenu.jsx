"use client";

import Image from "next/image";
import { useCallback, useRef, useState } from "react";
import { useClickOutside } from "@/hooks/useClickOutside";

/**
 * 카드 우측 상단 케밥(⋮) 드롭다운 메뉴.
 * 바깥 클릭 / ESC 닫기는 팀 공용 useClickOutside 훅이 처리한다.
 */
export default function KebabMenu({ onEdit, onDelete }) {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  // 훅의 의존성 배열에 handler가 포함되어 있으므로
  // 매 렌더마다 리스너가 재등록되지 않도록 참조를 고정한다
  const close = useCallback(() => setOpen(false), []);
  useClickOutside(dropdownRef, close);

  const handleEdit = () => {
    setOpen(false);
    onEdit?.();
  };

  const handleDelete = () => {
    setOpen(false);
    onDelete?.();
  };

  return (
    <div className="relative shrink-0" ref={dropdownRef}>
      <button
        type="button"
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label="메뉴 열기"
        onClick={() => setOpen((prev) => !prev)}
      >
        <Image src="/icons/ic_kebab.svg" width={24} height={24} alt="" className="w-6 h-6" />
      </button>

      {open && (
        <ul
          role="menu"
          className="absolute right-0 top-full w-max mt-1 py-1 bg-white border border-gray-200 rounded-lg z-10"
        >
          <li role="none">
            <button
              type="button"
              role="menuitem"
              className="w-full px-9.75 py-3 text-sm text-gray-700 hover:bg-gray-100"
              onClick={handleEdit}
            >
              수정하기
            </button>
          </li>
          <li role="none">
            <button
              type="button"
              role="menuitem"
              className="w-full px-9.75 py-3 text-sm text-gray-700 hover:bg-gray-100"
              onClick={handleDelete}
            >
              삭제하기
            </button>
          </li>
        </ul>
      )}
    </div>
  );
}
