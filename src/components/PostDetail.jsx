export default function PostDetail({ post }) {
  if (!post) return <p>게시글을 선택해 주세요.</p>;
  return (
    <article>
      <h2>{post.title}</h2>
      <p>작성자: {post.author} · 조회 {post.hits} · 좋아요 {post.likeCount}</p>
      <p>{post.content}</p>
    </article>
  );
}
