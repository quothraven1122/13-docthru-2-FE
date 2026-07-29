export const FIELD_OPTIONS = ["Next.js", "Modern JS", "API", "Web", "Career"];
export const DOC_TYPE_OPTIONS = ["공식문서", "블로그"];
export const STATUS_OPTIONS = ["진행중", "마감"];

export const EMPTY_FILTER = { fields: [], docType: null, status: null };

// 화면 표시 라벨 -> BE enum 값 매핑 (필터 적용 시 요청 파라미터 조립용)
// 역방향(enum -> 라벨)은 아래 FIELD_LABELS / DOC_TYPE_LABELS 사용
export const FIELD_LABEL_TO_VALUE = {
  "Next.js": "NEXTJS",
  "Modern JS": "MODERNJS",
  API: "API",
  Web: "WEB",
  Career: "CAREER",
};

export const DOC_TYPE_LABEL_TO_VALUE = { 공식문서: "OFFICIAL", 블로그: "BLOG" };

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

export const FIELD_LABELS = {
  NEXTJS: "Next.js",
  MODERNJS: "Modern JS",
  API: "API",
  WEB: "Web",
  CAREER: "Career",
};

export const DOC_TYPE_LABELS = {
  OFFICIAL: "공식문서",
  BLOG: "블로그",
};

// BE status(WAITING) -> FE Chip에 쓰는 값(PENDING). APPROVED/REJECTED는 동일
export const STATUS_TO_CHIP = {
  WAITING: "PENDING",
  APPROVED: "APPROVED",
  REJECTED: "REJECTED",
};

// ADMIN_SORT_OPTIONS의 드롭다운 값 -> BE 쿼리 파라미터 분기
// 상태 3종은 status로, 정렬 4종은 sort로
export const SORT_VALUE_TO_STATUS = {
  pending: "WAITING",
  approved: "APPROVED",
  rejected: "REJECTED",
};
