import PostList from "../components/PostList.jsx";

export default function PostListPage({ posts }) {
  return (
    <>
      <h1>게시판</h1>
      <p className="intro">게시글을 선택해 내용을 확인할 수 있습니다.</p>
      <section className="board-section">
        <h2>게시글 목록</h2>
        <PostList posts={posts} />
      </section>
    </>
  );
}
