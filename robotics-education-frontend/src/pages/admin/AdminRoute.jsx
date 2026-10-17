import { Navigate, Outlet, useLocation } from "react-router-dom";
import { getAdminSession } from "../../utils/adminAuth";

export default function AdminRoute() {
  const location = useLocation();
  const session = getAdminSession();

  return session && ["ADMIN", "EDITOR"].includes(session.user.role) ? (
    <Outlet />
  ) : (
    <Navigate
      to={session ? "/portal" : "/admin/login"}
      replace
      state={{ from: location.pathname }}
    />
  );
}
