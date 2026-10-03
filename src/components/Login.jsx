

export default function Login({ onLogin }) {
  return <main>
    <h1>로그인</h1>
    <form id="login-form" onSubmit={(event) => { event.preventDefault(); onLogin(); }}>
      <label htmlFor="username">아이디</label>
      <input id="username" name="username" autoComplete="username" required placeholder="아이디를 입력하세요" />
      <label htmlFor="password">비밀번호</label>
      <input id="password" name="password" type="password" autoComplete="current-password" required />
      <p id="login-message" role="alert" hidden></p>
      <button type="submit">로그인</button>
    </form>
  </main>;
}
