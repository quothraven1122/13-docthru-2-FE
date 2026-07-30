import { z } from "zod";

export const challengeCreateSchema = z.object({
  title: z.string().min(2, "제목은 2자이상 입력해주세요"),
  link: z.string().min(1, "원문 링크를 입력해주세요").pipe(z.url("올바른 URL 형식으로 입력해주세요")),
  field: z.string().nullable().refine(Boolean, "분야를 선택해주세요"),
  docType: z.string().nullable().refine(Boolean, "문서 타입을 선택해주세요"),
  deadline: z.date().nullable().refine(Boolean, "마감일을 선택해주세요"),
  headcount: z.coerce.number().min(1, "참여 인원을 1명 이상 입력해주세요"),
  content: z.string().min(10, "내용은 10자 이상 입력해주세요"),
});
