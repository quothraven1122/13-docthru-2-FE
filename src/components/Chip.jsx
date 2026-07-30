import cn from "@/utils/cn";

const FIELD_STYLES = {
  "Next.js": "bg-[#79e16a]",
  API: "bg-[#ff905e]",
  Career: "bg-[#7eb2ee]",
  "Modern JS": "bg-[#f66e6b]",
  Web: "bg-[#f7ea5d]",
};

const STATUS_STYLES = {
  PENDING: { label: "승인 대기", style: "bg-[#fffde7] text-[#f2bc00]" },
  APPROVED: { label: "신청 승인", style: "bg-[#dff0ff] text-[#4095de]" },
  REJECTED: { label: "신청 거절", style: "bg-[#fff0f0] text-[#e54946]" },
  DELETED: { label: "챌린지 삭제", style: "bg-gray-200 text-gray-500" },
};

export default function Chip({ variant = "field", value, className = "" }) {
  if (variant === "field") {
    return (
      <span
        className={cn(
          "inline-flex items-center justify-center rounded-[8px] px-[12px] py-[3px] text-[14px] font-bold text-gray-600",
          FIELD_STYLES[value] ?? "bg-gray-200",
          className,
        )}
      >
        {value}
      </span>
    );
  }

  if (variant === "docType") {
    return (
      <span
        className={cn(
          "inline-flex items-center justify-center rounded-[8px] border border-gray-300 bg-white px-[7px] py-[5px] text-[13px] font-medium text-gray-600",
          className,
        )}
      >
        {value}
      </span>
    );
  }

  const status = STATUS_STYLES[value] ?? STATUS_STYLES.PENDING;
  return (
    <span
      className={cn(
        "inline-flex items-center justify-center rounded-[4px] px-[8px] py-[4px] text-[13px] font-semibold",
        status.style,
        className,
      )}
    >
      {status.label}
    </span>
  );
}
