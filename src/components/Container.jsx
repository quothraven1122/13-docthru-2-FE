import React from "react";
import Image from "next/image";
import dateUtils from "@/utils/date";

export default function Container({ date, maxMember, member, onViewOriginal, onChallenge }) {
  const challengeDisabled = dateUtils.isPastDeadline(date);
  const buttonBaseClassName =
    "flex flex-1 md:flex-none items-center justify-center whitespace-nowrap rounded-[12px] border-2 px-4 py-[0.44rem] text-[0.875rem] font-bold";

  return (
    <div className="flex w-full flex-col gap-4 rounded-2xl border-2 border-gray-100 bg-white p-5 md:max-w-62.75 md:pt-7 md:pb-6 md:px-4 lg:max-w-71.25">
      <div className="flex items-center justify-center gap-4">
        <div className="flex items-center gap-1">
          <Image src="/icons/ic_deadline_s.svg" alt="마감일" width={16} height={16} />
          <span className="text-[13px] whitespace-nowrap font-normal text-gray-600">{date} 마감</span>
        </div>
        <div className="flex items-center gap-1">
          <Image src="/icons/ic_person_small.svg" alt="인원" width={16} height={16} />
          <span className="text-[13px] font-normal text-gray-600">
            {member}/{maxMember}
          </span>
        </div>
      </div>

      <div className="flex items-center gap-2 md:flex-col">
        <button
          aria-label="원문보기 버튼"
          type="button"
          onClick={onViewOriginal}
          className={`${buttonBaseClassName} border-brand-dark bg-brand-yellow text-gray-900 md:px-[4.22rem]  lg:px-[5.28rem] `}
        >
          원문 보기
        </button>
        <button
          aria-label="작업물 작성 버튼"
          type="button"
          onClick={onChallenge}
          disabled={challengeDisabled}
          className={`${buttonBaseClassName} border-transparent bg-gray-900 text-white disabled:bg-gray-200 disabled:text-gray-400 md:px-[3.47rem] lg:px-[4.53rem]`}
        >
          작업 도전하기
        </button>
      </div>
    </div>
  );
}
