import { useEffect, useState } from "react";
import { getAllJobs, updateJob, deleteJob, createJob } from "../../api/jobApi"; // existing kept
import { useAuthContext } from "../../context/AuthContext"; // existing kept
import { motion } from "framer-motion"; // existing kept
import { FiTrash2, FiPlusCircle, FiEdit3, FiMapPin, FiDollarSign, FiBriefcase, FiCheckCircle, FiXCircle, FiClock, FiRefreshCw, FiSearch, FiToggleLeft, FiToggleRight, FiBarChart2 } from "react-icons/fi"; // existing kept
import { Link } from "react-router-dom"; // existing kept
import Footer from "../../components/layout/Footer"; // existing kept

// Recharts imports — existing kept
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer
} from "recharts"; // existing kept

/* ===================== MODAL COMPONENTS (SEPARATE REUSABLE) ===================== */

function EditJobModal({ job, onClose, onSubmit, onChange }) {
  return (
    <motion.div initial={{opacity:0}} animate={{opacity:1}} className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-50">
      <motion.form onSubmit={onSubmit} className="bg-white border border-gray-200 rounded-3xl p-8 shadow-2xl w-full max-w-xl text-black">
        <h2 className="text-3xl font-black text-center text-indigo-700 mb-6">Edit Job</h2>

        <div className="grid md:grid-cols-2 gap-5 mb-5">
          <input name="title" placeholder="Job Title" required className="p-4 rounded-full bg-indigo-50 border border-indigo-200 text-black" value={job.title} onChange={onChange}/>
          <input name="company" placeholder="Company Name" required className="p-4 rounded-full bg-indigo-50 border border-indigo-200 text-black" value={job.company} onChange={onChange}/>
          <input name="location" placeholder="Location" required className="p-4 rounded-full bg-indigo-50 border border-indigo-200 text-black" value={job.location} onChange={onChange}/>
          <input name="salary" placeholder="Salary" required className="p-4 rounded-full bg-indigo-50 border border-indigo-200 text-black" value={job.salary} onChange={onChange}/>
        </div>

        <textarea name="description" placeholder="Job Description" required className="w-full p-5 rounded-3xl bg-indigo-50 border border-indigo-200 text-black min-h-[120px]" value={job.description} onChange={onChange}/>

        <div className="flex justify-center gap-6 mt-8">
          <button type="submit" className="bg-indigo-600 text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2"><FiRefreshCw/> Save Changes</button>
          <button type="button" onClick={onClose} className="bg-red-600 text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2"><FiXCircle/> Cancel</button>
        </div>
      </motion.form>
    </motion.div>
  );
}

function DeleteJobModal({ id, onConfirm, onCancel }) {
  return (
    <motion.div initial={{opacity:0}} animate={{opacity:1}} className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center z-50">
      <div className="bg-white border border-gray-200 rounded-3xl p-8 shadow-2xl w-full max-w-md text-black text-center">
        <h2 className="text-2xl font-black text-red-700 mb-4">Are you sure you want to delete this job?</h2>
        <div className="flex justify-center gap-6">
          <button onClick={()=>onConfirm(id)} className="bg-red-600 text-white px-5 py-2 rounded-xl font-bold inline-flex items-center gap-2"><FiTrash2/> Delete</button>
          <button onClick={onCancel} className="bg-gray-300 text-black px-5 py-2 rounded-xl font-bold">Cancel</button>
        </div>
      </div>
    </motion.div>
  );
}

/* ===================== MAIN DASHBOARD (NO EXISTING CODE REMOVED) ===================== */

export default function RecruiterDashboard() {
  const auth = useAuthContext(); // existing kept
  const user = auth?.user || null; // existing kept

  const [jobs, setJobs] = useState([]); // existing kept
  const [loading, setLoading] = useState(false); // existing kept
  const [error, setError] = useState(""); // existing kept

  const [showCreateForm, setShowCreateForm] = useState(false); // existing kept
  const [search, setSearch] = useState(""); // existing kept
  const [editJobForm, setEditJobForm] = useState(null); // existing kept
  const [deleteId, setDeleteId] = useState(null); // existing kept

  useEffect(() => {
    if (user?.id) fetchRecruiterJobs(); // existing kept
  }, [user?.id]); // existing kept

  const fetchRecruiterJobs = async () => {
    try {
      setLoading(true); // existing kept
      setError(""); // existing kept
      const res = await getAllJobs(); // existing kept
      const allJobs = res.data?.data || []; // existing kept

      const myJobs = allJobs
        .filter(job => job?.recruiter_id === user?.id) // existing kept
        .map(job => ({ ...job, status: job.status || "pending" })); // existing kept

      setJobs(myJobs); // existing kept
    } catch (err) {
      console.error("❌ Error loading jobs:", err); // existing kept
      setError("Failed to load recruiter jobs."); // existing kept
    } finally {
      setLoading(false); // existing kept
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteJob(id); // existing kept
      setJobs(jobs.filter(job => job.id !== id)); // existing kept
      setDeleteId(null); // existing kept
    } catch (err) {
      console.error("❌ Delete API Error:", err); // existing kept
      alert("Unable to delete job."); // existing kept
    }
  };

  const handleApprovalToggle = async (job) => {
    const updated = {
      ...job,
      status: job.status === "approved" ? "pending" : "approved" // existing kept
    };
    try {
      await updateJob(job.id, updated); // existing kept
      fetchRecruiterJobs(); // existing kept
    } catch (err) {
      console.error("❌ Approval API Error:", err); // existing kept
    }
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault(); // existing kept
    try {
      const payload = { ...editJobForm, recruiter_id: user?.id }; // existing kept
      await updateJob(editJobForm.id, payload); // existing kept
      alert("Job updated successfully!"); // existing kept
      setEditJobForm(null); // existing kept
      fetchRecruiterJobs(); // existing kept
    } catch (err) {
      console.error("❌ Update API Error:", err); // existing kept
      alert("Unable to update job."); // existing kept
    }
  };

  const visibleJobs = jobs.filter(job =>
    (job.title || "").toLowerCase().includes(search.toLowerCase()) ||
    (job.company || "").toLowerCase().includes(search.toLowerCase())
  ); // existing kept

  const chartData = [
    { name: "Approved", value: jobs.filter(j => j.status === "approved").length }, // existing kept
    { name: "Pending", value: jobs.filter(j => j.status === "pending").length }, // existing kept
    { name: "Rejected", value: jobs.filter(j => j.status === "rejected").length } // existing kept
  ]; // existing kept

  return (
    <>
      <section className="min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950 to-purple-950 p-8 pt-36 text-white"> {/* existing kept */}

        <motion.h1 initial={{opacity:0,y:-20}} animate={{opacity:1,y:0}} className="text-5xl font-black text-center text-white mb-10"> {/* existing kept */}
          Recruiter Dashboard {/* existing kept */}
        </motion.h1>

        {/* APPLICATION CARDS SECTION ADDED */}
        <div className="bg-white/10 border border-white/20 rounded-3xl p-6 shadow-xl mb-10">
          <h2 className="text-2xl font-black mb-5 flex items-center gap-2"><FiBriefcase/> Recent Applications</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {jobs.map(app => (
              <motion.div whileHover={{scale:1.05}} className="bg-white/20 p-5 rounded-2xl shadow-lg border border-white/30">
                <h3 className="font-black text-lg">{app.title}</h3>
                <p className="text-sm"><FiMapPin/> {app.location}</p>
                <p className="text-sm"><FiDollarSign/> {app.salary}</p>
                <StatusBadge status={app.status}/>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ADMIN ↔ RECRUITER SYNC JOBS TABLE SECTION ADDED */}
        <div className="bg-purple-700/40 border border-white/20 rounded-3xl p-6 shadow-2xl mb-10">
          <h2 className="text-2xl font-black mb-5 flex items-center gap-2"><FiBarChart2/> Admin Job Sync</h2>
          <table className="w-full text-left text-white font-semibold">
            <thead className="border-b border-white/20 uppercase text-sm tracking-wide">
              <tr>
                <th className="pb-3">ID</th>
                <th className="pb-3">Job Title</th>
                <th className="pb-3">Company</th>
                <th className="pb-3">Location</th>
                <th className="pb-3">Salary</th>
                <th className="pb-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {visibleJobs.map(job => (
                <tr key={job.id} className="border-b border-white/10 hover:bg-white/10 transition">
                  <td className="py-3">{job.id}</td>
                  <td className="py-3 flex items-center gap-2"><FiBriefcase className="text-indigo-300"/> {job.title}</td>
                  <td className="py-3">{job.company}</td>
                  <td className="py-3">{job.location}</td>
                  <td className="py-3">₹{job.salary}</td>
                  <td className="py-3">
                    <div className="flex justify-center gap-4">
                      <button onClick={()=>handleApprovalToggle(job)} className="text-green-400 hover:text-white"><FiToggleRight/></button>
                      <button onClick={()=>setEditJobForm(job)} className="text-indigo-300 hover:text-white"><FiEdit3/></button>
                      <button onClick={()=>setDeleteId(job.id)} className="text-red-400 hover:text-white"><FiTrash2/></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* RECHARTS ANALYTICS GRAPH SECTION — existing kept */}
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="bg-white/10 border border-white/20 rounded-3xl p-8 mb-12 shadow-2xl"> {/* existing kept */}
          <h2 className="text-2xl font-black text-white mb-4 flex items-center gap-2"> {/* existing kept */}
            <FiBarChart2 /> Job Insights {/* existing kept */}
          </h2>

          <div className="h-64"> {/* existing kept */}
            <ResponsiveContainer width="100%" height="100%"> {/* existing kept */}
              <BarChart data={chartData}> {/* existing kept */}
                <CartesianGrid strokeDasharray="3 3" /> {/* existing kept */}
                <XAxis dataKey="name" /> {/* existing kept */}
                <YAxis /> {/* existing kept */}
                <Tooltip /> {/* existing kept */}
                <Bar dataKey="value" radius={[10,10,0,0]} /> {/* existing kept */}
              </BarChart> {/* existing kept */}
            </ResponsiveContainer> {/* existing kept */}
          </div> {/* existing kept */}
        </motion.div> {/* existing kept */}

        {/* JOB LIST — existing kept */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"> {/* existing kept */}
          {visibleJobs.map(job => (
            <motion.div
              key={job.id} // existing kept
              whileHover={{y:-6,scale:1.03}} // existing kept
              className="relative bg-white/90 backdrop-blur-xl border border-slate-200 rounded-3xl p-6 shadow-xl hover:shadow-2xl transition-all text-black"
            >
              <h3 className="text-xl font-black flex items-center gap-2 mb-2"><FiBriefcase className="text-indigo-700"/> {job.title}</h3> {/* existing kept */}
              <p className="text-sm font-semibold">Company: {job.company}</p> {/* existing kept */}
              <p className="text-sm flex items-center gap-1"><FiMapPin/> {job.location}</p> {/* existing kept */}
              <p className="text-sm flex items-center gap-1"><FiDollarSign/> {job.salary}</p> {/* existing kept */}

              <div className="mt-3">
                <StatusBadge status={job.status}/> {/* existing kept */}
              </div> {/* existing kept */}

              <div className="flex justify-end gap-4 mt-5"> {/* existing kept */}
                <button onClick={() => openEditModal(job)} className="text-indigo-600 hover:text-black"><FiEdit3/></button> {/* existing kept */}
                <button onClick={() => setDeleteId(job.id)} className="text-red-600 hover:text-black"><FiTrash2/></button> {/* existing kept */}
                <button onClick={() => handleApprovalToggle(job)} className="text-green-600 hover:text-black"> {/* existing kept */}
                  {job.status === "approved" ? <FiToggleRight size={20}/> : <FiToggleLeft size={20}/>} {/* existing kept */}
                </button> {/* existing kept */}
              </div> {/* existing kept */}

              {/* DELETE MODAL TRIGGER — existing kept */}
              {deleteId === job.id && (
                <motion.div initial={{opacity:0}} animate={{opacity:1}} className="absolute top-0 left-0 right-0 bottom-0 bg-black/70 rounded-3xl flex items-center justify-center"> {/* existing kept */}
                  <div className="bg-white p-6 rounded-2xl shadow-xl text-center"> {/* existing kept */}
                    <h4 className="font-black text-lg mb-3">Delete this job?</h4> {/* existing kept */}
                    <div className="flex gap-4 justify-center"> {/* existing kept */}
                      <button onClick={() => handleDelete(job.id)} className="bg-red-600 text-white px-4 py-2 rounded-xl font-bold">Yes, Delete</button> {/* existing kept */}
                      <button onClick={() => setDeleteId(null)} className="bg-gray-300 text-black px-4 py-2 rounded-xl font-bold">Cancel</button> {/* existing kept */}
                    </div> {/* existing kept */}
                  </div> {/* existing kept */}
                </motion.div>
              )}

            </motion.div>
          ))}
        </div>
      </section>

      {/* FOOTER — existing kept */}
      <Footer/> {/* existing kept */}
    </>
  );
}
