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
    else if (form.contactName.length > 120) nextErrors.contactName = "Name must be 120 characters or fewer.";
    if (!form.schoolName.trim()) nextErrors.schoolName = "School name is required.";
    else if (form.schoolName.length > 160) nextErrors.schoolName = "School name must be 160 characters or fewer.";
    if (!form.email.trim()) nextErrors.email = "Email is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) nextErrors.email = "Enter a valid email.";
    else if (form.email.length > 160) nextErrors.email = "Email must be 160 characters or fewer.";
    if (form.phone.length > 30) nextErrors.phone = "Phone number must be 30 characters or fewer.";
    if (form.city.length > 100) nextErrors.city = "City must be 100 characters or fewer.";
    if (form.role.length > 100) nextErrors.role = "Role must be 100 characters or fewer.";
    if (form.studentCount.length > 30) nextErrors.studentCount = "Student count must be 30 characters or fewer.";
    if (form.grades.length > 100) nextErrors.grades = "Grades must be 100 characters or fewer.";
    if (form.message.length > 1000) nextErrors.message = "Message must be 1,000 characters or fewer.";

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
      setSuccess("Your school demo request has been received. Our team will follow up using the email you provided.");
      setForm(initialState);
    } catch (error) {
      console.error("Demo request failed:", error);
      setApiError(error?.response?.data?.message || "Unable to submit your demo request right now.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} noValidate className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm md:p-8">
      <div className="grid gap-5 md:grid-cols-2">
        <div>
          <label htmlFor="demo-contact-name" className="mb-2 block text-sm font-medium text-zinc-700">Name <span aria-hidden="true">*</span></label>
          <input id="demo-contact-name" name="contactName" autoComplete="name" maxLength={120} required aria-invalid={Boolean(errors.contactName)} aria-describedby={errors.contactName ? "demo-contact-name-error" : undefined} value={form.contactName} onChange={handleChange} className="form-field" />
          {errors.contactName && <p id="demo-contact-name-error" className="mt-2 text-sm text-red-600">{errors.contactName}</p>}
        </div>

        <div>
          <label htmlFor="demo-school-name" className="mb-2 block text-sm font-medium text-zinc-700">School name <span aria-hidden="true">*</span></label>
          <input id="demo-school-name" name="schoolName" autoComplete="organization" maxLength={160} required aria-invalid={Boolean(errors.schoolName)} aria-describedby={errors.schoolName ? "demo-school-name-error" : undefined} value={form.schoolName} onChange={handleChange} className="form-field" />
          {errors.schoolName && <p id="demo-school-name-error" className="mt-2 text-sm text-red-600">{errors.schoolName}</p>}
        </div>

        <div>
          <label htmlFor="demo-email" className="mb-2 block text-sm font-medium text-zinc-700">Email <span aria-hidden="true">*</span></label>
          <input id="demo-email" type="email" name="email" autoComplete="email" maxLength={160} required aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? "demo-email-error" : undefined} value={form.email} onChange={handleChange} className="form-field" />
          {errors.email && <p id="demo-email-error" className="mt-2 text-sm text-red-600">{errors.email}</p>}
        </div>

        <div>
          <label htmlFor="demo-phone" className="mb-2 block text-sm font-medium text-zinc-700">Phone</label>
          <input id="demo-phone" type="tel" name="phone" autoComplete="tel" maxLength={30} aria-invalid={Boolean(errors.phone)} aria-describedby={errors.phone ? "demo-phone-error" : undefined} value={form.phone} onChange={handleChange} className="form-field" />
          {errors.phone && <p id="demo-phone-error" className="mt-2 text-sm text-red-600">{errors.phone}</p>}
        </div>

        <div>
          <label htmlFor="demo-city" className="mb-2 block text-sm font-medium text-zinc-700">City</label>
          <input id="demo-city" name="city" autoComplete="address-level2" maxLength={100} aria-invalid={Boolean(errors.city)} aria-describedby={errors.city ? "demo-city-error" : undefined} value={form.city} onChange={handleChange} className="form-field" />
          {errors.city && <p id="demo-city-error" className="mt-2 text-sm text-red-600">{errors.city}</p>}
        </div>

        <div>
          <label htmlFor="demo-role" className="mb-2 block text-sm font-medium text-zinc-700">Role</label>
          <input id="demo-role" name="role" maxLength={100} aria-invalid={Boolean(errors.role)} aria-describedby={errors.role ? "demo-role-error" : undefined} value={form.role} onChange={handleChange} className="form-field" />
          {errors.role && <p id="demo-role-error" className="mt-2 text-sm text-red-600">{errors.role}</p>}
        </div>

        <div>
          <label htmlFor="demo-student-count" className="mb-2 block text-sm font-medium text-zinc-700">Student count</label>
          <input id="demo-student-count" name="studentCount" maxLength={30} aria-invalid={Boolean(errors.studentCount)} aria-describedby={errors.studentCount ? "demo-student-count-error" : undefined} value={form.studentCount} onChange={handleChange} className="form-field" />
          {errors.studentCount && <p id="demo-student-count-error" className="mt-2 text-sm text-red-600">{errors.studentCount}</p>}
        </div>

        <div>
          <label htmlFor="demo-grades" className="mb-2 block text-sm font-medium text-zinc-700">Grades</label>
          <input id="demo-grades" name="grades" maxLength={100} aria-invalid={Boolean(errors.grades)} aria-describedby={errors.grades ? "demo-grades-error" : undefined} value={form.grades} onChange={handleChange} className="form-field" />
          {errors.grades && <p id="demo-grades-error" className="mt-2 text-sm text-red-600">{errors.grades}</p>}
        </div>
      </div>

      <div className="mt-5">
        <label htmlFor="demo-message" className="mb-2 block text-sm font-medium text-zinc-700">Message</label>
        <textarea id="demo-message" name="message" value={form.message} onChange={handleChange} rows="5" maxLength={1000} aria-invalid={Boolean(errors.message)} aria-describedby={errors.message ? "demo-message-error" : "demo-message-count"} className="form-field" />
        <div className="mt-1 flex justify-between gap-4 text-xs text-zinc-500">
          {errors.message ? <p id="demo-message-error" className="text-red-600">{errors.message}</p> : <span>Share any goals or questions for the walkthrough.</span>}
          <span id="demo-message-count" aria-live="polite">{form.message.length} / 1,000</span>
        </div>
      </div>

      {apiError && <p className="mt-4 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700" role="alert">{apiError} Your entries are still here; please try again.</p>}
      {success && <p className="mt-4 rounded-xl border border-emerald-200 bg-emerald-50 p-3 text-sm text-emerald-800" role="status">{success}</p>}

      <button type="submit" disabled={loading} aria-busy={loading} className="btn-primary mt-6 disabled:cursor-not-allowed disabled:opacity-70">
        {loading ? "Submitting..." : "Book a Demo"}
      </button>
    </form>
  );
}
