export default function App() {
  const lessonTopic = "React";
  const concepts = [
    {
      id: 1,
      title: "JSX로 화면 작성하기",
      description: "HTML과 비슷한 문법으로 화면의 모습을 작성합니다.",
    },
    {
      id: 2,
      title: "화면을 컴포넌트로 나누기",
      description: "한 화면을 역할에 따라 작은 함수로 나누어 관리합니다.",
    },
    {
      id: 3,
      title: "Props로 값 전달하기",
      description: "컴포넌트에 필요한 이름이나 목록을 전달합니다.",
    },
  ];

  return (
    <>
      <header>
        <strong className="logo">Green React Board</strong>
      </header>
      <main>
        <h1>React 기초</h1>
        <p>
          게시판을 만들기 전에 {lessonTopic}로 화면을 구성하는 방법부터
          살펴봅시다.
        </p>
        <ul>
          {concepts.map((concept) => (
            <li key={concept.id}>
              <strong>{concept.title}</strong>
              <span>{concept.description}</span>
            </li>
          ))}
        </ul>
      </main>
    </>
  );
}
