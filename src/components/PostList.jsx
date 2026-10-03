import PostItem from "./PostItem.jsx";

export default function PostList({ posts }) {
  return (
    <ul id="post-list" className="post-list">
      {posts.length === 0 ? "아직 게시글이 없습니다." : posts.map((post) => <PostItem key={post.id} post={post} />)}
    </ul>
  );
}
