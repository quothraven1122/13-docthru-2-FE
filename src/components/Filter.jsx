"use client";

import { useState } from "react";

import Image from "next/image";

const FIELD_OPTIONS = ["Next.js", "Modern JS", "API", "Web", "Career"];
const DOC_TYPE_OPTIONS = ["공식문서", "블로그"];
const STATUS_OPTIONS = ["진행중", "마감"];

const EMPTY_VALUE = { fields: [], docType: null, status: null };

function CheckIcon() {
  return (
    <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
      <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function CheckboxItem({ label, checked, onChange }) {
  return (
    <label className="flex cursor-pointer items-center gap-[4px]">
      <input type="checkbox" checked={checked} onChange={onChange} className="sr-only" />
      <span className="flex size-[24px] items-center justify-center">
        <span
          className={`flex size-[18px] items-center justify-center rounded-[2px] ${checked ? "bg-gray-800" : "border border-gray-200 bg-[#f5f5f5]"}`}
        >
          {checked && <CheckIcon />}
        </span>
      </span>
      <span className="text-[14px] text-gray-800">{label}</span>
    </label>
  );
}

function RadioItem({ label, checked, onChange }) {
  return (
    <label className="flex cursor-pointer items-center gap-[4px]">
      <input type="radio" checked={checked} onChange={onChange} className="sr-only" />
      <span className="flex size-[24px] items-center justify-center">
        <span
          className={`flex size-[18px] items-center justify-center rounded-full border-2 ${checked ? "border-gray-800" : "border-gray-200"}`}
        >
          {checked && <span className="size-[8px] rounded-full bg-gray-800" />}
        </span>
      </span>
      <span className="text-[14px] text-gray-800">{label}</span>
    </label>
  );
}

export default function Filter({ value = EMPTY_VALUE, onApply, onClose, className = "" }) {
  const [draft, setDraft] = useState(value);

  const toggleField = (field) => {
    setDraft((prev) => ({
      ...prev,
      fields: prev.fields.includes(field) ? prev.fields.filter((item) => item !== field) : [...prev.fields, field],
    }));
  };

  return (
    <div className={`w-[343px] rounded-[8px] border-2 border-gray-200 bg-white ${className}`}>
      <div className="flex items-center justify-between border-b border-gray-200 p-[16px]">
        <p className="text-[16px] font-semibold text-gray-800">필터</p>
        <button type="button" onClick={onClose} className="cursor-pointer">
          <Image src="/icons/ic_out.svg" alt="닫기" width={24} height={24} />
        </button>
      </div>

      <div className="flex flex-col gap-[12px] border-b border-gray-200 px-[16px] py-[12px]">
        <p className="text-[14px] font-semibold text-gray-800">분야</p>
        <div className="flex flex-col gap-[4px]">
          {FIELD_OPTIONS.map((field) => (
            <CheckboxItem
              key={field}
              label={field}
              checked={draft.fields.includes(field)}
              onChange={() => toggleField(field)}
            />
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-[12px] border-b border-gray-200 px-[16px] py-[12px]">
        <p className="text-[14px] font-semibold text-gray-800">문서 타입</p>
        <div className="flex flex-col gap-[4px]">
          {DOC_TYPE_OPTIONS.map((docType) => (
            <RadioItem
              key={docType}
              label={docType}
              checked={draft.docType === docType}
              onChange={() => setDraft((prev) => ({ ...prev, docType }))}
            />
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-[12px] px-[16px] py-[12px]">
        <p className="text-[14px] font-semibold text-gray-800">상태</p>
        <div className="flex flex-col gap-[4px]">
          {STATUS_OPTIONS.map((status) => (
            <RadioItem
              key={status}
              label={status}
              checked={draft.status === status}
              onChange={() => setDraft((prev) => ({ ...prev, status }))}
            />
          ))}
        </div>
      </div>

      {/* TODO: Button(PR #54) 머지 후 공통 Button으로 교체 */}
      <div className="flex gap-[8px] px-[14px] py-[8px]">
        <button
          type="button"
          onClick={() => setDraft(EMPTY_VALUE)}
          className="h-[40px] w-[134px] cursor-pointer rounded-[12px] border border-gray-800 bg-white text-[16px] font-semibold text-gray-800"
        >
          초기화
        </button>
        <button
          type="button"
          onClick={() => onApply?.(draft)}
          className="h-[40px] flex-1 cursor-pointer rounded-[12px] bg-gray-800 text-[14px] font-bold text-white"
        >
          적용하기
        </button>
      </div>
    </div>
  );
}
