export const FIELD_OPTIONS = ["Next.js", "Modern JS", "API", "Web", "Career"];
export const DOC_TYPE_OPTIONS = ["공식문서", "블로그"];
export const STATUS_OPTIONS = ["진행중", "마감"];

export const EMPTY_FILTER = { fields: [], docType: null, status: null };

// 화면 표시용 라벨 <-> BE enum 값 매핑 (BE는 raw enum으로 응답/요청받음)
export const FIELD_LABEL_TO_VALUE = {
  "Next.js": "NEXTJS",
  "Modern JS": "MODERNJS",
  API: "API",
  Web: "WEB",
  Career: "CAREER",
};
export const FIELD_VALUE_TO_LABEL = Object.fromEntries(
  Object.entries(FIELD_LABEL_TO_VALUE).map(([label, value]) => [value, label]),
);

export const DOC_TYPE_LABEL_TO_VALUE = { 공식문서: "OFFICIAL", 블로그: "BLOG" };
export const DOC_TYPE_VALUE_TO_LABEL = Object.fromEntries(
  Object.entries(DOC_TYPE_LABEL_TO_VALUE).map(([label, value]) => [value, label]),
);

// 상태(진행중/마감)는 BE의 progress 쿼리(ONGOING/CLOSED)에 대응 (신청 승인 상태 WAITING/APPROVED/REJECTED와는 다른 개념)
export const STATUS_LABEL_TO_PROGRESS = { 진행중: "ONGOING", 마감: "CLOSED" };

export const ADMIN_SORT_OPTIONS = [
  { label: "승인 대기", value: "pending" },
  { label: "신청 승인", value: "approved" },
  { label: "신청 거절", value: "rejected" },
  { label: "신청 시간 빠른순", value: "appliedAtAsc" },
  { label: "신청 시간 느린순", value: "appliedAtDesc" },
  { label: "마감 기한 빠른순", value: "deadlineAsc" },
  { label: "마감 기한 느린순", value: "deadlineDesc" },
];
