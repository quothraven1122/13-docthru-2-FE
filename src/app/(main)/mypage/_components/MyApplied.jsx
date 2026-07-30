import Chip from "@/components/Chip";
import cn from "@/utils/cn";
import dateUtils from "@/utils/date";
import Link from "next/link";
import React from "react";

export default function MyApplied({ challenges }) {
  return (
    <div className="w-[948px]">
      <div className=" bg-gray-800 rounded-[8px] grid grid-cols-[80px_70px_80px_1fr_80px_80px_80px_90px]  items-center text-white text-[13px] font-[500]">
        <p className="px-[16px] py-[15px]">No.</p>
        <p className="px-[16px] py-[15px]">분야</p>
        <p className="px-[16px] py-[15px]">카테고리</p>
        <p className="px-[16px] py-[15px]">챌린지 제목</p>
        <p className="px-[16px] py-[15px]">모집인원</p>
        <p className="px-[16px] py-[15px]">신청일</p>
        <p className="px-[16px] py-[15px]">마감기한</p>
        <p className="px-[16px] py-[15px]">상태</p>
      </div>
      <div className="rounded-t-[4px] mt-[8px]">
        {challenges.map((challenge) => {
          return (
            <Link
              key={challenge.id}
              href={`mypage/challenges/${challenge.id}`}
              className={cn(
                "w-full grid grid-cols-[80px_70px_80px_1fr_80px_80px_80px_90px]  items-center text-[13px] font-[400] text-gray-500 border-b-[1px] border-gray-300",
                { "bg-white": challenge.status !== "DELETED", "bg-gray-100": challenge.status === "DELETED" },
              )}
            >
              <p className="px-[16px] py-[15px]">{challenge.no}</p>
              <p className="px-[16px] py-[15px] whitespace-nowrap">{challenge.field}</p>
              <p className="px-[16px] py-[15px] whitespace-nowrap">{challenge.docType}</p>
              <p className="font-[500] text-gray-700 truncate px-[16px] py-[15px]">{challenge.title}</p>
              <p className="px-[16px] py-[15px]">{challenge.headcount}</p>
              <p className="px-[16px] py-[15px]">{dateUtils.formatDateSlash(challenge.createdAt)}</p>
              <p className="px-[16px] py-[15px]">{dateUtils.formatDateSlash(challenge.deadline)}</p>
              <Chip className=" justify-self-start " variant="" value={challenge.status}></Chip>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
