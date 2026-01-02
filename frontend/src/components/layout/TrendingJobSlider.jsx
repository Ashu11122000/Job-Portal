import { motion } from "framer-motion";
import { FiMapPin, FiClock, FiTrendingUp, FiBriefcase } from "react-icons/fi";
import jobs from "../../static/jobs.json";

export default function TrendingJobsSlider() {
  return (
    <section
      className="relative w-full py-32 overflow-hidden
                        bg-gradient-to-br from-[#faf5ff] via-white to-[#eef2ff]"
    >
      {/* ================= AMBIENT AURORA ================= */}
      <motion.div
        animate={{ x: [0, 160, 0], y: [0, -80, 0] }}
        transition={{ duration: 32, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-64 left-1/4 w-[760px] h-[760px]
                   bg-purple-400/25 rounded-full blur-[180px]"
      />

      {/* Soft glass overlay */}
      <div
        className="absolute inset-0 bg-gradient-to-b
                      from-white/40 via-transparent to-transparent
                      backdrop-blur-[2px]"
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
            className="inline-flex items-center gap-2 mb-6 px-7 py-2
                           text-sm font-semibold rounded-full
                           bg-purple-100 text-purple-700
                           shadow-md shadow-purple-200"
          >
            <FiTrendingUp />
            Hot & Trending This Week
          </span>

          <h2
            className="text-6xl font-black tracking-tight
                         bg-gradient-to-r from-purple-700 via-indigo-600 to-blue-600
                         bg-clip-text text-transparent
                         drop-shadow-[0_10px_25px_rgba(79,70,229,0.3)]"
          >
            Most Applied Jobs
          </h2>

          <p className="mt-6 text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            These roles are seeing the highest candidate activity right now —
            driven by demand, compensation, and career growth.
          </p>

          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: 160 }}
            transition={{ duration: 1 }}
            className="mx-auto mt-10 h-[3px] rounded-full
                       bg-gradient-to-r from-purple-500 via-indigo-500 to-blue-500
                       shadow-[0_0_26px_rgba(99,102,241,0.75)]"
          />
        </motion.div>

        {/* ================= SLIDER ================= */}
        <div className="relative overflow-hidden pt-6">
          {/* Cinematic fade edges */}
          <div
            className="pointer-events-none absolute inset-y-0 left-0 w-32
                          bg-gradient-to-r from-white to-transparent z-10"
          />
          <div
            className="pointer-events-none absolute inset-y-0 right-0 w-32
                          bg-gradient-to-l from-white to-transparent z-10"
          />

          {/* Continuous track */}
          <motion.div
            animate={{ x: ["0%", "-100%"] }}
            transition={{ duration: 48, repeat: Infinity, ease: "linear" }}
            className="flex gap-16 w-max"
          >
            {[...jobs, ...jobs].map((job, index) => (
              <motion.div
                key={`${job.id}-${index}`}
                whileHover={{
                  y: -14,
                  scale: 1.05,
                  rotateX: 3,
                  rotateY: -3,
                  transition: { type: "spring", stiffness: 180, damping: 16 },
                }}
                className="relative min-w-[360px] p-8 rounded-3xl
                           bg-white/85 backdrop-blur-2xl
                           border border-white/50
                           shadow-[0_30px_90px_rgba(0,0,0,0.12)]
                           hover:shadow-[0_45px_130px_rgba(79,70,229,0.35)]
                           transition-all duration-300"
              >
                {/* Glow pulse */}
                <motion.div
                  animate={{ opacity: [0.25, 0.5, 0.25] }}
                  transition={{ duration: 6, repeat: Infinity }}
                  className="absolute -top-12 left-1/2 -translate-x-1/2
                             w-40 h-40 bg-purple-400/30
                             rounded-full blur-[70px]"
                />

                {/* Meta header */}
                <div className="flex items-center justify-between text-xs mb-4">
                  <span
                    className="flex items-center gap-1
                                   px-3 py-1 rounded-full
                                   bg-emerald-100 text-emerald-700 font-semibold"
                  >
                    <FiTrendingUp /> Trending
                  </span>

                  <span className="flex items-center gap-1 text-slate-500">
                    <FiClock /> Posted recently
                  </span>
                </div>

                {/* Company */}
                <p className="text-sm font-semibold text-indigo-600">
                  {job.company}
                </p>

                {/* Title */}
                <h3 className="mt-2 text-2xl font-bold text-slate-900 leading-snug">
                  {job.title}
                </h3>

                {/* Location */}
                <div className="mt-2 flex items-center gap-2 text-sm text-slate-500">
                  <FiMapPin />
                  {job.location}
                </div>

                {/* Role Type */}
                <div className="mt-4 flex items-center gap-2 text-sm text-slate-600">
                  <FiBriefcase />
                  Full-time • High growth team
                </div>

                {/* Salary */}
                <p className="mt-6 text-indigo-700 font-bold text-lg">
                  💰 {job.salary}
                </p>

                {/* CTA */}
                <motion.a
                  href={`/jobs/${job.id}`}
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.96 }}
                  className="inline-block mt-7
                             bg-gradient-to-r from-indigo-600 to-purple-600
                             text-white px-8 py-3 rounded-full
                             text-sm font-semibold
                             shadow-lg hover:shadow-indigo-400/50
                             transition-all"
                >
                  Apply Now
                </motion.a>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
