import { Navigate, Outlet, useLocation } from "react-router-dom";
import BoardHeader from "./BoardHeader.jsx";

export default function ProtectedLayout({ user, onLogout }) {
  const location = useLocation();
  if (!user) return <Navigate to="/login" state={{ from: location.pathname + location.search }} replace />;
  return <>
    <BoardHeader user={user} onLogout={onLogout} />
    <main><Outlet /></main>
    <footer>그린보드</footer>
  </>;
}
