import { motion } from "framer-motion";
import {
  FiTrendingUp,
  FiBarChart2,
  FiArrowUpRight,
  FiActivity,
  FiInfo,
} from "react-icons/fi";

const salaryData = [
  {
    id: 1,
    role: "Frontend Developer",
    salary: "₹6 – 15 LPA",
    growth: "+32%",
    demand: "High",
  },
  {
    id: 2,
    role: "Backend Developer",
    salary: "₹8 – 22 LPA",
    growth: "+28%",
    demand: "High",
  },
  {
    id: 3,
    role: "Full Stack Developer",
    salary: "₹10 – 26 LPA",
    growth: "+35%",
    demand: "Very High",
  },
  {
    id: 4,
    role: "Data Scientist",
    salary: "₹12 – 30 LPA",
    growth: "+41%",
    demand: "Critical",
  },
  {
    id: 5,
    role: "Cloud Engineer",
    salary: "₹14 – 32 LPA",
    growth: "+38%",
    demand: "Critical",
  },
  {
    id: 6,
    role: "UI/UX Designer",
    salary: "₹5 – 14 LPA",
    growth: "+22%",
    demand: "Moderate",
  },
];

export default function SalaryInsights() {
  return (
    <section
      className="relative w-full py-40 overflow-hidden
                        bg-gradient-to-br from-[#eef2ff] via-white to-[#faf5ff]"
    >
      {/* ================= AMBIENT MARKET LIGHT ================= */}
      <motion.div
        animate={{ x: [0, 180, 0], y: [0, -140, 0] }}
        transition={{ duration: 34, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-[480px] -left-[480px]
                   w-[900px] h-[900px]
                   bg-indigo-400/25 rounded-full blur-[260px]"
      />
      <motion.div
        animate={{ x: [0, -180, 0], y: [0, 140, 0] }}
        transition={{ duration: 38, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -bottom-[480px] -right-[480px]
                   w-[900px] h-[900px]
                   bg-purple-400/25 rounded-full blur-[280px]"
      />

      {/* Soft analytical glass */}
      <div
        className="absolute inset-0 bg-gradient-to-b
                      from-white/50 via-transparent to-transparent
                      backdrop-blur-[3px]"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* ================= HEADER ================= */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="text-center mb-28"
        >
          <span
            className="inline-flex items-center gap-2 px-9 py-2 mb-6
                           rounded-full text-sm font-semibold
                           bg-white/70 backdrop-blur-xl
                           border border-white/40
                           text-indigo-700 shadow-lg shadow-indigo-300/30"
          >
            <FiActivity />
            Market Intelligence
          </span>

          <h2
            className="text-6xl font-black tracking-tight
                         bg-gradient-to-r from-indigo-700 via-blue-600 to-purple-600
                         bg-clip-text text-transparent
                         drop-shadow-[0_10px_25px_rgba(79,70,229,0.3)]"
          >
            Salary Insights & Hiring Trends
          </h2>

          <p className="text-slate-600 mt-6 text-xl max-w-3xl mx-auto leading-relaxed">
            Role-based compensation benchmarks and demand signals derived from
            real hiring data across startups, MNCs, and global tech companies.
          </p>

          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: 200 }}
            transition={{ duration: 1 }}
            className="mx-auto mt-10 h-[4px] rounded-full
                       bg-gradient-to-r from-indigo-500 via-blue-500 to-purple-600
                       shadow-[0_0_28px_rgba(99,102,241,0.8)]"
          />
        </motion.div>

        {/* ================= SALARY GRID ================= */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-16 perspective-[2200px]">
          {salaryData.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.12, duration: 0.7 }}
              whileHover={{
                y: -16,
                scale: 1.05,
                rotateX: -8,
                rotateY: 8,
                transition: { type: "spring", stiffness: 140, damping: 18 },
              }}
              className="relative group transform-gpu"
            >
              {/* Soft focus glow */}
              <div
                className="absolute inset-0 rounded-3xl
                              bg-gradient-to-r from-indigo-500 to-purple-600
                              opacity-0 group-hover:opacity-20
                              blur-3xl transition duration-500"
              />

              {/* Card */}
              <div
                className="relative bg-white/85 backdrop-blur-2xl
                              border border-white/40 rounded-3xl
                              p-12 shadow-[0_35px_100px_rgba(0,0,0,0.2)]"
              >
                {/* Header */}
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-slate-900">
                    {item.role}
                  </h3>
                  <div
                    className="w-12 h-12 rounded-2xl
                                  bg-indigo-100 text-indigo-600
                                  flex items-center justify-center
                                  text-xl shadow-inner"
                  >
                    <FiBarChart2 />
                  </div>
                </div>

                {/* Salary */}
                <p className="text-3xl font-black text-indigo-600 tracking-tight">
                  {item.salary}
                </p>

                {/* Growth + Demand */}
                <div className="mt-5 flex items-center gap-3 flex-wrap">
                  <span
                    className="inline-flex items-center gap-2
                                   px-4 py-1 rounded-full
                                   bg-emerald-100 text-emerald-700
                                   font-bold text-sm"
                  >
                    <FiTrendingUp /> {item.growth} YoY
                  </span>

                  <span
                    className="inline-flex items-center gap-1
                                   px-3 py-1 rounded-full
                                   bg-slate-100 text-slate-700
                                   text-sm font-semibold"
                  >
                    <FiInfo /> {item.demand} Demand
                  </span>
                </div>

                {/* Insight */}
                <p className="mt-6 text-slate-500 text-sm leading-relaxed">
                  Compensation growth driven by hiring velocity, skill scarcity,
                  and enterprise adoption trends.
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* ================= CTA ================= */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="mt-32 text-center"
        >
          <motion.a
            href="/career-tools"
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.96 }}
            className="inline-flex items-center gap-3
                       bg-gradient-to-r from-indigo-600 to-purple-600
                       text-white px-18 py-6 rounded-full
                       text-lg font-bold
                       shadow-[0_25px_90px_rgba(79,70,229,0.55)]
                       transition-all"
          >
            Explore Career Intelligence
            <FiArrowUpRight className="text-xl" />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
