import { useState } from "react";
import { Link } from "react-router-dom";
import AuthMenu from "./AuthMenu.jsx";

export default function BoardHeader() {
  const [message, setMessage] = useState("");

  return (
    <header>
      <Link className="brand" to="/posts">게시판</Link>
      <nav aria-label="주 메뉴">
        <Link to="/posts">게시판</Link>
        <Link className="write-link" to="/posts/new">글쓰기</Link>
        <AuthMenu onStatus={setMessage} />
      </nav>
      <p id="nav-message" role="status">{message}</p>
    </header>
  );
}
