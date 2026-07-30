"use client";

import { createContext, useContext } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";

import { authService } from "@/services/authService";

const AUTH_ME_QUERY_KEY = ["auth", "me"];

const AuthContext = createContext({
  user: null,
  isPending: true,
  register: () => {},
  login: () => {},
  logout: () => {},
});

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth는 AuthProvider 내부에서 사용해주세요");
  return context;
}

export default function AuthProvider({ children }) {
  const queryClient = useQueryClient();

  const { data: user, isPending } = useQuery({
    queryKey: AUTH_ME_QUERY_KEY,
    queryFn: async () => {
      const data = await authService.getMe();
      return data ?? null;
    },
    retry: false,
    staleTime: 0,
  });

  // 회원가입/로그인 등 인증 성공 응답 처리 공통 로직
  const saveAuth = (data) => {
    queryClient.setQueryData(AUTH_ME_QUERY_KEY, data.user);
  };

  const register = async (values) => {
    const data = await authService.register(values);
    saveAuth(data);
    return data;
  };

  const login = async (values) => {
    const data = await authService.login(values);
    saveAuth(data);
    return data;
  };

  const logout = async () => {
    queryClient.setQueryData(AUTH_ME_QUERY_KEY, null);

    await authService.logout();
  };

  return (
    <AuthContext.Provider value={{ user: user ?? null, isPending, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
