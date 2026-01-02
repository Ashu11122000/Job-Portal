import { motion } from "framer-motion";
import {
  FiArrowRight,
  FiUser,
  FiCalendar,
  FiBookmark,
  FiTrendingUp,
} from "react-icons/fi";

const blogs = [
  {
    id: 1,
    title: "10 Resume Mistakes That Are Costing You Interviews",
    category: "Resume Strategy",
    author: "Senior Career Advisor",
    date: "Aug 2025",
    image:
      "https://images.unsplash.com/photo-1586281380349-632531db7ed1?auto=format&fit=crop&w=1200&q=80",
    featured: true,
    readTime: "6 min read",
  },
  {
    id: 2,
    title: "Top 7 Skills Every Full Stack Developer Must Have in 2025",
    category: "Tech Skills",
    author: "Hiring Manager",
    date: "Aug 2025",
    image:
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80",
    readTime: "5 min read",
  },
  {
    id: 3,
    title: "How to Crack Your First Technical Interview as a Fresher",
    category: "Freshers Guide",
    author: "Interview Coach",
    date: "Jul 2025",
    image:
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80",
    readTime: "7 min read",
  },
];

export default function BlogSection() {
  const featured = blogs.find((b) => b.featured);
  const rest = blogs.filter((b) => !b.featured);

  return (
    <section
      className="relative w-full py-40 overflow-hidden
                        bg-gradient-to-b from-[#eef2ff] via-white to-[#faf5ff]"
    >
      {/* ================= AMBIENT EDITORIAL LIGHT ================= */}
      <motion.div
        animate={{ x: [0, 160, 0], y: [0, -140, 0] }}
        transition={{ duration: 32, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-[520px] -left-[500px]
                   w-[900px] h-[900px]
                   bg-indigo-400/25 rounded-full blur-[260px]"
      />
      <motion.div
        animate={{ x: [0, -160, 0], y: [0, 140, 0] }}
        transition={{ duration: 36, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -bottom-[520px] -right-[500px]
                   w-[900px] h-[900px]
                   bg-purple-400/25 rounded-full blur-[300px]"
      />

      {/* Subtle editorial glass */}
      <div
        className="absolute inset-0 bg-gradient-to-b
                      from-white/45 via-transparent to-transparent
                      backdrop-blur-[2px]"
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
            className="inline-flex items-center gap-2 mb-6 px-8 py-2
                           rounded-full text-sm font-semibold
                           bg-white/70 backdrop-blur-xl
                           border border-white/40
                           text-indigo-700 shadow-lg shadow-indigo-200/40"
          >
            <FiTrendingUp />
            Career Intelligence Hub
          </span>

          <h2
            className="text-6xl font-black tracking-tight
                         bg-gradient-to-r from-indigo-700 via-blue-600 to-purple-600
                         bg-clip-text text-transparent
                         drop-shadow-[0_10px_30px_rgba(79,70,229,0.35)]"
          >
            Insights That Shape Careers
          </h2>

          <p className="text-slate-600 mt-6 text-xl max-w-3xl mx-auto leading-relaxed">
            Editorial-grade career insights written by hiring managers,
            interviewers, and industry experts — focused on real outcomes.
          </p>

          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: 180 }}
            transition={{ duration: 1 }}
            className="mx-auto mt-10 h-[4px] rounded-full
                       bg-gradient-to-r from-indigo-500 via-blue-500 to-purple-600
                       shadow-[0_0_28px_rgba(99,102,241,0.8)]"
          />
        </motion.div>

        {/* ================= FEATURED ARTICLE ================= */}
        <div className="grid lg:grid-cols-2 gap-20 mb-28">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 120 }}
            className="relative group rounded-3xl overflow-hidden
                       shadow-[0_40px_130px_rgba(0,0,0,0.3)]"
          >
            <img
              src={featured.image}
              alt={featured.title}
              className="w-full h-[460px] object-cover
                         group-hover:scale-110 transition duration-700"
            />

            <div
              className="absolute inset-0 bg-gradient-to-t
                            from-black/80 via-black/45 to-transparent"
            />

            <div className="absolute bottom-0 p-10 text-white max-w-xl">
              <span
                className="inline-flex items-center gap-2 mb-4 px-6 py-1
                               rounded-full text-xs font-bold
                               bg-indigo-600 shadow-lg"
              >
                Featured Article
              </span>

              <h3 className="text-4xl font-bold leading-snug mb-5 drop-shadow-md">
                {featured.title}
              </h3>

              <div className="flex items-center gap-6 text-white/80 text-sm mb-8">
                <span className="flex items-center gap-2">
                  <FiUser /> {featured.author}
                </span>
                <span className="flex items-center gap-2">
                  <FiCalendar /> {featured.date}
                </span>
                <span>{featured.readTime}</span>
              </div>

              <a
                href={`/blog/${featured.id}`}
                className="inline-flex items-center gap-2
                           bg-white text-indigo-700 px-8 py-3 rounded-full
                           font-semibold shadow-lg hover:scale-105 transition"
              >
                Read Full Story <FiArrowRight />
              </a>
            </div>
          </motion.div>

          {/* ================= SECONDARY ARTICLES ================= */}
          <div className="space-y-14">
            {rest.map((blog, index) => (
              <motion.div
                key={blog.id}
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
                whileHover={{ y: -6, scale: 1.03 }}
                className="group flex gap-8
                           bg-white/85 backdrop-blur-xl
                           border border-white/40 rounded-3xl
                           overflow-hidden
                           shadow-lg hover:shadow-[0_30px_100px_rgba(79,70,229,0.35)]
                           transition"
              >
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="w-52 h-48 object-cover
                             group-hover:scale-110 transition duration-700"
                />

                <div className="p-7 flex-1">
                  <span
                    className="inline-block mb-3 px-4 py-1
                                   rounded-full text-xs font-semibold
                                   bg-gradient-to-r from-indigo-100 to-purple-100
                                   text-indigo-700"
                  >
                    {blog.category}
                  </span>

                  <h4
                    className="text-xl font-semibold text-slate-900
                                 mb-3 leading-snug
                                 group-hover:text-indigo-700 transition"
                  >
                    {blog.title}
                  </h4>

                  <div
                    className="flex items-center justify-between
                                  text-slate-500 text-sm mb-4"
                  >
                    <span className="flex items-center gap-2">
                      <FiUser /> {blog.author}
                    </span>
                    <span className="flex items-center gap-2">
                      <FiCalendar /> {blog.date}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-slate-400 text-sm">
                      {blog.readTime}
                    </span>

                    <a
                      href={`/blog/${blog.id}`}
                      className="inline-flex items-center gap-2
                                 text-indigo-600 font-semibold
                                 group-hover:underline"
                    >
                      Read Article <FiArrowRight />
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ================= CTA ================= */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-center"
        >
          <motion.a
            href="/blog"
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.96 }}
            className="inline-flex items-center gap-3
                       bg-gradient-to-r from-indigo-600 to-purple-600
                       text-white px-18 py-6 rounded-full
                       text-lg font-bold
                       shadow-[0_22px_90px_rgba(99,102,241,0.6)]
                       transition-all"
          >
            Explore All Articles <FiBookmark />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
