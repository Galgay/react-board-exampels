const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8080/api";

async function request(path) {
  let response;
  try {
    response = await fetch(`${API_BASE_URL}${path}`);
  } catch {
    throw new Error("서버에 연결할 수 없습니다. Spring API 실행 상태를 확인해 주세요.");
  }
  const body = await response.json();
  if (!response.ok || body?.success === false) {
    throw new Error(body?.message || `요청 실패 (${response.status})`);
  }
  return body?.data ?? null;
}

export function getBoards() {
  return request("/board/home?page=0&size=10&sort=createdDatetime%2Cdesc&sort=id%2Cdesc");
}

export function getBoard(id) {
  return request(`/board/${encodeURIComponent(id)}`);
}
