"use server";

import { cookies } from "next/headers";
import { jwtDecode } from "jwt-decode";

// 서버 사이드 전용 함수
export async function getServerSideToken(type = "accessToken") {
  const cookieStore = await cookies();
  const tokenCookie = cookieStore.get(type);
  return tokenCookie ? tokenCookie.value : null;
}

// 인증 상태를 확인함
export async function checkAuth() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;
  const refreshToken = cookieStore.get("refreshToken")?.value;

  if (accessToken) {
    return true;
  }

  if (!refreshToken) {
    return false;
  }

  return true;
}

export async function checkRole() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;
  if (!accessToken) return null;

  const accessTokenData = jwtDecode(accessToken);
  return accessTokenData.role;
}
