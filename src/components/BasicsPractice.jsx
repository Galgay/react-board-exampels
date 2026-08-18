import { useEffect, useState } from "react";

export default function BasicsPractice() {
  const [count, setCount] = useState(0);
  const [message, setMessage] = useState("버튼을 눌러 보세요.");

  useEffect(() => {
    document.title = "클릭 횟수: " + count;
  }, [count]);

  function handleClick() {
    setCount(count + 1);
    setMessage("State가 바뀌면 화면이 다시 그려집니다.");
  }

  return (
    <section className="board-section practice">
      <h2>State와 이벤트 실습</h2>
      <p>{message}</p>
      <p>클릭 횟수: {count}</p>
      <button type="button" onClick={handleClick}>
        숫자 올리기
      </button>
    </section>
  );
}
