import { motion } from "framer-motion";
import {
  FiStar,
  FiMessageCircle,
  FiTrendingUp,
  FiCheckCircle,
} from "react-icons/fi";

const testimonials = [
  {
    id: 1,
    name: "Ankit Sharma",
    role: "Frontend Developer",
    company: "Startup India",
    image: "https://i.pravatar.cc/150?img=12",
    rating: 5,
    highlight: "Hired in 3 weeks",
    message:
      "JobPortal completely transformed my job search. The AI matching surfaced roles I would never have found on my own.",
  },
  {
    id: 2,
    name: "Priya Mehta",
    role: "HR Manager",
    company: "TechNova",
    image: "https://i.pravatar.cc/150?img=32",
    rating: 5,
    highlight: "6 hires in 30 days",
    message:
      "The candidate quality and response rate are outstanding. It has become our primary hiring platform.",
  },
  {
    id: 3,
    name: "Rahul Verma",
    role: "Java Backend Engineer",
    company: "CloudCore",
    image: "https://i.pravatar.cc/150?img=56",
    rating: 4,
    highlight: "Interviews in 48 hrs",
    message:
      "The accuracy of job recommendations is impressive. I started receiving interview calls within two days.",
  },
  {
    id: 4,
    name: "Sneha Kapoor",
    role: "UI/UX Designer",
    company: "DesignHub",
    image: "https://i.pravatar.cc/150?img=45",
    rating: 5,
    highlight: "48% salary hike",
    message:
      "The resume tools and interview prep helped me negotiate a significant salary increase with confidence.",
  },
  {
    id: 5,
    name: "Aman Jindal",
    role: "DevOps Engineer",
    company: "InfraScale",
    image: "https://i.pravatar.cc/150?img=18",
    rating: 5,
    highlight: "Premium visibility",
    message:
      "This platform gives serious exposure to high-quality tech roles. It feels curated, not cluttered.",
  },
  {
    id: 6,
    name: "Neha Malhotra",
    role: "Talent Acquisition Lead",
    company: "FinTech Pro",
    image: "https://i.pravatar.cc/150?img=28",
    rating: 5,
    highlight: "Enterprise scale",
    message:
      "We scaled our engineering team efficiently. JobPortal is now embedded in our hiring workflow.",
  },
];

export default function Testimonials() {
  return (
    <section
      className="relative w-full py-40 overflow-hidden
                        bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-900"
    >
      {/* ================= AMBIENT DEPTH ================= */}
      <motion.div
        animate={{ x: [0, 180, 0], y: [0, -140, 0] }}
        transition={{ duration: 36, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-96 -left-96 w-[900px] h-[900px]
                   bg-indigo-500/25 rounded-full blur-[280px]"
      />
      <motion.div
        animate={{ x: [0, -180, 0], y: [0, 140, 0] }}
        transition={{ duration: 40, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -bottom-96 -right-96 w-[900px] h-[900px]
                   bg-purple-500/25 rounded-full blur-[300px]"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* ================= HEADER ================= */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="text-center mb-28"
        >
          <span
            className="inline-flex items-center gap-2 mb-6 px-8 py-2
                           rounded-full text-sm font-semibold
                           bg-white/10 backdrop-blur-xl
                           text-indigo-300 border border-white/15
                           shadow-[0_0_30px_rgba(99,102,241,0.35)]"
          >
            <FiTrendingUp />
            Proven Career Outcomes
          </span>

          <h2
            className="text-5xl md:text-6xl font-black
                         bg-gradient-to-r from-indigo-400 via-blue-400 to-purple-400
                         bg-clip-text text-transparent"
          >
            Trusted by Professionals & Hiring Teams
          </h2>

          <p className="text-slate-400 mt-8 text-xl max-w-3xl mx-auto leading-relaxed">
            Real stories from candidates and recruiters who achieved measurable
            hiring and career success using JobPortal.
          </p>

          <div className="mt-12 flex justify-center">
            <div
              className="h-1.5 w-64 rounded-full
                            bg-gradient-to-r from-indigo-500 via-blue-500 to-purple-500
                            shadow-[0_0_35px_rgba(99,102,241,0.9)]"
            />
          </div>
        </motion.div>

        {/* ================= TESTIMONIAL GRID ================= */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-16 perspective-[1600px]">
          {testimonials.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.12, duration: 0.7 }}
              whileHover={{
                y: -16,
                scale: 1.06,
                rotateX: -8,
                rotateY: 8,
                transition: { type: "spring", stiffness: 140, damping: 16 },
              }}
              className="relative group transform-gpu"
            >
              {/* Soft glow */}
              <div
                className="absolute inset-0 rounded-3xl
                              bg-gradient-to-r from-indigo-500 to-purple-600
                              opacity-0 group-hover:opacity-25
                              blur-3xl transition duration-500"
              />

              {/* Card */}
              <div
                className="relative bg-white/10 backdrop-blur-2xl
                              border border-white/15 rounded-3xl
                              p-12 shadow-[0_40px_120px_rgba(0,0,0,0.55)]"
              >
                {/* Quote icon */}
                <div
                  className="absolute -top-6 right-8
                                w-12 h-12 rounded-full
                                bg-indigo-500 text-white
                                flex items-center justify-center
                                shadow-xl"
                >
                  <FiMessageCircle />
                </div>

                {/* User */}
                <div className="flex items-center gap-5 mb-6">
                  <div className="relative">
                    <div
                      className="absolute inset-0 rounded-full
                                    bg-indigo-500 blur-md opacity-40"
                    />
                    <img
                      src={item.image}
                      alt={item.name}
                      className="relative w-16 h-16 rounded-full
                                 object-cover shadow-xl"
                    />
                  </div>

                  <div>
                    <h4 className="text-lg font-bold text-white flex items-center gap-2">
                      {item.name}
                      <FiCheckCircle className="text-indigo-400 text-sm" />
                    </h4>
                    <p className="text-slate-400 text-sm">
                      {item.role} · {item.company}
                    </p>
                  </div>
                </div>

                {/* Highlight */}
                <div
                  className="inline-flex items-center gap-2 mb-4
                                px-4 py-1 rounded-full
                                bg-emerald-100 text-emerald-700
                                text-sm font-semibold"
                >
                  {item.highlight}
                </div>

                {/* Rating */}
                <div className="flex gap-1 text-yellow-400 mb-5">
                  {[...Array(item.rating)].map((_, i) => (
                    <FiStar key={i} />
                  ))}
                </div>

                {/* Message */}
                <p className="text-slate-300 text-base leading-relaxed">
                  “{item.message}”
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* ================= CTA ================= */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="mt-32 text-center"
        >
          <motion.a
            href="/register"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.96 }}
            className="inline-flex items-center gap-4
                       bg-gradient-to-r from-indigo-600 to-purple-600
                       text-white px-20 py-6 rounded-full
                       font-black text-lg
                       shadow-[0_30px_110px_rgba(99,102,241,0.75)]
                       transition-all"
          >
            Start Your Success Story
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
