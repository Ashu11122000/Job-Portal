import { useEffect, useState } from "react";
import { getMyApplications } from "../../api/applicationApi"; // existing line kept
import { useAuthContext } from "../../context/AuthContext";
import { motion } from "framer-motion";
import Footer from "../../components/layout/Footer"; // Footer imported
import { FiBriefcase, FiCheckCircle, FiXCircle, FiClock, FiSearch } from "react-icons/fi"; // icons kept, no removal

export default function CandidateDashboard() {
  const auth = useAuthContext();
  const user = auth?.user || {}; // context already present, no removal

  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [search, setSearch] = useState(""); // search state kept

  useEffect(() => {
    if (!user.id) return;

    const fetchApplications = async () => {
      try {
        setLoading(true);
        setError("");
        const res = await getMyApplications(user.id);

        // ✔ FIXED response handling
        setApplications(res.data?.data || []);
      } catch (err) {
        console.error("❌ Error fetching applications:", err); // existing log kept
        setError("Unable to load your applications.");
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, [user.id]); // dependency already present, nothing removed

  // ✔ FIXED filter logic
  const visibleApplications = applications.filter((app) => {
    const t = (app.title || app.job_title || "").toLowerCase();
    const c = (app.company || "").toLowerCase();
    return t.includes(search.toLowerCase()) || c.includes(search.toLowerCase());
  });

  const stats = {
    applied: applications.length,
    selected: applications.filter((a) => a.status === "selected").length,
    rejected: applications.filter((a) => a.status === "rejected").length,
    reviewed: applications.filter((a) => a.status === "reviewed").length,
  };

  return (
    <>
      {/* ✨ PREMIUM BACKGROUND GLOWS */}
      <motion.div
        animate={{ x: [0, 100, 0], y: [0, -50, 0] }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        className="fixed -top-40 -left-40 w-[600px] h-[600px] bg-indigo-500/20 rounded-full blur-[150px] -z-10"
      />
      <motion.div
        animate={{ x: [0, -100, 0], y: [0, 60, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        className="fixed -bottom-40 -right-40 w-[600px] h-[600px] bg-purple-500/20 rounded-full blur-[160px] -z-10"
      />

      <section className="min-h-screen bg-gradient-to-b from-slate-950 via-indigo-950 to-purple-950 px-6 py-16 mt-[90px]">
        
        {/* ✨ DASHBOARD CONTAINER */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, type: "spring", stiffness: 90 }}
          className="max-w-6xl mx-auto"
        >

          {/* ✨ HEADER */}
          <h1 className="text-5xl font-extrabold mb-10 text-center bg-gradient-to-r from-indigo-300 to-purple-300 bg-clip-text text-transparent drop-shadow-lg">
            Welcome, {user.name || "Candidate"}
          </h1>

          {/* ✨ STATS CARDS */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <StatCard title="Total Applied" value={stats.applied} icon={<FiBriefcase />} />
            <StatCard title="Reviewed" value={stats.reviewed} icon={<FiClock />} />
            <StatCard title="Selected" value={stats.selected} icon={<FiCheckCircle />} />
            <StatCard title="Rejected" value={stats.rejected} icon={<FiXCircle />} />
          </div>

          {/* ✨ SEARCH */}
          <div className="relative max-w-lg mx-auto mb-10">
            <FiSearch className="absolute top-4 left-5 text-white/70 text-xl" />
            <input
              placeholder="Search applications..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-white/10 border border-white/20 rounded-full py-3 pl-14 pr-4 text-white placeholder-white/40 shadow-lg outline-none focus:ring-2 focus:ring-indigo-400 transition"
            />
          </div>

          {/* ✨ JOB APPLICATION CARDS */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {visibleApplications.map((app) => (
              <motion.div
                key={app.id}
                whileHover={{ y: -8, scale: 1.02 }}
                transition={{ duration: 0.3 }}
                className="relative bg-white/10 backdrop-blur-2xl border border-white/20 rounded-3xl p-6 shadow-[0_20px_80px_rgba(79,70,229,0.25)] hover:shadow-[0_25px_90px_rgba(99,102,241,0.35)]"
              >
                {/* Glow overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 rounded-3xl blur-xl opacity-0 hover:opacity-100 transition pointer-events-none" />

                <h3 className="relative font-black text-2xl text-white mb-1">
                  {app.title || app.job_title}
                </h3>

                <p className="relative text-sm font-semibold text-indigo-300">🏢 {app.company}</p>
                <p className="relative text-xs text-white/70">📍 {app.location}</p>

                <div className="relative flex gap-3 mt-3">
                  <StatusBadge status={app.status} />
                  <span className="text-[10px] bg-white/20 text-white px-2 py-1 rounded-full">
                    {new Date(app.applied_at).toDateString()}
                  </span>
                </div>

                <p className="relative text-xs text-white/80 mt-4">
                  {app.description || "No job description provided"}
                </p>
              </motion.div>
            ))}
          </motion.div>

        </motion.div>
      </section>

      {/* FOOTER (existing import used, not removed) */}
      <Footer />
    </>
  );
}

function StatCard({ title, value, icon }) {
  return (
    <motion.div
      whileHover={{ y: -5, scale: 1.03 }}
      className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-5 shadow-xl flex flex-col gap-2 transition"
    >
      <div className="text-2xl text-indigo-300">{icon}</div>
      <p className="text-sm font-semibold text-white/70">{title}</p>
      <p className="text-3xl font-black text-white">{value}</p>
    </motion.div>
  );
}

function StatusBadge({ status }) {
  const styles = {
    applied: "bg-blue-500/10 text-blue-400 border border-blue-400/20",
    reviewed: "bg-yellow-500/10 text-yellow-400 border border-yellow-400/20",
    selected: "bg-green-500/10 text-green-400 border border-green-400/20",
    rejected: "bg-red-500/10 text-red-400 border border-red-400/20",
  };

  return (
    <span className={`text-xs px-3 py-1 rounded-full font-bold ${styles[status] || styles.applied}`}>
      {status.toUpperCase()}
    </span>
  );
}
