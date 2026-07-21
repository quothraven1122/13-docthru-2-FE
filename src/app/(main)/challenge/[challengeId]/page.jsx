"use client";

import { useState } from "react";
import Image from "next/image";
import Chip from "@/components/Chip";
import Container from "@/components/Container";
import List from "@/components/List";
import KebabMenu from "@/components/KebabMenu";

// 더미 데이터
const dummyChallenge = {
  title: "Next.js - App Router : Routing Fundamentals",
  category: "Next.js",
  docType: "공식문서",
  description:
    "Next.js App Router 공식 문서 중 Routing Fundamentals 내용입니다! 라우팅에 따른 폴더와 파일이 구성되는 법칙과 컨벤션 등에 대해 공부할 수 있을 것 같아요~! 다들 챌린지 많이 참여해 주세요 :)",
  deadlineDate: "2026-08-30",
  member: 14,
  maxMember: 15,
  authorName: "럽윈즈울",
};

// 더미 데이터
const dummyParticipants = [
  { id: 1, rank: 1, name: "개발life", role: "전문가", likeCount: 9999, liked: true },
  { id: 2, rank: 2, name: "라우터장인", role: "전문가", likeCount: 1800, liked: true },
  { id: 3, rank: 3, name: "DevCat99", role: "일반", likeCount: 700, liked: true },
  { id: 4, rank: 4, name: "ts_master", role: "전문가", likeCount: 600, liked: true },
  { id: 5, rank: 5, name: "사피엔스", role: "일반", likeCount: 500, liked: true },
];

function ParticipantPagination({ totalPageCount }) {
  const [current, setCurrent] = useState(1);

  const handlePrev = () => {
    if (current <= 1) return;
    setCurrent((prev) => prev - 1);
  };

  const handleNext = () => {
    if (current >= totalPageCount) return;
    setCurrent((prev) => prev + 1);
  };

  if (totalPageCount <= 1) return null;

  return (
    <div className="flex items-center gap-3">
      <div className="flex h-6 w-[62px] items-center justify-center rounded-full border border-neutral-200 text-xs font-medium text-neutral-700">
        <span className="text-neutral-900">{current}</span>
        <span className="mx-0.5 text-neutral-400">/</span>
        <span>{totalPageCount}</span>
      </div>

      <button type="button" onClick={handlePrev} disabled={current === 1} aria-label="이전 페이지">
        <Image
          width={16}
          height={16}
          src={current === 1 ? "/icons/ic_pagination_left_inactive_s.svg" : "/icons/ic_pagination_left_active_s.svg"}
          alt=""
          className="h-4 w-4"
        />
      </button>

      <button type="button" onClick={handleNext} disabled={current === totalPageCount} aria-label="다음 페이지">
        <Image
          width={16}
          height={16}
          src={
            current === totalPageCount
              ? "/icons/ic_pagination_right_inactive_s.svg"
              : "/icons/ic_pagination_right_active_s.svg"
          }
          alt=""
          className="h-4 w-4"
        />
      </button>
    </div>
  );
}

export default function ChallengeDetailPage() {
  const challenge = dummyChallenge;

  return (
    <div className="mx-auto max-w-3xl px-6 py-10">
      <section className="border-b border-neutral-200 pb-6">
        <div className="flex items-start justify-between gap-6">
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold text-neutral-900">{challenge.title}</h1>
              {/* 작성자 본인일 때만 노출되도록 조건 처리 예정  */}
              <KebabMenu
                onEdit={() => {
                  // 수정 페이지 이동 로직 연결 예정
                }}
                onDelete={() => {
                  // 삭제 확인 모달/API 연결 예정
                }}
              />
            </div>

            <div className="mt-3 flex items-center gap-2">
              <Chip variant="field" value={challenge.category} />
              <Chip variant="docType" value={challenge.docType} />
            </div>

            <p className="mt-4 whitespace-pre-line text-sm leading-relaxed text-neutral-700">{challenge.description}</p>

            <div className="mt-4 flex items-center gap-2 text-sm text-neutral-500">
              <Image
                src="/icons/ic_profile_member.svg"
                alt={`${challenge.authorName} 프로필`}
                width={20}
                height={20}
                className="h-5 w-5 rounded-full"
              />
              <span>{challenge.authorName}</span>
            </div>
          </div>

          <Container date={challenge.deadlineDate} member={challenge.member} maxMember={challenge.maxMember} />
        </div>
      </section>

      <section className="mt-6 rounded-xl border border-neutral-200 p-5">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold text-neutral-900">참여 현황</h2>
          {/* totalPageCount는 실제 참여자 수 기반으로 API 연동 시 계산해서 넣어야 함 */}
          <ParticipantPagination totalPageCount={3} />
        </div>

        <div className="mt-4">
          <List items={dummyParticipants} />
        </div>
      </section>
    </div>
  );
}
