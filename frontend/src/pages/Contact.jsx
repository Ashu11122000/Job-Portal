import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { submitContactForm } from "../api/contactApi";
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

  /* ================= CONTACT FORM STATE ================= */
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  /* ================= API INTEGRATION (UPDATED) ================= */
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;

    setLoading(true);
    setSuccess("");
    setError("");

    try {
      const response = await submitContactForm({
        name: formData.name.trim(),
        email: formData.email.trim(),
        subject: formData.subject.trim(),
        message: formData.message.trim(),
      });

      setSuccess(
        response?.message ||
          "Your message has been successfully sent. Our team will reach out within 24 business hours."
      );

      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
    } catch (err) {
      setError(
        err.message ||
          "Something went wrong while sending your message. Please try again later."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full overflow-hidden bg-white">
      {/* ================= HERO — ULTRA PREMIUM ================= */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-[radial-gradient(circle_at_top,#020617,#020617,#000)]">
        <motion.div
          animate={{ x: [0, 160, 0], y: [0, -120, 0] }}
          transition={{ duration: 26, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-96 -left-96 w-[900px] h-[900px] bg-indigo-500/30 blur-[260px] rounded-full"
        />
        <motion.div
          animate={{ x: [0, -180, 0], y: [0, 140, 0] }}
          transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -bottom-96 -right-96 w-[900px] h-[900px] bg-purple-500/30 blur-[300px] rounded-full"
        />

        <div className="relative z-10 max-w-6xl text-center px-6 pt-28">
          <span className="inline-flex items-center gap-2 mb-8 px-8 py-2.5 rounded-full bg-indigo-500/10 border border-indigo-400/30 text-indigo-300 text-sm font-semibold tracking-wide">
            📞 Contact & Support
          </span>

          <h1 className="text-[3.2rem] md:text-[4.4rem] lg:text-[5rem] font-black leading-[1.05] mb-8">
            <span className="bg-gradient-to-r from-indigo-300 via-sky-300 to-purple-300 bg-clip-text text-transparent">
              Let’s Start a Meaningful Conversation
            </span>
          </h1>

          <p className="max-w-4xl mx-auto text-lg md:text-xl text-slate-300 leading-relaxed">
            Whether you’re planning your next
            <span className="text-indigo-300 font-semibold"> career move</span>,
            building a
            <span className="text-sky-300 font-semibold"> hiring strategy</span>,
            or exploring
            <span className="text-purple-300 font-semibold"> long-term partnerships</span>,
            our team provides thoughtful, human-led support — not automated replies.
          </p>

          <div className="mt-10 flex flex-wrap justify-center gap-8 text-sm text-slate-400">
            <span>✔ Response within 24 hours</span>
            <span>✔ Dedicated human support</span>
            <span>✔ Secure & confidential</span>
          </div>

          <div className="mt-14">
            <a
              href="#contact-form"
              className="inline-flex items-center gap-3 px-16 py-4 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 text-slate-100 font-semibold text-lg shadow-[0_25px_70px_rgba(99,102,241,0.55)] hover:scale-105 transition"
            >
              🚀 Contact Our Team
            </a>
          </div>
        </div>
      </section>

      {/* ================= WHO CONTACTS US ================= */}
<section className="relative py-40 bg-white overflow-hidden">
  {/* Ambient background */}
  <div className="absolute -top-48 -left-48 w-[520px] h-[520px]
    bg-indigo-200/30 blur-[200px] rounded-full" />
  <div className="absolute -bottom-48 -right-48 w-[520px] h-[520px]
    bg-purple-200/30 blur-[200px] rounded-full" />

  <div className="relative max-w-7xl mx-auto px-6">

    {/* ================= HEADER ================= */}
    <div className="text-center mb-24">
      <span className="inline-flex items-center gap-2 px-9 py-2.5 rounded-full
        bg-indigo-100/80 text-indigo-700
        text-sm font-semibold tracking-wide shadow-sm mb-8">
        👥 Our Community
      </span>

      <h2 className="text-[3.4rem] font-black text-slate-900 mb-6 leading-tight">
        Who Typically Reaches Out to Us
      </h2>

      <p className="text-slate-600 text-lg max-w-3xl mx-auto leading-relaxed">
        We support professionals and organizations across every stage of the
        hiring ecosystem — from early-career exploration to enterprise-scale
        talent strategy and long-term partnerships.
      </p>
    </div>

    {/* ================= CARDS ================= */}
    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-12">
      {[
        {
          title: "Job Seekers",
          desc:
            "Individuals at any career stage seeking clarity, stronger resumes, better shortlisting outcomes, interview preparation, and platform support to navigate opportunities with confidence.",
          highlight: "Career growth & clarity",
        },
        {
          title: "Recruiters & HR Teams",
          desc:
            "Talent acquisition teams looking to streamline hiring workflows, strengthen employer branding, access quality candidates, and optimize recruitment processes.",
          highlight: "Hiring efficiency",
        },
        {
          title: "Business & Platform Partners",
          desc:
            "Organizations exploring strategic collaborations, API integrations, data partnerships, or co-branded initiatives to expand reach and capabilities.",
          highlight: "Strategic partnerships",
        },
        {
          title: "Enterprise Clients",
          desc:
            "Large organizations requiring scalable hiring support, custom solutions, compliance-ready processes, and dedicated enterprise-grade assistance.",
          highlight: "Enterprise solutions",
        },
      ].map((item) => (
        <div
          key={item.title}
          className="group relative rounded-3xl p-[1px]
            bg-gradient-to-br from-indigo-400/30 via-purple-400/25 to-pink-400/30"
        >
          <div
            className="h-full rounded-3xl p-8
              bg-white/90 backdrop-blur-xl
              border border-slate-200
              shadow-[0_18px_50px_rgba(0,0,0,0.12)]
              transition group-hover:-translate-y-2"
          >
            <h4 className="font-extrabold text-xl text-slate-900 mb-3">
              {item.title}
            </h4>

            <p className="text-slate-600 text-sm leading-relaxed mb-5">
              {item.desc}
            </p>

            <span className="inline-block text-xs font-semibold
              text-indigo-700 bg-indigo-100
              px-4 py-1.5 rounded-full">
              {item.highlight}
            </span>
          </div>
        </div>
      ))}
    </div>

    {/* ================= FOOT NOTE ================= */}
    <p className="mt-20 text-center text-sm text-slate-500 max-w-3xl mx-auto">
      No matter who you are or where you are in your journey, every inquiry is
      reviewed by a real team member and handled with clarity, care, and
      accountability.
    </p>

  </div>
</section>


{/* ================= WHAT HAPPENS NEXT ================= */}
<section className="relative py-40 bg-gradient-to-br from-slate-50 via-indigo-50/60 to-slate-50 overflow-hidden">
  {/* Ambient background */}
  <div className="absolute -top-48 -left-48 w-[520px] h-[520px]
    bg-indigo-200/30 blur-[220px] rounded-full" />
  <div className="absolute -bottom-48 -right-48 w-[520px] h-[520px]
    bg-purple-200/30 blur-[220px] rounded-full" />

  <div className="relative max-w-6xl mx-auto px-6">

    {/* ================= HEADER ================= */}
    <div className="text-center mb-24">
      <span className="inline-flex items-center gap-2 px-9 py-2.5 rounded-full
        bg-indigo-100/80 text-indigo-700
        text-sm font-semibold tracking-wide shadow-sm mb-8">
        🔍 Our Process
      </span>

      <h2 className="text-[3.2rem] font-black text-slate-900 mb-6 leading-tight">
        What Happens After You Submit
      </h2>

      <p className="text-slate-600 text-lg max-w-3xl mx-auto leading-relaxed">
        Every message follows a transparent, human-reviewed process designed to
        deliver clarity, speed, and the right response — without automated replies
        or unnecessary delays.
      </p>
    </div>

    {/* ================= STEPS ================= */}
    <div className="grid md:grid-cols-4 gap-12">
      {[
        {
          title: "Initial Review",
          desc:
            "Your message is carefully reviewed by a real team member to understand context, urgency, and intent — never by automated systems.",
        },
        {
          title: "Smart Routing",
          desc:
            "We route your inquiry to the most relevant specialist or team, ensuring accurate and meaningful responses.",
        },
        {
          title: "Internal Assessment",
          desc:
            "Requirements are evaluated internally to determine next steps, timelines, and the best possible solution.",
        },
        {
          title: "Clear Response",
          desc:
            "You receive a clear, actionable reply — typically within 24 business hours — outlining next steps or answers.",
        },
      ].map((step, i) => (
        <div
          key={i}
          className="group relative rounded-3xl p-[1px]
            bg-gradient-to-br from-indigo-400/30 via-purple-400/25 to-pink-400/30"
        >
          <div
            className="h-full rounded-3xl p-8
              bg-white/90 backdrop-blur-xl
              border border-slate-200
              shadow-[0_18px_50px_rgba(0,0,0,0.12)]
              transition group-hover:-translate-y-2"
          >
            {/* Step number */}
            <div className="text-indigo-600 text-4xl font-black mb-4">
              {i + 1}
            </div>

            <h4 className="font-extrabold text-lg text-slate-900 mb-3">
              {step.title}
            </h4>

            <p className="text-slate-600 text-sm leading-relaxed">
              {step.desc}
            </p>
          </div>
        </div>
      ))}
    </div>

    {/* ================= FOOT NOTE ================= */}
    <p className="mt-20 text-center text-sm text-slate-500 max-w-3xl mx-auto">
      Our process is built for reliability and trust — every inquiry is handled
      with accountability, confidentiality, and respect for your time.
    </p>

  </div>
</section>

      {/* ================= CONTACT FORM ================= */}
<section
  id="contact-form"
  className="relative py-40 bg-gradient-to-br from-slate-50 via-indigo-50/40 to-purple-50 overflow-hidden"
>
  {/* Ambient accents */}
  <div className="absolute -top-48 -left-48 w-[520px] h-[520px] bg-indigo-300/25 blur-[200px] rounded-full" />
  <div className="absolute -bottom-48 -right-48 w-[520px] h-[520px] bg-purple-300/25 blur-[200px] rounded-full" />

  <div className="relative max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-28 items-start">

    {/* ================= LEFT CONTENT ================= */}
    <div>
      {/* Badge */}
      <span className="inline-flex items-center gap-2 mb-6 px-8 py-2.5
        rounded-full bg-indigo-100/80 text-indigo-700
        text-sm font-semibold tracking-wide shadow-sm">
        📩 Get in Touch
      </span>

      {/* Heading */}
      <h2 className="text-[3.2rem] font-black text-slate-900 leading-tight mb-6">
        Tell Us What You’re
        <span className="block bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
          Looking to Achieve
        </span>
      </h2>

      {/* Description */}
      <p className="text-slate-700 text-lg leading-relaxed max-w-xl mb-10">
        Whether you’re planning your next career move, scaling a hiring initiative,
        exploring long-term partnerships, or need platform assistance — our team
        listens first and responds with clarity.
      </p>

      {/* Value points */}
      <div className="grid sm:grid-cols-2 gap-6 text-slate-800 font-medium mb-10">
        {[
          "Career guidance & resume optimization",
          "Recruitment & employer solutions",
          "Business, API & platform partnerships",
          "Account, billing & enterprise support",
        ].map((item) => (
          <div
            key={item}
            className="rounded-2xl p-5 bg-white/80 backdrop-blur
              border border-slate-200 shadow-sm"
          >
            <span className="text-indigo-600 mr-2">✔</span>
            {item}
          </div>
        ))}
      </div>

      {/* Process clarity */}
      <div className="mt-6 space-y-3 text-sm text-slate-600">
        <p>
          <span className="font-semibold text-slate-800">What happens next?</span>
        </p>
        <p>• Your message is reviewed by a real team member</p>
        <p>• We route it to the right specialist internally</p>
        <p>• You receive a clear response within 24 business hours</p>
      </div>
    </div>

    {/* ================= FORM CARD ================= */}
    <motion.form
      onSubmit={handleSubmit}
      whileHover={{ scale: 1.01 }}
      className="relative bg-white/90 backdrop-blur-xl
        p-14 rounded-[2.75rem]
        shadow-[0_30px_80px_rgba(0,0,0,0.18)]
        border border-slate-200"
    >
      {/* Success / Error */}
      {success && (
        <p className="mb-6 text-emerald-700 bg-emerald-50 border border-emerald-200
          rounded-xl py-3 px-4 font-semibold text-center">
          {success}
        </p>
      )}
      {error && (
        <p className="mb-6 text-rose-700 bg-rose-50 border border-rose-200
          rounded-xl py-3 px-4 font-semibold text-center">
          {error}
        </p>
      )}

      {/* Inputs */}
      <div className="grid sm:grid-cols-2 gap-6 mb-6">
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Full Name"
          required
          className="w-full border border-slate-300 rounded-xl
            px-5 py-3.5 text-slate-900
            focus:ring-2 focus:ring-indigo-500 outline-none"
        />
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email Address"
          required
          className="w-full border border-slate-300 rounded-xl
            px-5 py-3.5 text-slate-900
            focus:ring-2 focus:ring-indigo-500 outline-none"
        />
      </div>

      <input
        type="text"
        name="subject"
        value={formData.subject}
        onChange={handleChange}
        placeholder="Subject (optional)"
        className="w-full border border-slate-300 rounded-xl
          px-5 py-3.5 mb-6 text-slate-900
          focus:ring-2 focus:ring-indigo-500 outline-none"
      />

      <textarea
        rows="5"
        name="message"
        value={formData.message}
        onChange={handleChange}
        required
        placeholder="Describe your requirement, goal, or question..."
        className="w-full border border-slate-300 rounded-xl
          px-5 py-4 mb-10 text-slate-900
          focus:ring-2 focus:ring-indigo-500 outline-none resize-none"
      />

      {/* Submit */}
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-gradient-to-r from-indigo-600 to-purple-600
          text-slate-100 py-4 rounded-xl font-bold text-lg
          shadow-[0_20px_50px_rgba(99,102,241,0.45)]
          hover:scale-[1.02] transition
          disabled:opacity-60"
      >
        {loading ? "Sending…" : "🚀 Send Message"}
      </button>

      {/* SLA */}
      <p className="text-center text-slate-600 text-sm mt-8">
        Average response time:
        <span className="font-semibold text-slate-800"> within 24 business hours</span>
      </p>
    </motion.form>
  </div>
</section>

{/* ================= WHY TRUST US ================= */}
<section className="relative py-40 bg-white overflow-hidden">
  {/* Ambient background */}
  <div className="absolute -top-48 -left-48 w-[520px] h-[520px]
    bg-emerald-200/25 blur-[220px] rounded-full" />
  <div className="absolute -bottom-48 -right-48 w-[520px] h-[520px]
    bg-indigo-200/25 blur-[220px] rounded-full" />

  <div className="relative max-w-6xl mx-auto px-6 text-center">

    {/* ================= HEADER ================= */}
    <span className="inline-flex items-center gap-2 px-9 py-2.5 rounded-full
      bg-emerald-100/80 text-emerald-700
      text-sm font-semibold tracking-wide shadow-sm mb-8">
      🛡️ Trust & Reliability
    </span>

    <h2 className="text-[3.2rem] font-black text-slate-900 mb-6 leading-tight">
      Why People Trust JobPortal
    </h2>

    <p className="text-slate-600 text-lg max-w-3xl mx-auto leading-relaxed mb-24">
      Trust isn’t built through promises — it’s built through consistency,
      accountability, and how you’re treated when you ask for help.
      That’s what we focus on every day.
    </p>

    {/* ================= TRUST PILLARS ================= */}
    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-12">
      {[
        {
          title: "Human-Led Support",
          desc:
            "Every inquiry is handled by trained professionals — never automated bots — ensuring thoughtful, contextual responses.",
          accent: "emerald",
        },
        {
          title: "Clear & Transparent Communication",
          desc:
            "We provide honest answers, realistic timelines, and clear next steps — no vague replies or hidden processes.",
          accent: "indigo",
        },
        {
          title: "Secure & Confidential",
          desc:
            "Your information is handled with strict confidentiality and protected using industry-standard security practices.",
          accent: "purple",
        },
        {
          title: "Enterprise-Ready Systems",
          desc:
            "Built to support individuals, teams, and large organizations with scalable, reliable, and compliant systems.",
          accent: "sky",
        },
      ].map((item) => (
        <div
          key={item.title}
          className="group relative rounded-3xl p-[1px]
            bg-gradient-to-br from-emerald-400/25 via-indigo-400/20 to-purple-400/25"
        >
          <div
            className="h-full rounded-3xl p-8
              bg-white/90 backdrop-blur-xl
              border border-slate-200
              shadow-[0_18px_50px_rgba(0,0,0,0.12)]
              transition group-hover:-translate-y-2"
          >
            <h4 className="font-extrabold text-lg text-slate-900 mb-3">
              {item.title}
            </h4>

            <p className="text-slate-600 text-sm leading-relaxed">
              {item.desc}
            </p>
          </div>
        </div>
      ))}
    </div>

    {/* ================= FOOT NOTE ================= */}
    <p className="mt-24 text-sm text-slate-500 max-w-3xl mx-auto">
      Our commitment is simple: treat every message with care, protect your
      information, and deliver responses you can rely on — every time.
    </p>

  </div>
</section>



      <Footer />
    </div>
  );
}
