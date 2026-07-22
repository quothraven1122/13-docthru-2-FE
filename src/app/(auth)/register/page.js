"use client";

import Image from "next/image";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import Button from "@/components/Button";

import { registerSchema } from "@/app/schemas/registerSchema";
import AuthField from "../_components/AuthField";
import PasswordField from "../_components/PasswordField";

const INITIAL_VALUES = { email: "", nickname: "", password: "", passwordConfirm: "" };

export default function RegisterPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
    mode: "onChange",
    defaultValues: INITIAL_VALUES,
  });

  const onSubmit = () => {};

  return (
    <div className="flex flex-1 items-start justify-center bg-white px-6 py-16 mt-30">
      <div className="w-full md:max-w-129.5">
        <Link href="/" className="mb-10 flex items-center justify-center gap-2">
          <Image
            src="/logos/logo_mark.svg"
            alt="로고 이미지"
            width={35}
            height={41}
            priority
            style={{ width: "auto", height: "auto" }}
          />
          <span className="font-bold text-gray-600" style={{ fontSize: "3.6rem", lineHeight: "100%" }}>
            Docthru
          </span>
        </Link>

        <form className="flex flex-col gap-6" noValidate onSubmit={handleSubmit(onSubmit)}>
          <AuthField
            id="email"
            type="email"
            label="이메일"
            placeholder="이메일을 입력해주세요"
            errorMessage={errors.email?.message}
            {...register("email")}
          />

          <AuthField
            id="nickname"
            type="text"
            label="닉네임"
            placeholder="닉네임을 입력해주세요"
            errorMessage={errors.nickname?.message}
            {...register("nickname")}
          />

          <PasswordField
            id="password"
            label="비밀번호"
            placeholder="비밀번호를 입력해주세요"
            errorMessage={errors.password?.message}
            {...register("password")}
          />

          <PasswordField
            id="passwordConfirm"
            label="비밀번호 확인"
            placeholder="비밀번호를 한번 더 입력해 주세요"
            errorMessage={errors.passwordConfirm?.message}
            {...register("passwordConfirm")}
          />

          <Button type="submit" variant="solid" size="lg" className="mt-2 w-full">
            회원가입
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-500">
          회원이신가요?{" "}
          <Link href="/login" className="font-medium text-gray-800 underline underline-offset-2">
            로그인하기
          </Link>
        </p>
      </div>
    </div>
  );
}
