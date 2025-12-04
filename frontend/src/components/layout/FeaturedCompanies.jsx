import companies from "../../static/companies.json";

export default function FeaturedCompanies() {
  return (
    <div className="w-full py-20 bg-gradient-to-b from-white to-blue-50">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <h2 className="text-4xl font-extrabold mb-12 text-gray-900 text-center tracking-tight">
          Top Companies Hiring Now
        </h2>

        {/* Company Grid */}
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {companies.map((c) => (
            <div
              key={c.id}
              className="group bg-white/70 backdrop-blur-xl border border-white/30 rounded-2xl shadow-md hover:shadow-xl p-8 transition-all duration-300 cursor-pointer hover:-translate-y-2"
            >
              {/* Company Logo */}
              <div className="w-20 h-20 mx-auto rounded-full bg-white shadow-md flex items-center justify-center overflow-hidden group-hover:scale-110 transition duration-300">
                <img
                  src={c.logo}
                  alt={c.name}
                  className="w-12 h-12 object-contain"
                />
              </div>

              {/* Company Name */}
              <h3 className="text-xl font-semibold text-gray-900 text-center mt-6 group-hover:text-blue-600 transition">
                {c.name}
              </h3>

              {/* Location */}
              <p className="text-gray-500 text-center mt-1 text-sm">
                {c.location}
              </p>

              {/* Hover Line */}
              <div className="mt-6 h-1 w-0 group-hover:w-full bg-blue-600 transition-all duration-300 mx-auto rounded-full"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
