import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { deleteBoard, getBoard } from "../api.js";
import PostDetail from "../components/PostDetail.jsx";

export default function PostDetailPage({ ownedBoardIds, onRefreshOwned }) {
  const { postId } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [message, setMessage] = useState("게시글을 불러오는 중입니다.");
  const [error, setError] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let cancelled = false;
    setPost(null);
    setMessage("게시글을 불러오는 중입니다.");
    setError("");
    getBoard(postId).then((result) => {
      if (cancelled) return;
      setPost(result);
      setMessage(result ? "" : "게시글을 찾을 수 없습니다.");
    }).catch((loadError) => {
      if (cancelled) return;
      setError(loadError.message);
      setMessage("");
    });
    return () => { cancelled = true; };
  }, [postId]);

  async function handleDelete() {
    setIsDeleting(true);
    setError("");
    try {
      await deleteBoard(postId);
      onRefreshOwned();
      navigate("/posts", { replace: true });
    } catch (deleteError) {
      setError(deleteError.message);
    } finally {
      setIsDeleting(false);
    }
  }

  return <>
    {message && <p role="status">{message}</p>}
    {error && <p role="alert">{error}</p>}
    {post && <><PostDetail post={post} />{ownedBoardIds.includes(String(post.id)) && <div className="actions"><Link to={`/posts/${postId}/edit`}>수정</Link><button type="button" disabled={isDeleting} onClick={handleDelete}>{isDeleting ? "삭제 중..." : "삭제"}</button></div>}</>}
    <Link to="/posts">목록으로</Link>
  </>;
}
