const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

function buildRequestOptions({ method, body, headers, cache }) {
  return {
    method,
    // accessToken/refreshToken 쿠키 전송을 위한 설정 (둘 다 httpOnly)
    credentials: "include",
    cache: cache ?? (method && method !== "GET" ? "no-store" : "force-cache"),
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
    ...(body !== undefined && { body: typeof body === "string" ? body : JSON.stringify(body) }),
  };
}

async function parseErrorMessage(response, endpoint) {
  const data = await response.json().catch(() => null);
  return data?.message ?? `API error: ${response.status} (${endpoint})`;
}

async function handleResponse(response, endpoint) {
  if (!response.ok) {
    throw new Error(await parseErrorMessage(response, endpoint));
  }
  if (response.status === 204) return null;

  const contentType = response.headers.get("content-type");
  return contentType && contentType.includes("application/json")
    ? response.json()
    : { status: response.status, ok: response.ok };
}

/**
 * 인증이 필요 없는 요청용 (회원가입, 로그인 등). refreshToken 쿠키 수신을 위해 credentials는 항상 포함.
 */
async function publicRequest(endpoint, { method, body, headers, cache } = {}) {
  const response = await fetch(`${BASE_URL}${endpoint}`, buildRequestOptions({ method, body, headers, cache }));
  return handleResponse(response, endpoint);
}

/**
 * accessToken 인증이 필요한 요청용. 401 발생 시 refreshToken으로 갱신 후 1회 재시도.
 */
async function authRequest(endpoint, { method, body, headers, cache } = {}) {
  const requestOptions = buildRequestOptions({ method, body, headers, cache });
  const response = await fetch(`${BASE_URL}${endpoint}`, requestOptions);

  // 2. 401 아니면 그냥 반환
  if (response.status !== 401 || endpoint === "/auth/token/refresh") {
    return handleResponse(response, endpoint);
  }

  // 3. refreshToken으로 갱신 시도
  const refreshResponse = await fetch(`${BASE_URL}/auth/token/refresh`, { method: "POST", credentials: "include" });

  // 4. 갱신 실패 시 원래 401 에러 반환
  if (!refreshResponse.ok) {
    return handleResponse(response, endpoint);
  }

  // 5. 갱신 성공 시 원래 요청 재시도
  const retryResponse = await fetch(`${BASE_URL}${endpoint}`, requestOptions);
  return handleResponse(retryResponse, endpoint);
}

export const publicApi = {
  get: (endpoint, options = {}) => publicRequest(endpoint, options),
  post: (endpoint, body, options = {}) => publicRequest(endpoint, { method: "POST", body, ...options }),
  patch: (endpoint, body, options = {}) => publicRequest(endpoint, { method: "PATCH", body, ...options }),
  delete: (endpoint, options = {}) => publicRequest(endpoint, { method: "DELETE", ...options }),
};

export const authApi = {
  get: (endpoint, options = {}) => authRequest(endpoint, options),
  post: (endpoint, body, options = {}) => authRequest(endpoint, { method: "POST", body, ...options }),
  patch: (endpoint, body, options = {}) => authRequest(endpoint, { method: "PATCH", body, ...options }),
  delete: (endpoint, options = {}) => authRequest(endpoint, { method: "DELETE", ...options }),
};
