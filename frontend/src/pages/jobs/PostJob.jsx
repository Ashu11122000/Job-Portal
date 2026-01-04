import { useState } from "react";
import { motion } from "framer-motion";
import { FiMapPin, FiDollarSign, FiBriefcase, FiSend, FiUsers } from "react-icons/fi";
import { createJob } from "../../api/jobApi";

export default function PostJob() {
  const [form, setForm] = useState({
    title: "",
    company: "",
    location: "",
    salary: "",
    description: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await createJob(form);
      if (res.data?.success) {
        setMessage("Job posted successfully!");
        setForm({ title: "", company: "", location: "", salary: "", description: "" });
      }
    } catch (err) {
      console.error(err);
      setMessage("Failed to post job. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-linear-to-br from-slate-950 via-indigo-950 to-purple-950 px-6 py-24 overflow-hidden">
      
      {/* Premium Background Glow */}
      <motion.div
        animate={{ x: [0, 120, 0], y: [0, -100, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-40 -left-40 w-[650px] h-[650px] bg-indigo-500/25 rounded-full blur-[180px]"
      />

      <motion.div
        animate={{ x: [0, -140, 0], y: [0, 120, 0] }}
        transition={{ duration: 26, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -bottom-60 -right-60 w-[750px] h-[750px] bg-purple-500/30 rounded-full blur-[190px]"
      />

      {/* Form Card */}
      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 60, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.7, type: "spring", stiffness: 120 }}
        className="relative z-10 w-full max-w-3xl bg-white/15 backdrop-blur-2xl border border-white/30 rounded-[32px] p-14 shadow-[0_40px_140px_rgba(99,102,241,0.35)]"
      >

        {/* Header */}
        <h2 className="text-5xl font-black text-center text-black mb-10 tracking-tight drop-shadow-lg">
          Post a Job
        </h2>

        {/* Success/Error Message */}
        {message && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-7 text-center text-sm font-semibold px-6 py-3 rounded-2xl border border-emerald-400/40 bg-emerald-500/10 text-emerald-300 shadow-md"
          >
            {message}
          </motion.div>
        )}

        {/* Input Grid */}
        <div className="grid md:grid-cols-2 gap-7">

          {/* TITLE */}
          <div className="relative">
            <FiBriefcase className="absolute top-4 left-5 text-black/70 text-xl" />
            <input
              type="text"
              name="title"
              placeholder="Job Title"
              value={form.title}
              onChange={handleChange}
              required
              className="w-full bg-white/10 border border-white/30 text-black placeholder-black/50 rounded-2xl py-4 pl-14 pr-5 outline-none focus:ring-2 focus:ring-indigo-500 transition"
            />
          </div>

          {/* COMPANY */}
          <div className="relative">
            <FiUsers className="absolute top-4 left-5 text-black/70 text-xl" />
            <input
              type="text"
              name="company"
              placeholder="Company Name"
              value={form.company}
              onChange={handleChange}
              required
              className="w-full bg-white/10 border border-white/30 text-black placeholder-black/50 rounded-2xl py-4 pl-14 pr-5 outline-none focus:ring-2 focus:ring-indigo-500 transition"
            />
          </div>

          {/* LOCATION */}
          <div className="relative">
            <FiMapPin className="absolute top-4 left-5 text-black/70 text-xl" />
            <input
              type="text"
              name="location"
              placeholder="Location (Remote / City)"
              value={form.location}
              onChange={handleChange}
              required
              className="w-full bg-white/10 border border-white/30 text-black placeholder-black/50 rounded-2xl py-4 pl-14 pr-5 outline-none focus:ring-2 focus:ring-indigo-500 transition"
            />
          </div>

          {/* SALARY */}
          <div className="relative">
            <FiDollarSign className="absolute top-4 left-5 text-black/70 text-xl" />
            <input
              type="text"
              name="salary"
              placeholder="Salary Range (e.g. 6,00,000 - 15,00,000)"
              value={form.salary}
              onChange={handleChange}
              required
              className="w-full bg-white/10 border border-white/30 text-black placeholder-black/50 rounded-2xl py-4 pl-14 pr-5 outline-none focus:ring-2 focus:ring-indigo-500 transition"
            />
          </div>

        </div>

        {/* DESCRIPTION */}
        <div className="mt-8">
          <textarea
            name="description"
            placeholder="Job Description"
            value={form.description}
            onChange={handleChange}
            required
            className="w-full min-h-[200px] bg-white/10 border border-white/30 text-black placeholder-black/50 rounded-2xl p-6 outline-none focus:ring-2 focus:ring-indigo-500 transition"
          />
        </div>

        {/* SUBMIT BUTTON */}
        <div className="mt-12 text-center">
          <motion.button
            whileHover={{ scale: 1.07 }}
            whileTap={{ scale: 0.95 }}
            disabled={loading}
            className="bg-gradient-to-r from-indigo-700 to-purple-700 text-white px-16 py-4 rounded-full font-bold text-xl shadow-xl hover:shadow-2xl transition-all inline-flex items-center gap-3 justify-center"
          >
            {loading ? "Posting..." : "Submit Job"} <FiSend />
          </motion.button>
        </div>

      </motion.form>
    </section>
  );
}
