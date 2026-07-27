// 신청 상태별 배너/칩에 쓰는 표시 정보. status 값은 목록 페이지(admin/page.jsx)와 동일하게 맞춤
export const APPLICATION_STATUS = {
  PENDING: { chip: "PENDING" },
  APPROVED: {
    chip: "APPROVED",
    banner: { text: "신청이 승인된 챌린지입니다.", style: "bg-[#dff0ff] text-[#4095de]" },
  },
  REJECTED: {
    chip: "REJECTED",
    banner: { text: "신청이 거절된 챌린지입니다.", style: "bg-[#fff0f0] text-[#e54946]" },
  },
};
