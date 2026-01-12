import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";
import SettingAPI from "../../api/settingsApi.js";
import {
  FiBriefcase, FiTrash2, FiPlusCircle, FiEye,
  FiUsers, FiShield, FiChevronDown, FiChevronUp,
  FiSettings, FiClipboard, FiActivity,
  FiRefreshCw, FiDollarSign, FiUserCheck
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

/* ===================== SUMMARY CARD ===================== */
function SummaryCard({ title, value, icon }) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="bg-white/10 border border-white/20 rounded-2xl p-4 text-center shadow-xl text-white"
    >
      <div className="text-3xl flex justify-center mb-1">{icon}</div>
      <p className="text-xs opacity-60 font-semibold">{title}</p>
      <p className="text-xl font-black">{value}</p>
    </motion.div>
  );
}

/* ===================== LATEST APPLICANTS ===================== */
function LatestApplicants({ applications }) {
  const safeApps = Array.isArray(applications) ? applications : [];
  const latest = [...safeApps].slice(0, 5);

  return (
    <motion.div className="bg-black/40 border border-white/10 rounded-3xl p-6 shadow-2xl mb-12 text-white">
      <h2 className="text-2xl font-black mb-4 flex items-center gap-2">
        <FiUserCheck /> Latest 5 Applicants
      </h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-3">
        {latest.map(app => (
          <div
            key={app.id}
            className="bg-white/10 border border-white/10 rounded-2xl p-4 text-sm"
          >
            <p className="font-black">{app.candidate_name || "N/A"}</p>
            <p className="text-[10px] opacity-70">{app.job_title || "N/A"}</p>
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
  const [applications] = useState([]);
  const [accordionOpen, setAccordionOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [activityLogs, setActivityLogs] = useState([]);
  const [reports, setReports] = useState([]);

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

  const fetchSettings = async () => {
    const res = await SettingAPI.getAllSettings();
    setReports(res.data?.settings || []);
  };

  const fetchLogs = async () => {
    const res = await SettingAPI.getLogs();
    setActivityLogs(res.data?.logs || []);
  };

  /* ===================== ADD JOB HANDLER ===================== */
  const handleCreateJobUI = (e) => {
    e.preventDefault();
    setJobs([{ id: Date.now(), ...newJob }, ...jobs]);
    setNewJob({ title: "", company: "", location: "", salary: "", description: "" });
    setAccordionOpen(false);
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
              {/* ADD JOB BUTTON */}
              <button
                onClick={() => setAccordionOpen(!accordionOpen)}
                className="flex items-center gap-2 px-5 py-3 bg-indigo-600 rounded-xl font-bold shadow-lg"
              >
                <FiPlusCircle /> Add Job
              </button>

              <button
                onClick={fetchJobs}
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
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                onSubmit={handleCreateJobUI}
                className="bg-white/10 border border-white/20 rounded-3xl p-6 mb-10 grid md:grid-cols-2 gap-4"
              >
                <input
                  placeholder="Job Title"
                  className="p-3 rounded-xl text-black"
                  value={newJob.title}
                  onChange={(e) => setNewJob({ ...newJob, title: e.target.value })}
                  required
                />
                <input
                  placeholder="Company"
                  className="p-3 rounded-xl text-black"
                  value={newJob.company}
                  onChange={(e) => setNewJob({ ...newJob, company: e.target.value })}
                  required
                />
                <input
                  placeholder="Location"
                  className="p-3 rounded-xl text-black"
                  value={newJob.location}
                  onChange={(e) => setNewJob({ ...newJob, location: e.target.value })}
                />
                <input
                  placeholder="Salary (LPA)"
                  className="p-3 rounded-xl text-black"
                  value={newJob.salary}
                  onChange={(e) => setNewJob({ ...newJob, salary: e.target.value })}
                />
                <textarea
                  placeholder="Job Description"
                  className="p-3 rounded-xl text-black md:col-span-2"
                  value={newJob.description}
                  onChange={(e) => setNewJob({ ...newJob, description: e.target.value })}
                />
                <button
                  type="submit"
                  className="md:col-span-2 bg-green-600 py-3 rounded-xl font-black"
                >
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

          <LatestApplicants applications={applications} />

        </section>
      </div>

      <Footer />
    </>
  );
}
