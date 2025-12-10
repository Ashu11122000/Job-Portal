import { motion } from "framer-motion";
import { FiArrowRight, FiUser, FiCalendar, FiBookmark } from "react-icons/fi";

const blogs = [
  {
    id: 1,
    title: "10 Resume Mistakes That Are Costing You Interviews",
    category: "Resume Tips",
    author: "Career Expert",
    date: "Aug 2025",
    image:
      "https://images.unsplash.com/photo-1586281380349-632531db7ed1?auto=format&fit=crop&w=1200&q=80",
    featured: true,
  },
  {
    id: 2,
    title: "Top 7 Skills Every Full Stack Developer Must Have",
    category: "Tech Skills",
    author: "Hiring Manager",
    date: "Aug 2025",
    image:
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 3,
    title: "How to Crack Your First Technical Interview as a Fresher",
    category: "Freshers",
    author: "Interview Coach",
    date: "Jul 2025",
    image:
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80",
  },
];

export default function BlogSection() {
  const featured = blogs.find((b) => b.featured);
  const rest = blogs.filter((b) => !b.featured);

  return (
    <section className="relative w-full py-36 overflow-hidden bg-[radial-gradient(circle_at_top,var(--color-indigo-100),white,var(--color-purple-100))]">
      {/* ✅ Aurora Glow */}
      <motion.div
        animate={{ x: [0, 120, 0], y: [0, -90, 0] }}
        transition={{ duration: 24, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-64 -left-64 w-[740px] h-[740px] bg-indigo-400/25 rounded-full blur-[200px]"
      />
      <motion.div
        animate={{ x: [0, -120, 0], y: [0, 90, 0] }}
        transition={{ duration: 28, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -bottom-64 -right-64 w-[740px] h-[740px] bg-purple-400/25 rounded-full blur-[220px]"
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
          <span className="inline-block mb-6 px-8 py-2 rounded-full text-sm font-semibold bg-white/70 backdrop-blur-xl text-indigo-700 shadow-[0_0_22px_rgba(99,102,241,0.35)]">
            📚 Career Intelligence Hub
          </span>

          <h2 className="text-6xl font-black bg-linear-to-r from-indigo-600 via-blue-600 to-purple-600 bg-clip-text text-transparent tracking-tight">
            Career Tips & Expert Insights
          </h2>

          <p className="text-slate-600 mt-6 text-xl max-w-2xl mx-auto leading-relaxed">
            Editorial-grade career guidance crafted by hiring managers, mentors,
            and industry leaders.
          </p>

          <div className="mt-10 flex justify-center">
            <div className="h-1 w-44 rounded-full bg-linear-to-r from-indigo-500 via-blue-500 to-purple-500 shadow-[0_0_25px_rgba(99,102,241,0.8)]" />
          </div>
        </motion.div>

        {/* ✅ MAGAZINE LAYOUT */}
        <div className="grid lg:grid-cols-2 gap-14 mb-20">
          {/* ✅ FEATURED ARTICLE */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.02 }}
            className="relative group rounded-3xl overflow-hidden shadow-[0_30px_80px_rgba(0,0,0,0.25)]"
          >
            <img
              src={featured.image}
              alt={featured.title}
              className="w-full h-[420px] object-cover group-hover:scale-110 transition duration-700"
            />

            {/* Glass Overlay */}
            <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/30 to-transparent" />

            {/* Content */}
            <div className="absolute bottom-0 p-10 text-white">
              <span className="inline-block mb-4 px-5 py-1 rounded-full text-xs font-semibold bg-indigo-600 shadow">
                Featured
              </span>

              <h3 className="text-3xl font-bold leading-tight mb-4 max-w-lg">
                {featured.title}
              </h3>

              <div className="flex items-center gap-5 text-white/80 text-sm mb-6">
                <span className="flex items-center gap-2">
                  <FiUser /> {featured.author}
                </span>
                <span className="flex items-center gap-2">
                  <FiCalendar /> {featured.date}
                </span>
              </div>

              <a
                href={`/blog/${featured.id}`}
                className="inline-flex items-center gap-2 bg-white text-indigo-700 px-8 py-3 rounded-full font-semibold hover:scale-105 transition"
              >
                Read Full Story <FiArrowRight />
              </a>
            </div>
          </motion.div>

          {/* ✅ SECONDARY ARTICLES */}
          <div className="space-y-10">
            {rest.map((blog, index) => (
              <motion.div
                key={blog.id}
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -6, scale: 1.02 }}
                className="group flex gap-6 bg-white/80 backdrop-blur-xl border border-white/40 rounded-3xl overflow-hidden shadow-lg hover:shadow-[0_20px_60px_rgba(99,102,241,0.35)] transition-all"
              >
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="w-48 h-40 object-cover group-hover:scale-110 transition duration-500"
                />

                <div className="p-6 flex-1">
                  <span className="inline-block mb-2 px-4 py-1 rounded-full text-xs font-semibold bg-linear-to-r from-indigo-100 to-purple-100 text-indigo-700">
                    {blog.category}
                  </span>

                  <h4 className="text-xl font-semibold text-slate-800 mb-3 leading-snug">
                    {blog.title}
                  </h4>

                  <div className="flex items-center justify-between text-slate-500 text-sm">
                    <div className="flex items-center gap-2">
                      <FiUser /> {blog.author}
                    </div>
                    <div className="flex items-center gap-2">
                      <FiCalendar /> {blog.date}
                    </div>
                  </div>

                  <a
                    href={`/blog/${blog.id}`}
                    className="inline-flex items-center gap-2 mt-4 text-indigo-600 font-semibold hover:underline"
                  >
                    Read More <FiArrowRight />
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ✅ ULTRA CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-center"
        >
          <a
            href="/blog"
            className="inline-flex items-center gap-3 bg-linear-to-r from-indigo-600 to-purple-600 text-white px-16 py-5 rounded-full font-bold shadow-[0_15px_50px_rgba(99,102,241,0.6)] hover:scale-105 transition-all"
          >
            Explore All Articles <FiBookmark />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
