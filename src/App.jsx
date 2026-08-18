import { Navigate, Route, Routes } from "react-router-dom";
import BoardHeader from "./components/BoardHeader.jsx";
import PostDetailPage from "./pages/PostDetailPage.jsx";
import PostListPage from "./pages/PostListPage.jsx";
import WritePage from "./pages/WritePage.jsx";

const posts = [
  {
    id: 3,
    title: "React로 게시판 만들기",
    author: "김리액트",
    content: "컴포넌트를 이용해 게시판 화면을 만들어 봅니다.",
  },
  {
    id: 2,
    title: "Props 복습하기",
    author: "이초보",
    content: "부모 컴포넌트가 자식 컴포넌트에 값을 전달합니다.",
  },
  {
    id: 1,
    title: "첫 번째 글입니다",
    author: "박학생",
    content: "React 게시판 학습을 시작했습니다.",
  },
];

export default function App() {
  return (
    <>
      <BoardHeader />
      <main>
        <Routes>
          <Route path="/" element={<Navigate to="/posts" replace />} />
          <Route path="/posts" element={<PostListPage posts={posts} />} />
          <Route path="/posts/new" element={<WritePage />} />
          <Route
            path="/posts/:postId"
            element={<PostDetailPage posts={posts} />}
          />
          <Route path="*" element={<p>페이지를 찾을 수 없습니다.</p>} />
        </Routes>
      </main>
    </>
  );
}
