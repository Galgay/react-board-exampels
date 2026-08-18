import Greeting from "../components/Greeting.jsx";
import LessonList from "../components/LessonList.jsx";

const lessons = [
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

export default function ConceptPage() {
  return (
    <>
      <h1>React 기초</h1>
      <Greeting topic="React" />
      <LessonList lessons={lessons} />
    </>
  );
}
