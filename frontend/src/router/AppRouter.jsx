import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./hooks/useAuth";

// Pages
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import AdminDashboard from "./pages/dashboard/AdminDashboard";
import RecruiterDashboard from "./pages/dashboard/RecruiterDashboard";
import CandidateDashboard from "./pages/dashboard/CandidateDashboard";
import Home from "./pages/Home";
import About from "./pages/About";
import Jobs from "./pages/jobs/Jobs";
import Contact from "./pages/Contact";
import NotFound from "./pages/Not.found";

// Wrapper for protected routes
function ProtectedRoute({ children }) {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" replace />;
}

export default function AppRouter() {
  const { user } = useAuth();

  return (
    <BrowserRouter>
      <Routes>

        {/* Auth Routes */}
        <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />} />
        <Route path="/register" element={!user ? <Register /> : <Navigate to="/" />} />

        {/* Default Redirect after login */}
        <Route
          path="/"
          element={
            user ? (
              user.role === "admin" ? <Navigate to="/dashboard/admin" /> :
              user.role === "recruiter" ? <Navigate to="/dashboard/recruiter" /> :
              user.role === "candidate" ? <Navigate to="/dashboard/candidate" /> :
              <Home />
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        {/* Protected Dashboards */}
        <Route path="/dashboard/admin" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
        <Route path="/dashboard/recruiter" element={<ProtectedRoute><RecruiterDashboard /></ProtectedRoute>} />
        <Route path="/dashboard/candidate" element={<ProtectedRoute><CandidateDashboard /></ProtectedRoute>} />

        {/* Public Routes (visible always) */}
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/contact" element={<Contact />} />

        {/* 404 */}
        <Route path="*" element={<NotFound />} />

      </Routes>
    </BrowserRouter>
  );
}
