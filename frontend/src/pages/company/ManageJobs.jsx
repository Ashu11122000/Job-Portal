import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FiUsers, FiBriefcase, FiRefreshCw, FiTrash2, FiEdit3, FiPlusCircle } from "react-icons/fi";
import axiosInstance from "../../api/axiosInstance";
import CompanyCard from "../../components/cards/CompanyCard";

export default function ManageJobs() {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    name: "",
    location: "",
    industry: "",
    employees: "",
    website: "",
    logo: "",
  });

  const loadCompanies = async () => {
    try {
      setLoading(true);
      setError("");
      const res = await axiosInstance.get("/company"); // hits http://localhost:5000/api/company
      const list = res.data?.data || [];
      setCompanies(Array.isArray(list) ? list : []);
    } catch (err) {
      setError("Failed to load companies");
      console.error("API Error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCompanies();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axiosInstance.post("/company", form);
      if (res.data?.success) {
        loadCompanies();
        setForm({ name: "", location: "", industry: "", employees: "", website: "", logo: "" });
      }
    } catch (err) {
      setError("Failed to create company");
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axiosInstance.delete(`/company/${id}`);
      loadCompanies();
    } catch (err) {
      setError("Failed to delete company");
      console.error(err);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center text-black text-2xl font-extrabold">
        Loading companies...
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-900 to-purple-900 px-6 py-24">
      <div className="max-w-6xl mx-auto">

        {/* HEADER */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-black text-white mb-3 flex justify-center items-center gap-3">
            <FiUsers /> Manage Companies
          </h1>
          <p className="text-lg font-semibold text-white/70">Add, edit or remove hiring companies</p>
        </div>

        {/* CREATE COMPANY FORM */}
        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ type: "spring", stiffness: 120 }}
          className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-2xl mb-12"
        >
          <h2 className="text-3xl font-extrabold text-white mb-6 flex items-center gap-2">
            <FiBriefcase /> Create Company
          </h2>

          {error && <p className="text-red-400 text-center mb-4 font-bold">{error}</p>}

          <div className="grid md:grid-cols-2 gap-6">
            <input name="name" placeholder="Company Name" value={form.name} onChange={handleChange} required className="p-3 rounded-xl border border-white/20 bg-white/20 text-white placeholder-white/70" />
            <input name="location" placeholder="Location" value={form.location} onChange={handleChange} required className="p-3 rounded-xl border border-white/20 bg-white/20 text-white placeholder-white/70" />
            <input name="industry" placeholder="Industry" value={form.industry} onChange={handleChange} required className="p-3 rounded-xl border border-white/20 bg-white/20 text-white placeholder-white/70" />
            <input name="employees" placeholder="Employees Count" type="number" value={form.employees} onChange={handleChange} required className="p-3 rounded-xl border border-white/20 bg-white/20 text-white placeholder-white/70" />
            <input name="website" placeholder="Website URL" value={form.website} onChange={handleChange} required className="p-3 rounded-xl border border-white/20 bg-white/20 text-white placeholder-white/70" />
            <input name="logo" placeholder="Logo URL" value={form.logo} onChange={handleChange} className="p-3 rounded-xl border border-white/20 bg-white/20 text-white placeholder-white/70" />
          </div>

          <div className="text-right mt-6">
            <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }} className="bg-indigo-600 text-white px-6 py-3 rounded-full font-bold inline-flex items-center gap-2 shadow-lg">
              <FiPlusCircle /> Add Company
            </motion.button>
          </div>
        </motion.form>

        {/* COMPANIES LIST */}
        {companies.length === 0 ? (
          <div className="text-center text-white text-2xl font-bold opacity-60">
            No companies available at the moment.
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {companies.map((company) => (
              <motion.div key={company.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="relative group">
                
                {/* PREMIUM WRAPPER */}
                <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-3xl blur-lg opacity-30 group-hover:opacity-50 transition"></div>
                
                {/* CARD */}
                <div className="relative bg-black/30 border border-white/20 backdrop-blur-xl rounded-3xl p-7 shadow-2xl flex flex-col gap-3">
                  <CompanyCard company={company} />

                  {/* ACTION BUTTONS */}
                  <div className="flex justify-between items-center mt-4">
                    <motion.button whileHover={{ scale: 1.1 }} onClick={() => handleDelete(company.id)} className="text-red-400 text-xl"><FiTrash2 /></motion.button>
                    <motion.button whileHover={{ scale: 1.1 }} className="text-indigo-300 text-xl"><FiEdit3 /></motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* REFRESH BUTTON */}
        <div className="text-center mt-12">
          <motion.button whileHover={{ rotate: 20, scale: 1.1 }} onClick={loadCompanies} className="text-white text-lg font-bold inline-flex items-center gap-2 bg-white/20 px-5 py-2 rounded-full shadow-md">
            <FiRefreshCw /> Refresh
          </motion.button>
        </div>

      </div>
    </section>
  );
}
