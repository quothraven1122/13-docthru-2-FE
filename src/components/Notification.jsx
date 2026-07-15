import React from "react";

export default function Notification({
  contents = [
    {
      message: "‘신청한 챌린지 이름'이 승인/거절되었어요",
      date: "2024.04.01",
    },
  ],
  className,
}) {
  return (
    <div className="relative">
      <div
        className={`absolute ${className ? className : "right-[50%] top-full"} w-[343px] h-[465px] border-[2px] border-gray-200 bg-white rounded-[8px] scrollbar overflow-y-auto`}
      >
        <div className="font-pretendard text-[16px] font-[600] pt-[15px] pb-[16px] px-[16px]">알림</div>
        {contents.map((content, i) => {
          return (
            <div
              key={i}
              className="flex flex-col items-start gap-[8px] border-b-[1px] border-gray-200 py-[12px] px-[15px]"
            >
              <span className="font-pretendard text-[14px] font-[400]">{content.message}</span>
              <span className="font-pretendard text-gray-400">{content.date}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
