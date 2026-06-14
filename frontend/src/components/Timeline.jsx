import React from 'react';
import { CalendarRange, Milestone } from 'lucide-react';

export default function Timeline({ timeline }) {
  if (!timeline || timeline.length === 0) return null;

  return (
    <div className="space-y-6 w-full">
      <div className="flex items-center gap-2 px-1">
        <CalendarRange className="w-5 h-5 text-accentCyan" />
        <h3 className="text-lg font-black text-white">Trend Chronology & Key Milestones</h3>
      </div>

      <div className="glass-panel p-6 rounded-3xl border border-white/5 relative overflow-hidden">
        <div className="absolute left-8 top-8 bottom-8 w-0.5 bg-slate-800"></div>

        <div className="space-y-8 relative">
          {timeline.map((item, idx) => (
            <div key={idx} className="flex gap-6 items-start relative pl-2">
              {/* Bullet circle indicator */}
              <div className="w-5 h-5 rounded-full bg-slate-950 border-4 border-accentCyan flex items-center justify-center flex-shrink-0 z-10 shadow-md shadow-accentCyan/20 mt-1"></div>
              
              <div className="space-y-1.5">
                <span className="text-xs font-mono font-bold text-accentCyan bg-accentCyan/10 px-2.5 py-0.5 rounded border border-accentCyan/20">
                  {item.date}
                </span>
                
                <p className="text-sm text-slate-300 leading-relaxed font-light">
                  {item.event}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
