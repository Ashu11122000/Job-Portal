import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../pages/auth/Login.jsx";
import Home from "../pages/Home.jsx";
import DashboardLayout from "../layouts/DashboardLayout.jsx";
import AdminDashboard from "../pages/dashboard/AdminDashboard.jsx";
import EmployerDashboard from "../pages/dashboard/EmployerDashboard.jsx";
import CandidateDashboard from "../pages/dashboard/CandidateDashboard.jsx";
import Footer from "../components/layout/Footer.jsx";

// ...other imports remain untouched

export default function AppRouter() {
  return (
    <BrowserRouter>
      {/* Navbar is probably here — keeping as it is */}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />

        {/* DASHBOARD ROUTER WITH SIDEBAR + NAVBAR LAYOUT */}
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/recruiter" element={<EmployerDashboard />} />
          <Route path="/candidate" element={<CandidateDashboard />} />
        </Route>

        {/* other routes remain untouched */}

      </Routes>

      {/* Footer loaded globally for all pages */}
      <Footer />
    </BrowserRouter>
  );
}
