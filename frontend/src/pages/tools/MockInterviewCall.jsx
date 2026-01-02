// src/pages/tools/MockInterviewTool.jsx
import { useState } from "react";
import { motion } from "framer-motion";
import {
  FiBriefcase,
  FiHelpCircle,
  FiClock,
  FiStar,
  FiBookOpen,
  FiTarget,
} from "react-icons/fi";
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

const behavioralQuestions = [
  "Tell me about a time you handled a conflict in a team.",
  "Describe a challenging situation and how you solved it.",
  "What are your strengths and weaknesses?",
  "Explain a time when you failed and what you learned.",
];

export default function MockInterviewTool() {
  const [role, setRole] = useState("Frontend Developer");
  const [difficulty, setDifficulty] = useState("Medium");

  return (
    <>
      <section className="min-h-screen bg-linear-to-br from-indigo-50 via-white to-purple-50 pt-32 pb-24 px-6">
        <div className="max-w-6xl mx-auto">
          {/* ================= HEADER ================= */}
          <div className="text-center mb-20 relative">
            {/* Floating Gradient Blob */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 0.15, scale: 1.2 }}
              transition={{ duration: 1.5 }}
              className="absolute inset-0 -z-10 bg-gradient-to-r from-indigo-300 via-purple-300 to-pink-300 rounded-full blur-3xl"
            />

            {/* Badge */}
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="
      inline-block mb-6 px-7 py-3 
      bg-white border border-indigo-200 shadow-sm 
      text-black rounded-full 
      text-sm font-semibold tracking-wide
      hover:shadow-md hover:scale-[1.03] transition
    "
            >
              🎤 Interview Readiness
            </motion.span>

            {/* Title */}
            <motion.h1
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="
      text-6xl font-extrabold 
      bg-gradient-to-r from-indigo-700 via-purple-700 to-indigo-700 
      bg-clip-text text-transparent 
      drop-shadow-sm 
      mb-6"
            >
              Mock Interview Questions
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="
      max-w-3xl mx-auto 
      text-black/70 text-lg leading-relaxed 
      tracking-wide
    "
            >
              Master real-world interview questions asked by product companies,
              MNCs, and fast-growing startups — with structured guidance and
              premium insights.
            </motion.p>

            {/* Animated underline accent */}
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: 180 }}
              transition={{ duration: 1, delay: 0.6 }}
              className="mx-auto mt-6 h-1 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full"
            />
          </div>

          {/* ================= ROLE + QUESTIONS (ULTRA PREMIUM) ================= */}
          {/* ================= ROLE + QUESTIONS (HYPER PREMIUM) ================= */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="grid md:grid-cols-2 gap-14 relative mt-20"
          >
            {/* ===== Floating Particle Lights ===== */}
            {[...Array(14)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                animate={{
                  opacity: [0.3, 0.7, 0.3],
                  x: [0, Math.random() * 40 - 20],
                  y: [0, Math.random() * 40 - 20],
                }}
                transition={{
                  duration: 4 + Math.random() * 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute w-2 h-2 bg-gradient-to-r from-indigo-400 to-purple-500 rounded-full blur-[2px]"
                style={{
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                }}
              />
            ))}

            {/* ===== Animated Hologram Background ===== */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.16 }}
              transition={{ duration: 1.4 }}
              className="
      absolute inset-0 -z-10 
      bg-gradient-to-tr from-indigo-300 via-purple-300 to-pink-300 
      blur-[90px] rounded-3xl
    "
            />

            {/* ================= LEFT CARD ================= */}
            <motion.div
              whileHover={{ scale: 1.03, rotateY: 2 }}
              transition={{ type: "spring", stiffness: 120 }}
              className="
      relative bg-white/80 backdrop-blur-xl 
      rounded-3xl shadow-xl border border-slate-200 
      p-12 transition-all 
      hover:shadow-indigo-400/40 hover:border-indigo-500 
      transform-gpu perspective-1000
    "
            >
              {/* Top Neon Edge Glow */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.4 }}
                transition={{ duration: 1, delay: 0.4 }}
                className="
        absolute top-0 left-0 right-0 h-[4px] 
        bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 
        rounded-t-3xl blur-sm
      "
              />

              <h2 className="text-3xl font-extrabold mb-8 text-black flex items-center gap-3">
                <FiBriefcase className="text-indigo-600 text-3xl drop-shadow" />
                Select Role
              </h2>

              {/* Dropdown */}
              <div className="relative mb-10">
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="
          w-full border border-slate-300 rounded-2xl 
          px-4 py-3 text-black bg-white 
          outline-none shadow-sm 
          focus:ring-2 focus:ring-indigo-500 transition
        "
                >
                  {Object.keys(questionBank).map((r) => (
                    <option key={r}>{r}</option>
                  ))}
                </select>

                {/* Interactive Glow Outline */}
                <motion.div
                  whileHover={{ opacity: 1 }}
                  className="
          absolute inset-0 rounded-2xl 
          border border-indigo-300 opacity-0 transition-all
        "
                />
              </div>

              {/* Difficulty Selector */}
              <div>
                <h3 className="font-semibold text-black mb-4 flex items-center gap-2 text-lg">
                  <FiStar className="text-purple-600" />
                  Select Difficulty
                </h3>

                <div className="flex gap-4">
                  {["Easy", "Medium", "Hard"].map((level) => {
                    const active = difficulty === level;
                    return (
                      <motion.button
                        whileHover={{ scale: active ? 1.1 : 1.05 }}
                        key={level}
                        onClick={() => setDifficulty(level)}
                        className={`
                px-5 py-2.5 rounded-xl text-sm font-medium border transition-all
                ${
                  active
                    ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white border-indigo-600 shadow-lg scale-105"
                    : "bg-white text-black border-slate-300 hover:bg-slate-100 hover:shadow"
                }
              `}
                      >
                        {level}
                      </motion.button>
                    );
                  })}
                </div>
              </div>

              {/* Tip */}
              <p className="text-sm text-black/60 flex items-center gap-2 mt-10">
                <FiClock className="text-indigo-500" />
                Tip: Time yourself & record your answers to improve clarity.
              </p>
            </motion.div>

            {/* ================= RIGHT CARD ================= */}
            <motion.div
              whileHover={{ scale: 1.03, rotateY: -2 }}
              transition={{ type: "spring", stiffness: 120 }}
              className="
      relative bg-white/80 backdrop-blur-xl 
      rounded-3xl shadow-xl border border-slate-200 
      p-12 transition-all 
      hover:shadow-purple-400/40 hover:border-purple-500 
      transform-gpu perspective-1000
    "
            >
              {/* Neon Edge */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.4 }}
                transition={{ duration: 1, delay: 0.4 }}
                className="
        absolute top-0 left-0 right-0 h-[4px] 
        bg-gradient-to-r from-purple-500 via-pink-500 to-indigo-500 
        rounded-t-3xl blur-sm
      "
              />

              <h2 className="text-3xl font-extrabold mb-8 text-black flex items-center gap-3">
                <FiHelpCircle className="text-indigo-600 text-3xl drop-shadow" />
                Sample Questions ({difficulty})
              </h2>

              <ul className="space-y-6 text-black">
                {questionBank[role].map((q, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: 25 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: i * 0.12 }}
                    whileHover={{ scale: 1.05, x: 6 }}
                    className="
            p-6 rounded-2xl bg-slate-50 border border-slate-200 
            text-sm text-black shadow-sm 
            hover:shadow-xl hover:bg-white transition flex items-start gap-3
          "
                  >
                    <motion.span
                      animate={{ rotate: [0, 10, -10, 0] }}
                      transition={{ duration: 1.6, repeat: Infinity }}
                      className="font-semibold text-indigo-600"
                    >
                      Q{i + 1}.
                    </motion.span>
                    {q}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </motion.div>

          {/* ================= BEHAVIORAL QUESTIONS (ULTRA PREMIUM) ================= */}
          {/* ================= BEHAVIORAL QUESTIONS (HYPER PREMIUM) ================= */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="relative mt-28"
          >
            {/* Floating Gradient Aura */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.2 }}
              transition={{ duration: 1.3 }}
              className="
      absolute inset-0 -z-10 
      bg-gradient-to-tr from-indigo-300 via-purple-300 to-pink-300 
      blur-[90px] rounded-3xl
    "
            />

            {/* Floating Particle Lights */}
            {[...Array(12)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                animate={{
                  opacity: [0.3, 0.7, 0.3],
                  x: [0, Math.random() * 40 - 20],
                  y: [0, Math.random() * 40 - 20],
                }}
                transition={{
                  duration: 4 + Math.random() * 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="
        absolute w-2 h-2 
        bg-gradient-to-r from-indigo-400 to-purple-500 
        rounded-full blur-[2px]
      "
                style={{
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                }}
              />
            ))}

            {/* Main Card */}
            <motion.div
              whileHover={{ scale: 1.01 }}
              transition={{ type: "spring", stiffness: 120 }}
              className="
      relative bg-white/80 backdrop-blur-2xl 
      rounded-3xl shadow-2xl border border-slate-200 
      p-14 transition-all 
      hover:shadow-indigo-400/40 hover:border-indigo-500
    "
            >
              {/* Animated Gradient Outer Border */}
              <motion.div
                animate={{
                  rotate: 360,
                  opacity: [0.3, 0.6, 0.3],
                }}
                transition={{
                  duration: 10,
                  repeat: Infinity,
                  ease: "linear",
                }}
                className="
        absolute inset-0 rounded-3xl -z-10 
        bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 
        blur-[6px] opacity-50
      "
              />

              {/* Header */}
              <div className="flex items-center gap-4 mb-12">
                <motion.div
                  initial={{ rotate: -20, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  transition={{ duration: 0.6 }}
                >
                  <FiBookOpen className="text-indigo-600 text-4xl drop-shadow" />
                </motion.div>

                <div className="relative">
                  <h2 className="text-4xl font-black text-black tracking-tight">
                    Behavioral Interview Questions
                  </h2>

                  {/* Metallic Shine Underline */}
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 1, delay: 0.4 }}
                    className="
            h-[3px] bg-gradient-to-r 
            from-indigo-600 via-purple-600 to-pink-500 
            rounded-full mt-2
          "
                  />
                </div>
              </div>

              {/* Questions Grid */}
              <ul className="grid md:grid-cols-2 gap-9">
                {behavioralQuestions.map((q, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: i * 0.12 }}
                    whileHover={{ scale: 1.05, x: 8 }}
                    className="
            relative p-6 rounded-2xl 
            bg-gradient-to-br from-slate-50 to-white 
            border border-slate-200 shadow-sm 
            text-black text-[15px] 
            hover:border-indigo-300 hover:shadow-xl 
            transition-all flex items-start gap-4 cursor-pointer
            overflow-hidden
          "
                  >
                    {/* Spotlight Shine */}
                    <motion.div
                      className="
              absolute inset-0 bg-gradient-to-br 
              from-white/60 to-transparent 
              opacity-0 hover:opacity-20 
              transition-all duration-500
            "
                    />

                    {/* Animated Star Icon */}
                    <motion.span
                      animate={{ rotate: [0, 15, -15, 0] }}
                      transition={{ duration: 1.8, repeat: Infinity }}
                      className="text-indigo-600 text-xl mt-0.5"
                    >
                      ⭐
                    </motion.span>

                    {/* Text */}
                    <span>{q}</span>

                    {/* Accent vertical glow */}
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: "100%" }}
                      transition={{ duration: 0.6, delay: i * 0.15 }}
                      className="
              absolute right-0 top-0 w-[4px] 
              bg-gradient-to-b from-indigo-500 via-purple-500 to-pink-500 
              opacity-50 rounded-full
            "
                    />
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </motion.div>

          {/* ================= ANSWER TIPS SECTION (HYPER PREMIUM) ================= */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="relative mt-28"
          >
            {/* Floating Multi-Layer Aura */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.2 }}
              transition={{ duration: 1.4 }}
              className="
      absolute inset-0 -z-10 
      bg-gradient-to-r from-indigo-300 via-purple-300 to-pink-300 
      blur-[90px] rounded-3xl
    "
            />

            {/* Floating Particle Lights */}
            {[...Array(10)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                animate={{
                  opacity: [0.2, 0.6, 0.2],
                  x: [0, Math.random() * 40 - 20],
                  y: [0, Math.random() * 40 - 20],
                }}
                transition={{
                  duration: 4 + Math.random() * 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="
        absolute w-2 h-2 rounded-full 
        bg-gradient-to-tr from-indigo-400 to-purple-400 
        blur-[2px]
      "
                style={{
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                }}
              />
            ))}

            {/* Main Premium Card */}
            <motion.div
              whileHover={{ scale: 1.01 }}
              transition={{ type: "spring", stiffness: 120 }}
              className="
      relative bg-white/80 backdrop-blur-2xl 
      rounded-3xl shadow-2xl border border-slate-200 
      p-14 transition-all 
      hover:shadow-indigo-400/40 hover:border-indigo-500
    "
            >
              {/* Animated Gradient Border Ring */}
              <motion.div
                animate={{
                  opacity: [0.4, 1, 0.4],
                  rotate: 360,
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "linear",
                }}
                className="
        absolute inset-0 rounded-3xl -z-10
        border-[3px] border-transparent
        bg-gradient-to-r from-indigo-400 via-purple-500 to-pink-500 
        opacity-30 blur-[6px]
      "
              />

              {/* Header */}
              <div className="relative mb-10">
                <motion.h2
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="text-4xl font-black mb-3 text-black tracking-tight"
                >
                  AI-Powered Answering Tips
                </motion.h2>

                {/* Header Metallic Shine */}
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 1, delay: 0.4 }}
                  className="
          h-[3px] bg-gradient-to-r 
          from-indigo-600 via-purple-600 to-pink-500
          rounded-full
        "
                />
              </div>

              {/* Subtitle */}
              <motion.p
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
                className="text-black/80 text-lg leading-relaxed max-w-3xl"
              >
                Use the{" "}
                <span className="font-bold text-black">STAR Method</span> — a
                powerful framework (Situation → Task → Action → Result) to
                deliver clear, structured, high-impact interview answers.
              </motion.p>

              {/* Skills Grid */}
              <div className="grid md:grid-cols-3 gap-10 mt-14">
                {["Clarity", "Confidence", "Problem-Solving"].map(
                  (skill, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 25 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: i * 0.15 }}
                      whileHover={{ scale: 1.06, rotate: 1 }}
                      className="
            relative bg-white/70 backdrop-blur-xl 
            p-8 rounded-2xl border border-slate-200 
            shadow-md hover:shadow-2xl transition-all
            overflow-hidden cursor-pointer group
          "
                    >
                      {/* Holographic Hover Shine */}
                      <motion.div
                        className="
              absolute inset-0 bg-gradient-to-br 
              from-white/70 via-transparent to-white/40 
              opacity-0 group-hover:opacity-20 
              transition-all duration-500
            "
                      />

                      {/* Animated Corner Glow */}
                      <motion.div
                        animate={{
                          opacity: [0.1, 0.4, 0.1],
                          scale: [1, 1.4, 1],
                        }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                        }}
                        className="
              absolute -top-4 -right-4 
              w-12 h-12 rounded-full 
              bg-gradient-to-br from-indigo-400 to-purple-500 blur-xl
            "
                      />

                      {/* Skill Title */}
                      <h3 className="font-bold text-xl text-black mb-3">
                        {skill}
                      </h3>

                      {/* Description */}
                      <p className="text-black/70 text-sm leading-relaxed">
                        Master this skill by practicing structured responses,
                        recording mock answers, and analyzing AI-driven
                        guidance.
                      </p>
                    </motion.div>
                  )
                )}
              </div>
            </motion.div>
          </motion.div>

          {/* ================= RESOURCES SECTION (HYPER PREMIUM) ================= */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="relative mt-28"
          >
            {/* Floating Gradient Aura */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.18 }}
              transition={{ duration: 1.4 }}
              className="
      absolute inset-0 -z-10 
      bg-gradient-to-br from-indigo-300 via-purple-300 to-pink-300 
      blur-3xl rounded-3xl
    "
            />

            {/* Floating Particle Lights */}
            {[...Array(12)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                animate={{
                  opacity: [0.2, 0.6, 0.2],
                  x: [0, Math.random() * 40 - 20],
                  y: [0, Math.random() * 40 - 20],
                }}
                transition={{
                  duration: 4 + Math.random() * 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="
        absolute w-2 h-2 
        bg-gradient-to-r from-indigo-400 to-purple-400 
        rounded-full blur-sm
      "
                style={{
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                }}
              />
            ))}

            {/* Main Card */}
            <motion.div
              whileHover={{ scale: 1.01 }}
              transition={{ type: "spring", stiffness: 120 }}
              className="
      relative bg-white/80 backdrop-blur-xl 
      rounded-3xl shadow-2xl border border-slate-200 
      p-14 transition-all 
      hover:shadow-indigo-400/30 hover:border-indigo-500
    "
            >
              {/* Metallic Header */}
              <div className="flex items-center gap-3 mb-12 relative">
                <motion.div
                  initial={{ rotate: -20, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  transition={{ duration: 0.6 }}
                >
                  <FiTarget className="text-indigo-600 text-4xl drop-shadow-sm" />
                </motion.div>

                <h2 className="text-4xl font-black text-black tracking-tight relative">
                  Preparation Resources
                  {/* Metallic Gradient Shine */}
                  <span
                    className="
          absolute inset-x-0 bottom-0 h-[3px]
          bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 
          rounded-full
        "
                  ></span>
                </h2>
              </div>

              {/* Resources List */}
              <ul className="space-y-7">
                {[
                  "📘 System Design Basics (Beginner → Advanced)",
                  "🧠 React & Spring Boot Deep Dive Notes",
                  "🎯 50 Must-Practice DSA Pattern Questions",
                  "⚙️ Full-Stack Project Architecture Guide",
                ].map((item, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: 25 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: i * 0.12 }}
                    whileHover={{ scale: 1.05, x: 8 }}
                    className="
            relative p-6 rounded-2xl
            bg-gradient-to-br from-slate-50 to-white 
            border border-slate-200 shadow-sm 
            text-black text-[15px] font-medium tracking-wide
            hover:border-indigo-300 hover:shadow-xl 
            transition-all cursor-pointer flex items-center gap-4
            overflow-hidden
          "
                  >
                    {/* Spotlight Hover Glow */}
                    <motion.div
                      className="absolute inset-0 bg-white/40 opacity-0"
                      whileHover={{ opacity: 0.4 }}
                      transition={{ duration: 0.3 }}
                    />

                    {/* Icon */}
                    <span className="text-2xl drop-shadow">
                      {item.split(" ")[0]}
                    </span>

                    {/* Text */}
                    <span>{item.replace(item.split(" ")[0], "")}</span>

                    {/* Animated Right Accent Line */}
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: "100%" }}
                      transition={{ duration: 0.6, delay: i * 0.15 }}
                      className="
              absolute right-0 top-0 w-[4px] rounded-full
              bg-gradient-to-b from-indigo-500 via-purple-500 to-pink-500
              opacity-50
            "
                    />
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </motion.div>

          {/* ================= CTA (ULTRA PREMIUM) ================= */}
          <div className="text-center mt-24 relative">
            {/* Floating Glow Behind Button */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.2 }}
              transition={{ duration: 1 }}
              className="
      absolute left-1/2 -translate-x-1/2 
      w-72 h-72 
      bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 
      blur-3xl rounded-full -z-10
    "
            />

            {/* Pulse Ring Animation */}
            <motion.div
              animate={{ scale: [1, 1.15, 1], opacity: [0.4, 0.15, 0.4] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="
      absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2
      w-40 h-40 rounded-full 
      bg-indigo-300/30 blur-xl -z-10
    "
            />

            {/* CTA Button */}
            <motion.button
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.97 }}
              className="
      relative px-12 py-4 text-lg font-semibold 
      rounded-2xl text-white 
      bg-gradient-to-r from-indigo-600 to-purple-600 
      shadow-2xl transition-all 
      hover:shadow-indigo-500/40 
      overflow-hidden
    "
            >
              {/* Shine Effect */}
              <span
                className="
        absolute inset-0 opacity-0 hover:opacity-20 
        bg-gradient-to-r from-white via-transparent to-white
        transition-all
      "
              ></span>
              🚀 Start Full Mock Interview Simulation
            </motion.button>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
