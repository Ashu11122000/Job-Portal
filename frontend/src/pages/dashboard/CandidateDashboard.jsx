// src/pages/dashboard/CandidateDashboard.jsx
import { useEffect, useState } from "react";
import MyApplications from "../../components/applications/MyApplications";
import { getAllJobs, getJobById } from "../../api/jobApi";
import { getMyApplications } from "../../api/applicationApi";
import { uploadResume, uploadAvatar } from "../../api/uploadApi";
import { getAnalyticsSummary, getJobStats, getApplicationStats } from "../../api/analyticsApi";
import { useAuthContext } from "../../context/AuthContext";
import { motion } from "framer-motion";
import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";
import {
  FiBriefcase, FiCheckCircle, FiXCircle, FiClock, FiMapPin,
  FiUpload, FiUser, FiAward, FiStar
} from "react-icons/fi";

/* ===================== STAT CARD ===================== */
function StatCard({ title, value, icon }) {
  return (
    <motion.div
      whileHover={{ y: -5, scale: 1.05 }}
      className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-5 shadow-xl"
    >
      <div className="text-2xl text-indigo-300">{icon}</div>
      <p className="text-sm text-white/60">{title}</p>
      <p className="text-3xl font-black text-white">{value}</p>
    </motion.div>
  );
}

export default function CandidateDashboard() {
  const { user } = useAuthContext();
  const [applications, setApplications] = useState([]);

  /* ===== STATIC PREMIUM DATA ===== */
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
    if (!user?.id) return;
    getMyApplications(user.id).then((res) =>
      setApplications(res.data?.applications || [])
    );
  }, [user?.id]);

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
            Welcome, {user?.name || "Candidate"}
          </h1>

          {/* PROFILE */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-4 mb-8 flex justify-between">
            <div>
              <p className="text-sm text-white/60">Profile</p>
              <p className="text-xl font-bold">{user?.name}</p>
            </div>
            <div className="flex gap-3">
              <label className="bg-indigo-600 px-4 py-2 rounded-xl cursor-pointer flex items-center gap-2">
                <FiUser /> Avatar
                <input type="file" hidden onChange={uploadAvatar} />
              </label>
              <label className="bg-purple-600 px-4 py-2 rounded-xl cursor-pointer flex items-center gap-2">
                <FiUpload /> Resume
                <input type="file" hidden onChange={uploadResume} />
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

        </section>
      </div>

      {/* ✅ DEDICATED APPLICATIONS PAGE */}
      <MyApplications />

      <Footer />
    </>
  );
}
