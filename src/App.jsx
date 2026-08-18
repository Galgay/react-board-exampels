import { Navigate, Route, Routes } from "react-router-dom";
import LearningHeader from "./components/LearningHeader.jsx";
import ConceptPage from "./pages/ConceptPage.jsx";
import PracticePage from "./pages/PracticePage.jsx";

export default function App() {
  return (
    <>
      <LearningHeader />
      <main>
        <Routes>
          <Route path="/" element={<Navigate to="/concepts" replace />} />
          <Route path="/concepts" element={<ConceptPage />} />
          <Route path="/practice" element={<PracticePage />} />
          <Route path="*" element={<p>페이지를 찾을 수 없습니다.</p>} />
        </Routes>
      </main>
    </>
  );
}
