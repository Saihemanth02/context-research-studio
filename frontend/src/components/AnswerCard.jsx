import React from 'react';
import { AlertCircle, ShieldAlert, Award } from 'lucide-react';

export default function AnswerCard({ answer, confidence, accuracyNote }) {
  // SVG Ring Calculations
  // Circumference = 2 * PI * r = 2 * 3.1415 * 38 = ~238.7
  const r = 38;
  const c = 2 * Math.PI * r;
  const pct = confidence || 0.75;
  const offset = c - (pct * c);
  const confidenceScorePercentage = Math.round(pct * 100);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch w-full">
      {/* Estimated Answer Card */}
      <div className="lg:col-span-8 glass-panel p-6 rounded-3xl border border-white/10 shadow-2xl relative overflow-hidden flex flex-col justify-between">
        <div className="absolute top-0 left-0 w-1.5 h-full bg-gradient-to-b from-accentCyan to-accentViolet"></div>
        
        <div>
          <span className="text-[10px] font-bold text-accentCyan uppercase tracking-widest block mb-2 flex items-center gap-1.5">
            <Award className="w-4 h-4" /> Synthesized Research Answer
          </span>
          <h3 className="text-xl md:text-2xl font-black text-white mb-4 leading-snug">
            Estimated Summary
          </h3>
          <p className="text-slate-300 text-sm md:text-base leading-relaxed font-light">
            {answer}
          </p>
        </div>

        {accuracyNote && (
          <div className="mt-6 p-4 rounded-xl bg-amber-500/5 border border-amber-500/20 text-xs text-amber-200 flex items-start gap-2.5">
            <AlertCircle className="w-4.5 h-4.5 text-amber-400 flex-shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold block mb-0.5">Accuracy Note</span>
              {accuracyNote}
            </div>
          </div>
        )}
      </div>

      {/* Confidence Score Panel */}
      <div className="lg:col-span-4 glass-panel p-6 rounded-3xl border border-white/10 shadow-2xl flex flex-col items-center justify-center text-center">
        <span class="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">Confidence Meter</span>
        
        <div className="relative w-32 h-32 flex items-center justify-center">
          <svg className="w-full h-full transform -rotate-90">
            <circle 
              cx="64" 
              cy="64" 
              r={r} 
              className="stroke-slate-800" 
              strokeWidth="6" 
              fill="transparent"
            />
            <circle 
              cx="64" 
              cy="64" 
              r={r} 
              className="stroke-accentCyan transition-all duration-1000" 
              strokeWidth="6" 
              fill="transparent"
              strokeDasharray={c}
              strokeDashoffset={offset}
            />
          </svg>
          <div className="absolute flex flex-col items-center">
            <span className="text-3xl font-black text-white">{confidenceScorePercentage}%</span>
            <span className="text-[9px] font-bold text-slate-500 tracking-wider">CONSENSUS</span>
          </div>
        </div>

        <h4 className="text-sm font-bold text-white mt-4">
          {confidenceScorePercentage >= 90 ? 'Very High Reliability' : confidenceScorePercentage >= 80 ? 'High Reliability' : 'Moderate Heuristics'}
        </h4>
        
        <p className="text-xs text-slate-400 mt-2 px-2 leading-relaxed">
          Source weights parsed and weighted by multi-agent credibility verification algorithms.
        </p>
      </div>
    </div>
  );
}
