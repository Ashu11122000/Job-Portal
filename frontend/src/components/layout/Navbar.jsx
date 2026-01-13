import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  FiMenu,
  FiX,
  FiBell,
  FiSearch,
} from "react-icons/fi";
import { useAuthContext } from "../../context/AuthContext";
import SettingAPI from "../../api/settingsApi.js";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [notifyOpen, setNotifyOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [search, setSearch] = useState("");
  const [unreadCount, setUnreadCount] = useState(5);

  const auth = useAuthContext();
  const navigate = useNavigate();

  const isLoggedIn = auth?.isLoggedIn;
  const logout = auth?.logout;

  /* ---------------- LOGOUT ---------------- */
  const handleLogout = () => {
    if (typeof logout === "function") logout();
    navigate("/login", { replace: true });
  };

  /* ---------------- SCROLL EFFECT ---------------- */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* ---------------- SEARCH ---------------- */
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (search.trim()) navigate(`/jobs?search=${search}`);
  };

  /* ---------------- NOTIFICATIONS ---------------- */
  const toggleNotifications = () => {
    setNotifyOpen((p) => !p);
    setUnreadCount(0);
  };

  /* ---------------- SETTINGS SYNC (SAFE) ---------------- */
  useEffect(() => {
    const fetchSettings = async () => {
      try {
        if (typeof SettingAPI.getAllSettings === "function") {
          await SettingAPI.getAllSettings();
        }
      } catch {
        console.warn("Settings sync skipped");
      }
    };
    fetchSettings();
  }, []);

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300
        ${
          scrolled
            ? "py-3 bg-slate-900 shadow-lg border-b border-white/10"
            : "py-4 bg-slate-900 border-b border-white/10"
        }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6">

        {/* ================= LEFT ================= */}
        <div className="flex items-center gap-10">
          <NavLink
            to="/"
            className="text-3xl font-extrabold
              bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400
              bg-clip-text text-transparent"
          >
            JobPortal
          </NavLink>

          {/* Desktop Search */}
          <form
            onSubmit={handleSearchSubmit}
            className="hidden lg:flex items-center gap-2 px-5 py-2 rounded-full
              bg-slate-800 border border-white/10 w-[260px]"
          >
            <FiSearch className="text-slate-400" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search jobs..."
              className="bg-transparent outline-none text-sm w-full text-white placeholder-slate-400"
            />
          </form>
        </div>

        {/* ================= DESKTOP NAV ================= */}
        <div className="hidden md:flex items-center gap-12">

          {/* NAV LINKS */}
          <div className="flex items-center gap-8 text-[15px] font-medium">
            <NavItem to="/">Home</NavItem>
            <NavItem to="/jobs">Jobs</NavItem>
            <NavItem to="/career-tools">Career Tools</NavItem>
            <NavItem to="/about">About</NavItem>
            <NavItem to="/contact">Contact</NavItem>
          </div>

          {/* ACTIONS */}
          <div className="flex items-center gap-6">

            {/* Notifications */}
            {isLoggedIn && (
              <div className="relative">
                <button
                  onClick={toggleNotifications}
                  className="relative p-2 rounded-full text-xl text-slate-200 hover:bg-white/10 transition"
                >
                  <FiBell />
                  {unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-rose-600 text-white text-[10px] px-1.5 rounded-full">
                      {unreadCount}
                    </span>
                  )}
                </button>

                <AnimatePresence>
                  {notifyOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute right-0 top-12 w-64
                        bg-slate-800 border border-white/10
                        rounded-2xl shadow-xl overflow-hidden"
                    >
                      <div className="px-5 py-4 text-sm text-slate-300">
                        🔔 No new notifications
                      </div>

                      <hr className="border-white/10" />

                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-5 py-3
                          text-rose-400 hover:bg-rose-500/10 transition"
                      >
                        Logout
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}

            {!isLoggedIn && (
              <NavLink
                to="/login"
                className="px-6 py-2 rounded-full
                  bg-indigo-600 text-white font-semibold
                  hover:bg-indigo-500 transition"
              >
                Login
              </NavLink>
            )}
          </div>
        </div>

        {/* ================= MOBILE MENU BUTTON ================= */}
        <button
          onClick={() => setOpen(true)}
          className="md:hidden text-3xl text-white p-2 rounded-xl hover:bg-white/10"
        >
          <FiMenu />
        </button>
      </div>

      {/* ================= MOBILE DRAWER ================= */}
      <AnimatePresence>
        {open && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 bg-black/60 z-40"
            />

            {/* Drawer */}
            <motion.aside
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 260, damping: 30 }}
              className="fixed top-0 right-0 h-full w-full max-w-sm z-50
                bg-slate-950 text-white"
            >
              <div className="flex items-center justify-between px-6 py-5 border-b border-white/10">
                <span className="text-xl font-bold">Menu</span>
                <button onClick={() => setOpen(false)} className="text-3xl">
                  <FiX />
                </button>
              </div>

              <div className="px-6 py-6 space-y-6 text-lg font-medium">
                {[
                  ["/", "Home"],
                  ["/jobs", "Jobs"],
                  ["/career-tools", "Career Tools"],
                  ["/about", "About"],
                  ["/contact", "Contact"],
                ].map(([to, label]) => (
                  <NavLink
                    key={to}
                    to={to}
                    onClick={() => setOpen(false)}
                    className="block px-4 py-3 rounded-xl hover:bg-white/10"
                  >
                    {label}
                  </NavLink>
                ))}

                <hr className="border-white/10" />

                {isLoggedIn ? (
                  <button
                    onClick={() => {
                      handleLogout();
                      setOpen(false);
                    }}
                    className="w-full bg-rose-600 py-3 rounded-full font-semibold"
                  >
                    Logout
                  </button>
                ) : (
                  <NavLink
                    to="/login"
                    onClick={() => setOpen(false)}
                    className="block bg-indigo-600 py-3 rounded-full text-center font-semibold"
                  >
                    Login
                  </NavLink>
                )}
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
}

/* ================= NAV ITEM ================= */

function NavItem({ to, children }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `relative transition-all
        ${
          isActive
            ? "text-indigo-400 after:w-full"
            : "text-slate-300 hover:text-white"
        }
        after:absolute after:left-0 after:-bottom-1 after:h-[2px]
        after:bg-indigo-400 after:w-0 after:transition-all`
      }
    >
      {children}
    </NavLink>
  );
}
