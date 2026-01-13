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

