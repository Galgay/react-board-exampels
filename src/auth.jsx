import { createContext, useState } from "react";
import { authApi } from "./api.js";

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
    try {
      await authApi.logout(token);
    } catch (error) {
      if (error.status === 401) clearAuth();
      throw error;
    }
    clearAuth();
  }

  return <AuthContext.Provider value={{ token, login, clearAuth, logout }}>
    {children}
  </AuthContext.Provider>;
}
