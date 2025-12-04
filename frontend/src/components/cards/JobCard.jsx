import React from "react";
import { FaMapMarkerAlt, FaMoneyBillWave, FaBriefcase } from "react-icons/fa";

export default function JobCard({ job, onClick }) {
  return (
    <div
      className="border bg-white p-6 rounded-xl shadow-sm hover:shadow-xl transition cursor-pointer"
      onClick={onClick}
    >
      {/* Job Title */}
      <h3 className="text-xl font-semibold text-gray-900">{job.title}</h3>

      {/* Company Name */}
      <p className="text-gray-500 text-sm mt-1">{job.company}</p>

      {/* Details Section */}
      <div className="flex flex-col gap-2 mt-4 text-sm text-gray-700">
        {/* Location */}
        <div className="flex items-center gap-2">
          <FaMapMarkerAlt className="text-blue-600" />
          <span>{job.location}</span>
        </div>

        {/* Salary */}
        <div className="flex items-center gap-2">
          <FaMoneyBillWave className="text-green-600" />
          <span>{job.salary}</span>
        </div>

        {/* Job Type */}
        <div className="flex items-center gap-2">
          <FaBriefcase className="text-orange-500" />
          <span>{job.type}</span>
        </div>
      </div>

      {/* Apply / View Button */}
      <button className="mt-5 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition">
        View Details
      </button>
    </div>
  );
}
