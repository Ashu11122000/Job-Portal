import { useEffect } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  animate,
} from "framer-motion";
import {
  FiShield,
  FiTrendingUp,
  FiUsers,
  FiCpu,
  FiGlobe,
  FiBriefcase,
  FiLayers,
  FiHeart,
} from "react-icons/fi";
import Footer from "../components/layout/Footer";

/* ================= ANIMATED COUNTER (SAFE) ================= */
/* ================= ULTRA PREMIUM ANIMATED COUNTER ================= */
function AnimatedCounter({ value, suffix = "" }) {
  const count = useMotionValue(0);

  // Rounded + formatted value
  const rounded = useTransform(count, (v) =>
    Math.round(v).toLocaleString()
  );

  // Glow pulse when animation completes
  const glow = useMotionValue(0);
  const glowShadow = useTransform(
    glow,
    [0, 1],
    [
      "0 0 0 rgba(99,102,241,0)",
      "0 0 28px rgba(99,102,241,0.9)",
    ]
  );

  useEffect(() => {
    const main = animate(count, value, {
      duration: 2.4,
      ease: [0.16, 1, 0.3, 1], // premium easing
    });

    const pulse = animate(glow, 1, {
      delay: 2.1,
      duration: 0.6,
      ease: "easeOut",
    });

    return () => {
      main.stop();
      pulse.stop();
    };
  }, [value]);

  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      style={{ textShadow: glowShadow }}
      className="
        inline-flex items-baseline gap-1
        tabular-nums
        font-black
        bg-gradient-to-r from-indigo-300 via-sky-300 to-purple-300
        bg-clip-text text-transparent
        tracking-tight
      "
    >
      {/* Animated Number */}
      <motion.span>{rounded}</motion.span>

      {/* Animated Suffix */}
      {suffix && (
        <motion.span
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.4 }}
          className="text-sm md:text-base font-bold text-slate-300"
        >
          {suffix}
        </motion.span>
      )}
    </motion.span>
  );
}


/* ================= ULTRA PREMIUM SECTION ================= */
function Section({ children, light = false }) {
  return (
    <section
      className={`relative isolate py-36 overflow-hidden ${
        light
          ? "bg-white"
          : "bg-gradient-to-b from-slate-50 via-white to-slate-50"
      }`}
    >
      {/* Ambient Gradient Glow */}
      <div
        className={`
          pointer-events-none absolute inset-0 -z-10
          ${
            light
              ? "bg-[radial-gradient(circle_at_20%_10%,rgba(99,102,241,0.08),transparent_40%),radial-gradient(circle_at_80%_90%,rgba(147,51,234,0.08),transparent_45%)]"
              : "bg-[radial-gradient(circle_at_20%_10%,rgba(99,102,241,0.12),transparent_45%),radial-gradient(circle_at_80%_90%,rgba(147,51,234,0.12),transparent_50%)]"
          }
        `}
      />

      {/* Soft Noise Overlay (Luxury Texture) */}
      <div
        className="
          pointer-events-none absolute inset-0 -z-10
          bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9Im5vbmUiIC8+PC9zdmc+')]
          opacity-[0.015]
        "
      />

      {/* Content Reveal */}
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-120px" }}
        transition={{
          duration: 1,
          ease: [0.16, 1, 0.3, 1], // premium easing
        }}
        className="relative z-10"
      >
        {children}
      </motion.div>
    </section>
  );
}


/* ================= ABOUT PAGE ================= */
export default function About() {
  const { scrollYProgress } = useScroll();
  const yBg = useTransform(scrollYProgress, [0, 1], [0, -180]);

  useEffect(() => {
    document.title = "About Us | JobPortal";
  }, []);

  return (
    <div className="w-full overflow-hidden bg-white">
      {/* Scroll Progress */}
      <motion.div
        style={{ scaleX: scrollYProgress }}
        className="fixed top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-indigo-500 via-sky-500 to-purple-500 z-50 origin-left"
      />

<section className="relative min-h-screen flex items-center justify-center isolate overflow-hidden">
  {/* ====== Base Background ====== */}
  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#020617,#0f172a,#020617)]" />

  {/* ====== Aurora Glow Layers ====== */}
  <motion.div
    style={{ y: yBg }}
    className="absolute -top-[32rem] -left-[32rem] w-[1100px] h-[1100px] bg-indigo-500/30 blur-[320px] rounded-full"
  />
  <motion.div
    style={{ y: yBg }}
    className="absolute -bottom-[30rem] -right-[30rem] w-[1000px] h-[1000px] bg-purple-500/30 blur-[340px] rounded-full"
  />

  {/* ====== Subtle Blue Highlight ====== */}
  <motion.div
    animate={{ opacity: [0.15, 0.35, 0.15] }}
    transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
    className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-sky-400/20 blur-[280px] rounded-full"
  />

  {/* ====== Luxury Noise Texture ====== */}
  <div
    className="absolute inset-0 opacity-[0.025] mix-blend-soft-light pointer-events-none"
    style={{
      backgroundImage:
        "url('https://grainy-gradients.vercel.app/noise.svg')",
    }}
  />

  {/* ====== Content ====== */}
  <div className="relative z-10 text-center px-6 max-w-6xl">
    {/* Premium Badge */}
    <motion.span
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="inline-flex items-center gap-2 mb-10 px-8 py-2 rounded-full
      bg-white/5 border border-white/10 backdrop-blur-xl
      text-sm font-medium tracking-wide text-indigo-200 shadow-lg"
    >
      ⚡ Trusted by professionals & companies worldwide
    </motion.span>

    {/* Headline */}
    <motion.h1
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      className="text-6xl md:text-7xl font-black leading-[1.05]
      bg-gradient-to-r from-indigo-300 via-sky-300 to-purple-300
      bg-clip-text text-transparent"
    >
      Building the Future of
      <br />
      <span className="text-slate-100 drop-shadow-[0_0_30px_rgba(255,255,255,0.15)]">
        Hiring & Careers
      </span>
    </motion.h1>

    {/* Subtitle */}
    <motion.p
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="mt-10 max-w-4xl mx-auto text-slate-300 text-xl leading-relaxed"
    >
      JobPortal is an AI-driven recruitment ecosystem connecting verified
      employers with skilled professionals through trust, intelligence,
      and automation.
    </motion.p>

    {/* CTA Buttons */}
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
      className="mt-14 flex justify-center gap-6 flex-wrap"
    >
      <a
        href="/jobs"
        className="relative px-12 py-4 rounded-full font-semibold text-slate-100
        bg-gradient-to-r from-indigo-600 to-purple-600
        shadow-[0_20px_60px_rgba(99,102,241,0.6)]
        hover:scale-[1.06] transition-all duration-300"
      >
        Explore Jobs
      </a>

      <a
        href="/register"
        className="px-12 py-4 rounded-full font-semibold
        border border-slate-400/30 text-slate-200
        backdrop-blur-xl hover:bg-white/5 transition"
      >
        Create Profile
      </a>
    </motion.div>

    {/* Metrics */}
    <div className="mt-30 mb-32 grid grid-cols-2 md:grid-cols-4 gap-10">
      <Stat value={300000} suffix="+" label="Professionals" />
      <Stat value={12000} suffix="+" label="Recruiters" />
      <Stat value={96} suffix="%" label="Hiring Accuracy" />
      <Stat value={4} suffix=".2" label="Days to Hire" />
    </div>
  </div>
</section>

{/* ================= HOW IT WORKS — ULTRA PREMIUM ================= */}
<Section light>
  {/* Ambient Background */}
  <div className="absolute inset-0 -z-10">
    <div className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-indigo-300/20 blur-[180px] rounded-full" />
    <div className="absolute -bottom-40 -right-40 w-[500px] h-[500px] bg-purple-300/20 blur-[180px] rounded-full" />
  </div>

  <div className="max-w-7xl mx-auto px-6">

    {/* Header */}
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.9 }}
      className="text-center mb-28"
    >
      <span className="inline-flex items-center gap-2 mb-6 px-8 py-2 rounded-full bg-white shadow border text-sm font-bold text-indigo-700">
        ⚙ Platform Workflow
      </span>

      <h2 className="text-6xl font-black text-slate-900 mb-6">
        Intelligent Hiring,
        <span className="block bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
          Simplified
        </span>
      </h2>

      <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
        A high-precision AI-powered hiring engine designed for speed,
        transparency, and enterprise-grade trust.
      </p>
    </motion.div>

    {/* Flow Line (Desktop) */}
    <div className="relative hidden md:block mb-20">
      <div className="absolute left-0 right-0 top-1/2 h-[2px] bg-gradient-to-r from-indigo-200 via-purple-200 to-indigo-200" />
    </div>

    {/* Cards */}
    <div className="grid md:grid-cols-4 gap-16 relative">
      {[
        {
          step: "01",
          title: "Profile Creation",
          desc: "Candidates create AI-optimized profiles mapped to dynamic skill graphs.",
        },
        {
          step: "02",
          title: "AI Matching",
          desc: "Real-time job matching using intelligent ranking & skill inference.",
        },
        {
          step: "03",
          title: "Verified Hiring",
          desc: "Recruiter KYC, fraud detection, and trust-based employer validation.",
        },
        {
          step: "04",
          title: "Fast Placement",
          desc: "Automated scheduling, offer workflows, and onboarding intelligence.",
        },
      ].map((item, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: i * 0.1 }}
          whileHover={{ y: -14, scale: 1.03 }}
          className="relative group"
        >
          {/* Glow */}
          <div className="absolute inset-0 rounded-[2.5rem] bg-gradient-to-br from-indigo-400/30 to-purple-400/30 blur-2xl opacity-0 group-hover:opacity-100 transition" />

          {/* Card */}
          <div className="relative bg-white/90 backdrop-blur-2xl rounded-[2.5rem] p-12 border shadow-[0_30px_90px_rgba(0,0,0,0.15)]">

            {/* Step Number */}
            <div className="mb-8 flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-600 to-purple-600 text-white text-xl font-black shadow-lg">
              {item.step}
            </div>

            <h3 className="text-2xl font-extrabold text-slate-900 mb-4">
              {item.title}
            </h3>

            <p className="text-slate-600 leading-relaxed">
              {item.desc}
            </p>
          </div>
        </motion.div>
      ))}
    </div>
  </div>
</Section>

      {/* ================= MISSION & VISION ================= */}
{/* ================= MISSION & VISION — ULTRA PREMIUM ================= */}
<Section>
  {/* Background Accent */}
  <div className="absolute inset-0 -z-10">
    <div className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-indigo-400/20 blur-[180px] rounded-full" />
    <div className="absolute -bottom-40 -right-40 w-[600px] h-[600px] bg-purple-400/20 blur-[180px] rounded-full" />
  </div>

  <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-28 items-start">

    {/* LEFT — Editorial Anchor */}
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.9 }}
      className="md:sticky md:top-40"
    >
      <span className="inline-flex items-center gap-2 mb-6 px-6 py-2 rounded-full bg-indigo-50 text-indigo-700 text-sm font-semibold tracking-wide shadow">
        🎯 Our Foundation
      </span>

      <h2 className="text-6xl font-black leading-tight text-slate-900">
        Mission <span className="text-indigo-600">&</span>
        <br />
        Vision
      </h2>

      <p className="mt-8 text-xl text-slate-600 leading-relaxed max-w-lg">
        The strategic principles that shape our technology, guide our decisions,
        and define our long-term global ambition.
      </p>

      {/* Divider */}
      <div className="mt-12 h-[3px] w-24 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full" />
    </motion.div>

    {/* RIGHT — Premium Cards */}
    <div className="space-y-24">

      {/* MISSION */}
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9, delay: 0.1 }}
        whileHover={{ y: -10 }}
        className="relative group"
      >
        {/* Glow */}
        <div className="absolute inset-0 rounded-[2.5rem] bg-indigo-400/30 blur-2xl opacity-0 group-hover:opacity-100 transition" />

        <div className="relative bg-white/90 backdrop-blur-2xl border border-indigo-100 rounded-[2.5rem] p-16 shadow-[0_40px_120px_rgba(79,70,229,0.25)]">
          <span className="inline-block mb-6 px-6 py-2 rounded-full bg-indigo-100 text-indigo-700 text-xs font-bold tracking-wider">
            EXECUTION STRATEGY
          </span>

          <h3 className="text-4xl font-black mb-6 text-indigo-700">
            Our Mission
          </h3>

          <p className="text-slate-700 text-lg leading-relaxed">
            Remove hiring friction using AI automation, empower professionals
            with real-time career intelligence, and enable high-confidence,
            fraud-proof hiring for employers at scale.
          </p>
        </div>
      </motion.div>

      {/* VISION */}
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9, delay: 0.2 }}
        whileHover={{ y: -10 }}
        className="relative group"
      >
        {/* Glow */}
        <div className="absolute inset-0 rounded-[2.5rem] bg-purple-400/30 blur-2xl opacity-0 group-hover:opacity-100 transition" />

        <div className="relative bg-white/90 backdrop-blur-2xl border border-purple-100 rounded-[2.5rem] p-16 shadow-[0_40px_120px_rgba(147,51,234,0.25)]">
          <span className="inline-block mb-6 px-6 py-2 rounded-full bg-purple-100 text-purple-700 text-xs font-bold tracking-wider">
            LONG-TERM AMBITION
          </span>

          <h3 className="text-4xl font-black mb-6 text-purple-700">
            Our Vision
          </h3>

          <p className="text-slate-700 text-lg leading-relaxed">
            Become the world’s most trusted digital employment infrastructure —
            powering billion-scale hiring through AI intelligence, trust
            networks, and enterprise-grade workforce systems.
          </p>
        </div>
      </motion.div>

    </div>
  </div>
</Section>

{/* ================= WHY COMPANIES TRUST US — ULTRA PREMIUM ================= */}
<Section>
  {/* Ambient Background */}
  <div className="absolute inset-0 -z-10">
    <div className="absolute -top-40 -left-40 w-[520px] h-[520px] bg-indigo-400/20 blur-[200px] rounded-full" />
    <div className="absolute -bottom-40 -right-40 w-[520px] h-[520px] bg-purple-400/20 blur-[200px] rounded-full" />
  </div>

  <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-28 items-center">

    {/* LEFT — EXECUTIVE MESSAGE */}
    <motion.div
      initial={{ opacity: 0, x: -40 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.9, ease: "easeOut" }}
    >
      <span className="inline-flex items-center gap-2 mb-6 px-6 py-2 rounded-full bg-indigo-50 text-indigo-700 text-sm font-bold shadow">
        🔐 Trust & Security
      </span>

      <h2 className="text-6xl font-black text-slate-900 leading-tight mb-8">
        Why Companies <br />
        <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
          Trust JobPortal
        </span>
      </h2>

      <p className="text-xl text-slate-600 leading-relaxed max-w-xl">
        Trust is engineered into every layer — from verified employers and
        AI-driven fraud prevention to enterprise-grade security, compliance,
        and transparent hiring intelligence.
      </p>

      {/* Authority Divider */}
      <div className="mt-12 h-[3px] w-24 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full" />
    </motion.div>

    {/* RIGHT — TRUST STACK */}
    <div className="grid gap-12">
      {[
        {
          title: "100% Verified Employers",
          desc: "Strict KYC, document validation, and continuous employer monitoring.",
        },
        {
          title: "AI-Based Fraud Detection",
          desc: "Real-time anomaly detection powered by behavioral intelligence.",
        },
        {
          title: "Enterprise-Grade Security",
          desc: "End-to-end encryption, role-based access, and compliance controls.",
        },
        {
          title: "Transparent Hiring Analytics",
          desc: "Clear insights into hiring pipelines, decisions, and outcomes.",
        },
      ].map((item, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: i * 0.1 }}
          whileHover={{ y: -6 }}
          className="relative group"
        >
          {/* Glow */}
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-indigo-400/30 to-purple-400/30 blur-xl opacity-0 group-hover:opacity-100 transition" />

          {/* Card */}
          <div className="relative flex items-start gap-6 bg-white/90 backdrop-blur-2xl p-10 rounded-3xl border shadow-[0_20px_60px_rgba(0,0,0,0.12)]">
            
            {/* Icon */}
            <div className="w-14 h-14 shrink-0 rounded-2xl bg-gradient-to-br from-indigo-600 to-purple-600 text-white flex items-center justify-center text-xl font-black shadow-lg">
              ✓
            </div>

            {/* Content */}
            <div>
              <h3 className="text-xl font-extrabold text-slate-900 mb-2">
                {item.title}
              </h3>
              <p className="text-slate-600 leading-relaxed">
                {item.desc}
              </p>
            </div>
          </div>
        </motion.div>
      ))}
    </div>

  </div>
</Section>


{/* ================= PLATFORM SCALE ================= */}
<Section light>
  <div className="max-w-7xl mx-auto px-6 text-center">
    <h2 className="text-6xl font-black mb-24 text-slate-900">
      Platform Scale & Impact
    </h2>

    <div className="grid md:grid-cols-4 gap-16">
      {[
        { value: "3M+", label: "Candidates" },
        { value: "120K+", label: "Recruiters" },
        { value: "18+", label: "Countries" },
        { value: "96.8%", label: "Hiring Accuracy" },
      ].map((stat, i) => (
        <motion.div
          key={i}
          whileHover={{ scale: 1.08 }}
          className="bg-white p-14 rounded-3xl shadow-xl border"
        >
          <h3 className="text-4xl font-black text-indigo-600 mb-4">
            {stat.value}
          </h3>
          <p className="text-slate-600 font-semibold">{stat.label}</p>
        </motion.div>
      ))}
    </div>
  </div>
</Section>

{/* ================= FUTURE ROADMAP ================= */}
<Section>
  <div className="max-w-6xl mx-auto px-6">
    <h2 className="text-6xl font-black text-center mb-24 text-slate-900">
      What We’re Building Next
    </h2>

    <div className="space-y-16">
      {[
        "AI Skill Intelligence Graph v2",
        "Global Payroll & Compliance Engine",
        "Cross-Border Remote Hiring",
        "Predictive Career Pathing",
      ].map((item, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="flex items-center gap-8"
        >
          <div className="w-14 h-14 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white flex items-center justify-center text-xl font-bold">
            {i + 1}
          </div>
          <p className="text-2xl text-slate-700 font-medium">{item}</p>
        </motion.div>
      ))}
    </div>
  </div>
</Section>

      {/* ✅ FOOTER — ONLY ONCE */}
      <Footer />
    </div>
  );
}

/* ================= SMALL COMPONENTS ================= */

function Stat({ value, suffix, label }) {
  return (
    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow text-center">
      <h3 className="text-4xl font-black">
        <AnimatedCounter value={value} suffix={suffix} />
      </h3>
      <p className="text-slate-300 mt-1 text-sm">{label}</p>
    </div>
  );
}

function Card({ title, children }) {
  return (
    <div className="bg-white p-14 rounded-3xl shadow-xl border">
      <h3 className="text-4xl font-black mb-6 text-slate-900">
        {title}
      </h3>
      <p className="text-slate-600 text-lg leading-relaxed">
        {children}
      </p>
    </div>
  );
}

function Value({ icon, title }) {
  return (
    <motion.div
      whileHover={{ y: -10 }}
      className="bg-white p-14 rounded-3xl shadow-xl border text-center"
    >
      <div className="text-5xl text-indigo-600 mb-6 flex justify-center">
        {icon}
      </div>
      <h3 className="text-2xl font-bold text-slate-800">{title}</h3>
    </motion.div>
  );
}

function Impact({ icon, title }) {
  return (
    <motion.div
      whileHover={{ y: -8 }}
      className="bg-white/80 backdrop-blur-xl p-10 rounded-3xl shadow border text-center"
    >
      <div className="text-4xl text-indigo-600 mb-4 flex justify-center">
        {icon}
      </div>
      <h4 className="text-xl font-bold text-slate-800">{title}</h4>
    </motion.div>
  );
}
