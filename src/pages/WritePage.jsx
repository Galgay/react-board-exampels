import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createBoard } from "../api.js";
import PostForm from "../components/PostForm.jsx";

export default function WritePage() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleCreate(values) {
    setError("");
    setIsSubmitting(true);
    try {
      const saved = await createBoard(values);
      navigate(saved?.id ? `/posts/${saved.id}` : "/posts", { replace: true });
      return true;
    } catch (submitError) {
      setError(submitError.message);
      return false;
    } finally {
      setIsSubmitting(false);
    }
  }

  return <>
    {error && <p role="alert">{error}</p>}
    <PostForm onCreate={handleCreate} disabled={isSubmitting} />
    <Link to="/posts">목록으로</Link>
  </>;
}
