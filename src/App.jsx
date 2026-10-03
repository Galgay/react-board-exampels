import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import BoardHeader from "./components/BoardHeader.jsx";
import BoardFooter from "./components/BoardFooter.jsx";
import PostList from "./components/PostList.jsx";
import PostForm from "./components/PostForm.jsx";
import PostDetail from "./components/PostDetail.jsx";
import Login from "./components/Login.jsx";
import "./style.css";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [posts, setPosts] = useState([
    { id: 1, title: "첫 번째 게시글", authorNickname: "학생", createdDatetime: "2026-10-04", content: "React 게시판의 첫 글입니다." },
    { id: 2, title: "두 번째 게시글", authorNickname: "강사", createdDatetime: "2026-10-04", content: "Props로 데이터를 내려봅니다." },
  ]);

  function savePost(post) {
    setPosts((currentPosts) => [
      { id: Date.now(), ...post, authorNickname: "학생", createdDatetime: "2026-10-04" },
      ...currentPosts,
    ]);
  }

  return <>
    <BoardHeader isLoggedIn={isLoggedIn} onLogout={() => setIsLoggedIn(false)} />
    <Routes>
      <Route path="/" element={<PostList />} />
      <Route path="/posts" element={<PostList />} />
      <Route path="/posts/new" element={<PostForm onSave={savePost} />} />
      <Route path="/posts/:postId" element={<PostDetail posts={posts} />} />
      <Route path="/login" element={<Login onLogin={() => setIsLoggedIn(true)} />} />
    </Routes>
    <BoardFooter />
  </>;
}
