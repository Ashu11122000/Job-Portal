import { useEffect, useState } from "react";
import { getAnalyticsSummary } from "../../api/analyticsApi";
import StatCard from "../cards/StatCard";

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAnalyticsSummary()
      .then((res) => {
        const data = res.data.data || res.data;
        setStats(data);
      })
      .catch((err) => console.error("Failed to load analytics:", err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="p-10">Loading dashboard...</p>;

  if (!stats) return <p className="p-10">No analytics available.</p>;

  return (
    <div className="max-w-6xl mx-auto px-6 py-24">
      <h1 className="text-3xl font-bold mb-8 text-slate-900">
        Admin Dashboard
      </h1>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard label="Total Jobs" value={stats.totalJobs} />
        <StatCard label="Total Candidates" value={stats.totalCandidates} />
        <StatCard label="Total Recruiters" value={stats.totalRecruiters} />
        <StatCard label="Total Applications" value={stats.totalApplications} />
      </div>

      {/* You can add charts using /analytics/jobs and /analytics/applications */}
    </div>
  );
}
