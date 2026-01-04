import { useEffect, useState, useMemo } from "react";
import { getAllJobs } from "../../api/jobApi";
import JobCard from "../../components/cards/JobCard";
import Footer from "../../components/layout/Footer";
import {
  FiRefreshCw,
  FiSearch,
  FiTrendingUp,
  FiMapPin,
  FiDollarSign,
} from "react-icons/fi";
import axios from "axios"; // ✅ ADDED (integration)

export default function Jobs() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [query, setQuery] = useState("");
  const [onlyRemote, setOnlyRemote] = useState(false);

  const fetchJobs = async () => {
    try {
      setLoading(true);
      setError("");
      
      const res = await axios.get("http://localhost:5000/api/jobs"); // ✅ API integrated
      const data = res.data?.data || res.data;
      
      setJobs(data);
    } catch (err) {
      console.error("Error fetching jobs:", err);
      setError("Unable to fetch jobs. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  /* ===============================
     FILTERED JOBS
  =============================== */
  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      const matchQuery =
        job.title?.toLowerCase().includes(query.toLowerCase()) ||
        job.company?.name?.toLowerCase().includes(query.toLowerCase());

      const matchRemote = onlyRemote
        ? job.location?.toLowerCase().includes("remote")
        : true;

      return matchQuery && matchRemote;
    });
  }, [jobs, query, onlyRemote]);

  /* ===============================
     LOADING STATE
  =============================== */
  if (loading) {
    return (
      <div className="min-h-screen bg-linear-to-br from-slate-100 via-indigo-100 to-purple-100 px-6 py-32">
        <div className="max-w-7xl mx-auto grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="animate-pulse bg-white/80 backdrop-blur-xl border rounded-3xl p-7 shadow-xl"
            >
              <div className="h-6 bg-slate-200 rounded w-3/4 mb-4" />
              <div className="h-4 bg-slate-200 rounded w-1/2 mb-3" />
              <div className="h-4 bg-slate-200 rounded w-2/3 mb-6" />
              <div className="h-11 bg-slate-200 rounded-xl" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  /* ===============================
     ERROR STATE
  =============================== */
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-indigo-100 to-purple-100 px-6">
        <div className="bg-white/95 backdrop-blur-xl p-12 rounded-3xl shadow-2xl border text-center">
          <h2 className="text-3xl font-bold text-red-600 mb-4">
            Failed to Load Jobs
          </h2>
          <p className="text-slate-600 mb-8">{error}</p>
          <button
            onClick={fetchJobs}
            className="inline-flex items-center gap-3 bg-linear-to-r from-indigo-600 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold shadow-lg hover:scale-105 transition"
          >
            <FiRefreshCw /> Retry Loading
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <section className="bg-linear-to-br from-slate-100 via-indigo-100 to-purple-100 px-6 py-32">
        <div className="max-w-7xl mx-auto">
          <div className="relative mb-24 text-center overflow-hidden">
            <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-indigo-400/20 blur-[140px] rounded-full pointer-events-none" />
            <span className="inline-flex items-center gap-2 mb-6 px-7 py-2 bg-white/80 backdrop-blur-xl border border-indigo-300 text-indigo-700 rounded-full text-sm font-semibold shadow-[0_8px_30px_rgba(99,102,241,0.25)]">
              <FiTrendingUp className="text-indigo-600" />
              Live Hiring Market · Updated Daily
            </span>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-black bg-gradient-to-r from-indigo-700 via-blue-700 to-purple-700 text-transparent bg-clip-text leading-tight mb-8">
              Discover Jobs That <br className="hidden sm:block" />
              <span className="relative">
                Move Your Career Forward
                <span className="absolute left-0 -bottom-2 w-full h-1.5 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full opacity-70" />
              </span>
            </h1>

            <p className="text-slate-700 max-w-3xl mx-auto text-lg md:text-xl leading-relaxed">
              Explore <b>verified, high-quality roles</b> from startups, MNCs, and remote-first companies. Smart matching, transparent salaries, and real hiring momentum.
            </p>

            <div className="mt-12 flex flex-wrap justify-center gap-10 text-slate-700">
              <div className="text-center">
                <p className="text-3xl font-black text-indigo-700">25K+</p>
                <p className="text-sm font-medium">Active Jobs</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-black text-indigo-700">12K+</p>
                <p className="text-sm font-medium">Hiring Companies</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-black text-indigo-700">98%</p>
                <p className="text-sm font-medium">Verified Listings</p>
              </div>
            </div>

            <div className="mt-14 flex flex-wrap justify-center gap-6">
              <a href="#jobs" className="inline-flex items-center justify-center bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-10 py-4 rounded-full font-bold shadow-[0_20px_60px_rgba(99,102,241,0.55)] hover:scale-105 transition">
                Browse Jobs
              </a>
              <a href="/register" className="inline-flex items-center justify-center bg-white/80 backdrop-blur-xl border border-indigo-300 text-indigo-700 px-10 py-4 rounded-full font-bold shadow hover:bg-indigo-50 hover:scale-105 transition">
                Get Job Alerts
              </a>
            </div>
          </div>

          <div id="jobs" className="grid sm:grid-cols-2 lg:grid-cols-3 gap-12">
            {filteredJobs.map((job) => (
              <JobCard key={job._id || job.id} job={job} />
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
