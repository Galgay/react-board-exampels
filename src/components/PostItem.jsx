export default function PostItem({ post }) {
  return (
    <li>
      <a href="/">{post.title}</a>
      <div className="meta">{post.author} · {post.createdDatetime}</div>
    </li>
  );
}
