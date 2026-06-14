import React from 'react';
import { ExternalLink, ShieldCheck, Award } from 'lucide-react';

export default function SourcePanel({ sources }) {
  if (!sources || sources.length === 0) return null;

  return (
    <div className="space-y-6 w-full">
      <div className="flex items-center justify-between px-1">
        <div className="flex items-center gap-2">
          <Award className="w-5 h-5 text-accentCyan" />
          <h3 className="text-lg font-black text-white">Citation Explorer & Sources</h3>
        </div>
        <span className="text-xs text-slate-500 font-mono">
          Scraped with Context.dev
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {sources.map((source, idx) => {
          // Calculate arbitrary credibility score based on domain category for mock visualization
          const isGov = source.url.includes('.gov') || source.publisher.includes('Gov');
          const isAcademic = source.url.includes('.edu');
          const credibility = isGov ? 98 : isAcademic ? 95 : 88;

          return (
            <div 
              key={idx}
              className="glass-panel p-5 rounded-2xl border border-white/5 hover:border-accentCyan/20 hover:bg-[#090924]/80 transition-all flex flex-col justify-between group duration-300"
            >
              <div>
                <div class="flex items-center justify-between mb-3.5">
                  <span className={`px-2 py-0.5 rounded text-[9px] font-bold border ${
                    isGov 
                      ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' 
                      : 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20'
                  }`}>
                    {isGov ? 'GOVERNMENT' : isAcademic ? 'ACADEMIC' : 'PUBLIC REPORT'}
                  </span>
                  
                  <span className="text-[11px] font-bold text-accentCyan flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5" /> {credibility}%
                  </span>
                </div>

                <h4 className="text-sm font-bold text-white line-clamp-1 group-hover:text-accentCyan transition-colors">
                  {source.title}
                </h4>
                
                <p className="text-xs text-slate-400 mt-2 line-clamp-3 leading-relaxed font-light">
                  "{source.summary}"
                </p>
              </div>

              <div className="mt-6 pt-3.5 border-t border-white/5 flex items-center justify-between">
                <div class="flex flex-col">
                  <span className="text-[10px] text-slate-400 font-bold">{source.publisher}</span>
                  <span className="text-[9px] text-slate-500 mt-0.5">{source.date || 'Accessed Q4'}</span>
                </div>
                
                <a 
                  href={source.url} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
