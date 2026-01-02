// src/pages/tools/ResumeBuilder.jsx
import { useState } from "react";
import { motion } from "framer-motion";
import {
  FiFileText,
  FiUser,
  FiBriefcase,
  FiLayers,
  FiMail,
  FiPhone,
  FiMapPin,
  FiLink,
  FiAward,
  FiBook,
  FiFolder,
  FiDownload,
  FiMoon,
  FiSun,
  FiZap,
} from "react-icons/fi";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import Footer from "../../components/layout/Footer";

export default function ResumeBuilder() {
  const [template, setTemplate] = useState("modern");
  const [darkMode, setDarkMode] = useState(false);

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

  // visible controls for Option A: checkbox beside each field
  const [visible, setVisible] = useState({
    name: true,
    title: true,
    summary: true,
    skills: true,
    experience: true,
    education: true,
    certifications: true,
    projects: true,
    email: true,
    phone: true,
    location: true,
    links: true,
  });

  // JD parser state
  const [jdText, setJdText] = useState("");

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const toggleVisible = (key) => {
    setVisible((v) => ({ ...v, [key]: !v[key] }));
  };

  // 🔥 AI Autofill (Mock → Replace with backend later)
  const autoFill = () => {
    const data = {
      name: "Ashish Kumar",
      title: "Full Stack Developer",
      summary:
        "Full-stack developer with strong experience in React.js, Spring Boot, MySQL, and cloud deployments. Passionate about building scalable products and solving real business problems.",
      skills: "React.js, Java, Spring Boot, MySQL, Docker, Kubernetes, Git",
      experience:
        "- Built HRMS web app using React + Spring Boot\n- Implemented RBAC auth and JWT\n- Created scalable microservices",
      education: "B.Tech in Computer Science – 2023 – VTU Bangalore",
      certifications: "AWS Cloud Practitioner\nJava Certification",
      projects:
        "- Netflix Clone (React + TMDB API)\n- Job Portal Backend (Spring Boot + MySQL)",
      email: "ashish@example.com",
      phone: "+91 9876543210",
      location: "Bangalore, India",
      links: "GitHub.com/ashish, LinkedIn.com/in/ashish",
    };
    setForm(data);
    // also ensure all fields visible
    setVisible((v) => {
      const all = { ...v };
      Object.keys(all).forEach((k) => (all[k] = true));
      return all;
    });
  };

  // 📄 Export to PDF
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

  // simple JD parser stubs
  const parseJD = (text) => {
    setJdText(text);
  };

  const handleJDExtract = () => {
    if (!jdText.trim()) return;
    // mock extraction (replace with real AI call)
    setForm((prev) => ({
      ...prev,
      title: "Software Engineer (extracted)",
      summary:
        "Experienced engineer matching role. Extracted from JD: emphasis on React, Node, AWS.",
      skills: "React, Node.js, AWS, Docker",
    }));
    // make sure relevant fields are visible
    setVisible((v) => ({ ...v, title: true, summary: true, skills: true }));
  };

  // 🎨 Dynamic Template Classes
  const templateStyles = {
    modern: "rounded-3xl border shadow-xl p-10",
    minimal: "border-l-4 border-indigo-600 pl-6 pr-4",
    ats: "border border-slate-300 p-6 text-sm tracking-wide",
  };

  return (
    <>
      {/* PAGE */}
      <section className="min-h-screen bg-linear-to-br from-indigo-50 via-white to-purple-50 pt-32 pb-24 px-6">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-start">
          {/* LEFT PANEL – FORM */}
          <div>
            {/* TITLE + SHIMMER */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="relative inline-block mb-10"
            >
              <h1
                className="
        text-4xl md:text-5xl font-extrabold 
        bg-gradient-to-r from-indigo-700 via-purple-700 to-indigo-700 
        bg-clip-text text-transparent tracking-tight
      "
              >
                AI Resume Builder
              </h1>

              {/* SHIMMER EFFECT */}
              <div className="absolute -bottom-2 left-0 w-full h-[3px] bg-gradient-to-r from-indigo-500 via-purple-600 to-indigo-500 rounded-full overflow-hidden">
                <div className="animate-[shimmer_2s_infinite] w-1/3 h-full bg-white/60 blur-sm"></div>
              </div>
            </motion.div>

            {/* KEYFRAME SHIMMER */}
            <style>
              {`
      @keyframes shimmer {
        0% { transform: translateX(-150%); }
        100% { transform: translateX(250%); }
      }
    `}
            </style>

            {/* TEMPLATE PREVIEW THUMBNAILS */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="flex gap-5 items-center mb-8"
            >
              {[
                {
                  id: "modern",
                  label: "Modern",
                  color: "from-indigo-500 to-purple-500",
                },
                {
                  id: "minimal",
                  label: "Minimal",
                  color: "from-slate-300 to-slate-100",
                },
                {
                  id: "ats",
                  label: "ATS",
                  color: "from-slate-700 to-slate-900",
                },
              ].map((t) => (
                <div
                  key={t.id}
                  onClick={() => setTemplate(t.id)}
                  className={`cursor-pointer w-20 h-24 rounded-xl border shadow-md bg-gradient-to-b ${
                    t.color
                  } flex items-end justify-center pb-2 text-xs font-semibold transition-all duration-300 hover:scale-110 hover:shadow-xl ${
                    template === t.id ? "ring-4 ring-indigo-600 scale-110" : ""
                  }`}
                >
                  {t.label}
                </div>
              ))}
            </motion.div>

            {/* ACTION BUTTONS */}
            <div className="flex gap-4 mb-8">
              {/* Dark Mode */}
              <button
                onClick={() => setDarkMode(!darkMode)}
                className="px-5 py-2 rounded-xl bg-black text-white flex items-center gap-2 hover:scale-[1.03] transition-all shadow-md"
              >
                {darkMode ? <FiSun /> : <FiMoon />}
                {darkMode ? "Light" : "Dark"}
              </button>

              {/* AI Auto-fill */}
              <button
                onClick={autoFill}
                className="px-5 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold flex items-center gap-3 shadow-lg hover:scale-[1.03]"
              >
                <FiZap /> Auto-Fill (AI)
              </button>
            </div>

            {/* AI JD PARSER */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8 bg-white/70 backdrop-blur-xl rounded-2xl border p-5 shadow-lg"
            >
              <label className="font-semibold text-slate-700 text-sm mb-2 block">
                Paste Job Description (AI will extract key skills, summary,
                role)
              </label>

              <textarea
                rows={4}
                onChange={(e) => parseJD(e.target.value)}
                placeholder="Paste full job description here..."
                className="w-full px-4 py-3 rounded-xl border border-slate-300 outline-none focus:ring-2 focus:ring-indigo-500"
              />

              <button
                onClick={handleJDExtract}
                className="mt-3 w-full py-2 rounded-xl bg-indigo-600 text-white font-semibold hover:scale-[1.02] transition"
              >
                Extract Resume Details using AI
              </button>
            </motion.div>

            {/* FORM BOX */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="space-y-5 bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border p-8"
            >
              {/* Full Name */}
              <Field
                label="Full Name"
                name="name"
                visible={visible.name}
                toggleVisible={() => toggleVisible("name")}
              >
                <input
                  name="name"
                  onChange={handleChange}
                  value={form.name}
                  disabled={!visible.name}
                  className={`w-full px-3 py-2 rounded-xl border border-slate-300 outline-none focus:ring-2 focus:ring-indigo-500 ${
                    !visible.name ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                  placeholder="e.g. Ankit Sharma"
                />
              </Field>

              {/* Headline */}
              <Field
                label="Headline / Role"
                name="title"
                visible={visible.title}
                toggleVisible={() => toggleVisible("title")}
              >
                <input
                  name="title"
                  onChange={handleChange}
                  value={form.title}
                  disabled={!visible.title}
                  className={`w-full px-3 py-2 rounded-xl border border-slate-300 outline-none focus:ring-2 focus:ring-indigo-500 ${
                    !visible.title ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                  placeholder="e.g. Frontend Developer | React.js"
                />
              </Field>

              {/* CONTACT */}
              <div className="grid grid-cols-2 gap-4">
                <Field
                  label="Email"
                  name="email"
                  visible={visible.email}
                  toggleVisible={() => toggleVisible("email")}
                >
                  <input
                    name="email"
                    onChange={handleChange}
                    value={form.email}
                    disabled={!visible.email}
                    className={`w-full px-3 py-2 rounded-xl border border-slate-300 outline-none focus:ring-2 focus:ring-indigo-500 ${
                      !visible.email ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                    placeholder="example@mail.com"
                  />
                </Field>

                <Field
                  label="Phone"
                  name="phone"
                  visible={visible.phone}
                  toggleVisible={() => toggleVisible("phone")}
                >
                  <input
                    name="phone"
                    onChange={handleChange}
                    value={form.phone}
                    disabled={!visible.phone}
                    className={`w-full px-3 py-2 rounded-xl border border-slate-300 outline-none focus:ring-2 focus:ring-indigo-500 ${
                      !visible.phone ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                    placeholder="+91 9876543210"
                  />
                </Field>
              </div>

              {/* Location */}
              <Field
                label="Location"
                name="location"
                visible={visible.location}
                toggleVisible={() => toggleVisible("location")}
              >
                <input
                  name="location"
                  onChange={handleChange}
                  value={form.location}
                  disabled={!visible.location}
                  className={`w-full px-3 py-2 rounded-xl border border-slate-300 outline-none focus:ring-2 focus:ring-indigo-500 ${
                    !visible.location ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                  placeholder="Bengaluru, India"
                />
              </Field>

              {/* Summary */}
              <Field
                label="Professional Summary"
                name="summary"
                visible={visible.summary}
                toggleVisible={() => toggleVisible("summary")}
              >
                <textarea
                  name="summary"
                  rows={3}
                  onChange={handleChange}
                  value={form.summary}
                  disabled={!visible.summary}
                  className={`w-full px-3 py-2 rounded-xl border border-slate-300 outline-none focus:ring-2 focus:ring-indigo-500 ${
                    !visible.summary ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                  placeholder="Brief summary about your experience, stack and achievements."
                />
              </Field>

              {/* Skills */}
              <Field
                label="Skills (comma separated)"
                name="skills"
                visible={visible.skills}
                toggleVisible={() => toggleVisible("skills")}
              >
                <textarea
                  name="skills"
                  rows={2}
                  onChange={handleChange}
                  value={form.skills}
                  disabled={!visible.skills}
                  className={`w-full px-3 py-2 rounded-xl border border-slate-300 outline-none focus:ring-2 focus:ring-indigo-500 ${
                    !visible.skills ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                  placeholder="React, Java, Spring Boot, MySQL, AWS…"
                />
              </Field>

              {/* Animated Skill Bars */}
              <div className="mt-2">
                {visible.skills &&
                  form.skills &&
                  form.skills
                    .split(",")
                    .map((skill, i) => (
                      <motion.div
                        key={i}
                        initial={{ width: 0 }}
                        animate={{ width: `${60 + Math.random() * 35}%` }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className="h-2 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 mb-3"
                      />
                    ))}
              </div>

              {/* Experience */}
              <Field
                label="Experience"
                name="experience"
                visible={visible.experience}
                toggleVisible={() => toggleVisible("experience")}
              >
                <textarea
                  name="experience"
                  rows={4}
                  onChange={handleChange}
                  value={form.experience}
                  disabled={!visible.experience}
                  className={`w-full px-3 py-2 rounded-xl border border-slate-300 outline-none focus:ring-2 focus:ring-indigo-500 ${
                    !visible.experience ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                  placeholder="- Worked at XYZ...\n- Built job portal project..."
                />
              </Field>

              {/* Projects */}
              <Field
                label="Projects"
                name="projects"
                visible={visible.projects}
                toggleVisible={() => toggleVisible("projects")}
              >
                <textarea
                  name="projects"
                  rows={3}
                  onChange={handleChange}
                  value={form.projects}
                  disabled={!visible.projects}
                  className={`w-full px-3 py-2 rounded-xl border border-slate-300 outline-none focus:ring-2 focus:ring-indigo-500 ${
                    !visible.projects ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                  placeholder="- Netflix clone using React, TMDB API...\n- HRMS Portal with RBAC..."
                />
              </Field>

              {/* Education */}
              <Field
                label="Education"
                name="education"
                visible={visible.education}
                toggleVisible={() => toggleVisible("education")}
              >
                <textarea
                  name="education"
                  rows={3}
                  onChange={handleChange}
                  value={form.education}
                  disabled={!visible.education}
                  className={`w-full px-3 py-2 rounded-xl border border-slate-300 outline-none focus:ring-2 focus:ring-indigo-500 ${
                    !visible.education ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                  placeholder="B.Tech in CSE - 2023 - VTU Bangalore..."
                />
              </Field>

              {/* Certifications */}
              <Field
                label="Certifications"
                name="certifications"
                visible={visible.certifications}
                toggleVisible={() => toggleVisible("certifications")}
              >
                <textarea
                  name="certifications"
                  rows={2}
                  onChange={handleChange}
                  value={form.certifications}
                  disabled={!visible.certifications}
                  className={`w-full px-3 py-2 rounded-xl border border-slate-300 outline-none focus:ring-2 focus:ring-indigo-500 ${
                    !visible.certifications
                      ? "opacity-50 cursor-not-allowed"
                      : ""
                  }`}
                  placeholder="- AWS Cloud Practitioner\n- Java Certification"
                />
              </Field>

              {/* Links */}
              <Field
                label="Important Links (comma separated)"
                name="links"
                visible={visible.links}
                toggleVisible={() => toggleVisible("links")}
              >
                <textarea
                  name="links"
                  rows={2}
                  onChange={handleChange}
                  value={form.links}
                  disabled={!visible.links}
                  className={`w-full px-3 py-2 rounded-xl border border-slate-300 outline-none focus:ring-2 focus:ring-indigo-500 ${
                    !visible.links ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                  placeholder="Portfolio URL, GitHub, LinkedIn..."
                />
              </Field>
            </motion.div>
          </div>

          {/* RIGHT SIDE – PREVIEW */}
          <motion.div
            id="resume-preview"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            className={`${templateStyles[template]} ${
              darkMode
                ? "bg-slate-900 text-white border-slate-700"
                : "bg-white text-slate-800"
            }`}
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold flex items-center gap-2">
                <FiFileText className="text-indigo-500" /> Resume Preview
              </h2>

              {/* PDF Export */}
              <button
                onClick={exportPDF}
                className="px-3 py-2 rounded-xl bg-indigo-600 text-white text-sm flex items-center gap-2"
              >
                <FiDownload /> Export PDF
              </button>
            </div>

            {/* CONTENT */}
            <ResumeContent form={form} visible={visible} />
          </motion.div>
        </div>
      </section>

      <Footer />
    </>
  );
}

/* ---------------------------- SUB COMPONENTS ---------------------------- */

function ResumeContent({ form, visible }) {
  return (
    <div className="space-y-6 text-sm">
      {/* NAME */}
      {visible.name && (
        <div>
          <h1 className="text-2xl font-black">{form.name || "Your Name"}</h1>
          <p className="text-indigo-500">{form.title || "Your Role"}</p>
        </div>
      )}

      {/* CONTACT */}
      <div className="space-y-1 opacity-90">
        {visible.email && (
          <p>
            <FiMail className="inline mr-2" />{" "}
            {form.email || "email@example.com"}
          </p>
        )}
        {visible.phone && (
          <p>
            <FiPhone className="inline mr-2" />{" "}
            {form.phone || "+91 98765 43210"}
          </p>
        )}
        {visible.location && (
          <p>
            <FiMapPin className="inline mr-2" /> {form.location || "Location"}
          </p>
        )}
      </div>

      {/* SUMMARY */}
      {visible.summary && <Section title="Summary">{form.summary}</Section>}

      {/* SKILLS */}
      {visible.skills && (
        <Section title="Skills">
          {form.skills &&
            form.skills.split(",").map((s, i) => (
              <span
                key={i}
                className="inline-block text-xs px-3 py-1 mr-2 mb-2 rounded-full bg-indigo-100 text-indigo-700"
              >
                {s.trim()}
              </span>
            ))}
        </Section>
      )}

      {/* EXPERIENCE */}
      {visible.experience && (
        <Section title="Experience" icon={<FiBriefcase />}>
          {form.experience}
        </Section>
      )}

      {/* PROJECTS */}
      {visible.projects && (
        <Section title="Projects" icon={<FiFolder />}>
          {form.projects}
        </Section>
      )}

      {/* EDUCATION */}
      {visible.education && (
        <Section title="Education" icon={<FiBook />}>
          {form.education}
        </Section>
      )}

      {/* CERTIFICATIONS */}
      {visible.certifications && (
        <Section title="Certifications" icon={<FiAward />}>
          {form.certifications}
        </Section>
      )}

      {/* LINKS */}
      {visible.links && (
        <Section title="Links" icon={<FiLink />}>
          {form.links &&
            form.links.split(",").map((l, i) => (
              <p key={i} className="underline text-indigo-500">
                {l.trim()}
              </p>
            ))}
        </Section>
      )}
    </div>
  );
}

function Field({ label, children, name, visible, toggleVisible }) {
  return (
    <div>
      <label className="flex items-center gap-3 mb-1.5">
        {/* Checkbox with black border */}
        <input
          type="checkbox"
          checked={visible}
          onChange={toggleVisible}
          className="h-5 w-5 border-2 border-black rounded-sm appearance-none checked:bg-indigo-600 checked:border-indigo-600 flex-none"
          aria-label={`Toggle ${label}`}
        />
        <span className="block text-sm font-semibold text-slate-700">
          {label}
        </span>
      </label>
      {children}
    </div>
  );
}

function Section({ title, children, icon }) {
  return (
    <div>
      <h3 className="text-sm font-bold mb-2 flex items-center gap-2">
        {icon} {title}
      </h3>
      <div className="whitespace-pre-line opacity-90">
        {children || `No ${title.toLowerCase()} added`}
      </div>
    </div>
  );
}
