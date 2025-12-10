import { motion } from "framer-motion";
import jobs from "../../static/jobs.json";

export default function TrendingJobsSlider() {
  return (
    <section className="relative w-full py-28 overflow-hidden bg-linear-to-br from-purple-50 via-white to-indigo-50">
      {/* ✅ Background Glow */}
      <motion.div
        animate={{ x: [0, 80, 0], y: [0, -40, 0] }}
        transition={{ duration: 18, repeat: Infinity }}
        className="absolute -top-40 left-1/3 w-[520px] h-[520px] bg-purple-400/20 rounded-full blur-[140px]"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* ✅ Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <span className="inline-block mb-5 px-6 py-2 rounded-full text-sm font-semibold bg-purple-100 text-purple-700 shadow-sm">
            🔥 Hot Right Now
          </span>

          <h2 className="text-5xl font-extrabold bg-linear-to-r from-purple-600 via-indigo-600 to-blue-600 bg-clip-text text-transparent">
            Trending Jobs
          </h2>

          <p className="text-slate-600 mt-5 text-lg max-w-2xl mx-auto">
            Most applied jobs this week from top hiring companies.
          </p>

          {/* Decorative Line */}
          <div className="mt-8 flex justify-center">
            <div className="h-[3px] w-36 rounded-full bg-linear-to-r from-purple-500 via-indigo-500 to-blue-500 shadow-[0_0_18px_rgba(99,102,241,0.6)]"></div>
          </div>
        </motion.div>

        {/* ✅ SLIDER TRACK */}
        <div className="relative overflow-hidden">
          <motion.div
            animate={{ x: ["0%", "-100%"] }}
            transition={{
              duration: 30,
              repeat: Infinity,
              ease: "linear",
            }}
            className="flex gap-10 w-max"
          >
            {[...jobs, ...jobs].map((job, index) => (
              <motion.div
                key={`${job.id}-${index}`}
                whileHover={{ y: -10, scale: 1.05 }}
                className="min-w-[320px] bg-white/80 backdrop-blur-xl border border-white/40 rounded-3xl p-6 shadow-lg hover:shadow-[0_20px_50px_rgba(99,102,241,0.35)] transition-all duration-300"
              >
                {/* Company */}
                <p className="text-sm font-semibold text-indigo-600">
                  {job.company}
                </p>

                {/* Title */}
                <h3 className="mt-2 text-xl font-bold text-slate-800">
                  {job.title}
                </h3>

                {/* Location */}
                <p className="text-slate-500 text-sm mt-1">{job.location}</p>

                {/* Salary */}
                <p className="mt-4 text-indigo-700 font-semibold">
                  💰 {job.salary}
                </p>

                {/* Apply CTA */}
                <a
                  href={`/jobs/${job.id}`}
                  className="inline-block mt-6 bg-linear-to-r from-indigo-600 to-purple-600 text-white px-6 py-2 rounded-full text-sm font-semibold shadow hover:scale-105 transition"
                >
                  Apply Now
                </a>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
