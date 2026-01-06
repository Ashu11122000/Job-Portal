export default function JobCard({ job }) {
  return (
    <div className="bg-white border border-black/10 rounded-3xl p-6 shadow-xl text-black">
      {/* COMPANY LOGO */}
      <img
        src={job.company_logo || "/default-logo.png"}
        alt="company logo"
        className="h-14 mb-3 rounded-xl mx-auto object-contain"
      />

      {/* JOB TITLE */}
      <h2 className="text-3xl font-black text-center mb-2 text-black">
        {job.title}
      </h2>

      {/* COMPANY NAME */}
      <p className="text-lg font-bold text-center text-black/80 mb-3">
        {job.company_name || "Unknown Company"}
      </p>

      {/* LOCATION */}
      <p className="text-sm flex justify-center items-center gap-1 mb-1 text-black/70 font-semibold">
        <FiMapPin /> {job.location}
      </p>

      {/* SALARY */}
      <p className="text-sm flex justify-center items-center gap-1 mb-3 text-black/70 font-semibold">
        <FiDollarSign /> ₹{job.salary}
      </p>

      {/* DESCRIPTION */}
      <p className="text-sm text-center opacity-80 line-clamp-3 font-medium">
        {job.description}
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
