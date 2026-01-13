import { motion } from "framer-motion";
import {
  FiFileText,
  FiTarget,
  FiTrendingUp,
  FiEdit3,
  FiCheckCircle,
  FiLayers,
  FiUserCheck,
} from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import Footer from "../components/layout/Footer";

/* ✅ TOOLS WITH WORKING ROUTES */
const tools = [
  {
    title: "AI Resume Builder",
    desc: "Create ATS-optimized resumes with real-time feedback, keyword scoring, and recruiter-ready formatting.",
    icon: <FiFileText />,
    path: "/tools/resume-builder",
  },
  {
    title: "Career Roadmap",
    desc: "Get a personalized learning roadmap based on your skills, experience, and target job roles.",
    icon: <FiTarget />,
    path: "/tools/career-roadmap",
  },
  {
    title: "Salary Estimator",
    desc: "Access real market salary ranges using live hiring trends and company data.",
    icon: <FiTrendingUp />,
    path: "/tools/salary-estimator",
  },
  {
    title: "Cover Letter Generator",
    desc: "Generate tailored cover letters optimized for HR screening within seconds.",
    icon: <FiEdit3 />,
    path: "/tools/cover-letter",
  },
  {
    title: "Skill Certification Tracker",
    desc: "Upload, track, validate, and showcase your certifications with global visibility.",
    icon: <FiCheckCircle />,
    path: "/tools/certification-tracker",
  },
];

export default function CareerTools() {
  const navigate = useNavigate();

  return (
    <div className="w-full bg-linear-to-br from-indigo-50 via-white to-purple-50 min-h-screen pt-32 overflow-hidden">
      {/* ================= PREMIUM HERO ================= */}
      <section className="relative text-center max-w-7xl mx-auto px-6 mb-44 overflow-hidden">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[900px] h-[900px] bg-gradient-to-tr from-indigo-400/30 via-purple-400/20 to-pink-400/20 blur-[140px] pointer-events-none" />

        <motion.span
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 mb-8 px-8 py-3
            bg-white/70 backdrop-blur-xl border border-indigo-200/50
            text-indigo-700 rounded-full text-sm font-semibold shadow-lg"
        >
          <span className="animate-pulse">🚀</span>
          Career Acceleration Ecosystem
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-[3.5rem] md:text-[4.5rem] lg:text-[5.5rem]
            font-black leading-[1.05] mb-10
            bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600
            bg-clip-text text-transparent"
        >
          Smart Career Tools
          <br />
          <span className="text-slate-900">for Top 1% Talent</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="text-slate-600 text-xl md:text-2xl max-w-4xl mx-auto leading-relaxed mb-8"
        >
          A next-generation career intelligence platform designed to help you
          <span className="font-semibold text-slate-800">
            {" "}build faster, negotiate smarter, and win better roles
          </span>{" "}
          using AI-driven insights.
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="text-slate-500 text-lg max-w-3xl mx-auto"
        >
          From resume engineering to salary forecasting and career planning —
          everything you need to land elite opportunities.
        </motion.p>
      </section>

      {/* ================= PREMIUM TOOLS GRID ================= */}
      <section className="relative max-w-7xl mx-auto px-6 pb-44">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-20">
          {tools.map((tool, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ y: -18 }}
              transition={{ type: "spring", stiffness: 160, damping: 18 }}
              className="group relative rounded-[28px] p-[1px]
                bg-gradient-to-br from-indigo-500/40 via-purple-500/30 to-pink-500/40"
            >
              <div
                className="relative h-full rounded-[27px]
                bg-white/85 backdrop-blur-2xl
                border border-slate-200/60
                shadow-[0_20px_60px_-15px_rgba(0,0,0,0.25)]
                p-10 overflow-hidden"
              >
                <div className="relative z-10 text-indigo-600 text-5xl mb-8">
                  {tool.icon}
                </div>

                <h3 className="relative z-10 text-2xl font-bold mb-4 text-slate-900">
                  {tool.title}
                </h3>

                <p className="relative z-10 text-slate-600 mb-8 leading-relaxed">
                  {tool.desc}
                </p>

                <button
                  onClick={() => navigate(tool.path)}
                  className="relative z-20 inline-flex items-center gap-2
                    bg-gradient-to-r from-indigo-600 to-purple-600
                    text-white px-8 py-3 rounded-full font-semibold
                    shadow-lg shadow-indigo-500/30
                    hover:scale-105 active:scale-95 transition"
                >
                  Launch Tool →
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}
