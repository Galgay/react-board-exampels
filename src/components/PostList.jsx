import PostItem from "./PostItem.jsx";

export default function PostList({ posts }) {
  return (
    <section>
      <h2>게시글 목록</h2>
      <div className="table-scroll">
        <table>
          <thead>
            <tr>
              <th scope="col">번호</th>
              <th scope="col">제목</th>
              <th scope="col">작성자</th>
              <th scope="col">조회</th>
              <th scope="col">좋아요</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post) => <PostItem key={post.id} post={post} />)}
          </tbody>
        </table>
      </div>
    </section>
  );
}
