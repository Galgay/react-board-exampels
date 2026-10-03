import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { deleteBoard, getBoards, searchBoards } from "../api.js";
import PostList from "../components/PostList.jsx";

const PAGE_SIZE = 10;
const SORT_FIELDS = ["createdDatetime", "hits", "likeCount"];

export default function PostListPage({ ownedBoardIds, onRefreshOwned }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.toString();
  const requestedPage = Number(searchParams.get("page") || 0);
  const page = Number.isInteger(requestedPage) && requestedPage >= 0 ? requestedPage : 0;
  const keyword = searchParams.get("keyword") || "";
  const requestedSort = searchParams.get("sort") || "createdDatetime";
  const sort = SORT_FIELDS.includes(requestedSort) ? requestedSort : "createdDatetime";
  const [input, setInput] = useState(keyword);
  const [posts, setPosts] = useState([]);
  const [notices, setNotices] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [message, setMessage] = useState("게시글을 불러오는 중입니다.");
  const [error, setError] = useState("");
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => setInput(keyword), [keyword]);

  useEffect(() => {
    let cancelled = false;
    setMessage(keyword ? "게시글을 검색하고 있습니다." : "게시글을 불러오는 중입니다.");
    setError("");
    const load = keyword
      ? searchBoards(keyword)
      : getBoards({ page, size: PAGE_SIZE, sort: [`${sort},desc`, "id,desc"] });
    load.then((result) => {
      if (cancelled) return;
      if (keyword) {
        const found = Array.isArray(result) ? result : result?.content || [];
        setPosts(found);
        setNotices([]);
        setTotalPages(0);
        setMessage(found.length ? "" : "검색 결과가 없습니다.");
      } else {
        const nextPosts = result?.posts?.content || [];
        const nextNotices = result?.notices || [];
        setPosts(nextPosts);
        setNotices(nextNotices);
        setTotalPages(result?.posts?.totalPages || 0);
        setMessage(nextPosts.length || nextNotices.length ? "" : "게시글이 없습니다.");
      }
    }).catch((loadError) => {
      if (cancelled) return;
      setPosts([]);
      setNotices([]);
      setTotalPages(0);
      setError(loadError.message);
      setMessage("");
    });
    return () => { cancelled = true; };
  }, [query, reloadKey]);

  function updateQuery(changes) {
    const next = new URLSearchParams(searchParams);
    for (const [key, value] of Object.entries(changes)) {
      if (value === "" || value == null) next.delete(key);
      else next.set(key, String(value));
    }
    setSearchParams(next);
  }

  function handleSearch(event) {
    event.preventDefault();
    updateQuery({ keyword: input.trim(), page: null });
  }

  async function handleDelete(postId) {
    if (!window.confirm("이 게시글을 삭제할까요?")) return;
    setError("");
    try {
      await deleteBoard(postId);
      onRefreshOwned();
      setReloadKey((current) => current + 1);
    } catch (deleteError) {
      setError(deleteError.message);
    }
  }

  return <>
    <h1>게시판</h1>
    {!keyword && <section>
      <h2>공지사항</h2>
      {notices.length ? <ul className="notice-list">{notices.map((notice) =>
        <li key={notice.id}><span className="notice-badge">공지</span><Link to={`/posts/${notice.id}`}>{notice.title}</Link></li>
      )}</ul> : <p>등록된 공지사항이 없습니다.</p>}
    </section>}
    <section>
      <div className="board-toolbar"><h2>{keyword ? "검색 결과" : "게시글 목록"}</h2><Link className="button-link" to="/posts/new">글쓰기</Link></div>
      <form className="search-form" onSubmit={handleSearch}>
        <label htmlFor="board-sort">정렬</label>
        <select id="board-sort" value={sort} disabled={Boolean(keyword)} onChange={(event) => updateQuery({ sort: event.target.value, page: null })}>
          <option value="createdDatetime">최신순</option><option value="hits">조회수순</option><option value="likeCount">좋아요순</option>
        </select>
        <label htmlFor="keyword">제목 검색</label>
        <input id="keyword" value={input} onChange={(event) => setInput(event.target.value)} />
        <button type="submit">검색</button>
        {keyword && <button type="button" className="secondary-button" onClick={() => { setInput(""); updateQuery({ keyword: "", page: null }); }}>초기화</button>}
      </form>
      {message && <p role="status">{message}</p>}
      {error && <p role="alert">{error}</p>}
      <PostList posts={posts} ownedBoardIds={ownedBoardIds} onDelete={handleDelete} />
      {!keyword && totalPages > 1 && <nav className="pagination" aria-label="게시글 페이지">
        <button type="button" disabled={page <= 0} onClick={() => updateQuery({ page: page - 1 })}>이전</button>
        <span>{page + 1} / {totalPages} 페이지</span>
        <button type="button" disabled={page + 1 >= totalPages} onClick={() => updateQuery({ page: page + 1 })}>다음</button>
      </nav>}
    </section>
  </>;
}
