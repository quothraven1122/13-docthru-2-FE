"use client";

import ApplicationDetail from "./_components/ApplicationDetail";
import ApplicationStatusBanner from "./_components/ApplicationStatusBanner";
import ApplicationActions from "./_components/ApplicationActions";
import RejectReasonBox from "./_components/RejectReasonBox";

import { APPLICATION_STATUS } from "./_components/applicationStatus";

// TODO: API 연동 시 목데이터 제거 (challengeId로 조회)
const MOCK_APPLICATION = {
  no: 1023,
  title: "Next.js - App Router : Routing Fundamentals",
  field: "Next.js",
  docType: "공식문서",
  description:
    "Next.js App Router 공식 문서 중 Routing Fundamentals 내용입니다! 라우팅에 따른 폴더와 파일이 구성되는 법칙과 컨벤션 등에 대해 공부할 수 있을 것 같아요~! 다들 챌린지 많이 참여해 주세요 :)",
  deadline: "2026-03-03",
  maxMember: 5,
  status: "PENDING",
  rejectReason:
    "독스루는 개발 문서 번역 플랫폼으로, 다른 종류의 번역 챌린지를 개최할 수 없음을 알려드립니다. 감사합니다.",
  rejectedAt: "24/02/24 16:38",
};

export default function AdminApplicationDetailPage() {
  const application = MOCK_APPLICATION;
  const statusInfo = APPLICATION_STATUS[application.status] ?? APPLICATION_STATUS.PENDING;

  function handleApprove() {
    // TODO: 승인 API 연동 (PATCH /challenges/:id/approve)
  }

  function handleReject(reason) {
    // TODO: 거절 API 연동 (PATCH /challenges/:id/reject, body: { reason })
    console.log("거절 사유:", reason);
  }

  return (
    <div className="mx-auto flex max-w-[890px] flex-col gap-4 px-4 py-8 md:py-10">
      <ApplicationStatusBanner banner={statusInfo.banner} />

      {application.status === "REJECTED" && (
        <RejectReasonBox reason={application.rejectReason} rejectedAt={application.rejectedAt} />
      )}

      <ApplicationDetail application={application} />

      {application.status === "PENDING" && <ApplicationActions onApprove={handleApprove} onReject={handleReject} />}
    </div>
  );
}
