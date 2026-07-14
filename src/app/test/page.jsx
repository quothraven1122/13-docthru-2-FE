"use client";

import Chip from "@/components/Chip";
import SearchBar from "@/components/SearchBar";
import Container from "@/components/Container";
import dateUtils from "@/utils/date";

// 해당 페이지는 공통 컴포넌트를 테스하기 위해 임시로 만든 페이지 입니다. 개발 완료후 삭제 예정 입니다.
export default function Page() {
  const handleSubmit = (value) => {
    console.log("검색어:", value);
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-8 bg-gray-50 p-8">
      <SearchBar onSubmit={handleSubmit} />
      <Container date={dateUtils.format(new Date(2027, 2, 3))} maxMember={15} member={15} />

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
    </div>
  );
}
