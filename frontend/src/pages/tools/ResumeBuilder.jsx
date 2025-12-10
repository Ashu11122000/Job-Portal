// src/pages/tools/ResumeBuilder.jsx
import { useState } from "react";
import { motion } from "framer-motion";
import { FiFileText, FiUser, FiBriefcase, FiLayers } from "react-icons/fi";
import Footer from "../../components/layout/Footer";

export default function ResumeBuilder() {
  const [form, setForm] = useState({
    name: "",
    title: "",
    summary: "",
    skills: "",
    experience: "",
  });

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  return (
    <>
      <section className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 pt-32 pb-24 px-6">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-start">
          {/* LEFT: FORM */}
          <div>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-5xl font-black bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-4"
            >
              AI Resume Builder (Lite)
            </motion.h1>
            <p className="text-slate-600 mb-8 text-lg">
              Fill the details below and get a clean, recruiter-friendly resume
              preview in real-time. Later you can connect this with backend/PDF
              export.
            </p>

            <div className="space-y-5 bg-white/90 rounded-3xl shadow-xl border border-slate-200 p-7">
              <Field label="Full Name" name="name" value={form.name}>
                <input
                  name="name"
                  onChange={handleChange}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="e.g. Ankit Sharma"
                />
              </Field>

              <Field label="Headline / Role" name="title" value={form.title}>
                <input
                  name="title"
                  onChange={handleChange}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="e.g. Frontend Developer | React.js"
                />
              </Field>

              <Field label="Professional Summary" name="summary">
                <textarea
                  name="summary"
                  rows={3}
                  onChange={handleChange}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Brief summary about your experience, stack and achievements."
                />
              </Field>

              <Field label="Key Skills (comma separated)" name="skills">
                <textarea
                  name="skills"
                  rows={2}
                  onChange={handleChange}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="React, Java, Spring Boot, MySQL, AWS…"
                />
              </Field>

              <Field label="Experience / Projects" name="experience">
                <textarea
                  name="experience"
                  rows={4}
                  onChange={handleChange}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="- Worked at XYZ...\n- Built job portal project..."
                />
              </Field>
            </div>
          </div>

          {/* RIGHT: LIVE PREVIEW */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-3xl shadow-2xl border border-slate-200 p-8 lg:p-10"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-11 h-11 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-600">
                <FiFileText />
              </div>
              <h2 className="text-xl font-bold text-slate-800">
                Resume Preview
              </h2>
            </div>

            <div className="space-y-6 text-slate-800">
              <div>
                <h1 className="text-2xl font-black flex items-center gap-2">
                  <FiUser className="text-indigo-500" />
                  {form.name || "Your Name"}
                </h1>
                <p className="text-indigo-600 font-medium mt-1">
                  {form.title || "Your Role / Headline"}
                </p>
              </div>

              <Section title="Summary">
                {form.summary || "Your professional summary will appear here."}
              </Section>

              <Section title="Skills">
                {form.skills
                  ? form.skills
                      .split(",")
                      .map((skill) => skill.trim())
                      .filter(Boolean)
                      .map((s, i) => (
                        <span
                          key={i}
                          className="inline-block text-xs px-3 py-1 mr-2 mb-2 rounded-full bg-indigo-50 text-indigo-700"
                        >
                          {s}
                        </span>
                      ))
                  : "Add some skills like React, Node.js, SQL, Cloud etc."}
              </Section>

              <Section title="Experience / Projects" icon={<FiBriefcase />}>
                {form.experience || "Add your experience and key projects."}
              </Section>

              <div className="mt-4 text-xs text-slate-500 flex items-center gap-2">
                <FiLayers /> Tip: Later you can connect this with backend to
                save, download as PDF or share.
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </>
  );
}

function Field({ label, children }) {
  return (
    <div>
      <label className="block text-sm font-semibold text-slate-700 mb-1.5">
        {label}
      </label>
      {children}
    </div>
  );
}

function Section({ title, children, icon }) {
  return (
    <div>
      <h3 className="text-sm font-bold text-slate-700 flex items-center gap-2 mb-2">
        {icon && <span className="text-indigo-500">{icon}</span>}
        {title}
      </h3>
      <div className="text-sm text-slate-700 whitespace-pre-line">
        {children}
      </div>
    </div>
  );
}
