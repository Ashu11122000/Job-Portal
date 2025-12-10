import { useEffect, useState, useMemo } from "react";
import { getAllJobs } from "../../api/jobApi";
import JobCard from "../../components/cards/JobCard";
import Footer from "../../components/layout/Footer";
import {
  FiRefreshCw,
  FiSearch,
  FiFilter,
  FiTrendingUp,
  FiMapPin,
  FiDollarSign,
} from "react-icons/fi";

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
      const res = await getAllJobs();
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

  /* ✅ LIVE FILTERED JOBS */
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

  /* ✅ PREMIUM LOADING STATE */
  if (loading) {
    return (
      <div className="min-h-screen bg-linear-to-br from-slate-100 via-indigo-100 to-purple-100 px-6 py-32">
        <div className="max-w-7xl mx-auto">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="animate-pulse bg-white/80 backdrop-blur-xl border border-slate-200 rounded-3xl p-7 shadow-xl"
              >
                <div className="h-6 bg-slate-200 rounded w-3/4 mb-4" />
                <div className="h-4 bg-slate-200 rounded w-1/2 mb-3" />
                <div className="h-4 bg-slate-200 rounded w-2/3 mb-6" />
                <div className="h-11 bg-slate-200 rounded-xl" />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  /* ✅ PREMIUM ERROR STATE */
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
      {/* ✅ HERO */}
      <section className="min-h-screen bg-linear-to-br from-slate-100 via-indigo-100 to-purple-100 px-6 py-32">
        <div className="max-w-7xl mx-auto">
          {/* ✅ PREMIUM HERO HEADER */}
          <div className="mb-20 text-center">
            <span className="inline-flex items-center gap-2 mb-4 px-6 py-2 bg-indigo-200 text-indigo-800 rounded-full text-sm font-semibold shadow">
              <FiTrendingUp /> Live Hiring Market
            </span>

            <h1 className="text-6xl font-black bg-linear-to-r from-indigo-700 via-blue-700 to-purple-700 text-transparent bg-clip-text mb-6">
              Browse Top Opportunities
            </h1>

            <p className="text-slate-700 max-w-2xl mx-auto text-xl leading-relaxed">
              Explore curated roles from verified startups, MNCs and
              remote-first companies.
            </p>
          </div>

          {/* ✅ SEARCH / FILTER STRIP */}
          <div className="sticky top-24 z-20 mb-16 bg-white/85 backdrop-blur-xl border border-slate-200 rounded-2xl p-6 shadow-xl grid md:grid-cols-4 gap-4">
            <div className="flex items-center bg-slate-100 rounded-xl px-4 py-3">
              <FiSearch className="text-slate-500 mr-3" />
              <input
                type="text"
                placeholder="Search job, skill, company"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full bg-transparent outline-none text-slate-800"
              />
            </div>

            <button
              onClick={() => setOnlyRemote(!onlyRemote)}
              className={`flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-semibold transition ${
                onlyRemote
                  ? "bg-indigo-600 text-white"
                  : "bg-slate-100 text-slate-700"
              }`}
            >
              <FiMapPin /> Remote Only
            </button>

            <div className="flex items-center justify-center gap-2 bg-slate-100 px-5 py-3 rounded-xl font-semibold text-slate-700">
              <FiDollarSign /> Premium Roles
            </div>

            <button
              onClick={fetchJobs}
              className="flex items-center justify-center gap-2 bg-linear-to-r from-indigo-700 to-purple-700 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:scale-105 transition"
            >
              <FiRefreshCw /> Refresh
            </button>
          </div>

          {/* ✅ LIVE JOB COUNT */}
          <div className="mb-10 text-right text-sm text-slate-600">
            Showing <span className="font-bold">{filteredJobs.length}</span>{" "}
            active jobs
          </div>

          {/* ✅ EMPTY STATE */}
          {filteredJobs.length === 0 && (
            <div className="text-center py-24">
              <h3 className="text-3xl font-bold text-slate-700 mb-3">
                No Matching Jobs Found
              </h3>
              <p className="text-slate-500">
                Try changing your search or filters.
              </p>
            </div>
          )}

          {/* ✅ ULTRA JOB GRID */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-12">
            {filteredJobs.map((job) => (
              <JobCard key={job._id || job.id} job={job} />
            ))}
          </div>
        </div>
      </section>

      {/* ✅ FOOTER */}
      <Footer />
    </>
  );
}
