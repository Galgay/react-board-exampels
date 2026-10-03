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

  return <AuthContext.Provider value={{ token, login, clearAuth }}>
    {children}
  </AuthContext.Provider>;
}
