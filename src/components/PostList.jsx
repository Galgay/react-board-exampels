import { useSearchParams } from "react-router-dom";
import PostItem from "./PostItem.jsx";

export default function PostList({ posts, onAddPracticePost }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const totalPages = Math.max(1, posts.length);
  const requestedPage = Number(searchParams.get("page"));
  const page = Number.isSafeInteger(requestedPage) && requestedPage > 0
    ? Math.min(requestedPage, totalPages) : 1;

  return <main>
    <h1>게시판</h1>
    <p id="list-message" role="status">게시글 목록</p>
    <button id="retry-list" type="button" hidden>목록 다시 시도</button>
    <PostListItems posts={posts.slice(page - 1, page)} />
    <button type="button" onClick={onAddPracticePost}>임시 게시글 추가</button>
    <div className="pagination" aria-label="페이지 이동">
      <button id="previous-page" type="button" disabled={page === 1} onClick={() => setSearchParams({ page: String(page - 1) })}>이전</button>
      <span id="page-number">{page} / {totalPages}페이지</span>
      <button id="next-page" type="button" disabled={page >= totalPages} onClick={() => setSearchParams({ page: String(page + 1) })}>다음</button>
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
