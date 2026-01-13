import { FiMapPin, FiDollarSign, FiArrowRight } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

export default function JobCard({ job, companies = [] }) {
  const navigate = useNavigate();

  // Resolve company via FK (safe fallback)
  const company = companies.find(
    (c) => Number(c.id) === Number(job.company_id)
  );

  return (
    <div className="group bg-white border border-black/10 rounded-3xl p-6 
                    shadow-sm hover:shadow-xl transition-all duration-300 
                    text-black flex flex-col justify-between">

      {/* ================= HEADER ================= */}
      <div className="mb-4">
        <h2 className="text-xl font-black leading-snug mb-1 group-hover:text-indigo-700 transition-colors">
          {job.title}
        </h2>

        <p className="text-sm font-semibold text-black/70">
          {company?.name || job.company || "Company"}
        </p>
      </div>

      {/* ================= META INFO ================= */}
      <div className="space-y-2 mb-5">
        <p className="text-sm text-black/60 flex items-center gap-2">
          <FiMapPin className="opacity-70" />
          <span>{job.location || "Location not specified"}</span>
        </p>

        <p className="text-sm font-bold text-indigo-600 flex items-center gap-2">
          <FiDollarSign />
          <span>
            ₹ {job.salary ? job.salary : "Not disclosed"}
          </span>
        </p>
      </div>

      {/* ================= FOOTER ================= */}
      <div className="flex items-center justify-between mt-auto pt-4 border-t border-black/10">
        <span className="text-xs text-black/40">
          Job ID #{job.id}
        </span>

        <button
          onClick={() => navigate(`/jobs/${job.id}`)}
          className="flex items-center gap-2 bg-black text-white px-5 py-2 
                     rounded-xl text-sm font-semibold 
                     hover:bg-black/90 active:scale-95 transition-all"
        >
          View Job <FiArrowRight />
        </button>
      </div>
    </div>
  );
}
