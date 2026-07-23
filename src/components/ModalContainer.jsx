"use client";

import { useClickOutside } from "@/hooks/useClickOutside";
import cn from "@/utils/cn";
import React, { useRef } from "react";

const MODAL_TYPE = {
  alert: "lg:w-[540px] w-[327px] border-[2px] border-gray-800 rounded-[8px]",
  form: "lg:w-[496px] w-[343px] border-[2px] border-gray-800 rounded-[8px] p-[24px] gap-[24px]",
  default:
    "w-[327px] border-[2px] border-gray-800 rounded-[12px] shadow-[0_4px_16px_0_rgba(17,34,17,0.05)] p-[24px] gap-[32px]",
};

export default function ModalContainer({ handleClose = () => {}, children, type = "default", className }) {
  const modalRef = useRef(null);
  useClickOutside(modalRef, handleClose);

  return (
    <div
      className="fixed flex justify-center items-center bg-black/50 w-screen h-screen z-modal"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) {
          handleClose();
        }
      }} //백드롭을 눌렀을 때만 닫히게 수정.
    >
      <div
        ref={modalRef}
        className={cn("flex flex-col justify-center items-center bg-white", MODAL_TYPE[type], className)}
      >
        {children}
      </div>
    </div>
  );
}
