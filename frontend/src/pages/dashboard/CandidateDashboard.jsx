import { useEffect, useState } from "react";
import { getAllJobs, getJobById } from "../../api/jobApi";
import { getMyApplications } from "../../api/applicationApi";
import { uploadResume, uploadAvatar } from "../../api/uploadApi";
import { getAnalyticsSummary, getJobStats, getApplicationStats } from "../../api/analyticsApi";
import { useAuthContext } from "../../context/AuthContext";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";
import {
  FiBriefcase, FiCheckCircle, FiXCircle, FiClock, FiMapPin,
  FiSearch, FiUpload, FiUser, FiAward, FiStar, FiLink,
  FiTrash2, FiEdit
} from "react-icons/fi";

/* ===================== STATUS BADGE ===================== */
function StatusBadge({ status }) {
  const colors = {
    selected: "bg-green-500/20 text-green-300 border-green-500/30",
    rejected: "bg-red-500/20 text-red-300 border-red-500/30",
    reviewed: "bg-yellow-500/20 text-yellow-300 border-yellow-500/30",
    applied: "bg-blue-500/20 text-blue-300 border-blue-500/30",
  };
  return (
    <span className={`px-2 py-1 rounded-full border text-[10px] ${colors[status] || colors.applied}`}>
      {status || "applied"}
    </span>
  );
}

/* ===================== STAT CARD ===================== */
function StatCard({ title, value, icon }) {
  return (
    <motion.div whileHover={{ y: -5, scale: 1.05 }} className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-5 shadow-xl">
      <div className="text-2xl text-indigo-300">{icon}</div>
      <p className="text-sm text-white/60">{title}</p>
      <p className="text-3xl font-black text-white">{value}</p>
    </motion.div>
  );
}

export default function CandidateDashboard() {
  const auth = useAuthContext();
  const user = auth?.user || {};

  const [applications, setApplications] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [analytics, setAnalytics] = useState({});
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");

  const [selectedJob, setSelectedJob] = useState(null);
  const [jobModal, setJobModal] = useState(false);

  const [editAppOpen, setEditAppOpen] = useState(false);
  const [selectedApplication, setSelectedApplication] = useState(null);

  /* ===== STATIC PREMIUM DATA (RESTORED) ===== */
  const profile = {
    role: "Frontend Developer",
    location: "India",
    experience: "Fresher",
    strength: 82,
    bio: "Building pixel-perfect UIs with React, Tailwind & Framer Motion.",
  };

  const skills = [
    { name: "React JS", level: 90 },
    { name: "JavaScript", level: 95 },
    { name: "Tailwind CSS", level: 85 },
    { name: "UI/UX", level: 80 },
    { name: "Problem Solving", level: 75 },
  ];

  const badges = ["React Ready", "Resume Verified", "Top 10%", "UI Expert"];
  const salaryEstimate = "₹4 – ₹7 LPA";

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
        setAnalytics({ summary: a1.data, jobStats: a2.data, appStats: a3.data });
      } catch {
        alert("Failed to load dashboard data");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [user.id]);

  const openJobDetails = async (id) => {
    const res = await getJobById(id);
    setSelectedJob(res.data?.data || {});
    setJobModal(true);
  };

  const handleWithdrawApplication = (id) => {
    if (!window.confirm("Withdraw this application?")) return;
    setApplications(applications.filter(a => a.id !== id));
  };

  const handleEditApplication = (app) => {
    setSelectedApplication(app);
    setEditAppOpen(true);
  };

  const handleUpdateApplication = (e) => {
    e.preventDefault();
    setApplications(applications.map(a =>
      a.id === selectedApplication.id ? selectedApplication : a
    ));
    setEditAppOpen(false);
  };

  const visibleApplications = applications.filter((app) =>
    (app.title || app.job_title || "").toLowerCase().includes(search.toLowerCase())
  );

  const handleResumeUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    await uploadResume(file);
    alert("Resume uploaded");
  };

  const handleAvatarUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    await uploadAvatar(file);
    alert("Avatar uploaded");
  };

  const stats = {
    applied: applications.length,
    selected: applications.filter(a => a.status === "selected").length,
    rejected: applications.filter(a => a.status === "rejected").length,
    reviewed: applications.filter(a => a.status === "reviewed").length,
  };

  return (
    <>
      <Navbar />

      <div className="pt-20 bg-gradient-to-b from-slate-950 via-indigo-950 to-purple-950 min-h-screen">
        <section className="px-6 py-10 max-w-6xl mx-auto text-white">

          <h1 className="text-5xl font-extrabold mb-10 text-center">
            Welcome, {user.name || "Candidate"}
          </h1>

          {/* PROFILE UPLOAD */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-4 mb-8 flex justify-between">
            <div>
              <p className="text-sm text-white/60">Profile</p>
              <p className="text-xl font-bold">{user.name}</p>
            </div>
            <div className="flex gap-3">
              <label className="bg-indigo-600 px-4 py-2 rounded-xl cursor-pointer flex items-center gap-2">
                <FiUser /> Avatar
                <input type="file" hidden onChange={handleAvatarUpload} />
              </label>
              <label className="bg-purple-600 px-4 py-2 rounded-xl cursor-pointer flex items-center gap-2">
                <FiUpload /> Resume
                <input type="file" hidden onChange={handleResumeUpload} />
              </label>
            </div>
          </div>

          {/* STATS */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <StatCard title="Applied" value={stats.applied} icon={<FiBriefcase />} />
            <StatCard title="Reviewed" value={stats.reviewed} icon={<FiClock />} />
            <StatCard title="Selected" value={stats.selected} icon={<FiCheckCircle />} />
            <StatCard title="Rejected" value={stats.rejected} icon={<FiXCircle />} />
          </div>

          {/* PROFILE OVERVIEW */}
          <div className="bg-black/30 border border-white/10 rounded-3xl p-6 mb-10">
            <h2 className="text-2xl font-black flex items-center gap-2">
              <FiStar /> {profile.role}
            </h2>
            <p className="text-white/60 text-sm flex items-center gap-1">
              <FiMapPin /> {profile.location} • {profile.experience}
            </p>
            <p className="mt-3 text-white/80">{profile.bio}</p>

            <div className="mt-4">
              <div className="flex justify-between text-xs text-white/60 mb-1">
                <span>Profile Strength</span>
                <span>{profile.strength}%</span>
              </div>
              <div className="w-full bg-white/10 h-2 rounded-full">
                <motion.div
                  animate={{ width: profile.strength + "%" }}
                  className="h-full bg-indigo-500 rounded-full"
                />
              </div>
            </div>
          </div>

          {/* SKILLS */}
          <h2 className="text-3xl font-black mb-4">Skills</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-10">
            {skills.map(s => (
              <div key={s.name} className="bg-white/5 border border-white/10 rounded-2xl p-4">
                <p className="font-bold">{s.name}</p>
                <p className="text-xs text-white/50">Level: {s.level}%</p>
              </div>
            ))}
          </div>

          {/* BADGES */}
          <h2 className="text-3xl font-black mb-4">Achievements</h2>
          <div className="flex flex-wrap gap-3 mb-10">
            {badges.map(b => (
              <span key={b} className="px-3 py-1 bg-white/10 rounded-full text-xs">
                <FiAward className="inline mr-1" /> {b}
              </span>
            ))}
          </div>

          {/* SALARY */}
          <div className="bg-purple-600/10 border border-purple-400/20 rounded-3xl p-6 text-center mb-12">
            <h2 className="text-2xl font-black">Estimated Salary</h2>
            <p className="text-purple-300">{salaryEstimate}</p>
          </div>

          {/* APPLICATIONS */}
          <h2 className="text-3xl font-black mb-6">My Applications</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {visibleApplications.map(app => (
              <motion.div key={app.id} className="bg-white/10 rounded-3xl p-6">
                <h3 className="font-black text-xl">{app.title || app.job_title}</h3>
                <p className="text-sm text-indigo-300">
                  <FiBriefcase /> {app.company}
                </p>
                <StatusBadge status={app.status} />
                <p className="text-xs mt-3">{app.description || "No description"}</p>

                <div className="flex gap-3 mt-4">
                  <button onClick={() => handleEditApplication(app)} className="flex-1 bg-yellow-500 py-2 rounded-xl font-bold">
                    <FiEdit /> Update
                  </button>
                  <button onClick={() => handleWithdrawApplication(app.id)} className="flex-1 bg-red-600 py-2 rounded-xl font-bold">
                    <FiTrash2 /> Withdraw
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      </div>

      {/* EDIT APPLICATION MODAL */}
      <AnimatePresence>
        {editAppOpen && (
          <motion.form onSubmit={handleUpdateApplication} className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
            <div className="bg-slate-900 p-8 rounded-3xl w-full max-w-lg space-y-4">
              <h2 className="text-2xl font-black">Update Application</h2>
              <textarea
                className="w-full p-3 rounded-xl text-black"
                value={selectedApplication?.description || ""}
                onChange={(e) =>
                  setSelectedApplication({ ...selectedApplication, description: e.target.value })
                }
              />
              <div className="flex gap-3">
                <button className="flex-1 bg-green-600 py-3 rounded-xl font-black">Save</button>
                <button type="button" onClick={() => setEditAppOpen(false)} className="flex-1 bg-gray-600 py-3 rounded-xl font-black">
                  Cancel
                </button>
              </div>
            </div>
          </motion.form>
        )}
      </AnimatePresence>

      <Footer />
    </>
  );
}
