import { motion } from "framer-motion";

export default function HeroSection() {
  return (
    <div className="w-full bg-gradient-to-b from-blue-100 via-white to-blue-50 pt-40 pb-32 relative overflow-hidden">
      {/* Decorative Blurred Background Circles */}
      <div className="absolute top-10 left-10 w-72 h-72 bg-blue-400 opacity-20 blur-[120px] rounded-full"></div>
      <div className="absolute bottom-0 right-10 w-96 h-96 bg-purple-400 opacity-20 blur-[140px] rounded-full"></div>

      <div className="w-full text-center px-6 relative z-20">
        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-6xl md:text-7xl font-extrabold text-gray-900 mb-6 leading-tight"
        >
          Find Your{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 drop-shadow-sm">
            Dream Job
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="text-gray-600 text-xl md:text-2xl mb-12"
        >
          Discover thousands of opportunities from world-class companies
        </motion.p>

        {/* Search Box (Glass UI) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="max-w-3xl mx-auto backdrop-blur-xl bg-white/40 border border-white/30 shadow-2xl rounded-2xl flex items-center p-4 gap-4 w-full"
        >
          <input
            type="text"
            placeholder="Search job titles, companies, or keywords..."
            className="flex-1 px-5 py-3 bg-white/20 backdrop-blur-md rounded-xl text-gray-700 placeholder-gray-500 outline-none text-lg"
          />

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            className="bg-linear-to-r from-blue-600 to-blue-700 text-white px-8 py-3 rounded-xl font-semibold shadow-lg hover:shadow-blue-300/50 transition-all"
          >
            Search
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
}
