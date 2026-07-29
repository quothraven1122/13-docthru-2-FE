import { authApi } from "@/services/fetchClient";

const BASE = "/challenges";

function buildQueryString(params) {
  const query = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      if (value.length) query.set(key, value.join(","));
      return;
    }
    if (value !== undefined && value !== null && value !== "") query.set(key, value);
  });
  const qs = query.toString();
  return qs ? `?${qs}` : "";
}

const challengeService = {
  // 챌린지 생성
  createChallenges: async (body) => {
    return authApi.post(`${BASE}/create`, body);
  },

  // 챌린지 목록 조회
  getChallenges: async (params = {}) => {
    return authApi.get(`${BASE}${buildQueryString(params)}`);
  },

  // 신청 목록 조회 (어드민)
  getApplications: async (params = {}) => {
    return authApi.get(`${BASE}/applications${buildQueryString(params)}`);
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

export default challengeService;
