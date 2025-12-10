import { useEffect } from "react";
import { motion } from "framer-motion";
import { FiMail, FiPhone, FiMapPin, FiClock } from "react-icons/fi";
import Footer from "../components/layout/Footer";

export default function Contact() {
  // ✅ SEO safe without helmet
  useEffect(() => {
    document.title = "Contact Us | JobPortal";
    const metaDesc = document.querySelector("meta[name='description']");
    if (metaDesc) {
      metaDesc.setAttribute(
        "content",
        "Contact JobPortal for career support, hiring solutions, partnerships and platform assistance."
      );
    }
  }, []);

  return (
    <div className="w-full overflow-hidden bg-white">
      {/* ================= HERO SECTION ================= */}
      <section className="relative min-h-[70vh] flex items-center justify-center bg-[radial-gradient(circle_at_top,theme(colors.indigo.900),theme(colors.purple.900),black)] text-white overflow-hidden">
        <motion.div
          animate={{ x: [0, 120, 0], y: [0, -80, 0] }}
          transition={{ duration: 18, repeat: Infinity }}
          className="absolute -top-64 -left-64 w-[700px] h-[700px] bg-indigo-500/30 rounded-full blur-[200px]"
        />

        <div className="relative z-10 text-center px-6">
          <h1 className="text-6xl font-black mb-6 bg-gradient-to-r from-indigo-300 to-purple-300 bg-clip-text text-transparent">
            Get In Touch
          </h1>
          <p className="max-w-3xl mx-auto text-white/80 text-xl">
            We’re here to help with your career, hiring needs, partnerships, and
            technical assistance.
          </p>
        </div>
      </section>

      {/* ================= CONTACT INFO ================= */}
      <section className="py-28 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6 grid sm:grid-cols-2 lg:grid-cols-4 gap-10 text-center">
          {[
            {
              icon: <FiMail />,
              title: "Email Us",
              value: "support@jobportal.com",
            },
            {
              icon: <FiPhone />,
              title: "Call Us",
              value: "+91 98765 43210",
            },
            {
              icon: <FiMapPin />,
              title: "Office",
              value: "Bangalore, India",
            },
            {
              icon: <FiClock />,
              title: "Working Hours",
              value: "Mon - Sat (10AM - 7PM)",
            },
          ].map((item, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.05 }}
              className="bg-white rounded-2xl shadow-xl p-8"
            >
              <div className="text-4xl text-indigo-600 mb-4 flex justify-center">
                {item.icon}
              </div>
              <h3 className="font-bold text-lg mb-2 text-slate-900">
                {item.title}
              </h3>
              <p className="text-slate-600">{item.value}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ================= ULTRA PREMIUM CONTACT FORM ================= */}
      <section className="relative py-32 bg-gradient-to-br from-indigo-50 via-white to-purple-50">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-20 items-center">
          {/* ✅ LEFT CONTENT */}
          <div>
            <span className="inline-block mb-5 px-6 py-2 text-sm font-semibold rounded-full bg-indigo-100 text-indigo-700">
              📩 Get In Touch
            </span>

            <h2 className="text-5xl font-black text-gray-900 mb-6 leading-tight">
              Let’s Talk About Your
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
                Career or Business Growth
              </span>
            </h2>

            <p className="text-gray-700 text-lg mb-8 max-w-xl">
              Whether you’re a job seeker, recruiter, or business partner — our
              team is ready with dedicated support.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 text-gray-800 font-medium">
              <div className="p-5 bg-white rounded-xl shadow border">
                ✅ Career Guidance & Resume Help
              </div>
              <div className="p-5 bg-white rounded-xl shadow border">
                ✅ Employer Hiring & Branding
              </div>
              <div className="p-5 bg-white rounded-xl shadow border">
                ✅ Business & Tech Partnerships
              </div>
              <div className="p-5 bg-white rounded-xl shadow border">
                ✅ Platform & Account Support
              </div>
            </div>
          </div>

          {/* ✅ ULTRA PREMIUM FORM CARD */}
          <motion.form
            whileHover={{ scale: 1.01 }}
            className="relative bg-white p-12 rounded-[2.5rem] shadow-2xl border border-slate-200"
          >
            {/* ✅ Glow Border */}
            <div className="absolute inset-0 -z-10 rounded-[2.5rem] bg-gradient-to-r from-indigo-500 to-purple-500 blur-2xl opacity-20" />

            <h3 className="text-3xl font-bold mb-10 text-gray-900 text-center">
              Send Us a Message
            </h3>

            <div className="grid sm:grid-cols-2 gap-6 mb-6">
              <input
                type="text"
                placeholder="Full Name"
                className="w-full border border-slate-300 bg-white rounded-xl px-5 py-3 text-gray-900 focus:ring-2 focus:ring-indigo-500 outline-none"
              />
              <input
                type="email"
                placeholder="Email Address"
                className="w-full border border-slate-300 bg-white rounded-xl px-5 py-3 text-gray-900 focus:ring-2 focus:ring-indigo-500 outline-none"
              />
            </div>

            <input
              type="text"
              placeholder="Subject"
              className="w-full border border-slate-300 bg-white rounded-xl px-5 py-3 mb-6 text-gray-900 focus:ring-2 focus:ring-indigo-500 outline-none"
            />

            <textarea
              rows="5"
              placeholder="Type your message here..."
              className="w-full border border-slate-300 bg-white rounded-xl px-5 py-4 mb-8 text-gray-900 focus:ring-2 focus:ring-indigo-500 outline-none resize-none"
            />

            <button
              type="submit"
              className="group relative overflow-hidden w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-4 rounded-xl font-bold text-lg shadow-[0_20px_50px_rgba(99,102,241,0.5)] hover:scale-[1.02] transition"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                🚀 Send Message
              </span>
              <span className="absolute inset-0 bg-gradient-to-r from-purple-600 to-indigo-600 opacity-0 group-hover:opacity-30 transition" />
            </button>

            <p className="text-center text-gray-600 text-sm mt-6">
              We typically reply within{" "}
              <span className="font-semibold">24 hours</span>.
            </p>
          </motion.form>
        </div>
      </section>

      {/* ================= MAP SECTION ================= */}
      <section className="py-28 bg-white">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-10 text-slate-900">
            Visit Our Office
          </h2>

          <div className="rounded-3xl overflow-hidden shadow-2xl border">
            <iframe
              title="Office Location"
              className="w-full h-[420px]"
              loading="lazy"
              src="https://www.google.com/maps?q=Bangalore,India&output=embed"
            ></iframe>
          </div>
        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <Footer />
    </div>
  );
}
