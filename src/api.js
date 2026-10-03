// 기존 Spring 응답: { success, message, data }
async function readData(response) {
  if (response.status === 204) return null;
  const result = await response.json().catch(() => null);
  if (!response.ok || !result?.success) {
    throw new Error(result?.message || `요청 실패 (${response.status})`);
  }
  return result.data;
}

function authHeader(token) {
  return { Authorization: `Bearer ${token}` };
}

export const authApi = {
  login(username, password) {
    return fetch("http://127.0.0.1:8080/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    }).then(readData);
  },
  logout(token) {
    return fetch("http://127.0.0.1:8080/api/auth/logout", {
      method: "POST",
      headers: { ...authHeader(token), "Content-Type": "application/json" },
      body: JSON.stringify({ accessToken: token }),
    }).then(readData);
  },
};

export const postApi = {
  list(page, token, signal) {
    return fetch(`http://127.0.0.1:8080/api/board?page=${page}&size=10`, { headers: authHeader(token), signal }).then(readData);
  },
  detail(id, token, signal) {
    return fetch(`http://127.0.0.1:8080/api/board/${id}`, { headers: authHeader(token), signal }).then(readData);
  },
  create(post, token) {
    return fetch("http://127.0.0.1:8080/api/board", {
      method: "POST",
      headers: { ...authHeader(token), "Content-Type": "application/json" },
      body: JSON.stringify(post),
    }).then(readData);
  },
};

export const commentApi = {
  list(postId, token, signal) {
    return fetch(`http://127.0.0.1:8080/api/board/${postId}/comments`, { headers: authHeader(token), signal }).then(readData);
  },
  create(postId, content, token) {
    return fetch(`http://127.0.0.1:8080/api/board/${postId}/comments`, {
      method: "POST",
      headers: { ...authHeader(token), "Content-Type": "application/json" },
      body: JSON.stringify({ content }),
    }).then(readData);
  },
};
