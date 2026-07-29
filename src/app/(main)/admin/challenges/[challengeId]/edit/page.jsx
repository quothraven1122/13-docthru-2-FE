"use client";

import { useState } from "react";

import { useParams, useRouter } from "next/navigation";

import Button from "@/components/Button";
import DateInput from "@/components/DateInput";
import Dropdown from "@/components/Dropdown";
import Input from "@/components/Input";

import { useApplicationDetail, useUpdateChallenge } from "@/hooks/useApplications";

import {
  DOC_TYPE_OPTIONS,
  FIELD_OPTIONS,
  FIELD_LABELS,
  DOC_TYPE_LABELS,
  FIELD_LABEL_TO_VALUE,
  DOC_TYPE_LABEL_TO_VALUE,
} from "@/constants/challengeOptions";

export default function AdminChallengeEditPage() {
  const { challengeId } = useParams();
  const router = useRouter();

  const { data, isPending, error } = useApplicationDetail(challengeId);
  const update = useUpdateChallenge(challengeId);

  if (isPending) {
    return <p className="py-20 text-center text-gray-400">불러오는 중...</p>;
  }
  if (error || !data) {
    return <p className="py-20 text-center text-gray-400">챌린지 정보를 불러오지 못했습니다.</p>;
  }

  function handleSubmit(payload) {
    update.mutate(payload, {
      onSuccess: () => router.back(),
      onError: (err) => alert(err.message),
    });
  }

  return <ChallengeEditForm challenge={data} isSaving={update.isPending} onSubmit={handleSubmit} />;
}

function ChallengeEditForm({ challenge, isSaving, onSubmit }) {
  const [textForm, setTextForm] = useState({
    title: challenge.title ?? "",
    link: challenge.link ?? "",
    headcount: String(challenge.headcount ?? ""),
    content: challenge.content ?? "",
  });
  const [selectForm, setSelectForm] = useState({
    field: FIELD_LABELS[challenge.field] ?? null,
    docType: DOC_TYPE_LABELS[challenge.docType] ?? null,
    deadline: challenge.deadline ? new Date(challenge.deadline) : null,
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

    onSubmit({
      title: textForm.title.trim(),
      link: textForm.link.trim(),
      content: textForm.content.trim(),
      field: FIELD_LABEL_TO_VALUE[selectForm.field],
      docType: DOC_TYPE_LABEL_TO_VALUE[selectForm.docType],
      deadline: selectForm.deadline,
      headcount: Number(textForm.headcount),
    });
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

      <Button type="submit" variant="solid" size="lg" className="w-full rounded-[8px]" disabled={isSaving}>
        {isSaving ? "수정 중..." : "수정하기"}
      </Button>
    </form>
  );
}
