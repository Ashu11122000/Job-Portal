import { motion } from "framer-motion";
import {
  FiFileText,
  FiCheckCircle,
  FiMic,
  FiTrendingUp,
  FiArrowRight,
  FiZap,
} from "react-icons/fi";

export default function ResumeToolsPromo() {
  return (
    <section className="relative w-full py-36 overflow-hidden bg-[radial-gradient(circle_at_top,var(--color-indigo-100),white,var(--color-purple-100))]">
      {/* ✅ Aurora Motion Background */}
      <motion.div
        animate={{ x: [0, 140, 0], y: [0, -90, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-64 -right-64 w-[720px] h-[720px] bg-indigo-400/25 rounded-full blur-[200px]"
      />
      <motion.div
        animate={{ x: [0, -140, 0], y: [0, 90, 0] }}
        transition={{ duration: 26, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -bottom-64 -left-64 w-[720px] h-[720px] bg-purple-400/25 rounded-full blur-[220px]"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-20 items-center">
        {/* ✅ LEFT CONTENT — ULTRA HIERARCHY */}
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <span className="inline-flex items-center gap-2 mb-6 px-8 py-2 rounded-full text-sm font-semibold bg-white/70 backdrop-blur-xl text-indigo-700 shadow-[0_0_25px_rgba(99,102,241,0.35)]">
            <FiZap /> Career Acceleration Tools
          </span>

          <h2 className="text-6xl font-black bg-linear-to-r from-indigo-600 via-blue-600 to-purple-600 bg-clip-text text-transparent leading-tight tracking-tight">
            Turn Your Profile Into a Hiring Magnet
          </h2>

          <p className="text-slate-600 mt-8 text-xl max-w-xl leading-relaxed">
            Our AI-powered resume builder, mock interview system, and guided
            career roadmap help you get shortlisted faster than 92% of
            applicants.
          </p>

          {/* ✅ FEATURE LIST WITH PULSE */}
          <div className="mt-10 space-y-5">
            <Feature text="ATS-Optimized Resume Templates" />
            <Feature text="Role-Based Keyword Matching" />
            <Feature text="Live Mock Interviews with Feedback" />
            <Feature text="Career Growth Roadmap & Skill Tracker" />
          </div>

          {/* ✅ GRADIENT SHIMMER CTA */}
          <div className="mt-12 flex flex-wrap gap-6">
            <a
              href="/resume-builder"
              className="relative overflow-hidden inline-flex items-center gap-2 bg-linear-to-r from-indigo-600 to-purple-600 text-white px-12 py-4 rounded-full font-bold shadow-[0_20px_60px_rgba(99,102,241,0.6)] hover:scale-105 transition-all group"
            >
              <span className="relative z-10 flex items-center gap-2">
                Build Resume <FiArrowRight />
              </span>
              <span className="absolute inset-0 bg-linear-to-r from-purple-500 to-indigo-500 opacity-0 group-hover:opacity-30 transition" />
            </a>

            <a
              href="/interview-prep"
              className="inline-flex items-center gap-2 border border-indigo-400 text-indigo-700 px-12 py-4 rounded-full font-bold hover:bg-indigo-50 hover:scale-105 transition"
            >
              Interview Prep <FiMic />
            </a>
          </div>
        </motion.div>

        {/* ✅ RIGHT — FLOATING 3D TOOL CARDS */}
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative space-y-10 perspective-distant"
        >
          {/* ✅ RESUME BUILDER CARD */}
          <motion.div
            whileHover={{ rotateX: 8, rotateY: -8, y: -12, scale: 1.05 }}
            className="relative bg-white/85 backdrop-blur-2xl border border-white/50 rounded-3xl p-10 shadow-[0_30px_80px_rgba(0,0,0,0.25)] transition-all transform-gpu group"
          >
            <div className="absolute inset-0 rounded-3xl bg-linear-to-r from-indigo-500 to-purple-500 opacity-0 group-hover:opacity-10 blur-xl transition" />

            <div className="flex items-center gap-4 mb-5">
              <div className="w-14 h-14 rounded-full bg-linear-to-br from-indigo-500 to-purple-500 flex items-center justify-center shadow-xl">
                <FiFileText className="text-white text-xl" />
              </div>
              <h3 className="text-2xl font-bold text-slate-800">
                Smart Resume Builder
              </h3>
            </div>

            <p className="text-slate-600 text-base leading-relaxed">
              Create stunning resumes in minutes with auto-formatting,
              job-specific AI keyword optimization, and instant previews.
            </p>
          </motion.div>

          {/* ✅ INTERVIEW PREP CARD */}
          <motion.div
            whileHover={{ rotateX: -8, rotateY: 8, y: -12, scale: 1.05 }}
            className="relative bg-white/85 backdrop-blur-2xl border border-white/50 rounded-3xl p-10 shadow-[0_30px_80px_rgba(0,0,0,0.25)] transition-all transform-gpu group"
          >
            <div className="absolute inset-0 rounded-3xl bg-linear-to-r from-indigo-500 to-purple-500 opacity-0 group-hover:opacity-10 blur-xl transition" />

            <div className="flex items-center gap-4 mb-5">
              <div className="w-14 h-14 rounded-full bg-linear-to-br from-purple-500 to-indigo-500 flex items-center justify-center shadow-xl">
                <FiTrendingUp className="text-white text-xl" />
              </div>
              <h3 className="text-2xl font-bold text-slate-800">
                Interview Readiness Suite
              </h3>
            </div>

            <p className="text-slate-600 text-base leading-relaxed">
              Practice technical & behavioral interviews with real company
              questions, performance scoring, and guided improvement paths.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

/* ✅ ULTRA FEATURE ITEM */
function Feature({ text }) {
  return (
    <div className="flex items-center gap-4 text-slate-800 text-lg">
      <span className="relative flex items-center justify-center w-7 h-7 rounded-full bg-emerald-100 text-emerald-600 shadow-sm">
        <FiCheckCircle className="animate-pulse" />
      </span>
      <span>{text}</span>
    </div>
  );
}
