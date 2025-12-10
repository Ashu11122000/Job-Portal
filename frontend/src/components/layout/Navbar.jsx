import { useEffect, useState, useRef } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  FiMenu,
  FiX,
  FiChevronDown,
  FiBell,
  FiSearch,
  FiShield,
  FiUsers,
  FiBarChart2,
  FiBriefcase,
  FiSun,
  FiMoon,
} from "react-icons/fi";
import { useAuthContext } from "../../context/AuthContext";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [adminOpen, setAdminOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [search, setSearch] = useState("");
  const [dark, setDark] = useState(false);

  const auth = useAuthContext() || {};
  const { user, isLoggedIn, logout } = auth;
  const navigate = useNavigate();
  const role = user?.role || "guest";

  const totalJobs = 248; // 🔥 replace later with API

  /* ✅ DARK MODE PERSISTENCE */
  useEffect(() => {
    const saved = localStorage.getItem("theme");
    if (saved === "dark") {
      document.documentElement.classList.add("dark");
      setDark(true);
    }
  }, []);

  const toggleDarkMode = () => {
    const newMode = !dark;
    setDark(newMode);

    if (newMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  /* ✅ SCROLL EFFECT */
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    logout?.();
    navigate("/login");
  };

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/jobs?search=${search}`);
  };

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300
      ${
        scrolled
          ? "py-2 bg-slate-900/95 shadow-2xl backdrop-blur-xl"
          : "py-5 bg-slate-900"
      }
      `}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6">
        {/* ✅ LOGO */}
        <NavLink
          to="/"
          className="text-3xl font-black bg-linear-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent"
        >
          JobPortal
        </NavLink>

        {/* ✅ SEARCH BAR */}
        <form
          onSubmit={handleSearch}
          className="hidden lg:flex items-center bg-slate-800 rounded-full px-4 py-2 shadow-inner"
        >
          <FiSearch className="text-slate-400 mr-2" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search jobs, companies..."
            className="bg-transparent outline-none text-sm w-52 text-white placeholder-slate-400"
          />
        </form>

        {/* ✅ DESKTOP NAV */}
        <div className="hidden md:flex items-center gap-10 font-medium text-slate-200">
          <NavItem to="/">Home</NavItem>

          <NavItem to="/jobs">
            Jobs
            <span className="ml-2 px-2 py-0.5 bg-indigo-500/20 text-indigo-300 text-xs rounded-full">
              {totalJobs}
            </span>
          </NavItem>

          <NavItem to="/career-tools">Career Tools</NavItem>
          <NavItem to="/blog">Blogs</NavItem>
          <NavItem to="/about">About</NavItem>
          <NavItem to="/contact">Contact</NavItem>

          {/* ✅ ADMIN MEGA MENU */}
          {role === "admin" && (
            <div
              onMouseEnter={() => setAdminOpen(true)}
              onMouseLeave={() => setAdminOpen(false)}
              className="relative"
            >
              <button className="flex items-center gap-1 text-red-400 font-bold">
                Admin <FiChevronDown />
              </button>

              {adminOpen && (
                <div className="absolute right-0 mt-6 w-72 bg-slate-900 shadow-2xl border border-slate-700 rounded-2xl p-6 space-y-4 animate-fadeIn">
                  <MegaLink to="/admin">
                    <FiShield /> Admin Dashboard
                  </MegaLink>
                  <MegaLink to="/admin/users">
                    <FiUsers /> Manage Users
                  </MegaLink>
                  <MegaLink to="/admin/jobs">
                    <FiBriefcase /> Manage Jobs
                  </MegaLink>
                  <MegaLink to="/admin/analytics">
                    <FiBarChart2 /> Analytics Charts ✅
                  </MegaLink>
                </div>
              )}
            </div>
          )}

          {/* ✅ DARK MODE TOGGLE */}
          <button
            onClick={toggleDarkMode}
            className="text-xl hover:text-indigo-400 transition"
            title="Toggle Theme"
          >
            {dark ? <FiSun /> : <FiMoon />}
          </button>

          {/* ✅ NOTIFICATIONS */}
          {isLoggedIn && (
            <div className="relative">
              <FiBell className="text-xl cursor-pointer" />
              <span className="absolute -top-2 -right-2 bg-rose-600 text-white text-xs px-1.5 rounded-full">
                5
              </span>
            </div>
          )}

          {/* ✅ PROFILE */}
          {isLoggedIn && (
            <div className="relative">
              <button
                onClick={() => setProfileOpen(!profileOpen)}
                className="flex items-center gap-2"
              >
                <div className="w-9 h-9 rounded-full bg-indigo-500 flex items-center justify-center text-white font-bold">
                  {user?.name?.[0] || "U"}
                </div>
              </button>

              {profileOpen && (
                <div className="absolute right-0 mt-6 w-56 bg-slate-900 rounded-2xl shadow-xl border border-slate-700 overflow-hidden">
                  <ProfileLink to="/profile">My Profile</ProfileLink>
                  <ProfileLink to="/settings">Settings</ProfileLink>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-5 py-3 text-rose-400 hover:bg-rose-500/10"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}

          {/* ✅ LOGIN */}
          {!isLoggedIn && (
            <NavLink
              to="/login"
              className="bg-indigo-700 hover:bg-indigo-600 text-white font-semibold px-9 py-2.5 rounded-full shadow-lg transition"
            >
              Login
            </NavLink>
          )}
        </div>

        {/* ✅ MOBILE TOGGLE */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-3xl text-white"
        >
          {open ? <FiX /> : <FiMenu />}
        </button>
      </div>

      {/* ✅ MOBILE DRAWER */}
      <div
        className={`fixed top-0 right-0 h-full w-[85%] bg-slate-950 text-white z-40 shadow-2xl transform transition
          ${open ? "translate-x-0" : "translate-x-full"}
        `}
      >
        <div className="p-8 mt-20 space-y-6 text-lg font-medium">
          {["/", "/jobs", "/career-tools", "/blog", "/about", "/contact"].map(
            (p) => (
              <NavLink key={p} to={p} onClick={() => setOpen(false)}>
                {p.replace("/", "").toUpperCase() || "HOME"}
              </NavLink>
            )
          )}

          {!isLoggedIn ? (
            <NavLink
              to="/login"
              className="block bg-indigo-700 text-white py-3 rounded-full text-center"
            >
              Login
            </NavLink>
          ) : (
            <button
              onClick={handleLogout}
              className="w-full bg-rose-600 text-white py-3 rounded-full"
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}

/* ✅ COMPONENTS */

function NavItem({ to, children }) {
  return (
    <NavLink to={to} className="relative hover:text-indigo-400 transition">
      {children}
    </NavLink>
  );
}

function MegaLink({ to, children }) {
  return (
    <NavLink
      to={to}
      className="flex items-center gap-3 text-slate-300 hover:text-indigo-400 transition"
    >
      {children}
    </NavLink>
  );
}

function ProfileLink({ to, children }) {
  return (
    <NavLink to={to} className="block px-5 py-3 hover:bg-slate-800">
      {children}
    </NavLink>
  );
}
