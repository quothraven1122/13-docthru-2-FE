import { z } from "zod";

export const registerSchema = z
  .object({
    email: z.string().min(1, "이메일을 입력해주세요").pipe(z.email("이메일 형식으로 입력해주세요")),
    nickname: z
      .string()
      .min(1, "닉네임을 입력해주세요")
      .min(2, "닉네임은 최소 2자 이상 입력해주세요")
      .max(10, "닉네임은 최대 10자까지 입력 가능해요"),
    password: z.string().min(1, "비밀번호를 입력해주세요").min(9, "비밀번호는 최소 9자 이상 입력해주세요"),
    passwordConfirm: z.string().min(1, "비밀번호를 한번 더 입력해주세요"),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: "비밀번호가 일치하지 않습니다",
    path: ["passwordConfirm"],
  });
