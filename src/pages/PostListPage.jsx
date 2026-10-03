import { useEffect, useState } from "react";
import { deleteBoard, getBoards } from "../api.js";
import PostList from "../components/PostList.jsx";

export default function PostListPage({ ownedBoardIds, onRefreshOwned }) {
  const [posts, setPosts] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [message, setMessage] = useState("게시글을 불러오는 중입니다.");
  const [error, setError] = useState("");
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    let cancelled = false;
    setError("");
    getBoards().then((result) => {
      if (cancelled) return;
      setPosts(result?.posts?.content || []);
      setMessage("");
    }).catch((loadError) => {
      if (cancelled) return;
      setError(loadError.message);
      setMessage("");
    });
    return () => { cancelled = true; };
  }, [reloadKey]);

  async function handleDelete(postId) {
    if (!window.confirm("이 게시글을 삭제할까요?")) return;
    setError("");
    try {
      await deleteBoard(postId);
      onRefreshOwned();
      setReloadKey((current) => current + 1);
    } catch (deleteError) {
      setError(deleteError.message);
    }
  }

  const visiblePosts = posts.filter((post) => post.title.includes(keyword.trim()));
  return <>
    <h1>게시판</h1>
    {message && <p role="status">{message}</p>}
    {error && <p role="alert">{error}</p>}
    <PostList posts={visiblePosts} keyword={keyword} onKeywordChange={setKeyword} ownedBoardIds={ownedBoardIds} onDelete={handleDelete} />
  </>;
}
