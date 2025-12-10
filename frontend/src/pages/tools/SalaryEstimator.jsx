// src/pages/tools/SalaryEstimator.jsx
import { useState } from "react";
import { motion } from "framer-motion";
import { FiTrendingUp, FiMapPin, FiBriefcase } from "react-icons/fi";
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
    // simple mock logic
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
      <section className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 pt-32 pb-24 px-6">
        <div className="max-w-5xl mx-auto">
          {/* HERO */}
          <div className="text-center mb-16">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-block mb-4 px-6 py-2 bg-indigo-100 text-indigo-700 rounded-full text-sm font-semibold"
            >
              💰 Market Salary Intelligence
            </motion.span>
            <h1 className="text-5xl font-black bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-4">
              Salary Estimator
            </h1>
            <p className="text-slate-600 max-w-2xl mx-auto text-lg">
              Get an approximate salary range based on role, experience, and
              location. Later you can connect this to live backend analytics.
            </p>
          </div>

          {/* FORM + RESULT */}
          <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 p-8 grid md:grid-cols-2 gap-10">
            <div>
              <h2 className="text-xl font-bold mb-6 text-slate-800">
                Enter Your Details
              </h2>

              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">
                    Role
                  </label>
                  <select
                    name="role"
                    value={form.role}
                    onChange={handleChange}
                    className="w-full border border-slate-200 rounded-xl px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    <option>Frontend Developer</option>
                    <option>Backend Developer</option>
                    <option>Full Stack Developer</option>
                    <option>Senior Full Stack Engineer</option>
                    <option>Data Engineer</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">
                    Experience
                  </label>
                  <select
                    name="experience"
                    value={form.experience}
                    onChange={handleChange}
                    className="w-full border border-slate-200 rounded-xl px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="0-1">0–1 years</option>
                    <option value="2-4">2–4 years</option>
                    <option value="4-7">4–7 years</option>
                    <option value="7+">7+ years</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">
                    Location
                  </label>
                  <select
                    name="location"
                    value={form.location}
                    onChange={handleChange}
                    className="w-full border border-slate-200 rounded-xl px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    <option>Bangalore</option>
                    <option>Hyderabad</option>
                    <option>Pune</option>
                    <option>Remote</option>
                    <option>US / Europe</option>
                  </select>
                </div>

                <button
                  onClick={handleEstimate}
                  className="mt-4 w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 rounded-xl font-semibold shadow-lg hover:scale-105 transition"
                >
                  Estimate Salary
                </button>
              </div>
            </div>

            {/* RESULT CARD */}
            <div className="bg-indigo-900 rounded-3xl text-white p-8 flex flex-col justify-center">
              <h2 className="text-2xl font-black mb-4 flex items-center gap-2">
                <FiTrendingUp /> Estimated CTC
              </h2>

              {result ? (
                <>
                  <p className="text-sm text-indigo-200 mb-2">
                    For {form.role}, {form.experience} yrs, {form.location}
                  </p>
                  <p className="text-4xl font-black mb-4">
                    ₹{result.min} – ₹{result.max} LPA
                  </p>
                  <p className="text-indigo-100 text-sm">
                    This is an approximate market range. Top product companies
                    and startups may offer higher based on skills, DSA, and
                    system design.
                  </p>
                </>
              ) : (
                <p className="text-indigo-100 text-sm">
                  Fill the details and click on <b>Estimate Salary</b> to see
                  your approximate range.
                </p>
              )}

              <div className="mt-6 text-xs text-indigo-200 flex items-center gap-2">
                <FiMapPin /> Tip: Combine this with your actual job offers later
                for accurate planning.
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
