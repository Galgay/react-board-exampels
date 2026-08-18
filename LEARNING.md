# 컴포넌트와 Router로 정적 게시판 만들기

앞에서 연습한 컴포넌트 분리와 Router를 실제 게시판 화면에 적용합니다.

## 컴포넌트 적용

- `BoardHeader`: 게시판의 공통 헤더
- `PostList`: 게시글 배열 순회
- `PostItem`: 게시글 하나 표시

기초 실습의 `ConceptList → ConceptCard` 구조가 게시판에서는
`PostList → PostItem` 구조로 바뀝니다.

## URL 적용

- `/posts`: 게시글 목록
- `/posts/:postId`: 게시글 상세
- `/posts/new`: 게시글 작성

## pages 폴더

- `PostListPage`: 목록 페이지
- `PostDetailPage`: 상세 페이지
- `WritePage`: 작성 페이지

아직 State와 이벤트는 사용하지 않습니다. 고정된 게시글 데이터로 화면 구조와
페이지 이동만 확인합니다.
