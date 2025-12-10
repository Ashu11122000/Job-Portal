// src/pages/tools/CoverLetterTool.jsx
import { useState } from "react";
import { motion } from "framer-motion";
import { FiEdit3, FiUser, FiBriefcase, FiSend } from "react-icons/fi";
import Footer from "../../components/layout/Footer";

export default function CoverLetterTool() {
  const [form, setForm] = useState({
    name: "",
    role: "",
    company: "",
    jobTitle: "",
    tone: "Professional",
  });

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const generateLetter = () => {
    if (!form.name || !form.company || !form.jobTitle) return "";
    return `
Dear Hiring Manager,

I am writing to express my strong interest in the ${form.jobTitle} role at ${
      form.company
    }. With hands-on experience in ${
      form.role || "software development"
    } and a track record of delivering high-impact projects, I am confident that I can contribute effectively to your team.

Over the past few years, I have built and worked on multiple real-world applications, focusing on clean architecture, performance, and user experience. I am particularly excited about ${
      form.company
    }'s work and would love the opportunity to be part of such a forward-thinking environment.

I would appreciate the chance to discuss how my skills and experience align with your requirements.

Thank you for your time and consideration.

Best regards,
${form.name}
    `.trim();
  };

  const letter = generateLetter();

  return (
    <>
      <section className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 pt-32 pb-24 px-6">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-start">
          {/* FORM */}
          <div>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-5xl font-black bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-4"
            >
              Cover Letter Generator
            </motion.h1>
            <p className="text-slate-600 mb-8 text-lg">
              Quickly generate a clean, professional cover letter tailored to
              the company and role you’re applying for.
            </p>

            <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-7 space-y-5">
              <Field label="Your Full Name">
                <input
                  name="name"
                  onChange={handleChange}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="e.g. Ashish Sharma"
                />
              </Field>

              <Field label="Your Role / Profile">
                <input
                  name="role"
                  onChange={handleChange}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="e.g. Full Stack Developer, Java + React"
                />
              </Field>

              <Field label="Company Name">
                <input
                  name="company"
                  onChange={handleChange}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="e.g. Google, Amazon, Zoho"
                />
              </Field>

              <Field label="Job Title You’re Applying For">
                <input
                  name="jobTitle"
                  onChange={handleChange}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="e.g. Software Engineer, SDE-1"
                />
              </Field>
            </div>
          </div>

          {/* PREVIEW */}
          <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-11 h-11 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-600">
                <FiEdit3 />
              </div>
              <h2 className="text-xl font-bold text-slate-800">
                Cover Letter Preview
              </h2>
            </div>

            <div className="border border-slate-200 rounded-2xl p-6 min-h-[260px] bg-slate-50/60 text-sm text-slate-700 whitespace-pre-line">
              {letter || "Fill the details on the left to generate a letter."}
            </div>

            <p className="mt-4 text-xs text-slate-500 flex items-center gap-2">
              <FiSend /> Later you can add export as PDF/email send via backend.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}

function Field({ label, children }) {
  return (
    <div>
      <label className="block text-sm font-semibold text-slate-700 mb-1">
        {label}
      </label>
      {children}
    </div>
  );
}
