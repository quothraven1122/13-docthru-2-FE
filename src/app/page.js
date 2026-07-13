"use client";
import Image from "next/image";
import { useState } from "react";
import Input from "@/components/Input";
import DateInput from "@/components/DateInput";

export default function Home() {
  const [data, setData] = useState({ email: "", wrongEmail: "", password: "", date: null });
  const [clicked, setClicked] = useState(false);
  return (
    <>
      <div onClick={() => console.log(data)} className="flex flex-col gap-[20px]">
        <Input
          value={data.email}
          onChange={(e) => setData((prev) => ({ ...prev, email: e.target.value }))}
          placeholder="이메일을 입력해주세요"
        />
        <Input
          value={data.wrongEmail}
          onChange={(e) => setData((prev) => ({ ...prev, wrongEmail: e.target.value }))}
          errorMessage="잘못된 이메일입니다."
          placeholder="이메일을 입력해주세요"
        />
        <Input
          type={clicked ? "text" : "password"}
          value={data.password}
          onChange={(e) => setData((prev) => ({ ...prev, password: e.target.value }))}
          suffix={
            <Image
              width={24}
              height={24}
              src={clicked ? "/icons/ic_btn_visibility_on.svg" : "/icons/ic_btn_visibility_off.svg"}
              alt="아이콘"
              onClick={() => setClicked((prev) => !prev)}
            />
          }
          placeholder="비밀번호를 입력해주세요"
        />
        <DateInput selectedDate={data.date} setSelectedDate={(date) => setData((prev) => ({ ...prev, date }))} />
      </div>
    </>
  );
  x;
}
