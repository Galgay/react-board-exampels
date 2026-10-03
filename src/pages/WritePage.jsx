import { Link, useNavigate } from "react-router-dom";
import PostForm from "../components/PostForm.jsx";

export default function WritePage({ onCreate }) {
  const navigate = useNavigate();
  function handleCreate(values) {
    const id = onCreate(values);
    navigate(`/posts/${id}`);
  }
  return <><PostForm onCreate={handleCreate} /><Link to="/posts">목록으로</Link></>;
}
