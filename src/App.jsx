import { useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import BoardHeader from "./components/BoardHeader.jsx";
import PostDetailPage from "./pages/PostDetailPage.jsx";
import PostListPage from "./pages/PostListPage.jsx";
import WritePage from "./pages/WritePage.jsx";
import { samplePosts } from "./samplePosts.js";

export default function App() {
  const [posts, setPosts] = useState(samplePosts);
  const [keyword, setKeyword] = useState("");
  const visiblePosts = posts.filter((post) => post.title.includes(keyword.trim()));

  function createPost(values) {
    const id = Math.max(0, ...posts.map((post) => post.id)) + 1;
    const newPost = {
      id,
      author: "나",
      content: values.content,
      title: values.title,
      hits: 0,
      likeCount: 0,
      createdDatetime: new Date().toISOString(),
    };
    setPosts((currentPosts) => [newPost, ...currentPosts]);
    return id;
  }

  return (
    <>
      <BoardHeader />
      <main>
        <Routes>
          <Route path="/" element={<Navigate to="/posts" replace />} />
          <Route path="/posts" element={<PostListPage posts={visiblePosts} keyword={keyword} onKeywordChange={setKeyword} />} />
          <Route path="/posts/new" element={<WritePage onCreate={createPost} />} />
          <Route path="/posts/:postId" element={<PostDetailPage posts={posts} />} />
          <Route path="*" element={<Navigate to="/posts" replace />} />
        </Routes>
      </main>
      <footer>그린보드</footer>
    </>
  );
}
