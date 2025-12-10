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
    title: "Verified Companies",
    desc: "Every employer is strictly KYC-verified, ensuring 100% safe, scam-free and genuine job listings.",
  },
  {
    id: 2,
    icon: <FiZap />,
    title: "Instant Apply",
    desc: "Apply in one click with your smart profile, auto-matched resume, and recruiter-ready insights.",
  },
  {
    id: 3,
    icon: <FiSearch />,
    title: "AI Smart Search",
    desc: "Advanced AI filters by salary, experience, tech stack, remote preference and location.",
  },
  {
    id: 4,
    icon: <FiTrendingUp />,
    title: "Career Growth Tools",
    desc: "Live salary trends, resume analysis, interview prep and personalized career roadmaps.",
  },
  {
    id: 5,
    icon: <FiUserCheck />,
    title: "Recruiter Trusted",
    desc: "Used daily by 12,000+ verified hiring managers across MNCs and funded startups.",
  },
  {
    id: 6,
    icon: <FiStar />,
    title: "Premium Experience",
    desc: "Ultra-fast platform with bank-grade security, mobile-first UI and smooth performance.",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="relative w-full py-40 overflow-hidden bg-linear-to-br from-slate-950 via-indigo-950 to-slate-900">
      {/* ✅ PREMIUM AMBIENT BLOBS */}
      <motion.div
        animate={{ x: [0, 160, 0], y: [0, -120, 0] }}
        transition={{ duration: 28, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-72 -right-72 w-[760px] h-[760px] bg-indigo-500/25 rounded-full blur-[220px]"
      />
      <motion.div
        animate={{ x: [0, -160, 0], y: [0, 120, 0] }}
        transition={{ duration: 32, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -bottom-72 -left-72 w-[760px] h-[760px] bg-purple-500/25 rounded-full blur-[240px]"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* ✅ PREMIUM HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="text-center mb-28"
        >
          <span className="inline-flex items-center gap-2 mb-6 px-8 py-2 rounded-full text-sm font-semibold bg-white/10 backdrop-blur-xl text-indigo-300 border border-white/15 shadow-[0_0_30px_rgba(99,102,241,0.35)]">
            <FiAward /> Platform Advantage
          </span>

          <h2 className="text-5xl md:text-6xl font-black bg-linear-to-r from-indigo-400 via-blue-400 to-purple-400 bg-clip-text text-transparent tracking-tight">
            Why Professionals Choose JobPortal
          </h2>

          <p className="text-slate-400 mt-8 text-xl max-w-3xl mx-auto leading-relaxed">
            We unite verified hiring, AI-powered automation, enterprise-grade
            security and world-class UX to help you land premium jobs faster.
          </p>

          <div className="mt-12 flex justify-center">
            <div className="h-1.5 w-60 rounded-full bg-linear-to-r from-indigo-500 via-blue-500 to-purple-500 shadow-[0_0_30px_rgba(99,102,241,0.9)]" />
          </div>
        </motion.div>

        {/* ✅ ENTERPRISE FEATURE GRID */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-14 perspective-[1400px]">
          {features.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.12 }}
              whileHover={{
                rotateX: -12,
                rotateY: 12,
                scale: 1.08,
                y: -16,
              }}
              className="relative group transform-gpu"
            >
              {/* ✅ NEON EDGE GLOW */}
              <div className="absolute inset-0 rounded-3xl bg-linear-to-r from-indigo-500 to-purple-600 opacity-0 group-hover:opacity-100 blur-2xl transition duration-500" />

              {/* ✅ GLASS FEATURE CARD */}
              <div className="relative bg-white/10 backdrop-blur-2xl border border-white/15 rounded-3xl p-10 shadow-[0_35px_90px_rgba(0,0,0,0.45)]">
                {/* ✅ ICON CORE */}
                <div className="relative w-20 h-20 rounded-full bg-linear-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-2xl mb-7">
                  <div className="w-14 h-14 rounded-full bg-slate-950 flex items-center justify-center text-indigo-400 text-3xl shadow-inner">
                    {item.icon}
                  </div>
                </div>

                <h3 className="text-2xl font-bold text-white mb-4 tracking-wide">
                  {item.title}
                </h3>

                <p className="text-slate-400 text-base leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* ✅ PRIMARY CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="mt-28 text-center"
        >
          <a
            href="/register"
            className="relative inline-flex items-center gap-3 bg-linear-to-r from-indigo-600 to-purple-600 text-white px-20 py-6 rounded-full font-black tracking-wide shadow-[0_25px_90px_rgba(99,102,241,0.7)] hover:scale-110 transition-all"
          >
            Start Your Success Journey
            <span className="absolute inset-0 rounded-full bg-linear-to-r from-purple-600 to-indigo-600 opacity-0 hover:opacity-20 blur-xl transition" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
