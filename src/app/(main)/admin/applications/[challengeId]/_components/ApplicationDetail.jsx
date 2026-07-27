import Image from "next/image";

import Chip from "@/components/Chip";

import dateUtils from "@/utils/date";

export default function ApplicationDetail({ application }) {
  const { no, title, field, docType, description, deadline, maxMember, link } = application;

  return (
    <div className="flex flex-col gap-3">
      {/* NO. + 좌우 네비 */}
      <div className="flex items-center justify-between">
        <span className="text-[15px] font-medium text-gray-500">NO. {no}</span>
        <div className="flex items-center gap-[10px]">
          <Image
            src="/icons/ic_arrow_right.svg"
            alt="이전"
            width={24}
            height={24}
            className="rotate-180 cursor-pointer"
          />
          <Image src="/icons/ic_arrow_right.svg" alt="다음" width={24} height={24} className="cursor-pointer" />
        </div>
      </div>

      {/* 제목 + chip */}
      <div className="flex flex-col gap-[18px]">
        <h1 className="text-[20px] font-bold text-gray-900 md:text-[24px]">{title}</h1>
        <div className="flex items-center gap-2">
          <Chip variant="field" value={field} />
          <Chip variant="docType" value={docType} />
        </div>
      </div>

      {/* 설명 */}
      <p className="whitespace-pre-line text-[14px] leading-relaxed text-gray-500">{description}</p>

      {/* 마감 + 인원 */}
      <div className="flex items-center gap-2 text-[13px] text-gray-600">
        <span className="flex items-center gap-1">
          <Image src="/icons/ic_deadline_s.svg" alt="마감" width={24} height={24} />
          {dateUtils.format(deadline)} 마감
        </span>
        <span className="flex items-center gap-1">
          <Image src="/icons/ic_person_small.svg" alt="인원" width={24} height={24} />
          {maxMember}명
        </span>
      </div>

      {/* 원문 링크 */}
      <div className="mt-2 border-t border-gray-200 pt-4">
        <p className="text-[16px] font-semibold text-gray-900">원문 링크</p>
        <div className="relative mt-4 h-[206px] w-full overflow-hidden rounded-[12px] bg-gray-800 md:h-[490px]">
          {/* 실제 원문 임베드는 API 연동 시 iframe 또는 링크로 교체 */}
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-[8px] bg-[#f6f8fa]/50 px-3 py-1.5 text-[13px] font-bold text-gray-700"
          >
            링크 열기
            <Image src="/icons/ic_out.svg" alt="링크열기" width={16} height={16} aria-hidden="true" />
          </a>
        </div>
      </div>
    </div>
  );
}
