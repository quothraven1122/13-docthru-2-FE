"use client";

import Image from "next/image";
import Link from "next/link";
import Chip from "./Chip.jsx";
import KebabMenu from "./KebabMenu.jsx";
import StatusBadge from "./StatusBadge.jsx";
import WorkButton from "./WorkButton.jsx";
import dateUtils from "@/utils/date.js";
import cn from "@/utils/cn.js";

export function CardView({ challenge, user, onEdit, onDelete }) {
  const formattedDeadline = dateUtils.format(challenge.deadline);
  const isExpired = dateUtils.isPastDeadline(formattedDeadline);

  const isFull = Number(challenge.count) >= Number(challenge.headcount);
  const isAdmin = user?.role === "ADMIN";

  // 마감 > 모집완료 순으로 우선순위 결정
  const badgeType = isExpired ? "closed" : isFull ? "full" : null;

  return (
    <Link href={`/challenges/${challenge.id}`} className="block w-full max-w-249 p-6 border-2 border-gray-800 rounded-xl">
      <div className="flex justify-between items-start">
        <div>
          {badgeType ? <StatusBadge type={badgeType} className="mb-3 md:mb-3.5 lg:mb-4" /> : <span />}
          <div className=" text-xl/normal font-semibold text-gray-700 md:text-[22px]/[normal]">{challenge.title}</div>
        </div>
        {isAdmin && (
          <div
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
          >
            <KebabMenu onEdit={() => onEdit?.(challenge.id)} onDelete={() => onDelete?.(challenge.id)} />
          </div>
        )}
      </div>

      <div className="flex gap-2 mt-3.5">
        <Chip variant="field" value={challenge.field} />
        <Chip variant="docType" value={challenge.doctype} />
      </div>

      <div className="flex justify-between items-end mt-5 pt-3 border-t border-gray-200 md:mt-4 md:pt-4">
        <div className="text-[13px]/[normal] md:flex md:gap-2 lg:gap-3">
          <div className="flex gap-1 items-center">
            <Image src="/icons/ic_deadline_s.svg" width={24} height={24} alt="" className="w-6 h-6" />
            <span>{formattedDeadline} 마감</span>
          </div>
          <div className="flex gap-1 items-center">
            <Image src="/icons/ic_person_default.svg" width={24} height={24} alt="" className="w-6 h-6" />
            <span>
              {challenge.count}/{challenge.headcount} 참여 완료
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}

export function MyCardView({ challenge, user, onEdit, onDelete, onChallenge, className }) {
  const formattedDeadline = dateUtils.format(challenge.deadline);
  const isExpired = dateUtils.isPastDeadline(formattedDeadline);

  const isFull = Number(challenge.count) >= Number(challenge.headcount);
  const isAdmin = user?.role === "ADMIN";

  // 마감 > 모집완료 순으로 우선순위 결정
  const badgeType = isExpired ? "closed" : isFull ? "full" : null;

  return (
    <Link
      href={`/challenges/${challenge.id}`}
      className={cn("block w-full max-w-249 p-6 border-2 border-gray-800 rounded-xl", className)}
    >
      <div className="flex justify-between items-start ">
        <div>
          {badgeType ? <StatusBadge type={badgeType} className="mb-3 md:mb-3.5 lg:mb-4" /> : <span />}
          <div className=" text-xl/normal font-semibold text-gray-700 md:text-[22px]/[normal]">{challenge.title}</div>
        </div>
        {isAdmin && (
          <div
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
          >
            <KebabMenu onEdit={() => onEdit?.(challenge.id)} onDelete={() => onDelete?.(challenge.id)} />
          </div>
        )}
      </div>

      <div className="flex gap-2 mt-3.5">
        <Chip variant="field" value={challenge.field} />
        <Chip variant="docType" value={challenge.doctype} />
      </div>

      <div className="flex justify-between items-end mt-5 pt-3 border-t border-gray-200 md:mt-4 md:pt-4">
        <div className="text-[13px]/[normal] md:flex md:gap-2 lg:gap-3">
          <div className="flex gap-1 items-center">
            <Image src="/icons/ic_deadline_s.svg" width={24} height={24} alt="" className="w-6 h-6" />
            <span>{formattedDeadline} 마감</span>
          </div>
          <div className="flex gap-1 items-center">
            <Image src="/icons/ic_person_default.svg" width={24} height={24} alt="" className="w-6 h-6" />
            <span>
              {challenge.count}/{challenge.headcount} 참여 완료
            </span>
          </div>
        </div>
        <div
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
        >
          <WorkButton isExpired={isExpired} onClick={() => onChallenge?.(challenge.id)} />
        </div>
      </div>
    </Link>
  );
}
