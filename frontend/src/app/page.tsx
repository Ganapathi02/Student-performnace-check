"use client";
import { useState, useEffect } from 'react';

/**
 * HabitSlider Component
 * A reusable, styled slider component for a consistent look.
 */
interface SliderProps {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  unit: string;
  onChange: (val: number) => void;
}

const HabitSlider = ({ label, value, min, max, step, unit, onChange }: SliderProps) => (
  <div className="group transition-all duration-300">
    <div className="flex justify-between mb-2">
      <label className="text-slate-300 font-semibold group-hover:text-blue-400 transition-colors">{label}</label>
      <span className="text-blue-400 font-black tabular-nums">{value}{unit}</span>
    </div>
    <input
      type="range"
      min={min}
      max={max}
      step={step}
      value={value}
      onChange={(e) => onChange(Number(e.target.value))}
      className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-500 hover:accent-blue-400 transition-all"
    />
  </div>
);

export default function Home() {
  // State for user inputs
  const [studyHours, setStudyHours] = useState(15);
  const [attendance, setAttendance] = useState(85);
  const [previousScore, setPreviousScore] = useState(75);
  const [sleepHours, setSleepHours] = useState(7);

  // App state
  const [result, setResult] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState<number[]>([]);

  // Smooth scroll to results when they appear
  useEffect(() => {
    if (result !== null) {
      window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
    }
  }, [result]);

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
        // Add to history (keep only last 5)
        setHistory(prev => [data.predicted_score, ...prev].slice(0, 5));
      } else {
        alert(data.detail?.[0]?.msg || data.error || "Analysis failed");
      }
    } catch (error) {
      console.error(error);
      alert("Connectivity Error: Ensure the backend server is running on port 8000.");
    } finally {
      setLoading(false);
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-400 border-green-500/50 shadow-green-500/20";
    if (score >= 60) return "text-yellow-400 border-yellow-500/50 shadow-yellow-500/20";
    return "text-red-400 border-red-500/50 shadow-red-500/20";
  };

  const getBotAdvice = () => {
    if (result === null) return "";
    let advice = [];
    if (studyHours < 15) advice.push("📖 Dedicate more time to focused study sessions.");
    if (attendance < 80) advice.push("🏫 Consistency in attendance is the fastest way to boost scores.");
    if (sleepHours < 7) advice.push("😴 Your brain processes learning during sleep—aim for 7.5 hours.");
    if (result > 85 && previousScore < 75) advice.push("🔥 Incredible growth potential detected!");

    return advice.length > 0 ? advice.join(" ") : "✨ Your current habits are elite. Stay consistent!";
  };

  return (
    <main className="min-h-screen bg-[#020617] text-slate-100 flex flex-col items-center py-12 px-4 md:py-20 selection:bg-blue-500/30">
      {/* Dynamic Background Accents */}
      <div className="fixed top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none animate-pulse"></div>
      <div className="fixed bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-600/10 rounded-full blur-[120px] pointer-events-none animate-pulse delay-700"></div>

      {/* Header Section */}
      <header className="z-10 w-full max-w-4xl text-center mb-16 animate-in fade-in slide-in-from-top-8 duration-1000">
        <div className="inline-block mb-8 p-1.5 rounded-full bg-gradient-to-tr from-blue-600 to-purple-600 shadow-[0_0_40px_rgba(37,99,235,0.3)]">
          <div className="bg-slate-950 rounded-full p-1 overflow-hidden">
            <img src="/std.jpg" alt="AI Agent" className="w-24 h-24 md:w-32 md:h-32 object-cover rounded-full" />
          </div>
        </div>
        <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tight">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-500">
            Performance AI
          </span>
        </h1>
        <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
          Leverage machine learning to predict your academic trajectory and optimize your habits.
        </p>
      </header>

      {/* Main Grid */}
      <div className="z-10 w-full max-w-6xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">

        {/* Input Controls (Left Column) */}
        <section className="lg:col-span-7 bg-slate-900/40 backdrop-blur-2xl p-8 md:p-10 rounded-[2.5rem] border border-white/5 shadow-2xl animate-in fade-in slide-in-from-left-8 duration-700">
          <div className="flex items-center gap-3 mb-10">
            <div className="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center text-xl">📊</div>
            <h2 className="text-2xl font-bold">Input Parameters</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
            <HabitSlider label="Study Hours" value={studyHours} min={0} max={40} step={1} unit="h" onChange={setStudyHours} />
            <HabitSlider label="Attendance" value={attendance} min={0} max={100} step={1} unit="%" onChange={setAttendance} />
            <HabitSlider label="Prev. Score" value={previousScore} min={0} max={100} step={1} unit="" onChange={setPreviousScore} />
            <HabitSlider label="Sleep Depth" value={sleepHours} min={0} max={12} step={0.5} unit="h" onChange={setSleepHours} />
          </div>

          <button
            onClick={predictScore}
            disabled={loading}
            className="mt-14 w-full py-5 rounded-2xl font-black text-xl tracking-wide uppercase bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 transition-all transform active:scale-[0.98] shadow-xl shadow-blue-900/20 disabled:opacity-50 disabled:cursor-not-allowed group overflow-hidden relative"
          >
            <span className="relative z-10">{loading ? "Processing..." : "Generate Analysis"}</span>
            <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
          </button>
        </section>

        {/* Output Panel (Right Column) */}
        <section className="lg:col-span-5 flex flex-col gap-8 animate-in fade-in slide-in-from-right-8 duration-700">

          {/* Main Prediction Card */}
          <div className="bg-slate-900/40 backdrop-blur-2xl p-10 rounded-[2.5rem] border border-white/5 shadow-2xl flex-grow flex flex-col justify-center items-center text-center relative overflow-hidden">
            {result !== null ? (
              <>
                <h3 className="text-sm font-bold text-slate-500 uppercase tracking-[0.2em] mb-10">Predicted Potential</h3>
                <div className={`relative w-56 h-56 rounded-full border-[10px] flex items-center justify-center bg-slate-950/50 transition-all duration-1000 ${getScoreColor(result)}`}>
                  <div className="absolute inset-[-15px] rounded-full border border-white/5"></div>
                  <span className="text-7xl font-black">{result}</span>
                  {/* Visual progress ring could go here */}
                </div>

                <div className="mt-10 p-6 rounded-2xl bg-white/[0.03] border border-white/5 text-left w-full group hover:border-blue-500/30 transition-all duration-500">
                  <div className="flex items-start gap-4">
                    <span className="text-3xl filter drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]">🤖</span>
                    <div>
                      <h4 className="text-blue-400 font-black text-sm uppercase tracking-wider mb-2">AI Advisor</h4>
                      <p className="text-slate-300 text-sm leading-relaxed font-medium">
                        {getBotAdvice()}
                      </p>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <div className="text-slate-500 flex flex-col items-center">
                <div className="w-24 h-24 rounded-full border-4 border-dashed border-slate-800 flex items-center justify-center mb-8 animate-[spin_10s_linear_infinite]">
                  <span className="text-4xl grayscale opacity-50">🤖</span>
                </div>
                <p className="text-xl font-medium">Awaiting Parameters</p>
                <p className="text-sm mt-3 opacity-60">Adjust inputs and trigger analysis.</p>
              </div>
            )}
          </div>

          {/* History Card */}
          <div className="bg-slate-900/40 backdrop-blur-2xl p-8 rounded-[2.5rem] border border-white/5 shadow-xl">
            <h4 className="text-xs font-black text-slate-500 uppercase tracking-[0.2em] mb-4">Recent Sessions</h4>
            <div className="flex gap-3">
              {history.length > 0 ? history.map((h, i) => (
                <div key={i} className="flex-1 py-3 bg-slate-950 rounded-xl border border-white/5 text-center font-black text-blue-400 animate-in zoom-in duration-300">
                  {h}
                </div>
              )) : (
                <div className="w-full py-3 text-center text-slate-600 text-xs font-bold uppercase tracking-widest">No history yet</div>
              )}
            </div>
          </div>
        </section>
      </div>

      <footer className="z-10 mt-20 text-slate-600 text-sm font-medium tracking-widest uppercase">
        GANAPATHI &bull; 2026
      </footer>
    </main>
  );
}
