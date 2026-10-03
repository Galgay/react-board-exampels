import { useEffect, useState } from "react";
import { getBoards } from "../api.js";
import PostList from "../components/PostList.jsx";

export default function PostListPage() {
  const [posts, setPosts] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [message, setMessage] = useState("게시글을 불러오는 중입니다.");
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;
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
  }, []);

  const visiblePosts = posts.filter((post) => post.title.includes(keyword.trim()));
  return <>
    <h1>게시판</h1>
    {message && <p role="status">{message}</p>}
    {error && <p role="alert">{error}</p>}
    <PostList posts={visiblePosts} keyword={keyword} onKeywordChange={setKeyword} />
  </>;
}
