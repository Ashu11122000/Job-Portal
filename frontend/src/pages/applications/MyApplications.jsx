import { useEffect, useState } from "react";
import { getApplications } from "../../api/applicationApi";
import ApplicationCard from "../../components/cards/ApplicationCard";

export default function MyApplications() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getApplications()
      .then((res) => {
        const data = res.data.data || res.data;
        setApplications(data);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="p-10">Loading applications...</p>;

  return (
    <div className="max-w-6xl mx-auto px-6 py-24">
      <h1 className="text-3xl font-bold mb-6">My Applications</h1>

      {applications.length === 0 && (
        <p className="text-slate-500">
          You haven&apos;t applied to any jobs yet.
        </p>
      )}

      <div className="space-y-4">
        {applications.map((app) => (
          <ApplicationCard key={app._id || app.id} application={app} />
        ))}
      </div>
    </div>
  );
}
