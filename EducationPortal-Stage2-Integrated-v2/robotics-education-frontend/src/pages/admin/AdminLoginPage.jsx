import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { loginAdmin } from "../../api/adminApi";
import { saveAdminSession } from "../../utils/adminAuth";

export default function AdminLoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState("admin@robotics.local");
  const [password, setPassword] = useState("Admin@12345");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const data = await loginAdmin({ email, password });
      saveAdminSession(data);
      navigate(location.state?.from || "/admin", { replace: true });
    } catch (err) {
      setError(err.response?.data?.message || "Invalid email or password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-zinc-950 px-5 py-10 text-white">
      <div className="mx-auto flex min-h-[80vh] max-w-md items-center">
        <div className="w-full rounded-3xl border border-zinc-800 bg-zinc-900 p-8 shadow-2xl">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-zinc-500">ADMIN PORTAL</p>
          <h1 className="mt-3 text-4xl font-black">Welcome back.</h1>
          <p className="mt-3 text-zinc-400">Manage programs, curriculum, projects and school enquiries.</p>

          <form onSubmit={submit} className="mt-8 space-y-5">
            <label className="block">
              <span className="text-sm text-zinc-400">Email</span>
              <input value={email} onChange={(e)=>setEmail(e.target.value)}
                className="mt-2 w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 outline-none focus:border-white" />
            </label>
            <label className="block">
              <span className="text-sm text-zinc-400">Password</span>
              <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)}
                className="mt-2 w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 outline-none focus:border-white" />
            </label>
            {error && <p className="rounded-xl border border-red-900/50 bg-red-950/30 px-4 py-3 text-sm text-red-300">{error}</p>}
            <button disabled={loading} className="w-full rounded-xl bg-white px-5 py-3 font-semibold text-black disabled:opacity-50">
              {loading ? "Signing in..." : "Sign in"}
            </button>
          </form>
          <p className="mt-5 text-xs text-zinc-600">Local development credentials are prefilled. Change them before production.</p>
        </div>
      </div>
    </main>
  );
}
