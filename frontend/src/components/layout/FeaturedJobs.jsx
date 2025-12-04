import jobs from "../../static/jobs.json";
import JobCard from "../cards/JobCard";

export default function FeaturedJobs() {
  return (
    <section className="w-full py-20 bg-gradient-to-b from-white via-blue-50/40 to-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-14">
          <h2 className="text-4xl font-extrabold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent drop-shadow-sm">
            Featured Opportunities
          </h2>
          <p className="text-gray-600 mt-3 text-lg">
            Explore the latest openings from India’s top tech companies
          </p>

          {/* Decorative Line */}
          <div className="mt-6 flex justify-center">
            <div className="h-1 w-28 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600"></div>
          </div>
        </div>

        {/* Jobs Grid */}
        <div
          className="
          grid 
          sm:grid-cols-2 
          lg:grid-cols-3 
          gap-8 
          animate-fadeIn
        "
        >
          {jobs.map((job) => (
            <div
              key={job.id}
              className="transform transition duration-300 hover:scale-105 hover:shadow-2xl"
            >
              <JobCard job={job} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
