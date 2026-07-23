import { publicApi } from "@/services/fetchClient";

const defaultEndpoint = "/auth";

export const authService = {
  register: async ({ email, nickname, password, passwordConfirm }) => {
    return publicApi.post(`${defaultEndpoint}/register`, { email, nickname, password, passwordConfirm });
  },
};
