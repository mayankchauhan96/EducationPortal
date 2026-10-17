import { Navigate, Outlet, useLocation } from "react-router-dom";
import { getAdminSession } from "../../utils/adminAuth";

const portalRoles = ["STUDENT", "PRINCIPAL", "TEACHER", "PARENT"];

export default function PortalRoute() {
  const location = useLocation();
  const session = getAdminSession();

  if (!session) {
    return <Navigate to="/portal/login" replace state={{ from: location.pathname }} />;
  }
  if (["ADMIN", "EDITOR"].includes(session.user.role)) {
    return <Navigate to="/admin" replace />;
  }
  if (!portalRoles.includes(session.user.role)) {
    return <Navigate to="/admin/login" replace />;
  }
  return <Outlet />;
}
