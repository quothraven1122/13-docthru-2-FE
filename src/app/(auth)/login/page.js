import Image from "next/image";
import Link from "next/link";

import Button from "@/components/Button";

import AuthField from "../_components/AuthField";
import PasswordField from "../_components/PasswordField";

export default function LoginPage() {
  return (
    <div className="flex flex-1 items-start justify-center bg-white px-6 py-16 md:items-center md:py-10">
      <div className="w-full max-w-100">
        <Link href="/" className="mb-10 flex items-center justify-center gap-2">
          <Image src="/logos/logo_mark.svg" alt="로고 이미지" width={35} height={40.5} priority />
          <span
            className="font-bold text-gray-600"
            style={{ fontSize: "43.2px", lineHeight: "100%", letterSpacing: "0.7801px" }}
          >
            Docthru
          </span>
        </Link>

        <form className="flex flex-col gap-6">
          <AuthField id="email" name="email" type="email" label="이메일" placeholder="이메일을 입력해주세요" />

          <PasswordField id="password" name="password" label="비밀번호" placeholder="비밀번호를 입력해주세요" />

          <Button type="submit" variant="solid" size="lg" className="mt-2 w-full">
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
