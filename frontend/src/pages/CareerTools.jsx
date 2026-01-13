import { motion } from "framer-motion";
import {
  FiFileText,
  FiTarget,
  FiEdit3,
} from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import Footer from "../components/layout/Footer";

/* ✅ TOOLS WITH WORKING ROUTES (CLEANED) */
const tools = [
  {
    title: "AI Resume Builder",
    desc: "Create ATS-optimized resumes with real-time feedback, keyword scoring, and recruiter-ready formatting.",
    icon: <FiFileText />,
    path: "/tools/resume-builder",
  },
  {
    title: "Career Roadmap",
    desc: "Get a personalized learning roadmap based on your skills, experience, and target job roles.",
    icon: <FiTarget />,
    path: "/tools/career-roadmap",
  },
  {
    title: "Cover Letter Generator",
    desc: "Generate tailored cover letters optimized for HR screening within seconds.",
    icon: <FiEdit3 />,
    path: "/tools/cover-letter",
  },
];

export default function CareerTools() {
  const navigate = useNavigate();

  return (
    <div className="w-full bg-linear-to-br from-indigo-50 via-white to-purple-50 min-h-screen pt-32 overflow-hidden">

      {/* ================= PREMIUM HERO ================= */}
      <section className="relative text-center max-w-7xl mx-auto px-6 mb-44 overflow-hidden">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[900px] h-[900px]
          bg-gradient-to-tr from-indigo-400/30 via-purple-400/20 to-pink-400/20
          blur-[140px] pointer-events-none"
        />

        <motion.span
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 mb-8 px-8 py-3
          bg-white/70 backdrop-blur-xl border border-indigo-200/50
          text-indigo-700 rounded-full text-sm font-semibold shadow-lg"
        >
          <span className="animate-pulse">🚀</span>
          Career Acceleration Ecosystem
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-[3.5rem] md:text-[4.5rem] lg:text-[5.5rem]
          font-black leading-[1.05] mb-10
          bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600
          bg-clip-text text-transparent"
        >
          Smart Career Tools
          <br />
          <span className="text-slate-900">for Top 1% Talent</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="text-slate-600 text-xl md:text-2xl max-w-4xl mx-auto leading-relaxed mb-8"
        >
          A next-generation career intelligence platform designed to help you
          <span className="font-semibold text-slate-800">
            {" "}build faster, negotiate smarter, and win better roles
          </span>{" "}
          using AI-driven insights.
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="text-slate-500 text-lg max-w-3xl mx-auto"
        >
          From resume engineering to career planning —
          everything you need to land elite opportunities.
        </motion.p>
      </section>

      {/* ================= PREMIUM TOOLS GRID ================= */}
      <section className="relative max-w-7xl mx-auto px-6 pb-44">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-20">
          {tools.map((tool, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ y: -18 }}
              transition={{ type: "spring", stiffness: 160, damping: 18 }}
              className="group relative rounded-[28px] p-[1px]
              bg-gradient-to-br from-indigo-500/40 via-purple-500/30 to-pink-500/40"
            >
              <div
                className="relative h-full rounded-[27px]
                bg-white/85 backdrop-blur-2xl
                border border-slate-200/60
                shadow-[0_20px_60px_-15px_rgba(0,0,0,0.25)]
                p-10 overflow-hidden"
              >
                <div className="relative z-10 text-indigo-600 text-5xl mb-8">
                  {tool.icon}
                </div>

                <h3 className="relative z-10 text-2xl font-bold mb-4 text-slate-900">
                  {tool.title}
                </h3>

                <p className="relative z-10 text-slate-600 mb-8 leading-relaxed">
                  {tool.desc}
                </p>

                <button
                  onClick={() => navigate(tool.path)}
                  className="relative z-20 inline-flex items-center gap-2
                  bg-gradient-to-r from-indigo-600 to-purple-600
                  text-white px-8 py-3 rounded-full font-semibold
                  shadow-lg shadow-indigo-500/30
                  hover:scale-105 active:scale-95 transition"
                >
                  Launch Tool →
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

{/* ================= WHO IS THIS FOR ================= */}
{/* ================= BUILT FOR EVERY CAREER STAGE ================= */}
<section className="relative py-32 px-6 bg-white/70 overflow-hidden">
  <div className="max-w-6xl mx-auto">

    {/* Subtle background accent */}
    <div className="absolute inset-0 -z-10 flex justify-center">
      <div
        className="w-[900px] h-[380px]
        bg-gradient-to-r from-indigo-400/10 via-purple-400/10 to-pink-400/10
        blur-[160px]"
      />
    </div>

    {/* Header */}
    <div className="text-center mb-20">
      <span
        className="inline-flex items-center gap-2 mb-6 px-6 py-2
        bg-indigo-50 border border-indigo-200/60
        rounded-full text-indigo-700 text-sm font-semibold shadow-sm"
      >
        🎯 Career-Stage Adaptive Platform
      </span>

      <h2
        className="text-[2.6rem] font-black mb-6
        bg-gradient-to-br from-slate-900 via-indigo-700 to-purple-700
        bg-clip-text text-transparent"
      >
        Built for Every Career Stage
      </h2>

      <p className="text-slate-600 max-w-3xl mx-auto text-base leading-relaxed">
        Career challenges evolve as you grow. Our tools automatically adapt
        to your experience level, role expectations, and hiring dynamics —
        helping you stay competitive whether you’re entering the job market
        or advancing into high-impact positions.
      </p>
    </div>

    {/* Persona Cards */}
    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
      {[
        {
          title: "Students & Freshers",
          icon: "🎓",
          desc: "Create strong applications even with limited experience.",
          points: [
            "Project-first positioning",
            "Internship & coursework highlighting",
            "Beginner-safe ATS formatting"
          ]
        },
        {
          title: "Working Professionals",
          icon: "💼",
          desc: "Position your experience for growth, promotions, and better offers.",
          points: [
            "Outcome-driven achievements",
            "Role-specific keyword optimization",
            "Leadership & ownership framing"
          ]
        },
        {
          title: "Career Switchers",
          icon: "🔄",
          desc: "Translate past experience into relevance for new domains.",
          points: [
            "Transferable skill mapping",
            "Clear career narrative",
            "Reduced rejection risk"
          ]
        },
        {
          title: "Remote Job Seekers",
          icon: "🌍",
          desc: "Stand out in competitive, global hiring pipelines.",
          points: [
            "Async-friendly communication",
            "Global ATS compatibility",
            "Clear impact-focused writing"
          ]
        }
      ].map((item) => (
        <div
          key={item.title}
          className="group relative rounded-3xl p-[1px]
          bg-gradient-to-br from-indigo-500/30 via-purple-500/20 to-pink-500/30
          hover:from-indigo-500/50 hover:via-purple-500/40 hover:to-pink-500/50
          transition"
        >
          <div
            className="h-full rounded-3xl p-7
            bg-white/90 backdrop-blur-xl
            border border-indigo-200/60
            shadow-md hover:shadow-xl
            transition-all duration-300
            hover:-translate-y-1"
          >
            {/* Icon */}
            <div className="text-3xl mb-4">{item.icon}</div>

            {/* Title */}
            <h4 className="text-lg font-bold text-slate-900 mb-2">
              {item.title}
            </h4>

            {/* Description */}
            <p className="text-sm text-slate-600 leading-relaxed mb-4">
              {item.desc}
            </p>

            {/* Points */}
            <ul className="space-y-1.5 text-xs text-slate-500">
              {item.points.map((p) => (
                <li key={p} className="flex items-start gap-2">
                  <span className="text-indigo-600 mt-0.5">✔</span>
                  <span>{p}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>

    {/* Bottom reassurance */}
    <div className="mt-20 text-center">
      <p className="text-xs text-slate-500 max-w-2xl mx-auto leading-relaxed">
        ⚡ Designed to support candidates applying to startups, enterprises,
        and remote-first companies — built to satisfy both
        <span className="font-semibold text-indigo-700"> human recruiters</span>
        and
        <span className="font-semibold text-purple-700"> automated screening systems</span>.
      </p>
    </div>

  </div>
</section>

{/* ================= HOW IT WORKS ================= */}
{/* ================= HOW IT WORKS ================= */}
<section className="relative py-32 px-6 bg-gradient-to-br from-indigo-50 to-purple-50 overflow-hidden">
  <div className="max-w-6xl mx-auto">

    {/* Soft background accent */}
    <div className="absolute inset-0 -z-10 flex justify-center">
      <div
        className="w-[920px] h-[420px]
        bg-gradient-to-r from-indigo-400/15 via-purple-400/15 to-pink-400/15
        blur-[170px]"
      />
    </div>

    {/* Header */}
    <div className="text-center mb-24">
      <span
        className="inline-flex items-center gap-2 mb-6 px-6 py-2
        bg-indigo-50 border border-indigo-200/60
        rounded-full text-indigo-700 text-sm font-semibold shadow-sm"
      >
        ⚙️ Simple • Intelligent • Recruiter-Ready
      </span>

      <h2
        className="text-[2.6rem] font-black mb-6
        bg-gradient-to-br from-slate-900 via-indigo-700 to-purple-700
        bg-clip-text text-transparent"
      >
        How It Works
      </h2>

      <p className="text-slate-600 max-w-3xl mx-auto text-base leading-relaxed">
        Our platform blends
        <span className="font-semibold text-indigo-700"> AI-powered writing</span>,
        <span className="font-semibold text-purple-700"> ATS keyword intelligence</span>,
        and
        <span className="font-semibold text-emerald-700"> recruiter decision patterns</span>
        to produce applications that pass automated screening and hold human attention.
      </p>
    </div>

    {/* Steps */}
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-12">
      {[
        {
          step: "01",
          icon: "🧾",
          title: "Input Your Profile",
          desc: "You provide essential details about your role, skills, experience, and goals.",
          points: [
            "No resume upload required",
            "Supports freshers & professionals",
            "Role-specific keyword detection"
          ]
        },
        {
          step: "02",
          icon: "🧠",
          title: "AI Writes & Optimizes",
          desc: "Our system structures content using real ATS rules and recruiter heuristics.",
          points: [
            "Keyword & relevance scoring",
            "Human-readable, ATS-safe formatting",
            "Eliminates generic phrasing"
          ]
        },
        {
          step: "03",
          icon: "🚀",
          title: "Apply With Confidence",
          desc: "Review, refine, and submit applications built to perform.",
          points: [
            "One-click improvements",
            "Export-ready formats",
            "Higher screening success rate"
          ]
        }
      ].map((s) => (
        <div
          key={s.step}
          className="group relative rounded-3xl p-[1px]
          bg-gradient-to-br from-indigo-500/30 via-purple-500/20 to-pink-500/30
          hover:from-indigo-500/50 hover:via-purple-500/40 hover:to-pink-500/50
          transition"
        >
          <div
            className="h-full rounded-3xl p-8
            bg-white/90 backdrop-blur-xl
            border border-slate-200/60
            shadow-md hover:shadow-xl
            transition-all duration-300
            hover:-translate-y-1"
          >
            {/* Step + Icon */}
            <div className="flex items-center justify-between mb-5">
              <span className="text-sm font-black text-indigo-600">
                {s.step}
              </span>
              <span className="text-3xl">{s.icon}</span>
            </div>

            {/* Title */}
            <h4 className="text-xl font-bold text-slate-900 mb-3">
              {s.title}
            </h4>

            {/* Description */}
            <p className="text-sm text-slate-600 leading-relaxed mb-4">
              {s.desc}
            </p>

            {/* Points */}
            <ul className="space-y-1.5 text-xs text-slate-500">
              {s.points.map((p) => (
                <li key={p} className="flex items-start gap-2">
                  <span className="text-indigo-600 mt-0.5">✔</span>
                  <span>{p}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>

    {/* Bottom trust note */}
    <div className="mt-24 text-center">
      <p className="text-xs text-slate-500 max-w-2xl mx-auto leading-relaxed">
        ⚡ The entire workflow is designed to match how modern ATS systems
        and recruiters actually evaluate candidates — not assumptions or templates.
      </p>
    </div>

  </div>
</section>

{/* ================= WHY RECRUITERS TRUST THIS ================= */}
{/* ================= WHY RECRUITERS PREFER THESE PROFILES ================= */}
<section className="relative py-32 px-6 bg-white overflow-hidden">
  <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-20 items-center">

    {/* Subtle background accent */}
    <div className="absolute inset-0 -z-10 flex justify-center">
      <div
        className="w-[900px] h-[420px]
        bg-gradient-to-r from-indigo-400/10 via-purple-400/10 to-pink-400/10
        blur-[170px]"
      />
    </div>

    {/* Left: Recruiter Logic */}
    <div>
      <span
        className="inline-flex items-center gap-2 mb-6 px-6 py-2
        bg-indigo-50 border border-indigo-200/60
        rounded-full text-indigo-700 text-sm font-semibold shadow-sm"
      >
        👀 Recruiter Insight
      </span>

      <h2
        className="text-[2.6rem] font-black mb-6
        bg-gradient-to-br from-slate-900 via-indigo-700 to-purple-700
        bg-clip-text text-transparent"
      >
        Why Recruiters Prefer These Profiles
      </h2>

      <p className="text-slate-600 text-base leading-relaxed mb-8 max-w-xl">
        Recruiters typically spend
        <span className="font-semibold text-indigo-700"> 6–8 seconds</span>
        on an initial profile scan. Our platform structures your resume and
        cover letter to surface
        <span className="font-semibold text-purple-700"> relevance</span>,
        <span className="font-semibold text-emerald-700"> impact</span>, and
        <span className="font-semibold text-indigo-700"> role fit</span>
        immediately — without forcing recruiters to dig.
      </p>

      <ul className="space-y-5 text-sm text-slate-600 leading-relaxed">
        {[
          {
            title: "ATS-Safe, Human-Readable Structure",
            desc: "Clean layouts ensure perfect parsing by ATS systems while remaining easy to skim for recruiters."
          },
          {
            title: "Keyword Alignment with Job Descriptions",
            desc: "Critical role-specific keywords appear exactly where ATS and recruiters expect them."
          },
          {
            title: "Immediate Value Proposition",
            desc: "Your strongest qualifications and outcomes are visible within the first scan."
          },
          {
            title: "Professional, Natural Tone",
            desc: "Confident and human — avoiding robotic or obviously AI-generated language."
          },
          {
            title: "Dual Optimization",
            desc: "Designed to perform equally well for automated filters and human decision-makers."
          }
        ].map((item) => (
          <li key={item.title} className="flex items-start gap-4">
            <span className="mt-1 text-indigo-600 font-bold">✔</span>
            <div>
              <p className="font-semibold text-slate-800">
                {item.title}
              </p>
              <p className="text-xs text-slate-500 mt-1">
                {item.desc}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>

    {/* Right: Authority / Testimonial */}
    <div
      className="relative rounded-3xl p-[1px]
      bg-gradient-to-br from-indigo-500/30 via-purple-500/20 to-pink-500/30"
    >
      <div
        className="rounded-3xl p-10
        bg-white/90 backdrop-blur-xl
        border border-indigo-200/60
        shadow-lg"
      >
        {/* Quote mark */}
        <div className="text-4xl text-indigo-500 mb-4">“</div>

        <p className="text-sm text-slate-700 leading-relaxed">
          Most applications fail because they’re either too generic or poorly
          structured. This platform consistently produces
          <span className="font-semibold text-indigo-700"> focused</span>,
          <span className="font-semibold text-purple-700"> role-specific</span>,
          and
          <span className="font-semibold text-emerald-700"> ATS-compatible</span>
          profiles that are effortless to scan and immediately relevant.
        </p>

        <div className="mt-6 flex items-center gap-3">
          <div
            className="h-10 w-10 rounded-full
            bg-gradient-to-br from-indigo-600 to-purple-600
            text-white flex items-center justify-center text-sm font-bold"
          >
            HM
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-800">
              Senior Hiring Manager
            </p>
            <p className="text-[11px] text-slate-500">
              Tech & Product Organizations
            </p>
          </div>
        </div>
      </div>
    </div>

  </div>
</section>

{/* ================= FINAL CTA ================= */}
{/* ================= FINAL CALL TO ACTION ================= */}
<section className="relative py-36 px-6
  bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600
  text-white overflow-hidden">

  {/* Ambient glow */}
  <div className="absolute inset-0 -z-10 flex justify-center">
    <div
      className="w-[1000px] h-[500px]
      bg-gradient-to-r from-white/20 via-white/10 to-white/20
      blur-[180px]"
    />
  </div>

  <div className="max-w-4xl mx-auto text-center">

    {/* Badge */}
    <span
      className="inline-flex items-center gap-2 mb-8 px-6 py-2
      bg-white/15 backdrop-blur-md border border-white/30
      rounded-full text-sm font-semibold tracking-wide"
    >
      🚀 Your Next Career Move Starts Here
    </span>

    {/* Heading */}
    <h2 className="text-[2.8rem] md:text-[3.4rem] font-black mb-6 leading-tight">
      Ready to Upgrade Your Career?
    </h2>

    {/* Description */}
    <p className="text-lg md:text-xl text-indigo-100 mb-10 leading-relaxed">
      Stop guessing what recruiters want.
      Our AI-powered tools help you apply with
      <span className="font-semibold text-white"> clarity</span>,
      <span className="font-semibold text-white"> confidence</span>, and
      <span className="font-semibold text-white"> precision</span> —
      built for modern ATS systems and real hiring decisions.
    </p>

    {/* Primary CTA */}
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="inline-flex items-center gap-3
      bg-white text-indigo-700 px-12 py-4 rounded-full
      font-semibold text-lg
      shadow-[0_25px_60px_-15px_rgba(0,0,0,0.35)]
      hover:scale-105 active:scale-95 transition"
    >
      🚀 Explore Career Tools
    </button>

    {/* Trust micro-copy */}
    <p className="mt-8 text-xs text-indigo-100/90 leading-relaxed">
      ✔ ATS-safe & recruiter-approved &nbsp;•&nbsp;
      ✔ No credit card required &nbsp;•&nbsp;
      ✔ Built for real hiring pipelines
    </p>

  </div>
</section>

      <Footer />
    </div>
  );
}
