import { useEffect, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { getMyBoards, login, logout } from "./api.js";
import { clearSession, getStoredUser, saveSession } from "./auth.js";
import ProtectedLayout from "./components/ProtectedLayout.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import PostDetailPage from "./pages/PostDetailPage.jsx";
import PostListPage from "./pages/PostListPage.jsx";
import WritePage from "./pages/WritePage.jsx";

export default function App() {
  const [user, setUser] = useState(getStoredUser);
  const [ownedBoardIds, setOwnedBoardIds] = useState([]);
  const [ownershipVersion, setOwnershipVersion] = useState(0);

  useEffect(() => {
    if (!user) {
      setOwnedBoardIds([]);
      return;
    }
    let cancelled = false;
    getMyBoards().then((result) => {
      if (cancelled) return;
      const posts = Array.isArray(result) ? result : result?.content || [];
      setOwnedBoardIds(posts.map((post) => String(post.id)));
    }).catch(() => {
      if (!cancelled) setOwnedBoardIds([]);
    });
    return () => { cancelled = true; };
  }, [user, ownershipVersion]);

  useEffect(() => {
    function handleSessionExpired() {
      clearSession();
      setUser(null);
    }
    window.addEventListener("board:session-expired", handleSessionExpired);
    return () => window.removeEventListener("board:session-expired", handleSessionExpired);
  }, []);

  function refreshOwnedBoards() {
    setOwnershipVersion((current) => current + 1);
  }

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
          <Route path="/posts" element={<PostListPage ownedBoardIds={ownedBoardIds} onRefreshOwned={refreshOwnedBoards} />} />
          <Route path="/posts/new" element={<WritePage onRefreshOwned={refreshOwnedBoards} />} />
          <Route path="/posts/:postId/edit" element={<WritePage onRefreshOwned={refreshOwnedBoards} />} />
          <Route path="/posts/:postId" element={<PostDetailPage ownedBoardIds={ownedBoardIds} onRefreshOwned={refreshOwnedBoards} />} />
      </Route>
      <Route path="*" element={<Navigate to={user ? "/posts" : "/login"} replace />} />
    </Routes>
  );
}
