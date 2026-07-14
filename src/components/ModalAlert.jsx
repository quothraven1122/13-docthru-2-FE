"use client";

import React from "react";
import ModalContainer from "./ModalContainer";

export default function ModalAlert({ handleClose = () => {}, handleConfirm = () => {}, children }) {
  return (
    <ModalContainer handleClose={handleClose} type="alert">
      <div className="font-pretendard text-[18px] font-[500] leading-normal text-gray-800 text-center lg:mt-[108px] mt-[81px]">
        {children}
      </div>
      <div className="w-full flex lg:justify-end justify-center lg:mt-[45px] mt-[44px] mb-[28px] lg:mr-[28px]">
        <button className="w-[120px] h-[48px] border-1" onClick={handleConfirm}>
          확인
        </button>
      </div>
    </ModalContainer>
  );
}
