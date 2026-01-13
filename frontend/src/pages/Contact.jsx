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
 {/* ================= HERO SECTION — ENTERPRISE ULTRA PREMIUM ================= */}
<section className="relative min-h-[90vh] flex items-center justify-center isolate overflow-hidden bg-[radial-gradient(circle_at_top,#020617,#0b1224,#000)]">

  {/* ================= AURORA MOTION ================= */}
  <motion.div
    animate={{ x: [0, 160, 0], y: [0, -120, 0] }}
    transition={{ duration: 24, repeat: Infinity, ease: "easeInOut" }}
    className="absolute -top-96 -left-96 w-[1000px] h-[1000px] bg-indigo-500/35 blur-[280px] rounded-full"
  />

  <motion.div
    animate={{ x: [0, -180, 0], y: [0, 140, 0] }}
    transition={{ duration: 28, repeat: Infinity, ease: "easeInOut" }}
    className="absolute -bottom-96 -right-96 w-[1000px] h-[1000px] bg-purple-500/35 blur-[320px] rounded-full"
  />

  {/* Noise overlay */}
  <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.035] pointer-events-none" />

  {/* ================= CONTENT ================= */}
  <motion.div
    initial={{ opacity: 0, y: 70 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 1.1, ease: "easeOut" }}
    className="relative z-10 text-center px-6 max-w-6xl pt-28"
  >
    {/* Badge */}
    <span className="inline-flex items-center gap-2 mb-10 px-9 py-2.5
      rounded-full bg-white/10 backdrop-blur-xl
      border border-white/20 text-sm font-semibold
      tracking-wide text-indigo-200 shadow">
      📞 Contact & Support
    </span>

    {/* Headline */}
    <h1 className="text-[3.5rem] md:text-[4.5rem] lg:text-[5.2rem]
      font-black leading-[1.05] mb-10">
      <span className="block bg-gradient-to-r from-indigo-300 via-sky-300 to-purple-300 bg-clip-text text-transparent">
        Let’s Talk About What’s Next
      </span>
    </h1>

    {/* Explanation */}
    <p className="max-w-4xl mx-auto text-lg md:text-xl text-slate-300 leading-relaxed">
      Whether you’re navigating your
      <span className="text-indigo-300 font-semibold"> career journey</span>,
      scaling
      <span className="text-purple-300 font-semibold"> hiring operations</span>,
      exploring
      <span className="text-sky-300 font-semibold"> partnerships</span>,
      or need
      <span className="text-indigo-300 font-semibold"> enterprise-grade support</span>,
      our team is ready to help — quickly, clearly, and professionally.
    </p>

    {/* Trust Signals */}
    <div className="mt-14 flex flex-wrap justify-center gap-x-10 gap-y-4 text-sm text-slate-300">
      <span className="flex items-center gap-2">
        <span className="text-indigo-400">✔</span> 24-Hour Response SLA
      </span>
      <span className="flex items-center gap-2">
        <span className="text-purple-400">✔</span> Dedicated Human Support
      </span>
      <span className="flex items-center gap-2">
        <span className="text-sky-400">✔</span> Trusted by Job Seekers & Employers
      </span>
    </div>

    {/* CTA */}
    <div className="mt-16 flex flex-wrap justify-center gap-8">
      <a
        href="#contact-form"
        className="px-16 py-4 rounded-full
        bg-gradient-to-r from-indigo-600 to-purple-600
        text-white font-semibold text-lg
        shadow-[0_25px_70px_rgba(99,102,241,0.65)]
        hover:scale-105 active:scale-95 transition"
      >
        🚀 Contact Our Team
      </a>
    </div>

    {/* Divider */}
    <div className="mt-24 flex justify-center">
      <div className="h-[3px] w-36 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full shadow-[0_0_40px_rgba(99,102,241,0.9)]" />
    </div>
  </motion.div>
</section>


{/* ================= CONTACT INFO — ENTERPRISE ULTRA PREMIUM ================= */}
<section className="relative py-40 bg-gradient-to-b from-slate-50 via-white to-slate-50 overflow-hidden">

  {/* ================= AMBIENT BACKGROUND ================= */}
  <div className="absolute inset-0 -z-10">
    <div className="absolute -top-52 -left-52 w-[560px] h-[560px] bg-indigo-300/25 blur-[200px] rounded-full" />
    <div className="absolute -bottom-52 -right-52 w-[560px] h-[560px] bg-purple-300/25 blur-[200px] rounded-full" />
  </div>

  <div className="max-w-7xl mx-auto px-6">

    {/* ================= SECTION HEADER ================= */}
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 1 }}
      className="text-center mb-28"
    >
      <span className="inline-flex items-center gap-2 mb-8 px-9 py-2.5
        rounded-full bg-indigo-50 text-indigo-700 text-sm font-bold shadow">
        📍 Contact Information
      </span>

      <h2 className="text-[3.6rem] font-black text-slate-900 mb-6 leading-tight">
        Real People.{" "}
        <span className="text-indigo-600">Real Support.</span>
      </h2>

      <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
        Whether you’re seeking career guidance, employer solutions,
        strategic partnerships, or enterprise assistance —
        our team is available with fast, professional support.
      </p>

      {/* Trust Signals */}
      <div className="mt-10 flex flex-wrap justify-center gap-x-10 gap-y-3 text-sm text-slate-600">
        <span className="flex items-center gap-2">
          <span className="text-indigo-600">✔</span> 24-Hour Response Time
        </span>
        <span className="flex items-center gap-2">
          <span className="text-purple-600">✔</span> Dedicated Human Support
        </span>
        <span className="flex items-center gap-2">
          <span className="text-emerald-600">✔</span> Secure & Confidential
        </span>
      </div>
    </motion.div>

    {/* ================= CONTACT CARDS ================= */}
    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-14">
      {[
        {
          icon: <FiMail />,
          title: "Email Support",
          value: "support@jobportal.com",
          hint: "General queries, platform help, guidance",
        },
        {
          icon: <FiPhone />,
          title: "Phone Assistance",
          value: "+91 98765 43210",
          hint: "Urgent support & enterprise discussions",
        },
        {
          icon: <FiMapPin />,
          title: "Head Office",
          value: "Bangalore, India",
          hint: "Primary operations & leadership team",
        },
        {
          icon: <FiClock />,
          title: "Availability",
          value: "Mon – Sat · 10AM – 7PM",
          hint: "IST business hours",
        },
      ].map((item, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: i * 0.12 }}
          whileHover={{ y: -14 }}
          className="relative group"
        >
          {/* Glow */}
          <div className="absolute inset-0 rounded-3xl
            bg-gradient-to-br from-indigo-400/35 to-purple-400/35
            blur-2xl opacity-0 group-hover:opacity-100 transition" />

          {/* Card */}
          <div className="relative bg-white/90 backdrop-blur-2xl
            rounded-3xl p-12 border
            shadow-[0_25px_70px_rgba(0,0,0,0.15)]
            text-center">

            {/* Icon */}
            <div className="w-18 h-18 mx-auto mb-7 rounded-2xl
              bg-gradient-to-br from-indigo-600 to-purple-600
              text-white flex items-center justify-center text-3xl
              shadow-lg">
              {item.icon}
            </div>

            <h3 className="font-extrabold text-xl mb-2 text-slate-900">
              {item.title}
            </h3>

            <p className="text-slate-800 text-base font-semibold mb-2">
              {item.value}
            </p>

            <p className="text-xs text-slate-500 leading-relaxed">
              {item.hint}
            </p>
          </div>
        </motion.div>
      ))}
    </div>

    {/* ================= DIVIDER ================= */}
    <div className="mt-36 flex justify-center">
      <div className="h-[3px] w-36 bg-gradient-to-r from-indigo-500 to-purple-500
        rounded-full shadow-[0_0_40px_rgba(99,102,241,0.7)]" />
    </div>
  </div>
</section>

{/* ================= WHY PEOPLE CONTACT US — ENTERPRISE ================= */}
<section className="relative py-36 px-6 bg-white/80 overflow-hidden">
  <div className="max-w-6xl mx-auto">

    {/* ================= HEADER ================= */}
    <div className="text-center mb-24">
      <span className="inline-flex items-center gap-2 mb-8 px-8 py-2.5
        bg-indigo-50 border border-indigo-200/60
        rounded-full text-indigo-700 text-sm font-semibold shadow">
        🤝 How We Help
      </span>

      <h2 className="text-[3.4rem] font-black mb-6
        bg-gradient-to-br from-slate-900 via-indigo-700 to-purple-700
        bg-clip-text text-transparent">
        Why People Trust Us
      </h2>

      <p className="text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed">
        We work closely with individuals and organizations at every stage of the
        hiring lifecycle — delivering clarity, speed, and measurable outcomes
        across career growth, talent acquisition, and platform partnerships.
      </p>

      {/* Trust Signals */}
      <div className="mt-10 flex flex-wrap justify-center gap-x-10 gap-y-3 text-sm text-slate-600">
        <span className="flex items-center gap-2">
          <span className="text-indigo-600">✔</span> Dedicated Human Support
        </span>
        <span className="flex items-center gap-2">
          <span className="text-purple-600">✔</span> Enterprise-Ready Solutions
        </span>
        <span className="flex items-center gap-2">
          <span className="text-emerald-600">✔</span> Secure & Confidential
        </span>
      </div>
    </div>

    {/* ================= AUDIENCE CARDS ================= */}
    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-12">
      {[
        {
          title: "Job Seekers",
          desc:
            "Personalized career guidance, resume optimization, application support, and platform assistance — designed to improve shortlisting and interview outcomes.",
        },
        {
          title: "Recruiters & HR Teams",
          desc:
            "End-to-end hiring solutions including employer branding, candidate sourcing, screening workflows, and ATS-aligned hiring processes.",
        },
        {
          title: "Business & Platform Partners",
          desc:
            "Strategic partnerships, API integrations, data collaboration, and co-branded initiatives to expand reach and capability.",
        },
        {
          title: "Enterprise Clients",
          desc:
            "Custom talent solutions, large-scale hiring support, internal tools, and enterprise-grade integrations built for volume and compliance.",
        },
      ].map((item) => (
        <div
          key={item.title}
          className="group relative rounded-3xl p-[1px]
            bg-gradient-to-br from-indigo-400/40 via-purple-400/30 to-pink-400/40"
        >
          <div
            className="h-full rounded-3xl p-8
            bg-white/90 backdrop-blur-xl
            border border-slate-200/60
            shadow-[0_20px_60px_rgba(0,0,0,0.12)]
            transition group-hover:-translate-y-2"
          >
            <h4 className="font-extrabold text-lg text-slate-900 mb-4">
              {item.title}
            </h4>

            <p className="text-sm text-slate-600 leading-relaxed">
              {item.desc}
            </p>
          </div>
        </div>
      ))}
    </div>

  </div>
</section>

{/* ================= SUPPORT COMMITMENT ================= */}
{/* ================= SUPPORT PROMISE — ENTERPRISE GRADE ================= */}
<section className="relative py-36 px-6 bg-gradient-to-br from-indigo-50 to-purple-50 overflow-hidden">
  <div className="max-w-5xl mx-auto text-center">

    {/* Badge */}
    <span className="inline-flex items-center gap-2 mb-8 px-8 py-2.5
      bg-white/80 border border-indigo-200/60
      rounded-full text-indigo-700 text-sm font-semibold shadow">
      🛡️ Our Commitment to You
    </span>

    {/* Heading */}
    <h2 className="text-[3.2rem] font-black mb-6
      bg-gradient-to-br from-slate-900 via-indigo-700 to-purple-700
      bg-clip-text text-transparent">
      Our Support Promise
    </h2>

    {/* Description */}
    <p className="text-lg text-slate-600 mb-14 max-w-3xl mx-auto leading-relaxed">
      We believe great platforms are built on <span className="font-semibold text-slate-800">trust, accountability,</span>
      and <span className="font-semibold text-slate-800">real human support</span>.
      Every message you send is reviewed by an experienced team member — never automated,
      never ignored, and always handled with care.
    </p>

    {/* Promise Cards */}
    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
      {[
        {
          title: "24-Hour Response SLA",
          desc: "Guaranteed replies within one business day — often much faster.",
        },
        {
          title: "Dedicated Support Team",
          desc: "Your queries are handled by trained specialists, not bots.",
        },
        {
          title: "Enterprise-Grade Assistance",
          desc: "Scalable support for individuals, recruiters, and organizations.",
        },
        {
          title: "Radical Transparency",
          desc: "Clear answers, honest timelines, and zero vague responses.",
        },
      ].map((item) => (
        <div
          key={item.title}
          className="group relative rounded-3xl p-[1px]
            bg-gradient-to-br from-indigo-400/40 via-purple-400/30 to-pink-400/40"
        >
          <div
            className="h-full rounded-3xl bg-white/90 backdrop-blur-xl
            border border-slate-200/60 p-8
            shadow-[0_18px_50px_rgba(0,0,0,0.12)]
            transition group-hover:-translate-y-1"
          >
            <h4 className="font-extrabold text-slate-900 mb-3">
              {item.title}
            </h4>
            <p className="text-sm text-slate-600 leading-relaxed">
              {item.desc}
            </p>
          </div>
        </div>
      ))}
    </div>

    {/* Footer Note */}
    <p className="mt-14 text-sm text-slate-500">
      Trusted by job seekers, recruiters, and enterprise partners across hiring ecosystems.
    </p>

  </div>
</section>

      {/* ================= ULTRA PREMIUM CONTACT FORM ================= */}
     {/* ================= CONTACT & FORM — ENTERPRISE ULTRA PREMIUM ================= */}
<section id="contact-form" className="relative py-36 bg-linear-to-br from-indigo-50 via-white to-purple-50 overflow-hidden">

  {/* Ambient glow */}
  <div className="absolute inset-0 -z-10">
    <div className="absolute -top-48 -left-48 w-[520px] h-[520px] bg-indigo-300/25 blur-[200px] rounded-full" />
    <div className="absolute -bottom-48 -right-48 w-[520px] h-[520px] bg-purple-300/25 blur-[200px] rounded-full" />
  </div>

  <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-24 items-center">

    {/* ================= LEFT CONTENT ================= */}
    <div>
      {/* Badge */}
      <span className="inline-flex items-center gap-2 mb-6 px-8 py-2.5
        bg-indigo-100 text-indigo-700 text-sm font-semibold
        rounded-full shadow-sm">
        📩 Get In Touch
      </span>

      {/* Heading */}
      <h2 className="text-[3.4rem] font-black text-slate-900 mb-6 leading-tight">
        Let’s Talk About Your
        <span className="block bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
          Career or Business Growth
        </span>
      </h2>

      {/* Description */}
      <p className="text-slate-700 text-lg mb-10 max-w-xl leading-relaxed">
        Whether you’re advancing your career, hiring top talent,
        exploring partnerships, or need platform support —
        our team provides clear, timely, and human-driven assistance.
      </p>

      {/* Value Grid */}
      <div className="grid sm:grid-cols-2 gap-6 text-slate-800 font-medium">
        {[
          "Career Guidance & Resume Optimization",
          "Employer Hiring & Talent Branding",
          "Business & Technology Partnerships",
          "Platform, Account & Enterprise Support",
        ].map((item) => (
          <div
            key={item}
            className="group rounded-2xl p-5 bg-white/90
              border border-slate-200
              shadow-sm hover:shadow-md transition"
          >
            <span className="text-indigo-600 mr-2">✔</span>
            {item}
          </div>
        ))}
      </div>

      {/* Trust Note */}
      <p className="mt-8 text-sm text-slate-500 max-w-lg">
        Every inquiry is reviewed by a real team member —
        no automated replies, no ignored messages.
      </p>
    </div>

    {/* ================= FORM CARD ================= */}
    <motion.form
      whileHover={{ scale: 1.01 }}
      className="relative bg-white p-14 rounded-[2.75rem]
        shadow-[0_30px_80px_rgba(0,0,0,0.18)]
        border border-slate-200"
    >
      {/* Glow Border */}
      <div className="absolute inset-0 -z-10 rounded-[2.75rem]
        bg-linear-to-r from-indigo-500 to-purple-500
        blur-2xl opacity-20" />

      {/* Form Header */}
      <h3 className="text-3xl font-extrabold mb-4 text-slate-900 text-center">
        Send Us a Message
      </h3>

      <p className="text-center text-slate-600 text-sm mb-10">
        Tell us what you need — we’ll take it from there.
      </p>

      {/* Inputs */}
      <div className="grid sm:grid-cols-2 gap-6 mb-6">
        <input
          type="text"
          placeholder="Full Name"
          className="w-full border border-slate-300 bg-white
            rounded-xl px-5 py-3.5 text-slate-900
            focus:ring-2 focus:ring-indigo-500 outline-none"
        />
        <input
          type="email"
          placeholder="Email Address"
          className="w-full border border-slate-300 bg-white
            rounded-xl px-5 py-3.5 text-slate-900
            focus:ring-2 focus:ring-indigo-500 outline-none"
        />
      </div>

      <input
        type="text"
        placeholder="Subject"
        className="w-full border border-slate-300 bg-white
          rounded-xl px-5 py-3.5 mb-6 text-slate-900
          focus:ring-2 focus:ring-indigo-500 outline-none"
      />

      <textarea
        rows="5"
        placeholder="Describe your request or question..."
        className="w-full border border-slate-300 bg-white
          rounded-xl px-5 py-4 mb-10 text-slate-900
          focus:ring-2 focus:ring-indigo-500 outline-none resize-none"
      />

      {/* Submit */}
      <button
        type="submit"
        className="group relative overflow-hidden w-full
          bg-linear-to-r from-indigo-600 to-purple-600
          text-white py-4 rounded-xl
          font-bold text-lg
          shadow-[0_25px_60px_rgba(99,102,241,0.55)]
          hover:scale-[1.03] transition"
      >
        <span className="relative z-10 flex items-center justify-center gap-2">
          🚀 Send Message
        </span>
        <span className="absolute inset-0 bg-linear-to-r
          from-purple-600 to-indigo-600
          opacity-0 group-hover:opacity-30 transition" />
      </button>

      {/* SLA */}
      <p className="text-center text-slate-600 text-sm mt-8">
        Average response time:
        <span className="font-semibold text-slate-800"> within 24 hours</span>
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

      {/* ================= FINAL CONTACT CTA ================= */}
{/* ================= FINAL CTA — ENTERPRISE ULTRA PREMIUM ================= */}
<section className="relative py-40 px-6 overflow-hidden
  bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 text-white">

  {/* Ambient Glow */}
  <div className="absolute inset-0 -z-10">
    <div className="absolute -top-40 -left-40 w-[520px] h-[520px]
      bg-white/20 blur-[180px] rounded-full" />
    <div className="absolute -bottom-40 -right-40 w-[520px] h-[520px]
      bg-white/20 blur-[180px] rounded-full" />
  </div>

  <div className="max-w-4xl mx-auto text-center relative z-10">

    {/* Badge */}
    <span className="inline-flex items-center gap-2 mb-8 px-8 py-2.5
      rounded-full bg-white/15 backdrop-blur-xl
      border border-white/25 text-sm font-semibold shadow">
      🚀 Let’s Get Started
    </span>

    {/* Headline */}
    <h2 className="text-[3.6rem] md:text-[4.2rem] font-black mb-6 leading-tight">
      Let’s Build Something
      <span className="block bg-gradient-to-r from-white via-indigo-100 to-purple-100 bg-clip-text text-transparent">
        Meaningful Together
      </span>
    </h2>

    {/* Description */}
    <p className="text-lg md:text-xl text-indigo-100 mb-14 leading-relaxed max-w-3xl mx-auto">
      Whether you’re advancing your career, hiring high-impact talent,
      or exploring strategic partnerships — our team is ready to collaborate
      with clarity, speed, and purpose.
    </p>

    {/* CTA Buttons */}
    <div className="flex flex-wrap justify-center gap-8">
      <a
        href="#contact-form"
        className="inline-flex items-center gap-3
          bg-white text-indigo-700 px-16 py-4 rounded-full
          font-bold text-lg
          shadow-[0_25px_70px_rgba(255,255,255,0.45)]
          hover:scale-105 active:scale-95 transition"
      >
        🚀 Contact Our Team
      </a>

      <a
        href="/careers"
        className="inline-flex items-center gap-3
          border border-white/40 px-16 py-4 rounded-full
          font-semibold text-lg
          backdrop-blur-xl hover:bg-white/10 transition"
      >
        Explore Careers
      </a>
    </div>

    {/* Trust Footer */}
    <p className="mt-12 text-sm text-indigo-100">
      ✔ Human-led support &nbsp;•&nbsp; ✔ Enterprise-ready &nbsp;•&nbsp; ✔ Response within 24 hours
    </p>

  </div>
</section>


      {/* ================= FOOTER ================= */}
      <Footer />
    </div>
  );
}
