// src/pages/tools/ResumeBuilder.jsx
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  FiFileText,
  FiMail,
  FiPhone,
  FiMapPin,
  FiLink,
  FiDownload,
  FiMoon,
  FiSun,
  FiLayers,
  FiZap,
  FiRefreshCw,
} from "react-icons/fi";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import Footer from "../../components/layout/Footer";
import { saveResumeApi, getResumeApi, listResumesApi } from "../../api/resumeApi";

export default function ResumeBuilder() {
  const [template, setTemplate] = useState("modern");
  const [darkMode, setDarkMode] = useState(false);

  const [form, setForm] = useState({
    name: "",
    title: "",
    summary: "",
    skills: "",
    experience: "",
    education: "",
    certifications: "",
    projects: "",
    email: "",
    phone: "",
    location: "",
    links: "",
  });

  const [visible, setVisible] = useState({
    name: true,
    title: true,
    summary: true,
    skills: true,
    experience: true,
    education: true,
    certifications: true,
    projects: true,
    email: true,
    phone: true,
    location: true,
    links: true,
  });

  const [resumeId, setResumeId] = useState("");
  const [savedList, setSavedList] = useState([]);

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const toggleVisible = (key) => {
    setVisible((v) => ({ ...v, [key]: !v[key] }));
  };

  const autoFill = () => {
    const data = {
      name: "Ashish Kumar",
      title: "Full Stack Developer",
      summary:
        "Full-stack developer with strong experience in React.js, Spring Boot, MySQL, and cloud deployments.",
      skills: "React.js, Java, Spring Boot, MySQL, Docker, Kubernetes, Git",
      experience:
        "- Built HRMS using React + Spring Boot\n- Implemented JWT Auth + RBAC",
      education: "B.Tech in Computer Science – 2023 – VTU Bangalore",
      certifications: "AWS Cloud Practitioner, Java Certification",
      projects: "Netflix Clone, Job Portal Backend",
      email: "ashish@example.com",
      phone: "+91 9876543210",
      location: "Bangalore, India",
      links: "GitHub, LinkedIn",
    };

    setForm(data);
    setVisible((v) => {
      const all = { ...v };
      Object.keys(all).forEach((k) => (all[k] = true));
      return all;
    });
  };

  const exportPDF = async () => {
    const resume = document.getElementById("resume-preview");
    if (!resume) return;

    const canvas = await html2canvas(resume, { scale: 2 });
    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF("p", "mm", "a4");
    const width = pdf.internal.pageSize.getWidth();
    const height = (canvas.height * width) / canvas.width;

    pdf.addImage(imgData, "PNG", 0, 0, width, height);
    pdf.save("resume.pdf");
  };

  // ---- API FUNCTIONS ----

  const handleSaveResume = async () => {
    try {
      const res = await saveResumeApi(form);
      setResumeId(res.data.resumeId);
      alert("Resume saved successfully!");
    } catch (err) {
      alert("Failed to save resume");
      console.error(err);
    }
  };

  const handleLoadResume = async () => {
    if (!resumeId) return;
    try {
      const res = await getResumeApi(resumeId);
      setForm(res.data.resume);
    } catch (err) {
      alert("Failed to load resume");
      console.error(err);
    }
  };

  const handleRefreshList = async () => {
    try {
      const res = await listResumesApi();
      setSavedList(res.data.resumes);
    } catch (err) {
      alert("Failed to fetch resumes list");
      console.error(err);
    }
  };

  useEffect(() => {
    handleRefreshList();
  }, []);

  const templateStyles = {
    modern: "rounded-3xl border shadow-xl p-10",
    minimal: "border-l-4 border-indigo-600 pl-6 pr-4",
    ats: "border border-slate-300 p-6 text-sm tracking-wide",
  };

  return (
    <>
      <section className="min-h-screen bg-linear-to-br from-indigo-50 via-white to-purple-50 pt-32 pb-24 px-6">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12">

          {/* LEFT PANEL */}
          <div>
            <h1 className="text-4xl font-extrabold text-black mb-6">
              <FiLayers className="inline-block mr-2" /> AI Resume Builder
            </h1>

            {/* ACTION BUTTONS */}
            <div className="flex gap-4 mb-6">
              <button
                onClick={() => setDarkMode(!darkMode)}
                className="px-5 py-2 rounded-xl bg-black text-white flex items-center gap-2 hover:scale-[1.03] shadow-md"
              >
                {darkMode ? <FiSun /> : <FiMoon />}
                {darkMode ? "Light" : "Dark"}
              </button>

              <button
                onClick={autoFill}
                className="px-5 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold flex items-center gap-2 shadow-lg hover:scale-[1.03]"
              >
                <FiZap /> Auto-Fill (AI)
              </button>
            </div>

            {/* SAVE / LOAD / REFRESH */}
            <div className="flex gap-3 mb-4">
              <button onClick={handleSaveResume} className="px-4 py-2 rounded-xl bg-green-600 text-white font-semibold shadow-lg hover:scale-[1.03]">
                <FiLayers className="inline mr-2"/> Save Resume
              </button>

              <button onClick={handleLoadResume} disabled={!resumeId} className="px-4 py-2 rounded-xl bg-blue-600 text-white font-semibold shadow-lg hover:scale-[1.03] disabled:opacity-50">
                <FiDownload className="inline mr-2"/> Load Resume
              </button>

              <button onClick={handleRefreshList} className="px-4 py-2 rounded-xl bg-purple-700 text-white font-semibold shadow-lg hover:scale-[1.03]">
                <FiRefreshCw className="inline mr-2"/> Refresh List
              </button>
            </div>

            {/* DROPDOWN */}
            {savedList.length > 0 && (
              <select onChange={(e) => setResumeId(e.target.value)} className="w-full p-3 rounded-xl border border-black text-black mb-6 shadow-md">
                <option value="">Select saved resume</option>
                {savedList.map((r) => (
                  <option key={r.id} value={r.id}>
                    {r.name} – {r.title}
                  </option>
                ))}
              </select>
            )}

            {/* FORM */}
            <div className="space-y-5 bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border p-8">
              <Field label="Full Name" visible={visible.name} toggleVisible={() => toggleVisible("name")}>
                <input name="name" onChange={handleChange} value={form.name} disabled={!visible.name} className="w-full p-3 rounded-xl border border-black text-black disabled:opacity-50 shadow-md" />
              </Field>

              <Field label="Headline / Role" visible={visible.title} toggleVisible={() => toggleVisible("title")}>
                <input name="title" onChange={handleChange} value={form.title} disabled={!visible.title} className="w-full p-3 rounded-xl border border-black text-black disabled:opacity-50 shadow-md" />
              </Field>

              <div className="grid grid-cols-2 gap-4">
                <Field label="Email" visible={visible.email} toggleVisible={() => toggleVisible("email")}>
                  <input name="email" onChange={handleChange} value={form.email} disabled={!visible.email} className="w-full p-3 rounded-xl border border-black text-black disabled:opacity-50 shadow-md" />
                </Field>

                <Field label="Phone" visible={visible.phone} toggleVisible={() => toggleVisible("phone")}>
                  <input name="phone" onChange={handleChange} value={form.phone} disabled={!visible.phone} className="w-full p-3 rounded-xl border border-black text-black disabled:opacity-50 shadow-md" />
                </Field>
              </div>

              <Field label="Location" visible={visible.location} toggleVisible={() => toggleVisible("location")}>
                <input name="location" onChange={handleChange} value={form.location} disabled={!visible.location} className="w-full p-3 rounded-xl border border-black text-black disabled:opacity-50 shadow-md" />
              </Field>

              <Field label="Summary" visible={visible.summary} toggleVisible={() => toggleVisible("summary")}>
                <textarea name="summary" onChange={handleChange} value={form.summary} disabled={!visible.summary} rows={3} className="w-full p-3 rounded-xl border border-black text-black disabled:opacity-50 shadow-md" />
              </Field>

              <Field label="Skills" visible={visible.skills} toggleVisible={() => toggleVisible("skills")}>
                <textarea name="skills" onChange={handleChange} value={form.skills} disabled={!visible.skills} rows={2} className="w-full p-3 rounded-xl border border-black text-black disabled:opacity-50 shadow-md" />
              </Field>

              <Field label="Experience" visible={visible.experience} toggleVisible={() => toggleVisible("experience")}>
                <textarea name="experience" onChange={handleChange} value={form.experience} disabled={!visible.experience} rows={3} className="w-full p-3 rounded-xl border border-black text-black disabled:opacity-50 shadow-md" />
              </Field>

              <Field label="Education" visible={visible.education} toggleVisible={() => toggleVisible("education")}>
                <textarea name="education" onChange={handleChange} value={form.education} disabled={!visible.education} rows={2} className="w-full p-3 rounded-xl border border-black text-black disabled:opacity-50 shadow-md" />
              </Field>

              <Field label="Projects" visible={visible.projects} toggleVisible={() => toggleVisible("projects")}>
                <textarea name="projects" onChange={handleChange} value={form.projects} disabled={!visible.projects} rows={2} className="w-full p-3 rounded-xl border border-black text-black disabled:opacity-50 shadow-md" />
              </Field>

              <Field label="Certifications" visible={visible.certifications} toggleVisible={() => toggleVisible("certifications")}>
                <textarea name="certifications" onChange={handleChange} value={form.certifications} disabled={!visible.certifications} rows={2} className="w-full p-3 rounded-xl border border-black text-black disabled:opacity-50 shadow-md" />
              </Field>

              <Field label="Links" visible={visible.links} toggleVisible={() => toggleVisible("links")}>
                <textarea name="links" onChange={handleChange} value={form.links} disabled={!visible.links} rows={1} className="w-full p-3 rounded-xl border border-black text-black disabled:opacity-50 shadow-md" />
              </Field>
            </div>
          </div>

          {/* RIGHT PANEL */}
          <motion.div
            id="resume-preview"
            className={`${templateStyles[template]} ${darkMode ? "bg-slate-900 text-white" : "bg-white text-black"} shadow-xl`}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <div className="flex justify-between mb-4">
              <h2 className="text-xl font-bold flex items-center gap-2 text-black"><FiFileText /> Resume Preview</h2>
              <button onClick={exportPDF} className="px-4 py-2 rounded-xl bg-black text-white font-semibold flex items-center gap-2 hover:scale-[1.03] shadow-lg">
                <FiDownload /> Export PDF
              </button>
            </div>

            <ResumePreviewContent form={form} visible={visible} />
          </motion.div>

        </div>
      </section>

      <Footer />
    </>
  );
}

// ---- Supporting Components ----

function Field({ label, children, visible, toggleVisible }) {
  return (
    <div>
      <label className="flex items-center gap-2 font-semibold text-black mb-1">
        <input type="checkbox" checked={visible} onChange={toggleVisible} className="h-4 w-4 border-2 border-black" />
        {label}
      </label>
      {children}
    </div>
  );
}

function ResumePreviewContent({ form, visible }) {
  return (
    <div className="space-y-6 text-sm">
      {visible.name && <h1 className="text-2xl font-black">{form.name}</h1>}
      {visible.title && <h2 className="text-lg font-bold">{form.title}</h2>}
      {visible.summary && <p>{form.summary}</p>}
      {visible.skills && <p><strong>Skills:</strong> {form.skills}</p>}
      {visible.experience && <p><strong>Experience:</strong> {form.experience}</p>}
      {visible.education && <p><strong>Education:</strong> {form.education}</p>}
      {visible.projects && <p><strong>Projects:</strong> {form.projects}</p>}
      {visible.certifications && <p><strong>Certifications:</strong> {form.certifications}</p>}
      {visible.email && <p><FiMail className="inline mr-2" />{form.email}</p>}
      {visible.phone && <p><FiPhone className="inline mr-2" />{form.phone}</p>}
      {visible.location && <p><FiMapPin className="inline mr-2" />{form.location}</p>}
      {visible.links && <p><FiLink className="inline mr-2" />{form.links}</p>}
    </div>
  );
}
