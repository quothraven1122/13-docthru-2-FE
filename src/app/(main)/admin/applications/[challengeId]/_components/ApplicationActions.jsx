"use client";

import Button from "@/components/Button";

import { useModal } from "@/providers/ModalProvider";
import ModalForm from "@/components/ModalForm";

export default function ApplicationActions({ onApprove, onReject }) {
  const { openModal, closeModal } = useModal();

  function handleRejectClick() {
    openModal(
      <ModalForm
        handleClose={closeModal}
        handleConfirm={(reason) => {
          onReject(reason);
          closeModal();
        }}
      />,
    );
  }

  return (
    <div className="flex justify-end gap-3">
      <Button variant="tonal" size="lg" className="flex-1 md:w-[153px] md:flex-none" onClick={handleRejectClick}>
        거절하기
      </Button>
      <Button variant="solid" size="lg" className="flex-1 md:w-[153px] md:flex-none" onClick={onApprove}>
        승인하기
      </Button>
    </div>
  );
}
