// src/pages/tools/CareerRoadmap.jsx
import { useState, useEffect } from "react";
import {
  FiAward,
  FiTrendingUp,
  FiCheckCircle,
  FiRefreshCw,
  FiBookOpen,
} from "react-icons/fi";
import Footer from "../../components/layout/Footer";

/* ---------------------------------------
   ROADMAP API
--------------------------------------- */
import {
  generateRoadmap,
  getSkills,
  getProjects,
  getSalary,
} from "../../api/roadmapApi";

/* ---------------------------------------
   ROADMAP TIMELINE
--------------------------------------- */
function RoadmapTimeline({ roadmap }) {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <section className="mt-28 relative">
      {/* Header */}
      <div className="mb-16">
        <h2 className="text-4xl font-extrabold tracking-tight text-slate-900">
          Career Roadmap
        </h2>
        <p className="mt-3 max-w-3xl text-slate-600">
          A structured, phase-by-phase execution plan showing what to learn,
          why it matters, and how it moves you closer to your target role.
        </p>
      </div>

      {/* Timeline */}
      <div className="relative pl-14 space-y-10">
        {/* Vertical Line */}
        <div className="absolute left-5 top-0 h-full w-[3px] bg-gradient-to-b from-indigo-400 via-purple-400 to-indigo-200 rounded-full opacity-50" />

        {roadmap.map((phase, idx) => {
          const isOpen = openIndex === idx;

          // Derived metadata (no backend changes needed)
          const estimatedWeeks = Math.max(2, phase.items.length);
          const effort =
            phase.items.length <= 3
              ? "Light"
              : phase.items.length <= 5
              ? "Moderate"
              : "Intensive";

          return (
            <div
              key={idx}
              onClick={() => setOpenIndex(isOpen ? null : idx)}
              className="
                relative cursor-pointer
                rounded-3xl p-9
                bg-white/90 backdrop-blur-xl
                border border-slate-200
                shadow-[0_20px_60px_rgba(0,0,0,0.08)]
                transition-all duration-300
                hover:-translate-y-1
                hover:shadow-[0_30px_90px_rgba(0,0,0,0.14)]
              "
            >
              {/* Timeline Dot */}
              <div className="absolute -left-[52px] top-9">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-600 to-purple-600 shadow-[0_0_0_7px_rgba(99,102,241,0.18)]" />
              </div>

              {/* Header */}
              <div className="flex justify-between items-start gap-6">
                <div>
                  <span className="inline-block text-xs font-bold uppercase tracking-wide text-indigo-600">
                    Phase {idx + 1}
                  </span>

                  <h3 className="mt-1 text-2xl font-extrabold text-slate-900 leading-snug">
                    {phase.phase}
                  </h3>

                  {/* Meta Row */}
                  <div className="mt-3 flex flex-wrap gap-3 text-xs">
                    <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-700 font-semibold">
                      ⏱ {estimatedWeeks}–{estimatedWeeks + 1} weeks
                    </span>

                    <span className="px-3 py-1 rounded-full bg-indigo-100 text-indigo-700 font-semibold">
                      📚 {phase.items.length} learning goals
                    </span>

                    <span
                      className={`px-3 py-1 rounded-full font-semibold
                        ${
                          effort === "Light"
                            ? "bg-emerald-100 text-emerald-700"
                            : effort === "Moderate"
                            ? "bg-amber-100 text-amber-700"
                            : "bg-rose-100 text-rose-700"
                        }`}
                    >
                      🔥 {effort} effort
                    </span>
                  </div>
                </div>

                {/* Expand Indicator */}
                <span
                  className={`mt-1 text-sm font-semibold transition-colors ${
                    isOpen ? "text-indigo-600" : "text-slate-400"
                  }`}
                >
                  {isOpen ? "Hide details" : "View details"}
                </span>
              </div>

              {/* Divider */}
              <div className="mt-7 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />

              {/* Expandable Content */}
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  isOpen
                    ? "max-h-[700px] opacity-100 mt-7"
                    : "max-h-0 opacity-0"
                }`}
              >
                {/* Learning Items */}
                <ul className="space-y-4">
                  {phase.items.map((item, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-4 text-slate-700"
                    >
                      <span className="mt-2 w-2.5 h-2.5 rounded-full bg-indigo-500 flex-shrink-0" />
                      <span className="leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>

                {/* Outcome Box */}
                <div className="mt-8 bg-slate-50 border border-slate-200 rounded-2xl p-5">
                  <p className="text-sm font-semibold text-slate-800 mb-1">
                    🎯 Expected Outcome
                  </p>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    After completing this phase, you should be confident with
                    the listed concepts and able to apply them in real-world
                    scenarios or projects relevant to your target role.
                  </p>
                </div>

                {/* Tip */}
                <div className="mt-4 text-xs text-slate-500">
                  Tip: Focus on mastery, not speed. Consistent daily progress
                  beats cramming.
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

/* ---------------------------------------
   SKILLS SECTION
--------------------------------------- */
function SkillsSection({ skills, completed, setCompleted }) {
  function toggle(skill) {
    setCompleted((prev) =>
      prev.includes(skill)
        ? prev.filter((s) => s !== skill)
        : [...prev, skill]
    );
  }

  const progress =
    skills.length > 0
      ? Math.round((completed.length / skills.length) * 100)
      : 0;

  // Lightweight intelligence (can later come from backend)
  const meta = {
    React: {
      category: "Core Skill",
      time: "3–4 weeks",
      impact: "Used in 80%+ frontend roles",
    },
    TypeScript: {
      category: "Core Skill",
      time: "2–3 weeks",
      impact: "Reduces bugs & improves scalability",
    },
    "Tailwind CSS": {
      category: "UI Skill",
      time: "1–2 weeks",
      impact: "Speeds up UI development",
    },
    Accessibility: {
      category: "Advanced Skill",
      time: "1 week",
      impact: "Required for enterprise-grade apps",
    },
  };

  return (
    <section className="mt-28 relative">
      {/* Header */}
      <div className="mb-12">
        <h2 className="text-4xl font-extrabold tracking-tight text-slate-900">
          Skill Mastery Tracker
        </h2>
        <p className="mt-3 max-w-3xl text-slate-600">
          Track your learning progress, understand the impact of each skill,
          and focus on what matters most for your target role.
        </p>
      </div>

      {/* Progress Overview */}
      <div className="mb-14 bg-white/90 backdrop-blur-xl border border-slate-200 rounded-3xl p-8 shadow-[0_25px_70px_rgba(0,0,0,0.08)]">
        <div className="flex justify-between items-center mb-4">
          <div>
            <p className="text-sm font-semibold text-slate-700">
              Overall Skill Completion
            </p>
            <p className="text-xs text-slate-500">
              Based on skills you’ve marked as completed
            </p>
          </div>
          <div className="text-3xl font-extrabold text-indigo-600">
            {progress}%
          </div>
        </div>

        <div className="h-3 bg-slate-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-fuchsia-500 transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Skills Grid */}
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
        {skills.map((skill, idx) => {
          const done = completed.includes(skill);
          const info = meta[skill] || {
            category: "Important Skill",
            time: "2–3 weeks",
            impact: "Improves role readiness",
          };

          return (
            <div
              key={skill}
              onClick={() => toggle(skill)}
              className={`
                relative cursor-pointer group
                rounded-3xl p-7
                border transition-all duration-300
                ${
                  done
                    ? "bg-emerald-50/80 border-emerald-400 shadow-[0_30px_70px_rgba(16,185,129,0.35)]"
                    : "bg-white/90 border-slate-200 shadow-[0_25px_60px_rgba(0,0,0,0.08)]"
                }
                hover:-translate-y-2
                hover:shadow-[0_40px_90px_rgba(0,0,0,0.14)]
              `}
            >
              {/* Glow */}
              <div
                className={`absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition
                  ${
                    done
                      ? "bg-emerald-200/40 blur-2xl"
                      : "bg-indigo-200/40 blur-2xl"
                  }`}
              />

              {/* Content */}
              <div className="relative z-10">
                {/* Icon + Priority */}
                <div className="flex justify-between items-start mb-5">
                  <div
                    className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg
                      ${
                        done
                          ? "bg-emerald-500"
                          : "bg-indigo-500"
                      }`}
                  >
                    <FiAward className="text-2xl text-slate-100" />
                  </div>

                  <span className="text-xs font-bold text-slate-400">
                    Priority #{idx + 1}
                  </span>
                </div>

                {/* Skill Name */}
                <h3 className="text-lg font-extrabold text-slate-900 mb-1">
                  {skill}
                </h3>

                {/* Meta Info */}
                <div className="mt-2 space-y-1 text-xs text-slate-600">
                  <p>
                    <span className="font-semibold text-slate-700">
                      Category:
                    </span>{" "}
                    {info.category}
                  </p>
                  <p>
                    <span className="font-semibold text-slate-700">
                      Est. Time:
                    </span>{" "}
                    {info.time}
                  </p>
                  <p className="text-slate-500">{info.impact}</p>
                </div>

                {/* Status */}
                <div className="mt-4">
                  {done ? (
                    <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-700">
                      ✓ Completed
                    </span>
                  ) : (
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-600">
                      In Progress
                    </span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Guidance */}
      <div className="mt-14 bg-slate-50 border border-slate-200 rounded-2xl p-6">
        <p className="text-slate-700 font-medium">
          💡 <span className="font-bold">Pro Tip:</span>{" "}
          Complete core skills first before moving to advanced ones.
          This maximizes interview readiness and confidence.
        </p>
      </div>
    </section>
  );
}


/* ---------------------------------------
   ✅ SKILL GAP ANALYSIS (FIX)
--------------------------------------- */
function SkillGapAnalysis({ skills, completed }) {
  const missing = skills.filter((s) => !completed.includes(s));
  const readiness =
    skills.length === 0
      ? 0
      : Math.round((completed.length / skills.length) * 100);

  const level =
    readiness < 40
      ? "High Risk"
      : readiness < 70
      ? "Moderate Gap"
      : readiness < 90
      ? "Nearly Ready"
      : "Job Ready";

  const recommendations = {
    "High Risk":
      "Focus on fundamentals immediately. Missing core skills will block interviews.",
    "Moderate Gap":
      "You’re progressing well. Close the remaining gaps to reach job readiness.",
    "Nearly Ready":
      "Polish remaining skills and start mock interviews.",
    "Job Ready":
      "Minimal gaps detected. Start applying with confidence.",
  };

  return (
    <section className="mt-28 relative">
      {/* Background glow */}
      <div className="absolute -top-20 left-0 w-64 h-64 bg-indigo-200/40 blur-3xl rounded-full pointer-events-none" />
      <div className="absolute -bottom-20 right-0 w-64 h-64 bg-purple-200/40 blur-3xl rounded-full pointer-events-none" />

      <div className="relative bg-white/90 backdrop-blur-xl border border-slate-200 rounded-3xl p-10 shadow-[0_35px_90px_rgba(0,0,0,0.08)]">
        {/* Header */}
        <div className="mb-10">
          <h2 className="text-4xl font-extrabold tracking-tight text-slate-900">
            Skill Gap Analysis
          </h2>
          <p className="mt-3 max-w-2xl text-slate-600">
            A clear breakdown of what’s holding you back — and exactly how to
            close the gap between your current skills and job readiness.
          </p>
        </div>

        {/* Readiness Card */}
        <div className="mb-10 bg-slate-50 border border-slate-200 rounded-2xl p-6">
          <div className="flex justify-between items-center mb-3">
            <div>
              <p className="text-sm font-semibold text-slate-700">
                Overall Readiness Score
              </p>
              <p className="text-xs text-slate-500">
                Based on completed vs required skills
              </p>
            </div>

            <div className="text-right">
              <p className="text-2xl font-extrabold text-indigo-600">
                {readiness}%
              </p>
              <p
                className={`text-xs font-bold ${
                  readiness < 40
                    ? "text-red-600"
                    : readiness < 70
                    ? "text-amber-600"
                    : readiness < 90
                    ? "text-indigo-600"
                    : "text-emerald-600"
                }`}
              >
                {level}
              </p>
            </div>
          </div>

          <div className="h-3 bg-slate-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-fuchsia-500 transition-all duration-500"
              style={{ width: `${readiness}%` }}
            />
          </div>
        </div>

        {/* Missing Skills */}
        {missing.length === 0 ? (
          <div className="bg-emerald-50 border border-emerald-300 rounded-2xl p-6">
            <p className="font-semibold text-emerald-700">
              🎉 No skill gaps detected
            </p>
            <p className="text-sm text-emerald-600 mt-1">
              You meet the skill expectations for your target role.
              Focus on interviews and applications.
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-8">
            {/* Missing Skills List */}
            <div>
              <p className="font-bold text-slate-900 mb-4">
                Skills You Should Focus On Next
              </p>

              <ul className="space-y-3">
                {missing.map((skill, idx) => (
                  <li
                    key={skill}
                    className="flex items-center justify-between bg-slate-100 border border-slate-200 rounded-xl px-4 py-3"
                  >
                    <span className="font-semibold text-slate-800">
                      {skill}
                    </span>

                    <span className="text-xs font-bold text-slate-500">
                      Priority #{idx + 1}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Insight Panel */}
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6">
              <p className="font-bold text-slate-900 mb-2">
                What This Means
              </p>

              <p className="text-sm text-slate-700 leading-relaxed">
                {recommendations[level]}
              </p>

              <div className="mt-6">
                <p className="text-xs text-slate-500 mb-2">
                  Suggested next action
                </p>
                <div className="inline-flex items-center px-4 py-2 rounded-full bg-indigo-100 text-indigo-700 text-sm font-semibold">
                  Complete the next 2 skills to boost readiness by ~20%
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

/* ---------------------------------------
   WEEKLY PLANNER
--------------------------------------- */
function WeeklyPlanner({ roadmap }) {
  const weeks = roadmap.flatMap((p) => p.items).slice(0, 6);

  return (
    <section className="mt-28 relative">
      {/* Ambient background accents */}
      <div className="absolute -top-20 -left-20 w-72 h-72 bg-indigo-200/40 blur-3xl rounded-full pointer-events-none" />
      <div className="absolute -bottom-20 -right-20 w-72 h-72 bg-purple-200/40 blur-3xl rounded-full pointer-events-none" />

      {/* Container */}
      <div className="relative bg-white/90 backdrop-blur-2xl border border-slate-200 rounded-3xl p-10 shadow-[0_35px_90px_rgba(0,0,0,0.08)]">
        {/* Header */}
        <div className="mb-12">
          <h2 className="text-4xl font-extrabold tracking-tight text-slate-900">
            Weekly Learning Planner
          </h2>
          <p className="mt-3 max-w-2xl text-slate-600">
            A focused execution plan that converts your roadmap into
            achievable weekly goals. Follow this consistently to build
            momentum and confidence.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative space-y-8 pl-14">
          {/* Vertical line */}
          <div className="absolute left-6 top-0 bottom-0 w-[2px] bg-gradient-to-b from-indigo-300 via-purple-300 to-transparent" />

          {weeks.map((task, i) => (
            <div key={i} className="relative group">
              {/* Timeline dot */}
              <div
                className="
                  absolute left-3 top-6 w-6 h-6 rounded-full
                  bg-gradient-to-br from-indigo-600 to-purple-600
                  shadow-[0_0_20px_rgba(99,102,241,0.5)]
                  group-hover:scale-110 transition
                "
              />

              {/* Week card */}
              <div
                className="
                  bg-white rounded-2xl p-6
                  border border-slate-200
                  shadow-[0_18px_50px_rgba(0,0,0,0.06)]
                  hover:shadow-[0_28px_80px_rgba(0,0,0,0.12)]
                  transition-all
                  hover:-translate-y-1
                "
              >
                {/* Header row */}
                <div className="flex justify-between items-center mb-3">
                  <span className="text-xs font-bold uppercase tracking-wide text-indigo-600">
                    Week {i + 1}
                  </span>

                  <span className="text-xs px-3 py-1 rounded-full bg-slate-100 text-slate-600 font-semibold">
                    Learning Focus
                  </span>
                </div>

                {/* Task */}
                <h3 className="text-lg font-bold text-slate-900 leading-snug">
                  {task}
                </h3>

                {/* Outcome */}
                <p className="text-sm text-slate-600 mt-2">
                  Outcome: You’ll strengthen this concept through practice and
                  move one step closer to interview readiness.
                </p>

                {/* Effort + tip */}
                <div className="mt-4 flex flex-wrap gap-4 text-sm text-slate-500">
                  <span className="flex items-center gap-2">
                    ⏱ <span>6–8 hrs recommended</span>
                  </span>
                  <span className="flex items-center gap-2">
                    🎯 <span>Hands-on + revision</span>
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer Insight */}
        <div className="mt-12 bg-slate-50 border border-slate-200 rounded-2xl p-6">
          <p className="text-slate-700 font-medium">
            📌 <span className="font-bold">Execution Tip:</span>{" "}
            Don’t rush. Completing each week fully is far more effective than
            skimming multiple topics without depth.
          </p>
        </div>
      </div>
    </section>
  );
}


/* ---------------------------------------
   INTERVIEW READINESS
--------------------------------------- */
function InterviewReadiness({ skills, projects }) {
  const skillScore = Math.min(100, skills.length * 10);
  const projectScore = Math.min(100, projects.length * 15);
  const score = Math.min(100, skillScore + projectScore);

  const level =
    score < 40
      ? "Foundational"
      : score < 70
      ? "Intermediate"
      : score < 90
      ? "Job-Ready"
      : "Interview-Elite";

  const recommendation =
    score < 40
      ? "Build core skills first. Complete 3–4 fundamentals before attempting interviews."
      : score < 70
      ? "Add 1–2 strong projects and revise weak areas."
      : score < 90
      ? "Start mock interviews and system design basics."
      : "You’re ready. Apply confidently and network actively.";

  return (
    <section className="mt-28 relative">
      {/* Ambient glow */}
      <div className="absolute -top-24 left-0 w-72 h-72 bg-indigo-200/40 blur-3xl rounded-full pointer-events-none" />
      <div className="absolute -bottom-24 right-0 w-72 h-72 bg-purple-200/40 blur-3xl rounded-full pointer-events-none" />

      <div className="relative bg-white/90 backdrop-blur-2xl border border-slate-200 rounded-3xl p-10 shadow-[0_35px_90px_rgba(0,0,0,0.08)]">
        {/* Header */}
        <div className="mb-10">
          <h2 className="text-4xl font-extrabold tracking-tight text-slate-900">
            Interview Readiness
          </h2>
          <p className="mt-3 max-w-2xl text-slate-600">
            A real-world indicator of how prepared you are for technical
            interviews—based on skill mastery and project depth.
          </p>
        </div>

        {/* Main Grid */}
        <div className="grid md:grid-cols-3 gap-10 items-center">
          {/* Radial Score */}
          <div className="flex flex-col items-center">
            <div className="relative w-44 h-44">
              <svg className="w-full h-full rotate-[-90deg]">
                <circle
                  cx="88"
                  cy="88"
                  r="76"
                  fill="none"
                  stroke="#e5e7eb"
                  strokeWidth="12"
                />
                <circle
                  cx="88"
                  cy="88"
                  r="76"
                  fill="none"
                  stroke="url(#ir-gradient)"
                  strokeWidth="12"
                  strokeDasharray={478}
                  strokeDashoffset={478 - (478 * score) / 100}
                  strokeLinecap="round"
                />
                <defs>
                  <linearGradient id="ir-gradient">
                    <stop offset="0%" stopColor="#6366f1" />
                    <stop offset="100%" stopColor="#8b5cf6" />
                  </linearGradient>
                </defs>
              </svg>

              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-4xl font-extrabold text-slate-900">
                  {score}%
                </span>
                <span className="text-sm font-semibold text-indigo-600 mt-1">
                  {level}
                </span>
              </div>
            </div>
          </div>

          {/* Breakdown */}
          <div className="md:col-span-2 space-y-6">
            {/* Skills */}
            <div>
              <div className="flex justify-between text-sm font-semibold text-slate-700 mb-2">
                <span>Skills Coverage</span>
                <span>{skillScore}%</span>
              </div>
              <div className="h-3 bg-slate-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 transition-all"
                  style={{ width: `${skillScore}%` }}
                />
              </div>
              <p className="text-xs text-slate-500 mt-1">
                Depth & consistency of core skills
              </p>
            </div>

            {/* Projects */}
            <div>
              <div className="flex justify-between text-sm font-semibold text-slate-700 mb-2">
                <span>Project Experience</span>
                <span>{projectScore}%</span>
              </div>
              <div className="h-3 bg-slate-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 transition-all"
                  style={{ width: `${projectScore}%` }}
                />
              </div>
              <p className="text-xs text-slate-500 mt-1">
                Real-world problem solving & implementation
              </p>
            </div>
          </div>
        </div>

        {/* Guidance */}
        <div className="mt-12 bg-slate-50 border border-slate-200 rounded-2xl p-6">
          <p className="text-slate-700 font-medium">
            🎯 <span className="font-bold">Next Recommendation:</span>{" "}
            {recommendation}
          </p>
        </div>
      </div>
    </section>
  );
}


/* ---------------------------------------
   HIRING CHECKLIST
--------------------------------------- */
function HiringChecklist() {
  const [checks, setChecks] = useState({
    resume: false,
    portfolio: false,
    linkedin: false,
    mock: false,
  });

  function toggle(key) {
    setChecks((p) => ({ ...p, [key]: !p[key] }));
  }

  const items = {
    resume: {
      title: "Resume Optimized",
      desc: "ATS-friendly, quantified impact, role-specific keywords",
    },
    portfolio: {
      title: "Portfolio Ready",
      desc: "Live projects, GitHub links, clear problem → solution narrative",
    },
    linkedin: {
      title: "LinkedIn Optimized",
      desc: "Recruiter keywords, strong headline, active engagement",
    },
    mock: {
      title: "Mock Interviews Completed",
      desc: "Technical + behavioral confidence under pressure",
    },
  };

  const completedCount = Object.values(checks).filter(Boolean).length;
  const progress = Math.round(
    (completedCount / Object.keys(checks).length) * 100
  );

  return (
    <section className="mt-28 relative">
      {/* Ambient glow */}
      <div className="absolute -top-20 left-0 w-64 h-64 bg-indigo-200/40 blur-3xl rounded-full pointer-events-none" />
      <div className="absolute -bottom-20 right-0 w-64 h-64 bg-purple-200/40 blur-3xl rounded-full pointer-events-none" />

      <div className="relative bg-white/90 backdrop-blur-xl border border-slate-200 rounded-3xl p-10 shadow-[0_35px_90px_rgba(0,0,0,0.08)]">
        {/* Header */}
        <div className="mb-10">
          <h2 className="text-4xl font-extrabold tracking-tight text-slate-900">
            Hiring Readiness Checklist
          </h2>
          <p className="mt-3 max-w-2xl text-slate-600">
            These are the exact checkpoints recruiters expect before shortlisting
            candidates. Complete them to move from “applying” to “getting calls”.
          </p>
        </div>

        {/* Progress */}
        <div className="mb-12">
          <div className="flex justify-between items-center mb-2">
            <span className="font-semibold text-slate-700">
              Overall Hiring Readiness
            </span>
            <span className="font-bold text-indigo-600">
              {progress}%
            </span>
          </div>

          <div className="h-3 bg-slate-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-fuchsia-500 transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>

          <p className="text-xs text-slate-500 mt-2">
            Most recruiters shortlist candidates above 75% readiness
          </p>
        </div>

        {/* Checklist Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {Object.entries(items).map(([key, meta]) => {
            const active = checks[key];

            return (
              <div
                key={key}
                onClick={() => toggle(key)}
                className={`
                  cursor-pointer p-6 rounded-2xl border transition-all
                  hover:-translate-y-1 hover:shadow-md
                  ${
                    active
                      ? "bg-emerald-50 border-emerald-400"
                      : "bg-slate-50 border-slate-200"
                  }
                `}
              >
                <div className="flex items-start gap-4">
                  <FiCheckCircle
                    className={`text-2xl mt-1 ${
                      active
                        ? "text-emerald-600"
                        : "text-slate-400"
                    }`}
                  />

                  <div>
                    <p className="font-bold text-slate-900">
                      {meta.title}
                    </p>
                    <p className="text-sm text-slate-600 mt-1">
                      {meta.desc}
                    </p>

                    {active && (
                      <span className="inline-block mt-3 text-xs font-semibold text-emerald-700 bg-emerald-100 px-3 py-1 rounded-full">
                        Completed ✓
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Guidance */}
        <div className="mt-12 bg-slate-50 border border-slate-200 rounded-2xl p-6">
          <p className="text-slate-700 font-medium">
            🧠 <span className="font-bold">Hiring Insight:</span>{" "}
            {progress < 50
              ? "Start with resume and portfolio. They create first impressions."
              : progress < 80
              ? "Polish LinkedIn and begin mock interviews to boost confidence."
              : "You’re hiring-ready. Apply aggressively and network actively."}
          </p>
        </div>
      </div>
    </section>
  );
}


/* ---------------------------------------
   MAIN PAGE
--------------------------------------- */
export default function CareerRoadmap() {
  const [currentRole, setCurrentRole] = useState("Fresher");
  const [targetRole, setTargetRole] = useState("Full Stack Developer");

  const [roadmap, setRoadmap] = useState([]);
  const [skills, setSkills] = useState([]);
  const [completedSkills, setCompletedSkills] = useState([]);
  const [projects, setProjects] = useState([]);
  const [salary, setSalary] = useState([]);
  const [loading, setLoading] = useState(false);

  async function loadData() {
    setLoading(true);
    try {
      const roadmapRes = await generateRoadmap({ currentRole, targetRole });
      const skillsRes = await getSkills(targetRole);
      const projectsRes = await getProjects();
      const salaryRes = await getSalary();

      setRoadmap(roadmapRes?.data?.roadmap || []);
      setSkills(skillsRes?.skills || []);
      setProjects(projectsRes?.projects || []);
      setSalary(salaryRes?.data || []);
      setCompletedSkills([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadData();
  }, []);

  return (
<main className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50/40 to-purple-50/40">
  <section className="max-w-6xl mx-auto px-6 py-24 relative">
    {/* Hero */}
    <div className="mb-16">
      <h1 className="text-5xl font-extrabold tracking-tight text-slate-900">
        Career Roadmap Planner
      </h1>

      <p className="mt-4 max-w-3xl text-lg text-slate-600 leading-relaxed">
        Generate a personalized, phase-wise learning roadmap based on your
        current role and career goals. Track skills, close gaps, and measure
        interview readiness — all in one place.
      </p>

      <div className="mt-6 flex flex-wrap gap-4 text-sm text-slate-600">
        <span className="px-4 py-2 rounded-full bg-indigo-100 text-indigo-700 font-semibold">
          📈 Skill-based roadmap
        </span>
        <span className="px-4 py-2 rounded-full bg-purple-100 text-purple-700 font-semibold">
          🎯 Interview-focused
        </span>
        <span className="px-4 py-2 rounded-full bg-emerald-100 text-emerald-700 font-semibold">
          🧠 Gap analysis included
        </span>
      </div>
    </div>

    {/* Controls Card */}
    <div className="relative mb-14">
      {/* Glow */}
      <div className="absolute -inset-4 bg-gradient-to-r from-indigo-200/40 to-purple-200/40 blur-3xl rounded-3xl pointer-events-none" />

      <div className="relative bg-white/90 backdrop-blur-xl border border-slate-200 rounded-3xl p-8 shadow-[0_30px_80px_rgba(0,0,0,0.08)]">
        <div className="grid md:grid-cols-3 gap-8 items-end">
          {/* Current Role */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Your Current Role
            </label>
            <input
              value={currentRole}
              onChange={(e) => setCurrentRole(e.target.value)}
              placeholder="e.g. Fresher, Junior Developer"
              className="
                w-full px-4 py-3 rounded-xl
                border border-slate-300
                focus:outline-none focus:ring-2 focus:ring-indigo-400
                text-slate-800
              "
            />
            <p className="text-xs text-slate-500 mt-2">
              This helps assess your starting point
            </p>
          </div>

          {/* Target Role */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Target Role
            </label>
            <input
              value={targetRole}
              onChange={(e) => setTargetRole(e.target.value)}
              placeholder="e.g. Frontend / Full Stack Developer"
              className="
                w-full px-4 py-3 rounded-xl
                border border-slate-300
                focus:outline-none focus:ring-2 focus:ring-purple-400
                text-slate-800
              "
            />
            <p className="text-xs text-slate-500 mt-2">
              Roadmap will align to this role
            </p>
          </div>

          {/* CTA */}
          <button
            onClick={loadData}
            className="
              h-[52px] rounded-xl
              bg-gradient-to-r from-indigo-600 to-purple-600
              text-slate-100 font-semibold
              flex items-center justify-center gap-2
              shadow-[0_15px_40px_rgba(99,102,241,0.35)]
              hover:shadow-[0_25px_60px_rgba(99,102,241,0.55)]
              hover:scale-[1.03]
              transition
            "
          >
            <FiRefreshCw />
            Generate Roadmap
          </button>
        </div>
      </div>
    </div>

    {/* Loading State */}
    {loading && (
      <div className="mb-10 flex items-center gap-3 text-indigo-600 font-semibold">
        <span className="animate-spin">⏳</span>
        Updating your personalized roadmap…
      </div>
    )}

    {/* Sections */}
    <RoadmapTimeline roadmap={roadmap} />

    <SkillsSection
      skills={skills}
      completed={completedSkills}
      setCompleted={setCompletedSkills}
    />

    <SkillGapAnalysis
      skills={skills}
      completed={completedSkills}
    />

    <WeeklyPlanner roadmap={roadmap} />

    <InterviewReadiness
      skills={completedSkills}
      projects={projects}
    />

    <HiringChecklist />
  </section>

  <Footer />
</main>

  );
}
