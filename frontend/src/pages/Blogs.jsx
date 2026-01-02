import { motion } from "framer-motion";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import {
  FiCalendar,
  FiUser,
  FiArrowRight,
  FiTrendingUp,
  FiTag,
  FiMail,
  FiBookOpen,
  FiStar,
} from "react-icons/fi";

const blogs = [
  {
    id: 1,
    title: "How AI is Transforming the Hiring Industry",
    desc: "Discover how artificial intelligence is reshaping recruitment, from resume screening to predictive hiring.",
    author: "Admin",
    date: "Aug 12, 2025",
    tag: "AI & Hiring",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 2,
    title: "Top 10 Skills You Must Learn in 2025",
    desc: "These in-demand skills will future-proof your career in the tech and corporate world.",
    author: "Career Team",
    date: "Aug 5, 2025",
    tag: "Career Growth",
    image:
      "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 3,
    title: "How to Crack FAANG Interviews",
    desc: "Step-by-step guide to prepare for coding rounds, system design, and HR interviews.",
    author: "Interview Coach",
    date: "July 28, 2025",
    tag: "Interview Prep",
    image:
      "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 4,
    title: "Remote Jobs: The Future of Work",
    desc: "Explore why remote jobs are booming and how you can land a high-paying remote role.",
    author: "Global Hiring",
    date: "July 20, 2025",
    tag: "Remote Work",
    image:
      "https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?auto=format&fit=crop&w=900&q=80",
  },
];

export default function Blogs() {
  return (
    <>
      {/* ✅ NAVBAR */}
      <Navbar />

      {/* ================= ULTRA PREMIUM HERO ================= */}
      <section className="relative pt-56 pb-48 bg-linear-to-br from-indigo-950 via-[#0f172a] to-purple-950 text-white overflow-hidden">
        {/* ================= BACKGROUND DEPTH ================= */}
        {/* Aurora Layer 1 */}
        <motion.div
          animate={{ x: [0, 180, 0], y: [0, -140, 0] }}
          transition={{ duration: 26, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-[30rem] -left-[30rem] w-[1200px] h-[1200px] bg-indigo-500/35 rounded-full blur-[320px]"
        />

        {/* Aurora Layer 2 */}
        <motion.div
          animate={{ x: [0, -200, 0], y: [0, 160, 0] }}
          transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -bottom-[30rem] -right-[30rem] w-[1300px] h-[1300px] bg-purple-500/35 rounded-full blur-[360px]"
        />

        {/* Soft Radial Glow */}
        <div className="absolute inset-0 bg-radial-[at_top] from-white/10 via-transparent to-transparent" />

        {/* ================= FLOATING PARTICLES ================= */}
        {[...Array(8)].map((_, i) => (
          <motion.span
            key={i}
            animate={{ y: [0, -40, 0], opacity: [0.3, 0.8, 0.3] }}
            transition={{
              duration: 6 + i,
              repeat: Infinity,
              delay: i * 0.4,
            }}
            className="absolute w-1.5 h-1.5 rounded-full bg-white/60 blur-sm"
            style={{
              top: `${20 + i * 8}%`,
              left: `${10 + i * 9}%`,
            }}
          />
        ))}

        {/* ================= GLASS OVERLAY ================= */}
        <div className="absolute inset-0 bg-black/20 backdrop-blur-[3px]" />

        {/* ================= CONTENT ================= */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
          {/* Premium Badge */}
          <motion.span
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9 }}
            className="inline-flex items-center gap-3 mb-12 px-12 py-3 rounded-full
                 bg-white/10 backdrop-blur-2xl border border-white/20
                 text-sm font-bold shadow-[0_0_50px_rgba(255,255,255,0.25)]"
          >
            ✨ JobPortal Knowledge Hub
          </motion.span>

          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 90 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1 }}
            className="text-6xl md:text-7xl xl:text-8xl font-black mb-12 leading-tight
                 bg-linear-to-r from-indigo-200 via-sky-200 to-purple-200
                 bg-clip-text text-transparent drop-shadow-[0_10px_40px_rgba(0,0,0,0.6)]"
          >
            Career, Hiring & <br /> Tech Intelligence
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="max-w-4xl mx-auto text-xl md:text-2xl text-white/90
                 leading-relaxed mb-16"
          >
            AI-powered hiring insights, salary intelligence, interview mastery
            and real-world career growth strategies — crafted from real industry
            data.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
            className="flex flex-col sm:flex-row justify-center gap-8 mb-24"
          >
            <a
              href="#latest"
              className="relative group px-14 py-5 rounded-full font-bold
                   bg-linear-to-r from-indigo-600 to-purple-600
                   shadow-[0_25px_80px_rgba(99,102,241,0.7)]
                   hover:scale-110 transition overflow-hidden"
            >
              <span className="relative z-10">Explore Blogs</span>
              <span className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition" />
            </a>

            <a
              href="#subscribe"
              className="px-14 py-5 rounded-full font-bold
                   bg-white/15 backdrop-blur-xl border border-white/30
                   shadow-xl hover:bg-white/25 hover:scale-105 transition"
            >
              Join Newsletter
            </a>
          </motion.div>

          {/* Live Stats */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-12 max-w-6xl mx-auto"
          >
            {[
              { label: "Active Readers", value: "1.2L+" },
              { label: "Published Blogs", value: "480+" },
              { label: "Hiring Experts", value: "90+" },
              { label: "Career Success", value: "96%" },
            ].map((item, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -12, scale: 1.08 }}
                className="bg-white/10 backdrop-blur-xl rounded-3xl p-10
                     border border-white/20
                     shadow-[0_25px_70px_rgba(0,0,0,0.5)]"
              >
                <h3 className="text-4xl font-black mb-2">{item.value}</h3>
                <p className="text-white/70 font-medium">{item.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ================= ULTRA PREMIUM BLOG STATS ================= */}
      <section className="relative py-32 overflow-hidden bg-linear-to-br from-slate-50 via-indigo-50 to-purple-50">
        {/* ================= BACKGROUND AMBIENCE ================= */}
        <motion.div
          animate={{ x: [0, 140, 0], y: [0, -100, 0] }}
          transition={{ duration: 26, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-48 -left-48 w-[600px] h-[600px] bg-indigo-300/25 rounded-full blur-[220px]"
        />
        <motion.div
          animate={{ x: [0, -160, 0], y: [0, 120, 0] }}
          transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -bottom-48 -right-48 w-[650px] h-[650px] bg-purple-300/25 rounded-full blur-[260px]"
        />

        {/* Subtle Grain Overlay (Luxury Feel) */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.6),transparent_55%)]" />

        <div className="relative z-10 max-w-7xl mx-auto px-6">
          {/* ================= SECTION HEADER ================= */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="text-center mb-24"
          >
            <span
              className="inline-flex items-center gap-2 mb-6 px-10 py-3 
                       bg-white/80 backdrop-blur-xl 
                       text-indigo-700 rounded-full 
                       text-sm font-bold shadow-lg"
            >
              📊 Platform Insights
            </span>

            <h2
              className="text-4xl md:text-5xl font-black mb-6
                     bg-linear-to-r from-indigo-700 via-sky-700 to-purple-700
                     bg-clip-text text-transparent"
            >
              Trust Built on Knowledge
            </h2>

            <p className="text-slate-600 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
              Data-driven insights that accelerate careers, empower recruiters,
              and deliver measurable hiring outcomes across industries.
            </p>
          </motion.div>

          {/* ================= PREMIUM STATS GRID ================= */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-14">
            {[
              { value: "450+", label: "Published Blogs" },
              { value: "120K+", label: "Monthly Readers" },
              { value: "95%", label: "Career Success Rate" },
              { value: "4.9★", label: "Reader Satisfaction" },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12 }}
                whileHover={{ y: -14, scale: 1.08 }}
                className="relative group"
              >
                {/* Glow Edge */}
                <div
                  className="absolute inset-0 rounded-3xl 
                          bg-linear-to-r from-indigo-400 to-purple-400 
                          opacity-0 group-hover:opacity-40 blur-2xl transition duration-500"
                />

                {/* Glass Card */}
                <div
                  className="relative bg-white/85 backdrop-blur-2xl
                          rounded-3xl p-14
                          border border-white/60
                          shadow-[0_30px_90px_rgba(79,70,229,0.25)]"
                >
                  <h3
                    className="text-5xl font-black mb-3
                           bg-linear-to-r from-indigo-700 to-purple-700
                           bg-clip-text text-transparent"
                  >
                    {item.value}
                  </h3>

                  <p className="text-slate-700 font-semibold text-sm tracking-widest uppercase">
                    {item.label}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= ULTRA PREMIUM FEATURED BLOG ================= */}
      <section className="relative py-40 overflow-hidden bg-linear-to-br from-slate-50 via-indigo-50 to-purple-50">
        {/* ================= AMBIENT BACKGROUND LIGHT ================= */}
        <motion.div
          animate={{ x: [0, 160, 0], y: [0, -100, 0] }}
          transition={{ duration: 28, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-56 -left-56 w-[700px] h-[700px] bg-indigo-300/25 rounded-full blur-[260px]"
        />
        <motion.div
          animate={{ x: [0, -180, 0], y: [0, 140, 0] }}
          transition={{ duration: 32, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -bottom-56 -right-56 w-[760px] h-[760px] bg-purple-300/25 rounded-full blur-[300px]"
        />

        {/* Soft Light Wash */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.7),transparent_60%)]" />

        <div className="relative z-10 max-w-7xl mx-auto px-6">
          {/* ================= SECTION HEADER ================= */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="text-center mb-24"
          >
            <span
              className="inline-flex items-center gap-2 mb-6 px-10 py-3
                       bg-white/80 backdrop-blur-xl
                       text-indigo-700 rounded-full
                       text-sm font-bold shadow-lg"
            >
              🔥 Editor’s Pick
            </span>

            <h2
              className="text-4xl md:text-5xl font-black mb-6
                     bg-linear-to-r from-indigo-700 via-sky-700 to-purple-700
                     bg-clip-text text-transparent"
            >
              Featured Insight of the Week
            </h2>

            <p className="text-slate-600 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
              Deep-dive analysis, hiring intelligence and real-world success
              strategies curated by industry leaders and practitioners.
            </p>
          </motion.div>

          {/* ================= FEATURED BLOG CARD ================= */}
          <motion.div
            initial={{ opacity: 0, y: 70 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.03 }}
            transition={{ type: "spring", stiffness: 180 }}
            className="relative grid md:grid-cols-2 rounded-[2.8rem] overflow-hidden group
                 shadow-[0_50px_140px_rgba(79,70,229,0.35)]"
          >
            {/* Glow Edge */}
            <div
              className="absolute inset-0 bg-linear-to-r from-indigo-400 to-purple-400
                      opacity-0 group-hover:opacity-40 blur-3xl transition duration-500"
            />

            {/* ================= IMAGE PANEL ================= */}
            <div className="relative overflow-hidden">
              <img
                src={blogs[0].image}
                alt={blogs[0].title}
                className="h-full w-full object-cover scale-105
                     group-hover:scale-115 transition duration-700"
              />

              {/* Tag Badge */}
              <div
                className="absolute top-8 left-8 px-6 py-2
                        bg-slate-900/70 backdrop-blur-md
                        text-slate-100 text-xs font-bold
                        rounded-full shadow-lg"
              >
                {blogs[0].tag}
              </div>
            </div>

            {/* ================= CONTENT PANEL ================= */}
            <div
              className="relative bg-white/85 backdrop-blur-2xl
                      p-16 flex flex-col justify-center
                      border-l border-white/60"
            >
              <span
                className="inline-flex items-center gap-2 mb-6 px-7 py-2
                         bg-indigo-100 text-indigo-700
                         rounded-full text-sm font-semibold w-fit"
              >
                🚀 Trending Now
              </span>

              <h3
                className="text-4xl md:text-5xl font-black mb-6
                       text-slate-900 leading-tight"
              >
                {blogs[0].title}
              </h3>

              <p className="text-slate-600 mb-10 leading-relaxed text-lg">
                {blogs[0].desc}
              </p>

              {/* Meta Info */}
              <div
                className="flex flex-wrap items-center gap-8
                        text-slate-500 text-sm mb-12"
              >
                <span className="flex items-center gap-2">
                  <FiUser className="text-indigo-600" />
                  {blogs[0].author}
                </span>
                <span className="flex items-center gap-2">
                  <FiCalendar className="text-indigo-600" />
                  {blogs[0].date}
                </span>
                <span>⏱ 6 min read</span>
              </div>

              {/* CTA */}
              <a
                href="/blog-details"
                className="relative inline-flex items-center gap-3
                     px-14 py-5 rounded-full font-bold
                     bg-linear-to-r from-indigo-600 to-purple-600
                     text-slate-100
                     shadow-[0_25px_80px_rgba(79,70,229,0.45)]
                     hover:scale-110 transition w-fit overflow-hidden group"
              >
                <span className="relative z-10 flex items-center gap-3">
                  Read Full Article <FiArrowRight />
                </span>
                <span
                  className="absolute inset-0 bg-white/20 opacity-0
                           group-hover:opacity-100 transition"
                />
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ================= ULTRA PREMIUM BLOG CATEGORIES ================= */}
      <section className="relative py-32 overflow-hidden bg-linear-to-br from-slate-50 via-indigo-50 to-purple-50">
        {/* ================= AMBIENT LIGHT BACKGROUND ================= */}
        <motion.div
          animate={{ x: [0, 150, 0], y: [0, -110, 0] }}
          transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-52 -left-52 w-[640px] h-[640px] bg-indigo-300/25 rounded-full blur-[260px]"
        />
        <motion.div
          animate={{ x: [0, -170, 0], y: [0, 130, 0] }}
          transition={{ duration: 34, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -bottom-52 -right-52 w-[700px] h-[700px] bg-purple-300/25 rounded-full blur-[300px]"
        />

        {/* Soft Light Texture */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.65),transparent_60%)]" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
          {/* ================= SECTION HEADER ================= */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="mb-20"
          >
            <span
              className="inline-flex items-center gap-2 mb-6 px-10 py-3
                       bg-white/85 backdrop-blur-xl
                       text-indigo-700 rounded-full
                       text-sm font-bold shadow-lg"
            >
              <FiTag className="text-indigo-600" /> Browse by Topic
            </span>

            <h2
              className="text-4xl md:text-5xl font-black mb-6
                     bg-linear-to-r from-indigo-700 via-sky-700 to-purple-700
                     bg-clip-text text-transparent"
            >
              Explore Blog Categories
            </h2>

            <p className="text-slate-600 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
              Explore expert insights across AI hiring, career development,
              salary intelligence, resumes, interviews and global remote
              opportunities.
            </p>
          </motion.div>

          {/* ================= CATEGORY CAPSULES ================= */}
          <div className="flex flex-wrap justify-center gap-10">
            {[
              { label: "AI & Hiring", accent: "from-indigo-400 to-indigo-600" },
              { label: "Career Growth", accent: "from-sky-400 to-sky-600" },
              {
                label: "Interview Prep",
                accent: "from-purple-400 to-purple-600",
              },
              {
                label: "Remote Jobs",
                accent: "from-emerald-400 to-emerald-600",
              },
              { label: "Resume Tips", accent: "from-amber-400 to-amber-600" },
              { label: "Salary Insights", accent: "from-rose-400 to-rose-600" },
            ].map((cat, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -10, scale: 1.08 }}
                whileTap={{ scale: 0.96 }}
                className="relative group cursor-pointer"
              >
                {/* Accent Glow */}
                <div
                  className={`absolute inset-0 rounded-full blur-xl opacity-0 
                        group-hover:opacity-40 transition duration-500 
                        bg-linear-to-r ${cat.accent}`}
                />

                {/* Capsule */}
                <div
                  className="relative px-12 py-5
                          bg-white/85 backdrop-blur-2xl
                          text-slate-800
                          rounded-full font-bold
                          border border-white/60
                          shadow-[0_15px_50px_rgba(79,70,229,0.25)]
                          transition"
                >
                  {cat.label}
                </div>
              </motion.div>
            ))}
          </div>

          {/* ================= MICRO COPY ================= */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="mt-12 text-slate-500 text-sm tracking-wide"
          >
            Select a category to unlock curated insights and expert-written
            content.
          </motion.p>
        </div>
      </section>

      {/* ================= ULTRA PREMIUM BLOG GRID ================= */}
      <section className="relative py-40 overflow-hidden bg-linear-to-br from-slate-50 via-indigo-50 to-purple-50">
        {/* ================= AMBIENT LIGHT MOTION ================= */}
        <motion.div
          animate={{ x: [0, 160, 0], y: [0, -120, 0] }}
          transition={{ duration: 34, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-72 -left-72 w-[760px] h-[760px] bg-indigo-300/20 rounded-full blur-[280px]"
        />
        <motion.div
          animate={{ x: [0, -180, 0], y: [0, 140, 0] }}
          transition={{ duration: 38, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -bottom-72 -right-72 w-[840px] h-[840px] bg-purple-300/20 rounded-full blur-[320px]"
        />

        {/* Soft Light Wash */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.65),transparent_65%)]" />

        <div className="relative z-10 max-w-7xl mx-auto px-6">
          {/* ================= SECTION HEADER ================= */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="flex flex-col md:flex-row md:items-end md:justify-between mb-24"
          >
            <div className="max-w-2xl">
              <div className="flex items-center gap-4 mb-6">
                <FiTrendingUp className="text-indigo-600 text-3xl" />
                <span className="text-sm font-bold text-indigo-700 tracking-wide uppercase">
                  Latest Updates
                </span>
              </div>

              <h2
                className="text-4xl md:text-5xl font-black mb-6
                       bg-linear-to-r from-indigo-700 via-sky-700 to-purple-700
                       bg-clip-text text-transparent"
              >
                Latest Articles & Insights
              </h2>

              <p className="text-slate-600 text-lg md:text-xl leading-relaxed">
                Editorial-grade insights on AI hiring, career acceleration,
                salary intelligence and real-world interview success — updated
                weekly.
              </p>
            </div>

            <a
              href="/blogs"
              className="mt-10 md:mt-0 inline-flex items-center gap-2
                   font-bold text-indigo-700 hover:text-purple-700 transition"
            >
              View all articles <FiArrowRight />
            </a>
          </motion.div>

          {/* ================= BLOG GRID ================= */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-20">
            {blogs.map((blog, i) => (
              <motion.article
                key={blog.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12 }}
                whileHover={{ y: -18 }}
                className="relative group"
              >
                {/* Glow Edge */}
                <div
                  className="absolute inset-0 rounded-[2.5rem]
                          bg-linear-to-r from-indigo-400 to-purple-400
                          opacity-0 group-hover:opacity-35 blur-2xl transition duration-500"
                />

                {/* Card */}
                <div
                  className="relative bg-white/85 backdrop-blur-2xl
                          rounded-[2.5rem] overflow-hidden
                          border border-white/60
                          shadow-[0_35px_110px_rgba(79,70,229,0.25)]"
                >
                  {/* Image */}
                  <div className="relative overflow-hidden">
                    <img
                      src={blog.image}
                      alt={blog.title}
                      className="w-full h-64 object-cover
                           transition-transform duration-700
                           group-hover:scale-110"
                    />

                    {/* Floating Tag */}
                    <span
                      className="absolute top-6 left-6 px-5 py-2
                               bg-white/85 backdrop-blur-xl
                               text-indigo-700
                               text-xs font-bold
                               rounded-full shadow"
                    >
                      {blog.tag}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="p-12">
                    <h3
                      className="text-2xl font-black mb-4
                             text-slate-900 leading-tight"
                    >
                      {blog.title}
                    </h3>

                    <p className="text-slate-600 mb-10 leading-relaxed text-sm">
                      {blog.desc}
                    </p>

                    {/* Meta */}
                    <div
                      className="flex items-center justify-between
                              text-slate-500 text-sm mb-8"
                    >
                      <span className="flex items-center gap-2">
                        <FiUser className="text-indigo-600" />
                        {blog.author}
                      </span>
                      <span className="flex items-center gap-2">
                        <FiCalendar className="text-indigo-600" />
                        {blog.date}
                      </span>
                    </div>

                    {/* CTA */}
                    <a
                      href={`/blog/${blog.id}`}
                      className="inline-flex items-center gap-3
                           font-bold text-indigo-700
                           hover:text-purple-700 transition"
                    >
                      Read Full Article
                      <FiArrowRight className="transition group-hover:translate-x-1" />
                    </a>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* ================= ULTRA PREMIUM TRENDING BLOGS ================= */}
      <section className="relative py-32 overflow-hidden bg-linear-to-br from-slate-50 via-indigo-50 to-purple-50">
        {/* ================= AMBIENT BACKGROUND ================= */}
        <motion.div
          animate={{ x: [0, 120, 0], y: [0, -90, 0] }}
          transition={{ duration: 26, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-48 -left-48 w-[600px] h-[600px] bg-indigo-300/25 rounded-full blur-[240px]"
        />
        <motion.div
          animate={{ x: [0, -140, 0], y: [0, 110, 0] }}
          transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -bottom-48 -right-48 w-[650px] h-[650px] bg-purple-300/25 rounded-full blur-[280px]"
        />

        {/* Soft Editorial Light */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.6),transparent_65%)]" />

        <div className="relative z-10 max-w-7xl mx-auto px-6">
          {/* ================= HEADER ================= */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="flex flex-col md:flex-row md:items-end md:justify-between mb-20"
          >
            <div>
              <span
                className="inline-flex items-center gap-2 mb-5 px-8 py-2
                         bg-white/85 backdrop-blur-xl
                         text-indigo-700 rounded-full
                         text-sm font-bold shadow"
              >
                🔥 Trending Now
              </span>

              <h2
                className="text-4xl md:text-5xl font-black
                       bg-linear-to-r from-indigo-700 via-sky-700 to-purple-700
                       bg-clip-text text-transparent"
              >
                Trending This Week
              </h2>
            </div>

            <a
              href="/blogs"
              className="mt-8 md:mt-0 inline-flex items-center gap-2
                   font-bold text-indigo-700 hover:text-purple-700 transition"
            >
              View all articles
              <span className="text-lg">→</span>
            </a>
          </motion.div>

          {/* ================= TRENDING CARDS ================= */}
          <div className="grid md:grid-cols-2 gap-16">
            {blogs.slice(0, 2).map((blog, i) => (
              <motion.article
                key={blog.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                whileHover={{ y: -14 }}
                className="relative group"
              >
                {/* Glow Edge */}
                <div
                  className="absolute inset-0 rounded-[2.2rem]
                          bg-linear-to-r from-indigo-400 to-purple-400
                          opacity-0 group-hover:opacity-35 blur-2xl transition duration-500"
                />

                {/* Card */}
                <div
                  className="relative flex gap-10
                          bg-white/85 backdrop-blur-2xl
                          rounded-[2.2rem] p-10
                          border border-white/60
                          shadow-[0_35px_100px_rgba(79,70,229,0.25)]"
                >
                  {/* Image */}
                  <div className="relative shrink-0 overflow-hidden rounded-2xl">
                    <img
                      src={blog.image}
                      alt={blog.title}
                      className="w-44 h-32 object-cover
                           transition-transform duration-700
                           group-hover:scale-110"
                    />
                  </div>

                  {/* Content */}
                  <div className="flex flex-col justify-center">
                    <span
                      className="inline-block mb-3 text-sm font-bold
                               text-indigo-700 tracking-wide"
                    >
                      {blog.tag}
                    </span>

                    <h3
                      className="text-2xl font-black mb-3
                             text-slate-900 leading-snug"
                    >
                      {blog.title}
                    </h3>

                    <p className="text-slate-600 text-sm leading-relaxed line-clamp-2">
                      {blog.desc}
                    </p>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* ================= ULTRA PREMIUM LEARNING PATHS ================= */}
      <section className="relative py-40 overflow-hidden bg-linear-to-br from-slate-900 via-indigo-900 to-purple-900">
        {/* ================= AMBIENT LIGHT LAYERS ================= */}
        <motion.div
          animate={{ x: [0, 160, 0], y: [0, -120, 0] }}
          transition={{ duration: 34, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-72 -left-72 w-[820px] h-[820px] bg-indigo-500/25 rounded-full blur-[320px]"
        />
        <motion.div
          animate={{ x: [0, -180, 0], y: [0, 140, 0] }}
          transition={{ duration: 38, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -bottom-72 -right-72 w-[900px] h-[900px] bg-purple-500/25 rounded-full blur-[360px]"
        />

        {/* Soft Dark Texture */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.08),transparent_65%)]" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
          {/* ================= HEADER ================= */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="mb-24"
          >
            <span
              className="inline-flex items-center gap-2 mb-6 px-10 py-3
                       bg-white/85 backdrop-blur-xl
                       text-indigo-800 rounded-full
                       text-sm font-bold shadow-lg"
            >
              🎯 Career Roadmaps
            </span>

            <h2
              className="text-5xl md:text-6xl font-black mb-6
                     bg-linear-to-r from-indigo-200 via-sky-200 to-purple-200
                     bg-clip-text text-transparent"
            >
              Guided Career Learning Paths
            </h2>

            <p
              className="max-w-3xl mx-auto text-lg md:text-xl
                    text-slate-300 leading-relaxed"
            >
              Structured learning journeys designed by industry experts to help
              you master interviews, future-ready skills, and global careers.
            </p>
          </motion.div>

          {/* ================= PATH CARDS ================= */}
          <div className="grid md:grid-cols-3 gap-16">
            {[
              {
                title: "FAANG Interview Mastery",
                accent: "from-indigo-400 to-indigo-600",
              },
              {
                title: "AI & Future Hiring",
                accent: "from-sky-400 to-sky-600",
              },
              {
                title: "Remote Career Blueprint",
                accent: "from-purple-400 to-purple-600",
              },
            ].map((path, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                whileHover={{ y: -18 }}
                className="relative group"
              >
                {/* Glow Edge */}
                <div
                  className={`absolute inset-0 rounded-[2.8rem]
                        bg-linear-to-r ${path.accent}
                        opacity-0 group-hover:opacity-35 blur-3xl transition duration-500`}
                />

                {/* Card */}
                <div
                  className="relative bg-white/90 backdrop-blur-2xl
                          rounded-[2.8rem] p-16
                          border border-white/60
                          shadow-[0_40px_120px_rgba(0,0,0,0.45)]"
                >
                  <FiBookOpen className="text-5xl mb-10 mx-auto text-indigo-700" />

                  <h3 className="text-2xl font-black mb-6 text-slate-900">
                    {path.title}
                  </h3>

                  <p className="text-slate-600 mb-10 leading-relaxed">
                    Expert-curated blogs, step-by-step roadmaps, interview prep
                    strategies and real-world insights tailored to your goals.
                  </p>

                  <button
                    className="inline-flex items-center justify-center
                               px-12 py-4 rounded-full
                               font-bold
                               bg-linear-to-r from-indigo-600 to-purple-600
                               text-slate-100
                               shadow-[0_20px_60px_rgba(79,70,229,0.5)]
                               hover:scale-110 transition"
                  >
                    Start Learning Path
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= ULTRA PREMIUM EXPERT AUTHORS ================= */}
      <section className="relative py-40 overflow-hidden bg-linear-to-br from-slate-50 via-indigo-50 to-purple-50">
        {/* ================= AMBIENT BACKGROUND LIGHT ================= */}
        <motion.div
          animate={{ x: [0, 140, 0], y: [0, -100, 0] }}
          transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-56 -left-56 w-[700px] h-[700px] bg-indigo-300/25 rounded-full blur-[280px]"
        />
        <motion.div
          animate={{ x: [0, -160, 0], y: [0, 120, 0] }}
          transition={{ duration: 34, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -bottom-56 -right-56 w-[760px] h-[760px] bg-purple-300/25 rounded-full blur-[320px]"
        />

        {/* Soft Editorial Light */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.65),transparent_60%)]" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
          {/* ================= HEADER ================= */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="mb-24"
          >
            <span
              className="inline-flex items-center gap-2 mb-6 px-10 py-3
                       bg-white/85 backdrop-blur-xl
                       text-indigo-700 rounded-full
                       text-sm font-bold shadow-lg"
            >
              🧠 Our Experts
            </span>

            <h2
              className="text-4xl md:text-5xl font-black mb-6
                     bg-linear-to-r from-indigo-700 via-sky-700 to-purple-700
                     bg-clip-text text-transparent"
            >
              Meet Our Industry Experts
            </h2>

            <p className="max-w-3xl mx-auto text-slate-600 text-lg md:text-xl leading-relaxed">
              Learn from seasoned professionals who bring real-world hiring,
              interview and career expertise across global industries.
            </p>
          </motion.div>

          {/* ================= EXPERT CARDS ================= */}
          <div className="grid md:grid-cols-4 gap-16">
            {[
              {
                role: "AI Hiring Specialist",
                accent: "from-indigo-400 to-indigo-600",
              },
              {
                role: "FAANG Interview Coach",
                accent: "from-sky-400 to-sky-600",
              },
              {
                role: "HR Strategy Leader",
                accent: "from-purple-400 to-purple-600",
              },
              {
                role: "Remote Work Advisor",
                accent: "from-emerald-400 to-emerald-600",
              },
            ].map((expert, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                whileHover={{ y: -16 }}
                className="relative group"
              >
                {/* Glow Edge */}
                <div
                  className={`absolute inset-0 rounded-[2.6rem]
                        bg-linear-to-r ${expert.accent}
                        opacity-0 group-hover:opacity-35
                        blur-3xl transition duration-500`}
                />

                {/* Card */}
                <div
                  className="relative bg-white/90 backdrop-blur-2xl
                          rounded-[2.6rem] p-12
                          border border-white/60
                          shadow-[0_35px_110px_rgba(79,70,229,0.25)]"
                >
                  {/* Avatar */}
                  <div
                    className={`w-28 h-28 mx-auto mb-8 rounded-full
                          bg-linear-to-r ${expert.accent}
                          shadow-[0_15px_50px_rgba(79,70,229,0.45)]`}
                  />

                  <h4 className="text-xl font-black text-slate-900 mb-2">
                    Expert {i + 1}
                  </h4>

                  <p className="text-slate-600 text-sm font-medium tracking-wide">
                    {expert.role}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= ULTRA PREMIUM NEWSLETTER CTA ================= */}
      <section className="relative py-44 overflow-hidden bg-linear-to-br from-slate-900 via-indigo-900 to-purple-900">
        {/* ================= AMBIENT AURORA ================= */}
        <motion.div
          animate={{ x: [0, 160, 0], y: [0, -120, 0] }}
          transition={{ duration: 32, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-80 -left-80 w-[1000px] h-[1000px] bg-indigo-500/25 rounded-full blur-[320px]"
        />
        <motion.div
          animate={{ x: [0, -180, 0], y: [0, 150, 0] }}
          transition={{ duration: 36, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -bottom-80 -right-80 w-[1050px] h-[1050px] bg-purple-500/25 rounded-full blur-[360px]"
        />

        {/* Soft Dark Texture */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.08),transparent_65%)]" />

        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          {/* ================= BADGE ================= */}
          <motion.span
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-3 mb-12 px-12 py-3
                 rounded-full bg-white/85 backdrop-blur-xl
                 text-indigo-800 text-sm font-bold shadow-lg"
          >
            <FiMail className="text-lg" />
            Career Intelligence Alerts
          </motion.span>

          {/* ================= HEADLINE ================= */}
          <motion.h2
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="text-5xl md:text-7xl font-black mb-10 leading-tight
                 bg-linear-to-r from-indigo-200 via-sky-200 to-purple-200
                 bg-clip-text text-transparent"
          >
            Subscribe to Career Intelligence
          </motion.h2>

          {/* ================= DESCRIPTION ================= */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="max-w-3xl mx-auto mb-20
                 text-slate-300 text-lg md:text-xl leading-relaxed"
          >
            Weekly insights on AI hiring trends, salary benchmarks, elite
            interview strategies, recruiter playbooks, and proven career
            acceleration paths — delivered with zero noise.
          </motion.p>

          {/* ================= SUBSCRIBE CAPSULE ================= */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="relative max-w-3xl mx-auto
                 flex flex-col sm:flex-row items-center gap-4
                 p-4 rounded-[2.6rem]
                 bg-white/85 backdrop-blur-2xl
                 border border-white/60
                 shadow-[0_35px_120px_rgba(0,0,0,0.55)]"
          >
            {/* Subtle Inner Glow */}
            <div
              className="absolute inset-0 rounded-[2.6rem]
                      bg-linear-to-r from-indigo-400 to-purple-400
                      opacity-20 blur-2xl"
            />

            {/* Email Input */}
            <div
              className="relative flex items-center gap-4
                      w-full bg-slate-100 rounded-2xl
                      px-6 py-4"
            >
              <FiMail className="text-indigo-600 text-xl" />
              <input
                type="email"
                placeholder="Enter your email address"
                className="w-full bg-transparent
                     text-slate-800 placeholder-slate-500
                     outline-none text-lg"
              />
            </div>

            {/* Subscribe Button */}
            <button
              className="relative overflow-hidden
                         w-full sm:w-auto
                         px-12 py-4 rounded-2xl
                         font-bold
                         bg-linear-to-r from-indigo-600 to-purple-600
                         text-slate-100
                         shadow-[0_20px_60px_rgba(79,70,229,0.6)]
                         hover:scale-110 transition"
            >
              <span className="relative z-10">Subscribe Now</span>
              <span
                className="absolute inset-0 bg-white/20 opacity-0
                         hover:opacity-100 transition"
              />
            </button>
          </motion.div>

          {/* ================= TRUST LINE ================= */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.7 }}
            className="mt-12 text-slate-400 text-sm tracking-wide"
          >
            🔒 Zero spam • Bank-grade security • Unsubscribe anytime
          </motion.div>
        </div>
      </section>

      {/* ================= ULTRA PREMIUM TESTIMONIALS ================= */}
      <section className="relative py-40 overflow-hidden bg-linear-to-br from-slate-50 via-indigo-50 to-purple-50">
        {/* ================= AMBIENT LIGHT ================= */}
        <motion.div
          animate={{ x: [0, 140, 0], y: [0, -100, 0] }}
          transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-56 -left-56 w-[700px] h-[700px] bg-indigo-300/25 rounded-full blur-[280px]"
        />
        <motion.div
          animate={{ x: [0, -160, 0], y: [0, 120, 0] }}
          transition={{ duration: 34, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -bottom-56 -right-56 w-[760px] h-[760px] bg-purple-300/25 rounded-full blur-[320px]"
        />

        {/* Soft Editorial Highlight */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.6),transparent_65%)]" />

        <div className="relative z-10 max-w-7xl mx-auto px-6">
          {/* ================= HEADER ================= */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="text-center mb-24"
          >
            <span
              className="inline-flex items-center gap-2 mb-6 px-10 py-3
                       bg-white/85 backdrop-blur-xl
                       text-indigo-700 rounded-full
                       text-sm font-bold shadow-lg"
            >
              ⭐ Reader Stories
            </span>

            <h2
              className="text-4xl md:text-5xl font-black
                     bg-linear-to-r from-indigo-700 via-sky-700 to-purple-700
                     bg-clip-text text-transparent mb-6"
            >
              Loved by Professionals Worldwide
            </h2>

            <p className="max-w-3xl mx-auto text-slate-600 text-lg leading-relaxed">
              Real experiences from engineers, HR leaders, and remote
              professionals who transformed their careers using our insights.
            </p>
          </motion.div>

          {/* ================= TESTIMONIAL CARDS ================= */}
          <div className="grid md:grid-cols-3 gap-16">
            {[
              {
                name: "Rahul Mehta",
                role: "Software Engineer @ Amazon",
                quote:
                  "These blogs helped me crack FAANG interviews. The insights are practical, relevant, and aligned with real interview expectations.",
              },
              {
                name: "Ananya Singh",
                role: "HR Lead @ Startup",
                quote:
                  "AI hiring and salary trend articles are incredibly accurate and helped us make confident hiring decisions.",
              },
              {
                name: "Karan Patel",
                role: "Remote Developer",
                quote:
                  "The remote job guides completely changed my approach. I landed a global role within just three months.",
              },
            ].map((t, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                whileHover={{ y: -16 }}
                className="relative group"
              >
                {/* Glow Edge */}
                <div
                  className="absolute inset-0 rounded-[2.6rem]
                          bg-linear-to-r from-indigo-400 to-purple-400
                          opacity-0 group-hover:opacity-35
                          blur-3xl transition duration-500"
                />

                {/* Card */}
                <div
                  className="relative bg-white/90 backdrop-blur-2xl
                          rounded-[2.6rem] p-12
                          border border-white/60
                          shadow-[0_35px_110px_rgba(79,70,229,0.25)]"
                >
                  <FiStar className="text-indigo-600 text-2xl mb-6" />

                  <p className="text-slate-600 mb-8 leading-relaxed text-base">
                    “{t.quote}”
                  </p>

                  <div className="pt-4 border-t border-slate-200">
                    <h4 className="font-bold text-slate-900">{t.name}</h4>
                    <span className="text-sm text-slate-500">{t.role}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ✅ FOOTER */}
      <Footer />
    </>
  );
}
