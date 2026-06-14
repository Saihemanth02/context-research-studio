import React, { useState, useEffect } from 'react';
import { Loader2, CheckCircle2, ChevronRight, Play } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ResearchProgress({ query }) {
  const steps = [
    { key: 'understanding', label: 'Understanding query', detail: 'Expanding keywords and building 10 search intents...' },
    { key: 'finding', label: 'Finding relevant sources', detail: 'Crawling web catalogs and locating domain repositories...' },
    { key: 'scraping', label: 'Scraping clean content', detail: 'Triggering Context.dev scrape APIs to compile markdown...' },
    { key: 'extracting', label: 'Extracting numbers', detail: 'Parsing document structures for statistics, quotes and figures...' },
    { key: 'verifying', label: 'Verifying across sources', detail: 'Deduplicating claims, calculating credibility, and resolving variations...' },
    { key: 'collecting', label: 'Collecting images', detail: 'Aggregating branding logs, screenshots, and visual graphs...' },
    { key: 'generating', label: 'Generating report', detail: 'Formatting citations, executive summaries, and timeline maps...' }
  ];

  const [activeIdx, setActiveIdx] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIdx((prev) => {
        if (prev < steps.length - 1) return prev + 1;
        clearInterval(interval);
        return prev;
      });
    }, 1100);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full max-w-3xl mx-auto glass-panel p-6 rounded-3xl border border-white/10 shadow-2xl relative overflow-hidden animate-fade-in">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-accentCyan via-accentViolet to-pink-500"></div>
      
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/5">
        <div>
          <span className="text-[10px] font-bold text-accentCyan uppercase tracking-widest block mb-1">Agent Swarm Active</span>
          <h3 className="text-lg font-bold text-white line-clamp-1">Researching: "{query}"</h3>
        </div>
        <span className="text-xs font-mono bg-white/5 px-2.5 py-1 rounded text-slate-400 border border-white/5 flex items-center gap-1.5">
          <Loader2 className="w-3.5 h-3.5 animate-spin text-accentCyan" /> Stage {activeIdx + 1}/7
        </span>
      </div>

      <div className="space-y-4">
        {steps.map((step, idx) => {
          const isPending = idx > activeIdx;
          const isActive = idx === activeIdx;
          const isCompleted = idx < activeIdx;

          return (
            <div 
              key={step.key}
              className={`p-3.5 rounded-2xl border transition-all duration-300 ${
                isActive 
                  ? 'bg-accentViolet/5 border-accentViolet/30 shadow-[0_0_15px_rgba(123,97,255,0.05)]' 
                  : isCompleted 
                    ? 'bg-emerald-500/5 border-emerald-500/10'
                    : 'bg-transparent border-white/5 opacity-40'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex-shrink-0">
                    {isCompleted ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                    ) : isActive ? (
                      <Loader2 className="w-5 h-5 text-accentCyan animate-spin" />
                    ) : (
                      <div className="w-5 h-5 rounded-full border-2 border-slate-700 flex items-center justify-center text-[10px] font-bold text-slate-500">
                        {idx + 1}
                      </div>
                    )}
                  </div>
                  <div>
                    <h4 className={`text-sm font-bold ${isActive ? 'text-white' : isCompleted ? 'text-slate-300' : 'text-slate-500'}`}>
                      {step.label}
                    </h4>
                    {isActive && (
                      <motion.p 
                        initial={{ opacity: 0, y: 2 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-xs text-slate-400 mt-1 font-mono"
                      >
                        &gt; {step.detail}
                      </motion.p>
                    )}
                  </div>
                </div>
                {isActive && (
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-accentCyan/10 text-accentCyan border border-accentCyan/20 animate-pulse font-mono">
                    RUNNING
                  </span>
                )}
                {isCompleted && (
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 font-mono">
                    RESOLVED
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
