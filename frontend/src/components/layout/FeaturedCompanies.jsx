import { motion } from "framer-motion";
import {
  FiMapPin,
  FiUsers,
  FiCheckCircle,
  FiBriefcase,
  FiTrendingUp,
} from "react-icons/fi";

const companies = [
  {
    id: 1,
    name: "Google",
    logo: "https://logo.clearbit.com/google.com",
    location: "Bangalore",
    employees: "100k+",
    industry: "Technology",
    roles: "Engineering • AI • Cloud",
  },
  {
    id: 2,
    name: "Amazon",
    logo: "https://logo.clearbit.com/amazon.com",
    location: "Hyderabad",
    employees: "200k+",
    industry: "E-commerce",
    roles: "Backend • DevOps • Product",
  },
  {
    id: 3,
    name: "Figma",
    logo: "https://logo.clearbit.com/figma.com",
    location: "Remote",
    employees: "1k+",
    industry: "Design SaaS",
    roles: "Frontend • Platform • Design",
  },
  {
    id: 4,
    name: "Microsoft",
    logo: "https://logo.clearbit.com/microsoft.com",
    location: "Bangalore",
    employees: "180k+",
    industry: "Enterprise Tech",
    roles: "Cloud • AI • Security",
  },
  {
    id: 5,
    name: "Netflix",
    logo: "https://logo.clearbit.com/netflix.com",
    location: "Mumbai",
    employees: "10k+",
    industry: "Media & Streaming",
    roles: "Data • Platform • UI",
  },
  {
    id: 6,
    name: "Flipkart",
    logo: "https://logo.clearbit.com/flipkart.com",
    location: "Bangalore",
    employees: "50k+",
    industry: "E-commerce",
    roles: "Supply Chain • Tech • Product",
  },
  {
    id: 7,
    name: "Zoho",
    logo: "https://logo.clearbit.com/zoho.com",
    location: "Chennai",
    employees: "10k+",
    industry: "SaaS",
    roles: "Full-Stack • Cloud • QA",
  },
  {
    id: 8,
    name: "Paytm",
    logo: "https://logo.clearbit.com/paytm.com",
    location: "Noida",
    employees: "5k+",
    industry: "Fintech",
    roles: "Payments • Backend • Mobile",
  },
];

export default function FeaturedCompanies() {
  return (
    <section
      className="relative py-32 overflow-hidden
                        bg-gradient-to-br from-[#eef2ff] via-white to-[#faf5ff]"
    >
      {/* ================= AMBIENT LIGHT ================= */}
      <motion.div
        animate={{ x: [0, 100, 0], y: [0, 70, 0] }}
        transition={{ duration: 28, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-52 -left-52 w-[620px] h-[620px]
                   bg-indigo-400/30 rounded-full blur-[180px]"
      />
      <motion.div
        animate={{ x: [0, -100, 0], y: [0, -70, 0] }}
        transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -bottom-52 -right-52 w-[620px] h-[620px]
                   bg-purple-400/30 rounded-full blur-[180px]"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* ================= HEADER ================= */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
          className="text-center mb-24"
        >
          <span
            className="inline-flex items-center gap-2 px-7 py-2 mb-6
                           bg-white/70 backdrop-blur-xl border border-white/40
                           text-indigo-700 rounded-full text-sm font-semibold shadow"
          >
            <FiTrendingUp className="text-indigo-500" />
            Hiring at Scale
          </span>

          <h2
            className="text-6xl font-extrabold
                         bg-gradient-to-r from-indigo-700 via-blue-600 to-purple-600
                         bg-clip-text text-transparent
                         drop-shadow-[0_8px_22px_rgba(79,70,229,0.25)]"
          >
            Companies Building the Future
          </h2>

          <p className="mt-6 text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Join globally trusted organizations actively expanding their teams
            across engineering, product, design, and data roles.
          </p>

          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: 180 }}
            transition={{ duration: 1 }}
            className="mx-auto mt-10 h-[3px] rounded-full
                       bg-gradient-to-r from-indigo-500 via-blue-500 to-purple-500
                       shadow-[0_0_26px_rgba(99,102,241,0.55)]"
          />
        </motion.div>

        {/* ================= COMPANY GRID ================= */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-14">
          {companies.map((c, index) => (
            <motion.div
              key={c.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08, duration: 0.6 }}
              whileHover={{
                y: -16,
                scale: 1.05,
                rotateX: 4,
                rotateY: -4,
                transition: { type: "spring", stiffness: 160, damping: 14 },
              }}
              className="relative group rounded-3xl
                         bg-white/55 backdrop-blur-2xl
                         border border-white/40
                         shadow-[0_25px_80px_rgba(79,70,229,0.18)]
                         hover:shadow-[0_40px_110px_rgba(79,70,229,0.28)]
                         transition-all overflow-hidden p-10"
            >
              {/* Glow Layer */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-20
                              bg-gradient-to-r from-indigo-500 to-purple-500
                              blur-3xl transition duration-500"
              />

              {/* Hiring Badge */}
              <span
                className="absolute top-5 right-5 px-3 py-1
                               text-xs font-semibold rounded-full
                               bg-emerald-100 text-emerald-700"
              >
                Actively Hiring
              </span>

              {/* Logo */}
              <div className="flex justify-center mb-6">
                <img
                  src={c.logo}
                  alt={c.name}
                  className="w-16 h-16 object-contain"
                  loading="lazy"
                  onError={(e) =>
                    (e.target.src =
                      "https://upload.wikimedia.org/wikipedia/commons/a/ac/No_image_available.svg")
                  }
                />
              </div>

              {/* Name */}
              <div className="flex items-center justify-center gap-2 mb-1">
                <h3 className="text-xl font-bold text-slate-900">{c.name}</h3>
                <FiCheckCircle className="text-blue-600" />
              </div>

              {/* Industry */}
              <p className="text-center mb-4">
                <span
                  className="inline-block px-3 py-1 text-xs
                                 bg-indigo-100 text-indigo-700 rounded-full"
                >
                  {c.industry}
                </span>
              </p>

              {/* Meta */}
              <div className="space-y-2 text-sm text-slate-600 mb-6">
                <div className="flex items-center justify-center gap-2">
                  <FiMapPin /> {c.location}
                </div>
                <div className="flex items-center justify-center gap-2">
                  <FiUsers /> {c.employees} Employees
                </div>
                <div className="flex items-center justify-center gap-2">
                  <FiBriefcase /> {c.roles}
                </div>
              </div>

              {/* CTA */}
              <motion.button
                whileHover={{ scale: 1.06 }}
                whileTap={{ scale: 0.96 }}
                className="w-full bg-gradient-to-r from-indigo-600 to-purple-600
                           text-white py-3 rounded-xl font-semibold
                           shadow-lg hover:shadow-indigo-500/40 transition"
              >
                View Open Roles
              </motion.button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
