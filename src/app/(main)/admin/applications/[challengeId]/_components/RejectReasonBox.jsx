export default function RejectReasonBox({ reason, rejectedAt }) {
  return (
    <div className="flex flex-col gap-4 rounded-[12px] bg-gray-50 px-4 py-5">
      <p className="text-center text-[14px] font-semibold text-gray-900">신청 거절 사유</p>
      <p className="whitespace-pre-line text-[14px] leading-relaxed text-gray-600">{reason}</p>
      {rejectedAt && <p className="text-right text-[13px] text-gray-400">{rejectedAt}</p>}
    </div>
  );
}
