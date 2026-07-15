"use client";

import { useRef, useState } from "react";

import Image from "next/image";

import { useClickOutside } from "@/hooks/useClickOutside";

function normalizeOptions(options) {
  return options.map((option) =>
    typeof option === "string" ? { label: option, value: option } : option
  );
}

export default function Dropdown({
  options = [],
  value,
  onChange,
  placeholder = "카테고리",
  className = "",
}) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  useClickOutside(containerRef, () => setIsOpen(false));

  const normalizedOptions = normalizeOptions(options);
  const selected = normalizedOptions.find((option) => option.value === value);

  const handleSelect = (option) => {
    onChange?.(option.value);
    setIsOpen(false);
  };

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className={`flex h-10 w-full items-center justify-between rounded ${
          isOpen ? "rounded-b-none" : ""
        } border border-gray-200 py-1 pl-4 bg-white`}
      >
        <span className={`text-base ${selected ? "text-gray-800" : "text-gray-400"}`}>
          {selected ? selected.label : placeholder}
        </span>
        <span className="flex size-12 items-center justify-center p-3">
          <Image
            src={isOpen ? "/icons/ic_toggle_up.svg" : "/icons/ic_toggle_down.svg"}
            alt=""
            width={24}
            height={24}
          />
        </span>
      </button>

      {isOpen && (
        <ul className="absolute z-10 w-full overflow-clip rounded-b-lg border border-gray-300 bg-white">
          {normalizedOptions.map((option) => (
            <li key={option.value}>
              <button
                type="button"
                onClick={() => handleSelect(option)}
                className="w-full border-b border-gray-300 py-3 text-center text-base text-gray-500 last:border-b-0 hover:bg-gray-50"
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
