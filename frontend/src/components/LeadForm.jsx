import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
const initial = {
  name: "",
  email: "",
  phone: "",
  company: "",
  source: "Website",
  status: "New",
  message: "",
};

const sources = ["Website", "Referral", "Ad", "Other"];
const status = ["New", "In Progress", "Converted", "Lost"];

export default function LeadForm({ onSaved, initialData = null }) {
  const [form, setForm] = useState(initialData || initial);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  // Ensure form updates if initialData changes for Edit modal
  useEffect(() => {
    setForm(initialData || initial);
  }, [initialData]);

  // Validation
  const validate = () => {
    const e = {};

    // Name- required and min 2 chars
    if (!form.name.trim()) {
      e.name = "Name is required";
    } else if (!/^[a-zA-Z\s]+$/.test(form.name.trim())) {
      e.name = "Name can only contain letters and spaces";
    } else if (form.name.trim().length < 2) {
      e.name = "Name must be at least 2 characters";
    }

    // Email- required and valid format
    if (!form.email.trim()) {
      e.email = "Email is required";
    } else {
      const regEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (!regEX.test(form.email)) e.email = "Invalid email address";
    }

    // Phone - valid if provided
    if (!form.phone.trim()) {
      e.phone = "Phone is required";
    } else {
      const phoneRegex = /^\d{10}$/;
      if (!phoneRegex.test(form.phone.trim())) {
        e.phone = "Phone number must be exactly 10 digits";
      }
    }

    // Company- limit length
    if (form.company && form.company.length > 100) {
      e.company = "Company name must be under 100 characters";
    }

    // Source- must be one of allowed values
    if (!sources.includes(form.source)) {
      e.source = "Invalid source selected";
    }

    // Message- max length
    if (form.message && form.message.length > 400) {
      e.message = "Message must be under 400 characters";
    }

    return e;
  };

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length) return;

    if (typeof onSaved !== "function") {
      toast.error("onSaved prop is missing!");
      return;
    }

    setLoading(true);
    try {
      await onSaved(form);
      if (!initialData) setForm(initial); // reset only for new form
    } catch (err) {
      toast.error(err?.response?.message || "Save failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      className="bg-white shadow-md rounded-lg p-6 border border-gray-200"
      onSubmit={handleSubmit}
      noValidate
    >
      <h2 className="text-xl font-semibold text-gray-800 mb-6">
        {initialData ? "Edit Lead" : "Add New Lead"}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Name <span className="text-red-500">*</span>
          </label>
          <input
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className={`w-full border rounded-lg text-sm px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 ${
              errors.name ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="John Doe"
          />
          {errors.name && (
            <p className="text-xs text-red-600 mt-1">{errors.name}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className={`w-full border rounded-lg text-sm px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 ${
              errors.email ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="example@email.com"
          />
          {errors.email && (
            <p className="text-xs text-red-600 mt-1">{errors.email}</p>
          )}
        </div>

        {/* Phone */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Phone <span className="text-red-500">*</span>
          </label>
          <input
            type="tel"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            className={`w-full border rounded-lg text-sm px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 ${
              errors.phone ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="9345678900"
          />
          {errors.phone && (
            <p className="text-xs text-red-600 mt-1">{errors.phone}</p>
          )}
        </div>

        {/* Company */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Company
          </label>
          <input
            value={form.company}
            onChange={(e) => setForm({ ...form, company: e.target.value })}
            className={`w-full border rounded-lg text-sm px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 ${
              errors.company ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Acme Corp"
          />
          {errors.company && (
            <p className="text-xs text-red-600 mt-1">{errors.company}</p>
          )}
        </div>

        {/* Source */}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Source
          </label>
          <select
            value={form.source}
            onChange={(e) => setForm({ ...form, source: e.target.value })}
            className={`w-full border rounded-lg text-sm px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 ${
              errors.source ? "border-red-500" : "border-gray-300"
            }`}
          >
            {sources.map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
          {errors.source && (
            <p className="text-xs text-red-600 mt-1">{errors.source}</p>
          )}
        </div>

        {/* Status */}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Status
          </label>
          <select
            value={form.status}
            onChange={(e) => setForm({ ...form, status: e.target.value })}
            className={`w-full border rounded-lg text-sm px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 ${
              errors.status ? "border-red-500" : "border-gray-300"
            }`}
          >
            {status.map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
          {errors.status && (
            <p className="text-xs text-red-600 mt-1">{errors.status}</p>
          )}
        </div>

        {/* Message */}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Message
          </label>
          <textarea
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            className={`w-full border rounded-lg text-sm px-3 py-2 h-28 resize-none focus:outline-none focus:ring-2 focus:ring-purple-500 ${
              errors.message ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Additional notes about the lead..."
          />
          {errors.message && (
            <p className="text-xs text-red-600 mt-1">{errors.message}</p>
          )}
        </div>
      </div>

      <div className="flex justify-end mt-6">
        <button
          type="submit"
          disabled={loading}
          className={`px-5 py-2 rounded-lg text-white font-medium transition ${
            loading
              ? "bg-purple-400 cursor-not-allowed"
              : "bg-purple-600 hover:bg-purple-700"
          }`}
        >
          {loading ? "Saving..." : "Save Lead"}
        </button>
      </div>
    </form>
  );
}
