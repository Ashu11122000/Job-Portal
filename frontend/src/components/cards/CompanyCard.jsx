import { FiMapPin, FiGlobe, FiUsers } from "react-icons/fi";
import { Link } from "react-router-dom";

export default function CompanyCard({ company }) {
  return (
    <div className="bg-white/10 border border-white/20 rounded-3xl p-6 shadow-2xl text-black backdrop-blur-xl">
      <img
        src={company.logo || "/default-logo.png"}
        alt="logo"
        className="h-16 w-16 mx-auto mb-4 rounded-2xl object-cover"
      />
      <h2 className="text-2xl font-black text-center mb-2 text-white">{company.name}</h2>
      <p className="text-sm flex justify-center items-center gap-1 mb-1 text-white/80">
        <FiMapPin /> {company.location}
      </p>
      <p className="text-xs text-center text-white/60">{company.description}</p>
      <a
        href={company.website}
        target="_blank"
        className="text-xs underline flex justify-center items-center gap-1 mt-3 text-indigo-300"
      >
        <FiGlobe /> Visit Website
      </a>
    </div>
  );
}
