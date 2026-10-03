import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Spinner from "./Spinner.jsx";
import { useAuthContext } from "../useAuthContext.jsx";

export default function PostDetail() {
  const { token } = useAuthContext();
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

  async function loadComments() {
    setCommentLoading(true);
    setCommentError(false);
    setCommentMessage("댓글을 불러오는 중…");
    try {
      const response = await fetch(`http://127.0.0.1:8080/api/board/${postId}/comment`, { headers: { Authorization: `Bearer ${token}` } });
      const result = await response.json();
      if (!response.ok || !result.success) throw new Error(result.message || "댓글을 불러올 수 없습니다.");
      setComments(result.data);
      setCommentMessage("");
    } catch (error) {
      setCommentMessage(error.message);
      setCommentError(true);
    } finally {
      setCommentLoading(false);
    }
  }

  useEffect(() => {
    if (!/^\d+$/.test(postId) || Number(postId) < 1) {
      setPostMessage("잘못된 게시글 번호입니다.");
      setPostLoading(false);
      return;
    }
    setPost(null);
    setComments([]);
    setPostLoading(true);
    setPostError(false);
    setPostMessage("게시글을 불러오는 중…");
    setCommentMessage("");

    async function loadDetail() {
      try {
        const response = await fetch(`http://127.0.0.1:8080/api/board/${postId}`, { headers: { Authorization: `Bearer ${token}` } });
        const result = await response.json();
        if (!response.ok || !result.success) throw new Error(result.message || "게시글을 불러올 수 없습니다.");
        setPost(result.data);
        setPostMessage("");
        setPostLoading(false);
      } catch (error) {
        setPostMessage(error.message);
        setPostError(true);
        setPostLoading(false);
        return;
      }
      await loadComments();
    }

    loadDetail();
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
      const response = await fetch(`http://127.0.0.1:8080/api/board/${postId}/comment`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ content }),
      });
      const result = await response.json();
      if (!response.ok || !result.success) throw new Error(result.message || "댓글을 등록할 수 없습니다.");
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
      <p id="post-meta" className="meta">{post && `${post.authorNickname} · ${post.createdDatetime || ""}`}</p>
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
      {!commentLoading && !commentError && <ul id="comment-list">{comments.length === 0 ? "등록된 댓글이 없습니다." : comments.map((comment) => <li key={comment.id}><strong>{comment.nickname}</strong><p>{comment.content}</p></li>)}</ul>}
      <form id="comment-form" onSubmit={addComment}>
        <label htmlFor="comment-content">댓글 내용</label>
        <textarea id="comment-content" name="content" required maxLength="255" value={commentContent} onChange={(event) => setCommentContent(event.target.value)}></textarea>
        <button type="submit" disabled={commentSaving}>댓글 등록</button>
      </form>
    </section>}
  </main>;
}
