import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";
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
  const [applications] = useState([]);
  const [accordionOpen, setAccordionOpen] = useState(false);

  const [editOpen, setEditOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);

  const [newJob, setNewJob] = useState({
    title: "",
    company: "",
    location: "",
    salary: "",
    description: "",
  });

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    const res = await getAllJobs();
    const normalized = (res?.data?.data || []).map((job) => ({
      ...job,
      id: job.id || job._id, // safe normalization
    }));
    setJobs(normalized);
  };

  /* ===================== ADD JOB ===================== */
  const handleCreateJobUI = (e) => {
    e.preventDefault();
    setJobs([{ id: Date.now(), ...newJob }, ...jobs]);
    setAccordionOpen(false);
  };

  const handleDeleteJob = (id) => {
    if (!window.confirm("Delete this job?")) return;
    setJobs(jobs.filter((job) => job.id !== id));
  };

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
                onSubmit={handleCreateJobUI}
                className="mb-12 p-8 rounded-3xl bg-white/10 border border-white/20 grid md:grid-cols-2 gap-4"
              >
                {["title", "company", "location", "salary"].map((field) => (
                  <input
                    key={field}
                    className="p-3 rounded-xl text-black"
                    placeholder={field}
                    value={newJob[field]}
                    onChange={(e) =>
                      setNewJob({ ...newJob, [field]: e.target.value })
                    }
                  />
                ))}
                <textarea
                  className="p-3 rounded-xl text-black md:col-span-2"
                  placeholder="Description"
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
                    className="flex-1 bg-yellow-500 py-2 rounded-xl font-bold flex items-center justify-center gap-2"
                  >
                    <FiEdit /> Edit
                  </button>
                  <button
                    onClick={() => handleDeleteJob(job.id)}
                    className="flex-1 bg-red-600 py-2 rounded-xl font-bold flex items-center justify-center gap-2"
                  >
                    <FiTrash2 /> Delete
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

          {/* ===================== EDIT JOB MODAL ===================== */}
          <AnimatePresence>
  {editOpen && selectedJob && (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center
      bg-gradient-to-br from-black/80 via-slate-900/80 to-black/80
      backdrop-blur-xl"
    >
      <motion.form
        initial={{ scale: 0.92, y: 40 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.92, y: 40 }}
        transition={{ type: "spring", stiffness: 180, damping: 18 }}
        onSubmit={handleUpdateJob}
        className="relative w-full max-w-2xl
        rounded-3xl border border-white/10
        bg-gradient-to-br from-slate-900 to-slate-950
        p-8 shadow-[0_30px_80px_rgba(0,0,0,0.6)]
        text-white"
      >
        {/* HEADER */}
        <div className="mb-8">
          <h2 className="text-3xl font-black tracking-tight">
            Edit Job Details
          </h2>
          <p className="mt-2 text-sm text-white/60">
            Update role information carefully — these changes will reflect
            immediately for candidates.
          </p>
        </div>

        {/* BASIC INFO */}
        <div className="grid md:grid-cols-2 gap-4 mb-6">
          {["title", "company"].map((field) => (
            <div key={field}>
              <label className="block text-xs font-bold uppercase text-white/60 mb-1">
                {field}
              </label>
              <input
                className="w-full rounded-xl bg-white/90 px-4 py-3
                text-slate-900 font-semibold
                focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={selectedJob[field] || ""}
                onChange={(e) =>
                  setSelectedJob({
                    ...selectedJob,
                    [field]: e.target.value,
                  })
                }
                placeholder={`Enter ${field}`}
              />
            </div>
          ))}
        </div>

        {/* LOCATION & SALARY */}
        <div className="grid md:grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-xs font-bold uppercase text-white/60 mb-1">
              Location
            </label>
            <input
              className="w-full rounded-xl bg-white/90 px-4 py-3
              text-slate-900 font-semibold
              focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={selectedJob.location || ""}
              onChange={(e) =>
                setSelectedJob({
                  ...selectedJob,
                  location: e.target.value,
                })
              }
              placeholder="e.g. Remote / Bangalore"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-white/60 mb-1">
              Salary (LPA)
            </label>
            <input
              type="number"
              className="w-full rounded-xl bg-white/90 px-4 py-3
              text-slate-900 font-semibold
              focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={selectedJob.salary || ""}
              onChange={(e) =>
                setSelectedJob({
                  ...selectedJob,
                  salary: e.target.value,
                })
              }
              placeholder="e.g. 6"
            />
            <p className="mt-1 text-[11px] text-white/50">
              Annual package in Lakhs (₹)
            </p>
          </div>
        </div>

        {/* DESCRIPTION */}
        <div className="mb-8">
          <label className="block text-xs font-bold uppercase text-white/60 mb-1">
            Job Description
          </label>
          <textarea
            rows={4}
            className="w-full rounded-xl bg-white/90 px-4 py-3
            text-slate-900 font-medium
            focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={selectedJob.description || ""}
            onChange={(e) =>
              setSelectedJob({
                ...selectedJob,
                description: e.target.value,
              })
            }
            placeholder="Describe responsibilities, requirements, and expectations"
          />
        </div>

        {/* ACTIONS */}
        <div className="flex gap-4">
          <button
            type="submit"
            className="flex-1 rounded-xl py-3 font-black
            bg-gradient-to-r from-emerald-500 to-green-600
            hover:brightness-110 transition"
          >
            Save Changes
          </button>
          <button
            type="button"
            onClick={() => setEditOpen(false)}
            className="flex-1 rounded-xl py-3 font-black
            bg-white/10 hover:bg-white/20 transition"
          >
            Cancel
          </button>
        </div>
      </motion.form>
    </motion.div>
  )}
</AnimatePresence>

          <LatestApplicants applications={applications} />
        </section>
      </div>

      <Footer />
    </>
  );
}
