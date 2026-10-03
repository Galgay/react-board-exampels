import { useState } from "react";
import { Link } from "react-router-dom";

export default function PostForm({ onSave }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [message, setMessage] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    const trimmedTitle = title.trim();
    const trimmedContent = content.trim();
    if (trimmedTitle.length < 10 || trimmedTitle.length > 50 || trimmedContent.length < 10) {
      setMessage("제목은 10~50자, 본문은 10자 이상 입력하세요.");
      return;
    }
    onSave({ title: trimmedTitle, content: trimmedContent });
    setTitle("");
    setContent("");
    setMessage("");
  }

  return (
    <form id="post-form" onSubmit={handleSubmit}>
      <label htmlFor="title">제목 (10~50자)</label>
      <input id="title" name="title" required minLength="10" maxLength="50" value={title} onChange={(event) => setTitle(event.target.value)} />
      <label htmlFor="content">본문 (10자 이상)</label>
      <textarea id="content" name="content" required minLength="10" rows="10" value={content} onChange={(event) => setContent(event.target.value)} />
      <p id="form-message" role="status">{message}</p>
      <button type="submit">게시글 등록</button>
      <Link to="/posts">목록으로</Link>
    </form>
  );
}
