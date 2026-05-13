"use client";
import { useState } from 'react';

export default function Home() {
  const [studyHours, setStudyHours] = useState(15);
  const [attendance, setAttendance] = useState(85);
  const [previousScore, setPreviousScore] = useState(75);
  const [sleepHours, setSleepHours] = useState(7);
  const [result, setResult] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  const predictScore = async () => {
    setLoading(true);
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
      const res = await fetch(`${apiUrl}/predict`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          study_hours: studyHours,
          attendance: attendance,
          previous_score: previousScore,
          sleep_hours: sleepHours
        })
      });
      const data = await res.json();
      if (data.predicted_score !== undefined) {
        setResult(data.predicted_score);
      } else {
        alert(data.error || "Failed to predict");
      }
    } catch (error) {
      console.error(error);
      alert("Failed to connect to backend");
    } finally {
      setLoading(false);
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-500 border-green-500 shadow-green-500/50";
    if (score >= 60) return "text-yellow-400 border-yellow-400 shadow-yellow-400/50";
    return "text-red-500 border-red-500 shadow-red-500/50";
  };

  const getBotAdvice = () => {
    if (result === null) return "";
    let advice = [];
    if (studyHours < 15) advice.push("Try dedicating a bit more time to studying.");
    if (attendance < 75) advice.push("Attendance is heavily linked to success—try not to miss class!");
    if (sleepHours < 6) advice.push("Your brain needs rest! Try getting at least 7 hours of sleep.");
    if (sleepHours > 9) advice.push("You might be oversleeping. Balance is key.");

    if (advice.length === 0) {
      return "Your habits look perfectly balanced. Keep up the great routine!";
    }
    return advice.join(" ");
  };

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 flex flex-col items-center py-16 px-4 font-sans">
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-[128px] pointer-events-none"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-[128px] pointer-events-none"></div>

      <div className="z-10 w-full max-w-4xl text-center mb-12 flex flex-col items-center">
        {/* Make sure 'std.png' is in the 'frontend/public' folder */}
        <div className="mb-6 relative w-32 h-32 md:w-40 md:h-40 bg-white rounded-full p-2 shadow-[0_0_30px_rgba(96,165,250,0.4)]">
          <img
            src="/std.jpg"
            alt="Student Icon"
            className="w-full h-full object-cover rounded-full"
          />
        </div>

        <h1 className="text-5xl md:text-6xl font-black mb-4 tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
          Student Performance AI
        </h1>
        <p className="text-slate-400 text-lg md:text-xl">
          Adjust the habits below to see how they impact the predicted final score.
        </p>
      </div>

      <div className="z-10 w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        {/* Input Panel */}
        <div className="bg-slate-900/60 backdrop-blur-xl p-8 rounded-3xl border border-slate-800 shadow-2xl">
          <h2 className="text-2xl font-bold mb-8 flex items-center gap-2">
            📊 Student Profile
          </h2>

          <div className="space-y-8">
            {/* Study Hours */}
            <div>
              <div className="flex justify-between mb-2">
                <label className="text-slate-300 font-medium">Study Hours (per week)</label>
                <span className="text-blue-400 font-bold">{studyHours} hrs</span>
              </div>
              <input type="range" min="0" max="40" step="1" value={studyHours} onChange={(e) => setStudyHours(Number(e.target.value))} className="w-full accent-blue-500" />
            </div>

            {/* Attendance */}
            <div>
              <div className="flex justify-between mb-2">
                <label className="text-slate-300 font-medium">Attendance</label>
                <span className="text-blue-400 font-bold">{attendance}%</span>
              </div>
              <input type="range" min="0" max="100" step="1" value={attendance} onChange={(e) => setAttendance(Number(e.target.value))} className="w-full accent-blue-500" />
            </div>

            {/* Previous Score */}
            <div>
              <div className="flex justify-between mb-2">
                <label className="text-slate-300 font-medium">Previous Exam Score</label>
                <span className="text-blue-400 font-bold">{previousScore}/100</span>
              </div>
              <input type="range" min="0" max="100" step="1" value={previousScore} onChange={(e) => setPreviousScore(Number(e.target.value))} className="w-full accent-blue-500" />
            </div>

            {/* Sleep Hours */}
            <div>
              <div className="flex justify-between mb-2">
                <label className="text-slate-300 font-medium">Sleep (hours per night)</label>
                <span className="text-blue-400 font-bold">{sleepHours} hrs</span>
              </div>
              <input type="range" min="0" max="12" step="0.5" value={sleepHours} onChange={(e) => setSleepHours(Number(e.target.value))} className="w-full accent-blue-500" />
            </div>
          </div>

          <button
            suppressHydrationWarning
            onClick={predictScore}
            disabled={loading}
            className="mt-10 w-full py-4 rounded-xl font-bold text-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 transition-all transform hover:-translate-y-1 shadow-lg shadow-purple-500/25 disabled:opacity-50"
          >
            {loading ? "Analyzing..." : "Predict Final Score"}
          </button>
        </div>

        {/* Result Panel */}
        <div className="bg-slate-900/60 backdrop-blur-xl p-8 rounded-3xl border border-slate-800 shadow-2xl h-full flex flex-col justify-center items-center text-center min-h-[400px]">
          {result !== null ? (
            <div className="animate-in zoom-in duration-500 flex flex-col items-center">
              <h3 className="text-xl text-slate-400 uppercase tracking-widest font-semibold mb-6">Predicted Score</h3>
              <div className={`w-48 h-48 rounded-full border-4 flex items-center justify-center shadow-[0_0_50px_rgba(0,0,0,0.5)] ${getScoreColor(result)} bg-slate-950/50`}>
                <span className="text-6xl font-black">{result}</span>
              </div>

              <div className="mt-8 bg-slate-800/80 p-6 rounded-2xl border border-slate-700 text-left w-full relative overflow-hidden group hover:border-blue-500/50 transition-colors">
                <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-blue-400 to-purple-500"></div>
                <div className="flex items-start gap-4">
                  <div className="text-3xl animate-bounce">🤖</div>
                  <div>
                    <h4 className="text-blue-400 font-bold mb-1">AI Advisor Bot</h4>
                    <p className="text-slate-300 text-sm leading-relaxed">
                      <span className="font-semibold text-white">
                        {result >= 80 ? "✨ Excellent prediction! " : result >= 60 ? "📈 Good effort, but room to grow. " : "⚠️ Warning! "}
                      </span>
                      {getBotAdvice()}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-slate-500 flex flex-col items-center animate-pulse">
              <div className="w-24 h-24 rounded-full border-4 border-dashed border-slate-700 flex items-center justify-center mb-6">
                <span className="text-3xl">🤖</span>
              </div>
              <p className="text-lg">Waiting for data...</p>
              <p className="text-sm mt-2">Adjust the sliders and click predict.</p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
