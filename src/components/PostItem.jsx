export default function PostItem({ post }) {
  return (
    <tr>
      <td>{post.id}</td>
      <td>{post.title}</td>
      <td>{post.author}</td>
      <td>{post.hits}</td>
      <td>{post.likeCount}</td>
    </tr>
  );
}
