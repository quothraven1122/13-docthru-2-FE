"use client";

import { useRef, useState } from "react";

import Image from "next/image";

import { useClickOutside } from "@/hooks/useClickOutside";

function normalizeOptions(options) {
  return options.map((option) => (typeof option === "string" ? { label: option, value: option } : option));
}

export default function Sort({
  type = "sort",
  options = [],
  value,
  onChange,
  placeholder = "승인 대기",
  align = "left",
  count = 0,
  onClick,
  className = "",
}) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  useClickOutside(containerRef, () => setIsOpen(false));

  if (type === "filter") {
    const isActive = count > 0;
    return (
      <button
        type="button"
        onClick={onClick}
        className={`flex h-[40px] w-[140px] cursor-pointer items-center justify-between rounded-[32px] border border-gray-300 px-[12px] text-[14px] md:text-[16px] ${isActive ? "bg-gray-800 text-gray-50" : "bg-white text-gray-400"} ${className}`}
      >
        <span>{isActive ? `필터(${count})` : "필터"}</span>
        <Image
          src={isActive ? "/icons/ic_filter_active.svg" : "/icons/ic_filter_inactive.svg"}
          alt="필터"
          width={16}
          height={16}
        />
      </button>
    );
  }

  const normalizedOptions = normalizeOptions(options);
  const selected = normalizedOptions.find((option) => option.value === value);

  const handleSelect = (option) => {
    onChange?.(option.value);
    setIsOpen(false);
  };

  return (
    <div ref={containerRef} className={`relative w-[140px] ${className}`}>
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex h-[40px] w-full cursor-pointer items-center justify-between rounded-[32px] border border-gray-300 bg-white pl-[12px] pr-[8px]"
      >
        <span className="truncate text-[14px] text-gray-400 md:text-[16px]">
          {selected ? selected.label : placeholder}
        </span>
        <Image src="/icons/ic_toggle_down.svg" alt="토글다운" width={24} height={24} className="shrink-0" />
      </button>

      {isOpen && (
        <ul className="absolute top-full z-10 mt-[8px] w-full divide-y divide-gray-300 overflow-clip rounded-[8px] border border-gray-300 bg-white">
          {normalizedOptions.map((option) => (
            <li key={option.value}>
              <button
                type="button"
                onClick={() => handleSelect(option)}
                className={`w-full cursor-pointer bg-white py-[12px] text-[14px] text-gray-500 hover:bg-gray-50 md:text-[16px] ${align === "center" ? "text-center" : "px-[16px] text-left"}`}
              >
                {option.label}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
