import PostItem from "./PostItem.jsx";

export default function PostList({ posts }) {
  return (
    <ul id="post-list" className="post-list">
      {posts.map((post) => <PostItem key={post.id} post={post} />)}
    </ul>
  );
}
