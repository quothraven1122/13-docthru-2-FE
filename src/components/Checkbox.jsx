"use client";

import Image from "next/image";

import cn from "@/utils/cn";

export default function Checkbox({ checked, onChange, label, className = "" }) {
  return (
    <label className={cn("flex cursor-pointer items-center gap-[4px]", className)}>
      <input type="checkbox" checked={checked} onChange={onChange} className="sr-only" />
      <span className="flex size-[24px] items-center justify-center">
        <span
          className={cn(
            "flex size-[18px] items-center justify-center rounded-[2px]",
            checked ? "bg-gray-800" : "border border-gray-200 bg-[#f5f5f5]",
          )}
        >
          {checked && <Image width={10} height={8} src="/icons/ic_check.svg" alt="체크" />}
        </span>
      </span>
      {label && <span className="text-[14px] text-gray-800">{label}</span>}
    </label>
  );
}
