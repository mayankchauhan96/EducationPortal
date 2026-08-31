import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { clearAdminSession, getAdminSession } from "../../utils/adminAuth";

const links = [
  ["Overview", "/admin"],
  ["Programs", "/admin/programs"],
  ["Projects", "/admin/projects"],
  ["Curriculum", "/admin/curriculum"],
  ["Page Content", "/admin/page-content"],
  ["Contacts", "/admin/contacts"],
  ["Demo Requests", "/admin/demo-requests"],
  ["Users", "/admin/users"],
];

export default function AdminLayout() {
  const navigate = useNavigate();
  const session = getAdminSession();
  const visibleLinks = links.filter(([, to]) => to !== "/admin/users" || session?.user?.role === "ADMIN");

  const handleLogout = () => {
    clearAdminSession();
    navigate("/admin/login", { replace: true });
  };

  return (
    <div className="min-h-screen bg-zinc-100 text-zinc-900">
      <div className="flex min-h-screen">
        <aside className="hidden w-64 shrink-0 bg-zinc-950 text-white lg:flex lg:flex-col">
          <div className="border-b border-zinc-800 px-6 py-6">
            <div className="text-lg font-black tracking-tight">Robotics Admin</div>
            <div className="mt-1 text-xs text-zinc-500">{session?.user?.email}</div>
          </div>

          <nav className="flex-1 space-y-1 p-4">
            {visibleLinks.map(([label, to]) => (
              <NavLink
                key={to}
                end={to === "/admin"}
                to={to}
                className={({ isActive }) =>
                  `block rounded-xl px-4 py-3 text-sm transition ${
                    isActive ? "bg-white text-black" : "text-zinc-400 hover:bg-zinc-900 hover:text-white"
                  }`
                }
              >
                {label}
              </NavLink>
            ))}
          </nav>

          <button
            onClick={handleLogout}
            className="m-4 rounded-xl border border-zinc-800 px-4 py-3 text-sm text-zinc-400 hover:text-white"
          >
            Sign out
          </button>
        </aside>

        <main className="min-w-0 flex-1">
          <div className="border-b border-zinc-200 bg-white px-5 py-4 lg:hidden">
            <div className="flex items-center justify-between">
              <span className="font-bold">Robotics Admin</span>
              <button onClick={handleLogout} className="text-sm text-zinc-500">
                Sign out
              </button>
            </div>
            <div className="mt-3 flex gap-2 overflow-x-auto">
              {visibleLinks.map(([label, to]) => (
                <NavLink
                  key={to}
                  end={to === "/admin"}
                  to={to}
                  className={({ isActive }) =>
                    `shrink-0 rounded-full px-3 py-2 text-xs ${
                      isActive ? "bg-black text-white" : "bg-zinc-100 text-zinc-600"
                    }`
                  }
                >
                  {label}
                </NavLink>
              ))}
            </div>
          </div>

          <Outlet />
        </main>
      </div>
    </div>
  );
}
