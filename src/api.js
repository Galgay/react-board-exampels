const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8080/api";
const ACCESS_TOKEN_KEY = "accessToken";
const REFRESH_TOKEN_KEY = "refreshToken";

let refreshInFlight = null;

function readToken(key) {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
}

function clearTokens() {
  localStorage.removeItem(ACCESS_TOKEN_KEY);
  localStorage.removeItem(REFRESH_TOKEN_KEY);
}

async function parseResponse(response) {
  if (response.status === 204) return null;
  const contentType = response.headers.get("content-type") || "";
  if (contentType.includes("application/json")) return response.json();
  return (await response.text()) || null;
}

function errorMessage(body, status) {
  const message = body?.message || body?.error || body?.data?.message;
  return message ? `${message} (${status})` : `요청을 처리하지 못했습니다. (${status})`;
}

async function send(path, options = {}, authenticated = true) {
  const token = authenticated ? readToken(ACCESS_TOKEN_KEY) : null;
  let response;
  try {
    response = await fetch(API_BASE_URL + path, {
      ...options,
      headers: {
        ...(options.body ? { "Content-Type": "application/json" } : {}),
        ...(token ? { Authorization: "Bearer " + token } : {}),
        ...options.headers,
      },
    });
  } catch {
    throw new Error("서버에 연결할 수 없습니다. Spring API 실행 상태를 확인해 주세요.");
  }

  const body = await parseResponse(response);
  if (!response.ok || body?.success === false) {
    const error = new Error(errorMessage(body, response.status));
    error.status = response.status;
    throw error;
  }
  return body;
}

async function refreshAccessToken() {
  if (refreshInFlight) return refreshInFlight;
  const refreshToken = readToken(REFRESH_TOKEN_KEY);
  if (!refreshToken) throw new Error("로그인이 만료되었습니다. 다시 로그인해 주세요.");

  refreshInFlight = (async () => {
    const response = await send("/auth/refresh", {
      method: "POST",
      body: JSON.stringify({ refreshToken }),
    }, false);
    const accessToken = response?.data?.accessToken;
    if (!accessToken) throw new Error("토큰 갱신 응답에 accessToken이 없습니다.");
    localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
  })();

  try {
    await refreshInFlight;
  } finally {
    refreshInFlight = null;
  }
}

async function request(path, options = {}, authenticated = true, retry = true) {
  try {
    const response = await send(path, options, authenticated);
    return response?.data ?? null;
  } catch (error) {
    if (error.status === 401 && authenticated && retry && !path.startsWith("/auth/")) {
      try {
        await refreshAccessToken();
        return request(path, options, authenticated, false);
      } catch (refreshError) {
        clearTokens();
        window.dispatchEvent(new CustomEvent("board:session-expired"));
        throw refreshError;
      }
    }
    throw error;
  }
}

export function login(credentials) {
  return request("/auth/login", { method: "POST", body: JSON.stringify(credentials) }, false);
}

export function logout() {
  const accessToken = readToken(ACCESS_TOKEN_KEY);
  return request("/auth/logout", { method: "POST", body: JSON.stringify({ accessToken }) });
}

export function getBoards() {
  return request("/board/home?page=0&size=10&sort=createdDatetime%2Cdesc&sort=id%2Cdesc", {}, false);
}

export function getBoard(id) {
  return request("/board/" + encodeURIComponent(id), {}, false);
}

export function getMyBoards() {
  return request("/board/my-posts");
}

export function createBoard(values) {
  return request("/board", { method: "POST", body: JSON.stringify(values) });
}

export function updateBoard(id, values) {
  return request("/board/" + encodeURIComponent(id), { method: "PATCH", body: JSON.stringify(values) });
}

export function deleteBoard(id) {
  return request("/board/" + encodeURIComponent(id), { method: "DELETE" });
}

export function clearStoredTokens() {
  clearTokens();
}
