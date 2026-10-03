import "./style.css";

export default function App() {
  const boardName = "게시판";

  return (
    <>
      <header>
        <a className="brand" href="/">{boardName}</a>
        <nav aria-label="주 메뉴">
          <a href="/">게시판</a>
          <a className="write-link" href="/">글쓰기</a>
          <a className="login-link" href="/">로그인</a>
          <button className="logout-button" type="button">로그아웃</button>
        </nav>
        <p id="nav-message" role="status"></p>
      </header>
      <main>
        <h1>게시판</h1>
        <p id="list-message" role="status">게시글 목록</p>
        <button id="retry-list" type="button" hidden>목록 다시 시도</button>
        <ul id="post-list" className="post-list">
          <li><a href="/">첫 번째 게시글</a><div className="meta">학생 · 2026-10-04</div></li>
        </ul>
        <div className="pagination" aria-label="페이지 이동">
          <button id="previous-page" type="button" disabled>이전</button>
          <span id="page-number">1페이지</span>
          <button id="next-page" type="button" disabled>다음</button>
        </div>
      </main>
      <footer>함께 배우고 기록하는 {boardName}</footer>
    </>
  );
}
