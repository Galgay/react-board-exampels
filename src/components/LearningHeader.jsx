import { Link } from "react-router-dom";

export default function LearningHeader() {
  return (
    <header>
      <strong className="logo">React 기초</strong>
      <nav>
        <Link to="/concepts">개념 목록</Link>
        <Link to="/practice">분리 실습</Link>
      </nav>
    </header>
  );
}
