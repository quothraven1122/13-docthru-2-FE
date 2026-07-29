"use client";

import { useEffect, useState } from "react";

import Button from "@/components/Button";
import DateInput from "@/components/DateInput";
import Dropdown from "@/components/Dropdown";
import Input from "@/components/Input";

import { DOC_TYPE_OPTIONS, FIELD_OPTIONS } from "@/constants/challengeOptions";
import { useParams, useRouter } from "next/navigation";
import myChallengeService from "@/services/myChallengeService";
import { useModal } from "@/providers/ModalProvider";
import Modal from "@/components/Modal";

//서버에 있는 걸로 다시 보내주기위해서 매핑...
const DOCTYPE_LABEL_REVERSE = { 블로그: "BLOG", 공식문서: "OFFICIAL" };
const FIELD_LABEL_REVERSE = { Web: "WEB", API: "API", Career: "CAREER", "Next.js": "NEXTJS" };

const INITIAL_TEXT_FORM = { title: "", link: "", headcount: "", content: "" };
const INITIAL_SELECT_FORM = { field: null, docType: null, deadline: null };

export default function ChallengeUpdatePage() {
  const [textForm, setTextForm] = useState(INITIAL_TEXT_FORM);
  const [selectForm, setSelectForm] = useState(INITIAL_SELECT_FORM);
  const [errors, setErrors] = useState({});
  const { openModal, closeModal } = useModal();

  const { id } = useParams();
  const router = useRouter();

  useEffect(() => {
    //수정하기 위해서 그 전에 입력한 챌린지 정보를 가져와서 미리 입력해준다.
    async function getMyAppliedChallenge() {
      const result = await myChallengeService.getMyAppliedChallenge(id);
      setTextForm((prev) => ({
        ...prev,
        title: result.title,
        link: result.link,
        headcount: result.headcount,
        content: result.content,
      }));
      setSelectForm((prev) => ({
        ...prev,
        field: result.field,
        docType: result.doctype,
        deadline: new Date(result.deadline),
      }));
    }
    getMyAppliedChallenge();
  }, []);

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

    async function updateMyAppliedChallenge() {
      const { docType } = textForm;
      const { field } = selectForm;

      await myChallengeService.updateMyAppliedChallenge(id, {
        ...textForm,
        ...selectForm,
        docType: DOCTYPE_LABEL_REVERSE[docType],
        field: FIELD_LABEL_REVERSE[field],
      });

      openModal(
        <Modal
          handleClose={() => {
            closeModal();
            router.push(`/mypage/challenges/${id}`);
          }}
          confirmText="네"
          onConfirm={() => {
            closeModal();
            router.push(`/mypage/challenges/${id}`);
          }}
        >
          수정이 완료되었습니다.
        </Modal>,
      );
    }
    updateMyAppliedChallenge();
  };

  return (
    <form onSubmit={handleSubmit} className="mx-auto flex w-full max-w-[590px] flex-col gap-6 px-4 py-10 md:px-0">
      <h1 className="text-[20px] font-semibold text-gray-800">챌린지 수정하기</h1>

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
