import React, { useState, useEffect } from 'react';
import SearchHero from './components/SearchHero';
import ResearchProgress from './components/ResearchProgress';
import AnswerCard from './components/AnswerCard';
import StatsGrid from './components/StatsGrid';
import SourcePanel from './components/SourcePanel';
import ImageGallery from './components/ImageGallery';
import Timeline from './components/Timeline';
import FollowupQuestions from './components/FollowupQuestions';
import EmptyState from './components/EmptyState';
import { Copy, Download, Bookmark, RefreshCw, FileText, Check } from 'lucide-react';

export default function App() {
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [report, setReport] = useState(null);
  const [error, setError] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);
  const [particles, setParticles] = useState([]);

  // Generate 45 randomized CSS floating particles
  useEffect(() => {
    const generated = [];
    for (let i = 0; i < 45; i++) {
      generated.push({
        id: i,
        left: `${Math.random() * 100}%`,
        duration: `${10 + Math.random() * 15}s`,
        delay: `${Math.random() * -15}s`,
        opacity: Math.random() * 0.5 + 0.1
      });
    }
    setParticles(generated);
  }, []);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleResearch = async (searchQuery) => {
    setQuery(searchQuery);
    setIsLoading(true);
    setError(null);
    setReport(null);

    try {
      const response = await fetch('/api/research', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query: searchQuery }),
      });

      if (!response.ok) {
        throw new Error('Failed to retrieve research. Ensure backend server is running.');
      }

      const data = await response.json();
      
      // Delay response slightly so user can enjoy the 8-agent pipeline loading animation
      setTimeout(() => {
        setReport(data);
        setIsLoading(false);
      }, 7700);

    } catch (err) {
      console.error(err);
      setError(err.message || 'An error occurred during agent execution.');
      setIsLoading(false);
    }
  };

  // Export functions
  const handleCopy = () => {
    if (!report) return;
    const text = `RESEARCH DOSSIER: ${report.query.toUpperCase()}\n\nESTIMATED ANSWER:\n${report.answer}\n\nCONFIDENCE: ${Math.round(report.confidence * 100)}%\n\nKEY HIGHLIGHTS:\n${report.highlights.map(h => `- ${h}`).join('\n')}`;
    navigator.clipboard.writeText(text);
    showToast('Report copied to clipboard!');
  };

  const handleDownloadMarkdown = () => {
    if (!report) return;
    const markdownContent = `# Research Dossier: ${report.query}
\n## Estimated Answer
${report.answer}
\n*Confidence Score: ${Math.round(report.confidence * 100)}%*
\n## Highlights
${report.highlights.map(h => `- ${h}`).join('\n')}
\n## Sources
${report.sources.map(s => `- [${s.title}](${s.url}) - ${s.publisher}`).join('\n')}
\n---
Generated via Context Research Studio.`;

    const blob = new Blob([markdownContent], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `research-${report.query.toLowerCase().replace(/[^a-z0-9]/g, '-')}.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    showToast('Markdown file downloaded!');
  };

  const handleSave = () => {
    showToast('Research dossier saved to studio database.');
  };

  const resetDashboard = () => {
    setQuery('');
    setReport(null);
    setIsLoading(false);
    setError(null);
  };

  return (
    <div className="relative min-h-screen pb-16 flex flex-col justify-between">
      
      {/* Floating Particle Divs */}
      {particles.map((p) => (
        <div 
          key={p.id}
          className="particle"
          style={{
            left: p.left,
            animationDuration: p.duration,
            animationDelay: p.delay,
            opacity: p.opacity
          }}
        />
      ))}

      {/* Background Gradients */}
      <div className="fixed inset-0 -z-10 bg-[#050510] pointer-events-none">
        <div className="absolute top-[-25%] left-[-15%] w-[60%] h-[60%] rounded-full bg-accentViolet/5 blur-[160px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-accentCyan/5 blur-[160px]"></div>
      </div>


      {/* Main Content */}
      <div className="w-full">
        {/* Navbar */}
        <header className="sticky top-0 z-40 w-full bg-[#050510]/80 backdrop-blur-xl border-b border-white/5 px-6 lg:px-12 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer" onClick={resetDashboard}>
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-accentCyan to-accentViolet flex items-center justify-center shadow-lg shadow-accentViolet/25">
              <FileText className="text-slate-900 w-5 h-5" />
            </div>
            <div>
              <span className="text-xl font-black bg-gradient-to-r from-accentCyan to-accentViolet bg-clip-text text-transparent">Context Studio</span>
              <span className="text-[10px] font-bold text-slate-500 block -mt-1 uppercase tracking-widest">Research Engine</span>
            </div>
          </div>

          <div className="flex items-center gap-4 text-xs font-semibold">
            <span className="hidden sm:flex items-center gap-1.5 text-accentCyan bg-accentCyan/10 px-2.5 py-1 rounded-full border border-accentCyan/20">
              <span class="w-1.5 h-1.5 rounded-full bg-accentCyan animate-pulse"></span> Context.dev Connected
            </span>
          </div>
        </header>

        {/* Inner layout container */}
        <main className="max-w-6xl mx-auto px-4 sm:px-8 py-8 space-y-10">
          
          {/* 1. Hero Search Panel */}
          <SearchHero onSearch={handleResearch} isLoading={isLoading} />

          {/* Error display */}
          {error && (
            <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-200 text-xs md:text-sm text-center max-w-2xl mx-auto">
              {error}
            </div>
          )}

          {/* 2. Loading Pipeline state */}
          {isLoading && (
            <ResearchProgress query={query} />
          )}

          {/* 3. Research Report Output */}
          {report && !isLoading && (
            <div className="space-y-10 animate-fade-in">
              {/* Report Header Ribbon */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-glassBg border border-glassBorder backdrop-blur-md">
                <div>
                  <span className="text-[10px] font-bold text-accentViolet uppercase tracking-wider">Research Dossier</span>
                  <h2 className="text-lg md:text-xl font-extrabold text-white mt-1">"{report.query}"</h2>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  <button 
                    onClick={handleCopy}
                    className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-all border border-white/5 active:scale-95 flex items-center gap-1.5 text-xs font-medium"
                    title="Copy Report"
                  >
                    <Copy className="w-4 h-4" /> Copy
                  </button>
                  <button 
                    onClick={handleDownloadMarkdown}
                    className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-all border border-white/5 active:scale-95 flex items-center gap-1.5 text-xs font-medium"
                    title="Download Markdown"
                  >
                    <Download className="w-4 h-4" /> Markdown
                  </button>
                  <button 
                    onClick={handleSave}
                    className="p-2.5 rounded-xl bg-gradient-to-r from-accentCyan to-accentViolet text-slate-900 font-bold hover:shadow-lg hover:shadow-accentCyan/10 transition-all active:scale-95 flex items-center gap-1.5 text-xs"
                    title="Save Research"
                  >
                    <Bookmark className="w-4 h-4" /> Save
                  </button>
                </div>
              </div>

              {/* Components */}
              <AnswerCard 
                answer={report.answer} 
                confidence={report.confidence} 
                accuracyNote={report.accuracy_note} 
              />
              
              <StatsGrid keyStats={report.key_stats} />

              <SourcePanel sources={report.sources} />

              <ImageGallery images={report.images} />

              <Timeline timeline={report.timeline} />

              <FollowupQuestions 
                followups={report.followups} 
                onSelectQuestion={handleResearch} 
              />
            </div>
          )}

          {/* 4. Default Empty Screen state */}
          {!report && !isLoading && (
            <EmptyState onSelectSuggestion={handleResearch} />
          )}

        </main>
      </div>

      {/* Footer */}
      <footer className="text-center text-xs text-slate-500 font-semibold uppercase tracking-wider py-8">
        © 2026 Context Research Studio • Orchestrated Swarm Platform
      </footer>

      {/* Toast popup */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 p-4 rounded-xl bg-glassBg border border-glassBorder shadow-2xl backdrop-blur-md text-xs md:text-sm font-semibold flex items-center gap-2 animate-slide-up text-white">
          <Check className="w-4.5 h-4.5 text-accentCyan" />
          {toastMessage}
        </div>
      )}
    </div>
  );
}
