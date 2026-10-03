const USER_KEY = "greenboardUser";

function readClaims(token) {
  try {
    const payload = token.split(".")[1].replace(/-/g, "+").replace(/_/g, "/");
    const padded = payload.padEnd(Math.ceil(payload.length / 4) * 4, "=");
    const bytes = Uint8Array.from(atob(padded), (character) => character.charCodeAt(0));
    return JSON.parse(new TextDecoder().decode(bytes));
  } catch {
    return {};
  }
}

export function getStoredUser() {
  if (!localStorage.getItem("accessToken")) return null;
  try {
    const user = JSON.parse(localStorage.getItem(USER_KEY));
    return user && user.username ? user : null;
  } catch {
    return null;
  }
}

export function saveSession(tokens, fallbackUsername) {
  if (!tokens?.accessToken || !tokens?.refreshToken) {
    throw new Error("로그인 응답에서 토큰을 확인할 수 없습니다.");
  }
  const claims = readClaims(tokens.accessToken);
  const user = {
    id: String(claims.userId ?? claims.id ?? claims.sub ?? fallbackUsername),
    username: claims.username ?? claims.sub ?? fallbackUsername,
    name: claims.name ?? claims.nickname ?? claims.sub ?? fallbackUsername,
  };
  localStorage.setItem("accessToken", tokens.accessToken);
  localStorage.setItem("refreshToken", tokens.refreshToken);
  localStorage.setItem(USER_KEY, JSON.stringify(user));
  return user;
}

export function clearSession() {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
  localStorage.removeItem(USER_KEY);
}
