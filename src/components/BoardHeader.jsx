import { Link } from "react-router-dom";

export default function BoardHeader({ user, onLogout }) {
  return (
    <header>
      <div className="header-inner">
        <Link className="logo" to="/posts">그린보드</Link>
        <nav aria-label="주요 메뉴">
          <Link to="/posts">게시글 목록</Link>
          <Link to="/posts/new">글쓰기</Link>
          <span>{user.name}</span>
          <button type="button" className="text-button" onClick={onLogout}>로그아웃</button>
        </nav>
      </div>
    </header>
  );
}
