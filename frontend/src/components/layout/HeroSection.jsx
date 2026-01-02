// framer-motion is a React animation library
import { motion } from "framer-motion";
import {
  FiSearch,
  FiBriefcase,
  FiTrendingUp,
  FiUsers,
  FiCheckCircle,
  FiStar,
} from "react-icons/fi";

export default function HeroSection() {
  return (
    <section className="relative w-full min-h-screen overflow-hidden bg-linear-to-br from-slate-950 via-slate-900 to-indigo-950 pt-40">
      {/* ================= AURORA BACKGROUND ================= */}
      <motion.div
        animate={{ x: [0, 120, 0], y: [0, -80, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-indigo-500/30 rounded-full blur-[160px]"
      />
      <motion.div
        animate={{ x: [0, -140, 0], y: [0, 100, 0] }}
        transition={{ duration: 26, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -bottom-72 -right-72 w-[700px] h-[700px] bg-purple-500/30 rounded-full blur-[180px]"
      />

      {/* ================= CONTENT ================= */}
      <div className="relative z-20 max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
        {/* ================= LEFT ================= */}
        <div>
          {/* BADGE */}
          <motion.span
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 mb-6 px-6 py-2 rounded-full text-sm font-semibold
                       bg-indigo-500/10 text-indigo-300 border border-indigo-500/30 shadow"
          >
            <FiStar className="text-indigo-400" />
            Trusted by 1M+ Professionals Across India
          </motion.span>

          {/* HEADING */}
          <motion.h1
            initial={{ opacity: 0, y: -40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-6xl md:text-7xl font-black text-white leading-tight"
          >
            Shape Your{" "}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-indigo-400 to-purple-400">
              Future Career
            </span>
            <br /> With Smarter Opportunities
          </motion.h1>

          {/* SUBTEXT */}
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-8 text-slate-300 text-xl md:text-2xl max-w-xl leading-relaxed"
          >
            Explore verified jobs, AI-driven recommendations, salary insights,
            and career tools used by top professionals and hiring companies.
          </motion.p>

          {/* FEATURES */}
          <div className="mt-8 grid grid-cols-2 gap-4 max-w-xl">
            <Feature text="Verified & Trusted Jobs" />
            <Feature text="AI Job Matching" />
            <Feature text="Real Salary Insights" />
            <Feature text="Career Growth Tools" />
          </div>

          {/* SEARCH */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-12 max-w-xl backdrop-blur-2xl bg-white/10 border border-white/20
                       shadow-2xl rounded-2xl flex items-center p-3 gap-3"
          >
            <FiSearch className="text-indigo-400 text-xl ml-3" />
            <input
              type="text"
              placeholder="Search jobs, skills, companies..."
              className="flex-1 px-3 py-3 bg-transparent text-white placeholder-slate-400
                         outline-none text-lg"
            />
            <motion.button
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.96 }}
              className="bg-linear-to-r from-indigo-600 to-purple-600
                         text-white px-8 py-3 rounded-xl font-semibold shadow-xl"
            >
              Search
            </motion.button>
          </motion.div>

          {/* CTA */}
          <div className="mt-10 flex flex-wrap gap-6">
            <a
              href="/jobs"
              className="bg-linear-to-r from-indigo-600 to-purple-600
                         text-white px-12 py-4 rounded-full font-semibold
                         shadow-[0_20px_60px_rgba(99,102,241,0.6)]
                         hover:scale-105 transition"
            >
              Explore Jobs
            </a>
            <a
              href="/post-job"
              className="border border-indigo-400 text-indigo-300
                         px-12 py-4 rounded-full font-semibold
                         hover:bg-indigo-400/10 transition"
            >
              Hire Talent
            </a>
          </div>

          {/* STATS */}
          <div className="mt-16 grid grid-cols-3 gap-10 max-w-lg">
            <Stat icon={<FiBriefcase />} value="30K+" label="Live Jobs" />
            <Stat icon={<FiUsers />} value="15K+" label="Recruiters" />
            <Stat icon={<FiTrendingUp />} value="97%" label="Placement Rate" />
          </div>
        </div>

        {/* ================= RIGHT ================= */}
        <div className="relative h-[560px] hidden md:block">
          <FloatingCard
            title="📈 Live Hiring Trends"
            desc="Java • React • Cloud • DevOps dominating this week"
            className="top-0 right-0"
            duration={6}
          />
          <FloatingCard
            title="💼 Featured Opportunity"
            desc="Senior Full Stack Engineer – Remote"
            highlight="₹18 – ₹28 LPA"
            className="bottom-0 left-10"
            duration={7}
          />
          <FloatingCard
            title="🏢 Top Hiring Company"
            desc="Hiring 150+ Engineers Globally"
            highlight="Product • AI • Cloud"
            className="top-40 left-0"
            duration={8}
          />
        </div>
      </div>

      {/* BOTTOM FADE */}
      <div className="absolute bottom-0 left-0 w-full h-40 bg-linear-to-t from-slate-950 to-transparent" />
    </section>
  );
}

/* ================= MINI COMPONENTS ================= */

function Feature({ text }) {
  return (
    <div className="flex items-center gap-3 text-slate-300">
      <FiCheckCircle className="text-indigo-400" />
      <span>{text}</span>
    </div>
  );
}

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

function FloatingCard({ title, desc, highlight, className, duration }) {
  return (
    <motion.div
      animate={{ y: [0, -24, 0] }}
      transition={{ duration, repeat: Infinity }}
      className={`absolute ${className} w-[360px] p-6 rounded-3xl
                  bg-white/10 backdrop-blur-2xl shadow-2xl
                  border border-white/20`}
    >
      <h4 className="font-bold text-white mb-2">{title}</h4>
      <p className="text-slate-300">{desc}</p>
      {highlight && (
        <p className="mt-3 text-indigo-400 font-semibold">{highlight}</p>
      )}
    </motion.div>
  );
}
