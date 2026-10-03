import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { createBoard, getBoard, getMyBoards, updateBoard } from "../api.js";
import PostForm from "../components/PostForm.jsx";

const emptyValues = { title: "", content: "" };

export default function WritePage({ onRefreshOwned }) {
  const { postId } = useParams();
  const navigate = useNavigate();
  const [initialValues, setInitialValues] = useState(emptyValues);
  const [isLoading, setIsLoading] = useState(Boolean(postId));
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [editable, setEditable] = useState(!postId);

  useEffect(() => {
    if (!postId) return;
    let cancelled = false;
    setIsLoading(true);
    setEditable(false);
    setError("");
    Promise.all([getBoard(postId), getMyBoards()]).then(([post, owned]) => {
      if (cancelled) return;
      const ownedPosts = Array.isArray(owned) ? owned : owned?.content || [];
      if (!post || !ownedPosts.some((item) => String(item.id) === String(postId))) {
        setError("본인이 작성한 게시글만 수정할 수 있습니다.");
        return;
      }
      setInitialValues({ title: post.title || "", content: post.content || "" });
      setEditable(true);
    }).catch((loadError) => {
      if (!cancelled) setError(loadError.message);
    }).finally(() => {
      if (!cancelled) setIsLoading(false);
    });
    return () => { cancelled = true; };
  }, [postId]);

  async function handleSubmit(values) {
    if (postId && !editable) return false;
    setError("");
    setIsSubmitting(true);
    try {
      const saved = postId ? await updateBoard(postId, values) : await createBoard(values);
      onRefreshOwned();
      navigate(postId ? `/posts/${postId}` : saved?.id ? `/posts/${saved.id}` : "/posts", { replace: true });
      return true;
    } catch (submitError) {
      setError(submitError.message);
      return false;
    } finally {
      setIsSubmitting(false);
    }
  }

  return <>
    {isLoading ? <p role="status">게시글을 불러오는 중입니다.</p> : <>
      {error && <p role="alert">{error}</p>}
      {editable &&
        <PostForm initialValues={initialValues} onSubmit={handleSubmit} submitLabel={postId ? "수정 완료" : "등록"} disabled={isSubmitting} />}
    </>}
    <Link to="/posts">목록으로</Link>
  </>;
}
