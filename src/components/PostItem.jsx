import { Link } from "react-router-dom";

export default function PostItem({ post, canManage, onDelete }) {
  return (
    <tr>
      <td>{post.id}</td>
      <td><Link to={`/posts/${post.id}`}>{post.title}</Link></td>
      <td>{post.author?.name || post.author || ""}</td>
      <td>{post.hits}</td>
      <td>{post.likeCount}</td>
      <td>{canManage && <><Link to={`/posts/${post.id}/edit`}>수정</Link> <button type="button" className="text-button" onClick={() => onDelete(post.id)}>삭제</button></>}</td>
    </tr>
  );
}
