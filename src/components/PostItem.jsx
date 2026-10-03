export default function PostItem({ post, onSelect }) {
  return (
    <tr>
      <td>{post.id}</td>
      <td><button type="button" className="text-button" onClick={() => onSelect(post.id)}>{post.title}</button></td>
      <td>{post.author}</td>
      <td>{post.hits}</td>
      <td>{post.likeCount}</td>
    </tr>
  );
}
