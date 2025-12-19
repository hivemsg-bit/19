
import React from 'react';
import { Trophy, Star, Users, CheckCircle, Zap } from 'lucide-react';

export const TrustBar: React.FC = () => {
  const ranks = [
    "AIR 4 - Nov '23", "AIR 12 - May '24", "AIR 45 - Nov '23", 
    "AIR 2 - Foundation", "AIR 18 - Inter", "AIR 31 - Final",
    "AIR 9 - Nov '23", "AIR 22 - May '24", "AIR 50 - Jan '25"
  ];

  return (
    <div className="relative z-20 -mt-8 mb-12">
      {/* Ranks Ticker */}
      <div className="bg-brand-dark overflow-hidden py-3 border-y border-white/10 shadow-2xl">
        <div className="flex whitespace-nowrap animate-marquee">
          {[...ranks, ...ranks].map((rank, i) => (
            <div key={i} className="flex items-center gap-2 mx-8">
              <Trophy size={14} className="text-brand-orange" />
              <span className="text-white text-[11px] font-black uppercase tracking-widest">{rank}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Main Stats Bar */}
      <div className="max-w-6xl mx-auto px-4 mt-6">
        <div className="bg-white rounded-[2.5rem] shadow-xl border border-slate-100 p-6 md:p-8 grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-4 items-center">
          
          <div className="flex items-center gap-4 border-r-0 md:border-r border-slate-100 last:border-0 justify-center lg:justify-start">
            <div className="w-12 h-12 rounded-2xl bg-orange-50 text-brand-orange flex items-center justify-center shrink-0">
                <Users size={24} />
            </div>
            <div>
                <div className="text-xl font-black text-slate-900 leading-none">5,200+</div>
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter mt-1">Students Trusted</div>
            </div>
          </div>

          <div className="flex items-center gap-4 border-r-0 md:border-r border-slate-100 last:border-0 justify-center lg:justify-start">
            <div className="w-12 h-12 rounded-2xl bg-brand-primary/10 text-brand-primary flex items-center justify-center shrink-0">
                <CheckCircle size={24} />
            </div>
            <div>
                <div className="text-xl font-black text-slate-900 leading-none">12,500+</div>
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter mt-1">Papers Evaluated</div>
            </div>
          </div>

          <div className="flex items-center gap-4 border-r-0 md:border-r border-slate-100 last:border-0 justify-center lg:justify-start">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                <Zap size={24} />
            </div>
            <div>
                <div className="text-xl font-black text-slate-900 leading-none">48 Hours</div>
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter mt-1">Quick Evaluation</div>
            </div>
          </div>

          <div className="flex items-center gap-4 last:border-0 justify-center lg:justify-start">
            <div className="w-12 h-12 rounded-2xl bg-yellow-50 text-yellow-600 flex items-center justify-center shrink-0">
                <Star size={24} />
            </div>
            <div>
                <div className="text-xl font-black text-slate-900 leading-none">4.9/5</div>
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter mt-1">Avg Student Rating</div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
