import { FiMapPin, FiDollarSign } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

export default function JobCard({ job }) {
  const navigate = useNavigate();

  return (
    <div className="bg-white border border-black/10 rounded-3xl p-6 shadow-xl text-black">
      
      {/* COMPANY LOGO (optional / fallback) */}
      <img
        src={job.company_logo || "/default-logo.png"}
        alt={job.company || "Company Logo"}
        className="h-14 mb-3 rounded-xl mx-auto object-contain"
      />

      {/* JOB TITLE */}
      <h2 className="text-3xl font-black text-center mb-2">
        {job.title}
      </h2>

      {/* COMPANY NAME ✅ FIXED */}
      <p className="text-lg font-bold text-center text-black/80 mb-3">
        {job.company || "Company Not Available"}
      </p>

      {/* LOCATION */}
      <p className="text-sm flex justify-center items-center gap-1 mb-1 text-black/70 font-semibold">
        <FiMapPin />
        {job.location || "Location not specified"}
      </p>

      {/* SALARY ✅ FIXED */}
      <p className="text-sm flex justify-center items-center gap-1 mb-3 text-black/70 font-semibold">
        <FiDollarSign />
        {job.salary ? `₹ ${job.salary}` : "Salary not disclosed"}
      </p>

      {/* DESCRIPTION */}
      <p className="text-sm text-center opacity-80 line-clamp-3 font-medium">
        {job.description || "No description available"}
      </p>

      {/* ACTION BUTTON */}
      <div className="text-center mt-4">
        <button
          onClick={() => navigate(`/company/${job.company_id}/jobs`)}
          className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-2 rounded-full font-bold hover:scale-105 transition"
        >
          View Jobs
        </button>
      </div>
    </div>
  );
}
