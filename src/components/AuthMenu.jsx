import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuthContext } from "../useAuthContext.jsx";

export default function AuthMenu({ onStatus }) {
  const { token, logout } = useAuthContext();
  const [loggingOut, setLoggingOut] = useState(false);
  const navigate = useNavigate();

  async function handleLogout() {
    if (loggingOut) return;
    setLoggingOut(true);
    onStatus("로그아웃 중…");
    try {
      await logout();
      navigate("/login");
      onStatus("");
    } catch (error) {
      onStatus(error.message);
    } finally {
      setLoggingOut(false);
    }
  }

  return <>
    {!token && <Link className="login-link" to="/login">로그인</Link>}
    {token && <button className="logout-button" type="button" disabled={loggingOut} onClick={handleLogout}>로그아웃</button>}
  </>;
}
