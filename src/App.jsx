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
  const [token, setToken] = useState(() => localStorage.getItem("boardAccessToken"));

  function logoutLocally() {
    localStorage.removeItem("boardAccessToken");
    setToken(null);
  }

  return <>
    <BoardHeader isLoggedIn={Boolean(token)} onLogout={logoutLocally} />
    <Routes>
      <Route path="/" element={token ? <PostList token={token} /> : <Login onLogin={setToken} />} />
      <Route path="/posts" element={token ? <PostList token={token} /> : <Login onLogin={setToken} />} />
      <Route path="/posts/new" element={token ? <PostForm /> : <Login onLogin={setToken} />} />
      <Route path="/posts/:postId" element={token ? <PostDetail token={token} /> : <Login onLogin={setToken} />} />
      <Route path="/login" element={<Login onLogin={setToken} />} />
    </Routes>
    <BoardFooter />
  </>;
}
