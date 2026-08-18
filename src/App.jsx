import { useEffect, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import BoardHeader from "./components/BoardHeader.jsx";
import PostDetailPage from "./pages/PostDetailPage.jsx";
import PostListPage from "./pages/PostListPage.jsx";
import WritePage from "./pages/WritePage.jsx";

const initialPosts = [
  {
    id: 3,
    title: "React로 게시판 만들기",
    author: "김리액트",
    content: "State와 이벤트를 이용해 동적인 게시판을 만들어 봅니다.",
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

function loadPosts() {
  const savedPosts = localStorage.getItem("react-board-posts");
  return savedPosts ? JSON.parse(savedPosts) : initialPosts;
}

export default function App() {
  const [posts, setPosts] = useState(loadPosts);

  useEffect(() => {
    localStorage.setItem("react-board-posts", JSON.stringify(posts));
  }, [posts]);

  function createPost(formData) {
    const newPost = {
      id: Date.now(),
      title: formData.title,
      author: "나",
      content: formData.content,
    };

    setPosts([newPost, ...posts]);
    return newPost;
  }

  function deletePost(id) {
    setPosts(posts.filter((post) => post.id !== id));
  }

  return (
    <>
      <BoardHeader />
      <main>
        <Routes>
          <Route path="/" element={<Navigate to="/posts" replace />} />
          <Route path="/posts" element={<PostListPage posts={posts} />} />
          <Route path="/posts/new" element={<WritePage onCreate={createPost} />} />
          <Route
            path="/posts/:postId"
            element={<PostDetailPage posts={posts} onDelete={deletePost} />}
          />
          <Route path="*" element={<p>페이지를 찾을 수 없습니다.</p>} />
        </Routes>
      </main>
    </>
  );
}
