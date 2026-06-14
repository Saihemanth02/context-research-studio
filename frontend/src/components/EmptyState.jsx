import React from 'react';
import { Database, ShieldCheck, Cpu, Library, FileText, ArrowRight } from 'lucide-react';

export default function EmptyState({ onSelectSuggestion }) {
  const stats = [
    { label: "Sources Analyzed", value: "27+", icon: <Database className="w-5 h-5 text-accentCyan" /> },
    { label: "Confidence Score", value: "94%", icon: <ShieldCheck className="w-5 h-5 text-emerald-400" /> },
    { label: "Research Agents", value: "8 AI", icon: <Cpu className="w-5 h-5 text-accentViolet" /> },
    { label: "Facts Indexed", value: "2.3M", icon: <Library className="w-5 h-5 text-pink-500" /> }
  ];

  const recentReports = [
    {
      id: "airpods",
      tag: "Technology",
      title: "AirPods Sales Analysis 2026",
      desc: "Cross-verified from Apple Reports, IDC, Statista, and market research databases.",
      confidence: 94,
      query: "How many AirPods got sold this year?"
    },
    {
      id: "ai_tools",
      tag: "Artificial Intelligence",
      title: "OpenAI Market Share Report",
      desc: "Research across funding reports, user adoption metrics, and industry analyst catalogs.",
      confidence: 89,
      query: "What are the latest AI tools used by developers?"
    },
    {
      id: "smartphone_india",
      tag: "Consumer Goods",
      title: "Top Smartphone Sales in India 2026",
      desc: "Local registry records, manufacturer shipping indices, and market forecast summaries.",
      confidence: 91,
      query: "Top smartphone sales in India 2026"
    }
  ];

  return (
    <div className="w-full space-y-12 animate-fade-in">
      
      {/* 4 Core Stats Grid */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full">
        {stats.map((item, idx) => (
          <div 
            key={idx} 
            className="p-5 rounded-2xl bg-glassBg border border-white/5 hover:border-white/10 hover:bg-glassBg/80 transition-all flex flex-col justify-between"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{item.label}</span>
              {item.icon}
            </div>
            <div className="text-3xl font-black text-white mt-2">{item.value}</div>
          </div>
        ))}
      </section>

      {/* Recent Research Section */}
      <section className="space-y-6">
        <div className="flex items-center justify-between px-1">
          <h3 className="text-xl font-extrabold text-white flex items-center gap-2">
            <FileText className="w-5 h-5 text-accentViolet" /> Recent Research Reports
          </h3>
          <span className="text-xs text-slate-500 font-medium">Click to reload dossier</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {recentReports.map((report) => (
            <div 
              key={report.id}
              onClick={() => onSelectSuggestion(report.query)}
              className="p-6 rounded-2xl bg-glassBg border border-white/5 hover:border-accentCyan/30 hover:bg-[#090924]/80 transition-all cursor-pointer group flex flex-col justify-between min-h-[220px] duration-300 hover:scale-[1.02] relative overflow-hidden"
            >
              {/* Highlight scanner lines */}
              <div className="absolute top-0 left-0 w-1 bg-gradient-to-b from-accentCyan to-accentViolet h-full"></div>
              
              <div>
                <span className="inline-block px-2.5 py-0.5 rounded text-[10px] font-bold bg-white/5 text-slate-300 border border-white/5 uppercase tracking-wider mb-4">
                  {report.tag}
                </span>
                
                <h4 className="text-base font-bold text-white group-hover:text-accentCyan transition-colors line-clamp-2">
                  {report.title}
                </h4>
                
                <p className="text-xs text-slate-400 mt-2 line-clamp-3 leading-relaxed font-light">
                  {report.desc}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between">
                <div className="w-full mr-4">
                  <div className="flex justify-between text-[10px] font-bold text-slate-400 mb-1">
                    <span>Confidence Match</span>
                    <span className="text-accentCyan">{report.confidence}%</span>
                  </div>
                  <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-gradient-to-r from-accentCyan to-accentViolet h-full" style={{ width: `${report.confidence}%` }}></div>
                  </div>
                </div>
                
                <div className="p-2 rounded-lg bg-white/5 group-hover:bg-accentViolet/20 text-slate-400 group-hover:text-white transition-all">
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
