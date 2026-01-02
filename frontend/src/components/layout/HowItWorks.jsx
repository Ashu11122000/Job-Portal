import { motion } from "framer-motion";
import {
  FiUserPlus,
  FiSearch,
  FiSend,
  FiCheckCircle,
  FiBriefcase,
  FiUsers,
  FiArrowRight,
  FiTrendingUp,
} from "react-icons/fi";

export default function HowItWorks() {
  return (
    <section
      className="relative w-full py-40 overflow-hidden
                        bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-900"
    >
      {/* ================= AMBIENT AURORA ================= */}
      <motion.div
        animate={{ x: [0, 180, 0], y: [0, -140, 0] }}
        transition={{ duration: 34, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-96 -left-96 w-[900px] h-[900px]
                   bg-indigo-500/25 rounded-full blur-[280px]"
      />
      <motion.div
        animate={{ x: [0, -180, 0], y: [0, 140, 0] }}
        transition={{ duration: 38, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -bottom-96 -right-96 w-[900px] h-[900px]
                   bg-purple-500/25 rounded-full blur-[300px]"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* ================= HEADER ================= */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="text-center mb-28"
        >
          <span
            className="inline-flex items-center gap-2 mb-6 px-10 py-2
                           rounded-full text-sm font-semibold
                           bg-white/10 backdrop-blur-xl
                           text-indigo-300 border border-white/15
                           shadow-[0_0_30px_rgba(99,102,241,0.35)]"
          >
            <FiTrendingUp />
            AI-Powered Hiring Workflow
          </span>

          <h2
            className="text-5xl md:text-6xl font-black
                         bg-gradient-to-r from-indigo-400 via-blue-400 to-purple-400
                         bg-clip-text text-transparent"
          >
            How the Platform Works
          </h2>

          <p className="text-slate-400 mt-8 text-xl max-w-3xl mx-auto leading-relaxed">
            A secure, intelligent hiring ecosystem that connects professionals
            and employers through verified data, automation, and real-time
            insights.
          </p>

          <div className="mt-12 flex justify-center">
            <div
              className="h-1.5 w-64 rounded-full
                            bg-gradient-to-r from-indigo-500 via-blue-500 to-purple-500
                            shadow-[0_0_35px_rgba(99,102,241,0.9)]"
            />
          </div>
        </motion.div>

        {/* ================= DUAL FLOW ================= */}
        <div className="grid md:grid-cols-2 gap-20 perspective-[1600px]">
          {/* ================= JOB SEEKER ================= */}
          <FlowCard
            title="For Job Seekers"
            accent="indigo"
            icon={<FiUserPlus />}
            steps={[
              {
                icon: <FiUserPlus />,
                title: "Create Intelligent Profile",
                desc: "Resume parsing, skill detection, and experience mapping powered by AI.",
              },
              {
                icon: <FiSearch />,
                title: "Discover Relevant Jobs",
                desc: "Smart recommendations based on role fit, salary, and growth potential.",
              },
              {
                icon: <FiSend />,
                title: "Apply Instantly",
                desc: "One-click applications with recruiter-ready profiles.",
              },
              {
                icon: <FiCheckCircle />,
                title: "Track Hiring Progress",
                desc: "Interview stages, feedback, offers, and onboarding in one dashboard.",
              },
            ]}
          />

          {/* ================= EMPLOYER ================= */}
          <FlowCard
            title="For Employers"
            accent="purple"
            icon={<FiBriefcase />}
            steps={[
              {
                icon: <FiBriefcase />,
                title: "Publish High-Intent Jobs",
                desc: "Optimized job listings with maximum visibility and talent reach.",
              },
              {
                icon: <FiUsers />,
                title: "Identify Top Talent",
                desc: "AI-driven shortlisting based on skills, experience, and intent.",
              },
              {
                icon: <FiCheckCircle />,
                title: "Interview With Confidence",
                desc: "Verified candidates, interview scoring, and collaboration tools.",
              },
              {
                icon: <FiCheckCircle />,
                title: "Scale Hiring Faster",
                desc: "Bulk hiring, pipeline analytics, and enterprise-grade controls.",
              },
            ]}
          />
        </div>

        {/* ================= CTA ================= */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-32 text-center"
        >
          <motion.a
            href="/register"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.96 }}
            className="inline-flex items-center gap-4
                       bg-gradient-to-r from-indigo-600 to-purple-600
                       text-white px-20 py-6 rounded-full
                       font-black text-lg
                       shadow-[0_30px_100px_rgba(99,102,241,0.75)]
                       transition-all"
          >
            Start Your Journey <FiArrowRight />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}

/* ================= FLOW CARD ================= */

function FlowCard({ title, steps, icon, accent }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: accent === "indigo" ? -70 : 70 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.9 }}
      whileHover={{ rotateY: accent === "indigo" ? 6 : -6 }}
      className="relative bg-white/10 backdrop-blur-2xl
                 border border-white/15 rounded-3xl
                 p-14 shadow-[0_45px_130px_rgba(0,0,0,0.5)]"
    >
      <h3
        className={`text-3xl font-black mb-14 flex items-center gap-3
                      ${
                        accent === "indigo"
                          ? "text-indigo-300"
                          : "text-purple-300"
                      }`}
      >
        {icon} {title}
      </h3>

      {steps.map((s, i) => (
        <Step key={i} {...s} accent={accent} isLast={i === steps.length - 1} />
      ))}
    </motion.div>
  );
}

/* ================= STEP ================= */

function Step({ icon, title, desc, accent, isLast }) {
  return (
    <div className="relative flex items-start gap-6 mb-12">
      {!isLast && (
        <div
          className={`absolute left-8 top-16 w-0.5 h-full
            ${
              accent === "indigo"
                ? "bg-gradient-to-b from-indigo-500 to-indigo-300"
                : "bg-gradient-to-b from-purple-500 to-purple-300"
            }`}
        />
      )}

      <div
        className={`relative w-16 h-16 rounded-full flex items-center justify-center
          shadow-xl
          ${
            accent === "indigo"
              ? "bg-gradient-to-br from-indigo-500 to-indigo-700"
              : "bg-gradient-to-br from-purple-500 to-purple-700"
          }`}
      >
        <div
          className="w-11 h-11 rounded-full bg-white
                        flex items-center justify-center
                        text-indigo-600 text-xl"
        >
          {icon}
        </div>
      </div>

      <div>
        <h4 className="text-lg font-bold text-white">{title}</h4>
        <p className="text-slate-400 text-sm leading-relaxed">{desc}</p>
      </div>
    </div>
  );
}
