import { motion } from "framer-motion";
import { FiCheckCircle, FiTrendingUp, FiClock, FiShield } from "react-icons/fi";
import jobs from "../../static/jobs.json";
import JobCard from "../cards/JobCard";

export default function FeaturedJobs() {
  return (
    <section
      className="relative w-full py-32 overflow-hidden 
                        bg-gradient-to-br from-[#eef2ff] via-white to-[#faf5ff]"
    >
      {/* ================= PARALLAX LIGHT ORBS ================= */}
      <motion.div
        animate={{ x: [0, 90, 0], y: [0, 60, 0] }}
        transition={{ duration: 24, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-48 -left-48 w-[560px] h-[560px] 
                   bg-indigo-400/30 rounded-full blur-[170px]"
      />
      <motion.div
        animate={{ x: [0, -90, 0], y: [0, -60, 0] }}
        transition={{ duration: 26, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -bottom-48 -right-48 w-[560px] h-[560px] 
                   bg-purple-400/30 rounded-full blur-[170px]"
      />

      {/* GLASS OVERLAY */}
      <div
        className="absolute inset-0 bg-gradient-to-b 
                      from-white/40 via-white/10 to-transparent backdrop-blur-[2px]"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* ================= HEADER ================= */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
          className="text-center mb-20"
        >
          {/* TAG */}
          <span
            className="inline-flex items-center gap-2 mb-6 px-7 py-2 rounded-full
                           text-sm font-semibold
                           bg-white/70 backdrop-blur-lg
                           text-indigo-700 shadow-[0_6px_24px_rgba(0,0,0,0.08)]
                           border border-white/40"
          >
            <FiTrendingUp className="text-indigo-500" />
            Trending Opportunities
          </span>

          {/* TITLE */}
          <h2
            className="text-6xl font-extrabold bg-gradient-to-r 
                         from-indigo-700 via-blue-600 to-purple-600 
                         bg-clip-text text-transparent
                         drop-shadow-[0_8px_22px_rgba(79,70,229,0.25)]
                         leading-tight"
          >
            Featured Jobs for You
          </h2>

          {/* DESCRIPTION */}
          <p className="text-slate-600 mt-6 text-xl max-w-3xl mx-auto leading-relaxed">
            Curated high-impact roles from verified companies actively hiring.
            These opportunities are selected based on demand, growth potential,
            salary benchmarks, and career acceleration.
          </p>

          {/* VALUE POINTS */}
          <div className="mt-10 flex flex-wrap justify-center gap-6 text-slate-600">
            <ValuePoint icon={<FiShield />} text="Verified Employers" />
            <ValuePoint icon={<FiClock />} text="Updated Daily" />
            <ValuePoint icon={<FiCheckCircle />} text="High-Growth Roles" />
          </div>

          {/* DIVIDER */}
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: 160 }}
            transition={{ duration: 1 }}
            className="mx-auto mt-12 h-[3px] rounded-full
                       bg-gradient-to-r from-indigo-500 via-blue-500 to-purple-500
                       shadow-[0_0_26px_rgba(99,102,241,0.6)]"
          />
        </motion.div>

        {/* ================= JOB GRID WRAPPER ================= */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="backdrop-blur-2xl bg-white/55
                     border border-white/40 rounded-3xl
                     p-12 shadow-[0_40px_120px_rgba(79,70,229,0.16)]
                     hover:shadow-[0_55px_140px_rgba(79,70,229,0.22)]
                     transition-all"
        >
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-12">
            {jobs.map((job, index) => (
              <motion.div
                key={job.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08, duration: 0.6 }}
                whileHover={{
                  y: -12,
                  scale: 1.05,
                  transition: { type: "spring", stiffness: 180 },
                }}
                className="rounded-2xl
                           hover:shadow-[0_30px_70px_rgba(79,70,229,0.35)]
                           transition-all"
              >
                <JobCard job={job} />
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* ================= CTA ================= */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.7 }}
          className="mt-24 text-center"
        >
          <motion.a
            href="/jobs"
            whileHover={{
              scale: 1.08,
              boxShadow: "0px 25px 45px rgba(79,70,229,0.35)",
            }}
            className="inline-block
                       bg-gradient-to-r from-indigo-600 to-purple-600
                       text-white px-16 py-4 rounded-full font-semibold
                       shadow-xl border border-white/30 backdrop-blur-lg
                       transition-all"
          >
            Explore All Opportunities
          </motion.a>

          <p className="mt-6 text-slate-500 text-sm">
            Showing top opportunities • Thousands more updated every day
          </p>
        </motion.div>
      </div>
    </section>
  );
}

/* ================= MINI COMPONENTS ================= */

function ValuePoint({ icon, text }) {
  return (
    <div className="flex items-center gap-2 text-sm font-medium">
      <span className="text-indigo-500 text-lg">{icon}</span>
      {text}
    </div>
  );
}
