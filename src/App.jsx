import BoardHeader from "./components/BoardHeader.jsx";
import PostDetail from "./components/PostDetail.jsx";
import PostForm from "./components/PostForm.jsx";
import PostList from "./components/PostList.jsx";
import { samplePosts } from "./samplePosts.js";

export default function App() {
  return (
    <>
      <BoardHeader />
      <main>
        <h1>게시판</h1>
        <PostList posts={samplePosts} />
        <PostDetail post={samplePosts[0]} />
        <PostForm />
      </main>
      <footer>그린보드</footer>
    </>
  );
}
