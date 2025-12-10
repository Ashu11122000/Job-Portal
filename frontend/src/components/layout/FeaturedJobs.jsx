import { motion } from "framer-motion";
import jobs from "../../static/jobs.json";
import JobCard from "../cards/JobCard";

export default function FeaturedJobs() {
  return (
    <section className="relative w-full py-28 overflow-hidden bg-linear-to-br from-indigo-50 via-white to-purple-50">
      {/* ✅ Premium Background Glow Orbs */}
      <motion.div
        animate={{ x: [0, 60, 0], y: [0, 40, 0] }}
        transition={{ duration: 16, repeat: Infinity }}
        className="absolute -top-40 -left-40 w-[480px] h-[480px] bg-indigo-400/20 rounded-full blur-[140px]"
      />
      <motion.div
        animate={{ x: [0, -60, 0], y: [0, -40, 0] }}
        transition={{ duration: 18, repeat: Infinity }}
        className="absolute -bottom-40 -right-40 w-[480px] h-[480px] bg-purple-400/20 rounded-full blur-[140px]"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* ✅ SECTION HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          {/* Premium Badge */}
          <span className="inline-block mb-5 px-6 py-2 rounded-full text-sm font-semibold bg-indigo-100 text-indigo-700 shadow-sm">
            🔥 Trending Now
          </span>

          <h2 className="text-5xl font-extrabold bg-linear-to-r from-indigo-600 via-blue-600 to-purple-600 bg-clip-text text-transparent drop-shadow-sm">
            Job Opportunities
          </h2>

          <p className="text-slate-600 mt-5 text-lg max-w-2xl mx-auto leading-relaxed">
            Hand-picked top roles from India’s fastest-growing tech companies.
            Updated daily for top talent like you.
          </p>

          {/* Decorative Glow Line */}
          <div className="mt-8 flex justify-center">
            <div className="h-[3px] w-36 rounded-full bg-linear-to-r from-indigo-500 via-blue-500 to-purple-500 shadow-[0_0_18px_rgba(99,102,241,0.6)]"></div>
          </div>
        </motion.div>

        {/* ✅ GLASS JOB GRID WRAPPER */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          viewport={{ once: true }}
          className="backdrop-blur-xl bg-white/60 border border-white/40 rounded-3xl p-10 shadow-[0_25px_70px_rgba(99,102,241,0.15)]"
        >
          {/* ✅ JOBS GRID */}
          <div
            className="
              grid 
              sm:grid-cols-2 
              lg:grid-cols-3 
              gap-10
            "
          >
            {jobs.map((job, index) => (
              <motion.div
                key={job.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                whileHover={{
                  y: -8,
                  scale: 1.03,
                }}
                className="transition-all duration-300 hover:shadow-[0_20px_50px_rgba(99,102,241,0.35)] rounded-2xl"
              >
                <JobCard job={job} />
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* ✅ VIEW ALL CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-20 text-center"
        >
          <a
            href="/jobs"
            className="inline-block bg-linear-to-r from-indigo-600 to-purple-600 text-white px-14 py-4 rounded-full font-semibold shadow-lg hover:shadow-indigo-400/60 hover:scale-105 transition-all"
          >
            View All Jobs
          </a>
        </motion.div>
      </div>
    </section>
  );
}
