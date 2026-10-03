import PostItem from "./PostItem.jsx";

export default function PostList({ posts, onSelect }) {
  return (
    <ul id="post-list" className="post-list">
      {posts.map((post) => <PostItem key={post.id} post={post} onSelect={onSelect} />)}
    </ul>
  );
}
