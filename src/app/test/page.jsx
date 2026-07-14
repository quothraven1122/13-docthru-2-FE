"use client";

import SearchBar from "@/components/SearchBar";

// 해당 페이지는 공통 컴포넌트를 테스하기 위해 임시로 만든 페이지 입니다. 개발 완료후 삭제 예정 입니다.
export default function Page() {
  const handleSubmit = (value) => {
    console.log("검색어:", value);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-8">
      <SearchBar onSubmit={handleSubmit} />
    </div>
  );
}
