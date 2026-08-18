export default function WritePage() {
  return (
    <>
      <h1>게시판</h1>
      <p className="intro">새로운 게시글을 작성합니다.</p>
      <section className="board-section">
        <h2>게시글 작성</h2>
        <form>
          <label htmlFor="title">제목</label>
          <input id="title" />

          <label htmlFor="content">내용</label>
          <textarea id="content" rows="8" />

          <button type="button">등록</button>
        </form>
      </section>
    </>
  );
}
