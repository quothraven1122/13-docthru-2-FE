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
    return authApi.get(`${BASE}/applications/${challengeId}`, { cache: "no-store" });
  },

  // 신청 승인
  approveApplication: async (challengeId) => {
    return authApi.patch(`${BASE}/${challengeId}/approve`);
  },

  // 신청 거절 (사유 필수)
  rejectApplication: async (challengeId, reason) => {
    return authApi.patch(`${BASE}/${challengeId}/reject`, { reason });
  },

  // 챌린지 상세 조회
  getChallengeDetail: async (challengeId) => {
    return authApi.get(`${BASE}/${challengeId}`);
  },

  // 참여자 목록 조회
  getParticipants: async (challengeId, params = {}) => {
    return authApi.get(`${BASE}/${challengeId}/participants${buildQueryString(params)}`);
  },

  // 챌린지 수정 (어드민, 전달한 필드만 부분 수정)
  updateChallenge: async (challengeId, data) => {
    return authApi.patch(`${BASE}/${challengeId}`, data);
  },

  // 챌린지 삭제 (어드민, 사유 필수 soft delete)
  deleteChallenge: async (challengeId, reason) => {
    return authApi.delete(`${BASE}/${challengeId}`, { body: { reason } });
  },
};

export default challengeService;
