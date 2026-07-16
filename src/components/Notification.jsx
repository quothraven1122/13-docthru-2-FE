import React from "react";

export default function Notification({ contents = [], className }) {
  return (
    <div className="relative">
      <div
        className={`absolute ${className ? className : "right-[50%] top-full"} w-[343px] h-[465px] border-[2px] border-gray-200 bg-white rounded-[8px] scrollbar overflow-y-auto`}
      >
        <div className="font-pretendard text-[16px] font-[600] pt-[15px] pb-[16px] px-[16px]">알림</div>
        {contents.length !== 0 ? (
          contents.map((content) => {
            return (
              <div
                key={content.id}
                className="flex flex-col items-start gap-[8px] border-b-[1px] border-gray-200 py-[12px] px-[15px]"
              >
                <span className="font-pretendard text-[14px] font-[400]">{content.message}</span>
                <span className="font-pretendard text-gray-400">{content.date}</span>
              </div>
            );
          })
        ) : (
          <span className="flex h-[360px] justify-center items-center font-pretendard text-[14px] font-[400] text-gray-400 text-center">
            새로운 알림이 없어요
          </span>
        )}
      </div>
    </div>
  );
}
