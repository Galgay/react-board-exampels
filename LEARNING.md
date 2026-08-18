# 외부 API 연동

Router의 URL 구조를 유지하면서 localStorage를 외부 API 요청으로 교체합니다.

## 학습 내용

- `fetch`로 GET, POST, DELETE 요청 보내기
- `async/await`와 `try/catch`로 비동기 코드 처리하기
- 요청 중, 완료, 오류 상태를 State로 표현하기
- 요청 중에는 등록 버튼을 비활성화하기
- API 요청 코드를 `api.js` 한 파일로 정리하기

## URL과 API 요청

- `/posts`: `GET /api/posts`
- `/posts/new`: `POST /api/posts`
- `/posts/:postId`에서 삭제: `DELETE /api/posts/:postId`

화면 URL은 이전 단계와 같습니다. 데이터가 저장되는 위치와 비동기 처리만
달라지므로 localStorage 단계와 코드를 비교해 보기 좋습니다.

API 서버가 꺼져 있으면 로컬 저장소를 사용합니다.
