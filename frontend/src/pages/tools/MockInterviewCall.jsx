import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  FiBriefcase,
  FiHelpCircle,
  FiClock,
  FiStar,
  FiBookOpen,
  FiTarget,
  FiLayers
} from "react-icons/fi";

import {
  createSessionApi,
  getSessionApi,
  listSessionsApi,
  deleteSessionApi,
  getQuestionApi,
  submitAnswerApi,
  generateReportApi
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

  // Fetch saved sessions on load
  useEffect(() => {
    loadSessions();
  }, []);

  const loadSessions = async () => {
    try {
      const res = await listSessionsApi();
      setSessions(res.data.sessions || []);
    } catch (err) {
      console.error("Error loading sessions:", err);
    }
  };

  const startInterview = async () => {
    try {
      const res = await createSessionApi({ role, difficulty });
      setSessionId(res.data.sessionId);
      setAnswers([]);
      setReport(null);
      setCurrentQuestion(null);
      alert("Session created successfully! ID: " + res.data.sessionId);
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
    const answerText = document.getElementById("mock-answer-input")?.value || "";

    const newAnswer = { q: currentQuestion, a: answerText };
    const updatedAnswers = [...answers, newAnswer];
    setAnswers(updatedAnswers);
    document.getElementById("mock-answer-input").value = "";

    try {
      await submitAnswerApi({ sessionId, answers: updatedAnswers });
      alert("Answer submitted!");
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
      alert("Session deleted!");
      loadSessions();
    } catch (err) {
      console.error("Delete session error:", err);
    }
  };

  return (
    <>
      <section className="min-h-screen bg-linear-to-br from-indigo-50 via-white to-purple-50 pt-32 pb-24 px-6">
        <div className="max-w-6xl mx-auto">

          {/* HEADER */}
          <div className="text-center mb-16">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-5xl font-black text-black mb-4"
            >
              Mock Interview Practice
            </motion.h1>
            <p className="text-black/60 text-lg">Practice interview questions with AI feedback.</p>
          </div>

          {/* CREATE SESSION */}
          <div className="bg-white/80 p-8 rounded-3xl shadow-xl border border-slate-200 mb-10">
            <h2 className="text-2xl font-bold text-black flex items-center gap-2 mb-6">
              <FiBriefcase /> Select Role & Difficulty
            </h2>

            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full p-3 border border-black rounded-xl text-black mb-4"
            >
              {["Frontend Developer", "Backend Developer", "Full Stack Developer"].map((r) => (
                <option key={r}>{r}</option>
              ))}
            </select>

            <div className="flex gap-4">
              {["Easy", "Medium", "Hard"].map((level) => (
                <button
                  key={level}
                  onClick={() => setDifficulty(level)}
                  className={`px-4 py-2 rounded-xl border text-sm font-medium transition ${
                    difficulty === level
                      ? "bg-black text-white border-black shadow-md"
                      : "bg-white text-black border-black hover:bg-slate-100"
                  }`}
                >
                  {level}
                </button>
              ))}
            </div>

            <p className="text-black/60 text-sm flex items-center gap-1 mt-5">
              <FiClock /> Tip: Answer clearly & use STAR method for behavioral questions.
            </p>

            <motion.button
              onClick={startInterview}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className="mt-6 px-8 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-xl shadow-lg"
            >
              🎤 Start Interview Session
            </motion.button>
          </div>

          {/* SESSION LIST */}
          {sessions.length > 0 && (
            <div className="bg-white/80 p-8 rounded-3xl shadow-xl border border-slate-200 mb-10">
              <h2 className="text-2xl font-bold text-black flex items-center gap-2 mb-6">
                <FiTarget /> Saved Interview Sessions
              </h2>

              <div className="space-y-4">
                {sessions.map((s) => (
                  <div key={s.id} className="flex justify-between items-center border border-black rounded-xl p-4 bg-white shadow-sm">
                    <div className="text-black">
                      <p className="font-semibold">{s.role}</p>
                      <p className="text-sm text-black/60">Difficulty: {s.difficulty}</p>
                    </div>

                    <div className="flex gap-3">
                      <button onClick={() => setSessionId(s.id)} className="px-3 py-1 rounded-lg bg-black text-white text-xs">Use</button>
                      <button onClick={() => removeSession(s.id)} className="text-red-600"><FiStar /></button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* QUESTION VIEW */}
          {sessionId && (
            <div className="bg-white/90 p-8 rounded-3xl shadow-xl border border-black">
              <h2 className="text-2xl font-bold text-black mb-5">Current Question</h2>

              {!currentQuestion && (
                <motion.button
                  onClick={fetchQuestion}
                  whileHover={{ scale: 1.05 }}
                  className="px-6 py-2 bg-black text-white rounded-xl shadow-md"
                >
                  Get First Question
                </motion.button>
              )}

              {currentQuestion && (
                <>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="p-5 bg-slate-50 border border-black rounded-2xl text-black mb-6"
                  >
                    {currentQuestion}
                  </motion.div>

                  <textarea
                    id="mock-answer-input"
                    placeholder="Write your answer here..."
                    className="w-full p-4 border border-black rounded-2xl text-black shadow-sm"
                    rows={3}
                  ></textarea>

                  <div className="flex gap-4 mt-5">
                    <motion.button onClick={saveAnswer} whileTap={{scale:0.97}} className="px-6 py-2 bg-black text-white rounded-xl shadow-md">
                      Submit Answer
                    </motion.button>

                    <motion.button onClick={generateReport} whileHover={{scale:1.05}} className="px-6 py-2 bg-indigo-700 text-white rounded-xl shadow-lg">
                      Generate Report
                    </motion.button>
                  </div>
                </>
              )}

              {report && (
                <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} className="mt-8 p-6 bg-white border border-black rounded-2xl shadow-xl text-black">
                  <h3 className="text-xl font-bold mb-2">Score: {report.score}/10</h3>
                  <p className="text-sm opacity-80 whitespace-pre-line">{report.feedback}</p>
                </motion.div>
              )}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </>
  );
}
