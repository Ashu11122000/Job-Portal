import { motion } from "framer-motion";
import {
  FiShield,
  FiZap,
  FiSearch,
  FiTrendingUp,
  FiUserCheck,
  FiStar,
  FiAward,
} from "react-icons/fi";

const features = [
  {
    id: 1,
    icon: <FiShield />,
    title: "Verified Hiring Network",
    metric: "100% KYC",
    desc: "Every employer undergoes strict identity and business verification to ensure scam-free, genuine opportunities.",
  },
  {
    id: 2,
    icon: <FiZap />,
    title: "One-Click Apply",
    metric: "< 30 sec",
    desc: "Apply instantly using your smart profile with auto-matched resumes and recruiter-ready insights.",
  },
  {
    id: 3,
    icon: <FiSearch />,
    title: "AI Job Discovery",
    metric: "Precision Match",
    desc: "Advanced AI filters roles by salary, experience, tech stack, location, and remote preferences.",
  },
  {
    id: 4,
    icon: <FiTrendingUp />,
    title: "Career Intelligence",
    metric: "Live Data",
    desc: "Real-time salary trends, resume scoring, interview prep, and growth roadmaps tailored to you.",
  },
  {
    id: 5,
    icon: <FiUserCheck />,
    title: "Recruiter Trusted",
    metric: "12K+ Hiring Managers",
    desc: "Actively used by recruiters across MNCs, unicorn startups, and enterprise teams.",
  },
  {
    id: 6,
    icon: <FiStar />,
    title: "Enterprise-Grade Platform",
    metric: "Bank-Level Security",
    desc: "Built with performance, privacy, and scalability at its core — fast, secure, and reliable.",
  },
];

export default function WhyChooseUs() {
  return (
    <section
      className="relative w-full py-40 overflow-hidden
                        bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-900"
    >
      {/* ================= AMBIENT LIGHT ================= */}
      <motion.div
        animate={{ x: [0, 180, 0], y: [0, -140, 0] }}
        transition={{ duration: 36, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-96 -right-96 w-[900px] h-[900px]
                   bg-indigo-500/25 rounded-full blur-[300px]"
      />
      <motion.div
        animate={{ x: [0, -180, 0], y: [0, 140, 0] }}
        transition={{ duration: 40, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -bottom-96 -left-96 w-[900px] h-[900px]
                   bg-purple-500/25 rounded-full blur-[320px]"
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
            className="inline-flex items-center gap-2 mb-6 px-8 py-2
                           rounded-full text-sm font-semibold
                           bg-white/10 backdrop-blur-xl
                           text-indigo-300 border border-white/15
                           shadow-[0_0_30px_rgba(99,102,241,0.35)]"
          >
            <FiAward />
            Platform Advantage
          </span>

          <h2
            className="text-5xl md:text-6xl font-black tracking-tight
                         bg-gradient-to-r from-indigo-400 via-blue-400 to-purple-400
                         bg-clip-text text-transparent"
          >
            Why Professionals Choose JobPortal
          </h2>

          <p className="text-slate-400 mt-8 text-xl max-w-3xl mx-auto leading-relaxed">
            A modern hiring ecosystem combining verified employers, intelligent
            automation, enterprise-grade security, and a premium user
            experience.
          </p>

          <div className="mt-12 flex justify-center">
            <div
              className="h-1.5 w-64 rounded-full
                            bg-gradient-to-r from-indigo-500 via-blue-500 to-purple-500
                            shadow-[0_0_35px_rgba(99,102,241,0.9)]"
            />
          </div>
        </motion.div>

        {/* ================= FEATURE GRID ================= */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-16 perspective-[1600px]">
          {features.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.12, duration: 0.7 }}
              whileHover={{
                y: -18,
                scale: 1.06,
                rotateX: -8,
                rotateY: 8,
                transition: { type: "spring", stiffness: 140, damping: 16 },
              }}
              className="relative group transform-gpu"
            >
              {/* Glow */}
              <div
                className="absolute inset-0 rounded-3xl
                              bg-gradient-to-r from-indigo-500 to-purple-600
                              opacity-0 group-hover:opacity-25
                              blur-3xl transition duration-500"
              />

              {/* Card */}
              <div
                className="relative bg-white/10 backdrop-blur-2xl
                              border border-white/15 rounded-3xl
                              p-12 shadow-[0_40px_120px_rgba(0,0,0,0.55)]"
              >
                {/* Icon */}
                <div
                  className="relative w-20 h-20 rounded-2xl
                                bg-gradient-to-br from-indigo-500 to-purple-600
                                flex items-center justify-center
                                shadow-xl mb-8"
                >
                  <div
                    className="w-14 h-14 rounded-xl bg-slate-950
                                  flex items-center justify-center
                                  text-indigo-400 text-3xl shadow-inner"
                  >
                    {item.icon}
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-2xl font-bold text-white mb-2 tracking-wide">
                  {item.title}
                </h3>

                {/* Metric */}
                <p className="text-indigo-400 text-sm font-semibold mb-4">
                  {item.metric}
                </p>

                {/* Description */}
                <p className="text-slate-400 leading-relaxed text-base">
                  {item.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* ================= CTA ================= */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="mt-32 text-center"
        >
          <motion.a
            href="/register"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.96 }}
            className="inline-flex items-center gap-4
                       bg-gradient-to-r from-indigo-600 to-purple-600
                       text-white px-20 py-6 rounded-full
                       font-black tracking-wide text-lg
                       shadow-[0_30px_110px_rgba(99,102,241,0.75)]
                       transition-all"
          >
            Start Your Success Journey
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
