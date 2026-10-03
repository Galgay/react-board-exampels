import { Link } from "react-router-dom";

export default function AuthMenu({ isLoggedIn, onLogout }) {
  return <>
    {!isLoggedIn && <Link className="login-link" to="/login">로그인</Link>}
    {isLoggedIn && <button className="logout-button" type="button" onClick={onLogout}>로그아웃</button>}
  </>;
}
