"use client";
import { useState, useEffect } from 'react';

/**
 * HabitSlider Component
 * Enhanced with hover effects and premium styling.
 */
interface SliderProps {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  unit: string;
  icon: string;
  onChange: (val: number) => void;
}

const HabitSlider = ({ label, value, min, max, step, unit, icon, onChange }: SliderProps) => (
  <div className="group relative p-6 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-blue-500/30 hover:bg-white/[0.04] transition-all duration-500 shadow-xl">
    <div className="flex justify-between items-center mb-4">
      <div className="flex items-center gap-3">
        <span className="text-xl group-hover:scale-110 transition-transform duration-300">{icon}</span>
        <label className="text-slate-400 font-bold tracking-wide group-hover:text-blue-400 transition-colors uppercase text-xs">{label}</label>
      </div>
      <span className="text-blue-400 font-black tabular-nums text-lg drop-shadow-[0_0_8px_rgba(59,130,246,0.5)]">{value}{unit}</span>
    </div>
    <input
      type="range"
      min={min}
      max={max}
      step={step}
      value={value}
      onChange={(e) => onChange(Number(e.target.value))}
      className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-500 hover:accent-blue-400 transition-all"
    />
  </div>
);

export default function Home() {
  const [studyHours, setStudyHours] = useState(15);
  const [attendance, setAttendance] = useState(85);
  const [previousScore, setPreviousScore] = useState(75);
  const [sleepHours, setSleepHours] = useState(7);

  const [result, setResult] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState<number[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const predictScore = async () => {
    setLoading(true);
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://student-performnace-check.onrender.com';
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
        setHistory(prev => [data.predicted_score, ...prev].slice(0, 4));
      } else {
        alert(data.detail?.[0]?.msg || data.error || "Analysis failed");
      }
    } catch (error) {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://student-performnace-check.onrender.com';
      alert(`Connectivity Error: Could not reach the AI Backend at ${apiUrl}. Please ensure the backend is live.`);
    } finally {
      setLoading(false);
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-emerald-400 border-emerald-500/30";
    if (score >= 60) return "text-amber-400 border-amber-500/30";
    return "text-rose-400 border-rose-500/30";
  };

  const getBotAdvice = () => {
    if (result === null) return "";
    let advice = [];
    if (studyHours < 10) advice.push("Your study volume is low; even small 30-min daily increases can compound your results.");
    if (attendance < 75) advice.push("Classroom engagement is a huge multiplier for your scores—try to miss fewer sessions.");
    if (sleepHours < 7) advice.push("Science shows sleep is when learning consolidates. Aim for a consistent 7-8 hours.");
    if (previousScore > 90) advice.push("Maintaining high scores is harder than getting them. Keep your discipline sharp!");
    
    return advice.length > 0 ? advice[Math.floor(Math.random() * advice.length)] : "Your current metrics suggest you're in the top percentile. Keep this momentum!";
  };

  if (!mounted) return null;

  return (
    <main className="min-h-screen bg-[#02040a] text-slate-100 flex flex-col items-center py-12 px-4 selection:bg-blue-500/30 overflow-x-hidden">
      {/* Animated Mesh Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-blue-600/10 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-purple-600/10 rounded-full blur-[120px] animate-pulse delay-1000"></div>
      </div>

      <div className="z-10 w-full max-w-6xl flex flex-col items-center">
        {/* Header */}
        <header className="text-center mb-16 animate-in fade-in slide-in-from-top-8 duration-1000">
          <div className="relative inline-block mb-10 group">
            <div className="absolute inset-0 bg-blue-500 rounded-full blur-2xl opacity-20 group-hover:opacity-40 transition-opacity duration-500"></div>
            <div className="relative bg-slate-900 rounded-full p-1.5 border border-white/10 overflow-hidden shadow-2xl">
              <img src="/std.jpg" alt="Student AI" className="w-28 h-28 md:w-36 md:h-36 object-cover rounded-full grayscale-[20%] group-hover:grayscale-0 transition-all duration-700" />
            </div>
          </div>
          <h1 className="text-6xl md:text-8xl font-black mb-6 tracking-tighter">
            <span className="bg-clip-text text-transparent bg-gradient-to-b from-white via-white to-slate-500">
              Performance
            </span>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-600"> AI</span>
          </h1>
          <p className="text-slate-400 text-lg md:text-xl max-w-xl mx-auto font-medium leading-relaxed">
            Harnessing neural regression to decode academic success through your daily habits.
          </p>
        </header>

        {/* Workspace Grid */}
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Controls */}
          <section className="lg:col-span-7 space-y-6 animate-in fade-in slide-in-from-left-12 duration-700">
            <div className="bg-white/[0.02] backdrop-blur-3xl p-8 md:p-10 rounded-[3rem] border border-white/5 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.5)]">
              <div className="flex items-center gap-4 mb-12">
                <div className="w-12 h-12 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-2xl">🧬</div>
                <div>
                  <h2 className="text-2xl font-black tracking-tight">Metric Analysis</h2>
                  <p className="text-slate-500 text-sm font-bold uppercase tracking-widest mt-1">Configure your variables</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <HabitSlider icon="📖" label="Study Volume" value={studyHours} min={0} max={40} step={1} unit="h" onChange={setStudyHours} />
                <HabitSlider icon="🏫" label="Attendance" value={attendance} min={0} max={100} step={1} unit="%" onChange={setAttendance} />
                <HabitSlider icon="📈" label="Baseline Score" value={previousScore} min={0} max={100} step={1} unit="" onChange={setPreviousScore} />
                <HabitSlider icon="💤" label="Rest Quality" value={sleepHours} min={0} max={12} step={0.5} unit="h" onChange={setSleepHours} />
              </div>

              <button
                onClick={predictScore}
                disabled={loading}
                className="mt-12 w-full py-6 rounded-3xl font-black text-xl tracking-[0.1em] uppercase bg-white text-black hover:bg-blue-400 hover:text-white transition-all transform active:scale-95 shadow-2xl disabled:opacity-20 group relative overflow-hidden"
              >
                <span className="relative z-10 flex items-center justify-center gap-3">
                  {loading ? (
                    <div className="w-6 h-6 border-4 border-slate-900 border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    "Initialize Analysis"
                  )}
                </span>
              </button>
            </div>
          </section>

          {/* Results Display */}
          <section className="lg:col-span-5 space-y-8 animate-in fade-in slide-in-from-right-12 duration-700">
            <div className="bg-white/[0.02] backdrop-blur-3xl p-12 rounded-[3rem] border border-white/5 shadow-2xl flex flex-col items-center text-center min-h-[480px] justify-center relative group">
              <div className="absolute inset-0 bg-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
              
              {result !== null ? (
                <>
                  <p className="text-slate-500 text-xs font-black uppercase tracking-[0.3em] mb-12">Projected Outcome</p>
                  <div className={`relative w-64 h-64 rounded-full border-[1px] flex flex-col items-center justify-center bg-black/40 shadow-inner transition-all duration-1000 ${getScoreColor(result)}`}>
                    <div className="absolute inset-0 rounded-full border-[12px] border-white/5"></div>
                    <div className="absolute inset-0 rounded-full border-[12px] border-current opacity-20 animate-pulse"></div>
                    <span className="text-8xl font-black tracking-tighter">{Math.round(result)}</span>
                    <span className="text-xs font-black uppercase tracking-widest opacity-60 mt-2">Score Units</span>
                  </div>

                  <div className="mt-12 p-6 rounded-3xl bg-white/[0.03] border border-white/10 text-left w-full hover:bg-white/[0.05] transition-all duration-500">
                    <div className="flex items-start gap-4">
                      <span className="text-3xl">🦾</span>
                      <div>
                        <h4 className="text-blue-400 font-black text-xs uppercase tracking-widest mb-2">Neural Insight</h4>
                        <p className="text-slate-300 text-sm leading-relaxed font-medium">
                          "{getBotAdvice()}"
                        </p>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <div className="flex flex-col items-center">
                  <div className="w-32 h-32 rounded-full border border-dashed border-white/10 flex items-center justify-center mb-8 animate-[spin_20s_linear_infinite]">
                    <div className="w-20 h-20 rounded-full border border-blue-500/20 animate-ping"></div>
                  </div>
                  <h3 className="text-2xl font-black text-slate-500">Ready for Uplink</h3>
                  <p className="text-slate-600 text-sm mt-2 max-w-[200px]">Waiting for your academic variables to process.</p>
                </div>
              )}
            </div>

            {/* Micro Stats */}
            <div className="grid grid-cols-4 gap-4">
              {history.length > 0 ? history.map((h, i) => (
                <div key={i} className="py-4 bg-white/[0.02] rounded-2xl border border-white/5 text-center font-black text-blue-400 text-sm animate-in zoom-in duration-500">
                  {Math.round(h)}
                </div>
              )) : [1, 2, 3, 4].map(i => (
                <div key={i} className="py-4 border border-dashed border-white/5 rounded-2xl"></div>
              ))}
            </div>
          </section>
        </div>

        <footer className="mt-24 text-slate-700 text-xs font-black tracking-[0.5em] uppercase hover:text-slate-500 transition-colors duration-500 cursor-default">
          &copy; 2026 GANAPATHI V &bull; Neural Lab
        </footer>
      </div>
    </main>
  );
}
