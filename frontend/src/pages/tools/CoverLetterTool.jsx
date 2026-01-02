// src/pages/tools/CoverLetterTool.jsx
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  FiEdit3,
  FiUser,
  FiBriefcase,
  FiSend,
  FiHome, // <-- FIXED (Replaced FiBuilding)
  FiFileText,
} from "react-icons/fi";
import Footer from "../../components/layout/Footer";

export default function CoverLetterTool() {
  const [form, setForm] = useState({
    name: "",
    role: "",
    company: "",
    jobTitle: "",
    tone: "Professional",
  });

  const [typedLetter, setTypedLetter] = useState("");

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const generateLetter = () => {
    if (!form.name || !form.company || !form.jobTitle) return "";

    const toneLines = {
      Professional:
        "With a strong foundation in problem-solving and scalable software engineering practices, I bring professionalism, discipline, and a results-oriented mindset.",
      Friendly:
        "I'm truly excited about this opportunity and feel my personality and passion for teamwork would mesh perfectly with your company culture.",
      Confident:
        "I am confident that my background and skill set align seamlessly with the demands of this role, and I am prepared to deliver exceptional results.",
      Leadership:
        "I excel at taking ownership, mentoring teammates, and driving impactful decisions that move a product or team forward.",
      Casual:
        "I love building cool things, solving interesting problems, and collaborating with smart people—this role feels like a great match!",
    };

    return `
Dear Hiring Manager,

I am writing to express my strong interest in the ${form.jobTitle} role at ${
      form.company
    }. 
With hands-on experience in ${
      form.role || "software development"
    } and a proven track record 
of delivering impactful results, I believe I can contribute effectively to your team.

${toneLines[form.tone]}

Over the years, I have built and delivered real-world applications with an emphasis on clean 
architecture, performance optimization, and exceptional user experience. The work and culture 
at ${
      form.company
    } strongly resonate with me, and I am genuinely excited about the possibility 
of being part of your innovative environment.

I would welcome the opportunity to discuss how my skills align with your requirements.

Thank you for your time and consideration.

Best regards,
${form.name}
`.trim();
  };

  const letter = generateLetter();

  /* Typing animation */
  useEffect(() => {
    if (!letter) {
      setTypedLetter("");
      return;
    }

    let index = 0;
    setTypedLetter("");

    const interval = setInterval(() => {
      setTypedLetter((prev) => prev + letter[index]);
      index++;
      if (index >= letter.length) clearInterval(interval);
    }, 8);

    return () => clearInterval(interval);
  }, [letter]);

  return (
    <>
      {/* ================= ULTRA PREMIUM BACKGROUND V2 ================= */}
      <div
        className="fixed inset-0 -z-10 overflow-hidden"
        onMouseMove={(e) => {
          const x = (e.clientX / window.innerWidth - 0.5) * 15;
          const y = (e.clientY / window.innerHeight - 0.5) * 15;
          document.documentElement.style.setProperty("--px", `${x}px`);
          document.documentElement.style.setProperty("--py", `${y}px`);
        }}
      >
        {/* Animated Gradient Base */}
        <motion.div
          animate={{
            background: [
              "linear-gradient(135deg, #c7d2fe, #fefefe, #e9d5ff)",
              "linear-gradient(135deg, #d8b4fe, #ffffff, #c7d2fe)",
              "linear-gradient(135deg, #c7d2fe, #fefefe, #e9d5ff)",
            ],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-0"
        />

        {/* Noise Layer */}
        <div className="absolute inset-0 opacity-[0.18] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay" />

        {/* Subtle dark vignette */}
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-black/10 via-transparent to-black/20" />

        {/* Aurora Light Waves */}
        <motion.div
          animate={{
            opacity: [0.15, 0.35, 0.15],
            x: ["-10%", "8%", "-10%"],
            y: ["0%", "6%", "0%"],
          }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-0 left-[-20%] w-[160%] h-[160%] bg-gradient-to-r 
      from-indigo-400/25 via-purple-400/25 to-pink-400/25 blur-[120px]"
          style={{
            transform: "translate(var(--px), var(--py))",
          }}
        />

        {/* PARALLAX ORB LAYER 1 (Closest Layer) */}
        <motion.div
          animate={{ y: [0, -20, 0], scale: [1, 1.1, 1] }}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute top-24 right-32 w-48 h-48 rounded-full bg-indigo-400/25 blur-[80px] mix-blend-screen"
          style={{
            transform:
              "translate(calc(var(--px) * 0.5), calc(var(--py) * 0.5))",
          }}
        />

        {/* PARALLAX ORB LAYER 2 */}
        <motion.div
          animate={{ y: [0, 30, 0], scale: [1, 1.15, 1], rotate: [0, 20, 0] }}
          transition={{ duration: 14, repeat: Infinity }}
          className="absolute bottom-28 left-24 w-64 h-64 rounded-full bg-purple-400/20 blur-[100px] mix-blend-lighten"
          style={{
            transform:
              "translate(calc(var(--px) * 0.3), calc(var(--py) * 0.3))",
          }}
        />

        {/* GOLDEN ATMOSPHERIC GLOW */}
        <motion.div
          animate={{ opacity: [0.1, 0.2, 0.1], scale: [1, 1.1, 1] }}
          transition={{ duration: 12, repeat: Infinity }}
          className="absolute top-1/3 left-1/2 w-40 h-40 rounded-full bg-yellow-300/25 blur-2xl mix-blend-screen"
          style={{
            transform:
              "translate(calc(var(--px) * 0.2), calc(var(--py) * 0.2))",
          }}
        />

        {/* STARFIELD PARTICLES */}
        {[...Array(40)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              opacity: [0.1, 0.8, 0.1],
              scale: [0.7, 1.3, 0.7],
              y: [0, -20, 0],
            }}
            transition={{
              duration: 6 + Math.random() * 5,
              repeat: Infinity,
              delay: Math.random() * 3,
            }}
            className="absolute w-1.5 h-1.5 rounded-full bg-white/90 shadow-[0_0_10px_rgba(255,255,255,0.9)]"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
          />
        ))}

        {/* HORIZON LIGHT BEAM (Luxurious Touch) */}
        <motion.div
          animate={{ opacity: [0.05, 0.12, 0.05] }}
          transition={{ duration: 6, repeat: Infinity }}
          className="absolute top-1/2 left-0 w-full h-32 bg-gradient-to-r 
      from-transparent via-white/20 to-transparent blur-3xl"
        />

        {/* CYBER AURORA GRID LINES */}
        <motion.div
          animate={{
            x: ["0%", "3%", "0%"],
            opacity: [0.05, 0.12, 0.05],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-0 left-0 w-full h-1/2 
      bg-[linear-gradient(to_right,transparent_0%,rgba(255,255,255,0.2)_50%,transparent_100%)] 
      bg-[length:200%_2px] bg-no-repeat"
        />
      </div>

      {/* ================= MAIN SECTION ================= */}
      <section className="min-h-screen pt-36 pb-32 px-6 relative overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-start"
        >
          {/* ======================= FORM CARD ======================= */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            whileHover={{ scale: 1.01 }}
            className="relative backdrop-blur-2xl bg-white/50 border border-white/40 shadow-[0_0_40px_rgba(0,0,0,0.08)] rounded-3xl p-12 
                 hover:shadow-[0_0_55px_rgba(99,102,241,0.2)] transition-all duration-300"
            style={{ transform: "translateZ(0)" }}
          >
            {/* Glowing Accent Behind Heading */}
            <div className="absolute -top-10 left-10 w-40 h-40 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 blur-3xl rounded-full" />

            {/* TITLE CHANGED TO PLAIN BLACK TEXT */}
            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-5xl font-black text-black mb-4 relative z-10"
            >
              Cover Letter Generator
            </motion.h1>

            <p className="text-slate-700 mb-12 text-lg leading-relaxed">
              Create a tailored, professional, beautifully formatted cover
              letter in seconds.
            </p>

            {/* Animated border wrapper */}
            <div className="space-y-8 relative">
              <Field
                label="Your Full Name"
                icon={<FiUser className="text-black" />}
              >
                <input
                  name="name"
                  onChange={handleChange}
                  className="input-premium text-black"
                  placeholder="e.g. Ashish Sharma"
                />
              </Field>

              <Field
                label="Your Role / Profile"
                icon={<FiBriefcase className="text-black" />}
              >
                <input
                  name="role"
                  onChange={handleChange}
                  className="input-premium text-black"
                  placeholder="e.g. Full Stack Developer"
                />
              </Field>

              <Field
                label="Company Name"
                icon={<FiHome className="text-black" />}
              >
                <input
                  name="company"
                  onChange={handleChange}
                  className="input-premium text-black"
                  placeholder="e.g. Amazon, Google, Zoho"
                />
              </Field>

              <Field
                label="Job Title"
                icon={<FiFileText className="text-black" />}
              >
                <input
                  name="jobTitle"
                  onChange={handleChange}
                  className="input-premium text-black"
                  placeholder="e.g. Software Engineer"
                />
              </Field>
            </div>
          </motion.div>

          {/* ======================= PREVIEW CARD ======================= */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            whileHover={{
              scale: 1.01,
              transition: { duration: 0.2 },
            }}
            className="relative backdrop-blur-2xl bg-white/60 border border-white/40 shadow-2xl rounded-3xl p-12 
                 hover:shadow-[0_0_65px_rgba(147,51,234,0.25)] transition-all duration-300"
          >
            {/* Floating glow behind heading */}
            <div className="absolute -top-10 right-12 w-40 h-40 bg-purple-400/20 blur-3xl rounded-full" />

            <div className="flex items-center gap-3 mb-8 relative z-10">
              <div className="w-14 h-14 rounded-2xl bg-indigo-100 flex items-center justify-center text-indigo-700 shadow-inner">
                <FiEdit3 size={22} className="text-black" />
              </div>

              {/* TITLE CHANGED TO BLACK */}
              <h2 className="text-3xl font-extrabold text-black">
                Live Preview
              </h2>
            </div>

            {/* Animated Preview Box */}
            <motion.div
              className="relative border border-white/40 rounded-2xl p-6 min-h-[320px] 
                   bg-white/70 shadow-inner text-sm text-black whitespace-pre-line leading-relaxed 
                   backdrop-blur-md"
            >
              {/* AI-like pulsing highlight */}
              <motion.div
                animate={{ opacity: [0.12, 0.22, 0.12] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute inset-0 bg-gradient-to-b from-indigo-200/10 via-transparent to-purple-200/10 rounded-2xl pointer-events-none"
              />

              {typedLetter || (
                <span className="text-slate-500 italic">
                  Start filling the form to generate a live dynamic cover
                  letter...
                </span>
              )}
            </motion.div>

            {/* Pulse bar at bottom */}
            <motion.div
              animate={{
                width: ["20%", "80%", "40%", "100%", "60%"],
                opacity: [0.2, 0.6, 0.3, 0.7, 0.3],
              }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="h-1 mt-6 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full"
            />
          </motion.div>
        </motion.div>
      </section>

      {/* ================= TONE SELECTOR – ULTRA PREMIUM V2 ================= */}
      <section className="pt-16 pb-24 px-6 relative overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-6xl mx-auto relative"
        >
          {/* Floating background glow */}
          <div className="absolute -top-10 left-0 w-52 h-52 bg-gradient-to-br from-indigo-400/20 to-purple-400/20 blur-3xl rounded-full pointer-events-none"></div>

          <h2 className="text-4xl font-extrabold mb-10 bg-gradient-to-r from-indigo-700 to-purple-700 bg-clip-text text-transparent text-center">
            Choose Your Writing Tone
          </h2>

          {/* Animated Tone Chips */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { staggerChildren: 0.12 } },
            }}
            className="flex flex-wrap justify-center gap-6"
          >
            {[
              { label: "Professional" },
              { label: "Friendly" },
              { label: "Confident" },
              { label: "Leadership" },
              { label: "Casual" },
            ].map((tone) => (
              <motion.button
                key={tone.label}
                variants={{
                  hidden: { opacity: 0, scale: 0.8, y: 10 },
                  visible: { opacity: 1, scale: 1, y: 0 },
                }}
                whileHover={{
                  scale: 1.12,
                  boxShadow: "0 0 25px rgba(124, 58, 237, 0.25)",
                }}
                whileTap={{ scale: 0.92 }}
                onClick={() => setForm((f) => ({ ...f, tone: tone.label }))}
                className={`relative px-7 py-3 rounded-2xl 
            backdrop-blur-xl border shadow-md transition-all 
            font-semibold tracking-wide flex items-center gap-3
            ${
              form.tone === tone.label
                ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white border-transparent shadow-[0_0_28px_rgba(99,102,241,0.45)]"
                : "bg-white/40 border-white/40 text-slate-700 hover:bg-white/60"
            }
          `}
              >
                {/* Glowing inner ring around active tone */}
                {form.tone === tone.label && (
                  <motion.div
                    layoutId="tone-glow"
                    className="absolute inset-0 rounded-2xl border-[3px] border-white/40"
                    initial={false}
                    animate={{ opacity: 1 }}
                    transition={{ type: "spring", stiffness: 230, damping: 22 }}
                  />
                )}

                {/* Ripple effect on active tone */}
                {form.tone === tone.label && (
                  <motion.div
                    className="absolute inset-0 rounded-2xl bg-gradient-to-br from-indigo-300/20 to-purple-300/20"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 0.35, scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                  />
                )}

                <span className="relative z-10">{tone.label}</span>
              </motion.button>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* ================= SUGGESTED IMPROVEMENTS – ULTRA PREMIUM V3 ================= */}
      <section className="pt-20 pb-32 px-6 relative overflow-hidden">
        <div className="max-w-6xl mx-auto relative">
          {/* Background Glow */}
          <div className="absolute -top-20 right-0 w-72 h-72 bg-gradient-to-br from-purple-400/20 to-pink-400/20 blur-3xl rounded-full" />

          {/* Heading */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl font-extrabold mb-10 bg-gradient-to-r from-purple-700 to-pink-600 bg-clip-text text-transparent"
          >
            AI Suggested Improvements
          </motion.h2>

          {/* Suggestion Cards */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.12 } },
            }}
            className="grid md:grid-cols-3 gap-10"
          >
            {[
              {
                title: "Show Measurable Achievements",
                desc: "Add metrics (e.g., “Improved API performance by 40%”) to make your experience more compelling.",
                icon: "📊",
              },
              {
                title: "Highlight Your Tech Stack",
                desc: "Mention relevant tools and technologies that match the job requirements.",
                icon: "🛠️",
              },
              {
                title: "Show Excitement for the Company",
                desc: "Express what attracts you to the company's mission, team, or product vision.",
                icon: "💡",
              },
              {
                title: "Add a Leadership Touch",
                desc: "Include examples where you guided a team or influenced technical direction.",
                icon: "🧭",
              },
              {
                title: "Focus on Problem-Solving",
                desc: "Describe a real challenge you solved and how your approach added value.",
                icon: "🧩",
              },
              {
                title: "Customize Tone to the Role",
                desc: "Adapt your writing style (formal, confident, friendly) based on company culture.",
                icon: "🎨",
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 },
                }}
                whileHover={{
                  scale: 1.05,
                  y: -6,
                  boxShadow: "0 20px 60px rgba(147, 51, 234, 0.25)",
                }}
                className="group relative p-7 rounded-2xl bg-white/60 border border-white/40 
                     backdrop-blur-xl shadow-xl overflow-hidden transition-all"
              >
                {/* Glow Behind Icon */}
                <div className="absolute -top-8 -right-8 w-24 h-24 rounded-full bg-gradient-to-br from-purple-300/30 to-pink-300/30 blur-2xl opacity-0 group-hover:opacity-100 transition" />

                {/* Icon */}
                <div className="text-4xl mb-4">{item.icon}</div>

                {/* Title */}
                <h3 className="text-lg font-bold text-purple-700 mb-2 group-hover:text-purple-800 transition">
                  {item.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-slate-700 leading-relaxed">
                  {item.desc}
                </p>

                {/* Animated bottom gradient line */}
                <motion.div
                  initial={{ width: 0 }}
                  whileHover={{ width: "100%" }}
                  transition={{ duration: 0.4 }}
                  className="mt-4 h-[3px] rounded-full bg-gradient-to-r from-purple-500 to-pink-500"
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ================= TEMPLATE GALLERY – ULTRA PREMIUM V3 ================= */}
      <section className="pt-20 pb-32 px-6 relative overflow-hidden">
        <div className="max-w-7xl mx-auto relative">
          {/* Subtle background glow */}
          <div className="absolute -top-16 left-0 w-64 h-64 rounded-full bg-gradient-to-br from-indigo-400/20 to-purple-400/20 blur-3xl pointer-events-none" />

          <h2 className="text-4xl font-extrabold mb-12 bg-gradient-to-r from-indigo-700 to-purple-700 bg-clip-text text-transparent">
            Choose a Cover Letter Template
          </h2>

          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.12 } },
            }}
            className="grid md:grid-cols-3 gap-12"
          >
            {[
              {
                title: "Classic Professional",
                color: "from-indigo-400 to-blue-400",
                tag: "Best for Corporate Roles",
              },
              {
                title: "Modern Minimal",
                color: "from-purple-400 to-pink-400",
                tag: "Clean & Stylish",
              },
              {
                title: "Creative Friendly",
                color: "from-orange-400 to-rose-400",
                tag: "Warm, Human, Approachable",
              },
            ].map((tpl, i) => (
              <motion.div
                key={tpl.title}
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  visible: { opacity: 1, y: 0 },
                }}
                whileHover={{
                  scale: 1.06,
                  rotate: 0.5,
                  boxShadow: "0 25px 50px rgba(99,102,241,0.25)",
                }}
                transition={{ type: "spring", stiffness: 200, damping: 18 }}
                onClick={() =>
                  alert(
                    `Template "${tpl.title}" selected (preview coming soon!)`
                  )
                }
                className="relative rounded-3xl p-6 cursor-pointer
                     backdrop-blur-xl bg-white/60 border border-white/40 
                     shadow-xl overflow-hidden group transition-all"
              >
                {/* ✨ Animated highlight ring on hover */}
                <motion.div
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  className="absolute inset-0 rounded-3xl border-[3px] border-indigo-500/40 pointer-events-none"
                  transition={{ duration: 0.3 }}
                />

                {/* ✨ Shimmer Gradient Sweep */}
                <motion.div
                  initial={{ x: "-120%" }}
                  whileHover={{ x: "120%" }}
                  transition={{
                    duration: 1.4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12"
                />

                {/* Template Thumbnail */}
                <div
                  className={`w-full h-40 rounded-xl bg-gradient-to-br ${tpl.color}
                        shadow-lg mb-5 relative overflow-hidden`}
                >
                  {/* Floating light inside thumbnail */}
                  <motion.div
                    animate={{
                      opacity: [0.1, 0.25, 0.1],
                      scale: [1, 1.15, 1],
                      x: [0, 10, 0],
                    }}
                    transition={{ duration: 5, repeat: Infinity }}
                    className="absolute inset-0 bg-white/20 blur-xl"
                  />
                </div>

                {/* Title */}
                <h3 className="font-bold text-xl text-slate-800 group-hover:text-indigo-700 transition">
                  {tpl.title}
                </h3>

                {/* Tagline */}
                <p className="text-xs text-slate-500 mt-1">{tpl.tag}</p>

                {/* CTA */}
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  whileHover={{ opacity: 1, y: 0 }}
                  className="mt-4 text-sm font-semibold text-indigo-600"
                >
                  Preview Template →
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ================= EXPORT OPTIONS – ULTRA PREMIUM V4 ================= */}
      <section className="pt-20 pb-36 px-6 relative overflow-hidden">
        <div className="max-w-5xl mx-auto text-center relative">
          {/* Background Glow */}
          <div className="absolute -top-10 left-1/4 w-64 h-64 bg-gradient-to-br from-purple-400/25 to-indigo-400/25 blur-3xl rounded-full"></div>

          {/* Heading */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl font-extrabold mb-4 bg-gradient-to-r from-purple-700 to-indigo-700 bg-clip-text text-transparent"
          >
            Export & Share
          </motion.h2>

          {/* Animated Pulse Bar */}
          <motion.div
            initial={{ width: "20%", opacity: 0.4 }}
            animate={{
              width: ["20%", "70%", "40%", "100%", "60%"],
              opacity: [0.4, 1, 0.6, 1, 0.5],
            }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="mx-auto h-1 bg-gradient-to-r from-purple-500 via-indigo-500 to-purple-600 rounded-full mb-12"
          />

          {/* Buttons */}
          <div className="flex justify-center gap-10 mt-10 flex-wrap">
            {[
              {
                label: "Copy Letter",
                icon: <FiFileText />,
                tooltip: "Copy to clipboard",
              },
              {
                label: "Download PDF",
                icon: <FiSend />,
                tooltip: "Export as PDF",
              },
              {
                label: "Share Link",
                icon: <FiEdit3 />,
                tooltip: "Generate a shareable link",
              },
            ].map((btn, i) => (
              <motion.div key={i} className="relative group">
                {/* Hover Glow Ring */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileHover={{ opacity: 0.4, scale: 1 }}
                  transition={{ duration: 0.3 }}
                  className="absolute inset-0 rounded-2xl bg-gradient-to-br from-purple-500/40 to-indigo-500/40 blur-xl"
                />

                {/* Main Button */}
                <motion.button
                  whileHover={{
                    scale: 1.13,
                    boxShadow: "0 15px 45px rgba(99,102,241,0.35)",
                  }}
                  whileTap={{ scale: 0.92 }}
                  className="relative z-10 flex items-center gap-3 bg-white/60 backdrop-blur-xl
                       border border-white/40 px-7 py-3 rounded-xl shadow-xl font-semibold
                       text-indigo-700 hover:text-purple-700 transition tracking-wide"
                >
                  {/* Icon Animation */}
                  <motion.span
                    whileHover={{ rotate: 6, scale: 1.2 }}
                    transition={{ type: "spring", stiffness: 200 }}
                    className="text-lg"
                  >
                    {btn.icon}
                  </motion.span>

                  {btn.label}

                  {/* Shimmer Overlay */}
                  <motion.div
                    initial={{ x: "-120%" }}
                    whileHover={{ x: "120%" }}
                    transition={{ duration: 1.4, repeat: Infinity }}
                    className="absolute inset-0 rounded-xl bg-gradient-to-r from-transparent via-white/25 to-transparent opacity-60"
                  />
                </motion.button>

                {/* Tooltip */}
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  whileHover={{ opacity: 1, y: -4 }}
                  transition={{ duration: 0.3 }}
                  className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-xs px-3 py-1 
                       rounded-md bg-black/80 text-white shadow-lg whitespace-nowrap"
                >
                  {btn.tooltip}
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}

/* FIELD COMPONENT */
function Field({ label, icon, children }) {
  return (
    <div>
      <label className="block text-sm font-semibold text-slate-700 mb-1 flex items-center gap-2">
        {icon} {label}
      </label>
      {children}
    </div>
  );
}

/* Tailwind custom class */
const inputStyle = `
input-premium {
  @apply w-full px-4 py-3 rounded-xl border border-slate-300 bg-white/50 backdrop-blur-sm 
         outline-none shadow-sm transition text-slate-700;
}
input-premium:focus {
  @apply border-indigo-500 ring-4 ring-indigo-300/40;
}
`;
