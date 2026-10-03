import { useContext, useEffect, useState } from "react";
import { Link, Route, Routes, useNavigate, useParams, useSearchParams } from "react-router-dom";
import "./style.css";
import BoardHeader from "./components/BoardHeader.jsx";
import BoardFooter from "./components/BoardFooter.jsx";
import PostList from "./components/PostList.jsx";
import PostForm from "./components/PostForm.jsx";
import { AuthContext } from "./auth.jsx";

function PostListPage() {
  const { token } = useContext(AuthContext);
  const [searchParams, setSearchParams] = useSearchParams();
  const [posts, setPosts] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [message, setMessage] = useState("게시글 목록");
  const requestedPage = Number(searchParams.get("page"));
  const page = Number.isSafeInteger(requestedPage) && requestedPage > 0 ? requestedPage : 1;

  useEffect(() => {
    // 페이지 번호가 바뀔 때 목록을 다시 조회
    fetch(`http://127.0.0.1:8080/api/board?page=${page - 1}&size=10`, { headers: { Authorization: `Bearer ${token}` } })
      .then((response) => response.json())
      .then((result) => {
        if (!result.success) throw new Error(result.message);
        setPosts(result.data.content);
        setTotalPages(result.data.totalPages);
        setMessage(`전체 ${result.data.totalElements}개`);
      })
      .catch(() => setMessage("게시글을 불러올 수 없습니다."));
  }, [page, token]);

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

function PostWritePage() {
  const [message, setMessage] = useState("");
  return <main>
    <h1>글쓰기</h1>
    <PostForm onSave={() => setMessage("게시글 등록 API는 다음 실습에서 연결합니다.")} />
    <p role="status">{message}</p>
  </main>;
}

function PostDetailPage() {
  const { token } = useContext(AuthContext);
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
        const response = await fetch(`http://127.0.0.1:8080/api/board/${postId}`, { signal: controller.signal, headers: { Authorization: `Bearer ${token}` } });
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
        const response = await fetch(`http://127.0.0.1:8080/api/board/${postId}/comments`, { signal: controller.signal, headers: { Authorization: `Bearer ${token}` } });
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
  }, [postId, token]);

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

function LoginPage() {
  const { login } = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      const response = await fetch("http://127.0.0.1:8080/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: username.trim(), password }),
      });
      const result = await response.json();
      if (!response.ok || !result.success) throw new Error(result.message || "로그인에 실패했습니다.");
      if (!result.data?.accessToken) throw new Error("로그인 토큰이 없습니다.");
      login(result.data.accessToken);
      navigate("/posts");
    } catch (error) {
      setMessage(error.message);
    }
  }

  return <main>
    <h1>로그인</h1>
    <form id="login-form" onSubmit={handleSubmit}>
      <label htmlFor="username">아이디</label>
      <input id="username" name="username" autoComplete="username" required placeholder="아이디를 입력하세요" value={username} onChange={(event) => setUsername(event.target.value)} />
      <label htmlFor="password">비밀번호</label>
      <input id="password" name="password" type="password" autoComplete="current-password" required value={password} onChange={(event) => setPassword(event.target.value)} />
      {message && <p id="login-message" role="alert">{message}</p>}
      <button type="submit">로그인</button>
    </form>
  </main>;
}

export default function App() {
  const { token } = useContext(AuthContext);

  return <>
    <BoardHeader />
    <Routes>
      <Route path="/" element={token ? <PostListPage /> : <LoginPage />} />
      <Route path="/posts" element={token ? <PostListPage /> : <LoginPage />} />
      <Route path="/posts/new" element={token ? <PostWritePage /> : <LoginPage />} />
      <Route path="/posts/:postId" element={token ? <PostDetailPage /> : <LoginPage />} />
      <Route path="/login" element={<LoginPage />} />
    </Routes>
    <BoardFooter />
  </>;
}
