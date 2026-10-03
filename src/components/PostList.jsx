import PostItem from "./PostItem.jsx";

export default function PostList({ posts, ownedBoardIds, onDelete }) {
  if (posts.length === 0) return null;
  return (
    <>
      <div className="table-scroll">
        <table>
          <thead>
            <tr>
              <th scope="col">번호</th>
              <th scope="col">제목</th>
              <th scope="col">작성자</th>
              <th scope="col">조회</th>
              <th scope="col">좋아요</th>
              <th scope="col">작성일</th>
              <th scope="col">관리</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post) => <PostItem key={post.id} post={post} canManage={ownedBoardIds.includes(String(post.id))} onDelete={onDelete} />)}
          </tbody>
        </table>
      </div>
    </>
  );
}
