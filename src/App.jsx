import { useState } from "react";
import { Link, Route, Routes } from "react-router-dom";
import "./style.css";
import BoardHeader from "./components/BoardHeader.jsx";
import BoardFooter from "./components/BoardFooter.jsx";
import PostList from "./components/PostList.jsx";
import PostForm from "./components/PostForm.jsx";

function PostListPage({ posts, onAddPracticePost }) {
  return <main>
    <h1>게시판</h1>
    <p id="list-message" role="status">게시글 목록</p>
    <button id="retry-list" type="button" hidden>목록 다시 시도</button>
    <PostList posts={posts} />
    <button type="button" onClick={onAddPracticePost}>임시 게시글 추가</button>
    <div className="pagination" aria-label="페이지 이동">
      <button id="previous-page" type="button" disabled>이전</button>
      <span id="page-number">1페이지</span>
      <button id="next-page" type="button" disabled>다음</button>
    </div>
  </main>;
}

function PostWritePage({ onSave }) {
  return <main>
    <h1>글쓰기</h1>
    <PostForm onSave={onSave} />
  </main>;
}

function PostDetailPage() {
  return <main>
    <article>
      <h1 id="post-title">게시글 상세</h1>
      <p id="post-meta" className="meta"></p>
      <p id="post-content"></p>
      <p id="post-message" role="status"></p>
    </article>
    <Link to="/posts">목록으로</Link>
    <section id="comments-section" aria-labelledby="comments-title">
      <h2 id="comments-title">댓글</h2>
      <p id="comment-message" role="status"></p>
      <ul id="comment-list"></ul>
      <form id="comment-form">
        <label htmlFor="comment-content">댓글 내용</label>
        <textarea id="comment-content" name="content" required maxLength="255"></textarea>
        <button type="submit">댓글 등록</button>
      </form>
    </section>
  </main>;
}

function LoginPage() {
  return <main>
    <h1>로그인</h1>
    <form id="login-form">
      <label htmlFor="username">아이디</label>
      <input id="username" name="username" autoComplete="username" required placeholder="아이디를 입력하세요" />
      <label htmlFor="password">비밀번호</label>
      <input id="password" name="password" type="password" autoComplete="current-password" required />
      <p id="login-message" role="alert" hidden></p>
      <button type="submit">로그인</button>
    </form>
  </main>;
}

export default function App() {
  const [posts, setPosts] = useState([
    { id: 1, title: "첫 번째 게시글", author: "학생", createdDatetime: "2026-10-04", content: "React 게시판의 첫 글입니다." },
    { id: 2, title: "두 번째 게시글", author: "강사", createdDatetime: "2026-10-04", content: "Props로 데이터를 내려봅니다." },
  ]);

  function addPracticePost() {
    setPosts((currentPosts) => [
      { id: Date.now(), title: `임시 게시글 ${currentPosts.length + 1}`, author: "학생", createdDatetime: "2026-10-04", content: "State 변경을 확인합니다." },
      ...currentPosts,
    ]);
  }

  function savePost(post) {
    setPosts((currentPosts) => [
      { id: Date.now(), ...post, author: "학생", createdDatetime: "2026-10-04" },
      ...currentPosts,
    ]);
  }

  return <>
    <BoardHeader />
    <Routes>
      <Route path="/" element={<PostListPage posts={posts} onAddPracticePost={addPracticePost} />} />
      <Route path="/posts" element={<PostListPage posts={posts} onAddPracticePost={addPracticePost} />} />
      <Route path="/posts/new" element={<PostWritePage onSave={savePost} />} />
      <Route path="/posts/:postId" element={<PostDetailPage />} />
      <Route path="/login" element={<LoginPage />} />
    </Routes>
    <BoardFooter />
  </>;
}
