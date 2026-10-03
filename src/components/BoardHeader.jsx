export default function BoardHeader() {
  return (
    <header>
      <a className="brand" href="/">게시판</a>
      <nav aria-label="주 메뉴">
        <a href="/">게시판</a>
        <a className="write-link" href="/">글쓰기</a>
        <a className="login-link" href="/">로그인</a>
        <button className="logout-button" type="button">로그아웃</button>
      </nav>
      <p id="nav-message" role="status"></p>
    </header>
  );
}
