// src/pages/tools/CareerRoadmap.jsx
import { useState } from "react";
import { motion } from "framer-motion";
import { FiTarget, FiTrendingUp, FiBookOpen, FiFlag } from "react-icons/fi";
import Footer from "../../components/layout/Footer";

const sampleRoadmap = [
  {
    phase: "Phase 1 – Foundation (0–3 Months)",
    items: [
      "Strengthen core DSA & problem-solving",
      "Master HTML, CSS, JavaScript fundamentals",
      "Build 2–3 mini frontend projects",
    ],
  },
  {
    phase: "Phase 2 – Stack & Projects (3–6 Months)",
    items: [
      "Deep dive into React.js & state management",
      "Learn basic backend (Node/Spring Boot)",
      "Build 1 full-stack project (Job Portal, HRMS)",
    ],
  },
  {
    phase: "Phase 3 – System & Scaling (6–9 Months)",
    items: [
      "Learn system design basics & REST APIs",
      "Apply to product companies & startups",
      "Contribute to open-source or internal tools",
    ],
  },
];

export default function CareerRoadmap() {
  const [currentRole, setCurrentRole] = useState("Fresher / Student");
  const [targetRole, setTargetRole] = useState("Full Stack Developer");

  return (
    <>
      <section className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 pt-32 pb-24 px-6">
        <div className="max-w-6xl mx-auto">
          {/* HERO */}
          <div className="text-center mb-16">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-block mb-4 px-6 py-2 bg-indigo-100 text-indigo-700 rounded-full text-sm font-semibold"
            >
              🎯 Guided Career Navigation
            </motion.span>
            <h1 className="text-5xl font-black bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-4">
              Career Roadmap Planner
            </h1>
            <p className="text-slate-600 max-w-2xl mx-auto text-lg">
              Select where you are and where you want to go. We’ll outline the
              phases and milestones you should focus on.
            </p>
          </div>

          {/* FORM AREA */}
          <div className="grid md:grid-cols-2 gap-10 mb-16">
            <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-8">
              <h2 className="text-xl font-bold mb-6 flex items-center gap-2 text-slate-800">
                <FiTarget className="text-indigo-600" /> Your Path
              </h2>

              <div className="mb-6">
                <label className="block text-sm font-semibold text-slate-700 mb-1">
                  Current Role
                </label>
                <select
                  value={currentRole}
                  onChange={(e) => setCurrentRole(e.target.value)}
                  className="w-full border border-slate-200 rounded-xl px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option>Fresher / Student</option>
                  <option>Frontend Developer</option>
                  <option>Backend Developer</option>
                  <option>Full Stack Developer</option>
                  <option>QA / Tester</option>
                  <option>Support Engineer</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">
                  Target Role
                </label>
                <select
                  value={targetRole}
                  onChange={(e) => setTargetRole(e.target.value)}
                  className="w-full border border-slate-200 rounded-xl px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option>Full Stack Developer</option>
                  <option>Senior Frontend Engineer</option>
                  <option>Java Backend Engineer</option>
                  <option>Cloud / DevOps Engineer</option>
                  <option>Engineering Lead</option>
                </select>
              </div>

              <p className="mt-6 text-sm text-slate-500 flex items-center gap-2">
                <FiBookOpen className="text-indigo-500" />
                Roadmap suggestions are generic and can be customized for your
                stack later.
              </p>
            </div>

            {/* HIGHLIGHT CARD */}
            <div className="bg-indigo-900 rounded-3xl shadow-2xl p-8 text-white">
              <h2 className="text-2xl font-black mb-4 flex items-center gap-2">
                <FiTrendingUp /> Next 12 Months Focus
              </h2>
              <p className="text-white/80 mb-6">
                You're moving from{" "}
                <span className="font-semibold">{currentRole}</span> to{" "}
                <span className="font-semibold">{targetRole}</span>. Focus on:
              </p>
              <ul className="space-y-3 text-sm text-white/85">
                <li>• 2–3 strong portfolio projects</li>
                <li>• One backend + one cloud skill</li>
                <li>• LeetCode / DSA + system design basics</li>
                <li>• Consistent GitHub / project history</li>
              </ul>
            </div>
          </div>

          {/* ROADMAP PHASES */}
          <div className="space-y-10">
            {sampleRoadmap.map((phase, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-white rounded-3xl shadow-xl border border-slate-200 p-8"
              >
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2 text-slate-800">
                  <FiFlag className="text-indigo-600" />
                  {phase.phase}
                </h3>
                <ul className="list-disc list-inside text-slate-600 space-y-2">
                  {phase.items.map((it, i) => (
                    <li key={i}>{it}</li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
