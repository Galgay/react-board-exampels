import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { createBoard, getBoard, updateBoard } from "../api.js";
import PostForm from "../components/PostForm.jsx";

const emptyValues = { title: "", content: "" };

export default function WritePage() {
  const { postId } = useParams();
  const navigate = useNavigate();
  const [initialValues, setInitialValues] = useState(emptyValues);
  const [isLoading, setIsLoading] = useState(Boolean(postId));
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!postId) return;
    let cancelled = false;
    setIsLoading(true);
    getBoard(postId).then((post) => {
      if (!cancelled) setInitialValues({ title: post.title || "", content: post.content || "" });
    }).catch((loadError) => {
      if (!cancelled) setError(loadError.message);
    }).finally(() => {
      if (!cancelled) setIsLoading(false);
    });
    return () => { cancelled = true; };
  }, [postId]);

  async function handleSubmit(values) {
    setError("");
    setIsSubmitting(true);
    try {
      const saved = postId ? await updateBoard(postId, values) : await createBoard(values);
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
      {!(postId && error && initialValues === emptyValues) &&
        <PostForm initialValues={initialValues} onSubmit={handleSubmit} submitLabel={postId ? "수정 완료" : "등록"} disabled={isSubmitting} />}
    </>}
    <Link to="/posts">목록으로</Link>
  </>;
}
