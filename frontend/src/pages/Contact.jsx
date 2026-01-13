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
  {/* ================= HERO SECTION — ULTRA PREMIUM ================= */}
<section className="relative min-h-[80vh] flex items-center justify-center isolate overflow-hidden bg-[radial-gradient(circle_at_top,#020617,#0b1224,#000)]">

  {/* Aurora Layers */}
  <motion.div
    animate={{ x: [0, 140, 0], y: [0, -100, 0] }}
    transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
    className="absolute -top-80 -left-80 w-[900px] h-[900px] bg-indigo-500/30 blur-[260px] rounded-full"
  />

  <motion.div
    animate={{ x: [0, -160, 0], y: [0, 120, 0] }}
    transition={{ duration: 26, repeat: Infinity, ease: "easeInOut" }}
    className="absolute -bottom-80 -right-80 w-[900px] h-[900px] bg-purple-500/30 blur-[300px] rounded-full"
  />

  {/* Subtle Noise Overlay */}
  <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.04] pointer-events-none" />

  {/* Content */}
  <motion.div
    initial={{ opacity: 0, y: 60 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 1 }}
    className="relative z-10 text-center px-6 max-w-6xl pt-24 md:pt-28"
  >
    {/* Premium Badge */}
    <span className="inline-flex items-center gap-2 mb-8 px-8 py-2 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 text-sm font-semibold text-indigo-200 shadow">
      📞 Contact & Support
    </span>

    {/* Headline */}
    <h1 className="text-6xl md:text-7xl font-black leading-tight mb-8">
      <span className="block bg-gradient-to-r from-indigo-300 via-sky-300 to-purple-300 bg-clip-text text-transparent">
        Get In Touch
      </span>
    </h1>

    {/* Subtitle */}
    <p className="max-w-3xl mx-auto text-lg md:text-xl text-slate-300 leading-relaxed">
      We’re here to help with your <span className="text-indigo-300 font-semibold">career</span>,
      <span className="text-purple-300 font-semibold"> hiring needs</span>,
      strategic partnerships, and enterprise-grade technical assistance.
    </p>

    {/* CTA */}
    <div className="mt-14 flex flex-wrap justify-center gap-6">
      <a
        href="#contact-form"
        className="px-14 py-4 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold shadow-[0_20px_60px_rgba(99,102,241,0.6)] hover:scale-105 transition"
      >
        Contact Us
      </a>

      <a
        href="/careers"
        className="px-14 py-4 rounded-full border border-white/30 text-slate-200 backdrop-blur-xl hover:bg-white/10 transition"
      >
        Explore Careers
      </a>
    </div>

    {/* Divider */}
    <div className="mt-20 flex justify-center">
      <div className="h-[3px] w-32 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full shadow-[0_0_30px_rgba(99,102,241,0.8)]" />
    </div>
  </motion.div>
</section>

{/* ================= CONTACT INFO — ULTRA PREMIUM ================= */}
<section className="relative py-36 bg-gradient-to-b from-slate-50 via-white to-slate-50 overflow-hidden">

  {/* Ambient Background */}
  <div className="absolute inset-0 -z-10">
    <div className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-indigo-300/20 blur-[180px] rounded-full" />
    <div className="absolute -bottom-40 -right-40 w-[500px] h-[500px] bg-purple-300/20 blur-[180px] rounded-full" />
  </div>

  <div className="max-w-7xl mx-auto px-6">

    {/* Section Header */}
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.9 }}
      className="text-center mb-24"
    >
      <span className="inline-flex items-center gap-2 mb-6 px-8 py-2 rounded-full bg-indigo-50 text-indigo-700 text-sm font-bold shadow">
        📍 Contact Information
      </span>

      <h2 className="text-6xl font-black text-slate-900 mb-6">
        We’d Love to <span className="text-indigo-600">Hear From You</span>
      </h2>

      <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
        Reach out to us anytime — for support, partnerships, hiring solutions,
        or enterprise collaboration.
      </p>
    </motion.div>

    {/* Cards */}
    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-12">
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
          value: "Mon – Sat (10AM – 7PM)",
        },
      ].map((item, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: i * 0.1 }}
          whileHover={{ y: -12 }}
          className="relative group"
        >
          {/* Glow */}
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-indigo-400/30 to-purple-400/30 blur-2xl opacity-0 group-hover:opacity-100 transition" />

          {/* Card */}
          <div className="relative bg-white/90 backdrop-blur-2xl rounded-3xl p-10 border shadow-[0_20px_60px_rgba(0,0,0,0.12)] text-center">

            {/* Icon */}
            <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-indigo-600 to-purple-600 text-white flex items-center justify-center text-3xl shadow-lg">
              {item.icon}
            </div>

            <h3 className="font-extrabold text-xl mb-3 text-slate-900">
              {item.title}
            </h3>

            <p className="text-slate-600 text-base font-medium">
              {item.value}
            </p>
          </div>
        </motion.div>
      ))}
    </div>

    {/* Divider */}
    <div className="mt-32 flex justify-center">
      <div className="h-[3px] w-32 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full shadow-[0_0_30px_rgba(99,102,241,0.6)]" />
    </div>
  </div>
</section>


      {/* ================= ULTRA PREMIUM CONTACT FORM ================= */}
      <section className="relative py-32 bg-linear-to-br from-indigo-50 via-white to-purple-50">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-20 items-center">
          {/* ✅ LEFT CONTENT */}
          <div>
            <span className="inline-block mb-5 px-6 py-2 text-sm font-semibold rounded-full bg-indigo-100 text-indigo-700">
              📩 Get In Touch
            </span>

            <h2 className="text-5xl font-black text-gray-900 mb-6 leading-tight">
              Let’s Talk About Your
              <span className="block text-transparent bg-clip-text bg-linear-to-r from-indigo-600 to-purple-600">
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
            <div className="absolute inset-0 -z-10 rounded-[2.5rem] bg-linear-to-r from-indigo-500 to-purple-500 blur-2xl opacity-20" />

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
              className="group relative overflow-hidden w-full bg-linear-to-r from-indigo-600 to-purple-600 text-white py-4 rounded-xl font-bold text-lg shadow-[0_20px_50px_rgba(99,102,241,0.5)] hover:scale-[1.02] transition"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                🚀 Send Message
              </span>
              <span className="absolute inset-0 bg-linear-to-r from-purple-600 to-indigo-600 opacity-0 group-hover:opacity-30 transition" />
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
