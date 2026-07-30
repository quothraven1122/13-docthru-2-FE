"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import Button from "@/components/Button";

import { loginSchema } from "@/schemas/loginSchema";
import { useAuth } from "@/providers/AuthProvider";
import AuthField from "../_components/AuthField";
import PasswordField from "../_components/PasswordField";

const INITIAL_VALUES = { email: "", password: "" };

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(loginSchema),
    mode: "onChange",
    defaultValues: INITIAL_VALUES,
  });

  const onSubmit = async (values) => {
    try {
      await login(values);
      router.push("/challenges");
    } catch (error) {
      setError("root", { message: error.message });
    }
  };

  return (
    <div className="flex flex-1 items-start justify-center bg-white px-6 py-16 mt-[7.78rem]">
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

          <PasswordField
            id="password"
            label="비밀번호"
            placeholder="비밀번호를 입력해주세요"
            errorMessage={errors.password?.message}
            {...register("password")}
          />

          {errors.root?.message && <p className="text-error text-center text-sm">{errors.root.message}</p>}

          <Button type="submit" variant="solid" size="lg" className="mt-2 w-full" disabled={isSubmitting}>
            로그인
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-500">
          회원이 아니신가요?{" "}
          <Link href="/register" className="font-medium text-gray-800 underline underline-offset-2">
            회원가입하기
          </Link>
        </p>
      </div>
    </div>
  );
}
