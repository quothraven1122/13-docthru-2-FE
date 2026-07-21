"use client";

import { useState } from "react";

import Button from "@/components/Button";
import DateInput from "@/components/DateInput";
import Dropdown from "@/components/Dropdown";
import Input from "@/components/Input";

import { DOC_TYPE_OPTIONS, FIELD_OPTIONS } from "@/constants/challengeOptions";

export default function ChallengeCreatePage() {
  const [title, setTitle] = useState("");
  const [link, setLink] = useState("");
  const [field, setField] = useState(null);
  const [docType, setDocType] = useState(null);
  const [deadline, setDeadline] = useState(null);
  const [headcount, setHeadcount] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: #29 기능 작업에서 실제 API 연동 예정
    console.log({ title, link, field, docType, deadline, headcount, content });
  };

  return (
    <form onSubmit={handleSubmit} className="mx-auto flex w-full max-w-[590px] flex-col gap-6 px-4 py-10 md:px-0">
      <h1 className="text-[20px] font-semibold text-gray-800">신규 챌린지 신청</h1>

      <div className="flex flex-col gap-2">
        <label htmlFor="title" className="text-[14px] font-medium text-gray-900">
          제목
        </label>
        <Input
          id="title"
          placeholder="제목을 입력해주세요"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="link" className="text-[14px] font-medium text-gray-900">
          원문 링크
        </label>
        <Input
          id="link"
          placeholder="원문 링크를 입력해주세요"
          value={link}
          onChange={(e) => setLink(e.target.value)}
        />
      </div>

      <div className="flex flex-col gap-2">
        <p className="text-[14px] font-medium text-gray-900">분야</p>
        <Dropdown options={FIELD_OPTIONS} value={field} onChange={setField} />
      </div>

      <div className="flex flex-col gap-2">
        <p className="text-[14px] font-medium text-gray-900">문서 타입</p>
        <Dropdown options={DOC_TYPE_OPTIONS} value={docType} onChange={setDocType} />
      </div>

      <div className="flex flex-col gap-2">
        <p className="text-[14px] font-medium text-gray-900">마감일</p>
        <DateInput selectedDate={deadline} setSelectedDate={setDeadline} />
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
          value={headcount}
          onChange={(e) => setHeadcount(e.target.value)}
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="content" className="text-[14px] font-medium text-gray-900">
          내용
        </label>
        <textarea
          id="content"
          placeholder="내용을 입력해주세요"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="h-[219px] resize-none rounded-[6px] border border-gray-300 px-5 py-4 text-[16px] text-gray-900 outline-none placeholder:text-gray-400"
        />
      </div>

      <Button type="submit" variant="solid" size="lg" className="w-full rounded-[8px]">
        신청하기
      </Button>
    </form>
  );
}
