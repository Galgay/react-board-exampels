import { Link } from "react-router-dom";

export default function WritePage() {
  return <><h1>글쓰기</h1><p>로그인과 작성 API를 연결한 뒤 사용할 수 있습니다.</p><Link to="/posts">목록으로</Link></>;
}
