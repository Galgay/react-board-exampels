import { Link, useParams } from "react-router-dom";

export default function PostDetail({ posts }) {
  const { postId } = useParams();
  const post = posts.find((item) => String(item.id) === postId);

  return <main>
    <article>
      <h1 id="post-title">{post?.title || "게시글을 불러올 수 없습니다."}</h1>
      <p id="post-meta" className="meta">{post && `${post.authorNickname} · ${post.createdDatetime || ""}`}</p>
      <p id="post-content">{post?.content}</p>
      <p id="post-message" role="status"></p>
    </article>
    <Link to="/posts">목록으로</Link>
    {post && <section id="comments-section" aria-labelledby="comments-title">
      <h2 id="comments-title">댓글</h2>
      <p id="comment-message" role="status"></p>
      <ul id="comment-list"></ul>
      <form id="comment-form">
        <label htmlFor="comment-content">댓글 내용</label>
        <textarea id="comment-content" name="content" required maxLength="255"></textarea>
        <button type="submit">댓글 등록</button>
      </form>
    </section>}
  </main>;
}
