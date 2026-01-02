import { useState } from "react";
import { motion } from "framer-motion";
import {
  FiTrendingUp,
  FiMapPin,
  FiBriefcase,
  FiBarChart2,
  FiHelpCircle,
} from "react-icons/fi";
import Footer from "../../components/layout/Footer";

export default function SalaryEstimator() {
  const [form, setForm] = useState({
    role: "Full Stack Developer",
    experience: "2-4",
    location: "Bangalore",
  });
  const [result, setResult] = useState(null);

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleEstimate = () => {
    let baseMin = 5;
    let baseMax = 10;

    if (form.role.includes("Senior")) {
      baseMin += 8;
      baseMax += 12;
    } else if (form.role.includes("Full Stack")) {
      baseMin += 4;
      baseMax += 8;
    }

    if (form.experience === "0-1") {
      baseMin -= 2;
      baseMax -= 1;
    } else if (form.experience === "4-7") {
      baseMin += 5;
      baseMax += 8;
    } else if (form.experience === "7+") {
      baseMin += 10;
      baseMax += 15;
    }

    if (form.location === "Remote") {
      baseMin += 1;
      baseMax += 2;
    } else if (form.location === "US / Europe") {
      baseMin *= 3;
      baseMax *= 3.5;
    }

    setResult({
      min: Math.max(3, Math.round(baseMin)),
      max: Math.max(6, Math.round(baseMax)),
    });
  };

  return (
    <>
      <section className="min-h-screen bg-linear-to-br from-indigo-50 via-white to-purple-50 pt-32 pb-24 px-6">
        <div className="max-w-6xl mx-auto">
          {/* HERO */}
          <div className="text-center mb-24 relative overflow-hidden">
            <div className="absolute inset-0 -z-10 flex justify-center gap-10">
              <div className="w-[380px] h-[380px] bg-indigo-400/20 blur-3xl rounded-full animate-pulse" />
              <div className="w-[380px] h-[380px] bg-purple-400/20 blur-3xl rounded-full animate-pulse delay-300" />
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 mb-6 px-6 py-2
                         bg-white/80 backdrop-blur border border-indigo-200
                         rounded-full shadow text-slate-800"
            >
              💰
              <span className="font-semibold bg-linear-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Market Salary Intelligence
              </span>
              <span className="text-[10px] px-2 py-0.5 bg-indigo-100 text-indigo-700 rounded-full">
                BETA
              </span>
            </motion.div>

            <h1 className="text-5xl md:text-7xl font-black mb-6 text-slate-900">
              <span className="bg-linear-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                Salary Estimator
              </span>
              <span className="block text-2xl md:text-3xl text-slate-700 mt-3 font-semibold">
                Know your true market value
              </span>
            </h1>

            <p className="max-w-3xl mx-auto text-lg md:text-xl text-slate-600">
              Get an intelligent estimate based on role, experience, location
              and current tech market trends.
            </p>
          </div>

          {/* KPI STRIP */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-24"
          >
            {[
              ["₹14.8L", "Avg Tech Salary"],
              ["10K+", "Profiles Analyzed"],
              ["92%", "Accuracy Rate"],
              ["Monthly", "Market Updates"],
            ].map(([value, label]) => (
              <motion.div
                key={label}
                whileHover={{ scale: 1.05, y: -6 }}
                className="bg-white/80 backdrop-blur rounded-2xl border border-slate-200 shadow-xl p-6 text-center"
              >
                <p className="text-3xl font-black text-indigo-600">{value}</p>
                <p className="text-sm text-slate-600 mt-1 font-medium">
                  {label}
                </p>
              </motion.div>
            ))}
          </motion.div>

          {/* FORM + RESULT */}
          <div className="grid md:grid-cols-2 gap-12 bg-white/90 backdrop-blur border border-slate-200 rounded-3xl shadow-2xl p-10">
            {/* FORM */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <h2 className="text-2xl font-black mb-2 flex items-center gap-2 text-slate-900">
                <FiBriefcase className="text-indigo-600" />
                Your Details
              </h2>

              <p className="text-sm text-slate-500 mb-6">
                Fill in your profile to estimate your salary range
              </p>

              <div className="space-y-6">
                {[
                  ["role", "Role"],
                  ["experience", "Experience"],
                  ["location", "Location"],
                ].map(([name, label]) => (
                  <div key={name}>
                    <label className="text-sm font-semibold text-slate-700 block mb-1">
                      {label}
                    </label>
                    <select
                      name={name}
                      value={form[name]}
                      onChange={handleChange}
                      className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-700 focus:ring-2 focus:ring-indigo-500"
                    >
                      {name === "role" && (
                        <>
                          <option>Frontend Developer</option>
                          <option>Backend Developer</option>
                          <option>Full Stack Developer</option>
                          <option>Senior Full Stack Engineer</option>
                          <option>Data Engineer</option>
                        </>
                      )}
                      {name === "experience" && (
                        <>
                          <option value="0-1">0–1 years</option>
                          <option value="2-4">2–4 years</option>
                          <option value="4-7">4–7 years</option>
                          <option value="7+">7+ years</option>
                        </>
                      )}
                      {name === "location" && (
                        <>
                          <option>Bangalore</option>
                          <option>Hyderabad</option>
                          <option>Pune</option>
                          <option>Remote</option>
                          <option>US / Europe</option>
                        </>
                      )}
                    </select>
                  </div>
                ))}

                <button
                  onClick={handleEstimate}
                  className="w-full bg-linear-to-r from-indigo-600 to-purple-600 text-white py-3 rounded-xl font-semibold shadow-lg hover:scale-105 transition"
                >
                  Estimate Salary
                </button>
              </div>
            </motion.div>

            {/* RESULT */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-indigo-900 text-white rounded-3xl p-8 flex flex-col justify-center"
            >
              <h2 className="text-2xl font-black mb-4 flex items-center gap-2">
                <FiTrendingUp /> Estimated CTC
              </h2>

              {result ? (
                <>
                  <p className="text-indigo-200 text-sm mb-2">
                    {form.role} • {form.experience} yrs • {form.location}
                  </p>
                  <p className="text-4xl font-black mb-4">
                    ₹{result.min} – ₹{result.max} LPA
                  </p>
                  <p className="text-sm text-indigo-100">
                    High performers and strong interview skills can exceed this
                    range.
                  </p>
                </>
              ) : (
                <p className="text-indigo-200">
                  Enter details to see your personalized estimate.
                </p>
              )}

              <div className="mt-6 text-xs text-indigo-300 flex items-center gap-2">
                <FiMapPin />
                Salary varies by company & negotiation
              </div>
            </motion.div>
          </div>

          {/* SALARY GROWTH TIMELINE */}
          <div className="mt-32 relative">
            {/* Background glow */}
            <div className="absolute inset-0 -z-10 flex justify-center">
              <div className="w-[520px] h-[520px] bg-indigo-300/20 blur-3xl rounded-full" />
            </div>

            {/* Heading */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-3">
                Salary Growth Over Your Career
              </h2>
              <p className="max-w-2xl mx-auto text-slate-600 text-lg">
                See how compensation typically evolves as your experience and
                impact increase.
              </p>
            </motion.div>

            {/* Timeline */}
            <div className="relative max-w-4xl mx-auto">
              {/* Center line */}
              <div className="absolute left-1/2 top-0 h-full w-[3px] bg-gradient-to-b from-indigo-300 via-purple-300 to-pink-300 -translate-x-1/2 rounded-full" />

              {[
                {
                  stage: "Junior Developer",
                  years: "0–1 Years",
                  salary: "₹3–6 LPA",
                  color: "from-indigo-500 to-indigo-600",
                },
                {
                  stage: "Mid-Level Engineer",
                  years: "2–4 Years",
                  salary: "₹8–15 LPA",
                  color: "from-purple-500 to-purple-600",
                },
                {
                  stage: "Senior Engineer",
                  years: "5–7 Years",
                  salary: "₹18–30 LPA",
                  color: "from-emerald-500 to-teal-500",
                },
                {
                  stage: "Lead / Architect",
                  years: "8+ Years",
                  salary: "₹35L+ / Global",
                  color: "from-orange-500 to-amber-500",
                },
              ].map((item, i) => (
                <motion.div
                  key={item.stage}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.18 }}
                  className={`relative mb-20 flex ${
                    i % 2 === 0 ? "justify-start pr-12" : "justify-end pl-12"
                  }`}
                >
                  {/* Node */}
                  <div
                    className={`absolute left-1/2 top-6 w-5 h-5 rounded-full
                      bg-gradient-to-r ${item.color}
                      -translate-x-1/2 shadow-lg`}
                  />

                  {/* Card */}
                  <motion.div
                    whileHover={{ y: -8, scale: 1.05 }}
                    className="relative w-[300px] bg-white/80 backdrop-blur
                     border border-slate-200 rounded-2xl shadow-xl p-6"
                  >
                    <h3 className="text-lg font-bold text-slate-800">
                      {item.stage}
                    </h3>
                    <p className="text-sm text-slate-500 mt-1">{item.years}</p>

                    <div
                      className={`mt-4 inline-block px-4 py-1 rounded-full
                        bg-gradient-to-r ${item.color} bg-clip-text
                        text-transparent font-bold`}
                    >
                      {item.salary}
                    </div>

                    <p className="mt-3 text-sm text-slate-600">
                      Typical compensation range based on current tech market
                      trends.
                    </p>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* SKILL IMPACT MATRIX */}
          <div className="mt-32 relative">
            {/* Background glow */}
            <div className="absolute inset-0 -z-10 flex justify-center">
              <div className="w-[520px] h-[520px] bg-emerald-300/20 blur-3xl rounded-full" />
            </div>

            {/* Heading */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-14"
            >
              <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-3">
                Skills That Boost Your Salary
              </h2>
              <p className="max-w-2xl mx-auto text-slate-600 text-lg">
                Mastering the right skills can significantly accelerate your
                compensation growth.
              </p>
            </motion.div>

            {/* Skill Cards */}
            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  skill: "Data Structures & Algorithms",
                  boost: "+30–50%",
                  color: "from-indigo-500 to-purple-500",
                },
                {
                  skill: "System Design",
                  boost: "+40–60%",
                  color: "from-purple-500 to-pink-500",
                },
                {
                  skill: "Cloud (AWS / GCP)",
                  boost: "+25–40%",
                  color: "from-sky-500 to-indigo-500",
                },
                {
                  skill: "Microservices",
                  boost: "+20–35%",
                  color: "from-emerald-500 to-teal-500",
                },
                {
                  skill: "Leadership / Mentorship",
                  boost: "+30%+",
                  color: "from-orange-500 to-amber-500",
                },
                {
                  skill: "Domain Expertise",
                  boost: "+50%+",
                  color: "from-rose-500 to-pink-500",
                },
              ].map((item, i) => (
                <motion.div
                  key={item.skill}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.12 }}
                  whileHover={{ y: -8, scale: 1.05 }}
                  className="relative group"
                >
                  {/* Glow */}
                  <div
                    className={`absolute inset-0 rounded-2xl blur-xl opacity-0
                      group-hover:opacity-30 transition
                      bg-gradient-to-r ${item.color}`}
                  />

                  {/* Card */}
                  <div
                    className="relative bg-white/85 backdrop-blur border border-slate-200
                        rounded-2xl shadow-xl p-6"
                  >
                    <h3 className="font-semibold text-slate-800 text-lg">
                      {item.skill}
                    </h3>

                    <div
                      className={`mt-3 inline-block px-4 py-1 rounded-full
                        bg-gradient-to-r ${item.color}
                        bg-clip-text text-transparent font-bold`}
                    >
                      Salary Increase: {item.boost}
                    </div>

                    <p className="text-sm text-slate-600 mt-3">
                      Frequently demanded by top product companies and global
                      teams.
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* SALARY DRIVERS — unchanged */}
          {/* FAQ — CORRECTED (motion.div + details) */}
          <div className="mt-28 max-w-4xl mx-auto relative">
            <div className="absolute inset-0 -z-10 flex justify-center">
              <div className="w-[420px] h-[420px] bg-indigo-300/20 blur-3xl rounded-full" />
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-14"
            >
              <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-3">
                Frequently Asked Questions
              </h2>
              <p className="text-slate-600 text-lg">
                Everything you need to know before trusting the estimate
              </p>
            </motion.div>

            <div className="space-y-4">
              {[
                {
                  q: "Is this salary accurate?",
                  a: "This tool provides a market-based estimate using aggregated trends. Actual offers depend on skills, company, and interview performance.",
                },
                {
                  q: "Does company brand matter?",
                  a: "Yes. Product companies and funded startups typically offer higher compensation than service-based firms.",
                },
                {
                  q: "Can I earn more than this range?",
                  a: "Absolutely. Strong system design skills, DSA, negotiation, and niche expertise can push offers well above the average.",
                },
              ].map((item, i) => (
                <motion.div
                  key={item.q}
                  initial={{ opacity: 0, y: 25 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.12 * i }}
                >
                  <details className="group bg-white/80 backdrop-blur border border-slate-200 rounded-2xl shadow-lg p-6">
                    <summary className="flex items-center justify-between cursor-pointer list-none">
                      <div className="flex items-center gap-3">
                        <FiHelpCircle className="text-indigo-600 text-lg" />
                        <h3 className="font-semibold text-slate-800 text-base">
                          {item.q}
                        </h3>
                      </div>
                      <span className="text-indigo-500 group-open:rotate-180 transition">
                        ▾
                      </span>
                    </summary>
                    <p className="mt-4 pl-7 text-slate-600 text-sm leading-relaxed">
                      {item.a}
                    </p>
                  </details>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* FINAL CTA */}
        <div className="mt-32 mb-24 relative">
          {/* Animated background glow */}
          <div className="absolute inset-0 -z-10 flex justify-center items-center">
            <div className="w-[520px] h-[520px] bg-indigo-500/30 blur-3xl rounded-full animate-pulse" />
            <div className="w-[520px] h-[520px] bg-purple-500/30 blur-3xl rounded-full animate-pulse delay-300" />
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="relative max-w-5xl mx-auto rounded-3xl p-12
               bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600
               shadow-2xl overflow-hidden"
          >
            {/* Subtle overlay pattern */}
            <div className="absolute inset-0 bg-white/5 backdrop-blur pointer-events-none" />

            {/* Content */}
            <div className="relative text-center">
              <motion.h2
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-3xl md:text-4xl font-black mb-4 text-white"
              >
                Want to Increase Your Salary Faster?
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="max-w-2xl mx-auto text-indigo-100 text-lg mb-8"
              >
                Get a personalized career roadmap based on your skills,
                experience, and target companies — designed for modern tech
                professionals.
              </motion.p>

              <motion.button
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
                className="relative inline-flex items-center gap-2
                   bg-white text-indigo-700 px-10 py-4 rounded-xl
                   font-bold shadow-xl overflow-hidden"
              >
                <span className="relative z-10">Get Career Roadmap</span>

                {/* Shimmer effect */}
                <span
                  className="absolute inset-0 -translate-x-full bg-gradient-to-r
                         from-transparent via-indigo-200/50 to-transparent
                         animate-[shimmer_2.5s_infinite]"
                />
              </motion.button>

              {/* Trust line */}
              <p className="mt-6 text-xs text-indigo-200">
                🚀 Used by developers preparing for top product & global
                companies
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </>
  );
}
