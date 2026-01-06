import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FiMapPin, FiDollarSign, FiSend, FiUsers, FiBriefcase } from "react-icons/fi";
import { createJob } from "../../api/jobApi"; // existing kept
import axiosInstance from "../../api/axiosInstance"; // existing kept

export default function PostJob() {
  const [form, setForm] = useState({
    title: "",
    company: "",
    company_id: "",
    location: "",
    salary: "",
    description: "",
  });

  const [companies, setCompanies] = useState([]); // dropdown list
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // Load companies for dropdown
  useEffect(() => {
    axiosInstance
      .get("/api/company") // FIXED ✔ correct API path
      .then((res) => {
        setCompanies(res.data?.data || []);
      })
      .catch((err) => {
        console.error("Company API Error:", err);
        setError("Unable to load company list");
      })
      .finally(() => setLoading(false));
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleCompanySelect = (e) => {
    const companyId = e.target.value;
    const selected = companies.find((c) => c.id === Number(companyId));

    if (selected) {
      setForm((prev) => ({
        ...prev,
        company: selected.name,
        company_id: selected.id,
        location: selected.location,
      }));
    } else {
      setForm((prev) => ({
        ...prev,
        company_id: companyId,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setError("");

    try {
      const res = await axiosInstance.post("/api/jobs", form); // FIXED ✔ send job correctly
      if (res.data?.success) {
        setMessage("Job posted successfully!");
        setForm({
          title: "",
          company: "",
          company_id: "",
          location: "",
          salary: "",
          description: "",
        });
      }
    } catch (err) {
      console.error("Job API Error:", err);
      setError(err.response?.data?.message || "Failed to post job. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-indigo-50 to-purple-100 px-6 py-20">
      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ type: "spring", stiffness: 120 }}
        className="w-full max-w-3xl bg-white/70 backdrop-blur-2xl border border-black/10 rounded-[28px] p-10 shadow-xl text-black"
      >
        <h2 className="text-4xl font-black text-center text-black mb-8">
          <FiBriefcase className="inline-block mr-2" /> Post a Job
        </h2>

        {message && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center text-sm font-bold text-green-700 bg-green-100 border border-green-300 px-4 py-2 rounded-xl mb-4"
          >
            {message}
          </motion.div>
        )}

        {error && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center text-sm font-bold text-red-700 bg-red-100 border border-red-300 px-4 py-2 rounded-xl mb-4"
          >
            {error}
          </motion.div>
        )}

        {/* Company Dropdown */}
        <div className="mb-5">
          <label className="text-sm font-bold flex items-center gap-2 mb-2">
            <FiUsers /> Select Company
          </label>
          <select
            name="company_id"
            value={form.company_id}
            onChange={handleCompanySelect}
            required
            className="w-full bg-white border border-black/20 rounded-2xl py-3 px-4 text-black outline-none shadow-md"
          >
            <option value="">-- Choose a company --</option>
            {companies.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name} ({c.location})
              </option>
            ))}
          </select>
        </div>

        {/* Inputs */}
        <div className="grid md:grid-cols-2 gap-5">
          <div className="relative">
            <FiBriefcase className="absolute top-3 left-4 text-black/70" />
            <input
              type="text"
              name="title"
              placeholder="Job Title"
              value={form.title}
              onChange={handleChange}
              required
              className="w-full bg-white border border-black/20 rounded-2xl py-3 pl-12 pr-4 text-black outline-none shadow-md"
            />
          </div>

          <div className="relative">
            <FiUsers className="absolute top-3 left-4 text-black/70" />
            <input
              type="text"
              name="company"
              placeholder="Company Name"
              value={form.company}
              readOnly
              className="w-full bg-white border border-black/20 rounded-2xl py-3 pl-12 pr-4 text-black outline-none opacity-80"
            />
          </div>

          <div className="relative">
            <FiMapPin className="absolute top-3 left-4 text-black/70" />
            <input
              type="text"
              name="location"
              placeholder="Location"
              value={form.location}
              readOnly
              className="w-full bg-white border border-black/20 rounded-2xl py-3 pl-12 pr-4 text-black outline-none opacity-80"
            />
          </div>

          <div className="relative">
            <FiDollarSign className="absolute top-3 left-4 text-black/70" />
            <input
              type="number"
              name="salary"
              placeholder="Salary"
              value={form.salary}
              onChange={handleChange}
              required
              className="w-full bg-white border border-black/20 rounded-2xl py-3 pl-12 pr-4 text-black outline-none shadow-md"
            />
          </div>
        </div>

        {/* Description */}
        <div className="mt-5">
          <textarea
            name="description"
            placeholder="Job Description"
            value={form.description}
            onChange={handleChange}
            required
            className="w-full min-h-[160px] bg-white border border-black/20 rounded-2xl p-4 text-black outline-none shadow-md"
          />
        </div>

        {/* Submit Button */}
        <div className="mt-8 text-center">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.96 }}
            disabled={loading}
            className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-10 py-3 rounded-full font-bold shadow-lg inline-flex items-center gap-2"
          >
            {loading ? "Posting..." : "Submit Job"} <FiSend />
          </motion.button>
        </div>
      </motion.form>
    </section>
  );
}
