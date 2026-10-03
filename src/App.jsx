import "./style.css";
import BoardHeader from "./components/BoardHeader.jsx";
import BoardFooter from "./components/BoardFooter.jsx";
import PostList from "./components/PostList.jsx";

export default function App() {
  return (
    <>
      <BoardHeader />
      <main>
        <h1>게시판</h1>
        <p id="list-message" role="status">게시글 목록</p>
        <button id="retry-list" type="button" hidden>목록 다시 시도</button>
        <PostList />
        <div className="pagination" aria-label="페이지 이동">
          <button id="previous-page" type="button" disabled>이전</button>
          <span id="page-number">1페이지</span>
          <button id="next-page" type="button" disabled>다음</button>
        </div>
      </main>
      <BoardFooter />
    </>
  );
}
