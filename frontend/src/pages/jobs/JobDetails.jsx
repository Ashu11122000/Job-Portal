import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getJobById } from "../../api/jobApi";
import { applyForJob } from "../../api/applicationApi";
import { useAuthContext } from "../../context/AuthContext";
import {
  FiMapPin,
  FiBriefcase,
  FiClock,
  FiDollarSign,
  FiArrowLeft,
  FiShare2,
  FiBookmark,
  FiCheckCircle,
  FiUsers,
  FiEye,
} from "react-icons/fi";

export default function JobDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const auth = useAuthContext() || {};
  const { isLoggedIn, user } = auth;

  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [applyLoading, setApplyLoading] = useState(false);

  /* ================= NEW STATES ================= */
  const [applicationStatus, setApplicationStatus] = useState("not_applied");
  const [saved, setSaved] = useState(false);
  const [similarJobs, setSimilarJobs] = useState([]);
  const [shareMsg, setShareMsg] = useState("");
  /* ============================================== */

  useEffect(() => {
    getJobById(id)
      .then((res) => {
        const data = res.data?.data || res.data;
        setJob(data);

        const savedJobs = JSON.parse(localStorage.getItem("savedJobs") || "[]");
        setSaved(savedJobs.includes(data.id));
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [id]);

  /* ============ SIMILAR JOBS ============ */
  useEffect(() => {
    if (!job) return;

    fetch("/api/jobs")
      .then((res) => res.json())
      .then((res) => {
        const list = res.data || [];
        const filtered = list.filter(
          (j) =>
            j.id !== job.id &&
            (j.company === job.company ||
              j.title?.toLowerCase().includes(job.title?.split(" ")[0]))
        );
        setSimilarJobs(filtered.slice(0, 3));
      })
      .catch(() => setSimilarJobs([]));
  }, [job]);

  const handleApply = async () => {
    if (!isLoggedIn) {
      alert("Please login as a candidate to apply.");
      navigate("/login");
      return;
    }

    if (user?.role !== "candidate") {
      alert("Only candidates can apply for jobs.");
      return;
    }

    setApplyLoading(true);
    setApplicationStatus("pending");

    try {
      await applyForJob({
        jobId: job.id || job._id,
        coverLetter: "I am very interested in this role.",
      });

      setApplicationStatus("applied");
      alert("✅ Application submitted successfully!");
    } catch (err) {
      console.error(err);
      setApplicationStatus("not_applied");
      alert(err.response?.data?.message || "Failed to apply.");
    } finally {
      setApplyLoading(false);
    }
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setShareMsg("Job link copied!");
    setTimeout(() => setShareMsg(""), 2000);
  };

  const toggleSave = () => {
    const savedJobs = JSON.parse(localStorage.getItem("savedJobs") || "[]");
    const updated = saved
      ? savedJobs.filter((jid) => jid !== job.id)
      : [...savedJobs, job.id];

    localStorage.setItem("savedJobs", JSON.stringify(updated));
    setSaved(!saved);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-xl font-semibold">
        Loading job details…
      </div>
    );
  }

  if (!job) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-600">
        Job not found.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 px-6 py-24">
      <div className="max-w-5xl mx-auto bg-white/80 backdrop-blur rounded-3xl shadow-2xl p-10 border border-slate-100">

        {/* BACK */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-black mb-8"
        >
          <FiArrowLeft /> Back to Jobs
        </button>

        {/* HEADER */}
        <div className="border-b border-slate-200 pb-8 mb-10">
          <h1 className="text-4xl font-black text-slate-900 mb-2">
            {job.title}
          </h1>

          <p className="text-lg font-semibold text-indigo-600 mb-4">
            {job.company}
          </p>

          <div className="flex flex-wrap gap-4 text-slate-600 text-sm">
            <Meta icon={<FiMapPin />} label={job.location} />
            <Meta icon={<FiBriefcase />} label={job.jobType || "Full-Time"} />
            <Meta icon={<FiClock />} label={`${job.experience || "0–2"} Years`} />
          </div>

          <div className="mt-6 flex items-center justify-between">
            <div className="text-2xl font-black text-indigo-700 flex items-center gap-2">
              <FiDollarSign />
              {job.salary}
            </div>

            <div className="flex gap-4">
              <button onClick={handleShare} className="icon-btn">
                <FiShare2 />
              </button>
              <button onClick={toggleSave} className="icon-btn">
                <FiBookmark className={saved ? "text-indigo-600" : ""} />
              </button>
            </div>
          </div>

          {shareMsg && (
            <p className="text-green-600 text-sm mt-2">{shareMsg}</p>
          )}
        </div>

        {/* APPLY STATUS */}
        <div className="mb-6">
          {applicationStatus === "applied" && <StatusBadge text="Applied" />}
          {applicationStatus === "pending" && <StatusBadge text="Pending" />}
        </div>

        {/* APPLY */}
        <div className="mt-6 flex flex-wrap gap-6">
          <button
            onClick={handleApply}
            disabled={applyLoading || applicationStatus === "applied"}
            className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-12 py-3 rounded-full font-semibold shadow-lg hover:scale-105 transition disabled:opacity-60"
          >
            {applicationStatus === "applied"
              ? "Applied"
              : applyLoading
              ? "Applying…"
              : "Apply Now"}
          </button>
        </div>

        {/* 🔥 NEW: JOB INFORMATION */}
        <Section title="Job Information">
          <div className="grid md:grid-cols-2 gap-6">
            <InfoRow label="Employment Type" value={job.jobType || "Full-Time"} />
            <InfoRow label="Work Mode" value={job.workMode || "Onsite"} />
            <InfoRow label="Department" value={job.department || "Engineering"} />
            <InfoRow label="Notice Period" value={job.noticePeriod || "Immediate"} />
            <InfoRow label="Hiring Timeline" value={job.hiringTimeline || "2–4 Weeks"} />
            <InfoRow label="Job Reference ID" value={`JOB-${job.id}`} />
          </div>
        </Section>

        {/* 🔥 NEW: COMPANY INFORMATION */}
        <Section title="Company Information">
          <div className="grid md:grid-cols-2 gap-6">
            <InfoRow label="Company Name" value={job.company} />
            <InfoRow label="Company Size" value={job.companySize || "100–500 Employees"} />
            <InfoRow
              label="Company Website"
              value={
                job.companyWebsite ? (
                  <a
                    href={job.companyWebsite}
                    target="_blank"
                    rel="noreferrer"
                    className="text-indigo-600 underline"
                  >
                    {job.companyWebsite}
                  </a>
                ) : (
                  "Not Available"
                )
              }
            />
            <InfoRow
              label="Last Updated"
              value={new Date(
                job.updated_at || job.updatedAt || job.created_at
              ).toDateString()}
            />
          </div>
        </Section>

        {/* RECRUITER ANALYTICS */}
        {user?.role === "recruiter" && (
          <Section title="Recruiter Analytics">
            <div className="grid grid-cols-3 gap-6">
              <AnalyticsCard icon={<FiEye />} label="Views" value="128" />
              <AnalyticsCard icon={<FiUsers />} label="Applications" value="24" />
              <AnalyticsCard
                icon={<FiCheckCircle />}
                label="Shortlisted"
                value="6"
              />
            </div>
          </Section>
        )}

        {/* SIMILAR JOBS */}
        {similarJobs.length > 0 && (
          <Section title="Similar Jobs">
            <div className="grid md:grid-cols-3 gap-6">
              {similarJobs.map((j) => (
                <div
                  key={j.id}
                  onClick={() => navigate(`/jobs/${j.id}`)}
                  className="cursor-pointer bg-white border rounded-xl p-5 shadow hover:shadow-lg transition"
                >
                  <p className="font-bold">{j.title}</p>
                  <p className="text-sm text-slate-500">{j.company}</p>
                  <p className="text-indigo-600 font-semibold mt-2">
                    {j.salary}
                  </p>
                </div>
              ))}
            </div>
          </Section>
        )}
      </div>
    </div>
  );
}

/* ---------------- UI HELPERS ---------------- */

function Meta({ icon, label }) {
  return (
    <span className="flex items-center gap-2 bg-slate-100 px-4 py-1.5 rounded-full">
      {icon}
      {label}
    </span>
  );
}

function Section({ title, children }) {
  return (
    <div className="mb-12">
      <h3 className="text-2xl font-black mb-4">{title}</h3>
      {children}
    </div>
  );
}

function StatusBadge({ text }) {
  return (
    <span className="inline-block bg-green-100 text-green-700 px-4 py-1.5 rounded-full font-semibold">
      {text}
    </span>
  );
}

function AnalyticsCard({ icon, label, value }) {
  return (
    <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-6 text-center">
      <div className="text-2xl mb-2">{icon}</div>
      <p className="text-sm text-slate-500">{label}</p>
      <p className="text-xl font-black text-indigo-700">{value}</p>
    </div>
  );
}

function InfoRow({ label, value }) {
  return (
    <div className="flex flex-col bg-slate-50 border border-slate-200 rounded-xl p-4">
      <span className="text-xs uppercase tracking-wide text-slate-500 mb-1">
        {label}
      </span>
      <span className="font-semibold text-slate-900">
        {value || "Not specified"}
      </span>
    </div>
  );
}
