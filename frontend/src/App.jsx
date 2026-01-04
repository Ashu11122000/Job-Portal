import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
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

/* ======= DASHBOARD IMPORTS (ADDED, not removing anything) ======= */
import AdminDashboard from "./pages/dashboard/AdminDashboard";
import RecruiterDashboard from "./pages/dashboard/RecruiterDasboard";
import CandidateDashboard from "./pages/dashboard/CandidateDashboard";

function App() {
  return (
    <Router>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/career-tools" element={<CareerTools />} />
        <Route path="/jobs/:id" element={<JobDetail />} />
        <Route path="/tools/resume-builder" element={<ResumeBuilder />} />
        <Route path="/tools/career-roadmap" element={<CareerRoadmap />} />
        <Route path="/tools/salary-estimator" element={<SalaryEstimator />} />
        <Route path="/tools/cover-letter" element={<CoverLetterTool />} />
        <Route path="/tools/mock-interview" element={<MockInterviewTool />} />
        <Route path="/tools/certification-tracker" element={<CertificationTracker />} />
        <Route path="/blog" element={<Blogs />} />

        {/* ===== DASHBOARD ROUTES (ADDED, FIXES ERROR) ===== */}
        <Route path="/dashboard/admin" element={<AdminDashboard />} />
        <Route path="/dashboard/recruiter" element={<RecruiterDashboard />} />
        <Route path="/dashboard/candidate" element={<CandidateDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
