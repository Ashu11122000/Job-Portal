import { motion } from "framer-motion";
import { FiStar, FiMessageCircle, FiTrendingUp } from "react-icons/fi";

const testimonials = [
  {
    id: 1,
    name: "Ankit Sharma",
    role: "Frontend Developer",
    company: "Startup India",
    image: "https://i.pravatar.cc/150?img=12",
    rating: 5,
    message:
      "JobPortal completely transformed my career. I cracked a premium product role within 3 weeks.",
  },
  {
    id: 2,
    name: "Priya Mehta",
    role: "HR Manager",
    company: "TechNova",
    image: "https://i.pravatar.cc/150?img=32",
    rating: 5,
    message:
      "We hired 6 engineers in one month. Candidate quality and response rate is outstanding.",
  },
  {
    id: 3,
    name: "Rahul Verma",
    role: "Java Backend Engineer",
    company: "CloudCore",
    image: "https://i.pravatar.cc/150?img=56",
    rating: 4,
    message:
      "The AI job matching is insanely accurate. I received interviews within 48 hours.",
  },
  {
    id: 4,
    name: "Sneha Kapoor",
    role: "UI/UX Designer",
    company: "DesignHub",
    image: "https://i.pravatar.cc/150?img=45",
    rating: 5,
    message:
      "The resume tools and interview prep helped me negotiate a 48% salary hike.",
  },
  {
    id: 5,
    name: "Aman Jindal",
    role: "DevOps Engineer",
    company: "InfraScale",
    image: "https://i.pravatar.cc/150?img=18",
    rating: 5,
    message:
      "This platform gives serious visibility to premium tech jobs. Highly recommended.",
  },
  {
    id: 6,
    name: "Neha Malhotra",
    role: "Talent Acquisition Lead",
    company: "FinTech Pro",
    image: "https://i.pravatar.cc/150?img=28",
    rating: 5,
    message:
      "We scaled our entire engineering team using JobPortal. Best hiring platform in India.",
  },
];

export default function Testimonials() {
  return (
    <section className="relative w-full py-40 overflow-hidden bg-linear-to-br from-slate-950 via-indigo-950 to-slate-900">
      {/* ✅ AMBIENT GLOW */}
      <motion.div
        animate={{ x: [0, 160, 0], y: [0, -130, 0] }}
        transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-80 -left-80 w-[800px] h-[800px] bg-indigo-500/25 rounded-full blur-[240px]"
      />
      <motion.div
        animate={{ x: [0, -160, 0], y: [0, 130, 0] }}
        transition={{ duration: 34, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -bottom-80 -right-80 w-[800px] h-[800px] bg-purple-500/25 rounded-full blur-[260px]"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* ✅ PREMIUM HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="text-center mb-28"
        >
          <span className="inline-flex items-center gap-2 mb-6 px-8 py-2 rounded-full text-sm font-semibold bg-white/10 backdrop-blur-xl text-indigo-300 border border-white/15 shadow-[0_0_30px_rgba(99,102,241,0.35)]">
            <FiTrendingUp /> Real Career Growth
          </span>

          <h2 className="text-5xl md:text-6xl font-black bg-linear-to-r from-indigo-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
            Trusted By Talent & Enterprises
          </h2>

          <p className="text-slate-400 mt-8 text-xl max-w-3xl mx-auto leading-relaxed">
            Thousands of professionals and recruiters use JobPortal daily to
            build powerful careers and world-class teams.
          </p>

          <div className="mt-12 flex justify-center">
            <div className="h-1.5 w-60 rounded-full bg-linear-to-r from-indigo-500 via-blue-500 to-purple-500 shadow-[0_0_30px_rgba(99,102,241,0.9)]" />
          </div>
        </motion.div>

        {/* ✅ TESTIMONIAL GRID */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-14 perspective-[1400px]">
          {testimonials.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.12 }}
              whileHover={{
                rotateX: -10,
                rotateY: 10,
                scale: 1.08,
                y: -18,
              }}
              className="relative group transform-gpu"
            >
              {/* ✅ NEON BORDER */}
              <div className="absolute inset-0 rounded-3xl bg-linear-to-r from-indigo-500 to-purple-600 opacity-0 group-hover:opacity-100 blur-2xl transition duration-500" />

              {/* ✅ GLASS CARD */}
              <div className="relative bg-white/10 backdrop-blur-2xl border border-white/15 rounded-3xl p-10 shadow-[0_35px_90px_rgba(0,0,0,0.45)]">
                {/* ✅ MESSAGE ICON */}
                <div className="absolute -top-6 right-8 w-12 h-12 rounded-full bg-indigo-500 text-white flex items-center justify-center shadow-xl">
                  <FiMessageCircle />
                </div>

                {/* ✅ USER */}
                <div className="flex items-center gap-4 mb-6">
                  <div className="relative">
                    <div className="absolute inset-0 rounded-full bg-indigo-500 blur-md opacity-40" />
                    <img
                      src={item.image}
                      alt={item.name}
                      className="relative w-16 h-16 rounded-full object-cover shadow-xl"
                    />
                  </div>

                  <div>
                    <h4 className="text-lg font-bold text-white">
                      {item.name}
                    </h4>
                    <p className="text-slate-400 text-sm">
                      {item.role} @ {item.company}
                    </p>
                  </div>
                </div>

                {/* ✅ RATING */}
                <div className="flex gap-1 text-yellow-400 mb-5">
                  {[...Array(item.rating)].map((_, i) => (
                    <FiStar key={i} className="animate-pulse" />
                  ))}
                </div>

                {/* ✅ MESSAGE */}
                <p className="text-slate-300 text-base leading-relaxed">
                  “{item.message}”
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* ✅ PRIMARY CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="mt-28 text-center"
        >
          <a
            href="/register"
            className="relative inline-flex items-center gap-3 bg-linear-to-r from-indigo-600 to-purple-600 text-white px-20 py-6 rounded-full font-black shadow-[0_25px_90px_rgba(99,102,241,0.7)] hover:scale-110 transition-all"
          >
            Start Your Success Story
          </a>
        </motion.div>
      </div>
    </section>
  );
}
