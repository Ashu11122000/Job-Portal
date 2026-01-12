import { NavLink } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import {
  LayoutDashboard,
  Briefcase,
  PlusCircle,
  FileText,
  User,
  Settings,
  LogOut,
  Users,
  BarChart3,
  Building2,
} from "lucide-react";

export default function Sidebar() {
  const { user, logout } = useAuth();

  const baseLink =
    "flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all";
  const activeLink =
    "bg-indigo-600 text-white shadow-md";
  const inactiveLink =
    "text-gray-600 hover:bg-gray-100 hover:text-gray-900";

  return (
    <aside className="h-screen w-64 bg-white border-r shadow-sm flex flex-col">
      {/* ===== LOGO / BRAND ===== */}
      <div className="px-6 py-5 border-b">
        <h1 className="text-xl font-bold text-indigo-600">
          Job<span className="text-gray-900">Portal</span>
        </h1>
        <p className="text-xs text-gray-500 mt-1 capitalize">
          {user?.role} dashboard
        </p>
      </div>

      {/* ===== NAVIGATION ===== */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {/* COMMON */}
        <NavLink
          to={`/dashboard/${user?.role}`}
          className={({ isActive }) =>
            `${baseLink} ${isActive ? activeLink : inactiveLink}`
          }
        >
          <LayoutDashboard size={18} />
          Dashboard
        </NavLink>

        {/* ===== CANDIDATE ===== */}
        {user?.role === "candidate" && (
          <>
            <NavLink
              to="/jobs"
              className={({ isActive }) =>
                `${baseLink} ${isActive ? activeLink : inactiveLink}`
              }
            >
              <Briefcase size={18} />
              Browse Jobs
            </NavLink>

            <NavLink
              to="/career-tools"
              className={({ isActive }) =>
                `${baseLink} ${isActive ? activeLink : inactiveLink}`
              }
            >
              <FileText size={18} />
              Career Tools
            </NavLink>

            <NavLink
              to="/profile"
              className={({ isActive }) =>
                `${baseLink} ${isActive ? activeLink : inactiveLink}`
              }
            >
              <User size={18} />
              My Profile
            </NavLink>
          </>
        )}

        {/* ===== RECRUITER ===== */}
        {user?.role === "recruiter" && (
          <>
            <NavLink
              to="/jobs/post"
              className={({ isActive }) =>
                `${baseLink} ${isActive ? activeLink : inactiveLink}`
              }
            >
              <PlusCircle size={18} />
              Post Job
            </NavLink>

            <NavLink
              to="/company/manage"
              className={({ isActive }) =>
                `${baseLink} ${isActive ? activeLink : inactiveLink}`
              }
            >
              <Building2 size={18} />
              Manage Jobs
            </NavLink>

            <NavLink
              to="/company/profile/me"
              className={({ isActive }) =>
                `${baseLink} ${isActive ? activeLink : inactiveLink}`
              }
            >
              <User size={18} />
              Company Profile
            </NavLink>
          </>
        )}

        {/* ===== ADMIN ===== */}
        {user?.role === "admin" && (
          <>
            <NavLink
              to="/admin/users"
              className={({ isActive }) =>
                `${baseLink} ${isActive ? activeLink : inactiveLink}`
              }
            >
              <Users size={18} />
              Manage Users
            </NavLink>

            <NavLink
              to="/admin/reports"
              className={({ isActive }) =>
                `${baseLink} ${isActive ? activeLink : inactiveLink}`
              }
            >
              <BarChart3 size={18} />
              Reports & Analytics
            </NavLink>

            <NavLink
              to="/admin/settings"
              className={({ isActive }) =>
                `${baseLink} ${isActive ? activeLink : inactiveLink}`
              }
            >
              <Settings size={18} />
              System Settings
            </NavLink>
          </>
        )}
      </nav>

      {/* ===== FOOTER / LOGOUT ===== */}
      <div className="border-t px-4 py-4">
        <button
          onClick={logout}
          className="flex items-center gap-3 w-full px-4 py-3 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-all"
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </aside>
  );
}
