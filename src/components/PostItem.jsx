import { Link } from "react-router-dom";

export default function PostItem({ post }) {
  return (
    <li>
      <Link to={`/posts/${post.id}`}>{post.title}</Link>
      <div className="meta">{post.author} · {post.createdDatetime}</div>
    </li>
  );
}
