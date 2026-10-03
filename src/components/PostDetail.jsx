export default function PostDetail({ post }) {
  if (!post) return <p>게시글을 선택해 주세요.</p>;
  const date = new Date(post.createdDatetime);
  const createdAt = Number.isNaN(date.getTime()) ? "" : new Intl.DateTimeFormat("ko-KR", { dateStyle: "medium" }).format(date);
  return (
    <article>
      <h2>{post.title}</h2>
      <p>작성자: {post.author?.name || post.author || ""} · 조회 {post.hits ?? 0} · 좋아요 {post.likeCount ?? 0} · {createdAt}</p>
      <p className="post-content">{post.content}</p>
    </article>
  );
}
