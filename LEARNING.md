# React 기초 2

Router로 나눈 게시판 화면에 State와 이벤트를 연결합니다.

## 학습 내용

- `useState`로 컴포넌트가 기억할 값 만들기
- `onClick`, `onChange`, `onSubmit` 이벤트 처리하기
- 입력값과 State를 연결한 제어 컴포넌트 이해하기
- `event.preventDefault()`로 폼의 새로고침 막기
- `useEffect`로 State가 바뀐 뒤 문서 제목 변경하기

## 코드에서 확인할 곳

- `/posts`의 `BasicsPractice`: 숫자를 누르며 State 변경 확인
- `/posts/new`의 `WritePage`: 입력값을 State에 저장

현재 등록 버튼은 입력값을 알림으로만 보여 줍니다. 다음 단계에서는 게시글 배열을
State로 바꾸고 새 글을 목록에 추가합니다.
