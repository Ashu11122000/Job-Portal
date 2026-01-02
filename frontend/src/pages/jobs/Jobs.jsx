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
      {/* ===============================
          HERO + JOB LIST
      =============================== */}
      <section className="bg-linear-to-br from-slate-100 via-indigo-100 to-purple-100 px-6 py-32">
        <div className="max-w-7xl mx-auto">
          {/* HERO */}
          <div className="relative mb-24 text-center overflow-hidden">
            {/* ===== Ambient Glow (Subtle & Realistic) ===== */}
            <div
              className="absolute -top-32 left-1/2 -translate-x-1/2 w-[600px] h-[600px] 
                  bg-indigo-400/20 blur-[140px] rounded-full pointer-events-none"
            />

            {/* ===== Badge ===== */}
            <span
              className="inline-flex items-center gap-2 mb-6 px-7 py-2
               bg-white/80 backdrop-blur-xl border border-indigo-200
               text-indigo-700 rounded-full text-sm font-semibold
               shadow-[0_8px_30px_rgba(99,102,241,0.25)]"
            >
              <FiTrendingUp className="text-indigo-600" />
              Live Hiring Market · Updated Daily
            </span>

            {/* ===== Main Heading ===== */}
            <h1
              className="text-5xl md:text-6xl lg:text-7xl font-black
               bg-gradient-to-r from-indigo-700 via-blue-700 to-purple-700
               text-transparent bg-clip-text leading-tight mb-8"
            >
              Discover Jobs That <br className="hidden sm:block" />
              <span className="relative">
                Move Your Career Forward
                <span
                  className="absolute left-0 -bottom-2 w-full h-1.5
                       bg-gradient-to-r from-indigo-500 to-purple-500
                       rounded-full opacity-70"
                />
              </span>
            </h1>

            {/* ===== Description ===== */}
            <p className="text-slate-700 max-w-3xl mx-auto text-lg md:text-xl leading-relaxed">
              Explore <b>verified, high-quality roles</b> from startups, MNCs,
              and remote-first companies. Smart matching, transparent salaries,
              and real hiring momentum.
            </p>

            {/* ===== Trust Metrics ===== */}
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

            {/* ===== Primary CTAs ===== */}
            <div className="mt-14 flex flex-wrap justify-center gap-6">
              <a
                href="#jobs"
                className="inline-flex items-center justify-center
                 bg-gradient-to-r from-indigo-600 to-purple-600
                 text-white px-10 py-4 rounded-full font-bold
                 shadow-[0_20px_60px_rgba(99,102,241,0.55)]
                 hover:scale-105 transition"
              >
                Browse Jobs
              </a>

              <a
                href="/register"
                className="inline-flex items-center justify-center
                 bg-white/80 backdrop-blur-xl border border-indigo-300
                 text-indigo-700 px-10 py-4 rounded-full font-bold
                 shadow hover:bg-indigo-50 hover:scale-105 transition"
              >
                Get Job Alerts
              </a>
            </div>
          </div>

          {/* SEARCH + FILTER */}
          <div
            className="
    sticky top-24 z-30 mb-20
    bg-white/80 backdrop-blur-2xl
    border border-white/60
    rounded-3xl
    p-6
    shadow-[0_25px_80px_rgba(0,0,0,0.12)]
    transition-all
  "
          >
            {/* ===== Subtle Ambient Glow ===== */}
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-indigo-200/30 to-purple-200/30 opacity-40 pointer-events-none" />

            <div className="relative grid md:grid-cols-4 gap-4 items-center">
              {/* ===== SEARCH INPUT ===== */}
              <div className="group flex items-center bg-slate-100/80 rounded-2xl px-5 py-3 border border-transparent focus-within:border-indigo-400 focus-within:bg-white transition shadow-inner">
                <FiSearch className="text-slate-500 mr-3 group-focus-within:text-indigo-600 transition" />
                <input
                  type="text"
                  placeholder="Job title, skill, or company"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="w-full bg-transparent outline-none text-slate-800 placeholder-slate-400"
                />
              </div>

              {/* ===== REMOTE TOGGLE ===== */}
              <button
                onClick={() => setOnlyRemote(!onlyRemote)}
                className={`
        flex items-center justify-center gap-2
        px-6 py-3 rounded-2xl font-semibold
        border transition-all
        ${
          onlyRemote
            ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg scale-[1.03]"
            : "bg-slate-100 text-slate-700 hover:bg-slate-200"
        }
      `}
              >
                <FiMapPin />
                Remote Jobs
              </button>

              {/* ===== PREMIUM FILTER (VISUAL ONLY) ===== */}
              <div className="relative flex items-center justify-center gap-2 bg-slate-100 px-6 py-3 rounded-2xl font-semibold text-slate-700 border border-dashed border-slate-300">
                <FiDollarSign className="text-indigo-600" />
                Premium Roles
                <span className="absolute -top-2 -right-2 text-[10px] bg-indigo-600 text-white px-2 py-0.5 rounded-full shadow">
                  PRO
                </span>
              </div>

              {/* ===== REFRESH ACTION ===== */}
              <button
                onClick={fetchJobs}
                className="
        flex items-center justify-center gap-2
        bg-gradient-to-r from-indigo-700 to-purple-700
        text-white px-6 py-3 rounded-2xl font-semibold
        shadow-[0_15px_50px_rgba(99,102,241,0.45)]
        hover:scale-105 active:scale-95
        transition-all
      "
              >
                <FiRefreshCw className="animate-[spin_6s_linear_infinite]" />
                Refresh
              </button>
            </div>

            {/* ===== Helper Line ===== */}
            <div className="mt-4 text-xs text-slate-500 text-center">
              Tip: Use keywords like <b>React</b>, <b>Java</b>, <b>Remote</b>,
              or company names
            </div>
          </div>

          <div className="mb-10 text-right text-sm text-slate-600">
            Showing <b>{filteredJobs.length}</b> active jobs
          </div>

          {filteredJobs.length === 0 && (
            <div className="text-center py-24">
              <h3 className="text-3xl font-bold text-slate-700">
                No Matching Jobs Found
              </h3>
            </div>
          )}

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-12">
            {filteredJobs.map((job) => (
              <JobCard key={job._id || job.id} job={job} />
            ))}
          </div>

          {/* ===============================
              POPULAR CATEGORIES
          =============================== */}
          <section className="relative mt-44">
            {/* ===== Soft Ambient Glow ===== */}
            <div
              className="absolute -top-32 left-1/2 -translate-x-1/2 w-[620px] h-[620px]
                  bg-indigo-400/20 blur-[160px] rounded-full pointer-events-none"
            />

            {/* ===== Header ===== */}
            <div className="mb-16 text-center">
              <span
                className="inline-flex items-center gap-2 mb-4 px-6 py-2
                     bg-white/80 backdrop-blur-xl border border-indigo-200
                     text-indigo-700 rounded-full text-sm font-semibold
                     shadow-[0_8px_30px_rgba(99,102,241,0.25)]"
              >
                🔥 Trending Domains
              </span>

              <h2 className="text-4xl md:text-5xl font-black text-slate-800 mb-4">
                Popular Job Categories
              </h2>

              <p className="text-slate-600 max-w-2xl mx-auto text-lg">
                Explore high-demand roles where companies are actively hiring
                right now.
              </p>
            </div>

            {/* ===== Category Grid ===== */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
              {[
                { title: "Frontend Developer", jobs: "2.4K+" },
                { title: "Backend Developer", jobs: "1.9K+" },
                { title: "Full Stack Developer", jobs: "3.1K+" },
                { title: "Cloud Engineer", jobs: "980+" },
                { title: "Data Analyst", jobs: "860+" },
                { title: "UI/UX Designer", jobs: "1.2K+" },
                { title: "DevOps Engineer", jobs: "740+" },
                { title: "Freshers Jobs", jobs: "3.5K+" },
              ].map((cat) => (
                <div
                  key={cat.title}
                  className="
          group relative
          bg-white/90 backdrop-blur-xl
          border border-slate-200
          rounded-3xl p-8
          shadow-[0_20px_60px_rgba(0,0,0,0.1)]
          hover:shadow-[0_30px_90px_rgba(99,102,241,0.25)]
          hover:-translate-y-3
          transition-all duration-300
        "
                >
                  {/* Accent Glow */}
                  <div
                    className="absolute inset-0 rounded-3xl
                        bg-gradient-to-r from-indigo-400 to-purple-400
                        opacity-0 group-hover:opacity-10
                        blur-xl transition"
                  />

                  {/* Content */}
                  <div className="relative">
                    <h3 className="text-lg font-bold text-slate-800 group-hover:text-indigo-700 transition">
                      {cat.title}
                    </h3>

                    <p className="text-sm text-slate-500 mt-2">
                      High-demand · Fast hiring
                    </p>

                    {/* Meta */}
                    <div className="mt-6 flex items-center justify-between">
                      <span className="text-indigo-700 font-black text-xl">
                        {cat.jobs}
                      </span>
                      <span
                        className="text-xs font-semibold px-3 py-1
                             bg-indigo-100 text-indigo-700 rounded-full"
                      >
                        Jobs
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ===============================
              JOBS BY LOCATION
          =============================== */}
          <section className="relative mt-44">
            {/* ===== Ambient Background Glow ===== */}
            <div
              className="absolute -top-32 left-1/2 -translate-x-1/2 w-[620px] h-[620px]
                  bg-indigo-400/20 blur-[160px] rounded-full pointer-events-none"
            />

            {/* ===== Section Header ===== */}
            <div className="mb-16 text-center">
              <span
                className="inline-flex items-center gap-2 mb-4 px-6 py-2
                     bg-white/80 backdrop-blur-xl border border-indigo-200
                     text-indigo-700 rounded-full text-sm font-semibold
                     shadow-[0_8px_30px_rgba(99,102,241,0.25)]"
              >
                📍 Hiring Across India
              </span>

              <h2 className="text-4xl md:text-5xl font-black text-slate-800 mb-4">
                Jobs by Location
              </h2>

              <p className="text-slate-600 max-w-2xl mx-auto text-lg">
                Discover opportunities in top tech hubs and fast-growing cities,
                including remote-first roles.
              </p>
            </div>

            {/* ===== Location Grid ===== */}
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-10">
              {[
                { city: "Bangalore", jobs: "8.2K+" },
                { city: "Hyderabad", jobs: "5.6K+" },
                { city: "Pune", jobs: "4.1K+" },
                { city: "Noida", jobs: "3.4K+" },
                { city: "Chennai", jobs: "3.9K+" },
                { city: "Mumbai", jobs: "6.8K+" },
                { city: "Remote (India)", jobs: "9.5K+" },
              ].map((loc) => (
                <div
                  key={loc.city}
                  className="
          group relative
          bg-white/90 backdrop-blur-xl
          border border-slate-200
          rounded-3xl px-8 py-6
          shadow-[0_20px_60px_rgba(0,0,0,0.1)]
          hover:shadow-[0_30px_90px_rgba(99,102,241,0.25)]
          hover:-translate-y-3
          transition-all duration-300
          cursor-pointer
        "
                >
                  {/* Glow */}
                  <div
                    className="absolute inset-0 rounded-3xl
                        bg-gradient-to-r from-indigo-400 to-purple-400
                        opacity-0 group-hover:opacity-10
                        blur-xl transition"
                  />

                  {/* Content */}
                  <div className="relative flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-bold text-slate-800 group-hover:text-indigo-700 transition">
                        {loc.city}
                      </h3>
                      <p className="text-sm text-slate-500 mt-1">
                        {loc.jobs} open roles
                      </p>
                    </div>

                    <div
                      className="flex items-center justify-center w-11 h-11 rounded-full
                          bg-indigo-100 text-indigo-700 group-hover:bg-indigo-600
                          group-hover:text-white transition"
                    >
                      <FiMapPin />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ===============================
              SALARY INSIGHTS
          =============================== */}
          <section className="relative mt-44 bg-white/90 backdrop-blur-xl border border-slate-200 rounded-3xl p-16 shadow-[0_35px_120px_rgba(0,0,0,0.12)]">
            {/* ===== Subtle Ambient Glow ===== */}
            <div
              className="absolute -top-28 left-1/2 -translate-x-1/2 w-[520px] h-[520px]
                  bg-indigo-400/15 blur-[160px] rounded-full pointer-events-none"
            />

            {/* ===== Header ===== */}
            <div className="mb-16 text-center">
              <span
                className="inline-flex items-center gap-2 mb-4 px-6 py-2
                 bg-indigo-50 text-indigo-700
                 rounded-full text-sm font-semibold
                 shadow-sm border border-indigo-100"
              >
                📊 Market Intelligence
              </span>

              <h2 className="text-4xl md:text-5xl font-black text-slate-800 mb-4">
                Salary & Hiring Trends
              </h2>

              <p className="text-slate-600 max-w-2xl mx-auto text-lg leading-relaxed">
                Real-world salary benchmarks and demand signals based on active
                hiring data from verified companies.
              </p>
            </div>

            {/* ===== Salary Cards ===== */}
            <div className="grid md:grid-cols-3 gap-12">
              {[
                {
                  role: "Frontend Developer",
                  salary: "₹6 – 15 LPA",
                  growth: "+32% YoY",
                  demand: "High demand",
                },
                {
                  role: "Backend Developer",
                  salary: "₹8 – 22 LPA",
                  growth: "+28% YoY",
                  demand: "Consistent hiring",
                },
                {
                  role: "Cloud Engineer",
                  salary: "₹14 – 32 LPA",
                  growth: "+38% YoY",
                  demand: "Critical roles",
                },
              ].map((item) => (
                <div
                  key={item.role}
                  className="
          group relative
          bg-slate-50
          border border-slate-200
          rounded-2xl p-8
          shadow-[0_20px_60px_rgba(0,0,0,0.08)]
          hover:shadow-[0_30px_90px_rgba(99,102,241,0.2)]
          hover:-translate-y-2
          transition-all duration-300
        "
                >
                  {/* Glow */}
                  <div
                    className="absolute inset-0 rounded-2xl
                        bg-gradient-to-r from-indigo-400 to-purple-400
                        opacity-0 group-hover:opacity-10
                        blur-xl transition"
                  />

                  {/* Content */}
                  <div className="relative">
                    <h3 className="text-lg font-bold text-slate-800">
                      {item.role}
                    </h3>

                    <p className="text-indigo-700 font-black text-3xl mt-4">
                      {item.salary}
                    </p>

                    <div className="mt-4 flex items-center justify-between">
                      <span className="text-emerald-600 font-semibold text-sm">
                        {item.growth}
                      </span>
                      <span
                        className="text-xs font-semibold px-3 py-1 rounded-full
                             bg-indigo-100 text-indigo-700"
                      >
                        {item.demand}
                      </span>
                    </div>

                    <p className="text-slate-500 text-sm mt-4">
                      Salary range varies by experience, location, and skill
                      depth.
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ===============================
              JOB ALERT CTA
          =============================== */}
          <section className="relative mt-44">
            {/* Ambient Glow */}
            <div
              className="absolute -top-24 left-1/2 -translate-x-1/2 w-[520px] h-[520px]
                  bg-indigo-500/20 blur-[160px] rounded-full pointer-events-none"
            />

            <div
              className="
      relative
      bg-white/90 backdrop-blur-xl
      border border-slate-200
      rounded-3xl p-20
      shadow-[0_35px_120px_rgba(0,0,0,0.15)]
      text-center
    "
            >
              {/* Badge */}
              <span
                className="inline-flex items-center gap-2 mb-6 px-6 py-2
                 bg-indigo-50 text-indigo-700
                 rounded-full text-sm font-semibold
                 border border-indigo-100 shadow-sm"
              >
                🔔 Smart Job Alerts
              </span>

              {/* Heading */}
              <h2 className="text-4xl md:text-5xl font-black text-slate-800 mb-6">
                Never Miss the Right Opportunity
              </h2>

              {/* Description */}
              <p className="text-slate-600 max-w-2xl mx-auto text-lg leading-relaxed mb-12">
                Get notified instantly when jobs matching your skills,
                experience, and salary expectations go live — no spam, only
                relevant roles.
              </p>

              {/* CTA */}
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <a
                  href="/register"
                  className="
          inline-flex items-center justify-center
          bg-gradient-to-r from-indigo-600 to-purple-600
          text-white px-14 py-5 rounded-full
          font-bold text-lg
          shadow-[0_18px_70px_rgba(99,102,241,0.5)]
          hover:scale-105 transition
        "
                >
                  Create Job Alert
                </a>

                <span className="flex items-center justify-center text-sm text-slate-500">
                  ✔ Free • ✔ Personalized • ✔ Unsubscribe anytime
                </span>
              </div>
            </div>
          </section>
        </div>
      </section>

      <Footer />
    </>
  );
}

/* ===============================
   SMALL COMPONENT
=============================== */
function SalaryCard({ title, salary }) {
  return (
    <div className="bg-slate-50 border rounded-2xl p-8 shadow hover:shadow-xl transition">
      <h3 className="font-bold text-lg">{title}</h3>
      <p className="text-indigo-600 font-black text-2xl mt-4">{salary}</p>
      <p className="text-sm text-slate-500 mt-2">High demand · Strong growth</p>
    </div>
  );
}
