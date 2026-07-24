export const FIELD_OPTIONS = ["Next.js", "Modern JS", "API", "Web", "Career"];
export const DOC_TYPE_OPTIONS = ["공식문서", "블로그"];
export const STATUS_OPTIONS = ["진행중", "마감"];

export const EMPTY_FILTER = { fields: [], docType: null, status: null };

export const ADMIN_SORT_OPTIONS = [
  { label: "승인 대기", value: "pending" },
  { label: "신청 승인", value: "approved" },
  { label: "신청 거절", value: "rejected" },
  { label: "신청 시간 빠른순", value: "appliedAtAsc" },
  { label: "신청 시간 느린순", value: "appliedAtDesc" },
  { label: "마감 기한 빠른순", value: "deadlineAsc" },
  { label: "마감 기한 느린순", value: "deadlineDesc" },
];
