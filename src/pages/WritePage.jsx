import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function WritePage({ onCreate, isSubmitting }) {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();
    const newPost = await onCreate({ title, content });

    if (newPost) {
      navigate(`/posts/${newPost.id}`);
    }
  }

  return (
    <>
      <h1>게시판</h1>
      <p className="intro">새로운 게시글을 작성합니다.</p>
      <section className="board-section">
        <h2>게시글 작성</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="title">제목</label>
          <input
            id="title"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            required
          />

          <label htmlFor="content">내용</label>
          <textarea
            id="content"
            rows="8"
            value={content}
            onChange={(event) => setContent(event.target.value)}
            required
          />

          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "등록 중..." : "등록"}
          </button>
        </form>
      </section>
    </>
  );
}
