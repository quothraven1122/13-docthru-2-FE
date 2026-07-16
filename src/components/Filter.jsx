"use client";

import { useState } from "react";

import Image from "next/image";

import Checkbox from "@/components/Checkbox";
import Radio from "@/components/Radio";

import cn from "@/utils/cn";

import { FIELD_OPTIONS, DOC_TYPE_OPTIONS, STATUS_OPTIONS } from "@/constants/challengeOptions";

const EMPTY_VALUE = { fields: [], docType: null, status: null };

export default function Filter({ value = EMPTY_VALUE, onApply, onClose, className = "" }) {
  const [draft, setDraft] = useState(value);

  const toggleField = (field) => {
    setDraft((prev) => ({
      ...prev,
      fields: prev.fields.includes(field) ? prev.fields.filter((item) => item !== field) : [...prev.fields, field],
    }));
  };

  return (
    <div className={cn("w-[343px] rounded-[8px] border-2 border-gray-200 bg-white", className)}>
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
            <Checkbox
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
            <Radio
              key={docType}
              label={docType}
              checked={draft.docType === docType}
              onClick={() => setDraft((prev) => ({ ...prev, docType: prev.docType === docType ? null : docType }))}
            />
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-[12px] px-[16px] py-[12px]">
        <p className="text-[14px] font-semibold text-gray-800">상태</p>
        <div className="flex flex-col gap-[4px]">
          {STATUS_OPTIONS.map((status) => (
            <Radio
              key={status}
              label={status}
              checked={draft.status === status}
              onClick={() => setDraft((prev) => ({ ...prev, status: prev.status === status ? null : status }))}
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
