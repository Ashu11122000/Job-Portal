// src/pages/tools/CareerRoadmap.jsx
import { useState } from "react";
import { motion } from "framer-motion";
import {
  FiTarget,
  FiTrendingUp,
  FiBookOpen,
  FiFlag,
  FiUsers,
  FiAward,
  FiArrowRight,
  FiCheckCircle,
} from "react-icons/fi";
import Footer from "../../components/layout/Footer";

/* ---------------------------------------
   SAMPLE ROADMAP DATA
--------------------------------------- */
const sampleRoadmap = [
  {
    phase: "Phase 1 — Foundation (0–3 months)",
    items: [
      "Master DSA basics & problem-solving",
      "Strengthen HTML, CSS, JS fundamentals",
      "Build 2–3 polished frontend mini projects",
    ],
  },
  {
    phase: "Phase 2 — Stack & Projects (3–6 months)",
    items: [
      "Deep dive into React ecosystem",
      "Learn backend (Node or Spring Boot)",
      "Build and deploy 1 full-stack project",
    ],
  },
  {
    phase: "Phase 3 — Systems & Scale (6–12 months)",
    items: [
      "Learn system design fundamentals",
      "Contribute to open-source",
      "Start applying to high-growth companies",
    ],
  },
];

/* ---------------------------------------
   SKILLS PER ROLE
--------------------------------------- */
const skillsByRole = {
  "Full Stack Developer": [
    { name: "React", icon: <FiUsers /> },
    { name: "Spring Boot / Node", icon: <FiAward /> },
    { name: "REST API Design", icon: <FiAward /> },
    { name: "SQL & NoSQL", icon: <FiAward /> },
  ],
  "Frontend Developer": [
    { name: "React", icon: <FiUsers /> },
    { name: "TypeScript", icon: <FiAward /> },
    { name: "Tailwind CSS", icon: <FiAward /> },
    { name: "Accessibility", icon: <FiAward /> },
  ],
};

/* ---------------------------------------
   PROJECT CARDS
--------------------------------------- */
const sampleProjects = [
  {
    id: 1,
    title: "Job Portal — Full Stack Case Study",
    tags: ["React", "Spring Boot", "MySQL", "Docker"],
    blurb:
      "End-to-end platform with authentication, job search, and recruiter dashboards.",
    image:
      "https://images.unsplash.com/photo-1547658719-da2b51169166?w=1400&q=80",
  },
  {
    id: 2,
    title: "Team Dashboard (Realtime)",
    tags: ["React", "WebSocket", "Realtime", "Charts"],
    blurb:
      "Realtime task management with drag-drop, activity feed, and team analytics.",
    image:
      "https://images.unsplash.com/photo-1556157382-97eda2d62296?w=1400&q=80",
  },
  {
    id: 3,
    title: "Cloud Cost Analyzer",
    tags: ["AWS", "Lambda", "Python"],
    blurb:
      "Automated cloud cost analyzer predicting spend patterns using ML-driven insights.",
    image:
      "https://images.unsplash.com/photo-1526378725892-6b8f8a2d5b98?w=1400&q=80",
  },
];

/* ---------------------------------------
   SALARY PROJECTIONS
--------------------------------------- */
const salaryProjectionSamples = [
  { role: "Frontend Developer", base: 6, high: 15, growthPct: 32 },
  { role: "Backend Developer", base: 8, high: 22, growthPct: 28 },
  { role: "Full Stack Developer", base: 10, high: 26, growthPct: 35 },
];

/* ---------------------------------------
   SPARKLINE FOR SALARY CARD
--------------------------------------- */
function MoneySpark() {
  return (
    <svg width="220" height="70" className="overflow-visible">
      <defs>
        {/* Neon premium gradient */}
        <linearGradient id="salary-line" x1="0" x2="1">
          <stop offset="0%" stopColor="#a78bfa" /> {/* Soft Purple */}
          <stop offset="50%" stopColor="#818cf8" /> {/* Indigo */}
          <stop offset="100%" stopColor="#6366f1" /> {/* Deep Indigo */}
        </linearGradient>

        {/* Soft shadow beneath line */}
        <filter id="line-shadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow
            dx="0"
            dy="6"
            stdDeviation="6"
            floodColor="#6366f1"
            floodOpacity="0.25"
          />
        </filter>

        {/* Glow effect */}
        <filter id="glow">
          <feGaussianBlur stdDeviation="6" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        {/* Vertical fade mask for realism */}
        <linearGradient id="fade-mask" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="white" stopOpacity="1" />
          <stop offset="100%" stopColor="white" stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* Subtle baseline */}
      <line
        x1="0"
        y1="50"
        x2="220"
        y2="50"
        stroke="#e5e7eb"
        strokeWidth="2"
        opacity="0.4"
      />

      {/* Glow under the curve */}
      <polyline
        points="0,40 40,42 80,35 120,38 160,28 200,25"
        fill="none"
        stroke="url(#salary-line)"
        strokeWidth="8"
        strokeLinecap="round"
        opacity="0.15"
        filter="url(#glow)"
      />

      {/* Main chart line with shadow */}
      <polyline
        points="0,40 40,42 80,35 120,38 160,28 200,25"
        fill="none"
        stroke="url(#salary-line)"
        strokeWidth="4"
        strokeLinecap="round"
        filter="url(#line-shadow)"
      />

      {/* A small highlight dot at the end (premium detail) */}
      <circle
        cx="200"
        cy="25"
        r="4.5"
        fill="white"
        stroke="#6366f1"
        strokeWidth="3"
        filter="url(#glow)"
      />
    </svg>
  );
}

/* ---------------------------------------
   HERO SECTION
--------------------------------------- */
function Hero() {
  return (
    <section className="relative w-full pt-40 pb-32 overflow-hidden">
      {/* ==== CINEMATIC AURORA BACKGROUND ==== */}
      {/* Layer 1 - Wide Glow */}
      <motion.div
        animate={{ x: [0, 120, 0], y: [0, -80, 0] }}
        transition={{ repeat: Infinity, duration: 28, ease: "easeInOut" }}
        className="absolute -top-[420px] -left-[420px] w-[900px] h-[900px]
                   bg-gradient-to-br from-purple-400/30 to-indigo-400/20 
                   blur-[220px] rounded-full"
      />

      {/* Layer 2 - Opposite Glow */}
      <motion.div
        animate={{ x: [0, -120, 0], y: [0, 80, 0] }}
        transition={{ repeat: Infinity, duration: 32, ease: "easeInOut" }}
        className="absolute -bottom-[420px] -right-[420px] w-[900px] h-[900px]
                   bg-gradient-to-br from-indigo-400/30 to-purple-400/20 
                   blur-[240px] rounded-full"
      />

      {/* Floating particles */}
      <motion.div
        animate={{ opacity: [0.4, 0.8, 0.4], y: [-20, 20, -20] }}
        transition={{ repeat: Infinity, duration: 10 }}
        className="absolute top-1/3 left-1/4 w-4 h-4 bg-white/40 blur-md rounded-full"
      />
      <motion.div
        animate={{ opacity: [0.3, 0.6, 0.3], y: [10, -10, 10] }}
        transition={{ repeat: Infinity, duration: 12 }}
        className="absolute top-2/3 right-1/3 w-5 h-5 bg-purple-300/40 blur-md rounded-full"
      />

      {/* ==== CONTENT WRAPPER ==== */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        {/* Premium Badge */}
        <motion.span
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="
            inline-flex items-center gap-2 px-8 py-3 
            bg-white/20 backdrop-blur-2xl 
            text-black font-semibold 
            rounded-full shadow-[0_8px_30px_rgba(0,0,0,0.25)]
            border border-white/30
          "
        >
          <span className="text-lg">🎯</span> Guided Career Navigation
        </motion.span>

        {/* Title with cinematic spotlight */}
        <motion.h1
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="
            mt-8 text-5xl md:text-6xl font-extrabold 
            bg-gradient-to-r from-indigo-700 via-blue-600 to-purple-600 
            bg-clip-text text-transparent
            drop-shadow-[0_8px_25px_rgba(0,0,0,0.2)]
            tracking-tight
          "
        >
          Career Roadmap Planner
        </motion.h1>

        {/* Glow spotlight behind text */}
        <div
          className="
          absolute left-1/2 top-[210px] -translate-x-1/2 
          w-[420px] h-[420px] 
          bg-gradient-to-t from-indigo-300/20 to-transparent 
          blur-[180px]
        "
        />

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="
            mt-6 max-w-2xl mx-auto 
            text-slate-700 text-lg leading-relaxed 
            drop-shadow-[0_2px_8px_rgba(0,0,0,0.15)]
          "
        >
          A milestone-based, AI-guided roadmap designed to take you from your
          current role to your dream tech career — with clarity, structure, and
          confidence.
        </motion.p>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.35 }}
          className="mt-10"
        >
          <a
            href="#roadmap"
            className="
              inline-block px-10 py-4 rounded-full 
              bg-gradient-to-r from-indigo-600 to-purple-600 
              text-white font-semibold 
              shadow-[0_12px_40px_rgba(99,102,241,0.35)]
              hover:shadow-[0_18px_55px_rgba(99,102,241,0.55)]
              hover:scale-[1.04]
              transition-all duration-300
            "
          >
            Start Your Roadmap
          </a>
        </motion.div>
      </div>
    </section>
  );
}

/* ---------------------------------------
   INPUT PANEL
--------------------------------------- */
function InputPanel({
  currentRole,
  setCurrentRole,
  targetRole,
  setTargetRole,
}) {
  return (
    <div
      className="
        relative
        bg-white/95 backdrop-blur-2xl
        border border-slate-200
        rounded-3xl
        p-10
        shadow-[0_28px_80px_rgba(0,0,0,0.08)]
        hover:shadow-[0_32px_90px_rgba(0,0,0,0.12)]
        transition-all
      "
    >
      {/* Decorative soft glow behind container */}
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-indigo-100/40 to-purple-100/40 blur-2xl -z-10"></div>

      {/* Heading */}
      <h3 className="text-2xl font-extrabold mb-4 flex items-center gap-3 text-slate-900">
        <FiTarget className="text-indigo-600 text-2xl" /> Customize Your Roadmap
      </h3>

      {/* Subtle underline for premium look */}
      <div className="h-[3px] w-28 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full mb-8 opacity-80 shadow-[0_0_12px_rgba(99,102,241,0.4)]"></div>

      {/* ==== Current Role ==== */}
      <label className="font-semibold text-sm text-slate-800">
        Current Role
      </label>

      <div
        className="
          mt-2 mb-6
          bg-white
          border border-slate-300
          rounded-2xl
          shadow-[0_4px_15px_rgba(0,0,0,0.04)]
          hover:shadow-[0_6px_20px_rgba(0,0,0,0.06)]
          transition-all
        "
      >
        <select
          className="
            w-full p-3 
            bg-transparent
            rounded-2xl
            focus:outline-none 
            text-slate-900 font-medium
          "
          value={currentRole}
          onChange={(e) => setCurrentRole(e.target.value)}
        >
          <option>Fresher / Student</option>
          <option>Frontend Developer</option>
          <option>Backend Developer</option>
          <option>Full Stack Developer</option>
        </select>
      </div>

      {/* ==== Target Role ==== */}
      <label className="font-semibold text-sm text-slate-800">
        Target Role
      </label>

      <div
        className="
          mt-2
          bg-white
          border border-slate-300
          rounded-2xl
          shadow-[0_4px_15px_rgba(0,0,0,0.04)]
          hover:shadow-[0_6px_20px_rgba(0,0,0,0.06)]
          transition-all
        "
      >
        <select
          className="
            w-full p-3 
            bg-transparent
            rounded-2xl
            focus:outline-none
            text-slate-900 font-medium
          "
          value={targetRole}
          onChange={(e) => setTargetRole(e.target.value)}
        >
          <option>Full Stack Developer</option>
          <option>Senior Frontend Engineer</option>
          <option>Java Backend Engineer</option>
          <option>Cloud / DevOps Engineer</option>
        </select>
      </div>

      {/* Small info note */}
      <p className="mt-6 text-sm text-slate-600 flex items-center gap-2">
        <FiBookOpen className="text-indigo-500" />
        Roadmap suggestions are automatically tailored based on your input.
      </p>
    </div>
  );
}

/* ---------------------------------------
   ROADMAP TIMELINE
--------------------------------------- */
function RoadmapTimeline({ roadmap }) {
  return (
    <div className="relative space-y-14">
      {/* Timeline Vertical Line */}
      <div className="absolute left-5 top-0 h-full w-[4px] bg-gradient-to-b from-indigo-400 via-purple-400 to-transparent rounded-full opacity-60" />

      {roadmap.map((phase, idx) => (
        <motion.div
          key={idx}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: idx * 0.15 }}
          viewport={{ once: true }}
          className="
            relative ml-12
            bg-white/90 backdrop-blur-2xl 
            border border-slate-200/60 
            rounded-3xl p-10 
            shadow-[0_25px_80px_rgba(0,0,0,0.06)]
            hover:shadow-[0_30px_90px_rgba(0,0,0,0.1)]
            transition-all transform-gpu
            hover:-translate-y-1
          "
        >
          {/* Timeline Bullet */}
          <div className="absolute -left-7 top-8">
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="
                w-6 h-6 
                rounded-full 
                bg-gradient-to-br from-indigo-600 to-purple-600
                shadow-[0_0_15px_rgba(99,102,241,0.7)]
              "
            />
          </div>

          {/* Phase Title */}
          <div className="mb-6">
            <h4 className="text-2xl font-extrabold text-slate-900 flex items-center gap-3">
              <FiFlag className="text-indigo-600 text-2xl" />
              {phase.phase}
            </h4>

            {/* underline accent */}
            <div className="h-[3px] w-24 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full mt-2 opacity-80 shadow-[0_0_10px_rgba(99,102,241,0.4)]" />
          </div>

          {/* Bullet List */}
          <ul className="space-y-3 text-slate-700 text-[15px] leading-relaxed">
            {phase.items.map((item, i) => (
              <li
                key={i}
                className="
                  flex items-start gap-3 
                  hover:translate-x-1 transition-all
                "
              >
                <span className="text-indigo-600 text-lg mt-0.5">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>

          {/* Soft bottom glow */}
          <div className="absolute inset-x-0 bottom-0 h-6 bg-gradient-to-b from-transparent to-indigo-50/40 rounded-b-3xl pointer-events-none" />
        </motion.div>
      ))}
    </div>
  );
}

/* ---------------------------------------
   SKILLS SECTION
--------------------------------------- */
function SkillsSection({ role }) {
  const skills = skillsByRole[role] || skillsByRole["Full Stack Developer"];

  // Additional metadata for skill cards
  const skillDetails = {
    React: {
      desc: "Core UI library for building component-driven interfaces.",
      category: "Frontend",
      difficulty: "Intermediate",
    },
    "Spring Boot / Node": {
      desc: "Backend framework for REST APIs, microservices & business logic.",
      category: "Backend",
      difficulty: "Intermediate",
    },
    "REST API Design": {
      desc: "Structuring scalable & secure APIs for modern apps.",
      category: "Architecture",
      difficulty: "Easy",
    },
    "SQL & NoSQL": {
      desc: "Databases for storing, querying & managing application data.",
      category: "Databases",
      difficulty: "Intermediate",
    },
    TypeScript: {
      desc: "Strong typing for clean, error-free JavaScript at scale.",
      category: "Frontend",
      difficulty: "Intermediate",
    },
    "Tailwind CSS": {
      desc: "Utility-first CSS framework for rapid modern UI styling.",
      category: "Design",
      difficulty: "Easy",
    },
    Accessibility: {
      desc: "Building inclusive interfaces for all users.",
      category: "Frontend",
      difficulty: "Easy",
    },
  };

  return (
    <section className="relative mt-28">
      {/* Background Aurora */}
      <motion.div
        animate={{ opacity: [0.4, 0.7, 0.4], scale: [1, 1.05, 1] }}
        transition={{ duration: 8, repeat: Infinity }}
        className="absolute -top-20 left-0 w-[480px] h-[480px] bg-indigo-300/25 blur-[150px] rounded-full"
      />
      <motion.div
        animate={{ opacity: [0.3, 0.6, 0.3], scale: [1.05, 1, 1.05] }}
        transition={{ duration: 9, repeat: Infinity }}
        className="absolute -bottom-20 right-0 w-[480px] h-[480px] bg-purple-300/25 blur-[170px] rounded-full"
      />

      <div
        className="
          relative z-10
          bg-white/90 backdrop-blur-2xl 
          border border-slate-200/70 
          rounded-3xl p-12 
          shadow-[0_35px_90px_rgba(0,0,0,0.08)]
        "
      >
        {/* Header */}
        <h2 className="text-3xl font-extrabold flex items-center gap-3 mb-4 text-slate-900">
          <FiAward className="text-indigo-600 text-3xl" />
          Recommended Skills
        </h2>

        {/* Underline */}
        <div className="h-[4px] w-40 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full mb-10 shadow-[0_0_12px_rgba(99,102,241,0.5)]"></div>

        {/* Skills Grid */}
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-12">
          {skills.map((skill, i) => {
            const info = skillDetails[skill.name] || {};

            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12, duration: 0.6 }}
                whileHover={{
                  y: -10,
                  scale: 1.04,
                  rotateX: 4,
                  rotateY: -4,
                }}
                className="
                  relative bg-white rounded-2xl p-7
                  border border-slate-200
                  shadow-[0_12px_30px_rgba(0,0,0,0.06)]
                  hover:shadow-[0_22px_60px_rgba(0,0,0,0.12)]
                  transition-all transform-gpu cursor-pointer
                "
              >
                {/* Glow halo */}
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-200/40 to-purple-200/40 blur-xl rounded-2xl opacity-0 group-hover:opacity-100 transition-all" />

                {/* Icon */}
                <motion.div
                  animate={{ rotate: [0, 3, -3, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="
                    relative z-10 w-16 h-16 mx-auto 
                    rounded-2xl bg-gradient-to-br from-purple-600 to-indigo-600
                    flex items-center justify-center text-white text-3xl
                    shadow-[0_12px_25px_rgba(99,102,241,0.35)]
                  "
                >
                  {skill.icon}
                </motion.div>

                {/* Skill Name */}
                <div className="mt-5 font-bold text-slate-900 text-center text-lg z-10 relative">
                  {skill.name}
                </div>

                {/* Category */}
                <div className="text-xs text-indigo-600 text-center font-semibold mt-1">
                  {info.category || "Core Skill"}
                </div>

                {/* Description */}
                <p className="text-[13px] text-slate-600 mt-3 leading-relaxed text-center px-1">
                  {info.desc || "Essential skill for modern development roles."}
                </p>

                {/* Difficulty + Level Progress */}
                <div className="mt-4">
                  <div className="flex justify-between text-xs text-slate-500 font-semibold mb-1">
                    <span>{info.difficulty || "Intermediate"}</span>
                    <span>75%</span>
                  </div>

                  <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
                    <div className="h-full w-3/4 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full" />
                  </div>
                </div>

                {/* Badge */}
                <span
                  className="
                    mt-4 inline-block mx-auto px-4 py-1
                    bg-indigo-50 text-indigo-700 rounded-full
                    text-xs font-semibold shadow-sm 
                    z-10 relative text-center w-full
                  "
                >
                  Why Important: Helps you grow faster 🚀
                </span>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------
   PROJECTS SECTION
--------------------------------------- */
function ProjectsSection() {
  return (
    <section className="relative mt-28">
      {/* Floating Aurora Background */}
      <motion.div
        animate={{ opacity: [0.4, 0.7, 0.4], scale: [1, 1.07, 1] }}
        transition={{ duration: 10, repeat: Infinity }}
        className="absolute -top-32 right-0 w-[500px] h-[500px] bg-purple-300/30 blur-[160px] rounded-full"
      />
      <motion.div
        animate={{ opacity: [0.3, 0.6, 0.3], scale: [1.05, 1, 1.05] }}
        transition={{ duration: 12, repeat: Infinity }}
        className="absolute -bottom-32 left-0 w-[500px] h-[500px] bg-indigo-300/30 blur-[180px] rounded-full"
      />

      <div
        className="
          relative z-10
          bg-white/90 backdrop-blur-2xl 
          border border-slate-200/70 
          rounded-3xl p-12 
          shadow-[0_35px_100px_rgba(0,0,0,0.08)]
        "
      >
        {/* Header */}
        <h2 className="text-3xl font-extrabold flex items-center gap-3 text-slate-900 mb-3">
          <FiUsers className="text-indigo-600 text-3xl" />
          Suggested Projects
        </h2>

        {/* Underline */}
        <div className="h-[4px] w-32 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full mb-12 shadow-[0_0_15px_rgba(99,102,241,0.6)]"></div>

        {/* Project Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-12">
          {sampleProjects.map((p, index) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.12, duration: 0.6 }}
              whileHover={{
                y: -12,
                scale: 1.03,
                rotateX: 4,
                rotateY: -4,
              }}
              className="
                relative
                bg-white rounded-3xl overflow-hidden 
                border border-slate-200/70 
                shadow-[0_20px_50px_rgba(0,0,0,0.08)]
                hover:shadow-[0_32px_75px_rgba(0,0,0,0.14)]
                transition-all transform-gpu cursor-pointer
              "
            >
              {/* Top Image */}
              <div className="relative overflow-hidden group">
                <img
                  src={p.image}
                  className="h-48 w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />

                {/* Image Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent opacity-50" />
              </div>

              <div className="p-7 relative z-10">
                {/* Project Title */}
                <h3 className="font-bold text-xl text-slate-900">{p.title}</h3>

                {/* Short Description */}
                <p className="text-slate-600 text-sm mt-3 leading-relaxed">
                  {p.blurb}
                </p>

                {/* Added Information Section */}
                <div className="mt-5 space-y-3 text-sm text-slate-700">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-indigo-600">
                      Difficulty
                    </span>
                    <span className="text-slate-700">
                      {index % 3 === 0
                        ? "Intermediate"
                        : index % 3 === 1
                        ? "Advanced"
                        : "Beginner"}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-indigo-600">
                      Estimated Time
                    </span>
                    <span>
                      {index % 3 === 0
                        ? "4–6 weeks"
                        : index % 3 === 1
                        ? "6–8 weeks"
                        : "3–4 weeks"}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-indigo-600">
                      Output
                    </span>
                    <span>Portfolio-ready project</span>
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mt-5">
                  {p.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-semibold"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* CTA Buttons */}
                <div className="mt-6 flex justify-between items-center">
                  <a
                    href="#"
                    className="
                      inline-flex items-center gap-2 
                      text-indigo-600 font-semibold hover:underline
                    "
                  >
                    View Case <FiArrowRight />
                  </a>

                  <button
                    className="
                      px-4 py-2 rounded-full text-white 
                      bg-gradient-to-r from-indigo-600 to-purple-600
                      text-xs font-semibold shadow-md
                      hover:scale-105 transition
                    "
                  >
                    Start Project
                  </button>
                </div>
              </div>

              {/* Soft Bottom Glow */}
              <div className="absolute inset-x-0 bottom-0 h-6 bg-gradient-to-b from-transparent to-indigo-50/30"></div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------
   SALARY SECTION
--------------------------------------- */
function SalarySection() {
  return (
    <section className="relative mt-28">
      {/* Aurora Background Lighting */}
      <motion.div
        animate={{ opacity: [0.5, 0.8, 0.5], scale: [1, 1.1, 1] }}
        transition={{ duration: 12, repeat: Infinity }}
        className="absolute -top-28 right-0 w-[520px] h-[520px] bg-indigo-300/30 blur-[160px] rounded-full"
      />
      <motion.div
        animate={{ opacity: [0.4, 0.7, 0.4], scale: [1.08, 1, 1.08] }}
        transition={{ duration: 12, repeat: Infinity }}
        className="absolute -bottom-28 left-0 w-[520px] h-[520px] bg-purple-300/30 blur-[180px] rounded-full"
      />

      {/* Main Card */}
      <div
        className="
          relative z-10
          bg-white/90 backdrop-blur-2xl 
          border border-slate-200/70 
          rounded-3xl p-12 
          shadow-[0_35px_100px_rgba(0,0,0,0.08)]
        "
      >
        {/* Header */}
        <h2 className="text-3xl font-extrabold flex items-center gap-3 mb-4 text-slate-900">
          <FiTrendingUp className="text-indigo-600 text-3xl" />
          Salary Insights
        </h2>

        {/* Header underline */}
        <div className="h-[4px] w-40 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full mb-12 shadow-[0_0_15px_rgba(99,102,241,0.6)]"></div>

        {/* Salary Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-12">
          {salaryProjectionSamples.map((s, index) => (
            <motion.div
              key={s.role}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{
                y: -14,
                scale: 1.04,
                rotateX: 4,
                rotateY: -4,
              }}
              className="
                relative bg-white 
                rounded-3xl p-7
                border border-slate-200/70
                shadow-[0_20px_60px_rgba(0,0,0,0.08)]
                hover:shadow-[0_30px_80px_rgba(0,0,0,0.12)]
                transition-all transform-gpu cursor-pointer
              "
            >
              {/* Glow halo */}
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-200/40 to-purple-200/40 blur-xl rounded-3xl opacity-0 group-hover:opacity-100 transition-all" />

              {/* Title Row */}
              <div className="flex justify-between items-start mb-3">
                <div className="font-bold text-slate-900 text-lg">{s.role}</div>

                <div className="text-indigo-600 font-extrabold text-lg">
                  ₹{s.base}–{s.high} LPA
                </div>
              </div>

              {/* Experience Levels */}
              <div className="flex justify-between text-xs text-slate-500 mb-4">
                <span>Entry: ₹{s.base - 2 > 0 ? s.base - 2 : s.base} LPA</span>
                <span>Mid: ₹{Math.round((s.base + s.high) / 2)} LPA</span>
                <span>Senior: ₹{s.high + 4} LPA</span>
              </div>

              {/* Premium Sparkline Chart */}
              <MoneySpark />

              {/* Growth Badge */}
              <div className="mt-4 inline-flex items-center gap-2 px-4 py-1 rounded-full bg-emerald-100 text-emerald-700 text-sm font-bold shadow">
                <FiTrendingUp className="animate-pulse" />
                {s.growthPct}% YoY Growth
              </div>

              {/* Market Demand Score */}
              <div className="mt-5">
                <div className="flex justify-between text-sm text-slate-500 font-semibold mb-1">
                  <span>Market Demand</span>
                  <span>
                    {index % 3 === 0
                      ? "High"
                      : index % 3 === 1
                      ? "Very High"
                      : "Moderate"}
                  </span>
                </div>

                <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full"
                    style={{
                      width:
                        index % 3 === 0
                          ? "80%"
                          : index % 3 === 1
                          ? "95%"
                          : "65%",
                    }}
                  />
                </div>
              </div>

              {/* Hiring Strength */}
              <div className="mt-5 flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse"></div>
                <span className="text-sm text-slate-700 font-medium">
                  Active Hiring Trend Across India
                </span>
              </div>

              {/* Bottom subtle glow */}
              <div className="absolute inset-x-0 bottom-0 h-6 bg-gradient-to-b from-transparent to-indigo-50/40 rounded-b-3xl"></div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------
   NEXT STEPS
--------------------------------------- */
function NextSteps() {
  return (
    <section className="relative mt-28">
      {/* Animated Aurora Glow */}
      <motion.div
        animate={{ opacity: [0.4, 0.7, 0.4], scale: [1, 1.05, 1] }}
        transition={{ duration: 9, repeat: Infinity }}
        className="absolute -top-20 left-0 w-[500px] h-[500px] bg-indigo-400/30 blur-[160px] rounded-full"
      />
      <motion.div
        animate={{ opacity: [0.3, 0.6, 0.3], scale: [1.04, 1, 1.04] }}
        transition={{ duration: 10, repeat: Infinity }}
        className="absolute -bottom-20 right-0 w-[500px] h-[500px] bg-purple-400/30 blur-[180px] rounded-full"
      />

      {/* Main Card */}
      <div
        className="
          relative z-10
          bg-gradient-to-br from-indigo-700 to-purple-700 
          text-white rounded-3xl p-14 
          shadow-[0_35px_100px_rgba(0,0,0,0.25)]
          overflow-hidden
        "
      >
        {/* Glass Light Overlay */}
        <div className="absolute inset-0 bg-white/5 backdrop-blur-3xl pointer-events-none"></div>

        {/* Heading */}
        <h2 className="relative text-4xl font-extrabold mb-4">
          Next Steps — Your 30-Day Action Plan
        </h2>

        {/* Subline */}
        <p className="relative text-white/80 mb-10 text-lg">
          Follow this guided roadmap to confidently progress toward your target
          role.
        </p>

        {/* Checklist Cards */}
        <div className="relative grid md:grid-cols-2 gap-8 mt-6">
          {/* Step 1 */}
          <motion.div
            whileHover={{ y: -8, scale: 1.02 }}
            className="
              bg-white/10 backdrop-blur-xl rounded-2xl p-6 
              shadow-[0_12px_40px_rgba(255,255,255,0.15)] 
              transition-all border border-white/20
            "
          >
            <div className="flex gap-4 items-start">
              <div className="w-10 h-10 rounded-full bg-emerald-400 flex items-center justify-center text-indigo-900 text-xl shadow-md">
                <FiCheckCircle />
              </div>

              <div>
                <h4 className="font-bold text-xl mb-1">Polish Your Resume</h4>
                <p className="text-white/80 text-sm leading-relaxed">
                  Highlight achievements, tailor skills, sharpen formatting to
                  stand out.
                </p>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="mt-5">
              <div className="text-xs font-semibold text-white/70 mb-1">
                Progress: 40%
              </div>
              <div className="h-2 bg-white/20 rounded-full overflow-hidden">
                <div className="h-full w-[40%] bg-emerald-400 rounded-full"></div>
              </div>
            </div>
          </motion.div>

          {/* Step 2 */}
          <motion.div
            whileHover={{ y: -8, scale: 1.02 }}
            className="
              bg-white/10 backdrop-blur-xl rounded-2xl p-6 
              shadow-[0_12px_40px_rgba(255,255,255,0.15)] 
              transition-all border border-white/20
            "
          >
            <div className="flex gap-4 items-start">
              <div className="w-10 h-10 rounded-full bg-yellow-400 flex items-center justify-center text-indigo-900 text-xl shadow-md">
                ⚡
              </div>

              <div>
                <h4 className="font-bold text-xl mb-1">
                  Build Portfolio Projects
                </h4>
                <p className="text-white/80 text-sm leading-relaxed">
                  Complete at least 2 end-to-end apps showcasing UI, API &
                  deployment.
                </p>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="mt-5">
              <div className="text-xs font-semibold text-white/70 mb-1">
                Progress: 20%
              </div>
              <div className="h-2 bg-white/20 rounded-full overflow-hidden">
                <div className="h-full w-[20%] bg-yellow-300 rounded-full"></div>
              </div>
            </div>
          </motion.div>

          {/* Step 3 */}
          <motion.div
            whileHover={{ y: -8, scale: 1.02 }}
            className="
              bg-white/10 backdrop-blur-xl rounded-2xl p-6 
              shadow-[0_12px_40px_rgba(255,255,255,0.15)] 
              transition-all border border-white/20
            "
          >
            <div className="flex gap-4 items-start">
              <div className="w-10 h-10 rounded-full bg-blue-400 flex items-center justify-center text-indigo-900 text-xl shadow-md">
                🧠
              </div>

              <div>
                <h4 className="font-bold text-xl mb-1">Master Interviews</h4>
                <p className="text-white/80 text-sm leading-relaxed">
                  Practice system design, DSA, and mock interviews weekly.
                </p>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="mt-5">
              <div className="text-xs font-semibold text-white/70 mb-1">
                Progress: 10%
              </div>
              <div className="h-2 bg-white/20 rounded-full overflow-hidden">
                <div className="h-full w-[10%] bg-blue-300 rounded-full"></div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* CTA Button */}
        <div className="relative mt-12 text-center">
          <button
            className="
              px-12 py-4 rounded-full
              bg-white text-indigo-700 font-bold text-lg
              shadow-xl hover:scale-105 transition
              hover:shadow-[0_20px_60px_rgba(255,255,255,0.4)]
            "
          >
            Apply to Suggested Roles
          </button>
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------
   MAIN PAGE
--------------------------------------- */
export default function CareerRoadmap() {
  const [currentRole, setCurrentRole] = useState("Fresher / Student");
  const [targetRole, setTargetRole] = useState("Full Stack Developer");

  return (
    <main className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <Hero />

      <section className="max-w-6xl mx-auto px-6 pb-32">
        {/* INPUT PANEL */}
        <InputPanel
          currentRole={currentRole}
          setCurrentRole={setCurrentRole}
          targetRole={targetRole}
          setTargetRole={setTargetRole}
        />

        {/* ROADMAP TIMELINE */}
        <section className="mt-24">
          <h2 className="text-3xl font-extrabold mb-6 text-slate-900">
            Roadmap Overview
          </h2>
          <RoadmapTimeline roadmap={sampleRoadmap} />
        </section>

        {/* SKILLS */}
        <SkillsSection role={targetRole} />

        {/* PROJECTS */}
        <ProjectsSection />

        {/* SALARY */}
        <SalarySection />

        {/* NEXT STEPS */}
        <NextSteps />
      </section>

      <Footer />
    </main>
  );
}
