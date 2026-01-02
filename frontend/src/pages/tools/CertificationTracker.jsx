// src/pages/tools/CertificationTracker.jsx
import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiAward,
  FiPlusCircle,
  FiTrash2,
  FiDownload,
  FiClock,
  FiStar,
} from "react-icons/fi";
import Footer from "../../components/layout/Footer";

/* ========================================================= */
/* Helper Component: Animated Number Counter */
function AnimatedNumber({ value = 0, duration = 900, className = "" }) {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = Number(value) || 0;
    const stepTime = Math.max(12, Math.floor(duration / Math.max(1, end)));

    const timer = setInterval(() => {
      start += 1;
      if (start >= end) {
        setDisplay(end);
        clearInterval(timer);
      } else {
        setDisplay(start);
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [value, duration]);

  return <div className={className}>{display}</div>;
}

/* ========================================================= */
/* Helper Component: Circular Progress Ring */
function ProgressRing({ size = 80, stroke = 6, percentage = 60 }) {
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <defs>
        <linearGradient id="grad" x1="0" x2="1">
          <stop offset="0%" stopColor="#6366F1" />
          <stop offset="100%" stopColor="#7C3AED" />
        </linearGradient>
      </defs>

      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        stroke="#eef2ff"
        strokeWidth={stroke}
        fill="none"
      />

      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        stroke="url(#grad)"
        strokeWidth={stroke}
        strokeLinecap="round"
        fill="none"
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        transform={`rotate(-90 ${size / 2} ${size / 2})`}
      />

      <text
        x="50%"
        y="50%"
        dominantBaseline="middle"
        textAnchor="middle"
        fontSize={14}
        fontWeight={700}
        fill="#374151"
      >
        {percentage}%
      </text>
    </svg>
  );
}

/* ========================================================= */
/* Helper Component: Sparkline Trend */
function Sparkline({ data = [] }) {
  const years = [...new Set(data)].sort();
  const max = Math.max(
    ...years.map((y) => data.filter((d) => d === y).length),
    1
  );

  const points = years.map((y, i) => {
    const x = (i / Math.max(1, years.length - 1)) * 100;
    const yVal = 100 - (data.filter((d) => d === y).length / max) * 60; // invert SVG Y
    return `${x},${yVal}`;
  });

  if (points.length === 0) {
    return <div className="text-xs text-slate-400">No trend yet</div>;
  }

  return (
    <svg
      className="w-full h-10"
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
    >
      <polyline
        points={points.join(" ")}
        fill="none"
        stroke="#A78BFA"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/* ========================================================= */

export default function CertificationTracker() {
  const [form, setForm] = useState({ name: "", provider: "", year: "" });
  const [list, setList] = useState([]);

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const addCert = () => {
    if (!form.name || !form.provider) return;
    setList((prev) => [...prev, { ...form, id: Date.now() }]);
    setForm({ name: "", provider: "", year: "" });
  };

  const removeCert = (id) => {
    setList((prev) => prev.filter((c) => c.id !== id));
  };

  /* =============== COMPUTED STATS =============== */
  const total = list.length;

  const lastYear = useMemo(() => {
    if (list.length === 0) return "-";
    return Math.max(...list.map((c) => Number(c.year) || 0));
  }, [list]);

  const topProvider = useMemo(() => {
    if (list.length === 0) return "-";
    const freq = {};
    list.forEach((c) => {
      freq[c.provider] = (freq[c.provider] || 0) + 1;
    });
    return Object.entries(freq).sort((a, b) => b[1] - a[1])[0][0];
  }, [list]);

  const topProviderPercentage = Math.min(
    100,
    Math.round(
      (list.filter((c) => c.provider === topProvider).length /
        Math.max(list.length, 1)) *
        100
    )
  );

  /* ========================================================= */

  return (
    <>
      {/* Background */}
      <div className="fixed inset-0 -z-10 bg-gradient-to-br from-indigo-100 via-white to-purple-100">
        <div className="absolute inset-0 opacity-[0.15] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
      </div>

      {/* ========================================================= */}
      {/* ULTRA PREMIUM DYNAMIC STATS SECTION */}
      {list.length > 0 && (
        <section className="pt-40 pb-10 px-6">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-6 flex items-center justify-between"
            >
              <h3 className="text-2xl font-extrabold bg-gradient-to-r from-indigo-700 to-purple-600 bg-clip-text text-transparent">
                Certification Overview
              </h3>
              <p className="text-sm text-slate-600">
                Real-time summary with premium micro-interactions.
              </p>
            </motion.div>

            <motion.div
              initial="hidden"
              animate="visible"
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.12 } },
              }}
              className="grid sm:grid-cols-3 gap-6"
            >
              {/* ---------------- TOTAL CERTIFICATIONS ---------------- */}
              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 18 },
                  visible: { opacity: 1, y: 0 },
                }}
                whileHover={{ scale: 1.02, y: -4 }}
                className="relative overflow-hidden rounded-3xl p-6 bg-gradient-to-tl from-white/80 to-white/60 border border-white/30 shadow-xl"
              >
                <div className="absolute -right-12 -top-10 w-44 h-44 bg-gradient-to-br from-indigo-200/30 to-purple-200/20 blur-3xl rounded-full"></div>

                <div className="flex items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-indigo-50 text-indigo-700 shadow-md">
                        <FiAward size={20} />
                      </div>
                      <div>
                        <p className="text-sm text-slate-500">
                          Total Certifications
                        </p>
                        <div className="flex items-baseline gap-3">
                          <AnimatedNumber
                            value={total}
                            className="text-3xl font-extrabold text-slate-900"
                          />
                          <span className="text-xs text-slate-400">certs</span>
                        </div>
                      </div>
                    </div>

                    <div className="mt-4">
                      <Sparkline
                        data={list.map(
                          (c) => Number(c.year) || new Date().getFullYear()
                        )}
                      />
                    </div>
                  </div>

                  <div className="hidden sm:block opacity-60">
                    <svg width="64" height="64" viewBox="0 0 24 24">
                      <circle cx="6" cy="6" r="1.6" fill="#A78BFA" />
                      <circle cx="18" cy="6" r="1.2" fill="#60A5FA" />
                      <circle cx="12" cy="18" r="1.4" fill="#C084FC" />
                    </svg>
                  </div>
                </div>
              </motion.div>

              {/* ---------------- LATEST YEAR ---------------- */}
              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 18 },
                  visible: { opacity: 1, y: 0 },
                }}
                whileHover={{ scale: 1.02, y: -4 }}
                className="relative rounded-3xl p-6 bg-gradient-to-tr from-white/85 to-white/60 border border-white/30 shadow-xl"
              >
                <div className="absolute -left-10 -bottom-8 w-40 h-40 bg-gradient-to-br from-purple-200/20 to-indigo-200/20 blur-2xl rounded-full"></div>

                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-purple-50 text-purple-700 shadow-md">
                        <FiClock size={20} />
                      </div>
                      <div>
                        <p className="text-sm text-slate-500">
                          Latest Certification Year
                        </p>
                        <p className="text-3xl font-extrabold text-slate-900">
                          {lastYear || "-"}
                        </p>
                      </div>
                    </div>

                    <div className="mt-4">
                      <div className="text-xs text-slate-500">
                        Most recent completion year among your certs.
                      </div>
                      <div className="mt-3 w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{
                            width: `${Math.min(
                              100,
                              (((Number(lastYear) || 0) - 2015) / 10) * 100
                            )}%`,
                          }}
                          transition={{ duration: 1.1, ease: "circOut" }}
                          className="h-full bg-gradient-to-r from-indigo-500 to-purple-600"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* ---------------- TOP PROVIDER ---------------- */}
              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 18 },
                  visible: { opacity: 1, y: 0 },
                }}
                whileHover={{ scale: 1.02, y: -4 }}
                className="relative rounded-3xl p-6 bg-gradient-to-br from-white/80 to-white/60 border border-white/30 shadow-xl flex items-center gap-4"
              >
                <div className="w-28 h-28 p-2 flex items-center justify-center rounded-full bg-gradient-to-br from-indigo-50 to-purple-50 shadow-inner">
                  <ProgressRing
                    size={92}
                    stroke={8}
                    percentage={topProviderPercentage}
                  />
                </div>

                <div className="flex-1">
                  <p className="text-sm text-slate-500">Top Provider</p>
                  <p className="text-2xl font-extrabold text-slate-900">
                    {topProvider}
                  </p>

                  <p className="text-xs text-slate-400 mt-2">
                    {list.filter((c) => c.provider === topProvider).length}{" "}
                    certifications •{" "}
                    <span className="font-semibold text-slate-700">
                      {topProviderPercentage}%
                    </span>{" "}
                    of your collection
                  </p>

                  <div className="mt-4 flex gap-3">
                    <motion.button
                      whileHover={{ scale: 1.04 }}
                      className="px-3 py-2 rounded-lg bg-white/70 border border-white/30 shadow-sm text-sm font-medium"
                    >
                      View Provider
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.04 }}
                      className="px-3 py-2 rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-sm font-semibold shadow-md"
                    >
                      Add Similar
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>
      )}

      {/* ========================================================= */}
      {/* MAIN FORM + LIST SECTION */}
      <section className="pt-10 pb-28 px-6">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-14 items-start">
          {/* ----- LEFT FORM CARD ----- */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            className="backdrop-blur-xl bg-white/40 border border-white/50 shadow-[0_15px_40px_rgba(0,0,0,0.08)] rounded-3xl p-10"
          >
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-5xl font-black bg-gradient-to-r from-indigo-700 to-purple-700 bg-clip-text text-transparent mb-4"
            >
              Certification Tracker
            </motion.h1>

            <p className="text-slate-700/80 mb-10 text-lg leading-relaxed">
              Track, organize, and showcase all your technical certifications
              with a premium, interactive interface.
            </p>

            <div className="space-y-6">
              <Field label="Certification Name">
                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white/60 backdrop-blur-sm outline-none focus:ring-4 focus:ring-indigo-300/50 transition shadow-sm"
                  placeholder="e.g. AWS Certified Developer – Associate"
                />
              </Field>

              <Field label="Provider / Platform">
                <input
                  name="provider"
                  value={form.provider}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white/60 backdrop-blur-sm outline-none focus:ring-4 focus:ring-purple-300/50 transition shadow-sm"
                  placeholder="e.g. Amazon, Microsoft, Coursera"
                />
              </Field>

              <Field label="Year (optional)">
                <input
                  name="year"
                  value={form.year}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white/60 backdrop-blur-sm outline-none focus:ring-4 focus:ring-indigo-300/50 transition shadow-sm"
                  placeholder="e.g. 2024"
                />
              </Field>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                onClick={addCert}
                className="mt-3 flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold shadow-[0_10px_25px_rgba(99,102,241,0.3)] hover:shadow-[0_15px_35px_rgba(99,102,241,0.45)] transition-all"
              >
                <FiPlusCircle size={18} /> Add Certification
              </motion.button>
            </div>
          </motion.div>

          {/* ----- RIGHT LIST CARD ----- */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            className="backdrop-blur-xl bg-white/50 border border-white/40 shadow-[0_20px_60px_rgba(0,0,0,0.1)] rounded-3xl p-10"
          >
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 rounded-2xl bg-indigo-100 flex items-center justify-center text-indigo-700 shadow-inner">
                <FiAward size={22} />
              </div>
              <h2 className="text-2xl font-bold text-slate-800">
                Your Certifications
              </h2>
            </div>

            {list.length === 0 ? (
              <p className="text-slate-600 text-sm">
                No certifications added yet. Start by adding your top ones.
              </p>
            ) : (
              <ul className="space-y-5">
                <AnimatePresence>
                  {list.map((c) => (
                    <motion.li
                      key={c.id}
                      initial={{ opacity: 0, scale: 0.9, y: 20 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.9, y: -10 }}
                      className="relative group bg-white/70 backdrop-blur-md border border-slate-200 rounded-2xl px-5 py-4 shadow-sm hover:shadow-lg transition-all flex justify-between items-center"
                    >
                      <div>
                        <p className="font-semibold text-slate-900">
                          {c.name}{" "}
                          {c.year && (
                            <span className="text-xs text-slate-500">
                              ({c.year})
                            </span>
                          )}
                        </p>
                        <p className="text-xs text-slate-600 mt-1">
                          {c.provider}
                        </p>
                      </div>

                      <motion.button
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => removeCert(c.id)}
                        className="text-rose-500 hover:text-rose-600 transition"
                      >
                        <FiTrash2 size={18} />
                      </motion.button>
                    </motion.li>
                  ))}
                </AnimatePresence>
              </ul>
            )}
          </motion.div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* RECOMMENDED CERTIFICATIONS */}
      <section className="pt-10 pb-24 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-indigo-700 to-purple-700 bg-clip-text text-transparent">
            Recommended Certifications for You
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "AWS Solutions Architect",
                provider: "Amazon Web Services",
              },
              { title: "Azure Administrator", provider: "Microsoft Azure" },
              {
                title: "Google Cloud Associate Engineer",
                provider: "Google Cloud",
              },
            ].map((rec, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.03 }}
                className="bg-white/60 backdrop-blur-xl border border-white/40 p-6 rounded-2xl shadow-lg"
              >
                <h3 className="font-bold text-lg">{rec.title}</h3>
                <p className="text-sm text-slate-600 mt-1">{rec.provider}</p>
                <button className="mt-4 text-indigo-600 font-semibold hover:underline">
                  View Details →
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* TIMELINE VIEW */}
      {list.length > 0 && (
        <section className="pt-10 pb-28 px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-10 bg-gradient-to-r from-indigo-700 to-purple-700 bg-clip-text text-transparent">
              Certification Journey Timeline
            </h2>

            <div className="relative border-l border-indigo-300 pl-10 space-y-10">
              {list
                .sort((a, b) => (b.year || 0) - (a.year || 0))
                .map((item) => (
                  <div key={item.id} className="relative">
                    <div className="absolute -left-[11px] top-1 w-5 h-5 bg-indigo-600 rounded-full shadow-lg"></div>

                    <div className="bg-white/70 backdrop-blur-lg p-5 rounded-2xl shadow-md border border-white/40">
                      <p className="font-bold text-lg">{item.name}</p>
                      <p className="text-sm text-slate-600">{item.provider}</p>
                      {item.year && (
                        <p className="text-xs text-indigo-700 font-semibold mt-2">
                          Completed in {item.year}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </section>
      )}

      {/* ========================================================= */}
      {/* EXPORT OPTIONS */}
      <section className="pt-10 pb-32 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-indigo-700 to-purple-700 bg-clip-text text-transparent">
            Export Your Certifications
          </h2>

          <div className="flex justify-center gap-6 mt-6">
            {["PDF", "CSV", "JSON"].map((type) => (
              <motion.button
                key={type}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="flex items-center gap-2 bg-white/60 backdrop-blur-xl border border-white/40 px-6 py-3 rounded-xl shadow-lg font-semibold text-indigo-700 hover:text-purple-700"
              >
                <FiDownload /> Export {type}
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}

/* ========================================================= */
/* SIMPLE FIELD WRAPPER */
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
