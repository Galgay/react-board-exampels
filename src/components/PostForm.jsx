export default function PostForm() {
  return (
    <form>
      <h2>글쓰기 미리보기</h2>
      <div><label htmlFor="title">제목</label><input id="title" name="title" /></div>
      <div><label htmlFor="content">본문</label><textarea id="content" name="content" rows="5" /></div>
      <button type="button" disabled>등록은 State 학습 뒤 연결</button>
    </form>
  );
}
