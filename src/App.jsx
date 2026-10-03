import { useState } from "react";
import BoardHeader from "./components/BoardHeader.jsx";
import PostDetail from "./components/PostDetail.jsx";
import PostForm from "./components/PostForm.jsx";
import PostList from "./components/PostList.jsx";
import { samplePosts } from "./samplePosts.js";

export default function App() {
  const [posts, setPosts] = useState(samplePosts);
  const [selectedId, setSelectedId] = useState(samplePosts[0].id);
  const [keyword, setKeyword] = useState("");
  const selectedPost = posts.find((post) => post.id === selectedId);
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
    setSelectedId(id);
  }

  return (
    <>
      <BoardHeader />
      <main>
        <h1>게시판</h1>
        <PostList posts={visiblePosts} keyword={keyword} onKeywordChange={setKeyword} onSelect={setSelectedId} />
        <PostDetail post={selectedPost} />
        <PostForm onCreate={createPost} />
      </main>
      <footer>그린보드</footer>
    </>
  );
}
