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

  return <AuthContext.Provider value={{ token, login, clearAuth }}>
    {children}
  </AuthContext.Provider>;
}

export function useAuthContext() {
  return useContext(AuthContext);
}
