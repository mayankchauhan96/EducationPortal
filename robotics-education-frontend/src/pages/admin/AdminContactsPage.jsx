import { useEffect, useState } from "react";
import { getContacts, updateContactStatus } from "../../api/adminApi";

export default function AdminContactsPage() {
  const [items, setItems] = useState([]);
  const [error, setError] = useState("");

  const load = () => getContacts().then(setItems).catch((e) => setError(e.response?.data?.message || "Failed to load"));

  useEffect(() => {
    load();
  }, []);

  const update = async (id, value) => {
    await updateContactStatus(id, value);
    load();
  };

  return (
    <div className="p-5 lg:p-10">
      <div className="mx-auto max-w-7xl">
        <p className="eyebrow">INBOX</p>
        <h1 className="section-title">Contact Requests</h1>
        {error && <p className="mt-5 text-red-600">{error}</p>}

        <div className="mt-8 overflow-x-auto rounded-3xl border border-zinc-200 bg-white">
          <table className="min-w-full text-left text-sm">
            <thead className="bg-zinc-50 text-xs uppercase text-zinc-500">
              <tr>
                {[["name", "Name"], ["email", "Email"], ["schoolName", "School"], ["message", "Message"]].map(([key, label]) => (
                  <th className="px-5 py-4" key={key}>{label}</th>
                ))}
                <th className="px-5 py-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100">
              {items.length ? (
                items.map((item) => (
                  <tr key={item.id}>
                    {[["name", "Name"], ["email", "Email"], ["schoolName", "School"], ["message", "Message"]].map(([key]) => (
                      <td className="max-w-sm px-5 py-4 align-top" key={key}>{String(item[key] ?? "—").slice(0, 140)}</td>
                    ))}
                    <td className="px-5 py-4">
                      <select
                        value={item.status}
                        onChange={(e) => update(item.id, e.target.value)}
                        className="rounded-lg border border-zinc-300 px-2 py-1"
                      >
                        {["NEW", "CONTACTED", "CLOSED"].map((value) => (
                          <option key={value}>{value}</option>
                        ))}
                      </select>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="px-5 py-10 text-center text-zinc-500">No requests yet.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
