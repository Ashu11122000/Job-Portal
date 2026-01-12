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
  FiEdit
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
    setJobs(res?.data?.data || []);
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
    setJobs(jobs.map((j) => (j.id === selectedJob.id ? selectedJob : j)));
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
                    className="flex-1 bg-yellow-500 py-2 rounded-xl font-bold"
                  >
                    <FiEdit /> Edit
                  </button>
                  <button
                    onClick={() => handleDeleteJob(job.id)}
                    className="flex-1 bg-red-600 py-2 rounded-xl font-bold"
                  >
                    <FiTrash2 /> Delete
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

          <LatestApplicants applications={applications} />

        </section>
      </div>

      <Footer />
    </>
  );
}
