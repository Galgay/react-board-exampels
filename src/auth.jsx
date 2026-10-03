import { createContext, useState } from "react";

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem("boardAccessToken"));

  function login(accessToken) {
    localStorage.setItem("boardAccessToken", accessToken);
    setToken(accessToken);
  }

  function clearAuth() {
    localStorage.removeItem("boardAccessToken");
    setToken(null);
  }

  async function logout() {
    const response = await fetch("http://127.0.0.1:8080/api/auth/logout", {
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
