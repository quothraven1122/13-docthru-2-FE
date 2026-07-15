import Image from "next/image";

const BADGE = {
  full: {
    icon: "/icons/ic_person_s_white.svg",
    label: "모집이 완료된 상태에요",
    className: "bg-gray-200 text-gray-800",
  },
  closed: {
    icon: "/icons/ic_deadline_s_white.svg",
    label: "챌린지가 마감되었어요",
    className: "bg-gray-800 text-white",
  },
};

/**
 * 카드 상단 상태 뱃지
 * @param {"full" | "closed"} type
 */
export default function StatusBadge({ type, className }) {
  const badge = BADGE[type];
  if (!badge) return null;

  return (
    <div
      className={`inline-flex items-center gap-1 px-3 py-2 rounded-3xl text-[13px]/[normal] font-medium ${badge.className} ${className}`}
    >
      <Image src={badge.icon} width={16} height={16} alt="" />
      <span>{badge.label}</span>
    </div>
  );
}
