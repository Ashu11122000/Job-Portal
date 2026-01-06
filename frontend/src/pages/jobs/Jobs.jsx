import { useEffect, useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../api/axiosInstance";
import JobCard from "../../components/cards/JobCard";
import Footer from "../../components/layout/Footer";
import { FiRefreshCw, FiSearch, FiTrendingUp, FiUsers } from "react-icons/fi";

export default function Jobs() {
  const [jobs, setJobs] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [selectedCompanyId, setSelectedCompanyId] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");
  const [onlyRemote, setOnlyRemote] = useState(false);

  const navigate = useNavigate();

  // 1️⃣ Fetch Companies for dropdown filter
  const fetchCompanies = async () => {
    try {
      const res = await axiosInstance.get("/api/company"); // ✔ becomes /api/company
      const list = res.data?.data?.rows || [];
      setCompanies(Array.isArray(list) ? list : []);
    } catch (err) {
      console.error("Company API Error:", err);
    }
  };

  // 2️⃣ Fetch all Jobs
  const fetchJobs = async () => {
    try {
      const res = await axiosInstance.get("/api/jobs"); // ✔ becomes /api/jobs
      const list = res.data?.data || [];
      setJobs(Array.isArray(list) ? list : []);
    } catch (err) {
      console.error("Jobs API Error:", err);
      setError("Failed to load jobs. Please try again.");
    }
  };

  // Load both APIs
  useEffect(() => {
    Promise.all([fetchCompanies(), fetchJobs()])
      .catch(() => setError("Something went wrong"))
      .finally(() => setLoading(false));
  }, []);

  // 3️⃣ Filter jobs by company + search + remote
  const filteredJobs = useMemo(() => {
    return jobs
      .filter((job) =>
        selectedCompanyId ? job.company_id === Number(selectedCompanyId) : true
      )
      .filter((job) =>
        (job.title || "").toLowerCase().includes(query.toLowerCase()) ||
        (job.company || "").toLowerCase().includes(query.toLowerCase())
      )
      .filter((job) =>
        onlyRemote ? (job.location || "").toLowerCase().includes("remote") : true
      );
  }, [jobs, query, onlyRemote, selectedCompanyId]);

  // LOADING UI
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-black text-2xl font-bold animate-pulse">
        Loading jobs...
      </div>
    );
  }

  // ERROR UI
  if (error) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-slate-50 px-6">
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ type: "spring", stiffness: 100 }}
          className="bg-white p-10 rounded-3xl border border-black/10 shadow-2xl text-center max-w-lg"
        >
          <h2 className="text-4xl font-black text-red-600 mb-3">Error</h2>
          <p className="text-lg font-semibold text-black/70 mb-6">{error}</p>
          <button
            onClick={fetchJobs}
            className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-3 rounded-full font-bold shadow-lg hover:scale-105 transition"
          >
            <FiRefreshCw className="inline mr-2" /> Retry
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <>
      {/* MAIN UI */}
      <section className="px-6 py-20 bg-gradient-to-br from-slate-50 via-indigo-50 to-purple-50">
        <div className="max-w-7xl mx-auto">

          {/* HEADER */}
          <div className="text-center mb-12">
            <span className="inline-flex items-center gap-2 mb-5 px-6 py-2 bg-white border border-indigo-400 text-indigo-700 rounded-full text-sm font-bold shadow-md">
              <FiTrendingUp />
              Live Hiring Market · Updated Daily
            </span>
            <h1 className="text-6xl font-black text-black mb-4">
              Find Your Next Job
            </h1>
            <p className="text-xl font-semibold text-black/70">
              Filter jobs by company and role
            </p>
          </div>

          {/* COMPANY DROPDOWN FILTER */}
          <div className="flex justify-center mb-6">
            <div className="relative w-full max-w-xl">
              <FiUsers className="absolute left-5 top-4 text-black text-xl" />
              <select
                value={selectedCompanyId}
                onChange={(e) => setSelectedCompanyId(e.target.value)}
                className="w-full bg-white border border-black/20 rounded-full py-3 pl-14 pr-6 text-black font-bold shadow-md outline-none focus:ring-2 focus:ring-indigo-600 transition"
              >
                <option value="">All Companies</option>
                {companies.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name} ({c.location})
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* SEARCH FILTER */}
          <div className="flex justify-center mb-10">
            <div className="relative w-full max-w-xl">
              <FiSearch className="absolute left-5 top-4 text-black text-xl" />
              <input
                type="text"
                placeholder="Search jobs..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full bg-white border border-black/20 rounded-full py-3 pl-14 pr-6 text-black shadow-md outline-none focus:ring-2 focus:ring-indigo-600 transition"
              />
            </div>
          </div>

          {/* JOB LISTING */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence>
              {filteredJobs.length === 0 ? (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-black text-center text-3xl font-bold col-span-full mt-10"
                >
                  No jobs found for this company.
                </motion.p>
              ) : (
                filteredJobs.map((job) => (
                  <motion.div
                    key={job.id}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                  >
                    <JobCard job={job} /> {/* ✔ full job object passed */}
                  </motion.div>
                ))
              )}
            </AnimatePresence>
          </div>

        </div>
      </section>

      <Footer />
    </>
  );
}
