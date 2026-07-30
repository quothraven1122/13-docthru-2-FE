"use client";

import Button from "@/components/Button";
import { MyCardView } from "@/components/CardView";
import Pagination from "@/components/Pagination";
import SearchBar from "@/components/SearchBar";
import Sort from "@/components/Sort";
import cn from "@/utils/cn";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import MyApplied from "./_components/MyApplied";
import { useRouter } from "next/navigation";

const CHALLENGE_TYPES = [
  {
    label: "PARTICIPATING",
    value: "참여중인 챌린지",
  },
  {
    label: "COMPLETE",
    value: "완료한 챌린지",
  },
  {
    label: "APPLIED",
    value: "신청한 챌린지",
  },
];

const SORT_OPTION = [
  { value: "APPROVED", label: "신청 승인" },
  { value: "WAITING", label: "승인 대기" },
  { value: "REJECTED", label: "신청 거절" },
  { value: "DELETED", label: "챌린지 삭제" },
];

//임시 테스트용도
const CHALLENGES = [
  {
    id: "challenge-001",
    title: "Next.js 공식 문서 - App Router 번역 챌린지",
    link: "https://nextjs.org/docs/app",
    content: "Next.js 공식 문서의 App Router 섹션을 번역하는 챌린지입니다. 라우팅, 레이아웃, 로딩 UI 등을 다룹니다.",
    field: "Next.js",
    doctype: "공식문서",
    deadline: "2026-08-15T23:59:59.000Z",
    count: 3,
    headcount: 5,
    createdAt: "2026-07-01T09:00:00.000Z",
    updatedAt: "2026-07-01T10:30:00.000Z",
    status: "APPROVED",
    approvedAt: "2026-07-01T10:30:00.000Z",
    rejectReason: null,
    deletedAt: null,
    deletionReason: null,
  },
  {
    id: "challenge-002",
    title: "REST API 설계 가이드 블로그 번역",
    link: "https://blog.example.com/rest-api-design-guide",
    content: "REST API 설계 원칙과 베스트 프랙티스를 다루는 블로그 글 번역 챌린지입니다.",
    field: "API",
    doctype: "블로그",
    deadline: "2026-08-01T23:59:59.000Z",
    count: 3,
    headcount: 3,
    createdAt: "2026-07-02T11:20:00.000Z",
    updatedAt: "2026-07-02T11:20:00.000Z",
    status: "WAITING",
    approvedAt: null,
    rejectReason: null,
    deletedAt: null,
    deletionReason: null,
  },
  {
    id: "challenge-003",
    title: "개발자 커리어 성장 로드맵 번역",
    link: "https://blog.example.com/dev-career-roadmap",
    content: "주니어에서 시니어로 성장하기 위한 커리어 로드맵 블로그 글입니다.",
    field: "Career",
    doctype: "블로그",
    deadline: "2026-08-20T23:59:59.000Z",
    count: 3,
    headcount: 4,
    createdAt: "2026-07-03T08:00:00.000Z",
    updatedAt: "2026-07-03T15:00:00.000Z",
    status: "REJECTED",
    approvedAt: null,
    rejectReason: "이미 유사한 챌린지가 진행 중입니다.",
    deletedAt: null,
    deletionReason: null,
  },
  {
    id: "challenge-004",
    title: "ECMAScript 2025 신규 기능 공식 문서 번역",
    link: "https://tc39.es/proposals",
    content: "ECMAScript 2025에 새롭게 추가된 문법과 기능을 다루는 TC39 공식 문서입니다.",
    field: "Modern JS",
    doctype: "공식문서",
    deadline: "2026-09-01T23:59:59.000Z",
    count: 3,
    headcount: 6,
    createdAt: "2026-07-04T13:45:00.000Z",
    updatedAt: "2026-07-05T09:10:00.000Z",
    status: "APPROVED",
    approvedAt: "2026-07-05T09:10:00.000Z",
    rejectReason: null,
    deletedAt: null,
    deletionReason: null,
  },
  {
    id: "challenge-005",
    title: "웹 접근성(WCAG) 가이드라인 번역",
    link: "https://www.w3.org/WAI/WCAG21/quickref/",
    content: "W3C의 웹 콘텐츠 접근성 지침(WCAG) 2.1 공식 문서를 번역합니다.",
    field: "Web",
    doctype: "공식문서",
    deadline: "2026-08-25T23:59:59.000Z",
    count: 3,
    headcount: 5,
    createdAt: "2026-07-05T10:00:00.000Z",
    updatedAt: "2026-07-05T10:00:00.000Z",
    status: "WAITING",
    approvedAt: null,
    rejectReason: null,
    deletedAt: null,
    deletionReason: null,
  },
  {
    id: "challenge-006",
    title: "Next.js 서버 액션 실전 활용기 블로그 번역",
    link: "https://blog.example.com/nextjs-server-actions",
    content: "Next.js 서버 액션을 실무에 적용한 경험을 공유하는 블로그 글입니다.",
    field: "Next.js",
    doctype: "블로그",
    deadline: "2026-08-10T23:59:59.000Z",
    count: 3,
    headcount: 3,
    createdAt: "2026-07-06T14:20:00.000Z",
    updatedAt: "2026-07-07T09:00:00.000Z",
    status: "REJECTED",
    approvedAt: null,
    rejectReason: "링크가 유효하지 않습니다. 원문 링크를 다시 확인해주세요.",
    deletedAt: null,
    deletionReason: null,
  },
  {
    id: "challenge-007",
    title: "GraphQL vs REST 비교 공식 문서 번역",
    link: "https://graphql.org/learn/",
    content: "GraphQL 공식 학습 문서 중 REST API와의 비교 섹션을 번역합니다.",
    field: "API",
    doctype: "공식문서",
    deadline: "2026-09-05T23:59:59.000Z",
    count: 3,
    headcount: 4,
    createdAt: "2026-07-08T09:30:00.000Z",
    updatedAt: "2026-07-08T16:00:00.000Z",
    status: "WAITING",
    approvedAt: null,
    rejectReason: null,
    deletedAt: null,
    deletionReason: null,
  },
  {
    id: "challenge-008",
    title: "이직 준비 체크리스트 블로그 번역",
    link: "https://blog.example.com/job-change-checklist",
    content:
      "개발자 이직 준비 시 확인해야 할 항목들을 정리한 블로그 글입니다. 관리자가 승인했지만 이후 삭제된 케이스입니다.",
    field: "Career",
    doctype: "블로그",
    deadline: "2026-07-09T11:00:00.000Z",
    count: 1,
    headcount: 2,
    createdAt: "2026-07-09T11:00:00.000Z",
    updatedAt: "2026-07-13T09:00:00.000Z",
    status: "APPROVED",
    approvedAt: "2026-07-09T15:00:00.000Z",
    rejectReason: null,
    deletedAt: null,
    deletionReason: null,
  },
  {
    id: "challenge-009",
    title: "브라우저 렌더링 파이프라인 공식 문서 번역",
    link: "https://developer.mozilla.org/en-US/docs/Web/Performance/How_browsers_work",
    content: "MDN의 브라우저 렌더링 동작 원리에 대한 공식 문서입니다. 승인 대기 중 작성자가 직접 삭제한 케이스입니다.",
    field: "Web",
    doctype: "공식문서",
    deadline: "2026-09-10T23:59:59.000Z",
    count: 3,
    headcount: 5,
    createdAt: "2026-07-10T10:15:00.000Z",
    updatedAt: "2026-07-14T10:00:00.000Z",
    status: "WAITING",
    approvedAt: null,
    rejectReason: null,
    deletedAt: null,
    deletionReason: null,
  },
  {
    id: "challenge-010",
    title: "모던 자바스크립트 비동기 패턴 블로그 번역",
    link: "https://blog.example.com/modern-js-async-patterns",
    content:
      "async/await, Promise.all 등 모던 자바스크립트의 비동기 처리 패턴을 다루는 블로그 글입니다. 거절된 후 삭제된 케이스입니다.",
    field: "Modern JS",
    doctype: "블로그",
    deadline: "2026-08-28T23:59:59.000Z",
    count: 3,
    headcount: 4,
    createdAt: "2026-07-12T13:00:00.000Z",
    updatedAt: "2026-07-15T09:00:00.000Z",
    status: "DELETED",
    rejectReason: "번역 대상 분량이 챌린지 기준에 맞지 않습니다.",
    deletedAt: "2026-07-15T09:00:00.000Z",
    deletionReason: "관리자 판단으로 챌린지가 삭제되었습니다.",
  },
];

const USER = {
  id: "11111",
  email: "temp.user@example.com",
  nickname: "유저",
  role: "MEMBER",
  grade: "NORMAL",
  createdAt: "2026-07-20T09:00:00.000Z",
  updatedAt: "2026-07-20T09:00:00.000Z",
};
export default function Page() {
  const [activeType, setActive] = useState("PARTICIPATING"); //현재 활성화된 탭
  const [sortValue, setSortValue] = useState(""); //정렬
  const [Keyword, setKeyword] = useState(""); //챌린지 검색 키워드
  const [challenges, setChallenges] = useState(CHALLENGES); //챌린지 검색 키워드
  const [page, setPage] = useState(1);

  const router = useRouter();

  //임시 API연동시 챌린지를 서버에서 받아와서 보여주게 하자.
  useEffect(() => {
    if (activeType === "COMPLETE") {
      const data = CHALLENGES.filter((challenge) => {
        if (new Date(challenge.deadline) < new Date()) return challenge;
      });
      setChallenges(data);
    } else if (activeType === "PARTICIPATING") {
      const data = CHALLENGES.filter((challenge) => {
        if (new Date(challenge.deadline) >= new Date()) return challenge;
      });
      setChallenges(data);
    } else {
      setChallenges(CHALLENGES);
    }
  }, [activeType]);

  const handleSubmit = (value) => {
    setKeyword(value);
  };

  return (
    <div className="bg-gray-50 min-h-screen pb-[24px]">
      <div className="w-full max-w-[996px] mx-auto px-[24px]">
        <div className="flex justify-between mt-[24px]">
          <h2 className="text-gray-800 text-[20px] font-[600]">나의 챌린지</h2>
          <Link href={"challenges/create"}>
            <Button variant="solid" pill>
              신규 챌린지 신청
              <Image src="/icons/ic_plus_m.svg" alt="신규 챌린지 신청" width={16} height={16} />
            </Button>
          </Link>
        </div>
        <div className="flex flex-col gap-[24px] w-full h-full">
          <div className="w-full border-b-[1px] border-gray-300">
            {CHALLENGE_TYPES.map((button) => (
              <button
                key={button.label}
                onClick={() => setActive(button.label)}
                className={cn(
                  "cursor-pointer pt-[16px] md:px-[24px] px-[10px] text-nowrap md:text-[18px] text-[16px] font-[600]",
                  {
                    "pb-[13px] text-gray-800 border-b-[3px] border-brand-dark": activeType === button.label,
                    "pb-[16px] text-gray-500": activeType !== button.label,
                  },
                )}
              >
                {button.value}
              </button>
            ))}
          </div>
          <div className="flex justify-between gap-[12px]">
            <SearchBar className="max-w-full h-[40px]" onSubmit={handleSubmit} />
            {activeType === "APPLIED" && (
              <Sort
                value={sortValue}
                onChange={(value) => {
                  setSortValue(value);
                }}
                options={SORT_OPTION}
              />
            )}
          </div>

          {challenges.length === 0 ? (
            <p className="text-gray-500 text-[16px] font-[400] text-center  lg:mt-[288px] md:mt-[327px] mt-[276px]">
              아직 챌린지가 없어요.
            </p>
          ) : activeType !== "APPLIED" ? (
            challenges.map((challenge) => (
              <MyCardView
                className="bg-white"
                key={challenge.id}
                challenge={challenge}
                user={USER}
                onChallenge={(challengeId) => {
                  router.push(`/challenges/${challengeId}`);
                }}
              />
            ))
          ) : (
            <div>
              <MyApplied challenges={CHALLENGES} />
              <div className="flex justify-center mt-[40px]">
                <Pagination current={page} setCurrent={setPage} visiblePageCount={1} totalPageCount={1} />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
