import { useEffect, useState } from "react";
import { getAllJobs, updateJob, deleteJob, createJob } from "../../api/jobApi";
import { getMyApplications } from "../../api/applicationApi";
import axios from "axios"; // ✅ RAILWAY FIX (added)
import { useAuthContext } from "../../context/AuthContext";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";
import {
  FiTrash2, FiPlusCircle, FiMapPin, FiBriefcase,
  FiSearch, FiEye, FiUserCheck, FiHome,
  FiRefreshCw, FiCheckCircle,
  FiClipboard, FiDollarSign, FiActivity, FiEdit
} from "react-icons/fi";

/* ===================== TOAST ===================== */
function Toast({ message, type }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 40 }}
      className={`fixed bottom-6 right-6 px-6 py-3 rounded-2xl font-black shadow-2xl ${
        type === "success"
          ? "bg-green-600/30 text-green-200"
          : "bg-red-600/30 text-red-200"
      }`}
    >
      {message}
    </motion.div>
  );
}

/* ===================== SUMMARY CARD ===================== */
function SummaryCard({ title, value, icon }) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="bg-white/10 border border-white/20 rounded-2xl p-4 text-center shadow-xl"
    >
      <div className="text-3xl flex justify-center mb-1">{icon}</div>
      <p className="text-xs opacity-60 font-semibold">{title}</p>
      <p className="text-xl font-black">{value}</p>
    </motion.div>
  );
}

/* ===================== STATUS BADGE ===================== */
function StatusBadge({ status }) {
  return (
    <span className="text-xs px-3 py-1 rounded-full font-semibold bg-indigo-500/20 text-indigo-200 border border-indigo-400/30">
      {(status || "pending").toUpperCase()}
    </span>
  );
}

/* ===================== JOB FORM ===================== */
function JobForm({ job, onSubmit, onCancel }) {
  const [form, setForm] = useState(
    job || { title: "", company: "", location: "", salary: "", description: "" }
  );

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const submit = (e) => {
    e.preventDefault();
    onSubmit(form, job?.id);
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      onSubmit={submit}
      className="bg-black/40 border border-white/20 rounded-3xl p-6 mb-12 max-w-3xl mx-auto grid gap-4"
    >
      <h3 className="text-2xl font-black text-center">
        {job ? "Edit Job" : "Create Job"}
      </h3>

      {["title", "company", "location", "salary"].map((f) => (
        <input
          key={f}
          name={f}
          value={form[f]}
          onChange={handleChange}
          placeholder={f.toUpperCase()}
          className="p-3 rounded-xl bg-black/60 border border-white/10 text-white"
          required
        />
      ))}

      <textarea
        name="description"
        value={form.description}
        onChange={handleChange}
        placeholder="Job Description"
        className="p-3 rounded-xl bg-black/60 border border-white/10 text-white"
        required
      />

      <div className="flex gap-4 justify-center">
        <button className="bg-green-600 px-6 py-2 rounded-xl font-black flex items-center gap-2">
          <FiCheckCircle /> Save
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="bg-gray-600 px-6 py-2 rounded-xl font-black"
        >
          Cancel
        </button>
      </div>
    </motion.form>
  );
}

/* ===================== RECRUITER DASHBOARD ===================== */
export default function RecruiterDashboard() {
  const auth = useAuthContext();
  const user = auth?.user || {};

  /* =========================================================
     ✅ RAILWAY BASE URL FIX (DOES NOT REMOVE ANY CODE)
     ========================================================= */
  useEffect(() => {
    axios.defaults.baseURL =
      import.meta.env.VITE_API_BASE_URL ||
      "https://job-portal-production-2c0d.up.railway.app/api";
  }, []);
  /* ========================================================= */

  const [jobs, setJobs] = useState([]);
  const [applications, setApplications] = useState([]);
  const [toast, setToast] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [showJobForm, setShowJobForm] = useState(false);
  const [editJob, setEditJob] = useState(null);

  useEffect(() => {
    if (user.id) {
      fetchRecruiterJobs();
      fetchApplications();
    }
  }, [user.id]);

  const fetchRecruiterJobs = async () => {
    const res = await getAllJobs();
    const all = res.data?.data || [];
    setJobs(all.filter((j) => j.recruiter_id === user.id));
  };

  const fetchApplications = async () => {
    const res = await getMyApplications(user.id);
    setApplications(res.data?.data || []);
  };

  const submitJob = async (data, id) => {
    if (id) await updateJob(id, data);
    else await createJob({ ...data, recruiter_id: user.id });
    setShowJobForm(false);
    setEditJob(null);
    fetchRecruiterJobs();
  };

  const removeJob = async (id) => {
    if (!window.confirm("Delete this job?")) return;
    await deleteJob(id);
    setJobs((j) => j.filter((x) => x.id !== id));
  };

  const visibleJobs = jobs.filter(
    (j) =>
      j.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      j.company?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalViews = jobs.reduce((a, b) => a + (b.views || 0), 0);
  const avgSalary = jobs.length
    ? (
        jobs.reduce((s, j) => s + (+j.salary || 0), 0) / jobs.length
      ).toFixed(1)
    : 0;

  return (
    <>
      <Navbar />
      <AnimatePresence>{toast && <Toast {...toast} />}</AnimatePresence>

      <section className="min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950 to-purple-950 p-8 mt-[70px] text-white">

        {/* TOP ACTION BAR */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-4xl font-black">Recruiter Dashboard</h1>
          <div className="flex gap-3">
            <button onClick={() => setShowJobForm(true)} className="bg-indigo-600/40 p-3 rounded-xl">
              <FiPlusCircle />
            </button>
            <button onClick={fetchRecruiterJobs} className="bg-white/10 p-3 rounded-xl">
              <FiRefreshCw />
            </button>
          </div>
        </div>

        {/* SEARCH BAR */}
        <div className="relative max-w-lg mx-auto mb-8">
          <FiSearch className="absolute top-4 left-5 text-white/50" />
          <input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search jobs..."
            className="w-full bg-black/40 border border-white/20 rounded-full py-4 pl-14 pr-6 text-white"
          />
        </div>

        {/* KPI CARDS */}
        <div className="grid grid-cols-4 gap-4 max-w-5xl mx-auto mb-12">
          <SummaryCard title="Jobs" value={jobs.length} icon={<FiBriefcase />} />
          <SummaryCard title="Views" value={totalViews} icon={<FiEye />} />
          <SummaryCard title="Avg Salary" value={`₹${avgSalary}L`} icon={<FiDollarSign />} />
          <SummaryCard title="Applications" value={applications.length} icon={<FiClipboard />} />
        </div>

        {/* JOB FORM */}
        {showJobForm && (
          <JobForm
            job={editJob}
            onSubmit={submitJob}
            onCancel={() => {
              setShowJobForm(false);
              setEditJob(null);
            }}
          />
        )}

        {/* MY JOBS */}
        <h2 className="text-3xl font-black mb-6">My Jobs</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {visibleJobs.map((job) => (
            <motion.div
              key={job.id}
              whileHover={{ y: -6 }}
              className="bg-white/10 border border-white/20 rounded-3xl p-6 shadow-xl"
            >
              <h3 className="font-black text-xl">{job.title}</h3>
              <p className="text-sm opacity-70">{job.company}</p>
              <p className="text-xs flex items-center gap-1">
                <FiMapPin /> {job.location}
              </p>

              <div className="flex justify-end gap-3 mt-4">
                <button onClick={() => { setEditJob(job); setShowJobForm(true); }}>
                  <FiEdit />
                </button>
                <button onClick={() => removeJob(job.id)}>
                  <FiTrash2 />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* MANAGE APPLICATIONS */}
        <h2 className="text-3xl font-black mb-6">Manage Applications</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {applications.map((app) => (
            <motion.div key={app.id} className="bg-black/40 border border-white/10 rounded-3xl p-6">
              <h3 className="font-black">{app.candidate_name}</h3>
              <p className="text-sm opacity-70">{app.job_title}</p>
              <StatusBadge status={app.status} />
            </motion.div>
          ))}
        </div>
      </section>

      <Footer />
    </>
  );
}
