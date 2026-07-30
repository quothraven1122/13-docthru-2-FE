import dateUtils from "@/utils/date";
import React from "react";

export default function ChallengeStatus({ challenge }) {
  if (challenge.status === "DELETED")
    return (
      <div className="flex flex-col gap-[16px]">
        <div className="w-full h-[35px] text-center mt-[16px] rounded-[17.5px] bg-gray-500">
          <span className="text-gray-50 text-[16px] font-[600] leading-[35px]">삭제된 챌린지 입니다.</span>
        </div>
        <div className="w-full rounded-[16px] border-[1px] border-gray-200 bg-gray-50 text-center px-[16px] pt-[18px] pb-[16px]">
          <p className="text-center mx-auto text-[14px] font-[600]">삭제 사유</p>
          <p className="text-center mx-auto mt-[12px] text-[16px] font-[500]">{challenge.deletionReason}</p>
          <p className="text-right mt-[18px] text-gray-500 text-[14px] font-[400]">
            {dateUtils.formatDateTime(challenge.deletedAt)}
          </p>
        </div>
      </div>
    );

  if (challenge.status === "REJECTED")
    return (
      <div className="flex flex-col gap-[16px]">
        <div className="w-full h-[35px] text-center mt-[16px] rounded-[17.5px] bg-[#FFF0F0]">
          <span className="text-[#E54946] text-[16px] font-[600] leading-[35px]">신청이 거절되었습니다.</span>
        </div>
        <div className="w-full rounded-[16px] border-[1px] border-gray-200 bg-gray-50 text-center px-[16px] pt-[18px] pb-[16px]">
          <p className="text-center mx-auto text-[14px] font-[600]">신청 거절 사유</p>
          <p className="text-center mx-auto mt-[12px] text-[16px] font-[500]">{challenge.rejectReason}</p>
          <div className="flex justify-end gap-[8px] mt-[17px]">
            <p className="text-right text-gray-500 text-[14px] font-[400]">{challenge.approver.nickname}</p>
            <p className="text-gray-200">|</p>
            <p className="text-right text-gray-500 text-[14px] font-[400]">
              {dateUtils.formatDateTime(challenge.updatedAt)}
            </p>
          </div>
        </div>
      </div>
    );

  if (challenge.status === "WAITING")
    return (
      <div className="flex flex-col gap-[16px]">
        <div className="w-full h-[35px] text-center mt-[16px] rounded-[17.5px] bg-[#FFFDE7]">
          <span className="text-[#F2BC00] text-[16px] font-[600] leading-[35px]">승인대기 중입니다.</span>
        </div>
      </div>
    );
}
