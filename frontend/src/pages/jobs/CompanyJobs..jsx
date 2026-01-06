import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import axiosInstance from "../../api/axiosInstance";
import JobCard from "../../components/cards/JobCard";
import Footer from "../../components/layout/Footer";

export default function CompanyJobs() {
  const { id } = useParams(); // company id from URL
  const [company, setCompany] = useState(null);
  const [jobs, setJobs] = useState([]); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadCompanyJobs = async () => {
      try {
        setLoading(true);

        // 1️⃣ Fetch Company details
        const companyRes = await axiosInstance.get(`/company/${id}`);
        setCompany(companyRes.data?.company || null);

        // 2️⃣ Fetch Jobs by Company ID
        const jobRes = await axiosInstance.get(`/company/${id}/jobs`);
        const list = jobRes.data?.data || jobRes.data?.jobs || [];
        setJobs(Array.isArray(list) ? list : []);

      } catch (err) {
        console.error("API Error:", err);
        setError("Failed to load company or jobs");
      } finally {
        setLoading(false);
      }
    };

    loadCompanyJobs();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-slate-900">
        <p className="text-white text-3xl font-black animate-pulse">
          Loading company jobs...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-slate-900 px-6">
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ type: "spring", stiffness: 100 }}
          className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-10 text-center shadow-2xl max-w-lg"
        >
          <h2 className="text-4xl font-black text-red-400 mb-4">Error</h2>
          <p className="text-white/80 font-semibold mb-6">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-3 rounded-full font-bold text-lg shadow-xl hover:scale-105 transition"
          >
            Retry
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <>
      <section className="relative min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950 to-purple-950 px-6 py-24">
        {/* Glow Background */}
        <motion.div
          animate={{ x: [0, 90, 0], y: [0, -70, 0] }}
          transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-indigo-500/15 blur-[160px] rounded-full"
        />

        {/* Hero Header */}
        <div className="max-w-4xl mx-auto text-center mb-16 relative z-10">
          <motion.img
            src={company?.logo || "/default-logo.png"}
            alt="Company Logo"
            className="h-24 mx-auto mb-6 rounded-2xl shadow-2xl border border-white/30 bg-white/10 p-2"
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, type: "spring", stiffness: 120 }}
          />

          <h1 className="text-6xl font-black text-white drop-shadow-2xl mb-4">
            {company?.name || "Company"}
          </h1>

          <p className="text-lg text-white/70 font-medium">
            {company?.location} · {company?.industry || "Industry not specified"}
          </p>
        </div>

        {/* Jobs Grid */}
        <div className="max-w-7xl mx-auto grid sm:grid-cols-2 lg:grid-cols-3 gap-10 relative z-10">
          {jobs.length === 0 ? (
            <p className="text-white text-center text-3xl font-bold opacity-60 col-span-full mt-10">
              No jobs posted by this company yet.
            </p>
          ) : (
            jobs.map((job) => (
              <motion.div
                key={job.id}
                whileHover={{ y: -6, scale: 1.02 }}
                transition={{ duration: 0.25 }}
              >
                <JobCard job={job} />
              </motion.div>
            ))
          )}
        </div>
      </section>

      <Footer />
    </>
  );
}
