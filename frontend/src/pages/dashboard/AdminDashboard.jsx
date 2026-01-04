import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiBriefcase,
  FiTrash2,
  FiEdit3,
  FiPlusCircle,
  FiEye,
  FiRefreshCw,
  FiBarChart2,
  FiUsers,
  FiShield,
  FiChevronDown,
  FiChevronUp,
} from "react-icons/fi";
import { getAllJobs } from "../../api/jobApi"; // existing kept
import Footer from "../../components/layout/Footer"; // existing kept
import {
  LineChart,
  Line,
  XAxis,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  YAxis,
} from "recharts"; // charts added

export default function AdminDashboard() {
  const [jobs, setJobs] = useState([]); // existing kept
  const [loading, setLoading] = useState(false); // existing kept
  const [error, setError] = useState(""); // existing kept

  const [showCreateModal, setShowCreateModal] = useState(false); // existing kept
  const [accordionOpen, setAccordionOpen] = useState(false); // NEW accordion state
  const [newJob, setNewJob] = useState({
    title: "",
    company: "",
    location: "",
    salary: "",
    description: "",
  }); // existing kept

  const [showEditModal, setShowEditModal] = useState(false);
  const [editJobForm, setEditJobForm] = useState(null);

  useEffect(() => {
    fetchJobs(); // existing kept
  }, []); // existing kept

  const fetchJobs = async () => {
    setLoading(true); // existing kept
    setError(""); // existing kept
    try {
      const res = await getAllJobs();
      setJobs(res.data?.data || []); // existing kept
    } catch (err) {
      console.error("❌ Error loading jobs:", err); // existing kept
      setError("Failed to load jobs"); // existing kept
    } finally {
      setLoading(false); // existing kept
    }
  };

  const handleDelete = (id) => {
    setJobs(jobs.filter((job) => job.id !== id)); // existing kept
  };

  const handleEdit = (job) => {
    setEditJobForm(job);
    setShowEditModal(true);
  };

  const handleView = (id) => {
    alert(`View clicked for job ID: ${id} (UI only)`); // existing kept
  };

  const handleCreateJobUI = (e) => {
    e.preventDefault();
    setJobs([{ id: Date.now(), ...newJob }, ...jobs]); // existing kept
    setNewJob({ title: "", company: "", location: "", salary: "", description: "" }); // existing kept
    setAccordionOpen(false); // CLOSE accordion after submit
  };

  /* =======================
     ADMIN UI ANALYTICS DATA
     ======================= */
  const stats = {
    totalJobs: jobs.length,
    activeJobs: jobs.length,
    recentJobs: jobs.slice(0, 5).length,
    admins: 1,
    candidates: 120,
    recruiters: 8,
  }; // counters enhanced

  const jobTrendData = jobs.map((job, index) => ({
    name: `Job ${index + 1}`,
    jobs: index + 1,
  })); // chart data demo

  const hiringFunnelData = [
    { stage: "Applied", count: 200 },
    { stage: "Reviewed", count: 120 },
    { stage: "Interview", count: 60 },
    { stage: "Selected", count: 20 },
  ]; // funnel chart demo

  return (
    <>
      <section className="min-h-screen bg-gradient-to-br from-slate-900 to-purple-900 p-8 pt-32">
        {/* HEADER */}
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-black text-white mb-10 flex items-center gap-2"
        >
          <FiShield className="text-indigo-300" /> Admin Job Dashboard
        </motion.h1>

        {/* PREMIUM COUNTER CARDS */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          <AdminCounterCard title="Total Jobs" value={stats.totalJobs} icon={<FiBriefcase />} />
          <AdminCounterCard title="Recent Jobs" value={stats.recentJobs} icon={<FiBarChart2 />} />
          <AdminCounterCard title="Recruiters" value={stats.recruiters} icon={<FiUsers />} />
          <AdminCounterCard title="Admins" value={stats.admins} icon={<FiShield />} />
        </div>

        {/* ACCORDION CREATE JOB FORM */}
        <div className="mb-8">
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => setAccordionOpen(!accordionOpen)}
            className="w-full flex justify-between items-center bg-indigo-600 text-white px-6 py-4 rounded-2xl shadow-xl font-bold text-lg"
          >
            <span className="flex items-center gap-2"><FiPlusCircle /> Create New Job</span>
            {accordionOpen ? <FiChevronUp /> : <FiChevronDown />}
          </motion.button>

          <AnimatePresence>
            {accordionOpen && (
              <motion.form
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                onSubmit={handleCreateJobUI}
                className="bg-white/20 backdrop-blur-xl border border-white/30 rounded-3xl p-8 shadow-xl mt-4 max-w-2xl mx-auto overflow-hidden"
              >
                <div className="grid md:grid-cols-2 gap-4 mb-4">
                  <input
                    placeholder="Job Title"
                    value={newJob.title}
                    onChange={(e) => setNewJob({ ...newJob, title: e.target.value })}
                    required
                    className="w-full p-3 rounded-xl bg-white/40 text-black placeholder-black/60 border border-gray-300"
                  />
                  <input
                    placeholder="Company"
                    value={newJob.company}
                    onChange={(e) => setNewJob({ ...newJob, company: e.target.value })}
                    required
                    className="w-full p-3 rounded-xl bg-white/40 text-black placeholder-black/60 border border-gray-300"
                  />
                  <input
                    placeholder="Location"
                    value={newJob.location}
                    onChange={(e) => setNewJob({ ...newJob, location: e.target.value })}
                    required
                    className="w-full p-3 rounded-xl bg-white/40 text-black placeholder-black/60 border border-gray-300"
                  />
                  <input
                    placeholder="Salary"
                    value={newJob.salary}
                    onChange={(e) => setNewJob({ ...newJob, salary: e.target.value })}
                    required
                    className="w-full p-3 rounded-xl bg-white/40 text-black placeholder-black/60 border border-gray-300"
                  />
                </div>

                <textarea
                  placeholder="Job Description"
                  value={newJob.description}
                  onChange={(e) => setNewJob({ ...newJob, description: e.target.value })}
                  required
                  className="w-full p-3 rounded-xl bg-white/40 text-black placeholder-black/60 border border-gray-300 min-h-[100px]"
                />

                <div className="flex justify-center gap-4 mt-6">
                  <button className="bg-indigo-700 text-white px-6 py-2 rounded-xl font-bold shadow-lg inline-flex items-center gap-2">
                    <FiPlusCircle /> Add Job
                  </button>
                </div>
              </motion.form>
            )}
          </AnimatePresence>
        </div>

        {/* CHARTS SECTION */}
        <div className="grid md:grid-cols-2 gap-6 mb-10">
          {/* Jobs Growth Line Chart */}
          <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-6 shadow-xl">
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2"><FiBarChart2 /> Jobs Trend</h2>
            <ResponsiveContainer height={200} width="100%">
              <LineChart data={jobTrendData}>
                <XAxis dataKey="name" />
                <Tooltip />
                <Line type="monotone" dataKey="jobs" strokeWidth={3} dot={{ r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Hiring Funnel Bar Chart */}
          <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-6 shadow-xl">
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2"><FiUsers /> Hiring Funnel</h2>
            <ResponsiveContainer height={200} width="100%">
              <BarChart data={hiringFunnelData}>
                <XAxis dataKey="stage" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </motion.div>
        </div>

        {/* JOB LIST TABLE */}
        {loading ? (
          <p className="text-center text-indigo-200">Loading...</p>
        ) : error ? (
          <p className="text-center text-red-400">{error}</p>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/10 backdrop-blur-2xl border border-white/25 rounded-3xl p-8 shadow-2xl"
          >
            <table className="w-full text-left text-white">
              <thead className="border-b border-white/20 text-sm uppercase">
                <tr>
                  <th className="pb-4">ID</th>
                  <th className="pb-4">Title</th>
                  <th className="pb-4">Company</th>
                  <th className="pb-4">Location</th>
                  <th className="pb-4">Salary</th>
                  <th className="pb-4 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {jobs.map((job) => (
                  <tr key={job.id} className="border-b border-white/10 hover:bg-indigo-500/10 transition">
                    <td className="py-4">{job.id}</td>
                    <td className="py-4 flex items-center gap-2">
                      <FiBriefcase className="text-indigo-300" /> {job.title}
                    </td>
                    <td className="py-4">{job.company}</td>
                    <td className="py-4">{job.location}</td>
                    <td className="py-4">{job.salary}</td>
                    <td className="py-4">
                      <div className="flex justify-center gap-4">
                        <button onClick={() => handleView(job.id)} className="text-blue-400 hover:text-white">
                          <FiEye />
                        </button>
                        <button onClick={() => handleEdit(job)} className="text-indigo-300 hover:text-white">
                          <FiEdit3 />
                        </button>
                        <button onClick={() => handleDelete(job.id)} className="text-red-400 hover:text-white">
                          <FiTrash2 />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </motion.div>
        )}
      </section>

      {/* FOOTER */}
      <Footer />
    </>
  );
}

/* ========================
   SUPPORTING UI COMPONENTS
   ======================== */

function AdminCounterCard({ title, value, icon }) {
  return (
    <motion.div whileHover={{ y: -5, scale: 1.04 }} className="bg-white/10 border border-white/20 rounded-3xl p-6 shadow-xl">
      <div className="text-3xl text-indigo-300 mb-2">{icon}</div>
      <p className="text-sm font-semibold text-white/80">{title}</p>
      <p className="text-2xl font-black text-white">{value}</p>
    </motion.div>
  );
}
