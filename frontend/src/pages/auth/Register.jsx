import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import { FiUser, FiMail, FiLock, FiShield } from "react-icons/fi";
import { useAuthContext } from "../../context/AuthContext";

export default function Register() {
  // ✅ BULLETPROOF CONTEXT ACCESS (NO MORE CRASH)
  const auth = useAuthContext();
  const registerUser = auth?.register || (async () => {});

  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "candidate", // candidate | recruiter | admin
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const API_BASE = "http://localhost:5000/api/auth"; // added but not replacing existing lines

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    console.log("➡ Sending Register Request with Data:", form);

    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/register",
        form
      , {
        timeout: 8000,
        withCredentials: true
      });

      console.log("✅ Register API Response:", res.data);

      // ✅ SAFE REGISTER + LOGIN
      if (res?.data?.user && res?.data?.token) {
        registerUser(res.data.user, res.data.token);
        navigate("/dashboard");
      } else {
        setError("Invalid registration response from server");
      }
    } catch (err) {
      console.error("❌ Register API Error:", err.response?.data || err.message);
      setError(
        err.response?.data?.message ||
          "Registration failed, please check details."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-[radial-gradient(circle_at_top,var(--color-indigo-900),var(--color-purple-900),black)] overflow-hidden px-4">
      {/* ✅ Background Glow */}
      <motion.div
        animate={{ x: [0, 120, 0], y: [0, -80, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-64 -left-64 w-[700px] h-[700px] bg-indigo-500/30 rounded-full blur-[200px]"
      />
      <motion.div
        animate={{ x: [0, -120, 0], y: [0, 80, 0] }}
        transition={{ duration: 24, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -bottom-64 -right-64 w-[700px] h-[700px] bg-purple-500/30 rounded-full blur-[220px]"
      />

      {/* ✅ GLASS REGISTER CARD */}
      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8 }}
         style={{ color: "black" }}
        className="relative z-10 bg-white/10 backdrop-blur-2xl border border-white/20 rounded-3xl shadow-[0_30px_100px_rgba(79,70,229,0.6)] p-12 w-full max-w-md"
      >
        <h2 className="text-4xl font-black text-center bg-linear-to-r from-indigo-300 to-purple-300 bg-clip-text text-transparent mb-10">
          Create Your Account
        </h2>

        {error && (
          <div className="mb-6 text-center text-red-400 bg-red-500/10 border border-red-400/20 p-3 rounded-lg text-sm">
            {error}
          </div>
        )}

        {/* ✅ NAME */}
        <div className="mb-6 relative">
          <FiUser className="absolute top-1/2 -translate-y-1/2 left-4 text-white/70" />
          <input
            name="name"
            placeholder="Full Name"
            value={form.name}
            onChange={handleChange}
            required
            className="w-full bg-white/10 border border-white/20 text-white placeholder-white/50 rounded-xl py-3 pl-12 pr-4 outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* ✅ EMAIL */}
        <div className="mb-6 relative">
          <FiMail className="absolute top-1/2 -translate-y-1/2 left-4 text-white/70" />
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={form.email}
            onChange={handleChange}
            required
            className="w-full bg-white/10 border border-white/20 text-white placeholder-white/50 rounded-xl py-3 pl-12 pr-4 outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* ✅ PASSWORD */}
        <div className="mb-6 relative">
          <FiLock className="absolute top-1/2 -translate-y-1/2 left-4 text-white/70" />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
            className="w-full bg-white/10 border border-white/20 text-white placeholder-white/50 rounded-xl py-3 pl-12 pr-4 outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* ✅ ROLE */}
        <div className="mb-8 relative">
          <FiShield className="absolute top-1/2 -translate-y-1/2 left-4 text-black/70" />
          <select
            name="role"
            value={form.role}
            onChange={handleChange}
            className="w-full bg-white/10 border border-white/20 text-black rounded-xl py-3 pl-12 pr-4 outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="candidate">Candidate</option>
            <option value="recruiter">Recruiter</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        {/* ✅ BUTTON */}
        <button
          type="submit"
          disabled={loading}
          className="relative overflow-hidden w-full bg-linear-to-r from-indigo-600 to-purple-600 text-white py-4 rounded-xl font-bold text-lg shadow-[0_20px_60px_rgba(99,102,241,0.6)] hover:scale-105 transition-all"
        >
          {loading ? "Creating account..." : "Register"}
        </button>
      </motion.form>
    </div>
  );
}
