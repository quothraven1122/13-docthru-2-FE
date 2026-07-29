"use client";

import { useState } from "react";

import Button from "@/components/Button";
import DateInput from "@/components/DateInput";
import Dropdown from "@/components/Dropdown";
import Input from "@/components/Input";

import { DOC_TYPE_OPTIONS, FIELD_OPTIONS } from "@/constants/challengeOptions";

// TODO: API 연동 단계에서 GET /challenges/applications/:challengeId 응답으로 교체
const MOCK_CHALLENGE = {
  title: "Next.js - App Router: Routing Fundamentals",
  link: "https://nextjs.org/docs/app/building-your-application/routing",
  field: "Next.js",
  docType: "블로그",
  deadline: new Date("2026-04-01"),
  headcount: "5",
  content:
    "Next.js App Router 공식 문서 중 Routing Fundamentals 내용입니다! 라우팅에 따른 폴더와 파일이 구성되는 법칙과 컨벤션 등에 대해 공부할 수 있을 것 같아요~! 다들 챌린지 많이 참여해 주세요 :)",
};

export default function AdminChallengeEditPage() {
  const [textForm, setTextForm] = useState({
    title: MOCK_CHALLENGE.title,
    link: MOCK_CHALLENGE.link,
    headcount: MOCK_CHALLENGE.headcount,
    content: MOCK_CHALLENGE.content,
  });
  const [selectForm, setSelectForm] = useState({
    field: MOCK_CHALLENGE.field,
    docType: MOCK_CHALLENGE.docType,
    deadline: MOCK_CHALLENGE.deadline,
  });
  const [errors, setErrors] = useState({});

  const handleTextChange = (key) => (e) => {
    setTextForm((prev) => ({ ...prev, [key]: e.target.value }));
  };

  const handleSelectChange = (key) => (value) => {
    setSelectForm((prev) => ({ ...prev, [key]: value }));
  };

  const validate = () => {
    const nextErrors = {};

    if (!textForm.title.trim()) nextErrors.title = "제목을 입력해주세요.";
    if (!textForm.link.trim()) nextErrors.link = "원문 링크를 입력해주세요.";
    if (!selectForm.field) nextErrors.field = "분야를 선택해주세요.";
    if (!selectForm.docType) nextErrors.docType = "문서 타입을 선택해주세요.";
    if (!selectForm.deadline) nextErrors.deadline = "마감일을 선택해주세요.";
    if (!textForm.headcount || Number(textForm.headcount) < 1) {
      nextErrors.headcount = "참여 인원을 1명 이상 입력해주세요.";
    }
    if (!textForm.content.trim()) nextErrors.content = "내용을 입력해주세요.";

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    // TODO: API 연동 단계에서 PATCH /challenges/:challengeId 연결
    console.log({ ...textForm, ...selectForm });
  };

  return (
    <form onSubmit={handleSubmit} className="mx-auto flex w-full max-w-[590px] flex-col gap-6 px-4 py-10 md:px-0">
      <h1 className="text-[20px] font-semibold text-gray-800">챌린지 수정</h1>

      <div className="flex flex-col gap-2">
        <label htmlFor="title" className="text-[14px] font-medium text-gray-900">
          제목
        </label>
        <Input
          id="title"
          placeholder="제목을 입력해주세요"
          value={textForm.title}
          onChange={handleTextChange("title")}
          errorMessage={errors.title}
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="link" className="text-[14px] font-medium text-gray-900">
          원문 링크
        </label>
        <Input
          id="link"
          placeholder="원문 링크를 입력해주세요"
          value={textForm.link}
          onChange={handleTextChange("link")}
          errorMessage={errors.link}
        />
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-[14px] font-medium text-gray-900">분야</label>
        <Dropdown options={FIELD_OPTIONS} value={selectForm.field} onChange={handleSelectChange("field")} />
        {errors.field && <p className="mt-1 text-[12px] text-error">{errors.field}</p>}
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-[14px] font-medium text-gray-900">문서 타입</label>
        <Dropdown options={DOC_TYPE_OPTIONS} value={selectForm.docType} onChange={handleSelectChange("docType")} />
        {errors.docType && <p className="mt-1 text-[12px] text-error">{errors.docType}</p>}
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-[14px] font-medium text-gray-900">마감일</label>
        <DateInput selectedDate={selectForm.deadline} setSelectedDate={handleSelectChange("deadline")} />
        {errors.deadline && <p className="mt-1 text-[12px] text-error">{errors.deadline}</p>}
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="headcount" className="text-[14px] font-medium text-gray-900">
          최대 인원
        </label>
        <Input
          id="headcount"
          type="number"
          min="1"
          placeholder="인원을 입력해주세요"
          value={textForm.headcount}
          onChange={handleTextChange("headcount")}
          errorMessage={errors.headcount}
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="content" className="text-[14px] font-medium text-gray-900">
          내용
        </label>
        <textarea
          id="content"
          placeholder="내용을 입력해주세요"
          value={textForm.content}
          onChange={handleTextChange("content")}
          className="h-[219px] resize-none rounded-[6px] border border-gray-300 px-5 py-4 text-[16px] text-gray-900 outline-none placeholder:text-gray-400"
        />
        {errors.content && <p className="mt-1 text-[12px] text-error">{errors.content}</p>}
      </div>

      <Button type="submit" variant="solid" size="lg" className="w-full rounded-[8px]">
        수정하기
      </Button>
    </form>
  );
}
