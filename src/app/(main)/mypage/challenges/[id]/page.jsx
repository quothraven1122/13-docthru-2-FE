"use client";

import Button from "@/components/Button";
import Chip from "@/components/Chip";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import ChallengeStatus from "./_components/ChallengeStatus";
import dateUtils from "@/utils/date";
import KebabMenu from "@/components/KebabMenu";
import { useModal } from "@/providers/ModalProvider";
import Modal from "@/components/Modal";
import Link from "next/link";
import myChallengeService from "@/services/myChallengeService";
import { useParams, useRouter } from "next/navigation";

export default function MyAppliedChalleng() {
  const { openModal, closeModal } = useModal();
  const [isLoading, setIsLoading] = useState(true);
  const [challenge, setChallenge] = useState();
  const { id } = useParams();
  const router = useRouter();

  useEffect(() => {
    async function getMyAppliedChallenge() {
      const result = await myChallengeService.getMyAppliedChallenge(id);
      console.log(result);
      setChallenge(result);
      setIsLoading(false);
    }
    getMyAppliedChallenge();
  }, []);

  async function handleCancleChallenge() {
    await myChallengeService.deleteMyAppliedChallenge(id);
    closeModal();
    router.push("/mypage");
  }

  if (isLoading) return <div>로딩중입니다...</div>;
  return (
    <div className="lg:w-[890px] md:w-[696px] w-[343px] mx-auto ">
      <div className="flex flex-col gap-[16px]">
        <ChallengeStatus challenge={challenge} />
        <div className="border-[1px] border-gray-200" />
        <div className="flex justify-between">
          <h2 className="text-[24px] font-[600] text-gray-800">{challenge.title}</h2>
          {challenge.status === "WAITING" && (
            <KebabMenu
              type="user"
              onDelete={() => {
                openModal(
                  <Modal
                    handleClose={closeModal}
                    confirmText="네"
                    cancelText="아니오"
                    onConfirm={handleCancleChallenge}
                    onCancel={closeModal}
                  >
                    정말 취소하시겠어요?
                  </Modal>,
                );
              }}
              onEdit={() => {
                router.push(`/mypage/challenges/${id}/patch`);
              }}
            />
          )}
        </div>
        <div className="flex justify-start gap-[7px]">
          <Chip variant="field" value={challenge.field}></Chip>
          <Chip variant="docType" value={challenge.doctype}></Chip>
        </div>
        <p className="text-[16px] leading-[20.8px] text-gray-700 font-[500]">{challenge.content}</p>
        <div className="text-[13px] flex gap-[8px] text-gray-600 font-[400]">
          <div className="flex gap-1 items-center">
            <Image src="/icons/ic_deadline_s.svg" width={24} height={24} alt="" className="w-6 h-6" />
            <span>{dateUtils.format(challenge.deadline)} 마감</span>
          </div>
          <div className="flex gap-1 items-center ">
            <Image src="/icons/ic_person_default.svg" width={24} height={24} alt="" className="w-6 h-6" />
            <span>{challenge.headcount} 명</span>
          </div>
        </div>
        <div className="border-[1px] border-gray-200" />
        <p className="text-gray-800 text-[18px] font-[600]">원문링크</p>
        <Link
          href={challenge.link}
          target="_blank"
          className="relative w-full h-[490px] flex justify-end py-[8px] px-[16px] overflow-hidden rounded-[8px]"
        >
          <iframe
            className="w-full h-full pointer-events-none" //link이벤트를 안받아서 클릭방지.
            src={challenge.link}
          />
          <Button className="absolute top-[16px] right-[32px]" variant="transparent">
            링크 열기
            <Image src="/icons/ic_click.svg" alt="하이퍼링크" width={24} height={24} />
          </Button>
        </Link>
      </div>
    </div>
  );
}
