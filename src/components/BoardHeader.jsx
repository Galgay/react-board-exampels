import { Link } from "react-router-dom";

export default function BoardHeader() {
  return (
    <header>
      <div className="header-inner">
        <Link className="logo" to="/posts">그린보드</Link>
        <nav aria-label="주요 메뉴"><Link to="/posts">게시글 목록</Link> · <Link to="/posts/new">글쓰기</Link></nav>
      </div>
    </header>
  );
}
