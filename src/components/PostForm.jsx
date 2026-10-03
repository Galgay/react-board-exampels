import { useEffect, useRef, useState } from "react";

export default function PostForm({ initialValues = { title: "", content: "" }, onSubmit, submitLabel = "등록", disabled = false }) {
  const [values, setValues] = useState({ title: "", content: "" });
  const titleRef = useRef(null);

  useEffect(() => setValues(initialValues), [initialValues]);

  function handleChange(event) {
    const { name, value } = event.target;
    setValues((current) => ({ ...current, [name]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const saved = await onSubmit({ title: values.title.trim(), content: values.content.trim() });
    if (saved) titleRef.current?.focus();
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>{submitLabel === "등록" ? "글쓰기" : "게시글 수정"}</h2>
      <div>
        <label htmlFor="title">제목</label>
        <input ref={titleRef} id="title" name="title" value={values.title} onChange={handleChange} required minLength={10} maxLength={50} />
      </div>
      <div>
        <label htmlFor="content">본문</label>
        <textarea id="content" name="content" rows="5" value={values.content} onChange={handleChange} required minLength={10} />
      </div>
      <button type="submit" disabled={disabled}>{submitLabel}</button>
    </form>
  );
}
