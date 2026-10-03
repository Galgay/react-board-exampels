import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getBoard } from "../api.js";
import PostDetail from "../components/PostDetail.jsx";

export default function PostDetailPage() {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [message, setMessage] = useState("게시글을 불러오는 중입니다.");
  const [error, setError] = useState("");

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

  return <>
    {message && <p role="status">{message}</p>}
    {error && <p role="alert">{error}</p>}
    {post && <PostDetail post={post} />}
    <Link to="/posts">목록으로</Link>
  </>;
}
