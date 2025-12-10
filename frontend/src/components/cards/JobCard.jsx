import { useNavigate } from "react-router-dom";

export default function JobCard({ job }) {
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition">
      <h3 className="text-lg font-bold text-slate-900 mb-2">{job.title}</h3>

      <p className="text-slate-600 mb-1">
        {job.company?.name || "Company Not Available"}
      </p>

      <p className="text-sm text-slate-500 mb-4">
        {job.location || "Location not specified"}
      </p>

      <p className="text-indigo-600 font-semibold mb-4">
        ₹{job.salaryRange?.min?.toLocaleString()} - ₹
        {job.salaryRange?.max?.toLocaleString()}
      </p>

      <div className="flex justify-between items-center">
        <span className="text-xs bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full">
          {job.jobType}
        </span>

        {/* ✅ WORKING VIEW JOB BUTTON */}
        <button
          onClick={() => navigate(`/jobs/${job._id || job.id}`)}
          className="text-sm text-white bg-indigo-600 px-4 py-2 rounded-lg hover:bg-indigo-700"
        >
          View Job
        </button>
      </div>
    </div>
  );
}
