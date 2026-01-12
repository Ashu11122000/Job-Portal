import { useState, useEffect } from "react";
import { useNavigate, Link, Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FiMail, FiLock, FiArrowRight } from "react-icons/fi";
import { useAuthContext } from "../../context/AuthContext";
import axiosInstance from "../../api/axiosInstance";

export default function Login() {
  const { login, user, isLoggedInUser } = useAuthContext();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Auto redirect if already logged in
  if (isLoggedInUser) {
    return <Navigate to={`/dashboard/${user.role}`} replace />;
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // ✅ FIXED: removed extra /api
      const res = await axiosInstance.post("/auth/login", formData);

      const { token, user: userData } = res.data;

      if (userData && token) {
        login(userData, token);

        // Role based redirect (match your routes)
        const role = userData.role;
        navigate(`/dashboard/${role}`, { replace: true });
      } else {
        setError("Invalid login response from server");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-[radial-gradient(circle_at_top,var(--color-indigo-900),var(--color-purple-900),black)] overflow-hidden px-4">
      <motion.div
        animate={{ x: [0, 120, 0], y: [0, -80, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-64 -left-64 w-[700px] h-[700px] rounded-full blur-[200px]"
      />
      <motion.div
        animate={{ x: [0, -120, 0], y: [0, 80, 0] }}
        transition={{ duration: 24, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -bottom-64 -right-64 w-[700px] h-[700px] rounded-full blur-[220px]"
      />

      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 bg-white/10 backdrop-blur-2xl border border-white/20 rounded-3xl shadow-2xl p-12 w-full max-w-md"
      >
        <h2 className="text-4xl font-black text-center bg-linear-to-r from-indigo-300 to-purple-300 bg-clip-text text-transparent mb-10">
          Welcome Back
        </h2>

        {error && (
          <div className="mb-6 text-center text-red-400 bg-red-500/10 border border-red-400/20 p-3 rounded-lg text-sm">
            {error}
          </div>
        )}

        <div className="mb-6 relative">
          <FiMail className="absolute top-1/2 -translate-y-1/2 left-4 text-white/70" />
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            onChange={handleChange}
            required
            className="w-full bg-white/10 border border-white/20 text-black placeholder-white/50 rounded-xl py-3 pl-12 pr-4 outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div className="mb-8 relative">
          <FiLock className="absolute top-1/2 -translate-y-1/2 left-4 text-white/70" />
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            required
            className="w-full bg-white/10 border border-white/20 text-black placeholder-white/50 rounded-xl py-3 pl-12 pr-4 outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="relative overflow-hidden w-full bg-linear-to-r from-indigo-600 to-purple-600 text-white py-4 rounded-xl font-bold text-lg hover:scale-105 transition-all"
        >
          <span className="relative z-10 flex items-center justify-center gap-2">
            {loading ? "Logging in..." : "Login"} <FiArrowRight />
          </span>
        </button>

        <p className="mt-8 text-center text-white/70 text-sm">
          Don’t have an account?{" "}
          <Link to="/register" className="text-indigo-300 font-semibold hover:underline">
            Register
          </Link>
        </p>
      </motion.form>
    </div>
  );
}
