export default function PostDetail({ post }) {
  return (
    <article>
      <h2>{post.title}</h2>
      <p>작성자: {post.author} · 조회 {post.hits} · 좋아요 {post.likeCount}</p>
      <p>{post.content}</p>
    </article>
  );
}
