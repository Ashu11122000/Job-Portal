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
      <section className="relative pt-52 pb-44 bg-gradient-to-br from-indigo-950 via-indigo-900 to-purple-950 text-white overflow-hidden">
        {/* ✅ Deep Aurora Background */}
        <motion.div
          animate={{ x: [0, 160, 0], y: [0, -120, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-96 -left-96 w-[1100px] h-[1100px] bg-indigo-500/40 rounded-full blur-[300px]"
        />
        <motion.div
          animate={{ x: [0, -160, 0], y: [0, 140, 0] }}
          transition={{ duration: 24, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -bottom-96 -right-96 w-[1100px] h-[1100px] bg-purple-500/40 rounded-full blur-[320px]"
        />

        {/* ✅ Floating Particles */}
        <div className="absolute top-24 left-[20%] w-2 h-2 bg-white/50 rounded-full blur-sm animate-ping" />
        <div className="absolute bottom-32 right-[25%] w-2 h-2 bg-white/50 rounded-full blur-sm animate-ping delay-300" />
        <div className="absolute top-[60%] left-[10%] w-1.5 h-1.5 bg-white/40 rounded-full blur-sm animate-ping delay-700" />

        {/* ✅ Glass Overlay */}
        <div className="absolute inset-0 bg-black/10 backdrop-blur-[2px]" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
          {/* ✅ Floating Premium Badge */}
          <motion.span
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="inline-block mb-10 px-10 py-3 bg-white/10 backdrop-blur-2xl rounded-full text-sm font-bold border border-white/20 shadow-[0_0_40px_rgba(255,255,255,0.25)]"
          >
            🚀 JobPortal Knowledge Hub
          </motion.span>

          {/* ✅ Mega Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 80 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-6xl md:text-7xl xl:text-8xl font-black mb-10 leading-tight bg-gradient-to-r from-indigo-200 via-sky-200 to-purple-200 bg-clip-text text-transparent"
          >
            Career, Hiring & <br /> Tech Intelligence
          </motion.h1>

          {/* ✅ Luxury Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-white/90 max-w-4xl mx-auto text-xl md:text-2xl leading-relaxed mb-14"
          >
            Deep insights on AI recruitment, hiring strategies, salary trends,
            interview mastery, and real-world career growth stories — all
            powered by real industry data.
          </motion.p>

          {/* ✅ CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
            className="flex flex-col sm:flex-row justify-center gap-6 mb-20"
          >
            <a
              href="#latest"
              className="px-12 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full font-bold shadow-[0_20px_70px_rgba(99,102,241,0.7)] hover:scale-105 transition"
            >
              Explore Blogs
            </a>

            <a
              href="#subscribe"
              className="px-12 py-4 bg-white/15 backdrop-blur-xl border border-white/30 rounded-full font-bold shadow-lg hover:bg-white/25 transition"
            >
              Join Newsletter
            </a>
          </motion.div>

          {/* ✅ Live Platform Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-12 max-w-6xl mx-auto"
          >
            {[
              { label: "Active Readers", value: "1.2L+" },
              { label: "Published Blogs", value: "480+" },
              { label: "Hiring Experts", value: "90+" },
              { label: "Career Success", value: "96%" },
            ].map((item, i) => (
              <div
                key={i}
                className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 shadow-[0_20px_60px_rgba(0,0,0,0.4)]"
              >
                <h3 className="text-4xl font-black text-white mb-2">
                  {item.value}
                </h3>
                <p className="text-white/70 font-medium">{item.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ================= ULTRA PREMIUM BLOG STATS ================= */}
      <section className="relative py-28 overflow-hidden bg-gradient-to-br from-slate-100 via-indigo-50 to-purple-50">
        {/* ✅ Animated Glow Orbs */}
        <motion.div
          animate={{ x: [0, 120, 0], y: [0, -80, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-indigo-300/30 rounded-full blur-[180px]"
        />
        <motion.div
          animate={{ x: [0, -120, 0], y: [0, 100, 0] }}
          transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -bottom-40 -right-40 w-[520px] h-[520px] bg-purple-300/30 rounded-full blur-[200px]"
        />

        <div className="relative z-10 max-w-7xl mx-auto px-6">
          {/* ✅ Premium Section Title */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="text-center mb-20"
          >
            <span className="inline-block mb-6 px-8 py-2 bg-white/80 backdrop-blur-xl text-indigo-700 rounded-full text-sm font-bold shadow">
              📊 Platform Insights
            </span>

            <h2 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-indigo-600 via-sky-600 to-purple-600 bg-clip-text text-transparent">
              Trust Built on Knowledge
            </h2>

            <p className="text-slate-600 text-lg max-w-3xl mx-auto mt-6 leading-relaxed">
              Our insights drive career transformation for professionals and
              hiring success for recruiters across industries.
            </p>
          </motion.div>

          {/* ✅ Premium Dynamic Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
            {[
              { value: "450+", label: "Published Blogs" },
              { value: "120K+", label: "Monthly Readers" },
              { value: "95%", label: "Career Success Rate" },
              { value: "4.9★", label: "Reader Rating" },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -12, scale: 1.06 }}
                className="relative group"
              >
                {/* ✅ Glow Border */}
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-indigo-500 to-purple-500 opacity-0 group-hover:opacity-100 blur-xl transition duration-500" />

                {/* ✅ Glass Card */}
                <div className="relative bg-white/90 backdrop-blur-xl rounded-3xl p-12 shadow-[0_25px_80px_rgba(79,70,229,0.25)] border border-white/60">
                  <h3 className="text-5xl font-black text-indigo-700 mb-3">
                    {item.value}
                  </h3>
                  <p className="text-slate-700 font-semibold text-sm tracking-wide uppercase">
                    {item.label}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= ULTRA PREMIUM FEATURED BLOG ================= */}
      <section className="relative py-36 overflow-hidden bg-gradient-to-br from-slate-100 via-indigo-50 to-purple-50">
        {/* ✅ Animated Aurora Orbs */}
        <motion.div
          animate={{ x: [0, 140, 0], y: [0, -80, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-48 -left-48 w-[600px] h-[600px] bg-indigo-300/30 rounded-full blur-[220px]"
        />
        <motion.div
          animate={{ x: [0, -140, 0], y: [0, 120, 0] }}
          transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -bottom-48 -right-48 w-[650px] h-[650px] bg-purple-300/30 rounded-full blur-[260px]"
        />

        <div className="relative z-10 max-w-7xl mx-auto px-6">
          {/* ✅ Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="text-center mb-20"
          >
            <span className="inline-block mb-6 px-8 py-2 bg-white/80 backdrop-blur-xl text-indigo-700 rounded-full text-sm font-bold shadow">
              🔥 Editor’s Pick
            </span>

            <h2 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-indigo-600 via-sky-600 to-purple-600 bg-clip-text text-transparent">
              Featured Insight of the Week
            </h2>

            <p className="text-slate-600 text-lg max-w-3xl mx-auto mt-6 leading-relaxed">
              Deep analysis, hiring intelligence, and real-world success
              strategies curated by industry experts.
            </p>
          </motion.div>

          {/* ✅ Premium Featured Blog Card */}
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.04 }}
            transition={{ type: "spring", stiffness: 220 }}
            className="relative grid md:grid-cols-2 rounded-[2.5rem] overflow-hidden group shadow-[0_40px_120px_rgba(79,70,229,0.35)]"
          >
            {/* ✅ Glow Border */}
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 opacity-0 group-hover:opacity-100 blur-2xl transition duration-500" />

            {/* ✅ Image Section */}
            <div className="relative overflow-hidden">
              <img
                src={blogs[0].image}
                alt={blogs[0].title}
                className="h-full w-full object-cover scale-105 group-hover:scale-110 transition duration-700"
              />

              {/* ✅ Floating Tag */}
              <div className="absolute top-6 left-6 px-5 py-2 bg-black/60 backdrop-blur-md text-white text-xs font-bold rounded-full shadow">
                {blogs[0].tag}
              </div>
            </div>

            {/* ✅ Content Section */}
            <div className="relative bg-white/90 backdrop-blur-2xl p-14 flex flex-col justify-center border-l border-white/60">
              <span className="inline-flex items-center gap-2 mb-5 px-6 py-2 bg-indigo-100 text-indigo-700 rounded-full text-sm font-semibold w-fit">
                🚀 Trending Now
              </span>

              <h2 className="text-4xl md:text-5xl font-black mb-6 text-slate-900 leading-tight">
                {blogs[0].title}
              </h2>

              <p className="text-slate-600 mb-8 leading-relaxed text-lg">
                {blogs[0].desc}
              </p>

              {/* ✅ Author Meta */}
              <div className="flex flex-wrap items-center gap-8 text-slate-500 text-sm mb-10">
                <span className="flex items-center gap-2">
                  <FiUser className="text-indigo-600" /> {blogs[0].author}
                </span>
                <span className="flex items-center gap-2">
                  <FiCalendar className="text-indigo-600" /> {blogs[0].date}
                </span>
                <span className="flex items-center gap-2">⏱ 6 min read</span>
              </div>

              {/* ✅ CTA Button */}
              <a
                href="/blog-details"
                className="relative inline-flex items-center gap-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-12 py-4 rounded-full font-bold shadow-[0_20px_60px_rgba(79,70,229,0.45)] hover:scale-110 transition w-fit overflow-hidden group"
              >
                <span className="relative z-10 flex items-center gap-3">
                  Read Full Article <FiArrowRight />
                </span>
                <span className="absolute inset-0 bg-gradient-to-r from-purple-500 to-indigo-500 opacity-0 group-hover:opacity-20 transition" />
              </a>
            </div>
          </motion.div>
        </div>
      </section>
      {/* ================= ULTRA PREMIUM BLOG CATEGORIES ================= */}
      <section className="relative py-28 bg-gradient-to-br from-white via-indigo-50 to-purple-50 overflow-hidden">
        {/* ✅ Ambient Background Motion */}
        <motion.div
          animate={{ x: [0, 120, 0], y: [0, -80, 0] }}
          transition={{ duration: 24, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-40 -left-40 w-[520px] h-[520px] bg-indigo-300/30 rounded-full blur-[200px]"
        />
        <motion.div
          animate={{ x: [0, -120, 0], y: [0, 90, 0] }}
          transition={{ duration: 28, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -bottom-40 -right-40 w-[580px] h-[580px] bg-purple-300/30 rounded-full blur-[240px]"
        />

        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
          {/* ✅ Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="mb-16"
          >
            <span className="inline-flex items-center gap-2 mb-6 px-8 py-2 bg-white/80 backdrop-blur-xl text-indigo-700 rounded-full text-sm font-bold shadow">
              <FiTag className="text-indigo-600" /> Browse by Topic
            </span>

            <h2 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-indigo-600 via-sky-600 to-purple-600 bg-clip-text text-transparent mb-5">
              Blog Categories
            </h2>

            <p className="text-slate-600 text-lg max-w-3xl mx-auto leading-relaxed">
              Discover insights across AI hiring, career growth, salary
              research, resumes, interviews, and remote opportunities curated by
              experts.
            </p>
          </motion.div>

          {/* ✅ Premium Category Pills */}
          <div className="flex flex-wrap justify-center gap-8">
            {[
              "AI & Hiring",
              "Career Growth",
              "Interview Prep",
              "Remote Jobs",
              "Resume Tips",
              "Salary Insights",
            ].map((cat, i) => (
              <motion.span
                key={i}
                whileHover={{ y: -6, scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="relative group cursor-pointer"
              >
                {/* ✅ Neon Glow */}
                <span className="absolute inset-0 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 opacity-0 group-hover:opacity-30 blur-lg transition duration-500" />

                {/* ✅ Glass Category Capsule */}
                <span className="relative px-10 py-4 bg-white/80 backdrop-blur-xl text-indigo-700 rounded-full font-bold shadow-[0_10px_40px_rgba(79,70,229,0.25)] border border-white/60 transition">
                  {cat}
                </span>
              </motion.span>
            ))}
          </div>

          {/* ✅ Optional Micro Hint */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mt-10 text-slate-500 text-sm"
          >
            Click a category to explore expert-written articles and industry
            reports.
          </motion.p>
        </div>
      </section>

      {/* ================= ULTRA PREMIUM BLOG GRID ================= */}
      <section className="relative py-36 bg-gradient-to-br from-white via-indigo-50 to-purple-50 overflow-hidden">
        {/* ✅ Ambient Motion Background */}
        <motion.div
          animate={{ x: [0, 140, 0], y: [0, -90, 0] }}
          transition={{ duration: 28, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-64 -left-64 w-[720px] h-[720px] bg-indigo-300/25 rounded-full blur-[240px]"
        />
        <motion.div
          animate={{ x: [0, -120, 0], y: [0, 110, 0] }}
          transition={{ duration: 32, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -bottom-64 -right-64 w-[800px] h-[800px] bg-purple-300/25 rounded-full blur-[280px]"
        />

        <div className="relative z-10 max-w-7xl mx-auto px-6">
          {/* ✅ Premium Header */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="flex flex-col md:flex-row md:items-center md:justify-between mb-20"
          >
            <div className="flex items-center gap-4">
              <FiTrendingUp className="text-indigo-600 text-3xl" />
              <h2 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-indigo-600 via-sky-600 to-purple-600 bg-clip-text text-transparent">
                Latest Articles
              </h2>
            </div>

            <p className="mt-6 md:mt-0 text-slate-600 text-lg max-w-xl">
              Expert-curated insights, AI hiring trends, career strategies and
              real-world success playbooks updated weekly.
            </p>
          </motion.div>

          {/* ✅ Premium Blog Card Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-16">
            {blogs.map((blog, i) => (
              <motion.div
                key={blog.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                whileHover={{ y: -16, scale: 1.04 }}
                className="relative group rounded-[2rem] transform-gpu"
              >
                {/* ✅ Neon Border Glow */}
                <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-r from-indigo-500 to-purple-500 opacity-0 group-hover:opacity-30 blur-xl transition duration-500" />

                {/* ✅ Glass Blog Card */}
                <div className="relative bg-white/85 backdrop-blur-2xl border border-white/60 rounded-[2rem] shadow-[0_30px_90px_rgba(79,70,229,0.22)] overflow-hidden">
                  {/* ✅ Image with Zoom Effect */}
                  <div className="overflow-hidden">
                    <img
                      src={blog.image}
                      alt={blog.title}
                      className="w-full h-60 object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  </div>

                  {/* ✅ Card Content */}
                  <div className="p-10">
                    {/* ✅ Gradient Tag */}
                    <span className="inline-flex items-center mb-5 px-5 py-2 bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-700 rounded-full text-xs font-bold shadow w-fit">
                      {blog.tag}
                    </span>

                    <h3 className="text-2xl font-black mb-4 text-slate-900 leading-tight">
                      {blog.title}
                    </h3>

                    <p className="text-slate-600 mb-8 text-sm leading-relaxed">
                      {blog.desc}
                    </p>

                    {/* ✅ Meta Row */}
                    <div className="flex items-center justify-between text-slate-500 text-sm mb-8">
                      <span className="flex items-center gap-2">
                        <FiUser /> {blog.author}
                      </span>
                      <span className="flex items-center gap-2">
                        <FiCalendar /> {blog.date}
                      </span>
                    </div>

                    {/* ✅ Read CTA */}
                    <a
                      href={`/blog/${blog.id}`}
                      className="inline-flex items-center gap-3 font-bold text-indigo-600 group-hover:text-purple-600 transition"
                    >
                      Read Full Article{" "}
                      <FiArrowRight className="group-hover:translate-x-1 transition" />
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= ULTRA PREMIUM NEWSLETTER CTA ================= */}
      <section className="relative py-40 overflow-hidden bg-gradient-to-br from-indigo-800 via-purple-800 to-slate-900 text-white">
        {/* ✅ Animated Aurora Glow */}
        <motion.div
          animate={{ x: [0, 140, 0], y: [0, -90, 0] }}
          transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-72 -left-72 w-[900px] h-[900px] bg-indigo-400/25 rounded-full blur-[260px]"
        />
        <motion.div
          animate={{ x: [0, -140, 0], y: [0, 120, 0] }}
          transition={{ duration: 26, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -bottom-72 -right-72 w-[900px] h-[900px] bg-purple-400/25 rounded-full blur-[280px]"
        />

        {/* ✅ Floating Particles */}
        <div className="absolute top-24 left-[20%] w-2 h-2 bg-white/50 rounded-full blur-sm animate-ping" />
        <div className="absolute bottom-24 right-[22%] w-2 h-2 bg-white/50 rounded-full blur-sm animate-ping delay-300" />
        <div className="absolute top-1/2 right-[35%] w-1.5 h-1.5 bg-white/40 rounded-full blur-sm animate-ping delay-700" />

        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          {/* ✅ Floating Premium Badge */}
          <motion.span
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-3 mb-10 px-10 py-3 rounded-full text-sm font-bold bg-white/15 backdrop-blur-xl shadow-[0_0_40px_rgba(255,255,255,0.25)]"
          >
            <FiMail className="text-xl" /> Premium Career Alerts
          </motion.span>

          {/* ✅ Premium Headline */}
          <motion.h2
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="text-5xl md:text-7xl font-black mb-8 leading-tight tracking-tight"
          >
            Subscribe to{" "}
            <span className="bg-gradient-to-r from-indigo-200 via-sky-200 to-purple-200 bg-clip-text text-transparent">
              Career Intelligence
            </span>
          </motion.h2>

          {/* ✅ Luxury Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-white/85 max-w-3xl mx-auto mb-16 text-xl leading-relaxed"
          >
            Get weekly AI hiring trends, salary secrets, elite interview
            questions, top recruiter strategies and career acceleration
            blueprints delivered directly to your inbox.
          </motion.p>

          {/* ✅ Ultra Glass Subscription Capsule */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="relative max-w-3xl mx-auto flex flex-col sm:flex-row items-center gap-4 p-3 rounded-3xl bg-white/15 backdrop-blur-2xl border border-white/25 shadow-[0_30px_80px_rgba(124,58,237,0.55)]"
          >
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-indigo-400 to-purple-400 opacity-30 blur-xl" />

            {/* ✅ Email Input */}
            <div className="relative flex items-center gap-3 w-full bg-white/20 rounded-2xl px-6 py-4">
              <FiMail className="text-white text-xl" />
              <input
                type="email"
                placeholder="Enter your email address"
                className="w-full bg-transparent text-white placeholder-white/70 outline-none text-lg"
              />
            </div>

            {/* ✅ Subscribe Button */}
            <button className="relative overflow-hidden w-full sm:w-auto bg-gradient-to-r from-white to-indigo-100 text-indigo-800 px-10 py-4 rounded-2xl font-bold shadow-lg group transition-all">
              <span className="relative z-10 flex items-center gap-2">
                Subscribe Now
              </span>
              <span className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 opacity-0 group-hover:opacity-25 transition" />
            </button>
          </motion.div>

          {/* ✅ Trust & Privacy Line */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.7 }}
            className="mt-10 flex items-center justify-center gap-2 text-white/80 text-sm tracking-wide"
          >
            🔒 Zero spam • Bank-grade encryption • Unsubscribe anytime
          </motion.div>
        </div>
      </section>

      {/* ✅ FOOTER */}
      <Footer />
    </>
  );
}
