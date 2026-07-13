import Image from "next/image";
import Input from "@/components/Input";

export default function Home() {
  return (
    <div>
      페이지 입니다.
      <div className="flex flex-col gap-[20px]">
        <Input placeholder="이메일을 입력해주세요" />
        <Input errorMessage="잘못된 이메일입니다." placeholder="이메일을 입력해주세요" />
        <Input
          type="password"
          suffix={<Image width={24} height={24} src={"/icons/ic_btn_visibility_off.svg"} alt="아이콘" />}
          placeholder="비밀번호를 입력해주세요"
        />
      </div>
    </div>
  );
  x;
}
