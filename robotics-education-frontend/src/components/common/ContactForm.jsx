import { useState } from "react";
import { submitContact } from "../../api/contactApi";

const initialState = {
  name: "",
  email: "",
  phone: "",
  schoolName: "",
  message: "",
};

export default function ContactForm() {
  const [form, setForm] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [apiError, setApiError] = useState("");

  const validate = () => {
    const nextErrors = {};

    if (!form.name.trim()) nextErrors.name = "Name is required.";
    else if (form.name.length > 120) nextErrors.name = "Name must be 120 characters or fewer.";
    if (!form.email.trim()) nextErrors.email = "Email is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) nextErrors.email = "Enter a valid email.";
    else if (form.email.length > 160) nextErrors.email = "Email must be 160 characters or fewer.";
    if (form.phone.length > 30) nextErrors.phone = "Phone number must be 30 characters or fewer.";
    if (form.schoolName.length > 160) nextErrors.schoolName = "School name must be 160 characters or fewer.";
    if (!form.message.trim()) nextErrors.message = "Message is required.";
    else if (form.message.length > 1500) nextErrors.message = "Message must be 1,500 characters or fewer.";

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
      await submitContact(form);
      setSuccess("Your message has been sent. We’ll be in touch using the contact details you provided.");
      setForm(initialState);
    } catch (error) {
      console.error("Contact submit failed:", error);
      setApiError(error?.response?.data?.message || "Unable to send your message right now.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} noValidate className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm md:p-8">
      <div className="grid gap-5 md:grid-cols-2">
        <div>
          <label htmlFor="contact-name" className="mb-2 block text-sm font-medium text-zinc-700">Name <span aria-hidden="true">*</span></label>
          <input id="contact-name" name="name" autoComplete="name" maxLength={120} required aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? "contact-name-error" : undefined} value={form.name} onChange={handleChange} className="form-field" />
          {errors.name && <p id="contact-name-error" className="mt-2 text-sm text-red-600">{errors.name}</p>}
        </div>

        <div>
          <label htmlFor="contact-email" className="mb-2 block text-sm font-medium text-zinc-700">Email <span aria-hidden="true">*</span></label>
          <input id="contact-email" type="email" name="email" autoComplete="email" maxLength={160} required aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? "contact-email-error" : undefined} value={form.email} onChange={handleChange} className="form-field" />
          {errors.email && <p id="contact-email-error" className="mt-2 text-sm text-red-600">{errors.email}</p>}
        </div>

        <div>
          <label htmlFor="contact-phone" className="mb-2 block text-sm font-medium text-zinc-700">Phone</label>
          <input id="contact-phone" type="tel" name="phone" autoComplete="tel" maxLength={30} aria-invalid={Boolean(errors.phone)} aria-describedby={errors.phone ? "contact-phone-error" : undefined} value={form.phone} onChange={handleChange} className="form-field" />
          {errors.phone && <p id="contact-phone-error" className="mt-2 text-sm text-red-600">{errors.phone}</p>}
        </div>

        <div>
          <label htmlFor="contact-school" className="mb-2 block text-sm font-medium text-zinc-700">School / Organization</label>
          <input id="contact-school" name="schoolName" autoComplete="organization" maxLength={160} aria-invalid={Boolean(errors.schoolName)} aria-describedby={errors.schoolName ? "contact-school-error" : undefined} value={form.schoolName} onChange={handleChange} className="form-field" />
          {errors.schoolName && <p id="contact-school-error" className="mt-2 text-sm text-red-600">{errors.schoolName}</p>}
        </div>
      </div>

      <div className="mt-5">
        <label htmlFor="contact-message" className="mb-2 block text-sm font-medium text-zinc-700">Message <span aria-hidden="true">*</span></label>
        <textarea id="contact-message" name="message" value={form.message} onChange={handleChange} rows="5" maxLength={1500} required aria-invalid={Boolean(errors.message)} aria-describedby={errors.message ? "contact-message-error" : "contact-message-count"} className="form-field" />
        <div className="mt-1 flex justify-between gap-4 text-xs text-zinc-500">
          {errors.message ? <p id="contact-message-error" className="text-red-600">{errors.message}</p> : <span>Tell us how we can help.</span>}
          <span id="contact-message-count" aria-live="polite">{form.message.length} / 1,500</span>
        </div>
      </div>

      {apiError && <p className="mt-4 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700" role="alert">{apiError} Your entries are still here; please try again.</p>}
      {success && <p className="mt-4 rounded-xl border border-emerald-200 bg-emerald-50 p-3 text-sm text-emerald-800" role="status">{success}</p>}

      <button type="submit" disabled={loading} aria-busy={loading} className="btn-primary mt-6 disabled:cursor-not-allowed disabled:opacity-70">
        {loading ? "Sending..." : "Send Message"}
      </button>
    </form>
  );
}
