import {
  FiFacebook,
  FiTwitter,
  FiLinkedin,
  FiInstagram,
  FiSend,
  FiShield,
  FiAward,
  FiCheckCircle,
} from "react-icons/fi";

export default function Footer() {
  return (
    <footer className="relative w-full overflow-hidden bg-linear-to-br from-slate-950 via-gray-950 to-black text-gray-300 pt-32 pb-14">

      {/* ================= AMBIENT BACKGROUND ================= */}
      <div className="absolute -top-40 -left-40 w-[620px] h-[620px] bg-indigo-500/10 blur-[180px]" />
      <div className="absolute -bottom-40 -right-40 w-[620px] h-[620px] bg-purple-500/10 blur-[180px]" />

      {/* ================= MAIN GRID ================= */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 grid md:grid-cols-5 sm:grid-cols-2 gap-16">

        {/* ================= BRAND ================= */}
        <div className="md:col-span-2">
          <h2 className="text-4xl font-black bg-linear-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent mb-6">
            JobPortal
          </h2>

          <p className="text-gray-400 leading-relaxed max-w-md mb-6">
            A modern career intelligence platform helping professionals
            <span className="text-gray-200 font-medium"> get hired faster</span>,
            <span className="text-gray-200 font-medium"> negotiate better</span>,
            and helping companies build high-impact teams with confidence.
          </p>

          {/* TRUST SIGNALS */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400">
            <span className="flex items-center gap-2">
              <FiShield className="text-indigo-400" />
              Secure & Verified Platform
            </span>
            <span className="flex items-center gap-2">
              <FiAward className="text-purple-400" />
              Trusted by 12,000+ Hiring Teams
            </span>
          </div>

          {/* SOCIAL LINKS */}
          <div className="flex gap-6 mt-10 text-2xl">
            <a className="hover:text-indigo-400 transition" aria-label="Facebook">
              <FiFacebook />
            </a>
            <a className="hover:text-sky-400 transition" aria-label="Twitter">
              <FiTwitter />
            </a>
            <a className="hover:text-pink-400 transition" aria-label="Instagram">
              <FiInstagram />
            </a>
            <a className="hover:text-blue-400 transition" aria-label="LinkedIn">
              <FiLinkedin />
            </a>
          </div>
        </div>

        {/* ================= PLATFORM ================= */}
        <div>
          <h3 className="text-lg font-bold text-white mb-6">
            Platform
          </h3>
          <ul className="space-y-3 text-gray-400 text-sm">
            <li><a href="/" className="hover:text-white">Home</a></li>
            <li><a href="/jobs" className="hover:text-white">Browse Jobs</a></li>
            <li><a href="/career-tools" className="hover:text-white">Career Tools</a></li>
            <li><a href="/about" className="hover:text-white">About</a></li>
            <li><a href="/contact" className="hover:text-white">Contact</a></li>
          </ul>
        </div>

        {/* ================= CATEGORIES ================= */}
        <div>
          <h3 className="text-lg font-bold text-white mb-6">
            High-Demand Roles
          </h3>
          <ul className="space-y-3 text-gray-400 text-sm">
            <li>Software Engineering</li>
            <li>Cloud & DevOps</li>
            <li>UI / UX & Product Design</li>
            <li>Data Science & AI</li>
            <li>Finance & Accounting</li>
          </ul>
        </div>

        {/* ================= NEWSLETTER ================= */}
        <div>
          <h3 className="text-lg font-bold text-white mb-6">
            Career Intelligence
          </h3>

          <p className="text-gray-400 mb-5 text-sm leading-relaxed">
            Weekly insights on hiring trends, resume optimization,
            salary benchmarks, and in-demand skills — curated by experts.
          </p>

          <div className="flex bg-white/10 border border-white/20 rounded-xl overflow-hidden">
            <input
              type="email"
              placeholder="Work email address"
              className="flex-1 bg-transparent text-white placeholder-gray-400 px-4 py-3 outline-none text-sm"
            />
            <button className="bg-linear-to-r from-indigo-600 to-purple-600 px-5 text-white hover:opacity-90 transition">
              <FiSend />
            </button>
          </div>

          <p className="text-xs text-gray-500 mt-3 flex items-center gap-2">
            <FiCheckCircle className="text-emerald-400" />
            No spam. Privacy-first. Unsubscribe anytime.
          </p>
        </div>
      </div>

      {/* ================= BOTTOM STRIP ================= */}
      <div className="relative z-10 border-t border-white/10 mt-24 pt-6 text-center text-gray-500 text-sm">
        © {new Date().getFullYear()}{" "}
        <span className="text-white font-semibold">JobPortal</span>.
        All rights reserved • Built for modern hiring ecosystems.
      </div>
    </footer>
  );
}
