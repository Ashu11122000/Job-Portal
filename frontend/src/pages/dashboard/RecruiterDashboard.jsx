import { useEffect, useState } from "react";
import { getAllJobs, updateJob, deleteJob, createJob } from "../../api/jobApi";
import { getMyApplications } from "../../api/applicationApi";
import { getCompanies } from "../../api/companyApi";
import axios from "axios";
import { useAuthContext } from "../../context/AuthContext";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";
import {
  FiTrash2,
  FiPlusCircle,
  FiMapPin,
  FiBriefcase,
  FiSearch,
  FiEye,
  FiRefreshCw,
  FiCheckCircle,
  FiClipboard,
  FiDollarSign,
  FiEdit,
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
function JobForm({ job, onSubmit, onCancel, companies }) {
  const [form, setForm] = useState(
    job || {
      title: "",
      company_id: "",
      company: "",
      location: "",
      salary: "",
      description: "",
    }
  );

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "company_id") {
      const selectedCompany = companies.find(
        (c) => String(c.id) === value
      );

      setForm({
        ...form,
        company_id: value,
        company: selectedCompany?.name || "",
      });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

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

      <input
        name="title"
        value={form.title}
        onChange={handleChange}
        placeholder="TITLE"
        className="p-3 rounded-xl bg-black/60 border border-white/10 text-white"
        required
      />

      <select
        name="company_id"
        value={form.company_id}
        onChange={handleChange}
        required
        className="p-3 rounded-xl bg-black/60 border border-white/10 text-white"
      >
        <option value="">Select Company</option>
        {companies.map((c) => (
          <option key={c.id} value={c.id}>
            {c.name}
          </option>
        ))}
      </select>

      <input
        name="location"
        value={form.location}
        onChange={handleChange}
        placeholder="LOCATION"
        className="p-3 rounded-xl bg-black/60 border border-white/10 text-white"
        required
      />

      <input
        name="salary"
        value={form.salary}
        onChange={handleChange}
        placeholder="SALARY"
        className="p-3 rounded-xl bg-black/60 border border-white/10 text-white"
        required
      />

      {/* hidden company name */}
      <input type="hidden" name="company" value={form.company} />

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
  const { user } = useAuthContext();

  const [jobs, setJobs] = useState([]);
  const [applications, setApplications] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [toast, setToast] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [showJobForm, setShowJobForm] = useState(false);
  const [editJob, setEditJob] = useState(null);

  useEffect(() => {
    axios.defaults.baseURL =
      import.meta.env.VITE_API_BASE_URL ||
      "https://job-portal-production-2c0d.up.railway.app/api";
  }, []);

  useEffect(() => {
    if (user?.id) fetchAll();
  }, [user?.id]);

  const fetchAll = async () => {
    try {
      const [jobsRes, appsRes, companiesRes] = await Promise.all([
        getAllJobs(),
        getMyApplications(user.id),
        getCompanies(),
      ]);

      setJobs(
        (jobsRes.data?.data || []).filter(
          (j) => j.recruiter_id === user.id
        )
      );
      setApplications(appsRes.data?.data || []);
      setCompanies(companiesRes.data?.companies || []);
    } catch (err) {
      setToast({ message: "Failed to load dashboard", type: "error" });
    }
  };

  const submitJob = async (data, id) => {
    try {
      const company = companies.find(
        (c) => c.id === Number(data.company_id)
      );

      if (!company) throw new Error("Invalid company");

      const payload = {
        ...data,
        company_id: Number(data.company_id),
        company: company.name,
        recruiter_id: user.id,
        salary: Number(data.salary),
      };

      id ? await updateJob(id, payload) : await createJob(payload);

      setToast({ message: "Job saved successfully", type: "success" });
      setShowJobForm(false);
      setEditJob(null);
      fetchAll();
    } catch (err) {
      setToast({
        message: err.message || "Failed to save job",
        type: "error",
      });
    }
  };

  const removeJob = async (id) => {
    if (!window.confirm("Delete this job?")) return;
    await deleteJob(id);
    fetchAll();
  };

  const getCompanyById = (id) =>
    companies.find((c) => Number(c.id) === Number(id));

  const visibleJobs = jobs.filter(
    (j) =>
      j.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      j.company?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalViews = jobs.reduce((a, b) => a + (b.views || 0), 0);

  return (
  <>
    <Navbar />
    <AnimatePresence>{toast && <Toast {...toast} />}</AnimatePresence>

    <section className="min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950 to-purple-950 p-8 mt-[70px] text-white">

      {/* ================= HEADER ================= */}
      <div className="flex justify-between mb-10 items-center">
        <h1 className="text-4xl font-black">Recruiter Dashboard</h1>
        <button
          onClick={() => setShowJobForm(true)}
          className="bg-indigo-600/40 p-3 rounded-xl"
        >
          <FiPlusCircle />
        </button>
      </div>

      {/* ================= KPI SECTION (NEW) ================= */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-6xl mx-auto mb-16">
        <SummaryCard title="Total Jobs" value={jobs.length} icon={<FiBriefcase />} />
        <SummaryCard title="Applications" value={applications.length} icon={<FiClipboard />} />
        <SummaryCard title="Total Views" value={totalViews} icon={<FiEye />} />
        <SummaryCard
          title="Companies"
          value={companies.length}
          icon={<FiDollarSign />}
        />
      </div>

      {/* ================= JOB FORM ================= */}
      {showJobForm && (
        <JobForm
          job={editJob}
          companies={companies}
          onSubmit={submitJob}
          onCancel={() => {
            setShowJobForm(false);
            setEditJob(null);
          }}
        />
      )}

      {/* ================= JOBS ================= */}
      <h2 className="text-3xl font-black mb-6">My Jobs</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
        {visibleJobs.map((job) => {
          const company = getCompanyById(job.company_id);

          return (
            <motion.div
              key={job.id}
              whileHover={{ y: -6 }}
              className="bg-white/10 border border-white/20 rounded-3xl p-6"
            >
              <div className="flex gap-3 mb-3 items-center">
                <img
                  src={company?.logo || "https://via.placeholder.com/48?text=🏢"}
                  className="w-12 h-12 rounded-xl bg-white object-cover"
                />
                <div>
                  <h3 className="font-black">{job.title}</h3>
                  <p className="text-sm opacity-70">
                    {company?.name || job.company}
                  </p>
                </div>
              </div>

              <p className="text-xs flex items-center gap-1 opacity-80">
                <FiMapPin /> {job.location}
              </p>

              <div className="flex justify-end gap-3 mt-4">
                <button
                  onClick={() => {
                    setEditJob(job);
                    setShowJobForm(true);
                  }}
                >
                  <FiEdit />
                </button>
                <button onClick={() => removeJob(job.id)}>
                  <FiTrash2 />
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* ================= APPLICATIONS SECTION (NEW) ================= */}
      <h2 className="text-3xl font-black mb-6">Recent Applications</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
        {applications.length > 0 ? (
          applications.map((app) => (
            <motion.div
              key={app.id}
              whileHover={{ scale: 1.02 }}
              className="bg-black/40 border border-white/10 rounded-3xl p-6"
            >
              <h3 className="font-black">{app.candidate_name}</h3>
              <p className="text-sm opacity-70 mb-2">{app.job_title}</p>
              <StatusBadge status={app.status} />
            </motion.div>
          ))
        ) : (
          <p className="opacity-60">No applications yet.</p>
        )}
      </div>
    </section>

    <Footer />
  </>
);

}
