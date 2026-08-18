import PostList from "../components/PostList.jsx";

export default function PostListPage({ posts }) {
  return (
    <>
      <h1>게시판</h1>
      <p className="intro">React 화면과 외부 API 서버를 연결합니다.</p>
      <section className="board-section">
        <h2>게시글 목록</h2>
        <PostList posts={posts} />
        {posts.length === 0 && <p className="empty-message">게시글이 없습니다.</p>}
      </section>
    </>
  );
}
