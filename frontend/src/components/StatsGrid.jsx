import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { TrendingUp, Database, Calendar } from 'lucide-react';

export default function StatsGrid({ keyStats }) {
  if (!keyStats || keyStats.length === 0) return null;

  // Format stats data for Recharts chart
  // Filter and convert statistical items containing percentages or numbers
  const chartData = keyStats
    .map((stat, idx) => {
      const numMatch = stat.value.match(/(\d+(?:\.\d+)?)/);
      const val = numMatch ? parseFloat(numMatch[1]) : (100 - (idx * 20));
      // Clean up labels for graph axes
      let label = stat.label.replace('___', '').trim();
      if (label.length > 20) {
        label = label.substring(0, 17) + '...';
      }
      return {
        name: label || `Stat ${idx + 1}`,
        value: val,
        rawString: stat.value
      };
    })
    .slice(0, 4);

  const colors = ['#7b61ff', '#00f5d4', '#ff4d9d', '#818cf8'];

  return (
    <div className="space-y-6 w-full">
      <div className="flex items-center gap-2 px-1">
        <TrendingUp className="w-5 h-5 text-accentCyan" />
        <h3 className="text-lg font-black text-white">Statistical Insights & Key Metrics</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
        {/* Left Column: Stat Cards Grid */}
        <div className="md:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {keyStats.map((stat, idx) => (
            <div 
              key={idx}
              className="glass-panel p-5 rounded-2xl border border-white/5 hover:border-white/10 transition-all flex flex-col justify-between"
            >
              <div className="flex items-start justify-between gap-2">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest line-clamp-2 leading-relaxed">
                  {stat.label.replace('___', stat.value)}
                </span>
                <span className="p-1.5 rounded-lg bg-accentViolet/10 text-accentViolet text-xs border border-accentViolet/20">
                  <Database className="w-3.5 h-3.5" />
                </span>
              </div>
              <div className="mt-4 pt-3 border-t border-white/5">
                <div className="text-2xl font-black text-white tracking-tight">
                  {stat.value}
                </div>
                <div className="flex items-center gap-3 mt-1.5 text-[10px] text-slate-500 font-semibold">
                  <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {stat.year}</span>
                  <span className="line-clamp-1">Source: {stat.source}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Right Column: Recharts Chart */}
        <div className="md:col-span-5 glass-panel p-5 rounded-2xl border border-white/5 flex flex-col justify-between min-h-[300px]">
          <div>
            <h4 className="text-sm font-bold text-white mb-1">Metric Consensus Distribution</h4>
            <p className="text-[10px] text-slate-400">Relative scale mapping extracted quantitative data parameters.</p>
          </div>

          <div className="w-full h-48 mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 10, right: 10, left: -25, bottom: 5 }}>
                <XAxis 
                  dataKey="name" 
                  stroke="#475569" 
                  fontSize={9} 
                  tickLine={false} 
                />
                <YAxis 
                  stroke="#475569" 
                  fontSize={9} 
                  tickLine={false} 
                />
                <Tooltip 
                  cursor={{ fill: 'rgba(255,255,255,0.02)' }}
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="glass-panel p-3 rounded-lg border border-white/10 text-xs shadow-xl">
                          <p className="font-bold text-white mb-1">{payload[0].name}</p>
                          <p className="text-accentCyan">Value Parameter: <span className="font-bold">{payload[0].payload.rawString}</span></p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
