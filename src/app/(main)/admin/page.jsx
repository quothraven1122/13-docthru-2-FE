"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import Pagination from "@/components/Pagination";
import SearchBar from "@/components/SearchBar";
import Sort from "@/components/Sort";

import ApplicationTable from "./_components/ApplicationTable";

import { useApplications } from "@/hooks/useApplications";
import { ADMIN_SORT_OPTIONS, FIELD_LABELS, DOC_TYPE_LABELS, STATUS_TO_CHIP } from "@/constants/challengeOptions";

const PAGE_SIZE = 10;

function formatShortDate(rawDate) {
  const d = new Date(rawDate);
  const yy = String(d.getFullYear()).slice(2);
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${yy}/${mm}/${dd}`;
}

// BE 응답 항목 -> 테이블이 쓰는 형식으로 변환
function toRow(item) {
  return {
    id: item.id,
    no: item.id.slice(0, 8), // uuid라 표시용으로 앞 8자리 (BE에 순번 없음)
    field: FIELD_LABELS[item.field] ?? item.field,
    docType: DOC_TYPE_LABELS[item.docType] ?? item.docType,
    title: item.title,
    maxMember: item.headcount,
    appliedAt: formatShortDate(item.createdAt),
    deadline: formatShortDate(item.deadline),
    status: item.deletedAt ? "DELETED" : STATUS_TO_CHIP[item.status],
  };
}

export default function AdminChallengesPage() {
  const [keyword, setKeyword] = useState("");
  const [sort, setSort] = useState(null);
  const [page, setPage] = useState(1);
  const router = useRouter();

  const { data, isPending, error } = useApplications({ keyword, sort, page, pageSize: PAGE_SIZE });

  const rows = (data?.list ?? []).map(toRow);
  const totalPageCount = Math.max(1, Math.ceil((data?.totalCount ?? 0) / PAGE_SIZE));

  // 검색/정렬 변경 시 1페이지로
  function handleSearch(value) {
    setKeyword(value);
    setPage(1);
  }
  function handleSort(value) {
    setSort(value);
    setPage(1);
  }

  return (
    <main className="mx-auto w-full max-w-[996px] px-4 pb-[60px] md:px-6 lg:px-0">
      <h1 className="mt-[24px] text-[20px] font-semibold text-gray-800 lg:mt-[34px]">챌린지 신청 관리</h1>

      <div className="mt-[24px] flex items-center gap-[12px]">
        <SearchBar className="min-w-0 max-w-none flex-1 py-[7px]" onSubmit={handleSearch} />
        <Sort className="shrink-0" options={ADMIN_SORT_OPTIONS} value={sort} onChange={handleSort} />
      </div>

      <div className="mt-[24px]">
        {isPending ? (
          <p className="py-10 text-center text-gray-400">불러오는 중...</p>
        ) : error ? (
          <p className="py-10 text-center text-gray-400">목록을 불러오지 못했습니다.</p>
        ) : rows.length === 0 ? (
          <p className="py-10 text-center text-gray-400">신청 내역이 없습니다.</p>
        ) : (
          <ApplicationTable applications={rows} onRowClick={(id) => router.push(`/admin/applications/${id}`)} />
        )}
      </div>

      <div className="mt-[40px] flex justify-center">
        <Pagination current={page} setCurrent={setPage} visiblePageCount={5} totalPageCount={totalPageCount} />
      </div>
    </main>
  );
}
