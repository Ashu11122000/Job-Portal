import { motion } from "framer-motion";
import {
  FiFileText,
  FiTarget,
  FiTrendingUp,
  FiEdit3,
  FiBriefcase,
  FiCheckCircle,
  FiLayers,
  FiUserCheck,
  FiAward,
  FiShield,
  FiZap,
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
    title: "Mock Interview Prep",
    desc: "Practice technical and HR interviews using real company questions and feedback reports.",
    icon: <FiBriefcase />,
    path: "/tools/mock-interview",
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
      {/* ✅ HERO */}
      <section className="text-center max-w-6xl mx-auto px-6 mb-36">
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-block mb-6 px-7 py-2 bg-indigo-100 text-indigo-700 rounded-full text-sm font-bold shadow"
        >
          🚀 Career Acceleration Ecosystem
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-6xl font-black bg-linear-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-8"
        >
          Smart Career Tools
        </motion.h1>

        <p className="text-slate-600 text-xl max-w-4xl mx-auto leading-relaxed mb-6">
          A next-generation career development platform that helps you design,
          build, optimize, and accelerate your professional journey using
          AI-driven tools.
        </p>

        <p className="text-slate-500 text-lg max-w-3xl mx-auto">
          From resume building to salary forecasting and interview mastery — we
          provide everything you need to land high-paying roles in top
          companies.
        </p>
      </section>

      {/* ✅ TOOLS GRID */}
      <section className="max-w-7xl mx-auto px-6 pb-40">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-16">
          {tools.map((tool, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -16, scale: 1.05 }}
              transition={{ type: "spring", stiffness: 200 }}
              className="relative bg-white/95 backdrop-blur-xl border border-slate-200 rounded-3xl shadow-xl p-10 overflow-hidden"
            >
              <div className="absolute inset-0 rounded-3xl bg-linear-to-r from-indigo-500 to-purple-500 opacity-0 hover:opacity-20 blur-xl transition" />

              <div className="text-indigo-600 text-4xl mb-6">{tool.icon}</div>

              <h3 className="text-2xl font-bold mb-4 text-slate-900">
                {tool.title}
              </h3>

              <p className="text-slate-600 mb-6 leading-relaxed">{tool.desc}</p>

              <ul className="text-sm text-slate-500 space-y-2 mb-8 list-disc list-inside">
                <li>Industry-tested workflows</li>
                <li>Recruiter acceptance optimized</li>
                <li>Data-driven recommendations</li>
              </ul>

              {/* ✅ WORKING BUTTON */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  navigate(tool.path);
                }}
                className="relative z-20 bg-linear-to-r from-indigo-600 to-purple-600 text-white px-7 py-2.5 rounded-full font-semibold shadow hover:scale-105 active:scale-95 transition"
              >
                Launch Tool
              </button>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ✅ HOW IT WORKS */}
      <section className="bg-white py-32 border-t">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-5xl font-black mb-6 text-slate-800">
            How These Tools Transform Your Career
          </h2>

          <p className="text-slate-600 text-lg max-w-4xl mx-auto mb-16">
            Our platform follows a complete professional lifecycle — starting
            from resume creation to performance optimization and salary growth.
          </p>

          <div className="grid md:grid-cols-4 gap-12">
            {[
              {
                icon: <FiLayers />,
                title: "Build",
                desc: "Create a strong foundation with AI-powered resumes and profiles.",
              },
              {
                icon: <FiTarget />,
                title: "Plan",
                desc: "Design your learning roadmap with guided career milestones.",
              },
              {
                icon: <FiUserCheck />,
                title: "Prepare",
                desc: "Master interviews and HR rounds with confidence.",
              },
              {
                icon: <FiTrendingUp />,
                title: "Grow",
                desc: "Track salary growth and promotion opportunities.",
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.08 }}
                className="bg-slate-50 p-12 rounded-3xl shadow text-center"
              >
                <div className="text-4xl text-indigo-600 mb-6">{item.icon}</div>
                <h3 className="font-bold text-xl mb-3">{item.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ✅ TRUST & SOCIAL PROOF */}
      <section className="py-32 bg-linear-to-br from-indigo-50 to-purple-50">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-5xl font-black mb-20 text-slate-800">
            Trusted By Millions of Professionals
          </h2>

          <div className="grid md:grid-cols-4 gap-14">
            <div>
              <h3 className="text-5xl font-black text-indigo-700">2,00,000+</h3>
              <p className="text-slate-600">Resumes Generated</p>
            </div>
            <div>
              <h3 className="text-5xl font-black text-purple-700">1,50,000+</h3>
              <p className="text-slate-600">Interviews Cracked</p>
            </div>
            <div>
              <h3 className="text-5xl font-black text-indigo-700">80,000+</h3>
              <p className="text-slate-600">Career Switches</p>
            </div>
            <div>
              <h3 className="text-5xl font-black text-purple-700">4.9★</h3>
              <p className="text-slate-600">User Trust Rating</p>
            </div>
          </div>
        </div>
      </section>

      {/* ✅ FOOTER */}
      <Footer />
    </div>
  );
}
