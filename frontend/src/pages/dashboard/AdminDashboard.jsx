import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";
import SettingAPI from "../../api/settingsApi.js";
import {
  FiBriefcase,
  FiTrash2,
  FiPlusCircle,
  FiUsers,
  FiShield,
  FiClipboard,
  FiRefreshCw,
  FiUserCheck,
  FiEdit,
  FiActivity,
  FiSettings
} from "react-icons/fi";
import { getAllJobs } from "../../api/jobApi";
import { useAuthContext } from "../../context/AuthContext.jsx";

/* ===================== ADMIN COUNTER CARD ===================== */
function AdminCounterCard({ title, value, icon }) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="bg-gradient-to-br from-indigo-700/20 to-purple-700/20 border border-white/10 rounded-3xl p-6 shadow-2xl backdrop-blur-xl"
    >
      <div className="text-4xl text-indigo-300 mb-3">{icon}</div>
      <p className="text-xs uppercase font-bold text-white/60">{title}</p>
      <p className="text-3xl font-black text-white">{value}</p>
    </motion.div>
  );
}

/* ===================== LATEST APPLICANTS ===================== */
function LatestApplicants({ applications }) {
  const latest = Array.isArray(applications) ? applications.slice(0, 5) : [];

  return (
    <motion.div className="bg-black/40 border border-white/10 rounded-3xl p-6 shadow-2xl mb-12 text-white">
      <h2 className="text-2xl font-black mb-4 flex items-center gap-2">
        <FiUserCheck /> Latest 5 Applicants
      </h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-3">
        {latest.map((app) => (
          <div
            key={app.id}
            className="bg-white/10 border border-white/10 rounded-2xl p-4 text-sm"
          >
            <p className="font-black">{app.candidate_name || "N/A"}</p>
            <p className="text-[10px] opacity-70">
              {app.job_title || "N/A"}
            </p>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

/* ===================== ADMIN DASHBOARD ===================== */
export default function AdminDashboard() {
  const auth = useAuthContext();
  const user = auth?.user || {};

  const [jobs, setJobs] = useState([]);
  const [applications] = useState([]); // preserved as-is
  const [accordionOpen, setAccordionOpen] = useState(false);

  const [editOpen, setEditOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);

  /* ===== RESTORED STATES ===== */
  const [settings, setSettings] = useState([]);
  const [logs, setLogs] = useState([]);

  const [newJob, setNewJob] = useState({
    title: "",
    company: "",
    location: "",
    salary: "",
    description: "",
  });

  useEffect(() => {
    fetchJobs();
    fetchSettings();
    fetchLogs();
  }, []);

  const fetchJobs = async () => {
    const res = await getAllJobs();
    setJobs(res.data?.data || []);
  };

  /* ===================== SETTINGS (RESTORED) ===================== */
  const fetchSettings = async () => {
    try {
      if (SettingAPI?.getAllSettings) {
        const res = await SettingAPI.getAllSettings();
        setSettings(res.data?.settings || []);
      }
    } catch {
      console.warn("⚠ Settings API not available");
    }
  };

  /* ===================== SYSTEM LOGS (RESTORED) ===================== */
  const fetchLogs = async () => {
    try {
      if (SettingAPI?.getLogs) {
        const res = await SettingAPI.getLogs();
        setLogs(res.data?.logs || []);
      }
    } catch {
      console.warn("⚠ Logs API not available");
    }
  };

  /* ===================== ADD JOB ===================== */
  const handleCreateJobUI = (e) => {
    e.preventDefault();
    setJobs([{ id: Date.now(), ...newJob }, ...jobs]);
    setNewJob({
      title: "",
      company: "",
      location: "",
      salary: "",
      description: "",
    });
    setAccordionOpen(false);
  };

  /* ===================== DELETE JOB ===================== */
  const handleDeleteJob = (id) => {
    if (!window.confirm("Delete this job?")) return;
    setJobs(jobs.filter((job) => job.id !== id));
  };

  /* ===================== EDIT JOB ===================== */
  const handleEditJob = (job) => {
    setSelectedJob(job);
    setEditOpen(true);
  };

  const handleUpdateJob = (e) => {
    e.preventDefault();
    setJobs(
      jobs.map((j) => (j.id === selectedJob.id ? selectedJob : j))
    );
    setEditOpen(false);
  };

  return (
    <>
      <Navbar />

      <div className="pt-[90px] bg-slate-900 min-h-screen">
        <section className="bg-gradient-to-br from-slate-900 to-purple-900 p-8 pt-32 text-white">

          {/* HEADER */}
          <div className="mb-10 flex justify-between items-center">
            <h1 className="text-5xl font-black flex items-center gap-3">
              <FiShield /> Admin Job Dashboard
            </h1>

            <div className="flex gap-4">
              <button
                onClick={() => setAccordionOpen(!accordionOpen)}
                className="flex items-center gap-2 px-5 py-3 bg-indigo-600 rounded-xl font-bold shadow-lg"
              >
                <FiPlusCircle /> Add Job
              </button>

              <button
                onClick={() => {
                  fetchJobs();
                  fetchSettings();
                  fetchLogs();
                }}
                className="p-4 bg-indigo-600/20 rounded-full text-2xl"
              >
                <FiRefreshCw />
              </button>
            </div>
          </div>

          {/* ADD JOB FORM */}
          <AnimatePresence>
            {accordionOpen && (
              <motion.form
                onSubmit={handleCreateJobUI}
                className="mb-12 p-8 rounded-3xl bg-white/10 border border-white/20 grid md:grid-cols-2 gap-4"
              >
                {["title", "company", "location", "salary"].map((field) => (
                  <input
                    key={field}
                    placeholder={field}
                    className="p-3 rounded-xl text-black"
                    value={newJob[field]}
                    onChange={(e) =>
                      setNewJob({ ...newJob, [field]: e.target.value })
                    }
                  />
                ))}
                <textarea
                  placeholder="Description"
                  className="p-3 rounded-xl text-black md:col-span-2"
                  value={newJob.description}
                  onChange={(e) =>
                    setNewJob({ ...newJob, description: e.target.value })
                  }
                />
                <button className="md:col-span-2 bg-green-600 py-3 rounded-xl font-black">
                  Create Job
                </button>
              </motion.form>
            )}
          </AnimatePresence>

          {/* COUNTERS */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <AdminCounterCard title="Total Jobs" value={jobs.length} icon={<FiBriefcase />} />
            <AdminCounterCard title="Candidates" value={120} icon={<FiUsers />} />
            <AdminCounterCard title="Recruiters" value={8} icon={<FiShield />} />
            <AdminCounterCard title="Applications" value={applications.length} icon={<FiClipboard />} />
          </div>

          {/* JOB LIST */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {jobs.map((job) => (
              <motion.div
                key={job.id}
                whileHover={{ scale: 1.03 }}
                className="p-6 rounded-3xl bg-white/10 border border-white/20 shadow-xl"
              >
                <h3 className="text-xl font-black">{job.title}</h3>
                <p className="text-sm opacity-70">
                  {job.company} • {job.location}
                </p>
                <p className="mt-2 font-semibold">₹{job.salary} LPA</p>

                <div className="flex gap-3 mt-4">
                  <button
                    onClick={() => handleEditJob(job)}
                    className="flex-1 flex items-center justify-center gap-1 bg-yellow-500 py-2 rounded-xl font-bold"
                  >
                    <FiEdit /> Edit
                  </button>
                  <button
                    onClick={() => handleDeleteJob(job.id)}
                    className="flex-1 flex items-center justify-center gap-1 bg-red-600 py-2 rounded-xl font-bold"
                  >
                    <FiTrash2 /> Delete
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

          <LatestApplicants applications={applications} />

          {/* SETTINGS SECTION (RESTORED) */}
          <motion.div className="bg-black/40 border border-white/10 rounded-3xl p-6 shadow-2xl mb-12">
            <h2 className="text-xl font-black flex items-center gap-2 mb-4">
              <FiSettings /> Platform Settings
            </h2>
            {settings.length ? (
              settings.map((s, i) => (
                <p key={i} className="text-sm opacity-80">
                  {s.key}: {s.value}
                </p>
              ))
            ) : (
              <p className="text-sm opacity-60">No settings found</p>
            )}
          </motion.div>

          {/* SYSTEM LOGS (RESTORED) */}
          <motion.div className="bg-black/60 border border-white/10 rounded-3xl p-6 shadow-2xl">
            <h2 className="text-xl font-black flex items-center gap-2 mb-4">
              <FiActivity /> System Activity Logs
            </h2>
            <div className="max-h-60 overflow-auto space-y-2">
              {logs.length ? (
                logs.map((l, i) => (
                  <p key={i} className="text-sm opacity-80">
                    [{l.time || "—"}] {l.message || l.msg}
                  </p>
                ))
              ) : (
                <p className="text-sm opacity-60">No logs available</p>
              )}
            </div>
          </motion.div>

        </section>
      </div>

      {/* EDIT MODAL */}
      <AnimatePresence>
        {editOpen && (
          <motion.form
            onSubmit={handleUpdateJob}
            className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
          >
            <div className="bg-slate-900 p-8 rounded-3xl w-full max-w-lg space-y-4">
              <h2 className="text-2xl font-black">Edit Job</h2>

              {["title", "company", "location", "salary"].map((field) => (
                <input
                  key={field}
                  className="w-full p-3 rounded-xl text-black"
                  value={selectedJob[field]}
                  onChange={(e) =>
                    setSelectedJob({
                      ...selectedJob,
                      [field]: e.target.value,
                    })
                  }
                />
              ))}

              <textarea
                className="w-full p-3 rounded-xl text-black"
                value={selectedJob.description}
                onChange={(e) =>
                  setSelectedJob({
                    ...selectedJob,
                    description: e.target.value,
                  })
                }
              />

              <div className="flex gap-3">
                <button className="flex-1 bg-green-600 py-3 rounded-xl font-black">
                  Update
                </button>
                <button
                  type="button"
                  onClick={() => setEditOpen(false)}
                  className="flex-1 bg-gray-600 py-3 rounded-xl font-black"
                >
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
