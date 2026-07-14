"use client";

import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";

export default function ModalContainer({ handleClose = () => {}, children, type = "default", className }) {
  const [mounted, setMounted] = useState(false);

  const MODAL_TYPE = {
    alert: "lg:w-[540px] w-[327px] border-[2px] border-gray-800 rounded-[8px]",
    form: "lg:w-[496px] w-[343x] border-[2px] border-gray-800 rounded-[8px] p-[24px] gap-[24px]",
    default:
      "w-[327px] border-[2px] border-gray-800 rounded-[12px] shadow-[0_4px_16px_0_rgba(17,34,17,0.05)] p-[24px] gap-[32px]",
  };

  //SSR상태에서 불러올경우 document를 못찾아서 에러가 난다.
  //마운트된 상태일 경우에만 모달을 호출할 수 있게 처리.
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return createPortal(
    <div className="fixed flex justify-center items-center bg-black/50 w-screen h-screen" onClick={handleClose}>
      <div
        className={className ? className : `flex flex-col justify-center items-center bg-white ${MODAL_TYPE[type]}`}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>,
    document.body,
  );
}
