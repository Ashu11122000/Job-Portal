import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { getCompanies } from "../../api/companyApi";
import CompanyCard from "../../components/cards/CompanyCard";
import Footer from "../../components/layout/Footer";

export default function CompanyProfile() {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadCompanies = async () => {
      try {
        setLoading(true);

        const res = await getCompanies();

        /**
         * Backend response possibilities handled safely
         * res.data.data
         * res.data.companies
         * res.data.rows
         */
        const list =
          res?.data?.data ||
          res?.data?.companies ||
          res?.data?.rows ||
          [];

        setCompanies(Array.isArray(list) ? list : []);
      } catch (err) {
        console.error("Company API Error:", err);
        setError("Failed to load companies");
      } finally {
        setLoading(false);
      }
    };

    loadCompanies();
  }, []);

  if (loading) {
    return (
      <div className="text-white text-center text-2xl mt-20 animate-pulse">
        Loading companies...
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-400 text-center text-xl font-bold mt-10">
        {error}
      </div>
    );
  }

  return (
    <>
      <section className="relative min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950 to-purple-950 px-6 py-28">
        {/* Glow */}
        <motion.div
          animate={{ x: [0, 80, 0], y: [0, -60, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-0 left-0 w-[420px] h-[420px] bg-indigo-500/15 blur-[140px] rounded-full"
        />

        {/* Header */}
        <div className="max-w-7xl mx-auto text-center mb-16 relative z-10">
          <span className="text-indigo-300 tracking-widest uppercase text-sm font-bold mb-3 inline-block">
            Powering Careers
          </span>
          <h1 className="text-6xl font-black text-white drop-shadow-xl">
            Companies Hiring Now
          </h1>
          <p className="text-lg text-white/70 mt-4 font-medium max-w-2xl mx-auto">
            Browse verified companies and explore job opportunities
          </p>
        </div>

        {/* Grid */}
        {companies.length === 0 ? (
          <p className="text-center text-white/70 text-xl">
            No companies found
          </p>
        ) : (
          <div className="max-w-7xl mx-auto grid sm:grid-cols-2 lg:grid-cols-3 gap-10 place-items-center">
            {companies.map((company) => (
              <motion.div
                key={company.id || company._id}
                whileHover={{ y: -7, scale: 1.03 }}
                className="w-full max-w-sm"
              >
                <CompanyCard company={company} />
              </motion.div>
            ))}
          </div>
        )}
      </section>

      <Footer />
    </>
  );
}
