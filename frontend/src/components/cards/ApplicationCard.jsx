import { motion } from "framer-motion";
import {
  FiBriefcase,
  FiMapPin,
  FiClock,
  FiCheckCircle,
  FiXCircle,
  FiEye,
} from "react-icons/fi";

/* ================= STATUS STYLES ================= */
const statusConfig = {
  pending: {
    label: "Pending",
    color: "bg-blue-500/20 text-blue-300 border-blue-500/30",
    icon: <FiClock />,
  },
  reviewed: {
    label: "Reviewed",
    color: "bg-yellow-500/20 text-yellow-300 border-yellow-500/30",
    icon: <FiEye />,
  },
  selected: {
    label: "Selected",
    color: "bg-green-500/20 text-green-300 border-green-500/30",
    icon: <FiCheckCircle />,
  },
  rejected: {
    label: "Rejected",
    color: "bg-red-500/20 text-red-300 border-red-500/30",
    icon: <FiXCircle />,
  },
};

/* ================= APPLICATION CARD ================= */
export default function ApplicationCard({ application }) {
  const {
    id,
    job_title,
    title,
    company,
    location,
    status = "pending",
    applied_at,
  } = application || {};

  const statusMeta = statusConfig[status] || statusConfig.pending;

  return (
    <motion.div
      whileHover={{ y: -6, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300 }}
      className="
        relative overflow-hidden
        bg-white/10 backdrop-blur-xl
        border border-white/20
        rounded-3xl p-6
        shadow-xl
      "
    >
      {/* Glow Accent */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-purple-500/5 to-transparent pointer-events-none" />

      {/* Header */}
      <div className="relative z-10 flex justify-between items-start gap-4 mb-4">
        <div>
          <h3 className="text-xl font-black text-white">
            {job_title || title || "Untitled Job"}
          </h3>

          <p className="text-sm text-indigo-300 flex items-center gap-1 mt-1">
            <FiBriefcase /> {company || "Company"}
          </p>

          {location && (
            <p className="text-xs text-white/60 flex items-center gap-1 mt-1">
              <FiMapPin /> {location}
            </p>
          )}
        </div>

        {/* Status Badge */}
        <span
          className={`
            flex items-center gap-1
            px-3 py-1 rounded-full text-xs font-semibold border
            ${statusMeta.color}
          `}
        >
          {statusMeta.icon}
          {statusMeta.label}
        </span>
      </div>

      {/* Divider */}
      <div className="relative z-10 h-px bg-white/10 my-4" />

      {/* Footer */}
      <div className="relative z-10 flex justify-between items-center text-xs text-white/60">
        <span>
          Applied on{" "}
          <span className="text-white">
            {applied_at
              ? new Date(applied_at).toLocaleDateString()
              : "—"}
          </span>
        </span>

        <span className="text-white/40">Application ID #{id}</span>
      </div>
    </motion.div>
  );
}
