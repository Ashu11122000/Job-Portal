import { useState } from "react";
import { motion } from "framer-motion";
import {
  FiEdit3,
  FiUser,
  FiBriefcase,
  FiMail,
  FiDownload,
  FiRefreshCcw,
  FiCheckCircle,
  FiZap,
  FiTarget,
  FiTrendingUp,
} from "react-icons/fi";
import Footer from "../../components/layout/Footer";

/* ================= TEMPLATE PRESETS ================= */
const templates = {
  Tech: "focusing on problem-solving, scalability, and technical expertise",
  HR: "highlighting communication, collaboration, and people skills",
  MBA: "emphasizing leadership, strategy, and business impact",
  Remote: "showcasing ownership, async collaboration, and reliability",
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

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  /* ================= ATS SCORE ================= */
  const calculateATSScore = () => {
    let score = 0;
    if (form.role) score += 30;
    if (form.skills.split(",").length >= 3) score += 40;
    if (form.experience) score += 30;
    setAtsScore(score);
  };

  /* ================= GENERATE LETTER ================= */
  const generateCoverLetter = () => {
    calculateATSScore();

    const toneLine =
      tone === "Formal"
        ? "I am writing to formally express my interest"
        : tone === "Startup"
        ? "I’m excited to apply and contribute"
        : "I’d love to explore this opportunity";

    const letter = `
Dear Hiring Manager at ${form.company || "your organization"},

My name is ${form.name || "a motivated professional"}, and ${toneLine} in the ${
      form.role || "open"
    } position.

With ${form.experience || "relevant"} experience and expertise in ${
      form.skills || "core skills"
    }, I bring value by ${templates[template]}.

I admire your organization’s vision and believe my skills, adaptability, and
growth mindset would allow me to contribute meaningfully to your team.

Thank you for your time and consideration. I would welcome the opportunity
to discuss how I can support your goals.

Sincerely,  
${form.name || "Your Name"}
    `.trim();

    setGenerated(letter);
  };

  /* ================= AI IMPROVE ================= */
  const improveLetter = () => {
    setGenerated((prev) =>
      prev
        .replace("I bring value by", "I consistently deliver impact by")
        .replace("Thank you for your time and consideration.", "Thank you for reviewing my application.")
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
      <section className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 pt-28 pb-24 px-6">
        <div className="max-w-6xl mx-auto">

          {/* ================= HEADER ================= */}
<div className="text-center mb-24 relative">
  {/* Subtle glow background */}
  <div className="absolute inset-0 -z-10 flex justify-center">
    <div className="w-[700px] h-[300px] bg-gradient-to-r from-indigo-400/20 via-purple-400/20 to-pink-400/20 blur-[120px]" />
  </div>

  {/* Badge */}
  <motion.span
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="inline-flex items-center gap-3 mb-8 px-8 py-3
      bg-indigo-50 border border-indigo-200/60
      rounded-full text-indigo-700 font-semibold shadow-md"
  >
    <span className="text-indigo-500 text-lg">✉️</span>
    AI-Powered Cover Letter Engine
  </motion.span>

  {/* Heading */}
  <motion.h1
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    className="text-[3.2rem] md:text-[4rem] font-black mb-6 leading-tight
      bg-gradient-to-br from-slate-900 via-indigo-700 to-purple-700
      bg-clip-text text-transparent"
  >
    Craft Cover Letters
    <br />
    That Recruiters Actually Read
  </motion.h1>

  {/* Description */}
  <motion.p
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.1 }}
    className="text-slate-700 max-w-3xl mx-auto text-lg leading-relaxed"
  >
    Generate <span className="font-semibold text-indigo-700">role-specific</span>,
    <span className="font-semibold text-purple-700"> ATS-optimized</span> cover letters
    using intelligent templates, tone control, and keyword scoring —
    designed to help you stand out in competitive hiring pipelines.
  </motion.p>

  {/* Trust signals */}
  <div className="mt-10 flex flex-wrap justify-center gap-6 text-sm">
    <span className="flex items-center gap-2 text-slate-600">
      ✅ ATS-Friendly Structure
    </span>
    <span className="flex items-center gap-2 text-slate-600">
      ⚡ Multiple Professional Templates
    </span>
    <span className="flex items-center gap-2 text-slate-600">
      🎯 Recruiter-Approved Language
    </span>
    <span className="flex items-center gap-2 text-slate-600">
      📄 PDF / DOCX Ready
    </span>
  </div>
</div>


          {/* ================= CONTROLS ================= */}
<div className="relative mb-20">
  {/* Ambient highlight */}
  <div className="absolute inset-0 -z-10 flex justify-center">
    <div className="w-[600px] h-[240px] bg-gradient-to-r from-indigo-400/20 via-purple-400/20 to-pink-400/20 blur-[110px]" />
  </div>

  {/* Section Header */}
  <div className="text-center mb-10">
    <span className="inline-flex items-center gap-2 mb-4 px-6 py-2
      bg-indigo-50 border border-indigo-200/60
      rounded-full text-indigo-700 text-sm font-semibold shadow-sm">
      🎛 Personalization Controls
    </span>

    <h3 className="text-3xl font-black mb-3
      bg-gradient-to-br from-slate-900 via-indigo-700 to-purple-700
      bg-clip-text text-transparent">
      Choose the Right Voice & Structure
    </h3>

    <p className="text-slate-600 max-w-2xl mx-auto text-base leading-relaxed">
      Fine-tune your cover letter’s <span className="font-semibold text-indigo-700">tone</span> and
      <span className="font-semibold text-purple-700"> format</span> to match the company culture,
      role expectations, and hiring manager preferences.
    </p>
  </div>

  {/* Selectors */}
  <div className="grid md:grid-cols-2 gap-8">
    {/* Tone */}
    <div className="relative rounded-2xl p-[1px]
      bg-gradient-to-br from-indigo-500/40 via-purple-500/30 to-pink-500/40">
      <div className="rounded-2xl bg-white/90 backdrop-blur-xl
        border border-slate-200/60 p-6 shadow-lg">
        <Select
          label="Tone"
          value={tone}
          onChange={setTone}
          options={["Formal", "Startup", "Friendly"]}
        />

        <p className="mt-3 text-sm text-slate-600 leading-relaxed">
          <span className="font-semibold text-indigo-700">Tone</span> defines how your personality comes
          across — from polished corporate language to modern, conversational styles.
        </p>

        <ul className="mt-3 text-xs text-slate-500 space-y-1">
          <li>• Formal → Enterprise, MNC, Government</li>
          <li>• Startup → Tech startups, fast-growing teams</li>
          <li>• Friendly → Creative, people-centric roles</li>
        </ul>
      </div>
    </div>

    {/* Template */}
    <div className="relative rounded-2xl p-[1px]
      bg-gradient-to-br from-indigo-500/40 via-purple-500/30 to-pink-500/40">
      <div className="rounded-2xl bg-white/90 backdrop-blur-xl
        border border-slate-200/60 p-6 shadow-lg">
        <Select
          label="Template"
          value={template}
          onChange={setTemplate}
          options={Object.keys(templates)}
        />

        <p className="mt-3 text-sm text-slate-600 leading-relaxed">
          <span className="font-semibold text-purple-700">Templates</span> control structure,
          section flow, and keyword emphasis — optimized for different industries and roles.
        </p>

        <ul className="mt-3 text-xs text-slate-500 space-y-1">
          <li>• Tech → Engineering & developer roles</li>
          <li>• HR → Human resources & operations</li>
          <li>• MBA → Consulting, product, leadership</li>
          <li>• Remote → Global & async-first teams</li>
        </ul>
      </div>
    </div>
  </div>
</div>


          {/* ================= FORM + PREVIEW ================= */}
          <div className="grid lg:grid-cols-2 gap-10 mb-20">

            {/* FORM */}
<div className="relative rounded-3xl p-[1px]
  bg-gradient-to-br from-indigo-500/40 via-purple-500/30 to-pink-500/40">

  <div className="relative rounded-3xl bg-white/90 backdrop-blur-xl
    border border-slate-200/60 p-10 shadow-[0_30px_80px_-25px_rgba(0,0,0,0.35)]">

    {/* Header */}
    <div className="mb-8">
      <span className="inline-flex items-center gap-2 mb-4 px-6 py-2
        bg-indigo-50 border border-indigo-200/60
        rounded-full text-indigo-700 text-sm font-semibold shadow-sm">
        ✍️ Candidate Profile
      </span>

      <h2 className="text-3xl font-black mb-3
        bg-gradient-to-br from-slate-900 via-indigo-700 to-purple-700
        bg-clip-text text-transparent flex items-center gap-2">
        <FiEdit3 className="text-indigo-600" />
        Your Professional Details
      </h2>

      <p className="text-slate-600 text-sm leading-relaxed max-w-xl">
        Provide accurate information to generate a
        <span className="font-semibold text-indigo-700"> recruiter-ready</span>,
        <span className="font-semibold text-purple-700"> ATS-optimized</span>
        cover letter tailored to your target role.
      </p>
    </div>

    {/* Inputs */}
    <div className="space-y-5">
      <Input
        name="name"
        placeholder="Your Full Name"
        value={form.name}
        onChange={handleChange}
      />

      <Input
        name="role"
        placeholder="Target Job Role (e.g. Frontend Developer)"
        value={form.role}
        onChange={handleChange}
      />

      <Input
        name="company"
        placeholder="Company Name (Optional but recommended)"
        value={form.company}
        onChange={handleChange}
      />

      <Input
        name="experience"
        placeholder="Experience Summary (e.g. 2+ years in React & UI)"
        value={form.experience}
        onChange={handleChange}
      />

      <Textarea
        name="skills"
        placeholder="Key Skills (comma separated: React, JavaScript, Tailwind, APIs)"
        value={form.skills}
        onChange={handleChange}
      />
    </div>

    {/* Actions */}
    <div className="flex gap-4 mt-10">
      <button
        onClick={generateCoverLetter}
        className="flex-1 inline-flex items-center justify-center gap-2
          bg-gradient-to-r from-indigo-600 to-purple-600
          text-slate-100 py-3 rounded-xl font-semibold
          shadow-lg shadow-indigo-500/30
          hover:scale-105 active:scale-95 transition"
      >
        ✨ Generate Cover Letter
      </button>

      <button
        onClick={resetForm}
        className="px-4 rounded-xl border border-slate-300
          text-slate-600 hover:bg-slate-100 transition"
        title="Reset form"
      >
        <FiRefreshCcw />
      </button>
    </div>

    {/* ATS SCORE */}
    <div className="mt-8">
      <div className="flex items-center justify-between mb-2">
        <p className="text-sm font-semibold text-slate-700 flex items-center gap-2">
          <FiTrendingUp className="text-indigo-600" />
          ATS Match Score
        </p>

        <span className="text-sm font-bold text-indigo-700">
          {atsScore}%
        </span>
      </div>

      <div className="w-full h-3 bg-slate-200 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-emerald-500 via-indigo-500 to-purple-600
          rounded-full transition-all duration-500"
          style={{ width: `${atsScore}%` }}
        />
      </div>

      <p className="mt-2 text-xs text-slate-500">
        Higher scores increase shortlisting chances by aligning keywords with ATS systems.
      </p>
    </div>
  </div>
</div>

            {/* PREVIEW */}
           <div className="relative rounded-3xl p-[1px]
  bg-gradient-to-br from-indigo-500/40 via-purple-500/30 to-pink-500/40">

  <div className="relative rounded-3xl bg-white/90 backdrop-blur-xl
    border border-slate-200/60 p-10
    shadow-[0_30px_80px_-25px_rgba(0,0,0,0.35)]">

    {/* Header */}
    <div className="mb-8">
      <span className="inline-flex items-center gap-2 mb-4 px-6 py-2
        bg-purple-50 border border-purple-200/60
        rounded-full text-purple-700 text-sm font-semibold shadow-sm">
        📄 Live Preview
      </span>

      <h2 className="text-3xl font-black mb-3
        bg-gradient-to-br from-slate-900 via-purple-700 to-indigo-700
        bg-clip-text text-transparent flex items-center gap-2">
        <FiMail className="text-purple-600" />
        Cover Letter Preview
      </h2>

      <p className="text-slate-600 text-sm leading-relaxed max-w-xl">
        Review how recruiters and ATS systems will see your cover letter.
        Fine-tune tone, clarity, and impact before exporting.
      </p>
    </div>

    {/* Content */}
    {generated ? (
      <>
        {/* Preview Box */}
        <div className="relative mb-8 rounded-2xl border border-slate-200
          bg-slate-50 p-6 shadow-inner">

          <pre className="whitespace-pre-wrap text-sm leading-relaxed
            text-slate-700 font-serif">
            {generated}
          </pre>

          {/* Subtle page indicator */}
          <span className="absolute top-3 right-4 text-xs text-slate-400">
            Recruiter View
          </span>
        </div>

        {/* Actions */}
        <div className="flex flex-wrap gap-4">
          <button
            onClick={improveLetter}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl
              bg-gradient-to-r from-slate-800 to-slate-900
              text-slate-100 font-semibold shadow
              hover:scale-105 active:scale-95 transition"
          >
            ✨ AI Improve
          </button>

          <button
            onClick={downloadText}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl
              bg-gradient-to-r from-indigo-600 to-purple-600
              text-slate-100 font-semibold shadow
              hover:scale-105 active:scale-95 transition"
          >
            <FiDownload />
            Export (PDF / DOCX)
          </button>

          <span className="text-xs text-slate-500 self-center">
            ATS-safe • Recruiter-formatted • Clean typography
          </span>
        </div>
      </>
    ) : (
      <div className="flex items-center justify-center h-48 rounded-2xl
        border border-dashed border-slate-300 bg-slate-50">

        <p className="text-slate-500 text-sm text-center max-w-sm">
          Your generated cover letter will appear here.
          <br />
          <span className="text-indigo-700 font-semibold">
            Fill your details and click “Generate”
          </span>{" "}
          to preview recruiter-ready output.
        </p>
      </div>
    )}
  </div>
</div>

          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}

/* ================= UI HELPERS ================= */
function Input(props) {
  return (
    <div className="relative">
      <input
        {...props}
        className="w-full rounded-xl px-4 py-3 text-sm
          bg-slate-50/80 backdrop-blur
          border border-slate-300
          text-slate-800 placeholder:text-slate-400
          focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200
          transition shadow-sm"
      />
    </div>
  );
}

function Textarea(props) {
  return (
    <textarea
      {...props}
      rows={4}
      className="w-full rounded-xl px-4 py-3 text-sm resize-none
        bg-slate-50/80 backdrop-blur
        border border-slate-300
        text-slate-800 placeholder:text-slate-400
        focus:border-purple-500 focus:ring-2 focus:ring-purple-200
        transition shadow-sm"
    />
  );
}


function Select({ label, value, onChange, options }) {
  return (
    <div className="space-y-2">
      <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
        {label}
        <span className="text-xs text-slate-400 font-normal">
          (Recommended)
        </span>
      </label>

      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-xl px-4 py-3
          bg-slate-50/80 backdrop-blur
          border border-slate-300
          text-slate-800
          focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200
          transition shadow-sm cursor-pointer"
      >
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>

      {/* UX helper */}
      <p className="text-xs text-slate-500">
        Choose a style that matches the company culture.
      </p>
    </div>
  );
}

