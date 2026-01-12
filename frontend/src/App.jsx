import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Home from "./pages/Home";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Jobs from "./pages/jobs/Jobs";
import About from "./pages/About";
import Contact from "./pages/Contact";
import CareerTools from "./pages/CareerTools";
import JobDetail from "./pages/jobs/JobDetail";
import CareerRoadmap from "./pages/tools/CareerRoadmap";
import ResumeBuilder from "./pages/tools/ResumeBuilder";
import SalaryEstimator from "./pages/tools/SalaryEstimator";
import CoverLetterTool from "./pages/tools/CoverLetterTool";
import MockInterviewTool from "./pages/tools/MockInterviewCall";
import CertificationTracker from "./pages/tools/CertificationTracker";
import Blogs from "./pages/Blogs";
import "./App.css";

/* ===== DASHBOARDS ===== */
import AdminDashboard from "./pages/dashboard/AdminDashboard";
import RecruiterDashboard from "./pages/dashboard/RecruiterDasboard";
import CandidateDashboard from "./pages/dashboard/CandidateDashboard";

/* ===== COMPANY / JOB ===== */
import CompanyProfile from "./pages/company/CompanyProfile";
import ManageJobs from "./pages/company/ManageJobs";
import PostJob from "./pages/jobs/PostJob";
import JobsByCompany from "./pages/company/JobsByCompany";

/* ===== AUTH ===== */
import ProtectedRoute from "./components/routes/ProtectedRoutes";
import { useAuthContext } from "./context/AuthContext";

function App() {
  const { isLoggedInUser, user } = useAuthContext();

  return (
    <Router>

      {/* ✅ Navbar visible ONLY after login */}
      {isLoggedInUser && <Navbar />}

      <Routes>
        {/* ================= AUTH ENTRY ================= */}
        <Route
          path="/"
          element={
            isLoggedInUser ? (
              <Navigate to={`/dashboard/${user?.role}`} replace />
            ) : (
              <Login />
            )
          }
        />

        <Route
          path="/login"
          element={
            isLoggedInUser ? (
              <Navigate to={`/dashboard/${user?.role}`} replace />
            ) : (
              <Login />
            )
          }
        />

        <Route
          path="/register"
          element={
            isLoggedInUser ? (
              <Navigate to={`/dashboard/${user?.role}`} replace />
            ) : (
              <Register />
            )
          }
        />

        {/* ================= DASHBOARDS ================= */}
        <Route
          path="/dashboard/admin"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/dashboard/recruiter"
          element={
            <ProtectedRoute allowedRoles={["recruiter"]}>
              <RecruiterDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/dashboard/candidate"
          element={
            <ProtectedRoute allowedRoles={["candidate"]}>
              <CandidateDashboard />
            </ProtectedRoute>
          }
        />

        {/* ================= PUBLIC (NAVBAR) ================= */}
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/jobs/:id" element={<JobDetail />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/career-tools" element={<CareerTools />} />
        <Route path="/blogs" element={<Blogs />} />

        {/* ================= TOOLS ================= */}
        <Route path="/tools/resume-builder" element={<ResumeBuilder />} />
        <Route path="/tools/career-roadmap" element={<CareerRoadmap />} />
        <Route path="/tools/salary-estimator" element={<SalaryEstimator />} />
        <Route path="/tools/cover-letter" element={<CoverLetterTool />} />
        <Route path="/tools/mock-interview" element={<MockInterviewTool />} />
        <Route path="/tools/certification-tracker" element={<CertificationTracker />} />

        {/* ================= COMPANY ================= */}
        <Route path="/companies/jobs" element={<JobsByCompany />} />
        <Route path="/company/profile/:id" element={<CompanyProfile />} />
        <Route path="/company/manage" element={<ManageJobs />} />
        <Route path="/jobs/post" element={<PostJob />} />

        {/* ================= FALLBACK ================= */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
