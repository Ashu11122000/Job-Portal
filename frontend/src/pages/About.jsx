import { useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  FiTarget,
  FiTrendingUp,
  FiShield,
  FiAward,
  FiLayers,
  FiUsers,
  FiCpu,
  FiGlobe,
  FiBriefcase,
  FiCheckCircle,
  FiHeart,
} from "react-icons/fi";
import Footer from "../components/layout/Footer";

export default function About() {
  const { scrollYProgress } = useScroll();
  const yBg = useTransform(scrollYProgress, [0, 1], [0, -200]);

  useEffect(() => {
    document.title = "About Us | JobPortal";
    const metaDesc = document.querySelector("meta[name='description']");
    if (metaDesc) {
      metaDesc.setAttribute(
        "content",
        "JobPortal is India’s next-generation AI-driven job platform connecting talent with verified recruiters."
      );
    }
  }, []);

  return (
    <div className="w-full overflow-hidden bg-white">
      {/* ================= HERO ================= */}
      <section className="relative min-h-screen flex items-center justify-center bg-[radial-gradient(circle_at_top,#0f172a,#1e1b4b,#020617)] text-white overflow-hidden">
        {/* ✅ AURORA GLOW BACKGROUNDS */}
        <motion.div
          style={{ y: yBg }}
          className="absolute -top-112 -left-112 w-[1100px] h-[1100px] bg-indigo-500/30 rounded-full blur-[280px]"
        />
        <motion.div
          style={{ y: yBg }}
          className="absolute -bottom-80 -right-80 w-[900px] h-[900px] bg-purple-500/30 rounded-full blur-[300px]"
        />
        <motion.div
          animate={{ opacity: [0.4, 0.8, 0.4] }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute top-1/2 left-1/2 w-[600px] h-[600px] bg-sky-400/20 rounded-full blur-[200px]"
        />

        {/* ✅ MAIN CONTENT */}
        <div className="relative z-10 text-center px-6 max-w-6xl mx-auto">
          {/* ✅ PREMIUM BADGE */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center gap-2 mb-8 px-8 py-2 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 text-sm text-indigo-200"
          >
            ⚡ Trusted by 3,00,000+ Professionals & 12,000+ Companies
          </motion.div>

          {/* ✅ MAIN HEADLINE */}
          <motion.h1
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-6xl md:text-7xl font-black mb-8 bg-linear-to-r from-indigo-300 via-sky-300 to-purple-300 bg-clip-text text-transparent leading-tight"
          >
            Powering the Future of
            <br />
            <span className="text-white">Smart Hiring & Careers</span>
          </motion.h1>

          {/* ✅ SUBTITLE */}
          <motion.p
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="max-w-4xl mx-auto text-white/85 text-xl leading-relaxed"
          >
            JobPortal is building India’s most advanced AI-driven recruitment
            ecosystem powered by intelligent automation, real-time skill
            intelligence, verified employer networks, and enterprise-grade
            hiring infrastructure.
          </motion.p>

          {/* ✅ CTA BUTTONS */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-12 flex flex-wrap justify-center gap-6"
          >
            <a
              href="/jobs"
              className="bg-linear-to-r from-indigo-600 to-purple-600 text-white px-12 py-4 rounded-full font-semibold shadow-[0_20px_60px_rgba(99,102,241,0.6)] hover:scale-105 transition"
            >
              Explore Jobs
            </a>

            <a
              href="/register"
              className="border border-white/40 text-white px-12 py-4 rounded-full font-semibold backdrop-blur-xl hover:bg-white/10 transition"
            >
              Create Free Profile
            </a>
          </motion.div>

          {/* ✅ LIVE BUSINESS METRICS */}
          <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-10 max-w-5xl mx-auto">
            {[
              { label: "Active Professionals", value: "3,00,000+" },
              { label: "Verified Recruiters", value: "12,000+" },
              { label: "Daily AI Matches", value: "18,000+" },
              { label: "Hiring Accuracy", value: "96.4%" },
              { label: "Avg Time to Hire", value: "4.2 Days" },
              { label: "Enterprise Clients", value: "850+" },
              { label: "Annual Placements", value: "1,20,000+" },
              { label: "User Satisfaction", value: "4.9 ★" },
            ].map((item, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.08, y: -6 }}
                className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 shadow text-center"
              >
                <h3 className="text-3xl md:text-4xl font-black text-white">
                  {item.value}
                </h3>
                <p className="text-white/70 mt-1 text-sm tracking-wide">
                  {item.label}
                </p>
              </motion.div>
            ))}
          </div>

          {/* ✅ FEATURE HIGHLIGHTS STRIP */}
          <div className="mt-20 flex flex-wrap justify-center gap-8 text-white/80 text-sm">
            <div className="flex items-center gap-2">
              ✅ AI-Based Job Matching
            </div>
            <div className="flex items-center gap-2">
              ✅ 100% Verified Companies
            </div>
            <div className="flex items-center gap-2">
              ✅ Salary Intelligence Engine
            </div>
            <div className="flex items-center gap-2">
              ✅ Career Acceleration Tools
            </div>
            <div className="flex items-center gap-2">
              ✅ Enterprise-Grade Security
            </div>
          </div>
        </div>
      </section>
      {/* ================= ULTRA PREMIUM MISSION / VISION ================= */}
      <section className="relative py-40 overflow-hidden bg-linear-to-br from-slate-50 via-indigo-50 to-purple-50">
        {/* ✅ Ambient Aurora Background */}
        <motion.div
          animate={{ x: [0, 140, 0], y: [0, -90, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-72 -left-72 w-[800px] h-[800px] bg-indigo-400/25 rounded-full blur-[220px]"
        />
        <motion.div
          animate={{ x: [0, -120, 0], y: [0, 100, 0] }}
          transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -bottom-72 -right-72 w-[900px] h-[900px] bg-purple-400/25 rounded-full blur-[260px]"
        />

        {/* ✅ GLASS CONTENT WRAPPER — GUARANTEES VISIBILITY */}
        <div className="relative z-20 max-w-7xl mx-auto px-6 bg-white/70 backdrop-blur-2xl rounded-[3rem] p-12 md:p-16 shadow-[0_40px_120px_rgba(0,0,0,0.25)]">
          {/* ✅ Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="text-center mb-24"
          >
            <span className="inline-block mb-6 px-8 py-2 bg-white text-indigo-700 rounded-full text-sm font-bold shadow">
              🎯 Our Purpose & Direction
            </span>

            <h2 className="text-5xl md:text-6xl font-black text-slate-900 mb-6">
              Mission & Vision
            </h2>

            <p className="text-slate-700 text-xl max-w-3xl mx-auto leading-relaxed font-medium">
              The principles that define our platform, shape our technology, and
              drive our billion-scale ambition.
            </p>
          </motion.div>

          {/* ✅ Premium Grid */}
          <div className="grid md:grid-cols-2 gap-20 perspective-[1400px]">
            {/* ✅ MISSION CARD */}
            <motion.div
              whileHover={{ y: -14, rotateY: 6 }}
              transition={{ type: "spring", stiffness: 120 }}
              className="relative bg-white text-slate-800 backdrop-blur-2xl border border-indigo-200 rounded-[2.5rem] p-16 shadow-[0_40px_120px_rgba(79,70,229,0.35)] overflow-hidden"
            >
              <span className="inline-block mb-4 px-6 py-2 bg-indigo-100 text-indigo-700 rounded-full text-xs font-bold">
                Execution Strategy
              </span>

              <h3 className="text-4xl font-black mb-8 text-indigo-700">
                Our Mission
              </h3>

              <ul className="space-y-4 text-slate-700 font-medium text-lg mb-6">
                <li>✅ Remove hiring friction using AI automation</li>
                <li>✅ Empower professionals with career intelligence</li>
                <li>✅ Deliver high-confidence hiring for employers</li>
                <li>✅ Build fraud-proof verified recruitment flows</li>
              </ul>

              <p className="text-slate-600 text-lg leading-relaxed">
                We exist to make hiring faster, smarter, safer and fully
                data-driven at enterprise scale.
              </p>
            </motion.div>

            {/* ✅ VISION CARD */}
            <motion.div
              whileHover={{ y: -14, rotateY: -6 }}
              transition={{ type: "spring", stiffness: 120 }}
              className="relative bg-white text-slate-800 backdrop-blur-2xl border border-purple-200 rounded-[2.5rem] p-16 shadow-[0_40px_120px_rgba(147,51,234,0.35)] overflow-hidden"
            >
              <span className="inline-block mb-4 px-6 py-2 bg-purple-100 text-purple-700 rounded-full text-xs font-bold">
                Long-Term Ambition
              </span>

              <h3 className="text-4xl font-black mb-8 text-purple-700">
                Our Vision
              </h3>

              <ul className="space-y-4 text-slate-700 font-medium text-lg mb-6">
                <li>🌍 Become the global employment operating system</li>
                <li>🔗 Power cross-border hiring with trust infrastructure</li>
                <li>
                  🧠 Map skill-to-job paths using real-time AI intelligence
                </li>
                <li>🚀 Enable billion-scale employment globally</li>
              </ul>

              <p className="text-slate-600 text-lg leading-relaxed">
                We are building the most trusted digital employment
                infrastructure on the planet.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ================= GLOBAL IMPACT — ULTRA PREMIUM ================= */}
      <section className="relative py-40 overflow-hidden bg-linear-to-br from-slate-100 via-indigo-50 to-purple-100">
        {/* ✅ Dynamic Aurora Background */}
        <motion.div
          animate={{ x: [0, 140, 0], y: [0, -90, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-72 -left-72 w-[900px] h-[900px] bg-indigo-400/30 rounded-full blur-[250px]"
        />
        <motion.div
          animate={{ x: [0, -140, 0], y: [0, 120, 0] }}
          transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -bottom-72 -right-72 w-[900px] h-[900px] bg-purple-400/30 rounded-full blur-[280px]"
        />

        {/* ✅ Section Content Wrapper */}
        <div className="relative z-20 max-w-7xl mx-auto px-6">
          {/* ✅ Ultra Premium Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="text-center mb-24"
          >
            <span className="inline-block mb-6 px-10 py-2 bg-white/80 backdrop-blur-xl text-indigo-700 rounded-full text-sm font-bold shadow">
              🌍 Global Presence
            </span>

            <h2 className="text-5xl md:text-6xl font-black text-slate-900 mb-6">
              Global Impact & Scale
            </h2>

            <p className="text-slate-700 text-xl max-w-3xl mx-auto leading-relaxed font-medium">
              A planet-scale hiring intelligence network built on AI, trust, and
              enterprise-grade infrastructure.
            </p>
          </motion.div>

          {/* ✅ Ultra Premium Feature Grid */}
          <div className="grid md:grid-cols-4 gap-16 perspective-[1400px]">
            {[
              {
                icon: <FiGlobe />,
                title: "Global Reach",
                desc: "Operating in 14+ countries with real-time cross-border hiring compliance, payroll integration, and relocation pipelines.",
                accent: "indigo",
              },
              {
                icon: <FiCpu />,
                title: "AI Infrastructure",
                desc: "Processes over 1M+ skill-to-job matches daily using real-time machine learning pipelines.",
                accent: "purple",
              },
              {
                icon: <FiUsers />,
                title: "High Trust Network",
                desc: "Strict employer KYC with automated fraud detection and continuous compliance audits.",
                accent: "indigo",
              },
              {
                icon: <FiBriefcase />,
                title: "Enterprise Hiring",
                desc: "Serving Fortune 500 leaders, unicorn startups, PSU boards, and national workforce programs.",
                accent: "purple",
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12 }}
                whileHover={{ y: -16, rotateX: 8, rotateY: 6 }}
                className={`relative group bg-white/80 backdrop-blur-2xl border ${
                  item.accent === "indigo"
                    ? "border-indigo-200 shadow-[0_30px_90px_rgba(79,70,229,0.35)]"
                    : "border-purple-200 shadow-[0_30px_90px_rgba(147,51,234,0.35)]"
                } rounded-[2.5rem] p-12 text-center transition transform-gpu overflow-hidden`}
              >
                {/* ✅ Neon Edge Glow */}
                <div
                  className={`absolute inset-0 rounded-[2.5rem] opacity-0 group-hover:opacity-100 blur-2xl transition ${
                    item.accent === "indigo"
                      ? "bg-indigo-400/40"
                      : "bg-purple-400/40"
                  }`}
                />

                {/* ✅ Floating Icon Plate */}
                <div
                  className={`relative z-10 w-20 h-20 mx-auto mb-8 rounded-2xl flex items-center justify-center text-3xl shadow-xl ${
                    item.accent === "indigo"
                      ? "bg-linear-to-br from-indigo-500 to-indigo-700 text-white"
                      : "bg-linear-to-br from-purple-500 to-purple-700 text-white"
                  }`}
                >
                  {item.icon}
                </div>

                <h3 className="relative z-10 text-2xl font-extrabold text-slate-900 mb-4">
                  {item.title}
                </h3>

                <p className="relative z-10 text-slate-700 text-base leading-relaxed font-medium">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>

          {/* ✅ Executive Trust Metrics */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="mt-28 grid md:grid-cols-4 gap-12 text-center"
          >
            {[
              { value: "3M+", label: "Global Candidates" },
              { value: "120K+", label: "Verified Employers" },
              { value: "18 Countries", label: "Live Operations" },
              { value: "96.8%", label: "Hiring Accuracy" },
            ].map((stat, i) => (
              <div
                key={i}
                className="bg-white/80 backdrop-blur-xl p-8 rounded-3xl shadow border border-slate-200"
              >
                <h4 className="text-4xl font-black text-indigo-700">
                  {stat.value}
                </h4>
                <p className="text-slate-700 font-semibold mt-2">
                  {stat.label}
                </p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ================= CORE VALUES — ULTRA PREMIUM ================= */}
      <section className="relative py-40 overflow-hidden bg-linear-to-br from-white via-indigo-50 to-purple-50">
        {/* ✅ Ambient Motion Glow */}
        <motion.div
          animate={{ x: [0, 140, 0], y: [0, -120, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-72 -left-72 w-[900px] h-[900px] bg-indigo-400/25 rounded-full blur-[260px]"
        />
        <motion.div
          animate={{ x: [0, -140, 0], y: [0, 120, 0] }}
          transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -bottom-72 -right-72 w-[900px] h-[900px] bg-purple-400/25 rounded-full blur-[300px]"
        />

        <div className="relative z-10 max-w-7xl mx-auto px-6">
          {/* ✅ Premium Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="text-center mb-24"
          >
            <span className="inline-block mb-6 px-10 py-2 bg-white/80 backdrop-blur-xl text-indigo-700 rounded-full text-sm font-bold shadow">
              🧭 What Drives Us
            </span>

            <h2 className="text-5xl md:text-6xl font-black text-slate-900 mb-6">
              Our Core Values
            </h2>

            <p className="text-slate-700 text-xl max-w-3xl mx-auto leading-relaxed font-medium">
              The foundational principles that power our technology, guide our
              decisions, and protect millions of careers worldwide.
            </p>
          </motion.div>

          {/* ✅ Ultra Premium Value Grid */}
          <div className="grid md:grid-cols-3 gap-16 perspective-[1400px]">
            {[
              {
                icon: <FiShield />,
                title: "Trust & Security",
                desc: "Enterprise-grade encryption, strict compliance controls, zero tolerance for fraud, and always-on monitoring to protect every user.",
                accent: "indigo",
              },
              {
                icon: <FiHeart />,
                title: "Candidate First",
                desc: "Every product decision begins with the job seeker — simplifying access, accelerating growth, and maximizing opportunity.",
                accent: "purple",
              },
              {
                icon: <FiTrendingUp />,
                title: "Growth Driven",
                desc: "Continuous upskilling, AI-powered intelligence, and real-time labor market analytics to future-proof careers.",
                accent: "indigo",
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12 }}
                whileHover={{ y: -16, rotateX: 8, rotateY: 6 }}
                className={`relative group bg-white/85 backdrop-blur-2xl border ${
                  item.accent === "indigo"
                    ? "border-indigo-200 shadow-[0_30px_90px_rgba(79,70,229,0.35)]"
                    : "border-purple-200 shadow-[0_30px_90px_rgba(147,51,234,0.35)]"
                } rounded-[2.8rem] p-14 text-center transition transform-gpu overflow-hidden`}
              >
                {/* ✅ Neon Hover Glow */}
                <div
                  className={`absolute inset-0 rounded-[2.8rem] opacity-0 group-hover:opacity-100 blur-2xl transition ${
                    item.accent === "indigo"
                      ? "bg-indigo-400/40"
                      : "bg-purple-400/40"
                  }`}
                />

                {/* ✅ Floating Icon Plate */}
                <div
                  className={`relative z-10 w-20 h-20 mx-auto mb-8 rounded-2xl flex items-center justify-center text-3xl shadow-xl ${
                    item.accent === "indigo"
                      ? "bg-linear-to-br from-indigo-500 to-indigo-700 text-white"
                      : "bg-linear-to-br from-purple-500 to-purple-700 text-white"
                  }`}
                >
                  {item.icon}
                </div>

                <h3 className="relative z-10 text-2xl font-extrabold text-slate-900 mb-4">
                  {item.title}
                </h3>

                <p className="relative z-10 text-slate-700 text-base leading-relaxed font-medium">
                  {item.desc}
                </p>

                {/* ✅ Value Strength Indicator */}
                <div className="relative z-10 mt-8 h-1 w-24 mx-auto rounded-full bg-linear-to-r from-indigo-500 to-purple-500 shadow-[0_0_20px_rgba(99,102,241,0.8)]" />
              </motion.div>
            ))}
          </div>

          {/* ✅ Executive Value Metrics */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="mt-28 grid md:grid-cols-3 gap-12 text-center"
          >
            {[
              { value: "ISO 27001", label: "Security Certified" },
              { value: "Zero Breach", label: "Since Inception" },
              { value: "98.7%", label: "User Trust Index" },
            ].map((stat, i) => (
              <div
                key={i}
                className="bg-white/85 backdrop-blur-xl p-10 rounded-3xl shadow border border-slate-200"
              >
                <h4 className="text-4xl font-black text-indigo-700">
                  {stat.value}
                </h4>
                <p className="text-slate-700 font-semibold mt-2">
                  {stat.label}
                </p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>
      {/* ================= ULTRA PREMIUM AWARDS & RECOGNITION ================= */}
      <section className="relative py-40 overflow-hidden bg-linear-to-br from-indigo-50 via-white to-purple-50">
        {/* ✅ Floating Aurora Background */}
        <motion.div
          animate={{ x: [0, 160, 0], y: [0, -120, 0] }}
          transition={{ duration: 24, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-80 -left-80 w-[900px] h-[900px] bg-indigo-400/25 rounded-full blur-[280px]"
        />
        <motion.div
          animate={{ x: [0, -160, 0], y: [0, 120, 0] }}
          transition={{ duration: 28, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -bottom-80 -right-80 w-[900px] h-[900px] bg-purple-400/25 rounded-full blur-[300px]"
        />

        <div className="relative z-10 max-w-7xl mx-auto px-6">
          {/* ✅ Executive Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="text-center mb-28"
          >
            <span className="inline-block mb-6 px-10 py-2 bg-white/80 backdrop-blur-xl text-indigo-700 rounded-full text-sm font-bold shadow">
              🏆 Industry Recognition
            </span>

            <h2 className="text-5xl md:text-6xl font-black text-slate-900 mb-6">
              Awards & Recognition
            </h2>

            <p className="text-slate-700 text-xl max-w-3xl mx-auto leading-relaxed font-medium">
              Our commitment to excellence, security, and innovation has been
              recognized by leading industry bodies and global organizations.
            </p>
          </motion.div>

          {/* ✅ Ultra Premium Awards Grid */}
          <div className="grid md:grid-cols-3 gap-20 perspective-[1600px]">
            {[
              {
                title: "Top Startup of the Year – 2024",
                badge: "Government of India",
                glow: "indigo",
              },
              {
                title: "ISO 27001 Certified Company",
                badge: "Global Security Standard",
                glow: "purple",
              },
              {
                title: "Best HR-Tech Platform – Asia",
                badge: "Asia Tech Awards",
                glow: "indigo",
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12 }}
                whileHover={{ y: -20, rotateX: 10, rotateY: 8, scale: 1.05 }}
                className={`relative group bg-white/85 backdrop-blur-2xl border ${
                  item.glow === "indigo"
                    ? "border-indigo-200 shadow-[0_40px_120px_rgba(79,70,229,0.35)]"
                    : "border-purple-200 shadow-[0_40px_120px_rgba(147,51,234,0.35)]"
                } rounded-[3rem] p-16 text-center transition transform-gpu overflow-hidden`}
              >
                {/* ✅ Neon Award Glow */}
                <div
                  className={`absolute inset-0 rounded-[3rem] opacity-0 group-hover:opacity-100 blur-3xl transition ${
                    item.glow === "indigo"
                      ? "bg-indigo-400/40"
                      : "bg-purple-400/40"
                  }`}
                />

                {/* ✅ Floating Medal Icon */}
                <div
                  className={`relative z-10 w-24 h-24 mx-auto mb-10 rounded-2xl flex items-center justify-center text-4xl shadow-xl ${
                    item.glow === "indigo"
                      ? "bg-linear-to-br from-indigo-500 to-indigo-800 text-white"
                      : "bg-linear-to-br from-purple-500 to-purple-800 text-white"
                  }`}
                >
                  🏅
                </div>

                <h3 className="relative z-10 text-2xl font-extrabold text-slate-900 mb-4">
                  {item.title}
                </h3>

                <p className="relative z-10 text-slate-600 text-sm font-semibold uppercase tracking-wide mb-10">
                  {item.badge}
                </p>

                {/* ✅ Trust Meter */}
                <div className="relative z-10 mt-6">
                  <div className="h-1.5 w-full rounded-full bg-slate-200 overflow-hidden">
                    <div className="h-full w-[95%] bg-linear-to-r from-indigo-500 to-purple-600 shadow-[0_0_18px_rgba(99,102,241,0.8)]" />
                  </div>
                  <p className="text-xs text-slate-500 mt-3 font-semibold tracking-wider">
                    Industry Trust Score: 95%
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* ✅ Global Validation Strip */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="mt-32 grid md:grid-cols-4 gap-12 text-center"
          >
            {[
              { value: "14+", label: "Countries Recognized" },
              { value: "30+", label: "Industry Awards" },
              { value: "99.8%", label: "Compliance Accuracy" },
              { value: "ISO / SOC / GDPR", label: "Security Standards" },
            ].map((stat, i) => (
              <div
                key={i}
                className="bg-white/85 backdrop-blur-xl p-10 rounded-3xl shadow border border-slate-200"
              >
                <h4 className="text-4xl font-black text-indigo-700">
                  {stat.value}
                </h4>
                <p className="text-slate-700 font-semibold mt-2">
                  {stat.label}
                </p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ================= ROADMAP ================= */}
      <section className="py-32 bg-white">
        <SectionTitle title="Company Roadmap" />
        <div className="max-w-5xl mx-auto px-6">
          {[
            "2021 – Idea & Core Research",
            "2022 – Platform Launch",
            "2023 – 3L Job Seekers Achieved",
            "2024 – Global Hiring Enablement",
            "2025 – AI Hiring Brain v2 (Upcoming)",
          ].map((step, i) => (
            <motion.div
              key={i}
              whileInView={{ opacity: 1, x: 0 }}
              initial={{ opacity: 0, x: -60 }}
              className="flex items-center gap-8 mb-14"
            >
              <div className="w-14 h-14 rounded-full bg-indigo-600 text-white flex items-center justify-center shadow-xl">
                <FiLayers />
              </div>
              <p className="text-xl text-slate-700 font-medium">{step}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ================= ULTRA PREMIUM TEAM ================= */}
      <section className="relative py-40 overflow-hidden bg-linear-to-br from-slate-50 via-indigo-50 to-purple-50">
        {/* ✅ Ambient Glow */}
        <motion.div
          animate={{ x: [0, 140, 0], y: [0, -90, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-72 -left-72 w-[900px] h-[900px] bg-indigo-400/25 rounded-full blur-[240px]"
        />
        <motion.div
          animate={{ x: [0, -140, 0], y: [0, 120, 0] }}
          transition={{ duration: 26, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -bottom-72 -right-72 w-[900px] h-[900px] bg-purple-400/25 rounded-full blur-[260px]"
        />

        <div className="relative z-10 max-w-7xl mx-auto px-6">
          {/* ✅ Header */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="text-center mb-24"
          >
            <span className="inline-block mb-6 px-8 py-2 bg-white/70 backdrop-blur-xl text-indigo-700 rounded-full text-sm font-bold shadow">
              👑 Executive Leadership
            </span>

            <h2 className="text-5xl md:text-6xl font-black bg-linear-to-r from-indigo-600 via-sky-600 to-purple-600 bg-clip-text text-transparent mb-6">
              Leadership Team
            </h2>

            <p className="text-slate-600 text-xl max-w-3xl mx-auto leading-relaxed">
              Visionaries shaping the future of AI-powered hiring, global
              employment infrastructure and trusted talent ecosystems.
            </p>
          </motion.div>

          {/* ✅ Leadership Grid */}
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-16 perspective-[1400px]">
            {[
              {
                name: "Aarav Mehta",
                role: "Chief Executive Officer",
                tag: "Strategy & Vision",
                img: "https://i.pravatar.cc/150?img=21",
              },
              {
                name: "Priya Kapoor",
                role: "Chief Product Officer",
                tag: "AI Systems",
                img: "https://i.pravatar.cc/150?img=32",
              },
              {
                name: "Rohan Verma",
                role: "Chief Technology Officer",
                tag: "Platform Engineering",
                img: "https://i.pravatar.cc/150?img=45",
              },
              {
                name: "Neha Malhotra",
                role: "VP – Talent Intelligence",
                tag: "Hiring Algorithms",
                img: "https://i.pravatar.cc/150?img=56",
              },
            ].map((leader, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                whileHover={{
                  rotateX: -10,
                  rotateY: 10,
                  y: -18,
                  scale: 1.08,
                }}
                className="relative group transform-gpu"
              >
                {/* ✅ Neon Border */}
                <div className="absolute inset-0 rounded-3xl bg-linear-to-r from-indigo-500 to-purple-600 opacity-0 group-hover:opacity-100 blur-xl transition duration-500" />

                {/* ✅ Glass Leadership Card */}
                <div className="relative bg-white/85 backdrop-blur-2xl border border-white/50 rounded-3xl shadow-[0_30px_90px_rgba(79,70,229,0.3)] p-10 text-center">
                  {/* ✅ Avatar with Glow */}
                  <div className="relative mx-auto mb-8 w-28 h-28">
                    <div className="absolute inset-0 rounded-full bg-indigo-500 blur-lg opacity-40" />
                    <img
                      src={leader.img}
                      alt={leader.name}
                      className="relative w-28 h-28 rounded-full object-cover border-4 border-white shadow-xl"
                    />
                  </div>

                  {/* ✅ Name */}
                  <h4 className="text-xl font-black text-slate-900 mb-1">
                    {leader.name}
                  </h4>

                  {/* ✅ Role */}
                  <p className="text-indigo-700 font-semibold mb-4">
                    {leader.role}
                  </p>

                  {/* ✅ Expertise Tag */}
                  <span className="inline-block px-4 py-1 rounded-full text-xs font-bold bg-indigo-100 text-indigo-700 mb-6 shadow">
                    {leader.tag}
                  </span>

                  {/* ✅ Authority Statement */}
                  <p className="text-slate-600 text-sm leading-relaxed">
                    Driving innovation across enterprise hiring systems, AI
                    trust infrastructure, and global workforce transformation.
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= CAREER CTA ================= */}
      <section className="py-36 bg-linear-to-r from-indigo-700 to-purple-700 text-white text-center">
        <h2 className="text-5xl font-black mb-6">
          Join Us & Build the Hiring Infrastructure of Tomorrow
        </h2>

        <p className="text-white/80 mb-12 max-w-3xl mx-auto text-lg">
          We are always hiring engineers, AI researchers, recruiters and growth
          hackers to scale this mission globally.
        </p>

        <a
          href="/careers"
          className="inline-block bg-white text-indigo-700 px-14 py-4 rounded-full font-bold shadow-lg hover:scale-110 transition"
        >
          View Open Roles
        </a>
      </section>

      <Footer />
    </div>
  );
}

/* ✅ REUSABLE UI COMPONENTS */

function SectionTitle({ title }) {
  return (
    <h2 className="text-5xl font-black mb-20 text-center text-slate-900">
      {title}
    </h2>
  );
}

function PremiumCard({ title, children }) {
  return (
    <motion.div
      whileHover={{ y: -12 }}
      className="bg-white p-14 rounded-3xl shadow-[0_30px_90px_rgba(79,70,229,0.25)] border border-indigo-100"
    >
      <h2 className="text-4xl font-black mb-6 text-slate-900">{title}</h2>
      <p className="text-slate-600 text-lg leading-relaxed">{children}</p>
    </motion.div>
  );
}

function FeatureCard({ icon, title, desc }) {
  return (
    <motion.div
      whileHover={{ y: -14 }}
      className="bg-white p-12 rounded-3xl shadow-xl border border-indigo-100 text-center"
    >
      <div className="text-5xl text-indigo-600 mb-6 flex justify-center">
        {icon}
      </div>
      <h3 className="text-2xl font-bold mb-3 text-slate-900">{title}</h3>
      <p className="text-slate-600 leading-relaxed">{desc}</p>
    </motion.div>
  );
}

function ValueCard({ icon, title, desc }) {
  return (
    <motion.div
      whileHover={{ scale: 1.06 }}
      className="bg-white p-12 rounded-3xl shadow border"
    >
      <div className="text-4xl text-indigo-600 mb-6">{icon}</div>
      <h3 className="font-bold text-xl mb-3">{title}</h3>
      <p className="text-slate-600">{desc}</p>
    </motion.div>
  );
}

function AwardCard({ title }) {
  return (
    <motion.div
      whileHover={{ scale: 1.08 }}
      className="bg-white p-14 rounded-3xl shadow-xl text-center"
    >
      <FiAward className="text-5xl text-indigo-600 mx-auto mb-8" />
      <h3 className="font-extrabold text-xl text-slate-900">{title}</h3>
    </motion.div>
  );
}
