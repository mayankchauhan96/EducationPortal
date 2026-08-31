import { useEffect, useState } from "react";
import { getDashboard } from "../../api/adminApi";

export default function AdminDashboardPage() {
  const [data, setData] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    getDashboard().then(setData).catch((e)=>setError(e.response?.data?.message || "Failed to load dashboard."));
  }, []);

  const cards = data ? [
    ["Programs", data.programs],
    ["Projects", data.projects],
    ["Curriculum", data.curriculum],
    ["Page sections", data.pageSections],
    ["Contact requests", data.contactRequests],
    ["Demo requests", data.demoRequests],
  ] : [];

  return (
    <div className="p-5 lg:p-10">
      <div className="max-w-6xl">
        <p className="eyebrow">ADMIN DASHBOARD</p>
        <h1 className="section-title">Content at a glance.</h1>
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
