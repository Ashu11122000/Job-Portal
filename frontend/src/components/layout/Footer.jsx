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
    <footer className="relative w-full overflow-hidden bg-linear-to-br from-slate-950 via-gray-950 to-black text-gray-300 pt-28 pb-12">
      {/* ✅ AMBIENT GLOW */}
      <div className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-indigo-500/10 blur-[160px]" />
      <div className="absolute -bottom-40 -right-40 w-[600px] h-[600px] bg-purple-500/10 blur-[160px]" />

      {/* ✅ MAIN CONTENT */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 grid md:grid-cols-5 sm:grid-cols-2 gap-14">
        {/* ✅ BRANDING */}
        <div className="md:col-span-2">
          <h2 className="text-4xl font-black bg-linear-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent mb-5">
            JobPortal
          </h2>

          <p className="text-gray-400 leading-relaxed max-w-md">
            India’s smartest career ecosystem helping professionals land
            high-paying jobs with confidence and companies build elite teams
            faster.
          </p>

          {/* ✅ TRUST BADGES */}
          <div className="flex items-center gap-4 mt-6 text-sm text-gray-400">
            <span className="flex items-center gap-1">
              <FiShield className="text-indigo-400" /> Verified Platform
            </span>
            <span className="flex items-center gap-1">
              <FiAward className="text-purple-400" /> Trusted by 12k+ Companies
            </span>
          </div>

          {/* ✅ SOCIALS */}
          <div className="flex gap-5 mt-8 text-2xl">
            <a className="hover:text-indigo-400 transition">
              <FiFacebook />
            </a>
            <a className="hover:text-sky-400 transition">
              <FiTwitter />
            </a>
            <a className="hover:text-pink-400 transition">
              <FiInstagram />
            </a>
            <a className="hover:text-blue-400 transition">
              <FiLinkedin />
            </a>
          </div>
        </div>

        {/* ✅ QUICK LINKS */}
        <div>
          <h3 className="text-lg font-bold text-white mb-6">Platform</h3>
          <ul className="space-y-3 text-gray-400">
            <li>
              <a href="/" className="hover:text-white">
                Home
              </a>
            </li>
            <li>
              <a href="/jobs" className="hover:text-white">
                Browse Jobs
              </a>
            </li>
            <li>
              <a href="/companies" className="hover:text-white">
                Companies
              </a>
            </li>
            <li>
              <a href="/career-tools" className="hover:text-white">
                Career Tools
              </a>
            </li>
            <li>
              <a href="/contact" className="hover:text-white">
                Contact
              </a>
            </li>
          </ul>
        </div>

        {/* ✅ JOB CATEGORIES */}
        <div>
          <h3 className="text-lg font-bold text-white mb-6">Top Categories</h3>
          <ul className="space-y-3 text-gray-400">
            <li>Software Development</li>
            <li>Cloud & DevOps</li>
            <li>UI / UX Design</li>
            <li>Data Science</li>
            <li>Finance & Accounting</li>
          </ul>
        </div>

        {/* ✅ NEWSLETTER */}
        <div>
          <h3 className="text-lg font-bold text-white mb-6">
            Weekly Job Alerts
          </h3>

          <p className="text-gray-400 mb-5">
            Get top openings, salary trends & hiring updates — straight to your
            inbox.
          </p>

          <div className="flex bg-white/10 border border-white/20 rounded-xl overflow-hidden backdrop-blur-xl">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 bg-transparent text-white placeholder-gray-400 px-4 py-3 outline-none"
            />
            <button className="bg-linear-to-r from-indigo-600 to-purple-600 px-5 text-white hover:scale-105 transition">
              <FiSend />
            </button>
          </div>

          <p className="text-xs text-gray-500 mt-3 flex items-center gap-1">
            <FiCheckCircle className="text-emerald-400" />
            No spam. Unsubscribe anytime.
          </p>
        </div>
      </div>

      {/* ✅ BOTTOM STRIP */}
      <div className="relative z-10 border-t border-white/10 mt-20 pt-6 text-center text-gray-500 text-sm">
        © {new Date().getFullYear()}{" "}
        <span className="text-white">JobPortal</span>. All rights reserved •
        Built for modern hiring.
      </div>
    </footer>
  );
}
