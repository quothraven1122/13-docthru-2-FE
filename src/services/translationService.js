import { authApi } from "./fetchClient";

const translationService = {
  async getTranslationDetail(translationId) {
    return await authApi.get(`/translation/${translationId}`, {
      cache: "no-store",
    });
  },
  async createTranslation(challengeId) {
    return await authApi.post(`/translation`, { challengeId });
  },
  async updateTranslation(translationId, editorContent) {
    return await authApi.patch(`/translation/${translationId}`, { content: editorContent });
  },
  async quitTranslation(translationId) {
    return await authApi.delete(`/translation/${translationId}`);
  },
  async createTranslation(challengeId) {
    return await authApi.post("/translation", { challengeId });
  },
};

export default translationService;
