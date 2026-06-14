import React from 'react';
import { HelpCircle, ArrowRight } from 'lucide-react';

export default function FollowupQuestions({ followups, onSelectQuestion }) {
  if (!followups || followups.length === 0) return null;

  return (
    <div className="space-y-4 w-full">
      <div className="flex items-center gap-2 px-1">
        <HelpCircle className="w-4.5 h-4.5 text-accentCyan" />
        <h4 className="text-sm font-bold text-white uppercase tracking-wider">Suggested Inquiries</h4>
      </div>

      <div className="flex flex-col gap-2.5 max-w-2xl">
        {followups.map((question, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => onSelectQuestion(question)}
            className="w-full text-left p-3.5 rounded-xl bg-glassBg hover:bg-accentViolet/10 border border-white/5 hover:border-accentViolet/30 text-xs md:text-sm text-slate-300 hover:text-white transition-all flex items-center justify-between group duration-300 active:scale-[0.99]"
          >
            <span>"{question}"</span>
            <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-accentCyan transition-colors transform group-hover:translate-x-1 duration-300 flex-shrink-0 ml-2" />
          </button>
        ))}
      </div>
    </div>
  );
}
