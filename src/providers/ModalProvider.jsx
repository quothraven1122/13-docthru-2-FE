"use client";
import React, { createContext, useCallback, useContext, useState } from "react";

const ModalContext = createContext(null);

//모달을 전역에서 관리하게 만드는 Provider
export default function ModalProvider({ children }) {
  const [modal, setModal] = useState(); //어떤 모달을 열지 상태관리.

  const openModal = useCallback((modal) => setModal(modal), []);
  const closeModal = useCallback(() => setModal(null), []); //닫을때는 저장해둔 모달을 날려버린다.

  return (
    <ModalContext.Provider value={{ openModal, closeModal }}>
      {children}
      {modal}
    </ModalContext.Provider>
  );
}

export function useModal() {
  const modalContext = useContext(ModalContext);
  if (!modalContext) throw new Error("useModal은 ModalProvider 내부에서 사용해주세요");
  return modalContext;
}
