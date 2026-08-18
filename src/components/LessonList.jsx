import LessonItem from "./LessonItem.jsx";

export default function LessonList({ lessons }) {
  return (
    <ul>
      {lessons.map((lesson) => (
        <LessonItem
          key={lesson.id}
          title={lesson.title}
          description={lesson.description}
        />
      ))}
    </ul>
  );
}
