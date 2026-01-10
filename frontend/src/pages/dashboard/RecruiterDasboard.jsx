import { useEffect, useState } from "react";
import { getAllJobs, updateJob, deleteJob, createJob } from "../../api/jobApi";
import { getMyApplications } from "../../api/applicationApi";
import { useAuthContext } from "../../context/AuthContext";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "../../components/layout/Navbar"; // ✅ Navbar imported
import Footer from "../../components/layout/Footer";
import { useNavigate } from "react-router-dom";
import {
  FiTrash2, FiPlusCircle, FiMapPin, FiBriefcase,
  FiSearch, FiDatabase, FiEye, FiUserCheck, FiAward, FiHome,
  FiRefreshCw, FiCheckCircle, FiXCircle, FiClock, FiShield,
  FiClipboard, FiBarChart2, FiDollarSign, FiActivity
} from "react-icons/fi";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer
} from "recharts";
import { incrementViews } from "../../api/jobApi";
import { getSalaryAnalytics } from "../../api/salaryApi";
import axiosInstance from "../../api/axiosInstance";

/* ===================== TOAST ===================== */
function Toast({ message, type }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 40 }}
      className={`fixed bottom-6 right-6 px-6 py-3 rounded-2xl font-black text-sm shadow-2xl backdrop-blur-xl border ${
        type === "success"
          ? "bg-green-600/30 border-green-500/40 text-green-200"
          : "bg-red-600/30 border-red-500/40 text-red-200"
      }`}
    >
      {message}
    </motion.div>
  );
}

/* ===================== SUMMARY CARD ===================== */
function SummaryCard({ title, value, icon }) {
  return (
    <motion.div whileHover={{ scale: 1.05 }} className="bg-white/10 border border-white/20 rounded-2xl p-4 text-center shadow-xl">
      <div className="text-3xl flex justify-center mb-1">{icon}</div>
      <p className="text-xs opacity-60 font-semibold">{title}</p>
      <p className="text-xl font-black">{value}</p>
    </motion.div>
  );
}

/* ===================== STATUS BADGE ===================== */
function StatusBadge({ status }) {
  const safe = status || "pending";
  return (
    <span className="text-xs px-3 py-1 rounded-full font-semibold bg-indigo-500/20 text-indigo-200 border border-indigo-400/30">
      {safe.toUpperCase()}
    </span>
  );
}

/* ===================== LATEST APPLICANTS ===================== */
function LatestApplicants({ applications }) {
  const latest = [...applications]
    .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
    .slice(0, 5);

  return (
    <motion.div initial={{opacity:0,y:15}} animate={{opacity:1,y:0}} className="bg-black/40 border border-white/10 rounded-3xl p-6 shadow-2xl mb-12 text-white">
      <h2 className="text-2xl font-black mb-4 flex items-center gap-2">
        <FiUserCheck/> Latest 5 Applicants
      </h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-3">
        {latest.map(app => (
          <motion.div key={app.id} whileHover={{scale:1.03}} className="bg-white/10 border border-white/10 rounded-2xl p-4 text-sm text-white">
            <p className="font-black">👤 {app.candidate_name}</p>
            <p className="text-[10px] opacity-70 mb-2">{app.job_title}</p>
            <StatusBadge status={app.status}/>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

/* ===================== DELETE CONFIRM MODAL ===================== */
function DeleteJobModal({ id, onConfirm, onCancel }) {
  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-xl flex items-center justify-center z-50">
      <motion.div initial={{scale:0.8,opacity:0}} animate={{scale:1,opacity:1}} exit={{scale:0.8,opacity:0}} className="bg-black/60 border border-white/20 rounded-3xl p-6 w-[340px] text-center shadow-2xl text-white">
        <h3 className="text-xl font-black mb-4 flex items-center justify-center gap-2"><FiTrash2/> Delete this job?</h3>
        <div className="flex justify-center gap-4">
          <button onClick={()=>onConfirm(id)} className="bg-red-600/60 border border-white/10 px-5 py-2 rounded-xl font-black flex items-center gap-2">
            <FiXCircle/> Yes
          </button>
          <button onClick={onCancel} className="bg-green-600/40 border border-white/10 px-5 py-2 rounded-xl font-black flex items-center gap-2">
            <FiClock/> No
          </button>
        </div>
      </motion.div>
      </div>
  );
}

/* ===================== JOB FORM ===================== */
function JobForm({ mode = "create", job = null, onSubmit, onCancel }) {
  const auth = useAuthContext();
  const user = auth?.user || null;

  const [form, setForm] = useState({
    title: job?.title || "",
    company: job?.company || "",
    location: job?.location || "",
    salary: job?.salary || "",
    description: job?.description || "",
    remote: job?.remote || false
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form, job?.id, user?.id);
  };

  return (
    <motion.form initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} exit={{opacity:0,y:10}} onSubmit={handleSubmit} className="bg-black/40 border border-white/20 rounded-3xl p-6 grid gap-4 shadow-2xl max-w-3xl mx-auto mb-12 text-white">
      <h3 className="text-2xl font-black text-center mb-2">
        {mode === "edit" ? "Edit Job" : "Post a Job"}
      </h3>

      <input required name="title" placeholder="Job Title" className="p-3 rounded-xl bg-black/60 border border-white/10 text-white" value={form.title} onChange={handleChange}/>
      <input required name="company" placeholder="Company Name" className="p-3 rounded-xl bg-black/60 border border-white/10 text-white" value={form.company} onChange={handleChange}/>
      <input required name="location" placeholder="Location" className="p-3 rounded-xl bg-black/60 border border-white/10 text-white" value={form.location} onChange={handleChange}/>
      <input required name="salary" placeholder="Salary in LPA" type="number" className="p-3 rounded-xl bg-black/60 border border-white/10 text-white" value={form.salary} onChange={handleChange}/>
      <textarea required name="description" placeholder="Job Description" className="p-3 rounded-xl bg-black/60 border border-white/10 text-white min-h-[120px]" value={form.description} onChange={handleChange}/>

      <label className="flex items-center justify-center gap-2 text-sm font-black">
        <input type="checkbox" name="remote" checked={form.remote} onChange={handleChange}/>
        <FiHome/> Remote Job?
      </label>

      <div className="flex justify-center gap-4 mt-3">
        <button type="submit" className="bg-green-600/50 border border-white/10 px-6 py-2 rounded-xl font-black flex items-center gap-2">
          <FiCheckCircle/> {mode === "edit" ? "Update" : "Create"}
        </button>
        <button type="button" onClick={onCancel} className="bg-yellow-600/40 border border-white/10 px-6 py-2 rounded-xl font-black flex items-center gap-2">
          <FiClock/> Cancel
        </button>
      </div>
    </motion.form>
  );
}

/* ===================== RECRUITER DASHBOARD ===================== */
export default function RecruiterDashboard() {
  const auth = useAuthContext();
  const user = auth?.user || null;
  const navigate = useNavigate(); // needed for redirect

  const [jobs, setJobs] = useState([]);
  const [applications, setApplications] = useState([]);
  const [toast, setToast] = useState(null);
  const [activity, setActivity] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editJobForm, setEditJobForm] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [salaryStats, setSalaryStats] = useState(null);

  useEffect(() => {
    if (user?.id) fetchRecruiterJobs();
    if (user?.id) fetchApplications();
  }, [user?.id]);

  const logActivity = (msg) => {
    setActivity((a) => [{ msg, time: new Date().toLocaleString() }, ...a]);
  };

  const handleLogout = () => {
    auth.logout(); // existing logout preserved ✔
    navigate("/login", { replace: true });
  };

  const fetchRecruiterJobs = async () => {
    try {
      setLoading(true);
      setError("");
      const res = await getAllJobs();
      const allJobs = Array.isArray(res.data?.jobs || res.data?.data || res.data)
        ? (res.data.jobs || res.data.data || res.data)
        : [];
      const myJobs = allJobs.filter(job => job?.recruiter_id === user?.id);
      setJobs(myJobs);
      logActivity("Jobs synced from database");
      setToast({ message: "Jobs refreshed!", type: "success" });
    } catch {
      setError("Job sync failed");
      logActivity("Jobs sync failed");
      setToast({ message: "Database Sync Failed!", type: "error" });
    } finally {
      setLoading(false);
    }
  };

  const fetchApplications = async () => {
    try {
      const res = await getMyApplications(user?.id);
      const apps = Array.isArray(res.data?.applications || res.data?.data || res.data)
        ? (res.data.applications || res.data.data || res.data)
        : [];
      setApplications(apps);
      logActivity("Applications synced from database");
      setToast({ message: "Applications refreshed!", type: "success" });
    } catch {
      logActivity("Applications sync failed");
      setToast({ message: "Applications Sync Failed!", type: "error" });
    }
  };

  const handleCreateOpen = () => {
    setShowCreateForm(true);
    setEditJobForm(null);
    logActivity("Opened create job form");
  };

  const handleEditOpen = (job) => {
    setShowCreateForm(true);
    setEditJobForm(job);
    logActivity(`Opened edit form for ${job.title}`);
  };

  const handleSubmitJob = async (data, jobId, recruiterId) => {
    try {
      if (jobId) {
        await updateJob(jobId, { ...data, recruiter_id: recruiterId });
        setToast({ message: "Job Updated Successfully!", type: "success" });
        logActivity("Job updated");
      } else {
        await createJob({ ...data, recruiter_id: recruiterId, status: "pending", views: 0 });
        setToast({ message: "Job Created Successfully!", type: "success" });
        logActivity("Job created");
      }
      fetchRecruiterJobs();
      setShowCreateForm(false);
    } catch {
      setToast({ message: "Job Action Failed!", type: "error" });
      logActivity("Job action failed");
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteJob(id);
      setJobs(j => j.filter(job => job.id !== id));
      setToast({ message: "Job Deleted!", type: "success" });
      logActivity("Job deleted");
    } catch {
      setToast({ message: "Job Delete Failed!", type: "error" });
      logActivity("Delete failed");
    } finally {
      setDeleteId(null);
    }
  };

  const visibleJobs = jobs.filter(
    job => (job.title || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
           (job.company || "").toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalViews = jobs.reduce((sum, job) => sum + (job.views || 0), 0);
  const avgSalary = jobs.length ? (jobs.reduce((sum, j) => sum + (Number(j.salary) || 0), 0) / jobs.length).toFixed(1) : 0;

  const remoteApplications = applications.filter(a => a.remote).length;
  const onsiteApplications = applications.length - remoteApplications;

  return (
    <>
      <Navbar />  {/* Navbar rendered at top ✔ */}
      <AnimatePresence>{toast && <Toast message={toast.message} type={toast.type} />}</AnimatePresence>

      <section className="min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950 to-purple-950 p-8 mt-[70px] text-white">
        
        {/* Top Action Bar */}
        <div className="flex justify-end gap-3 mb-6">
          <motion.button whileHover={{scale:1.1}} onClick={fetchRecruiterJobs} className="bg-white/10 border border-white/20 p-3 rounded-xl"><FiDatabase size={22}/></motion.button>
          <motion.button whileHover={{scale:1.1}} onClick={fetchApplications} className="bg-white/10 border border-white/20 p-3 rounded-xl"><FiRefreshCw size={22}/></motion.button>
          <motion.button whileHover={{scale:1.1}} onClick={handleCreateOpen} className="bg-indigo-600/40 border border-indigo-500/40 p-3 rounded-xl"><FiPlusCircle size={26}/></motion.button>
        </div>

        {/* Search Bar */}
        <div className="relative max-w-lg mx-auto mb-6">
          <FiSearch className="absolute top-4 left-5 text-2xl text-white/50"/>
          <input value={searchTerm} onChange={(e)=>setSearchTerm(e.target.value)} placeholder="Search jobs..." className="w-full bg-black/40 border border-white/20 rounded-full py-4 pl-16 pr-6 text-white text-lg shadow-xl"/>
        </div>

        {/* Recruiter Profile Card */}
        <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} className="bg-white/10 border border-white/10 rounded-3xl p-6 shadow-2xl mb-10">
          <div className="flex items-center gap-4">
            <FiUserCheck className="text-5xl"/>
            <div>
              <h2 className="text-3xl font-black">{user?.name || "Recruiter"}</h2>
              <p className="opacity-70 flex items-center gap-1"><FiBriefcase/> {user?.role}</p>
              <p className="opacity-70 flex items-center gap-1"><FiMapPin/> {user?.location}</p>
            </div>
          </div>
        </motion.div>

        {/* KPI Stats Row */}
        <div className="grid grid-cols-4 gap-4 max-w-5xl mx-auto mb-10">
          <SummaryCard title="Total Jobs" value={jobs.length} icon={<FiBriefcase/>}/>
          <SummaryCard title="Total Views" value={totalViews} icon={<FiEye/>}/>
          <SummaryCard title="Avg Salary (LPA)" value={`₹${avgSalary}L`} icon={<FiDollarSign/>}/>
          <SummaryCard title="Applications" value={applications.length} icon={<FiClipboard/>}/>
        </div>

        {/* Remote vs Onsite Applications */}
        <div className="grid grid-cols-2 gap-6 max-w-xl mx-auto mb-12">
          <SummaryCard title="Remote Applications" value={remoteApplications} icon={<FiHome/>}/>
          <SummaryCard title="Onsite Applications" value={onsiteApplications} icon={<FiBriefcase/>}/>
        </div>

        {/* Latest Applicants */}
        <LatestApplicants applications={applications}/>

        {/* Create/Edit Job Form */}
        {showCreateForm && (
          <JobForm
            mode={editJobForm ? "edit" : "create"}
            job={editJobForm}
            onSubmit={handleSubmitJob}
            onCancel={() => setShowCreateForm(false)}
          />
        )}

        {/* Delete Modal */}
        <AnimatePresence>
          {deleteId && (
            <DeleteJobModal
              id={deleteId}
              onConfirm={handleDelete}
              onCancel={() => setDeleteId(null)}
            />
          )}
        </AnimatePresence>

        {/* Jobs List */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          <AnimatePresence>
            {loading && (
              <motion.p initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="text-center col-span-full text-lg font-black flex justify-center items-center gap-2">
                <FiActivity/> Syncing data from DB...
              </motion.p>
            )}
          </AnimatePresence>

          {error && <p className="text-center col-span-full text-red-400 font-black">{error}</p>}

          {visibleJobs.map(job=>(
            <motion.div
              key={job.id}
              whileHover={{y:-5,scale:1.02}}
              initial={{opacity:0,y:15}}
              animate={{opacity:1,y:0}}
              exit={{opacity:0,y:15}}
              className="bg-white/95 border border-white/20 text-black rounded-3xl p-6 shadow-2xl"
            >
              <h3 className="text-xl font-black mb-1">{job.title}</h3>
              <p className="text-sm opacity-80 mb-1">{job.company}</p>
              <p className="text-xs flex items-center gap-1 mb-2"><FiMapPin/> {job.location}</p>
              <p className="text-xs flex items-center gap-1 mb-3"><FiDollarSign/> ₹{job.salary} LPA</p>
              <StatusBadge status={job.status}/>
              <div className="flex justify-end gap-3 mt-4">
                <button onClick={()=>handleEditOpen(job)}><FiEdit3 size={20}/></button>
                <button onClick={()=>setDeleteId(job.id)}><FiTrash2 size={20}/></button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* System Logs */}
        <motion.div initial={{opacity:0,y:15}} animate={{opacity:1,y:0}} className="bg-black/60 border border-white/10 rounded-3xl p-6 shadow-2xl mt-12 text-white">
          <h2 className="text-xl font-black mb-3 flex items-center gap-2"><FiShield/> System Activity Logs</h2>
          <div className="max-h-60 overflow-auto bg-white/5 rounded-2xl p-4 border border-white/10">
            {activity.map((a,i)=>(<p key={i} className="text-sm opacity-80">[{a.time}] {a.msg}</p>))}
          </div>
        </motion.div>

      </section>

      <Footer />
    </>
  );
}
