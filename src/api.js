const API_BASE_URL = "http://localhost:8080/api";
const STORAGE_KEY = "react-board-posts";

async function request(path, options = {}) {
  const response = await fetch(API_BASE_URL + path, {
    ...options,
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("요청에 실패했습니다.");
  }

  if (response.status === 204) {
    return null;
  }

  return response.json();
}

async function useApiOrLocal(apiCall, localCall) {
  try {
    return await apiCall();
  } catch (error) {
    console.info("API 서버가 꺼져 있어 로컬 저장소를 사용합니다.");
    return localCall();
  }
}

function loadLocalPosts() {
  const savedPosts = localStorage.getItem(STORAGE_KEY);
  return savedPosts ? JSON.parse(savedPosts) : [];
}

function saveLocalPosts(posts) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
}

export function getPosts() {
  return useApiOrLocal(() => request("/posts"), loadLocalPosts);
}

export function createPost(values) {
  return useApiOrLocal(
    () =>
      request("/posts", {
        method: "POST",
        body: JSON.stringify(values),
      }),
    () => {
      const newPost = {
        id: Date.now(),
        author: "나",
        ...values,
      };
      saveLocalPosts([newPost, ...loadLocalPosts()]);
      return newPost;
    },
  );
}

export function deletePost(id) {
  return useApiOrLocal(
    () => request("/posts/" + id, { method: "DELETE" }),
    () => {
      const nextPosts = loadLocalPosts().filter((post) => post.id !== id);
      saveLocalPosts(nextPosts);
    },
  );
}
