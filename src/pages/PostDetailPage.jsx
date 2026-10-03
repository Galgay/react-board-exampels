import { Link, useParams } from "react-router-dom";
import PostDetail from "../components/PostDetail.jsx";

export default function PostDetailPage({ posts }) {
  const { postId } = useParams();
  const post = posts.find((item) => String(item.id) === postId);
  return <><PostDetail post={post} /><Link to="/posts">목록으로</Link></>;
}
