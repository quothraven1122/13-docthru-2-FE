"use client";

import { forwardRef, useState } from "react";
import Image from "next/image";

import Input from "@/components/Input";
import cn from "@/utils/cn";

const PasswordField = forwardRef(function PasswordField({ id, label, className, ...inputProps }, ref) {
  const [visible, setVisible] = useState(false);

  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <label htmlFor={id} className="text-sm font-medium text-gray-800">
        {label}
      </label>
      <Input
        id={id}
        ref={ref}
        type={visible ? "text" : "password"}
        suffix={
          <button
            type="button"
            aria-label={visible ? "비밀번호 숨기기" : "비밀번호 보기"}
            onClick={() => setVisible((prev) => !prev)}
            className="flex shrink-0 cursor-pointer items-center"
          >
            <Image
              src={visible ? "/icons/ic_btn_visibility_on.svg" : "/icons/ic_btn_visibility_off.svg"}
              alt="비밀번호 확인 토글"
              width={24}
              height={24}
            />
          </button>
        }
        {...inputProps}
      />
    </div>
  );
});

export default PasswordField;