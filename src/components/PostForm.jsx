import { useRef, useState } from "react";

export default function PostForm({ onCreate }) {
  const [values, setValues] = useState({ title: "", content: "" });
  const titleRef = useRef(null);

  function handleChange(event) {
    const { name, value } = event.target;
    setValues((current) => ({ ...current, [name]: value }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    onCreate({ title: values.title.trim(), content: values.content.trim() });
    setValues({ title: "", content: "" });
    titleRef.current?.focus();
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>글쓰기</h2>
      <div>
        <label htmlFor="title">제목</label>
        <input ref={titleRef} id="title" name="title" value={values.title} onChange={handleChange} required minLength={10} maxLength={50} />
      </div>
      <div>
        <label htmlFor="content">본문</label>
        <textarea id="content" name="content" rows="5" value={values.content} onChange={handleChange} required minLength={10} />
      </div>
      <button type="submit">등록</button>
    </form>
  );
}
