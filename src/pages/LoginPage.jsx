import { useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";

export default function LoginPage({ user, onLogin }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [values, setValues] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setIsSubmitting(true);
    setError("");
    try {
      await onLogin(values);
      navigate(location.state?.from || "/posts", { replace: true });
    } catch (loginError) {
      setError(loginError.message);
    } finally {
      setIsSubmitting(false);
    }
  }

  if (user) return <Navigate to={location.state?.from || "/posts"} replace />;

  return <main className="login-page">
    <section className="login-panel">
      <h1>로그인</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">아이디</label>
        <input id="username" autoComplete="username" required value={values.username} onChange={(event) => setValues((current) => ({ ...current, username: event.target.value }))} />
        <label htmlFor="password">비밀번호</label>
        <input id="password" type="password" autoComplete="current-password" required value={values.password} onChange={(event) => setValues((current) => ({ ...current, password: event.target.value }))} />
        {error && <p role="alert" className="login-message">{error}</p>}
        <button type="submit" disabled={isSubmitting}>{isSubmitting ? "로그인 중..." : "로그인"}</button>
      </form>
    </section>
  </main>;
}
