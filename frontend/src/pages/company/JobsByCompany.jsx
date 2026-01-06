import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axiosInstance from "../../api/axiosInstance";
import JobCard from "../../components/cards/JobCard";
import Footer from "../../components/layout/Footer";

export default function JobsByCompany() {
  const [jobs, setJobs] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [companyId, setCompanyId] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [company, setCompany] = useState(null);

  // Load companies for dropdown
  useEffect(() => {
    axiosInstance
      .get("/company")
      .then((res) => {
        const list = res.data?.companies || [];
        setCompanies(Array.isArray(list) ? list : []);
      })
      .catch((err) => console.error("Company API Error:", err));
  }, []);

  // Load jobs when company changes
  useEffect(() => {
    const loadJobs = async () => {
      if (!companyId) return;
      try {
        setLoading(true);
        setError("");

        const res = await axiosInstance.get(`/jobs/company/${companyId}`);
        const list = res.data?.data?.jobs || [];
        setJobs(Array.isArray(list) ? list : []);

        const selected = companies.find((c) => c.id === Number(companyId));
        setCompany(selected || null);
      } catch (err) {
        setError("Failed to load jobs for this company");
        console.error("Jobs API Error:", err);
      } finally {
        setLoading(false);
      }
    };

    loadJobs();
  }, [companyId]);

  return (
    <>
      {/* Ultra Premium Header */}
      <section className="relative bg-gradient-to-r from-indigo-900 via-blue-900 to-purple-900 text-white pt-28 pb-20 px-6 text-center overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[650px] h-[320px] bg-indigo-500/20 blur-[160px] rounded-full pointer-events-none"></div>

        <h1 className="text-6xl font-black mb-4 drop-shadow-xl">
          {company ? `${company.name} Jobs` : "Browse Jobs by Company"}
        </h1>
        <p className="text-lg text-white/70 font-medium max-w-2xl mx-auto">
          Select a company to explore open positions
        </p>

        {/* Company logo preview */}
        {company?.logo && (
          <motion.img
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            src={company.logo}
            alt="logo"
            className="h-20 mx-auto mt-6 rounded-2xl shadow-[0_10px_60px_rgba(99,102,241,0.5)]"
          />
        )}
      </section>

      {/* Company Filter Dropdown */}
      <div className="flex justify-center bg-slate-50 py-10">
        <select
          value={companyId}
          onChange={(e) => setCompanyId(e.target.value)}
          className="w-full max-w-lg bg-white border border-black/20 text-black font-bold rounded-full px-6 py-4 shadow-xl outline-none"
        >
          <option value="">-- Select a company --</option>
          {companies.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name} ({c.location})
            </option>
          ))}
        </select>
      </div>

      {/* Loading & Error */}
      <AnimatePresence>
        {loading && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-center text-black font-bold text-2xl mt-10"
          >
            Loading jobs...
          </motion.p>
        )}
      </AnimatePresence>

      {error && (
        <p className="text-center text-red-600 font-bold text-xl mt-6">
          {error}
        </p>
      )}

      {/* Jobs Grid */}
      <section className="max-w-7xl mx-auto px-6 py-10" id="jobs">
        {jobs.length === 0 && companyId && !loading && (
          <p className="text-black text-center text-3xl font-black opacity-60 mt-10">
            No jobs available for this company.
          </p>
        )}

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {jobs.map((job) => (
            <motion.div
              key={job._id}
              whileHover={{ y: -6, scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <JobCard job={job} />
            </motion.div>
          ))}
        </div>
      </section>

      <Footer />
    </>
  );
}
