const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8080/api";

async function request(path, options = {}, needsLogin = false) {
  let response;
  try {
    const accessToken = localStorage.getItem("accessToken");
    response = await fetch(`${API_BASE_URL}${path}`, {
      ...options,
      headers: {
        ...(options.body ? { "Content-Type": "application/json" } : {}),
        ...(needsLogin && accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
      },
    });
  } catch {
    throw new Error("서버에 연결할 수 없습니다. Spring API 실행 상태를 확인해 주세요.");
  }
  const body = response.status === 204 ? null : await response.json();
  if (!response.ok || body?.success === false) {
    throw new Error(body?.message || `요청 실패 (${response.status})`);
  }
  return body?.data ?? null;
}

export function login(credentials) {
  return request("/auth/login", { method: "POST", body: JSON.stringify(credentials) });
}

export function logout() {
  const accessToken = localStorage.getItem("accessToken");
  return request("/auth/logout", { method: "POST", body: JSON.stringify({ accessToken }) }, true);
}

export function getBoards() {
  return request("/board/home?page=0&size=10&sort=createdDatetime%2Cdesc&sort=id%2Cdesc");
}

export function getBoard(id) {
  return request(`/board/${encodeURIComponent(id)}`);
}
