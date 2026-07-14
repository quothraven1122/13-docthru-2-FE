"use client";

import Modal from "@/components/Modal";
import ModalAlert from "@/components/ModalAlert";
import ModalForm from "@/components/ModalForm";
import { useModal } from "@/providers/ModalProvider";

export default function Page() {
  const { openModal, closeModal } = useModal();
  return (
    <div className="flex justify-center items-center min-h-screen gap-[15px]">
      <button
        className=" h-[48px] border-2 rounded-[8px]"
        onClick={() =>
          openModal(
            <Modal
              handleClose={closeModal}
              buttons={[
                <button key="yes" className="w-[100px] h-[40px] border-1" onClick={closeModal}>
                  네
                </button>,
                <button key="no" className="w-[100px] h-[40px] border-1" onClick={closeModal}>
                  아니오
                </button>,
              ]}
            >
              정말 삭제하시겠어요?
            </Modal>,
          )
        }
      >
        1.기본 모달 형태
      </button>
      <button
        className=" h-[48px] border-2 rounded-[8px]"
        onClick={() =>
          openModal(
            <Modal
              handleClose={closeModal}
              buttons={[
                <button key="yes" className="w-[100px] h-[40px] border-1" onClick={closeModal}>
                  네
                </button>,
              ]}
            >
              로그인이 필요한 기능이에요, <br />
              로그인 하시겠어요?
            </Modal>,
          )
        }
      >
        2.기본 모달 형태
      </button>

      <button
        className=" h-[48px] border-2 rounded-[8px]"
        onClick={() =>
          openModal(
            <ModalAlert handleClose={closeModal} handleConfirm={closeModal}>
              가입이 완료되었습니다!
            </ModalAlert>,
          )
        }
      >
        3.alert형태 (Popup)
      </button>
      <button
        className=" h-[48px] border-2 rounded-[8px]"
        onClick={() =>
          openModal(
            <ModalForm
              handleClose={closeModal}
              title="삭제 사유"
              placeholder="삭제사유를 입력해주세요"
              handleConfirm={(value) => {
                console.log(`모달 폼에서 받은 값 : ${value}`);
              }}
            />,
          )
        }
      >
        4.form형태 모달
      </button>
    </div>
  );
}
