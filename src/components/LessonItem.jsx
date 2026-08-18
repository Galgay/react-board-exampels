export default function LessonItem({ title, description }) {
  return (
    <li>
      <strong>{title}</strong>
      <span>{description}</span>
    </li>
  );
}
