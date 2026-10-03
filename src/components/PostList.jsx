import PostItem from "./PostItem.jsx";

export default function PostList({ posts, onAddPracticePost }) {
  return <main>
    <h1>게시판</h1>
    <p id="list-message" role="status">게시글 목록</p>
    <button id="retry-list" type="button" hidden>목록 다시 시도</button>
    <PostListItems posts={posts} />
    <button type="button" onClick={onAddPracticePost}>임시 게시글 추가</button>
    <div className="pagination" aria-label="페이지 이동">
      <button id="previous-page" type="button" disabled>이전</button>
      <span id="page-number">1페이지</span>
      <button id="next-page" type="button" disabled>다음</button>
    </div>
  </main>;
}

function PostListItems({ posts }) {
  return (
    <ul id="post-list" className="post-list">
      {posts.length === 0 ? "아직 게시글이 없습니다." : posts.map((post) => <PostItem key={post.id} post={post} />)}
    </ul>
  );
}
