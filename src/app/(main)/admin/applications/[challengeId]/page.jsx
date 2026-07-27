"use client";

import { useParams } from "next/navigation";

import ApplicationDetail from "./_components/ApplicationDetail";
import ApplicationStatusBanner from "./_components/ApplicationStatusBanner";
import ApplicationActions from "./_components/ApplicationActions";
import RejectReasonBox from "./_components/RejectReasonBox";

import { useApplicationDetail, useApplicationMutations } from "@/hooks/useApplications";
import { APPLICATION_STATUS } from "./_components/applicationStatus";
import { FIELD_LABELS, DOC_TYPE_LABELS, STATUS_TO_CHIP } from "@/constants/challengeOptions";

// BE 상세 응답 -> 상세 컴포넌트가 쓰는 형식으로 변환
function toDetail(item) {
  return {
    no: item.id.slice(0, 8),
    title: item.title,
    field: FIELD_LABELS[item.field] ?? item.field,
    docType: DOC_TYPE_LABELS[item.docType] ?? item.docType,
    description: item.content,
    link: item.link,
    deadline: item.deadline,
    maxMember: item.headcount,
    status: item.deletedAt ? "DELETED" : STATUS_TO_CHIP[item.status],
    rejectReason: item.rejectReason,
  };
}

export default function AdminApplicationDetailPage() {
  const { challengeId } = useParams();
  const { data, isLoading, isError } = useApplicationDetail(challengeId);
  const { approve, reject } = useApplicationMutations(challengeId);

  if (isLoading) {
    return <p className="py-20 text-center text-gray-400">불러오는 중...</p>;
  }
  if (isError || !data) {
    return <p className="py-20 text-center text-gray-400">신청 정보를 불러오지 못했습니다.</p>;
  }

  const application = toDetail(data);
  const statusInfo = APPLICATION_STATUS[application.status] ?? APPLICATION_STATUS.PENDING;

  return (
    <div className="mx-auto flex max-w-[890px] flex-col gap-4 px-4 py-8 md:py-10">
      <ApplicationStatusBanner banner={statusInfo.banner} />

      {application.status === "REJECTED" && <RejectReasonBox reason={application.rejectReason} />}

      <ApplicationDetail application={application} />

      {application.status === "PENDING" && (
        <ApplicationActions onApprove={() => approve.mutate()} onReject={(reason) => reject.mutate(reason)} />
      )}
    </div>
  );
}
