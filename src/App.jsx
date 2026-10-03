const examplePost = {
  id: 1,
  title: "React 게시판 실습",
  author: "강사",
  content: "바닐라 게시판을 React로 옮기는 첫 화면입니다.",
};

export default function App() {
  return (
    <>
      <header>
        <div className="header-inner">
          <strong className="logo">그린보드</strong>
          <nav aria-label="주요 메뉴">게시글 목록</nav>
        </div>
      </header>
      <main>
        <h1>게시판</h1>
        <section>
          <h2>게시글 목록</h2>
          <div className="table-scroll">
            <table>
              <thead>
                <tr><th scope="col">번호</th><th scope="col">제목</th><th scope="col">작성자</th></tr>
              </thead>
              <tbody>
                <tr><td>{examplePost.id}</td><td>{examplePost.title}</td><td>{examplePost.author}</td></tr>
              </tbody>
            </table>
          </div>
        </section>
        <article>
          <h2>{examplePost.title}</h2>
          <p>{examplePost.content}</p>
        </article>
      </main>
      <footer>그린보드</footer>
    </>
  );
}
