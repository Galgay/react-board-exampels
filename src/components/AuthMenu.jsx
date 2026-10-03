import { Link } from "react-router-dom";
import { useAuthContext } from "../useAuthContext.jsx";

export default function AuthMenu() {
  const { token, clearAuth } = useAuthContext();
  return <>
    {!token && <Link className="login-link" to="/login">로그인</Link>}
    {token && <button className="logout-button" type="button" onClick={clearAuth}>로그아웃</button>}
  </>;
}
