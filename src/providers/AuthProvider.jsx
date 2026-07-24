"use client";

import { createContext, useContext, useState } from "react";

import { authService } from "@/services/authService";

const AuthContext = createContext({
  user: null,
  register: () => {},
  login: () => {},
  saveAuth: () => {},
});

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth는 AuthProvider 내부에서 사용해주세요");
  return context;
}

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  // 회원가입/로그인 등 인증 성공 응답 처리 공통 로직
  const saveAuth = (data) => {
    setUser(data.user);
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

  return <AuthContext.Provider value={{ user, register, login }}>{children}</AuthContext.Provider>;
}
