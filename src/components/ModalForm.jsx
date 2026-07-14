"use client";

import Image from "next/image";
import React, { useState } from "react";
import ModalContainer from "./ModalContainer";

export default function ModalForm({
  handleClose = () => {},
  handleConfirm = (value) => {},
  title = "거절 사유",
  placeholder = "거절사유를 입력해주세요",
}) {
  const [textValue, setTextValue] = useState();
  return (
    <ModalContainer type="form" handleClose={handleClose}>
      <div className="flex justify-between gap-[24px] w-full">
        <span className="font-pretendard text-[18px] font-[700] leading-[26px] text-gray-800">{title}</span>
        <Image src="/icons/ic_out.svg" alt="X이미지" width={20} height={20} onClick={handleClose} />
      </div>

      <form id="reasonForm" className="flex flex-col justify-center gap-[8px] w-full ">
        <label htmlFor="reason" className="font-pretendard text-[16px] font-[400] leading-[26px]">
          내용
        </label>
        <div className="h-[219px] py-[16px] px-[20px] rounded-[6px] border-[1px] border-gray-300">
          <textarea
            id="reason"
            className="w-full h-full resize-none"
            placeholder={placeholder}
            value={textValue}
            onChange={(e) => setTextValue(e.target.value)}
          ></textarea>
        </div>
      </form>
      <button
        form="reasonForm"
        type="submit"
        className="w-full h-[48px] border-1 "
        onClick={(e) => {
          e.preventDefault();
          handleConfirm(textValue);
        }}
      >
        네
      </button>
    </ModalContainer>
  );
}
