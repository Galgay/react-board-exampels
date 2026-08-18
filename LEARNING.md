# 기초 실습 컴포넌트 파일 분리

한 파일에 작성했던 작은 컴포넌트를 역할에 따라 파일로 옮겨 봅니다.

## 분리한 컴포넌트

- `Greeting`: 학습 안내 문구 표시
- `LessonList`: 학습 배열을 `map`으로 순회
- `LessonItem`: 학습 내용 하나를 반복해서 표시

## Props 흐름

1. `App`이 학습 배열을 `LessonList`에 전달합니다.
2. `LessonList`가 각 학습 내용을 `LessonItem`에 전달합니다.
3. `LessonItem`은 받은 제목과 설명을 화면에 표시합니다.

같은 모양이 반복되는 `LessonItem`은 분리할 이유가 분명합니다. 반면 한두 줄짜리
HTML 요소까지 모두 컴포넌트로 만들지는 않습니다. 이 기준을 이후 게시판의
`PostList`와 `PostItem`에도 적용합니다.
