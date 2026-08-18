import PostList from "../components/PostList.jsx";

export default function PostListPage({ posts }) {
  return (
    <>
      <h1>게시판</h1>
      <p className="intro">작성한 글은 브라우저의 로컬 저장소에 보관됩니다.</p>
      <section className="board-section">
        <h2>게시글 목록</h2>
        <PostList posts={posts} />
        {posts.length === 0 && <p className="empty-message">게시글이 없습니다.</p>}
      </section>
    </>
  );
}
