import React, { useState, useEffect } from 'react';
import { Search, Sparkles } from 'lucide-react';

export default function SearchHero({ onSearch, isLoading }) {
  const [query, setQuery] = useState('');
  
  const placeholders = [
    "How many AirPods got sold this year?",
    "What are the latest AI tools used by developers?",
    "Top smartphone sales in India 2026",
    "Which company is leading humanoid robots?"
  ];
  
  const [placeholderIdx, setPlaceholderIdx] = useState(0);

  // Rotate placeholders every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setPlaceholderIdx((prev) => (prev + 1) % placeholders.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim() && !isLoading) {
      onSearch(query.trim());
    }
  };

  const handleSelectSample = (sample) => {
    setQuery(sample);
    if (!isLoading) {
      onSearch(sample);
    }
  };

  return (
    <div className="w-full flex flex-col items-center pt-8 pb-10">
      <div className="w-full max-w-3xl text-center space-y-4 mb-8">
        <h1 className="text-4xl md:text-5xl font-black tracking-tight text-white leading-tight">
          Context <span className="bg-gradient-to-r from-accentCyan via-accentViolet to-pink-500 bg-clip-text text-transparent">Research Studio</span>
        </h1>
        <p className="text-slate-400 text-sm md:text-base max-w-xl mx-auto">
          Multi-agent deep research powered by Context.dev. Ask anything and retrieve validated answers with sources.
        </p>
      </div>

      <div className="w-full max-w-3xl relative">
        {/* Animated Background Gradient Glow wrapper */}
        <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-accentCyan via-accentViolet to-pink-500 opacity-25 blur-lg transition duration-1000 group-hover:opacity-40 animate-pulse-glow"></div>
        
        <form onSubmit={handleSubmit} className="relative flex p-2 rounded-2xl bg-[#09091f]/90 backdrop-blur-xl border border-white/10 shadow-2xl focus-within:border-accentCyan/40 focus-within:shadow-[0_0_30px_rgba(0,245,212,0.1)] transition-all">
          <div className="flex items-center pl-4 pr-2 py-2.5 w-full">
            <Search className="text-slate-500 mr-3 flex-shrink-0 w-5 h-5" />
            <input 
              type="text" 
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={placeholders[placeholderIdx]}
              disabled={isLoading}
              className="bg-transparent border-none outline-none text-white text-sm md:text-base w-full placeholder-slate-600 pr-4 disabled:opacity-50"
            />
            <button 
              type="submit" 
              disabled={isLoading || !query.trim()}
              className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-accentCyan to-accentViolet hover:from-accentViolet hover:to-accentCyan text-slate-900 hover:text-white transition-all font-bold text-xs tracking-wider uppercase shadow-md shadow-accentCyan/10 flex items-center gap-2 active:scale-95 disabled:opacity-40 disabled:pointer-events-none whitespace-nowrap"
            >
              <Sparkles className="w-4 h-4" />
              {isLoading ? 'Researching...' : 'Research'}
            </button>
          </div>
        </form>
      </div>

      {!isLoading && (
        <div className="flex flex-wrap justify-center gap-2 mt-5 max-w-2xl px-4">
          {placeholders.map((p, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => handleSelectSample(p)}
              className="px-3.5 py-1.5 rounded-full bg-glassBg hover:bg-white/5 border border-white/5 hover:border-white/10 text-[11px] font-medium text-slate-400 hover:text-white transition-all duration-300 hover:scale-105"
            >
              {p}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
