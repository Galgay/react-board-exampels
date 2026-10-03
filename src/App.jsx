import { Route, Routes } from "react-router-dom";
import BoardHeader from "./components/BoardHeader.jsx";
import BoardFooter from "./components/BoardFooter.jsx";
import PostList from "./components/PostList.jsx";
import PostForm from "./components/PostForm.jsx";
import PostDetail from "./components/PostDetail.jsx";
import Login from "./components/Login.jsx";
import { useAuthContext } from "./useAuthContext.jsx";
import "./style.css";

export default function App() {
  const { token } = useAuthContext();

  return <>
    <BoardHeader />
    <Routes>
      <Route path="/" element={token ? <PostList /> : <Login />} />
      <Route path="/posts" element={token ? <PostList /> : <Login />} />
      <Route path="/posts/new" element={token ? <PostForm /> : <Login />} />
      <Route path="/posts/:postId" element={token ? <PostDetail /> : <Login />} />
      <Route path="/login" element={<Login />} />
    </Routes>
    <BoardFooter />
  </>;
}
