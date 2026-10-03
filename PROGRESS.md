# React 게시판 커밋별 실습 흐름

바닐라 기준은 `vanilla-board/practice/notion-vanilla-board`입니다. 각 커밋을 체크아웃한 뒤 `npm install`과 `npm run dev`로 실행할 수 있습니다. 아래의 “아직 구현하지 않는 내용”은 해당 커밋 시점의 범위입니다.

### REACT 01 | Vite 프로젝트 생성 및 기본 구조 정리

- 대상 파일: `package.json`, `index.html`, `src/main.jsx`, `src/App.jsx`, `vite.config.js`
- 주요 변경: `root`에 `App`을 렌더링하는 최소 프로젝트 생성
- 학습 개념: Vite, JSX 진입점, `createRoot`
- 기존 바닐라 버전과의 관계: 다중 HTML 페이지를 옮길 React 실행 환경 마련
- 이전 커밋과의 연결: 첫 단계
- 이 시점에서 아직 구현하지 않는 내용: 게시판 화면, State, Router, API

### REACT 02 | 기존 게시판 목록 화면을 JSX로 구성

- 대상 파일: `src/App.jsx`, `src/style.css`, `public/images/leaf.svg`
- 주요 변경: 바닐라 목록의 `header`, `nav`, `main`, `footer`와 CSS 이전
- 학습 개념: JSX, `className`, `{}` 값 출력
- 기존 바닐라 버전과의 관계: 표시 문구와 반응형 CSS 유지
- 이전 커밋과의 연결: 빈 `App`에 실제 목록 마크업 배치
- 이 시점에서 아직 구현하지 않는 내용: 역할별 컴포넌트, 데이터 반복, 클릭 동작

### REACT 03 | 게시판 공통 영역과 목록 컴포넌트 분리

- 대상 파일: `src/App.jsx`, `src/components/BoardHeader.jsx`, `BoardFooter.jsx`, `PostList.jsx`
- 주요 변경: 공통 영역과 목록을 역할에 따라 분리
- 학습 개념: 함수 컴포넌트, 컴포넌트 조합
- 기존 바닐라 버전과의 관계: 마크업과 클래스는 그대로 사용
- 이전 커밋과의 연결: 한 파일의 JSX를 필요한 단위로 분리
- 이 시점에서 아직 구현하지 않는 내용: Props 데이터, State, Router

### REACT 04 | Props를 이용한 샘플 게시글 목록 출력

- 대상 파일: `src/App.jsx`, `src/components/PostList.jsx`, `PostItem.jsx`
- 주요 변경: 샘플 배열을 부모에서 자식으로 전달해 `map` 출력
- 학습 개념: Props, `key`, 부모 → 자식 데이터 흐름
- 기존 바닐라 버전과의 관계: `renderPosts`의 게시글 행 구성 재사용
- 이전 커밋과의 연결: 정적 행을 데이터로 바꿈
- 이 시점에서 아직 구현하지 않는 내용: 이벤트, State, API

### REACT 05 | 게시글 클릭 이벤트를 부모 컴포넌트에 전달

- 대상 파일: `src/App.jsx`, `src/components/PostList.jsx`, `PostItem.jsx`
- 주요 변경: 자식 클릭이 부모의 함수를 호출
- 학습 개념: `onClick`, 함수 전달, 이벤트 기본 동작
- 기존 바닐라 버전과의 관계: 게시글 제목 링크를 클릭 대상으로 유지
- 이전 커밋과의 연결: Props 데이터에 동작 Props를 추가
- 이 시점에서 아직 구현하지 않는 내용: State 화면 갱신, Router

### REACT 06 | State 변경으로 임시 게시글 목록 갱신

- 대상 파일: `src/App.jsx`
- 주요 변경: 샘플 목록을 `useState`로 관리하고 새 배열로 임시 글 추가
- 학습 개념: State, 재렌더링, 불변 갱신, 함수형 업데이트
- 기존 바닐라 버전과의 관계: 바닐라의 직접 DOM 변경을 React State와 비교
- 이전 커밋과의 연결: 클릭 결과를 화면에 반영
- 이 시점에서 아직 구현하지 않는 내용: 작성 Form, 화면 전환, Router

### REACT 07 | Controlled Form과 State 기반 목록·작성 화면 전환

- 대상 파일: `src/App.jsx`, `src/components/PostForm.jsx`, `BoardHeader.jsx`
- 주요 변경: 제목·본문 State를 가진 작성 Form과 `page` State 화면 전환
- 학습 개념: `value`, `onChange`, `onSubmit`, `preventDefault`, 조건부 렌더링
- 기존 바닐라 버전과의 관계: 작성 Form의 문구·요소·CSS 유지
- 이전 커밋과의 연결: 임시 글 추가를 실제 입력 폼으로 확장
- 이 시점에서 아직 구현하지 않는 내용: Router와 URL 변경. 작성 화면에서 새로고침·뒤로가기·주소 공유의 한계를 확인

### REACT 08 | Router로 목록·작성·상세·로그인 경로 구성

- 대상 파일: `package.json`, `src/main.jsx`, `src/App.jsx`, 목록·헤더·폼 컴포넌트
- 주요 변경: `/posts`, `/posts/new`, `/posts/:postId`, `/login` Route와 Link 구성
- 학습 개념: `BrowserRouter`, `Routes`, `Route`, `Link`
- 기존 바닐라 버전과의 관계: 네 HTML 화면을 같은 역할의 React 경로에 배치
- 이전 커밋과의 연결: State 화면 전환의 URL 한계를 해결
- 이 시점에서 아직 구현하지 않는 내용: `useParams`, `useSearchParams`, `useNavigate`, API

### REACT 09 | 빈 목록과 로그인 상태별 메뉴 조건부 렌더링

- 대상 파일: `src/App.jsx`, `src/components/BoardHeader.jsx`, `PostList.jsx`
- 주요 변경: 빈 목록 안내와 로그인 여부에 따른 메뉴 표시
- 학습 개념: 조건부 렌더링, 공통 부모 State
- 기존 바닐라 버전과의 관계: 바닐라의 `hidden` 처리 대신 JSX 분기 사용
- 이전 커밋과의 연결: Route 화면 외의 UI 상태에도 조건부 렌더링 적용
- 이 시점에서 아직 구현하지 않는 내용: 실제 로그인 API, Context

### REACT 10 | useRef로 작성 폼 검증 실패 입력칸에 포커스

- 대상 파일: `src/components/PostForm.jsx`
- 주요 변경: 제목·본문 입력에 Ref를 연결해 검증 실패 위치에 포커스
- 학습 개념: `useRef`, `ref.current.focus()`
- 기존 바닐라 버전과의 관계: 기존 입력 규칙 10~50자·10자 이상 유지
- 이전 커밋과의 연결: State 검증 결과에 DOM 포커스 동작 추가
- 이 시점에서 아직 구현하지 않는 내용: Ref를 데이터 저장소로 사용, API

### REACT 11 | URL 게시글 ID와 샘플 상세 데이터 연결

- 대상 파일: `src/App.jsx`
- 주요 변경: URL의 ID로 샘플 게시글을 찾아 상세 표시
- 학습 개념: `useParams`, 경로 매개변수
- 기존 바닐라 버전과의 관계: 상세 제목·메타·본문 마크업 유지
- 이전 커밋과의 연결: 08의 상세 Route에 실제 ID 해석 추가
- 이 시점에서 아직 구현하지 않는 내용: 상세 API, 댓글 API

### REACT 12 | URL Query로 샘플 게시글 페이지 이동

- 대상 파일: `src/App.jsx`
- 주요 변경: `?page=1`과 이전·다음 버튼을 샘플 목록에 연결
- 학습 개념: `useSearchParams`, URL 상태
- 기존 바닐라 버전과의 관계: 이전·다음·현재 페이지 UI 유지
- 이전 커밋과의 연결: 경로 ID에 이어 쿼리 페이지를 URL에 표현
- 이 시점에서 아직 구현하지 않는 내용: 실제 서버 페이징

### REACT 13 | useEffect로 게시글 목록 API 조회

- 대상 파일: `src/App.jsx`, `vite.config.js`
- 주요 변경: 샘플 목록을 `/api/board?page=&size=10` 응답으로 교체
- 학습 개념: `useEffect`, 의존성에 따른 재조회
- 기존 바닐라 버전과의 관계: 목록 API와 Spring Page 형식 그대로 사용
- 이전 커밋과의 연결: URL 페이지를 서버 조회 페이지로 사용
- 이 시점에서 아직 구현하지 않는 내용: 상세·댓글 API, 로그인 토큰

### REACT 14 | 게시글 상세·댓글 API 조회와 요청 정리

- 대상 파일: `src/App.jsx`
- 주요 변경: URL ID로 상세와 해당 글의 댓글을 조회하고 요청 종료 시 abort
- 학습 개념: Effect cleanup, `[postId]` 재조회, 서로 다른 오류 State
- 기존 바닐라 버전과의 관계: 상세·댓글 API와 댓글 본문 구조 유지
- 이전 커밋과의 연결: 목록에 이어 상세·댓글 조회를 직접 작성
- 이 시점에서 아직 구현하지 않는 내용: 로그인, 등록 API, 요청 공통화

### REACT 15 | 로그인 API·JWT State와 인증 화면 접근 연결

- 대상 파일: `src/App.jsx`, `src/components/BoardHeader.jsx`, `AuthMenu.jsx`
- 주요 변경: 로그인 Form 제출로 JWT 저장, 인증 State 변경, 보호 화면 접근 처리
- 학습 개념: Controlled 로그인 Form, localStorage와 State, `useNavigate`, App → BoardHeader → AuthMenu의 Props Drilling
- 기존 바닐라 버전과의 관계: 로그인 API·Form·`boardAccessToken` 키 유지
- 이전 커밋과의 연결: 인증이 필요한 조회 API에 Bearer 헤더 추가
- 이 시점에서 아직 구현하지 않는 내용: Context, 로그아웃 API, 등록 API

### REACT 16 | Auth Context로 인증 State 공유

- 대상 파일: `src/auth.jsx`, `src/main.jsx`, `src/App.jsx`, `src/components/BoardHeader.jsx`, `AuthMenu.jsx`
- 주요 변경: App에서 전달하던 인증 State와 함수를 Provider로 이동하고 AuthMenu가 Context에서 직접 읽음
- 학습 개념: `createContext`, Provider, `useContext`
- 기존 바닐라 버전과의 관계: 인증 정보 저장 방식은 유지
- 이전 커밋과의 연결: 여러 화면으로 전달하던 인증 Props를 Context로 정리
- 이 시점에서 아직 구현하지 않는 내용: 게시판 전체 State의 Context화, 로그아웃 API

### REACT 17 | 로그아웃 API와 인증 정보 정리

- 대상 파일: `src/auth.jsx`, `src/components/BoardHeader.jsx`, `AuthMenu.jsx`
- 주요 변경: 토큰 본문과 Bearer 헤더로 로그아웃 요청 후 인증 정보 정리
- 학습 개념: 클릭 이벤트의 비동기 요청, Context 함수 사용
- 기존 바닐라 버전과의 관계: 기존 로그아웃 경로·본문 유지
- 이전 커밋과의 연결: AuthMenu가 Context의 logout 함수를 호출
- 이 시점에서 아직 구현하지 않는 내용: 게시글·댓글 생성 API

### REACT 18 | 게시글 작성 Form을 생성 API에 연결

- 대상 파일: `src/App.jsx`, `src/components/PostForm.jsx`
- 주요 변경: 제목·본문 JSON 등록, 성공 후 목록 이동, 실패 시 입력 유지
- 학습 개념: Form 이벤트의 API 요청, `useNavigate` 재사용
- 기존 바닐라 버전과의 관계: `POST /api/board` 요청 형식 유지
- 이전 커밋과의 연결: 임시 저장을 실제 서버 등록으로 교체
- 이 시점에서 아직 구현하지 않는 내용: 댓글 생성, API 공통화

### REACT 19 | 댓글 작성 Form과 생성 API 연결

- 대상 파일: `src/App.jsx`
- 주요 변경: 댓글 입력 State, 등록 요청, 성공 후 해당 글 댓글 재조회
- 학습 개념: Controlled 댓글 Form, 이벤트 요청
- 기존 바닐라 버전과의 관계: 기존 댓글 Form·API·문구 유지
- 이전 커밋과의 연결: 게시글 생성에 이어 댓글 생성까지 완성
- 이 시점에서 아직 구현하지 않는 내용: Spinner, 중복 제출 방지, API 공통화

### REACT 20 | 조회 Spinner·오류 재시도와 중복 제출 방지

- 대상 파일: `src/App.jsx`, `src/components/PostForm.jsx`, `Spinner.jsx`, `src/style.css`
- 주요 변경: 조회 상태 구분, 재시도 버튼, 로그인·작성·댓글 제출 중 버튼 비활성화
- 학습 개념: loading/error State와 조건부 렌더링
- 기존 바닐라 버전과의 관계: 텍스트 로딩만 작은 Spinner로 변경
- 이전 커밋과의 연결: 실제 요청에서 경험한 로딩·실패·연속 클릭을 처리
- 이 시점에서 아직 구현하지 않는 내용: API 함수 분리

### REACT 21 | 인증·게시글·댓글 API 요청 함수 분리

- 대상 파일: `src/api.js`, `src/auth.jsx`, `src/App.jsx`
- 주요 변경: 중복 요청 형식을 `authApi`, `postApi`, `commentApi` 함수로 이동
- 학습 개념: 컴포넌트 State와 서버 요청의 역할 구분
- 기존 바닐라 버전과의 관계: 요청 경로·헤더·응답 형식 유지
- 이전 커밋과의 연결: 여러 API를 직접 작성한 뒤 반복되는 부분만 정리
- 이 시점에서 아직 구현하지 않는 내용: 범용 HTTP Client, Service 계층

### REACT 22 | 게시판 전체 흐름과 단계별 기록 정리

- 대상 파일: `README.md`, `PROGRESS.md`, `package-lock.json`, 최종 점검에서 수정한 파일
- 주요 변경: 실행 설명, 학습 순서, 토큰 만료·폼 검증 등 최종 흐름 정리
- 학습 개념: 앞 단계의 React·Router·API·Context 통합 확인
- 기존 바닐라 버전과의 관계: UI 문구·CSS·API 범위를 최종 비교
- 이전 커밋과의 연결: 학습용 임시 코드가 없는 최종 게시판 확인
- 이 시점에서 아직 구현하지 않는 내용: 수정·삭제·검색·정렬, 최적화 Hook, 복잡한 계층

## 최종 확인

1. 로그인 → 목록 → 다음 페이지 → 상세 → 댓글 조회·등록 → 글쓰기·등록 → 로그아웃
2. `/posts?page=2`, `/posts/1` 직접 접근과 새로고침
3. 잘못된 ID, 빈 댓글, 서버 오류, 401 응답, 검증 실패, 중복 제출
4. 모바일 폭에서 기존 CSS 배치와 버튼 상태
