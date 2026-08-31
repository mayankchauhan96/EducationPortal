import { useEffect, useState } from "react";

function Field({ field, value, onChange }) {
  const common = "mt-1 w-full rounded-xl border border-zinc-300 bg-white px-3 py-2.5 outline-none focus:border-black";

  if (field.type === "textarea") {
    return (
      <textarea
        rows={field.rows || 4}
        value={value ?? ""}
        onChange={(e) => onChange(e.target.value)}
        className={common}
      />
    );
  }

  if (field.type === "boolean") {
    return (
      <input
        type="checkbox"
        checked={Boolean(value)}
        onChange={(e) => onChange(e.target.checked)}
        className="mt-3 h-4 w-4"
      />
    );
  }

  if (field.type === "number") {
    return (
      <input
        type="number"
        value={value ?? 0}
        onChange={(e) => onChange(Number(e.target.value))}
        className={common}
      />
    );
  }

  return <input value={value ?? ""} onChange={(e) => onChange(e.target.value)} className={common} />;
}

export default function AdminResourcePage({
  title,
  subtitle,
  load,
  create,
  update,
  remove,
  fields,
  emptyItem,
  columns,
}) {
  const [items, setItems] = useState([]);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(emptyItem);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const refresh = async () => {
    setLoading(true);
    try {
      setItems(await load());
    } catch (e) {
      setError(e.response?.data?.message || "Failed to load data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refresh();
  }, []);

  const startCreate = () => {
    setEditing("new");
    setForm({ ...emptyItem });
    setError("");
  };

  const startEdit = (item) => {
    setEditing(item.id);
    setForm({ ...item });
    setError("");
  };

  const cancel = () => {
    setEditing(null);
    setForm(emptyItem);
  };

  const save = async (event) => {
    event.preventDefault();
    setSaving(true);
    setError("");

    try {
      if (editing === "new") {
        await create(form);
      } else {
        await update(editing, form);
      }
      cancel();
      await refresh();
    } catch (e) {
      setError(e.response?.data?.message || "Failed to save.");
    } finally {
      setSaving(false);
    }
  };

  const del = async (id) => {
    if (!window.confirm("Delete this item?")) return;

    try {
      await remove(id);
      await refresh();
    } catch (e) {
      setError(e.response?.data?.message || "Failed to delete.");
    }
  };

  const displayValue = (item, column) => {
    const value = item[column.key];
    if (column.key === "published") return value ? "Published" : "Draft";
    if (value === null || value === undefined || value === "") return "—";
    return String(value).length > 80 ? `${String(value).slice(0, 80)}…` : String(value);
  };

  return (
    <div className="p-5 lg:p-10">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div>
            <p className="eyebrow">CONTENT MANAGEMENT</p>
            <h1 className="section-title">{title}</h1>
            <p className="mt-3 max-w-2xl text-zinc-500">{subtitle}</p>
          </div>
          <button onClick={startCreate} className="btn-primary">Add {title.replace(/s$/, "")}</button>
        </div>

        {error && (
          <div className="mt-6 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
            {error}
          </div>
        )}

        <div className="mt-8 overflow-hidden rounded-3xl border border-zinc-200 bg-white">
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead className="bg-zinc-50 text-xs uppercase tracking-wider text-zinc-500">
                <tr>
                  {columns.map((column) => (
                    <th key={column.key} className="px-5 py-4">{column.label}</th>
                  ))}
                  <th className="px-5 py-4">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100">
                {loading ? (
                  <tr>
                    <td colSpan={columns.length + 1} className="px-5 py-10 text-center text-zinc-500">
                      Loading…
                    </td>
                  </tr>
                ) : items.length === 0 ? (
                  <tr>
                    <td colSpan={columns.length + 1} className="px-5 py-10 text-center text-zinc-500">
                      No records yet.
                    </td>
                  </tr>
                ) : (
                  items.map((item) => (
                    <tr key={item.id} className="hover:bg-zinc-50/70">
                      {columns.map((column) => (
                        <td key={column.key} className="max-w-xs px-5 py-4 align-top text-zinc-700">
                          {displayValue(item, column)}
                        </td>
                      ))}
                      <td className="whitespace-nowrap px-5 py-4">
                        <button onClick={() => startEdit(item)} className="mr-3 font-semibold">
                          Edit
                        </button>
                        <button onClick={() => del(item.id)} className="text-zinc-500 hover:text-red-700">
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {editing !== null && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 px-5 py-8">
            <div className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-3xl bg-white p-7">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">{editing === "new" ? "Create" : "Edit"} {title.replace(/s$/, "")}</h2>
                <button onClick={cancel} className="rounded-full bg-zinc-100 px-3 py-1">✕</button>
              </div>

              <form onSubmit={save} className="mt-6 grid gap-5 md:grid-cols-2">
                {fields.map((field) => (
                  <label
                    key={field.key}
                    className={field.type === "textarea" ? "md:col-span-2 block" : "block"}
                  >
                    <span className="text-sm font-medium text-zinc-700">{field.label}</span>
                    <Field
                      field={field}
                      value={form[field.key]}
                      onChange={(value) => setForm({ ...form, [field.key]: value })}
                    />
                  </label>
                ))}

                <div className="md:col-span-2 flex justify-end gap-3 border-t border-zinc-200 pt-5">
                  <button type="button" onClick={cancel} className="btn-secondary">Cancel</button>
                  <button disabled={saving} className="btn-primary">{saving ? "Saving…" : "Save changes"}</button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
