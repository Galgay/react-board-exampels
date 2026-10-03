import PostItem from "./PostItem.jsx";

export default function PostList({ posts, keyword, onKeywordChange, ownedBoardIds, onDelete }) {
  return (
    <section>
      <h2>게시글 목록</h2>
      <label htmlFor="keyword">현재 목록 제목 검색</label>
      <input id="keyword" value={keyword} onChange={(event) => onKeywordChange(event.target.value)} />
      <div className="table-scroll">
        <table>
          <thead>
            <tr>
              <th scope="col">번호</th>
              <th scope="col">제목</th>
              <th scope="col">작성자</th>
              <th scope="col">조회</th>
              <th scope="col">좋아요</th>
              <th scope="col">관리</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post) => <PostItem key={post.id} post={post} canManage={ownedBoardIds.includes(String(post.id))} onDelete={onDelete} />)}
          </tbody>
        </table>
      </div>
      {posts.length === 0 && <p>검색 결과가 없습니다.</p>}
    </section>
  );
}
