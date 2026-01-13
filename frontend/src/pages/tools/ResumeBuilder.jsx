// src/pages/tools/ResumeBuilder.jsx
import { useState } from "react";
import { motion } from "framer-motion";
import {
  FiFileText,
  FiMail,
  FiPhone,
  FiMapPin,
  FiLink,
  FiDownload,
  FiMoon,
  FiSun,
  FiLayers,
  FiZap,
  FiRefreshCw,
} from "react-icons/fi";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import Footer from "../../components/layout/Footer";
import {
  saveResumeApi,
  getResumeApi,
  listResumesApi,
} from "../../api/resumeApi";

export default function ResumeBuilder() {
  const [darkMode, setDarkMode] = useState(false);
  const [resumeId, setResumeId] = useState("");
  const [savedList, setSavedList] = useState([]);
  const [loadingList, setLoadingList] = useState(false);

  const [form, setForm] = useState({
    name: "",
    title: "",
    summary: "",
    skills: "",
    experience: "",
    education: "",
    certifications: "",
    projects: "",
    email: "",
    phone: "",
    location: "",
    links: "",
  });

  const [visible, setVisible] = useState(
    Object.fromEntries(Object.keys(form).map((k) => [k, true]))
  );

  /* ---------------- BASIC HANDLERS ---------------- */

  const handleChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const toggleVisible = (key) =>
    setVisible((v) => ({ ...v, [key]: !v[key] }));

  const autoFill = () => {
    setForm({
      name: "Ashish Kumar",
      title: "Full Stack Developer",
      summary:
        "Full-stack developer with strong experience in React, Node.js, MySQL, and cloud deployments.",
      skills: "React, Node.js, MySQL, Docker, Git",
      experience: "Built Job Portal & Resume Builder applications",
      education: "B.Tech Computer Science – 2023",
      certifications: "AWS Cloud Practitioner",
      projects: "Job Portal, Resume Builder",
      email: "ashish@example.com",
      phone: "+91 9876543210",
      location: "India",
      links: "GitHub | LinkedIn",
    });
  };

  /* ---------------- PDF EXPORT ---------------- */

  const exportPDF = async () => {
    const resume = document.getElementById("resume-preview");
    if (!resume) return;

    const canvas = await html2canvas(resume, { scale: 2 });
    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF("p", "mm", "a4");
    const width = pdf.internal.pageSize.getWidth();
    const height = (canvas.height * width) / canvas.width;

    pdf.addImage(imgData, "PNG", 0, 0, width, height);
    pdf.save("resume.pdf");
  };

  /* ---------------- API CALLS (SAFE) ---------------- */

  const handleSaveResume = async () => {
    try {
      const res = await saveResumeApi(form);
      setResumeId(res?.data?.resumeId || "");
      alert("✅ Resume saved successfully");
    } catch (err) {
      console.error("Save error:", err);
      alert("❌ Failed to save resume");
    }
  };

  const handleLoadResume = async () => {
    if (!resumeId) return;

    try {
      const res = await getResumeApi(resumeId);
      if (res?.data?.resume) {
        setForm(res.data.resume);
      }
    } catch (err) {
      console.error("Load error:", err);
      alert("❌ Failed to load resume");
    }
  };

  const handleRefreshList = async () => {
    setLoadingList(true);
    try {
      const res = await listResumesApi();

      // ✅ HARD GUARD AGAINST 500 / EMPTY RESPONSE
      const resumes = Array.isArray(res?.data?.resumes)
        ? res.data.resumes
        : [];

      setSavedList(resumes);
    } catch (err) {
      console.error("List error:", err);
      alert("⚠️ Resume list unavailable (server issue)");
      setSavedList([]);
    } finally {
      setLoadingList(false);
    }
  };

  /* ---------------- UI ---------------- */

  return (
    <>
      <section className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 pt-32 pb-24 px-6">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12">

          {/* LEFT */}
<div className="relative">
  {/* Header */}
  <div className="mb-8">
    <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 flex items-center gap-3">
      <span className="p-3 rounded-2xl bg-gradient-to-br from-indigo-600 to-purple-600 text-indigo-50 shadow-lg">
        <FiLayers />
      </span>
      AI Resume Builder
    </h1>

    <p className="mt-3 max-w-2xl text-slate-600 text-base leading-relaxed">
      Build a professional, ATS-friendly resume powered by intelligent
      automation. Customize every section, preview instantly, and export with
      confidence.
    </p>
  </div>

  {/* Primary Actions */}
  <div className="flex flex-wrap gap-4 mb-8">
    <button
      onClick={() => setDarkMode(!darkMode)}
      className="
        px-6 py-3 rounded-xl
        bg-slate-800 text-slate-100
        flex items-center gap-2
        shadow-md hover:shadow-lg
        hover:scale-[1.03]
        transition
      "
    >
      {darkMode ? <FiSun /> : <FiMoon />}
      <span className="font-semibold">
        {darkMode ? "Light Mode" : "Dark Mode"}
      </span>
    </button>

    <button
      onClick={autoFill}
      className="
        px-6 py-3 rounded-xl
        bg-gradient-to-r from-indigo-600 to-purple-600
        text-indigo-50
        font-semibold
        flex items-center gap-2
        shadow-lg hover:shadow-xl
        hover:scale-[1.03]
        transition
      "
    >
      <FiZap />
      AI Auto-Fill Resume
    </button>
  </div>

  {/* Save / Load / Refresh */}
  <div className="flex flex-wrap gap-3 mb-6">
    <button
      onClick={handleSaveResume}
      className="
        px-5 py-2.5 rounded-xl
        bg-emerald-600 text-emerald-50
        font-semibold
        flex items-center gap-2
        shadow hover:shadow-md
        transition
      "
    >
      <FiLayers />
      Save Resume
    </button>

    <button
      onClick={handleLoadResume}
      disabled={!resumeId}
      className="
        px-5 py-2.5 rounded-xl
        bg-indigo-600 text-indigo-50
        font-semibold
        flex items-center gap-2
        shadow hover:shadow-md
        transition
        disabled:opacity-50
      "
    >
      <FiDownload />
      Load Resume
    </button>

    <button
      onClick={handleRefreshList}
      className="
        px-5 py-2.5 rounded-xl
        bg-purple-700 text-purple-50
        font-semibold
        flex items-center gap-2
        shadow hover:shadow-md
        transition
      "
    >
      <FiRefreshCw />
      Refresh List
    </button>
  </div>

  {/* Loading State */}
  {loadingList && (
    <div className="mb-4 flex items-center gap-2 text-sm text-indigo-600 font-medium">
      <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
      Fetching your saved resumes…
    </div>
  )}

  {/* Saved Resume Selector */}
  {savedList.length > 0 && (
    <div className="mb-8">
      <label className="block mb-2 text-sm font-semibold text-slate-700">
        Load a previously saved resume
      </label>

      <select
        onChange={(e) => setResumeId(e.target.value)}
        className="
          w-full p-3 rounded-xl
          border border-slate-300
          bg-slate-50
          text-slate-800
          shadow-sm
          focus:ring-2 focus:ring-indigo-500
        "
      >
        <option value="">Select resume</option>
        {savedList.map((r) => (
          <option key={r.id || r._id} value={r.id || r._id}>
            {r.name} — {r.title}
          </option>
        ))}
      </select>
    </div>
  )}

  {/* Form Container */}
  <div
    className="
      space-y-5
      bg-slate-50/80 backdrop-blur-xl
      rounded-3xl
      border border-slate-200
      shadow-[0_30px_80px_rgba(0,0,0,0.08)]
      p-8
    "
  >
    <p className="text-sm text-slate-600 mb-2">
      Toggle visibility to control what appears on your resume preview.
    </p>

    {Object.keys(form).map((key) => (
      <Field
        key={key}
        label={key}
        visible={visible[key]}
        toggleVisible={() => toggleVisible(key)}
      >
        <input
          name={key}
          value={form[key]}
          onChange={handleChange}
          disabled={!visible[key]}
          className="
            w-full p-3 rounded-xl
            border border-slate-300
            bg-white
            text-slate-800
            shadow-sm
            disabled:opacity-50
            focus:ring-2 focus:ring-indigo-500
          "
        />
      </Field>
    ))}
  </div>
</div>


          {/* RIGHT */}
         <motion.div
  id="resume-preview"
  className={`
    relative overflow-hidden
    rounded-[28px] p-10
    border
    shadow-[0_40px_120px_rgba(0,0,0,0.12)]
    backdrop-blur-xl
    transition-all
    ${
      darkMode
        ? "bg-slate-900/90 text-slate-100 border-slate-700"
        : "bg-white/90 text-slate-900 border-slate-200"
    }
  `}
  initial={{ opacity: 0, x: 40 }}
  animate={{ opacity: 1, x: 0 }}
  transition={{ duration: 0.5, ease: "easeOut" }}
>
  {/* Ambient Glow */}
  <div className="pointer-events-none absolute -top-24 -right-24 w-64 h-64 bg-indigo-500/20 blur-3xl rounded-full" />
  <div className="pointer-events-none absolute -bottom-24 -left-24 w-64 h-64 bg-purple-500/20 blur-3xl rounded-full" />

  {/* Header */}
  <div className="relative z-10 flex items-center justify-between mb-8">
    <div>
      <h2 className="text-2xl font-extrabold tracking-tight flex items-center gap-3">
        <span className="p-2 rounded-xl bg-gradient-to-br from-indigo-600 to-purple-600 text-indigo-50 shadow-md">
          <FiFileText />
        </span>
        Resume Preview
      </h2>

      <p className="mt-2 text-sm text-slate-500 max-w-sm">
        This is exactly how recruiters will see your resume. Optimized for
        clarity, ATS, and impact.
      </p>
    </div>

    <button
      onClick={exportPDF}
      className="
        px-5 py-2.5 rounded-xl
        bg-gradient-to-r from-slate-900 to-slate-700
        text-slate-100
        font-semibold
        flex items-center gap-2
        shadow-lg hover:shadow-xl
        hover:scale-[1.04]
        transition
      "
    >
      <FiDownload />
      Export PDF
    </button>
  </div>

  {/* Divider */}
  <div className="relative z-10 h-px w-full bg-gradient-to-r from-transparent via-slate-300 to-transparent mb-8" />

  {/* Preview Content */}
  <div
    className={`
      relative z-10
      rounded-2xl p-8
      leading-relaxed
      ${
        darkMode
          ? "bg-slate-800/70"
          : "bg-slate-50"
      }
    `}
  >
    <ResumePreviewContent form={form} visible={visible} />
  </div>

  {/* Footer Hint */}
  <div className="relative z-10 mt-6 text-xs text-slate-500 flex items-center gap-2">
    <span className="w-2 h-2 rounded-full bg-emerald-500" />
    Tip: Keep content concise—recruiters scan resumes in under 7 seconds.
  </div>
</motion.div>

        </div>
      </section>

{/* ================= WHY THIS RESUME BUILDER ================= */}
{/* ================= WHY THIS RESUME BUILDER WORKS ================= */}
<section className="relative py-32 px-6 bg-white overflow-hidden">
  <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-24 items-center">

    {/* Subtle ambient background */}
    <div className="absolute inset-0 -z-10 flex justify-center">
      <div
        className="w-[920px] h-[420px]
        bg-gradient-to-r from-indigo-400/10 via-purple-400/10 to-pink-400/10
        blur-[180px]"
      />
    </div>

    {/* LEFT — VALUE & LOGIC */}
    <div>
      {/* Badge */}
      <span
        className="inline-flex items-center gap-2 mb-6 px-6 py-2
        bg-indigo-50 border border-indigo-200/60
        rounded-full text-indigo-700 text-sm font-semibold shadow-sm"
      >
        🚀 Built for Real Hiring Pipelines
      </span>

      {/* Heading */}
      <h2
        className="text-[2.8rem] font-black mb-6 leading-tight
        bg-gradient-to-br from-slate-900 via-indigo-700 to-purple-700
        bg-clip-text text-transparent"
      >
        Why This Resume Builder Actually Works
      </h2>

      {/* Explanation */}
      <p className="text-slate-600 text-base leading-relaxed mb-10 max-w-xl">
        Modern hiring is driven by a combination of
        <span className="font-semibold text-indigo-700"> automated screening</span>
        and
        <span className="font-semibold text-purple-700"> human judgment</span>.
        Most resumes fail because they are optimized for neither.
        This builder is engineered specifically for how resumes are
        <span className="font-semibold text-emerald-700"> parsed, scanned, and evaluated</span>
        in real hiring workflows.
      </p>

      {/* Value Points */}
      <ul className="space-y-6 text-sm text-slate-600 leading-relaxed">
        {[
          {
            title: "ATS-Safe, Future-Proof Structure",
            desc: "Avoids columns, icons, graphics, and formatting that break ATS parsing."
          },
          {
            title: "Keyword-First Resume Architecture",
            desc: "Ensures critical role-specific keywords appear exactly where ATS and recruiters expect them."
          },
          {
            title: "Immediate Value Visibility",
            desc: "Designed so your strengths and role-fit are clear within the first 6–8 seconds."
          },
          {
            title: "Career-Stage Adaptability",
            desc: "Equally effective for freshers, experienced professionals, and career switchers."
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

    {/* RIGHT — AUTHORITY / TESTIMONIAL */}
    <div
      className="relative rounded-3xl p-[1px]
      bg-gradient-to-br from-indigo-500/30 via-purple-500/20 to-pink-500/30"
    >
      <div
        className="rounded-3xl p-10
        bg-white/90 backdrop-blur-xl
        border border-indigo-200/60
        shadow-[0_25px_60px_-15px_rgba(0,0,0,0.35)]"
      >
        {/* Quote icon */}
        <div className="text-5xl text-indigo-500 mb-4 leading-none">“</div>

        <p className="text-sm text-slate-700 leading-relaxed">
          In most cases, resumes are rejected because they are either
          visually distracting or lack clear relevance.
          This builder consistently produces resumes that are
          <span className="font-semibold text-indigo-700"> structured</span>,
          <span className="font-semibold text-purple-700"> keyword-aligned</span>,
          and
          <span className="font-semibold text-emerald-700"> effortless to evaluate</span>
          — which dramatically increases shortlisting rates.
        </p>

        {/* Authority */}
        <div className="mt-8 flex items-center gap-4">
          <div
            className="h-11 w-11 rounded-full
            bg-gradient-to-br from-indigo-600 to-purple-600
            text-white flex items-center justify-center text-sm font-bold"
          >
            SR
          </div>

          <div>
            <p className="text-xs font-semibold text-slate-800">
              Senior Recruiter
            </p>
            <p className="text-[11px] text-slate-500">
              Tech, Product & Engineering Hiring
            </p>
          </div>
        </div>
      </div>
    </div>

  </div>
</section>


{/* ================= HOW RECRUITERS SCAN RESUMES ================= */}
{/* ================= HOW RECRUITERS READ RESUMES ================= */}
<section className="relative py-32 px-6 bg-gradient-to-br from-indigo-50 to-purple-50 overflow-hidden">
  <div className="max-w-6xl mx-auto">

    {/* Ambient background accent */}
    <div className="absolute inset-0 -z-10 flex justify-center">
      <div
        className="w-[980px] h-[440px]
        bg-gradient-to-r from-indigo-400/15 via-purple-400/15 to-pink-400/15
        blur-[180px]"
      />
    </div>

    {/* Header */}
    <div className="text-center mb-24">
      <span
        className="inline-flex items-center gap-2 mb-6 px-6 py-2
        bg-indigo-50 border border-indigo-200/60
        rounded-full text-indigo-700 text-sm font-semibold shadow-sm"
      >
        👁️ Recruiter Decision Flow
      </span>

      <h2
        className="text-[2.8rem] font-black mb-6
        bg-gradient-to-br from-slate-900 via-indigo-700 to-purple-700
        bg-clip-text text-transparent"
      >
        How Recruiters Read Resumes
      </h2>

      <p className="text-slate-600 max-w-3xl mx-auto text-base leading-relaxed">
        Recruiters don’t read resumes line by line.
        They evaluate them in
        <span className="font-semibold text-indigo-700"> fast, structured passes</span>
        — each stage deciding whether your resume advances or gets rejected.
        Understanding this flow is critical to building a resume that survives screening.
      </p>
    </div>

    {/* Timeline Cards */}
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-12">
      {[
        {
          step: "6–8 sec",
          icon: "⚡",
          title: "Initial Scan",
          desc: "A rapid scan to check role relevance, keyword presence, and formatting integrity.",
          points: [
            "Job title & experience alignment",
            "Critical keyword matches",
            "ATS-safe structure"
          ]
        },
        {
          step: "20–30 sec",
          icon: "🔍",
          title: "Focused Review",
          desc: "Only shortlisted resumes receive deeper attention for quality and impact.",
          points: [
            "Clear achievements & outcomes",
            "Skill-to-role relevance",
            "Consistency & clarity"
          ]
        },
        {
          step: "Decision",
          icon: "✅",
          title: "Shortlist or Reject",
          desc: "A final decision based on confidence, fit, and ease of evaluation.",
          points: [
            "Immediate value clarity",
            "Professional tone",
            "Low cognitive load"
          ]
        }
      ].map((s) => (
        <div
          key={s.title}
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
            {/* Header */}
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

    {/* Bottom Insight */}
    <div className="mt-24 text-center">
      <p className="text-xs text-slate-500 max-w-2xl mx-auto leading-relaxed">
        ⚠️ Most resumes fail at the first scan — not due to lack of skills,
        but because key information isn’t visible fast enough.
        This builder is designed specifically to win the
        <span className="font-semibold text-indigo-700"> first 8 seconds</span>.
      </p>
    </div>

  </div>
</section>

{/* ================= WHO SHOULD USE THIS ================= */}
{/* ================= WHO THIS RESUME BUILDER IS FOR ================= */}
<section className="relative py-32 px-6 bg-white/70 overflow-hidden">
  <div className="max-w-6xl mx-auto">

    {/* Ambient background */}
    <div className="absolute inset-0 -z-10 flex justify-center">
      <div
        className="w-[960px] h-[420px]
        bg-gradient-to-r from-indigo-400/10 via-purple-400/10 to-pink-400/10
        blur-[180px]"
      />
    </div>

    {/* Header */}
    <div className="text-center mb-24">
      <span
        className="inline-flex items-center gap-2 mb-6 px-6 py-2
        bg-indigo-50 border border-indigo-200/60
        rounded-full text-indigo-700 text-sm font-semibold shadow-sm"
      >
        🎯 Career-Stage Adaptive
      </span>

      <h2
        className="text-[2.8rem] font-black mb-6
        bg-gradient-to-br from-slate-900 via-indigo-700 to-purple-700
        bg-clip-text text-transparent"
      >
        Who This Resume Builder Is For
      </h2>

      <p className="text-slate-600 max-w-3xl mx-auto text-base leading-relaxed">
        Hiring expectations change dramatically depending on where you are
        in your career. This resume builder adapts to
        <span className="font-semibold text-indigo-700"> experience level</span>,
        <span className="font-semibold text-purple-700"> role seniority</span>,
        and
        <span className="font-semibold text-emerald-700"> hiring context</span>
        — ensuring your resume speaks the right language every time.
      </p>
    </div>

    {/* Persona Cards */}
    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-12">
      {[
        {
          title: "Students & Freshers",
          icon: "🎓",
          desc: "Build credible, professional resumes even with limited experience.",
          points: [
            "Project & internship prioritization",
            "Clean entry-level structure",
            "Beginner-safe ATS formatting"
          ]
        },
        {
          title: "Working Professionals",
          icon: "💼",
          desc: "Position your experience for promotions and stronger offers.",
          points: [
            "Outcome-driven achievements",
            "Role-specific keyword alignment",
            "Leadership & ownership framing"
          ]
        },
        {
          title: "Career Switchers",
          icon: "🔄",
          desc: "Reframe past experience to fit a new role or industry.",
          points: [
            "Transferable skill mapping",
            "Clear career narrative",
            "Reduced rejection risk"
          ]
        },
        {
          title: "Remote Job Seekers",
          icon: "🌍",
          desc: "Compete effectively in global, ATS-driven hiring pipelines.",
          points: [
            "Global ATS compatibility",
            "Async-friendly communication",
            "Impact-focused writing"
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
    <div className="mt-24 text-center">
      <p className="text-xs text-slate-500 max-w-2xl mx-auto leading-relaxed">
        ⚡ Built to support applications for startups, enterprises, and
        remote-first teams — optimized for both
        <span className="font-semibold text-indigo-700"> automated systems</span>
        and
        <span className="font-semibold text-purple-700"> human recruiters</span>.
      </p>
    </div>

  </div>
</section>

{/* ================= FINAL CTA ================= */}
{/* ================= FINAL RESUME BUILDER CTA ================= */}
<section
  className="relative py-40 px-6
  bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600
  text-white overflow-hidden"
>
  {/* Ambient glow */}
  <div className="absolute inset-0 -z-10 flex justify-center">
    <div
      className="w-[1100px] h-[520px]
      bg-gradient-to-r from-white/25 via-white/10 to-white/25
      blur-[200px]"
    />
  </div>

  <div className="max-w-4xl mx-auto text-center">

    {/* Badge */}
    <span
      className="inline-flex items-center gap-2 mb-8 px-7 py-2.5
      bg-white/15 backdrop-blur-md border border-white/30
      rounded-full text-sm font-semibold tracking-wide"
    >
      🚀 Designed for Modern Hiring
    </span>

    {/* Headline */}
    <h2 className="text-[2.8rem] md:text-[3.4rem] font-black mb-6 leading-tight">
      Build a Resume Recruiters
      <br />
      Actually Want to Read
    </h2>

    {/* Value Explanation */}
    <p className="text-lg md:text-xl text-indigo-100 mb-12 leading-relaxed">
      Most resumes fail before a human ever sees them.
      This builder helps you create resumes that pass
      <span className="font-semibold text-white"> ATS screening</span>,
      communicate
      <span className="font-semibold text-white"> clear value</span>,
      and earn attention from
      <span className="font-semibold text-white"> real recruiters</span>
      — without guesswork.
    </p>

    {/* Primary CTA */}
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="inline-flex items-center gap-3
      bg-white text-indigo-700 px-14 py-4 rounded-full
      font-semibold text-lg
      shadow-[0_30px_70px_-15px_rgba(0,0,0,0.4)]
      hover:scale-105 active:scale-95 transition"
    >
      🚀 Start Building Your Resume
    </button>

    {/* Trust & Reassurance */}
    <div className="mt-10 text-xs text-indigo-100/90 leading-relaxed">
      ✔ ATS-safe formatting &nbsp;•&nbsp;
      ✔ Recruiter-approved structure &nbsp;•&nbsp;
      ✔ No credit card required
      <br />
      ✔ Works for freshers, professionals & career switchers
    </div>

  </div>
</section>

      <Footer />
    </>
  );
}

/* ---------------- SUPPORT ---------------- */

function Field({ label, children, visible, toggleVisible }) {
  return (
    <div className="relative rounded-2xl border border-slate-200 bg-slate-50/80 p-4 shadow-sm transition hover:shadow-md">
      {/* Header */}
      <div className="flex items-center justify-between mb-2">
        <label className="flex items-center gap-3 font-semibold capitalize text-slate-800">
          <input
            type="checkbox"
            checked={visible}
            onChange={toggleVisible}
            className="
              h-4 w-4 rounded
              border-slate-300
              text-indigo-600
              focus:ring-indigo-500
            "
          />
          {label}
        </label>

        <span
          className={`text-xs font-semibold px-2 py-1 rounded-full
            ${
              visible
                ? "bg-emerald-100 text-emerald-700"
                : "bg-slate-200 text-slate-500"
            }`}
        >
          {visible ? "Visible" : "Hidden"}
        </span>
      </div>

      {/* Input Area */}
      <div
        className={`transition-all ${
          visible ? "opacity-100" : "opacity-50"
        }`}
      >
        {children}
      </div>

      {/* Helper Text */}
      <p className="mt-2 text-xs text-slate-500">
        This section will {visible ? "appear" : "not appear"} on your resume.
      </p>
    </div>
  );
}


function ResumePreviewContent({ form, visible }) {
  return (
    <div className="space-y-6 text-[15px] leading-relaxed">
      {Object.entries(form).map(([key, value]) => {
        if (!visible[key] || !value) return null;

        return (
          <div
            key={key}
            className="
              group
              rounded-xl
              border border-slate-200
              bg-white/70
              p-4
              shadow-sm
              transition
              hover:shadow-md
            "
          >
            {/* Label */}
            <div className="mb-1 flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wide text-indigo-600">
                {key.replace(/_/g, " ")}
              </span>

              <span className="text-[10px] text-slate-400 opacity-0 group-hover:opacity-100 transition">
                Recruiter view
              </span>
            </div>

            {/* Content */}
            <p className="text-slate-800 whitespace-pre-line">
              {value}
            </p>
          </div>
        );
      })}

      {/* Empty State */}
      {Object.keys(form).every(
        (k) => !visible[k] || !form[k]
      ) && (
        <div className="text-center py-12 text-slate-500">
          <p className="font-semibold">
            No resume sections visible
          </p>
          <p className="text-sm mt-1">
            Enable sections from the form to preview your resume.
          </p>
        </div>
      )}
    </div>
  );
}

