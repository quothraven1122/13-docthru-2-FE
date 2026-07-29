import { authApi } from "./fetchClient";

const challengeService = {
  async getChallenges({ page, pageSize, keyword, field, docType, progress } = {}) {
    const query = new URLSearchParams();

    if (page) query.set("page", page);
    if (pageSize) query.set("pageSize", pageSize);
    if (keyword) query.set("keyword", keyword);
    if (field?.length) query.set("field", field.join(","));
    if (docType) query.set("docType", docType);
    if (progress) query.set("progress", progress);

    return authApi.get(`/challenges?${query.toString()}`);
  },
};

export default challengeService;
