import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().min(1, "이메일을 입력해주세요").pipe(z.email("이메일 형식으로 입력해주세요")),
  password: z.string().min(1, "비밀번호를 입력해주세요"),
});
