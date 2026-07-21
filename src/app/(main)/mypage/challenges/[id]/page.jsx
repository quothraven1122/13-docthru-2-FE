"use client";

import Button from "@/components/Button";
import Chip from "@/components/Chip";
import Image from "next/image";
import React from "react";
import ChallengeStatus from "./_components/ChallengeStatus";
import dateUtils from "@/utils/date";
import KebabMenu from "@/components/KebabMenu";
import { useModal } from "@/providers/ModalProvider";
import Modal from "@/components/Modal";
import Link from "next/link";

//임시데이터
const CALLENGE = {
  id: "challenge-010",
  title: "모던 자바스크립트 비동기 패턴 블로그 번역",
  link: "https://modernjs.dev/",
  content:
    "async/await, Promise.all 등 모던 자바스크립트의 비동기 처리 패턴을 다루는 블로그 글입니다. 거절된 후 삭제된 케이스입니다.",
  field: "Modern JS",
  doctype: "블로그",
  deadline: "2026-08-28T23:59:59.000Z",
  headcount: 4,
  createdAt: "2026-07-12T13:00:00.000Z",
  updatedAt: "2026-07-15T09:00:00.000Z",
  status: "REJECTED",
  rejectReason: "번역 대상 분량이 챌린지 기준에 맞지 않습니다.",
  deletedAt: "2026-07-15T09:00:00.000Z",
  deletionReason: "관리자 판단으로 챌린지가 삭제되었습니다.",
};
export default function Page() {
  const { openModal, closeModal } = useModal();

  return (
    <div className="lg:w-[890px] md:w-[696px] w-[343px] mx-auto ">
      <div className="flex flex-col gap-[16px]">
        <ChallengeStatus challenge={CALLENGE} />
        <div className="border-[1px] border-gray-200" />
        <div className="flex justify-between">
          <h2 className="text-[24px] font-[600] text-gray-800">{CALLENGE.title}</h2>
          {CALLENGE.status === "WAITING" && (
            <KebabMenu
              type="user"
              onDelete={() => {
                openModal(
                  <Modal
                    handleClose={closeModal}
                    confirmText="네"
                    cancelText="아니오"
                    onConfirm={closeModal}
                    onCancel={closeModal}
                  >
                    정말 취소하시겠어요?
                  </Modal>,
                );
              }}
            />
          )}
        </div>
        <div className="flex justify-start gap-[7px]">
          <Chip variant="field" value={CALLENGE.field}></Chip>
          <Chip variant="docType" value={CALLENGE.doctype}></Chip>
        </div>
        <div className="text-[13px] flex gap-[8px] text-gray-600 font-[400]">
          <div className="flex gap-1 items-center">
            <Image src="/icons/ic_deadline_s.svg" width={24} height={24} alt="" className="w-6 h-6" />
            <span>{dateUtils.format(CALLENGE.deadline)} 마감</span>
          </div>
          <div className="flex gap-1 items-center ">
            <Image src="/icons/ic_person_default.svg" width={24} height={24} alt="" className="w-6 h-6" />
            <span>{CALLENGE.headcount} 명</span>
          </div>
        </div>
        <div className="border-[1px] border-gray-200" />
        <p className="text-gray-800 text-[18px] font-[600]">원문링크</p>
        {/* 일단 이미지로 생각하고 이렇게 작업. */}
        <Link
          href={CALLENGE.link}
          target="_blank"
          className="w-full bg-black h-[490px] flex justify-end py-[8px] px-[16px]"
        >
          <Button variant="transparent">
            링크 열기
            <Image src="/icons/ic_click.svg" alt="하이퍼링크" width={24} height={24} />
          </Button>
        </Link>
      </div>
    </div>
  );
}
