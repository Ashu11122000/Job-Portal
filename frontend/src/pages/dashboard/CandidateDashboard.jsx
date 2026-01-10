import { useEffect, useState } from "react";
import { getAllJobs, getJobById } from "../../api/jobApi";
import { getMyApplications } from "../../api/applicationApi";
import { uploadResume, uploadAvatar } from "../../api/uploadApi";
import { getAnalyticsSummary, getJobStats, getApplicationStats } from "../../api/analyticsApi";
import { useAuthContext } from "../../context/AuthContext";
import { motion } from "framer-motion";
import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";
import { FiBriefcase, FiCheckCircle, FiXCircle, FiClock, FiMapPin, FiSearch, FiUpload, FiUser, FiAward, FiStar, FiLink } from "react-icons/fi";

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

  // ===== DUMMY STATIC DATA (NO APIs NEEDED) =====
  const dummyProfile = {
    role: "Frontend Developer",
    location: "India",
    experience: "Fresher",
    strength: 82,
    bio: "Building pixel-perfect UIs with ReactJS, TailwindCSS, and smooth animations.",
  };

  const dummySkills = [
    { name: "React JS", level: 90 },
    { name: "JavaScript", level: 95 },
    { name: "Tailwind CSS", level: 85 },
    { name: "UI/UX Sense", level: 80 },
    { name: "Problem Solving", level: 75 },
    { name: "Framer Motion", level: 88 },
  ];

  const dummyBadges = [
    "React Mastery",
    "Top 5% UI Designer",
    "100+ Apps Applied",
    "Resume Verified",
    "Hackathon Winner",
    "MERN Ready",
  ];

  const dummyPortfolio = [
    { title: "Portfolio Website", link: "#", desc: "Personal portfolio with animations" },
    { title: "Admin Panel UI", link: "#", desc: "Dashboard with glassmorphism" },
    { title: "E-Commerce Frontend", link: "#", desc: "High-end responsive UI" },
  ];

  const dummyInterviews = [
    { company: "Google", role: "Frontend Dev", date: "18 Jan 2026" },
    { company: "AALion's Infotech", role: "React Dev", date: "25 Jan 2026" },
  ];

  const dummyActivity = [
    { text: "Uploaded Resume", date: "2 Jan 2026" },
    { text: "Completed Mock Interview", date: "28 Dec 2025" },
    { text: "Applied to 3 new jobs", date: "6 Jan 2026" },
    { text: "Portfolio Updated", date: "7 Jan 2026" },
  ];

  const dummySalary = "₹4,00,000 – ₹7,00,000 / year (static estimate)";
  const dummyLevel = "Platinum";
  const dummyXP = 1580;
  // ============================================

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
    try { await uploadResume(file); alert("Resume uploaded successfully!"); }
    catch { alert("Resume upload failed"); }
  };

  const handleAvatarUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    try { await uploadAvatar(file); alert("Profile image uploaded!"); }
    catch { alert("Avatar upload failed"); }
  };

  return (
    <>
      <Navbar />

      <div className="pt-20 bg-gradient-to-b from-slate-950 via-indigo-950 to-purple-950 min-h-screen">
        <section className="px-6 py-10">
          <motion.div className="max-w-6xl mx-auto">

            {/* HEADER */}
            <h1 className="text-5xl font-extrabold mb-10 text-center text-white">
              Welcome, {user.name || "Candidate"}
            </h1>

            {/* EXISTING PROFILE UPLOAD BAR */}
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

            {/* EXISTING STATS */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              <StatCard title="Total Applied" value={stats.applied} icon={<FiBriefcase />} />
              <StatCard title="Reviewed" value={stats.reviewed} icon={<FiClock />} />
              <StatCard title="Selected" value={stats.selected} icon={<FiCheckCircle />} />
              <StatCard title="Rejected" value={stats.rejected} icon={<FiXCircle />} />
            </div>

            {/* EXISTING ANALYTICS */}
            <div className="bg-white/5 border border-white/10 rounded-3xl p-6 mb-12 shadow-xl backdrop-blur-lg">
              <h2 className="text-2xl font-bold text-white mb-4">Analytics Summary</h2>
              <div className="flex justify-around text-sm text-white/60">
                <span>Jobs: {analytics.jobStats?.total || 0}</span>
                <span>Applications: {analytics.appStats?.total || 0}</span>
                <span>Shortlisted: {analytics.appStats?.selected || 0}</span>
              </div>
            </div>

            {/* ===== NEW PREMIUM STATIC SECTIONS ===== */}

            {/* PROFILE OVERVIEW */}
            <motion.div whileHover={{y:-4}} className="bg-black/30 border border-white/10 rounded-3xl p-6 mb-10 backdrop-blur-xl shadow-2xl">
              <h2 className="text-2xl font-black text-white mb-2 flex items-center gap-2"><FiStar /> {dummyProfile.role}</h2>
              <p className="text-white/70 text-xs flex items-center gap-1"><FiMapPin /> {dummyProfile.location} • {dummyProfile.experience}</p>
              <p className="text-white/80 text-sm mt-3">{dummyProfile.bio}</p>
              <div className="mt-4">
                <div className="flex justify-between text-white/60 text-xs mb-1"><span>Profile Strength</span><span>{dummyProfile.strength}%</span></div>
                <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden">
                  <motion.div animate={{width:dummyProfile.strength+"%"}} transition={{duration:1}} className="h-full rounded-full"></motion.div>
                </div>
              </div>
            </motion.div>

            {/* SKILLS */}
            <h2 className="text-3xl font-black text-white mb-4"><FiClock /> Skills</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-10">
              {dummySkills.map(s=>(
                <motion.div key={s.name} whileHover={{scale:1.05}} className="bg-white/5 border border-white/10 rounded-2xl p-4 shadow-xl backdrop-blur-lg">
                  <p className="text-white font-bold text-sm">{s.name}</p>
                  <p className="text-white/50 text-[10px] mt-1">Level: {s.level}%</p>
                </motion.div>
              ))}
            </div>

            {/* BADGES */}
            <h2 className="text-3xl font-black text-white mb-4"><FiAward /> Achievements</h2>
            <div className="flex flex-wrap gap-3 mb-10">
              {dummyBadges.map(b=>(
                <motion.span key={b} whileHover={{scale:1.1}} className="px-3 py-1 bg-white/10 border border-white/20 rounded-full text-xs text-white shadow-lg">{b}</motion.span>
              ))}
            </div>

            {/* PORTFOLIO */}
            <h2 className="text-3xl font-black text-white mb-4"><FiLink /> Portfolio</h2>
            <div className="grid md:grid-cols-3 gap-4 mb-10">
              {dummyPortfolio.map(p=>(
                <motion.div key={p.title} whileHover={{y:-6,scale:1.03}} className="bg-black/40 border border-white/10 rounded-2xl p-5 shadow-2xl backdrop-blur-lg">
                  <p className="text-white font-bold text-lg">{p.title}</p>
                  <p className="text-white/60 text-xs mt-1">{p.desc}</p>
                  <button className="mt-3 px-3 py-1 rounded-xl text-[10px] border border-indigo-400/30 text-indigo-300">View</button>
                </motion.div>
              ))}
            </div>

            {/* INTERVIEWS */}
            <h2 className="text-3xl font-black text-white mb-4">Interviews</h2>
            <div className="grid md:grid-cols-2 gap-4 mb-10">
              {dummyInterviews.map(i=>(
                <motion.div key={i.company+i.date} whileHover={{x:6}} className="bg-white/10 border border-white/10 rounded-2xl p-4 backdrop-blur-lg shadow-xl flex justify-between">
                  <div>
                    <p className="text-white font-bold">{i.role}</p>
                    <p className="text-indigo-300 text-xs">{i.company}</p>
                    <p className="text-white/50 text-[10px]">{i.date}</p>
                  </div>
                  <button className="px-3 py-1 rounded-xl text-[10px] font-semibold">Join</button>
                </motion.div>
              ))}
            </div>

            {/* ACTIVITY */}
            <h2 className="text-3xl font-black text-white mb-4">Activity</h2>
            <div className="space-y-3 mb-10">
              {dummyActivity.map((a,i)=>(
                <div key={i} className="text-white/70 text-xs border-l-2 pl-2">{a.text} — <span className="text-white/40 text-[10px]">{a.date}</span></div>
              ))}
            </div>

            {/* SALARY */}
            <motion.div whileHover={{scale:1.03}} className="bg-purple-600/10 border border-purple-400/20 rounded-3xl p-6 mb-10 backdrop-blur-xl shadow-2xl text-center">
              <h2 className="text-2xl font-black text-white mb-2">Estimated Salary</h2>
              <p className="text-purple-300 text-sm">{dummySalary}</p>
            </motion.div>

            {/* ====================================== */}

            {/* EXISTING JOB LIST (PRESERVED) */}
            <div className="mb-16">
              <h2 className="text-3xl font-black text-white mb-6">Latest Jobs</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {jobs.map(job => (
                  <motion.div key={job.id} whileHover={{ y: -6, scale: 1.02 }} onClick={() => openJobDetails(job.id)} className="bg-black/40 border border-white/10 rounded-2xl p-6 cursor-pointer shadow-xl backdrop-blur-lg">
                    <h3 className="text-xl font-extrabold text-white mb-2">{job.title}</h3>
                    <p className="text-indigo-300 text-sm font-semibold flex items-center gap-1"><FiBriefcase /> {job.company}</p>
                    <p className="text-white/60 text-xs flex items-center gap-1"><FiMapPin /> {job.location}</p>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* EXISTING APPLICATIONS (PRESERVED) */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {!loading && visibleApplications.length === 0 && (
                <div className="col-span-full text-center text-white/40 text-xl font-semibold mt-10 flex flex-col items-center gap-2">
                  <FiSearch size={40} />No applications found.
                </div>
              )}
              {visibleApplications.map((app) => (
                <motion.div key={app.id} whileHover={{ y: -8, scale: 1.03 }} className="bg-white/10 border border-white/20 rounded-3xl p-6 shadow-2xl backdrop-blur-xl">
                  <h3 className="font-black text-2xl text-white mb-1">{app.title || app.job_title}</h3>
                  <p className="text-indigo-300 text-sm font-semibold flex items-center gap-1 mb-2"><FiBriefcase /> {app.company}</p>
                  <p className="text-white/60 text-xs flex items-center gap-1 mb-3"><FiMapPin /> {app.location}</p>
                  <div className="flex gap-3 mt-3"><StatusBadge status={app.status} />
                    <span className="text-[10px] bg-white/20 text-white px-2 py-1 rounded-full">
                      {new Date(app.applied_at).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                    </span>
                  </div>
                  <p className="text-xs text-white/80 mt-4">{app.description || "No job description provided"}</p>
                </motion.div>
              ))}
            </div>

          </motion.div>
        </section>
      </div>

      <Footer />
    </>
  );
}

function StatCard({ title, value, icon }) {
  return (
    <motion.div whileHover={{ y: -5, scale: 1.05 }} className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-5 shadow-xl flex flex-col gap-2 transition">
      <div className="text-2xl text-indigo-300">{icon}</div>
      <p className="text-sm font-semibold text-white/70">{title}</p>
      <p className="text-3xl font-black text-white">{value}</p>
    </motion.div>
  );
}
