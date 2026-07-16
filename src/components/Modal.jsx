"use client";

import Image from "next/image";
import React from "react";
import ModalContainer from "./ModalContainer";
import Button from "./Button";

export default function Modal({
  handleClose = () => {},
  children,
  confirmText = "",
  cancelText = "",
  onConfirm = () => {},
  onCancel = () => {},
}) {
  const isTwoButton = confirmText && cancelText; //버튼이 두개인지 한개인지를 text에 입력된 값으로판별하자.
  return (
    <ModalContainer handleClose={handleClose}>
      <div className="flex flex-col gap-[24px] items-center">
        <div className="w-[24px] h-[24px] rounded-full bg-black flex items-center justify-center shrink-0">
          <Image src="/icons/ic_check.svg" alt="이미지" width={12} height={12} className="w-[12px] h-[12px] shrink-0" />
        </div>
        <div className="font-pretendard text-[16px] font-[500] leading-normal text-gray-800 text-center">
          {children}
        </div>
      </div>
      {isTwoButton ? (
        <div className="flex gap-[8px]">
          <Button className="w-[90px]" variant="outline" onClick={onCancel}>
            {cancelText}
          </Button>
          <Button className="w-[90px]" onClick={onConfirm}>
            {confirmText}
          </Button>
        </div>
      ) : (
        <Button className="w-[90px]" onClick={onConfirm}>
          {confirmText}
        </Button>
      )}
    </ModalContainer>
  );
}
