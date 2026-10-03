import { Link } from "react-router-dom";

export default function PostItem({ post, canManage, onDelete }) {
  const date = new Date(post.createdDatetime);
  const createdAt = Number.isNaN(date.getTime()) ? "" : new Intl.DateTimeFormat("ko-KR", { dateStyle: "short" }).format(date);
  return (
    <tr>
      <td>{post.id}</td>
      <td><Link to={`/posts/${post.id}`}>{post.title}</Link></td>
      <td>{post.author?.name || post.author || ""}</td>
      <td>{post.hits ?? 0}</td>
      <td>{post.likeCount ?? 0}</td>
      <td>{createdAt}</td>
      <td>{canManage && <><Link to={`/posts/${post.id}/edit`}>수정</Link> <button type="button" className="text-button" onClick={() => onDelete(post.id)}>삭제</button></>}</td>
    </tr>
  );
}
