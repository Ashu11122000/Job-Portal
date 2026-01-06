import { useEffect, useState } from "react";
import { getAllJobs, getJobById } from "../../api/jobApi";
import { getMyApplications } from "../../api/applicationApi";
import { uploadResume, uploadAvatar } from "../../api/uploadApi";
import { getAnalyticsSummary, getJobStats, getApplicationStats } from "../../api/analyticsApi";
import { useAuthContext } from "../../context/AuthContext";
import { motion } from "framer-motion";
import Footer from "../../components/layout/Footer";
import { FiBriefcase, FiCheckCircle, FiXCircle, FiClock, FiMapPin, FiSearch, FiUpload, FiUser } from "react-icons/fi";

export default function CandidateDashboard() {
  const auth = useAuthContext();
  const user = auth?.user || {};

  const [applications, setApplications] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [analytics, setAnalytics] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [selectedJob, setSelectedJob] = useState(null);
  const [jobModal, setJobModal] = useState(false);

  useEffect(() => {
    if (!user.id) return;

    const fetchData = async () => {
      try {
        setLoading(true);

        const [appRes, jobRes, a1, a2, a3] = await Promise.all([
          getMyApplications(user.id),
          getAllJobs(),
          getAnalyticsSummary(),
          getJobStats(),
          getApplicationStats(),
        ]);

        setApplications(appRes.data?.data || []);
        setJobs(jobRes.data?.data || []);
        setAnalytics({
          summary: a1.data,
          jobStats: a2.data,
          appStats: a3.data,
        });
      } catch (err) {
        console.error(err);
        setError("Failed to load dashboard data.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user.id]);

  const openJobDetails = async (id) => {
    try {
      const res = await getJobById(id);
      setSelectedJob(res.data?.data || {});
      setJobModal(true);
    } catch {
      alert("Failed to load job details");
    }
  };

  const stats = {
    applied: applications.length,
    selected: applications.filter((a) => a.status === "selected").length,
    rejected: applications.filter((a) => a.status === "rejected").length,
    reviewed: applications.filter((a) => a.status === "reviewed").length,
  };

  const visibleApplications = applications.filter((app) => {
    const t = (app.title || app.job_title || "").toLowerCase();
    const c = (app.company || "").toLowerCase();
    return t.includes(search.toLowerCase()) || c.includes(search.toLowerCase());
  });

  const handleResumeUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    try {
      await uploadResume(file);
      alert("Resume uploaded successfully!");
    } catch {
      alert("Resume upload failed");
    }
  };

  const handleAvatarUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    try {
      await uploadAvatar(file);
      alert("Profile image uploaded!");
    } catch {
      alert("Avatar upload failed");
    }
  };

  return (
    <>
      <section className="min-h-screen bg-gradient-to-b from-slate-950 via-indigo-950 to-purple-950 px-6 py-16 mt-[90px]">
        <motion.div className="max-w-6xl mx-auto">

          {/* HEADER */}
          <h1 className="text-5xl font-extrabold mb-10 text-center text-white">
            Welcome, {user.name || "Candidate"}
          </h1>

          {/* PROFILE UPLOAD SECTION */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-4 mb-8 backdrop-blur-lg shadow-lg flex justify-between items-center">
            <div>
              <p className="text-white/50 text-sm">Profile</p>
              <p className="text-xl font-bold text-white">{user.name}</p>
            </div>

            <div className="flex gap-3">
              <label className="bg-indigo-600 px-4 py-2 rounded-xl cursor-pointer text-sm font-semibold flex items-center gap-2">
                <FiUser /> Upload Avatar
                <input type="file" onChange={handleAvatarUpload} hidden />
              </label>

              <label className="bg-purple-600 px-4 py-2 rounded-xl cursor-pointer text-sm font-semibold flex items-center gap-2">
                <FiUpload /> Upload Resume
                <input type="file" onChange={handleResumeUpload} hidden />
              </label>
            </div>
          </div>

          {/* STATS */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <StatCard title="Total Applied" value={stats.applied} icon={<FiBriefcase />} />
            <StatCard title="Reviewed" value={stats.reviewed} icon={<FiClock />} />
            <StatCard title="Selected" value={stats.selected} icon={<FiCheckCircle />} />
            <StatCard title="Rejected" value={stats.rejected} icon={<FiXCircle />} />
          </div>

          {/* ANALYTICS CHART UI */}
          <div className="bg-white/5 border border-white/10 rounded-3xl p-6 mb-12 shadow-xl backdrop-blur-lg">
            <h2 className="text-2xl font-bold text-white mb-4">Analytics Summary</h2>
            <div className="flex justify-around text-sm text-white/60">
              <span>Jobs: {analytics.jobStats?.total || 0}</span>
              <span>Applications: {analytics.appStats?.total || 0}</span>
              <span>Shortlisted: {analytics.appStats?.selected || 0}</span>
            </div>
          </div>

          {/* SEARCH */}
          <div className="relative max-w-lg mx-auto mb-10">
            <FiSearch className="absolute top-4 left-5 text-white/70 text-xl" />
            <input
              placeholder="Search applications..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-white/10 border border-white/20 rounded-full py-3 pl-14 pr-4 text-white placeholder-white/40 shadow-lg outline-none focus:ring-2 focus:ring-indigo-400 transition"
            />
          </div>

          {/* JOB LIST UI INSIDE DASHBOARD */}
          <div className="mb-16">
            <h2 className="text-3xl font-black text-white mb-6">Latest Jobs</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {jobs.map(job => (
                <motion.div
                  key={job.id}
                  whileHover={{ y: -6, scale: 1.02 }}
                  onClick={() => openJobDetails(job.id)}
                  className="bg-black/40 border border-white/10 rounded-2xl p-6 cursor-pointer shadow-xl backdrop-blur-lg"
                >
                  <h3 className="text-xl font-extrabold text-white mb-2">{job.title}</h3>
                  <p className="text-indigo-300 text-sm font-semibold flex items-center gap-1">
                    <FiBriefcase /> {job.company}
                  </p>
                  <p className="text-white/60 text-xs flex items-center gap-1">
                    <FiMapPin /> {job.location}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* APPLICATION CARDS */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {!loading && visibleApplications.length === 0 && (
              <div className="col-span-full text-center text-white/40 text-xl font-semibold mt-10 flex flex-col items-center gap-2">
                <FiSearch size={40} />
                No applications found.
              </div>
            )}

            {visibleApplications.map((app) => (
              <motion.div
                key={app.id}
                whileHover={{ y: -8, scale: 1.03 }}
                className="bg-white/10 border border-white/20 rounded-3xl p-6 shadow-2xl backdrop-blur-xl"
              >
                <h3 className="font-black text-2xl text-white mb-1">
                  {app.title || app.job_title}
                </h3>

                <p className="text-indigo-300 text-sm font-semibold flex items-center gap-1 mb-2">
                  <FiBriefcase /> {app.company}
                </p>

                <p className="text-white/60 text-xs flex items-center gap-1 mb-3">
                  <FiMapPin /> {app.location}
                </p>

                <div className="flex gap-3 mt-3">
                  <StatusBadge status={app.status} />
                  <span className="text-[10px] bg-white/20 text-white px-2 py-1 rounded-full">
                    {new Date(app.applied_at).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                  </span>
                </div>

                <p className="text-xs text-white/80 mt-4">
                  {app.description || "No job description provided"}
                </p>
              </motion.div>
            ))}
          </div>

        </motion.div>
      </section>

      {/* JOB DETAILS MODAL */}
      {jobModal && selectedJob && (
        <div className="fixed inset-0 bg-black/70 flex justify-center items-center z-50 p-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-br from-indigo-900 to-purple-900 border border-white/10 rounded-3xl p-8 max-w-xl w-full shadow-2xl backdrop-blur-xl"
          >
            <h2 className="text-3xl font-black text-white mb-3">{selectedJob.title}</h2>
            <p className="text-indigo-300 font-semibold flex items-center gap-1 mb-2">
              <FiBriefcase /> {selectedJob.company}
            </p>
            <p className="text-white/60 text-sm mb-4 flex items-center gap-1">
              <FiMapPin /> {selectedJob.location}
            </p>
            <p className="text-white/80 text-sm mb-6">{selectedJob.description}</p>

            <button
              onClick={() => setJobModal(false)}
              className="bg-white/10 border border-white/20 px-4 py-2 rounded-xl text-sm font-semibold text-white hover:scale-105 transition"
            >
              Close
            </button>
          </motion.div>
        </div>
      )}

      {/* FOOTER */}
      <Footer />
    </>
  );
}

function StatCard({ title, value, icon }) {
  return (
    <motion.div
      whileHover={{ y: -5, scale: 1.05 }}
      className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-5 shadow-xl flex flex-col gap-2 transition"
    >
      <div className="text-2xl text-indigo-300">{icon}</div>
      <p className="text-sm font-semibold text-white/70">{title}</p>
      <p className="text-3xl font-black text-white">{value}</p>
    </motion.div>
  );
}
