export default function PostItem({ post, onSelect }) {
  return (
    <li>
      <a href="/" onClick={(event) => { event.preventDefault(); onSelect(post); }}>{post.title}</a>
      <div className="meta">{post.author} · {post.createdDatetime}</div>
    </li>
  );
}
