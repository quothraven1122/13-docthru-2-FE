import { authApi, publicApi } from "@/services/fetchClient";

const defaultEndpoint = "/auth";

export const authService = {
  register: async ({ email, nickname, password, passwordConfirm }) => {
    return publicApi.post(`${defaultEndpoint}/register`, { email, nickname, password, passwordConfirm });
  },
  login: async ({ email, password }) => {
    return publicApi.post(`${defaultEndpoint}/login`, { email, password });
  },
  getMe: async () => {
    return authApi.get("/users/me");
  },
  logout: async () => {
    return authApi.post(`${defaultEndpoint}/logout`);
  },
};
