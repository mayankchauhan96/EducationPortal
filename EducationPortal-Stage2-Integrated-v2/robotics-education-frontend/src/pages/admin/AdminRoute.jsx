import { Navigate, Outlet, useLocation } from "react-router-dom";
import { getAdminSession } from "../../utils/adminAuth";

export default function AdminRoute() {
  const location = useLocation();
  return getAdminSession()
    ? <Outlet />
    : <Navigate to="/admin/login" replace state={{ from: location.pathname }} />;
}
