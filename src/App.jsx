import { useContext, useEffect, useState } from "react";
import { Link, Route, Routes, useNavigate, useParams, useSearchParams } from "react-router-dom";
import "./style.css";
import BoardHeader from "./components/BoardHeader.jsx";
import BoardFooter from "./components/BoardFooter.jsx";
import PostList from "./components/PostList.jsx";
import PostForm from "./components/PostForm.jsx";
import { AuthContext } from "./auth.jsx";
import Spinner from "./components/Spinner.jsx";
import { authApi, commentApi, postApi } from "./api.js";

function PostListPage() {
  const { token } = useContext(AuthContext);
  const [searchParams, setSearchParams] = useSearchParams();
  const [posts, setPosts] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [message, setMessage] = useState("게시글 목록");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [retry, setRetry] = useState(0);
  const requestedPage = Number(searchParams.get("page"));
  const page = Number.isSafeInteger(requestedPage) && requestedPage > 0 ? requestedPage : 1;

  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);
    setError(false);
    // 페이지 번호가 바뀔 때 목록을 다시 조회
    postApi.list(page - 1, token, controller.signal)
      .then((data) => {
        setPosts(data.content);
        setTotalPages(data.totalPages);
        setMessage(`전체 ${data.totalElements}개`);
      })
      .catch((requestError) => {
        if (controller.signal.aborted) return;
        setMessage(requestError.message || "게시글을 불러올 수 없습니다.");
        setError(true);
      })
      .finally(() => { if (!controller.signal.aborted) setLoading(false); });
    return () => controller.abort();
  }, [page, token, retry]);

  return <main>
    <h1>게시판</h1>
    <p id="list-message" role="status">{message}</p>
    {loading && <Spinner />}
    {error && <button id="retry-list" type="button" onClick={() => setRetry((value) => value + 1)}>목록 다시 시도</button>}
    {!loading && !error && <PostList posts={posts} />}
    <div className="pagination" aria-label="페이지 이동">
      <button id="previous-page" type="button" disabled={loading || page === 1} onClick={() => setSearchParams({ page: String(page - 1) })}>이전</button>
      <span id="page-number">{totalPages === 0 ? "0페이지" : `${page} / ${totalPages}페이지`}</span>
      <button id="next-page" type="button" disabled={loading || page >= totalPages} onClick={() => setSearchParams({ page: String(page + 1) })}>다음</button>
    </div>
  </main>;
}

function PostWritePage() {
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();

  async function createPost(post) {
    await postApi.create(post, token);
    navigate("/posts");
  }

  return <main>
    <h1>글쓰기</h1>
    <PostForm onSave={createPost} />
  </main>;
}

function PostDetailPage() {
  const { token } = useContext(AuthContext);
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [postMessage, setPostMessage] = useState("");
  const [commentMessage, setCommentMessage] = useState("");
  const [commentContent, setCommentContent] = useState("");
  const [commentSaving, setCommentSaving] = useState(false);
  const [postLoading, setPostLoading] = useState(true);
  const [commentLoading, setCommentLoading] = useState(false);
  const [postError, setPostError] = useState(false);
  const [commentError, setCommentError] = useState(false);
  const [retryPost, setRetryPost] = useState(0);

  async function loadComments(signal) {
    setCommentLoading(true);
    setCommentError(false);
    setCommentMessage("댓글을 불러오는 중…");
    try {
      const data = await commentApi.list(postId, token, signal);
      setComments(data);
      setCommentMessage("");
    } catch (error) {
      if (!signal?.aborted) {
        setCommentMessage(error.message);
        setCommentError(true);
      }
    } finally {
      if (!signal?.aborted) setCommentLoading(false);
    }
  }

  useEffect(() => {
    if (!/^\d+$/.test(postId) || Number(postId) < 1) {
      setPostMessage("잘못된 게시글 번호입니다.");
      setPostLoading(false);
      return;
    }
    const controller = new AbortController();
    setPost(null);
    setComments([]);
    setPostLoading(true);
    setPostError(false);
    setPostMessage("게시글을 불러오는 중…");
    setCommentMessage("");

    async function loadDetail() {
      try {
        const data = await postApi.detail(postId, token, controller.signal);
        setPost(data);
        setPostMessage("");
        setPostLoading(false);
      } catch (error) {
        if (!controller.signal.aborted) {
          setPostMessage(error.message);
          setPostError(true);
          setPostLoading(false);
        }
        return;
      }
      await loadComments(controller.signal);
    }

    loadDetail();
    return () => controller.abort();
  }, [postId, token, retryPost]);

  async function addComment(event) {
    event.preventDefault();
    if (commentSaving) return;
    const content = commentContent.trim();
    if (!content || content.length > 255) {
      setCommentMessage("댓글은 1~255자로 입력하세요.");
      return;
    }
    try {
      setCommentSaving(true);
      await commentApi.create(postId, content, token);
      setCommentContent("");
      // 등록한 글의 댓글만 다시 조회
      await loadComments();
    } catch (error) {
      setCommentMessage(error.message);
    } finally {
      setCommentSaving(false);
    }
  }

  return <main>
    <article>
      <h1 id="post-title">{post?.title || "게시글 상세"}</h1>
      <p id="post-meta" className="meta">{post && `${post.author} · ${post.createdDatetime || ""}`}</p>
      <p id="post-content">{post?.content}</p>
      <p id="post-message" role="status">{postMessage}</p>
      {postLoading && <Spinner />}
      {postError && <button id="retry-post" type="button" onClick={() => setRetryPost((value) => value + 1)}>게시글 다시 시도</button>}
    </article>
    <Link to="/posts">목록으로</Link>
    {post && <section id="comments-section" aria-labelledby="comments-title">
      <h2 id="comments-title">댓글</h2>
      <p id="comment-message" role="status">{commentMessage}</p>
      {commentLoading && <Spinner />}
      {commentError && <button id="retry-comments" type="button" onClick={() => loadComments()}>댓글 다시 시도</button>}
      {!commentLoading && !commentError && <ul id="comment-list">{comments.length === 0 ? "등록된 댓글이 없습니다." : comments.map((comment) => <li key={comment.id}><strong>{comment.author}</strong><p>{comment.content}</p></li>)}</ul>}
      <form id="comment-form" onSubmit={addComment}>
        <label htmlFor="comment-content">댓글 내용</label>
        <textarea id="comment-content" name="content" required maxLength="255" value={commentContent} onChange={(event) => setCommentContent(event.target.value)}></textarea>
        <button type="submit" disabled={commentSaving}>댓글 등록</button>
      </form>
    </section>}
  </main>;
}

function LoginPage() {
  const { login } = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loggingIn, setLoggingIn] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();
    if (loggingIn) return;
    try {
      setLoggingIn(true);
      const tokens = await authApi.login(username.trim(), password);
      if (!tokens?.accessToken) throw new Error("로그인 토큰이 없습니다.");
      login(tokens.accessToken);
      navigate("/posts");
    } catch (error) {
      setMessage(error.message);
    } finally {
      setLoggingIn(false);
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
      <button type="submit" disabled={loggingIn}>로그인</button>
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
