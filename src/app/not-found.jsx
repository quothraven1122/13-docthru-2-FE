import Image from "next/image";
import Link from "next/link";

import Button from "@/components/Button";
import { checkAuth } from "@/utils/auth";
import GnbWrapper from "./(main)/_components/GnbWrapper";

export default async function NotFoundPage() {
  const isAuthenticated = await checkAuth();
  return (
    <div className="w-dvw h-dvh flex flex-col">
      <GnbWrapper />
      <div className="flex-1 flex flex-col justify-center items-center">
        <div className="flex text-[80px]">
          <p>4</p>
          <Image width={50} height={50} src="/logos/logo_mark.svg" alt="로고" />
          <p>4 ERROR</p>
        </div>
        <p className="text-[18px] text-center">
          죄송합니다. 페이지를 찾을 수 없습니다.
          <br />
          존재하지 않는 주소를 입력하셨거나, <br />
          요청하신 페이지의 주소가 변경, 삭제되어 찾을 수 없습니다.
        </p>
        <Link href={isAuthenticated ? "/challenges" : "/"}>
          <Button className="w-[200px] text-brand-yellow mt-[50px]">홈으로</Button>
        </Link>
      </div>
    </div>
  );
}
