import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

/* ===== AUTH ===== */
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";

/* ===== DASHBOARDS ===== */
import AdminDashboard from "../pages/dashboard/AdminDashboard";
import RecruiterDashboard from "../pages/dashboard/RecruiterDashboard";
import CandidateDashboard from "../pages/dashboard/CandidateDashboard";

/* ===== PUBLIC PAGES ===== */
import PublicLayout from "../layouts/PublicLayout";
import Home from "../pages/Home";
import About from "../pages/About";
import Jobs from "../pages/jobs/Jobs";
//import CompanyProfile from "../pages/company/CompanyProfile";
import Contact from "../pages/Contact";
import NotFound from "../pages/NotFound";
import JobDetail from "../pages/jobs/JobDetails";
import CareerTools from './../pages/CareerTools';

/* ===== CAREER TOOLS PAGES ===== */
import CareerRoadmap from "./../pages/tools/CareerRoadmap";
import ResumeBuilder from './../pages/tools/ResumeBuilder';
import CoverLetterTool from './../pages/tools/CoverLetterTool';
import CertificationTracker from './../pages/tools/CertificationTracker';
import SalaryEstimator from './../pages/tools/SalaryEstimator';


export default function AppRouter() {
  const { user } = useAuth();

  return (
    <BrowserRouter>
      <Routes>

        {/* ================= AUTH ================= */}
        <Route
          path="/login"
          element={!user ? <Login /> : <Navigate to="/" replace />}
        />
        <Route
          path="/register"
          element={!user ? <Register /> : <Navigate to="/" replace />}
        />

        {/* ================= ROOT REDIRECT ================= */}
        <Route
          path="/"
          element={
            user ? (
              user.role === "admin" ? (
                <Navigate to="/dashboard/admin" replace />
              ) : user.role === "recruiter" ? (
                <Navigate to="/dashboard/recruiter" replace />
              ) : (
                <Navigate to="/dashboard/candidate" replace />
              )
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        {/* ================= DASHBOARDS (NO LAYOUT) ================= */}
        <Route
          path="/dashboard/admin"
          element={user?.role === "admin" ? <AdminDashboard /> : <Navigate to="/" />}
        />

        <Route
          path="/dashboard/recruiter"
          element={user?.role === "recruiter" ? <RecruiterDashboard /> : <Navigate to="/" />}
        />

        <Route
          path="/dashboard/candidate"
          element={user?.role === "candidate" ? <CandidateDashboard /> : <Navigate to="/" />}
        />

        {/* ================= PUBLIC PAGES ================= */}
        <Route path="/" element={<PublicLayout />}>
          <Route path="home" element={<Home />} />
          <Route path="jobs" element={<Jobs />} />
          <Route path="jobs/:id" element={<JobDetail />} />
          { /*== <Route path="/companies" element={<CompanyProfile />} /> ==*/}
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
          <Route path="career-tools" element={<CareerTools />} />

          {/* ===== INDIVIDUAL TOOLS (FIXES 404) ===== */}
  <Route path="tools/resume-builder" element={<ResumeBuilder />} />
  <Route path="tools/career-roadmap" element={<CareerRoadmap />} />
  <Route path="tools/salary-estimator" element={<SalaryEstimator />} />
  <Route path="tools/certification-tracker" element={<CertificationTracker />} />
  <Route path="tools/cover-letter" element={<CoverLetterTool/>} />
        </Route>

        {/* ================= 404 ================= */}
        <Route path="*" element={<NotFound />} />

      </Routes>
    </BrowserRouter>
  );
}
