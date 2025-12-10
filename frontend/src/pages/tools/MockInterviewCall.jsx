// src/pages/tools/MockInterviewTool.jsx
import { useState } from "react";
import { motion } from "framer-motion";
import { FiBriefcase, FiHelpCircle, FiClock } from "react-icons/fi";
import Footer from "../../components/layout/Footer";

const questionBank = {
  "Frontend Developer": [
    "Explain the virtual DOM and how React uses it.",
    "What is the difference between state and props?",
    "How do you optimize performance in a large React application?",
  ],
  "Backend Developer": [
    "Explain REST vs GraphQL.",
    "How do you design an authentication system?",
    "What is the difference between monolith and microservices?",
  ],
  "Full Stack Developer": [
    "Explain how you would design a job portal end-to-end.",
    "How do you manage state across frontend and backend?",
    "Describe a challenging full-stack bug you solved.",
  ],
};

export default function MockInterviewTool() {
  const [role, setRole] = useState("Frontend Developer");

  return (
    <>
      <section className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 pt-32 pb-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-block mb-4 px-6 py-2 bg-indigo-100 text-indigo-700 rounded-full text-sm font-semibold"
            >
              🎤 Interview Readiness
            </motion.span>
            <h1 className="text-5xl font-black bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-4">
              Mock Interview Questions
            </h1>
            <p className="text-slate-600 max-w-2xl mx-auto text-lg">
              Practice real-world questions asked by product companies, MNCs,
              and fast-growing startups.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-10">
            <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-8">
              <h2 className="text-xl font-bold mb-6 text-slate-800 flex items-center gap-2">
                <FiBriefcase className="text-indigo-600" />
                Select Role
              </h2>

              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full border border-slate-200 rounded-xl px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-500 mb-4"
              >
                {Object.keys(questionBank).map((r) => (
                  <option key={r}>{r}</option>
                ))}
              </select>

              <p className="text-sm text-slate-600 flex items-center gap-2">
                <FiClock className="text-indigo-500" />
                Tip: Time yourself and record answers to improve clarity &
                confidence.
              </p>
            </div>

            <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 p-8">
              <h2 className="text-xl font-bold mb-6 text-slate-800 flex items-center gap-2">
                <FiHelpCircle className="text-indigo-600" />
                Sample Questions
              </h2>
              <ul className="space-y-4 text-slate-700">
                {questionBank[role].map((q, i) => (
                  <li
                    key={i}
                    className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-sm"
                  >
                    Q{i + 1}. {q}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
