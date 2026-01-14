// src/components/applications/MyApplications.jsx
import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { getMyApplications } from "../../api/applicationApi";
import { useAuthContext } from "../../context/AuthContext";
import ApplicationCard from "../cards/ApplicationCard";
import {
  FiSearch,
  FiInbox,
  FiBriefcase,
  FiClock,
  FiCheckCircle,
  FiXCircle,
} from "react-icons/fi";

export default function MyApplications() {
  const { user } = useAuthContext();
  const [applications, setApplications] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  /* ================= FETCH DATA ================= */
  useEffect(() => {
    if (!user?.id) return;

    setLoading(true);
    getMyApplications(user.id)
      .then((res) => {
        setApplications(res.data?.applications || []);
      })
      .catch((err) => {
        console.error("❌ Fetch Applications Error:", err);
      })
      .finally(() => setLoading(false));
  }, [user?.id]);

  /* ================= DERIVED DATA ================= */
  const filteredApplications = useMemo(() => {
    return applications.filter((app) =>
      (app.job_title || "")
        .toLowerCase()
        .includes(search.toLowerCase())
    );
  }, [applications, search]);

  const stats = useMemo(() => {
    return {
      applied: applications.length,
      pending: applications.filter((a) => a.status === "pending").length,
      selected: applications.filter((a) => a.status === "selected").length,
      rejected: applications.filter((a) => a.status === "rejected").length,
    };
  }, [applications]);

  /* ================= UI ================= */
  return (
    <section className="bg-gradient-to-b from-slate-950 via-indigo-950 to-purple-950 py-24">
      <div className="max-w-7xl mx-auto px-6 text-white">

        {/* ================= HEADER ================= */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-14"
        >
          <h1 className="text-5xl font-extrabold mb-4">
            My Applications
          </h1>
          <p className="text-white/60 max-w-2xl">
            Track all the jobs you’ve applied for, monitor their progress,
            and stay one step ahead in your career journey.
          </p>
        </motion.div>

        {/* ================= STATS ================= */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-14">
          <StatCard icon={<FiBriefcase />} label="Applied" value={stats.applied} />
          <StatCard icon={<FiClock />} label="Pending" value={stats.pending} />
          <StatCard icon={<FiCheckCircle />} label="Selected" value={stats.selected} />
          <StatCard icon={<FiXCircle />} label="Rejected" value={stats.rejected} />
        </div>

        {/* ================= SEARCH ================= */}
        <div className="relative max-w-md mb-12">
          <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by job title..."
            className="w-full pl-12 pr-4 py-3 rounded-2xl
              bg-white/10 border border-white/20
              focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* ================= CONTENT ================= */}
        {loading ? (
          <p className="text-white/60">Loading your applications...</p>
        ) : filteredApplications.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white/5 border border-white/10
              rounded-3xl p-14 text-center"
          >
            <FiInbox className="mx-auto text-5xl mb-6 text-white/40" />
            <p className="text-white/60 text-lg">
              No applications found.
            </p>
          </motion.div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredApplications.map((app, index) => (
              <motion.div
                key={app.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <ApplicationCard application={app} />
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

/* ================= STAT CARD ================= */
function StatCard({ icon, label, value }) {
  return (
    <motion.div
      whileHover={{ y: -6, scale: 1.04 }}
      className="bg-white/10 backdrop-blur-xl
        border border-white/20 rounded-3xl
        p-6 shadow-xl"
    >
      <div className="text-3xl text-indigo-300 mb-2">{icon}</div>
      <p className="text-sm text-white/60">{label}</p>
      <p className="text-3xl font-black">{value}</p>
    </motion.div>
  );
}
