"use client";

import Image from "next/image";
import React from "react";
import ModalContainer from "./ModalContainer";

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
      <div className="flex flex-col gap-[24px]">
        <Image src="/icons/ic_check.svg" alt="이미지" width={24} height={24} className="mx-auto" />
        <div className="font-pretendard text-[16px] font-[500] leading-normal text-gray-800 text-center">
          {children}
        </div>
      </div>
      {isTwoButton ? (
        <div className="flex gap-[8px]">
          <button className="w-[100px] h-[40px] border-1" onClick={onCancel}>
            {cancelText}
          </button>
          <button className="w-[100px] h-[40px] border-1" onClick={onConfirm}>
            {confirmText}
          </button>
        </div>
      ) : (
        <button className="w-[100px] h-[40px] border-1" onClick={onConfirm}>
          {confirmText}
        </button>
      )}
    </ModalContainer>
  );
}
