import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../useAuthContext.jsx";

export default function Login() {
  const { login } = useAuthContext();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loggingIn, setLoggingIn] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();
    if (loggingIn) return;
    try {
      setLoggingIn(true);
      const response = await fetch("http://127.0.0.1:8080/api/user/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: username.trim(), password }),
      });
      const result = await response.json();
      if (!response.ok || !result.success) throw new Error(result.message || "로그인에 실패했습니다.");
      if (!result.data?.accessToken) throw new Error("로그인 토큰이 없습니다.");
      login(result.data.accessToken);
      navigate("/posts");
    } catch (error) {
      setMessage(error.message);
    } finally {
      setLoggingIn(false);
    }
  }

  return <main>
    <h1>로그인</h1>
    <form id="login-form" onSubmit={handleSubmit}>
      <label htmlFor="username">아이디</label>
      <input id="username" name="username" autoComplete="username" required placeholder="아이디를 입력하세요" value={username} onChange={(event) => setUsername(event.target.value)} />
      <label htmlFor="password">비밀번호</label>
      <input id="password" name="password" type="password" autoComplete="current-password" required value={password} onChange={(event) => setPassword(event.target.value)} />
      {message && <p id="login-message" role="alert">{message}</p>}
      <button type="submit" disabled={loggingIn}>로그인</button>
    </form>
  </main>;
}
