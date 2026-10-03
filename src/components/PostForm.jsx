import { useRef, useState } from "react";
import { Link } from "react-router-dom";

export default function PostForm({ onSave }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [message, setMessage] = useState("");
  const [saving, setSaving] = useState(false);
  const titleRef = useRef(null);
  const contentRef = useRef(null);

  async function handleSubmit(event) {
    event.preventDefault();
    if (saving) return;
    const trimmedTitle = title.trim();
    const trimmedContent = content.trim();
    if (trimmedTitle.length < 10 || trimmedTitle.length > 50 || trimmedContent.length < 10) {
      setMessage("제목은 10~50자, 본문은 10자 이상 입력하세요.");
      if (trimmedTitle.length < 10 || trimmedTitle.length > 50) titleRef.current.focus();
      else contentRef.current.focus();
      return;
    }
    try {
      setSaving(true);
      await onSave({ title: trimmedTitle, content: trimmedContent });
      setTitle("");
      setContent("");
      setMessage("");
    } catch (error) {
      setMessage(error.message);
    } finally {
      setSaving(false);
    }
  }

  return (
    <form id="post-form" noValidate onSubmit={handleSubmit}>
      <label htmlFor="title">제목 (10~50자)</label>
      <input ref={titleRef} id="title" name="title" required minLength="10" maxLength="50" value={title} onChange={(event) => setTitle(event.target.value)} />
      <label htmlFor="content">본문 (10자 이상)</label>
      <textarea ref={contentRef} id="content" name="content" required minLength="10" rows="10" value={content} onChange={(event) => setContent(event.target.value)} />
      <p id="form-message" role="status">{message}</p>
      <button type="submit" disabled={saving}>게시글 등록</button>
      <Link to="/posts">목록으로</Link>
    </form>
  );
}
