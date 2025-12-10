import { motion } from "framer-motion";
import { FiMapPin, FiUsers, FiCheckCircle } from "react-icons/fi";

const companies = [
  {
    id: 1,
    name: "Google",
    logo: "https://logo.clearbit.com/google.com",
    location: "Bangalore",
    employees: "100k+",
    industry: "Tech",
  },
  {
    id: 2,
    name: "Amazon",
    logo: "https://logo.clearbit.com/amazon.com",
    location: "Hyderabad",
    employees: "200k+",
    industry: "E-commerce",
  },
  {
    id: 3,
    name: "Figma",
    logo: "https://logo.clearbit.com/figma.com",
    location: "Remote",
    employees: "1k+",
    industry: "Design",
  },
  {
    id: 4,
    name: "Microsoft",
    logo: "https://logo.clearbit.com/microsoft.com",
    location: "Bangalore",
    employees: "180k+",
    industry: "Tech",
  },
  {
    id: 5,
    name: "Netflix",
    logo: "https://logo.clearbit.com/netflix.com",
    location: "Mumbai",
    employees: "10k+",
    industry: "Media",
  },
  {
    id: 6,
    name: "Flipkart",
    logo: "https://logo.clearbit.com/flipkart.com",
    location: "Bangalore",
    employees: "50k+",
    industry: "E-commerce",
  },
  {
    id: 7,
    name: "Zoho",
    logo: "https://logo.clearbit.com/zoho.com",
    location: "Chennai",
    employees: "10k+",
    industry: "SaaS",
  },
  {
    id: 8,
    name: "Paytm",
    logo: "https://logo.clearbit.com/paytm.com",
    location: "Noida",
    employees: "5k+",
    industry: "Fintech",
  },
  {
    id: 9,
    name: "IBM",
    logo: "https://logo.clearbit.com/ibm.com",
    location: "Pune",
    employees: "200k+",
    industry: "Enterprise",
  },
  {
    id: 10,
    name: "TCS",
    logo: "https://logo.clearbit.com/tcs.com",
    location: "Hyderabad",
    employees: "300k+",
    industry: "IT Services",
  },
];

export default function FeaturedCompanies() {
  return (
    <section className="py-28 bg-linear-to-br from-indigo-50 via-white to-purple-50">
      <div className="max-w-7xl mx-auto px-6">
        {/* ✅ SECTION HEADER */}
        <div className="text-center mb-16">
          <span className="inline-block mb-4 px-6 py-2 bg-indigo-100 text-indigo-700 rounded-full text-sm font-semibold">
            🏢 Trusted Companies
          </span>

          <h2 className="text-5xl font-black bg-linear-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Top Hiring Partners
          </h2>

          <p className="text-slate-600 max-w-2xl mx-auto text-lg">
            Work with top global brands actively hiring talented professionals
            across roles.
          </p>
        </div>

        {/* ✅ COMPANY GRID */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {companies.map((c) => (
            <motion.div
              key={c.id}
              whileHover={{ y: -12, scale: 1.04 }}
              transition={{ type: "spring", stiffness: 200 }}
              className="relative bg-white/90 backdrop-blur-xl border border-slate-200 rounded-3xl shadow-xl p-8 overflow-hidden group"
            >
              {/* ✅ GLOW BORDER */}
              <div className="absolute inset-0 rounded-3xl bg-linear-to-r from-indigo-500 to-purple-500 opacity-0 group-hover:opacity-20 blur-xl transition" />

              {/* ✅ HIRING TAG */}
              <span className="absolute top-4 right-4 text-xs bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full font-semibold">
                Actively Hiring
              </span>

              {/* ✅ LOGO */}
              <div className="flex justify-center mb-6">
                <img
                  src={c.logo}
                  alt={c.name}
                  className="w-14 h-14 object-contain"
                  onError={(e) => {
                    e.target.src =
                      "https://upload.wikimedia.org/wikipedia/commons/a/ac/No_image_available.svg";
                  }}
                />
              </div>

              {/* ✅ COMPANY NAME */}
              <div className="flex items-center justify-center gap-2 mb-1">
                <h3 className="text-lg font-bold text-slate-900 text-center">
                  {c.name}
                </h3>
                <FiCheckCircle className="text-blue-600 text-lg" />
              </div>

              {/* ✅ INDUSTRY BADGE */}
              <p className="text-xs text-center mb-4">
                <span className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full">
                  {c.industry}
                </span>
              </p>

              {/* ✅ META INFO */}
              <div className="flex justify-between text-xs text-slate-600 mb-6">
                <span className="flex items-center gap-1">
                  <FiMapPin /> {c.location}
                </span>
                <span className="flex items-center gap-1">
                  <FiUsers /> {c.employees}
                </span>
              </div>

              {/* ✅ CTA */}
              <button className="w-full bg-linear-to-r from-indigo-600 to-purple-600 text-white py-2.5 rounded-xl font-semibold shadow-lg hover:scale-105 transition">
                View Open Jobs
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
