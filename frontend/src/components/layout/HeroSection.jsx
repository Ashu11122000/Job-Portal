import { motion } from "framer-motion";
import { FiSearch, FiBriefcase, FiTrendingUp, FiUsers } from "react-icons/fi";

export default function HeroSection() {
  return (
    <section className="relative w-full min-h-screen overflow-hidden bg-linear-to-br from-slate-950 via-slate-900 to-indigo-950 pt-40">
      {/* ✅ PREMIUM AURORA GLOW */}
      <motion.div
        animate={{ x: [0, 80, 0], y: [0, -60, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-40 -left-40 w-[520px] h-[520px] bg-indigo-500/25 rounded-full blur-[140px]"
      />
      <motion.div
        animate={{ x: [0, -80, 0], y: [0, 60, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -bottom-60 -right-60 w-[580px] h-[580px] bg-purple-500/25 rounded-full blur-[160px]"
      />

      {/* ✅ MAIN GRID */}
      <div className="relative z-20 max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
        {/* ✅ LEFT CONTENT */}
        <div>
          <motion.span
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block mb-6 px-6 py-2 rounded-full text-sm font-semibold bg-indigo-500/10 text-indigo-300 border border-indigo-500/30 shadow"
          >
            🚀 India’s Fastest Growing Career Platform
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: -36 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-6xl md:text-7xl font-black text-white leading-tight"
          >
            Build Your{" "}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-indigo-400 to-purple-400">
              Dream Career
            </span>{" "}
            With Confidence
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-8 text-slate-300 text-xl md:text-2xl max-w-xl leading-relaxed"
          >
            Discover verified jobs, premium companies, salary insights and smart
            career tools trusted by over <b>10 lakh+</b> professionals.
          </motion.p>

          {/* ✅ GLASS SEARCH BAR */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-12 max-w-xl backdrop-blur-2xl bg-white/10 border border-white/20 shadow-2xl rounded-2xl flex items-center p-3 gap-3"
          >
            <FiSearch className="text-indigo-400 text-xl ml-3" />
            <input
              type="text"
              placeholder="Job title, skill, or company..."
              className="flex-1 px-3 py-3 bg-transparent text-white placeholder-slate-400 outline-none text-lg"
            />
            <motion.button
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.96 }}
              className="bg-linear-to-r from-indigo-600 to-purple-600 text-white px-8 py-3 rounded-xl font-semibold shadow-xl"
            >
              Search
            </motion.button>
          </motion.div>

          {/* ✅ CTA BUTTONS */}
          <div className="mt-10 flex flex-wrap gap-6">
            <a
              href="/jobs"
              className="bg-linear-to-r from-indigo-600 to-purple-600 text-white px-12 py-4 rounded-full font-semibold shadow-[0_20px_60px_rgba(99,102,241,0.6)] hover:scale-105 transition"
            >
              Find Jobs
            </a>
            <a
              href="/post-job"
              className="border border-indigo-400 text-indigo-300 px-12 py-4 rounded-full font-semibold hover:bg-indigo-400/10 transition"
            >
              Post a Job
            </a>
          </div>

          {/* ✅ TRUST STATS */}
          <div className="mt-16 grid grid-cols-3 gap-10 max-w-lg">
            <Stat icon={<FiBriefcase />} value="25K+" label="Live Jobs" />
            <Stat icon={<FiUsers />} value="12K+" label="Recruiters" />
            <Stat icon={<FiTrendingUp />} value="98%" label="Success Rate" />
          </div>
        </div>

        {/* ✅ RIGHT SIDE — REALISTIC DASHBOARD VISUAL */}
        <div className="relative h-[520px] hidden md:block">
          {/* ✅ LIVE STATS CARD */}
          <motion.div
            animate={{ y: [0, -20, 0] }}
            transition={{ duration: 6, repeat: Infinity }}
            className="absolute top-0 right-0 w-[360px] p-6 rounded-3xl bg-white/10 backdrop-blur-2xl shadow-2xl border border-white/20"
          >
            <h4 className="font-bold text-white mb-2">📊 Live Market Pulse</h4>
            <p className="text-slate-300 text-sm">
              React • Java • Cloud • DevOps trending this week
            </p>
          </motion.div>

          {/* ✅ FEATURED JOB */}
          <motion.div
            animate={{ y: [0, 26, 0] }}
            transition={{ duration: 7, repeat: Infinity }}
            className="absolute bottom-0 left-10 w-[360px] p-6 rounded-3xl bg-white/10 backdrop-blur-2xl shadow-2xl border border-white/20"
          >
            <h4 className="font-bold text-white mb-2">💼 Featured Job</h4>
            <p className="text-slate-300">
              Senior Full Stack Developer – Remote
            </p>
            <p className="mt-2 text-indigo-400 font-bold text-lg">
              ₹18 – ₹28 LPA
            </p>
          </motion.div>

          {/* ✅ TOP COMPANY */}
          <motion.div
            animate={{ y: [0, -18, 0] }}
            transition={{ duration: 8, repeat: Infinity }}
            className="absolute top-40 left-0 w-[340px] p-6 rounded-3xl bg-white/10 backdrop-blur-2xl shadow-2xl border border-white/20"
          >
            <h4 className="font-bold text-white mb-2">🏢 Top Hiring Company</h4>
            <p className="text-slate-300">120+ Engineers Hiring</p>
            <p className="mt-2 text-purple-400 font-semibold">
              Product • AI • Cloud Teams
            </p>
          </motion.div>
        </div>
      </div>

      {/* ✅ BOTTOM FADE */}
      <div className="absolute bottom-0 left-0 w-full h-40 bg-linear-to-t from-slate-950 to-transparent" />
    </section>
  );
}

/* ✅ MINI COMPONENT */
function Stat({ icon, value, label }) {
  return (
    <div className="text-center">
      <div className="text-3xl text-indigo-400 mb-2 flex justify-center">
        {icon}
      </div>
      <h3 className="text-2xl font-bold text-white">{value}</h3>
      <p className="text-slate-400 text-sm mt-1">{label}</p>
    </div>
  );
}
