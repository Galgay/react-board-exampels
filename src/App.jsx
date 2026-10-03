import { Navigate, Route, Routes } from "react-router-dom";
import BoardHeader from "./components/BoardHeader.jsx";
import PostDetailPage from "./pages/PostDetailPage.jsx";
import PostListPage from "./pages/PostListPage.jsx";
import WritePage from "./pages/WritePage.jsx";

export default function App() {
  return (
    <>
      <BoardHeader />
      <main>
        <Routes>
          <Route path="/" element={<Navigate to="/posts" replace />} />
          <Route path="/posts" element={<PostListPage />} />
          <Route path="/posts/new" element={<WritePage />} />
          <Route path="/posts/:postId" element={<PostDetailPage />} />
          <Route path="*" element={<Navigate to="/posts" replace />} />
        </Routes>
      </main>
      <footer>그린보드</footer>
    </>
  );
}
