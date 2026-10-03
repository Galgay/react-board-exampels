# React 게시판 실습

바닐라 게시판의 화면과 Spring API를 React로 옮기는 5일 실습. `chapter-practice-modules` 브랜치의 커밋을 앞에서부터 따라가면 각 개념을 배운 직후 게시판에 적용하는 흐름.

| 일차 | 교안·보충 주제 | 게시판 적용 |
| --- | --- | --- |
| 1일차 | Ch04 React 시작, Ch05-1 컴포넌트·JSX·Props | 첫 화면 구현, 목록·상세·폼 분리 |
| 2일차 | Ch05-2 State·이벤트·Form·Ref | 로컬 목록 선택·검색·작성 |
| 3일차 | React Router 보충, Ch06 Effect | 화면별 주소, 목록·상세 API 조회 |
| 4일차 | Spring API 인증·CRUD 실습 | JWT 로그인과 보호 경로, POST·PATCH·DELETE 실습 |
| 5일차 | Spring API 인증·목록 실습 | 토큰 갱신, 내 글 관리, 검색·정렬·페이지 이동 |

Ch07 `useReducer`, Ch08 최적화 훅, Ch09 Context는 이번 과정에서 제외. 각 커밋의 `LEARNING.md`에 해당 기능의 적용 내용과 확인 항목 정리.

교안에 없는 라우팅과 서버 연동은 `React Router #1`, `Spring API #1~6`으로 구분. `ch06 #1`은 `useEffect`를 게시글 목록·상세 API 조회에 적용하는 단계.

## 실행

Spring API를 `http://localhost:8080/api`에서 실행한 뒤:

```bash
npm install
npm run dev
```

API 주소가 다르면 `VITE_API_BASE_URL` 환경 변수로 설정. 프론트 주소에서 `/login`으로 시작. 서버의 목록·상세·검색, 인증, 게시글 CRUD, `my-posts` 엔드포인트 사용.
