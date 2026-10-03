import { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem("boardAccessToken"));

  function login(accessToken) {
    localStorage.setItem("boardAccessToken", accessToken);
    setToken(accessToken);
  }

  // 서버에 리프레시 API가 있으나, 리프레시 토큰을 이용한 액세스 토큰 재발급 연동과
  // 로그인 유지 기능은 실습 분량을 고려하여 생략
  function clearAuth() {
    localStorage.removeItem("boardAccessToken");
    setToken(null);
  }

  async function logout() {
    const response = await fetch("http://127.0.0.1:8080/api/user/logout", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify({ accessToken: token }),
    });
    if (response.status !== 204) {
      const result = await response.json().catch(() => null);
      if (!response.ok || !result?.success) throw new Error(result?.message || "로그아웃에 실패했습니다.");
    }
    clearAuth();
  }

  return <AuthContext.Provider value={{ token, login, clearAuth, logout }}>
    {children}
  </AuthContext.Provider>;
}

export function useAuthContext() {
  return useContext(AuthContext);
}
