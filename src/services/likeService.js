import { authApi, publicApi } from "./fetchClient";

const defaultEndpoint = "/translation";

const likeService = {
  async getLikeCount(translationId) {
    return publicApi.get(`${defaultEndpoint}/${translationId}/like/count`);
  },
  async getLikeStatus(translationId) {
    return authApi.get(`${defaultEndpoint}/${translationId}/like/status`);
  },
  async toggleLike(translationId) {
    return authApi.post(`${defaultEndpoint}/${translationId}/like`);
  },
};

export default likeService;
