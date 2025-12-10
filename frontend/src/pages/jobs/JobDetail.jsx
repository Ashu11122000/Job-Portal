import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getJobById } from "../../api/jobApi";
import { applyForJob } from "../../api/applicationApi";
import { useAuthContext } from "../../context/AuthContext";

export default function JobDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const auth = useAuthContext() || {};
  const { isLoggedIn, user } = auth;

  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [applyLoading, setApplyLoading] = useState(false);

  useEffect(() => {
    getJobById(id)
      .then((res) => {
        const data = res.data?.data || res.data;
        setJob(data);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [id]);

  const handleApply = async () => {
    if (!isLoggedIn) {
      alert("Please login as a candidate to apply.");
      navigate("/login");
      return;
    }

    if (user?.role !== "candidate") {
      alert("Only candidates can apply for jobs.");
      return;
    }

    setApplyLoading(true);
    try {
      await applyForJob({
        jobId: job._id || job.id,
        coverLetter: "I am very interested in this role.",
      });

      alert("✅ Application submitted successfully!");
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Failed to apply.");
    } finally {
      setApplyLoading(false);
    }
  };

  if (loading)
    return <p className="p-10 text-center">Loading job details...</p>;

  if (!job) return <p className="p-10 text-center">Job not found.</p>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 px-6 py-24">
      <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-xl p-10">
        {/* ✅ JOB HEADER */}
        <div className="border-b pb-8 mb-8">
          <h1 className="text-4xl font-black text-slate-900 mb-2">
            {job.title}
          </h1>

          <p className="text-lg text-indigo-600 font-semibold mb-1">
            {job.company?.name}
          </p>

          <p className="text-slate-500">
            📍 {job.location} • 🏢 {job.workMode || "Onsite"} • ⏳{" "}
            {job.experience || "0-2"} Years
          </p>

          <p className="text-indigo-700 font-bold text-xl mt-4">
            ₹{job.salaryRange?.min?.toLocaleString()} – ₹
            {job.salaryRange?.max?.toLocaleString()} / year
          </p>
        </div>

        {/* ✅ JOB OVERVIEW GRID */}
        <div className="grid md:grid-cols-3 gap-6 mb-10">
          <InfoCard title="Job Type" value={job.jobType || "Full-Time"} />
          <InfoCard title="Experience" value={job.experience || "Fresher"} />
          <InfoCard title="Work Mode" value={job.workMode || "Onsite"} />
          <InfoCard
            title="Department"
            value={job.department || "Engineering"}
          />
          <InfoCard title="Openings" value={job.openings || "1"} />
          <InfoCard
            title="Posted On"
            value={new Date(job.createdAt).toDateString()}
          />
        </div>

        {/* ✅ JOB DESCRIPTION */}
        <Section title="Job Description">
          {job.description || "No job description provided."}
        </Section>

        {/* ✅ RESPONSIBILITIES */}
        <Section title="Key Responsibilities">
          <ul className="list-disc ml-6 text-slate-700 space-y-2">
            {(
              job.responsibilities || [
                "Design and develop scalable applications",
                "Collaborate with cross-functional teams",
                "Write clean & optimized code",
                "Participate in code reviews",
              ]
            ).map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </Section>

        {/* ✅ SKILLS */}
        <Section title="Required Skills">
          <div className="flex flex-wrap gap-3">
            {(job.skills || ["React", "Java", "Spring Boot", "MySQL"]).map(
              (skill, i) => (
                <span
                  key={i}
                  className="bg-indigo-100 text-indigo-700 px-4 py-1.5 rounded-full text-sm font-medium"
                >
                  {skill}
                </span>
              )
            )}
          </div>
        </Section>

        {/* ✅ BENEFITS */}
        <Section title="Benefits & Perks">
          <ul className="list-disc ml-6 text-slate-700 space-y-2">
            {(
              job.benefits || [
                "Health Insurance",
                "Hybrid Work",
                "Paid Leaves",
                "Learning Budget",
                "Career Growth",
              ]
            ).map((benefit, i) => (
              <li key={i}>{benefit}</li>
            ))}
          </ul>
        </Section>

        {/* ✅ ABOUT COMPANY */}
        <Section title="About the Company">
          <p className="text-slate-700 leading-relaxed">
            {job.company?.about ||
              "This company is a fast-growing organization focused on building cutting-edge digital products and hiring top talent across India."}
          </p>
        </Section>

        {/* ✅ APPLY BUTTON */}
        <div className="mt-10 flex gap-6">
          <button
            onClick={handleApply}
            disabled={applyLoading}
            className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-10 py-3 rounded-full font-semibold shadow hover:scale-105 transition"
          >
            {applyLoading ? "Applying..." : "Apply Now"}
          </button>

          <button
            onClick={() => navigate(-1)}
            className="border border-slate-300 px-8 py-3 rounded-full font-semibold hover:bg-slate-100"
          >
            Back
          </button>
        </div>
      </div>
    </div>
  );
}

/* ✅ REUSABLE INFO CARD */
function InfoCard({ title, value }) {
  return (
    <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-5">
      <p className="text-slate-500 text-sm mb-1">{title}</p>
      <p className="text-slate-900 font-bold">{value}</p>
    </div>
  );
}

/* ✅ REUSABLE SECTION */
function Section({ title, children }) {
  return (
    <div className="mb-10">
      <h3 className="text-2xl font-bold text-slate-900 mb-4">{title}</h3>
      {children}
    </div>
  );
}
