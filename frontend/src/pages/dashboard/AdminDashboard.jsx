import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";
import SettingAPI from "../../api/settingsApi.js";
import {
  FiBriefcase, FiTrash2, FiPlusCircle, FiEye,
  FiUsers, FiShield, FiChevronDown, FiChevronUp,
  FiSettings, FiClipboard, FiDatabase, FiActivity,
  FiMapPin, FiRefreshCw, FiHome, FiAward, FiClock,
  FiDollarSign, FiUserCheck
} from "react-icons/fi";
import {
  LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar
} from "recharts";
import { getAllJobs } from "../../api/jobApi";
import { getMyApplications } from "../../api/applicationApi";
import { useAuthContext } from "../../context/AuthContext.jsx";

/* ===================== ADMIN COUNTER CARD (single definition ✔) ===================== */
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

/* ===================== SUMMARY CARD (existing kept ✔) ===================== */
function SummaryCard({ title, value, icon }) {
  return (
    <motion.div whileHover={{ scale: 1.05 }} className="bg-white/10 border border-white/20 rounded-2xl p-4 text-center shadow-xl text-white">
      <div className="text-3xl flex justify-center mb-1">{icon}</div>
      <p className="text-xs opacity-60 font-semibold">{title}</p>
      <p className="text-xl font-black">{value}</p>
    </motion.div>
  );
}

/* ===================== Latest Applicants (safe render ✔) ===================== */
function LatestApplicants({ applications }) {
  const safeApps = Array.isArray(applications) ? applications : [];
  const latest = [...safeApps]
    .sort((a, b) => new Date(b.created_at || 0) - new Date(a.created_at || 0))
    .slice(0, 5);

  return (
    <motion.div initial={{opacity:0,y:15}} animate={{opacity:1,y:0}} className="bg-black/40 border border-white/10 rounded-3xl p-6 shadow-2xl mb-12 text-white">
      <h2 className="text-2xl font-black mb-4 flex items-center gap-2"><FiUserCheck/> Latest 5 Applicants</h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-3">
        {latest.map(app => (
          <motion.div key={app.id || Math.random()} whileHover={{scale:1.03}} className="bg-white/10 border border-white/10 rounded-2xl p-4 text-sm">
            <p className="font-black">👤 {app.candidate_name || "N/A"}</p>
            <p className="text-[10px] opacity-70">{app.job_title || "N/A"}</p>
            <span className="text-xs px-2 py-1 rounded-full bg-indigo-500/20 border border-indigo-400/30">
              {(app.status || "pending").toUpperCase()}
            </span>
          </motion.div>
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
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [accordionOpen, setAccordionOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [toast, setToast] = useState(null);
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
    setLoading(true);
    setError("");
    try {
      const res = await getAllJobs();
      setJobs(res.data?.data || []);
    } catch (err) {
      console.error(err);
      setError("Failed to load jobs");
    } finally {
      setLoading(false);
    }
  };

  /* ========== SETTINGS FETCH FIXED ✔ ========== */
  const fetchSettings = async () => {
    try {
      const res = await SettingAPI.getAllSettings();
      setReports(res.data?.settings || []);
    } catch (err) {
      console.warn("Settings fetch failed", err);
      setReports([]);
    }
  };

  const fetchLogs = async () => {
    try {
      const res = await SettingAPI.getLogs();
      setActivityLogs(res.data?.logs || []);
    } catch (err) {
      console.warn("Logs fetch failed", err);
      setActivityLogs([]);
    }
  };

  const updateSettingAPI = async (key, value) => {
    try {
      await SettingAPI.updateSetting(key, value);
      setReports(r => r.map(item => item.setting_key === key ? { ...item, setting_value: value } : item));
      setToast({message: "Setting updated!", type: "success"});
    } catch (err) {
      console.error(err);
      setToast({message: "Failed to update setting", type: "error"});
    }
  };

  const deleteLog = async (id) => {
    try {
      await SettingAPI.deleteLog(id);
      setActivityLogs(l => l.filter(log => log.id !== id));
      setToast({message: "Log deleted!", type: "success"});
    } catch (err) {
      console.error(err);
    }
  };

  const handleCreateJobUI = (e) => {
    e.preventDefault();
    setJobs([{ id: Date.now(), ...newJob }, ...jobs]);
    setNewJob({ title:"", company:"", location:"", salary:"", description:"" });
    setAccordionOpen(false);
  };

  const handleDelete = (id) => {
    setJobs(j => j.filter(job => job.id !== id));
  };

  const handleView = (id) => {
    alert(`Viewing job ID: ${id}`);
  };

  return (
    <>
      <Navbar />

      <div className="pt-[90px] bg-slate-900 min-h-screen">
        <section className="min-h-screen bg-gradient-to-br from-slate-900 to-purple-900 p-8 pt-32 text-white">

          {/* HEADER */}
          <motion.div initial={{opacity:0,y:-25}} animate={{opacity:1,y:0}} className="mb-10 flex justify-between items-center">
            <motion.h1 className="text-6xl font-black bg-gradient-to-r from-indigo-300 to-pink-300 text-transparent bg-clip-text flex items-center gap-4 drop-shadow-lg">
              <FiShield className="text-indigo-300 animate-pulse text-7xl"/> Admin Job Dashboard
            </motion.h1>

            <motion.button whileHover={{rotate:20,scale:1.2}} whileTap={{scale:0.9}} onClick={fetchJobs} className="p-4 bg-indigo-600/20 border border-indigo-400/20 rounded-full shadow-xl text-indigo-300 text-3xl">
              <FiRefreshCw/>
            </motion.button>
          </motion.div>

          {/* COUNTER CARDS */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <AdminCounterCard title="Total Jobs" value={jobs.length} icon={<FiBriefcase />} />
            <AdminCounterCard title="Active Jobs" value={jobs.length} icon={<FiClipboard />} />
            <AdminCounterCard title="Candidates" value={120} icon={<FiUsers />} />
            <AdminCounterCard title="Recruiters" value={8} icon={<FiShield />} />
          </div>

          {/* Hiring Sources */}
          <div className="grid grid-cols-3 gap-4 max-w-5xl mx-auto mb-10">
            <SummaryCard title="Total Views" value={jobs.reduce((a,b)=>a+(b.views||0),0)} icon={<FiEye/>}/>
            <SummaryCard title="Avg Salary (LPA)" value={`₹${jobs.length ? (jobs.reduce((a,b)=>a+(+b.salary||0),0)/jobs.length).toFixed(1) : 0}L`} icon={<FiDollarSign/>}/>
            <SummaryCard title="Applications" value={applications.length} icon={<FiClipboard/>}/>
          </div>

          {/* Latest Applicants */}
          <LatestApplicants applications={applications}/>

          {/* SETTINGS */}
          <div className="mt-10">
            <motion.button onClick={()=>setSettingsOpen(!settingsOpen)} className="w-full flex justify-between items-center bg-slate-800 text-white px-6 py-4 rounded-2xl shadow-xl font-bold text-lg">
              <span className="flex items-center gap-2"><FiSettings/> System Settings</span>
              {settingsOpen ? <FiChevronUp/> : <FiChevronDown/>}
            </motion.button>

            <AnimatePresence>
              {settingsOpen && (
                <motion.div className="bg-white/20 backdrop-blur-xl border border-white/30 rounded-3xl p-6 shadow-xl mt-4">
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {reports.map((s,i)=>(
                      <SettingCard key={s.id||i} name={s.setting_key} enabled={!!s.setting_value} index={i} onToggle={()=>updateSettingAPI(s.setting_key, !s.setting_value)}/>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* LOGS */}
          <motion.section className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-6 shadow-xl mt-10">
            <h2 className="text-2xl font-black text-white mb-4 flex items-center gap-2"><FiActivity /> Admin Activity Logs</h2>
            <ul className="text-black font-semibold bg-white/40 p-4 rounded-2xl space-y-2">
              <AnimatePresence>
                {activityLogs.map(a=>(
                  <motion.li key={a.id} className="flex justify-between items-center">
                    <span>{a.log} — {a.time}</span>
                    <button onClick={()=>deleteLog(a.id)} className="text-red-600"><FiTrash2/></button>
                  </motion.li>
                ))}
              </AnimatePresence>
            </ul>
          </motion.section>

        </section>
      </div>

      <Footer />
    </>
  );
}

/* ===================== SETTING CARD (existing kept ✔) ===================== */
function SettingCard({ name, enabled, index, onToggle }) {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 * index }} whileHover={{ scale: 1.08 }} onClick={onToggle}
      className="relative p-5 bg-black/30 border border-white/10 rounded-3xl shadow-xl cursor-pointer hover:border-indigo-400/40 transition text-white"
    >
      <p className="text-[11px] uppercase text-white/50 mb-1">{name.replace("_"," ").toUpperCase()}</p>
      <p className={`text-xl font-black ${enabled ? "text-green-300" : "text-red-300"}`}>{enabled ? "Enabled ✔" : "Disabled"}</p>
    </motion.div>
  );
}
