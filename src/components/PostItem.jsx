import { Link } from "react-router-dom";

export default function PostItem({ post }) {
  return (
    <li>
      <Link to={`/posts/${post.id}`}>{post.title}</Link>
      <span>{post.author}</span>
    </li>
  );
}
