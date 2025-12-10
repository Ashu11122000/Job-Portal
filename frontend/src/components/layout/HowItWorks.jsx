import { motion } from "framer-motion";
import {
  FiUserPlus,
  FiSearch,
  FiSend,
  FiCheckCircle,
  FiBriefcase,
  FiUsers,
  FiArrowRight,
} from "react-icons/fi";

export default function HowItWorks() {
  return (
    <section className="relative w-full py-40 overflow-hidden bg-linear-to-br from-slate-950 via-indigo-950 to-slate-900">
      {/* ✅ AMBIENT GLOW */}
      <motion.div
        animate={{ x: [0, 160, 0], y: [0, -120, 0] }}
        transition={{ duration: 28, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-80 -left-80 w-[850px] h-[850px] bg-indigo-500/25 rounded-full blur-[260px]"
      />
      <motion.div
        animate={{ x: [0, -160, 0], y: [0, 120, 0] }}
        transition={{ duration: 32, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -bottom-80 -right-80 w-[850px] h-[850px] bg-purple-500/25 rounded-full blur-[280px]"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* ✅ PREMIUM HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="text-center mb-28"
        >
          <span className="inline-flex items-center gap-2 mb-6 px-10 py-2 rounded-full text-sm font-semibold bg-white/10 backdrop-blur-xl text-indigo-300 border border-white/15 shadow-[0_0_30px_rgba(99,102,241,0.35)]">
            ⚙️ Simple 4-Step Intelligent System
          </span>

          <h2 className="text-5xl md:text-6xl font-black bg-linear-to-r from-indigo-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
            How Our Hiring Ecosystem Works
          </h2>

          <p className="text-slate-400 mt-8 text-xl max-w-3xl mx-auto leading-relaxed">
            A seamless, AI-assisted workflow designed to help professionals get
            hired faster and companies build elite teams with precision.
          </p>

          <div className="mt-12 flex justify-center">
            <div className="h-1.5 w-60 rounded-full bg-linear-to-r from-indigo-500 via-blue-500 to-purple-500 shadow-[0_0_30px_rgba(99,102,241,0.9)]" />
          </div>
        </motion.div>

        {/* ✅ DUAL FLOW GRID */}
        <div className="grid md:grid-cols-2 gap-16 perspective-[1400px]">
          {/* ✅ JOB SEEKER FLOW */}
          <motion.div
            initial={{ opacity: 0, x: -70 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9 }}
            whileHover={{ rotateY: 6 }}
            className="relative bg-white/10 backdrop-blur-2xl border border-white/15 rounded-3xl p-14 shadow-[0_40px_110px_rgba(0,0,0,0.45)]"
          >
            <h3 className="text-3xl font-black text-indigo-300 mb-12 flex items-center gap-3">
              <FiUserPlus /> For Job Seekers
            </h3>

            <Step
              color="indigo"
              icon={<FiUserPlus />}
              title="Create Smart Profile"
              desc="Build your AI-powered profile with resume parsing and skills detection."
            />
            <Step
              color="indigo"
              icon={<FiSearch />}
              title="Discover Matching Jobs"
              desc="Advanced filters and salary intelligence show you only relevant roles."
            />
            <Step
              color="indigo"
              icon={<FiSend />}
              title="Instant Application"
              desc="One-click apply with automated recruiter screening."
            />
            <Step
              color="indigo"
              icon={<FiCheckCircle />}
              title="Get Hired Faster"
              desc="Track interviews, offers & onboarding in one dashboard."
            />
          </motion.div>

          {/* ✅ EMPLOYER FLOW */}
          <motion.div
            initial={{ opacity: 0, x: 70 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9 }}
            whileHover={{ rotateY: -6 }}
            className="relative bg-white/10 backdrop-blur-2xl border border-white/15 rounded-3xl p-14 shadow-[0_40px_110px_rgba(0,0,0,0.45)]"
          >
            <h3 className="text-3xl font-black text-purple-300 mb-12 flex items-center gap-3">
              <FiBriefcase /> For Employers
            </h3>

            <Step
              color="purple"
              icon={<FiBriefcase />}
              title="Post High-Intent Jobs"
              desc="Create premium job posts with AI-optimized visibility."
            />
            <Step
              color="purple"
              icon={<FiUsers />}
              title="Shortlist Top Talent"
              desc="Smart ranking system highlights best-fit candidates instantly."
            />
            <Step
              color="purple"
              icon={<FiCheckCircle />}
              title="Hire With Confidence"
              desc="Verified profiles, background sync & interview scoring."
            />
            <Step
              color="purple"
              icon={<FiCheckCircle />}
              title="Scale Teams Rapidly"
              desc="Bulk hiring tools for startups & enterprise workforce expansion."
            />
          </motion.div>
        </div>

        {/* ✅ ULTRA CTA */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-28 text-center"
        >
          <a
            href="/register"
            className="relative inline-flex items-center gap-3 bg-linear-to-r from-indigo-600 to-purple-600 text-white px-20 py-6 rounded-full font-black shadow-[0_25px_90px_rgba(99,102,241,0.7)] hover:scale-110 transition-all"
          >
            Get Started Today <FiArrowRight />
          </a>
        </motion.div>
      </div>
    </section>
  );
}

/* ✅ PREMIUM STEP COMPONENT */
function Step({ icon, title, desc, color }) {
  return (
    <div className="relative flex items-start gap-6 mb-10">
      {/* ✅ TIMELINE */}
      <div
        className={`absolute left-7 top-16 w-0.5 h-full ${
          color === "indigo"
            ? "bg-linear-to-b from-indigo-500 to-indigo-300"
            : "bg-linear-to-b from-purple-500 to-purple-300"
        }`}
      />

      {/* ✅ ICON */}
      <div
        className={`relative w-16 h-16 rounded-full flex items-center justify-center shadow-xl ${
          color === "indigo"
            ? "bg-linear-to-br from-indigo-500 to-indigo-700"
            : "bg-linear-to-br from-purple-500 to-purple-700"
        }`}
      >
        <div className="w-11 h-11 rounded-full bg-white flex items-center justify-center text-indigo-600 text-xl">
          {icon}
        </div>
      </div>

      {/* ✅ TEXT */}
      <div>
        <h4 className="text-lg font-bold text-white">{title}</h4>
        <p className="text-slate-400 text-sm leading-relaxed">{desc}</p>
      </div>
    </div>
  );
}
