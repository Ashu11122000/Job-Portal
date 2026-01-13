import { useState } from "react";
import { motion } from "framer-motion";
import {
  FiEdit3,
  FiMail,
  FiDownload,
  FiRefreshCcw,
  FiTrendingUp,
} from "react-icons/fi";
import Footer from "../../components/layout/Footer";
import axios from "axios";

/* ================= API CONFIG ================= */
const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
});

/* ================= TEMPLATE PRESETS ================= */
const templates = {
  Tech: "Technical / Engineering roles",
  HR: "Human resources & operations",
  MBA: "Leadership, strategy & consulting",
  Remote: "Remote-first & async teams",
};

export default function CoverLetterTool() {
  const [form, setForm] = useState({
    name: "",
    role: "",
    company: "",
    experience: "",
    skills: "",
  });

  const [tone, setTone] = useState("Formal");
  const [template, setTemplate] = useState("Tech");
  const [generated, setGenerated] = useState("");
  const [atsScore, setAtsScore] = useState(0);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  /* ================= GENERATE + ATS + SAVE ================= */
  const generateCoverLetter = async () => {
    try {
      setLoading(true);

      /* 1️⃣ ATS SCORE */
      const atsRes = await API.post("/api/cover-letter/ats-score", {
        role: form.role,
        skills: form.skills,
        experience: form.experience,
      });
      setAtsScore(atsRes.data.score);

      /* 2️⃣ GENERATE LETTER */
      const genRes = await API.post("/api/cover-letter/generate", {
        ...form,
        tone,
        template,
      });
      setGenerated(genRes.data.letter);

      /* 3️⃣ SAVE LETTER */
      await API.post("/api/cover-letter/save", {
        ...form,
        tone,
        template,
        content: genRes.data.letter,
        atsScore: atsRes.data.score,
      });
    } catch (err) {
      console.error(err);
      alert("❌ Failed to generate cover letter. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  /* ================= AI IMPROVE (FRONTEND) ================= */
  const improveLetter = () => {
    setGenerated((prev) =>
      prev
        .replace("I bring value by", "I consistently deliver measurable impact by")
        .replace(
          "Thank you for your time and consideration.",
          "Thank you for reviewing my application."
        )
    );
  };

  /* ================= DOWNLOAD ================= */
  const downloadText = () => {
    const blob = new Blob([generated], { type: "text/plain;charset=utf-8" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "Cover_Letter.txt";
    link.click();
  };

  const resetForm = () => {
    setForm({
      name: "",
      role: "",
      company: "",
      experience: "",
      skills: "",
    });
    setGenerated("");
    setAtsScore(0);
  };

  return (
    <>
<section className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 py-24 px-6">
  <div className="max-w-6xl mx-auto space-y-24">

    {/* ================= HERO ================= */}
    <div className="relative text-center overflow-hidden">
      <div className="absolute inset-0 -z-10 flex justify-center">
        <div className="w-[780px] h-[320px] bg-gradient-to-r from-indigo-400/20 via-purple-400/20 to-pink-400/20 blur-[130px]" />
      </div>

      <motion.span
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="inline-flex items-center gap-2 mb-6 px-6 py-2.5 bg-indigo-50/90 border border-indigo-200/60 rounded-full text-indigo-700 text-sm font-semibold shadow-sm"
      >
        ✉️ AI-Powered Career Writing Suite
      </motion.span>

      <motion.h1
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-[3.2rem] md:text-[4rem] font-black mb-5 leading-tight bg-gradient-to-br from-slate-900 via-indigo-700 to-purple-700 bg-clip-text text-transparent"
      >
        Cover Letters That
        <br />
        <span className="bg-gradient-to-r from-indigo-600 to-pink-600 bg-clip-text text-transparent">
          Recruiters Actually Read
        </span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="text-slate-700 max-w-3xl mx-auto text-lg leading-relaxed"
      >
        Instantly generate
        <span className="font-semibold text-indigo-700"> role-specific</span>,
        <span className="font-semibold text-purple-700"> ATS-optimized</span>
        cover letters aligned with recruiter psychology and modern hiring systems.
      </motion.p>

      <div className="mt-10 flex flex-wrap justify-center gap-x-8 gap-y-3 text-sm">
        {[
          "ATS-Compliant Structure",
          "Industry-Specific Templates",
          "Recruiter-Approved Language",
          "Export-Ready (PDF / DOCX)",
        ].map((t) => (
          <span key={t} className="flex items-center gap-2 text-slate-600">
            <span className="text-indigo-600">✔</span>
            {t}
          </span>
        ))}
      </div>
    </div>

    {/* ================= CONTROLS ================= */}
    <div className="relative">
      <div className="absolute inset-0 -z-10 flex justify-center">
        <div className="w-[620px] h-[240px] bg-gradient-to-r from-indigo-400/20 via-purple-400/20 to-pink-400/20 blur-[110px]" />
      </div>

      <div className="text-center mb-14">
        <span className="inline-flex items-center gap-2 mb-4 px-6 py-2 bg-indigo-50 border border-indigo-200/60 rounded-full text-indigo-700 text-sm font-semibold shadow-sm">
          🎛 Personalization Controls
        </span>

        <h3 className="text-[2.3rem] font-black mb-4 bg-gradient-to-br from-slate-900 via-indigo-700 to-purple-700 bg-clip-text text-transparent">
          Fine-Tune Tone & Structure
        </h3>

        <p className="text-slate-600 max-w-2xl mx-auto text-base leading-relaxed">
          Adjust how your cover letter
          <span className="font-semibold text-indigo-700"> sounds</span> and
          <span className="font-semibold text-purple-700"> reads</span>
          to match company culture and hiring expectations.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-10">
        <div className="rounded-3xl p-[1px] bg-gradient-to-br from-indigo-500/40 via-purple-500/30 to-pink-500/40">
          <div className="rounded-3xl bg-white/90 backdrop-blur-xl border border-slate-200/60 p-8 shadow-lg">
            <Select label="Tone of Voice" value={tone} onChange={setTone} options={["Formal", "Startup", "Friendly"]} />
          </div>
        </div>

        <div className="rounded-3xl p-[1px] bg-gradient-to-br from-indigo-500/40 via-purple-500/30 to-pink-500/40">
          <div className="rounded-3xl bg-white/90 backdrop-blur-xl border border-slate-200/60 p-8 shadow-lg">
            <Select label="Industry Template" value={template} onChange={setTemplate} options={Object.keys(templates)} />
          </div>
        </div>
      </div>
    </div>

    {/* ================= FORM + PREVIEW ================= */}
    <div className="grid lg:grid-cols-2 gap-12 items-start">

      {/* FORM */}
      <div className="rounded-3xl p-[1px] bg-gradient-to-br from-indigo-500/40 via-purple-500/30 to-pink-500/40">
        <div className="rounded-3xl bg-white/90 backdrop-blur-xl border border-slate-200/60 p-10 shadow-lg">
          <div className="space-y-5">
            <Input name="name" placeholder="Your Full Name" value={form.name} onChange={handleChange} />
            <Input name="role" placeholder="Target Job Role" value={form.role} onChange={handleChange} />
            <Input name="company" placeholder="Company Name" value={form.company} onChange={handleChange} />
            <Input name="experience" placeholder="Experience Summary" value={form.experience} onChange={handleChange} />
            <Textarea name="skills" placeholder="Key Skills (comma separated)" value={form.skills} onChange={handleChange} />
          </div>

          <button
            onClick={generateCoverLetter}
            disabled={loading}
            className="mt-8 w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 rounded-xl font-semibold shadow-lg hover:scale-105 transition disabled:opacity-60"
          >
            {loading ? "Generating…" : "✨ Generate Cover Letter"}
          </button>

          {/* ATS SCORE */}
          <div className="mt-6">
            <div className="flex justify-between text-sm font-semibold mb-2">
              <span>ATS Match Score</span>
              <span className="text-indigo-700">{atsScore}%</span>
            </div>
            <div className="h-2.5 bg-slate-200 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-emerald-500 via-indigo-500 to-purple-600" style={{ width: `${atsScore}%` }} />
            </div>
          </div>
        </div>
      </div>

      {/* PREVIEW */}
      <div className="rounded-3xl p-[1px] bg-gradient-to-br from-indigo-500/40 via-purple-500/30 to-pink-500/40">
        <div className="rounded-3xl bg-white/90 backdrop-blur-xl border border-slate-200/60 p-8 shadow-lg">
          {generated ? (
            <pre className="whitespace-pre-wrap text-sm text-slate-700 leading-relaxed">
              {generated}
            </pre>
          ) : (
            <div className="h-44 flex items-center justify-center text-slate-500 text-sm">
              Generated cover letter preview will appear here.
            </div>
          )}
        </div>
      </div>

    </div>

  </div>
</section>


      {/* ================= WHO IS THIS FOR ================= */}
{/* ================= WHO SHOULD USE THIS TOOL ================= */}
<section className="py-24 px-6">
  <div className="max-w-6xl mx-auto">

    {/* Header */}
    <div className="text-center mb-16">
      <span
        className="inline-flex items-center gap-2 mb-5 px-6 py-2
        bg-indigo-50 border border-indigo-200/60
        rounded-full text-indigo-700 text-sm font-semibold shadow-sm"
      >
        🎯 Designed for Every Career Stage
      </span>

      <h3
        className="text-[2.6rem] font-black mb-5
        bg-gradient-to-br from-slate-900 via-indigo-700 to-purple-700
        bg-clip-text text-transparent"
      >
        Who Should Use This Tool?
      </h3>

      <p className="text-slate-600 max-w-3xl mx-auto text-base leading-relaxed">
        Whether you're just starting out or repositioning your career, this tool
        adapts your cover letter to match{" "}
        <span className="font-semibold text-indigo-700">recruiter expectations</span>,{" "}
        <span className="font-semibold text-purple-700">ATS systems</span>, and
        real-world hiring standards.
      </p>
    </div>

    {/* Cards */}
    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
      {[
        {
          title: "Freshers & Students",
          icon: "🎓",
          desc: "Create confident, structured cover letters even with limited experience.",
          points: [
            "Highlights internships & projects",
            "Avoids beginner mistakes",
            "ATS-safe formatting"
          ]
        },
        {
          title: "Working Professionals",
          icon: "💼",
          desc: "Showcase experience with clarity, impact, and measurable results.",
          points: [
            "Role-specific achievements",
            "Leadership & ownership focus",
            "Keyword-optimized narratives"
          ]
        },
        {
          title: "Career Switchers",
          icon: "🔄",
          desc: "Translate past experience into relevance for a new domain.",
          points: [
            "Transferable skill mapping",
            "Clear career story",
            "Reduced rejection risk"
          ]
        },
        {
          title: "Remote Job Seekers",
          icon: "🌍",
          desc: "Stand out in global, high-volume remote hiring pipelines.",
          points: [
            "Async & remote-ready tone",
            "Global ATS compatibility",
            "Clear communication emphasis"
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
            border border-slate-200/60
            shadow-md hover:shadow-xl
            transition-all duration-300
            hover:-translate-y-1"
          >
            {/* Icon */}
            <div className="text-3xl mb-4">
              {item.icon}
            </div>

            {/* Title */}
            <h4 className="text-lg font-bold text-slate-900 mb-2">
              {item.title}
            </h4>

            {/* Description */}
            <p className="text-sm text-slate-600 leading-relaxed mb-4">
              {item.desc}
            </p>

            {/* Benefits */}
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

    {/* Bottom trust line */}
    <div className="mt-16 text-center">
      <p className="text-xs text-slate-500 max-w-2xl mx-auto leading-relaxed">
        ⚡ Used by candidates applying to startups, enterprises, and remote-first
        companies — built to satisfy both{" "}
        <span className="font-semibold text-indigo-700">human recruiters</span> and{" "}
        <span className="font-semibold text-purple-700">automated screening systems</span>.
      </p>
    </div>

  </div>
</section>


      {/* ================= HOW IT WORKS ================= */}
{/* ================= HOW IT WORKS ================= */}
<section className="py-24 px-6">
  <div className="max-w-6xl mx-auto">

    {/* Header */}
    <div className="text-center mb-18">
      <span
        className="inline-flex items-center gap-2 mb-5 px-6 py-2
        bg-indigo-50 border border-indigo-200/60
        rounded-full text-indigo-700 text-sm font-semibold shadow-sm"
      >
        ⚙️ Simple • Intelligent • Recruiter-Ready
      </span>

      <h3
        className="text-[2.6rem] font-black mb-5
        bg-gradient-to-br from-slate-900 via-indigo-700 to-purple-700
        bg-clip-text text-transparent"
      >
        How It Works
      </h3>

      <p className="text-slate-600 max-w-3xl mx-auto text-base leading-relaxed">
        Our system combines{" "}
        <span className="font-semibold text-indigo-700">AI-powered writing</span>,{" "}
        <span className="font-semibold text-purple-700">ATS keyword analysis</span>, and{" "}
        <span className="font-semibold text-emerald-700">recruiter-approved structure</span>{" "}
        to create cover letters that pass automated screening and hold human attention.
      </p>
    </div>

    {/* Steps */}
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10">

      {[
        {
          step: "01",
          icon: "🧾",
          title: "Input Your Profile",
          desc: "You provide your role, skills, experience, and target company details.",
          points: [
            "Supports freshers & experienced candidates",
            "Role-specific keyword detection",
            "No resume upload required"
          ]
        },
        {
          step: "02",
          icon: "🧠",
          title: "AI Writes & Scores",
          desc: "Our AI generates a tailored cover letter and calculates ATS compatibility.",
          points: [
            "Keyword & role relevance analysis",
            "Recruiter-style sentence structuring",
            "Real-time ATS match score"
          ]
        },
        {
          step: "03",
          icon: "📤",
          title: "Refine & Export",
          desc: "Improve language with AI and export in clean, recruiter-friendly formats.",
          points: [
            "One-click AI improvements",
            "ATS-safe formatting",
            "Ready for PDF / DOCX submission"
          ]
        }
      ].map((item) => (
        <div
          key={item.step}
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
            {/* Step */}
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-black text-indigo-600">
                {item.step}
              </span>
              <span className="text-3xl">
                {item.icon}
              </span>
            </div>

            {/* Title */}
            <h4 className="text-xl font-bold text-slate-900 mb-2">
              {item.title}
            </h4>

            {/* Description */}
            <p className="text-sm text-slate-600 leading-relaxed mb-4">
              {item.desc}
            </p>

            {/* Details */}
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
    <div className="mt-18 text-center">
      <p className="text-xs text-slate-500 max-w-2xl mx-auto leading-relaxed">
        🚀 The entire process takes under{" "}
        <span className="font-semibold text-indigo-700">60 seconds</span> — built to
        match how modern recruiters and ATS systems actually evaluate candidates.
      </p>
    </div>

  </div>
</section>

{/* ================= WHY RECRUITERS LIKE THIS ================= */}
{/* ================= WHY RECRUITERS PREFER THESE LETTERS ================= */}
<section className="py-24 px-6">
  <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-14 items-center">

    {/* Left: Recruiter Logic */}
    <div>
      <span
        className="inline-flex items-center gap-2 mb-5 px-6 py-2
        bg-indigo-50 border border-indigo-200/60
        rounded-full text-indigo-700 text-sm font-semibold shadow-sm"
      >
        👀 Recruiter Perspective
      </span>

      <h3
        className="text-[2.6rem] font-black mb-6
        bg-gradient-to-br from-slate-900 via-indigo-700 to-purple-700
        bg-clip-text text-transparent"
      >
        Why Recruiters Prefer These Letters
      </h3>

      <p className="text-slate-600 text-base leading-relaxed mb-6 max-w-xl">
        Recruiters typically spend{" "}
        <span className="font-semibold text-indigo-700">6–8 seconds</span> scanning
        a cover letter. This tool structures your content to surface{" "}
        <span className="font-semibold text-purple-700">relevance</span>,{" "}
        <span className="font-semibold text-emerald-700">impact</span>, and{" "}
        <span className="font-semibold text-indigo-700">fit</span> instantly —
        without unnecessary fluff or decorative formatting.
      </p>

      <ul className="space-y-4 text-sm text-slate-600 leading-relaxed">
        {[
          {
            title: "ATS-First, Human-Readable Structure",
            desc: "Clean formatting ensures perfect parsing by ATS systems while remaining easy to skim for recruiters."
          },
          {
            title: "Keyword Alignment with Job Descriptions",
            desc: "Critical role-specific keywords are naturally embedded where ATS and recruiters expect them."
          },
          {
            title: "Immediate Value Proposition",
            desc: "Your strongest qualifications and outcomes appear within the first two paragraphs."
          },
          {
            title: "Professional, Natural Tone",
            desc: "Reads confident and human — avoiding robotic, AI-detectable language."
          }
        ].map((item) => (
          <li key={item.title} className="flex items-start gap-3">
            <span className="mt-1 text-indigo-600 font-bold">✔</span>
            <div>
              <p className="font-semibold text-slate-800">
                {item.title}
              </p>
              <p className="text-xs text-slate-500 mt-0.5">
                {item.desc}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>

    {/* Right: Quote / Authority */}
    <div
      className="relative rounded-3xl p-[1px]
      bg-gradient-to-br from-indigo-500/30 via-purple-500/20 to-pink-500/30"
    >
      <div
        className="rounded-3xl p-10
        bg-white/90 backdrop-blur-xl
        border border-slate-200/60
        shadow-lg"
      >
        {/* Quote icon */}
        <div className="text-4xl text-indigo-500 mb-4">“</div>

        <p className="text-sm text-slate-700 leading-relaxed">
          Most candidates fail because their cover letters are too generic or
          overloaded with irrelevant details. This tool consistently produces
          <span className="font-semibold text-indigo-700"> focused</span>,
          <span className="font-semibold text-purple-700"> role-specific</span>,
          and
          <span className="font-semibold text-emerald-700"> ATS-compatible</span>{" "}
          letters that are easy to scan and immediately relevant.
        </p>

        <div className="mt-6 flex items-center gap-3">
          <div className="h-10 w-10 rounded-full
            bg-gradient-to-br from-indigo-500 to-purple-500
            flex items-center justify-center text-white text-sm font-bold">
            HM
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-800">
              Hiring Manager
            </p>
            <p className="text-[11px] text-slate-500">
              Tech & Product Teams
            </p>
          </div>
        </div>
      </div>
    </div>

  </div>
</section>

{/* ================= ATS SCORE EXPLANATION ================= */}
{/* ================= ATS MATCH SCORE EXPLAINER ================= */}
<div
  className="relative rounded-3xl p-[1px]
  bg-gradient-to-br from-indigo-500/30 via-purple-500/20 to-pink-500/30"
>
  <div
    className="rounded-3xl p-7
    bg-white/90 backdrop-blur-xl
    border border-indigo-200/60
    shadow-md"
  >
    {/* Header */}
    <div className="flex items-center gap-3 mb-4">
      <div
        className="h-9 w-9 rounded-full
        bg-gradient-to-br from-indigo-600 to-purple-600
        text-white flex items-center justify-center text-sm font-bold"
      >
        ATS
      </div>

      <div>
        <h4 className="text-sm font-black text-indigo-800 leading-tight">
          How Your ATS Match Score Is Calculated
        </h4>
        <p className="text-[11px] text-slate-500">
          Transparency into how automated systems evaluate your application
        </p>
      </div>
    </div>

    {/* Description */}
    <p className="text-sm text-slate-700 leading-relaxed mb-4">
      Applicant Tracking Systems analyze your cover letter for
      <span className="font-semibold text-indigo-700"> relevance</span>,
      <span className="font-semibold text-purple-700"> clarity</span>, and
      <span className="font-semibold text-emerald-700"> keyword alignment</span>.
      This score reflects how closely your letter matches what recruiters and
      automated filters expect for the target role.
    </p>

    {/* Factors */}
    <div className="grid sm:grid-cols-2 gap-3 mb-4">
      {[
        {
          title: "Keyword Relevance",
          desc: "Match between your skills and job description terminology."
        },
        {
          title: "Role Alignment",
          desc: "How clearly your experience maps to the target position."
        },
        {
          title: "Experience Clarity",
          desc: "Readable, outcome-driven descriptions of your background."
        },
        {
          title: "Structure & Formatting",
          desc: "ATS-safe formatting without graphics or hidden text."
        }
      ].map((item) => (
        <div
          key={item.title}
          className="rounded-xl p-3
          bg-indigo-50/70 border border-indigo-200/50"
        >
          <p className="text-xs font-semibold text-indigo-800">
            {item.title}
          </p>
          <p className="text-[11px] text-slate-600 leading-relaxed">
            {item.desc}
          </p>
        </div>
      ))}
    </div>

    {/* Guidance */}
    <div className="rounded-xl p-3
      bg-emerald-50/70 border border-emerald-200/60">
      <p className="text-xs text-slate-600 leading-relaxed">
        💡 <span className="font-semibold text-emerald-700">Pro Tip:</span>{" "}
        Improving this score increases your chances of passing automated
        screening, but final selection always depends on
        <span className="font-semibold text-indigo-700"> recruiter review</span>{" "}
        and interview performance.
      </p>
    </div>
  </div>
</div>


      <Footer />
    </>
  );
}

/* ================= UI HELPERS ================= */
function Input({ label, helper, ...props }) {
  return (
    <div className="space-y-1.5">
      {/* Label */}
      {label && (
        <label className="text-sm font-semibold text-slate-700">
          {label}
        </label>
      )}

      {/* Input Field */}
      <input
        {...props}
        className="w-full rounded-xl px-4 py-3 text-sm
          bg-slate-50/90 backdrop-blur
          border border-slate-300
          text-slate-800 placeholder:text-slate-400
          shadow-sm
          transition-all duration-200
          focus:border-indigo-500
          focus:ring-2 focus:ring-indigo-200
          hover:border-slate-400
          outline-none"
      />

      {/* Helper Text */}
      {helper && (
        <p className="text-xs text-slate-500 leading-snug">
          {helper}
        </p>
      )}
    </div>
  );
}


function Textarea({ label, helper, rows = 4, ...props }) {
  return (
    <div className="space-y-1.5">
      {/* Label */}
      {label && (
        <label className="text-sm font-semibold text-slate-700">
          {label}
        </label>
      )}

      {/* Textarea */}
      <textarea
        {...props}
        rows={rows}
        className="w-full rounded-xl px-4 py-3 text-sm leading-relaxed
          bg-slate-50/90 backdrop-blur
          border border-slate-300
          text-slate-800 placeholder:text-slate-400
          shadow-sm
          transition-all duration-200
          focus:border-purple-500
          focus:ring-2 focus:ring-purple-200
          hover:border-slate-400
          outline-none resize-none"
      />

      {/* Helper Text */}
      {helper && (
        <p className="text-xs text-slate-500 leading-snug">
          {helper}
        </p>
      )}
    </div>
  );
}


function Select({ label, value, onChange, options, helper }) {
  return (
    <div className="space-y-1.5">
      {/* Label */}
      <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
        {label}
        <span className="text-xs font-normal text-slate-400">
          (Recommended)
        </span>
      </label>

      {/* Select */}
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full appearance-none rounded-xl px-4 py-3 pr-10 text-sm
            bg-slate-50/90 backdrop-blur
            border border-slate-300
            text-slate-800
            shadow-sm
            transition-all duration-200
            hover:border-slate-400
            focus:border-indigo-500
            focus:ring-2 focus:ring-indigo-200
            outline-none cursor-pointer"
        >
          {options.map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>

        {/* Custom dropdown arrow */}
        <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm">
          ▼
        </span>
      </div>

      {/* Helper text */}
      {helper && (
        <p className="text-xs text-slate-500 leading-snug">
          {helper}
        </p>
      )}
    </div>
  );
}

