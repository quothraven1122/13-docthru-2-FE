"use client";

import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import Button from "@/components/Button";
import DateInput from "@/components/DateInput";
import Dropdown from "@/components/Dropdown";
import Input from "@/components/Input";
import challengeService from "@/services/challengeService";

import { challengeCreateSchema } from "@/schemas/challengeCreateSchema";
import {
  DOC_TYPE_LABEL_TO_VALUE,
  DOC_TYPE_OPTIONS,
  FIELD_LABEL_TO_VALUE,
  FIELD_OPTIONS,
} from "@/constants/challengeOptions";
import { useRouter } from "next/navigation";

const INITIAL_VALUES = {
  title: "",
  link: "",
  field: null,
  docType: null,
  deadline: null,
  headcount: "",
  content: "",
};

export default function ChallengeCreatePage() {
  const router = useRouter();

  const {
    register,
    control,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(challengeCreateSchema),
    mode: "onChange",
    defaultValues: INITIAL_VALUES,
  });

  const onSubmit = async (values) => {
    try {
      // BE는 field/docType을 raw enum(NEXTJS, OFFICIAL 등)으로 받음 -> 드롭다운 라벨을 enum 값으로 변환
      await challengeService.createChallenges({
        ...values,
        field: FIELD_LABEL_TO_VALUE[values.field],
        docType: DOC_TYPE_LABEL_TO_VALUE[values.docType],
      });
      router.push("/challenges");
    } catch (error) {
      setError("create", { message: error.message });
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mx-auto flex w-full max-w-147.5 flex-col gap-6 px-4 py-10 md:px-0"
    >
      <h1 className="text-[20px] font-semibold text-gray-800">신규 챌린지 신청</h1>

      <div className="flex flex-col gap-2">
        <label htmlFor="title" className="text-[14px] font-medium text-gray-900">
          제목
        </label>
        <Input
          id="title"
          placeholder="제목을 입력해주세요"
          errorMessage={errors.title?.message}
          {...register("title")}
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="link" className="text-[14px] font-medium text-gray-900">
          원문 링크
        </label>
        <Input
          id="link"
          placeholder="원문 링크를 입력해주세요"
          errorMessage={errors.link?.message}
          {...register("link")}
        />
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-[14px] font-medium text-gray-900">분야</label>
        <Controller
          name="field"
          control={control}
          render={({ field }) => <Dropdown options={FIELD_OPTIONS} value={field.value} onChange={field.onChange} />}
        />
        {errors.field && <p className="mt-1 text-[12px] text-error">{errors.field.message}</p>}
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-[14px] font-medium text-gray-900">문서 타입</label>
        <Controller
          name="docType"
          control={control}
          render={({ field }) => <Dropdown options={DOC_TYPE_OPTIONS} value={field.value} onChange={field.onChange} />}
        />
        {errors.docType && <p className="mt-1 text-[12px] text-error">{errors.docType.message}</p>}
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-[14px] font-medium text-gray-900">마감일</label>
        <Controller
          name="deadline"
          control={control}
          render={({ field }) => <DateInput selectedDate={field.value} setSelectedDate={field.onChange} />}
        />
        {errors.deadline && <p className="mt-1 text-[12px] text-error">{errors.deadline.message}</p>}
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
          errorMessage={errors.headcount?.message}
          {...register("headcount")}
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="content" className="text-[14px] font-medium text-gray-900">
          내용
        </label>
        <textarea
          id="content"
          placeholder="내용을 입력해주세요"
          className="h-[219px] resize-none rounded-[6px] border border-gray-300 px-5 py-4 text-[16px] text-gray-900 outline-none placeholder:text-gray-400"
          {...register("content")}
        />
        {errors.content && <p className="mt-1 text-[12px] text-error">{errors.content.message}</p>}
      </div>

      {errors.create?.message && <p className="text-center text-sm text-error">{errors.create.message}</p>}

      <Button type="submit" variant="solid" size="lg" className="w-full rounded-[8px]" disabled={isSubmitting}>
        신청하기
      </Button>
    </form>
  );
}
