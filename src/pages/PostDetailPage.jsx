import { useNavigate, useParams } from "react-router-dom";

export default function PostDetailPage({ posts, onDelete }) {
  const { postId } = useParams();
  const navigate = useNavigate();
  const post = posts.find((item) => item.id === Number(postId));

  if (!post) {
    return <p>게시글을 찾을 수 없습니다.</p>;
  }

  function handleDelete() {
    onDelete(post.id);
    navigate("/posts");
  }

  return (
    <>
      <h1>게시판</h1>
      <p className="intro">선택한 게시글의 내용을 확인합니다.</p>
      <section className="board-section">
        <h2>게시글 상세</h2>
        <article>
          <h3>{post.title}</h3>
          <p className="post-info">{post.author}</p>
          <p>{post.content}</p>
          <button type="button" onClick={handleDelete}>
            삭제
          </button>
        </article>
      </section>
    </>
  );
}
