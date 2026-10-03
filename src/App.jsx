import { useEffect, useState } from "react";
import { Link, Route, Routes, useParams, useSearchParams } from "react-router-dom";
import "./style.css";
import BoardHeader from "./components/BoardHeader.jsx";
import BoardFooter from "./components/BoardFooter.jsx";
import PostList from "./components/PostList.jsx";
import PostForm from "./components/PostForm.jsx";

function PostListPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [posts, setPosts] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [message, setMessage] = useState("게시글 목록");
  const requestedPage = Number(searchParams.get("page"));
  const page = Number.isSafeInteger(requestedPage) && requestedPage > 0 ? requestedPage : 1;

  useEffect(() => {
    // 페이지 번호가 바뀔 때 목록을 다시 조회
    fetch(`/api/board?page=${page - 1}&size=10`)
      .then((response) => response.json())
      .then((result) => {
        if (!result.success) throw new Error(result.message);
        setPosts(result.data.content);
        setTotalPages(result.data.totalPages);
        setMessage(`전체 ${result.data.totalElements}개`);
      })
      .catch(() => setMessage("게시글을 불러올 수 없습니다."));
  }, [page]);

  return <main>
    <h1>게시판</h1>
    <p id="list-message" role="status">{message}</p>
    <button id="retry-list" type="button" hidden>목록 다시 시도</button>
    <PostList posts={posts} />
    <div className="pagination" aria-label="페이지 이동">
      <button id="previous-page" type="button" disabled={page === 1} onClick={() => setSearchParams({ page: String(page - 1) })}>이전</button>
      <span id="page-number">{totalPages === 0 ? "0페이지" : `${page} / ${totalPages}페이지`}</span>
      <button id="next-page" type="button" disabled={page >= totalPages} onClick={() => setSearchParams({ page: String(page + 1) })}>다음</button>
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
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [postMessage, setPostMessage] = useState("");
  const [commentMessage, setCommentMessage] = useState("");

  useEffect(() => {
    if (!/^\d+$/.test(postId) || Number(postId) < 1) {
      setPostMessage("잘못된 게시글 번호입니다.");
      return;
    }
    const controller = new AbortController();
    setPost(null);
    setComments([]);
    setPostMessage("게시글을 불러오는 중…");
    setCommentMessage("");

    async function loadDetail() {
      try {
        const response = await fetch(`/api/board/${postId}`, { signal: controller.signal });
        const result = await response.json();
        if (!response.ok || !result.success) throw new Error(result.message || "게시글을 불러올 수 없습니다.");
        setPost(result.data);
        setPostMessage("");
      } catch (error) {
        if (!controller.signal.aborted) setPostMessage(error.message);
        return;
      }

      setCommentMessage("댓글을 불러오는 중…");
      try {
        const response = await fetch(`/api/board/${postId}/comments`, { signal: controller.signal });
        const result = await response.json();
        if (!response.ok || !result.success) throw new Error(result.message || "댓글을 불러올 수 없습니다.");
        setComments(result.data);
        setCommentMessage("");
      } catch (error) {
        if (!controller.signal.aborted) setCommentMessage(error.message);
      }
    }

    loadDetail();
    return () => controller.abort();
  }, [postId]);

  return <main>
    <article>
      <h1 id="post-title">{post?.title || "게시글 상세"}</h1>
      <p id="post-meta" className="meta">{post && `${post.author} · ${post.createdDatetime || ""}`}</p>
      <p id="post-content">{post?.content}</p>
      <p id="post-message" role="status">{postMessage}</p>
    </article>
    <Link to="/posts">목록으로</Link>
    {post && <section id="comments-section" aria-labelledby="comments-title">
      <h2 id="comments-title">댓글</h2>
      <p id="comment-message" role="status">{commentMessage}</p>
      <ul id="comment-list">{comments.length === 0 ? "등록된 댓글이 없습니다." : comments.map((comment) => <li key={comment.id}><strong>{comment.author}</strong><p>{comment.content}</p></li>)}</ul>
      <form id="comment-form" onSubmit={(event) => event.preventDefault()}>
        <label htmlFor="comment-content">댓글 내용</label>
        <textarea id="comment-content" name="content" required maxLength="255"></textarea>
        <button type="submit">댓글 등록</button>
      </form>
    </section>}
  </main>;
}

function LoginPage({ onLogin }) {
  return <main>
    <h1>로그인</h1>
    <form id="login-form" onSubmit={(event) => { event.preventDefault(); onLogin(); }}>
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
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [posts, setPosts] = useState([
    { id: 1, title: "첫 번째 게시글", author: "학생", createdDatetime: "2026-10-04", content: "React 게시판의 첫 글입니다." },
    { id: 2, title: "두 번째 게시글", author: "강사", createdDatetime: "2026-10-04", content: "Props로 데이터를 내려봅니다." },
  ]);

  function savePost(post) {
    setPosts((currentPosts) => [
      { id: Date.now(), ...post, author: "학생", createdDatetime: "2026-10-04" },
      ...currentPosts,
    ]);
  }

  return <>
    <BoardHeader isLoggedIn={isLoggedIn} onLogout={() => setIsLoggedIn(false)} />
    <Routes>
      <Route path="/" element={<PostListPage />} />
      <Route path="/posts" element={<PostListPage />} />
      <Route path="/posts/new" element={<PostWritePage onSave={savePost} />} />
      <Route path="/posts/:postId" element={<PostDetailPage />} />
      <Route path="/login" element={<LoginPage onLogin={() => setIsLoggedIn(true)} />} />
    </Routes>
    <BoardFooter />
  </>;
}
