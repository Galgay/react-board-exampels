import { useEffect, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import BoardHeader from "./components/BoardHeader.jsx";
import PostDetailPage from "./pages/PostDetailPage.jsx";
import PostListPage from "./pages/PostListPage.jsx";
import WritePage from "./pages/WritePage.jsx";
import {
  createPost as createPostRequest,
  deletePost as deletePostRequest,
  getPosts,
} from "./api.js";

export default function App() {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    async function loadPosts() {
      try {
        setPosts(await getPosts());
      } catch (error) {
        setErrorMessage(error.message);
      } finally {
        setIsLoading(false);
      }
    }

    loadPosts();
  }, []);

  async function createPost(formData) {
    setIsSubmitting(true);
    setErrorMessage("");

    try {
      const newPost = await createPostRequest(formData);
      setPosts([newPost, ...posts]);
      return newPost;
    } catch (error) {
      setErrorMessage(error.message);
      return null;
    } finally {
      setIsSubmitting(false);
    }
  }

  async function deletePost(id) {
    setErrorMessage("");

    try {
      await deletePostRequest(id);
      setPosts(posts.filter((post) => post.id !== id));
      return true;
    } catch (error) {
      setErrorMessage(error.message);
      return false;
    }
  }

  return (
    <>
      <BoardHeader />
      <main>
        {isLoading && <p className="status-message">불러오는 중...</p>}
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        {!isLoading && (
          <Routes>
            <Route path="/" element={<Navigate to="/posts" replace />} />
            <Route path="/posts" element={<PostListPage posts={posts} />} />
            <Route
              path="/posts/new"
              element={
                <WritePage onCreate={createPost} isSubmitting={isSubmitting} />
              }
            />
            <Route
              path="/posts/:postId"
              element={<PostDetailPage posts={posts} onDelete={deletePost} />}
            />
            <Route path="*" element={<p>페이지를 찾을 수 없습니다.</p>} />
          </Routes>
        )}
      </main>
    </>
  );
}
