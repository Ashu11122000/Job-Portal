import { motion } from "framer-motion";
import {
  FiFileText,
  FiCheckCircle,
  FiMic,
  FiTrendingUp,
  FiArrowRight,
  FiZap,
  FiBarChart2,
} from "react-icons/fi";

export default function ResumeToolsPromo() {
  return (
    <section
      className="relative w-full py-36 overflow-hidden
                        bg-[radial-gradient(circle_at_top,var(--color-indigo-100),white,var(--color-purple-100))]"
    >
      {/* ================= AMBIENT AURORA ================= */}
      <motion.div
        animate={{ x: [0, 160, 0], y: [0, -120, 0] }}
        transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-72 -right-72 w-[780px] h-[780px]
                   bg-indigo-400/25 rounded-full blur-[240px]"
      />
      <motion.div
        animate={{ x: [0, -160, 0], y: [0, 120, 0] }}
        transition={{ duration: 34, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -bottom-72 -left-72 w-[780px] h-[780px]
                   bg-purple-400/25 rounded-full blur-[260px]"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-24 items-center">
        {/* ================= LEFT CONTENT ================= */}
        <motion.div
          initial={{ opacity: 0, x: -70 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
        >
          <span
            className="inline-flex items-center gap-2 mb-6 px-8 py-2
                           rounded-full text-sm font-semibold
                           bg-white/70 backdrop-blur-xl
                           text-indigo-700
                           shadow-[0_0_25px_rgba(99,102,241,0.35)]"
          >
            <FiZap />
            AI Career Acceleration
          </span>

          <h2
            className="text-6xl font-black tracking-tight
                         bg-gradient-to-r from-indigo-600 via-blue-600 to-purple-600
                         bg-clip-text text-transparent leading-tight"
          >
            Turn Your Resume Into
            <br /> a Hiring Asset
          </h2>

          <p className="text-slate-600 mt-8 text-xl max-w-xl leading-relaxed">
            Our AI-powered resume and interview tools help professionals get
            shortlisted faster by aligning profiles with recruiter expectations,
            ATS systems, and real hiring patterns.
          </p>

          {/* ================= VALUE POINTS ================= */}
          <div className="mt-10 space-y-5">
            <Feature text="ATS-optimized resume scoring & formatting" />
            <Feature text="Role-specific keyword intelligence" />
            <Feature text="Mock interviews with real-time feedback" />
            <Feature text="Career roadmap & skill gap analysis" />
          </div>

          {/* ================= CTA ================= */}
          <div className="mt-14 flex flex-wrap gap-6">
            <motion.a
              href="/resume-builder"
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.96 }}
              className="relative overflow-hidden
                         inline-flex items-center gap-2
                         bg-gradient-to-r from-indigo-600 to-purple-600
                         text-white px-14 py-4 rounded-full
                         font-bold text-lg
                         shadow-[0_22px_70px_rgba(99,102,241,0.6)]
                         transition-all"
            >
              Build Smart Resume <FiArrowRight />
            </motion.a>

            <motion.a
              href="/interview-prep"
              whileHover={{ scale: 1.05 }}
              className="inline-flex items-center gap-2
                         border border-indigo-400
                         text-indigo-700 px-14 py-4 rounded-full
                         font-bold text-lg
                         hover:bg-indigo-50 transition"
            >
              Interview Prep <FiMic />
            </motion.a>
          </div>
        </motion.div>

        {/* ================= RIGHT — PRODUCT CARDS ================= */}
        <motion.div
          initial={{ opacity: 0, x: 70 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
          className="relative space-y-12 perspective-[1600px]"
        >
          {/* ================= RESUME BUILDER CARD ================= */}
          <motion.div
            whileHover={{
              rotateX: 6,
              rotateY: -6,
              y: -14,
              scale: 1.05,
            }}
            transition={{ type: "spring", stiffness: 140, damping: 16 }}
            className="relative bg-white/85 backdrop-blur-2xl
                       border border-white/50 rounded-3xl
                       p-12 shadow-[0_35px_100px_rgba(0,0,0,0.25)]
                       transform-gpu"
          >
            <div
              className="absolute inset-0 rounded-3xl
                            bg-gradient-to-r from-indigo-500 to-purple-500
                            opacity-0 hover:opacity-10 blur-xl transition"
            />

            <div className="flex items-center gap-5 mb-6">
              <div
                className="w-14 h-14 rounded-2xl
                              bg-gradient-to-br from-indigo-500 to-purple-500
                              flex items-center justify-center shadow-xl"
              >
                <FiFileText className="text-white text-xl" />
              </div>
              <h3 className="text-2xl font-bold text-slate-800">
                Smart Resume Builder
              </h3>
            </div>

            <p className="text-slate-600 text-base leading-relaxed">
              AI-powered resume creation with automatic formatting, role-based
              optimization, and real-time ATS scoring.
            </p>

            <div
              className="mt-6 inline-flex items-center gap-2
                            px-4 py-1 rounded-full
                            bg-emerald-100 text-emerald-700
                            text-sm font-semibold"
            >
              <FiBarChart2 /> ATS Score Boost
            </div>
          </motion.div>

          {/* ================= INTERVIEW SUITE CARD ================= */}
          <motion.div
            whileHover={{
              rotateX: -6,
              rotateY: 6,
              y: -14,
              scale: 1.05,
            }}
            transition={{ type: "spring", stiffness: 140, damping: 16 }}
            className="relative bg-white/85 backdrop-blur-2xl
                       border border-white/50 rounded-3xl
                       p-12 shadow-[0_35px_100px_rgba(0,0,0,0.25)]
                       transform-gpu"
          >
            <div
              className="absolute inset-0 rounded-3xl
                            bg-gradient-to-r from-indigo-500 to-purple-500
                            opacity-0 hover:opacity-10 blur-xl transition"
            />

            <div className="flex items-center gap-5 mb-6">
              <div
                className="w-14 h-14 rounded-2xl
                              bg-gradient-to-br from-purple-500 to-indigo-500
                              flex items-center justify-center shadow-xl"
              >
                <FiTrendingUp className="text-white text-xl" />
              </div>
              <h3 className="text-2xl font-bold text-slate-800">
                Interview Readiness Suite
              </h3>
            </div>

            <p className="text-slate-600 text-base leading-relaxed">
              Practice interviews using real company questions with AI scoring,
              structured feedback, and improvement insights.
            </p>

            <div
              className="mt-6 inline-flex items-center gap-2
                            px-4 py-1 rounded-full
                            bg-indigo-100 text-indigo-700
                            text-sm font-semibold"
            >
              <FiMic /> Live Mock Sessions
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

/* ================= FEATURE ITEM ================= */
function Feature({ text }) {
  return (
    <div className="flex items-center gap-4 text-slate-800 text-lg">
      <span
        className="relative flex items-center justify-center
                       w-7 h-7 rounded-full
                       bg-emerald-100 text-emerald-600 shadow-sm"
      >
        <FiCheckCircle />
      </span>
      <span>{text}</span>
    </div>
  );
}
