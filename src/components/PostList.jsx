import PostItem from "./PostItem.jsx";

export default function PostList({ posts }) {
  return (
    <ul>
      {posts.map((post) => (
        <PostItem key={post.id} post={post} />
      ))}
    </ul>
  );
}
