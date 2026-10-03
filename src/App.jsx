import { useEffect, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { login, logout } from "./api.js";
import { clearSession, getStoredUser, saveSession } from "./auth.js";
import ProtectedLayout from "./components/ProtectedLayout.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import PostDetailPage from "./pages/PostDetailPage.jsx";
import PostListPage from "./pages/PostListPage.jsx";
import WritePage from "./pages/WritePage.jsx";

export default function App() {
  const [user, setUser] = useState(getStoredUser);

  useEffect(() => {
    function handleSessionExpired() {
      clearSession();
      setUser(null);
    }
    window.addEventListener("board:session-expired", handleSessionExpired);
    return () => window.removeEventListener("board:session-expired", handleSessionExpired);
  }, []);

  async function handleLogin(values) {
    const tokens = await login({ username: values.username.trim(), password: values.password });
    setUser(saveSession(tokens, values.username.trim()));
  }

  async function handleLogout() {
    try {
      await logout();
    } catch {
      // 서버 응답이 없어도 브라우저의 로그인 정보는 정리합니다.
    } finally {
      clearSession();
      setUser(null);
    }
  }

  return (
    <Routes>
      <Route path="/login" element={<LoginPage user={user} onLogin={handleLogin} />} />
      <Route element={<ProtectedLayout user={user} onLogout={handleLogout} />}>
          <Route path="/" element={<Navigate to="/posts" replace />} />
          <Route path="/posts" element={<PostListPage />} />
          <Route path="/posts/new" element={<WritePage />} />
          <Route path="/posts/:postId/edit" element={<WritePage />} />
          <Route path="/posts/:postId" element={<PostDetailPage />} />
      </Route>
      <Route path="*" element={<Navigate to={user ? "/posts" : "/login"} replace />} />
    </Routes>
  );
}
