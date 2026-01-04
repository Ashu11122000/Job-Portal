import { Outlet } from "react-router-dom";
import Sidebar from "../components/layout/Sidebar";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer"; // ✅ Footer imported first as requested

export default function DashboardLayout() {
  return (
    <div className="flex bg-black text-black min-h-screen">
      <Sidebar />
      <div className="flex-1">
        <Navbar />
        <main className="p-6">
          <Outlet />
        </main>
        <Footer /> {/* ✅ Footer placed at bottom of dashboard */}
      </div>
    </div>
  );
}
