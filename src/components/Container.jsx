import React from "react";
import Image from "next/image";
import dateUtils from "@/utils/date";

export default function Container({ date, maxMember, member, onViewOriginal, onChallenge }) {
  const challengeDisabled = dateUtils.isPastDeadline(date);

  return (
    <div className="flex w-full max-w-md flex-col gap-4 rounded-2xl border-2 border-gray-100 bg-white p-5">
      <div className="flex items-center justify-center gap-4">
        <div className="flex items-center gap-1">
          <Image src="/icons/ic_deadline_s.svg" alt="마감일" width={16} height={16} />
          <span className="text-[13px] font-normal text-gray-600">{date} 마감</span>
        </div>
        <div className="flex items-center gap-1">
          <Image src="/icons/ic_person_small.svg" alt="인원" width={16} height={16} />
          <span className="text-[13px] font-normal text-gray-600">
            {member}/{maxMember}
          </span>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={onViewOriginal}
          className="flex h-10 flex-1 items-center justify-center whitespace-nowrap rounded-full border-2 border-brand-dark bg-brand-yellow px-4 text-sm font-bold text-gray-900"
        >
          원문 보기
        </button>
        <button
          type="button"
          onClick={onChallenge}
          disabled={challengeDisabled}
          className="flex h-10 flex-1 items-center justify-center whitespace-nowrap rounded-full border-2 border-transparent bg-gray-900 px-4 text-sm font-bold text-white disabled:bg-gray-200 disabled:text-gray-400"
        >
          작업 도전하기
        </button>
      </div>
    </div>
  );
}
