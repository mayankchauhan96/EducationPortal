import { useEffect, useState } from "react";
import apiClient from "../../api/apiClient";

export default function AdminDashboardPage() {
  const [stats, setStats] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    apiClient
      .get("/admin/dashboard")
      .then((response) => {
        const payload = response.data?.data ?? response.data;
        setStats(payload);
      })
      .catch((err) => {
        setError(err.response?.data?.message || "Failed to load dashboard.");
      });
  }, []);

  const cards = stats
    ? [
        ["Programs", stats.programs ?? 0],
        ["Projects", stats.projects ?? 0],
        ["Curriculum", stats.curriculum ?? 0],
        ["Page Content", stats.pageSections ?? 0],
        ["Contacts", stats.contactRequests ?? 0],
        ["Demo Requests", stats.demoRequests ?? 0],
      ]
    : [];

  return (
    <div className="p-5 lg:p-10">
      <div className="max-w-6xl">
        <p className="text-xs font-bold uppercase tracking-[0.22em] text-zinc-500">ADMIN DASHBOARD</p>
        <h1 className="mt-3 text-4xl font-black text-zinc-900">Content at a glance.</h1>
        <p className="mt-4 text-zinc-500">Manage the public education portal and inbound school enquiries.</p>

        {error && <div className="mt-8 rounded-2xl bg-red-50 p-4 text-red-700">{error}</div>}

        <div className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {cards.map(([label, value]) => (
            <div key={label} className="rounded-3xl border border-zinc-200 bg-white p-7 shadow-sm">
              <p className="text-sm text-zinc-500">{label}</p>
              <p className="mt-3 text-4xl font-black">{value ?? "—"}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
