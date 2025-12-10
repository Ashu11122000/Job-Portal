import { motion } from "framer-motion";
import { FiMail, FiArrowRight, FiShield, FiStar, FiZap } from "react-icons/fi";

export default function NewsletterSubscription() {
  return (
    <section className="relative w-full py-40 overflow-hidden bg-linear-to-br from-indigo-900 via-purple-900 to-slate-900">
      {/* ✅ DEEP NEBULA GLOWS */}
      <motion.div
        animate={{ x: [0, 140, 0], y: [0, -90, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-64 -left-64 w-[780px] h-[780px] bg-indigo-400/20 rounded-full blur-[220px]"
      />
      <motion.div
        animate={{ x: [0, -140, 0], y: [0, 90, 0] }}
        transition={{ duration: 26, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -bottom-64 -right-64 w-[780px] h-[780px] bg-purple-400/20 rounded-full blur-[240px]"
      />

      {/* ✅ STAR PARTICLES */}
      <div className="absolute top-24 left-[15%] w-2 h-2 bg-white/50 rounded-full blur-sm animate-ping" />
      <div className="absolute bottom-32 right-[20%] w-2 h-2 bg-white/50 rounded-full blur-sm animate-ping delay-300" />
      <div className="absolute top-1/2 right-[10%] w-1.5 h-1.5 bg-white/40 rounded-full blur-sm animate-pulse" />

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        {/* ✅ PREMIUM BADGE */}
        <motion.span
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-3 mb-10 px-10 py-4 rounded-full text-sm font-semibold 
          bg-white/10 backdrop-blur-2xl text-white 
          shadow-[0_0_45px_rgba(255,255,255,0.35)] border border-white/20"
        >
          <FiStar className="text-yellow-300 animate-pulse" />
          AI-Powered Personalized Career Intelligence
        </motion.span>

        {/* ✅ ULTRA HEADING */}
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="text-6xl md:text-7xl font-black text-white leading-tight tracking-tight"
        >
          Get Ahead With{" "}
          <span className="bg-clip-text text-transparent bg-linear-to-r from-indigo-300 via-purple-300 to-pink-300">
            Smart Job Alerts
          </span>
        </motion.h2>

        {/* ✅ SUBTITLE */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mt-10 text-white/85 text-xl max-w-3xl mx-auto leading-relaxed"
        >
          Receive curated job opportunities, hiring signals, salary forecasts,
          resume optimization tips, and recruiter activity insights — powered by
          live market intelligence.
        </motion.p>

        {/* ✅ LUXURY GLASS SUBSCRIPTION BOX */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="relative mt-20 flex flex-col sm:flex-row items-center gap-5 
          max-w-4xl mx-auto p-4 rounded-4xl 
          bg-white/10 backdrop-blur-2xl 
          border border-white/25 
          shadow-[0_35px_90px_rgba(79,70,229,0.55)]"
        >
          {/* ✅ INNER NEON GLOW */}
          <div className="absolute inset-0 rounded-4xl bg-linear-to-r from-indigo-500 via-purple-500 to-pink-500 opacity-30 blur-xl" />

          {/* ✅ INPUT FIELD */}
          <div className="relative flex items-center gap-4 w-full flex-1 bg-white/15 rounded-2xl px-8 py-5">
            <FiMail className="text-white text-2xl" />
            <input
              type="email"
              placeholder="Enter your email address"
              className="w-full bg-transparent text-white placeholder-white/70 outline-none text-lg"
            />
          </div>

          {/* ✅ ULTRA CTA BUTTON */}
          <button
            className="relative overflow-hidden w-full sm:w-auto 
          bg-linear-to-r from-indigo-500 via-purple-500 to-pink-500 
          text-white px-12 py-5 rounded-2xl font-bold 
          shadow-[0_20px_60px_rgba(99,102,241,0.85)] 
          hover:scale-110 transition-all group"
          >
            <span className="relative z-10 flex items-center gap-3">
              Activate Alerts <FiArrowRight />
            </span>
            <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-15 transition" />
          </button>
        </motion.div>

        {/* ✅ SECURITY + TRUST MESSAGE */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.7 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-6 text-white/85 text-sm tracking-wide"
        >
          <span className="flex items-center gap-2">
            <FiShield className="text-emerald-400" />
            256-bit Secure Encryption
          </span>
          <span className="flex items-center gap-2">
            <FiZap className="text-yellow-300" />
            Instant Job Matching Engine
          </span>
          <span className="flex items-center gap-2">
            <FiStar className="text-pink-300" />
            4.9★ Career Intelligence Rating
          </span>
        </motion.div>
      </div>
    </section>
  );
}
