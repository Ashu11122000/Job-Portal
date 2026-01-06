import { useEffect, useState } from "react";
import { getAllJobs, updateJob, deleteJob, createJob } from "../../api/jobApi";
import { getMyApplications } from "../../api/applicationApi";
import { useAuthContext } from "../../context/AuthContext";
import { motion } from "framer-motion";
import {
  FiTrash2,
  FiPlusCircle,
  FiEdit3,
  FiMapPin,
  FiDollarSign,
  FiBriefcase,
  FiSearch,
  FiToggleLeft,
  FiToggleRight,
  FiBarChart2,
  FiCheckCircle,
  FiXCircle,
  FiClock,
} from "react-icons/fi";
import { Link } from "react-router-dom";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer 
} from "recharts";
import Footer from "../../components/layout/Footer";

// accordion
import {
  Accordion,
  AccordionTrigger,
  AccordionContent,
  AccordionItem,
} from "../../components/ui/accordion.jsx";

/* ===================== TOAST SYSTEM (PREMIUM) ===================== */
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

export default function RecruiterDashboard() {
  const auth = useAuthContext();
  const user = auth?.user || null;

  const [jobs, setJobs] = useState([]);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [editJobForm, setEditJobForm] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [toast, setToast] = useState(null);

  const [newJobForm, setNewJobForm] = useState({
    title: "",
    company: "",
    location: "",
    salary: "",
    description: "",
  });

  useEffect(() => {
    if (user?.id) fetchRecruiterJobs();
    if (user?.id) fetchApplications();
  }, [user?.id]);

  const fetchRecruiterJobs = async () => {
    try {
      setLoading(true);
      setError("");
      const res = await getAllJobs();

      // Ensure array shape
      const allJobs = Array.isArray(res.data?.jobs)
        ? res.data.jobs
        : Array.isArray(res.data?.data)
        ? res.data.data
        : [];
        console.log("Jobs received:", res.data);

      const myJobs = allJobs
        .filter((job) => job?.recruiter_id === user?.id)
        .map((job) => ({
          ...job,
          status: job.status || "pending",
        }));

      setJobs(myJobs);
    } catch (err) {
      console.error("❌ Error loading jobs:", err);
      setError("Failed to load recruiter jobs.");
    } finally {
      setLoading(false);
    }
  };

  const fetchApplications = async () => {
    try {
      const res = await getMyApplications(user?.id);
      const apps = Array.isArray(res.data?.applications || res.data?.data || res.data)
        ? res.data.applications || res.data.data || res.data
        : [];
      setApplications(apps);
    } catch (err) {
      console.error("❌ Error loading applications:", err);
    }
  };

  const handleCreateJobUI = async (e) => {
    e.preventDefault();
    try {
      await createJob({
        ...newJobForm,
        recruiter_id: user?.id,
        status: "pending",
      });
      setShowCreateForm(false);
      setToast({ message: "Job Posted Successfully!", type: "success" });
      fetchRecruiterJobs();
    } catch (err) {
      setToast({ message: "Failed to Post Job", type: "error" });
    }
  };

  const openEditModal = (job) => {
    setEditJobForm(job);
  };

  const handleDelete = async (id) => {
    try {
      await deleteJob(id);
      setJobs(jobs.filter(job => job.id !== id)); // UI instant update
      setDeleteId(null);
      setToast({ message: "Job Deleted!", type: "success" });
    } catch (err) {
      setToast({ message: "Delete Failed!", type: "error" });
    }
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = { ...editJobForm, recruiter_id: user?.id };
      await updateJob(editJobForm.id, payload);
      setEditJobForm(null);
      setToast({ message: "Job Updated!", type: "success" });
      fetchRecruiterJobs();
    } catch (err) {
      setToast({ message: "Update Failed!", type: "error" });
    }
  };

  const handleApprovalToggle = async (job) => {
    const updated = {
      ...job,
      status: job.status === "approved" ? "pending" : "approved",
    };
    try {
      await updateJob(job.id, updated);
      setToast({ message: "Status Updated!", type: "success" });
      fetchRecruiterJobs();
    } catch (err) {
      setToast({ message: "Status Update Failed!", type: "error" });
    }
  };

  const visibleJobs = jobs.filter(
    (job) =>
      (job.title || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      (job.company || "").toLowerCase().includes(searchTerm.toLowerCase())
  );

  const chartData = [
    { name: "Approved", value: jobs.filter((j) => j.status === "approved").length },
    { name: "Pending", value: jobs.filter((j) => j.status === "pending").length },
  ];

  return (
    <>
      {toast && <Toast message={toast.message} type={toast.type} />}

      <section className="min-h-screen bg-gradient-to-br from-black via-[#0f172a] to-[#4c1d95] p-8 pt-36 text-white">

        {/* SEARCH */}
        <div className="relative max-w-lg mx-auto mb-6">
          <FiSearch className="absolute top-4 left-5 text-2xl text-white/50"/>
          <input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search jobs..."
            className="w-full bg-black/40 border border-white/20 rounded-full py-4 pl-16 pr-6 text-white text-lg shadow-[0_0_25px_rgba(99,102,241,0.5)] backdrop-blur-xl focus:ring-4 focus:ring-indigo-600 outline-none transition-all"
          />
        </div>

        {/* STATS */}
        <div className="grid grid-cols-3 gap-6 max-w-3xl mx-auto mb-10">
          <SummaryCard title="Total Jobs" value={jobs.length} icon={<FiBriefcase/>}/>
          <SummaryCard title="Approved" value={jobs.filter(j=>j.status==="approved").length} icon={<FiCheckCircle/>}/>
          <SummaryCard title="Pending" value={jobs.filter(j=>j.status==="pending").length} icon={<FiClock/>}/>
        </div>

        {/* APPLICATION CARDS */}
        <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} className="bg-black/30 border border-white/10 rounded-3xl p-8 shadow-[0_0_40px_rgba(168,85,247,0.4)] backdrop-blur-xl mb-10">
          <h2 className="text-3xl font-black mb-6 flex items-center gap-3"><FiBarChart2/> Candidate Pipeline</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {applications.map(app=>(
              <motion.div whileHover={{scale:1.05}} key={app.id} className="bg-white/10 border border-white/10 rounded-2xl p-6 shadow-xl">
                <h3 className="font-black text-xl mb-1">{app.job_title}</h3>
                <p className="text-sm flex items-center gap-1 mb-1"><FiMapPin/> {app.location}</p>
                <p className="text-sm mb-3">👤 {app.candidate_name}</p>
                <span className="px-3 py-1 rounded-full bg-indigo-600/40 border border-indigo-500/30 text-xs font-black">{app.status?.toUpperCase()}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CREATE JOB ACCORDION */}
        <div className="flex justify-end mb-6">
          <motion.button
            whileHover={{scale:1.06}}
            onClick={() => setShowCreateForm(true)}
            className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-4 rounded-2xl text-xl font-black shadow-[0_0_30px_rgba(99,102,241,0.6)] flex items-center gap-3 border border-white/10"
          >
            <FiPlusCircle/> Post a Job
          </motion.button>
        </div>

        {showCreateForm && (
          <Accordion type="single" collapsible className="max-w-3xl mx-auto mb-10">
            <AccordionItem value="create-job">
              <AccordionTrigger className="text-2xl font-black text-center w-full flex items-center justify-center gap-2">
                <FiCheckCircle/> Create New Job
              </AccordionTrigger>
              <AccordionContent>
                <motion.form onSubmit={handleCreateJobUI} className="grid gap-6 mt-4">
                  <input required placeholder="Job Title" className="p-4 bg-black/50 border border-white/10 rounded-xl text-white text-lg" value={newJobForm.title} onChange={e=>setNewJobForm({...newJobForm,title:e.target.value})}/>
                  <input required placeholder="Company" className="p-4 bg-black/50 border border-white/10 rounded-xl text-white text-lg" value={newJobForm.company} onChange={e=>setNewJobForm({...newJobForm,company:e.target.value})}/>
                  <input required placeholder="Location" className="p-4 bg-black/50 border border-white/10 rounded-xl text-white text-lg" value={newJobForm.location} onChange={e=>setNewJobForm({...newJobForm,location:e.target.value})}/>
                  <input required placeholder="Salary" className="p-4 bg-black/50 border border-white/10 rounded-xl text-white text-lg" value={newJobForm.salary} onChange={e=>setNewJobForm({...newJobForm,salary:e.target.value})}/>
                  <textarea required placeholder="Job Description" className="p-4 bg-black/50 border border-white/10 rounded-xl text-white min-h-[140px] text-lg" value={newJobForm.description} onChange={e=>setNewJobForm({...newJobForm,description:e.target.value})}/>
                  <div className="flex justify-center gap-6 mt-6">
                    <button type="submit" className="bg-green-600/60 border border-green-500/40 text-white px-6 py-3 rounded-xl font-black flex items-center gap-2 text-lg"><FiCheckCircle/> Create</button>
                    <button type="button" onClick={()=>setShowCreateForm(false)} className="bg-red-600/60 border border-red-500/40 text-white px-6 py-3 rounded-xl font-black flex items-center gap-2 text-lg"><FiXCircle/> Cancel</button>
                  </div>
                </motion.form>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        )}

        {/* CHART */}
        <div className="bg-black/40 border border-white/10 rounded-3xl p-8 shadow-2xl backdrop-blur-xl mb-12">
          <h2 className="text-3xl font-black mb-6 flex items-center gap-3"><FiBarChart2/> Hiring Funnel</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3"/>
              <XAxis dataKey="name"/>
              <YAxis/>
              <Tooltip/>
              <Bar dataKey="value" radius={[10,10,0,0]}/>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* JOBS VISIBLE */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
  {visibleJobs.map(job => (
    <motion.div
      whileHover={{ y: -6, scale: 1.02 }}
      key={job.id}
      className="bg-white/95 border border-white/20 text-black rounded-3xl p-8 shadow-[0_0_50px_rgba(99,102,241,0.4)] backdrop-blur-2xl"
    >
      <h3 className="text-3xl font-black mb-2">{job.title}</h3>
      <p className="text-lg font-semibold opacity-80 mb-1">{job.company}</p>
      <p className="text-sm flex items-center gap-1 mb-1">
        <FiMapPin/> {job.location}
      </p>
      <p className="text-sm flex items-center gap-1 mb-3">
        <FiDollarSign/> ₹{job.salary}
      </p>

      {/* Status Badge preserved */}
      <StatusBadge status={job.status}/>

      {/* Actions preserved and API connected */}
      <div className="flex justify-end gap-5 mt-6">
        <button onClick={() => openEditModal(job)}>
          <FiEdit3 size={24}/>
        </button>

        <button onClick={() => setDeleteId(job.id)}>
          <FiTrash2 size={24}/>
        </button>

        <button onClick={() => handleApprovalToggle(job)}>
          {job.status === "approved"
            ? <FiToggleRight size={26}/>
            : <FiToggleLeft size={26}/>}
        </button>
      </div>
    </motion.div>
  ))}
</div>


        {jobs.map(job => (
          <button onClick={() => setDeleteId(job.id)}>Delete</button>
        ))}

        {deleteId && (
          <DeleteJobModal
            id={deleteId}
            onConfirm={handleDelete} // <-- already connected
            onCancel={() => setDeleteId(null)}
          />
        )}
        {editJobForm && (
          <EditJobModal
            job={editJobForm}
            onClose={() => setEditJobForm(null)}
            onSubmit={handleEditSubmit}
            onChange={(e) =>
              setEditJobForm({ ...editJobForm, [e.target.name]: e.target.value })
            }
          />
        )}
      </section>

      <Footer/>
    </>
  );
}

function SummaryCard({title,value,icon}) {
  return (
    <motion.div whileHover={{scale:1.05}} className="bg-black/40 border border-white/10 rounded-2xl p-6 text-center shadow-2xl">
      <div className="text-4xl flex justify-center mb-2">{icon}</div>
      <p className="text-sm opacity-70 font-semibold">{title}</p>
      <p className="text-3xl font-black">{value}</p>
    </motion.div>
  );
}

function StatusBadge({status}) {
  const safe = status || "pending";
  return (
    <span className="text-xs px-3 py-1 rounded-full font-semibold bg-indigo-500/20 text-indigo-200 border border-indigo-400/30">
      {safe.toUpperCase()}
    </span>
  );
}
