"use client";

import { useRef, useState } from "react";
import Image from "next/image";

import Filter from "@/components/Filter";
import Sort from "@/components/Sort";
import Chip from "@/components/Chip";
import SearchBar from "@/components/SearchBar";
import Container from "@/components/Container";
import { CardView, MyCardView } from "@/components/CardView";
import { useClickOutside } from "@/hooks/useClickOutside";
import dateUtils from "@/utils/date";

const SORT_OPTIONS = [
  { label: "승인 대기", value: "pending" },
  { label: "신청 승인", value: "approved" },
  { label: "신청 거절", value: "rejected" },
  { label: "신청 시간 빠른순", value: "appliedAt_asc" },
  { label: "신청 시간 느린순", value: "appliedAt_desc" },
  { label: "마감 기한 빠른순", value: "deadline_asc" },
  { label: "마감 기한 느린순", value: "deadline_desc" },
];

// 해당 페이지는 공통 컴포넌트를 테스하기 위해 임시로 만든 페이지 입니다. 개발 완료후 삭제 예정 입니다.
export default function Page() {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filterValue, setFilterValue] = useState({ fields: [], docType: null, status: null });

  const filterRef = useRef(null);
  useClickOutside(filterRef, () => setIsFilterOpen(false));

  const filterCount = filterValue.fields.length + (filterValue.docType ? 1 : 0) + (filterValue.status ? 1 : 0);

  const [sortValue, setSortValue] = useState("pending");
  const handleSubmit = (value) => {
    console.log("검색어:", value);
  };

  const adminUser = { role: "ADMIN" };
  const normalUser = { role: "USER" };

  const activeChallenge = {
    id: 1,
    title: "진행중인 챌린지 (마감 전 · 정원 여유)",
    field: "Next.js",
    doctype: "공식문서",
    deadline: new Date(2027, 11, 13),
    count: 3,
    headcount: 10,
  };

  const fullChallenge = {
    id: 2,
    title: "모집이 완료된 챌린지",
    field: "API",
    doctype: "블로그",
    deadline: new Date(2027, 11, 13),
    count: 10,
    headcount: 10,
  };

  const closedChallenge = {
    id: 3,
    title: "마감된 챌린지",
    field: "Career",
    doctype: "공식문서",
    deadline: new Date(2020, 0, 1),
    count: 4,
    headcount: 10,
  };

  const handleEdit = (id) => console.log("수정 클릭:", id);
  const handleDelete = (id) => console.log("삭제 클릭:", id);
  const handleChallenge = (id) => console.log("도전 계속하기 클릭:", id);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-8 bg-gray-50 p-4">
      <SearchBar onSubmit={handleSubmit} />
      <Container date={new Date(2027, 2, 3)} maxMember={15} member={15} />

      <div className="flex w-full max-w-249 flex-col gap-4">
        <h2 className="text-lg font-bold text-gray-700">CardView - 관리자(ADMIN)</h2>
        <CardView challenge={activeChallenge} user={adminUser} onEdit={handleEdit} onDelete={handleDelete} />
        <CardView challenge={fullChallenge} user={adminUser} onEdit={handleEdit} onDelete={handleDelete} />
        <CardView challenge={closedChallenge} user={adminUser} onEdit={handleEdit} onDelete={handleDelete} />

        <h2 className="mt-4 text-lg font-bold text-gray-700">CardView - 일반 사용자</h2>
        <CardView challenge={activeChallenge} user={normalUser} onEdit={handleEdit} onDelete={handleDelete} />
        <CardView challenge={fullChallenge} user={normalUser} onEdit={handleEdit} onDelete={handleDelete} />
        <CardView challenge={closedChallenge} user={normalUser} onEdit={handleEdit} onDelete={handleDelete} />

        <h2 className="mt-4 text-lg font-bold text-gray-700">MyCardView - 관리자(ADMIN)</h2>
        <MyCardView
          challenge={activeChallenge}
          user={adminUser}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onChallenge={handleChallenge}
        />
        <MyCardView
          challenge={fullChallenge}
          user={adminUser}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onChallenge={handleChallenge}
        />
        <MyCardView
          challenge={closedChallenge}
          user={adminUser}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onChallenge={handleChallenge}
        />

        <h2 className="mt-4 text-lg font-bold text-gray-700">MyCardView - 일반 사용자</h2>
        <MyCardView
          challenge={activeChallenge}
          user={normalUser}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onChallenge={handleChallenge}
        />
        <MyCardView
          challenge={fullChallenge}
          user={normalUser}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onChallenge={handleChallenge}
        />
        <MyCardView
          challenge={closedChallenge}
          user={normalUser}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onChallenge={handleChallenge}
        />
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <Chip variant="field" value="Next.js" />
        <Chip variant="field" value="API" />
        <Chip variant="field" value="Career" />
        <Chip variant="field" value="Modern JS" />
        <Chip variant="field" value="Web" />
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <Chip variant="docType" value="공식문서" />
        <Chip variant="docType" value="블로그" />
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <Chip variant="status" value="PENDING" />
        <Chip variant="status" value="APPROVED" />
        <Chip variant="status" value="REJECTED" />
        <Chip variant="status" value="DELETED" />
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <Button variant="solid" size="lg">
          승인하기
        </Button>
        <Button variant="solid">작업 도전하기</Button>
        <Button variant="solid" size="sm">
          등록하기
        </Button>
        <Button variant="solid" disabled>
          승인하기
        </Button>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <Button variant="outline">임시저장</Button>
        <Button variant="outline" size="sm">
          임시저장
        </Button>
        <Button variant="tonal" size="lg">
          거절하기
        </Button>
        <Button variant="tonal">신청 거절</Button>
      </div>
      <div className="rounded-[12px] bg-gray-800 p-3">
        <Button variant="transparent" size="sm">
          링크 열기
          <Image src="/icons/ic_click.svg" alt="하이퍼링크" width={24} height={24} />
        </Button>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <Button variant="filled">원문 보기</Button>
        <Button variant="solid" pill>
          신규 챌린지 신청
          <Image src="/icons/ic_plus_m.svg" alt="신규 챌린지 신청" width={16} height={16} />
        </Button>
        <Button variant="outline" size="sm" pill>
          도전 계속하기
          <Image src="/icons/ic_arrow_right.svg" alt="도전 계속하기" width={24} height={24} />
        </Button>
        <Button variant="ghost" size="sm" pill>
          내 작업물 보기
        </Button>
        <Button variant="tonal">
          포기
          <Image src="/icons/ic_give_up.svg" alt="포기" width={24} height={24} />
        </Button>
        <Button variant="tonal" iconOnly>
          <Image src="/icons/ic_give_up.svg" alt="포기" width={24} height={24} />
        </Button>
      </div>

      <div className="flex items-start gap-2">
        <Sort options={SORT_OPTIONS} value={sortValue} onChange={setSortValue} />
        <div ref={filterRef} className="relative">
          <Sort type="filter" count={filterCount} onClick={() => setIsFilterOpen((prev) => !prev)} />
          {isFilterOpen && (
            <Filter
              value={filterValue}
              onClose={() => setIsFilterOpen(false)}
              onApply={(next) => {
                setFilterValue(next);
                setIsFilterOpen(false);
              }}
              className="absolute left-0 top-[48px] z-10"
            />
          )}
        </div>
        <Sort type="filter" count={3} />
      </div>
    </div>
  );
}
