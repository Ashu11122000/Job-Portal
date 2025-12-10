import { motion } from "framer-motion";
import {
  FiMonitor,
  FiDatabase,
  FiCloud,
  FiPenTool,
  FiBarChart2,
  FiUser,
  FiBriefcase,
  FiGlobe,
} from "react-icons/fi";

const categories = [
  { id: 1, name: "Frontend Developer", icon: <FiMonitor />, jobs: "2.4k+" },
  { id: 2, name: "Backend Developer", icon: <FiDatabase />, jobs: "1.9k+" },
  { id: 3, name: "Cloud Engineer", icon: <FiCloud />, jobs: "980+" },
  { id: 4, name: "UI/UX Designer", icon: <FiPenTool />, jobs: "1.2k+" },
  { id: 5, name: "Data Analyst", icon: <FiBarChart2 />, jobs: "860+" },
  { id: 6, name: "HR & Recruiter", icon: <FiUser />, jobs: "740+" },
  { id: 7, name: "Freshers Jobs", icon: <FiBriefcase />, jobs: "3.1k+" },
  { id: 8, name: "Remote Jobs", icon: <FiGlobe />, jobs: "1.5k+" },
];

export default function JobCategories() {
  return (
    <section className="relative w-full py-32 overflow-hidden bg-[radial-gradient(circle_at_top,var(--color-indigo-100),white,var(--color-purple-100))]">
      {/* ✅ Aurora Motion Background */}
      <motion.div
        animate={{ x: [0, 120, 0], y: [0, -80, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-56 -left-56 w-[650px] h-[650px] bg-indigo-400/20 rounded-full blur-[160px]"
      />
      <motion.div
        animate={{ x: [0, -120, 0], y: [0, 80, 0] }}
        transition={{ duration: 26, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -bottom-56 -right-56 w-[650px] h-[650px] bg-purple-400/20 rounded-full blur-[180px]"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* ✅ Ultra Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="text-center mb-24"
        >
          <span className="inline-block mb-6 px-7 py-2 rounded-full text-sm font-semibold bg-white/70 backdrop-blur-xl text-indigo-700 shadow-[0_0_20px_rgba(99,102,241,0.25)]">
            🔥 Hot Career Domains
          </span>

          <h2 className="text-6xl font-black bg-linear-to-r from-indigo-600 via-blue-600 to-purple-600 bg-clip-text text-transparent tracking-tight">
            Explore High-Demand Roles
          </h2>

          <p className="text-slate-600 mt-6 text-xl max-w-2xl mx-auto leading-relaxed">
            Choose your domain and unlock thousands of high-paying, future-ready
            opportunities across top companies worldwide.
          </p>

          <div className="mt-10 flex justify-center">
            <div className="h-1 w-40 rounded-full bg-linear-to-r from-indigo-500 via-blue-500 to-purple-500 shadow-[0_0_25px_rgba(99,102,241,0.8)]" />
          </div>
        </motion.div>

        {/* ✅ Ultra 3D Glass Grid */}
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-12 perspective-distant">
          {categories.map((cat, index) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{
                rotateX: -10,
                rotateY: 10,
                y: -14,
                scale: 1.05,
              }}
              className="relative group transform-gpu"
            >
              {/* ✅ Neon Border */}
              <div className="absolute inset-0 rounded-3xl bg-linear-to-r from-indigo-500 to-purple-500 opacity-0 group-hover:opacity-100 blur-xl transition duration-500" />

              {/* ✅ Glass Card */}
              <div className="relative bg-white/80 backdrop-blur-2xl border border-white/50 rounded-3xl p-9 text-center shadow-[0_25px_70px_rgba(0,0,0,0.15)] transition-all">
                {/* ✅ Floating Particle Glow */}
                <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-36 h-36 bg-indigo-400/20 rounded-full blur-[60px]" />

                {/* ✅ Icon Halo */}
                <div className="relative w-20 h-20 mx-auto rounded-full bg-linear-to-br from-indigo-500 to-purple-500 flex items-center justify-center shadow-2xl">
                  <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center text-3xl text-indigo-600">
                    {cat.icon}
                  </div>
                </div>

                {/* ✅ Job Count Pill */}
                <div className="mt-5 inline-block px-4 py-1 rounded-full bg-indigo-100 text-indigo-700 text-sm font-semibold shadow-sm">
                  {cat.jobs} Jobs
                </div>

                {/* ✅ Title */}
                <h3 className="mt-6 text-xl font-bold text-slate-800 tracking-wide group-hover:text-indigo-600 transition">
                  {cat.name}
                </h3>

                {/* ✅ Subline */}
                <p className="text-slate-500 text-sm mt-2">
                  High growth • Premium salaries
                </p>

                {/* ✅ Animated Underline */}
                <div className="mt-7 h-[3px] w-0 group-hover:w-full bg-linear-to-r from-indigo-500 to-purple-500 transition-all duration-500 mx-auto rounded-full" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
