import { motion } from "framer-motion";
import {
  FiTrendingUp,
  FiBarChart2,
  FiArrowUpRight,
  FiActivity,
} from "react-icons/fi";

const salaryData = [
  { id: 1, role: "Frontend Developer", salary: "₹6 – 15 LPA", growth: "+32%" },
  { id: 2, role: "Backend Developer", salary: "₹8 – 22 LPA", growth: "+28%" },
  {
    id: 3,
    role: "Full Stack Developer",
    salary: "₹10 – 26 LPA",
    growth: "+35%",
  },
  { id: 4, role: "Data Scientist", salary: "₹12 – 30 LPA", growth: "+41%" },
  { id: 5, role: "Cloud Engineer", salary: "₹14 – 32 LPA", growth: "+38%" },
  { id: 6, role: "UI/UX Designer", salary: "₹5 – 14 LPA", growth: "+22%" },
];

export default function SalaryInsights() {
  return (
    <section className="relative w-full py-36 overflow-hidden bg-[radial-gradient(circle_at_top,var(--color-indigo-100),white,var(--color-purple-100))]">
      {/* ✅ Aurora Financial Glow */}
      <motion.div
        animate={{ x: [0, 140, 0], y: [0, -90, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-64 -left-64 w-[720px] h-[720px] bg-indigo-400/25 rounded-full blur-[200px]"
      />
      <motion.div
        animate={{ x: [0, -140, 0], y: [0, 90, 0] }}
        transition={{ duration: 26, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -bottom-64 -right-64 w-[720px] h-[720px] bg-purple-400/25 rounded-full blur-[220px]"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* ✅ ULTRA HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="text-center mb-24"
        >
          <span className="inline-flex items-center gap-2 mb-6 px-8 py-2 rounded-full text-sm font-semibold bg-white/70 backdrop-blur-xl text-indigo-700 shadow-[0_0_22px_rgba(99,102,241,0.35)]">
            <FiActivity /> Live Market Intelligence
          </span>

          <h2 className="text-6xl font-black bg-linear-to-r from-indigo-600 via-blue-600 to-purple-600 bg-clip-text text-transparent tracking-tight">
            Salary Insights & Career Trends
          </h2>

          <p className="text-slate-600 mt-6 text-xl max-w-3xl mx-auto leading-relaxed">
            Real-time salary bands, growth momentum, and future-ready tech roles
            based on live hiring demand.
          </p>

          <div className="mt-10 flex justify-center">
            <div className="h-1 w-44 rounded-full bg-linear-to-r from-indigo-500 via-blue-500 to-purple-500 shadow-[0_0_25px_rgba(99,102,241,0.75)]" />
          </div>
        </motion.div>

        {/* ✅ 3D ULTRA SALARY GRID */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-12 perspective-distant">
          {salaryData.map((item, index) => (
            <motion.div
              key={item.id}
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
              {/* ✅ Neon Financial Border */}
              <div className="absolute inset-0 rounded-3xl bg-linear-to-r from-indigo-500 to-purple-500 opacity-0 group-hover:opacity-100 blur-xl transition duration-500" />

              {/* ✅ Glass Salary Card */}
              <div className="relative bg-white/85 backdrop-blur-2xl border border-white/50 rounded-3xl p-9 shadow-[0_25px_80px_rgba(0,0,0,0.25)] transition-all">
                {/* ✅ Floating Data Glow */}
                <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-40 h-40 bg-indigo-400/25 rounded-full blur-[70px]" />

                {/* ✅ Header Row */}
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-slate-800 tracking-wide">
                    {item.role}
                  </h3>
                  <div className="w-11 h-11 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center shadow-md">
                    <FiBarChart2 />
                  </div>
                </div>

                {/* ✅ Salary Value */}
                <p className="text-2xl font-black text-indigo-600 tracking-tight">
                  {item.salary}
                </p>

                {/* ✅ Growth Momentum */}
                <div className="mt-4 inline-flex items-center gap-2 px-4 py-1 rounded-full bg-emerald-100 text-emerald-700 text-sm font-bold shadow-sm">
                  <FiTrendingUp className="animate-pulse" />
                  {item.growth} YoY Growth
                </div>

                {/* ✅ Market Confidence Line */}
                <p className="mt-5 text-slate-500 text-sm">
                  High hiring demand • Strong offer competition
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* ✅ ULTRA CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-24 text-center"
        >
          <a
            href="/career-tools"
            className="inline-flex items-center gap-3 bg-linear-to-r from-indigo-600 to-purple-600 text-white px-16 py-5 rounded-full font-bold shadow-[0_20px_70px_rgba(99,102,241,0.6)] hover:scale-105 transition-all"
          >
            Explore Career Tools <FiArrowUpRight />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
