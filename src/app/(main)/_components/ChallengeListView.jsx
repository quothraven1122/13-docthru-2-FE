"use client";

import { useMemo, useRef, useState } from "react";

import Image from "next/image";
import Link from "next/link";

import { useQuery } from "@tanstack/react-query";

import Button from "@/components/Button";
import { CardView } from "@/components/CardView";
import Filter from "@/components/Filter";
import Pagination from "@/components/Pagination";
import SearchBar from "@/components/SearchBar";
import Sort from "@/components/Sort";

import { useClickOutside } from "@/hooks/useClickOutside";
import { useAuth } from "@/providers/AuthProvider";

import challengeService from "@/services/challengeService";

import {
  EMPTY_FILTER,
  FIELD_LABEL_TO_VALUE,
  FIELD_LABELS,
  DOC_TYPE_LABEL_TO_VALUE,
  DOC_TYPE_LABELS,
  STATUS_LABEL_TO_PROGRESS,
} from "@/constants/challengeOptions";

const PAGE_SIZE = 10;

export default function ChallengeListView({ role = "USER" }) {
  const { user } = useAuth();

  const [page, setPage] = useState(1);
  const [keyword, setKeyword] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filterValue, setFilterValue] = useState(EMPTY_FILTER);

  const filterRef = useRef(null);
  useClickOutside(filterRef, () => setIsFilterOpen(false));

  const filterCount = filterValue.fields.length + (filterValue.docType ? 1 : 0) + (filterValue.status ? 1 : 0);

  const queryParams = useMemo(
    () => ({
      page,
      pageSize: PAGE_SIZE,
      keyword: keyword || undefined,
      field: filterValue.fields.map((label) => FIELD_LABEL_TO_VALUE[label]),
      docType: filterValue.docType ? DOC_TYPE_LABEL_TO_VALUE[filterValue.docType] : undefined,
      progress: filterValue.status ? STATUS_LABEL_TO_PROGRESS[filterValue.status] : undefined,
    }),
    [page, keyword, filterValue],
  );

  const { data, isPending } = useQuery({
    queryKey: ["challenges", queryParams],
    queryFn: () => challengeService.getChallenges(queryParams),
    placeholderData: (previousData) => previousData,
  });

  // BE는 field/docType을 raw enum(NEXTJS, OFFICIAL 등)으로 응답 -> 화면 표시용 라벨로 변환
  const challenges = useMemo(
    () =>
      (data?.list ?? []).map((challenge) => ({
        id: challenge.id,
        title: challenge.title,
        field: FIELD_LABELS[challenge.field] ?? challenge.field,
        doctype: DOC_TYPE_LABELS[challenge.docType] ?? challenge.docType,
        deadline: challenge.deadline,
        count: challenge.count,
        headcount: challenge.headcount,
      })),
    [data],
  );

  const totalCount = data?.totalCount ?? 0;
  const totalPageCount = Math.max(1, Math.ceil(totalCount / PAGE_SIZE));

  // 실제 로그인 사용자 정보 우선 사용, 로딩 전에는 페이지가 넘겨준 role로 대체
  const currentUser = { role: user?.role ?? role };

  const handleSearchSubmit = (value) => {
    setKeyword(value);
    setPage(1);
  };

  const handleFilterApply = (draft) => {
    setFilterValue(draft);
    setIsFilterOpen(false);
    setPage(1);
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
        <Link href="/challenges/create">
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

      {!isPending && challenges.length === 0 ? (
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
        <Pagination current={page} setCurrent={setPage} visiblePageCount={5} totalPageCount={totalPageCount} />
      </div>
    </div>
  );
}
