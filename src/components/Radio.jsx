"use client";

import cn from "@/utils/cn";

export default function Radio({ checked, onClick, label, name, value, className = "" }) {
  return (
    <label className={cn("flex cursor-pointer items-center gap-[4px]", className)}>
      <input type="radio" name={name} value={value} checked={checked} onClick={onClick} readOnly className="sr-only" />
      <span className="flex size-[24px] items-center justify-center">
        <span
          className={cn(
            "flex size-[18px] items-center justify-center rounded-full",
            checked ? "bg-gray-800" : "border border-gray-200 bg-[#f5f5f5]",
          )}
        >
          {checked && <span className="size-[8px] rounded-full bg-white" />}
        </span>
      </span>
      {label && <span className="text-[14px] text-gray-800">{label}</span>}
    </label>
  );
}
