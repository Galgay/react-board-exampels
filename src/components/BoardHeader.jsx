import { Link } from "react-router-dom";

export default function BoardHeader() {
  return (
    <header>
      <div className="header-inner">
        <Link to="/posts" className="logo">
          Green Board
        </Link>
        <nav>
          <Link to="/posts">글 목록</Link>
          <Link to="/posts/new">글쓰기</Link>
        </nav>
      </div>
    </header>
  );
}
