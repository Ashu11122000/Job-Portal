// src/components/applications/MyApplications.jsx
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { getMyApplications } from "../../api/applicationApi";
import { useAuthContext } from "../../context/AuthContext";
import ApplicationCard from "../cards/ApplicationCard";
import { FiSearch, FiInbox } from "react-icons/fi";

export default function MyApplications() {
  const { user } = useAuthContext();
  const [applications, setApplications] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.id) return;

    getMyApplications(user.id)
      .then((res) => setApplications(res.data.applications || []))
      .finally(() => setLoading(false));
  }, [user?.id]);

  const filtered = applications.filter(app =>
    (app.job_title || "").toLowerCase().includes(search.toLowerCase())
  );

  return (
    <section className="bg-gradient-to-b from-purple-950 to-slate-950 py-24">
      <div className="max-w-6xl mx-auto px-6 text-white">

        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-10"
        >
          <h1 className="text-5xl font-extrabold mb-3">My Applications</h1>
          <p className="text-white/60 max-w-2xl">
            Track every opportunity you’ve applied for, monitor progress,
            and stay ahead in your job search.
          </p>
        </motion.div>

        {/* SEARCH */}
        <div className="relative mb-10 max-w-md">
          <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by job title..."
            className="w-full pl-12 pr-4 py-3 rounded-2xl bg-white/10 border border-white/20 focus:outline-none"
          />
        </div>

        {/* CONTENT */}
        {loading ? (
          <p className="text-white/60">Loading applications...</p>
        ) : filtered.length === 0 ? (
          <div className="bg-white/5 border border-white/10 rounded-3xl p-10 text-center">
            <FiInbox className="mx-auto text-4xl mb-4 text-white/40" />
            <p className="text-white/60">
              You haven’t applied to any jobs yet.
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map(app => (
              <ApplicationCard key={app.id} application={app} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
