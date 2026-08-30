import { useState } from "react";
import { submitDemoRequest } from "../../api/demoRequestApi";

const initialState = {
  contactName: "",
  schoolName: "",
  email: "",
  phone: "",
  city: "",
  role: "",
  studentCount: "",
  grades: "",
  message: "",
};

export default function DemoRequestForm() {
  const [form, setForm] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [apiError, setApiError] = useState("");

  const validate = () => {
    const nextErrors = {};

    if (!form.contactName.trim()) nextErrors.contactName = "Name is required.";
    if (!form.schoolName.trim()) nextErrors.schoolName = "School name is required.";
    if (!form.email.trim()) nextErrors.email = "Email is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) nextErrors.email = "Enter a valid email.";

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
    if (apiError) setApiError("");
    if (success) setSuccess("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setApiError("");
    setSuccess("");

    if (!validate()) return;

    setLoading(true);

    try {
      await submitDemoRequest(form);
      setSuccess("Demo request submitted successfully.");
      setForm(initialState);
    } catch (error) {
      console.error("Demo request failed:", error);
      setApiError(error?.response?.data?.message || "Unable to submit your demo request right now.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm md:p-8">
      <div className="grid gap-5 md:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm font-medium text-zinc-700">Name</label>
          <input name="contactName" value={form.contactName} onChange={handleChange} className="w-full rounded-2xl border border-zinc-300 bg-zinc-50 px-4 py-3 outline-none focus:border-zinc-900" />
          {errors.contactName && <p className="mt-2 text-sm text-red-600">{errors.contactName}</p>}
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-zinc-700">School name</label>
          <input name="schoolName" value={form.schoolName} onChange={handleChange} className="w-full rounded-2xl border border-zinc-300 bg-zinc-50 px-4 py-3 outline-none focus:border-zinc-900" />
          {errors.schoolName && <p className="mt-2 text-sm text-red-600">{errors.schoolName}</p>}
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-zinc-700">Email</label>
          <input type="email" name="email" value={form.email} onChange={handleChange} className="w-full rounded-2xl border border-zinc-300 bg-zinc-50 px-4 py-3 outline-none focus:border-zinc-900" />
          {errors.email && <p className="mt-2 text-sm text-red-600">{errors.email}</p>}
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-zinc-700">Phone</label>
          <input name="phone" value={form.phone} onChange={handleChange} className="w-full rounded-2xl border border-zinc-300 bg-zinc-50 px-4 py-3 outline-none focus:border-zinc-900" />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-zinc-700">City</label>
          <input name="city" value={form.city} onChange={handleChange} className="w-full rounded-2xl border border-zinc-300 bg-zinc-50 px-4 py-3 outline-none focus:border-zinc-900" />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-zinc-700">Role</label>
          <input name="role" value={form.role} onChange={handleChange} className="w-full rounded-2xl border border-zinc-300 bg-zinc-50 px-4 py-3 outline-none focus:border-zinc-900" />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-zinc-700">Student count</label>
          <input name="studentCount" value={form.studentCount} onChange={handleChange} className="w-full rounded-2xl border border-zinc-300 bg-zinc-50 px-4 py-3 outline-none focus:border-zinc-900" />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-zinc-700">Grades</label>
          <input name="grades" value={form.grades} onChange={handleChange} className="w-full rounded-2xl border border-zinc-300 bg-zinc-50 px-4 py-3 outline-none focus:border-zinc-900" />
        </div>
      </div>

      <div className="mt-5">
        <label className="mb-2 block text-sm font-medium text-zinc-700">Message</label>
        <textarea name="message" value={form.message} onChange={handleChange} rows="5" className="w-full rounded-2xl border border-zinc-300 bg-zinc-50 px-4 py-3 outline-none focus:border-zinc-900" />
      </div>

      {apiError && <p className="mt-4 text-sm text-red-600">{apiError}</p>}
      {success && <p className="mt-4 text-sm text-emerald-600">{success}</p>}

      <button type="submit" disabled={loading} className="btn-primary mt-6 disabled:cursor-not-allowed disabled:opacity-70">
        {loading ? "Submitting..." : "Book a Demo"}
      </button>
    </form>
  );
}
