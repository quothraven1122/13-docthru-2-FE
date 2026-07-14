"use client";
import { useState } from "react";
import Image from "next/image";

import Chip from "@/components/Chip";
import SearchBar from "@/components/SearchBar";
import Container from "@/components/Container";
import Input from "@/components/Input";
import DateInput from "@/components/DateInput";
import Pagination from "@/components/Pagination";
import dateUtils from "@/utils/date";

// 해당 페이지는 공통 컴포넌트를 테스하기 위해 임시로 만든 페이지 입니다. 개발 완료후 삭제 예정 입니다.
export default function Page() {
  const [data, setData] = useState({ email: "", wrongEmail: "", password: "", date: null });
  const [clicked, setClicked] = useState(false);

  const handleSubmit = (value) => {
    console.log("검색어:", value);
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-8 bg-gray-50 p-8">
      <SearchBar onSubmit={handleSubmit} />
      <Container date={new Date(2027, 2, 3)} maxMember={15} member={15} />

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

      <div className="w-full flex flex-col gap-[20px]">
        <DateInput selectedDate={data.date} setSelectedDate={(date) => setData((prev) => ({ ...prev, date }))} />
        <Input
          value={data.email}
          onChange={(e) => setData((prev) => ({ ...prev, email: e.target.value }))}
          placeholder="이메일을 입력해주세요"
        />
        <Input
          value={data.wrongEmail}
          onChange={(e) => setData((prev) => ({ ...prev, wrongEmail: e.target.value }))}
          errorMessage="잘못된 이메일입니다."
          placeholder="이메일을 입력해주세요"
        />
        <Input
          type={clicked ? "text" : "password"}
          value={data.password}
          onChange={(e) => setData((prev) => ({ ...prev, password: e.target.value }))}
          suffix={
            <Image
              width={24}
              height={24}
              src={clicked ? "/icons/ic_btn_visibility_on.svg" : "/icons/ic_btn_visibility_off.svg"}
              alt="아이콘"
              onClick={() => setClicked((prev) => !prev)}
            />
          }
          placeholder="비밀번호를 입력해주세요"
        />
      </div>
      <Pagination visiblePageCount={5} totalPageCount={19} />
    </div>
  );
}
