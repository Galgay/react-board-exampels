# 리액트를 이용한 동적 게시판

State와 Router를 연결해 실제로 동작하는 게시판을 만듭니다.

## 학습 내용

- 게시글 배열을 `useState`로 관리하기
- 폼의 입력값으로 새 게시글 만들기
- `filter`로 선택한 게시글 삭제하기
- `useNavigate`로 등록·삭제 후 페이지 이동하기
- `useParams`의 게시글 번호로 State에서 게시글 찾기
- `useEffect`로 게시글을 로컬 저장소에 저장하기

## URL 흐름

1. `/posts/new`에서 글을 등록합니다.
2. 생성된 글의 `/posts/:postId` 상세 화면으로 이동합니다.
3. 글을 삭제하면 `/posts` 목록으로 돌아갑니다.

다음 단계에서는 localStorage 대신 외부 API 서버의 데이터를 사용합니다.
