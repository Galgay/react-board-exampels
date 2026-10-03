import { Link } from "react-router-dom";

export default function BoardHeader() {
  return (
    <header>
      <Link className="brand" to="/posts">게시판</Link>
      <nav aria-label="주 메뉴">
        <Link to="/posts">게시판</Link>
        <Link className="write-link" to="/posts/new">글쓰기</Link>
        <Link className="login-link" to="/login">로그인</Link>
        <button className="logout-button" type="button">로그아웃</button>
      </nav>
      <p id="nav-message" role="status"></p>
    </header>
  );
}
