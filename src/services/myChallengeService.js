import { authApi, publicApi } from "./fetchClient";

const DOCTYPE_LABEL = {
  BLOG: "블로그",
  OFFICIAL: "공식문서",
};

const FIELD_LABEL = {
  NEXTJS: "Next.js",
  CAREER: "Career",
  MODERNJS: "Modern JS",
  WEB: "Web",
};

export const myChallengeService = {
  getMyChallenges: async (params) => {
    const searchParams = new URLSearchParams(params);
    const result = await authApi.get(`/mychallenges?${searchParams}`);
    const dataList = result.dataList.map((item) => {
      const { _count, ...challenge } = item.challenge;
      return {
        ...challenge,
        count: _count.participations,
        doctype: DOCTYPE_LABEL[challenge.docType] ?? challenge.docType,
        field: FIELD_LABEL[challenge.field] ?? challenge.field,
        translationId: item.translation?.[0]?.id,
      };
    });

    return { dataList, nextCursorId: result.nextCursorId };
  },
  getMyAppliedChallenges: async (params) => {
    const searchParams = new URLSearchParams(params);
    const result = await authApi.get(`/mychallenges/applications?${searchParams}`, { cache: "no-store" });

    const dataList = result.myApplications.map((item) => {
      const { ...challenge } = item;
      return {
        ...challenge,
        docType: DOCTYPE_LABEL[challenge.docType] ?? challenge.docType,
        field: FIELD_LABEL[challenge.field] ?? challenge.field,
        status: challenge.deleterId ? "DELETED" : challenge.status,
      };
    });
    return { dataList, totalPage: result.totalPages };
  },
  getMyAppliedChallenge: async (param) => {
    const result = await authApi.get(`/mychallenges/applications/${param}`, { cache: "no-store" });
    const { docType, field, status, deleterId } = result;
    const challege = {
      ...result,
      doctype: DOCTYPE_LABEL[docType] ?? docType,
      field: FIELD_LABEL[field] ?? field,
      status: deleterId ? "DELETED" : status,
    };
    return challege;
  },
  updateMyAppliedChallenge: async (param, body) => {
    const result = await authApi.patch(`/mychallenges/applications/${param}`, body);
    return result;
  },
  deleteMyAppliedChallenge: async (param) => {
    const result = await authApi.delete(`/mychallenges/applications/${param}`);
    return result;
  },
};

export default myChallengeService;
