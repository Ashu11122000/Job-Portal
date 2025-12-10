// src/pages/tools/CertificationTracker.jsx
import { useState } from "react";
import { motion } from "framer-motion";
import { FiAward, FiPlusCircle, FiTrash2 } from "react-icons/fi";
import Footer from "../../components/layout/Footer";

export default function CertificationTracker() {
  const [form, setForm] = useState({
    name: "",
    provider: "",
    year: "",
  });
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
              Certification Tracker
            </motion.h1>
            <p className="text-slate-600 mb-8 text-lg">
              Keep all your technical and professional certifications organized
              in one place. Later this can be synced with your profile backend.
            </p>

            <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-7 space-y-5">
              <Field label="Certification Name">
                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="e.g. AWS Certified Developer – Associate"
                />
              </Field>

              <Field label="Provider / Platform">
                <input
                  name="provider"
                  value={form.provider}
                  onChange={handleChange}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="e.g. Amazon, Microsoft, Coursera"
                />
              </Field>

              <Field label="Year (optional)">
                <input
                  name="year"
                  value={form.year}
                  onChange={handleChange}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="e.g. 2024"
                />
              </Field>

              <button
                onClick={addCert}
                className="mt-2 flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-2.5 rounded-xl font-semibold shadow-lg hover:scale-105 transition"
              >
                <FiPlusCircle /> Add Certification
              </button>
            </div>
          </div>

          {/* LIST */}
          <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-11 h-11 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-600">
                <FiAward />
              </div>
              <h2 className="text-xl font-bold text-slate-800">
                Your Certifications
              </h2>
            </div>

            {list.length === 0 ? (
              <p className="text-sm text-slate-600">
                No certifications added yet. Start by adding your top 2–3
                certifications.
              </p>
            ) : (
              <ul className="space-y-4">
                {list.map((c) => (
                  <li
                    key={c.id}
                    className="flex items-center justify-between bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-sm"
                  >
                    <div>
                      <p className="font-semibold text-slate-800">
                        {c.name}{" "}
                        {c.year && (
                          <span className="text-xs text-slate-500">
                            ({c.year})
                          </span>
                        )}
                      </p>
                      <p className="text-xs text-slate-600">{c.provider}</p>
                    </div>
                    <button
                      onClick={() => removeCert(c.id)}
                      className="text-rose-500 hover:text-rose-600"
                    >
                      <FiTrash2 />
                    </button>
                  </li>
                ))}
              </ul>
            )}
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
