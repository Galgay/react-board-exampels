import BasicsPractice from "../components/BasicsPractice.jsx";
import PostList from "../components/PostList.jsx";

export default function PostListPage({ posts }) {
  return (
    <>
      <h1>게시판</h1>
      <p className="intro">게시판에 동작을 추가하기 전에 React 기초를 연습합니다.</p>
      <BasicsPractice />
      <section className="board-section">
        <h2>게시글 목록</h2>
        <PostList posts={posts} />
      </section>
    </>
  );
}
