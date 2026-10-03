# 게시판 React 실습

`vanilla-board`의 `practice/notion-vanilla-board` 브랜치에서 HTML 구조, 표시 문구, CSS, API 요청·응답 형식을 가져와 React로 단계별 변환했습니다. 학습용 브랜치는 `practice/notion-react-board`입니다.

## 실행

```bash
npm ci
npm run dev
```

Spring API 서버를 `127.0.0.1:8080`에서 실행하세요. Vite가 `/api` 요청을 해당 서버에 전달합니다. 실제 서버 계정으로 로그인해야 최종 흐름을 확인할 수 있습니다.

API는 기존 바닐라 실습과 동일합니다.

- `POST /api/auth/login`: `{ username, password }` → `{ success, message, data: { accessToken } }`
- `POST /api/auth/logout`: `{ accessToken }`와 Bearer 헤더 → 204 또는 기존 성공 응답
- `GET /api/board?page=0&size=10`: Spring Page 형식의 `data`
- `GET /api/board/{id}`, `POST /api/board`: 상세 조회와 `{ title, content }` 등록
- `GET/POST /api/board/{id}/comments`: 댓글 목록과 `{ content }` 등록

JWT는 기존처럼 `localStorage`의 `boardAccessToken` 키에 보관합니다. 로그인 여부에 따른 화면 표시와 서버 인증은 별개이며, 인증이 필요한 요청은 Bearer 헤더를 사용합니다.

## 커밋으로 학습하기

```bash
git log --reverse --oneline practice/notion-react-board
git show <커밋 ID>
```

`REACT 01`부터 `REACT 22`까지 순서대로 살펴보세요. 각 단계의 변경 파일, 개념, 확인 방법은 [PROGRESS.md](./PROGRESS.md)에 정리했습니다. `REACT 07`에서 State로 화면을 바꿀 때 URL은 그대로이고, 바로 다음 `REACT 08`에서 Router로 주소를 연결합니다. Router의 `useParams`, `useSearchParams`, `useNavigate`는 각각 상세, 페이지 이동, 로그인 성공 단계에서 차례로 등장합니다.

최종 범위는 로그인·로그아웃, 게시글 목록·상세·생성, 댓글 조회·생성입니다. 수정·삭제·검색·정렬은 포함하지 않습니다. React 빌드는 `npm run build`로 확인할 수 있습니다.
