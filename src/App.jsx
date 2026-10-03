import { useState } from "react";
import "./style.css";
import BoardHeader from "./components/BoardHeader.jsx";
import BoardFooter from "./components/BoardFooter.jsx";
import PostList from "./components/PostList.jsx";

export default function App() {
  const [posts, setPosts] = useState([
    { id: 1, title: "첫 번째 게시글", author: "학생", createdDatetime: "2026-10-04", content: "React 게시판의 첫 글입니다." },
    { id: 2, title: "두 번째 게시글", author: "강사", createdDatetime: "2026-10-04", content: "Props로 데이터를 내려봅니다." },
  ]);

  function addPracticePost() {
    const id = Date.now();
    setPosts((currentPosts) => [
      { id, title: `임시 게시글 ${currentPosts.length + 1}`, author: "학생", createdDatetime: "2026-10-04", content: "State 변경을 확인합니다." },
      ...currentPosts,
    ]);
  }

  return (
    <>
      <BoardHeader />
      <main>
        <h1>게시판</h1>
        <p id="list-message" role="status">게시글 목록</p>
        <button id="retry-list" type="button" hidden>목록 다시 시도</button>
        <PostList posts={posts} onSelect={(post) => window.alert(post.title)} />
        <button type="button" onClick={addPracticePost}>임시 게시글 추가</button>
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
