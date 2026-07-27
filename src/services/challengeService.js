import { authApi } from "@/services/fetchClient";

const BASE = "/challenges";

export const challengeService = {
  // 신청 목록 조회 (어드민)
  getApplications: async (params = {}) => {
    const query = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") query.set(key, value);
    });
    const qs = query.toString();
    return authApi.get(`${BASE}/applications${qs ? `?${qs}` : ""}`);
  },

  // 신청 상세 조회 (어드민)
  getApplicationDetail: async (challengeId) => {
    return authApi.get(`${BASE}/applications/${challengeId}`);
  },

  // 신청 승인
  approveApplication: async (challengeId) => {
    return authApi.patch(`${BASE}/${challengeId}/approve`);
  },

  // 신청 거절 (사유 필수)
  rejectApplication: async (challengeId, reason) => {
    return authApi.patch(`${BASE}/${challengeId}/reject`, { reason });
  },
};
