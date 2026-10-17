import { useEffect, useState } from "react";
import { createAdminUser, getAdminUsers, setAdminUserActive } from "../../api/adminApi";

const roles = ["ADMIN", "EDITOR", "STUDENT", "PRINCIPAL", "TEACHER", "PARENT"];

export default function AdminUsersPage() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({ email: "", password: "", role: "EDITOR" });
  const [error, setError] = useState("");

  const load = () => getAdminUsers().then(setItems).catch((e) => setError(e.response?.data?.message || "Failed to load"));

  useEffect(() => {
    load();
  }, []);

  const submit = async (event) => {
    event.preventDefault();
    try {
      await createAdminUser(form);
      setForm({ email: "", password: "", role: "EDITOR" });
      load();
    } catch (e) {
      setError(e.response?.data?.message || "Failed to create user");
    }
  };

  return (
    <div className="p-5 lg:p-10">
      <div className="mx-auto max-w-5xl">
        <p className="eyebrow">ACCESS CONTROL</p>
        <h1 className="section-title">User Accounts</h1>
        <p className="mt-2 text-zinc-600">Create CMS accounts and school learning portal accounts. School and classroom access is assigned in Academic Setup.</p>

        <form onSubmit={submit} className="mt-8 grid gap-4 rounded-3xl border border-zinc-200 bg-white p-6 md:grid-cols-4">
          <label className="block text-sm font-medium text-zinc-700">
            Email <span className="text-red-600" aria-hidden="true">*</span>
            <span className="sr-only"> (required)</span>
            <input
              required
              type="email"
              autoComplete="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="mt-1 w-full rounded-xl border border-zinc-300 px-3 py-2.5"
            />
          </label>
          <label className="block text-sm font-medium text-zinc-700">
            Password <span className="text-red-600" aria-hidden="true">*</span>
            <span className="sr-only"> (required)</span>
            <input
              required
              type="password"
              autoComplete="new-password"
              minLength={8}
              maxLength={100}
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              className="mt-1 w-full rounded-xl border border-zinc-300 px-3 py-2.5"
            />
          </label>
          <label className="block text-sm font-medium text-zinc-700">
            Role
            <select
              required
              value={form.role}
              onChange={(e) => setForm({ ...form, role: e.target.value })}
              className="mt-1 w-full rounded-xl border border-zinc-300 px-3 py-2.5"
            >
              {roles.map((role) => <option key={role}>{role}</option>)}
            </select>
          </label>
          <button className="btn-primary">Create user</button>
        </form>

        {error && <p className="mt-5 text-red-600">{error}</p>}

        <div className="mt-8 overflow-x-auto rounded-3xl border border-zinc-200 bg-white">
          <table className="min-w-full text-left text-sm">
            <thead className="bg-zinc-50 text-xs uppercase text-zinc-500">
              <tr>
                <th className="px-5 py-4">Email</th>
                <th className="px-5 py-4">Role</th>
                <th className="px-5 py-4">Status</th>
                <th className="px-5 py-4">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100">
              {items.map((item) => (
                <tr key={item.id}>
                  <td className="px-5 py-4">{item.email}</td>
                  <td className="px-5 py-4">{item.role}</td>
                  <td className="px-5 py-4">{item.active ? "Active" : "Disabled"}</td>
                  <td className="px-5 py-4">
                    <button onClick={() => setAdminUserActive(item.id, !item.active).then(load)} className="font-semibold">
                      {item.active ? "Disable" : "Enable"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
