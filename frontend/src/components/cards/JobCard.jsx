import { FiMapPin, FiDollarSign } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

export default function JobCard({ job }) {
  const navigate = useNavigate();

  return (
    <div className="bg-white border border-black/10 rounded-3xl p-6 shadow-xl text-black">
      
      {/* JOB TITLE */}
      <h2 className="text-xl font-black mb-2">
        {job.title}
      </h2>

      {/* COMPANY NAME ✅ */}
      <p className="text-sm font-bold text-black/80 mb-2">
        {job.company || "Company Not Available"}
      </p>

      {/* LOCATION */}
      <p className="text-sm text-black/60 mb-1 flex items-center gap-1">
        <FiMapPin />
        {job.location || "Location not specified"}
      </p>

      {/* TOTAL SALARY (AS ENTERED IN API) ✅ */}
      <p className="text-sm text-indigo-600 font-bold mb-4 flex items-center gap-1">
        <FiDollarSign />
        ₹ {job.salary || "Not Disclosed"}
      </p>

      {/* ACTION */}
      <button
        onClick={() => navigate(`/jobs/${job.id}`)}
        className="bg-black text-white px-5 py-2 rounded-lg font-semibold hover:opacity-90"
      >
        View Job
      </button>
    </div>
  );
}
