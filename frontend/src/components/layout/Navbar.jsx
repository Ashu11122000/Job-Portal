import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FiMenu, FiX, FiBell, FiSearch, FiSun, FiMoon } from "react-icons/fi";
import { useAuthContext } from "../../context/AuthContext";
import SettingAPI from "../../api/settingsApi.js"; // existing kept ✔
import { motion, AnimatePresence } from "framer-motion";


export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [search, setSearch] = useState("");
  const [dark, setDark] = useState(false);

  const auth = useAuthContext();
  const navigate = useNavigate();

  const user = auth?.user;
  const isLoggedIn = auth?.isLoggedIn;
  const logout = auth?.logout;

  // Logout handler kept same ✔
  const handleLogout = () => {
    if (typeof logout === "function") logout();
    navigate("/login", { replace: true });
  };

  // Theme restore kept ✔
  useEffect(() => {
    if (localStorage.getItem("theme") === "dark") {
      document.documentElement.classList.add("dark");
      setDark(true);
    }
  }, []);

  const toggleDarkMode = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark");
    localStorage.setItem("theme", next ? "dark" : "light");
  };

  // Scroll listener kept ✔
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (search.trim()) navigate(`/jobs?search=${search}`);
  };

  /* ---- FIXED SETTINGS SYNC (safe call, no undefined function) ---- */
  const fetchSettings = async () => {
    try {
      if (typeof SettingAPI.getAllSettings === "function") {
        const res = await SettingAPI.getAllSettings();
        console.log("⚙ Settings Loaded:", res.data?.settings);
      } else {
        console.warn("⚠ getAllSettings() not found in API export, skipping...");
      }
    } catch (err) {
      console.error("⚠ Settings sync failed:", err);
    }
  };

  useEffect(() => {
    fetchSettings(); // safe execution ✔
  }, []);

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-500
        ${
          scrolled
            ? "py-2 bg-white/70 dark:bg-slate-900/75 backdrop-blur-2xl shadow-[0_10px_40px_rgba(0,0,0,0.12)] border-b border-black/5 dark:border-white/10"
            : "py-4 bg-white/40 dark:bg-slate-900/50 backdrop-blur-xl border-b border-black/5 dark:border-white/5"
        }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6">

        {/* LEFT */}
        <div className="flex items-center gap-10">
          <NavLink to="/" className="text-3xl font-extrabold bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
            JobPortal
          </NavLink>

          {/* SEARCH */}
          <form onSubmit={handleSearchSubmit} className="hidden lg:flex items-center gap-2 px-5 py-2 rounded-full bg-white/80 dark:bg-slate-800/70 border border-black/10 dark:border-white/10 w-[260px]">
            <FiSearch className="text-slate-500 dark:text-slate-300" />
            <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search jobs..." className="bg-transparent outline-none text-sm w-full text-slate-900 dark:text-white placeholder-slate-400"/>
          </form>
        </div>

        {/* DESKTOP NAV */}
        <div className="hidden md:flex items-center gap-12">
          <div className="flex items-center gap-8 text-[15px] font-medium">
            <NavItem to="/">Home</NavItem>
            <NavItem to="/jobs">Jobs</NavItem>
            <NavItem to="/career-tools">Career Tools</NavItem>
            <NavItem to="/about">About</NavItem>
            <NavItem to="/contact">Contact</NavItem>
          </div>

          {/* ACTIONS */}
          <div className="flex items-center gap-6">
            <button onClick={toggleDarkMode} className="p-2 rounded-full text-xl hover:bg-black/5 dark:hover:bg-white/10">
              {dark ? <FiSun /> : <FiMoon />}
            </button>

            {/* NOTIFICATION */}
            {isLoggedIn && (
              <div className="relative">
                <FiBell className="text-xl cursor-pointer hover:text-indigo-500" />
                <span className="absolute -top-2 -right-2 bg-rose-600 text-white text-xs px-1.5 rounded-full">5</span>
              </div>
            )}

            {/* PROFILE */}
            {isLoggedIn ? (
              <ProfileMenu user={user} profileOpen={profileOpen} setProfileOpen={setProfileOpen} logout={handleLogout} />
            ) : (
              <NavLink to="/login" className="px-6 py-2 rounded-full bg-white/80 dark:bg-slate-800/70 border border-black/10 dark:border-white/10 hover:bg-white">Login</NavLink>
            )}
          </div>
        </div>

        {/* MOBILE */}
        <button onClick={() => setOpen(!open)} className="md:hidden text-3xl">
          {open ? <FiX /> : <FiMenu />}
        </button>

      </div>

      {/* MOBILE DRAWER */}
      <MobileDrawer open={open} setOpen={setOpen} isLoggedIn={isLoggedIn} logout={handleLogout} />
    </nav>
  );
}

/* Sub Components kept ✔ */

function NavItem({ to, children }) {
  return (
    <NavLink to={to} className={({ isActive }) => `relative transition-all ${isActive ? "text-indigo-600 dark:text-indigo-400" : "text-slate-700 dark:text-slate-200 hover:text-indigo-500"} after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:bg-indigo-500 after:w-0 hover:after:w-full ${isActive ? "after:w-full" : ""} after:transition-all`}>
      {children}
    </NavLink>
  );
}

function ProfileMenu({ user, profileOpen, setProfileOpen, logout }) {
  return (
    <div className="relative">
      <button onClick={() => setProfileOpen(!profileOpen)}>
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center text-white font-bold shadow-md">
          {user?.name?.[0] || "U"}
        </div>
      </button>

      <AnimatePresence>
        {profileOpen && (
          <motion.div initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} exit={{opacity:0,y:10}} className="absolute right-0 top-14 w-64 bg-white/85 dark:bg-slate-900/85 border border-black/10 dark:border-white/10 rounded-2xl shadow-[0_20px_40px_rgba(0,0,0,0.2)] overflow-hidden">
            <ProfileLink to="/profile">My Profile</ProfileLink>
            <ProfileLink to="/settings">Settings</ProfileLink>
            <ProfileLink to="/applications">My Applications</ProfileLink>
            <button onClick={logout} className="w-full text-left px-5 py-3 text-rose-500 hover:bg-rose-500/10">Logout</button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function ProfileLink({ to, children }) {
  return (
    <NavLink to={to} onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="block px-5 py-3 text-slate-900 dark:text-slate-200 hover:bg-black/5 dark:hover:bg-white/10">
      {children}
    </NavLink>
  );
}

function MobileDrawer({ open, setOpen, isLoggedIn, logout }) {
  return (
    <div className={`fixed top-0 right-0 h-full w-[80%] bg-gradient-to-b from-slate-950/95 to-slate-900/95 text-white shadow-2xl transform transition-transform duration-500 ${open ? "translate-x-0" : "translate-x-full"}`}>
      <div className="p-8 mt-24 space-y-6 text-lg font-medium">
        <NavLink to="/" onClick={() => setOpen(false)}>HOME</NavLink>
        <NavLink to="/jobs" onClick={() => setOpen(false)}>JOBS</NavLink>
        <NavLink to="/career-tools" onClick={() => setOpen(false)}>CAREER TOOLS</NavLink>
        <NavLink to="/careers" onClick={() => setOpen(false)}>CAREERS</NavLink>
        <NavLink to="/about" onClick={() => setOpen(false)}>ABOUT</NavLink>
        <NavLink to="/contact" onClick={() => setOpen(false)}>CONTACT</NavLink>

        <hr className="border-white/20 my-6"/>

        {!isLoggedIn ? (
          <NavLink to="/login" className="block bg-indigo-600 py-3 rounded-full text-center">Login</NavLink>
        ) : (
          <button onClick={logout} className="w-full bg-rose-600 py-3 rounded-full">Logout</button>
        )}
      </div>
    </div>
  );
}
