import { Link } from "react-router-dom";

export default function PostItem({ post }) {
  return (
    <tr>
      <td>{post.id}</td>
      <td><Link to={`/posts/${post.id}`}>{post.title}</Link></td>
      <td>{post.author?.name || post.author || ""}</td>
      <td>{post.hits}</td>
      <td>{post.likeCount}</td>
    </tr>
  );
}
