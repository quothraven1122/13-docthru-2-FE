"use client";

import { useRef, useState } from "react";

import Image from "next/image";
import Link from "next/link";

import Button from "@/components/Button";
import { CardView } from "@/components/CardView";
import Filter from "@/components/Filter";
import Pagination from "@/components/Pagination";
import SearchBar from "@/components/SearchBar";
import Sort from "@/components/Sort";

import { useClickOutside } from "@/hooks/useClickOutside";

import { EMPTY_FILTER } from "@/constants/challengeOptions";

// TODO: #29 기능 작업에서 실제 API 응답으로 교체 예정
const MOCK_CHALLENGES = [
  {
    id: 1,
    title: "개발자로써 자신만의 브랜드를 구축하는 방법(dailydev)",
    field: "Career",
    doctype: "블로그",
    deadline: new Date(2027, 1, 28),
    count: 2,
    headcount: 5,
  },
  {
    id: 2,
    title: "TanStack Query - Optimistic Updates",
    field: "Modern JS",
    doctype: "공식문서",
    deadline: new Date(2027, 2, 1),
    count: 3,
    headcount: 8,
  },
  {
    id: 3,
    title: "Next.js - App Router: Routing Fundamentals",
    field: "Next.js",
    doctype: "블로그",
    deadline: new Date(2027, 2, 3),
    count: 5,
    headcount: 5,
  },
];

export default function ChallengeListView({ role = "USER" }) {
  const [challenges] = useState(MOCK_CHALLENGES);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filterValue, setFilterValue] = useState(EMPTY_FILTER);

  const filterRef = useRef(null);
  useClickOutside(filterRef, () => setIsFilterOpen(false));

  const filterCount =
    filterValue.fields.length + (filterValue.docType ? 1 : 0) + (filterValue.status ? 1 : 0);

  // TODO: #29 기능 작업에서 실제 로그인 사용자 정보로 교체 예정
  const currentUser = { role };

  const handleSearchSubmit = (keyword) => {
    console.log("검색어:", keyword);
  };

  const handleFilterApply = (draft) => {
    // TODO: #29 기능 작업에서 실제 목록 필터링 로직 연결 예정
    setFilterValue(draft);
    setIsFilterOpen(false);
  };

  const handleEdit = (id) => {
    console.log("수정 클릭:", id);
  };

  const handleDelete = (id) => {
    console.log("삭제 클릭:", id);
  };

  return (
    <div className="mx-auto flex w-full max-w-249 flex-col gap-5 px-4 py-10 md:px-6 lg:px-0">
      <div className="flex items-center justify-between">
        <h1 className="text-[20px] font-semibold text-gray-800">챌린지 목록</h1>
        <Link href="/challenge/create">
          <Button variant="solid" pill>
            신규 챌린지 신청
            <Image src="/icons/ic_plus_m.svg" alt="" width={16} height={16} />
          </Button>
        </Link>
      </div>

      <div className="flex items-center gap-3">
        <div ref={filterRef} className="relative shrink-0">
          <Sort type="filter" count={filterCount} onClick={() => setIsFilterOpen((prev) => !prev)} />
          {isFilterOpen && (
            <div className="absolute top-full left-0 z-10 mt-2">
              <Filter value={filterValue} onApply={handleFilterApply} onClose={() => setIsFilterOpen(false)} />
            </div>
          )}
        </div>
        <SearchBar onSubmit={handleSearchSubmit} />
      </div>

      {challenges.length === 0 ? (
        <div className="flex min-h-100 items-center justify-center text-center text-[14px] text-gray-400">
          등록된 챌린지가 없어요,
          <br />
          지금 바로 챌린지를 신청해주세요
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {challenges.map((challenge) => (
            <CardView
              key={challenge.id}
              challenge={challenge}
              user={currentUser}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}

      <div className="flex justify-center pt-6">
        <Pagination visiblePageCount={5} totalPageCount={5} />
      </div>
    </div>
  );
}
