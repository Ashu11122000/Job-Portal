// src/pages/tools/MockInterviewTool.jsx
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  FiBriefcase,
  FiClock,
  FiTarget,
  FiHelpCircle,
  FiStar,
  FiBookOpen,
} from "react-icons/fi";

import {
  createSessionApi,
  getSessionApi,
  listSessionsApi,
  deleteSessionApi,
  getQuestionApi,
  submitAnswerApi,
  generateReportApi,
} from "../../api/mockInterviewApi.js";

import Footer from "../../components/layout/Footer";

export default function MockInterviewTool() {
  const [role, setRole] = useState("Frontend Developer");
  const [difficulty, setDifficulty] = useState("Medium");

  const [sessionId, setSessionId] = useState("");
  const [sessions, setSessions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [report, setReport] = useState(null);

  /* ---------------- LOAD SESSIONS ---------------- */

  useEffect(() => {
    loadSessions();
  }, []);

const loadSessions = async () => {
  try {
    const res = await listSessionsApi();
    setSessions(res.data.sessions || []);
  } catch (err) {
    console.error("Load sessions error:", err?.response?.data || err);
    setSessions([]); // prevent crash
  }
};


  /* ---------------- SESSION ---------------- */

  const startInterview = async () => {
    try {
      const res = await createSessionApi({ role, difficulty });
      setSessionId(res.data.sessionId);
      setAnswers([]);
      setReport(null);
      setCurrentQuestion(null);
      loadSessions();
    } catch (err) {
      console.error("Create session error:", err);
      alert("Failed to create session");
    }
  };

  const fetchQuestion = async () => {
    try {
      const index = answers.length;
      const res = await getQuestionApi({ role, difficulty, index });
      setCurrentQuestion(res.data.question);
    } catch (err) {
      console.error("Fetch question error:", err);
    }
  };

  const saveAnswer = async () => {
    if (!currentQuestion) return;

    const input = document.getElementById("mock-answer-input");
    const answerText = input?.value || "";

    const updatedAnswers = [
      ...answers,
      { q: currentQuestion, a: answerText },
    ];

    setAnswers(updatedAnswers);
    input.value = "";

    try {
      await submitAnswerApi({ sessionId, answers: updatedAnswers });
    } catch (err) {
      console.error("Submit answer error:", err);
    }

    fetchQuestion();
  };

  const generateReport = async () => {
    try {
      const res = await generateReportApi(sessionId);
      setReport(res.data);
    } catch (err) {
      console.error("Generate report error:", err);
    }
  };

  const removeSession = async (id) => {
    try {
      await deleteSessionApi(id);
      loadSessions();
    } catch (err) {
      console.error("Delete session error:", err);
    }
  };

  /* ---------------- UI ---------------- */

  return (
    <>
      <section className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 pt-28 pb-24 px-6">
        <div className="max-w-6xl mx-auto">

          {/* HEADER */}
<div className="text-center mb-16">
            <h1 className="text-5xl font-black text-slate-900 mb-4">
              AI Mock Interview Practice
            </h1>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Practice real interview questions, receive structured feedback,
              and track your interview readiness with AI.
            </p>
          </div>

          {/* CREATE SESSION */}
          <div className="bg-white/80 backdrop-blur-xl border border-slate-200 rounded-3xl p-8 shadow-xl mb-12">
            <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2 mb-6">
              <FiBriefcase /> Interview Setup
            </h2>

            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full p-3 rounded-xl border border-slate-300 text-slate-800 mb-4"
            >
              {[
                "Frontend Developer",
                "Backend Developer",
                "Full Stack Developer",
              ].map((r) => (
                <option key={r}>{r}</option>
              ))}
            </select>

            <div className="flex gap-3">
              {["Easy", "Medium", "Hard"].map((level) => (
                <button
                  key={level}
                  onClick={() => setDifficulty(level)}
                  className={`px-4 py-2 rounded-xl text-sm font-semibold border transition
                    ${
                      difficulty === level
                        ? "bg-indigo-600 text-slate-100 border-indigo-600 shadow"
                        : "bg-slate-50 text-slate-700 border-slate-300 hover:bg-slate-100"
                    }`}
                >
                  {level}
                </button>
              ))}
            </div>

            <p className="mt-5 text-sm text-slate-600 flex items-center gap-2">
              <FiClock />
              Tip: Structure answers using STAR (Situation, Task, Action, Result)
            </p>

            <motion.button
              onClick={startInterview}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className="mt-6 px-8 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-slate-100 font-semibold shadow-lg"
            >
              🎤 Start Interview Session
            </motion.button>
          </div>

          {/* SAVED SESSIONS */}
          {sessions.length > 0 && (
            <div className="bg-white/80 backdrop-blur-xl border border-slate-200 rounded-3xl p-8 shadow-xl mb-12">
              <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2 mb-6">
                <FiTarget /> Saved Sessions
              </h2>

              <div className="space-y-4">
                {sessions.map((s) => (
                  <div
                    key={s.id}
                    className="flex justify-between items-center p-4 rounded-2xl border border-slate-200 bg-slate-50"
                  >
                    <div>
                      <p className="font-semibold text-slate-900">
                        {s.role}
                      </p>
                      <p className="text-sm text-slate-600">
                        Difficulty: {s.difficulty}
                      </p>
                    </div>

                    <div className="flex gap-3">
                      <button
                        onClick={() => setSessionId(s.id)}
                        className="px-4 py-1 rounded-lg bg-indigo-600 text-slate-100 text-sm"
                      >
                        Continue
                      </button>
                      <button
                        onClick={() => removeSession(s.id)}
                        className="text-rose-600"
                      >
                        <FiStar />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* QUESTION + ANSWER */}
          {sessionId && (
            <div className="bg-white/90 backdrop-blur-xl border border-slate-200 rounded-3xl p-8 shadow-xl">
              <h2 className="text-2xl font-bold text-slate-900 mb-5">
                Interview Question
              </h2>

              {!currentQuestion && (
                <button
                  onClick={fetchQuestion}
                  className="px-6 py-2 rounded-xl bg-slate-900 text-slate-100 shadow"
                >
                  Get First Question
                </button>
              )}

              {currentQuestion && (
                <>
                  <div className="p-5 bg-slate-100 border border-slate-300 rounded-2xl text-slate-800 mb-6">
                    {currentQuestion}
                  </div>

                  <textarea
                    id="mock-answer-input"
                    placeholder="Write your answer here..."
                    rows={4}
                    className="w-full p-4 rounded-2xl border border-slate-300 text-slate-800"
                  />

                  <div className="flex gap-4 mt-5">
                    <button
                      onClick={saveAnswer}
                      className="px-6 py-2 rounded-xl bg-slate-900 text-slate-100 shadow"
                    >
                      Submit Answer
                    </button>

                    <button
                      onClick={generateReport}
                      className="px-6 py-2 rounded-xl bg-indigo-600 text-slate-100 shadow"
                    >
                      Generate Report
                    </button>
                  </div>
                </>
              )}

              {report && (
                <div className="mt-8 p-6 bg-slate-50 border border-slate-200 rounded-2xl">
                  <h3 className="text-xl font-bold text-slate-900 mb-2">
                    Interview Score: {report.score}/10
                  </h3>
                  <p className="text-sm text-slate-700 whitespace-pre-line">
                    {report.feedback}
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      <InterviewProgress answers={answers} difficulty={difficulty} />

<AnswerStrategy />

<AnswerHistory answers={answers} />

<SkillCoverage answers={answers} />

<FinalVerdict report={report} />


      <Footer />
    </>
  );
}


function InterviewProgress({ answers, difficulty }) {
  const progress = Math.min(100, answers.length * 15);

  return (
    <div className="mb-12 bg-white/80 backdrop-blur-xl border border-slate-200 rounded-3xl p-8 shadow-xl">
      <h3 className="text-xl font-bold text-slate-900 mb-4">
        Interview Progress Overview
      </h3>

      <div className="grid md:grid-cols-3 gap-6">
        <Stat label="Questions Answered" value={answers.length} />
        <Stat label="Difficulty Level" value={difficulty} />
        <Stat label="Estimated Readiness" value={`${progress}%`} />
      </div>

      <div className="mt-6 h-3 bg-slate-200 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-indigo-500 to-purple-500"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}

function Stat({ label, value }) {
  return (
    <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200">
      <p className="text-sm text-slate-500">{label}</p>
      <p className="text-2xl font-extrabold text-slate-900 mt-1">{value}</p>
    </div>
  );
}

function AnswerStrategy() {
  return (
    <div className="mb-12 bg-indigo-50 border border-indigo-200 rounded-3xl p-8">
      <h3 className="text-xl font-bold text-indigo-900 mb-3">
        How Your Answers Are Evaluated
      </h3>

      <ul className="space-y-3 text-indigo-800 text-sm">
        <li>✔ Clarity of explanation</li>
        <li>✔ Problem-solving approach</li>
        <li>✔ Real-world relevance</li>
        <li>✔ Communication structure (STAR)</li>
      </ul>

      <p className="mt-4 text-sm text-indigo-700">
        💡 Tip: Use <b>Situation → Task → Action → Result</b> for best scores.
      </p>
    </div>
  );
}


function AnswerHistory({ answers }) {
  if (answers.length === 0) return null;

  return (
    <div className="mt-12 bg-white/80 backdrop-blur-xl border border-slate-200 rounded-3xl p-8 shadow-xl">
      <h3 className="text-xl font-bold text-slate-900 mb-6">
        Your Answer History
      </h3>

      <div className="space-y-6">
        {answers.map((a, i) => (
          <div key={i} className="border-l-4 border-indigo-500 pl-4">
            <p className="font-semibold text-slate-800">
              Q{i + 1}: {a.q}
            </p>
            <p className="text-sm text-slate-600 mt-1">
              {a.a || "No answer provided"}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}


function SkillCoverage({ answers }) {
  if (answers.length === 0) return null;

  const skills = [
    { name: "Communication", score: Math.min(90, answers.length * 20) },
    { name: "Technical Depth", score: Math.min(80, answers.length * 18) },
    { name: "Problem Solving", score: Math.min(85, answers.length * 17) },
  ];

  return (
    <div className="mt-12 bg-slate-50 border border-slate-200 rounded-3xl p-8">
      <h3 className="text-xl font-bold text-slate-900 mb-6">
        Skill Coverage Analysis
      </h3>

      <div className="space-y-4">
        {skills.map((s) => (
          <div key={s.name}>
            <div className="flex justify-between text-sm font-semibold text-slate-700 mb-1">
              <span>{s.name}</span>
              <span>{s.score}%</span>
            </div>
            <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-emerald-500 to-teal-500"
                style={{ width: `${s.score}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}


function FinalVerdict({ report }) {
  if (!report) return null;

  const status =
    report.score >= 8
      ? "Interview Ready"
      : report.score >= 6
      ? "Needs Improvement"
      : "Not Ready Yet";

  return (
    <div className="mt-12 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-3xl p-8 text-slate-100 shadow-xl">
      <h3 className="text-2xl font-extrabold mb-2">
        Final Verdict: {status}
      </h3>
      <p className="text-sm opacity-90">
        Based on answer quality, structure, and clarity across all questions.
      </p>
    </div>
  );
}
