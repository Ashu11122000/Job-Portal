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
  FiTrendingUp,
} from "react-icons/fi";

const categories = [
  {
    id: 1,
    name: "Frontend Developer",
    icon: <FiMonitor />,
    jobs: "2.4k+",
    trend: "High Demand",
  },
  {
    id: 2,
    name: "Backend Developer",
    icon: <FiDatabase />,
    jobs: "1.9k+",
    trend: "Growing",
  },
  {
    id: 3,
    name: "Cloud Engineer",
    icon: <FiCloud />,
    jobs: "980+",
    trend: "Hot Skill",
  },
  {
    id: 4,
    name: "UI/UX Designer",
    icon: <FiPenTool />,
    jobs: "1.2k+",
    trend: "Creative Boom",
  },
  {
    id: 5,
    name: "Data Analyst",
    icon: <FiBarChart2 />,
    jobs: "860+",
    trend: "Rising",
  },
  {
    id: 6,
    name: "HR & Recruiter",
    icon: <FiUser />,
    jobs: "740+",
    trend: "Stable",
  },
  {
    id: 7,
    name: "Freshers Jobs",
    icon: <FiBriefcase />,
    jobs: "3.1k+",
    trend: "Entry Level",
  },
  {
    id: 8,
    name: "Remote Jobs",
    icon: <FiGlobe />,
    jobs: "1.5k+",
    trend: "Global",
  },
];

export default function JobCategories() {
  return (
    <section
      className="relative w-full py-36 overflow-hidden
                        bg-gradient-to-br from-[#eef2ff] via-white to-[#faf5ff]"
    >
      {/* ================= AMBIENT AURORA ================= */}
      <motion.div
        animate={{ x: [0, 120, 0], y: [0, -90, 0] }}
        transition={{ duration: 26, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-64 -left-64 w-[760px] h-[760px]
                   bg-indigo-400/25 rounded-full blur-[200px]"
      />
      <motion.div
        animate={{ x: [0, -120, 0], y: [0, 90, 0] }}
        transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -bottom-64 -right-64 w-[760px] h-[760px]
                   bg-purple-400/25 rounded-full blur-[220px]"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* ================= HEADER ================= */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="text-center mb-24"
        >
          <span
            className="inline-flex items-center gap-2 mb-6 px-8 py-2
                           text-sm font-semibold rounded-full
                           bg-white/70 backdrop-blur-xl
                           text-indigo-700 border border-white/40
                           shadow-lg shadow-indigo-200/40"
          >
            <FiTrendingUp className="text-indigo-500" />
            High-Growth Job Categories
          </span>

          <h2
            className="text-6xl font-extrabold tracking-tight
                         bg-gradient-to-r from-indigo-700 via-blue-600 to-purple-600
                         bg-clip-text text-transparent
                         drop-shadow-[0_10px_30px_rgba(79,70,229,0.35)]"
          >
            Career Paths That Matter
          </h2>

          <p className="mt-6 text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Explore career categories actively hiring across startups,
            enterprises, and global tech leaders — curated for long-term growth.
          </p>

          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: 180 }}
            transition={{ duration: 1 }}
            className="mx-auto mt-10 h-[3px] rounded-full
                       bg-gradient-to-r from-indigo-500 via-blue-500 to-purple-600
                       shadow-[0_0_26px_rgba(99,102,241,0.7)]"
          />
        </motion.div>

        {/* ================= CATEGORY GRID ================= */}
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-14">
          {categories.map((cat, index) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              whileHover={{
                y: -16,
                scale: 1.06,
                rotateX: -8,
                rotateY: 8,
                transition: { type: "spring", stiffness: 160, damping: 16 },
              }}
              className="relative group transform-gpu"
            >
              {/* Glow */}
              <div
                className="absolute inset-0 rounded-3xl
                              bg-gradient-to-r from-indigo-500 to-purple-600
                              opacity-0 group-hover:opacity-20 blur-2xl
                              transition duration-500"
              />

              {/* Glass Card */}
              <div
                className="relative bg-white/85 backdrop-blur-2xl
                              border border-white/40 rounded-3xl
                              p-10 text-center
                              shadow-[0_35px_90px_rgba(0,0,0,0.14)]
                              transition-all"
              >
                {/* Icon */}
                <div
                  className="relative w-24 h-24 mx-auto rounded-3xl
                                bg-gradient-to-br from-indigo-600 to-purple-600
                                flex items-center justify-center
                                shadow-xl shadow-indigo-400/40"
                >
                  <div
                    className="w-20 h-20 rounded-2xl bg-white
                                  flex items-center justify-center
                                  text-4xl text-indigo-600 shadow-inner"
                  >
                    {cat.icon}
                  </div>
                </div>

                {/* Job Count */}
                <div
                  className="mt-6 inline-block px-4 py-1 rounded-full
                                bg-indigo-100 text-indigo-700
                                text-sm font-semibold shadow-sm"
                >
                  {cat.jobs} open roles
                </div>

                {/* Title */}
                <h3
                  className="mt-6 text-xl font-bold text-slate-900
                               group-hover:text-indigo-600 transition"
                >
                  {cat.name}
                </h3>

                {/* Trend */}
                <p className="text-sm text-slate-500 mt-2">
                  {cat.trend} • Verified employers
                </p>

                {/* Hover Line */}
                <div
                  className="mt-8 h-[3px] w-0 group-hover:w-full
                                bg-gradient-to-r from-indigo-500 to-purple-600
                                transition-all duration-500 mx-auto rounded-full"
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
