"use client";

import cn from "@/utils/cn";

function CheckIcon() {
  return (
    <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
      <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
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
          {checked && <CheckIcon />}
        </span>
      </span>
      {label && <span className="text-[14px] text-gray-800">{label}</span>}
    </label>
  );
}
