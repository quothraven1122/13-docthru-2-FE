"use client";

import { useState } from "react";

import Pagination from "@/components/Pagination";
import SearchBar from "@/components/SearchBar";
import Sort from "@/components/Sort";

import ApplicationTable from "./_components/ApplicationTable";

import { ADMIN_SORT_OPTIONS } from "@/constants/challengeOptions";

// TODO: API 연동 시 목데이터 제거
const MOCK_APPLICATIONS = [
  {
    id: 1,
    no: 1023,
    field: "Next.js",
    docType: "공식문서",
    title: "Next.js - App Router: Routing Fundamentals",
    maxMember: 10,
    appliedAt: "24/01/16",
    deadline: "24/02/24",
    status: "PENDING",
  },
  {
    id: 2,
    no: 1022,
    field: "API",
    docType: "블로그",
    title: "Fetch API, 너는 에러를 제대로 핸들링 하고 있는가?(dailydev)",
    maxMember: 5,
    appliedAt: "24/01/16",
    deadline: "24/02/23",
    status: "PENDING",
  },
  {
    id: 3,
    no: 1021,
    field: "API",
    docType: "공식문서",
    title: "Fetch API, 너는 에러를 제대로 핸들링 하고 있는가?(dailydev)",
    maxMember: 10,
    appliedAt: "24/01/16",
    deadline: "24/02/22",
    status: "PENDING",
  },
  {
    id: 4,
    no: 1020,
    field: "Career",
    docType: "블로그",
    title: "개발자로써 자신만의 브랜드를 구축하는 방법(dailydev)",
    maxMember: 5,
    appliedAt: "24/01/16",
    deadline: "24/02/22",
    status: "REJECTED",
  },
  {
    id: 5,
    no: 1019,
    field: "Next.js",
    docType: "공식문서",
    title: "Next.js - App Router: Routing Fundamentals",
    maxMember: 10,
    appliedAt: "24/01/16",
    deadline: "24/02/22",
    status: "APPROVED",
  },
  {
    id: 6,
    no: 1018,
    field: "API",
    docType: "공식문서",
    title: "Fetch API, 너는 에러를 제대로 핸들링 하고 있는가?(dailydev)",
    maxMember: 5,
    appliedAt: "24/01/16",
    deadline: "24/02/22",
    status: "REJECTED",
  },
  {
    id: 7,
    no: 1017,
    field: "API",
    docType: "공식문서",
    title: "Fetch API, 너는 에러를 제대로 핸들링 하고 있는가?(dailydev)",
    maxMember: 10,
    appliedAt: "24/01/16",
    deadline: "24/02/22",
    status: "APPROVED",
  },
  {
    id: 8,
    no: 1016,
    field: "Career",
    docType: "블로그",
    title: "개발자로써 자신만의 브랜드를 구축하는 방법(dailydev)",
    maxMember: 5,
    appliedAt: "24/01/16",
    deadline: "24/02/22",
    status: "APPROVED",
  },
  {
    id: 9,
    no: 1015,
    field: "Next.js",
    docType: "블로그",
    title: "Next.js - App Router: Routing Fundamentals",
    maxMember: 10,
    appliedAt: "24/01/16",
    deadline: "24/02/22",
    status: "APPROVED",
  },
  {
    id: 10,
    no: 1015,
    field: "Next.js",
    docType: "블로그",
    title: "Next.js - App Router: Routing Fundamentals",
    maxMember: 10,
    appliedAt: "24/01/16",
    deadline: "24/02/22",
    status: "DELETED",
  },
];

export default function AdminChallengesPage() {
  const [keyword, setKeyword] = useState("");
  const [sort, setSort] = useState(null);
  const [page, setPage] = useState(1);

  return (
    <main className="mx-auto w-full max-w-[996px] px-4 pb-[60px] md:px-6 lg:px-0">
      <h1 className="mt-[24px] text-[20px] font-semibold text-gray-800 lg:mt-[34px]">챌린지 신청 관리</h1>

      <div className="mt-[24px] flex items-center gap-[12px]">
        <SearchBar className="min-w-0 max-w-none flex-1 py-[7px]" onSubmit={setKeyword} />
        <Sort className="shrink-0" options={ADMIN_SORT_OPTIONS} value={sort} onChange={setSort} />
      </div>

      <div className="mt-[24px]">
        <ApplicationTable applications={MOCK_APPLICATIONS} />
      </div>

      <div className="mt-[40px] flex justify-center">
        <Pagination current={page} setCurrent={setPage} visiblePageCount={5} totalPageCount={5} />
      </div>
    </main>
  );
}
